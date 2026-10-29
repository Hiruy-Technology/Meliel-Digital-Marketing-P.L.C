// Site navigation, shared by the header, mobile menu and footer.

export type NavLink = { href: string; label: string };

export const mainNav: NavLink[] = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** The main call to action everywhere: the quote page. */
export const projectCta: NavLink = { href: "/quote", label: "Start a Project" };

export const footerNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Our Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/contact", label: "Contact" },
];

/** True when `pathname` is `href` or a page inside it (e.g. /work/project-1 under /work). */
export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
