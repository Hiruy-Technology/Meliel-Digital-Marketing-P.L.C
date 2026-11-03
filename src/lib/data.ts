// DATA LAYER: the only way pages get CMS content.
// Reads Payload on the server, in the visitor's language, and returns the shapes in ./types.
//
// Two rules live here:
// - Nothing mixes languages: queries never fall back to English, and an item with no Amharic is
//   left out of /am. The exception is image alt text, which isn't visible on the page.
// - Dev and preview builds show seed.ts placeholders wherever the database is empty or unreachable,
//   so the design can still be reviewed. Production never does: empty sections hide, and a database
//   error is raised, so visitors keep the last good page instead of a blank one.

import { unstable_cache } from "next/cache";
import { cache } from "react";
import config from "@payload-config";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { getPayload, type Payload } from "payload";
import {
  clientLogos,
  industries,
  inquiryOptions,
  projects,
  services,
  siteSettings,
  teamMembers,
  testimonials,
} from "@/content/seed";
import { servicesAm } from "@/content/services-am";
import type { Locale } from "@/i18n/config";
import type {
  Industry as CmsIndustry,
  Media as CmsMedia,
  Project as CmsProject,
  Service as CmsService,
} from "@/payload-types";
import { CMS_TAG, showPlaceholders } from "./site";
import type {
  ClientLogo,
  Industry,
  InquiryOptions,
  Media,
  Project,
  RichText,
  Service,
  ServiceSlug,
  SiteSettings,
  TeamMember,
  Testimonial,
  Video,
} from "./types";

const bySortOrder = <T extends { sortOrder: number }>(a: T, b: T) =>
  a.sortOrder - b.sortOrder;

const isPresent = <T>(value: T | null | undefined): value is T => value != null;

/**
 * Runs a query, cached so /work, /quote and /contact (which read the URL, so they render per visit)
 * neither hit the database each time nor fail while it's down. Saving in /admin clears the cache.
 * `unstable_cache` because its replacement, `use cache`, needs cacheComponents, which stays off.
 * `null` means "use the placeholders": only possible on dev and preview builds.
 */
async function read<T>(key: string, query: (payload: Payload) => Promise<T>) {
  try {
    const cached = unstable_cache(
      async () => query(await getPayload({ config })),
      [key],
      { tags: [CMS_TAG], revalidate: 3600 },
    );
    return await cached();
  } catch (error) {
    if (!showPlaceholders) throw error;
    return null;
  }
}

/** The database list, or the placeholders when it's empty and this build may show them. */
function orPlaceholders<T>(list: T[] | null, placeholders: () => T[]): T[] {
  if (list?.length) return list;
  return showPlaceholders ? placeholders() : (list ?? []);
}

// --- Images -----------------------------------------------------------------

/** Every image's English alt text, for images with no Amharic description yet. */
const englishAlts = cache(async () => {
  const docs = await read("media-alts", async (payload) => {
    const { docs } = await payload.find({
      collection: "media",
      locale: "en",
      pagination: false,
      depth: 0,
      select: { alt: true },
    });
    return docs;
  });
  return new Map(docs?.map((doc) => [doc.id, doc.alt ?? ""]));
});

type Alts = Awaited<ReturnType<typeof englishAlts>>;

function toMedia(
  file: number | CmsMedia | null | undefined,
  alts: Alts,
): Media | null {
  if (!file || typeof file === "number") return null;
  return {
    url: file.url ?? null,
    alt: file.alt || alts.get(file.id) || "",
    width: file.width ?? 0,
    height: file.height ?? 0,
  };
}

// --- Services ---------------------------------------------------------------

/** Rows with wording in this language, with their ids. */
function includeRows(rows: CmsService["includes"]) {
  const kept = (rows ?? []).filter((row) => row.item && row.id);
  return {
    includes: kept.map((row) => row.item as string),
    includeIds: kept.map((row) => row.id as string),
  };
}

function toService(doc: CmsService): Service | null {
  if (!doc.name || !doc.summary) return null;
  return {
    id: String(doc.id),
    name: doc.name,
    slug: doc.slug,
    summary: doc.summary,
    ...includeRows(doc.includes),
    sortOrder: doc.sortOrder,
    note: doc.note ?? undefined,
  };
}

const seedService = (service: Service, locale: Locale): Service =>
  locale === "am" ? { ...service, ...servicesAm[service.slug] } : service;

const placeholderProject = (project: Project, locale: Locale): Project => ({
  ...project,
  services: project.services.map((s) => seedService(s, locale)),
});

export const getServices = cache(async (locale: Locale): Promise<Service[]> => {
  const docs = await read(`services:${locale}`, async (payload) => {
    const { docs } = await payload.find({
      collection: "services",
      locale,
      fallbackLocale: false,
      pagination: false,
      sort: "sortOrder",
      depth: 0,
    });
    return docs.map(toService).filter(isPresent);
  });
  return orPlaceholders(docs, () =>
    [...services].sort(bySortOrder).map((s) => seedService(s, locale)),
  );
});

export async function getServiceBySlug(
  slug: string,
  locale: Locale,
): Promise<Service | null> {
  const list = await getServices(locale);
  return list.find((s) => s.slug === slug) ?? null;
}

/** Type guard for values from URLs, e.g. /quote?service=branding. The 5 slugs are fixed. */
export function isServiceSlug(value: unknown): value is ServiceSlug {
  return typeof value === "string" && services.some((s) => s.slug === value);
}

// --- Projects ---------------------------------------------------------------

/** Rich text with no words in it counts as empty, so its block is left out of the page. */
function toRichText(content: CmsProject["challenge"]): RichText {
  if (!content) return [];
  return convertLexicalToPlaintext({ data: content }).trim() ? content : [];
}

function toVideo(
  row: NonNullable<CmsProject["videos"]>[number],
  alts: Alts,
): Video | null {
  if (!row.title) return null;
  return {
    provider: row.provider,
    url:
      row.provider === "upload"
        ? (toMedia(row.file, alts)?.url ?? null)
        : (row.url ?? null),
    title: row.title,
    thumbnail: toMedia(row.thumbnail, alts) ?? {
      url: null,
      alt: row.title,
      width: 1600,
      height: 900,
    },
  };
}

/** `null` when the project isn't ready in this language. */
function toProject(doc: CmsProject, alts: Alts): Project | null {
  const industry = doc.industry as CmsIndustry | number;
  const coverImage = toMedia(doc.coverImage, alts);
  if (typeof industry === "number" || !industry.name) return null;
  if (!doc.title || !doc.clientName || !doc.slug || !coverImage) return null;
  return {
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
    clientName: doc.clientName,
    industry: {
      id: String(industry.id),
      name: industry.name,
      slug: industry.slug ?? "",
    },
    services: doc.services
      .map((s) => (typeof s === "number" ? null : toService(s)))
      .filter(isPresent),
    featured: Boolean(doc.featured),
    sortOrder: doc.sortOrder,
    status: doc.status,
    coverImage,
    gallery: (doc.gallery ?? [])
      .map((file) => toMedia(file, alts))
      .filter(isPresent),
    videos: (doc.videos ?? [])
      .map((row) => toVideo(row, alts))
      .filter(isPresent),
    challenge: toRichText(doc.challenge),
    delivered: toRichText(doc.delivered),
    results: toRichText(doc.results),
    resultHighlights: (doc.resultHighlights ?? [])
      .filter((row) => row.label)
      .map((row) => ({ value: row.value, label: row.label as string })),
    publishedAt: doc.publishedAt ?? doc.createdAt,
  };
}

/** Published projects in this language, in the order Meliel set. */
const published = cache(async (locale: Locale): Promise<Project[]> => {
  const alts = await englishAlts();
  const docs = await read(`projects:${locale}`, async (payload) => {
    const { docs } = await payload.find({
      collection: "projects",
      locale,
      fallbackLocale: false,
      where: { status: { equals: "published" } },
      pagination: false,
      sort: "sortOrder",
      depth: 2,
      // The private notes never leave the admin.
      select: { aiNotes: false },
    });
    return docs.map((doc) => toProject(doc as CmsProject, alts));
  });
  return orPlaceholders(docs?.filter(isPresent) ?? null, () =>
    projects
      .filter((p) => p.status === "published")
      .sort(bySortOrder)
      .map((p) => placeholderProject(p, locale)),
  );
});

export type ProjectFilter = {
  /** Service slug. Unknown values are ignored. */
  service?: string;
  /** Industry slug. Unknown values are ignored. */
  industry?: string;
  featured?: boolean;
  limit?: number;
};

export async function getProjects(
  filter: ProjectFilter,
  locale: Locale,
): Promise<Project[]> {
  const { service, industry, featured, limit } = filter;
  const all = await published(locale);
  let list = all;
  if (service && isServiceSlug(service)) {
    list = list.filter((p) => p.services.some((s) => s.slug === service));
  }
  if (industry && all.some((p) => p.industry.slug === industry)) {
    list = list.filter((p) => p.industry.slug === industry);
  }
  if (featured !== undefined) {
    list = list.filter((p) => p.featured === featured);
  }
  return limit ? list.slice(0, limit) : list;
}

export async function getProjectBySlug(
  slug: string,
  locale: Locale,
): Promise<Project | null> {
  const list = await published(locale);
  return list.find((p) => p.slug === slug) ?? null;
}

/** For "previous / next project" links. Wraps around at the ends. */
export async function getAdjacentProjects(
  slug: string,
  locale: Locale,
): Promise<{ previous: Project | null; next: Project | null }> {
  const list = await published(locale);
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1 || list.length < 2) return { previous: null, next: null };
  return {
    previous: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}

/** All published slugs in this language, for generateStaticParams on /work/[slug]. */
export async function getProjectSlugs(locale: Locale): Promise<string[]> {
  const list = await published(locale);
  return list.map((p) => p.slug);
}

/** Industries that have a published project here (so filters never lead to an empty list). */
export async function getIndustries(locale: Locale): Promise<Industry[]> {
  const found = new Map(
    (await published(locale)).map((p) => [p.industry.slug, p.industry]),
  );
  const seedOrder = industries.filter((i) => found.has(i.slug));
  return seedOrder.length ? seedOrder : [...found.values()];
}

// --- Testimonials, logos, team ---------------------------------------------

const allTestimonials = cache(
  async (locale: Locale): Promise<Testimonial[]> => {
    const alts = await englishAlts();
    const docs = await read(`testimonials:${locale}`, async (payload) => {
      const { docs } = await payload.find({
        collection: "testimonials",
        locale,
        fallbackLocale: false,
        pagination: false,
        depth: 1,
      });
      return docs
        .filter((doc) => doc.quote)
        .map((doc) => ({
          id: String(doc.id),
          quote: doc.quote as string,
          name: doc.name,
          jobTitle: doc.jobTitle ?? "",
          company: doc.company ?? "",
          photo: toMedia(doc.photo, alts) ?? undefined,
          featured: Boolean(doc.featured),
        }));
    });
    return orPlaceholders(docs, () => [...testimonials]);
  },
);

export async function getTestimonials(
  filter: { featured?: boolean },
  locale: Locale,
): Promise<Testimonial[]> {
  const list = await allTestimonials(locale);
  return filter.featured === undefined
    ? list
    : list.filter((t) => t.featured === filter.featured);
}

/** Logos look the same in both languages, so they show on /am without an Amharic name. */
export const getClientLogos = cache(
  async (locale: Locale): Promise<ClientLogo[]> => {
    const alts = await englishAlts();
    const docs = await read(`logos:${locale}`, async (payload) => {
      const { docs } = await payload.find({
        collection: "client-logos",
        locale,
        fallbackLocale: "en",
        pagination: false,
        sort: "sortOrder",
        depth: 1,
      });
      return docs.flatMap((doc) => {
        const logo = toMedia(doc.logo, alts);
        if (!logo) return [];
        return [
          {
            id: String(doc.id),
            name: doc.name ?? "",
            // The client's name says more to a screen reader than the file's own description.
            logo: { ...logo, alt: doc.name || logo.alt },
            url: doc.url ?? undefined,
            sortOrder: doc.sortOrder,
          },
        ];
      });
    });
    return orPlaceholders(docs, () => [...clientLogos].sort(bySortOrder));
  },
);

export const getTeamMembers = cache(
  async (locale: Locale): Promise<TeamMember[]> => {
    const alts = await englishAlts();
    const docs = await read(`team:${locale}`, async (payload) => {
      const { docs } = await payload.find({
        collection: "team-members",
        locale,
        fallbackLocale: false,
        pagination: false,
        sort: "sortOrder",
        depth: 1,
      });
      return docs
        .filter((doc) => doc.name && doc.role)
        .map((doc) => ({
          id: String(doc.id),
          name: doc.name as string,
          role: doc.role as string,
          photo: toMedia(doc.photo, alts) ?? undefined,
          bio: doc.bio ?? "",
          sortOrder: doc.sortOrder,
        }));
    });
    return orPlaceholders(docs, () => [...teamMembers].sort(bySortOrder));
  },
);

// --- Globals ----------------------------------------------------------------

const readSettings = cache(async (locale: Locale) =>
  read(`settings:${locale}`, (payload) =>
    payload.findGlobal({
      slug: "site-settings",
      locale,
      fallbackLocale: false,
      depth: 0,
    }),
  ),
);

/** Each value on its own: Meliel may fill in the phone number long before the map. */
export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  const doc = await readSettings(locale);
  const placeholder = <T>(value: T, empty: T) =>
    showPlaceholders ? value : empty;
  const text = (value: string | null | undefined, seed: string) =>
    value || placeholder(seed, "");
  const list = <T>(value: T[] | null | undefined, seed: T[]) =>
    value?.length ? value : placeholder(seed, []);

  return {
    phones: list(doc?.phones, siteSettings.phones),
    email: text(doc?.email, siteSettings.email),
    whatsappNumber: text(doc?.whatsappNumber, siteSettings.whatsappNumber),
    telegramUsername: text(
      doc?.telegramUsername,
      siteSettings.telegramUsername,
    ),
    address: text(doc?.address, siteSettings.address),
    officeHours: text(doc?.officeHours, siteSettings.officeHours),
    mapEmbedUrl: doc?.mapEmbedUrl || null,
    socialLinks: list(
      doc?.socialLinks?.map(({ platform, url }) => ({ platform, url })),
      siteSettings.socialLinks,
    ),
    homepageStats: list(
      doc?.homepageStats?.flatMap(({ value, label }) =>
        label ? [{ value, label }] : [],
      ),
      siteSettings.homepageStats,
    ),
  };
}

export async function getInquiryOptions(
  locale: Locale,
): Promise<InquiryOptions> {
  const doc = await readSettings(locale);
  const choices = (
    rows: { id?: string | null; label?: string | null }[] | null | undefined,
  ) =>
    (rows ?? []).flatMap((row) =>
      row.id && row.label ? [{ value: row.id, label: row.label }] : [],
    );
  const placeholders = (labels: string[]) => () =>
    labels.map((label, i) => ({ value: `placeholder-${i}`, label }));
  return {
    budgetRanges: orPlaceholders(
      choices(doc?.budgetRanges),
      placeholders(inquiryOptions.budgetRanges),
    ),
    timelines: orPlaceholders(
      choices(doc?.timelines),
      placeholders(inquiryOptions.timelines),
    ),
  };
}
