import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProcessLadder } from "@/components/sections/ProcessLadder";
import { Sectors } from "@/components/sections/Sectors";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { Hero } from "@/components/sections/home/Hero";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { Stats } from "@/components/sections/home/Stats";
import {
  getClientLogos,
  getProjects,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/data";
import { getI18n } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    title: { absolute: t.meta.homeTitle },
    description: t.copy.valueStatement,
    alternates: alternates("/", locale),
  };
}

export default async function HomePage() {
  const { locale } = await getI18n();
  const [logos, settings, services, featured, testimonials] = await Promise.all(
    [
      getClientLogos(locale),
      getSiteSettings(locale),
      getServices(locale),
      getProjects({ featured: true, limit: 6 }, locale),
      getTestimonials({ featured: true }, locale),
    ],
  );

  return (
    <>
      <Hero />
      <ClientLogos logos={logos} />
      <Stats stats={settings.homepageStats} />
      <Sectors />
      <ServicesOverview services={services} />
      <FeaturedWork projects={featured} />
      <ProcessLadder />
      <Testimonials testimonials={testimonials} />
      <CtaBand />
    </>
  );
}
