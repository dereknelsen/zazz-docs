"use strict";

/**
 * @fileoverview Data attribute and value parsing utilities.
 * @description Shared helpers for converting HTML data-attribute strings into
 * typed JavaScript values. Used by component scripts such as `embla.js`.
 */

// --- Data type conversion ---

/**
 * @description Converts string values to their appropriate JavaScript types.
 *
 * @param {string} value - The string value to convert.
 * @returns {boolean|number|Array<*>|string} Converted value in the appropriate type.
 *
 * @example
 * parseValue("true"); // true
 * parseValue("42"); // 42
 * parseValue("[1,2,3]"); // [1, 2, 3]
 * parseValue("hello"); // "hello"
 */
function parseValue(value) {
  if (value === "true") return true;
  if (value === "false") return false;

  if (!Number.isNaN(Number(value)) && value.trim() !== "") return Number(value);

  if (value.startsWith("[") && value.endsWith("]")) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value;
}

// --- Data attribute parsing ---

/**
 * @description Extracts and parses data attributes with a specific prefix from a DOM node.
 *
 * Converts kebab-case attribute names to camelCase object keys.
 *
 * @param {Element} node - The DOM element to extract attributes from.
 * @param {string} prefix - The attribute prefix to look for (e.g. `"data-carousel-"`).
 * @returns {Object.<string, *>} Object with camelCase keys and parsed values.
 *
 * @example
 * // <div data-carousel-auto-play="true" data-carousel-slide-count="5">
 * parseDataAttributes(element, "data-carousel-");
 * // { autoPlay: true, slideCount: 5 }
 */
const parseDataAttributes = (node, prefix) => {
  /** @type {Record<string, unknown>} */
  const options = {};

  for (const attr of node.attributes) {
    if (attr.name.startsWith(prefix)) {
      const key = attr.name.replace(prefix, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());

      options[key] = parseValue(attr.value);
    }
  }

  return options;
};

/**
 * @namespace Utils
 * @description Shared DOM and data-attribute parsing utilities.
 *
 * @property {typeof parseValue} parseValue - Converts string values to typed values.
 * @property {typeof parseDataAttributes} parseDataAttributes - Parses prefixed data attributes on a node.
 */
const Utils = {
  parseValue,
  parseDataAttributes,
};

// Attach to window for the documented public API (`window.Utils`), and export
// for module consumers (embla.js imports it via the zazz.js bundle).
if (typeof window !== "undefined") {
  window.Utils = Utils;
}

export { Utils };
