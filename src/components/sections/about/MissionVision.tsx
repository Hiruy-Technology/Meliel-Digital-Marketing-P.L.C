import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { getI18n } from "@/i18n";

export async function MissionVision() {
  const { t } = await getI18n();
  const items = [
    {
      title: t.about.mission,
      text: t.copy.mission,
      rung: "var(--color-ladder-3)",
    },
    {
      title: t.about.vision,
      text: t.copy.vision,
      rung: "var(--color-ladder-5)",
    },
  ];
  return (
    <Section tone="paper" aria-label={t.about.missionVision}>
      <div className="grid gap-10 md:grid-cols-2 md:gap-8">
        {items.map((item) => (
          <Rise key={item.title}>
            <span
              aria-hidden
              className="block h-2 rounded-[1px]"
              style={{ background: item.rung }}
            />
            <h2 className="mt-6 font-display text-display-sm font-bold">
              {item.title}
            </h2>
            <p className="mt-4 text-lg text-ink-soft">{item.text}</p>
          </Rise>
        ))}
      </div>
    </Section>
  );
}
