// Lists every placeholder still in the site's content, grouped and de-duplicated,
// so Jacob can send the client one clear list of what's missing.
// Run: pnpm placeholders

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const SKIP = new Set([
  "node_modules",
  ".next",
  ".git",
  "docs",
  "scripts",
  "public",
  "assets",
]);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (SKIP.has(name)) return [];
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return /\.(ts|tsx)$/.test(name) ? [path] : [];
  });
}

// The placeholder mechanism itself (renders "[PLACEHOLDER: {label}]"), not content.
const MECHANISM =
  /(^|\/)(placeholder\.ts|Placeholder\.tsx|PlaceholderImage\.tsx)$/;

const found = new Map(); // file -> Set of labels
for (const file of walk(join(root, "src"))) {
  const key = relative(root, file).replaceAll("\\", "/");
  if (MECHANISM.test(key)) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  for (const line of lines) {
    if (/^\s*(\/\/|\/?\*)/.test(line)) continue; // comments
    // Literal placeholders, plus template ones like `[PLACEHOLDER: project ${n} title]`
    for (const m of line.matchAll(/\[PLACEHOLDER:\s*([^\]]+)\]/g)) {
      const label = m[1].replace(/\$\{[^}]+\}/g, "N").trim();
      if (!found.has(key)) found.set(key, new Set());
      found.get(key).add(label);
    }
  }
}

let total = 0;
for (const [file, labels] of found) {
  console.log(`\n${file}`);
  for (const label of labels) {
    console.log(`  - ${label}`);
    total++;
  }
}
console.log(`\n${total} distinct placeholder(s) in ${found.size} file(s).`);
