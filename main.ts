// Entry point for the make.fun news-image-20261121 competition.
// This entry's image is baked into the repository as poster/entry.png;
// the program publishes it to the output directory, unchanged.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, "poster", "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const bytes = readFileSync(src);
if (bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47) {
  throw new Error("poster/entry.png is not a PNG");
}
if (bytes.length > 1048576) throw new Error("entry.png is over the 1 MiB cap");
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
console.log(`wrote ${join(outDir, "entry.png")} ${bytes.length} bytes`);
