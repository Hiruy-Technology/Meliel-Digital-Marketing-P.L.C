import type { Metadata } from "next";
import clsx from "clsx";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { LadderProgress } from "@/components/ui/LadderProgress";
import { inter, sora } from "@/lib/fonts";
import { isPreview, siteName, siteUrl } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import "../../globals.css";
import { getI18n } from "@/i18n";
import { locales } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/LocaleProvider";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    openGraph: { siteName, type: "website", locale: "en_US" },
    // Extra safeguard on top of robots.txt: the design preview stays out of search results.
    ...(isPreview ? { robots: { index: false, follow: false } } : {}),
    // Fallback description; each page sets its own.
    description: t.copy.valueStatement,
  };
}

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const { locale, t } = await getI18n();
  return (
    <html
      lang={locale}
      // The theme script sets data-theme before React loads.
      suppressHydrationWarning
      className={clsx(sora.variable, inter.variable, "h-full antialiased")}
    >
      <head>
        {/* Sets the theme before the first paint, so there's no flash of the wrong one. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-sm bg-orange-500 px-4 py-3 font-display font-semibold text-navy-900 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.common.skipToContent}
        </a>
        <LocaleProvider locale={locale}>
          <PreviewBanner />
          <Header />
          {/* Pages render their sections directly; this is the page's only <main>. */}
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <FloatingContact />
          <LadderProgress />
        </LocaleProvider>
      </body>
    </html>
  );
}
