import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import type { ClientLogo } from "@/lib/types";

// Logos strip under the hero. Hidden entirely until there are logos (with permission).
export function ClientLogos({ logos }: { logos: ClientLogo[] }) {
  if (logos.length === 0) return null;
  return (
    <section
      aria-labelledby="clients-title"
      className="border-y border-line bg-surface py-10 sm:py-12"
    >
      <Container>
        <h2
          id="clients-title"
          className="text-center font-display text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase"
        >
          Brands we’ve worked with
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => {
            const image = (
              <MediaImage
                media={logo.logo}
                aspect="aspect-[2/1]"
                fit="contain"
                sizes="(min-width: 1024px) 180px, 45vw"
                className="opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            );
            return (
              <li key={logo.id}>
                {logo.url ? (
                  <a
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-sm"
                  >
                    {image}
                  </a>
                ) : (
                  image
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
