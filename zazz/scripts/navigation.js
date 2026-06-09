"use strict";

/// <reference path="./globals.d.ts" />

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
      e.formData !== null ||
      !isSameOrigin(e.destination.url)
    ) {
      return;
    }

    e.intercept({
      async handler() {
        let doc;
        try {
          const res = await fetch(e.destination.url);
          if (!res.ok) throw new Error(res.statusText);
          doc = new DOMParser().parseFromString(await res.text(), "text/html");
        } catch {
          location.assign(e.destination.url); // Network/HTTP failure: full load.
          return;
        }

        const newMain = doc.querySelector("main");
        const currentMain = document.querySelector("main");
        if (!(newMain instanceof HTMLElement) || !(currentMain instanceof HTMLElement)) {
          location.assign(e.destination.url); // Unexpected markup: full load.
          return;
        }

        const updateDOM = () => {
          currentMain.replaceWith(newMain);
          document.title = doc.title;
          // Restore scroll while the new snapshot is captured so the transition
          // animates from the correct position instead of jumping afterwards.
          e.scroll();
        };

        if (document.startViewTransition) {
          await document.startViewTransition(updateDOM).finished;
        } else {
          updateDOM();
        }

        window.Reveal?.getAutoInstance()?.refresh();
        // Carousels in swapped-in main were never initialized — DOMContentLoaded
        // doesn't fire on SPA navigations. (init() skips already-init'd nodes and
        // closed dialogs, which the dialog-open observer still handles.)
        window.EmblaInit?.init(newMain);
        routeFocus(newMain);
      },
    });
  });

  /**
   * @description Routes focus to the primary heading in swapped main content.
   *
   * @param {HTMLElement} main - The newly inserted `<main>` element.
   * @private
   */
  function routeFocus(main) {
    const target = main.querySelector("h1") ?? main;
    if (!(target instanceof HTMLElement)) return;

    if (!target.hasAttribute("tabindex")) {
      target.tabIndex = -1;
    }

    target.focus({ preventScroll: true });
  }

  /**
   * @description Checks whether a URL shares the current document origin.
   *
   * @param {string} url - The URL to compare.
   * @returns {boolean} True when the URL origin matches `location.origin`.
   * @private
   */
  function isSameOrigin(url) {
    return new URL(url, location.href).origin === location.origin;
  }
} else {
  console.warn("Navigation API not supported. That's okay, we'll just use a full page reload.");
}
