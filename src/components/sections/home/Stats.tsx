import type { CSSProperties } from "react";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Value } from "@/components/ui/Value";
import { headingText, values } from "@/content/copy";
import type { Stat } from "@/lib/types";

// "Results in numbers", styled as ladder rungs that step up left to right (and get lighter).
const RUNG_COLORS = [
  "var(--color-ladder-4)",
  "var(--color-ladder-5)",
  "var(--color-ladder-6)",
  "var(--color-ladder-7)",
];

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
      <ol className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:items-end">
        {stats.map((stat, i) => (
          <li
            key={i}
            // Staircase on desktop: each block sits one step higher than the last.
            className="lg:mb-[calc(var(--i)*2rem)]"
            style={{ "--i": i } as CSSProperties}
          >
            <Rise>
              <span
                aria-hidden
                className="block h-2 rounded-[1px]"
                style={{ background: RUNG_COLORS[i % RUNG_COLORS.length] }}
              />
              <p className="mt-6 font-display text-display-sm font-bold text-white">
                {/* Placeholders at normal size, so the layout reads as the real numbers will */}
                <Value
                  value={stat.value}
                  placeholderClassName="text-base! font-normal"
                />
              </p>
              <p className="mt-2 text-navy-200">
                <Value value={stat.label} />
              </p>
            </Rise>
          </li>
        ))}
      </ol>
    </Section>
  );
}
