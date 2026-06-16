"use strict";

/**
 * @fileoverview Scroll-based reveal animations.
 * @description A lightweight, configurable animation system for scroll-based
 * reveals and staggered animations, focused on viewport entry.
 *
 * @typedef {Object} RevealConfig
 * @property {string} margin - Margin around the root (viewport) for IntersectionObserver.
 * @property {number} threshold - Visibility threshold (0–1) to trigger animations.
 * @property {number|string} duration - Default animation duration (ms number or CSS time string).
 * @property {string} ease - Default animation timing function.
 * @property {number} wait - Default base animation delay in milliseconds.
 * @property {string} distance - Default translation distance for slide animations.
 * @property {number} step - Default delay between staggered elements in milliseconds.
 * @property {number} grow - Scale factor for grow animations (< 1).
 * @property {number} shrink - Scale factor for shrink animations (> 1).
 *
 * @typedef {Object} RevealOptions
 * @property {RevealConfig} [config] - Configuration options for the animation system.
 *
 * @example
 * <!-- Single element -->
 * <div data-reveal="slide-up" data-reveal-duration="300">Content</div>
 *
 * @example
 * <!-- Stagger group (direct children are animated) -->
 * <div data-reveal-each="fade" data-reveal-step="100">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </div>
 */

/**
 * @description Reads a CSS custom property from `:root` computed styles.
 * @param {string} name - Custom property name (e.g. "--reveal-global-duration").
 * @returns {string} Trimmed value, or "" when unset.
 */
function getRootCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * @description Parses a CSS time value into milliseconds.
 * @param {string} value - CSS time string (e.g. "300ms", "0.5s") or bare number string.
 * @returns {number} Duration in milliseconds.
 */
function parseCssTimeMs(value) {
  const str = value.trim();
  if (!str) return 0;
  if (/^-?\d*\.?\d+ms$/.test(str)) return parseFloat(str);
  if (/^-?\d*\.?\d+s$/.test(str)) return parseFloat(str) * 1000;
  return parseInt(str, 10) || 0;
}

/**
 * @class
 * @description Initializes viewport entry animations.
 *
 * @example
 * const reveal = new Reveal();
 *
 * @example
 * const reveal = new Reveal({
 *   config: {
 *     duration: 400,
 *     ease: "ease-in-out",
 *     threshold: 0.3,
 *     margin: "100px",
 *     step: 40,
 *   },
 * });
 */
class Reveal {
  /**
   * @description Default config from `--reveal-global-*` tokens in `_reveal.css`.
   * @returns {RevealConfig}
   */
  static #readDefaultConfig() {
    return {
      margin: "0px",
      threshold: 0.2,
      duration: getRootCssVar("--reveal-global-duration") || "400ms",
      ease: getRootCssVar("--reveal-global-ease") || "cubic-bezier(0.4, 0, 0.2, 1)",
      wait: parseCssTimeMs(getRootCssVar("--reveal-global-wait")),
      distance: getRootCssVar("--reveal-global-distance") || "1rem",
      step: 80,
      grow: parseFloat(getRootCssVar("--reveal-global-grow")) || 0.97,
      shrink: parseFloat(getRootCssVar("--reveal-global-shrink")) || 1.03,
    };
  }

  /** @type {RevealConfig} */
  static get defaultConfig() {
    return Reveal.#readDefaultConfig();
  }

  /** @type {Map<string, IntersectionObserver>} */
  #observers = new Map();

  /** @type {RevealConfig} */
  config;

  /**
   * @description Creates a new Reveal instance.
   *
   * @param {RevealOptions} [options={}] - Configuration options.
   */
  constructor(options = {}) {
    this.config = { ...Reveal.defaultConfig, ...options.config };
    this.init();
  }

  /**
   * @description Gets or creates an IntersectionObserver for a given set of options.
   *
   * @param {IntersectionObserverInit} options - Observer options.
   * @returns {IntersectionObserver} The observer instance.
   */
  #getObserver(options) {
    const optionsKey = JSON.stringify(options);
    let observer = this.#observers.get(optionsKey);
    if (!observer) {
      observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-viewport");
            obs.unobserve(entry.target);
          }
        });
      }, options);
      this.#observers.set(optionsKey, observer);
    }
    return observer;
  }

  /**
   * @description Gets IntersectionObserver options for an element.
   *
   * @param {HTMLElement} element - The element to get options for.
   * @returns {IntersectionObserverInit} Observer configuration options.
   */
  #getElementObserverOptions(element) {
    const margin = element.dataset.revealMargin || this.config.margin;
    const threshold = parseFloat(
      element.dataset.revealThreshold || this.config.threshold.toString(),
    );
    return {
      rootMargin: margin,
      threshold: Math.min(Math.max(threshold, 0), 1),
    };
  }

  /**
   * @description Normalizes a duration to a CSS time value without duplicating units.
   *
   * @param {number|string} value - Milliseconds as a number, or a CSS time string.
   * @returns {string} A CSS time value (e.g. "300ms", "0.333s").
   */
  #formatTime(value) {
    const str = value.toString().trim();
    if (/^-?\d*\.?\d+(ms|s)$/.test(str)) return str;
    return `${Math.max(0, parseInt(str, 10) || 0)}ms`;
  }

  /**
   * @description Sets CSS custom properties on an element when a value is provided.
   *
   * @param {HTMLElement} element - The element to set properties on.
   * @param {Object.<string, string|number|null|undefined>} properties - CSS custom properties to set.
   */
  #setRevealProperties(element, properties) {
    Object.entries(properties).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        element.style.setProperty(key, value.toString());
      }
    });
  }

  /**
   * @description Configures stagger animation properties and observes child elements.
   *
   * @param {HTMLElement} groupElement - The parent stagger container.
   */
  #configureStaggerGroup(groupElement) {
    const dataset = groupElement.dataset;
    const groupOptions = this.#getElementObserverOptions(groupElement);
    const groupObserver = this.#getObserver(groupOptions);

    const groupProps = {
      step: Math.max(0, parseInt(dataset.revealStep || this.config.step.toString(), 10) || 0),
      duration: dataset.revealDuration
        ? Math.max(0, parseInt(dataset.revealDuration, 10) || 0)
        : this.config.duration,
      ease: dataset.revealEase || this.config.ease,
      baseWait: Math.max(0, parseInt(dataset.revealWait || this.config.wait.toString(), 10) || 0),
      distance: dataset.revealDistance || this.config.distance,
      order: dataset.revealOrder,
    };

    const childrenArray = Array.from(groupElement.children);
    const sequence = groupProps.order === "reversed" ? childrenArray.reverse() : childrenArray;

    sequence.forEach((child, i) => {
      if (!(child instanceof HTMLElement)) return;

      const calculatedWait = groupProps.baseWait + groupProps.step * i;

      this.#setRevealProperties(child, {
        "--reveal-duration": this.#formatTime(groupProps.duration),
        "--reveal-ease": groupProps.ease,
        "--reveal-wait": `${calculatedWait}ms`,
        "--reveal-distance": groupProps.distance,
        "--reveal-scale": dataset.revealScale || null,
      });

      groupObserver.observe(child);
    });
  }

  /**
   * @description Configures animation properties for a single element and observes it.
   *
   * @param {HTMLElement} element - The element to configure and observe.
   */
  #configureSingleElement(element) {
    const dataset = element.dataset;
    const elementOptions = this.#getElementObserverOptions(element);
    const elementObserver = this.#getObserver(elementOptions);

    const elementDuration = dataset.revealDuration
      ? Math.max(0, parseInt(dataset.revealDuration, 10) || 0)
      : null;
    const elementWait = dataset.revealWait
      ? Math.max(0, parseInt(dataset.revealWait, 10) || 0)
      : null;

    this.#setRevealProperties(element, {
      "--reveal-duration": elementDuration !== null ? this.#formatTime(elementDuration) : null,
      "--reveal-wait": elementWait !== null ? this.#formatTime(elementWait) : null,
      "--reveal-ease": dataset.revealEase || null,
      "--reveal-distance": dataset.revealDistance || null,
      "--reveal-scale": dataset.revealScale || null,
    });

    elementObserver.observe(element);
  }

  /**
   * @description Initializes the animation system by setting global CSS variables
   * and configuring all animated elements.
   *
   * @returns {void}
   */
  init() {
    this.#observers.forEach((observer) => observer.disconnect());
    this.#observers.clear();

    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--reveal-global-duration", this.#formatTime(this.config.duration));
    rootStyle.setProperty("--reveal-global-ease", this.config.ease);
    rootStyle.setProperty("--reveal-global-wait", this.#formatTime(this.config.wait));
    rootStyle.setProperty("--reveal-global-distance", this.config.distance);
    rootStyle.setProperty("--reveal-global-grow", this.config.grow.toString());
    rootStyle.setProperty("--reveal-global-shrink", this.config.shrink.toString());

    document.querySelectorAll("[data-reveal]").forEach((element) => {
      if (element instanceof HTMLElement) this.#configureSingleElement(element);
    });

    document.querySelectorAll("[data-reveal-each]").forEach((group) => {
      if (group instanceof HTMLElement) this.#configureStaggerGroup(group);
    });
  }

  /**
   * @description Reinitializes the animation system after dynamically adding elements.
   *
   * Disconnects old observers and rescans the document.
   *
   * @returns {void}
   *
   * @example
   * container.innerHTML = newContent;
   * reveal.refresh();
   */
  refresh() {
    this.init();
  }
}

// Auto-initialize when DOM is ready (only in browser environment)
if (typeof window !== "undefined" && typeof document !== "undefined") {
  /** @type {Reveal | null | "disabled"} */
  let autoInstance = null;

  const autoInit = () => {
    if (!autoInstance) {
      autoInstance = new Reveal();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInit);
  } else {
    autoInit();
  }

  /**
   * @description Prevents automatic initialization on DOM ready.
   *
   * @returns {void}
   */
  Reveal.disableAutoInit = () => {
    autoInstance = "disabled";
  };

  /**
   * @description Returns the auto-initialized Reveal instance, if any.
   *
   * @returns {Reveal|null} The auto instance, or null when disabled or not yet created.
   */
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
