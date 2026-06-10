"use strict";

/**
 * @fileoverview Embla Carousel initialization and controls.
 * @description Discovers carousel markup via `data-embla` attributes, initializes
 * Embla instances with optional plugins, and wires navigation, keyboard, dialog,
 * and lightbox behaviors.
 *
 * Structure (`data-embla="<role>"`):
 * - `root` — Carousel container; holds all config attributes
 * - `viewport` — Visible window (required)
 * - `container` — Slides flex track
 * - `slide` — Individual slide
 * - `prev` / `next` — Navigation buttons (optional)
 * - `dots` / `dot` — Dot pagination container and template dot (optional)
 * - `thumbs` — Linked thumb carousel container (optional)
 *
 * thumb navigation (on `data-embla="thumbs"`):
 * - `data-embla-thumbs-*` — thumb carousel options (defaults: containScroll keepSnaps, dragFree true)
 * - Syncs with the main carousel in the same root
 *
 * Lifecycle and dialog start index:
 * - `data-embla-init` — Set by script when a carousel is initialized
 * - `data-embla-start` — On a trigger; slide index to open to (pairs with commandfor)
 * - `data-embla-start-index` — Set on root by script; consumed when dialog opens
 * - `data-embla-keyboard` — Set to `"false"` to disable ArrowLeft/ArrowRight navigation
 *
 * Configuration (on `data-embla="root"`):
 * - `data-embla-*` — Core Embla options
 * - `data-embla-autoplay` / `data-embla-autoplay-*` — Autoplay plugin
 * - `data-embla-autoscroll` / `data-embla-autoscroll-*` — Auto scroll plugin
 * - `data-embla-classnames` / `data-embla-classnames-*` — Class names plugin
 *
 * @see https://www.embla-carousel.com/docs/api/options#reference
 * @see https://www.embla-carousel.com/docs/plugins/autoplay#options
 * @see https://www.embla-carousel.com/docs/plugins/auto-scroll#options
 * @see https://www.embla-carousel.com/docs/plugins/class-names#options
 * @see https://www.embla-carousel.com/docs/plugins/ssr#options
 *
 * @example
 * data-embla-loop="true"
 *
 * @example
 * data-embla-align="start"
 *
 * @example
 * data-embla-autoplay data-embla-autoplay-delay="3000"
 *
 * @example
 * data-embla-autoscroll data-embla-autoscroll-speed="2"
 *
 * @example
 * data-embla-classnames data-embla-classnames-snapped="is-snapped"
 *
 * @example Barebones carousel (4 text slides; auto-inits on DOMContentLoaded):
 * <div data-embla="root">
 *   <div data-embla="viewport">
 *     <div data-embla="container">
 *       <div data-embla="slide">Slide 1</div>
 *       <div data-embla="slide">Slide 2</div>
 *       <div data-embla="slide">Slide 3</div>
 *       <div data-embla="slide">Slide 4</div>
 *     </div>
 *   </div>
 *   <button type="button" data-embla="prev">Prev</button>
 *   <button type="button" data-embla="next">Next</button>
 * </div>
 */

// --- Dot navigation ---

/**
 * @description Adds dot navigation buttons and click handlers for an Embla carousel.
 *
 * @param {EmblaCarouselType} emblaApi - The Embla carousel API instance.
 * @param {Element} dotsNode - Container element for dot navigation.
 * @returns {(() => void)|undefined} Cleanup function to remove dots.
 */
const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
  if (!dotsNode) return;

  const templateDot = dotsNode.querySelector('[data-embla="dot"]');
  if (!templateDot) return;

  let dotNodes = /** @type {HTMLElement[]} */ ([]);

  /**
   * @description Creates dot buttons for each slide and binds click handlers.
   *
   * @private
   */
  const addDotBtnsWithClickHandlers = () => {
    const snapCount = emblaApi.scrollSnapList().length;

    dotsNode.innerHTML = "";

    if (snapCount <= 1) {
      dotNodes = [];
      return;
    }

    dotNodes = [];
    for (let i = 0; i < snapCount; i++) {
      const dot = /** @type {HTMLElement} */ (templateDot.cloneNode(true));
      dotNodes.push(dot);
      dotsNode.appendChild(dot);

      dot.addEventListener("click", () => emblaApi.scrollTo(i), false);
    }
  };

  /**
   * @description Updates the active state of dot buttons based on the current slide.
   *
   * @private
   */
  const toggleDotBtnsActive = () => {
    if (!dotNodes.length) return;

    const selected = emblaApi.selectedScrollSnap();
    dotNodes.forEach((dotNode, idx) => {
      dotNode.classList.toggle("is-active", idx === selected);
    });
  };

  emblaApi
    .on("init", addDotBtnsWithClickHandlers)
    .on("reInit", addDotBtnsWithClickHandlers)
    .on("init", toggleDotBtnsActive)
    .on("reInit", toggleDotBtnsActive)
    .on("select", toggleDotBtnsActive);

  return () => {
    dotsNode.innerHTML = "";
  };
};

// --- thumb navigation ---

/**
 * @description Adds click handlers on thumb slides to scroll the main carousel.
 *
 * @param {EmblaCarouselType} emblaApiMain - Main carousel API instance.
 * @param {EmblaCarouselType} emblaApiThumb - thumb carousel API instance.
 */
const addThumbClickHandlers = (emblaApiMain, emblaApiThumb) => {
  const slidesthumbs = emblaApiThumb.slideNodes();

  slidesthumbs.forEach((/** @type {HTMLElement} */ slideNode, /** @type {number} */ index) => {
    slideNode.addEventListener("click", () => emblaApiMain.scrollTo(index), false);
  });
};

/**
 * @description Keeps the thumb carousel and active state in sync with the main carousel.
 *
 * @param {EmblaCarouselType} emblaApiMain - Main carousel API instance.
 * @param {EmblaCarouselType} emblaApiThumb - thumb carousel API instance.
 */
const addTogglethumbsActive = (emblaApiMain, emblaApiThumb) => {
  const slidesthumbs = emblaApiThumb.slideNodes();

  /**
   * @description Scrolls thumbs to the selected snap and toggles active classes.
   *
   * @private
   */
  const toggleThumbBtnsActive = () => {
    const selected = emblaApiMain.selectedScrollSnap();
    emblaApiThumb.scrollTo(selected);

    slidesthumbs.forEach((/** @type {HTMLElement} */ slideNode, /** @type {number} */ idx) => {
      const isActive = idx === selected;
      slideNode.classList.toggle("is-active", isActive);
      if (isActive) {
        slideNode.setAttribute("aria-current", "true");
      } else {
        slideNode.removeAttribute("aria-current");
      }
    });
  };

  emblaApiMain.on("select", toggleThumbBtnsActive);
  toggleThumbBtnsActive();
};

// --- Drag-aware click suppression ---

/**
 * Deadline (ms, `performance.now()`) until which invoker `command` events are
 * cancelled because a carousel drag just ended. Set by bindDragClickSuppression
 * for command-bearing slides (the lightbox stage) and enforced by
 * initCommandDragGuard. A bare `click` guard is not enough: the native /
 * polyfilled invoker opens the dialog from its own `command` dispatch.
 */
let suppressCommandsUntil = 0;

/**
 * @description Suppresses click activation immediately after a drag gesture.
 *
 * This prevents click-style actions (invoker commands, thumb navigation clicks)
 * from firing when the intent was dragging the carousel.
 *
 * @param {Element} root - Embla root/subtree to monitor.
 * @param {EmblaCarouselType} emblaApi - Carousel instance tied to this root.
 * @param {string} clickSelector - Click targets to suppress after dragging.
 * @param {{ dragThresholdPx?: number }} [options] - Per-carousel drag tolerance.
 * @returns {void}
 */
function bindDragClickSuppression(root, emblaApi, clickSelector, options = {}) {
  const DRAG_THRESHOLD_PX = options.dragThresholdPx ?? 6;
  const SUPPRESS_WINDOW_MS = 250;
  // Slides that open a dialog (command="show-modal") also need command suppression.
  const guardsCommands = clickSelector.includes("commandfor");

  let pointerDown = false;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let lastY = 0;
  let snapAtDown = 0;
  let suppressUntil = 0;

  /** @returns {number} */
  const pointerDistance = () => Math.hypot(lastX - startX, lastY - startY);

  root.addEventListener(
    "pointerdown",
    (e) => {
      if (!(e instanceof PointerEvent)) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;

      pointerDown = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      snapAtDown = emblaApi.selectedScrollSnap();
    },
    { passive: true },
  );

  root.addEventListener(
    "pointermove",
    (e) => {
      if (!pointerDown || !(e instanceof PointerEvent)) return;
      lastX = e.clientX;
      lastY = e.clientY;
      if (moved) return;

      if (pointerDistance() >= DRAG_THRESHOLD_PX) moved = true;
    },
    { passive: true },
  );

  const finalizePointer = () => {
    if (pointerDown && moved) {
      suppressUntil = performance.now() + SUPPRESS_WINDOW_MS;
      if (guardsCommands) suppressCommandsUntil = suppressUntil;
    }
    pointerDown = false;
    moved = false;
  };

  root.addEventListener("pointerup", finalizePointer, { passive: true });
  root.addEventListener("pointercancel", finalizePointer, { passive: true });
  emblaApi.on("pointerUp", finalizePointer);

  // Touch/trackpad drags can move with tiny deltas. Treat Embla scroll as drag intent,
  // but lightbox openers need extra tolerance so minor carousel settle does not block clicks.
  emblaApi.on("scroll", () => {
    if (!pointerDown) return;

    if (guardsCommands) {
      if (pointerDistance() >= DRAG_THRESHOLD_PX || emblaApi.selectedScrollSnap() !== snapAtDown) {
        moved = true;
      }
      return;
    }

    moved = true;
  });

  root.addEventListener(
    "click",
    (e) => {
      if (performance.now() > suppressUntil) return;

      const target = e.target instanceof Element ? e.target.closest(clickSelector) : null;
      if (!target || !root.contains(target)) return;

      e.preventDefault();
      e.stopImmediatePropagation();
    },
    true,
  );
}

let commandDragGuardBound = false;

/**
 * @description Cancels invoker `command` events fired right after a carousel drag.
 *
 * Lightbox stage slides carry `command="show-modal"`, so a drag would both scroll
 * the carousel and open the dialog. The `command` event (native or polyfill) is
 * the single point that runs the built-in command, and it is cancelable — so we
 * preventDefault() it within the drag-suppress window. Bound once on `document` in
 * the capture phase; `command` does not bubble, but capture still reaches it.
 *
 * @returns {void}
 */
function initCommandDragGuard() {
  if (commandDragGuardBound) return;
  commandDragGuardBound = true;

  document.addEventListener(
    "command",
    (e) => {
      if (e.cancelable && performance.now() <= suppressCommandsUntil) e.preventDefault();
    },
    true,
  );
}

// --- Carousel initialization ---

/**
 * @description Initializes a single Embla carousel root.
 *
 * Configures the carousel from its `data-embla-*` attributes, wires navigation
 * (prev/next, dots, thumbs), and stores the API on `root._emblaApi`. Idempotent:
 * skips roots that are already initialized or inside a closed dialog (no
 * measurable viewport until open).
 *
 * Called by `initEmblaCarousels()` for legacy `data-embla="root"` markup and by
 * the `<embla-carousel>` web component (zazz/scripts/carousel.js) on connect.
 *
 * @param {Element} emblaNode - The carousel root element.
 * @returns {void}
 */
function initEmblaRoot(emblaNode) {
  if (emblaNode.hasAttribute("data-embla-init")) return;

  // Defer init inside closed dialogs — viewport has no measurable size until open
  if (emblaNode.closest("dialog:not([open])")) return;

  emblaNode.setAttribute("data-embla-init", "");

  const emblathumbsNode = emblaNode.querySelector('[data-embla="thumbs"]');
  const emblaViewportNode = emblathumbsNode
    ? emblaNode.querySelector('[data-embla="viewport"]:not([data-embla="thumbs"] *)')
    : emblaNode.querySelector('[data-embla="viewport"]');
  const emblaPrevButtonNode = emblaNode.querySelector('[data-embla="prev"]');
  const emblaNextButtonNode = emblaNode.querySelector('[data-embla="next"]');
  const emblaDotsNode = emblaNode.querySelector('[data-embla="dots"]');

  if (!emblaViewportNode) return;

  if (!emblaViewportNode.hasAttribute("tabindex")) {
    emblaViewportNode.setAttribute("tabindex", "0");
  }

  const apiOptions = Utils.parseDataAttributes(emblaNode, "data-embla-");

  // Keep plugin keys out of core Embla options
  Object.keys(apiOptions).forEach(function (key) {
    if (
      key === "name" ||
      key === "keyboard" ||
      key === "autoplay" ||
      key === "autoscroll" ||
      key === "classnames" ||
      key.startsWith("autoplay") ||
      key.startsWith("autoscroll") ||
      key.startsWith("classnames")
    ) {
      delete apiOptions[key];
    }
  });

  const autoplayOptions = Utils.parseDataAttributes(emblaNode, "data-embla-autoplay-");
  const autoscrollOptions = Utils.parseDataAttributes(emblaNode, "data-embla-autoscroll-");
  const classnamesOptions = Utils.parseDataAttributes(emblaNode, "data-embla-classnames-");

  const plugins = [];

  if (emblaNode.hasAttribute("data-embla-autoplay") || Object.keys(autoplayOptions).length > 0) {
    plugins.push(EmblaCarouselAutoplay(autoplayOptions));
  }

  if (
    emblaNode.hasAttribute("data-embla-autoscroll") ||
    Object.keys(autoscrollOptions).length > 0
  ) {
    plugins.push(EmblaCarouselAutoScroll(autoscrollOptions));
  }

  if (
    emblaNode.hasAttribute("data-embla-classnames") ||
    Object.keys(classnamesOptions).length > 0
  ) {
    plugins.push(EmblaCarouselClassNames(classnamesOptions));
  }

  const emblaApi = EmblaCarousel(emblaViewportNode, apiOptions, plugins);

  emblaNode._emblaApi = emblaApi;

  if (emblaPrevButtonNode) {
    emblaPrevButtonNode.addEventListener("click", () => emblaApi.scrollPrev(), false);
  }

  if (emblaNextButtonNode) {
    emblaNextButtonNode.addEventListener("click", () => emblaApi.scrollNext(), false);
  }

  if (emblaDotsNode) {
    addDotBtnsAndClickHandlers(emblaApi, emblaDotsNode);
  }

  if (emblaNode.classList.contains("lightbox__stage")) {
    bindDragClickSuppression(emblaNode, emblaApi, ".lightbox__slide[commandfor]", {
      dragThresholdPx: 14,
    });
  }

  if (emblathumbsNode) {
    const emblathumbsViewportNode = emblathumbsNode.querySelector('[data-embla="viewport"]');
    if (emblathumbsViewportNode) {
      const thumbDefaults = { containScroll: "keepSnaps", dragFree: true };
      const thumbOptions = Utils.parseDataAttributes(emblathumbsNode, "data-embla-thumbs-");
      const emblaApiThumb = EmblaCarousel(emblathumbsViewportNode, {
        ...thumbDefaults,
        ...thumbOptions,
      });

      emblaNode._emblaApiThumb = emblaApiThumb;
      addThumbClickHandlers(emblaApi, emblaApiThumb);
      addTogglethumbsActive(emblaApi, emblaApiThumb);

      bindDragClickSuppression(emblathumbsNode, emblaApiThumb, ".lightbox__thumb");
    }
  }
}

/**
 * @description Initializes all Embla carousels within a scope.
 *
 * Discovers carousel elements via `[data-embla="root"]` and configures them
 * based on their data attributes. Roots managed by the `<embla-carousel>` web
 * component are skipped — they initialize themselves via `connectedCallback()`.
 *
 * @param {Document|Element} [scope=document] - Root element to search within.
 * @returns {void}
 */
function initEmblaCarousels(scope) {
  const root = scope || document;
  const emblaRoots = root.querySelectorAll('[data-embla="root"]');

  emblaRoots.forEach(function (emblaNode) {
    // <embla-carousel> elements own their lifecycle (init on connect, destroy
    // on disconnect) — double-initializing would leak a second Embla instance.
    if (emblaNode.closest("embla-carousel")) return;

    initEmblaRoot(emblaNode);
  });
}

// --- Dialog open observer ---

/**
 * @description Re-initializes Embla carousels inside dialogs when they open.
 *
 * Dialogs are `display: none` until opened, so Embla cannot measure the viewport
 * at page load. This observer initializes any uninitialized carousels when the
 * `open` attribute is added.
 *
 * @returns {void}
 */
function observeDialogOpen() {
  const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "open" &&
        mutation.target instanceof HTMLDialogElement &&
        mutation.target.hasAttribute("open")
      ) {
        const dialog = mutation.target;
        initEmblaCarousels(dialog);

        const roots = dialog.querySelectorAll('[data-embla="root"]');
        roots.forEach(function (root) {
          const startIndex = root.getAttribute("data-embla-start-index");
          if (startIndex != null && root._emblaApi) {
            root._emblaApi.scrollTo(Number(startIndex), true);
            root.removeAttribute("data-embla-start-index");
          }

          const viewport = root.querySelector('[data-embla="viewport"]');
          if (viewport instanceof HTMLElement) {
            viewport.focus({ preventScroll: true });
          }
        });
      }
    }
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["open"],
    subtree: true,
  });
}

// --- Keyboard navigation ---

/**
 * @description Returns the active Embla root for keyboard navigation.
 *
 * Prefers a carousel inside an open dialog, then the carousel containing focus.
 * Respects `data-embla-keyboard="false"`.
 *
 * @returns {(Element & {_emblaApi: EmblaCarouselType})|null} The active carousel root, or null when none applies.
 * @private
 */
function getActiveEmblaRoot() {
  const openDialog = document.querySelector("dialog[open]");
  if (openDialog) {
    const dialogRoot = openDialog.querySelector('[data-embla="root"][data-embla-init]');
    if (dialogRoot?._emblaApi && dialogRoot.getAttribute("data-embla-keyboard") !== "false") {
      return /** @type {Element & {_emblaApi: EmblaCarouselType}} */ (dialogRoot);
    }
  }

  const focusedRoot = document.activeElement?.closest('[data-embla="root"][data-embla-init]');
  if (focusedRoot?._emblaApi && focusedRoot.getAttribute("data-embla-keyboard") !== "false") {
    return /** @type {Element & {_emblaApi: EmblaCarouselType}} */ (focusedRoot);
  }

  return null;
}

/**
 * @description Binds ArrowLeft/ArrowRight keyboard navigation for active carousels.
 *
 * Embla is headless — arrow keys are not built in. Opt out per carousel with
 * `data-embla-keyboard="false"`.
 *
 * @type {InitEmblaKeyboardNavFn}
 */
const initEmblaKeyboardNav = function () {
  if (initEmblaKeyboardNav._bound) return;
  initEmblaKeyboardNav._bound = true;

  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (e.defaultPrevented) return;

    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      target.isContentEditable
    ) {
      return;
    }

    const root = getActiveEmblaRoot();
    if (!root) return;

    e.preventDefault();
    if (e.key === "ArrowLeft") root._emblaApi.scrollPrev();
    else root._emblaApi.scrollNext();
  });
};

/**
 * @namespace EmblaInit
 * @description Public API for Embla carousel initialization and helpers.
 *
 * @property {typeof initEmblaCarousels} init - Initializes all carousels within a scope.
 * @property {typeof initEmblaRoot} initRoot - Initializes a single carousel root (used by `<embla-carousel>`).
 * @property {typeof addDotBtnsAndClickHandlers} addDotBtnsAndClickHandlers - Wires dot pagination.
 * @property {typeof addThumbClickHandlers} addThumbClickHandlers - Wires thumb click handlers.
 * @property {typeof addTogglethumbsActive} addTogglethumbsActive - Syncs thumb active state.
 */
const EmblaInit = {
  init: initEmblaCarousels,
  initRoot: initEmblaRoot,
  addDotBtnsAndClickHandlers,
  addThumbClickHandlers,
  addTogglethumbsActive,
};

// --- Start index control ---

/**
 * @description Stores or applies a start slide index from `[data-embla-start]` triggers.
 *
 * Clicking an element with `data-embla-start="N"` stores that index on the target
 * carousel (found via `commandfor` → dialog → `[data-embla="root"]`). The dialog
 * open observer scrolls to it on open.
 *
 * @returns {void}
 */
function initEmblaStartLinks() {
  document.addEventListener("click", function (e) {
    if (!(e.target instanceof HTMLElement)) return;

    const trigger = e.target.closest("[data-embla-start], [data-embla='slide'][commandfor]");
    if (!trigger) return;

    let index = trigger.getAttribute("data-embla-start");
    if (index == null && trigger.hasAttribute("commandfor")) {
      const emblaRoot = trigger.closest('[data-embla="root"]');
      if (emblaRoot?._emblaApi) {
        index = String(emblaRoot._emblaApi.selectedScrollSnap());
      }
    }

    const dialogId = trigger.getAttribute("commandfor");
    if (!dialogId) return;

    const dialog = document.getElementById(dialogId);
    if (!dialog) return;

    const root = dialog.querySelector('[data-embla="root"]');
    if (!root) return;

    if (root._emblaApi) {
      root._emblaApi.scrollTo(Number(index), true);
    } else if (index != null) {
      root.setAttribute("data-embla-start-index", index);
    }
  });
}

// --- Lightbox close sync ---

/**
 * @description Syncs the inline gallery to the last viewed slide when a lightbox closes.
 *
 * @returns {void}
 */
function initLightboxCloseSync() {
  document.addEventListener(
    "close",
    function (e) {
      const dialog = e.target;
      if (!(dialog instanceof HTMLDialogElement)) return;
      if (!dialog.classList.contains("lightbox__dialog")) return;

      const lightbox = dialog.closest(".lightbox");
      if (!lightbox) return;

      const dialogRoot = dialog.querySelector('[data-embla="root"]');
      const galleryRoot = lightbox.querySelector('.lightbox__gallery [data-embla="root"]');
      if (!dialogRoot?._emblaApi || !galleryRoot?._emblaApi) return;

      galleryRoot._emblaApi.scrollTo(dialogRoot._emblaApi.selectedScrollSnap());
    },
    true,
  );
}

// Auto-initialize when DOM is ready (only in browser environment)
if (typeof window !== "undefined" && typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initEmblaCarousels();
      observeDialogOpen();
      initEmblaStartLinks();
      initEmblaKeyboardNav();
      initLightboxCloseSync();
      initCommandDragGuard();
    });
  } else {
    initEmblaCarousels();
    observeDialogOpen();
    initEmblaStartLinks();
    initEmblaKeyboardNav();
    initLightboxCloseSync();
    initCommandDragGuard();
  }
}

// Export for module environments or attach to window
if (typeof module !== "undefined" && module.exports) {
  module.exports = EmblaInit;
} else if (typeof define === "function" && define.amd) {
  define([], function () {
    return EmblaInit;
  });
} else if (typeof window !== "undefined") {
  window.EmblaInit = EmblaInit;
}
