# Zazz Example Components

Zazz ships **nine example components** under `app/zazz/components/` (each a `.tsx`) paired with a stylesheet under `app/zazz/styles/` (each a `_*.css` in `@layer components`):

| Component       | Markup                | Stylesheet                                                                                                                           | Built on                                                                       |
| --------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Accordion       | `accordion.tsx`       | `_accordion.css`                                                                                                                     | native `<details>` / `<summary>`                                               |
| Badge           | `badge.tsx`           | `_badge.css`                                                                                                                         | `<a>` / `<button>`                                                             |
| Button          | `button.tsx`          | `_button.css`                                                                                                                        | `<button>` / `<a>`                                                             |
| Dialog          | `dialog.tsx`          | `_dialog.css`                                                                                                                        | native `<dialog>` + Invoker Commands API                                       |
| Dropdown        | `dropdown.tsx`        | `_dropdown.css`                                                                                                                      | Popover API + CSS anchor positioning                                           |
| Navigation menu | `navigation-menu.tsx` | `_navigation-menu.css`                                                                                                               | Popover API + CSS anchor positioning                                           |
| Section         | `section.tsx`         | — (utilities only)                                                                                                                   | layout wrapper                                                                 |
| Tabs            | `tabs.tsx`            | `_tabs.css`                                                                                                                          | native `<input type="radio">` + CSS `order`                                    |
| Form family     | `input.tsx`, `textarea.tsx`, `select.tsx`, `input-group.tsx`, `password-group.tsx`, `checkbox.tsx`, `radio.tsx`, `switch.tsx` | `_fields.css` + `_input.css` / `_textarea.css` / `_select.css` / `_input-group.css` / `_password-group.css` / `_radio.css` (checkbox & switch in `_reset.css`) | native form controls, customizable `<select>`, `field-sizing`, `:user-invalid` |

They are **examples, not a packaged library**. They show how to build common components on Zazz tokens using modern, dependency-free platform features. When you build in an existing component system (shadcn, Radix, your own framework), keep that system's architecture and _reskin it through Zazz tokens_ — don't fight it. When you build fresh, mirror these patterns for consistency.

The `.tsx` files carry a thorough comment header documenting anatomy, variants, and behavior. Read the source pair when you need exact detail; this file is the orientation.

---

## The shared pattern

Every component follows the same five conventions. Learn them once and all eight read the same way — and so will anything new you build.

1. **A block class + BEM sub-elements.** `.button`, `.dialog` + `.dialog__header` / `.dialog__body` / `.dialog__footer`, `.navigation-menu` + `.navigation-menu__container` / `__item` / `__trigger` / `__popover`. Sub-elements are `block__element`; there are no `block--modifier` classes (see #3).

2. **`:where()` for zero specificity.** Every rule is `:where(.button) { … }`. The component sits at specificity 0, so utilities (`p-md`, `text-h4`) and your own CSS always win without `!important`.

3. **Variants and sizes are data attributes, not modifier classes.** `[data-variant="primary|muted|ghost|link"]`, `[data-size="sm|icon|icon-sm"]`, plus component-specific ones: `[data-side]`/`[data-align]` (dropdown), `[data-align]`/`[data-variant="submenu"]`/`[data-size]`/`[data-animation]` (navigation menu), `[data-size="large|screen"]` (dialog), `[data-direction="horizontal"]` (a `.field` with the control beside its label) and `[data-align]` (input-group addon placement). In markup: `class="button" data-variant="primary"` — **not** `class="button button-primary"`.

4. **Local custom properties default to theme tokens, then re-point per variant.** Each component opens by declaring its own `--component-*` props off theme roles, then a `[data-variant]` rule swaps those locals. This keeps the base rule untouched and makes a variant a short list of variable reassignments:

   ```css
   :where(.button) {
     --button-background: var(--background);
     --button-foreground: var(--foreground);
     --button-border: var(--border);
     --button-radius: var(--radius-md);
     /* …consumes the locals below… */
     background-color: var(--button-background);
     color: var(--button-foreground);
     border: 1px solid var(--button-border);
     border-radius: var(--button-radius);
   }
   :where(.button[data-variant="primary"]) {
     --button-background: var(--primary);
     --button-foreground: var(--primary-foreground);
     --button-border: var(--button-background);
   }
   ```

5. **Native HTML / platform APIs carry the behavior — no JS, no Radix.** `<details>` for the accordion, native `<dialog>` + Invoker Commands for the dialog, the Popover API + CSS anchor positioning for dropdown and navigation menus, `:has()` for open-state styling. Most are Baseline and work in plain HTML and Astro identically. **CSS anchor positioning is the exception — it ships in Chromium (125+) but not yet Firefox/Safari, so it is treated as a progressive enhancement.** Every rule that depends on `anchor()` / `position-area` / `anchor-size()` is gated behind `@supports (anchor-name: …)`, with a sensible fallback for browsers without it (see [Anchor-positioning fallbacks](#anchor-positioning-fallbacks)).

Two cross-cutting tokens every interactive component uses:

- **Focus:** `outline: var(--ring-size) var(--ring-style) <transparent>; outline-offset: var(--ring-offset);` at rest, then `outline-color: var(--ring)` on `:focus-visible`. Never style `:focus`.
- **Motion:** `transition: var(--default-transition)` (the spring-eased multi-property bundle), or a single property with `var(--default-transition-duration) var(--default-transition-timing-function)`.

---

## Button — `.button`

The workhorse action. `<button>` for in-page actions, `<a href>` for navigation (the `href` form gets a pointer cursor).

```html
<button class="button">Default</button>
<button class="button" data-variant="primary">Primary</button>
<button class="button" data-variant="muted">Muted</button>
<button class="button" data-variant="ghost">Ghost</button>
<a class="button" data-variant="link" href="#">Link</a>

<!-- icon-only: square, no padding, centers the svg -->
<button class="button" data-size="icon" aria-label="Menu"><svg>…</svg></button>
```

- **Variants** (`data-variant`): none (card-ish: `--background` fill, `--border`), `primary` (`--primary` fill), `muted` (`--muted` fill, no visible border), `ghost` (transparent → `--muted` on hover), `link` (no box, underlined, `--primary` on hover).
- **Sizes** (`data-size`): `sm` (compact height/padding for dense rows and input-group addons); `icon` (square `--button-height` × `--button-height`); `icon-sm` (the smaller square).
- **Metrics:** height `--step-8`, inline padding `--step-2_5`, gap `--step-1`, radius `--button-radius` (`--radius-md`), font `--font-size-sm` / `--weight-strong`.
- **Icons:** drop an `<svg>` directly inside — it auto-sizes to `--button-icon-size` (`--step-4`).
- **States:** `:hover`, `:active`, `:focus-visible` (ring), `:disabled` / `[aria-disabled="true"]` (0.5 opacity, no pointer), `[aria-busy="true"]` (progress cursor). Interactive states only apply to `button.button` / `a[href].button`.

---

## Badge — `.badge`

The button's smaller, label-y sibling: tags, pills, navigation chips. Same variant/size/local-prop structure as button, just smaller.

```html
<a class="badge" href="#">Default</a>
<a class="badge" data-variant="primary" href="#">Primary</a>
<a class="badge" data-variant="muted" href="#">Muted</a>
<a class="badge" data-variant="ghost" href="#">Ghost</a>
<a class="badge" data-variant="link" href="#">Link</a>
<a class="badge" data-size="icon" href="#"><svg>…</svg></a>
```

- **Variants / sizes:** identical names to button.
- **Metrics:** height `--step-5`, inline padding `--step-2`, radius `--badge-radius` (`--radius-sm`), font `--font-size-xs` / `--weight-strong`, icon `--step-3`.
- **States:** same set as button; interactive states only on `button.badge` / `a[href].badge` (a bare `<span class="badge">` is inert decoration).

---

## Accordion — `.accordion`

Native disclosure. No JS, no ARIA wiring needed — `<details>`/`<summary>` give you keyboard support and state for free.

```html
<div class="accordion">
  <details>
    <summary>
      Question one <svg><!-- chevron --></svg>
    </summary>
    <div class="pb-sm"><p>Answer copy.</p></div>
  </details>
  <details>
    <summary>
      Question two <svg><!-- chevron --></svg>
    </summary>
    <div class="pb-sm"><p>Answer copy.</p></div>
  </details>
</div>
```

- A 1px `--border` separates items (every `details` but the last).
- `summary` is a flex row (`space-between`), `--weight-strong`, underlined with an animated `text-underline-offset` on hover and while `[open]`.
- The `<svg>` chevron sizes to `--step-4` and rotates `-180deg` when `details[open]`, transitioned with the spring duration/easing.
- Smooth open/close height comes from `interpolate-size: allow-keywords` (set on `:root`) + `::details-content` transitions in the reset.

---

## Tabs — `.tabs`

Native, zero-JS tabs from grouped radio inputs, styled as a **segmented control**: a muted track (`.tabs__list`) holds the hidden radios + their labels and a single card-colored pill (`.tabs__indicator`) that slides behind the active label via anchor positioning. The `.tabs__panel`s are **siblings after the track**, not interleaved with the radios.

```html
<div class="tabs">
  <div class="tabs__list" role="tablist">
    <div class="tabs__indicator" aria-hidden="true"></div>

    <input type="radio" name="settings" id="tab-1" checked />
    <label for="tab-1" class="tabs__label"><span class="tabs__label-text">Account</span></label>

    <input type="radio" name="settings" id="tab-2" />
    <label for="tab-2" class="tabs__label"><span class="tabs__label-text">Billing</span></label>
  </div>

  <div class="tabs__panel">…</div>
  <div class="tabs__panel">…</div>
</div>
```

- **Track + pill:** `.tabs__list` is the `position: relative` inline-flex track (`--muted` fill, rounded). The checked label exposes `anchor-name: --active-tab`; `.tabs__indicator` is `position: absolute` and reads that anchor through `anchor()` insets (offset by `--tabs-indicator-inset`), so it sizes to and slides between labels. Label backgrounds stay transparent — **the pill is the active fill**.
- **Anchor-positioning fallback:** the pill's `anchor()` insets are gated behind `@supports (anchor-name: …)`. Where unsupported (Firefox/Safari), the pill is hidden and the checked label is painted directly (`--card` fill + `--shadow-xs`) — loses the slide, keeps the indication. See [Anchor-positioning fallbacks](#anchor-positioning-fallbacks).
- **Panel reveal is positional:** panels sit after `.tabs__list`, so the Nth checked radio maps to the (N+1)th child of `.tabs` via a `:has(.tabs__list > input:nth-of-type(N):checked) > .tabs__panel:nth-child(N+1)` chain. **Panel order must match radio order**, and the built-in chain covers up to **24 tabs** (extend the chain for more).
- The radios share a `name`, so the browser gives mutual exclusion and Arrow-key navigation for free; mark one `checked` for the initial panel. Each radio is hidden with `clip-path` (stays focusable); its focus ring is surfaced on the label via `input:focus-visible + label`.
- **Retune via locals on `.tabs`:** track — `--tabs-gap` (`--gap-md`), `--tabs-track-background` (`--muted`), `--tabs-track-padding`/`--tabs-track-gap` (`--step-0_5`), `--tabs-track-radius` (`--radius-md`); pill — `--tabs-indicator-background` (`--card`), `--tabs-indicator-radius` (`--radius-sm`), `--tabs-indicator-shadow` (`--shadow-xs`); labels — `--tabs-label-foreground` (`--muted-foreground`), `--tabs-label-foreground--hover` / `--tabs-label-foreground--active` (`--foreground`), `--tabs-label-padding` (`--step-2_5`), `--tabs-label-height` (`--step-8`). A brand pill is `--tabs-indicator-background: var(--primary)` + `--tabs-label-foreground--active: var(--primary-foreground)`.

---

## Dialog — `.dialog`

A modal on the native `<dialog>` element, opened and closed entirely through the **Invoker Commands API** — zero JavaScript.

```html
<button class="button" command="show-modal" commandfor="dialog-1">Open</button>

<dialog id="dialog-1" class="dialog" closedby="any">
  <div class="dialog__content">
    <header class="dialog__header">
      <h2 class="text-lg font-heading weight-strong">Dialog title</h2>
      <p class="text-muted-foreground">Supporting copy.</p>
    </header>
    <div class="dialog__body prose">
      <p>Body content…</p>
    </div>
  </div>
  <footer class="dialog__footer">
    <button class="button" commandfor="dialog-1" command="close">Cancel</button>
    <button class="button" data-variant="primary" commandfor="dialog-1" command="close">
      Accept
    </button>
  </footer>
  <button
    class="button absolute top-xs right-xs"
    data-size="icon"
    data-variant="ghost"
    commandfor="dialog-1"
    command="close"
  >
    <svg>…</svg>
  </button>
</dialog>
```

- **Open / close:** `button[command="show-modal"][commandfor="id"]` opens; `command="close"` closes; `closedby="any"` enables backdrop-click dismissal. The browser handles focus trapping and `Esc`.
- **Sizes** (`data-size` on `.dialog`): none → `--article` (~40rem); `large` → `--container` (~80rem); `screen` → viewport minus `--gap-md` on each axis.
- **Anatomy:** `.dialog__content` scrolls (`max-block-size: 100svh − gaps`); `.dialog__header` and `.dialog__body` pad with `--gap-sm` / `--gap-md`; `.dialog__footer` is a sticky bottom bar with `border-top` and `--gap-xs` between actions.
- **Surface:** `--card` background, `--card-foreground`, `--shadow-md`, `--radius-lg`, `overflow: clip`.
- **Backdrop:** styled in `_reset.css` — animates from `--shade-none` to **`--shade-800`**. Shade is deliberate so the backdrop dims in _both_ modes (`--muted` would lighten the page in dark mode). Entry/exit use spring easing via `@starting-style`.

---

## Dropdown — `.dropdown`

A click-to-open menu on the **Popover API** anchored with **CSS anchor positioning**. No JS; light-dismiss (click-outside / `Esc`) is native.

```html
<div class="dropdown">
  <button class="button" popovertarget="menu-1">Open menu</button>
  <div id="menu-1" class="dropdown__popover" data-side="bottom" data-align="start" popover="auto">
    <menu>
      <li class="weight-strong text-eyebrow text-muted-foreground p-xs">Group</li>
      <li><a href="#" class="button justify-start" data-variant="ghost">Item</a></li>
      <hr class="my-xs" />
      <li><a href="#" class="button justify-start" data-variant="ghost">Item</a></li>
    </menu>
  </div>
</div>
```

- **Anchoring:** `.dropdown` sets `anchor-scope: --dropdown-trigger`; the trigger (`[popovertarget]`) gets `anchor-name: --dropdown-trigger`; the panel reads it via `position-anchor` and the shared `--popover-*` vars defined on `:where([popover])` in `_reset.css`.
- **Placement:** `data-side="bottom|top|left|right"` × `data-align="start|center|end"` (12 combinations) drive `--popover-position-area` / `--popover-origin`. The reset supplies `position-try-fallbacks` so the panel flips if it would overflow.
- **Surface:** `--popover-*` locals default to `--card` / `--border` / `--radius-md` / `--shadow-md`, padding `--step-1_5`. Menu items are `.button[data-variant="ghost"]` with `justify-start` for full-width left-aligned rows; inside the popover their radius drops to `--radius-sm`.
- **Fallback:** the actual positioning (`inset`, `position-area`, `position-try-fallbacks`) lives in `:where([popover])` behind `@supports (anchor-name: …)`. In browsers without anchor positioning the panel is the UA-centered popover instead — still opens, light-dismisses, and animates; it just isn't tethered to the trigger. See [Anchor-positioning fallbacks](#anchor-positioning-fallbacks).

---

## Navigation menu — `.navigation-menu`

A horizontal nav with rich popover panels (mega-menu capable). Same Popover-API + anchor-positioning foundation as the dropdown, plus a `:has()` trick for the chevron — still no JS.

```html
<nav class="navigation-menu">
  <menu class="navigation-menu__container">
    <li class="navigation-menu__item">
      <button
        class="button navigation-menu__trigger"
        data-variant="ghost"
        popovertarget="nav-products"
      >
        Products <svg><!-- chevron --></svg>
      </button>
      <div id="nav-products" class="navigation-menu__popover" popover="auto">
        <div class="navigation-menu__viewport grid grid-cols-2">
          <a href="#" class="navigation-menu__featured">
            <span class="text-eyebrow text-muted-foreground mb-xs">Featured</span>
            <span class="text-md weight-strong">Zazz Platform</span>
            <span class="text-sm text-muted-foreground text-pretty">Design, build, ship.</span>
          </a>
          <div class="grid">
            <a href="#" class="navigation-menu__link">
              <span class="text-sm weight-strong">Analytics</span>
              <span class="text-sm text-muted-foreground">Real-time insights.</span>
            </a>
            <!-- more links… -->
          </div>
        </div>
      </div>
    </li>
    <!-- plain top-level link, no popover -->
    <li class="navigation-menu__item"><a href="#" class="button" data-variant="ghost">Docs</a></li>
  </menu>
</nav>
```

- **Per-item anchor scope:** each `.navigation-menu__item` scopes `--navigation-menu-trigger`, so every trigger names its own anchor and triggers can share one name. `.navigation-menu` itself names `--navigation-menu-root` for full-width panels.
- **Alignment** (`data-align` on the popover): `start` (default), `center`, `end` — nav panels only open downward, so alignment is inline-axis only.
- **Panel layout:** the `.navigation-menu__viewport` is a grid. A single column gives a plain link list; a two-column grid with a tall `.navigation-menu__featured` callout (gradient via `color-mix`) beside a `.navigation-menu__link` grid gives a mega-panel. Layout is utility-driven (`grid grid-cols-*`), not a `data-*` flag.
- **Size** (`data-size` on the popover): `container` matches the container width, `root` matches the nav root width, `screen` spans the viewport — each via `anchor-size()`. **Submenu** (`data-variant="submenu"`): a nested flyout that anchors to its sub-trigger and opens to the inline-end, with `position-try-fallbacks` for edge flips.
- **Chevron:** `.navigation-menu__item:has(.navigation-menu__popover:popover-open) … > svg` rotates 180° while open — pure CSS state detection.
- **Fallback:** identical to the dropdown — positioning is gated in `:where([popover])`; without anchor positioning the panel (including the `data-size="container"` mega-menu) centers via the UA default. See [Anchor-positioning fallbacks](#anchor-positioning-fallbacks).

---

## Anchor-positioning fallbacks

CSS anchor positioning (`anchor-name`, `anchor-scope`, `position-anchor`, `position-area`, `position-try-fallbacks`, `anchor()`, `anchor-size()`) ships in Chromium 125+ but **not yet in Firefox or Safari**. Zazz treats it as a progressive enhancement: anything that _depends_ on it for layout is gated behind `@supports (anchor-name: …)` (or `@supports (inline-size: anchor-size(…))` for the sizing function), with a graceful fallback in the `@supports not (…)` / ungated path. The bare `anchor-name` / `position-anchor` declarations themselves are left ungated — unsupported browsers simply ignore them.

| Component                                                                  | Enhanced (Chromium)                                                                          | Fallback (Firefox/Safari)                                                                                                                                                                  |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Dropdown / Navigation menu** popovers (`_reset.css` `:where([popover])`) | Tethered to the trigger via `position-area`, flips on overflow via `position-try-fallbacks`. | The `inset: auto` + anchored margins are gated, so the popover keeps the UA default — **centered in the viewport**. Still opens, light-dismisses, and animates.                            |
| **Tabs** sliding pill (`_tabs.css` `.tabs__indicator`)                     | Pill sizes itself from the checked label via `anchor()` insets and slides between tabs.      | Pill is `display: none`; the checked label is painted directly (`--card` fill + `--shadow-xs`). Loses the slide animation, keeps the active-state affordance.                              |
| **Select** picker width (`_select.css` `::picker(select)`)                 | `inline-size: anchor-size(width)` matches the panel to the trigger.                          | `inline-size: max-content`. (Only reachable in a browser that supports customizable `<select>` but not `anchor-size` — otherwise the whole control degrades to the native dropdown first.) |

**When adding a new anchor-positioned component or rule, follow the same pattern:** put the anchored layout behind `@supports (anchor-name: …)`, and make sure the ungated styles leave the element in a usable state (centered, statically placed, or with a non-anchored visual). Never let `anchor()` / `anchor-size()` be the _only_ thing sizing or placing a visible element, or it collapses where unsupported.

Also gated for the same reason: **`contrast-color()`** in the `::selection` rule (`_reset.css`) — Chromium-only, so the auto-contrast text color sits behind `@supports (color: contrast-color(white))`; without it the selection keeps its inherited text color over the tinted background.

---

## Section — layout wrapper

No CSS file; it's a utilities-only pattern for vertical page rhythm.

```html
<section class="grid py-xl">
  <div class="container flex flex-col gap-lg">
    <!-- content -->
  </div>
</section>
```

- `py-xl` (`--gap-xl`) gives generous block padding; `.container` (or `.article` for reading width) constrains and self-pads.
- Add `border-t` to the `<section>` for a divider between stacked sections.

---

## Form family — `.input` · `.textarea` · `.select` · `.input-group` · `.password-group` · checkbox · switch · `.radio`

A set of native form controls styled from Zazz tokens. No JS drives behavior — the browser handles validation, the customizable `<select>` picker, `field-sizing` growth, and checked/indeterminate states. The cross-control glue (shared tokens, the disabled state, the `.field` wrapper, validation) lives in `_fields.css`; each control then lives in its own partial.

### Shared `--field-*` tokens

`.input`, `.textarea`, `.select`, `.input-group`, and `.password-group` all open with the same locals (declared once in `_fields.css`) so a text input, a dropdown, and a message box read as one family — and overriding one local retunes the whole set:

```css
:where(.input, .textarea, .select, .input-group, .password-group) {
  --field-background: var(--input);
  --field-foreground: var(--input-foreground);
  --field-border: var(--border);
  --field-border--hover: oklch(from var(--border) calc(l - 0.1) c h);
  --field-border--focus: var(--primary);
  --field-radius: var(--radius-md);
  --field-button-radius: var(--radius-sm); /* buttons nested in an input-group */
  --field-height: var(--step-8); /* matches the button */
  --field-padding: var(--step-2_5);
  --field-icon-size: var(--step-4);
}
```

Every control transitions its border to `--field-border--hover` on hover and `--field-border--focus` on focus, plus the standard `--ring` outline on `:focus-visible`. **Disabled** is shared too: `opacity: 0.5` + `cursor: not-allowed`.

### `.field` wrapper + validation

`.field` is an optional layout helper — a grid stacking `.field__label` (row 1), the control (row 2), and `.field__hint` / `.field__error` (shared row 3, so only the visible message takes space). `[data-direction="horizontal"]` flips it to a row for checkbox/radio/switch.

```html
<div class="field">
  <label class="field__label" for="email">Email</label>
  <input class="input" id="email" type="email" required aria-describedby="email-hint" />
  <span class="field__hint" id="email-hint">We'll only use this for receipts.</span>
  <span class="field__error" role="alert">Please enter a valid email address.</span>
</div>
```

Validation hangs off **`:user-invalid`** — the error reveals (and the hint hides) only after the user _commits_ a value (blur/submit), never while typing. An invalid control flips its border, ring, and label to `--destructive`; the hint↔error swap animates via `@starting-style` + `content-visibility: allow-discrete`.

### `.field-group` (+ `.radio-group`)

Semantic grouping for related controls: a `<fieldset class="field-group">` with a `<legend>` (typically `text-eyebrow text-muted-foreground`). Layout and fieldset chrome reset live in `_fields.css` for both `.field-group` and `.radio-group`. Use `.radio-group` on radio sets; `.field-group` for everything else (text fields, selects, input-groups, checkbox/switch sets).

Wrap actionable demos in a `<form>` when submit buttons or native validation should work — e.g. a fieldset of inputs plus a primary `type="submit"`, or each input-group example in its own form. Keep one `<form>` for flows that submit together (e.g. a dialog with `method="dialog"`).

```html
<form class="flex flex-col gap-sm">
  <fieldset class="field-group">
    <legend>Contact</legend>
    <div class="field">
      <label class="field__label" for="email">Email</label>
      <input class="input" id="email" name="email" type="email" required />
    </div>
  </fieldset>
  <button class="button" data-variant="primary" type="submit">Save</button>
</form>
```

### `.input`

One class for every text-like type (`text`, `email`, `tel`, `url`, `search`, `password`, `number`, `date`, …) — the `type` only swaps the keyboard/picker, the box is identical.

```html
<input class="input" type="email" placeholder="you@example.com" />
```

### `.textarea`

Auto-grows with `field-sizing: content`, clamped between `5lh` and `12lh` then scrolls; `resize: vertical`.

```html
<textarea class="textarea" placeholder="Your message"></textarea>
```

### `.select` — customizable `<select>`, no JS

`appearance: base-select` themes the trigger, picker, options, and arrow while the browser keeps keyboard nav, top-layer rendering, and form integration. Needs a `<button><selectedcontent></selectedcontent></button>` child; degrades to the native OS dropdown where unsupported (the `_reset.css` chevron covers it).

```html
<select class="select" name="sort">
  <button><selectedcontent></selectedcontent></button>
  <option value="recent" selected>Most recent</option>
  <option value="popular">Most popular</option>
</select>
```

- The picker (`::picker(select)`) is styled like the card popovers — `--card`, `--shadow-md`, anchored to the trigger width.
- `::picker-icon` is a chevron that rotates on `:open`; each `<option>`'s `::checkmark` marks the selection.
- The checked option uses `--primary-100` fill + `--primary` text + `--weight-strong` (never color alone).

### `.input-group` — control + addons (shadcn-style composition)

A single bordered shell (authored as a `<label>`) that fuses a control with addons. `:focus-within` lifts the whole shell while the nested `.input`/`.textarea` goes borderless/transparent so it reads as one field.

```html
<label class="input-group">
  <input class="input" type="search" aria-label="Search" />
  <span class="input-group__addon"
    ><svg><!-- leading icon --></svg></span
  >
  <span class="input-group__addon" data-align="inline-end">
    <button class="button" data-variant="ghost" data-size="icon-sm" type="button" aria-label="Go">
      <svg>…</svg>
    </button>
  </span>
</label>
```

- **Addons come _after_ the control in the DOM** (predictable tab order); `data-align` positions them: `inline-start` (default) · `inline-end` · `block-start` · `block-end`. The `block-*` values span a full-width row — that's how a `.textarea` grows a toolbar above or below it.
- `.input-group__addon` holds icons, a `.button`, `<kbd>`, or an `.input-group__text` (units/protocols/handles like `https://`, `USD`, `@user`).
- Nested `.button`s pick up `--field-button-radius` (`--radius-sm`) so they nest cleanly inside the shell.

### `.password-group` — password field with reveal toggle

The same shell as `.input-group`, specialized for a password input plus a show/hide toggle. The toggle lives in an `inline-end` addon as a ghost icon `.button` (`.password-group__toggle`) and swaps two icons (`.password-group__icon--show` / `--hide`) purely from its `aria-pressed` state in CSS.

```html
<label class="password-group">
  <input class="input" type="password" autocomplete="new-password" minlength="8" required />
  <span class="password-group__addon" data-align="inline-end">
    <button
      class="button password-group__toggle"
      data-variant="ghost"
      data-size="icon-sm"
      type="button"
      aria-pressed="false"
      aria-label="Show password"
    >
      <svg class="password-group__icon password-group__icon--show">…</svg>
      <svg class="password-group__icon password-group__icon--hide">…</svg>
    </button>
  </span>
</label>
```

- The icon swap is CSS-only off `aria-pressed`; a small progressive-enhancement script flips the input `type` between `password`/`text` and keeps `aria-pressed` + `aria-label` in sync (the only form control that wants a few lines of JS).
- Wrap it in a `.field` for a `.field__label`, `.field__hint`, and `.field__error`; it shares the `--field-*` tokens and `:user-invalid` validation with the rest of the family.
- Browser reveal/clear chrome (`::-ms-reveal`, Safari credential buttons) is suppressed in `_reset.css` so the custom toggle is the only one.

### Checkbox & switch (styled in `_reset.css`)

Both are native `input[type="checkbox"]` with `appearance: none` redrawing from tokens — no component class needed.

```html
<label class="field">
  <input type="checkbox" />
  <span class="field__label">Subscribe to the newsletter</span>
</label>
<label class="field">
  <input type="checkbox" role="switch" checked />
  <span class="field__label">Email notifications</span>
</label>
```

- **Checkbox** (`input[type="checkbox"]:not([role="switch"])`): fills `--primary` with a check (`:checked`) or dash (`:indeterminate`) SVG mask; radius `--radius-xs`, `--checkbox-*` tokens. `indeterminate` has no HTML attribute — set it in JS (`el.indeterminate = true`).
- **Switch** (`input[role="switch"]`): a pill track (`--muted` → `--primary` on `:checked`) with a `--white` thumb that slides; `--switch-*` tokens.

### `.radio` (+ `.radio-group`)

`appearance: none` redraws the circle; the checked dot is a `radial-gradient` so it tracks `--primary-foreground`, not color alone. Group by shared `name`; `.radio-group` is a `<fieldset>` that shares layout with `.field-group` in `_fields.css`.

```html
<fieldset class="radio-group">
  <legend>Billing</legend>
  <label class="field">
    <input class="radio" type="radio" name="plan" value="monthly" />
    <span class="field__label">Monthly</span>
  </label>
  <label class="field">
    <input class="radio" type="radio" name="plan" value="annual" checked />
    <span class="field__label">Annual</span>
  </label>
</fieldset>
```

---

## Building a component Zazz doesn't ship

When asked for a tooltip, tabs, breadcrumb, toast, etc., follow the shared pattern above and these token choices:

1. **Right surface tokens.** Surface → `--card` or `--muted`; text → the matching `*-foreground`; lines → `--border`. Set a background _and_ its paired foreground, always.
2. **Right radius.** Pick a semantic step (`--radius-sm` for small inline things, `--radius-md` for buttons/inputs, `--radius-lg` for cards/dialogs). Expose it as a local prop (`--tooltip-radius: var(--radius-sm)`) so it's tunable, rather than hard-coding the semantic token in the consuming rule.
3. **Right elevation.** `--shadow-xs` resting, `--shadow-md` floating (dropdowns/popovers), `--shadow-lg`/`xl` for the most-elevated surface. Spend shadows sparingly.
4. **Right spacing & type.** `--gap-*` for padding/gaps (`--step-*` only for off-grid internals); `text-sm`/`text-h6` for titles, `text-md` for body.
5. **Right focus & motion.** The `--ring*` outline on `:focus-visible`; `var(--default-transition)` (or duration/easing pair) for transitions.
6. **Right structure.** Block class + `:where()`, BEM sub-elements, data-attribute variants, native HTML/platform features where they exist (Popover API for floating panels, `<dialog>` for modals, `<details>` for disclosure).

In a component system (shadcn, Radix, etc.), let that system carry structure and behavior; Zazz owns the visual layer through tokens.
