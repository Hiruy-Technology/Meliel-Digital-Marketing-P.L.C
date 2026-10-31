import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { projectCta } from "@/lib/navigation";
import { getI18n } from "@/i18n";

type CtaBandProps = {
  title?: string;
  text?: string;
};

// Closing call to action on navy, used at the end of most pages.
// Wording is Hiruy's proposal (not client copy): confirm at the design review.
export async function CtaBand({ title, text }: CtaBandProps) {
  const { t } = await getI18n();
  const cta = projectCta(t);
  return (
    <Section
      tone="navy-deep"
      aria-labelledby="cta-title"
      className="relative overflow-hidden"
    >
      <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <Rise className="max-w-2xl">
          <h2 id="cta-title" className="font-display text-display-sm font-bold">
            {title ?? t.cta.title}
          </h2>
          <p className="mt-5 text-lg text-navy-200">{text ?? t.cta.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={cta.href} size="lg">
              {cta.label}
            </Button>
            <Button href="/contact" variant="on-dark" size="lg">
              {t.common.contactUs}
            </Button>
          </div>
        </Rise>

        {/* Decorative staircase, rising to the right and getting lighter */}
        <div aria-hidden className="hidden items-end gap-3 lg:flex">
          {[1, 2, 3, 4, 5, 6].map((n, i) => (
            <span
              key={n}
              className="block w-8 rounded-[2px]"
              style={
                {
                  height: `${2 + i * 1.75}rem`,
                  background: `var(--color-ladder-${n + 1})`,
                  opacity: 0.35 + i * 0.13,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
