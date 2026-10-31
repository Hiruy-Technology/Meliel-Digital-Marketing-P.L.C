import { MediaImage } from "@/components/ui/MediaImage";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Value } from "@/components/ui/Value";
import type { TeamMember } from "@/lib/types";
import { getI18n } from "@/i18n";

// Optional section: hidden entirely if the client doesn't send team details.
export async function Team({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;
  const { t } = await getI18n();
  return (
    <Section tone="paper" aria-labelledby="team-title">
      <Rise>
        <SectionHeading
          id="team-title"
          eyebrow={t.about.teamEyebrow}
          title={t.about.teamTitle}
        />
      </Rise>
      <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <li key={member.id}>
            <Rise>
              {member.photo && (
                <MediaImage
                  media={member.photo}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              )}
              <h3 className="mt-4 font-display text-lg font-semibold">
                <Value value={member.name} />
              </h3>
              <p className="mt-1 text-sm font-medium text-ink-muted">
                <Value value={member.role} />
              </p>
              <p className="mt-3 text-ink-soft">
                <Value value={member.bio} />
              </p>
            </Rise>
          </li>
        ))}
      </ul>
    </Section>
  );
}
