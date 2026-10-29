import clsx from "clsx";
import type { ComponentProps } from "react";

type CardProps = ComponentProps<"div"> & {
  /** Lift on hover. Use when the card contains a link that covers it. */
  interactive?: boolean;
};

export function Card({ interactive = false, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "relative rounded-sm border border-navy-100 bg-white p-6 text-navy-900",
        interactive &&
          "transition focus-within:-translate-y-0.5 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lg hover:shadow-navy-900/5",
        className,
      )}
      {...props}
    />
  );
}
