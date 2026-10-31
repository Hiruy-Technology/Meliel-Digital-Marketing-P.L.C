"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { localePath, stripLocale } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";

type LanguageSwitcherProps = {
  /** Spoken label for screen readers, in the current language. */
  label: string;
};

function Switch({ label, query }: LanguageSwitcherProps & { query: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === "am" ? "en" : "am";
  const path = localePath(stripLocale(pathname), target);

  // A plain link, not client navigation: the two languages load different fonts and <html lang>.
  return (
    <a
      href={query ? `${path}?${query}` : path}
      hrefLang={target}
      lang={target}
      className="inline-flex h-11 min-w-11 items-center justify-center rounded-sm px-2 font-display text-sm font-semibold text-ink hover:bg-tint"
    >
      {/* Spoken name includes the visible text, so voice control can find it too. */}
      <span className="sr-only">{label}: </span>
      {target === "am" ? "አማ" : "EN"}
    </a>
  );
}

// Keeps filters and other URL details when switching, e.g. /work?service=branding.
function WithQuery({ label }: LanguageSwitcherProps) {
  const query = useSearchParams().toString();
  return <Switch label={label} query={query} />;
}

// Reading the URL query needs Suspense so static pages stay static.
export function LanguageSwitcher({ label }: LanguageSwitcherProps) {
  return (
    <Suspense fallback={<Switch label={label} query="" />}>
      <WithQuery label={label} />
    </Suspense>
  );
}
