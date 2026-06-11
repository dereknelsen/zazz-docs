import type { ExampleScript } from "zazz/components/manifest";

/**
 * Builds the full HTML document for a component-preview iframe. The example fragment is
 * wrapped in a minimal page that loads the real Zazz stylesheet and (conditionally) its
 * scripts, so the iframe is the *only* place Zazz CSS runs on the docs site — fully
 * sandboxed from Tailwind + fumadocs.
 *
 * Styling loads as the single `main.css` bundle by absolute URL from the `/zazz/*` route
 * (see `app/zazz/[...path]/route.ts`); its relative `@import "./_*.css"` rules resolve
 * against that URL. One request to maintain — the server's brotli/gzip handles transfer
 * size. Pure string building — safe to run on the client.
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
}: BuildPreviewOptions): string {
  // One bundle: main.css @imports every layer in cascade order. No separate preload —
  // a same-document stylesheet link is already the highest-priority, render-blocking
  // fetch; the server's brotli/gzip handles transfer size.
  const styles = `<link rel="stylesheet" href="/zazz/styles/main.css">`;

  const needsCarousel = scripts.includes("carousel") || scripts.includes("lightbox");
  const needsEmbla = scripts.includes("embla") || needsCarousel;
  const needsLightbox = scripts.includes("lightbox");
  const needsPassword = scripts.includes("password");
  const needsTabs = scripts.includes("tabs");
  const needsReveal = scripts.includes("reveal");

  // navigation.js is intentionally excluded — it hijacks navigation for the full app.
  const zazzScripts: string[] = [];
  if (needsEmbla) zazzScripts.push("/zazz/scripts/utils.js"); // embla.js depends on Utils
  if (needsReveal) zazzScripts.push("/zazz/scripts/reveal.js"); // standalone
  if (needsEmbla) zazzScripts.push("/zazz/scripts/embla.js");
  if (needsCarousel) zazzScripts.push("/zazz/scripts/carousel.js"); // <embla-carousel>, needs embla.js
  if (needsLightbox) zazzScripts.push("/zazz/scripts/lightbox.js"); // <media-lightbox>, needs carousel.js
  if (needsPassword) zazzScripts.push("/zazz/scripts/password.js"); // <input-password>, standalone
  if (needsTabs) zazzScripts.push("/zazz/scripts/tabs.js"); // <tab-group>, standalone

  const emblaCdn = needsEmbla ? EMBLA_CDN : "";
  const scriptTags = zazzScripts.map((src) => `<script src="${src}" defer></script>`).join("\n");

  return /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
${FONTS}
${styles}
${POLYFILLS}
${BLOCK_NAVIGATION}
${emblaCdn}
${scriptTags}
<script>
  /**
   * Synchronizes the preview theme with the user's preference.
   * - Reads "theme" from localStorage.
   * - Falls back to "prefers-color-scheme: dark" media query if unset.
   * - Applies the "dark" class to document.documentElement if theme is "dark".
   * - Saves the resolved theme to localStorage for consistency.
   * This block runs synchronously before dom load to prevent theme flash on load.
   */
  (() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme ?? (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  })();
</script>
<style>
  html, body { margin: 0; background: var(--background); color: var(--foreground); block-size: 100%; inline-size: 100%; overflow: clip; }
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
    overflow: auto;
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
