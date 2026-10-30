// Site-wide settings from environment variables (see .env.example).

/** Public URL with no trailing slash. Used for canonical URLs, the sitemap and Open Graph. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** The client's design preview: shows the banner and keeps search engines out. */
export const isPreview = process.env.NEXT_PUBLIC_SITE_ENV === "preview";

export const siteName = "Meliel Digital Marketing";
