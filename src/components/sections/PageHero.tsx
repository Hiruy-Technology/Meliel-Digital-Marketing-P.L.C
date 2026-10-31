import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Extra content under the intro, e.g. jump links or filters. */
  children?: ReactNode;
};

// Standard header for inner pages (Home has its own hero).
export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-paper">
      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="max-w-4xl">
          <p className="flex items-center gap-3 font-display text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            <span aria-hidden className="h-1 w-6 rounded-[1px] bg-orange-500" />
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-display font-bold text-ink">
            {title}
          </h1>
          {intro && (
            <div className="mt-6 max-w-3xl text-lg text-ink-soft sm:text-xl">
              {intro}
            </div>
          )}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  );
}
