# Zazz Tokens — Full Reference

Every variable shipped with Zazz, organized by collection. Defaults shown; values can be overridden in any project. All colors are OKLCH.

Tokens live in `app/zazz/styles/_variables.css` inside `@layer variables` (and a dark-mode block). The cascade order — `@layer variables, reset, components, utilities` — is declared once in `index.css`. Nine collections ship: the eight foundations plus an Animations group.

---

## 1. Theme

Mode-aware role tokens. The surface most styling consumes.

### Base

| Token                 | Light           | Dark            | Role                                                             |
| --------------------- | --------------- | --------------- | ---------------------------------------------------------------- |
| `--background`        | `--neutral-50`  | `--neutral-950` | Page surface everything sits on                                  |
| `--foreground`        | `--neutral-900` | `--white`       | Default text                                                     |
| `--border`            | `--neutral-200` | `--neutral-800` | Default 1px lines and dividers                                   |
| `--border-foreground` | `--tint-950`    | `--tint-100`    | Text on a border (outlined buttons, ghost inputs, bordered tags) |
| `--card`              | `--white`       | `--neutral-900` | Card surface, one step elevated from background                  |
| `--card-foreground`   | `--neutral-900` | `--white`       | Text on cards                                                    |
| `--input`             | `--neutral-50`  | `--tint-50`     | Input field background                                           |
| `--input-foreground`  | `--neutral-900` | `--white`       | Input text                                                       |

### Overlay

| Token                | Light         | Dark          | Role                                             |
| -------------------- | ------------- | ------------- | ------------------------------------------------ |
| `--muted`            | `--shade-50`  | `--tint-50`   | Subtle dim over what sits below                  |
| `--muted-foreground` | `--shade-600` | `--tint-600`  | Text on muted; helper copy, de-emphasized labels |
| `--faded`            | `--tint-100`  | `--shade-100` | Subtle fade over what sits below                 |
| `--faded-foreground` | `--tint-600`  | `--shade-600` | Text on faded                                    |

**Key behavior:** `--muted` is always darker than the surface, `--faded` always lighter — even though the underlying primitive flips between modes.

### Brand

| Token                    | Light             | Dark              | Role                                           |
| ------------------------ | ----------------- | ----------------- | ---------------------------------------------- |
| `--primary`              | `--primary-600`   | `--primary-500`   | Primary brand                                  |
| `--primary-foreground`   | `--white`         | `--white`         | Text on primary                                |
| `--secondary`            | `--secondary-600` | `--secondary-500` | Secondary brand                                |
| `--secondary-foreground` | `--white`         | `--white`         | Text on secondary                              |
| `--tertiary`             | `--tertiary-500`  | `--tertiary-400`  | Tertiary brand (callouts, sale tags, seasonal) |
| `--tertiary-foreground`  | `--white`         | `--white`         | Text on tertiary                               |

Brand steps **lighter** in dark mode (so it stays readable on dark backgrounds).

### Status

| Token                      | Light (OKLCH)          | Dark (OKLCH)           | Role                         |
| -------------------------- | ---------------------- | ---------------------- | ---------------------------- |
| `--info`                   | `0.5876 0.1389 241.97` | `0.5 0.1193 242.75`    | Informational notices        |
| `--info-foreground`        | `--white`              | `--white`              |                              |
| `--success`                | `0.596 0.1274 163.23`  | `0.5081 0.1049 165.61` | Positive confirmations       |
| `--success-foreground`     | `--white`              | `--white`              |                              |
| `--warning`                | `0.6658 0.1574 58.32`  | `0.5553 0.1455 49`     | Cautionary alerts            |
| `--warning-foreground`     | `--white`              | `--white`              |                              |
| `--destructive`            | `0.5771 0.2152 27.33`  | `0.5054 0.1905 27.52`  | Errors, irreversible actions |
| `--destructive-foreground` | `--white`              | `--white`              |                              |

Status steps **darker** in dark mode (opposite of brand) so alerts don't dominate a dark surface.

---

## 2. Corporate

Eleven-step brand scales. Theme brand tokens point into these.

Each scale has steps `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`. Default values:

### Primary (blue-violet, ~280° hue)

```css
--primary-50: oklch(0.984 0.007 286.46);
--primary-100: oklch(0.94 0.025 288.37);
--primary-200: oklch(0.85 0.068 285.81);
--primary-300: oklch(0.765 0.108 284.76);
--primary-400: oklch(0.674 0.154 283.18);
--primary-500: oklch(0.593 0.193 280.79);
--primary-600: oklch(0.511 0.23 276.97);
--primary-700: oklch(0.421 0.234 273.27);
--primary-800: oklch(0.32 0.179 273.06);
--primary-900: oklch(0.229 0.127 273.39);
--primary-950: oklch(0.158 0.088 274.05);
```

### Secondary (warm orange, ~30° hue)

```css
--secondary-50: oklch(0.984 0.008 27.43);
--secondary-100: oklch(0.95 0.023 24.19);
--secondary-200: oklch(0.878 0.061 25.87);
--secondary-300: oklch(0.814 0.101 27.69);
--secondary-400: oklch(0.749 0.146 30.02);
--secondary-500: oklch(0.687 0.198 34.85);
--secondary-600: oklch(0.61 0.194 36.8);
--secondary-700: oklch(0.5 0.159 36.84);
--secondary-800: oklch(0.383 0.121 36.98);
--secondary-900: oklch(0.276 0.088 36.22);
--secondary-950: oklch(0.215 0.068 37.62);
```

### Tertiary (pink-rose, ~15° hue)

```css
--tertiary-50: oklch(0.984 0.006 17.54);
--tertiary-100: oklch(0.942 0.023 11.04);
--tertiary-200: oklch(0.861 0.062 11.02);
--tertiary-300: oklch(0.772 0.11 12.13);
--tertiary-400: oklch(0.693 0.163 13.04);
--tertiary-500: oklch(0.613 0.208 14.68);
--tertiary-600: oklch(0.523 0.177 14.77);
--tertiary-700: oklch(0.432 0.147 14.69);
--tertiary-800: oklch(0.334 0.114 14.76);
--tertiary-900: oklch(0.244 0.083 14.99);
--tertiary-950: oklch(0.197 0.068 15.17);
```

### Adding a new scale

Add the 11 steps, then bind a theme token to the right step in each mode. See main SKILL.md → "Adding a new corporate scale" for the full pattern.

---

## 3. Grayscale

### Neutral

```css
--white: white;
--neutral-50: oklch(0.9911 0 0);
--neutral-100: oklch(0.9581 0 0);
--neutral-200: oklch(0.871 0.004 286.58);
--neutral-300: oklch(0.794 0.007 286.38);
--neutral-400: oklch(0.708 0.009 286.28);
--neutral-500: oklch(0.629 0.012 286.12);
--neutral-600: oklch(0.535 0.015 285.91);
--neutral-700: oklch(0.442 0.015 285.82);
--neutral-800: oklch(0.336 0.014 285.66);
--neutral-900: oklch(0.241 0.009 285.7);
--neutral-950: oklch(0.198 0.008 285.68);
--black: black;
```

A subtle blue-violet cast (~286° hue, low chroma) gives the mid-range warmth without color-casting. `--white` and `--black` stay as keywords (they're the anchors shade and tint derive from).

### Shade — darkened overlays (derived from `--neutral-950`)

```css
--shade-none: oklch(from var(--neutral-950) l c h / 0);
--shade-50: oklch(from var(--neutral-950) l c h / 0.05);
--shade-100: oklch(from var(--neutral-950) l c h / 0.1);
--shade-200: oklch(from var(--neutral-950) l c h / 0.2);
--shade-300: oklch(from var(--neutral-950) l c h / 0.3);
--shade-400: oklch(from var(--neutral-950) l c h / 0.4);
--shade-500: oklch(from var(--neutral-950) l c h / 0.5);
--shade-600: oklch(from var(--neutral-950) l c h / 0.6);
--shade-700: oklch(from var(--neutral-950) l c h / 0.7);
--shade-800: oklch(from var(--neutral-950) l c h / 0.8);
--shade-900: oklch(from var(--neutral-950) l c h / 0.9);
--shade-950: oklch(from var(--neutral-950) l c h / 0.95);
--shade-full: oklch(from var(--neutral-950) l c h / 1);
```

Use to **dim** whatever sits below. Modal backdrops, hover-darkens on light surfaces, scrims over imagery.

### Tint — faded overlays (derived from `--white`)

```css
--tint-none: oklch(from var(--white) l c h / 0);
--tint-50: oklch(from var(--white) l c h / 0.05);
--tint-100: oklch(from var(--white) l c h / 0.1);
--tint-200: oklch(from var(--white) l c h / 0.2);
--tint-300: oklch(from var(--white) l c h / 0.3);
--tint-400: oklch(from var(--white) l c h / 0.4);
--tint-500: oklch(from var(--white) l c h / 0.5);
--tint-600: oklch(from var(--white) l c h / 0.6);
--tint-700: oklch(from var(--white) l c h / 0.7);
--tint-800: oklch(from var(--white) l c h / 0.8);
--tint-900: oklch(from var(--white) l c h / 0.9);
--tint-950: oklch(from var(--white) l c h / 0.95);
--tint-full: oklch(from var(--white) l c h / 1);
```

Use to **fade** whatever sits below lighter. Frosted glass, hover-lightens on dark surfaces, soft highlight bands.

---

## 4. Typography

### Families

```css
--font-body: var(--font-geist-sans);
--font-heading: var(--font-geist-sans);
--font-mono: var(--font-geist-mono);
```

`--font-geist-sans` / `--font-geist-mono` are supplied by the demo app's `geist/font` (`next/font`) loader. A vanilla or Astro project must define them — or override `--font-body` / `--font-heading` / `--font-mono` to a real stack. See `references/integrations.md → Fonts`.

### Fluid sizes (clamp from Mobile → Desktop, interpolating on `vi`)

```css
--font-size-eyebrow: clamp(0.512rem, 0.609rem + -0.1213vi, 0.5787rem); /* smallest style */
--font-size-xs: clamp(0.64rem, 0.8584rem + -0.273vi, 0.7901rem);
--font-size-sm: clamp(0.8rem, 0.9293rem + -0.1616vi, 0.8889rem);
--font-size-md: clamp(1rem, 1rem + 0vi, 1rem);
--font-size-lg: clamp(1.125rem, 1.0682rem + 0.2273vi, 1.25rem);
--font-size-xl: clamp(1.2656rem, 1.1307rem + 0.5398vi, 1.5625rem); /* shares h6 */
--font-size-h6: clamp(1.2656rem, 1.1307rem + 0.5398vi, 1.5625rem);
--font-size-h5: clamp(1.4238rem, 1.1832rem + 0.9624vi, 1.9531rem);
--font-size-h4: clamp(1.6018rem, 1.2202rem + 1.5265vi, 2.4414rem);
--font-size-h3: clamp(1.802rem, 1.234rem + 2.2722vi, 3.0518rem);
--font-size-h2: clamp(2.0273rem, 1.2148rem + 3.2498vi, 3.8147rem);
--font-size-h1: clamp(2.2807rem, 1.1499rem + 4.523vi, 4.7684rem);
--font-size-display: clamp(2.5658rem, 1.0227rem + 6.1721vi, 5.9605rem);
```

These are generated; don't hand-edit. Regenerate with the Utopia flow in `references/integrations.md`.

### Weights (role-based)

```css
--weight-body: 400;
--weight-heading: 600;
--weight-strong: 500;
--weight-mono: 400;
--weight-eyebrow: 600;
```

### Tracking (tightens as type grows)

```css
--tracking-display: -0.025em;
--tracking-h1: -0.025em;
--tracking-h2: -0.025em;
--tracking-h3: -0.02em;
--tracking-h4: -0.01em;
--tracking-h5: -0.025em;
--tracking-h6: -0.0025em;
--tracking-xl: 0em;
--tracking-lg: 0em;
--tracking-md: 0em;
--tracking-sm: 0em;
--tracking-xs: 0em;
--tracking-eyebrow: 0.12em;
```

### Leading

```css
--leading-display: 1;
--leading-h1: 1;
--leading-h2: 1;
--leading-h3: 1.05;
--leading-h4: 1.05;
--leading-h5: 1.1;
--leading-h6: 1.1;
--leading-xl: 1.5;
--leading-lg: 1.5;
--leading-md: 1.6;
--leading-sm: 1.5;
--leading-xs: 1.5;
--leading-eyebrow: 1.2;
```

### Composed `text-*` utility classes

| Class          | Family  | Size    | Weight  | Leading | Tracking  | Notes                       |
| -------------- | ------- | ------- | ------- | ------- | --------- | --------------------------- |
| `text-display` | heading | display | heading | 1       | -0.025em  |                             |
| `text-h1`      | heading | h1      | heading | 1       | -0.025em  |                             |
| `text-h2`      | heading | h2      | heading | 1       | -0.025em  |                             |
| `text-h3`      | heading | h3      | heading | 1.05    | -0.02em   |                             |
| `text-h4`      | heading | h4      | heading | 1.05    | -0.01em   |                             |
| `text-h5`      | heading | h5      | heading | 1.1     | -0.025em  |                             |
| `text-h6`      | heading | h6      | heading | 1.1     | -0.0025em |                             |
| `text-eyebrow` | heading | eyebrow | eyebrow | 1.2     | 0.12em    | `text-transform: uppercase` |
| `text-xl`      | body    | xl      | body    | 1.5     | 0         |                             |
| `text-lg`      | body    | lg      | body    | 1.5     | 0         |                             |
| `text-md`      | body    | md      | body    | 1.6     | 0         |                             |
| `text-sm`      | body    | sm      | body    | 1.5     | 0         |                             |
| `text-xs`      | body    | xs      | body    | 1.5     | 0         |                             |

Use these by default. Don't reassemble. `text-eyebrow` is also defined; `text-link` styles inline links (`--primary`, underline with animated offset).

### Paragraph rhythm (`.text-prose` + `--margin-*`)

`.text-prose` is a flex-column container (`gap: var(--gap-sm)`) that also applies a per-style top margin to every non-first child, giving long-form copy correct vertical rhythm without per-element margins. It styles bare tags too (`.text-prose h2`, `.text-prose p`, `.text-prose a`, `.text-prose strong/em/img/figure`), so you can drop raw HTML inside it.

```css
--margin-display: var(--step-4_5);
--margin-h1: var(--step-4_5);
--margin-h2: var(--step-4_5);
--margin-h3: var(--step-4_5);
--margin-h4: var(--step-3_5);
--margin-h5: var(--step-3_5);
--margin-h6: var(--step-3_5);
--margin-xl: var(--step-2_5);
--margin-lg: var(--step-2_5);
--margin-md: var(--step-2_5);
--margin-sm: var(--step-2);
--margin-xs: var(--step-1_5);
--margin-eyebrow: 0rem;
```

---

## 5. Spacing

### Interval (the one number)

```css
--spacing-interval: clamp(0.225rem, 0.2136rem + 0.0455vw, 0.25rem); /* ~3.6px → 4px, fluid */
```

The interval is now a `clamp()`, so the whole step scale (and the gaps and radii built on it) shrinks slightly on small viewports and settles at 4px on desktop. Everything derived from it tracks automatically.

### Semantic gaps (the daily API)

```css
--gap-xs: var(--step-2); /*  0.5rem  →  8px  */
--gap-sm: var(--step-4); /*  1rem    → 16px  */
--gap-md: var(--step-6); /*  1.5rem  → 24px  */
--gap-lg: var(--step-11); /*  2.75rem → 44px  */
--gap-xl: var(--step-24); /*  6rem    → 96px  */
```

### Step scale

```css
--step-px_5: 0.5px;
--step-px: 1px;
--step-0_5: calc(var(--spacing-interval) / 2);
--step-1: var(--spacing-interval);
--step-1_5: calc(var(--spacing-interval) * 1.5);
--step-2: calc(var(--spacing-interval) * 2);
--step-2_5: calc(var(--spacing-interval) * 2.5);
--step-3: calc(var(--spacing-interval) * 3);
--step-3_5: calc(var(--spacing-interval) * 3.5);
--step-4: calc(var(--spacing-interval) * 4);
--step-4_5: calc(var(--spacing-interval) * 4.5);
--step-5: calc(var(--spacing-interval) * 5);
--step-5_5: calc(var(--spacing-interval) * 5.5);
--step-6: calc(var(--spacing-interval) * 6);
--step-7: calc(var(--spacing-interval) * 7);
--step-8: calc(var(--spacing-interval) * 8);
--step-9: calc(var(--spacing-interval) * 9);
--step-10: calc(var(--spacing-interval) * 10);
--step-11: calc(var(--spacing-interval) * 11);
--step-12: calc(var(--spacing-interval) * 12);
--step-14: calc(var(--spacing-interval) * 14);
--step-16: calc(var(--spacing-interval) * 16);
--step-20: calc(var(--spacing-interval) * 20);
--step-24: calc(var(--spacing-interval) * 24);
--step-28: calc(var(--spacing-interval) * 28);
--step-32: calc(var(--spacing-interval) * 32);
--step-36: calc(var(--spacing-interval) * 36);
--step-40: calc(var(--spacing-interval) * 40);
--step-44: calc(var(--spacing-interval) * 44);
--step-48: calc(var(--spacing-interval) * 48);
--step-52: calc(var(--spacing-interval) * 52);
--step-56: calc(var(--spacing-interval) * 56);
--step-60: calc(var(--spacing-interval) * 60);
--step-64: calc(var(--spacing-interval) * 64);
--step-72: calc(var(--spacing-interval) * 72);
--step-80: calc(var(--spacing-interval) * 80);
--step-96: calc(var(--spacing-interval) * 96);
--step-full: 100%;
```

Half-steps stop at `--step-5_5`. The literals that don't scale with the interval are `--step-px_5` (0.5px), `--step-px` (1px), and `--step-full` (100%) — use `--step-px` for non-scaling hairlines.

### Utility classes

- **Gap:** `gap-xs`, `gap-sm`, `gap-md`, `gap-lg`, `gap-xl`
- **Padding (all):** `p-xs`, `p-sm`, `p-md`, `p-lg`, `p-xl`
- **Padding inline/block:** `px-{xs..xl}`, `py-{xs..xl}`
- **Padding per side:** `pt-`, `pr-`, `pb-`, `pl-` followed by `{xs..xl}`
- **Margin (all):** `m-{xs..xl}`
- **Margin inline/block:** `mx-{xs..xl}`, `my-{xs..xl}`, plus `mx-auto`, `my-auto`
- **Margin per side:** `mt-`, `mr-`, `mb-`, `ml-` followed by `{xs..xl}` or `-auto`

All consume the semantic gaps (not steps).

---

## 6. Radius

### Multiplier

```css
--radius-multiplier: 1;
```

Bump for rounder, drop for sharper. Doesn't affect `--radius-none` or `--radius-full`.

### Semantic scale

```css
--radius-none: 0rem;
--radius-xs: calc(var(--step-1) * var(--radius-multiplier)); /* ~1× interval  */
--radius-sm: calc(var(--step-1_5) * var(--radius-multiplier)); /* ~1.5× interval */
--radius-md: calc(var(--step-2_5) * var(--radius-multiplier)); /* ~2.5× interval */
--radius-lg: calc(var(--step-4) * var(--radius-multiplier)); /* ~4× interval  */
--radius-xl: calc(var(--step-7) * var(--radius-multiplier)); /* ~7× interval  */
--radius-full: 9999rem;
```

(At the ~4px settled interval: xs ≈ 4px, sm ≈ 6px, md ≈ 10px, lg ≈ 16px, xl ≈ 28px.)

### No primitive radius aliases

There are **no** `--radius-button` / `--radius-card` / `--radius-input` / `--radius-badge` tokens. Components reach the semantic scale through a local custom property instead — e.g. `_button.css` declares `--button-radius: var(--radius-md)`, `_badge.css` declares `--badge-radius: var(--radius-sm)`, `_dialog.css` uses `--radius-lg` directly. Retune a component's radius by overriding its local prop, or shift the whole system with `--radius-multiplier`.

### Utility classes

`rounded-0`, `rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full` — note the `rounded-*` prefix (Tailwind-style); each sets `border-radius` to the matching token (`rounded-0` sets a literal `0`).

---

## 7. Layout

### Semantic widths

```css
--article: min(var(--screen-xs), 100% - var(--gap-md) * 2); /* 40rem cap, self-pads */
--container: min(var(--screen-lg), 100% - var(--gap-md) * 2); /* 80rem cap, self-pads */
```

### Breakpoints (for `calc()`, not `@media`)

```css
--screen-xs: 40rem; /*  640px */
--screen-sm: 48rem; /*  768px */
--screen-md: 64rem; /* 1024px */
--screen-lg: 80rem; /* 1280px */
--screen-xl: 96rem; /* 1536px */
```

CSS spec disallows custom properties in `@media` size queries. Write the raw `40rem`/etc. in queries, use the variable everywhere else.

### Utility classes

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

Both register a container query name. Apply directly to your element — no wrapping padding div.

---

## 8. Effects

### Focus ring (outline-based)

```css
--ring: var(--primary);
--ring-style: solid;
--ring-size: 2px;
--ring-offset: 1px;
```

The reset applies these on every `:focus-visible`:

```css
:where(:focus-visible) {
  outline: var(--ring-size) var(--ring-style) var(--ring);
  outline-offset: var(--ring-offset);
}
```

Components keep a transparent outline at rest and switch only the color on focus, so the ring doesn't shift layout: `outline: var(--ring-size) var(--ring-style) oklch(from var(--ring) l c h / 0)` then `outline-color: var(--ring)` on `:focus-visible`. The `.ring` utility applies the same pattern. (There is **no** `--focus-ring` box-shadow token.) Always target `:focus-visible`, never `:focus`.

### Shadows

Each is a stack of 5 entries with increasing offset and decreasing alpha. Colors derive from `oklch(from var(--black) l c h / α)` so they read correctly on light and dark surfaces.

```css
--shadow-none: 0px 0px 0px 0px oklch(from var(--black) l c h / 0);
--shadow-xs: /* very subtle, for borders that want a slight lift */;
--shadow-sm: /* resting buttons, hover affordances */;
--shadow-md: /* cards, dropdowns, popovers */;
--shadow-lg: /* modals, side panels */;
--shadow-xl: /* most elevated single surface in a view */;
```

### Utility classes

`shadow-none`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`.

---

## 9. Animations

Not one of the eight named foundations, but ships in `_variables.css` and is used throughout the components:

```css
--spring-easing: linear(0, 0.012 0.9%, …, 1); /* 27-point spring curve */
--spring-duration: 0.333s;
--default-transition-timing-function: var(--spring-easing, cubic-bezier(0.17, 0.84, 0.44, 1));
--default-transition-duration: var(--spring-duration, 0.333s);
--default-transition-property:
  text-underline-offset, box-shadow, background-color, color, transform, opacity, filter,
  backdrop-filter, display, content-visibility, … /* ~19 properties */;
--default-transition: /* the full property + duration + easing bundle */;
```

Use `transition: var(--default-transition)` for the standard spring-eased bundle, or a single property with `var(--default-transition-duration) var(--default-transition-timing-function)`. The reset wires native `<dialog>` and `[popover]` open/close (and `<details>` height) to this easing via `@starting-style`.

### Text decoration (used by links, underlined buttons, accordions)

```css
--decoration-style: solid;
--decoration-thickness: 1px;
--decoration-offset: 1px;
--decoration-offset--hover: 2px;
--decoration-offset--active: 1px;
```

---

## Other shipped utility classes

`_utilities.css` is large. Beyond the spacing, radius, shadow, and layout classes already listed under their foundations, these ship too:

- **Color (text + background):** `text-{role}` / `bg-{role}` for every theme role (`text-foreground`, `bg-card`, `text-muted-foreground`, `bg-primary`, `bg-destructive`, …), every corporate step (`bg-primary-600`, `text-secondary-200`, …), and every grayscale value (`bg-neutral-800`, `bg-shade-800`, `bg-tint-100`, `text-white`, …). The shade/tint background classes are the idiomatic way to place a mode-correct overlay.
- **Display:** `hidden`, `block`, `inline-block`, `inline`, `flex`, `inline-flex`, `grid`
- **Flex:** `flex-{row|row-reverse|col|col-reverse}`, `flex-{1|auto|initial|none}`, `items-{start|center|end|stretch}`, `justify-{start|center|end|stretch|around|between}`
- **Grid:** `grid-cols-1` … `grid-cols-12`, `col-span-1` … `col-span-12`, `place-items-{start|center|end}`
- **Order:** `order-first`, `order-last`, `order-none`
- **Position:** `static`, `relative`, `absolute`, `fixed`, `sticky`
- **Inset / offsets:** `inset-0`, `inset-{xs..xl}`, `top-/right-/bottom-/left-{xs..xl}`
- **Size:** `w-{none|px|auto|full|xs..xl|screen|screen-xs..xl}`, `h-…` (same), `size-…` (both axes); `min-w-/min-h-` and `max-w-/max-h-` with `{auto|full|none|screen|screen-xs..xl}`
- **Z-index:** `z-isolate`, `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50`
- **Opacity:** `opacity-{0|5|10|15|20|25|30|40|50|60|70|75|80|90|95|100}`
- **Overflow:** `overflow-{hidden|clip|auto}`, `overflow-{x|y}-auto`, `no-scrollbar`
- **Border:** `border` + directional `border-{t|r|b|l}` (color via `--border-color`, default `--border`; override with `border-{primary|destructive|…}`)
- **Pointer events:** `pointer-events-none`
- **Aspect ratios:** `aspect-anamorphic` (2.39:1), `aspect-univisium` (2:1), `aspect-widescreen` (16:9), `aspect-landscape` (3:2), `aspect-portrait` (2:3), `aspect-square` (1:1)
- **Object fit:** `object-{contain|cover|fill|none|scale-down}`
- **Text helpers:** `uppercase`, `lowercase`, `capitalize`, `normal-case`, `text-pretty`, `text-balance`, `tabular-nums`, `italic`, `line-clamp-1` … `line-clamp-6`
- **Transition:** `transition` (the `--default-transition` bundle), `transition-discrete`
- **Accessibility:** `sr-only`
- **Focus ring:** `ring` (transparent outline at rest, `--ring` color on `:focus-visible`)
- **Layout widths:** `container`, `article`

All Zazz utility classes are wrapped in `:where()` for zero specificity, so they never fight component CSS or another utility framework (any specificity-bearing rule wins). Imported at the project root, they apply globally.
