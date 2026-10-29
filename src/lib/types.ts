// Content types for the public site. They mirror the Payload collections in CLAUDE.md
// ("Payload data model"), in the shape pages receive them: relationships already resolved.
// Design phase: filled from src/content/seed.ts. Phase 3: filled from Payload by src/lib/data.ts.

/** The 5 services. Also the portfolio "service" filter and the /services#anchor ids. */
export type ServiceSlug =
  | "branding"
  | "digital-marketing"
  | "market-analysis"
  | "websites"
  | "event-production";

/** An image. `url: null` means not provided yet: render a PlaceholderImage using `alt` as its label. */
export type Media = {
  url: string | null;
  /** Required, like the CMS field. */
  alt: string;
  width: number;
  height: number;
};

/** Paragraphs of text. Payload stores rich text; the data layer converts it to this shape. */
export type RichText = string[];

export type Service = {
  id: string;
  name: string;
  slug: ServiceSlug;
  summary: string;
  /** "Includes" list. Empty for services where Meliel gave no list. */
  includes: string[];
  sortOrder: number;
  /** e.g. Event Production's pricing note. */
  note?: string;
};

export type Industry = {
  id: string;
  name: string;
  slug: string;
};

export type Video = {
  provider: "youtube" | "vimeo" | "upload";
  /** `null` until the client sends it. */
  url: string | null;
  title: string;
  /** Poster image for the click-to-load facade. */
  thumbnail: Media;
};

export type ResultHighlight = {
  /** e.g. "+240%" */
  value: string;
  /** e.g. "Instagram reach" */
  label: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  industry: Industry;
  services: Service[];
  featured: boolean;
  sortOrder: number;
  status: "draft" | "published";
  coverImage: Media;
  gallery: Media[];
  videos: Video[];
  challenge: RichText;
  delivered: RichText;
  results: RichText;
  resultHighlights: ResultHighlight[];
  /** ISO date */
  publishedAt: string;
  // `aiNotes` exists in the CMS but is admin-only, so it is never part of public data.
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  jobTitle: string;
  company: string;
  photo?: Media;
  featured: boolean;
};

export type ClientLogo = {
  id: string;
  name: string;
  logo: Media;
  url?: string;
  sortOrder: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo?: Media;
  bio: string;
  sortOrder: number;
};

export type Stat = {
  value: string;
  label: string;
};

export type SocialLink = {
  platform:
    | "facebook"
    | "instagram"
    | "linkedin"
    | "tiktok"
    | "x"
    | "youtube"
    | "telegram";
  url: string;
};

/** Global "SiteSettings" in Payload. */
export type SiteSettings = {
  phones: string[];
  email: string;
  /** International format without "+" or spaces, as wa.me links need it, e.g. 2519XXXXXXXX. */
  whatsappNumber: string;
  /** Without "@". */
  telegramUsername: string;
  address: string;
  officeHours: string;
  mapEmbedUrl: string | null;
  socialLinks: SocialLink[];
  homepageStats: Stat[];
};

/** Choices offered by the inquiry and quote forms. */
export type InquiryOptions = {
  budgetRanges: string[];
  timelines: string[];
};

/** One form submission. Stored in the Inquiries collection from phase 3. */
export type Inquiry = {
  type: "general" | "quote";
  name: string;
  company?: string;
  email: string;
  phone?: string;
  services: ServiceSlug[];
  /** The "includes" items ticked on the quote page. */
  selectedIncludes: string[];
  budget?: string;
  timeline?: string;
  message?: string;
  /** ISO date */
  createdAt: string;
};
