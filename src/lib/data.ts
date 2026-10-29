// DATA LAYER: the only way pages get CMS content.
// Design phase: reads src/content/seed.ts. Phase 3: these functions query Payload instead,
// with the same names and return types, so pages and components don't change.
// Everything is async now so that swap needs no changes at the call sites.

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
import type {
  ClientLogo,
  Industry,
  InquiryOptions,
  Project,
  Service,
  ServiceSlug,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "./types";

const bySortOrder = <T extends { sortOrder: number }>(a: T, b: T) =>
  a.sortOrder - b.sortOrder;

const published = () =>
  projects.filter((p) => p.status === "published").sort(bySortOrder);

// --- Services -------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  return [...services].sort(bySortOrder);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return services.find((s) => s.slug === slug) ?? null;
}

/** Type guard for values from URLs, e.g. /quote?service=branding. */
export function isServiceSlug(value: unknown): value is ServiceSlug {
  return typeof value === "string" && services.some((s) => s.slug === value);
}

// --- Industries -----------------------------------------------------------

/** Industries that have at least one published project (so filters never lead to an empty list). */
export async function getIndustries(): Promise<Industry[]> {
  const used = new Set(published().map((p) => p.industry.slug));
  return industries.filter((i) => used.has(i.slug));
}

// --- Projects -------------------------------------------------------------

export type ProjectFilter = {
  /** Service slug. Unknown values are ignored. */
  service?: string;
  /** Industry slug. Unknown values are ignored. */
  industry?: string;
  featured?: boolean;
  limit?: number;
};

/** Published projects only, in the order Meliel set (sortOrder). */
export async function getProjects(
  filter: ProjectFilter = {},
): Promise<Project[]> {
  const { service, industry, featured, limit } = filter;
  let list = published();
  if (service && isServiceSlug(service)) {
    list = list.filter((p) => p.services.some((s) => s.slug === service));
  }
  if (industry && industries.some((i) => i.slug === industry)) {
    list = list.filter((p) => p.industry.slug === industry);
  }
  if (featured !== undefined) {
    list = list.filter((p) => p.featured === featured);
  }
  return limit ? list.slice(0, limit) : list;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return published().find((p) => p.slug === slug) ?? null;
}

/** For "previous / next project" links. Wraps around at the ends. */
export async function getAdjacentProjects(
  slug: string,
): Promise<{ previous: Project | null; next: Project | null }> {
  const list = published();
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1 || list.length < 2) return { previous: null, next: null };
  return {
    previous: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}

/** All published slugs, for generateStaticParams on /work/[slug]. */
export async function getProjectSlugs(): Promise<string[]> {
  return published().map((p) => p.slug);
}

// --- Testimonials, logos, team ---------------------------------------------

export async function getTestimonials(
  filter: { featured?: boolean } = {},
): Promise<Testimonial[]> {
  return filter.featured === undefined
    ? [...testimonials]
    : testimonials.filter((t) => t.featured === filter.featured);
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  return [...clientLogos].sort(bySortOrder);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return [...teamMembers].sort(bySortOrder);
}

// --- Globals ----------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function getInquiryOptions(): Promise<InquiryOptions> {
  return inquiryOptions;
}
