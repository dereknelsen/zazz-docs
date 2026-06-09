/**
 * @fileoverview Bundler entry point for Zazz styles.
 * @description Import this file from a JavaScript build tool (Vite, webpack, esbuild,
 * etc.) to pull the full Zazz stylesheet into your app bundle:
 *
 * ```ts
 * import "zazz/styles/styles.ts";
 * ```
 *
 * Each `import` below maps to one CSS partial. Together they mirror the cascade
 * order in `main.css` — this file is the single source of truth for that order.
 * The docs app parses these imports server-side to compile `/zazz/main.css`.
 *
 * **Vanilla HTML does not use this file.** Link `main.css` (or the compiled
 * `/zazz/main.css` asset) with a `<link rel="stylesheet">` tag instead — no JS
 * import or build step required.
 *
 * @see ./main.css — CSS `@import` entry for non-bundler setups
 * @see ./CONVENTIONS.md — cascade layer architecture
 */

import "./_layers.css";
import "./_properties.css";
import "./_variables.css";
import "./_reset.css";
import "./_typography.css";
import "./_badge.css";
import "./_button.css";
import "./_accordion.css";
import "./_popover.css";
import "./_tooltip.css";
import "./_dialog.css";
import "./_dropdown.css";
import "./_navigation-menu.css";
import "./_mobile-menu.css";
import "./_fields.css";
import "./_input.css";
import "./_textarea.css";
import "./_select.css";
import "./_switch.css";
import "./_input-group.css";
import "./_password-group.css";
import "./_radio.css";
import "./_tabs.css";
import "./_embla.css";
import "./_lightbox.css";
import "./_page-transitions.css";
import "./_reveal.css";
import "./_utilities.css";
