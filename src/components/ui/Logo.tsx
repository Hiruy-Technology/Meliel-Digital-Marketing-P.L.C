import clsx from "clsx";

// Interim redraw of Meliel's v1 logo on a 33 x 20 grid (1 unit = 10 SVG units).
// Replace with the client's vector file when it arrives (docs/04-open-items.md).
// The static files in public/brand/ use the same geometry.
const LETTERS = [
  "M0 0H50V20H110V180H60V40H50V200H0Z M20 20V180H30V20Z M80 40V160H90V40Z",
  "M120 20H170V0H190V200H170V40H140V120H160V200H120Z M140 130V190H150V130Z",
  "M260 20H310V0H330V200H310V40H280V120H300V200H260Z M280 130V190H290V130Z",
];

// Ladder pieces from top (square) to bottom rung, with the logo's colors.
const LADDER = [
  { x: 215, y: 0, w: 20, color: "var(--color-ladder-7)" },
  { x: 200, y: 30, w: 50, color: "var(--color-ladder-6)" },
  { x: 200, y: 60, w: 50, color: "var(--color-ladder-5)" },
  { x: 200, y: 90, w: 50, color: "var(--color-ladder-4)" },
  { x: 200, y: 120, w: 50, color: "var(--color-ladder-3)" },
  { x: 200, y: 150, w: 50, color: "var(--color-ladder-2)" },
  { x: 200, y: 180, w: 50, color: "var(--color-ladder-1)" },
];

type LogoProps = {
  /**
   * "color": full-color logo, navy name text (light backgrounds).
   * "color-on-dark": full-color logo, white name text (navy backgrounds).
   * "white": single-color white logo (dark backgrounds, photos).
   */
  variant?: "color" | "color-on-dark" | "white";
  /** Show "Meliel Digital Marketing" in Latin text next to the wordmark. */
  withName?: boolean;
  className?: string;
};

export function Logo({
  variant = "color",
  withName = false,
  className,
}: LogoProps) {
  const white = variant === "white";
  const onDark = variant !== "color";

  const mark = (
    <svg
      viewBox="0 0 330 200"
      className="h-full w-auto shrink-0"
      {...(withName
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "Meliel" })}
    >
      <g
        fill={white ? "#ffffff" : "var(--color-orange-500)"}
        fillRule="evenodd"
      >
        {LETTERS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {LADDER.map((r) => (
        <rect
          key={r.y}
          x={r.x}
          y={r.y}
          width={r.w}
          height={20}
          fill={white ? "#ffffff" : r.color}
        />
      ))}
    </svg>
  );

  if (!withName) {
    return <span className={clsx("inline-flex h-10", className)}>{mark}</span>;
  }

  return (
    <span className={clsx("inline-flex h-10 items-center gap-3", className)}>
      {mark}
      <span
        className={clsx(
          "flex flex-col justify-center border-l pl-3 font-display leading-none",
          onDark
            ? "border-white/30 text-white"
            : "border-navy-200 text-navy-900",
        )}
      >
        <span className="text-[1.05em] font-bold tracking-tight">Meliel</span>
        <span
          className={clsx(
            "mt-1 text-[0.55em] font-medium tracking-[0.14em] uppercase",
            onDark ? "text-ice-300" : "text-navy-600",
          )}
        >
          Digital Marketing
        </span>
      </span>
    </span>
  );
}
