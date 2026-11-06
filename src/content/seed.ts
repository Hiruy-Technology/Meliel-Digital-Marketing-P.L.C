// SEED DATA: the single home of every placeholder on the site.
//
// - Real content from Meliel is verbatim: the 5 services from docs/02-meliel-content.md, and the
//   company profile's contact details, sectors, team and case studies from ./profile.ts.
// - Everything else is "[PLACEHOLDER: …]" until the client sends it (docs/04-open-items.md).
//   Never replace a placeholder with invented clients, numbers, quotes, people or contact details.
// - List every remaining placeholder with: pnpm placeholders
//
// Design phase: pages read this through src/lib/data.ts. Phase 3: the same shapes come from Payload,
// and this file becomes the initial import for the Portfolio Manager.

import type {
  ClientLogo,
  Industry,
  Media,
  Project,
  Service,
  ServiceSlug,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/lib/types";
import {
  caseStudies,
  contact,
  sectors,
  team,
  type CaseStudy,
} from "@/content/profile";

function image(alt: string, width = 1600, height = 900): Media {
  return { url: null, alt, width, height };
}

// ---------------------------------------------------------------------------
// Services (real, from Meliel)
// ---------------------------------------------------------------------------

export const services: Service[] = [
  {
    id: "svc-branding",
    name: "Branding",
    slug: "branding",
    summary:
      "Brand strategy, positioning, logo design, and identity guidelines that ensure consistency across all brand touchpoints.",
    includes: [],
    sortOrder: 1,
  },
  {
    id: "svc-digital-marketing",
    name: "Advanced Digital Marketing",
    slug: "digital-marketing",
    summary:
      "An integrated digital marketing service designed to build brand awareness, attract target audiences, generate leads, and drive measurable business growth.",
    includes: [
      "Digital marketing strategy and planning",
      "Social media management (SMM)",
      "Campaign creation and management",
      "Paid digital advertising",
      "Audience targeting and retargeting",
      "Lead generation and conversion funnels",
      "Digital performance tracking and reporting",
    ],
    sortOrder: 2,
  },
  {
    id: "svc-market-analysis",
    name: "Market Analysis",
    slug: "market-analysis",
    summary:
      "Research into the client's industry, competitors, and target audience to guide positioning, marketing decisions, and campaign strategy.",
    includes: [],
    sortOrder: 3,
  },
  {
    id: "svc-websites",
    name: "Website Creation and Management",
    slug: "websites",
    summary:
      "Design, development, and ongoing management of professional websites that strengthen brand credibility and support customer acquisition.",
    includes: [
      "Website design and development",
      "Mobile-responsive layouts",
      "Website content integration",
      "Website updates and maintenance",
      "Performance monitoring",
      // Verbatim; contract-style wording flagged for the client (plan item B5).
      "SEO, where included in the agreed scope",
    ],
    sortOrder: 4,
  },
  {
    id: "svc-event-production",
    name: "Event Production",
    slug: "event-production",
    summary: "Professional event photography, videography, and live coverage.",
    includes: [],
    sortOrder: 5,
    // Client: "Note: quoted separately according to production requirements." (capitalized here)
    note: "Quoted separately according to production requirements.",
  },
];

// ---------------------------------------------------------------------------
// Industries (real, from the company profile)
// ---------------------------------------------------------------------------

// The sectors from Meliel's company profile (src/content/profile.ts).
export const industries: Industry[] = sectors.map((s) => ({
  id: `ind-${s.slug}`,
  name: s.name,
  slug: s.slug,
}));

// ---------------------------------------------------------------------------
// Portfolio projects: the 8 case studies from the company profile. Challenge, what Meliel
// delivered, photos and videos are still to come (docs/07-content-request.md).
// ---------------------------------------------------------------------------

function service(slug: ServiceSlug): Service {
  const found = services.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown service: ${slug}`);
  return found;
}

function industry(slug: string): Industry {
  const found = industries.find((i) => i.slug === slug);
  if (!found) throw new Error(`Unknown industry: ${slug}`);
  return found;
}

function placeholderProject(
  n: number,
  opts: {
    industry: string;
    services: ServiceSlug[];
    featured: boolean;
    status?: Project["status"];
    videos?: number;
  },
): Project {
  return {
    id: `prj-${n}`,
    title: `[PLACEHOLDER: project ${n} title]`,
    slug: `project-${n}`,
    clientName: `[PLACEHOLDER: project ${n} client name]`,
    industry: industry(opts.industry),
    services: opts.services.map(service),
    featured: opts.featured,
    sortOrder: n,
    status: opts.status ?? "published",
    coverImage: image(`[PLACEHOLDER: project ${n} cover image]`),
    gallery: [
      image(`[PLACEHOLDER: project ${n} gallery image 1]`),
      image(`[PLACEHOLDER: project ${n} gallery image 2]`, 1200, 1500),
      image(`[PLACEHOLDER: project ${n} gallery image 3]`),
      image(`[PLACEHOLDER: project ${n} gallery image 4]`, 1200, 1200),
    ],
    videos: Array.from({ length: opts.videos ?? 1 }, (_, i) => ({
      provider: "youtube" as const,
      url: null,
      title: `[PLACEHOLDER: project ${n} video ${i + 1} title]`,
      thumbnail: image(`[PLACEHOLDER: project ${n} video ${i + 1} thumbnail]`),
    })),
    challenge: [
      `[PLACEHOLDER: project ${n} challenge: the client's situation and goal before working with Meliel]`,
    ],
    delivered: [
      `[PLACEHOLDER: project ${n} what Meliel delivered: strategy, creative work, channels]`,
    ],
    results: [
      `[PLACEHOLDER: project ${n} results, with real numbers from the client]`,
    ],
    resultHighlights: [
      {
        value: "[PLACEHOLDER: result]",
        label: "[PLACEHOLDER: what it measures]",
      },
      {
        value: "[PLACEHOLDER: result]",
        label: "[PLACEHOLDER: what it measures]",
      },
      {
        value: "[PLACEHOLDER: result]",
        label: "[PLACEHOLDER: what it measures]",
      },
    ],
    publishedAt: `2026-10-${String(30 - n).padStart(2, "0")}T00:00:00.000Z`,
  };
}

const caseStudy = (c: CaseStudy, i: number): Project => ({
  id: `prj-${c.slug}`,
  title: c.client,
  slug: c.slug,
  clientName: c.client,
  industry: industry(c.sector),
  services: c.services.map(service),
  featured: c.featured,
  sortOrder: i + 1,
  status: "published",
  // No photos yet: the site shows a branded cover (ProjectCover).
  coverImage: null,
  gallery: [],
  videos: [],
  challenge: [],
  delivered: [],
  results: c.results,
  resultHighlights: c.highlights.map(({ value, label }) => ({ value, label })),
  publishedAt: "2026-11-04T00:00:00.000Z",
});

export const projects: Project[] = [
  ...caseStudies.map(caseStudy),
  // A draft, to prove unpublished projects never appear on the site.
  placeholderProject(99, {
    industry: "healthcare",
    services: ["branding"],
    featured: true,
    status: "draft",
  }),
];

// ---------------------------------------------------------------------------
// Testimonials, client logos, team (pending)
// ---------------------------------------------------------------------------

export const testimonials: Testimonial[] = [1, 2, 3].map((n) => ({
  id: `tst-${n}`,
  quote: `[PLACEHOLDER: testimonial ${n} quote, in the client's own words]`,
  name: `[PLACEHOLDER: testimonial ${n} name]`,
  jobTitle: `[PLACEHOLDER: testimonial ${n} job title]`,
  company: `[PLACEHOLDER: testimonial ${n} company]`,
  photo: image(`[PLACEHOLDER: testimonial ${n} photo]`, 400, 400),
  featured: true,
}));

export const clientLogos: ClientLogo[] = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: `logo-${n}`,
  name: `[PLACEHOLDER: client ${n} name]`,
  logo: image(`[PLACEHOLDER: client ${n} logo]`, 320, 160),
  sortOrder: n,
}));

// From the company profile. Photos and short bios are still to come.
export const teamMembers: TeamMember[] = team.map((m, i) => ({
  id: `team-${i + 1}`,
  name: m.name,
  role: m.role,
  bio: "",
  sortOrder: i + 1,
}));

// ---------------------------------------------------------------------------
// Site settings (pending: contact details, socials, homepage numbers)
// ---------------------------------------------------------------------------

export const siteSettings: SiteSettings = {
  phones: contact.phones,
  email: contact.email,
  whatsappNumber: "[PLACEHOLDER: WhatsApp number]",
  telegramUsername: "[PLACEHOLDER: Telegram username]",
  address: contact.address,
  officeHours: "[PLACEHOLDER: office hours]",
  mapEmbedUrl: null,
  socialLinks: [
    { platform: "facebook", url: "[PLACEHOLDER: Facebook page URL]" },
    { platform: "instagram", url: "[PLACEHOLDER: Instagram profile URL]" },
    { platform: "linkedin", url: "[PLACEHOLDER: LinkedIn page URL]" },
    { platform: "tiktok", url: "[PLACEHOLDER: TikTok profile URL]" },
  ],
  homepageStats: [
    {
      value: "[PLACEHOLDER: number]",
      label: "[PLACEHOLDER: stat 1, e.g. clients served]",
    },
    {
      value: "[PLACEHOLDER: number]",
      label: "[PLACEHOLDER: stat 2, e.g. campaigns delivered]",
    },
    {
      value: "[PLACEHOLDER: number]",
      label: "[PLACEHOLDER: stat 3, e.g. years in business]",
    },
    { value: "[PLACEHOLDER: number]", label: "[PLACEHOLDER: stat 4]" },
  ],
};

// ---------------------------------------------------------------------------
// Inquiry / quote form options (pending from the client)
// ---------------------------------------------------------------------------

export const inquiryOptions: { budgetRanges: string[]; timelines: string[] } = {
  budgetRanges: [
    "[PLACEHOLDER: budget range 1, in ETB]",
    "[PLACEHOLDER: budget range 2, in ETB]",
    "[PLACEHOLDER: budget range 3, in ETB]",
    "[PLACEHOLDER: budget range 4, in ETB]",
  ],
  timelines: [
    "[PLACEHOLDER: timeline option 1]",
    "[PLACEHOLDER: timeline option 2]",
    "[PLACEHOLDER: timeline option 3]",
  ],
};

// ---------------------------------------------------------------------------
// Page copy still missing (moves to copy.ts once the client sends it)
// ---------------------------------------------------------------------------

export const pendingCopy = {
  companyStory: [
    "[PLACEHOLDER: the story behind Meliel: how and why it started]",
  ],
  foundingYear: "[PLACEHOLDER: founding year]",
  /** Privacy Policy details (docs/04-open-items.md). */
  // From the company profile. Address and email are the contact details: to confirm for legal use.
  legalEntityName: contact.legalName,
  legalAddress: contact.address,
  dataContactEmail: contact.email,
  retentionPeriod: "[PLACEHOLDER: how long inquiries are kept]",
  policyDate: "[PLACEHOLDER: date this policy takes effect]",
  /** Shown where the map goes until settings.mapEmbedUrl is set. */
  officeMap: "[PLACEHOLDER: office location map]",
};
