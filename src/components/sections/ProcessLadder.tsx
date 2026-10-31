import type { CSSProperties } from "react";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { differentiator, headingText, processSteps } from "@/content/copy";

// "How Meliel works": the 6 steps as a rising staircase, dark to light.
// Desktop: left to right, each step higher. Mobile: a list, top to bottom, still dark to light.
// Used on Home and About.
const STEP_COLORS = [1, 2, 3, 4, 5, 6].map((n) => `var(--color-ladder-${n})`);

export function ProcessLadder({
  intro = differentiator,
}: {
  /** Pass null where the differentiator already appears on the page (About). */
  intro?: string | null;
}) {
  return (
    <Section aria-labelledby="process-title">
      <Rise>
        <SectionHeading
          id="process-title"
          eyebrow="How we work"
          title="Six steps, each one building on the last"
          intro={intro}
        />
      </Rise>

      <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6 lg:items-end lg:gap-5">
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className="lg:mb-[calc(var(--i)*2.75rem)]"
            style={{ "--i": i } as CSSProperties}
          >
            <Rise>
              <span
                aria-hidden
                className="block h-3 rounded-[2px]"
                style={{ background: STEP_COLORS[i] }}
              />
              <p className="mt-5 font-mono text-sm text-ink-muted">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold">
                {headingText(step.title)}
              </h3>
              <p className="mt-2 text-ink-soft">{step.text}</p>
            </Rise>
          </li>
        ))}
      </ol>
    </Section>
  );
}
