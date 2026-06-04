# Zazz Integrations

How Zazz lives in different stacks. The token names are the same everywhere; only the wiring differs. There are two integration _models_, and choosing the right one is the first decision:

- **Bring the whole framework** — variables + reset + components + utilities. This is the vanilla path: plain HTML/CSS, Astro, or any setup where Zazz _is_ your styling layer. Covered in [Vanilla / Astro / plain CSS](#vanilla--astro--plain-css).
- **Bring the variables, borrow a few utilities** — let Tailwind/shadcn own the utility layer and use Zazz only as the token source of truth plus the handful of utilities Tailwind can't replicate. This is the shadcn path. Covered in [shadcn/ui + Tailwind v4](#shadcnui--tailwind-v4).

Webflow and Figma sit further down.

---

## The shipped file structure

Everything lives under `app/zazz/styles/`. The framework is split into a layer declaration, token + reset + utility partials, and one partial per component:

```
app/zazz/styles/
├── index.css            # the ONE thing that sets cascade order:
│                        #   @layer variables, reset, components, utilities;
├── _variables.css       # all token collections + dark-mode wiring   → @layer variables
├── _reset.css           # element defaults, focus ring, native <dialog>/popover wiring → @layer reset
├── _typography.css      # text-* / .text-prose composed type styles    → @layer utilities
├── _utilities.css       # color/layout/spacing/size/etc. utilities     → @layer utilities
├── _badge.css           # .badge                                       → @layer components
├── _button.css          # .button                                      → @layer components
├── _accordion.css       # .accordion                                   → @layer components
├── _dialog.css          # .dialog                                      → @layer components
├── _dropdown.css        # .dropdown                                    → @layer components
├── _navigation-menu.css # .navigation-menu                             → @layer components
├── _fields.css          # shared --field-* tokens, .field, validation  → @layer components
├── _input.css           # .input                                       → @layer components
├── _textarea.css        # .textarea                                    → @layer components
├── _select.css          # .select (+ ::picker styling)         → @layer reset + components
├── _input-group.css     # .input-group                                 → @layer components
├── _password-group.css  # .password-group (reveal toggle)              → @layer components
├── _radio.css           # .radio / .radio-group                        → @layer components
├── _tabs.css            # .tabs (segmented control)                    → @layer components
└── load.ts              # JS/bundler entry — imports index.css then every partial
```

(Checkbox and switch have no partial of their own — they're styled directly on `input[type="checkbox"]` / `input[role="switch"]` in `_reset.css`. `_select.css` is split: the native `::picker`/`<option>` internals sit in `@layer reset`, the `.select` chrome in `@layer components`.)

Two facts drive everything below:

1. **Each partial wraps its own rules in `@layer <name> { … }`.** Cascade order is set _once_, by the `@layer` declaration in `index.css` — **not** by import order. So you can import the partials in any order as long as `index.css` is loaded first.
2. **The `components` layer is new.** It sits between `reset` and `utilities`, so utility classes (`p-md`, `text-h2`) always win over a component's baseline, and your own un-layered CSS wins over everything.

---

## Vanilla / Astro / plain CSS

The full framework. You get tokens, the reset, the example components (including the form controls), and the whole utility set — author markup with `text-*`, `p-md`, `.container`, `.button[data-variant]`, `.input`, etc.

### Entry point — pick one

**A. JS / bundler (Astro, Vite, Next, SvelteKit, …).** Import the bundler entry once, in a shared layout, and let the bundler handle the CSS:

```ts
// Astro layout frontmatter, or a root layout/_app, or main.ts
import "../zazz/styles/load.ts";
```

`load.ts` imports `index.css` first (which declares the layer order) and then every partial. One line and the whole system is wired.

**B. Plain CSS (no bundler).** Make an entry stylesheet that imports `index.css` first, then the partials. Order among the partials doesn't matter — the layers sort the cascade — but load `index.css` first so the layers exist before any rules land in them:

```css
@import "./zazz/styles/index.css"; /* declares @layer variables, reset, components, utilities */

@import "./zazz/styles/_variables.css";
@import "./zazz/styles/_reset.css";
@import "./zazz/styles/_typography.css";
@import "./zazz/styles/_utilities.css";

@import "./zazz/styles/_badge.css";
@import "./zazz/styles/_button.css";
@import "./zazz/styles/_accordion.css";
@import "./zazz/styles/_dialog.css";
@import "./zazz/styles/_dropdown.css";
@import "./zazz/styles/_navigation-menu.css";
@import "./zazz/styles/_fields.css";
@import "./zazz/styles/_input.css";
@import "./zazz/styles/_textarea.css";
@import "./zazz/styles/_select.css";
@import "./zazz/styles/_input-group.css";
@import "./zazz/styles/_password-group.css";
@import "./zazz/styles/_radio.css";
@import "./zazz/styles/_tabs.css";
```

Import only the component partials you actually use — they're independent. One caveat for the form set: `.input`, `.textarea`, `.select`, `.input-group`, and `.password-group` share the `--field-*` tokens declared in `_fields.css`, so import `_fields.css` whenever you use any of them. (Checkbox and switch ride along in `_reset.css`.)

### Where your own component CSS goes

Custom styling has two sensible homes:

- **In the `components` layer** — `@layer components { .my-widget { … } }`. It then behaves like a shipped component: utilities still override it, which is usually what you want.
- **Outside any layer** — un-layered rules beat every layered rule, so use this only when you deliberately need to win against utilities.

Either way, consume tokens (`var(--card)`, `var(--gap-md)`, `var(--radius-lg)`), never literals.

### Fonts — the one thing you must wire yourself

`--font-body`, `--font-heading`, and `--font-mono` point at `--font-geist-sans` / `--font-geist-mono`. In the demo app those come from `geist/font` (a Next.js `next/font` loader) which defines `--font-geist-sans` on `<html>`. **A vanilla or Astro project has no such loader**, so text falls back to the browser default until you supply the fonts. Two ways:

```css
/* Option 1 — point the Zazz font roles at a real stack */
:root {
  --font-body: "Inter", system-ui, sans-serif;
  --font-heading: "Inter", system-ui, sans-serif;
  --font-mono: ui-monospace, "SF Mono", monospace;
}

/* Option 2 — define the variables Zazz expects (e.g. after @font-face) */
:root {
  --font-geist-sans: "Geist", system-ui, sans-serif;
  --font-geist-mono: "Geist Mono", ui-monospace, monospace;
}
```

### Dark mode

Both triggers are wired in `_variables.css`, no config needed:

- `@media (prefers-color-scheme: dark)` — follows the OS.
- `:is(.dark, .dark *)` — force a mode by putting `.dark` on any ancestor (it also re-themes descendants).

```html
<html class="dark">
  …
</html>
```

Add more modes (high-contrast, a brand takeover) by writing a new selector that re-points the same theme roles — never by editing components.

### Astro specifics

Astro is HTML-first, which is exactly what the Zazz components are built for. The example components lean on native platform features — the Popover API, CSS anchor positioning, the Invoker Commands API, native `<dialog>`, `<details>`, the customizable `<select>`, `field-sizing`, and `:user-invalid` validation — so **the dropdown, navigation menu, dialog, accordion, and the whole form set all work with zero JavaScript** (the lone exception is a checkbox's `indeterminate` property, which has no HTML attribute and must be set in JS). Copy the markup straight out of the `.tsx` examples into `.astro` files (drop the `export function`, keep the JSX-as-HTML), changing React's `popoverTarget`/`className` back to `popovertarget`/`class`.

```astro
---
// src/layouts/Base.astro
import "../zazz/styles/load.ts";
---

<html lang="en">
  <body>
    <section class="grid py-xl">
      <div class="container flex flex-col gap-md">
        <span class="text-eyebrow">Episode 04</span>
        <h1 class="text-h1">Designed for design teams</h1>
        <p class="text-lg">Body copy that pairs with the headline above.</p>
        <button class="button" data-variant="primary">Get started</button>
      </div>
    </section>
    <slot />
  </body>
</html>
```

---

## shadcn/ui + Tailwind v4

The model here is deliberately narrow: **Zazz owns the design tokens; Tailwind and shadcn own the utility layer.** You do _not_ import the whole framework. You import the variables, bridge them into Tailwind's `@theme`, and then opt into the small set of Zazz utilities Tailwind genuinely can't reproduce.

This works because shadcn already names its theme tokens the way Zazz does — `--background`, `--foreground`, `--primary`, `--border`, `--card`, `--muted`, etc. Point those names at Zazz values and every shadcn component picks up the Zazz look with no per-component edits.

### Step 1 — import the variables (and optionally the reset)

```css
@import "tailwindcss";
@import "./zazz/styles/_variables.css"; /* Zazz tokens + light/dark wiring */
/* optional: @import "./zazz/styles/_reset.css"; for the focus ring + dialog/popover behavior */
```

Do **not** import `_utilities.css` wholesale here, and don't import the component partials — Tailwind/shadcn are providing components and utilities. You're only after the tokens.

A note on dark mode: shadcn toggles dark with a `.dark` class, and Zazz wires `.dark` too, so they agree out of the box. Zazz _also_ responds to `prefers-color-scheme`; if you want shadcn's class to be the single source of truth, that OS query is harmless but you can ignore it.

### Step 2 — bridge tokens into `@theme`

A `@theme` entry both registers a Tailwind utility _and_ makes the value available as a normal custom property. Map Zazz role tokens onto the Tailwind names shadcn consumes. This is the heart of the integration:

```css
@theme {
  /* Theme roles → Tailwind color utilities (bg-*, text-*, border-*) */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-border: var(--border);
  --color-border-foreground: var(--border-foreground); /* Zazz-specific */
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-input: var(--input);
  --color-input-foreground: var(--input-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-faded: var(--faded); /* Zazz-specific */
  --color-faded-foreground: var(--faded-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-tertiary: var(--tertiary); /* Zazz-specific */
  --color-tertiary-foreground: var(--tertiary-foreground);
  --color-info: var(--info);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);

  /* Shade / tint overlays → bg-shade-800, bg-tint-100, etc. (see "unique utilities") */
  --color-shade-50: var(--shade-50);
  --color-shade-800: var(--shade-800);
  /* …map the steps you use; the full scales are shade/tint 50–950 + none/full… */
  --color-tint-100: var(--tint-100);

  /* Semantic spacing → p-md, gap-lg, m-sm, etc. */
  --spacing-xs: var(--gap-xs);
  --spacing-sm: var(--gap-sm);
  --spacing-md: var(--gap-md);
  --spacing-lg: var(--gap-lg);
  --spacing-xl: var(--gap-xl);
}
```

After this, `bg-primary`, `text-foreground`, `border-border`, `bg-shade-800`, `p-md`, and `gap-lg` all resolve to Zazz values, and mode swaps propagate automatically because the underlying role tokens are mode-aware. Colors and spacing bridge cleanly because Zazz's names (`--primary`, `--gap-md`, `--shade-800`) don't collide with Tailwind's target namespaces (`--color-*`, `--spacing-*`).

**Shadows and radius — the two namespace collisions.** Zazz's `--shadow-*` and `--radius-*` tokens share the exact names of Tailwind's `--shadow-*` / `--radius-*` theme namespaces, so a bridge entry like `--shadow-md: var(--shadow-md)` is self-referential and won't resolve. Two clean options:

- **Use Zazz's classes directly** (the approach taken below for shadows): import the `.shadow-*` rules and use `shadow-md` etc. as Zazz utilities. Don't also declare Tailwind shadow theme, or Tailwind's higher-specificity default wins.
- **Paste the values into `@theme`** (no `var()` self-reference): copy the literal Zazz shadow stacks / radius calcs in, so Tailwind's `shadow-*` / `rounded-*` utilities emit Zazz values. Costs a little duplication.

For radius specifically, shadcn ships its own `--radius` base and derives `--radius-sm/md/lg/xl` from it — the simplest path is to set that base from a Zazz value (`--radius: var(--radius-md)` in your shadcn `:root`) and let shadcn's scale follow. Note the scales differ: Zazz `--radius-md` is ~10px, closer to Tailwind's `rounded-lg` than `rounded-md` — eyeball the mapping.

### Step 3 — opt into the four unique Zazz utilities

These are the things Tailwind/shadcn can't cleanly reproduce. Two of them you bring as Zazz _classes_ (import the partial); two you already exposed as Tailwind utilities in the `@theme` bridge above.

| Utility                                                                      | How to bring it                                                                                                                                                         | Why it beats the Tailwind equivalent                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`text-*` typography** (`text-h1`…`text-xs`, `text-eyebrow`, `.text-prose`) | `@import "./zazz/styles/_typography.css";`                                                                                                                              | One class sets family + fluid `clamp()` size + weight + leading + tracking, tuned together. `text-2xl font-semibold leading-tight tracking-tight` recreates it badly and drifts. `.text-prose` also gives automatic paragraph rhythm. |
| **`.container` / `.article`**                                                | Import the two rules (or all of `_typography.css` won't include them — they live in `_utilities.css`; copy the two blocks, or import `_utilities.css` whole — see note) | Self-padding widths via `min()` _and_ a registered container-query name. Replaces the `max-w-* mx-auto px-*` wrapper pattern with one class on the element itself.                                                                    |
| **shade / tint overlays** (`bg-shade-800`, `bg-tint-100`)                    | Bridged as colors in `@theme` (Step 2)                                                                                                                                  | Mode-correct dimming. `--muted` is `shade-50` in light but flips to `tint-50` in dark — it _lightens_ a backdrop in dark mode. Shade always dims, tint always fades, in both modes.                                                   |
| **`shadow-*` elevation**                                                     | Import the `.shadow-*` rules from `_utilities.css` (don't bridge — namespace collision, see above)                                                                      | Each level is a 5-layer `box-shadow` stack with OKLCH-alpha falloff, mode-correct on light and dark. Tailwind's single-layer defaults read flatter.                                                                                   |

Because every Zazz utility class is wrapped in `:where()` (zero specificity), importing a Zazz partial alongside Tailwind is non-invasive — any real Tailwind utility (specificity 0,1,0) wins a head-to-head conflict. So the pragmatic shortcut for `.container`/`.article` is simply:

```css
@import "./zazz/styles/_utilities.css"; /* zero-specificity; only the Zazz-unique classes matter, Tailwind owns the rest */
```

If you'd rather stay minimal, copy just the `.container` and `.article` rules from `_utilities.css` into your own CSS.

### shadcn caveats

- **Status tokens** (`--info`, `--success`, `--warning`, `--destructive`) — only `--destructive` is in stock shadcn; the others are Zazz additions, bridged above so you can use `bg-success` etc.
- **Tertiary brand** (`--tertiary`) — Zazz-specific, not in default shadcn. Bridged for your own use.
- **`--border-foreground`** — Zazz-specific (text _on_ a border: outlined buttons, ghost inputs, bordered tags). Bridged so it's available as `text-border-foreground`.
- **Typography** — prefer Zazz `text-*` over Tailwind compositions; don't put both on one element (the Tailwind one wins on specificity, so you'd silently lose the tuned style).

---

## Webflow

### Clone the kit

Open the [Zazz Webflow Kit](https://webflow.com/made-in-webflow/website/zazz-webflow-kit) on the Webflow Community and click **Clone**.

### What's pre-wired

- Every Zazz variable as Webflow Variables with light and dark modes attached to the variable.
- All `text-*` classes (`text-display`, `text-h1`–`text-h6`, `text-xl`–`text-xs`, `text-eyebrow`).
- Spacing utility classes (`p-md`, `gap-lg`, `mx-auto`, the full set).
- `container` and `article` wrapper classes.
- Starter components (button, badge, accordion, dialog, dropdown, navigation menu, and the form controls — input, textarea, select, input-group, checkbox, switch, radio).

### How to work in it

**Utility classes go in the class list. The component's block class goes in the style box; variants are data attributes.**

A button built in Webflow looks like:

- Class list: `button`
- Custom attribute: `data-variant="primary"` (and `data-size="icon"` for icon-only)
- Style box: `.button` holds the component's own rules; you rarely touch it because the kit ships it.

For your own components, use the block class in the style box and utilities in the class list — see the BEM-plus-utilities pattern in the main SKILL.

### Rebranding

Update variables at the project level — Webflow's Variables panel resolves through every class instantly. Change `--primary` and every button, badge, accent surface, and focus ring follows. For per-section overrides, scope the variable change to a parent element; it cascades to descendants like CSS.

### Native form controls

The form controls style native HTML elements directly — there's no React wrapper, just the Zazz class on Webflow's built-in form element. Text inputs take `.input`; the message box `.textarea` (auto-sizing via `field-sizing`); the dropdown `.select` (a customizable `<select>` with a `<button><selectedcontent></selectedcontent></button>` child); a fused control+addon group `.input-group` (with `data-align` addons); radios `.radio` (grouped in a `.radio-group`). Checkbox and switch need no class — they're styled from `input[type="checkbox"]` / `input[role="switch"]` in the reset. Wrap any control in a `.field` (with a `.field__label`, `.field__hint`, and `.field__error`) to get the label/validation layout; errors surface on `:user-invalid`, after the field is committed.

---

## Figma

### Open the kit

[Zazz Figma Kit](https://www.figma.com/community/file/1468718708506413296) on the Figma Community. Use **Open in Figma** and duplicate to your team.

### What's included

- **Variables** for theme, corporate, grayscale, typography, spacing, radius, and layout — organized by collection with light and dark modes attached at the variable level.
- **Text styles** for display, h1–h6, body xl–xs, and eyebrow — each pairs the variable-driven family, size, weight, tracking, and paragraph spacing.
- **Components** for the shipped set.

### Use as a shared library

1. Open the Zazz file → Libraries panel → publish as a library.
2. In any other file → Libraries → enable the Zazz library.
3. Variables, text styles, and components are now in the inserts panel.

### Customizing

Override variables at the file level to rebrand. The library file is the structural source of truth; project files re-target variable values for their brand without disturbing other projects.

### Caveat: line-height

Figma Variables don't support `line-height` yet, so the kit carries leading as a paragraph property on each text style rather than a shared variable. (In code, `--leading-*` variables exist now and the `text-*` classes use them.)

---

## Updating palettes with Tints.dev

The default Zazz palettes are generated with [Tints.dev](https://www.tints.dev) by Simeon Griggs.

### Per-scale flow

1. Visit `https://www.tints.dev`.
2. Paste the brand hex; tweak the lightness curve / hue rotation if needed.
3. Switch output to OKLCH.
4. Copy the 11 `--name-50` through `--name-950` lines into `_variables.css`.
5. Verify the Theme bindings still feel right (defaults are `600` light / `500` dark for primary and secondary, `500` / `400` for tertiary).

### All four defaults at once

The Zazz docs site has a pre-loaded multi-palette editor for primary, secondary, tertiary, and neutral. Open it, edit hexes, copy the OKLCH back.

### Doing it programmatically

The Tints.dev algorithm is open source. There's no public API endpoint, but the npm package runs client-side or in a Node script. The Zazz docs theme page (`app/theme/_lib/`) has a reference implementation that uses the same algorithm.

---

## Updating type scales with Utopia

Fluid clamps use a Utopia-style algorithm — same approach as [utopia.fyi](https://utopia.fyi). The Zazz docs site exposes a typography panel under `/theme`.

### Inputs

| Input                             | Meaning                                                        |
| --------------------------------- | -------------------------------------------------------------- |
| `minWidth` / `maxWidth`           | Viewport range to interpolate between (mobile → desktop)       |
| `minFontSize` / `maxFontSize`     | Body size at each end (equal → only headings scale)            |
| `minTypeScale` / `maxTypeScale`   | Scale ratio at each end (Minor Third 1.2, Major Third 1.25, …) |
| `positiveSteps` / `negativeSteps` | How many sizes above and below body                            |

### Output

A set of `--font-size-{name}: clamp(min, calc(… + N·vi), max)` declarations. Paste under the Typography section of `_variables.css`; the `text-*` classes pick them up automatically.

### Don't hand-author clamps

Unless you have a deliberate off-system one-off, generate them. Hand-tuned values drift and lose the rhythm across steps.

---

## A note on tool overrides

Zazz is opinionated. When the surrounding system (Tailwind defaults, shadcn defaults, Client-First, Webflow's built-in library) collides with Zazz, **default to Zazz**. The framework is the source of truth; the other systems are delivery mechanisms or competing conventions. If you're fighting Zazz to do something "the Tailwind way," step back — it's faster to do it the Zazz way and document a deliberate departure when one is genuinely needed.
