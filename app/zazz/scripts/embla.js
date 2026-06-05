"use strict";

/* ===========================================================================
Documentation:
    @see https://www.embla-carousel.com/api/options/#reference
    @see https://www.embla-carousel.com/plugins/autoplay/#options
    @see https://www.embla-carousel.com/plugins/auto-scroll/#options
    @see https://www.embla-carousel.com/plugins/class-names/#options
    @see https://www.embla-carousel.com/docs/plugins/ssr#options

    
    Example usage:
    @example data-embla-align="start"
    @example data-embla-autoplay-delay="3000"
    ============================================================================= */

/* ===========================================================================
    DOT NAVIGATION HELPER FUNCTIONS
    Creates and manages pagination dots for carousel navigation
    =========================================================================== */

/**
 * Adds dot navigation buttons and click handlers for an Embla carousel
 *
 * @param {EmblaCarouselType} emblaApi - The Embla carousel API instance
 * @param {Element} dotsNode - Container element for dot navigation
 * @returns {Function|undefined} Cleanup function to remove dots
 */
const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
  // Defensive check: ensure dots container exists
  if (!dotsNode) return;

  // Find the template dot element (used as a blueprint for cloning)
  const templateDot = dotsNode.querySelector('[data-embla="dot"]');
  if (!templateDot) return; // Defensive: no template dot found

  let dotNodes = [];

  /**
   * Creates dot buttons based on the number of carousel slides
   * Clones the template dot for each slide and adds click handlers
   */
  const addDotBtnsWithClickHandlers = () => {
    const snapCount = emblaApi.scrollSnapList().length;

    // Clear existing dots
    dotsNode.innerHTML = "";

    // Don't show dots if there's only one slide or none
    if (snapCount <= 1) {
      dotNodes = [];
      return;
    }

    // Create a dot for each slide by cloning the template
    dotNodes = [];
    for (let i = 0; i < snapCount; i++) {
      const dot = templateDot.cloneNode(true);
      dotNodes.push(dot);
      dotsNode.appendChild(dot);

      // Add click handler to scroll to corresponding slide
      dot.addEventListener("click", () => emblaApi.scrollTo(i), false);
    }
  };

  /**
   * Updates the active state of dot buttons based on current slide
   * Adds 'is-active' class to the dot corresponding to the current slide
   */
  const toggleDotBtnsActive = () => {
    if (!dotNodes.length) return;

    const selected = emblaApi.selectedScrollSnap();
    dotNodes.forEach((dotNode, idx) => {
      dotNode.classList.toggle("is-active", idx === selected);
    });
  };

  // Bind event listeners to carousel events
  emblaApi
    .on("init", addDotBtnsWithClickHandlers) // Create dots on init
    .on("reInit", addDotBtnsWithClickHandlers) // Recreate dots on reinit
    .on("init", toggleDotBtnsActive) // Set initial active state
    .on("reInit", toggleDotBtnsActive) // Reset active state on reinit
    .on("select", toggleDotBtnsActive); // Update active state on slide change

  // Return cleanup function
  return () => {
    dotsNode.innerHTML = "";
  };
}

/* ===========================================================================
    CAROUSEL INITIALIZATION
    Main initialization logic for all Embla carousels on the page
    =========================================================================== */

/**
 * Initializes all Embla carousels found on the page.
 * Discovers carousel elements via [data-embla="root"] and configures them
 * based on their data attributes.
 */
function initEmblaCarousels(scope) {
  // Find carousel roots within a scope (defaults to full document)
  const root = scope || document;
  const emblaRoots = root.querySelectorAll('[data-embla="root"]');

  emblaRoots.forEach(function (emblaNode) {
    // Skip already-initialized carousels
    if (emblaNode.hasAttribute("data-embla-init")) return;

    // Defer init inside closed dialogs — viewport has no measurable size until open
    if (emblaNode.closest("dialog:not([open])")) return;

    emblaNode.setAttribute("data-embla-init", "");
    /* =========================================================================
            DOM ELEMENT DISCOVERY
            Find all carousel-related elements within this carousel instance
            ========================================================================= */

    const emblaViewportNode = emblaNode.querySelector(
      '[data-embla="viewport"]',
    );
    const emblaPrevButtonNode = emblaNode.querySelector('[data-embla="prev"]');
    const emblaNextButtonNode = emblaNode.querySelector('[data-embla="next"]');
    const emblaDotsNode = emblaNode.querySelector('[data-embla="dots"]');

    // Viewport is required - skip this carousel if not found
    if (!emblaViewportNode) return;

    // Make viewport keyboard-focusable unless author set tabindex
    if (!emblaViewportNode.hasAttribute("tabindex")) {
      emblaViewportNode.setAttribute("tabindex", "0");
    }

    /* =========================================================================
            CONFIGURATION PARSING
            Extract options from data attributes for core API and plugins
            ========================================================================= */

    // Parse core Embla options (align, loop, etc.)
    const apiOptions = Utils.parseDataAttributes(emblaNode, "data-embla-");

    // Keep plugin keys out of core Embla options (including prefixed leaks like autoplayDelay)
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

    // Parse plugin-specific options
    const autoplayOptions = Utils.parseDataAttributes(
      emblaNode,
      "data-embla-autoplay-",
    );
    const autoscrollOptions = Utils.parseDataAttributes(
      emblaNode,
      "data-embla-autoscroll-",
    );
    const classnamesOptions = Utils.parseDataAttributes(
      emblaNode,
      "data-embla-classnames-",
    );

    /* =========================================================================
            PLUGIN INITIALIZATION
            Enable via bare flag (data-embla-autoplay) or any data-embla-<plugin>-* option
            ========================================================================= */

    const plugins = [];

    if (emblaNode.hasAttribute("data-embla-autoplay") || Object.keys(autoplayOptions).length > 0) {
      plugins.push(EmblaCarouselAutoplay(autoplayOptions));
    }

    if (emblaNode.hasAttribute("data-embla-autoscroll") || Object.keys(autoscrollOptions).length > 0) {
      plugins.push(EmblaCarouselAutoScroll(autoscrollOptions));
    }

    if (emblaNode.hasAttribute("data-embla-classnames") || Object.keys(classnamesOptions).length > 0) {
      plugins.push(EmblaCarouselClassNames(classnamesOptions));
    }

    /* =========================================================================
            CAROUSEL CREATION & CONTROL BINDING
            Initialize the carousel and bind navigation controls
            ========================================================================= */

    // Create the Embla carousel instance
    const emblaApi = EmblaCarousel(emblaViewportNode, apiOptions, plugins);

    // Store reference on the DOM node for external access
    emblaNode._emblaApi = emblaApi;

    // Bind previous button if it exists
    if (emblaPrevButtonNode) {
      emblaPrevButtonNode.addEventListener(
        "click",
        () => emblaApi.scrollPrev(),
        false,
      );
    }

    // Bind next button if it exists
    if (emblaNextButtonNode) {
      emblaNextButtonNode.addEventListener(
        "click",
        () => emblaApi.scrollNext(),
        false,
      );
    }

    // Initialize dot navigation if dots container exists
    if (emblaDotsNode) {
      addDotBtnsAndClickHandlers(emblaApi, emblaDotsNode);
    }
  });
}

/* ===========================================================================
    DIALOG OPEN OBSERVER
    Re-initializes Embla carousels inside dialogs when they open.
    Dialogs are display:none until opened, so Embla can't measure the viewport
    at page load. This observer catches the `open` attribute being added and
    initializes any un-initialized carousels inside.
    =========================================================================== */

function observeDialogOpen() {
  const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "open" &&
        mutation.target.tagName === "DIALOG" &&
        mutation.target.hasAttribute("open")
      ) {
        const dialog = mutation.target;
        initEmblaCarousels(dialog);

        // Scroll to stored start index if set by [data-embla-start] click
        const roots = dialog.querySelectorAll('[data-embla="root"]');
        roots.forEach(function (root) {
          const startIndex = root.getAttribute("data-embla-start-index");
          if (startIndex != null && root._emblaApi) {
            root._emblaApi.scrollTo(Number(startIndex), true);
            root.removeAttribute("data-embla-start-index");
          }

          root.querySelector('[data-embla="viewport"]')?.focus({ preventScroll: true });
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

/* ===========================================================================
    KEYBOARD NAVIGATION
    Embla is headless — arrow keys are not built in. ArrowLeft/ArrowRight scroll
    when focus is inside a carousel, or when the carousel lives in an open dialog
    (e.g. lightbox). Opt out per carousel with data-embla-keyboard="false".
    =========================================================================== */

function getActiveEmblaRoot() {
  const openDialog = document.querySelector("dialog[open]");
  if (openDialog) {
    const dialogRoot = openDialog.querySelector('[data-embla="root"][data-embla-init]');
    if (dialogRoot?._emblaApi && dialogRoot.getAttribute("data-embla-keyboard") !== "false") {
      return dialogRoot;
    }
  }

  const focusedRoot = document.activeElement?.closest('[data-embla="root"][data-embla-init]');
  if (focusedRoot?._emblaApi && focusedRoot.getAttribute("data-embla-keyboard") !== "false") {
    return focusedRoot;
  }

  return null;
}

function initEmblaKeyboardNav() {
  if (initEmblaKeyboardNav._bound) return;
  initEmblaKeyboardNav._bound = true;

  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (e.defaultPrevented) return;

    const target = e.target;
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
}

const EmblaInit = {
  init: initEmblaCarousels,
  addDotBtnsAndClickHandlers,
};

/* ===========================================================================
    START INDEX CONTROL — [data-embla-start]
    Clicking an element with data-embla-start="N" stores that index on the
    target carousel (found via commandfor → dialog → [data-embla="root"]).
    The dialog open observer then scrolls to it on open.
    =========================================================================== */

function initEmblaStartLinks() {
  document.addEventListener("click", function (e) {
    const trigger = e.target.closest("[data-embla-start]");
    if (!trigger) return;

    const index = trigger.getAttribute("data-embla-start");
    const dialogId = trigger.getAttribute("commandfor");
    if (!dialogId) return;

    const dialog = document.getElementById(dialogId);
    if (!dialog) return;

    const root = dialog.querySelector('[data-embla="root"]');
    if (!root) return;

    // If carousel is already initialized (dialog already open), scroll directly
    if (root._emblaApi) {
      root._emblaApi.scrollTo(Number(index), true);
    } else {
      // Store for the dialog open observer to pick up
      root.setAttribute("data-embla-start-index", index);
    }
  });
}

// Auto-initialize when DOM is ready (only in browser environment)
if (typeof window !== "undefined" && typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initEmblaCarousels();
      observeDialogOpen();
      initEmblaStartLinks();
      initEmblaKeyboardNav();
    });
  } else {
    initEmblaCarousels();
    observeDialogOpen();
    initEmblaStartLinks();
    initEmblaKeyboardNav();
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

/* ===========================================================================
    HTML STRUCTURE REFERENCE
    
    <div data-embla="root" data-embla-loop="true" data-embla-autoplay-delay="3000">
        <div data-embla="viewport">
        <div data-embla="container">
            <div data-embla="slide">Slide 1</div>
            <div data-embla="slide">Slide 2</div>
            <div data-embla="slide">Slide 3</div>
        </div>
        </div>
        
        <!-- Navigation Controls (Optional) -->
        <button data-embla="prev">Previous</button>
        <button data-embla="next">Next</button>
        
        <!-- Dot Navigation (Optional) -->
        <div data-embla="dots">
        <button data-embla="dot"></button> <!-- Template dot -->
        </div>
    </div>
    
    DATA ATTRIBUTES:
    - data-embla="root"     : Carousel container
    - data-embla="viewport" : Visible area (required)
    - data-embla="container": Slides container
    - data-embla="slide"    : Individual slide
    - data-embla="prev"     : Previous button
    - data-embla="next"     : Next button
    - data-embla="dots"     : Dots container
    - data-embla="dot"      : Template dot (cloned for each slide)
    
    CONFIGURATION:
    - data-embla-*          : Core carousel options
    - data-embla-autoplay-* : Autoplay plugin options
    - data-embla-autoscroll-*: Auto scroll plugin options
    - data-embla-classnames-*: Class names plugin options
    =========================================================================== */
