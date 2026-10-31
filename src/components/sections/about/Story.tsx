import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Value } from "@/components/ui/Value";
import { pendingCopy } from "@/content/seed";
import { getI18n } from "@/i18n";

// Company story: still missing from the client, so these are placeholders from seed.ts.
// Once it arrives, the text moves to copy.ts.
export async function Story() {
  const { t } = await getI18n();
  return (
    <Section aria-labelledby="story-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Rise className="lg:col-span-4">
          <SectionHeading
            id="story-title"
            eyebrow={t.about.storyEyebrow}
            title={t.about.storyTitle}
          />
          <p className="mt-5 text-ink-soft">
            {t.about.founded} <Value value={pendingCopy.foundingYear} />
          </p>
        </Rise>
        <Rise className="space-y-5 text-lg text-ink-soft lg:col-span-8">
          {pendingCopy.companyStory.map((paragraph) => (
            <p key={paragraph}>
              <Value value={paragraph} />
            </p>
          ))}
        </Rise>
      </div>
    </Section>
  );
}
