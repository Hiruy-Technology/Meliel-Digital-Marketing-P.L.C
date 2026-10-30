import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { headingText, values } from "@/content/copy";
import type { Stat } from "@/lib/types";
import { RungStats } from "../RungStats";

// "Results in numbers". Hidden until the client sends real numbers.
const measurableImpact = values.find((v) => v.title === "Measurable impact.")!;

export function Stats({ stats }: { stats: Stat[] }) {
  if (stats.length === 0) return null;
  return (
    <Section tone="navy" aria-labelledby="stats-title">
      <Rise>
        <SectionHeading
          id="stats-title"
          tone="dark"
          eyebrow="Results"
          title={headingText(measurableImpact.title)}
          intro={measurableImpact.text}
        />
      </Rise>
      <RungStats stats={stats} className="mt-14 lg:mt-20" />
    </Section>
  );
}
