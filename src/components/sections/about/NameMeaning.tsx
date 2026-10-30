import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { nameMeaning } from "@/content/copy";

// The page's signature section: what መልዕል means, in Amharic and English.
// The first English paragraph is the page intro, so it starts from the second here,
// and the closing line (the brand line) is set large.
export function NameMeaning() {
  const { amharic, english } = nameMeaning;
  const body = english.paragraphs.slice(1, -1);
  const closing = english.paragraphs[english.paragraphs.length - 1];

  return (
    <Section tone="navy-deep" aria-labelledby="meaning-title">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Rise lang="am">
          <p aria-hidden className="text-display-lg font-bold text-orange-500">
            መልዕል
          </p>
          <h2
            id="meaning-title"
            className="mt-6 font-ethiopic text-2xl leading-snug font-semibold text-white"
          >
            {amharic.title}
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-loose text-navy-200">
            {amharic.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Rise>

        <Rise>
          <div className="space-y-5 text-lg text-navy-100">
            {body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-10 border-l-4 border-orange-500 pl-6 font-display text-2xl leading-snug font-semibold text-white sm:text-3xl">
            {closing}
          </p>
        </Rise>
      </div>
    </Section>
  );
}
