import clsx from "clsx";
import type { ComponentProps } from "react";

type TagProps = ComponentProps<"span"> & {
  tone?: "light" | "dark";
};

// Small label, e.g. the services or industry on a project card.
export function Tag({ tone = "light", className, ...props }: TagProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        tone === "light"
          ? "bg-navy-50 text-navy-800"
          : "bg-white/10 text-white",
        className,
      )}
      {...props}
    />
  );
}
