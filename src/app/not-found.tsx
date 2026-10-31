import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Page not found",
};

// The ladder from the logo, bottom to top, with one rung missing: the "missing step".
const RUNGS = [1, 2, 3, 4, 5, 6];
const MISSING = 3;

export default function NotFound() {
  return (
    <Section tone="paper" className="flex min-h-[70vh] items-center">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-20">
        <div className="max-w-xl">
          <p className="font-display text-sm font-semibold tracking-[0.14em] text-accent uppercase">
            Error 404
          </p>
          <h1 className="mt-3 font-display text-display font-bold">
            This step is missing.
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            The page you’re looking for doesn’t exist or has moved. Here are a
            few ways back on track.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href="/work" variant="outline" size="lg">
              See Our Work
            </Button>
          </div>
          <p className="mt-6 text-ink-soft">
            Looking for something specific?{" "}
            <Link
              href="/contact"
              className="rounded-sm font-semibold text-ink underline decoration-orange-500 decoration-2 underline-offset-4"
            >
              Contact us
            </Link>
            .
          </p>
        </div>

        <div
          aria-hidden
          className="hidden flex-col-reverse items-center gap-3 md:flex"
        >
          {RUNGS.map((n) => (
            <span
              key={n}
              className={
                n === MISSING
                  ? "h-6 w-32 rounded-[2px] border-2 border-dashed border-line-strong"
                  : "h-6 w-32 rounded-[2px]"
              }
              style={
                n === MISSING
                  ? undefined
                  : { background: `var(--color-ladder-${n})` }
              }
            />
          ))}
          <span className="h-6 w-12 rounded-[2px] bg-ladder-7" />
        </div>
      </div>
    </Section>
  );
}
