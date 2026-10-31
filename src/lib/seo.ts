import type { Metadata } from "next";
import { localePath, type Locale } from "@/i18n/config";

/** Canonical URL for this language, plus the page's address in each language for Google. */
export function alternates(
  path: string,
  locale: Locale,
): Metadata["alternates"] {
  return {
    canonical: localePath(path, locale),
    languages: {
      en: path,
      am: localePath(path, "am"),
      "x-default": path,
    },
  };
}
