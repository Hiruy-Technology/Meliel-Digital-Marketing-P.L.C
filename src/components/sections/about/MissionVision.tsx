import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { mission, vision } from "@/content/copy";

const ITEMS = [
  { title: "Mission", text: mission, rung: "var(--color-ladder-3)" },
  { title: "Vision", text: vision, rung: "var(--color-ladder-5)" },
];

export function MissionVision() {
  return (
    <Section tone="paper" aria-label="Mission and vision">
      <div className="grid gap-10 md:grid-cols-2 md:gap-8">
        {ITEMS.map((item) => (
          <Rise key={item.title}>
            <span
              aria-hidden
              className="block h-2 rounded-[1px]"
              style={{ background: item.rung }}
            />
            <h2 className="mt-6 font-display text-display-sm font-bold">
              {item.title}
            </h2>
            <p className="mt-4 text-lg text-navy-800">{item.text}</p>
          </Rise>
        ))}
      </div>
    </Section>
  );
}
