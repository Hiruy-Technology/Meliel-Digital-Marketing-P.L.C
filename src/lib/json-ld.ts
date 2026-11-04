// Structured data (JSON-LD) that tells Google who Meliel is and what each project is. Only real
// values go in: a placeholder or an empty setting is left out, never guessed.

import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";
import { externalHref } from "./contact";
import { isPlaceholder } from "./placeholder";
import { siteUrl } from "./site";
import type { Project, SiteSettings } from "./types";

const real = (value: string | null | undefined) =>
  value && !isPlaceholder(value) ? value : undefined;

const ORGANIZATION_ID = `${siteUrl}/#organization`;

/** Safe inside a <script> tag: no value can close the tag early (as the Next.js docs require). */
export const jsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

/**
 * The business on every page. It becomes a ProfessionalService (a LocalBusiness, which Google
 * shows with the address) only once Meliel has entered a real address.
 */
export function organizationLd(
  locale: Locale,
  t: Dictionary,
  settings: SiteSettings,
) {
  const address = real(settings.address);
  const phone = settings.phones.map(real).find(Boolean);
  const sameAs = settings.socialLinks
    .map((link) => (real(link.url) ? externalHref(link.url) : null))
    .filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": address ? "ProfessionalService" : "Organization",
    "@id": ORGANIZATION_ID,
    name: "Meliel Digital Marketing",
    alternateName: "መልዕል ዲጂታል ማርኬቲንግ",
    url: `${siteUrl}${localePath("/", locale)}`,
    logo: `${siteUrl}/brand/logo.svg`,
    description: t.copy.valueStatement,
    ...(sameAs.length > 0 && { sameAs }),
    ...(real(settings.email) && { email: settings.email }),
    ...(phone && { telephone: phone }),
    ...(address && {
      image: `${siteUrl}/brand/logo.svg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality: "Addis Ababa",
        addressCountry: "ET",
      },
    }),
  };
}

/** A project page. `null` while the project is placeholder content. */
export function projectLd(
  locale: Locale,
  project: Project,
  description: string | undefined,
) {
  if (!real(project.title) || !real(project.clientName)) return null;
  const image = project.coverImage.url;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    url: `${siteUrl}${localePath(`/work/${project.slug}`, locale)}`,
    inLanguage: locale,
    creator: { "@id": ORGANIZATION_ID },
    about: { "@type": "Organization", name: project.clientName },
    datePublished: project.publishedAt,
    ...(description && { description }),
    ...(image && {
      image: image.startsWith("http") ? image : `${siteUrl}${image}`,
    }),
    keywords: project.services.map((s) => s.name).join(", "),
  };
}
