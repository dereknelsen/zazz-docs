# Zazz Integrations

How Zazz lives in plain CSS, Tailwind v4 + shadcn, Webflow, and Figma. Same names everywhere; only the wiring differs.

---

## Plain CSS

The base install everything else builds on. Three files plus an entry point:

```
zazz/
├── variables.css   # all eight foundation token collections
├── reset.css       # box-sizing, element defaults, native <dialog> transitions
├── utilities.css   # text-*, gap-*, p-*, m-*, radius-*, shadow-*, container, etc.
└── main.css        # entry point wrapping the three into @layer rules
```

### Single import

```css
@import "./zazz/main.css";
```

That file is just:

```css
@import url("./variables.css") layer(variables);
@import url("./reset.css")     layer(reset);
@import url("./utilities.css") layer(utilities);
```

Layers cascade in declaration order; your component CSS sits outside any layer and overrides everything.

### Direct imports (if `@layer` isn't supported)

Order matters:

```css
@import "./zazz/variables.css";   /* tokens first */
@import "./zazz/reset.css";       /* element defaults */
@import "./zazz/utilities.css";   /* utility classes last */
```

### Dark mode

Two triggers, both wired:

- `@media (prefers-color-scheme: dark)` — respects OS preference
- `:is(.dark, .dark *)` — force a mode by adding `.dark` to any ancestor

```html
<html class="dark">…</html>
```

Add additional modes (high-contrast, brand-takeover, holiday) by adding a new selector that re-points the same theme variables.

---

## Tailwind v4 + shadcn

Zazz bridges into Tailwind via `@theme`. After bridging, `bg-primary`, `text-foreground`, `gap-md`, `rounded-lg`, etc. all resolve through Zazz tokens.

### Setup

1. Follow the plain-CSS install first.
2. Add a `@theme` block after the Zazz imports:

```css
@import "tailwindcss";
@import "./zazz/main.css";

@theme {
  /* Theme colors → Tailwind color utilities */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-border: var(--border);
  --color-border-foreground: var(--border-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-input: var(--input);
  --color-input-foreground: var(--input-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-faded: var(--faded);
  --color-faded-foreground: var(--faded-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-tertiary: var(--tertiary);
  --color-tertiary-foreground: var(--tertiary-foreground);
  --color-info: var(--info);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-destructive: var(--destructive);

  /* Spacing → Tailwind spacing utilities */
  --spacing-xs: var(--gap-xs);
  --spacing-sm: var(--gap-sm);
  --spacing-md: var(--gap-md);
  --spacing-lg: var(--gap-lg);
  --spacing-xl: var(--gap-xl);

  /* Radius → Tailwind radius utilities */
  --radius-xs: var(--radius-xs);
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
}
```

After this, `bg-primary` resolves to `--primary`, `text-foreground` resolves to `--foreground`, `p-md` resolves to `--gap-md`, `rounded-lg` resolves to `--radius-lg`. Mode swaps and theme overrides propagate automatically.

### shadcn/ui

shadcn expects tokens named `--background`, `--foreground`, `--primary`, `--border`, `--card`, etc. — Zazz already provides them. Install shadcn components as normal; they pick up the theme without modification.

Caveats:

- **Status tokens** (`--info`, `--success`, `--warning`, `--destructive`) aren't referenced by default shadcn components. The `@theme` block above exposes them as Tailwind utilities.
- **Tertiary brand** is Zazz-specific; not in default shadcn. Bridged for your own use.
- **`--border-foreground`** is Zazz-specific for outlined buttons / ghost inputs / bordered tags. Bridged so you can use it via Tailwind.

### Typography in Tailwind

**Prefer Zazz's `text-*` classes over Tailwind's `text-{size} font-{weight}` compositions.** Zazz's are tuned together (family + size + weight + leading + tracking); assembling them from individual Tailwind utilities recreates the work and drifts from the system.

```html
<!-- Good (Zazz) -->
<h1 class="text-h1">…</h1>
<p class="text-lg">…</p>

<!-- Avoid (Tailwind composition) -->
<h1 class="text-5xl font-semibold leading-none tracking-tight">…</h1>
```

If a Tailwind utility *and* a Zazz `text-*` class are both applied to the same element, the Tailwind one will likely win on specificity (Zazz uses `:where()` for zero specificity). Pick one. The Zazz way is intentional — assume it overrules Tailwind defaults.

### Layout in Tailwind

For widths, prefer Zazz `.container` and `.article` over Tailwind's `max-w-* mx-auto px-*` patterns. The Zazz widths self-pad via `min()` and register container query names. No padding wrapper needed.

---

## Webflow

### Clone the kit

Open the [Zazz Webflow Kit](https://webflow.com/made-in-webflow/website/zazz-webflow-kit) on the Webflow Community and click **Clone**.

### What's pre-wired

- Every Zazz variable (all 8 foundations) as Webflow Variables with light and dark modes attached to the variable, not the layer.
- All `text-*` classes (`text-display`, `text-h1`–`text-h6`, `text-xl`–`text-xs`, `text-eyebrow`).
- Spacing utility classes (`p-md`, `gap-lg`, `mx-auto`, the full set).
- `container` and `article` wrapper classes.
- Starter primitives (buttons, cards, inputs, badges, dialog, etc.).

### How to work in it

**Utility classes go in the class list. BEM goes in the style box.**

A card built in Webflow looks like:

- Class list: `card`, `card--featured`, `p-md`, `radius-card`, `shadow-md`
- Style box: `.card` is the BEM root — use it for any custom styling that doesn't fit a utility (e.g. a custom border-image, a specific gradient that isn't covered by tokens).

This pattern works because the utility classes apply baseline styling cleanly, and the BEM root holds the bespoke decoration for that component.

### Rebranding

Update variables at the project level — Webflow's Variables panel resolves through every class instantly. Change `--primary` to your client's brand color and every button, badge, accent surface, and focus ring follows.

For per-page or per-section overrides, scope a variable change to a parent element. The override cascades to descendants the same way it does in CSS.

### Native form controls

In Webflow, checkbox/radio/switch/slider/select are styled directly on the native HTML element via Zazz utility classes. There's no React-component wrapper — the styling is applied through the kit's classes on Webflow's built-in form elements.

---

## Figma

### Open the kit

[Zazz Figma Kit](https://www.figma.com/community/file/1468718708506413296) on the Figma Community. Use **Open in Figma** and move/duplicate to your team.

### What's included

- **Variables** for theme, corporate, grayscale, typography, spacing, radius, and layout — organized by collection with light and dark modes attached at the variable level.
- **Text styles** for display, h1–h6, body xl–xs, and eyebrow. Each pairs the variable-driven family, size, weight, tracking, and paragraph spacing.
- **Components** for the shipped primitives.

### Use as a shared library

1. Open the Zazz file → Libraries panel → publish as a library.
2. In any other file → Libraries → enable Zazz library.
3. Variables, text styles, and components are now in the inserts panel.

### Customizing

Override variables at the file level to rebrand. The library file is the structural source of truth; project files can re-target variable values for their specific brand without disturbing other projects on the same library.

### Caveat: line-height

Figma Variables don't support `line-height` yet. The kit carries leading as a paragraph property attached to each text style rather than as a shared variable. When Figma adds line-height support, these will move into proper tokens. (In code, `--leading-*` variables exist now and are used by the `text-*` classes.)

---

## Updating palettes with Tints.dev

The default Zazz palettes are generated with [Tints.dev](https://www.tints.dev) by Simeon Griggs.

### Per-scale flow

1. Visit `https://www.tints.dev`.
2. Paste the brand hex; tweak lightness curve / hue rotation if needed.
3. Switch output to OKLCH.
4. Copy the 11 `--name-50` through `--name-950` lines into `variables.css`.
5. Verify the Theme bindings still feel right (defaults are `600` light / `500` dark for primary and secondary, `500`/`400` for tertiary).

### All four defaults at once

The Zazz docs site has a pre-loaded multi-palette editor link for primary, secondary, tertiary, and neutral. Open it, edit hexes, copy the OKLCH back. A first-class in-docs theme builder is on the Zazz roadmap.

### Doing it programmatically

If you want to scale this (e.g. generating per-client themes in a CI step), the Tints.dev algorithm is open source. There's no public API endpoint, but the npm package can run client-side or in a Node script. Hit Zazz's [theme page source](app/theme/_lib/) for a reference implementation that uses the same algorithm under `_lib/utopia-clamp.ts` and palette utilities.

---

## Updating type scales with Utopia

Fluid clamps in Zazz use a Utopia-style algorithm — same approach as [utopia.fyi](https://utopia.fyi). The Zazz docs site exposes a typography panel under `/theme`.

### Inputs

| Input | Default | Meaning |
| --- | --- | --- |
| `minWidth` | 320 | Mobile viewport |
| `maxWidth` | 1440 | Desktop viewport |
| `minFontSize` | 16 | Body size on mobile |
| `maxFontSize` | 16 | Body size on desktop (same → body doesn't scale; only headings do) |
| `minTypeScale` | 1.2 (Minor Third) | Scale ratio between sizes on mobile |
| `maxTypeScale` | 1.25 (Major Third) | Scale ratio between sizes on desktop |
| `positiveSteps` | 7 | Sizes above body (display + h1–h6) |
| `negativeSteps` | 3 | Sizes below body (sm, xs, etc.) |
| `relativeTo` | `viewport-width` | Whether interpolation tracks viewport or container |

### Output

A set of `--font-size-{name}: clamp(min, calc(... + N * vi), max)` declarations. Paste under the Typography section of `variables.css`. The `text-*` classes pick them up automatically.

### Programmatic generation

The Zazz docs `_lib/utopia-type.ts` and `utopia-clamp.ts` implement the algorithm. If you need to bake clamps into a build step, vendor those utilities. Otherwise use utopia.fyi's hosted calculator and paste.

### Don't hand-author clamps

Unless you have a specific off-system one-off, generate clamps. Hand-tuned values drift quickly and lose the rhythm across steps.

---

## A note on tool overrides

Zazz is opinionated. When the surrounding system (Tailwind defaults, shadcn defaults, Client-First, Webflow's built-in component library) collides with Zazz, **default to Zazz**. The framework was designed to be the source of truth; the other systems are mostly delivery mechanisms or competing conventions.

If you find yourself fighting Zazz to make something work the "Tailwind way" or the "Client-First way," step back. The Zazz way is intentional. It's faster to do it Zazz's way and document a deliberate departure when one is needed than to keep recreating tunable subsystems by hand.
