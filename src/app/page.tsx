import { CtaBand } from "@/components/sections/CtaBand";
import { ProcessLadder } from "@/components/sections/ProcessLadder";
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

export default async function HomePage() {
  const [logos, settings, services, featured, testimonials] = await Promise.all(
    [
      getClientLogos(),
      getSiteSettings(),
      getServices(),
      getProjects({ featured: true, limit: 6 }),
      getTestimonials({ featured: true }),
    ],
  );

  return (
    <>
      <Hero />
      <ClientLogos logos={logos} />
      <Stats stats={settings.homepageStats} />
      <ServicesOverview services={services} />
      <FeaturedWork projects={featured} />
      <ProcessLadder />
      <Testimonials testimonials={testimonials} />
      <CtaBand />
    </>
  );
}
