import type { Metadata } from "next";
import clsx from "clsx";
import { inter, notoEthiopic, sora } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meliel Digital Marketing",
  // Client copy (docs/02-meliel-content.md). Per-page descriptions come in step 9.
  description:
    "We help businesses and brands communicate their value, stand out in competitive markets, connect with the right audiences, and turn opportunities into measurable growth.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={clsx(
        sora.variable,
        inter.variable,
        notoEthiopic.variable,
        "h-full antialiased",
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
