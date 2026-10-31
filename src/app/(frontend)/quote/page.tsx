import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/sections/quote/QuoteForm";
import { Container } from "@/components/ui/Container";
import { getInquiryOptions, getServices, isServiceSlug } from "@/lib/data";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Choose the services you need from Meliel Digital Marketing, share your budget and timeline, and request a quote.",
  alternates: { canonical: "/quote" },
};

export default async function QuotePage({ searchParams }: PageProps<"/quote">) {
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
        eyebrow="Get a quote"
        title="Tell us what you need"
        intro="Choose the services you’re interested in, share your budget and timeline, and we’ll come back with a quote."
      />
      <section className="bg-surface py-12 lg:py-16">
        <Container>
          <QuoteForm
            services={services}
            options={options}
            initialServices={initialServices}
          />
        </Container>
      </section>
    </>
  );
}
