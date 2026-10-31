import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/sections/quote/QuoteForm";
import { Container } from "@/components/ui/Container";
import { getInquiryOptions, getServices, isServiceSlug } from "@/lib/data";
import { getI18n } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    title: t.meta.quoteTitle,
    description: t.meta.quoteDescription,
    alternates: alternates("/quote", locale),
  };
}

export default async function QuotePage({
  searchParams,
}: PageProps<"/[locale]/quote">) {
  const { t } = await getI18n();
  const { service } = await searchParams;
  const [services, options] = await Promise.all([
    getServices(),
    getInquiryOptions(),
  ]);
  // ?service= can repeat; unknown values are ignored.
  const initialServices = [...new Set([service].flat().filter(isServiceSlug))];

  return (
    <>
      <PageHero
        eyebrow={t.quote.eyebrow}
        title={t.quote.title}
        intro={t.quote.intro}
      />
      <section className="bg-surface py-12 lg:py-16">
        <Container>
          <QuoteForm
            services={services}
            options={options}
            initialServices={initialServices}
            t={{
              form: t.form,
              errors: t.errors,
              quote: t.quote,
              common: t.common,
            }}
          />
        </Container>
      </section>
    </>
  );
}
