import { MediaImage } from "@/components/ui/MediaImage";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Value } from "@/components/ui/Value";
import type { Testimonial } from "@/lib/types";

// Client quotes from the Portfolio Manager. Hidden entirely until there are real ones.
export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;
  return (
    <Section tone="paper" aria-labelledby="testimonials-title">
      <Rise>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title="What our clients say"
        />
      </Rise>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.id}>
            <Rise className="h-full">
              <figure className="flex h-full flex-col rounded-sm border border-line bg-raised p-7">
                <span
                  aria-hidden
                  className="font-display text-6xl leading-none text-orange-500"
                >
                  “
                </span>
                <blockquote className="mt-2 text-lg text-ink-soft">
                  <Value value={t.quote} />
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-4 pt-8">
                  {t.photo && (
                    <MediaImage
                      media={t.photo}
                      aspect="aspect-square"
                      sizes="48px"
                      className="w-12 shrink-0 rounded-full! p-0! [&_span]:hidden"
                    />
                  )}
                  <span className="min-w-0 text-sm">
                    <span className="block font-semibold text-ink">
                      <Value value={t.name} />
                    </span>
                    <span className="mt-1 block text-ink-muted">
                      <Value value={t.jobTitle} />, <Value value={t.company} />
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Rise>
          </li>
        ))}
      </ul>
    </Section>
  );
}
