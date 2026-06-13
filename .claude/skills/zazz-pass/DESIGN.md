---
version: alpha
name: zazz-design
description: Zazz combines editorial typography with emotive imagery to create web applications and B2B, wholesale, and retail experiences that feel trustworthy, brand-authentic, and premium without pretension.
colorMode: light dark

colors:
  # All values are OKLCH — the authoritative token format (HEX is imprecise for our scales).
  # Theme (light mode values shown, dark mode swaps automatically)
  background: "oklch(1 0 0)"
  foreground: "oklch(0.241 0.009 285.7)"
  border: "oklch(0.949 0.001 287.28)"
  border-foreground: "oklch(1 0 0 / 0.95)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.241 0.009 285.7)"
  popover: "oklch(1 0 0)"
  popover-foreground: "oklch(0.241 0.009 285.7)"
  input: "oklch(0.973 0.001 287.31)"
  input-foreground: "oklch(0.241 0.009 285.7)"

  # Overlay
  muted: "oklch(0.198 0.008 285.68 / 0.05)"
  muted-foreground: "oklch(0.198 0.008 285.68 / 0.6)"
  faded: "oklch(1 0 0 / 0.1)"
  faded-foreground: "oklch(1 0 0 / 0.6)"

  # Brand
  primary: "oklch(0.511 0.23 276.97)"
  primary-foreground: "oklch(1 0 0)"
  secondary: "oklch(0.61 0.194 36.8)"
  secondary-foreground: "oklch(1 0 0)"
  tertiary: "oklch(0.613 0.208 14.68)"
  tertiary-foreground: "oklch(1 0 0)"

  # Status
  info: "oklch(0.5876 0.1389 241.97)"
  info-foreground: "oklch(1 0 0)"
  success: "oklch(0.596 0.1274 163.23)"
  success-foreground: "oklch(1 0 0)"
  warning: "oklch(0.6658 0.1574 58.32)"
  warning-foreground: "oklch(1 0 0)"
  destructive: "oklch(0.5771 0.2152 27.33)"
  destructive-foreground: "oklch(1 0 0)"

typography:
  display:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 5.96rem
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: -0.05em
  h1:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 4.77rem
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: -0.05em
  h2:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 3.81rem
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: -0.025em
  h3:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 3.05rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.025em
  h4:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 2.44rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.015em
  h5:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 1.95rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.01em
  h6:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 1.56rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.005em
  body-xl:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 1.56rem
    fontWeight: 400
    lineHeight: 1.5
  body-lg:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 0.89rem
    fontWeight: 400
    lineHeight: 1.5
  body-xs:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 0.79rem
    fontWeight: 400
    lineHeight: 1.5
  eyebrow:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 0.58rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.1em
  mono:
    fontFamily: '"Geist Mono", "Palatino Linotype", sans-serif'
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6

spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 44px
  xl: 96px
  px: 1px
  0: 0px
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  7: 28px
  8: 32px
  9: 36px
  10: 40px
  11: 44px
  12: 48px
  16: 64px
  20: 80px
  24: 96px

rounded:
  xs: 4px
  sm: 6px
  md: 10px
  lg: 20px
  xl: 28px
  full: 9999px

components:
  # Variants below match the shipped `data-variant` values (no attribute = default).
  button-default:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  button-muted:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  button-link:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    rounded: 0px
    padding: 0px
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-inverted:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.faded-foreground}"
    rounded: "{rounded.lg}"
    padding: 24px
  input:
    backgroundColor: "{colors.input}"
    textColor: "{colors.input-foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  # Badge ships primary/muted/ghost/link only — no destructive or status variants.
  # Status badges (info/success/warning/destructive) are an instance override, e.g.
  # style="--badge-background: var(--success); --badge-foreground: var(--success-foreground)".
  badge:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: 8px
  badge-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.sm}"
    padding: 8px
  badge-muted:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: 8px
  badge-ghost:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: 8px
  badge-link:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    rounded: 0px
    padding: 0px

fonts:
  body: Geist, Verdana, sans-serif
  heading: Geist, Verdana, sans-serif
  mono: '"Geist Mono", "Palatino Linotype", sans-serif'
roundness: medium
---

> **🎨 CRITICAL: Brand Customization**
>
> When a URL or brand instructions are provided alongside this file:
>
> 1. **Fetch the website** — extract the brand's color palette, logo, imagery style, and visual identity
> 2. **Update the YAML frontmatter** — replace `colors`, `fonts`, and `roundness` values to match the brand as precisely as reasonable
> 3. **Include the logo** in the header and footer of generated designs
> 4. **Adapt the archetype** — choose the site archetype (below) that best fits the brand's market position
>
> Generate OKLCH color scales using [Tints.dev](https://www.tints.dev) from extracted brand hex values. Default theme bindings: primary/secondary use step 600 (light) / 500 (dark); tertiary uses 500 / 400.

# Design System: Zazz Design System

## 1. Visual Theme & Atmosphere

A conversion-focused eCommerce system for B2B, wholesale, and retail frontends. The aesthetic balances clean commerce mechanics with emotive brand storytelling — editorial serif-italic accents in typography elevate product narratives while surfaces stay clean and product-forward.

Light mode feels like a premium catalog: crisp surfaces with photographic warmth. Dark mode maintains trustworthy character with deeper tones. Typography mixes clean sans-serif body copy with italic serif display words for emphasis ("_quality_", "_value_", "_trusted_") — an editorial cadence that elevates products into brand storytelling.

### Site Archetypes

| Archetype                  | Character                                                                                                       | Typical Clients                                                |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Industrial Distributor** | Function-first, catalog-dense, account-gated. Prominent search, minimal atmosphere. Speed and clarity dominate. | Packaging, safety, industrial supplies, janitorial, electrical |
| **Lifestyle Brand**        | Balanced — product-forward with brand storytelling. Carousels, seasonal collections, aspirational photography.  | Lighting, furniture, home goods, apparel, building materials   |
| **Editorial Studio**       | Gallery-like, story-driven, generous whitespace. Video heroes, craft narratives, asymmetric layouts.            | Artisan goods, luxury, design-forward manufacturers            |

Default to **Lifestyle Brand** when unclear — it balances conversion with brand investment. Most B2B clients fall between Distributor and Lifestyle.

### Design Guidelines

- **Never use generic AI aesthetics** — cold tech minimalism, cliched startup palettes, sterile layouts. Designs must feel unique to the brand.
- **Balance conversion mechanics with brand storytelling** — clear CTAs and product grids alongside testimonials, messaging, and premium photography.
- **Use Zazz tokens exclusively** — never hardcode colors, spacing, radii, shadows, or typography. Use `var(--token-name)`.
- **Typography via `text-*` classes** — never compose type from individual size/weight/leading utilities.
- **Spacing via `--gap-*` semantic scale** — never use arbitrary px/rem values.
- **Editorial emphasis** — pair Geist body with a classic serif italic (Playfair Display Italic, Cormorant Garamond Italic) for display accent words.
- **Motion** — use `--spring-easing` and `--spring-duration`. Subtle, confident, unhurried.
- **Dark mode for free** — role tokens auto-swap; never write separate dark-mode overrides for token-handled values.

---

## 2. Color Palette & Roles

### Theme (Mode-Aware Role Tokens)

| Token                  | Role                                          | Light Character              | Dark Character              |
| ---------------------- | --------------------------------------------- | ---------------------------- | --------------------------- |
| `--background`         | Page surface                                  | White (--white)              | Blue-violet black           |
| `--foreground`         | Default text                                  | Rich charcoal (neutral-900)  | Pure white                  |
| `--border`             | 1px lines and dividers                        | Soft cool gray (neutral-100) | Deep gray                   |
| `--border-foreground`  | Text on outlined/bordered elements            | Near-opaque white (tint-950) | Subtle white (tint-100)     |
| `--card`               | Card surface, elevated from background        | Pure white                   | Dark charcoal               |
| `--card-foreground`    | Text on cards                                 | Rich charcoal                | Pure white                  |
| `--popover`            | Popover / menu surface                        | Pure white                   | Near-black (shade-950)      |
| `--popover-foreground` | Text on popovers and menus                    | Rich charcoal                | Pure white                  |
| `--input`              | Input field background                        | Near-white (neutral-50)      | Barely-there tint (tint-50) |
| `--input-foreground`   | Input text                                    | Rich charcoal                | Pure white                  |
| `--muted`              | Subtle dim — always darker than its surface   | shade-50                     | tint-50                     |
| `--muted-foreground`   | De-emphasized text, helper copy               | shade-600                    | tint-600                    |
| `--faded`              | Subtle fade — always lighter than its surface | tint-100                     | shade-100                   |
| `--faded-foreground`   | Text on faded surfaces                        | tint-600                     | shade-600                   |

### Brand Colors

| Token         | Light Step (600)                   | Dark Step (500)                     | Character                     |
| ------------- | ---------------------------------- | ----------------------------------- | ----------------------------- |
| `--primary`   | `oklch(0.511 0.23 276.97)` #4f46e5 | `oklch(0.593 0.193 280.79)` #6e68ec | Deep blue-violet brand anchor |
| `--secondary` | `oklch(0.61 0.194 36.8)` #de4917   | `oklch(0.687 0.198 34.85)` #fc603a  | Warm burnt orange complement  |
| `--tertiary`  | `oklch(0.613 0.208 14.68)` #e5375b | `oklch(0.693 0.163 13.04)` #ef6b7f  | Vibrant rose-pink accent      |

All brand foregrounds are white. Brand steps **lighter** in dark mode. Each has a full 50–950 OKLCH scale (see frontmatter).

Key scale steps for context:

- **-100**: Subtle background tint for sections
- **-500**: Vivid mid-tone (dark mode default)
- **-600**: Deep saturated (light mode default)
- **-900**: Near-black for deep accent panels

### Grayscale (Neutrals with Blue-Violet Cast)

Key steps: `--neutral-50` (#fcfcfc) · `--neutral-200` (#d4d4d7) · `--neutral-500` (#888890) · `--neutral-700` (#52525b) · `--neutral-900` (#1f1f24) · `--neutral-950` (#151519)

### Overlays

- **Shade** (`--shade-50` through `--shade-950`): Alpha-based dim derived from neutral-950. Use for backdrops and darkening. `--shade-800` for modal backdrops (not `--muted`).
- **Tint** (`--tint-50` through `--tint-950`): Alpha-based fade derived from white. Use for lightening over dark surfaces.

### Status Colors

| Token           | Character                                 |
| --------------- | ----------------------------------------- |
| `--info`        | Cerulean blue — informational notices     |
| `--success`     | Teal green — positive confirmations       |
| `--warning`     | Amber gold — cautionary alerts            |
| `--destructive` | Vivid red-orange — errors, danger actions |

All status foregrounds are white. Status steps **darker** in dark mode (opposite of brand).

---

## 3. Typography Rules

### Font Families

| Token                   | Stack                                         | Role               |
| ----------------------- | --------------------------------------------- | ------------------ |
| `--font-family-body`    | Geist, Verdana, sans-serif                    | Body copy, UI text |
| `--font-family-heading` | Geist, Verdana, sans-serif                    | Headings, display  |
| `--font-family-mono`    | "Geist Mono", "Palatino Linotype", sans-serif | Code, tabular data |

### Weights

| Token                   | Value | Usage                       |
| ----------------------- | ----- | --------------------------- |
| `--font-weight-body`    | 400   | All body text               |
| `--font-weight-heading` | 600   | All headings, display       |
| `--font-weight-strong`  | 500   | Bold/strong inline emphasis |
| `--font-weight-eyebrow` | 600   | Eyebrow labels              |

### Type Scale

All sizes are fluid via `clamp()`, scaling between mobile and desktop viewports.

| Class          | Size (desktop) | Leading | Tracking | Character                     |
| -------------- | -------------- | ------- | -------- | ----------------------------- |
| `text-display` | 5.96rem        | 0.95    | -0.05em  | Massive hero statement        |
| `text-h1`      | 4.77rem        | 0.95    | -0.05em  | Primary page heading          |
| `text-h2`      | 3.81rem        | 0.95    | -0.025em | Section heading               |
| `text-h3`      | 3.05rem        | 1       | -0.025em | Subsection heading            |
| `text-h4`      | 2.44rem        | 1       | -0.015em | Component heading             |
| `text-h5`      | 1.95rem        | 1       | -0.01em  | Small heading                 |
| `text-h6`      | 1.56rem        | 1       | -0.005em | Minor heading                 |
| `text-xl`      | 1.56rem        | 1.5     | 0        | Large body / intro paragraph  |
| `text-lg`      | 1.25rem        | 1.5     | 0        | Lead text                     |
| `text-md`      | 1rem           | 1.6     | 0        | Default body text             |
| `text-sm`      | 0.89rem        | 1.5     | 0        | Small UI labels               |
| `text-xs`      | 0.79rem        | 1.5     | 0        | Captions, fine print          |
| `text-eyebrow` | 0.58rem        | 1.2     | 0.1em    | Uppercase label, wide-tracked |

Headings use `text-wrap: balance`. Body uses `text-wrap: pretty`. Tight-leading on large text, generous-leading on body.

### Text Link

`.text-link` — `--primary` color, 1px underline, offset lifts on hover.

---

## 4. Component Stylings

**Two conventions:**

- **Variants are data attributes:** `class="button" data-variant="primary"` — never `button-primary`.
- **Theming via local custom properties:** Components declare `--button-background`, `--button-radius`, etc. off theme roles. Variants re-point those locals.

### Buttons

Subtly rounded (`--radius-md`, ~10px). Fixed height (`--step-8`). Variants (via `data-variant`): **default** (no attribute — bordered, `--background`), **primary** (solid `--primary`), **muted** (`--muted` fill), **ghost** (transparent, hover reveals `--muted`), **destructive** (solid `--destructive`), **link** (inline, underlined). Sizes (via `data-size`): `sm`, `icon`, `icon-sm`.

### Badges

Gently rounded chips (`--radius-sm`, ~6px). Height `--step-5`. Variants (via `data-variant`): `default`, `primary`, `muted`, `ghost`, `link` — note badge has **no** `destructive` variant. Size: `icon`. `--font-size-xs`, `--font-weight-strong`.

### Dialog

Native `<dialog>` via Invoker Commands API. `--card` surface, `--shadow-md`, `--radius-lg`. Backdrop: `--shade-800`. Sizes (via `data-size`): `article` (default width), `container`, `screen`.

### Dropdown & Navigation Menu

Popover API + CSS anchor positioning. Native light-dismiss. Dropdown items are `.button[data-variant="ghost"]`. Navigation menu supports mega-panels with `__viewport` grid and `__featured` callout.

### Tabs

CSS-first grouped radio inputs wrapped in `<tab-group>`. Segmented control with sliding card pill indicator. Panel order must match radio order. The element adds orientation-aware arrow keys, Home/End, and wrap-around; radios still work without JS.

### Cards (composition pattern)

`--card` / `--card-foreground`, `1px solid var(--border)`, `--radius-lg`. Padding: `--gap-md`. Figure: `--radius-md`, aspect 3/2.

### Forms

Shared `--field-*` tokens unify `.input`, `.textarea`, `.select`, `.input-group`, `.password-group`. Validation via `:user-invalid` (surfaces after blur/submit, never while typing). `.field` wrapper for label/control/hint/error layout. Password visibility uses `<input-password>` around `.password-group`; checkbox, switch, and radio are restyled native inputs.

---

## 5. Layout Principles

### Container Widths

| Class        | Width                                  | Purpose                    |
| ------------ | -------------------------------------- | -------------------------- |
| `.container` | `min(80rem, 100% - var(--gap-md) * 2)` | Full-width content wrapper |
| `.article`   | `min(66ch, 100% - var(--gap-md) * 2)`  | Reading-width content      |

Both self-pad via `min()` — no wrapper div needed. Both register as container query containers.

### Spacing

| Token      | Computed | Use For                                |
| ---------- | -------- | -------------------------------------- |
| `--gap-xs` | 8px      | Tight grouping, button rows            |
| `--gap-sm` | 16px     | Default component gap, gutters         |
| `--gap-md` | 24px     | Card padding, section internal spacing |
| `--gap-lg` | 44px     | Large component separation             |
| `--gap-xl` | 96px     | Section-level vertical rhythm          |

Utility classes: `.gap-*`, `.p-*`, `.px-*`, `.py-*`, `.m-*`, `.mx-*`, `.my-*` at each size (xs/sm/md/lg/xl).

_Values shown throughout (spacing, radius, type sizes) are **desktop maximums**. Spacing and radius derive from `--spacing-interval` (`clamp(0.225rem, …, 0.25rem)`) and type from per-step `clamp()`s, so all three scale down fluidly on narrower viewports._

### Radius

| Token           | Computed    | Use For            |
| --------------- | ----------- | ------------------ |
| `--radius-none` | 0           | Sharp edges        |
| `--radius-xs`   | ~4px        | Subtle softening   |
| `--radius-sm`   | ~6px        | Badges             |
| `--radius-md`   | ~10px       | Buttons, inputs    |
| `--radius-lg`   | ~20px       | Cards, dialogs     |
| `--radius-xl`   | ~28px       | Statement surfaces |
| `--radius-full` | Pill-shaped | Circular/capsular  |

Utility classes: `rounded-0` through `rounded-xl`, `rounded-full`.

### Shadows & Elevation

Whisper-soft, multi-layered diffused shadows. Surfaces are flat by default — shadow is applied intentionally.

| Token         | Character                          |
| ------------- | ---------------------------------- |
| `none`        | Flat                               |
| `--shadow-xs` | Barely perceptible resting shadow  |
| `--shadow-sm` | Gentle lift                        |
| `--shadow-md` | Clear elevation (modals, popovers) |
| `--shadow-lg` | Strong floating presence           |
| `--shadow-xl` | Maximum drama (overlay-level)      |

### Focus Ring

Box-shadow-based, Tailwind/shadcn-compatible: `--ring` (color, = `--primary` at `--ring-opacity`), `--ring-width` (2px), `--ring-offset-width` (1px), `--ring-offset-color` (= `--background`), composed via `--ring-offset-shadow` + `--ring-shadow` (`--shadow-ring`). Components keep a same-geometry transparent outline (`--outline-*`) so forced-colors/high-contrast modes still show focus.

### Animation

Spring easing (`--spring-easing`) with 0.333s duration. Fallback: `cubic-bezier(0.17, 0.84, 0.44, 1)`.

### Section Layout Patterns

- **Left-Label Layout**: Thin left column (eyebrow label, `--muted-foreground`) + right content column, separated by `--border`. Collapses to stacked on mobile.
- **Horizontal Rule Dividers**: `1px solid var(--border)` as lightweight section separators.
- **Tabbed Content Areas**: Tab bar revealing different content panes. Good for 3-7 product families.

### Breakpoints

`--breakpoint-xs` (640px) · `--breakpoint-sm` (768px) · `--breakpoint-md` (1024px) · `--breakpoint-lg` (1280px) · `--breakpoint-xl` (1536px)

---

## 6. Design Patterns

See [`PATTERNS.md`](PATTERNS.md) for page-level structure and house style. It currently covers:

- **Sentence case everywhere** — the default for all UI text unless the user asks otherwise
- **Page structure** — header (logo + desktop/mobile nav), `<main>` sections, footer
- **Heading group with CTAs** — eyebrow + heading + subheading + action buttons

Most other patterns fall out of the primitives and components directly (browse them at
`/docs/components`). A broader section library (hero variants, product grids, trust signals)
and whole **page-type outlines** (eCommerce landing, PLP, PDP, cart, checkout, account, B2B
quote) keyed to the archetypes are a planned future addition.
