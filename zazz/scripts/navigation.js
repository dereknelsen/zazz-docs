"use strict";

/**
 * @fileoverview SPA-like navigation via the Navigation API.
 * @description Intercepts same-origin navigations and swaps `<main>` content
 * without a full page reload. The browser still manages the URL and history
 * stack; one `navigate` listener handles link clicks, back/forward, and
 * programmatic navigations.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent/scroll
 */

if ("navigation" in window) {
  window.navigation.addEventListener("navigate", (e) => {
    if (
      !e.canIntercept ||
      e.hashChange ||
      e.downloadRequest !== null ||
      !isSameOrigin(e.destination.url)
    ) {
      return;
    }

    e.intercept({
      async handler() {
        const res = await fetch(e.destination.url);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, "text/html");

        const newMain = doc.querySelector("main");
        if (!newMain) return;

        const currentMain = document.querySelector("main");
        if (!currentMain) return;

        currentMain.replaceWith(newMain);
        e.scroll();
      },
    });
  });

  /**
   * @description Checks whether a URL shares the current document origin.
   *
   * @param {string} url - The URL to compare.
   * @returns {boolean} True when the URL origin matches `location.origin`.
   * @private
   */
  function isSameOrigin(url) {
    return new URL(url).origin === location.origin;
  }
} else {
  console.warn("Navigation API not supported");
}
