import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessLadder } from "@/components/sections/ProcessLadder";
import { Differentiator } from "@/components/sections/about/Differentiator";
import { MissionVision } from "@/components/sections/about/MissionVision";
import { NameMeaning } from "@/components/sections/about/NameMeaning";
import { Story } from "@/components/sections/about/Story";
import { Team } from "@/components/sections/about/Team";
import { Values } from "@/components/sections/about/Values";
import { getTeamMembers } from "@/lib/data";
import { notoEthiopic } from "@/lib/font-ethiopic";
import { getI18n } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    title: t.meta.aboutTitle,
    description: t.copy.mission,
    alternates: alternates("/about", locale),
  };
}

export default async function AboutPage() {
  const { t } = await getI18n();
  const team = await getTeamMembers();

  return (
    <>
      <PageHero
        eyebrow={t.about.eyebrow}
        title={t.copy.nameMeaning.english.title}
        intro={t.copy.meaningShort}
      />
      <div className={notoEthiopic.variable}>
        <NameMeaning />
      </div>
      <Story />
      <MissionVision />
      <Values />
      <Differentiator />
      <Team members={team} />
      <ProcessLadder intro={null} />
      <CtaBand />
    </>
  );
}
