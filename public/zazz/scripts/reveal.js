"use strict";

/**
 * @version 0.1.0
 * @since 0.1.0
 * @description A lightweight, configurable animation system for scroll-based reveals
 * and staggered animations, focused on viewport entry.
 *
 * Usage:
 * ```html
 * <!-- Single element -->
 * <div data-reveal="slide-up" data-reveal-duration="300">Content</div>
 *
 * <!-- Stagger group (direct children are animated) -->
 * <div data-reveal-each="fade" data-reveal-step="100">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </div>
 * ```
 *
 * @typedef {Object} RevealConfig
 * @property {string} [margin="0px"] - Margin around the root (viewport) for intersection observer.
 * @property {number} [threshold=0.2] - Visibility threshold (0-1) to trigger animations.
 * @property {number} [duration=900] - Default animation duration in milliseconds.
 * @property {string} [ease="cubic-bezier(0.4, 0, 0.2, 1)"] - Default animation timing function.
 * @property {number} [wait=0] - Default base animation delay in milliseconds.
 * @property {string} [distance="4rem"] - Default translation distance for slide animations.
 * @property {number} [step=80] - Default delay between staggered elements in milliseconds.
 * @property {number} [grow=0.9] - Scale factor for grow animations (< 1).
 * @property {number} [shrink=1.1] - Scale factor for shrink animations (> 1).
 */

/**
 * @typedef {Object} RevealOptions
 * @property {RevealConfig} [config] - Configuration options for the animation system.
 */

/**
 * Reveal - Initializes viewport entry animations.
 *
 * @example
 * // Basic usage with defaults
 * const reveal = new Reveal();
 *
 * @example
 * // With custom configuration
 * const reveal = new Reveal({
 *   config: {
 *     duration: 600,
 *     ease: 'ease-in-out',
 *     threshold: 0.3,
 *     margin: '100px',
 *     step: 100
 *   }
 * });
 */

const DEFAULT_DURATION = document.documentElement.style.getPropertyValue(
  "--default-transition-duration",
);
const DEFAULT_EASE = document.documentElement.style.getPropertyValue(
  "--default-transition-timing-function",
);

class Reveal {
  /** @type {RevealConfig} */
  static defaultConfig = {
    margin: "0px",
    threshold: 0.2,
    duration: DEFAULT_DURATION.trim() || "900ms", // Fallback if CSS variable is empty
    ease: DEFAULT_EASE.trim() || "cubic-bezier(0.4, 0, 0.2, 1)", // Fallback if CSS variable is empty
    wait: 0,
    distance: "4rem",
    step: 80,
    grow: 0.9,
    shrink: 1.1,
  };

  /** @type {Map<string, IntersectionObserver>} */
  #observers = new Map();

  /**
   * Creates a new Reveal instance.
   * @param {RevealOptions} [options={}] - Configuration options.
   */
  constructor(options = {}) {
    this.config = { ...Reveal.defaultConfig, ...options.config };
    this.init();
  }

  /**
   * Gets or creates an IntersectionObserver for a given set of options.
   * @param {IntersectionObserverInit} options - Observer options.
   * @returns {IntersectionObserver} The observer instance.
   * @private
   */
  #getObserver(options) {
    const optionsKey = JSON.stringify(options);
    if (!this.#observers.has(optionsKey)) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-viewport");
            obs.unobserve(entry.target); // Stop observing once visible
          }
        });
      }, options);
      this.#observers.set(optionsKey, observer);
    }
    return this.#observers.get(optionsKey);
  }

  /**
   * Gets IntersectionObserver options for an element.
   * @param {HTMLElement} element - The element to get options for.
   * @returns {IntersectionObserverInit} Observer configuration options.
   * @private
   */
  #getElementObserverOptions(element) {
    const margin = element.dataset.revealMargin || this.config.margin;
    const threshold = parseFloat(
      element.dataset.revealThreshold || this.config.threshold.toString(), // Ensure string for default
    );
    return {
      rootMargin: margin,
      threshold: Math.min(Math.max(threshold, 0), 1), // Clamp between 0 and 1
    };
  }

  /**
   * Sets CSS custom properties on an element if the value is provided.
   * @param {HTMLElement} element - The element to set properties on.
   * @param {Object.<string, string|number|null|undefined>} properties - Object of CSS custom properties.
   * @private
   */
  #setRevealProperties(element, properties) {
    Object.entries(properties).forEach(([key, value]) => {
      // Only set if value is not null or undefined
      if (value !== null && value !== undefined) {
        element.style.setProperty(key, value.toString());
      }
    });
  }

  /**
   * Configures stagger animation properties and observes child elements.
   * @param {HTMLElement} groupElement - The parent stagger container.
   * @private
   */
  #configureStaggerGroup(groupElement) {
    const dataset = groupElement.dataset;
    const groupOptions = this.#getElementObserverOptions(groupElement);
    const groupObserver = this.#getObserver(groupOptions);

    // Use defaults from config, overridden by group's data attributes
    const groupProps = {
      step: Math.max(
        0,
        parseInt(dataset.revealStep || this.config.step.toString(), 10) || 0,
      ),
      duration: dataset.revealDuration
        ? Math.max(0, parseInt(dataset.revealDuration, 10) || 0)
        : this.config.duration,
      ease: dataset.revealEase || this.config.ease,
      baseWait: Math.max(
        0,
        parseInt(dataset.revealWait || this.config.wait.toString(), 10) || 0,
      ),
      distance: dataset.revealDistance || this.config.distance,
      order: dataset.revealOrder,
    };

    const childrenArray = Array.from(groupElement.children);
    const sequence =
      groupProps.order === "reversed" ? childrenArray.reverse() : childrenArray;

    sequence.forEach((child, i) => {
      if (!(child instanceof HTMLElement)) return; // Skip non-element nodes

      // Calculate individual delay
      const calculatedWait = groupProps.baseWait + groupProps.step * i;

      // Set properties on the child
      this.#setRevealProperties(child, {
        "--reveal-duration": `${groupProps.duration}ms`,
        "--reveal-ease": groupProps.ease,
        "--reveal-wait": `${calculatedWait}ms`,
        "--reveal-distance": groupProps.distance,
        "--reveal-scale": dataset.revealScale || null,
      });

      // Observe the child
      groupObserver.observe(child);
    });
  }

  /**
   * Configures animation properties for a single element and observes it.
   * @param {HTMLElement} element - The element to configure and observe.
   * @private
   */
  #configureSingleElement(element) {
    const dataset = element.dataset;
    const elementOptions = this.#getElementObserverOptions(element);
    const elementObserver = this.#getObserver(elementOptions);

    // Set properties only if explicitly defined on the element
    const elementDuration = dataset.revealDuration
      ? Math.max(0, parseInt(dataset.revealDuration, 10) || 0)
      : null;
    const elementWait = dataset.revealWait
      ? Math.max(0, parseInt(dataset.revealWait, 10) || 0)
      : null;

    this.#setRevealProperties(element, {
      "--reveal-duration": elementDuration ? `${elementDuration}ms` : null,
      "--reveal-wait": elementWait ? `${elementWait}ms` : null,
      "--reveal-ease": dataset.revealEase || null,
      "--reveal-distance": dataset.revealDistance || null,
      "--reveal-scale": dataset.revealScale || null,
    });

    elementObserver.observe(element);
  }

  /**
   * Initializes the animation system by setting up global CSS variables and
   * configuring all animated elements.
   * @private
   */
  init() {
    // Clear existing observers if re-initializing
    this.#observers.forEach((observer) => observer.disconnect());
    this.#observers.clear();

    // Set global CSS variables on the root element
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty(
      "--reveal-global-duration",
      `${this.config.duration}ms`,
    );
    rootStyle.setProperty("--reveal-global-ease", this.config.ease);
    rootStyle.setProperty("--reveal-global-wait", `${this.config.wait}ms`);
    rootStyle.setProperty("--reveal-global-distance", this.config.distance);
    rootStyle.setProperty("--reveal-global-grow", this.config.grow.toString());
    rootStyle.setProperty(
      "--reveal-global-shrink",
      this.config.shrink.toString(),
    );

    // Process single elements
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => this.#configureSingleElement(element));

    // Process stagger groups
    document
      .querySelectorAll("[data-reveal-each]")
      .forEach((group) => this.#configureStaggerGroup(group));
  }

  /**
   * Reinitializes the animation system. Use this after dynamically adding
   * new animated elements to the page. Disconnects old observers.
   *
   * @example
   * // After adding new content
   * container.innerHTML = newContent;
   * reveal.refresh();
   */
  refresh() {
    this.init();
  }
}

// Auto-initialize when DOM is ready (only in browser environment)
if (typeof window !== "undefined" && typeof document !== "undefined") {
  let autoInstance = null;

  const autoInit = () => {
    // Only auto-initialize if no manual instance exists
    if (!autoInstance) {
      autoInstance = new Reveal();
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInit);
  } else {
    // DOM is already ready
    autoInit();
  }

  // Expose method to disable auto-initialization
  Reveal.disableAutoInit = () => {
    autoInstance = "disabled";
  };

  // Expose method to get auto instance
  Reveal.getAutoInstance = () => {
    return autoInstance === "disabled" ? null : autoInstance;
  };
}

// Export for module environments or attach to window
if (typeof module !== "undefined" && module.exports) {
  module.exports = Reveal;
} else if (typeof define === "function" && define.amd) {
  define([], function () {
    return Reveal;
  });
} else if (typeof window !== "undefined") {
  window.Reveal = Reveal;
}
