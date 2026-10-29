import clsx from "clsx";

type PlaceholderImageProps = {
  /** What the real image will show, e.g. "project cover: client campaign". */
  label: string;
  /** Tailwind aspect class, e.g. "aspect-video" (default) or "aspect-square". */
  aspect?: string;
  className?: string;
};

// Brand-colored stand-in for photos we don't have yet. Deliberately not a stock photo,
// so it can't be mistaken for real work.
export function PlaceholderImage({
  label,
  aspect = "aspect-video",
  className,
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={clsx(
        "relative flex items-center justify-center overflow-hidden rounded-sm bg-navy-900 p-4",
        aspect,
        className,
      )}
    >
      {/* Faint horizontal rungs echo the ladder */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to top, rgb(153 195 222 / 0.08) 0 14px, transparent 14px 21px)",
        }}
      />
      <span className="relative max-w-[90%] text-center font-mono text-xs text-ice-300 sm:text-sm">
        [PLACEHOLDER: {label}]
      </span>
    </div>
  );
}
