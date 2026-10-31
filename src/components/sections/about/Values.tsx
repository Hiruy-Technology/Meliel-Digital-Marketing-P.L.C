import { Card } from "@/components/ui/Card";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { headingText, values } from "@/content/copy";

export function Values() {
  return (
    <Section aria-labelledby="values-title">
      <Rise>
        <SectionHeading
          id="values-title"
          eyebrow="Values"
          title="What we stand for"
        />
      </Rise>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {values.map((value, i) => (
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
