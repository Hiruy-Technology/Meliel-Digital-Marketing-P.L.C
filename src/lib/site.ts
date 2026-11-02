// Site-wide settings from environment variables (see .env.example).

/** Public URL with no trailing slash. Used for canonical URLs, the sitemap and Open Graph. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** The client's design preview: shows the banner and keeps search engines out. */
export const isPreview = process.env.NEXT_PUBLIC_SITE_ENV === "preview";

/**
 * Placeholders for content the client hasn't sent, on dev and preview builds only. Anything else,
 * including a missing variable, counts as production, so they can never reach the live site.
 */
/** Tag on every cached CMS query. Saving in /admin clears it (src/fields/revalidate.ts). */
export const CMS_TAG = "cms";

export const showPlaceholders =
  process.env.NEXT_PUBLIC_SITE_ENV === "development" || isPreview;
