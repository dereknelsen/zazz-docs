"use strict";

// SPA-like navigation without a framework, using the Navigation API.
// https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API
//
// In a traditional multi-page site, every link click triggers a full document
// reload. SPAs avoid that by swapping content in place while updating the URL
// and history. Framework routers do this by intercepting clicks and calling
// History.pushState(), but that only covers link clicks — not back/forward,
// form submissions, or programmatic navigations.
//
// The Navigation API centralizes all of that via window.navigation and its
// navigate event. One listener sees every navigation (clicks, traverse, reload,
// navigate()), and intercept() lets us replace the default full-page load with
// custom behavior while the browser still manages the URL and history stack.

if ("navigation" in window) {
  // Fires for every navigation in this window — the single hook we need for routing.
  navigation.addEventListener("navigate", (e) => {
    // Let the browser handle navigations we can't or shouldn't take over:
    // cross-origin, fragment/hash changes, downloads, and anything else
    // where canIntercept is false.
    if (
      !e.canIntercept ||
      e.hashChange ||
      e.downloadRequest !== null ||
      !isSameOrigin(e.destination.url)
    ) {
      return;
    }

    // Take control of this navigation. The URL commits immediately; our handler
    // runs the SPA swap (fetch → parse → replace content). Back/forward still
    // works because each visit creates a NavigationHistoryEntry the API tracks.
    e.intercept({
      async handler() {
        const res = await fetch(e.destination.url);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, "text/html");

        const newMain = doc.querySelector("main");
        if (!newMain) return;

        // Swap only <main> — shell (header, nav, scripts) stays mounted, so
        // this feels like a client-side route change, not a full reload.
        document.querySelector("main").replaceWith(newMain);

        // Scroll after primary content is painted (fragment targets, etc.).
        // https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent/scroll
        e.scroll();
      },
    });
  });

  function isSameOrigin(url) {
    return new URL(url).origin === location.origin;
  }
} else {
  // No Navigation API: links and history behave as normal full page loads.
  console.warn("Navigation API not supported");
}
