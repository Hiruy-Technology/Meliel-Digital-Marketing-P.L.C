import clsx from "clsx";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Small label above the heading. */
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Use on navy sections. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  /** id for aria-labelledby on the section. */
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={clsx(
            "flex items-center gap-3 font-display text-xs font-semibold tracking-[0.16em] uppercase",
            align === "center" && "justify-center",
            dark ? "text-ice-300" : "text-accent",
          )}
        >
          {/* A single orange rung marks every section label */}
          <span aria-hidden className="h-1 w-6 rounded-[1px] bg-orange-500" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="mt-4 font-display text-display-sm font-bold">
        {title}
      </h2>
      {intro && (
        <div
          className={clsx(
            "mt-5 text-lg",
            dark ? "text-navy-200" : "text-ink-soft",
          )}
        >
          {intro}
        </div>
      )}
    </div>
  );
}
