import clsx from "clsx";
import type { CSSProperties } from "react";
import { Rise } from "@/components/ui/Rise";
import { Value } from "@/components/ui/Value";
import type { Stat } from "@/lib/types";

// Numbers styled as ladder rungs that step up left to right (and get lighter), for navy
// sections. Used for Home's results and each project's result highlights.
const RUNG_COLORS = [
  "var(--color-ladder-4)",
  "var(--color-ladder-5)",
  "var(--color-ladder-6)",
  "var(--color-ladder-7)",
];

const COLUMNS = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

export function RungStats({
  stats,
  columns = 4,
  className,
}: {
  stats: Stat[];
  columns?: keyof typeof COLUMNS;
  className?: string;
}) {
  return (
    <ol
      className={clsx(
        "grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:items-end",
        COLUMNS[columns],
        className,
      )}
    >
      {stats.map((stat, i) => (
        <li
          key={i}
          // Staircase on desktop: each block sits one step higher than the last.
          className="lg:mb-[calc(var(--i)*2rem)]"
          style={{ "--i": i } as CSSProperties}
        >
          <Rise>
            <span
              aria-hidden
              className="block h-2 rounded-[1px]"
              style={{ background: RUNG_COLORS[i % RUNG_COLORS.length] }}
            />
            <p className="mt-6 font-display text-display-sm font-bold text-white">
              {/* Placeholders at normal size, so the layout reads as the real numbers will */}
              <Value
                value={stat.value}
                placeholderClassName="text-base! font-normal"
              />
            </p>
            <p className="mt-2 text-navy-200">
              <Value value={stat.label} />
            </p>
          </Rise>
        </li>
      ))}
    </ol>
  );
}
