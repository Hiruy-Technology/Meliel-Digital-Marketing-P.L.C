import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { isPreview } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  // A confirmation page has no value in search results.
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: PageProps<"/contact/thank-you">) {
  const { type } = await searchParams;
  const isQuote = type === "quote";

  return (
    <Section tone="paper" className="flex min-h-[70vh] items-center">
      <div className="max-w-2xl">
        <p className="flex items-center gap-3 font-display text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          <span aria-hidden className="h-1 w-6 rounded-[1px] bg-orange-500" />
          {isQuote ? "Quote request received" : "Message received"}
        </p>
        <h1 className="mt-5 font-display text-display font-bold">Thank you.</h1>
        <p className="mt-6 text-lg text-ink-soft">
          {isQuote
            ? "We’ve received your request and will get back to you with a quote."
            : "We’ve received your message and will get back to you."}
        </p>
        {isPreview && (
          <p className="mt-4 rounded-sm bg-orange-50 p-3 text-sm text-navy-900">
            Design preview: forms don’t send anything yet.
          </p>
        )}
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/work" size="lg">
            See Our Work
          </Button>
          <Button href="/" variant="outline" size="lg">
            Back to home
          </Button>
        </div>
      </div>
    </Section>
  );
}
