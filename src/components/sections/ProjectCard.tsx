import { Link } from "@/components/ui/Link";
import { Icon } from "@/components/ui/Icon";
import { MediaImage } from "@/components/ui/MediaImage";
import { ProjectCover } from "./ProjectCover";
import { Tag } from "@/components/ui/Tag";
import { Value } from "@/components/ui/Value";
import type { Project } from "@/lib/types";
import { getI18n } from "@/i18n";

// Portfolio card: cover, client, title, services, and one headline result.
// Used on Home (featured work) and /work. The whole card is one link.
export async function ProjectCard({
  project,
  sizes,
}: {
  project: Project;
  sizes: string;
}) {
  const { t } = await getI18n();
  const highlight = project.resultHighlights[0];
  // The branded cover already shows the client and the headline number, so the card doesn't repeat
  // them; with a photo, the card carries them itself.
  const branded = !project.coverImage;
  const sameName = project.clientName === project.title;
  return (
    <article className="group relative flex h-full flex-col">
      <div className="overflow-hidden rounded-sm">
        {project.coverImage ? (
          <MediaImage
            media={project.coverImage}
            aspect="aspect-[4/3]"
            sizes={sizes}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <ProjectCover
            project={project}
            className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        {!sameName && (
          <p className="mb-2 text-sm font-medium text-ink-muted">
            <Value value={project.clientName} />
          </p>
        )}
        <h3 className="font-display text-xl font-semibold">
          <Link
            href={`/work/${project.slug}`}
            className="rounded-sm group-hover:text-ink-soft after:absolute after:inset-0"
          >
            <Value value={project.title} />
          </Link>
        </h3>

        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label={t.common.services}
        >
          {project.services.map((s) => (
            <li key={s.slug}>
              <Tag>{s.name}</Tag>
            </li>
          ))}
        </ul>

        {/* mt-auto pins this to the bottom so cards in a row line up. */}
        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-4 border-t border-line pt-4">
            {highlight && !branded ? (
              <p className="text-sm text-ink-soft">
                <span className="block font-display text-lg font-bold text-ink">
                  <Value value={highlight.value} />
                </span>
                <Value value={highlight.label} />
              </p>
            ) : (
              <p className="font-display text-sm font-semibold text-ink">
                {t.work.viewCase}
              </p>
            )}
            <Icon
              name="arrow-right"
              className="size-5 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-ink"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
