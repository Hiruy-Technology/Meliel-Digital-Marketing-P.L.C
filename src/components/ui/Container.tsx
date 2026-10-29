import clsx from "clsx";
import type { ComponentProps } from "react";

// Page-width wrapper: 16px side gutters on phones, up to 1280px wide on desktop.
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    />
  );
}
