import type { ExampleScript } from "zazz/components/manifest";

/**
 * Builds the full HTML document for a component-preview iframe. The example fragment is
 * wrapped in a minimal page that loads the real Zazz stylesheet and (conditionally) its
 * scripts, so the iframe is the *only* place Zazz CSS runs on the docs site — fully
 * sandboxed from Tailwind + fumadocs.
 *
 * Assets load by absolute URL from the `/zazz/*` route (see `app/zazz/[...path]/route.ts`)
 * rather than being inlined: `main.css` is an `@import` bundle, so it must be fetched as a
 * file for its relative `@import "./_*.css"` rules to resolve. Pure string building — safe
 * to run on the client.
 */

export interface BuildPreviewOptions {
  /** The example markup fragment (from `readExample`). */
  html: string;
  /** Zazz scripts the example needs; their CDN deps are added automatically. */
  scripts?: ExampleScript[];
  /** Vertical placement of the demo. */
  justify?: "start" | "center" | "end";
  /** Horizontal placement of the demo. */
  align?: "start" | "center" | "end";
  /** Minimum body height in px — keeps overlays (dialogs/popovers) in view. */
  minHeight?: number;
  /**
   * Zazz stylesheet URLs in cascade order (from `listStyleHrefs`). Each is linked
   * directly with a preload hint so the browser fetches them in parallel instead of
   * waterfalling `main.css`'s `@import` chain. Falls back to the `main.css` bundle when
   * omitted.
   */
  styleHrefs?: string[];
}

const FONTS = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:ital,wght@0,100..900;1,100..900&family=Geist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">`;

// Native in modern engines; the polyfills keep previews consistent across browsers and
// power tooltips (interestfor), dialogs (command/commandfor), dropdowns/menus (popover).
const POLYFILLS = `
<script src="https://cdn.jsdelivr.net/npm/@oddbird/popover-polyfill@latest" crossorigin="anonymous" defer></script>
<script type="module" src="https://esm.sh/invokers/compatible" crossorigin="anonymous" defer></script>`;

// Prevent any link from navigating away from the preview iframe.
const BLOCK_NAVIGATION = `
<script>
document.addEventListener('click', function(e) {
  var link = e.target.closest('a[href]');
  if (link) e.preventDefault();
}, true);
</script>`;

// Loaded only when an example needs Embla. Order matters: the UMD bundles attach globals
// that embla.js reads, and all are `defer` so execution order follows document order.
const EMBLA_CDN = [
  "https://unpkg.com/embla-carousel/embla-carousel.umd.js",
  "https://unpkg.com/embla-carousel-autoplay/embla-carousel-autoplay.umd.js",
  "https://unpkg.com/embla-carousel-auto-scroll/embla-carousel-auto-scroll.umd.js",
  "https://unpkg.com/embla-carousel-class-names/embla-carousel-class-names.umd.js",
  "https://unpkg.com/embla-carousel-ssr/embla-carousel-ssr.umd.js",
]
  .map((src) => `<script src="${src}" crossorigin="anonymous" defer></script>`)
  .join("\n");

export function buildPreviewDocument({
  html,
  scripts = [],
  minHeight = 0,
  align = "center",
  justify = "center",
  styleHrefs,
}: BuildPreviewOptions): string {
  // Preload every sheet, then link them in cascade order — parallel fetch, no @import
  // waterfall. Fall back to the bundle if the ordered list wasn't provided.
  const styles =
    styleHrefs && styleHrefs.length > 0
      ? styleHrefs.map((href) => `<link rel="preload" href="${href}" as="style">`).join("\n") +
        "\n" +
        styleHrefs.map((href) => `<link rel="stylesheet" href="${href}">`).join("\n")
      : `<link rel="stylesheet" href="/zazz/styles/main.css">`;

  const needsEmbla = scripts.includes("embla");
  const needsReveal = scripts.includes("reveal");

  // navigation.js is intentionally excluded — it hijacks navigation for the full app.
  const zazzScripts: string[] = [];
  if (needsEmbla) zazzScripts.push("/zazz/scripts/utils.js"); // embla.js depends on Utils
  if (needsReveal) zazzScripts.push("/zazz/scripts/reveal.js"); // standalone
  if (needsEmbla) zazzScripts.push("/zazz/scripts/embla.js");

  const emblaCdn = needsEmbla ? EMBLA_CDN : "";
  const scriptTags = zazzScripts.map((src) => `<script src="${src}" defer></script>`).join("\n");

  return /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${FONTS}
${styles}
${POLYFILLS}
${BLOCK_NAVIGATION}
${emblaCdn}
${scriptTags}
<style>
  html, body { margin: 0; background: var(--background); color: var(--foreground); }
  .zazz-preview {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: ${align};
    justify-content: ${justify};
    gap: var(--gap-md);
    padding: var(--gap-md);
    inline-size: 100%;
    block-size: 100%;
    min-block-size: ${minHeight}px;
  }
</style>
</head>
  <body>
    <div class="zazz-preview">
      ${html}
    </div>
  </body>
</html>`;
}
