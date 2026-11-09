import type { DefaultCellComponentProps } from "payload";

// Status pills in the list tables (a field's admin.components.Cell). Each maps a stored value to a
// short label and a color; anything unexpected shows as plain text.
type Tone = "good" | "bad" | "warn" | "muted" | "info";
type Pills = Record<string, { text: string; tone: Tone }>;

function pill(map: Pills, value: unknown) {
  if (typeof value !== "string" || value === "") return null;
  const p = map[value];
  if (!p) return <span>{value}</span>;
  return <span className={`meliel-pill meliel-pill--${p.tone}`}>{p.text}</span>;
}

const PROJECT_STATUS: Pills = {
  published: { text: "Published", tone: "good" },
  draft: { text: "Draft", tone: "warn" },
};
const EMAIL_STATUS: Pills = {
  sent: { text: "Sent", tone: "good" },
  failed: { text: "Failed", tone: "bad" },
  "not-configured": { text: "Not set up", tone: "muted" },
};
const INQUIRY_TYPE: Pills = {
  general: { text: "General", tone: "info" },
  quote: { text: "Quote", tone: "warn" },
};
const LANGUAGE: Pills = {
  en: { text: "English", tone: "muted" },
  am: { text: "Amharic", tone: "info" },
};
const YES_NO: Pills = {
  true: { text: "Yes", tone: "good" },
  false: { text: "No", tone: "muted" },
};

export function ProjectStatusCell({ cellData }: DefaultCellComponentProps) {
  return pill(PROJECT_STATUS, cellData);
}
export function EmailStatusCell({ cellData }: DefaultCellComponentProps) {
  return pill(EMAIL_STATUS, cellData);
}
export function InquiryTypeCell({ cellData }: DefaultCellComponentProps) {
  return pill(INQUIRY_TYPE, cellData);
}
export function LanguageCell({ cellData }: DefaultCellComponentProps) {
  return pill(LANGUAGE, cellData);
}
/** For checkboxes such as "Featured": Payload shows them as `true` / `false` in code type. */
export function YesNoCell({ cellData }: DefaultCellComponentProps) {
  return pill(YES_NO, String(Boolean(cellData)));
}
