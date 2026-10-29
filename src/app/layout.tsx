import type { Metadata } from "next";
import clsx from "clsx";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { LadderProgress } from "@/components/ui/LadderProgress";
import { inter, notoEthiopic, sora } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Meliel Digital Marketing",
    template: "%s | Meliel Digital Marketing",
  },
  // Client copy (docs/02-meliel-content.md). Per-page descriptions come in step 9.
  description:
    "We help businesses and brands communicate their value, stand out in competitive markets, connect with the right audiences, and turn opportunities into measurable growth.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={clsx(
        sora.variable,
        inter.variable,
        notoEthiopic.variable,
        "h-full antialiased",
      )}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-sm bg-orange-500 px-4 py-3 font-display font-semibold text-navy-900 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <PreviewBanner />
        <Header />
        {/* Pages render their sections directly; this is the page's only <main>. */}
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <LadderProgress />
      </body>
    </html>
  );
}
