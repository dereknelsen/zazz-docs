---
name: zazz-development
description: Build UI using the Zazz design framework's eight foundations (Theme, Corporate, Grayscale, Typography, Spacing, Radius, Layout, Effects). Use this skill whenever you're styling components, writing CSS, picking colors or spacing, building components, or working in a project that imports the Zazz styles (`app/zazz/styles/index.css` / `load.ts`) or uses Zazz tokens and classes like `--background`, `--gap-md`, `--primary-600`, `--shade-800`, `--ring`, `text-h2`, `rounded-lg`, `.container`/`.article`, `.button`/`.badge` with `data-variant`, or the form controls (`.input`, `.textarea`, `.select`, `.input-group`, `.field`, `.radio`). Use it for vanilla HTML/CSS and Astro, Tailwind v4 + shadcn projects, Webflow sites built from the Zazz kit, and any framework where Zazz variables and utility classes are available. The Zazz way is opinionated — assume it overrules whatever the surrounding system (Tailwind defaults, shadcn defaults, Client-First, etc.) would do.
---

# Zazz Development

Zazz is a token-driven design framework that ships the same names to Figma, Webflow, Tailwind, and plain CSS. Components consume tokens; tokens carry the design decisions. **A rebrand is a token edit, not a component sweep.**

Eight foundation collections. Three of them are color (**Theme**, **Corporate**, **Grayscale**); five are structural (**Typography**, **Spacing**, **Radius**, **Layout**, **Effects**). Theme is the surface you should reach for first — it composes Corporate and Grayscale into role-based variables (`--background`, `--primary`, `--muted`) that automatically swap between light and dark modes. The other collections feed those roles.

This skill teaches you the right token for the job. The choices look small in isolation but compound — a few `--shade-800`s used in the right places make a backdrop feel intentional; the same overlay built from `--muted` looks broken in one of the two modes.

## Cardinal rules

These are the things that make Zazz Zazz. Hold them firmly even when the surrounding system pushes back.

1. **Use tokens. Never literal values.** No `gap: 13px`, no `#4f46e5`, no `font-size: 1.5rem`. If a token doesn't exist for what you need, you almost always want to add one rather than hardcode.
2. **Reach for Theme first.** `--background`, `--foreground`, `--primary`, `--muted`, `--card`, `--border`. These are mode-aware. Drop down to Corporate (`--primary-600`) or Grayscale (`--neutral-200`, `--shade-800`) only when you have a specific reason — see [Color decision tree](#color-decision-tree).
3. **Prefer Zazz `text-*` classes over assembled type styling.** A single `text-h2` carries family + fluid size + weight + leading + tracking, tuned together. Composing those from individual Tailwind utilities or custom CSS recreates the work and drifts from the system. In Tailwind/shadcn, Zazz `text-*` should win — see [Typography](#typography).
4. **Reach for `--gap-*` for spacing. `--step-*` is an escape hatch.** Gaps are the semantic, responsive layer. Steps are static and exist for the cases gaps don't fit.
5. **Use `container`/`article` for layout widths, not a max-width + padding wrapper.** Zazz widths self-pad via `min()`. No extra wrapper div needed.
6. **Utility classes + BEM together.** Utilities for the common stuff, BEM (`.card`, `.card__title`, `.card--featured`) for the custom styling that doesn't fit a utility. This works equally in React, vanilla, and Webflow (where utilities go in the class list and the BEM name goes in the style box).

If you find yourself fighting one of these rules, that's a signal to step back and ask whether the surrounding system is leaking. Default to the Zazz way; document a deliberate departure if you must depart.

## The eight foundations at a glance

| Collection     | What it is                                                           | Most-used tokens                                                                                            |
| -------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Theme**      | Mode-aware role tokens. The surface 90% of styling consumes.         | `--background`, `--foreground`, `--card`, `--border`, `--primary`, `--muted`, `--faded`, `--destructive`    |
| **Corporate**  | Raw brand color scales (50–950). What Theme brand tokens point into. | `--primary-{50..950}`, `--secondary-{50..950}`, `--tertiary-{50..950}`                                      |
| **Grayscale**  | Raw neutrals, plus shade (dim) and tint (fade) overlays.             | `--neutral-{50..950}`, `--white`, `--black`, `--shade-{50..950}`, `--tint-{50..950}`                        |
| **Typography** | Composed type styles via `text-*` classes.                           | `text-display`, `text-h1`–`text-h6`, `text-xl`–`text-xs`, `text-eyebrow`                                    |
| **Spacing**    | Semantic gaps (xs–xl) and a numeric step scale.                      | `--gap-xs`, `--gap-sm`, `--gap-md`, `--gap-lg`, `--gap-xl`; `--step-px`, `--step-1` … `--step-96`           |
| **Radius**     | Semantic scale; components alias it via a local prop.                | `--radius-xs`–`--radius-xl`, `--radius-none`, `--radius-full`, `--radius-multiplier`; utilities `rounded-*` |
| **Layout**     | Self-padding container widths + breakpoint constants.                | `--container`, `--article`, `--screen-xs`–`--screen-xl`, classes `.container`, `.article`                   |
| **Effects**    | Shadows for elevation, an outline focus ring for accessibility.      | `--shadow-xs`–`--shadow-xl`, `none`, `--ring`, `--ring-size`, `--ring-style`, `--ring-offset`      |

Alongside the eight, a small **Animations/motion** group ships too — `--spring-easing`, `--spring-duration`, and the `--default-transition` bundle that components use for hover/open transitions. And the cascade is organized into four layers, declared once in `index.css`: `@layer variables, reset, components, utilities` (the `components` layer is where the shipped component styles live, between reset and utilities).

Detailed reference for every token and every utility class lives in [references/tokens.md](references/tokens.md). Read it when you need an exhaustive list; the SKILL body has what you need for day-to-day work.

---

## Color: Theme, Corporate, Grayscale

These three collections form a layered system. Always reach as high up the layer as the situation allows. Going lower is fine when you have a specific reason; doing it by default leaks abstraction and breaks dark mode.

### The layering

```
Theme           ← role tokens, mode-aware (use these by default)
  ↓ references
Corporate       ← raw brand scales (primary, secondary, tertiary, 50–950)
Grayscale       ← raw neutrals + shade/tint overlays
```

Theme is _built from_ Corporate and Grayscale. For example, in light mode:

```css
--background: var(--neutral-50); /* Grayscale */
--foreground: var(--neutral-900); /* Grayscale */
--primary: var(--primary-600); /* Corporate */
--muted: var(--shade-50); /* Grayscale (shade) */
--faded: var(--tint-100); /* Grayscale (tint) */
```

In dark mode the same Theme variables re-bind:

```css
--background: var(--neutral-950); /* Grayscale */
--foreground: var(--white); /* Grayscale */
--primary: var(--primary-500); /* Corporate — steps lighter in dark */
--muted: var(--tint-50); /* Grayscale — flips from shade to tint */
--faded: var(--shade-100); /* Grayscale — flips from tint to shade */
```

Two notable behaviors:

- **Brand steps lighter in dark mode** (`600 → 500`, `500 → 400`) so it stays readable on a dark background.
- **Status steps darker in dark mode**, opposite of brand. Errors and warnings should not be the loudest thing on a dark surface that's already busy.
- **Muted and faded swap underlying primitives by mode** — `--muted` uses `shade-*` in light and `tint-*` in dark; `--faded` does the opposite. The _semantic_ stays constant: muted is always darker than its surface, faded is always lighter.

### Color decision tree

The order in which to consider tokens:

1. **A theme role exists for this** → use the **Theme** token (`--background`, `--card`, `--border`, `--muted`, `--primary`, `--destructive`, etc.). This is the right answer the overwhelming majority of the time. The mode swap, the rebrand path, and the foreground-pair are all handled for you.
2. **You need a specific brand step that doesn't have a theme role** → use a **Corporate** scale step (`--primary-100` as a subtle background tint, `--secondary-900` for a deep accent panel). Still mode-aware in the sense that you're choosing the same step in both modes — verify it reads well in both.
3. **You need an exact, opaque gray** → use a **Neutral** step (`--neutral-200` for a static divider, `--neutral-700` for low-emphasis text on a known background).
4. **You need transparency over whatever sits below** → use **Shade** (dims, use over light or imagery) or **Tint** (fades, use over dark). Examples:
   - Modal backdrop that dims content underneath, in both light and dark modes → `--shade-800`. Using `--muted` here would be wrong: in light mode `--muted` is `--shade-50` (way too subtle for a backdrop); in dark mode it flips to `--tint-50` and _lightens_ the page instead of dimming.
   - Frosted-glass overlay over a dark hero image → `--tint-200`.
   - Hover state on a card that needs to read as "slightly darker, regardless of card color" → `--shade-50`.

The mental model: **shade dims, tint fades, theme adapts, corporate identifies, neutral specifies**. If you find yourself reaching for a Grayscale or Corporate token when a Theme token would have worked, ask what concrete reason justifies skipping the abstraction.

### Common Theme tokens worth memorizing

| Token                                                  | When to use                                                                                                 | Pair with                                                                     |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `--background` / `--foreground`                        | The page surface and default text on it.                                                                    | each other                                                                    |
| `--card` / `--card-foreground`                         | Cards, panels, anything one step elevated from the background.                                              | `--border`                                                                    |
| `--input` / `--input-foreground`                       | Form fields.                                                                                                | `--border`                                                                    |
| `--border`                                             | Default 1px lines and dividers.                                                                             | `--border-foreground` for text _on_ a border (outlined buttons, ghost inputs) |
| `--muted` / `--muted-foreground`                       | A subtle dim. Section dividers, secondary surfaces, helper-copy backgrounds, de-emphasized labels.          | each other                                                                    |
| `--faded` / `--faded-foreground`                       | A subtle fade. Less common than muted; reach for it when stacking on dark surfaces or for soft hover lifts. | each other                                                                    |
| `--primary` / `--secondary` / `--tertiary`             | Brand surfaces. Buttons, badges, accent fills. Each has a `*-foreground`.                                   | their foreground                                                              |
| `--info` / `--success` / `--warning` / `--destructive` | Status. Use the role, not the color.                                                                        | their foreground                                                              |

### Common Grayscale tokens worth memorizing

The shade and tint scales are the ones that throw people off. A quick reference of when each is right:

| Need                                     | Token                                                                 | Why                                                                      |
| ---------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Dim a modal backdrop in both modes       | `--shade-800` (or `--shade-700`)                                      | Shade dims regardless of mode; the overlay always darkens what's behind. |
| Soft hover on a light card               | `--shade-50` or `--shade-100`                                         | Subtle, mode-agnostic darken.                                            |
| Frosted highlight band on a dark hero    | `--tint-100`                                                          | Fades the surface lighter without committing to a specific gray.         |
| Text on a border (outlined ghost button) | `--border-foreground` (theme)                                         | Theme handles this directly — don't reach for `--tint-950` yourself.     |
| Static 1px hairline divider              | `--neutral-200` (light) / `--neutral-800` (dark) — or just `--border` | Opaque, deliberate gray. `--border` already encodes this swap.           |

If you catch yourself writing `oklch(0 0 0 / 0.6)` or `rgba(0,0,0,0.5)` for an overlay, use `--shade-500` or `--shade-600` instead. Same intent, swappable, mode-aware, matches the rest of the system.

### Foreground pairs

Every background-style token has a paired `*-foreground` for text _on_ that background. Always reach for the pair together:

```css
.primary-button {
  background: var(--primary);
  color: var(--primary-foreground);
}

.card {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
}
```

If you set the background but not the foreground, text inherits from the parent and breaks in one of the modes. Always set both.

### Adding a new corporate scale (e.g. quaternary)

Two steps: declare the eleven steps, then bind theme tokens to them.

```css
:root {
  --quaternary-50: oklch(0.985 0.02 85);
  /* ... through 950 */
  --quaternary-950: oklch(0.18 0.06 48);

  --quaternary: var(--quaternary-600);
  --quaternary-foreground: var(--white);
}

:is(.dark, .dark *) {
  --quaternary: var(--quaternary-500);
  --quaternary-foreground: var(--white);
}
```

Generate scales with **Tints.dev** (it outputs OKLCH directly) and paste them in. See [Updating palettes with Tints.dev](#updating-palettes-with-tintsdev) below.

---

## Typography

**Use `text-*` classes. Always.** They are the API. Composing the underlying tokens by hand recreates work and drifts the system.

### The composed styles

| Class                 | Use for                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------- |
| `text-display`        | Hero supersize headlines. One per page, usually.                                             |
| `text-h1`             | The page's primary headline.                                                                 |
| `text-h2` – `text-h6` | Section, sub-section, and component-title hierarchy.                                         |
| `text-xl`             | Lead paragraphs, emphasized body. Same size as `text-h6` but body weight and looser leading. |
| `text-lg`             | Larger body.                                                                                 |
| `text-md`             | Default body.                                                                                |
| `text-sm`             | Small body, metadata, captions.                                                              |
| `text-xs`             | Micro labels, fine print.                                                                    |
| `text-eyebrow`        | Small uppercase labels above a headline ("INTRODUCING").                                     |

Each class sets `font-family`, `font-size` (fluid `clamp()`), `font-weight`, `line-height`, and `letter-spacing` — all tuned together. Headings tighten tracking; body sits at zero; eyebrow opens up.

```html
<h1 class="text-h1">Designed for design teams</h1>
<p class="text-lg">Body copy that pairs with the headline above.</p>
<span class="text-eyebrow">Episode 04</span>
```

### Fluid sizing

Sizes use `clamp(min, preferred, max)` with `vi` (viewport inline) as the interpolation unit. The values come from Figma's Desktop and Mobile size pairs — what looks right at 1440px scales fluidly down to the mobile target without media queries.

```css
--font-size-h2: clamp(2.0273rem, 1.2148rem + 3.2498vi, 3.8147rem);
```

You don't need to touch the clamp math. The `text-h2` class does it. If you need to generate new sizes, see [Updating type scales with Utopia](#updating-type-scales-with-utopia).

### Beating Tailwind's defaults

In Tailwind v4 projects, Zazz's `text-*` classes use `:where()` so they sit at **zero specificity** and conflict with Tailwind's `text-2xl`-style utilities. Two patterns to make Zazz win cleanly:

1. **Don't combine them.** If you put `text-h2` on an element, don't also put `text-2xl font-bold leading-tight tracking-tight` on it. Pick `text-h2` and stop. The whole point of the composed style is that you don't assemble those.
2. **If you must override a single layer** (e.g. switch only the weight for one instance), do it explicitly: `class="text-h2 font-normal"`. But ask first whether what you actually need is a _new_ text style added to the system rather than a one-off override.

The Zazz way is better. Resist Tailwind's pull toward composing type from atomic utilities — it works for prototypes and degrades fast across a real product.

### Component-level CSS

When writing CSS for a custom element (not a utility class), reference the same underlying tokens so the style still survives a font swap or fluid retune:

```css
.callout-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-h4);
  font-weight: var(--weight-heading);
  line-height: var(--leading-h4);
  letter-spacing: var(--tracking-h4);
}
```

### Weights are role-based

Don't write `font-weight: 700`. Write `font-weight: var(--weight-strong)`. A rebrand that swaps the typeface from 400/700 to 300/600 is then one variable change instead of a sweep.

| Token              | Default | Use for                        |
| ------------------ | ------- | ------------------------------ |
| `--weight-body`    | 400     | Body copy                      |
| `--weight-heading` | 600     | Headings                       |
| `--weight-strong`  | 500     | `<strong>` and inline emphasis |
| `--weight-mono`    | 400     | Code, monospaced labels        |
| `--weight-eyebrow` | 600     | Eyebrow labels                 |

### Paragraph rhythm — use `.prose`

For long-form copy, wrap it in `.prose` rather than hand-spacing paragraphs. It's a flex-column container (`gap: var(--gap-sm)`) that also applies a per-style top margin to every non-first child, drawn from the `--paragraph-spacing-*` tokens (`--paragraph-spacing-h2`, `--paragraph-spacing-md`, etc. — each keyed to a text style). It styles bare tags too, so you can drop raw HTML inside it:

```html
<div class="prose">
  <h2 class="text-h2">Section</h2>
  <p>First paragraph — no top margin (it's first).</p>
  <p>Second paragraph gets <code>--paragraph-spacing-md</code> above it automatically.</p>
</div>
```

The `--paragraph-spacing-*` scale is what to tune if you want tighter or looser rhythm — one edit, applied consistently across every prose block.

---

## Spacing

Three layers: a global `--spacing-interval` (a responsive `clamp()` that settles at `0.25rem` / 4px on desktop and shrinks slightly on small viewports), a numeric step scale derived from it, and five semantic gaps that map onto specific steps. Because the interval is fluid, the whole scale — steps, gaps, and the radii built on them — tracks viewport size automatically.

```
--spacing-interval (one number)
    ↓ multiplies
--step-1 … --step-96 (numeric scale, mostly static)
    ↑ aliases
--gap-xs / sm / md / lg / xl (semantic, what you reach for daily)
```

### Use `--gap-*` by default

`--gap-*` is the **semantic, responsive** layer. Despite the name, gaps are not just for `gap:` — they're the spacing abstraction for **padding, margin, gap, and any other space-between**. They're also responsive (the gaps reduce on smaller breakpoints in some configurations and are tuned to read consistently across viewport sizes).

```css
.section {
  padding-block: var(--gap-xl);
}
.card {
  padding: var(--gap-md);
  gap: var(--gap-sm);
}
.icon {
  margin-inline-end: var(--gap-xs);
}
```

The mapping (intentionally non-linear, because spacing perception is non-linear):

| Gap        | Step        | Approx default | Use for                                        |
| ---------- | ----------- | -------------- | ---------------------------------------------- |
| `--gap-xs` | `--step-2`  | 8px            | Tight rhythm between adjacent items            |
| `--gap-sm` | `--step-4`  | 16px           | Stack gaps, default item-to-item               |
| `--gap-md` | `--step-6`  | 24px           | Comfortable card padding, paragraph rhythm     |
| `--gap-lg` | `--step-11` | 44px           | Sub-section breaks, generous component padding |
| `--gap-xl` | `--step-24` | 96px           | Section breaks, hero block padding             |

Most layouts compose from `--gap-sm`, `--gap-md`, `--gap-lg` alone.

### Utility classes mirror the gaps

| Pattern                                              | Example                           |
| ---------------------------------------------------- | --------------------------------- |
| `gap-{xs..xl}`                                       | `gap-md` → `gap: var(--gap-md)`   |
| `p-{xs..xl}`                                         | `p-md` → `padding: var(--gap-md)` |
| `px-{xs..xl}` / `py-{xs..xl}`                        | inline / block padding            |
| `pt-` / `pr-` / `pb-` / `pl-`                        | per-side padding                  |
| `m-` / `mx-` / `my-` / `mt-` / `mr-` / `mb-` / `ml-` | margin equivalents                |
| `mx-auto`, `my-auto`, `mt-auto`, etc.                | auto margins                      |

### `--step-*` is an escape hatch

Reach into the step scale when the semantic gaps don't fit — typically inside components or when matching a specific Figma value that doesn't land on a gap.

- **Component internals** that need tight rhythm: `--step-2` (8px), `--step-3` (12px), `--step-4` (16px).
- **Off-grid spacing** for a single element (a button padding-inline of `--step-2_5` to land at 10px).
- **Hairlines that should NOT scale** with the interval: `--step-px` (always 1px).

Steps are **static** — they don't shift between breakpoints the way semantic gaps do. That's the trade-off. Use steps when you need a specific value to stay specific; use gaps when you want the spacing to track the rest of the system. **If you find yourself using `--step-*` more than `--gap-*` in layout-level code, you're probably over-reaching for the escape hatch.**

### Decision tree

1. Designer-named decision ("comfortable padding", "section break", "tight stack")? → `--gap-*`.
2. Specific Figma value that doesn't land on a gap, inside a component? → `--step-*`.
3. Non-scaling 1px line? → `--step-px`.
4. Tempted to write a raw `px`/`rem`? → Stop. Use a token.

---

## Radius

Two layers, plus a per-component alias pattern:

```
--radius-multiplier (one number, scales all radii)
    ↓ multiplies
--radius-xs / sm / md / lg / xl + none / full (semantic scale)
    ↑ a component aliases via its own local prop, e.g. --button-radius: var(--radius-md)
```

### There are no primitive radius tokens

Earlier versions had `--radius-button` / `--radius-card` / `--radius-input` / `--radius-badge`. **Those are gone.** A component now reaches the semantic scale through a local custom property it declares itself:

```css
:where(.button) {
  --button-radius: var(--radius-md);
  border-radius: var(--button-radius);
}
:where(.badge) {
  --badge-radius: var(--radius-sm);
  border-radius: var(--badge-radius);
}
:where(.dialog) {
  border-radius: var(--radius-lg);
} /* uses the semantic token directly */
```

This keeps the win condition the same — retune a button's corners by overriding `--button-radius`, or shift the entire system at once with `--radius-multiplier` — without a separate token layer to maintain. When you build a new component, follow the pattern: pick a semantic step, expose it as `--mycomponent-radius`, consume that.

### Use semantic radii directly for everything else

`--radius-xs` through `--radius-xl` for surfaces. `--radius-none` for explicit "no radius" (better than literal `0` — it stays a token). `--radius-full` for capsules and pills.

### Utility classes

`rounded-0`, `rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full` — note the **`rounded-*`** prefix (Tailwind-style); each sets `border-radius` to the matching token (`rounded-0` sets a literal `0`).

### Nested radius rule of thumb

When nesting, the inner radius should be roughly half the outer, and never more than two-thirds. The shipped components follow this — a `.button` (`--radius-md`, ~10px) inside a `.dialog` (`--radius-lg`, ~16px) reads correctly; inside a popover, buttons drop to `--radius-sm`. If you retune, eyeball your most common nesting and keep the inner visibly smaller than the outer.

---

## Layout

Two semantic widths, applied directly to the element. **No max-width + padding wrapper pattern.**

```css
--article: min(var(--screen-xs), 100% - var(--gap-md) * 2);
--container: min(var(--screen-lg), 100% - var(--gap-md) * 2);
```

What the `min()` is doing: on wide viewports the element caps at the screen size (640px article, 1280px container); on narrow viewports it resolves to `100% - 2 × --gap-md`, automatically baking in a 24px gutter on each side. One variable does what most frameworks need a `.container` div + `@media` rule + padding override to accomplish.

This is a meaningful departure from systems like Client-First (which uses a `padding-global` div around a `max-width` container). Don't add the wrapper. The width itself self-pads.

### The classes

The `.container` and `.article` utility classes apply the width, set `margin-inline: auto`, and register `container-name` for container queries:

```css
.container {
  inline-size: var(--container);
  margin-inline: auto;
  container: container / inline-size;
}
.article {
  inline-size: var(--article);
  margin-inline: auto;
  container: article / inline-size;
}
```

So in markup:

```html
<section>
  <div class="container">
    <h2 class="text-h2">Section title</h2>
    <!-- content -->
  </div>
</section>

<article class="article">
  <h1 class="text-h1">Article title</h1>
  <p class="text-lg">Lead paragraph.</p>
</article>
```

`--article` (640px / 40rem) is for long-form reading — 65–75 characters per line at default body size. `--container` (1280px) is for everything else.

### Adding more widths

Same `min()` pattern:

```css
:root {
  --container-narrow: min(var(--screen-md), 100% - var(--gap-md) * 2);
  --container-wide: min(var(--screen-xl), 100% - var(--gap-md) * 2);
}
```

### Breakpoints

`--screen-xs` (40rem) through `--screen-xl` (96rem) are constants for use in `calc()`. The CSS spec doesn't allow custom properties in `@media` size queries, so you'll write the raw `40rem`/`48rem` in queries themselves but use the variable everywhere else that wants the same number.

---

## Effects

Two groups: shadows for elevation, focus rings for accessibility.

### Shadows

Six levels (`none`, `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`), each a stack of multiple `box-shadow` entries with decreasing opacity and increasing offset for a natural falloff.

| Level           | Use for                                                                       |
| --------------- | ----------------------------------------------------------------------------- |
| `none` | Explicit "no shadow" for components that toggle elevation on/off              |
| `--shadow-xs`   | Borders that want a slight lift                                               |
| `--shadow-sm`   | Resting buttons, hover affordances                                            |
| `--shadow-md`   | Cards, dropdowns, popovers                                                    |
| `--shadow-lg`   | Modals, side panels                                                           |
| `--shadow-xl`   | The single most-elevated surface in a view (command palette, centered dialog) |

Utility classes mirror: `.shadow-none`, `.shadow-xs`, ..., `.shadow-xl`.

Shadows derive from `oklch(from var(--black) l c h / α)`, so the alpha varies and the shadow reads correctly on both light and dark surfaces without a separate dark-mode token.

**Spend shadows sparingly.** A page covered in shadows reads as cluttered. A page with one or two intentional elevations reads as confident.

### Focus ring

The ring is **outline-based**, built from four tokens:

```css
--ring: var(--primary); /* color */
--ring-style: solid;
--ring-size: 2px;
--ring-offset: 1px;
```

The reset applies it to every `:focus-visible` automatically:

```css
:where(:focus-visible) {
  outline: var(--ring-size) var(--ring-style) var(--ring);
  outline-offset: var(--ring-offset);
}
```

Components keep a _transparent_ outline at rest so the ring doesn't shift layout when it appears, then switch only the color on focus:

```css
:where(.button) {
  outline: var(--ring-size) var(--ring-style) oklch(from var(--ring) l c h / 0);
  outline-offset: var(--ring-offset);
}
:where(.button:focus-visible) {
  outline-color: var(--ring);
}
```

There's a `.ring` utility that does the same. **Always target `:focus-visible`, never `:focus`** — the ring should appear on keyboard navigation, not mouse clicks. (There is no `--focus-ring` box-shadow token; that's been replaced by this outline system.)

### Motion

A small motion layer ships alongside Effects. `--spring-easing` is a 27-point spring curve; `--spring-duration` is `0.333s`. The composed `--default-transition` bundles ~19 properties at that duration and easing — reach for it instead of hand-writing transitions:

```css
.thing {
  transition: var(--default-transition);
}
/* or a single property: */
.chevron {
  transition: transform var(--default-transition-duration) var(--default-transition-timing-function);
}
```

The reset already wires native `<dialog>`, `[popover]`, and `<details>` open/close to this easing via `@starting-style`, so the shipped components animate consistently without per-component motion code.

---

## Naming convention: utilities + BEM

Zazz uses utility classes and BEM together, with one twist the shipped components make explicit: **variants are data attributes, not BEM modifiers.** Utilities for common, repeatable stuff (spacing, type, radius, display); a `block` + `block__element` structure for the custom organization a component needs; `[data-variant]` / `[data-size]` (and friends) for variants. **This pattern is portable** — same shape in React, vanilla, and Webflow.

In Webflow specifically: utility classes go in the class list, the block class goes in the style box (where custom styling that has no utility lives), and variants go in as custom attributes.

```html
<!-- React/vanilla -->
<article class="card p-md rounded-lg shadow-md">
  <h3 class="card__title text-h4">Featured article</h3>
  <p class="card__excerpt text-md">…</p>
  <a class="card__cta button" data-variant="primary">Read</a>
</article>
```

Naming:

- `block` — the component root (`card`, `button`)
- `block__element` — a part of the block (`card__title`, `dialog__footer`)
- `[data-variant="…"]` / `[data-size="…"]` — variants (`data-variant="primary"`, **not** `button-primary` or `card--featured`)

**Prefer clarity over brevity. Spell names out in full; don't abbreviate.** `navigation-menu__submenu`, not `navigation-menu__sub`; `card__description`, not `card__desc`; `accordion__trigger`, not `accordion__trg`. A class name is read far more often than it's typed, and an unambiguous name that mirrors the part it styles is worth more than the handful of characters an abbreviation saves. The same goes for variant values (`data-variant="submenu"`, not `"sub"`) and local custom properties (`--navigation-menu-submenu-trigger`, not `--nav-sub-trg`). Only use an abbreviation when it's the term the domain itself uses (`nav`, `id`, `url`).

### Theme a component with local custom properties

The shipped components don't hard-code colors into their rules — they declare local `--component-*` props off theme roles, then a `[data-variant]` block re-points those locals. This is the pattern to copy: the base rule stays untouched, and a variant is just a short list of variable swaps.

```css
:where(.button) {
  --button-background: var(--background);
  --button-foreground: var(--foreground);
  --button-border: var(--border);
  background-color: var(--button-background);
  color: var(--button-foreground);
  border: 1px solid var(--button-border);
}
:where(.button[data-variant="primary"]) {
  --button-background: var(--primary);
  --button-foreground: var(--primary-foreground);
  --button-border: var(--button-background);
}
```

Keep utilities doing what utilities do well (spacing, type, radius, display) and let the block class hold the bespoke (`card__title` setting `letter-spacing`, a `--card-*` local for a brand accent). Don't reach for a custom rule where a utility would have done it cleanly.

### Variables are unprefixed and role-based

- No `--zazz-*` prefix. Variables are just `--primary`, `--gap-md`, `--radius-lg`.
- Names describe **roles**, not values: `primary` not `indigo`, `gap-md` not `medium-spacing`, `radius-lg` not `large-rounded`.
- Sizes use t-shirt scale (`xs/sm/md/lg/xl`); numeric scales use Tailwind's `50..950`.
- Utility class names mirror variables one-to-one: `gap-md` consumes `--gap-md`; `radius-lg` consumes `--radius-lg`.

---

## Primitives

Zazz ships **eleven example components** under `app/zazz/components/`, each paired with a stylesheet in `app/zazz/styles/`: **Accordion, Badge, Button, Dialog, Dropdown, Lightbox, Mobile Menu, Navigation menu, Section, Tabs, and the Form family** (`.input`, `.textarea`, `.select`, `.input-group`, `.password-group`, `.field`, checkbox, switch, `.radio`). They are **suggestions for how to build common components on Zazz tokens** — not a packaged library you must adopt wholesale. Notably, they're dependency-free: native HTML and modern platform APIs (Popover API, CSS anchor positioning, Invoker Commands, native `<dialog>`/`<details>`, the customizable `<select>` (`appearance: base-select`), `field-sizing: content`, grouped radios + CSS `order` for tabs, `:has()`, `:user-invalid`) carry all behavior, so most work with **zero JavaScript**.

They share one pattern — block class + `:where()` zero specificity + local `--component-*` props defaulting to theme tokens + `[data-variant]`/`[data-size]` variants + the `--ring*` focus outline. The form controls add a shared `--field-*` token set (in `_fields.css`) so `.input`, `.textarea`, `.select`, `.input-group`, and `.password-group` read as one family, a `.field` wrapper for label/control/hint/error layout, and validation that surfaces only on `:user-invalid` (after blur/submit, never while typing).

When asked to build a component:

- **In an existing component system** (shadcn/ui, Radix, Headless UI, a Webflow component, your own framework), follow that system's architecture and adapt it to use Zazz tokens for color, type, spacing, radius, and effects. Don't fight it; reskin it through Zazz.
- **In a fresh project**, mirror the shipped examples for consistency — copy the markup and the local-prop pattern.
- **Always** consume theme tokens. A button's background should be `--primary`, not `--primary-600` directly. Its radius comes from a local `--button-radius: var(--radius-md)`, not a hard-coded value.

See [references/primitives.md](references/primitives.md) for the per-component reference (anatomy, variants, the platform feature each uses, and how to build one Zazz doesn't ship).

---

## Updating palettes with Tints.dev

Zazz uses **Tints.dev** (by Simeon Griggs) for generating 11-step OKLCH color scales from a single brand hex. The default palettes ship from there.

- **Per-scale**: visit `https://www.tints.dev`, paste the hex for a single brand color, generate. Output is OKLCH; paste the 11 lines into `_variables.css` under `--{name}-50` through `--{name}-950`.
- **All four defaults at once** (primary, secondary, tertiary, neutral): there's a pre-loaded editor link in [Zazz reference / colors](https://zazz.example/docs/reference/colors) — adjust hexes, copy the OKLCH output back to the project.

If the user asks for help updating palettes, the workflow is:

1. Get the brand hex(es) from the user.
2. Generate the 11-step OKLCH scale (either by sending them to Tints.dev with the hex prefilled, or generating it inline — the Zazz docs site has a built-in theme builder that uses the same algorithm).
3. Replace the `--{name}-{step}` block in `_variables.css`.
4. Re-check `--{name}` Theme bindings — defaults are `600` in light and `500` in dark for primary/secondary, `500`/`400` for tertiary. If the hue's lightness curve is unusual you may need to adjust.

## Updating type scales with Utopia

Fluid type sizes (`clamp(min, preferred, max)`) are generated using a **Utopia**-style algorithm (the same approach as utopia.fyi). The Zazz docs site exposes a typography panel for it under `/theme`.

Inputs are:

- `minWidth` / `maxWidth`: viewport range to interpolate between (defaults to mobile and desktop).
- `minFontSize` / `maxFontSize`: body size at min and max viewport.
- `minTypeScale` / `maxTypeScale`: scale ratio at each end (Minor Third 1.2, Perfect Fourth 1.333, etc.).
- `positiveSteps` / `negativeSteps`: how many steps above and below body.

The output is a set of `--font-size-{name}: clamp(...)` declarations. Paste into `_variables.css` under the Typography section. The `text-*` classes will pick them up automatically.

If the user wants to retune type scales, walk them through the inputs and regenerate; don't hand-author clamps unless they need an off-system one-off.

---

## Working in different stacks

The same names exist in every environment. The first decision is which of two integration _models_ you're in. See [references/integrations.md](references/integrations.md) for full setup. Quick orientations:

- **Vanilla — bring the whole framework** (plain HTML/CSS, Astro): import everything. With a bundler, `import "./zazz/styles/load.ts"` (it pulls `index.css` then every partial). Without one, `@import "./zazz/styles/index.css"` first (it declares the `@layer` order), then the `_*.css` partials. Then use `text-*`, `p-md`, `rounded-lg`, `.container`, `.button[data-variant]` directly. There is no `main.css`. One gotcha: the font roles point at `--font-geist-*` (a Next.js loader), so a vanilla/Astro project must define those or override `--font-body`/`--font-heading`/`--font-mono`.
- **shadcn/ui + Tailwind v4 — bring the variables, borrow a few utilities**: import only `_variables.css`, bridge tokens into a `@theme` block (`--color-primary: var(--primary)`, `--spacing-md: var(--gap-md)`, plus shade/tint as `--color-shade-*`), and let Tailwind/shadcn own the utility layer. Then opt into the four Zazz utilities Tailwind can't reproduce: the composed `text-*` typography, `.container`/`.article`, the shade/tint overlay colors, and the tuned `shadow-*` scale. (Shadows and radius share Tailwind's namespace — don't self-reference them in `@theme`; see [references/integrations.md](references/integrations.md).)
- **Webflow**: clone the Zazz Webflow Kit. Variables, classes, and starter components arrive pre-wired. Utility classes in the class list, block class in the style box, variants as custom attributes (`data-variant`).
- **Figma**: open the Zazz Figma Kit. Variables, text styles, and components live there. Connect as a library to share across files.

---

## A few worked examples

**A card with a primary CTA:**

```html
<article class="card p-md rounded-lg shadow-md">
  <h3 class="card__title text-h4">Title</h3>
  <p class="card__excerpt text-md">…</p>
  <a class="button card__cta" data-variant="primary">Read more</a>
</article>
```

```css
.card {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
}
.card__title {
  margin-block-end: var(--gap-xs);
}
.card__excerpt {
  margin-block-end: var(--gap-md);
  color: var(--muted-foreground);
}
```

**A modal with a dimmed backdrop in light and dark:**

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: var(--shade-800); /* NOT --muted — shade dims in both modes */
  z-index: 40;
}

.modal {
  background: var(--card);
  color: var(--card-foreground);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: var(--gap-lg);
}
```

**A hero section with self-padding container width:**

```html
<section>
  <div class="container py-xl">
    <span class="text-eyebrow">Episode 04</span>
    <h1 class="text-display">Designed for design teams</h1>
    <p class="text-xl">Body copy that pairs with the headline above.</p>
  </div>
</section>
```

No `padding-global` wrapper. The `.container` self-pads via `min()`.

**A reading article width:**

```html
<article class="article py-lg">
  <h1 class="text-h1">Article title</h1>
  <p class="text-lg">…</p>
</article>
```

---

## Common mistakes to avoid

| Mistake                                                                 | Why it's wrong                                                                          | Do instead                                              |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `background: var(--muted)` for a modal backdrop                         | `--muted` is `--shade-50` in light but `--tint-50` in dark — it _lightens_ in dark mode | `background: var(--shade-800)`                          |
| `class="text-2xl font-bold leading-tight tracking-tight"` for a heading | Recreates `text-h2` poorly and drifts the system                                        | `class="text-h2"`                                       |
| Wrapping `.container` in a padding div                                  | Doubles up; container already self-pads                                                 | Apply `.container` directly to your inner element       |
| `gap: 12px`                                                             | Hardcodes a value that should track the spacing system                                  | `gap: var(--step-3)` (escape hatch) or pick a `--gap-*` |
| `font-weight: 700`                                                      | Locks the weight to a specific number; breaks if the typeface swaps                     | `font-weight: var(--weight-strong)`                     |
| `border-radius: 4px` on a card                                          | Doesn't compose with the radius multiplier                                              | `border-radius: var(--radius-lg)` (or a local prop)     |
| `class="button button-primary"` for a variant                           | BEM-modifier variants were removed; that class does nothing                             | `class="button" data-variant="primary"`                 |
| `box-shadow: var(--focus-ring)` on focus                                | `--focus-ring` no longer exists; focus is an outline now                                | `outline-color: var(--ring)` on `:focus-visible`        |
| Reaching for `--primary-600` in component CSS                           | Skips Theme; breaks dark-mode lightening (600→500)                                      | `background: var(--primary)`                            |
| Hardcoding `#000` shadows                                               | Won't adapt; isn't part of the shadow scale                                             | Use `--shadow-md` (or another scale step)               |

---

## Where to dig deeper

- [references/tokens.md](references/tokens.md) — every variable name, default value, and what it's for.
- [references/integrations.md](references/integrations.md) — full Tailwind v4 `@theme` bridge, Webflow kit details, Figma kit pointers, dark-mode wiring.
- [references/primitives.md](references/primitives.md) — recipes and class names for each shipped primitive when you're building from scratch.

When in doubt, the priority order is: **Theme → Corporate → Grayscale**, **`--gap-*` → `--step-*`**, **`text-*` classes → composed tokens → raw values**. If you find yourself two layers below where you started, ask whether the higher layer would have worked.
