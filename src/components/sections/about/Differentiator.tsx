import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { differentiatorDetail, differentiatorLead } from "@/content/copy";

export function Differentiator() {
  return (
    <Section tone="navy" aria-labelledby="different-title">
      <Rise>
        <SectionHeading
          id="different-title"
          tone="dark"
          eyebrow="What makes Meliel different"
          title={differentiatorLead}
          intro={differentiatorDetail}
        />
      </Rise>
    </Section>
  );
}
