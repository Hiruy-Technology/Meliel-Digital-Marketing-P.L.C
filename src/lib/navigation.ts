// Site navigation, shared by the header, mobile menu and footer.

import type { Dictionary } from "@/i18n/en";
import { stripLocale } from "@/i18n/config";

export type NavLink = { href: string; label: string };

export const mainNav = (t: Dictionary): NavLink[] => [
  { href: "/work", label: t.nav.work },
  { href: "/services", label: t.nav.services },
  { href: "/about", label: t.nav.about },
  { href: "/contact", label: t.nav.contact },
];

/** The main call to action everywhere: the quote page. */
export const projectCta = (t: Dictionary): NavLink => ({
  href: "/quote",
  label: t.common.startProject,
});

export const footerNav = (t: Dictionary): NavLink[] => [
  { href: "/", label: t.nav.home },
  { href: "/work", label: t.nav.ourWork },
  { href: "/services", label: t.nav.services },
  { href: "/about", label: t.nav.aboutUs },
  { href: "/quote", label: t.nav.getQuote },
  { href: "/contact", label: t.nav.contact },
];

/** True when `pathname` is `href` or a page inside it, in any language. */
export function isActive(pathname: string, href: string): boolean {
  const path = stripLocale(pathname);
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}
