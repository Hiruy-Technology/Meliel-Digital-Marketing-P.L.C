import localFont from "next/font/local";
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

// Every Amharic page: the whole main Ethiopic block, so anything Meliel types in the CMS displays,
// in weights 400 to 700 only. 78 KB instead of Google's 194 KB (rebuild with
// scripts/subset-ethiopic.py). Applied only on /am, and not preloaded, so English pages never load it.
export const notoEthiopicFull = localFont({
  src: "../fonts/noto-sans-ethiopic-amharic.woff2",
  weight: "400 700",
  variable: "--font-noto-ethiopic",
  display: "swap",
  preload: false,
});
