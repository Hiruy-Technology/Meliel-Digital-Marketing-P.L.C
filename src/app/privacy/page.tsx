import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Value } from "@/components/ui/Value";
import { pendingCopy } from "@/content/seed";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Meliel Digital Marketing collects, uses, and protects the information you share through this website.",
  alternates: { canonical: "/privacy" },
};

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 text-navy-800">{children}</div>
    </section>
  );
}

// Standard template, not legal advice: the client (or their lawyer) must review it before launch.
export default function PrivacyPage() {
  const { legalEntityName, legalAddress, dataContactEmail } = pendingCopy;
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro={
          <>
            Effective: <Value value={pendingCopy.policyDate} />
          </>
        }
      />
      <div className="bg-white py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl space-y-10">
            <Block title="Who we are">
              <p>
                This website is operated by <Value value={legalEntityName} />,{" "}
                <Value value={legalAddress} /> (“Meliel”, “we”, “us”). This
                policy explains what information we collect through this website
                and how we use it.
              </p>
            </Block>

            <Block title="Information we collect">
              <p>
                When you send us an inquiry or request a quote, we collect what
                you enter: your name, company, email address, phone number, the
                services you’re interested in, your budget range and timeline,
                and your message.
              </p>
              <p>
                We also collect usage information, such as pages viewed, visitor
                counts, and how visitors found the site.
              </p>
            </Block>

            <Block title="How we use it">
              <p>
                We use your details to reply to your inquiry, prepare a quote,
                and manage our relationship with you. We use usage information
                to understand and improve the website.
              </p>
            </Block>

            <Block title="Who we share it with">
              <p>
                We use trusted service providers to run this website, including
                website hosting, email delivery, and Google Analytics. They
                process information on our behalf. We don’t sell your personal
                information.
              </p>
              <p>
                Videos and maps come from YouTube, Vimeo, and Google. They load
                only when you choose to play a video or show the map, and those
                companies’ own privacy policies then apply.
              </p>
            </Block>

            <Block title="Cookies and analytics">
              <p>
                We use Google Analytics, which uses cookies to measure how the
                site is used. You can block or delete cookies in your browser
                settings.
              </p>
            </Block>

            <Block title="How long we keep it">
              <p>
                We keep inquiry details for{" "}
                <Value value={pendingCopy.retentionPeriod} />, unless we need
                them longer for a project or a legal requirement.
              </p>
            </Block>

            <Block title="Your choices">
              <p>
                You can ask us to show you, correct, or delete the personal
                information we hold about you. Contact us at{" "}
                <Value value={dataContactEmail} />.
              </p>
            </Block>

            <Block title="Changes to this policy">
              <p>
                We may update this policy from time to time. The latest version
                is always on this page.
              </p>
            </Block>
          </div>
        </Container>
      </div>
    </>
  );
}
