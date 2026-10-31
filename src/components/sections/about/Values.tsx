import { Card } from "@/components/ui/Card";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { headingText } from "@/content/copy";
import { getI18n } from "@/i18n";

export async function Values() {
  const { t } = await getI18n();
  return (
    <Section aria-labelledby="values-title">
      <Rise>
        <SectionHeading
          id="values-title"
          eyebrow={t.about.valuesEyebrow}
          title={t.about.valuesTitle}
        />
      </Rise>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {t.copy.values.map((value, i) => (
          <li key={value.title}>
            <Rise className="h-full">
              <Card className="h-full p-7">
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {headingText(value.title)}
                </h3>
                <p className="mt-3 text-ink-soft">{value.text}</p>
              </Card>
            </Rise>
          </li>
        ))}
      </ul>
    </Section>
  );
}
