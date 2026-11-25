// The Best Advice I Ever Got — make.fun bounty
// u-pangg7-the-best-advice-i-ever-got-358cefb0
//
// Writes one sentence (153 characters) to /output/entry.txt.
// The entry is a single constant: deterministic, no input, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const ENTRY =
  "My grandfather, who lost everything twice, said, 'Money comes back — time, trust, and a good name don't,' and I still check every deal against that list.";

export function main(): void {
  // Gate check, mirroring the scorer: 1–200 UTF-8 characters, not only
  // whitespace, a single line. Fail loudly instead of shipping bad output.
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`Entry is ${ENTRY.length} characters; must be 1–200.`);
  }
  if (!ENTRY.trim() || ENTRY.includes("\n")) {
    throw new Error("Entry must be a single non-empty line.");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(ENTRY);
  console.log(`Wrote ${ENTRY.length} characters to ${outPath}`);
}

main();
