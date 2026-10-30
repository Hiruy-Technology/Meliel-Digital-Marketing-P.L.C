import { isPlaceholder, placeholderLabel } from "@/lib/placeholder";
import { Placeholder } from "./Placeholder";

type ValueProps = {
  value: string;
  className?: string;
  /** Extra classes for the placeholder, e.g. "text-sm!" inside large display text. */
  placeholderClassName?: string;
};

// Renders a CMS text value, or a clearly marked placeholder while the client hasn't sent it.
export function Value({ value, className, placeholderClassName }: ValueProps) {
  if (isPlaceholder(value)) {
    return (
      <Placeholder
        label={placeholderLabel(value)}
        className={placeholderClassName}
      />
    );
  }
  return <span className={className}>{value}</span>;
}
