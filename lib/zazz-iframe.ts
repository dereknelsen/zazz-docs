/**
 * Builds the full HTML document for a preview iframe. Each preview is a real,
 * isolated document that loads ONLY Zazz (served at /zazz/styles.css) plus any
 * runtime scripts a demo needs — so Zazz's reset/utilities and the docs'
 * Tailwind/fumadocs styles can never touch each other.
 *
 * Pure string builder: no fs, safe to import from client components.
 */

export type ScriptKey = "utils" | "reveal" | "embla" | "popover-polyfill";

/**
 * Loaded in every preview so demos behave like a real Zazz page: the popover
 * polyfill (dropdown/nav/dialog on older browsers), `utils` (window.Utils
 * helpers), and `reveal` (scroll-entry animations — a no-op when no
 * `[data-reveal]` elements exist). `embla` is added per-demo via the manifest
 * because it also needs the Embla CDN libs.
 */
const DEFAULT_SCRIPTS = ["popover-polyfill", "utils", "reveal"];

const SCRIPT_TAGS: Record<string, string[]> = {
  utils: ['<script src="/zazz/scripts/utils.js"></script>'],
  reveal: ['<script src="/zazz/scripts/reveal.js"></script>'],
  "popover-polyfill": [
    '<script src="https://cdn.jsdelivr.net/npm/@oddbird/popover-polyfill@latest"></script>',
  ],
  embla: [
    '<script src="https://unpkg.com/embla-carousel/embla-carousel.umd.js"></script>',
    '<script src="https://unpkg.com/embla-carousel-autoplay/embla-carousel-autoplay.umd.js"></script>',
    '<script src="https://unpkg.com/embla-carousel-auto-scroll/embla-carousel-auto-scroll.umd.js"></script>',
    '<script src="https://unpkg.com/embla-carousel-class-names/embla-carousel-class-names.umd.js"></script>',
    '<script src="/zazz/scripts/utils.js"></script>',
    '<script src="/zazz/scripts/embla.js"></script>',
  ],
};

export interface PreviewDocumentOptions {
  /** The vanilla example markup. */
  html: string;
  /** Runtime scripts this demo needs (default: none). */
  scripts?: string[];
  /** Cross-axis alignment of the demo within the padded body. */
  align?: "start" | "center";
}

export function buildPreviewDocument({
  html,
  scripts = [],
  align = "start",
}: PreviewDocumentOptions): string {
  const scriptTags = Array.from(
    new Set([...DEFAULT_SCRIPTS, ...scripts].flatMap((key) => SCRIPT_TAGS[key] ?? [])),
  ).join("\n    ");
  const alignItems = align === "center" ? "center" : "flex-start";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/zazz/styles.css" />
    <style>
      :root {
        --font-geist-sans: "Geist", sans-serif;
        --font-geist-mono: "Geist Mono", ui-monospace, monospace;
      }
      body {
        padding: var(--gap-lg);
        align-items: ${alignItems};
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
        }
      }
    </style>
  </head>
  <body>
    ${html}
    ${scriptTags}
  </body>
</html>`;
}
