/**
 * Per-example preview metadata for the docs iframes. The example markup itself
 * lives next to this file as `<primitive>/<demo>.html` — the single source of
 * truth rendered both as the live preview and the copy-paste code block.
 *
 * Only list demos that need something non-default (scripts, a minimum height to
 * fit an open popover, or centered alignment). Everything else uses defaults.
 *
 * This module is part of the `zazz/` source of truth and imports nothing from
 * the app.
 */

export interface ExampleMeta {
  /** Accessible title for the iframe. */
  title?: string;
  /** Runtime scripts to inject (keys map to tags in lib/zazz-iframe.ts). */
  requiresScripts?: string[];
  /** Floor height in px — use when an open popover/menu would be clipped. */
  minHeight?: number;
  /** Cross-axis alignment of the demo within the padded preview body. */
  align?: "start" | "center";
}

export const examples: Record<string, ExampleMeta> = {
  "dropdown/default": { minHeight: 320 },
  "navigation-menu/default": { minHeight: 360 },
  "carousel/default": { requiresScripts: ["embla"] },
};

export function getExampleMeta(src: string): ExampleMeta | undefined {
  return examples[src];
}
