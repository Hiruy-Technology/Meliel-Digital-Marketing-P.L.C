import clsx from "clsx";
import type { Project } from "@/lib/types";

// Lowest rung first, as in the logo. Fixed colors: the cover is navy in both themes.
const LADDER = [
  "bg-[#1d3959]",
  "bg-[#2b4c6d]",
  "bg-[#355b7d]",
  "bg-[#406b8f]",
  "bg-[#5983a5]",
  "bg-[#7aa3c1]",
  "bg-[#99c3de]",
];

/**
 * Stands in for a project's cover photo until Meliel adds one: the client and the headline result
 * on navy, with the ladder, in the same style as the sharing images. Decorative: the same text is
 * on the card or page around it, so screen readers skip it.
 */
export function ProjectCover({
  project,
  size = "card",
  className,
}: {
  project: Project;
  size?: "card" | "large";
  className?: string;
}) {
  const highlight = project.resultHighlights[0];
  const large = size === "large";
  return (
    <div
      aria-hidden
      className={clsx(
        "relative flex w-full overflow-hidden rounded-sm bg-navy-950 text-white",
        large ? "p-8 sm:p-14" : "p-6",
        className,
      )}
    >
      <div className="relative z-10 flex min-w-0 flex-col justify-between">
        <p
          className={clsx(
            "font-display leading-tight font-semibold text-ice-300",
            large ? "text-lg sm:text-2xl" : "text-sm",
          )}
        >
          {project.clientName}
        </p>
        {highlight && (
          <p className="font-display leading-none font-bold">
            <span
              className={clsx(
                "block text-orange-500",
                large ? "text-6xl sm:text-8xl" : "text-5xl",
              )}
            >
              {highlight.value}
            </span>
            <span
              className={clsx(
                "mt-2 block font-medium text-white/80",
                large ? "text-lg sm:text-2xl" : "text-sm",
              )}
            >
              {highlight.label}
            </span>
          </p>
        )}
      </div>
      <div
        className={clsx(
          "absolute top-1/2 flex -translate-y-1/2 flex-col-reverse items-center",
          large ? "right-8 gap-3 sm:right-14 sm:gap-4" : "right-6 gap-2",
        )}
      >
        {LADDER.map((color, i) => (
          <span
            key={color}
            className={clsx(
              color,
              large ? "h-5 sm:h-7" : "h-3",
              i === LADDER.length - 1
                ? large
                  ? "w-8 sm:w-12"
                  : "w-6"
                : large
                  ? "w-20 sm:w-32"
                  : "w-14",
            )}
          />
        ))}
      </div>
    </div>
  );
}
