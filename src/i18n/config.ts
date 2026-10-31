// The site's languages. English lives at the plain URLs, Amharic under /am (see src/proxy.ts).

export const locales = ["en", "am"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Adds the language prefix to an internal path: ("/work", "am") → "/am/work". */
export function localePath(path: string, locale: Locale): string {
  if (locale === defaultLocale || !path.startsWith("/")) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Fills {name} slots in a wording string. */
export function fill(
  text: string,
  values: Record<string, string | number>,
): string {
  return text.replace(/\{(\w+)\}/g, (slot, key) =>
    key in values ? String(values[key]) : slot,
  );
}

/** Removes the language prefix: "/am/work" → "/work". */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(am|en)(?=\/|$)/, "");
  return stripped || "/";
}
