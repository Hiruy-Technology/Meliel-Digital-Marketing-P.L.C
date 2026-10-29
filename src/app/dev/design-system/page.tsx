import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { LadderProgress } from "@/components/ui/LadderProgress";
import { Logo } from "@/components/ui/Logo";
import { Placeholder } from "@/components/ui/Placeholder";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

// Internal showcase of the design system. Never shown in production; removed before launch (step 10).
export const metadata: Metadata = {
  title: "Design system (internal)",
  robots: { index: false, follow: false },
};

const SCALES = ["orange", "navy"] as const;
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const BRAND = [
  "paper",
  "ice-300",
  "ladder-1",
  "ladder-2",
  "ladder-3",
  "ladder-4",
  "ladder-5",
  "ladder-6",
  "ladder-7",
];

function Swatch({ token }: { token: string }) {
  return (
    <div className="min-w-0">
      <div
        className="h-12 rounded-sm border border-navy-100"
        style={{ background: `var(--color-${token})` }}
      />
      <p className="mt-1 truncate font-mono text-[11px] text-navy-600">
        {token}
      </p>
    </div>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="mb-6 font-display text-2xl font-bold">{children}</h2>;
}

export default function DesignSystemPage() {
  if (process.env.NEXT_PUBLIC_SITE_ENV === "production") notFound();

  return (
    <main>
      <LadderProgress />

      <Section tone="paper" className="py-12!">
        <p className="font-mono text-xs tracking-widest text-navy-600 uppercase">
          Internal · step 2
        </p>
        <h1 className="mt-2 font-display text-display-sm font-bold">
          Meliel design system
        </h1>
        <p className="mt-3 max-w-2xl text-navy-700">
          Tokens and base components for review. Scroll to see the rise
          animation and the ladder progress indicator (left edge on desktop, top
          bar on mobile).
        </p>
      </Section>

      <Section>
        <Heading>Logo</Heading>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col items-start gap-6">
            <Logo className="h-16" />
            <Logo withName className="h-12 text-2xl" />
            <Logo withName className="h-10 text-xl" />
          </Card>
          <div
            data-tone="dark"
            className="flex flex-col items-start gap-6 rounded-sm bg-navy-900 p-6"
          >
            <Logo className="h-16" />
            <Logo variant="color-on-dark" withName className="h-12 text-2xl" />
            <Logo variant="white" withName className="h-10 text-xl" />
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <Heading>Colors</Heading>
        {SCALES.map((scale) => (
          <div key={scale} className="mb-8">
            <h3 className="mb-3 font-display font-semibold capitalize">
              {scale}
            </h3>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
              {STEPS.map((step) => (
                <Swatch key={step} token={`${scale}-${step}`} />
              ))}
            </div>
          </div>
        ))}
        <h3 className="mb-3 font-display font-semibold">
          Brand extras and ladder steps (bottom to top)
        </h3>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {BRAND.map((token) => (
            <Swatch key={token} token={token} />
          ))}
        </div>
        <p className="mt-6 text-sm text-navy-700">
          Contrast: run <code className="font-mono">pnpm contrast</code>.
          Orange-500 is for buttons and accents only, never for text on white.
        </p>
      </Section>

      <Section>
        <Heading>Typography</Heading>
        <div className="space-y-6">
          <p className="font-display text-display-lg font-bold">
            From where they are
          </p>
          <p className="font-display text-display font-bold">
            to where they have the potential to be
          </p>
          <p className="font-display text-display-sm font-semibold">
            Section heading (Sora)
          </p>
          <p className="max-w-prose text-lg text-navy-800">
            Lead paragraph in Inter. Through strategy, creative production, and
            integrated digital marketing, we create pathways for brands to move
            beyond where they are today and toward where they aspire to be.
          </p>
          <p className="max-w-prose text-navy-700">
            Body text in Inter. To us, Meliel means helping brands rise from
            where they are to where they have the potential to be.
          </p>
          <p className="text-sm text-navy-600">
            Muted caption text (navy-600).
          </p>
          <p lang="am" className="text-2xl">
            መልዕል — ወደ ከፍታ የሚያደርስ መወጣጫ
          </p>
        </div>
      </Section>

      <Section tone="paper">
        <Heading>Buttons</Heading>
        <div className="flex flex-wrap gap-4">
          <Button href="#">Start a Project</Button>
          <Button href="#" variant="secondary">
            See Our Work
          </Button>
          <Button variant="outline">Outline</Button>
          <Button size="lg">Large primary</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div
          data-tone="dark"
          className="mt-6 flex flex-wrap gap-4 rounded-sm bg-navy-900 p-6"
        >
          <Button href="#">Start a Project</Button>
          <Button href="#" variant="on-dark">
            See Our Work
          </Button>
        </div>
        <p className="mt-4 text-sm text-navy-700">
          Press Tab to check the focus rings.
        </p>
      </Section>

      <Section>
        <Heading>Cards, tags, placeholders</Heading>
        <div className="grid gap-6 md:grid-cols-3">
          <Card interactive>
            <PlaceholderImage label="project cover image" />
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>Branding</Tag>
              <Tag>Advanced Digital Marketing</Tag>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold">
              <a href="#" className="after:absolute after:inset-0">
                <Placeholder label="project title" />
              </a>
            </h3>
          </Card>
          <Card>
            <h3 className="font-display text-lg font-semibold">Branding</h3>
            <p className="mt-2 text-navy-700">
              Brand strategy, positioning, logo design, and identity guidelines
              that ensure consistency across all brand touchpoints.
            </p>
          </Card>
          <Card>
            <Placeholder
              display="block"
              label="testimonial quote, name, title, company"
            />
          </Card>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <PlaceholderImage label="gallery image" aspect="aspect-square" />
          <div
            data-tone="dark"
            className="flex flex-wrap content-start gap-2 rounded-sm bg-navy-900 p-6"
          >
            <Tag tone="dark">Tag on navy</Tag>
            <Tag tone="dark">Event Production</Tag>
          </div>
        </div>
      </Section>

      <Section tone="navy">
        <Heading>Rise on scroll</Heading>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Rise key={n}>
              <div className="rounded-sm bg-navy-800 p-8">
                <p className="font-display text-display-sm font-bold text-orange-500">
                  {n}
                </p>
                <p className="mt-2 text-navy-200">
                  Each block rises into view as you scroll.
                </p>
              </div>
            </Rise>
          ))}
        </div>
      </Section>

      {/* Extra height so the ladder indicator has room to fill */}
      <Section tone="paper">
        <Container className="px-0!">
          <p className="py-48 text-center text-navy-600">
            End of design system.
          </p>
        </Container>
      </Section>
    </main>
  );
}
