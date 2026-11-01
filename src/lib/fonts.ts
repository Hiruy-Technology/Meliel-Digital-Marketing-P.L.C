import { Inter, Noto_Sans_Ethiopic, Sora } from "next/font/google";

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

// Every Amharic page. Applied only on /am, and not preloaded, so English pages never download it.
// The full font, not the subset in font-ethiopic.ts: Amharic project text will come from the CMS.
export const notoEthiopicFull = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-noto-ethiopic",
  display: "swap",
  preload: false,
});
