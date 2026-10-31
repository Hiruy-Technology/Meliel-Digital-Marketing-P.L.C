import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { am } from "./am";
import { hasLocale, type Locale } from "./config";
import { en, type Dictionary } from "./en";

export { fill } from "./config";

const dictionaries: Record<Locale, Dictionary> = { en, am };

export const getDictionary = (locale: Locale) => dictionaries[locale];

/** The page's language and wording, for any Server Component. */
export async function getI18n() {
  const value = await rootLocale();
  if (!value || !hasLocale(value)) notFound();
  return { locale: value, t: getDictionary(value) };
}
