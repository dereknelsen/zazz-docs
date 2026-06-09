/**
 * Per-example presentation metadata for the docs previews. Keyed by example id
 * (`"<component>/<example>"`, matching `zazz/components/<id>.html`).
 *
 * Only deviations from the defaults need an entry — anything omitted renders
 * left-aligned with no minimum height and no scripts. Set `minHeight` for components
 * whose UI escapes the trigger (dialogs, popovers, dropdowns, the select picker) so the
 * overlay has room inside the iframe, and `requiresScripts` for anything JS-driven.
 */

export type ExampleScript = "embla" | "reveal";

export interface ExampleMeta {
  /** Human label for the iframe `title` (a11y). */
  title?: string;
  /** Horizontal placement of the demo within the preview frame. */
  align?: "start" | "center";
  /** Minimum iframe height in px — gives overlays/popovers room to render. */
  minHeight?: number;
  /** Zazz scripts to load (plus their CDN deps). Default: none. */
  requiresScripts?: ExampleScript[];
}

const MANIFEST: Record<string, ExampleMeta> = {
  // Overlays — need vertical room so the popover/dialog/menu shows in-frame.
  "tooltip/default": { align: "center", minHeight: 180 },
  "tooltip/with-kbd": { align: "center", minHeight: 180 },
  "tooltip/sides": { align: "center", minHeight: 260 },
  "tooltip/disabled": { align: "center", minHeight: 180 },
  "dialog/default": { align: "center", minHeight: 460 },
  "dialog/with-form": { align: "center", minHeight: 460 },
  "dialog/is-alert": { align: "center", minHeight: 460 },
  "dropdown/default": { align: "center", minHeight: 320 },
  "navigation-menu/default": { align: "center", minHeight: 380 },
  "select/default": { align: "start", minHeight: 240 },

  // Carousel/lightbox — Embla (+ its CDN bundles) and the modal stage.
  "lightbox/default": { align: "center", minHeight: 500, requiresScripts: ["embla"] },

  // Showcase primitives — centered reads better than left-pinned.
  "card/basic": { align: "center", minHeight: 380 },
  "avatar/default": { align: "center", minHeight: 160 },
  "badge/variants": { align: "center" },
  "badge/icon": { align: "center" },
  "switch/default": { align: "center", minHeight: 140 },
  "slider/default": { minHeight: 140 },
  "checkbox/default": { minHeight: 140 },
  "radio/default": { minHeight: 160 },
  "accordion/default": { minHeight: 220 },
  "tabs/default": { minHeight: 260 },
};

/** Returns presentation metadata for an example id, or `undefined` for defaults. */
export function getExampleMeta(src: string): ExampleMeta | undefined {
  return MANIFEST[src.replace(/\.html$/, "")];
}
