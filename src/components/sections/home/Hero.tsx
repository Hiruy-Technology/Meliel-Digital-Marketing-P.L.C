import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { heroHeadline, meaningShort, valueStatement } from "@/content/copy";
import { projectCta } from "@/lib/navigation";

// Decorative ladder: 6 rungs and the small top square, as in the logo, climbing in on load.
const PIECES = [
  { color: "var(--color-ladder-1)", wide: true },
  { color: "var(--color-ladder-2)", wide: true },
  { color: "var(--color-ladder-3)", wide: true },
  { color: "var(--color-ladder-4)", wide: true },
  { color: "var(--color-ladder-5)", wide: true },
  { color: "var(--color-ladder-6)", wide: true },
  { color: "var(--color-ladder-7)", wide: false },
];

function HeroLadder() {
  return (
    <div
      aria-hidden
      className="ladder-build flex flex-col-reverse items-center gap-2 sm:gap-3 lg:gap-4"
    >
      {PIECES.map((piece, i) => (
        <span
          key={i}
          className={
            piece.wide
              ? "h-3 w-20 rounded-[2px] sm:h-4 sm:w-28 lg:h-6 lg:w-40"
              : "h-3 w-8 rounded-[2px] sm:h-4 sm:w-11 lg:h-6 lg:w-16"
          }
          style={{ background: piece.color, "--i": i } as CSSProperties}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-white">
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-8">
          <p className="flex items-center gap-3 font-display text-xs font-semibold tracking-[0.16em] text-orange-800 uppercase">
            <span aria-hidden className="h-1 w-6 rounded-[1px] bg-orange-500" />
            Digital marketing · Addis Ababa
          </p>
          <h1
            id="hero-title"
            className="mt-5 font-display text-display font-bold text-navy-900"
          >
            {heroHeadline.before}
            {/* Orange "rung" behind the key word: navy text on orange keeps full contrast */}
            <span className="relative z-0 whitespace-nowrap after:absolute after:inset-x-[-0.08em] after:bottom-[0.06em] after:-z-10 after:h-[0.32em] after:rounded-[2px] after:bg-orange-500">
              {heroHeadline.highlight}
            </span>
            {heroHeadline.after}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-navy-700 sm:text-xl">
            {valueStatement}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={projectCta.href} size="lg">
              {projectCta.label}
            </Button>
            <Button href="/work" variant="outline" size="lg">
              See Our Work
            </Button>
          </div>
        </div>

        <div className="flex items-end justify-between gap-8 border-t border-navy-100 pt-10 lg:col-span-4 lg:flex-col lg:items-center lg:justify-end lg:border-t-0 lg:pt-0">
          <HeroLadder />
          <p className="max-w-56 text-sm text-navy-700 lg:text-center">
            <span
              lang="am"
              className="block font-ethiopic text-2xl font-bold text-navy-900"
            >
              መልዕል
            </span>
            <span className="mt-1 block">{meaningShort}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
