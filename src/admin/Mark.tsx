// The Meliel wordmark (orange letters and the ladder) for the admin, with the same geometry as the
// website's logo (src/components/ui/Logo.tsx). Its own copy because the admin doesn't load the
// website's theme colors. Replace both with the client's vector file when it arrives.
const LETTERS = [
  "M0 0H50V20H110V180H60V40H50V200H0Z M20 20V180H30V20Z M80 40V160H90V40Z",
  "M120 20H170V0H190V200H170V40H140V120H160V200H120Z M140 130V190H150V130Z",
  "M260 20H310V0H330V200H310V40H280V120H300V200H260Z M280 130V190H290V130Z",
];

// Top (square) to bottom rung, with the logo's colors.
const LADDER = [
  { x: 215, y: 0, w: 20, color: "#99c3de" },
  { x: 200, y: 30, w: 50, color: "#7aa3c1" },
  { x: 200, y: 60, w: 50, color: "#5983a5" },
  { x: 200, y: 90, w: 50, color: "#406b8f" },
  { x: 200, y: 120, w: 50, color: "#355b7d" },
  { x: 200, y: 150, w: 50, color: "#2b4c6d" },
  { x: 200, y: 180, w: 50, color: "#1d3959" },
];

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 330 200" className={className} aria-hidden="true">
      <g fill="#faa91a" fillRule="evenodd">
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
          fill={r.color}
        />
      ))}
    </svg>
  );
}
