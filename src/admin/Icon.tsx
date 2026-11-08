// The small logo in the breadcrumbs (admin.components.graphics.Icon). Payload gives it an 18px
// square, too small for the wordmark, so it's the ladder from the logo on an orange tile, visible
// in both themes. Payload puts it inside a link to the dashboard, so it needs a name.
const RUNGS = [
  { x: 110, y: 20, w: 20 },
  { x: 95, y: 50, w: 50 },
  { x: 95, y: 80, w: 50 },
  { x: 95, y: 110, w: 50 },
  { x: 95, y: 140, w: 50 },
  { x: 95, y: 170, w: 50 },
  { x: 95, y: 200, w: 50 },
];

export default function Icon() {
  return (
    <svg
      viewBox="0 0 240 240"
      className="meliel-icon"
      role="img"
      aria-label="Meliel Portfolio Manager"
    >
      <rect width="240" height="240" rx="48" fill="#faa91a" />
      {RUNGS.map((r) => (
        <rect
          key={r.y}
          x={r.x}
          y={r.y}
          width={r.w}
          height="20"
          fill="#1b3354"
        />
      ))}
    </svg>
  );
}
