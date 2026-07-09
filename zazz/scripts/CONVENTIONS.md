# JavaScript Conventions for `zazz/scripts`

This document defines how to write and structure Zazz vanilla JavaScript scripts. Follow these rules when adding or editing files in `zazz/scripts/`.

## Scope

Applies to all files in `zazz/scripts/`:

- `carousel.js`
- `embla.js`
- `lightbox.js`
- `navigation.js`
- `password.js`
- `reveal.js`
- `tabs.js`
- `toaster.js`
- `utils.js`

Scripts are served directly at `/zazz/scripts/*.js` — no bundler or transpiler. Write browser-native **ES modules** that run as-is in modern browsers. `main.js` is the entry module: it `import`s every component script so a page loads behavior with one `<script type="module" src="…/main.js">` tag. When you add a script, add an `import "./your-script.js";` line to `main.js`.

Type-checking is enabled via `zazz/scripts/tsconfig.json` (`checkJs: true`). Run `npm run scripts:check` (or the full `npm run types:check`) to validate. Ambient types for CDN and cross-script globals live in `zazz/scripts/globals.d.ts`.

---

## JavaScript conventions

### Philosophy

- **Vanilla JS only.** No framework, no npm runtime deps, no build step — just native ES modules. Cross-script dependencies use `import`; external libraries Zazz doesn't ship (the Embla CDN UMD bundles) are still read as globals loaded by prior `<script>` tags.
- **HTML-first.** Markup and data attributes drive behavior. Authors configure components in HTML; scripts discover and enhance the DOM.
- **Progressive enhancement.** Feature-detect APIs before use. When unsupported, degrade gracefully (e.g. `navigation.js` falls back to full page loads).
- **Minimal surface area.** Export a small public API. Keep helpers private with `@private` JSDoc or class private fields (`#method`).

### File structure

Every script follows this layout:

1. `"use strict";` as the first line.
2. `@fileoverview` JSDoc block describing the module.
3. Implementation grouped with `// --- Section name ---` dividers in long files.
4. `import` statements for any sibling modules this script depends on.
5. Auto-initialization block (when applicable).
6. `window` assignment for the public API, then a named `export`, at the bottom.

```javascript
"use strict";

/**
 * @fileoverview Module title.
 * @description What this module does.
 */

import { Dependency } from "./dependency.js"; // only when this module needs another

// --- Section name ---

function doWork() {}

// Auto-initialize when DOM is ready (only in browser environment)
if (typeof window !== "undefined" && typeof document !== "undefined") {
  // ...
}

// Attach to window for the documented public API, then export for module consumers.
if (typeof window !== "undefined") {
  window.MyExport = MyExport;
}

export { MyExport };
```

### Module exports

Attach a named export object or class to `window` for the documented public API, then `export` it for module consumers (the `main.js` entry and any sibling script that imports it).

| File            | Global                        | Export shape                          |
| --------------- | ----------------------------- | ------------------------------------- |
| `utils.js`      | `window.Utils`                | `{ parseValue, parseDataAttributes }` |
| `reveal.js`     | `window.Reveal`               | `Reveal` class                        |
| `embla.js`      | `window.EmblaInit`            | `{ init, initRoot, ... }`             |
| `carousel.js`   | `window.EmblaCarouselElement` | `<embla-carousel>` element class      |
| `lightbox.js`   | `window.MediaLightbox`        | `<media-lightbox>` element class      |
| `password.js`   | `window.InputPassword`        | `<input-password>` element class      |
| `tabs.js`       | `window.TabGroup`             | `<tab-group>` element class           |
| `toaster.js`    | `window.Toaster`              | `Toaster` API + `<toast-region>`      |
| `navigation.js` | _(none)_                      | Side-effect only; no export           |

Document export objects with `@namespace` JSDoc and `@property` for each key.

### Auto-initialization

Scripts that enhance the page on load use a guarded auto-init block:

```javascript
if (typeof window !== "undefined" && typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}
```

- Check both `window` and `document` so the file is safe to evaluate in non-browser contexts.
- Handle `document.readyState === "complete"` by calling `init()` immediately.
- Make initialization **idempotent** — guard with attributes (`data-embla-init`), flags (`initFn._bound`), or instance checks so re-running is safe.

`Reveal` additionally exposes `Reveal.disableAutoInit()` and `Reveal.getAutoInstance()` for manual control.

### HTML web components

Interactive components ship as **light-DOM custom elements** that augment existing markup (carousel.js, lightbox.js, password.js, tabs.js). They follow the [HTML web components](https://adactio.com/journal/20618) approach — wrap or replace the component's root element, never replace its content.

- **No shadow DOM, no templates.** Children are regular markup; all Zazz CSS applies unchanged.
- **Element names describe the pattern, not the brand:** `embla-carousel`, `media-lightbox`, `input-password`, `tab-group`.
- **Lifecycle, not load events.** Set up in `connectedCallback()`, tear down in `disconnectedCallback()`. Elements work when inserted dynamically — no auto-init block needed.
- **Clean up with `AbortController`.** Bind listeners with `{ signal }` and abort on disconnect; disconnect `MutationObserver`s.
- **Guard registration:** `if (!customElements.get("tag-name")) customElements.define(...)` so double script loads are safe.
- **Custom elements are `display: inline` by default** — add a `display` rule in the component's stylesheet.
- **Degrade gracefully.** Without JS the markup must still render sensibly (a password field stays masked; tabs keep native radio behavior).
- Attach the element class to `window` and `export` it like any other script.

### Data-attribute configuration

Component scripts read configuration from HTML data attributes rather than JS options objects.

- Use a consistent prefix per component: `data-embla-*`, `data-reveal-*`.
- Parse attributes with `Utils.parseDataAttributes(node, "data-embla-")`, which converts kebab-case to camelCase and coerces types via `Utils.parseValue`.
- Document the full attribute reference in the file's `@fileoverview` block.
- Set lifecycle attributes on the DOM (`data-embla-init`) so scripts can detect already-initialized elements.

Boolean flags can be bare attributes (`data-embla-autoplay`) or explicit values (`data-embla-keyboard="false"`).

### Dependencies and load order

Scripts declare dependencies with ES `import`s, so the module graph resolves order — the `main.js` entry is the only tag a page loads.

| Script          | Imports       | Notes                                            |
| --------------- | ------------- | ------------------------------------------------ |
| `utils.js`      | —             | Provides `window.Utils`                          |
| `reveal.js`     | —             | Standalone                                       |
| `embla.js`      | `utils.js`    | Also needs the Embla CDN globals (see below)     |
| `carousel.js`   | `embla.js`    | `<embla-carousel>` calls `EmblaInit.initRoot`    |
| `lightbox.js`   | `carousel.js` | `<media-lightbox>` coordinates carousel elements |
| `password.js`   | —             | Standalone (`<input-password>`)                  |
| `tabs.js`       | —             | Standalone (`<tab-group>`)                       |
| `toaster.js`    | `utils.js`    | `<toast-region>` + `window.Toaster` toast API    |
| `navigation.js` | —             | App-level; inert in component preview iframes    |

When a script needs `Utils`, `import { Utils } from "./utils.js"` — do not duplicate parsing logic. The one thing the module graph can't order is the **Embla CDN UMD bundles**: `embla.js` reads them as globals, so their `<script defer>` tags must precede the `main.js` module in the document.

### DOM interaction patterns

- **Query within scope.** Accept an optional root element (`initEmblaCarousels(scope)`) so init can target a subtree (e.g. an opened dialog).
- **Early returns for guards.** Check required elements and skip gracefully rather than throwing.
- **Store instances on DOM nodes** when external access is needed: `emblaNode._emblaApi = emblaApi`. Use a leading underscore to signal internal state.
- **Observe DOM changes** with `MutationObserver` when elements are hidden at init time (closed dialogs).
- **Delegate events** at `document` level when triggers can appear anywhere (`initEmblaStartLinks`).
- **Respect focus and input context.** Skip keyboard handlers when focus is in form fields or contenteditable elements.

### Classes vs functions

- Use a **class** when the module manages persistent instance state (`Reveal` with observers and config).
- Use **functions** for stateless init and helpers (`initEmblaCarousels`, `parseValue`).
- Use **private class fields** (`#observers`, `#getObserver`) for encapsulation.
- Use **`const` arrow functions** for callbacks and short helpers; **`function` declarations** for hoisted init functions called before definition in the file.

### Syntax and style

- Double quotes for strings (matches oxfmt project config).
- Semicolons required.
- Optional chaining (`?.`) and nullish coalescing where they simplify guards.
- No TypeScript source files — types live in JSDoc and `globals.d.ts`.
- Run `npm run scripts:check` after editing to validate types.
- Run `npm run fmt` after editing to apply oxfmt formatting.

---

## JSDoc conventions

For tags not covered here, see the [JSDoc tag reference](https://jsdoc.app/).

### Required rules

1. **Every JSDoc block must include `@description`.** Do not rely on a bare first line without the tag.
2. **Use JSDoc for all public API documentation** — file headers, classes, functions, typedefs, and export namespaces.
3. **Use inline `//` comments only for implementation notes** — guards, event binding, non-obvious logic. Never duplicate JSDoc content inline.
4. **Tag descriptions use a hyphen separator:** `@param {Type} name - Description.`
5. **Optional parameters use bracket notation:** `@param {Type} [name=default] - Description.`

### Tag order

Use this order when multiple tags apply:

```
@description
(extended prose, if any)
@param
@returns
@private
@see
@example
```

For file-level blocks, `@fileoverview` comes first, then `@description`, then `@typedef` / `@property`, then `@see` / `@example`.

### Required vs optional tags

| Tag             | Required on                           | Notes                                                                |
| --------------- | ------------------------------------- | -------------------------------------------------------------------- |
| `@fileoverview` | Every file                            | Module-level summary                                                 |
| `@description`  | Every JSDoc block                     | One-line summary; extended prose below if needed                     |
| `@param`        | Functions with parameters             | Include type and hyphen description                                  |
| `@returns`      | Functions that return a value         | Use `@returns {void}` for void functions when documenting public API |
| `@private`      | Non-exported helpers                  | Module-scoped functions not on the export object                     |
| `@typedef`      | Config/option objects                 | Pair with `@property` for each field                                 |
| `@property`     | Typedef fields                        | Include type, optional default, hyphen description                   |
| `@namespace`    | Export objects (`Utils`, `EmblaInit`) | Document each exported key with `@property`                          |
| `@see`          | External references                   | MDN, library docs, related APIs                                      |
| `@example`      | Usage demonstrations                  | Runnable code or HTML snippets                                       |
| `@class`        | Classes                               | Optional; use with `@description` on the class block                 |

### Section dividers

In long files, use thin single-line markers to group related code:

```javascript
// --- Dot navigation ---
```

Do not use banner block comments (`/* ==== ... ==== */`).

### Templates

#### File header

```javascript
/**
 * @fileoverview Short module title.
 * @description What this module does and when to load it.
 *
 * Extended notes, attribute references, or architecture context.
 *
 * @see https://example.com/docs
 *
 * @example
 * <div data-feature="value">...</div>
 */
```

#### Function

```javascript
/**
 * @description One-line summary.
 *
 * Optional extended description.
 *
 * @param {Type} name - Parameter description.
 * @returns {Type} Return value description.
 * @private
 * @example
 * myFunction(arg);
 */
```

#### Class

```javascript
/**
 * @class
 * @description Initializes viewport entry animations.
 *
 * @example
 * const reveal = new Reveal();
 */
class Reveal {
  /**
   * @description Creates a new Reveal instance.
   *
   * @param {RevealOptions} [options={}] - Configuration options.
   */
  constructor(options = {}) {}
}
```

#### Typedef

```javascript
/**
 * @typedef {Object} RevealConfig
 * @property {string} [margin="0px"] - Margin around the root for IntersectionObserver.
 * @property {number} [threshold=0.2] - Visibility threshold (0–1) to trigger animations.
 */
```

#### Export namespace

```javascript
/**
 * @namespace Utils
 * @description Shared DOM and data-attribute parsing utilities.
 *
 * @property {typeof parseValue} parseValue - Converts string values to typed values.
 * @property {typeof parseDataAttributes} parseDataAttributes - Parses prefixed data attributes.
 */
const Utils = { parseValue, parseDataAttributes };
```

### Before and after

#### File header (navigation.js)

**Before:**

```javascript
// SPA-like navigation without a framework, using the Navigation API.
// https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API
```

**After:**

```javascript
/**
 * @fileoverview SPA-like navigation via the Navigation API.
 * @description Intercepts same-origin navigations and swaps `<main>` content
 * without a full page reload.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API
 */
```

#### Function (utils.js)

**Before:**

```javascript
/**
 * Converts string values to their appropriate JavaScript types
 *
 * @param {string} value - The string value to convert
 * @returns {boolean|number|Array|string} - Converted value in appropriate type
 *
 * Examples:
 * parseValue("true") → true (boolean)
 */
```

**After:**

```javascript
/**
 * @description Converts string values to their appropriate JavaScript types.
 *
 * @param {string} value - The string value to convert.
 * @returns {boolean|number|Array|string} Converted value in the appropriate type.
 *
 * @example
 * parseValue("true"); // true
 * parseValue("42"); // 42
 */
```

#### Section divider (embla.js)

**Before:**

```javascript
/* ===========================================================================
    DOT NAVIGATION HELPER FUNCTIONS
    =========================================================================== */
```

**After:**

```javascript
// --- Dot navigation ---
```

#### Private helper (embla.js)

**Before:**

```javascript
/**
 * Creates dot buttons based on the number of carousel slides
 */
const addDotBtnsWithClickHandlers = () => { ... };
```

**After:**

```javascript
/**
 * @description Creates dot buttons for each slide and binds click handlers.
 *
 * @private
 */
const addDotBtnsWithClickHandlers = () => { ... };
```
