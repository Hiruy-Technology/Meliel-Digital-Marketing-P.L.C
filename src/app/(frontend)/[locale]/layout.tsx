import type { Metadata } from "next";
import clsx from "clsx";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { LadderProgress } from "@/components/ui/LadderProgress";
import { inter, notoEthiopicFull, sora } from "@/lib/fonts";
import { gaMeasurementId, isPreview, siteUrl } from "@/lib/site";
import { Analytics } from "@/components/layout/Analytics";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { themeScript } from "@/lib/theme";
import "../../globals.css";
import { getI18n } from "@/i18n";
import { amharicApproved, locales } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getSiteSettings } from "@/lib/data";
import { jsonLd, organizationLd } from "@/lib/json-ld";

// A safety net: saving in /admin refreshes pages straight away (src/fields/revalidate.ts).
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  const { siteName } = t.meta;
  // The design preview and any unreviewed Amharic stay out of search results.
  const hidden = isPreview || (locale === "am" && !amharicApproved);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    openGraph: {
      siteName,
      type: "website",
      locale: locale === "am" ? "am_ET" : "en_US",
    },
    twitter: { card: "summary_large_image" },
    ...(hidden ? { robots: { index: false, follow: false } } : {}),
    // Search Console ownership check, from Meliel's Google account.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    }),
    // Fallback description; each page sets its own.
    description: t.copy.valueStatement,
  };
}

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const { locale, t } = await getI18n();
  const settings = await getSiteSettings(locale);
  return (
    <html
      lang={locale}
      // The theme script sets data-theme before React loads.
      suppressHydrationWarning
      className={clsx(
        sora.variable,
        inter.variable,
        locale === "am" && notoEthiopicFull.variable,
        "h-full antialiased",
      )}
    >
      <head>
        {/* Sets the theme before the first paint, so there's no flash of the wrong one. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(organizationLd(locale, t, settings)),
          }}
        />
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
          {gaMeasurementId && (
            <>
              <ConsentBanner t={t.consent} />
              <Analytics measurementId={gaMeasurementId} />
            </>
          )}
        </LocaleProvider>
      </body>
    </html>
  );
}
