import localFont from "next/font/local";

// Amharic brand text, in its own file so the font loads only on pages that import it (next/font
// ties a font to the file that uses it). Apply `notoEthiopic.variable` around any lang="am" text.
//
// A subset holding only the characters in src/content/copy.ts: far smaller than the full 194 KB
// font. If the Amharic copy changes, rebuild it with scripts/subset-ethiopic.py.
export const notoEthiopic = localFont({
  src: "../fonts/noto-sans-ethiopic-subset.woff2",
  weight: "100 900",
  variable: "--font-noto-ethiopic",
  display: "swap",
});
