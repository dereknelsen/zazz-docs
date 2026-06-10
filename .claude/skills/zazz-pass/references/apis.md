# Zazz modern APIs & JS behaviors

Zazz is built on modern web platform features, with polyfills already wired in the page head.
**Preserve the polyfills**, prefer the native hook, and author behavior in **HTML** — the JS
discovers and enhances markup; you rarely touch it.

> For how any of these APIs actually work, and for browser-support / fallback decisions, use
> the **`modern-web-guidance`** skill (search → retrieve). Don't reimplement an API by hand.

## 1. Platform APIs and their markup hooks

| API                                        | Used by                            | Markup hook                                                                                                                             | Polyfill                                |
| ------------------------------------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Popover API                                | tooltip, dropdown, navigation-menu | `popover="auto"` / `popover="hint"`, `popovertarget="<id>"`, `:popover-open`                                                            | `@oddbird/popover-polyfill`             |
| Invoker Commands                           | dialog, lightbox                   | `command="show-modal"` / `command="close"`, `commandfor="<id>"`                                                                         | `invokers/compatible`                   |
| Interest Invokers                          | tooltip                            | `interestfor="<id>"` (hover/focus/long-press → hint, wires ARIA)                                                                        | `invokers/compatible`                   |
| CSS Anchor Positioning                     | popover/tooltip placement          | `data-side`, `data-align` (drive `anchor-name` / `position-area`)                                                                       | `@supports`-gated; UA-centered fallback |
| Native `<dialog>`                          | dialog, lightbox, mobile-menu      | `<dialog>`, `::backdrop`, `closedby="any"`                                                                                              | (via Invoker Commands polyfill)         |
| Native `<details>`                         | accordion                          | `<details>`/`<summary>`, `::details-content`, `interpolate-size: allow-keywords`                                                        | —                                       |
| View Transitions                           | cross-page nav                     | `@view-transition { navigation: auto }`, `data-transition-layer="global-component"`, `document.startViewTransition()` | —                                       |
| Navigation API                             | SPA-style nav                      | `navigation.js` (app-level; **not** loaded in preview iframes)                                                                          | falls back to full page load            |
| `light-dark()` + container `style()` query | theming, dark mode, inverted menus | `.dark` class, `--use-inverted-menu: "true"` on `[popover]`                                                                             | —                                       |
| IntersectionObserver                       | scroll reveals                     | `[data-reveal]` / `[data-reveal-each]` (via `reveal.js`)                                                                                | —                                       |
| `:user-invalid` / `:has()`                 | form validation                    | surfaces error state after commit, not while typing                                                                                     | —                                       |

## 2. Zazz JS behaviors (data-attribute driven)

Configure entirely in markup. Don't edit `zazz/scripts/`. Load order matters: `utils.js`
first, then `reveal.js`, then Embla CDN bundles, then `embla.js`.

### Reveal — `reveal.js` (`window.Reveal`)

Put `data-reveal` on a single element, or `data-reveal-each` on a parent to stagger its
**direct children**. The animation plays once when the element enters the viewport (adds
`.in-viewport`).

| Attribute                          | Values / unit                                                             | Notes                                                 |
| ---------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------- |
| `data-reveal` / `data-reveal-each` | `slide-up` `slide-down` `slide-left` `slide-right` `fade` `grow` `shrink` | single vs. stagger-group                              |
| `data-reveal-duration`             | ms                                                                        | default: `--default-transition-duration` (else 900ms) |
| `data-reveal-wait`                 | ms                                                                        | base delay before start (default 0)                   |
| `data-reveal-step`                 | ms                                                                        | stagger between children (group only; default 80)     |
| `data-reveal-ease`                 | CSS timing function                                                       | default: `--default-transition-timing-function`       |
| `data-reveal-distance`             | CSS length                                                                | slide travel (default `4rem`)                         |
| `data-reveal-scale`                | number                                                                    | grow/shrink factor (defaults grow 0.9, shrink 1.1)    |
| `data-reveal-order`                | `reversed`                                                                | reverse stagger order (group only)                    |
| `data-reveal-margin`               | rootMargin                                                                | IntersectionObserver margin (default `0px`)           |
| `data-reveal-threshold`            | 0–1                                                                       | visibility to trigger (default 0.2)                   |

### Embla carousel — `embla.js` (`window.EmblaInit`) — requires the Embla CDN UMD bundles

Mark up roles with `data-embla="<role>"`; put all config on the **root**.

**Roles:** `root` (config holder) · `viewport` (required) · `container` · `slide` · `prev` ·
`next` · `dots` · `dot` (template, cloned per snap) · `thumbs` (linked thumb carousel).

**Config on `data-embla="root"`** (kebab-case → Embla options via `Utils.parseDataAttributes`):

| Attribute                                           | Example                                              | Purpose                                                                   |
| --------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------- |
| any core Embla option                               | `data-embla-loop="true"`, `data-embla-align="start"` | passed straight to Embla                                                  |
| `data-embla-keyboard`                               | `"false"`                                            | disable ArrowLeft/Right navigation                                        |
| `data-embla-autoplay` / `data-embla-autoplay-*`     | `data-embla-autoplay-delay="3000"`                   | Autoplay plugin                                                           |
| `data-embla-autoscroll` / `data-embla-autoscroll-*` | `data-embla-autoscroll-speed="2"`                    | AutoScroll plugin                                                         |
| `data-embla-classnames` / `data-embla-classnames-*` | `data-embla-classnames-snapped="is-snapped"`         | ClassNames plugin                                                         |
| `data-embla-thumbs-*` (on `thumbs`)                 | `data-embla-thumbs-contain-scroll="keepSnaps"`       | thumb carousel options (defaults: containScroll keepSnaps, dragFree true) |
| `data-embla-start` (on a trigger w/ `commandfor`)   | `data-embla-start="2"`                               | open a dialog carousel at slide N                                         |

Script-managed (don't set by hand): `data-embla-init`, `data-embla-start-index`. The script
adds `.is-active` to the current dot/thumb and stores `_emblaApi` on the root.

### Helpers and app glue

- **`utils.js` (`window.Utils`)** — `parseValue` and `parseDataAttributes(node, "data-embla-")`
  convert kebab-case `data-*` to a typed options object. This is why markup configures Embla
  with zero JS.
- **`navigation.js`** — intercepts same-origin navigations, swaps `<main>`, runs a View
  Transition, and refreshes Reveal/Embla. App-level only; the component preview iframes
  deliberately omit it.

## 3. Polyfills in the page head (keep these)

`@oddbird/popover-polyfill` (Popover API) · `invokers/compatible` (Invoker + Interest
Invokers, i.e. `command`/`commandfor`/`interestfor`) · the Embla Carousel CDN UMD bundles
(core + autoplay, auto-scroll, class-names, ssr plugins). See `zazz/components/index.html` for
the exact tags and SRI hashes.
