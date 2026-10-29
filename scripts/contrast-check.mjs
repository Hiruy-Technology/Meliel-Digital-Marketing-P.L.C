// WCAG 2.1 contrast check for every text/background pair the design uses.
// Reads the color tokens straight from src/app/globals.css, so it can't drift from the theme.
// Run: pnpm contrast   (exits with code 1 if any required pair fails)

import { readFileSync } from "node:fs";

const css = readFileSync(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);
const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [
    m[1],
    m[2].toLowerCase(),
  ]),
);

// AA: 4.5 for normal text, 3.0 for large text (24px+, or 18.66px+ bold) and UI parts (borders, focus rings).
const TEXT = 4.5;
const LARGE = 3.0;
const UI = 3.0;

// [foreground, background, minimum, where it's used]
const pairs = [
  // Text on light backgrounds
  ["navy-900", "white", TEXT, "body text and headings"],
  ["navy-900", "paper", TEXT, "body text on off-white sections"],
  ["navy-800", "white", TEXT, "secondary text"],
  ["navy-700", "white", TEXT, "secondary text"],
  ["navy-600", "white", TEXT, "muted text (captions, labels)"],
  ["navy-600", "paper", TEXT, "muted text on off-white"],
  [
    "orange-800",
    "white",
    TEXT,
    "orange text on white (only accessible orange for small text)",
  ],
  ["orange-800", "paper", TEXT, "orange text on off-white"],

  // Text on dark backgrounds
  ["white", "navy-900", TEXT, "text on navy sections"],
  ["white", "navy-950", TEXT, "text on deep navy"],
  ["ice-300", "navy-900", TEXT, "accent text on navy"],
  ["ice-300", "navy-950", TEXT, "accent text on deep navy"],
  ["navy-200", "navy-900", TEXT, "muted text on navy"],
  ["navy-300", "navy-900", TEXT, "muted text on navy"],
  ["orange-500", "navy-900", TEXT, "orange accent text on navy"],
  ["orange-500", "navy-950", TEXT, "orange accent text on deep navy"],

  // Buttons
  ["navy-900", "orange-500", TEXT, "primary button"],
  ["navy-900", "orange-400", TEXT, "primary button (hover)"],
  ["white", "navy-900", TEXT, "secondary button"],
  ["white", "navy-950", TEXT, "secondary button (hover)"],
  ["navy-900", "white", TEXT, "on-dark button (hover)"],

  // Small components
  ["navy-800", "navy-50", TEXT, "tag"],
  ["navy-900", "orange-50", TEXT, "placeholder text"],
  ["ice-300", "navy-900", TEXT, "placeholder image label"],

  // Non-text UI (WCAG 1.4.11)
  ["navy-900", "white", UI, "focus ring on light"],
  ["orange-500", "navy-900", UI, "focus ring on navy"],
  ["navy-500", "white", UI, "form field borders"],
  ["orange-500", "navy-900", LARGE, "large orange headings on navy"],
  ["white", "whatsapp", UI, "WhatsApp button icon"],
  ["whatsapp", "white", UI, "WhatsApp button on white page"],
  ["whatsapp", "navy-900", UI, "WhatsApp button over navy section"],
  ["white", "telegram", UI, "Telegram button icon"],
  ["telegram", "white", UI, "Telegram button on white page"],
  ["telegram", "navy-900", UI, "Telegram button over navy section"],
];

// Known-bad pairs, listed so nobody uses them by accident.
const forbidden = [
  ["orange-500", "white", "orange text on white"],
  ["white", "orange-500", "white text on orange buttons"],
  ["orange-700", "white", "orange-700 text on white (just under AA)"],
];

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

function color(name) {
  const hex = tokens[name];
  if (!hex) throw new Error(`Unknown color token: ${name}`);
  return hex;
}

let failures = 0;
console.log("Required pairs (WCAG 2.1 AA)\n");
for (const [fg, bg, min, use] of pairs) {
  const r = ratio(color(fg), color(bg));
  const ok = r >= min;
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (need ${min.toFixed(1)})  ${fg} on ${bg}  ${use}`,
  );
}

console.log("\nDo not use (fail AA for normal text)\n");
for (const [fg, bg, use] of forbidden) {
  console.log(
    `      ${ratio(color(fg), color(bg)).toFixed(2).padStart(5)}:1  ${fg} on ${bg}  ${use}`,
  );
}

console.log(
  failures ? `\n${failures} pair(s) fail.` : "\nAll required pairs pass.",
);
process.exit(failures ? 1 : 0);
