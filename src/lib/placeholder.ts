// Placeholder values in src/content/seed.ts look like "[PLACEHOLDER: what goes here]".
// Components use this to style them clearly, or to hide links that would be broken.

const PREFIX = "[PLACEHOLDER:";

export function isPlaceholder(value: string | null | undefined): boolean {
  return value == null || value.trim().startsWith(PREFIX);
}

/** "[PLACEHOLDER: founding story]" → "founding story" */
export function placeholderLabel(value: string): string {
  return value
    .trim()
    .replace(/^\[PLACEHOLDER:\s*/, "")
    .replace(/\]$/, "");
}
