"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localePath } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";

// Internal link that stays in the current language: on an Amharic page, "/work" goes to "/am/work".
// Use this instead of next/link everywhere on the public site.
export function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return (
    <NextLink
      href={typeof href === "string" ? localePath(href, locale) : href}
      {...props}
    />
  );
}
