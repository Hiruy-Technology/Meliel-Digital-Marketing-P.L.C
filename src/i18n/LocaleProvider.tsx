"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "./config";

const LocaleContext = createContext<Locale>(defaultLocale);

/** Gives client components the page's language. Set once, in the root layout. */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
