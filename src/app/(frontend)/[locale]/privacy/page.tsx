import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Value } from "@/components/ui/Value";
import { pendingCopy } from "@/content/seed";
import { getI18n } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    title: t.meta.privacyTitle,
    description: t.meta.privacyDescription,
    alternates: alternates("/privacy", locale),
  };
}

const DETAILS: Record<string, string> = {
  entity: pendingCopy.legalEntityName,
  address: pendingCopy.legalAddress,
  retention: pendingCopy.retentionPeriod,
  contact: pendingCopy.dataContactEmail,
};

/** Puts the client's details into a paragraph's {slots}. */
function withDetails(text: string): ReactNode {
  return text.split(/(\{\w+\})/).map((part, i) => {
    const key = part.slice(1, -1);
    return (
      <Fragment key={i}>
        {key in DETAILS ? <Value value={DETAILS[key]} /> : part}
      </Fragment>
    );
  });
}

// Standard template, not legal advice: the client (or their lawyer) must review it before launch.
export default async function PrivacyPage() {
  const { t } = await getI18n();
  return (
    <>
      <PageHero
        eyebrow={t.privacy.eyebrow}
        title={t.privacy.title}
        intro={
          <>
            {t.privacy.effective} <Value value={pendingCopy.policyDate} />
          </>
        }
      />
      <div className="bg-surface py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl space-y-10">
            {t.privacy.blocks.map((block) => (
              <section key={block.title}>
                <h2 className="font-display text-2xl font-bold">
                  {block.title}
                </h2>
                <div className="mt-3 space-y-3 text-ink-soft">
                  {block.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{withDetails(paragraph)}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
