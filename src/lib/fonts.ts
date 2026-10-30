import { Inter, Sora } from "next/font/google";

// Headings (proposal; option B for the design review is Space Grotesk).
export const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

// Body text.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
