import { Container } from "@/components/ui/Container";
import { sectors } from "@/content/profile";
import { getI18n } from "@/i18n";

// "Sectors we have grown", from the company profile.
export async function Sectors() {
  const { locale, t } = await getI18n();
  return (
    <section
      aria-labelledby="sectors-title"
      className="bg-surface py-12 lg:py-16"
    >
      <Container>
        <h2
          id="sectors-title"
          className="text-center font-display text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase"
        >
          {t.copy.sectorsTitle}
        </h2>
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {sectors.map((sector) => (
            <li
              key={sector.slug}
              className="rounded-full border border-line bg-paper px-5 py-2.5 font-display font-semibold text-ink"
            >
              {locale === "am" ? sector.nameAm : sector.name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
