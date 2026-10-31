// WCAG 2.1 contrast check for every text/background pair the design uses.
// Reads the color tokens straight from src/app/globals.css, so it can't drift from the theme.
// Run: pnpm contrast   (exits with code 1 if any required pair fails)

import { readFileSync } from "node:fs";

const css = readFileSync(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);
const readTokens = (text) =>
  Object.fromEntries(
    [...text.matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map(
      (m) => [m[1], m[2].toLowerCase()],
    ),
  );

// Light values, with the dark theme's overrides layered on top for the second pass.
const [lightCss, afterDark] = css.split(':root[data-theme="dark"] {');
const lightTokens = readTokens(lightCss);
const darkTokens = {
  ...lightTokens,
  ...readTokens(afterDark.slice(0, afterDark.indexOf("}"))),
};
let tokens = lightTokens;

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
  ["red", "white", TEXT, "form error text"],
  ["red", "paper", TEXT, "form error text on off-white"],
  ["red", "orange-50", TEXT, "form error summary"],
  ["navy-900", "navy-50", TEXT, "selected service card"],
  ["ice-300", "navy-900", TEXT, "placeholder image label"],

  // Non-text UI (WCAG 1.4.11)
  ["navy-900", "white", UI, "focus ring on light"],
  ["orange-500", "navy-900", UI, "focus ring on navy"],
  ["navy-500", "white", UI, "form field borders"],
  ["orange-500", "navy-900", LARGE, "large orange headings on navy"],
  ["white", "whatsapp", TEXT, "WhatsApp button label and icon"],
  ["whatsapp", "white", UI, "WhatsApp button on white page"],
  ["white", "telegram", TEXT, "Telegram button label and icon"],
  ["telegram", "white", UI, "Telegram button on white page"],
  ["white", "navy-900", UI, "white ring around floating buttons on navy"],
];

// Theme tokens: checked in light and in dark.
const themePairs = [
  ["ink", "surface", TEXT, "main text"],
  ["ink", "paper", TEXT, "main text on alternate sections"],
  ["ink", "raised", TEXT, "main text on cards and fields"],
  ["ink", "tint", TEXT, "text on selected states"],
  ["ink-soft", "surface", TEXT, "secondary text"],
  ["ink-soft", "paper", TEXT, "secondary text on alternate sections"],
  ["ink-soft", "raised", TEXT, "secondary text on cards"],
  ["ink-soft", "tint", TEXT, "tags"],
  ["ink-muted", "surface", TEXT, "captions"],
  ["ink-muted", "paper", TEXT, "captions on alternate sections"],
  ["ink-muted", "raised", TEXT, "captions on cards"],
  ["ink-muted", "tint", TEXT, "muted text on selected states"],
  ["accent", "surface", TEXT, "orange text"],
  ["accent", "paper", TEXT, "orange text on alternate sections"],
  ["accent", "raised", TEXT, "orange text on cards"],
  ["red", "surface", TEXT, "form errors"],
  ["red", "paper", TEXT, "form errors on alternate sections"],
  ["red", "raised", TEXT, "error summary"],
  ["surface", "ink", TEXT, "secondary button"],
  ["surface", "ink-soft", TEXT, "secondary button (hover)"],
  ["white", "band", TEXT, "text on navy bands"],
  ["white", "band-deep", TEXT, "text on the deepest bands and footer"],
  ["navy-100", "band-deep", TEXT, "footer links"],
  ["navy-200", "band", TEXT, "muted text on bands"],
  ["navy-200", "band-deep", TEXT, "muted text on deepest bands"],
  ["ice-300", "band", TEXT, "accent text on bands"],
  ["ice-300", "band-deep", TEXT, "accent text on deepest bands"],
  ["orange-500", "band", TEXT, "orange text on bands"],
  ["orange-500", "band-deep", TEXT, "orange text on deepest bands"],
  ["navy-900", "orange-500", TEXT, "primary button"],
  ["navy-900", "orange-400", TEXT, "primary button (hover)"],
  ["ink", "surface", UI, "focus ring"],
  ["ink", "paper", UI, "focus ring on alternate sections"],
  ["orange-500", "band", UI, "focus ring on bands"],
  ["control", "raised", UI, "form field borders"],
  ["control", "surface", UI, "form field borders on the page"],
  ["red", "raised", UI, "invalid field border"],
  ["whatsapp", "surface", UI, "WhatsApp button on the page"],
  ["telegram", "surface", UI, "Telegram button on the page"],
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
function check(list) {
  for (const [fg, bg, min, use] of list) {
    const r = ratio(color(fg), color(bg));
    const ok = r >= min;
    if (!ok) failures++;
    console.log(
      `${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (need ${min.toFixed(1)})  ${fg} on ${bg}  ${use}`,
    );
  }
}

console.log("Required pairs (WCAG 2.1 AA)\n");
check(pairs);

console.log("\nLight theme\n");
check(themePairs);

console.log("\nDark theme\n");
tokens = darkTokens;
check(themePairs);
tokens = lightTokens;

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
