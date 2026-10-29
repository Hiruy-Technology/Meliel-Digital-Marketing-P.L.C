import clsx from "clsx";
import type { ComponentProps } from "react";

// Rise motif: content fades and moves up as it scrolls into view.
// The animation is pure CSS (`.rise` in globals.css), so this works in Server Components
// and does nothing for visitors who prefer reduced motion.
export function Rise({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx("rise", className)} {...props} />;
}
