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
import { meaningShort, mission, nameMeaning } from "@/content/copy";
import { getTeamMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: mission,
};

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={nameMeaning.english.title}
        intro={meaningShort}
      />
      <NameMeaning />
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
