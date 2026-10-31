import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { isPreview } from "@/lib/site";
import { getI18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    title: t.meta.thankYouTitle,
    // A confirmation page has no value in search results.
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage({
  searchParams,
}: PageProps<"/[locale]/contact/thank-you">) {
  const { t } = await getI18n();
  const { type } = await searchParams;
  const isQuote = type === "quote";

  return (
    <Section tone="paper" className="flex min-h-[70vh] items-center">
      <div className="max-w-2xl">
        <p className="flex items-center gap-3 font-display text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          <span aria-hidden className="h-1 w-6 rounded-[1px] bg-orange-500" />
          {isQuote ? t.thankYou.quoteEyebrow : t.thankYou.messageEyebrow}
        </p>
        <h1 className="mt-5 font-display text-display font-bold">
          {t.thankYou.title}
        </h1>
        <p className="mt-6 text-lg text-ink-soft">
          {isQuote ? t.thankYou.quoteText : t.thankYou.messageText}
        </p>
        {isPreview && (
          <p className="mt-4 rounded-sm bg-orange-50 p-3 text-sm text-navy-900">
            {t.preview.formsOff}
          </p>
        )}
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/work" size="lg">
            {t.common.seeOurWork}
          </Button>
          <Button href="/" variant="outline" size="lg">
            {t.common.backToHome}
          </Button>
        </div>
      </div>
    </Section>
  );
}
