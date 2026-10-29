import clsx from "clsx";
import type { ComponentProps } from "react";
import { Container } from "./Container";

type Tone = "white" | "paper" | "navy" | "navy-deep";

const tones: Record<Tone, string> = {
  white: "bg-white text-navy-900",
  paper: "bg-paper text-navy-900",
  navy: "bg-navy-900 text-white",
  "navy-deep": "bg-navy-950 text-white",
};

type SectionProps = ComponentProps<"section"> & {
  tone?: Tone;
  /** Wrap children in a Container (default true). */
  contained?: boolean;
};

export function Section({
  tone = "white",
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  const dark = tone === "navy" || tone === "navy-deep";
  return (
    <section
      data-tone={dark ? "dark" : "light"}
      className={clsx("py-16 sm:py-20 lg:py-28", tones[tone], className)}
      {...props}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
