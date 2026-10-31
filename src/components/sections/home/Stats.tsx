import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { headingText } from "@/content/copy";
import type { Stat } from "@/lib/types";
import { RungStats } from "../RungStats";
import { getI18n } from "@/i18n";

// "Results in numbers". Hidden until the client sends real numbers.
export async function Stats({ stats }: { stats: Stat[] }) {
  if (stats.length === 0) return null;
  const { t } = await getI18n();
  // The fourth value is "Measurable impact".
  const measurableImpact = t.copy.values[3];
  return (
    <Section tone="navy" aria-labelledby="stats-title">
      <Rise>
        <SectionHeading
          id="stats-title"
          tone="dark"
          eyebrow={t.home.resultsEyebrow}
          title={headingText(measurableImpact.title)}
          intro={measurableImpact.text}
        />
      </Rise>
      <RungStats stats={stats} className="mt-14 lg:mt-20" />
    </Section>
  );
}
