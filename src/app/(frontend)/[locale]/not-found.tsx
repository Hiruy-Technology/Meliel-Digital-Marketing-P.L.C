import type { Metadata } from "next";
import { Link } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getI18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.meta.notFoundTitle };
}

// The ladder from the logo, bottom to top, with one rung missing: the "missing step".
const RUNGS = [1, 2, 3, 4, 5, 6];
const MISSING = 3;

export default async function NotFound() {
  const { t } = await getI18n();
  return (
    <Section tone="paper" className="flex min-h-[70vh] items-center">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-20">
        <div className="max-w-xl">
          <p className="font-display text-sm font-semibold tracking-[0.14em] text-accent uppercase">
            {t.notFound.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-display font-bold">
            {t.notFound.title}
          </h1>
          <p className="mt-5 text-lg text-ink-soft">{t.notFound.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" size="lg">
              {t.common.backToHome}
            </Button>
            <Button href="/work" variant="outline" size="lg">
              {t.common.seeOurWork}
            </Button>
          </div>
          <p className="mt-6 text-ink-soft">
            {t.notFound.lookingFor}{" "}
            <Link
              href="/contact"
              className="rounded-sm font-semibold text-ink underline decoration-orange-500 decoration-2 underline-offset-4"
            >
              {t.common.contactUs}
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
