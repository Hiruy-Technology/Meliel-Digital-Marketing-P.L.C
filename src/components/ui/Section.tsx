import clsx from "clsx";
import type { ComponentProps } from "react";
import { Container } from "./Container";

type Tone = "white" | "paper" | "navy" | "navy-deep";

const tones: Record<Tone, string> = {
  white: "bg-surface text-ink",
  paper: "bg-paper text-ink",
  navy: "bg-band text-white",
  "navy-deep": "bg-band-deep text-white",
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
