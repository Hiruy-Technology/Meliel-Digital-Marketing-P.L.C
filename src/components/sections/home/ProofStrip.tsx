import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/components/ui/Link";
import type { Project } from "@/lib/types";
import { getI18n } from "@/i18n";

// Real numbers from the featured case studies, straight after the hero, so the first thing a
// visitor sees below the promise is proof of it. Each links to its case study. Hidden with no work.
export async function ProofStrip({ projects }: { projects: Project[] }) {
  const proof = projects
    .filter((p) => p.resultHighlights.length > 0)
    .slice(0, 3)
    .map((p) => ({ project: p, highlight: p.resultHighlights[0] }));
  if (proof.length === 0) return null;
  const { t } = await getI18n();
  return (
    <section
      aria-labelledby="proof-title"
      data-tone="dark"
      className="bg-band py-12 text-white lg:py-14"
    >
      <Container>
        <h2
          id="proof-title"
          className="flex items-center gap-3 font-display text-xs font-semibold tracking-[0.16em] text-ice-300 uppercase"
        >
          <span aria-hidden className="h-1 w-6 rounded-[1px] bg-orange-500" />
          {t.home.proofEyebrow}
        </h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {proof.map(({ project, highlight }) => (
            <li key={project.id}>
              <Link
                href={`/work/${project.slug}`}
                className="group block rounded-sm border-l-2 border-orange-500/60 pl-5 transition-colors hover:border-orange-500"
              >
                <span className="block font-display text-5xl leading-none font-bold text-orange-500 lg:text-6xl">
                  {highlight.value}
                </span>
                <span className="mt-2 block text-lg font-medium text-white">
                  {highlight.label}
                </span>
                <span className="mt-3 flex items-center gap-2 text-sm text-ice-300 group-hover:text-white">
                  {project.clientName}
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
