import type { CSSProperties } from "react";

// Scroll progress shown as the Meliel ladder. Decorative only (aria-hidden).
// Animation lives in globals.css (.ladder-step / .ladder-bar), driven by scroll, no JavaScript.

// Bottom to top: 6 rungs, then the small square on top, as in the logo.
const STEPS = [
  { color: "var(--color-ladder-1)", width: "w-3" },
  { color: "var(--color-ladder-2)", width: "w-3" },
  { color: "var(--color-ladder-3)", width: "w-3" },
  { color: "var(--color-ladder-4)", width: "w-3" },
  { color: "var(--color-ladder-5)", width: "w-3" },
  { color: "var(--color-ladder-6)", width: "w-3" },
  { color: "var(--color-ladder-7)", width: "w-1.5" },
];

export function LadderProgress() {
  return (
    <>
      {/* Desktop: vertical ladder at the left edge */}
      <div
        aria-hidden
        className="ladder-progress pointer-events-none fixed top-1/2 left-2.5 z-40 hidden -translate-y-1/2 flex-col-reverse items-center gap-1.5 lg:flex"
      >
        {STEPS.map((step, i) => (
          <span
            key={i}
            className={`ladder-step relative block h-1.5 overflow-hidden rounded-[1px] bg-navy-200/50 ${step.width}`}
            style={{ "--step": i, "--step-color": step.color } as CSSProperties}
          />
        ))}
      </div>

      {/* Mobile and tablet: thin bar across the top */}
      <div
        aria-hidden
        className="ladder-progress pointer-events-none fixed inset-x-0 top-0 z-50 h-1 lg:hidden"
      >
        <span
          className="ladder-bar block h-full origin-left"
          style={{
            background:
              "linear-gradient(to right, var(--color-ladder-1), var(--color-ladder-4), var(--color-ladder-7))",
          }}
        />
      </div>
    </>
  );
}
