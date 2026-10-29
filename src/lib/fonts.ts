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

// Amharic brand text (the name መልዕል and its meaning). Only a few sections use it,
// so it is not preloaded on every page.
export const notoEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-noto-ethiopic",
  display: "swap",
  preload: false,
});
