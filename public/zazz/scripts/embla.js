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
function initEmblaCarousels() {
  // Find all carousel root elements on the page
  const emblaRoots = document.querySelectorAll('[data-embla="root"]');

  emblaRoots.forEach(function (emblaNode) {
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

    /* =========================================================================
            CONFIGURATION PARSING
            Extract options from data attributes for core API and plugins
            ========================================================================= */

    // Parse core Embla options (align, loop, etc.)
    const apiOptions = Utils.parseDataAttributes(emblaNode, "data-embla-");

    // Remove plugin-specific options from core API options
    ["autoplay", "autoscroll", "classnames", "name"].forEach((key) => {
      delete apiOptions[key];
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
            Conditionally initialize plugins based on available options
            ========================================================================= */

    const plugins = [];

    // Add Autoplay plugin if options are provided
    if (Object.keys(autoplayOptions).length > 0) {
      plugins.push(EmblaCarouselAutoplay(autoplayOptions));
    }

    // Add Auto Scroll plugin if options are provided
    if (Object.keys(autoscrollOptions).length > 0) {
      plugins.push(EmblaCarouselAutoScroll(autoscrollOptions));
    }

    // Add Class Names plugin if options are provided
    if (Object.keys(classnamesOptions).length > 0) {
      plugins.push(EmblaCarouselClassNames(classnamesOptions));
    }

    /* =========================================================================
            CAROUSEL CREATION & CONTROL BINDING
            Initialize the carousel and bind navigation controls
            ========================================================================= */

    // Create the Embla carousel instance
    const emblaApi = EmblaCarousel(emblaViewportNode, apiOptions, plugins);

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

const EmblaInit = {
  init: initEmblaCarousels,
  addDotBtnsAndClickHandlers,
};

// Auto-initialize when DOM is ready (only in browser environment)
if (typeof window !== "undefined" && typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEmblaCarousels);
  } else {
    initEmblaCarousels();
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
