// The image WhatsApp, Telegram, Facebook and LinkedIn show when someone shares a page: 1200×630,
// the brand on navy, the page title in the page's language. Each page folder has an
// opengraph-image.tsx that calls pageImage(). Fonts: src/fonts/og/ (rebuild with scripts/og-fonts.py).

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n";
import { hasLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

export const size = { width: 1200, height: 630 };
const contentType = "image/png";

// Lowest rung first, as in the logo.
const LADDER = [
  "#1d3959",
  "#2b4c6d",
  "#355b7d",
  "#406b8f",
  "#5983a5",
  "#7aa3c1",
  "#99c3de",
];

const fonts = async () => {
  const dir = join(process.cwd(), "src/fonts/og");
  const [sora, ethiopic] = await Promise.all([
    readFile(join(dir, "sora-bold.ttf")),
    readFile(join(dir, "noto-sans-ethiopic-bold.ttf")),
  ]);
  return [
    {
      name: "Sora",
      data: sora,
      weight: 700 as const,
      style: "normal" as const,
    },
    {
      name: "Noto Sans Ethiopic",
      data: ethiopic,
      weight: 700 as const,
      style: "normal" as const,
    },
  ];
};

export type Card = { eyebrow: string; title: string };

export async function renderCard(locale: Locale, card: Card) {
  const t = getDictionary(locale);
  const titleSize = card.title.length > 60 ? 54 : 68;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#122b4d",
        padding: "72px 80px",
        fontFamily: locale === "am" ? "Noto Sans Ethiopic" : "Sora",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 820,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "#faa91a",
              fontSize: 28,
            }}
          >
            <div style={{ width: 40, height: 6, background: "#faa91a" }} />
            {card.eyebrow}
          </div>
          <div
            style={{
              marginTop: 28,
              color: "#ffffff",
              fontSize: titleSize,
              lineHeight: 1.15,
            }}
          >
            {card.title}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#ffffff", fontSize: 36 }}>
            {t.common.meliel}
          </div>
          <div style={{ color: "#99c3de", fontSize: 22, marginTop: 6 }}>
            {t.common.digitalMarketing}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 18,
          marginLeft: "auto",
          paddingTop: 20,
        }}
      >
        {LADDER.map((color, i) =>
          i === LADDER.length - 1 ? (
            <div
              key={color}
              style={{ width: 64, height: 40, background: color }}
            />
          ) : (
            <div
              key={color}
              style={{ width: 160, height: 40, background: color }}
            />
          ),
        )}
      </div>
    </div>,
    { ...size, fonts: await fonts() },
  );
}

const toLocale = (value: unknown): Locale =>
  typeof value === "string" && hasLocale(value) ? value : "en";

/** The two exports a page's opengraph-image.tsx needs, from the wording of that page. */
export function pageImage(pick: (t: Dictionary) => Card) {
  return {
    generateImageMetadata: ({ params }: { params: { locale?: string } }) => [
      {
        id: "share",
        alt: pick(getDictionary(toLocale(params.locale))).title,
        size,
        contentType,
      },
    ],
    Image: async ({ params }: { params: Promise<{ locale?: string }> }) => {
      const locale = toLocale((await params).locale);
      return renderCard(locale, pick(getDictionary(locale)));
    },
  };
}
