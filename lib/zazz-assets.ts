// Server-only by usage: imported solely by server components (`Preview`, the debug
// gallery), which render at build time. Do not import from a client component — it reads
// the filesystem.
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { ExampleScript } from "zazz/primitives/manifest";

const COMPONENTS_ROOT = path.join(process.cwd(), "zazz", "components");
const STYLES_ROOT = path.join(process.cwd(), "zazz", "styles");
const SCRIPTS_ROOT = path.join(process.cwd(), "zazz", "scripts");

const WEB_COMPONENT_SCRIPT_FILES: Partial<Record<ExampleScript, string[]>> = {
  carousel: ["carousel.js"],
  lightbox: ["carousel.js", "lightbox.js"],
  password: ["password.js"],
  tabs: ["tabs.js"],
};

/**
 * Reads one vanilla-HTML example fragment from the centralized Zazz component
 * source. `src` is an id like `button/variants` → `zazz/primitives/button/variants.html`.
 *
 * This is the single read point for example markup. `<Preview>` renders both the live
 * iframe and the code block from this one string, so no second copy can drift. Runs only
 * on the server (the docs pages are statically generated, so this executes at build time).
 *
 * @returns the file contents, or `null` if the example does not exist.
 */
export function readExample(src: string): string | null {
  const id = src.replace(/\.html$/, "");
  const filePath = path.resolve(COMPONENTS_ROOT, `${id}.html`);

  // Keep reads inside zazz/primitives — `src` comes from MDX authors, not end users,
  // but a stray `../` should still never escape the source tree.
  if (!filePath.startsWith(COMPONENTS_ROOT + path.sep)) {
    return null;
  }

  try {
    return readFileSync(filePath, "utf8").trim();
  } catch {
    return null;
  }
}

/**
 * Lists every example id (`"<component>/<example>"`) under `zazz/primitives`, excluding the
 * top-level standalone demo pages (`index.html`, `products.html`). Used by the debug
 * gallery to render every primitive at once.
 */
export function listExamples(): string[] {
  const ids: string[] = [];

  const walk = (dir: string, prefix: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const id = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), id);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        ids.push(id.replace(/\.html$/, ""));
      }
    }
  };

  walk(COMPONENTS_ROOT, "");

  // Only the nested component examples (e.g. `button/variants`) — not the root demo pages.
  return ids.filter((id) => id.includes("/")).sort();
}

/**
 * Reads the component-specific CSS partial for a given example id.
 * `src` is like `button/variants` → reads `zazz/styles/_button.css`.
 *
 * The `utilities/*` namespace is intentionally skipped: a utility demo composes
 * atomic classes rather than redrawing one component, so its "source" is the
 * entire `_utilities.css` atomic layer (>100 KB). Dumping that into a CSS tab
 * would bury the example, so utility previews show Preview + HTML only.
 *
 * @returns the file contents, or `null` if no dedicated CSS file exists.
 */
export function readComponentCss(src: string): string | null {
  const component = src.split("/")[0];
  if (component === "utilities") return null;
  const filePath = path.resolve(STYLES_ROOT, `_${component}.css`);

  if (!filePath.startsWith(STYLES_ROOT + path.sep)) return null;

  try {
    return readFileSync(filePath, "utf8").trim();
  } catch {
    return null;
  }
}

/**
 * Reads the web-component scripts an example uses, based on its manifest metadata.
 * Only custom-element scripts are shown here — shared runtime dependencies such as
 * `utils.js`, `embla.js`, and CDN bundles are implementation details of the preview iframe.
 */
export function readComponentJs(scripts?: readonly ExampleScript[]): string | null {
  if (!scripts?.length) return null;

  const files = Array.from(
    new Set(scripts.flatMap((script) => WEB_COMPONENT_SCRIPT_FILES[script] ?? [])),
  );

  if (files.length === 0) return null;

  const blocks = files.flatMap((file) => {
    const filePath = path.resolve(SCRIPTS_ROOT, file);
    if (!filePath.startsWith(SCRIPTS_ROOT + path.sep)) return [];

    try {
      return [`// ${file}\n${readFileSync(filePath, "utf8").trim()}`];
    } catch {
      return [];
    }
  });

  return blocks.length > 0 ? blocks.join("\n\n") : null;
}
