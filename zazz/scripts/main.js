/**
 * @fileoverview Zazz — single entry point for every component script.
 * @description Imports all Zazz behavior modules so a page needs only one
 * `<script type="module" src=".../main.js">` instead of eight separate tags.
 * Each module runs for its side effects: global/utility setup, scroll-reveal
 * and carousel auto-initialization, SPA navigation, and the custom-element
 * registrations (`<embla-carousel>`, `<media-lightbox>`, `<input-password>`,
 * `<tab-group>`, `<toast-region>`).
 *
 * Internal dependencies are resolved by the module graph — utils.js loads
 * before embla.js, embla.js before carousel.js, carousel.js before
 * lightbox.js — so the import order below is for readability, not correctness.
 *
 * External dependency: Embla carousels also need the Embla CDN UMD bundles
 * loaded as `defer` scripts *before* this module (embla.js reads them as
 * globals). Defer scripts and module scripts execute in document order, so
 * place the CDN `<script defer>` tags ahead of this one. Omit them on pages
 * with no carousels — embla.js only touches those globals when a carousel
 * is present.
 */

import "./utils.js";
import "./reveal.js";
import "./embla.js";
import "./carousel.js";
import "./lightbox.js";
import "./password.js";
import "./tabs.js";
import "./toaster.js";
import "./navigation.js";
