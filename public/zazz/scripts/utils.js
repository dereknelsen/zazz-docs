"use strict";

/* ===========================================================================
   DATA TYPE CONVERSION UTILITIES
   =========================================================================== */

/**
 * Converts string values to their appropriate JavaScript types
 *
 * @param {string} value - The string value to convert
 * @returns {boolean|number|Array|string} - Converted value in appropriate type
 *
 * Examples:
 * parseValue("true") → true (boolean)
 * parseValue("42") → 42 (number)
 * parseValue("[1,2,3]") → [1,2,3] (array)
 * parseValue("hello") → "hello" (string)
 */
function parseValue(value) {
  // Convert string booleans to actual booleans
  if (value === "true") return true;
  if (value === "false") return false;

  // Convert numeric strings to numbers (excluding empty/whitespace strings)
  if (!isNaN(value) && value.trim() !== "") return Number(value);

  // Parse JSON arrays and objects
  if (value.startsWith("[") && value.endsWith("]")) {
    try {
      return JSON.parse(value);
    } catch {
      // If JSON parsing fails, return original string
      return value;
    }
  }

  // Return original string if no conversion applies
  return value;
}

/* ===========================================================================
   DATA ATTRIBUTE PARSING UTILITIES
   =========================================================================== */

/**
 * Extracts and parses data attributes with a specific prefix from a DOM node
 * Converts kebab-case attribute names to camelCase object keys
 *
 * @param {Element} node - The DOM element to extract attributes from
 * @param {string} prefix - The attribute prefix to look for (e.g., "data-carousel-")
 * @returns {Object} - Object with camelCase keys and parsed values
 *
 * Example:
 * HTML: <div data-carousel-auto-play="true" data-carousel-slide-count="5">
 * parseDataAttributes(element, "data-carousel-")
 * → { autoPlay: true, slideCount: 5 }
 */
const parseDataAttributes = (node, prefix) => {
  const options = {};

  // Iterate through all attributes on the node
  for (const attr of node.attributes) {
    // Only process attributes that start with the specified prefix
    if (attr.name.startsWith(prefix)) {
      // Convert kebab-case to camelCase and remove prefix
      // Example: "data-carousel-auto-play" → "autoPlay"
      const key = attr.name
        .replace(prefix, "")
        .replace(/-([a-z])/g, (_, c) => c.toUpperCase());

      // Parse the attribute value and store in options object
      options[key] = parseValue(attr.value);
    }
  }

  return options;
}

const Utils = {
  parseValue,
  parseDataAttributes,
};

// Export for module environments or attach to window
if (typeof module !== "undefined" && module.exports) {
  module.exports = Utils;
} else if (typeof define === "function" && define.amd) {
  define([], function () {
    return Utils;
  });
} else if (typeof window !== "undefined") {
  window.Utils = Utils;
}
