import type { Metadata } from "next";
import { Link } from "@/components/ui/Link";
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
import { getI18n } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    title: t.meta.contactTitle,
    description: t.meta.contactDescription,
    alternates: alternates("/contact", locale),
  };
}

export default async function ContactPage({
  searchParams,
}: PageProps<"/[locale]/contact">) {
  const { t } = await getI18n();
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
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        intro={t.contact.intro}
      />

      <section
        aria-label={t.contact.region}
        className="bg-surface py-12 lg:py-16"
      >
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Link
              href="/quote"
              className="group mb-8 flex items-center justify-between gap-4 rounded-sm border-2 border-ink p-4 font-display font-semibold text-ink hover:bg-tint"
            >
              {t.contact.quoteLink}
              <Icon
                name="arrow-right"
                className="size-5 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <ContactForm
              services={services}
              options={options}
              initialService={initialService}
              t={{ form: t.form, errors: t.errors, contact: t.contact }}
            />
          </div>
          <div className="lg:col-span-5">
            <ContactMethods settings={settings} />
          </div>
        </Container>
      </section>

      <section
        aria-label={t.contact.location}
        className="bg-surface pb-16 lg:pb-24"
      >
        <Container>
          <MapFacade
            url={settings.mapEmbedUrl}
            pendingLabel={pendingCopy.officeMap}
            title={t.contact.mapTitle}
            showLabel={t.contact.showMap}
          />
        </Container>
      </section>
    </>
  );
}
