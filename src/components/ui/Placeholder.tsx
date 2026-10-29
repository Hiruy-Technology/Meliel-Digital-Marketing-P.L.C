import clsx from "clsx";

type PlaceholderProps = {
  /** What goes here, e.g. "founding story" → shows "[PLACEHOLDER: founding story]". */
  label: string;
  /** "inline" sits inside a sentence; "block" fills its own box. */
  display?: "inline" | "block";
  className?: string;
};

// Clearly marks content the client has not sent yet, so nobody mistakes it for real content.
export function Placeholder({
  label,
  display = "inline",
  className,
}: PlaceholderProps) {
  const Tag = display === "inline" ? "span" : "div";
  return (
    <Tag
      className={clsx(
        "rounded-sm border border-dashed border-orange-700 bg-orange-50 font-mono text-[0.85em] text-navy-900",
        display === "inline" ? "px-1.5 py-0.5" : "block p-4",
        className,
      )}
    >
      [PLACEHOLDER: {label}]
    </Tag>
  );
}
