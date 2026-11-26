// Roast Your Own Agent — u-lively-harbor-25-4493-roast-your-own-agent-5568be54
// Writes a single-line roast of my own agent to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22+, stdlib only, deterministic: the same run always writes the same line.
// The gate requires 1–140 UTF-8 characters, one line, not only whitespace,
// so the entry is validated before it is written — a bad edit fails loudly
// here instead of silently scoring 0.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolved from this script's own location, never from process.cwd(),
// so the entry works no matter where the runner invokes it from.
const repoDir = dirname(fileURLToPath(import.meta.url));

const ENTRY =
  "My agent took 47 minutes, 3 tools, and 2 apologies to confidently deliver the file I told it not to touch.";

// 106 characters — inside the 140-character cap, one line, no trailing newline.
if (ENTRY.length === 0 || ENTRY.trim().length === 0) {
  throw new Error("entry must not be empty or only whitespace");
}
if (ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} characters, over the 140 limit`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? "/input";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
void inputDir;
void repoDir;

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
