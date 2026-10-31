import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getI18n } from "@/i18n";

export async function Differentiator() {
  const { t } = await getI18n();
  return (
    <Section tone="navy" aria-labelledby="different-title">
      <Rise>
        <SectionHeading
          id="different-title"
          tone="dark"
          eyebrow={t.about.differentEyebrow}
          title={t.copy.differentiatorLead}
          intro={t.copy.differentiatorDetail}
        />
      </Rise>
    </Section>
  );
}
