import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactMethods } from "@/components/sections/contact/ContactMethods";
import { MapFacade } from "@/components/sections/contact/MapFacade";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { pendingCopy } from "@/content/seed";
import {
  getInquiryOptions,
  getServices,
  getSiteSettings,
  isServiceSlug,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Meliel Digital Marketing in Addis Ababa by form, phone, email, WhatsApp, or Telegram.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const { service } = await searchParams;
  const [services, options, settings] = await Promise.all([
    getServices(),
    getInquiryOptions(),
    getSiteSettings(),
  ]);
  const requested = [service].flat()[0];
  const initialService = isServiceSlug(requested) ? requested : "";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk"
        intro="Send us a message or reach us directly, whichever is easiest for you."
      />

      <section
        aria-label="Contact Meliel"
        className="bg-surface py-12 lg:py-16"
      >
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Link
              href="/quote"
              className="group mb-8 flex items-center justify-between gap-4 rounded-sm border-2 border-ink p-4 font-display font-semibold text-ink hover:bg-tint"
            >
              Know which services you need? Get a quote
              <Icon
                name="arrow-right"
                className="size-5 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <ContactForm
              services={services}
              options={options}
              initialService={initialService}
            />
          </div>
          <div className="lg:col-span-5">
            <ContactMethods settings={settings} />
          </div>
        </Container>
      </section>

      <section
        aria-label="Office location"
        className="bg-surface pb-16 lg:pb-24"
      >
        <Container>
          <MapFacade
            url={settings.mapEmbedUrl}
            pendingLabel={pendingCopy.officeMap}
          />
        </Container>
      </section>
    </>
  );
}
