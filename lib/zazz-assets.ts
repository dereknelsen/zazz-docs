import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Server-side access to the centralized `zazz/` module (the source of truth).
 * The fumadocs app reads compiled CSS, runtime scripts, and example markup from
 * here to feed the isolated iframe previews. Nothing in `zazz/` imports back
 * into the app — this file is the one-way bridge.
 */

const ZAZZ_DIR = path.join(process.cwd(), "zazz");
const STYLES_DIR = path.join(ZAZZ_DIR, "styles");
const SCRIPTS_DIR = path.join(ZAZZ_DIR, "scripts");
const EXAMPLES_DIR = path.join(ZAZZ_DIR, "examples");

/**
 * The canonical stylesheet order is whatever `zazz/styles/load.ts` imports, in
 * order — that file is the single source of truth for "all of Zazz, composed".
 * We parse it rather than duplicate the list so the two can never drift.
 */
function styleOrder(): string[] {
  const load = fs.readFileSync(path.join(STYLES_DIR, "load.ts"), "utf8");
  const order: string[] = [];
  const re = /import\s+["']\.\/([\w-]+\.css)["'];/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(load))) order.push(match[1]);
  return order;
}

let cachedStylesheet: string | null = null;

/** The full Zazz stylesheet (all layers, in load order) as one string. */
export function getZazzStylesheet(): string {
  if (cachedStylesheet && process.env.NODE_ENV === "production") return cachedStylesheet;
  const css = styleOrder()
    .map((file) => fs.readFileSync(path.join(STYLES_DIR, file), "utf8"))
    .join("\n");
  cachedStylesheet = css;
  return css;
}

const SCRIPT_NAME = /^[a-z0-9-]+\.js$/;

/** A named runtime script from `zazz/scripts/`, or null if unknown. */
export function getZazzScript(name: string): string | null {
  if (!SCRIPT_NAME.test(name)) return null;
  const file = path.join(SCRIPTS_DIR, name);
  if (!file.startsWith(SCRIPTS_DIR + path.sep) || !fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

const EXAMPLE_SRC = /^[a-z0-9-]+\/[a-z0-9-]+$/;

/** The raw vanilla markup for an example id like `button/variants`, or null. */
export function readExample(src: string): string | null {
  if (!EXAMPLE_SRC.test(src)) return null;
  const file = path.join(EXAMPLES_DIR, `${src}.html`);
  if (!file.startsWith(EXAMPLES_DIR + path.sep) || !fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8").trim();
}

/** Every example id (`primitive/demo`) found under zazz/examples, sorted. */
export function listExamples(): string[] {
  const ids: string[] = [];
  for (const primitive of fs.readdirSync(EXAMPLES_DIR, { withFileTypes: true })) {
    if (!primitive.isDirectory()) continue;
    const dir = path.join(EXAMPLES_DIR, primitive.name);
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith(".html")) ids.push(`${primitive.name}/${file.replace(/\.html$/, "")}`);
    }
  }
  return ids.sort();
}

const PREVIEW_TAG = /<Preview\s+[^>]*?src="([^"]+)"[^>]*?\/>/g;

/**
 * Expands `<Preview src="…" />` tags in a page's processed markdown into real
 * fenced HTML code blocks, reading from the same example files the live preview
 * uses. This is what makes the docs an AI-readable source of truth: llms.txt and
 * the per-page `.md` carry the current, canonical markup — never a stale copy.
 */
export function expandPreviewsInMarkdown(markdown: string): string {
  return markdown.replace(PREVIEW_TAG, (match, src: string) => {
    const html = readExample(src);
    return html == null ? match : `\`\`\`html\n${html}\n\`\`\``;
  });
}
