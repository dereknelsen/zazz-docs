---
version: alpha
name: zazz-ecommerce-design
description: A conversion-focused eCommerce design system built on Zazz foundations. Zazz combines editorial typography with emotive imagery to create B2B, wholesale, and retail experiences that feel trustworthy, brand-authentic, and premium without pretension — helping buyers make purchasing decisions quickly and confidently.
colorMode: light dark

colors:
  # All values are OKLCH — the authoritative token format (HEX is imprecise for our scales).
  # Theme (light mode values shown, dark mode swaps automatically)
  background: "oklch(0.9911 0 0)"
  foreground: "oklch(0.241 0.009 285.7)"
  border: "oklch(0.871 0.004 286.58)"
  border-foreground: "oklch(1 0 0 / 0.95)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.241 0.009 285.7)"
  input: "oklch(0.9911 0 0)"
  input-foreground: "oklch(0.241 0.009 285.7)"

  # Overlay
  muted-foreground: "oklch(0.198 0.008 285.68 / 0.6)"
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
    lineHeight: 1
    letterSpacing: -0.025em
  h1:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 4.77rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.025em
  h2:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 3.81rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.025em
  h3:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 3.05rem
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.02em
  h4:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 2.44rem
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.01em
  h5:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 1.95rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.025em
  h6:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 1.56rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.0025em
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
    fontSize: 0.83rem
    fontWeight: 400
    lineHeight: 1.5
  body-xs:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 0.69rem
    fontWeight: 400
    lineHeight: 1.5
  eyebrow:
    fontFamily: Geist, Verdana, sans-serif
    fontSize: 0.69rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.12em
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
  none: 0px
  xs: 4px
  sm: 6px
  md: 10px
  lg: 16px
  xl: 28px
  full: 9999px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  button-tertiary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.tertiary-foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  button-default:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  button-ghost:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.md}"
    padding: 10px
  button-outline:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.border-foreground}"
    rounded: "{rounded.md}"
    padding: 10px
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
  badge:
    backgroundColor: "{colors.border}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: 4px
  badge-info:
    backgroundColor: "{colors.info}"
    textColor: "{colors.info-foreground}"
    rounded: "{rounded.full}"
    padding: 4px
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.success-foreground}"
    rounded: "{rounded.full}"
    padding: 4px
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.warning-foreground}"
    rounded: "{rounded.full}"
    padding: 4px
  badge-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    rounded: "{rounded.full}"
    padding: 4px

fonts:
  body: Geist, Verdana, sans-serif
  heading: Geist, Verdana, sans-serif
  mono: '"Geist Mono", "Palatino Linotype", sans-serif'
roundness: medium
---

> **🎨 CRITICAL: Update Palette, Theme, & Logo**
>
> If a url or instructions for how to update the brand is provided along with this file you must **always update the palette tokens and theme tokens to match** as precisely as is reasonable. If a logo can be pulled from the provided website link, **make sure you include the logo in the header and footer**.

# Design System: Zazz Design System

## 1. Visual Theme & Atmosphere

Zazz is a conversion-focused eCommerce branch of Zazz — built for B2B, wholesale, and retail frontends that help buyers make purchasing decisions quickly while feeling trustworthy, brand-authentic, and premium without pretension. The aesthetic balances clean commerce mechanics with emotive brand storytelling, using editorial serif-italic accents in typography to elevate product narratives.

Surfaces are clean and product-forward: cards float on subtle backgrounds, accent-colored sections punctuate the scroll with gravitas, and hero imagery establishes emotional resonance before the commerce begins. The overall density is generous — letting products breathe in well-spaced grids while testimonials and brand messaging occupy full-bleed accent bands.

Light mode feels like a premium catalog: crisp surfaces with photographic warmth. Dark mode maintains the same trustworthy character with deeper tones. Typography mixes clean sans-serif body copy with italic serif display words for emphasis ("_quality_", "_value_", "_trusted_") — an editorial cadence that elevates products into brand storytelling.

### Site Archetypes

Zazz storefronts fall along a spectrum of visual density and brand emphasis. Before designing, identify which archetype fits the client:

| Archetype                  | Character                                                                                                                                                                      | Typical Clients                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **Industrial Distributor** | Function-first, catalog-dense, account-gated. Bold typography, prominent search, minimal atmosphere. Speed and clarity over beauty. Categories and product discovery dominate. | Packaging, safety, industrial supplies, janitorial, electrical     |
| **Lifestyle Brand**        | Balanced — product-forward with brand storytelling. Carousels, seasonal collections, family-of-brands showcases. Aspirational photography with commerce mechanics.             | Lighting, furniture, home goods, apparel, building materials       |
| **Editorial Studio**       | Gallery-like, story-driven, generous whitespace. Video heroes, craft narratives, minimal navigation, asymmetric layouts. The brand story IS the conversion mechanism.          | Artisan goods, luxury, design-forward manufacturers, made-to-order |

**Choosing an archetype affects:**

- **Density** — Distributors show more products per viewport; studios show fewer with more atmosphere
- **Navigation complexity** — Distributors need mega-menus and deep taxonomy; studios keep navigation minimal
- **Hero treatment** — Distributors may skip heroes entirely for search-first layouts; studios invest heavily in storytelling heroes
- **Trust signals** — Distributors lean on account benefits and brand logos; studios lean on craft narratives and project photography
- **Typography intensity** — Distributors use straightforward headlines; studios use editorial serif-italic pairings extensively

Most B2B bulk eCommerce clients fall between Industrial Distributor and Lifestyle Brand. Default to Lifestyle Brand when unclear — it balances conversion with brand investment.

---

## 2. Color Palette & Roles

### Theme (Mode-Aware Role Tokens)

These are the primary surface you style against. They automatically swap between light and dark modes.

| Token                 | Light Value (OKLCH)                                        | Dark Value (OKLCH)                                  | Role                                            |
| --------------------- | ---------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------- |
| `--background`        | `oklch(0.9911 0 0)` · near-white, zero chroma (neutral-50) | `oklch(0.198 0.008 285.68)` · blue-violet black     | Page surface everything sits on                 |
| `--foreground`        | `oklch(0.241 0.009 285.7)` · rich charcoal (neutral-900)   | `oklch(1 0 0)` · pure white                         | Default text color                              |
| `--border`            | `oklch(0.871 0.004 286.58)` · soft cool gray (neutral-200) | `oklch(0.336 0.014 285.66)` · deep gray             | 1px lines and dividers                          |
| `--border-foreground` | `oklch(1 0 0 / 0.95)` · near-opaque white tint (tint-950)  | `oklch(1 0 0 / 0.1)` · subtle white tint (tint-100) | Text on outlined/bordered elements              |
| `--card`              | `oklch(1 0 0)` · pure white                                | `oklch(0.241 0.009 285.7)` · dark charcoal          | Card surface, one step elevated from background |
| `--card-foreground`   | `oklch(0.241 0.009 285.7)` · rich charcoal                 | `oklch(1 0 0)` · pure white                         | Text on cards                                   |
| `--input`             | `oklch(0.9911 0 0)` · near-white (neutral-50)              | `oklch(1 0 0 / 0.05)` · barely-there tint (tint-50) | Input field background                          |
| `--input-foreground`  | `oklch(0.241 0.009 285.7)` · rich charcoal                 | `oklch(1 0 0)` · pure white                         | Input text                                      |

### Overlay Tokens

| Token                | Light Value (OKLCH)                           | Dark Value (OKLCH)                            | Role                                                             |
| -------------------- | --------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------- |
| `--muted`            | `oklch(0.198 0.008 285.68 / 0.05)` · shade-50 | `oklch(1 0 0 / 0.05)` · tint-50               | Subtle dim over what sits below — always darker than its surface |
| `--muted-foreground` | `oklch(0.198 0.008 285.68 / 0.6)` · shade-600 | `oklch(1 0 0 / 0.6)` · tint-600               | De-emphasized text, helper copy                                  |
| `--faded`            | `oklch(1 0 0 / 0.1)` · tint-100               | `oklch(0.198 0.008 285.68 / 0.1)` · shade-100 | Subtle fade — always lighter than its surface                    |
| `--faded-foreground` | `oklch(1 0 0 / 0.6)` · tint-600               | `oklch(0.198 0.008 285.68 / 0.6)` · shade-600 | Text on faded surfaces                                           |

### Brand (Corporate Scales)

| Token                    | Light Step                                                        | Dark Step                                                         | Character                             |
| ------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------- |
| `--primary`              | `--primary-600` · `oklch(0.511 0.23 276.97)` · deep blue-violet   | `--primary-500` · `oklch(0.593 0.193 280.79)` · vivid blue-violet | Primary brand actions and accents     |
| `--primary-foreground`   | `oklch(1 0 0)` · white                                            | `oklch(1 0 0)` · white                                            | Text on primary surfaces              |
| `--secondary`            | `--secondary-600` · `oklch(0.61 0.194 36.8)` · warm burnt orange  | `--secondary-500` · `oklch(0.687 0.198 34.85)` · rich warm orange | Secondary brand, complementary warmth |
| `--secondary-foreground` | `oklch(1 0 0)` · white                                            | `oklch(1 0 0)` · white                                            | Text on secondary surfaces            |
| `--tertiary`             | `--tertiary-500` · `oklch(0.613 0.208 14.68)` · vibrant rose-pink | `--tertiary-400` · `oklch(0.693 0.163 13.04)` · bright rose-pink  | Callouts, seasonal, promotional       |
| `--tertiary-foreground`  | `oklch(1 0 0)` · white                                            | `oklch(1 0 0)` · white                                            | Text on tertiary surfaces             |

Brand steps **lighter** in dark mode for readability on dark backgrounds.

### Corporate Color Scales (50–950)

Full 11-step scales for each brand color, all in OKLCH:

**Primary** — Blue-violet (~276–286° hue, high chroma)

```
--primary-50:  oklch(0.984 0.007 286.46)  /* #f9f9fe */
--primary-100: oklch(0.94 0.025 288.37)   /* #eae9fc */
--primary-200: oklch(0.85 0.068 285.81)   /* #c9c8f9 */
--primary-300: oklch(0.765 0.108 284.76)  /* #aba9f5 */
--primary-400: oklch(0.674 0.154 283.18)  /* #8b87f1 */
--primary-500: oklch(0.593 0.193 280.79)  /* #6e68ec */
--primary-600: oklch(0.511 0.23 276.97)   /* #4f46e5 */
--primary-700: oklch(0.421 0.234 273.27)  /* #3225c9 */
--primary-800: oklch(0.32 0.179 273.06)   /* #1f168b */
--primary-900: oklch(0.229 0.127 273.39)  /* #100a56 */
--primary-950: oklch(0.158 0.088 274.05)  /* #060331 */
```

**Secondary** — Warm orange (~25–37° hue)

```
--secondary-50:  oklch(0.984 0.008 27.43)  /* #fff8f7 */
--secondary-100: oklch(0.95 0.023 24.19)   /* #fee9e7 */
--secondary-200: oklch(0.878 0.061 25.87)  /* #fdc8c2 */
--secondary-300: oklch(0.814 0.101 27.69)  /* #fda99e */
--secondary-400: oklch(0.749 0.146 30.02)  /* #fc8775 */
--secondary-500: oklch(0.687 0.198 34.85)  /* #fc603a */
--secondary-600: oklch(0.61 0.194 36.8)    /* #de4917 */
--secondary-700: oklch(0.5 0.159 36.84)    /* #aa360f */
--secondary-800: oklch(0.383 0.121 36.98)  /* #762307 */
--secondary-900: oklch(0.276 0.088 36.22)  /* #4a1203 */
--secondary-950: oklch(0.215 0.068 37.62)  /* #320a01 */
```

**Tertiary** — Rose-pink (~11–17° hue)

```
--tertiary-50:  oklch(0.984 0.006 17.54)   /* #fef8f8 */
--tertiary-100: oklch(0.942 0.023 11.04)   /* #fbe6e8 */
--tertiary-200: oklch(0.861 0.062 11.02)   /* #f7c1c7 */
--tertiary-300: oklch(0.772 0.11 12.13)    /* #f297a2 */
--tertiary-400: oklch(0.693 0.163 13.04)   /* #ef6b7f */
--tertiary-500: oklch(0.613 0.208 14.68)   /* #e5375b */
--tertiary-600: oklch(0.523 0.177 14.77)   /* #b92b48 */
--tertiary-700: oklch(0.432 0.147 14.69)   /* #8f1f36 */
--tertiary-800: oklch(0.334 0.114 14.76)   /* #641223 */
--tertiary-900: oklch(0.244 0.083 14.99)   /* #3f0813 */
--tertiary-950: oklch(0.197 0.068 15.17)   /* #2d040b */
```

### Grayscale — Neutrals with a Blue-Violet Cast (~286° hue, low chroma)

```
--white:       white                       /* #ffffff */
--neutral-50:  oklch(0.9911 0 0)            /* #fcfcfc */
--neutral-100: oklch(0.9581 0 0)            /* #f1f1f1 */
--neutral-200: oklch(0.871 0.004 286.58)   /* #d4d4d7 */
--neutral-300: oklch(0.794 0.007 286.38)   /* #bbbbc0 */
--neutral-400: oklch(0.708 0.009 286.28)   /* #a0a0a6 */
--neutral-500: oklch(0.629 0.012 286.12)   /* #888890 */
--neutral-600: oklch(0.535 0.015 285.91)   /* #6c6c76 */
--neutral-700: oklch(0.442 0.015 285.82)   /* #52525b */
--neutral-800: oklch(0.336 0.014 285.66)   /* #36363e */
--neutral-900: oklch(0.241 0.009 285.7)    /* #1f1f24 */
--neutral-950: oklch(0.198 0.008 285.68)   /* #151519 */
--black:       black                       /* #000000 */
```

### Shade — Darkened Overlays (derived from `--neutral-950`)

Alpha-based overlays for dimming. Steps from 0% to 100% opacity:

```
--shade-none → 0 opacity    /* #15151900 */
--shade-50   → 0.05         /* #1515190d */
--shade-100  → 0.10         /* #1515191a */
--shade-200  → 0.20         /* #15151933 */
--shade-300  → 0.30         /* #1515194d */
--shade-400  → 0.40         /* #15151966 */
--shade-500  → 0.50         /* #15151980 */
--shade-600  → 0.60         /* #15151999 */
--shade-700  → 0.70         /* #151519b3 */
--shade-800  → 0.80         /* #151519cc */
--shade-900  → 0.90         /* #151519e6 */
--shade-950  → 0.95         /* #151519f2 */
--shade-full → 1.00         /* #151519 */
```

### Tint — Lightened Overlays (derived from `--white`)

Alpha-based overlays for fading lighter. Same step structure as shade (0.05–1.00 opacity):

```
--tint-none → 0 opacity     /* #ffffff00 */
--tint-50   → 0.05          /* #ffffff0d */
--tint-100  → 0.10          /* #ffffff1a */
--tint-200  → 0.20          /* #ffffff33 */
--tint-300  → 0.30          /* #ffffff4d */
--tint-400  → 0.40          /* #ffffff66 */
--tint-500  → 0.50          /* #ffffff80 */
--tint-600  → 0.60          /* #ffffff99 */
--tint-700  → 0.70          /* #ffffffb3 */
--tint-800  → 0.80          /* #ffffffcc */
--tint-900  → 0.90          /* #ffffffe6 */
--tint-950  → 0.95          /* #fffffff2 */
--tint-full → 1.00          /* #ffffff */
```

### Status Colors

| Token           | Light (OKLCH)                 | Dark (OKLCH)                  | Role                                            |
| --------------- | ----------------------------- | ----------------------------- | ----------------------------------------------- |
| `--info`        | `oklch(0.5876 0.1389 241.97)` | `oklch(0.5 0.1193 242.75)`    | Informational notices — cerulean blue           |
| `--success`     | `oklch(0.596 0.1274 163.23)`  | `oklch(0.5081 0.1049 165.61)` | Positive confirmations — teal green             |
| `--warning`     | `oklch(0.6658 0.1574 58.32)`  | `oklch(0.5553 0.1455 49)`     | Cautionary alerts — amber gold                  |
| `--destructive` | `oklch(0.5771 0.2152 27.33)`  | `oklch(0.5054 0.1905 27.52)`  | Errors, irreversible actions — vivid red-orange |

All status foregrounds are white. Status steps **darker** in dark mode (opposite of brand) so alerts don't dominate a dark surface.

---

## 3. Typography Rules

### Font Families

| Token            | Stack                                         | Role                      |
| ---------------- | --------------------------------------------- | ------------------------- |
| `--font-body`    | Geist, Verdana, sans-serif                    | Body copy, UI text        |
| `--font-heading` | Geist, Verdana, sans-serif                    | Headings and display text |
| `--font-mono`    | "Geist Mono", "Palatino Linotype", sans-serif | Code, tabular data        |

In code these point at `--font-geist-sans` / `--font-geist-mono` (supplied by the app's `geist/font` loader). A vanilla or Astro project must define those variables or override `--font-body` / `--font-heading` / `--font-mono` to a real stack — otherwise text falls back to the browser default.

### Weights

| Token              | Value          | Usage                       |
| ------------------ | -------------- | --------------------------- |
| `--weight-body`    | 400 (Regular)  | All body text               |
| `--weight-heading` | 600 (Semibold) | All headings, display       |
| `--weight-strong`  | 500 (Medium)   | Bold/strong inline emphasis |
| `--weight-mono`    | 400 (Regular)  | Monospace text              |
| `--weight-eyebrow` | 500 (Medium)   | Eyebrow labels              |

### Fluid Type Scale (Mobile → Desktop via `clamp()`)

Values below are the actual declarations from `_variables.css` (fluid `clamp()` interpolating on `vi`, the viewport-inline unit). Don't hand-edit — regenerate via the Utopia flow.

| Class          | Size Range        | `clamp()` Value                                     | Leading | Tracking  | Character                                 |
| -------------- | ----------------- | --------------------------------------------------- | ------- | --------- | ----------------------------------------- |
| `text-display` | 2.57rem → 5.96rem | `clamp(2.5658rem, 1.0227rem + 6.1721vi, 5.9605rem)` | 1       | -0.025em  | Massive hero statement, tight as a drum   |
| `text-h1`      | 2.28rem → 4.77rem | `clamp(2.2807rem, 1.1499rem + 4.523vi, 4.7684rem)`  | 1       | -0.025em  | Primary page heading                      |
| `text-h2`      | 2.03rem → 3.81rem | `clamp(2.0273rem, 1.2148rem + 3.2498vi, 3.8147rem)` | 1       | -0.025em  | Section heading                           |
| `text-h3`      | 1.80rem → 3.05rem | `clamp(1.802rem, 1.234rem + 2.2722vi, 3.0518rem)`   | 1.05    | -0.02em   | Subsection heading                        |
| `text-h4`      | 1.60rem → 2.44rem | `clamp(1.6018rem, 1.2202rem + 1.5265vi, 2.4414rem)` | 1.05    | -0.01em   | Component heading                         |
| `text-h5`      | 1.42rem → 1.95rem | `clamp(1.4238rem, 1.1832rem + 0.9624vi, 1.9531rem)` | 1.1     | -0.025em  | Small heading                             |
| `text-h6`      | 1.27rem → 1.56rem | `clamp(1.2656rem, 1.1307rem + 0.5398vi, 1.5625rem)` | 1.1     | -0.0025em | Minor heading                             |
| `text-xl`      | 1.27rem → 1.56rem | `clamp(1.2656rem, 1.1307rem + 0.5398vi, 1.5625rem)` | 1.5     | 0         | Large body / intro paragraph (shares h6)  |
| `text-lg`      | 1.13rem → 1.25rem | `clamp(1.125rem, 1.0682rem + 0.2273vi, 1.25rem)`    | 1.5     | 0         | Lead text                                 |
| `text-md`      | 1.00rem (static)  | `clamp(1rem, 1rem + 0vi, 1rem)`                     | 1.6     | 0         | Default body text                         |
| `text-sm`      | 0.80rem → 0.89rem | `clamp(0.8rem, 0.9293rem + -0.1616vi, 0.8889rem)`   | 1.5     | 0         | Small UI labels                           |
| `text-xs`      | 0.64rem → 0.79rem | `clamp(0.64rem, 0.8584rem + -0.273vi, 0.7901rem)`   | 1.5     | 0         | Captions, fine print                      |
| `text-eyebrow` | 0.64rem → 0.79rem | `clamp(0.64rem, 0.8584rem + -0.273vi, 0.7901rem)`   | 1.2     | 0.12em    | Uppercase label, wide-tracked (shares xs) |

Headings use `text-wrap: balance` and `font-optical-sizing: auto`. Body text uses `text-wrap: pretty`. The overall feel is tight-leading on large text, generous-leading on body. For long-form copy, wrap blocks in `.text-prose` — it gaps children with `--gap-sm` and applies per-style top margins (`--margin-*`) automatically.

### Text Link

- **Class:** `.text-link`
- **Color:** `--primary`
- **Decoration:** Underline, `text-decoration-thickness: 1px`, `text-underline-offset: 1px`.
- **Hover:** `text-underline-offset: 2px` — subtle lift of the underline on interaction.

---

## 4. Component Stylings

Zazz ships **eight example components** (`app/zazz/components/` + matching `app/zazz/styles/_*.css`): **Accordion, Badge, Button, Dialog, Dropdown, Navigation menu, Section, and the Form family** (Input, Textarea, Select, Input-group, Checkbox, Switch, Radio). They're dependency-free — native HTML and platform APIs (Popover API, CSS anchor positioning, Invoker Commands, native `<dialog>`/`<details>`, customizable `<select>`, `field-sizing`, `:has()`, `:user-invalid`) carry behavior, so most work with **zero JavaScript**.

**Two conventions to internalize:**

- **Variants are data attributes, not modifier classes.** `[data-variant="primary|muted|ghost|link"]`, `[data-size="icon"]` (and `[data-side]`/`[data-align]`/`[data-layout]` for the popover components). Write `class="button" data-variant="primary"` — never `button-primary`.
- **Theming hooks are local custom properties.** A component declares `--button-background`, `--button-radius`, etc. off theme roles, then a `[data-variant]` block re-points those locals. Retune by overriding the local prop. (This is also why there are no `--radius-button`/`--radius-card` primitive tokens — a component aliases the semantic scale itself, e.g. `--button-radius: var(--radius-md)`.)

### Buttons

- **Shape:** Subtly rounded via `--button-radius` (= `--radius-md`, ~10px). Fixed height `--button-height` (= `--step-8`, 2rem). Inline padding `--button-padding` (= `--step-2_5`, 0.625rem).
- **Default variant:** `--background` fill, `1px solid var(--border)`, `--foreground` text. Hover paints `--muted`.
- **Primary variant** (`data-variant="primary"`): solid `--primary` with `--primary-foreground` text. The page's single most important action.
- **Muted variant** (`data-variant="muted"`): `--muted` fill, no visible border.
- **Ghost variant** (`data-variant="ghost"`): transparent, hover reveals `--muted`. Toolbars, tertiary actions.
- **Link variant** (`data-variant="link"`): inline text-style, underlined, no box; `--primary` on hover.
- **Small size** (`data-size="sm"`): compact height/padding for dense rows and addons.
- **Icon sizes** (`data-size="icon"` / `data-size="icon-sm"`): square (`--button-height` × `--button-height`, or the smaller variant), no padding.
- **Active:** subtle alpha shift on the fill. **Focus-visible:** the outline ring (see §5 Focus Ring) — transparent at rest, `outline-color: var(--ring)` on `:focus-visible`.
- **Typography:** `--font-body`, `--font-size-sm`, `--weight-strong`, line-height 1. **Icon ↔ label gap:** `--button-gap` (= `--step-1`). An `<svg>` child auto-sizes to `--button-icon-size` (= `--step-4`).

### Badges

The button's smaller, label-y sibling (tags, pills, chips) — same variant/local-prop structure.

- **Shape:** `--badge-radius` (= `--radius-sm`, ~6px) — _not_ a full pill; it's gently rounded to read as a small chip.
- **Metrics:** height `--badge-height` (= `--step-5`), inline padding `--step-2`, icon `--step-3`.
- **Typography:** `--font-size-xs`, `--weight-strong`.
- **Variants/sizes:** same names as button (default, `primary`, `muted`, `ghost`, `link`, plus `data-size="icon"`). Interactive states apply only to `button.badge` / `a[href].badge`.

### Dialog

Native `<dialog>` opened/closed via the **Invoker Commands API** (`button[command="show-modal"][commandfor="id"]` / `command="close"`), `closedby="any"` for backdrop dismissal — no JS.

- **Surface:** `--card` background, `--card-foreground`, `--shadow-md`, `--radius-lg`, `overflow: clip`.
- **Anatomy:** `.dialog__content` (scrolls), `.dialog__header`, `.dialog__body`, sticky `.dialog__footer` (border-top, `--gap-xs` between actions).
- **Sizes** (`data-size`): none → `--article` (~40rem); `large` → `--container` (~80rem); `screen` → viewport minus `--gap-md`.
- **Backdrop:** animates `--shade-none` → `--shade-800` (deliberately shade, so it dims in both modes; `--muted` would lighten in dark).
- **Animation:** scale 0.98 → 1 with spring easing via `@starting-style` (wired in `_reset.css`).

### Dropdown & Navigation menu

Click-to-open panels on the **Popover API** + **CSS anchor positioning** (`anchor-name`/`anchor-scope` on the trigger, `position-anchor` + the shared `--popover-*` vars on the panel). Native light-dismiss; no JS.

- **Dropdown** (`.dropdown` + `.dropdown__popover`): `data-side` (bottom/top/left/right) × `data-align` (start/center/end) place the panel; `position-try-fallbacks` flips it on overflow. Menu items are `.button[data-variant="ghost"]` with `justify-start`.
- **Navigation menu** (`.navigation-menu` + `__list`/`__item`/`__trigger`/`__popover`): horizontal nav with rich panels. `data-layout="featured"` gives a two-column callout-plus-links mega-panel; the chevron rotates via `:has(... :popover-open)`. `data-size="full"` spans full width.

### Cards (composition pattern — not a shipped partial)

There's no `_card.css`; build a card from the block + utilities + tokens.

- **Surface:** `--card` / `--card-foreground`, `1px solid var(--border)`, `--radius-lg`.
- **Padding:** `--gap-md`. **Figure radius:** `--radius-md` (~half the card, for clean nested corners). **Default figure aspect:** 3 / 2.
- **Shadows:** apply via `.shadow-*` utilities — not baked in by default.

### Forms (shipped: `.input` · `.textarea` · `.select` · `.input-group` · checkbox · switch · `.radio`)

A family of native form controls styled from Zazz tokens, split across `_form.css` (shared glue) and one file per control. No JS drives behavior — the browser handles validation, the customizable `<select>` picker, `field-sizing` growth, and checked/indeterminate states. **Shared `--field-*` tokens** (declared in `_form.css` on `.input, .textarea, .select, .input-group`) make a text input, dropdown, and message box read as one set; alias one local to retune them all: `--field-background` (= `--input`), `--field-foreground`, `--field-border` (= `--border`), `--field-border--hover` (border darkened 0.1 L), `--field-border--focus` (= `--primary`), `--field-radius` (= `--radius-md`), `--field-height` (= `--step-8`, matches the button), `--field-padding` (= `--step-2_5`), `--field-icon-size` (= `--step-4`).

- **`.field` wrapper** — optional layout helper. A grid stacking `.field__label` (row 1), the control (row 2), and `.field__hint` / `.field__error` (shared row 3, so only the visible message takes space). `[data-inline]` switches to a row for checkbox/radio/switch (control beside its label).
- **Validation via `:user-invalid`** — wrap a control in `.field` with a `.field__error`. The error reveals (and the hint hides) only after the user **commits** a value (blur/submit), never while typing. Invalid controls flip `--field-border`/`--ring`/label to `--destructive`. Hint↔error swap animates with `@starting-style` + `content-visibility` `allow-discrete`.
- **`.input`** — one class for every text-like type (text, email, tel, url, search, password, number, date…); the `type` only swaps the keyboard/picker, the box is identical. Border transitions to `--primary` on hover/focus; outline ring on `:focus-visible` (see §5).
- **`.textarea`** — auto-grows via `field-sizing: content`, clamped between `5lh` and `12lh`, then scrolls; `resize: vertical`.
- **`.select`** — customizable `<select>` (`appearance: base-select`): a `<button><selectedcontent></selectedcontent></button>` trigger plus a styled `::picker(select)`, `<option>`s, `::picker-icon` (chevron, rotates on `:open`), and `::checkmark`. The picker is styled like the card popovers (`--card`, `--shadow-md`, anchored width); the checked option uses `--primary-100` fill + `--primary` text + strong weight (never color alone). Degrades to the native OS dropdown where unsupported.
- **`.input-group`** — a shadcn-style bordered shell (authored as a `<label>`) fusing a control with addons; `:focus-within` lifts the whole shell while the nested control goes borderless/transparent so it reads as one field. Addons (`.input-group__addon`) come **after** the control in the DOM for predictable tab order and are positioned with `data-align`: `inline-start` (default) · `inline-end` · `block-start` · `block-end` (the `block-*` values span a full-width row — that's how a textarea grows a toolbar above or below it). `.input-group__text` holds units/protocols/handles ("https://", "USD", "@user"); embedded `.button`s pick up `--field-button-radius` (= `--radius-sm`).
- **Checkbox** (`input[type="checkbox"]:not([role="switch"])`, styled in `_reset.css`) — `appearance: none` redraws the box from `--checkbox-*` tokens; fills `--primary` with a check (`:checked`) or dash (`:indeterminate`) SVG mask. `indeterminate` has no HTML attribute — set it in JS (`el.indeterminate = true`).
- **Switch** (`input[role="switch"]`, styled in `_reset.css`) — a pill track (`--muted` → `--primary` on `:checked`) with a `--white` thumb that slides; `--switch-*` tokens.
- **`.radio`** (+ `.radio-group`) — `appearance: none` redraws the circle; the checked dot is a `radial-gradient` so it tracks `--primary-foreground`, not color alone. Group by shared `name`; `.radio-group` is a flex-column `<fieldset>` for an accessible labelled set.
- **Disabled** (shared) — `opacity: 0.5` + `cursor: not-allowed` across every control.
- **Labels:** always provide one (visible `.field__label` or `.sr-only`). **Placeholder:** 50% of `currentcolor`. **Text selection:** `::selection` uses `--primary` with legible text via `contrast-color()`.

---

## 5. Layout Principles

### Container Widths (Self-Padding via `min()`)

| Class        | Token         | Resolved Width                         | Purpose                    |
| ------------ | ------------- | -------------------------------------- | -------------------------- |
| `.container` | `--container` | `min(80rem, 100% - var(--gap-md) * 2)` | Full-width content wrapper |
| `.article`   | `--article`   | `min(40rem, 100% - var(--gap-md) * 2)` | Reading-width content      |

Both self-pad — no extra wrapper div or `px-*` needed. Both register as container query containers.

### Breakpoints (for calculations and container queries)

| Token         | Value          |
| ------------- | -------------- |
| `--screen-xs` | 40rem (640px)  |
| `--screen-sm` | 48rem (768px)  |
| `--screen-md` | 64rem (1024px) |
| `--screen-lg` | 80rem (1280px) |
| `--screen-xl` | 96rem (1536px) |

### Spacing Scale

**Semantic gaps** — reach for these first:

| Token      | Resolves To | Computed (at 16px base) | Use For                                 |
| ---------- | ----------- | ----------------------- | --------------------------------------- |
| `--gap-xs` | `--step-2`  | 0.5rem (8px)            | Tight grouping, button rows             |
| `--gap-sm` | `--step-4`  | 1rem (16px)             | Default component internal gap, gutters |
| `--gap-md` | `--step-6`  | 1.5rem (24px)           | Card padding, section internal spacing  |
| `--gap-lg` | `--step-11` | 2.75rem (44px)          | Large component separation              |
| `--gap-xl` | `--step-24` | 6rem (96px)             | Section-level vertical rhythm           |

**Step scale** — escape hatch when gaps don't fit. Base interval `--spacing-interval` is a responsive `clamp(0.225rem, 0.2136rem + 0.0455vw, 0.25rem)` (settles at 0.25rem / 4px on desktop, shrinks slightly on small viewports), multiplied by the step number (`--step-1` = 1×, `--step-4` = 4×, `--step-8` = 8×, etc.). Runs from `--step-px` through `--step-96`, plus `--step-full` (100%). Because the interval is fluid, the steps — and the gaps and radii built on them — track viewport size.

### Spacing Utility Classes

**CRITICAL**: When using spacing in HTML, apply these utility classes directly. Each class resolves to its corresponding `--gap-*` token. All use `:where()` for zero specificity.

**Gap** (for flex/grid containers):

```css
.gap-xs {
  gap: var(--gap-xs);
} /* 8px */
.gap-sm {
  gap: var(--gap-sm);
} /* 16px */
.gap-md {
  gap: var(--gap-md);
} /* 24px */
.gap-lg {
  gap: var(--gap-lg);
} /* 44px */
.gap-xl {
  gap: var(--gap-xl);
} /* 96px */
```

**Padding** — all-sides, inline (px), block (py), and individual sides (pt/pr/pb/pl):

```css
/* All sides */
.p-xs {
  padding: var(--gap-xs);
}
.p-sm {
  padding: var(--gap-sm);
}
.p-md {
  padding: var(--gap-md);
}
.p-lg {
  padding: var(--gap-lg);
}
.p-xl {
  padding: var(--gap-xl);
}

/* Horizontal (inline) */
.px-xs {
  padding-inline: var(--gap-xs);
}
.px-sm {
  padding-inline: var(--gap-sm);
}
.px-md {
  padding-inline: var(--gap-md);
}
.px-lg {
  padding-inline: var(--gap-lg);
}
.px-xl {
  padding-inline: var(--gap-xl);
}

/* Vertical (block) */
.py-xs {
  padding-block: var(--gap-xs);
}
.py-sm {
  padding-block: var(--gap-sm);
}
.py-md {
  padding-block: var(--gap-md);
}
.py-lg {
  padding-block: var(--gap-lg);
}
.py-xl {
  padding-block: var(--gap-xl);
}

/* Individual sides: .pt-*, .pr-*, .pb-*, .pl-* follow the same pattern */
```

**Margin** — same structure as padding (m, mx, my, mt/mr/mb/ml), plus `auto` variants:

```css
.m-xs {
  margin: var(--gap-xs);
}
.mx-sm {
  margin-inline: var(--gap-sm);
}
.my-md {
  margin-block: var(--gap-md);
}
.mx-auto {
  margin-inline: auto;
}
.mt-auto {
  margin-top: auto;
}
/* All sides and directions available at xs/sm/md/lg/xl */
```

**Usage pattern** — always pair layout class with spacing class:

```html
<!-- Flex row with 16px gap between items -->
<div class="flex gap-sm">…</div>

<!-- Grid with 24px gutters -->
<section class="grid grid-cols-3 gap-md">…</section>

<!-- Card with internal padding -->
<div class="p-md rounded-lg">…</div>

<!-- Section vertical rhythm -->
<section class="py-xl">…</section>

<!-- Horizontal padding for edge-to-edge sections -->
<div class="px-md">…</div>
```

**Size suffixes are semantic, not numeric**: `xs` = tight (8px), `sm` = default (16px), `md` = comfortable (24px), `lg` = large (44px), `xl` = section-level (96px). Always use these named sizes — never raw pixel values.

### Radius Scale

| Token           | Resolves To               | Computed    | Description                                    |
| --------------- | ------------------------- | ----------- | ---------------------------------------------- |
| `--radius-none` | `0rem`                    | 0           | Sharp, squared-off edges                       |
| `--radius-xs`   | `--step-1` × multiplier   | ~4px        | Barely rounded, subtle softening               |
| `--radius-sm`   | `--step-1_5` × multiplier | ~6px        | Gently softened — default for badges           |
| `--radius-md`   | `--step-2_5` × multiplier | ~10px       | Subtly rounded — default for buttons & inputs  |
| `--radius-lg`   | `--step-4` × multiplier   | ~16px       | Generously rounded — default for cards/dialogs |
| `--radius-xl`   | `--step-7` × multiplier   | ~28px       | Prominently rounded, statement surfaces        |
| `--radius-full` | `9999rem`                 | Pill-shaped | Fully circular/capsular                        |

Radius can be globally scaled via `--radius-multiplier` (default `1`). Computed sizes track the fluid spacing interval (values shown at the ~4px settled interval). Utility classes are `rounded-none` … `rounded-xl`, `rounded-full` (the `rounded-*` prefix). There are no `--radius-button`/`--radius-card`/`--radius-input`/`--radius-badge` aliases — components alias the scale via a local prop (e.g. `--button-radius: var(--radius-md)`).

### Shadows & Elevation

Whisper-soft, multi-layered diffused shadows using OKLCH alpha from `--black`. The system provides five elevation levels; surfaces are flat by default — shadow is applied intentionally.

| Token           | Character                                                         |
| --------------- | ----------------------------------------------------------------- |
| `--shadow-none` | Completely flat, no depth                                         |
| `--shadow-xs`   | Barely perceptible resting shadow — 5-layer stack, max 0.05 alpha |
| `--shadow-sm`   | Gentle lift — subtle float off the surface                        |
| `--shadow-md`   | Clear elevation — modals, dropdowns, popovers                     |
| `--shadow-lg`   | Strong floating presence — elevated panels                        |
| `--shadow-xl`   | Maximum drama — overlay-level prominence                          |

```css
--shadow-none: 0px 0px 0px 0px oklch(from var(--black) l c h / 0);

--shadow-xs:
  0 8px 2px 0 oklch(from var(--black) l c h / 0), 0 5px 2px 0 oklch(from var(--black) l c h / 0.01),
  0 3px 2px 0 oklch(from var(--black) l c h / 0.03),
  0 1px 1px 0 oklch(from var(--black) l c h / 0.04), 0 0 1px 0 oklch(from var(--black) l c h / 0.05);

--shadow-sm:
  0 25px 7px 0 oklch(from var(--black) l c h / 0),
  0 16px 6px 0 oklch(from var(--black) l c h / 0.01),
  0 9px 5px 0 oklch(from var(--black) l c h / 0.03),
  0 4px 4px 0 oklch(from var(--black) l c h / 0.04),
  0 1px 2px 0 oklch(from var(--black) l c h / 0.05);

--shadow-md:
  0 66px 18px 0 oklch(from var(--black) l c h / 0),
  0 42px 17px 0 oklch(from var(--black) l c h / 0.01),
  0 24px 14px 0 oklch(from var(--black) l c h / 0.03),
  0 11px 11px 0 oklch(from var(--black) l c h / 0.04),
  0 3px 6px 0 oklch(from var(--black) l c h / 0.05);

--shadow-lg:
  0 247px 69px 0 oklch(from var(--black) l c h / 0),
  0 158px 63px 0 oklch(from var(--black) l c h / 0.01),
  0 89px 53px 0 oklch(from var(--black) l c h / 0.03),
  0 39px 39px 0 oklch(from var(--black) l c h / 0.05),
  0 10px 22px 0 oklch(from var(--black) l c h / 0.06);

--shadow-xl:
  0 370px 104px 0 oklch(from var(--black) l c h / 0),
  0 237px 95px 0 oklch(from var(--black) l c h / 0.01),
  0 133px 80px 0 oklch(from var(--black) l c h / 0.04),
  0 59px 59px 0 oklch(from var(--black) l c h / 0.06),
  0 15px 33px 0 oklch(from var(--black) l c h / 0.07);
```

### Focus Ring

The ring is **outline-based**, built from four tokens (there is no `--focus-ring` box-shadow):

```css
--ring: var(--primary); /* color */
--ring-style: solid;
--ring-size: 2px;
--ring-offset: 1px;
```

The reset applies it to every `:focus-visible`:

```css
:where(:focus-visible) {
  outline: var(--ring-size) var(--ring-style) var(--ring);
  outline-offset: var(--ring-offset);
}
```

Components keep a transparent outline at rest (so the ring doesn't shift layout) and switch only the color on focus: `outline: var(--ring-size) var(--ring-style) oklch(from var(--ring) l c h / 0)` → `outline-color: var(--ring)` on `:focus-visible`. There's a `.ring` utility that does the same. Always target `:focus-visible`, never `:focus`.

### Animation

```css
--spring-easing: linear(
  0,
  0.012 0.9%,
  0.049 2%,
  0.409 9.3%,
  0.513 11.9%,
  0.606 14.7%,
  0.691 17.9%,
  0.762 21.3%,
  0.82 25%,
  0.868 29.1%,
  0.907 33.6%,
  0.937 38.7%,
  0.976 51.3%,
  0.994 68.8%,
  1
);
--spring-duration: 0.333s;

--default-transition-timing-function: var(--spring-easing, cubic-bezier(0.17, 0.84, 0.44, 1));
--default-transition-duration: 0.333s;
```

- **Spring easing:** Custom `linear()` function approximating a spring curve — quick attack with natural overshoot settle.
- **Duration:** `--spring-duration: 0.333s` for all spring-based transitions.
- **Defaults:** `--default-transition-timing-function` and `--default-transition-duration` provide a single reference point for component transitions.
- **Fallback:** `cubic-bezier(0.17, 0.84, 0.44, 1)` (easeOutQuart) for browsers without `linear()` support.

### Root-Level Features

- `interpolate-size: allow-keywords` — enables discrete value animations (e.g. transitioning `height: auto`).
- `color-scheme: light dark` — declares both modes to the browser.

### Structural Reset Principles

- `box-sizing: border-box` on everything (including pseudo-elements and `::backdrop`).
- `body` is a flex column. `main` is a flex column with `min-height: 100svh` (prevents floating footers) and `z-index: isolate`.
- Headings inherit size/weight by default — typography is driven entirely by `text-*` utility classes.
- Media elements (`img`, `svg`, `video`, etc.) are `display: block` with `max-inline-size: 100%`.
- All utility classes use `:where()` for zero specificity — component styles always win without `!important`.

### Section Layout Patterns

Beyond simple stacked sections, Zazz supports structural patterns that create editorial rhythm:

**Left-Label Layout**

A two-column structure where a thin left column holds the section label and the right column holds the main content. Creates a magazine-like reading rhythm ideal for editorial or studio archetypes.

```
┌──────────────┬─────────────────────────────────────────┐
│ Section Label│  ─────────────────────────────────────── │
│ (eyebrow)    │  Main content: heading, body text,       │
│              │  imagery, CTAs                           │
└──────────────┴─────────────────────────────────────────┘
```

- Left column: `text-eyebrow` class, `--muted-foreground` color, fixed width (~12-16rem)
- Right column: flexible, holds all section content
- Separated by `1px solid var(--border)` vertical or horizontal rule
- On mobile: collapses to stacked — label above content with horizontal rule between
- Best for: brand story, newsletter, showroom, trade program, about sections

**Horizontal Rule Dividers**

Use `1px solid var(--border)` rules as lightweight section separators — an alternative to full-bleed colored bands or large `--gap-xl` spacing. Particularly effective for editorial/studio archetypes where visual calm should be maintained.

**Tabbed Content Areas**

A horizontal tab bar that reveals different content panes within a single visual block. Effective for businesses with 3-7 distinct product families or service categories where each has a distinct narrative.

- Tab bar: horizontal row of `text-sm` labels, `--border` bottom line, active tab uses `--primary` or `--foreground` indicator
- Tab panel: heading + description paragraph + CTA link + supporting image
- Compact — shows one category at a time without overwhelming scroll length
- Good for: product categories, service areas, material types, audience-specific content

---

## 6. Tailwind v4 + shadcn Integration

### The model: variables in, a few utilities borrowed

In a Tailwind/shadcn project, **Zazz owns the design tokens; Tailwind and shadcn own the utility layer.** Don't import the whole framework — import only the variables (`_variables.css`, there is no `main.css`), bridge them into `@theme`, then opt into the handful of Zazz utilities Tailwind can't reproduce (typography, `.container`/`.article`, shade/tint overlays, the tuned shadows). Full walkthrough in `references/integrations.md`.

```css
@import "tailwindcss";
@import "./zazz/styles/_variables.css"; /* Zazz tokens + light/dark wiring */

@theme {
  /* Theme roles → color utilities (clean: Zazz names don't collide with --color-*) */
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

  /* Shade / tint overlays → bg-shade-800, bg-tint-100, etc. (map the steps you use) */
  --color-shade-800: var(--shade-800);
  --color-tint-100: var(--tint-100);

  /* Semantic spacing → p-md, gap-lg, m-sm */
  --spacing-xs: var(--gap-xs);
  --spacing-sm: var(--gap-sm);
  --spacing-md: var(--gap-md);
  --spacing-lg: var(--gap-lg);
  --spacing-xl: var(--gap-xl);
}
```

After this: `bg-primary` → `--primary`, `text-foreground` → `--foreground`, `bg-shade-800` → `--shade-800`, `p-md` → `--gap-md`. Mode swaps propagate automatically because the role tokens are mode-aware.

**Shadows and radius are the two namespace collisions.** Zazz's `--shadow-*` and `--radius-*` tokens share Tailwind's `--shadow-*` / `--radius-*` theme namespaces, so a bridge entry like `--shadow-md: var(--shadow-md)` is self-referential and won't resolve — that's why they're absent above. Either use Zazz's classes directly (`.shadow-*`; for radius let shadcn keep its `--radius` base and set it from a Zazz value like `--radius: var(--radius-md)`), or paste the literal Zazz values into `@theme`. Note the scales differ — Zazz `--radius-md` ≈ Tailwind's `rounded-lg`.

The four Zazz utilities worth opting into: the composed `text-*` typography (import `_typography.css`), `.container`/`.article` self-padding widths, shade/tint overlay colors (bridged above), and the tuned `.shadow-*` scale.

### shadcn/ui Compatibility

shadcn expects tokens named `--background`, `--foreground`, `--primary`, `--border`, `--card`, etc. — Zazz already provides them. Install shadcn components as normal; they pick up the theme without modification.

**Zazz-specific tokens not in default shadcn:**

- `--info`, `--success`, `--warning` — exposed via the `@theme` block as Tailwind utilities for your own components.
- `--tertiary` / `--tertiary-foreground` — Zazz's third brand slot (callouts, seasonal). Bridged for custom use.
- `--border-foreground` — for outlined buttons, ghost inputs, bordered tags.
- `--faded` / `--faded-foreground` — lighter overlay pair (shadcn only has muted).

### Typography: Zazz Wins

Prefer Zazz `text-*` classes over Tailwind `text-{size} font-{weight}` compositions. Zazz classes are tuned together (family + fluid size + weight + leading + tracking). Assembling from individual Tailwind utilities recreates the work and drifts from the system.

```html
<!-- Correct -->
<h1 class="text-h1">…</h1>
<p class="text-lg">…</p>

<!-- Avoid -->
<h1 class="text-5xl font-semibold leading-none tracking-tight">…</h1>
```

Zazz `text-*` uses `:where()` (zero specificity). If both a Tailwind utility and a Zazz class target the same element, Tailwind wins on specificity — so pick one. Default to Zazz.

### Spacing: Zazz Wins

Prefer Zazz spacing utility classes (`.gap-sm`, `.p-md`, `.py-xl`, `.mx-auto`) over raw Tailwind numeric spacing (e.g. `gap-4`, `p-6`, `py-24`). Zazz spacing uses semantic named sizes (`xs`/`sm`/`md`/`lg`/`xl`) that map to design tokens — not arbitrary numbers.

```html
<!-- Correct: Zazz semantic spacing -->
<div class="flex gap-sm">…</div>
<section class="py-xl">…</section>
<div class="grid grid-cols-3 gap-md p-md">…</div>

<!-- Avoid: Tailwind numeric spacing -->
<div class="flex gap-4">…</div>
<section class="py-24">…</section>
```

When generating CSS for these classes, each maps directly to its `--gap-*` token:

- `.gap-sm` → `gap: var(--gap-sm)` (16px)
- `.p-md` → `padding: var(--gap-md)` (24px)
- `.py-xl` → `padding-block: var(--gap-xl)` (96px)
- `.px-sm` → `padding-inline: var(--gap-sm)` (16px)

### Layout: Zazz Wins

Prefer Zazz `.container` and `.article` over Tailwind's `max-w-* mx-auto px-*` patterns. Zazz widths self-pad via `min()` and register container query names. No padding wrapper needed.

### Override Philosophy

When Tailwind defaults or shadcn defaults collide with Zazz, **default to Zazz**. The framework is the source of truth; Tailwind and shadcn are delivery mechanisms. Document a deliberate departure if you must depart.

## 7. Zazz Frontend Design Implementation Guide

This skill governs how to build distinctive, production-grade eCommerce and retail interfaces using the Zazz design system. All generated code must avoid generic "AI slop" aesthetics while strictly adhering to the Zazz token structure. Zazz interfaces should feel unique to the brand, trustworthy, and optimized for helping customers make buying decisions quickly.

### Design Thinking

Before coding, ground the design in the Zazz eCommerce character:

- **Purpose**: Commerce conversion — product discovery, trust-building, and purchase flow. The primary goal is helping buyers make purchasing decisions as quickly as possible. Who is the buyer? What story anchors the brand? Is this B2B (account-gated, bulk ordering, quote-driven) or D2C (impulse-friendly, aspirational)?
- **Archetype**: Identify the site archetype (see Section 1). Industrial Distributors need catalog density and speed. Lifestyle Brands balance product grids with brand investment. Editorial Studios lead with story. Most B2B bulk eCommerce clients fall between Distributor and Lifestyle.
- **Tone**: Premium commerce with personality. Think editorial product catalogs, trusted distributors, brands that feel established and reliable. Not cold tech minimalism, not trendy startup aesthetic — authentic, confident, premium without pretension.
- **Constraints**: Technical requirements (framework, performance, accessibility). Mobile-first product browsing. Fast-loading imagery. B2B buyers often work from desktop during business hours — optimize for both.
- **Differentiation**: What makes this brand feel _authentic_ at scale? The hero imagery, the italic-serif emphasis words, the palette-driven atmosphere unique to this brand.

**CRITICAL**: Zazz designs balance conversion mechanics (clear CTAs, product grids, trust signals) with brand storytelling (messaging, testimonials, premium photography). For B2B, "conversion" often means account creation, quote requests, or reorder flows rather than immediate checkout. The key is approachability with professionalism — never cold, never cluttered.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:

- Production-grade and conversion-optimized
- Trustworthy and brand-authentic
- Product-forward with generous white space
- Editorial in typography, emotive in imagery

### Aesthetics Guidelines

Focus on:

- **Typography**: Use the Zazz type scale (`text-display` through `text-xs`) as the backbone. For editorial emphasis, pair Geist with a classic serif italic (e.g., Playfair Display Italic, Cormorant Garamond Italic) for display accent words — "_trusted_", "_quality_", "_yours_". This serif-italic cadence elevates headlines into brand statements.
- **Color & Theme**: Let design tokens drive the palette. Use `--primary` to anchor brand identity and trust. Surface colors (`--card`, `--background`) let products shine. Use `--secondary` sparingly for CTAs and urgency. Leverage `--shade-*` for accent section backgrounds, `--tint-*` for soft card elevations.
- **Motion**: Use `--spring-easing` and `--spring-duration` for transitions. Subtle fade-and-rise on scroll for product cards. Smooth carousel transitions for product grids. Hero imagery can use gentle parallax or slow zoom. Nothing flashy — motion should feel confident and unhurried.
- **Spatial Composition**: Generous white space around product grids. Full-bleed accent sections for testimonials and brand messaging. Product cards in clean rows with consistent gutters (`--gap-sm`). Hero sections breathe with asymmetric text placement over emotive imagery.
- **Imagery**: Emotive, story-driven photography unique to the brand. Real products in lifestyle contexts. Avoid sterile studio shots — aim for atmosphere and authenticity that reflects what makes this brand distinct.
- **Trust Signals**: Customer testimonials styled with editorial typography. Partner logos in muted rows. Heritage or quality badges where appropriate. These aren't afterthoughts — they accelerate buying decisions.

NEVER use generic AI-generated aesthetics: cold tech minimalism, cliched startup palettes, sterile layouts, or designs that feel like templates. Zazz designs must feel unique to the brand and optimized for conversion.

Match implementation complexity to the retail context. Product grids need fast loading and clear hierarchy. Hero sections can be visually rich but must load progressively. Every element should reinforce trust and accelerate the path to purchase.

### Mandatory Token Rules

1. **Use Zazz tokens for all style values** — never hardcode colors, spacing, radii, shadows, or typography values that have a corresponding Zazz CSS custom property. Use `var(--token-name)` exclusively.
2. **Color via role tokens** — apply `--background`, `--foreground`, `--primary`, `--secondary`, `--tertiary`, `--muted`, `--faded`, `--card`, `--border`, `--destructive`, etc. Never use raw OKLCH/hex values directly in component styles.
3. **Spacing via the semantic scale** — use `--gap-xs` through `--gap-xl` (and `--step-*` as escape hatches). Do not invent arbitrary rem/px gaps.
4. **Typography via Zazz classes** — apply `.text-display`, `.text-h1`–`.text-h6`, `.text-lg`, `.text-md`, `.text-sm`, `.text-xs`, `.text-eyebrow`, `.text-link` for all text elements. Do not create ad-hoc font-size/line-height/letter-spacing combinations.
5. **Border-radius via tokens** — use `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`. Never hardcode `border-radius` pixel values.
6. **Shadows via tokens** — use `--shadow-xs` through `--shadow-xl`. Do not write custom box-shadow strings.
7. **Transitions via Zazz defaults** — use `--default-transition-duration` and `--default-transition-timing-function` (spring easing). For orchestrated motion use `--spring-duration` and `--spring-easing`.
8. **Dark mode for free** — because role tokens auto-swap via `@media (prefers-color-scheme: dark)` and `.dark`, designs get light/dark support automatically. Never write separate dark-mode overrides for values already handled by tokens.
9. **Utility classes where available** — prefer Zazz utilities (`.flex`, `.grid`, `.gap-*`, `.shadow-*`, `.rounded-*`, `.container`, `.article`, etc.) over inline styles or duplicated CSS when they exist.
10. **Never deviate from naming conventions** — the token names (`--primary`, `--primary-50`–`--primary-950` and the same for `--secondary`/`--tertiary`, `--shade-50`–`--shade-950`, `--tint-50`–`--tint-950`, `--neutral-*`, etc.) are strict and must be used exactly as defined.

### Creative Freedom Within the System

The Zazz token layer handles the structural skeleton — colors, spacing, type scale, radii, shadows, motion. Creative latitude lives in:

- **Hero storytelling**: Emotive imagery and brand narratives that establish trust before commerce begins
- **Typography pairing**: Mixing Geist body with classic serif italics for editorial emphasis words
- **Product presentation**: Card layouts, carousel patterns, quick-view modals, and grid compositions that balance density with breathing room
- **Section rhythm**: Alternating product grids with full-bleed accent sections for testimonials and brand messaging
- **Trust architecture**: How and where testimonials, partner logos, quality badges, and guarantees appear to accelerate buying decisions

Zazz is a commerce-focused branch of Zazz — the tokens are shared, but the aesthetic direction is specific: conversion-optimized retail with brand authenticity. The system provides the constraints; the brand story and product narrative provide the soul.

---

## 8. Common Homepage Sections

This section outlines standard eCommerce homepage sections the agent should consider when building Zazz storefronts. Each section has specific layout guidance and implementation notes. Not every page needs every section — select based on brand goals and conversion priorities.

> **🔍 CRITICAL: Search Placement**
>
> Search functionality **must always be present on the page** — either in the header (persistent across all pages) or prominently within the hero section. Search is a primary conversion tool for returning customers and those with intent. Never bury search or make it secondary. On mobile, search can collapse to an icon that expands, but must remain in the header or hero area.

### Header & Navigation

The global header appears on every page and anchors the browsing experience.

| Element              | Guidance                                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Logo**             | Left-aligned, links to homepage. Use appropriate size for brand prominence.                                                                                                                             |
| **Search**           | Prominent placement — either inline in header or as a hero-level feature. Icon + expandable input on mobile is acceptable. For catalog-heavy B2B sites, search may be the most-used navigation element. |
| **Navigation**       | Primary categories as horizontal links (desktop) or hamburger menu (mobile). Keep to 5-7 top-level items max. B2B sites with deep catalogs may use mega-menus with category thumbnails.                 |
| **Utility nav**      | Account, cart/quote cart, and wishlist icons. Cart should show item count badge. B2B sites: include "Sign In" / "Create Account" prominently — account creation IS conversion for gated commerce.       |
| **Announcement bar** | Optional thin banner above header for promotions, shipping thresholds, or alerts. Uses `--primary` or `--secondary` background.                                                                         |
| **Return link**      | For subsidiary storefronts: a link back to the parent corporate site (often top-left or in announcement bar area).                                                                                      |

### Hero Section

The first impression — establishes brand atmosphere and drives primary conversion action.

| Layout Option          | When to Use                                                                                                                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Full-bleed imagery** | Strong lifestyle photography, brand storytelling. Text overlay with headline + CTA.                                                                                                                                                            |
| **Split hero**         | Product on one side, messaging on other. Good for featured launches or seasonal campaigns.                                                                                                                                                     |
| **Video hero**         | Brand films, product demos. Autoplay muted with poster frame. Overlay text positioned asymmetrically — not centered. Use editorial taglines ("Old-world craft reimagined for contemporary spaces").                                            |
| **Carousel hero**      | Multiple campaigns or promotions. Limit to 3-5 slides max with clear navigation dots/arrows.                                                                                                                                                   |
| **Hotspot hero**       | Full-bleed lifestyle/project image with interactive `+` markers positioned over visible products. Each hotspot links to a product page. Combines storytelling imagery with immediate product discovery. Include an "Explore This Project" CTA. |
| **Search-first hero**  | For catalog-dense distributors: large search input as the hero's primary element, with category shortcuts below. Minimal imagery — function over atmosphere.                                                                                   |

- Hero headlines should use `text-display` or `text-h1` with optional serif-italic accent words
- Always include a primary CTA button (`.button` with `data-variant="primary"`)
- Search can be integrated directly into hero for catalog-heavy sites
- Mobile: Stack layout vertically, reduce image height, maintain CTA prominence
- For B2B: hero messaging often speaks to business outcomes ("Put you in control of your throughput") rather than lifestyle aspiration

### Featured Product Categories

Guides customers to browse by category — essential for large catalogs.

| Layout Option       | Description                                                                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Carousel**        | Horizontal scroll of category cards. Good for 6+ categories. Include nav arrows and touch swipe.                                                                                                                                      |
| **Bento grid**      | Mixed-size tiles in a mosaic layout. Creates visual interest, highlights priority categories with larger tiles.                                                                                                                       |
| **Grid**            | Equal-size cards in 3-4 column grid. Clean and balanced, works well for 4-8 categories.                                                                                                                                               |
| **Banner stack**    | Full-width horizontal banners stacked vertically. Each banner = one category with imagery + text overlay.                                                                                                                             |
| **Tabbed showcase** | Horizontal tab bar revealing one category at a time with heading, description, gallery CTA, and supporting image. Compact — avoids overwhelming scroll. Best for 3-7 distinct product families (e.g., material types, service areas). |

- Each category card needs: image, category name, optional product count or tagline
- Use `--radius-lg` for cards, `--shadow-sm` on hover
- Link entire card (not just text) for better mobile tap targets
- Consider "Shop All" link at section end
- For large B2B catalogs: showing product count per category helps buyers gauge depth ("Boxes & Corrugated · 2,400+ products")

### Featured Products

Highlights specific products — new arrivals, bestsellers, or curated picks.

| Layout Option    | Description                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------- |
| **Carousel**     | Most common. Horizontal scroll with 4-6 visible products (desktop), 1-2 (mobile).             |
| **Grid**         | 3-4 column static grid. Good for smaller featured sets (4-8 products).                        |
| **Hero product** | Single product spotlight with large imagery and detailed callout. For launches or hero items. |

- Product cards include: image, product name, price (sale price styling if applicable), quick-add or wishlist action
- Use `--gap-sm` between cards
- Include section heading with optional "View All" link
- Consider adding product badges (New, Sale, Bestseller) using `badge` component

### New Arrivals / Just Dropped

Showcases recent additions to drive discovery and return visits.

- Typically carousel format, similar to Featured Products
- Section heading should emphasize newness: "Just In", "New Arrivals", "Fresh Drops"
- Consider date-based filtering for dynamic freshness
- Optional: "New" badge on product cards

### Bestsellers / Popular Products

Social proof through popularity — shows what others are buying.

- Carousel or grid format
- Can include "Bestseller" badges or ranking numbers (1, 2, 3...)
- Section heading: "Bestsellers", "Customer Favorites", "Top Picks"
- Pull from actual sales data when possible

### Sale / Promotional Section

Highlights discounted products or ongoing promotions.

| Layout Option         | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| **Banner + products** | Full-width promotional banner followed by carousel of sale items. |
| **Grid with callout** | Sale products in grid with prominent discount callout card.       |
| **Countdown timer**   | For limited-time sales, include countdown component.              |

- Use `--secondary` or `--tertiary` for sale pricing and badges
- Strikethrough original prices, highlight discount percentage
- Clear "Shop Sale" CTA

### Trust Signals & Social Proof

Builds confidence and accelerates purchase decisions.

| Element                    | Placement & Style                                                                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Supplier/partner logos** | Horizontal row, muted (`--muted-foreground`) or grayscale. "Our Partners", "Trusted Brands", "Active Suppliers" heading. For distributors: emphasize supplier network size ("1,800+ active suppliers"). |
| **Customer reviews**       | Carousel of testimonial cards. Include star rating, customer name, company name, optional photo.                                                                                                        |
| **Ratings summary**        | Aggregate star rating with review count. Can appear near products or as standalone callout.                                                                                                             |
| **Trust badges**           | Security, payment, guarantee, certification icons. Often near footer or in checkout.                                                                                                                    |
| **Project gallery / UGC**  | Grid of completed project photos or customer installations. Links to case studies or product pages.                                                                                                     |
| **Team members**           | Photo grid or carousel of team members — signals real people and accessibility. Common for local/regional B2B.                                                                                          |

- Testimonials should feel authentic — real names, company names, specific product/project mentions
- Style quotes with serif-italic for editorial feel
- Keep logo rows subtle — they support trust without dominating
- For B2B: project photography and case studies are often more powerful than star ratings

### Benefits / Value Props

Communicates key selling points — shipping, returns, quality, etc.

- Typically 3-5 items in a horizontal row
- Icon + short headline + optional description
- Common B2B props: Competitive Pricing, Expert Support, Fast Shipping, Custom Solutions, Dedicated Account Manager, Full-Service Department
- Common D2C props: Free shipping, Easy returns, Secure checkout, Quality guarantee
- Uses `--gap-md` spacing, icons sized to `--step-6` or `--step-8`
- Can appear below hero or above footer

### Brand Story / About Section

Establishes brand identity and emotional connection.

- Full-bleed section with `--shade-50` or `--primary-50` background
- Emotive imagery (founder, craftsmanship, heritage)
- Editorial headline with serif-italic accents
- Brief paragraph + "Learn More" link
- Keep concise on homepage — this is a teaser, not the full story
- For heritage brands: can include founding year, core values, or generational narrative
- Split layout works well: imagery on one side, story on the other

### Core Values / Heritage Grid

Communicates company principles — common for established B2B businesses building long-term trust.

- 3-5 items in a responsive grid (3 columns desktop, stacked mobile)
- Each item: icon/illustration + heading (`text-h4` or `text-h5`) + brief paragraph
- Icons use `--primary` or brand color; sized to `--step-6` or `--step-8`
- Common values: Integrity, Quality, Safety, Customer Experience, Innovation, Reliability
- Section heading often community-oriented: "Let's Build Together", "Our Promise", "What Drives Us"
- Centered text alignment with generous vertical spacing (`--gap-md` between items)
- Optional: `--muted` background to visually distinguish from product-focused sections

### Brand Family / Sub-Brand Showcase

For businesses that operate multiple brands or product lines with distinct identities.

| Layout Option         | Description                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Brand grid**        | 3-4 column grid of brand cards. Each card: brand logo/image + positioning statement + "Browse [Brand]" link. |
| **Split feature**     | Larger featured brand with full description alongside a grid of secondary brands.                            |
| **Horizontal scroll** | Brand cards in a carousel format for 5+ brands.                                                              |

- Each brand should have: logo/wordmark, brief differentiating statement, CTA to that brand's collection
- For manufacturers with sub-brands: explain positioning ("Main brand for all lighting types" vs. "Promotional price points")
- Include product counts per brand when available to signal catalog depth
- Can also be used for "Collections" in studio-archetype sites — each collection as its own visual identity

### Craft / Process Storytelling

For brands where materials, manufacturing process, or artisan origin IS the value proposition.

- Full-bleed product photography at hero scale (single product, detail shot, or process image)
- Adjacent editorial text describing materials, techniques, or origin story
- Italic emphasis on craft terminology and material names for editorial texture
- This pattern can repeat multiple times on a page — each product family gets its own story moment
- Split layout: large image (60-70% width) + text (30-40% width), alternating sides
- Creates a gallery-exhibition feel — appropriate for editorial studio archetype
- Best for: artisan goods, custom manufacturing, premium materials, heritage processes

### Audience Segmentation

Helps different buyer personas find their path — common in B2B/B2C hybrid businesses.

- Typically 2-4 audience cards in a row
- Each card: lifestyle/persona image + heading ("Contractors", "Homeowners", "Architects", "Purchasing Managers") + aspirational CTA ("Advance Your Business", "Build Your Imagination")
- Cards link to audience-specific landing pages or filtered catalogs
- Uses `--radius-lg` for cards, generous image ratio (16:9 or 3:2)
- Section heading: "How Can We Help?", "Find Your Path", "Built for Your Business"
- Works as wayfinding for varied B2B audiences who have different needs from the same catalog

### Quote Request / Account CTA

Drives B2B-specific conversions — quote requests and account creation.

| Pattern                   | Description                                                                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Quote banner**          | Full-width `card-inverted` background with headline ("Need a Quote?"), brief value prop, and primary CTA button. Often mid-page between product sections. |
| **Account benefits card** | Lists specific account perks: Easy Checkout, Order History, Invoice Access, Shipment Tracking, Volume Pricing. Clear "Create Account" CTA.                |
| **Split CTA**             | Two CTAs side by side — one for quote request, one for account creation. Each with distinct heading and value prop.                                       |

- Quote request is often the #1 conversion action for B2B — give it prominence equal to or greater than "Add to Cart"
- Account benefits should be specific and tangible — not generic "Sign up for more"
- Can use `--primary` background for quote CTA, `--card` with border for account CTA
- Position mid-page (after categories/products) or just above footer

### Trade / Wholesale Program

A dedicated section explaining trade benefits and enrollment for B2B buyers.

- Visually distinguished with `--muted` or `--neutral-100` background band
- Left-label layout works well: "Trade Program" label on left, details on right
- Content: eligibility criteria, pricing benefits, dedicated support, application CTA
- Can include testimonial from existing trade partner
- Clear "Apply for Trade Account" or "Become a Customer" CTA button
- Keep requirements concise — bullet points, not paragraphs
- For manufacturers selling through distributors: explain the relationship clearly

### Catalog / Lookbook Downloads

For B2B sites where buyers need offline product references or spec sheets.

- Split-section layout: CTA text on one half, catalog cover imagery on other
- Or: horizontal row of catalog covers with titles and download/browse links
- Common CTAs: "Browse Catalogs", "Download PDF", "Request Print Copy"
- Include seasonal or year identifiers on catalogs ("Spring 2026", "Q2 Catalog")
- For digital catalogs: link to flipbook viewer; for PDFs: include file size

### Showroom / Physical Location

For businesses with physical locations, showrooms, or service areas.

- Full mid-page section (not just footer content) — signals legitimacy and invites visits
- Interior/exterior photography of the location
- Address, hours, phone number, "Get Directions" link
- Optional: "Book an Appointment" or "Schedule a Visit" CTA
- For multi-location businesses: card grid or map with location pins
- For service-area businesses: "Find a Location Near You" with search/zip lookup
- Uses `--gap-md` internal padding, can use left-label layout for editorial feel

### CTA Banner

Drives specific actions — newsletter signup, contact, app download, etc.

| Placement           | Typically above footer, but can appear mid-page                              |
| ------------------- | ---------------------------------------------------------------------------- |
| **Newsletter**      | Email input + submit button. Value prop: "Get 10% off", "Early access", etc. |
| **Contact**         | Brief message + contact button. For B2B or high-consideration purchases.     |
| **App download**    | App store badges + phone mockup.                                             |
| **Loyalty program** | Sign-up CTA with benefits preview.                                           |

- Uses `--primary` or accent background for visual break
- Centered text, constrained width (`.article`)
- Single focused CTA — don't compete with multiple actions
- Include privacy/unsubscribe note for email signups

### Recently Viewed

Personalizes the experience for returning visitors.

- Carousel format, similar to Featured Products
- Only displays if customer has browsing history
- Heading: "Recently Viewed", "Pick Up Where You Left Off"
- Consider "Clear history" option for privacy

### Footer

The global footer provides navigation, legal, and contact information.

| Element                | Guidance                                                                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Navigation columns** | 3-4 columns of links: Shop, Help, Company, Connect. B2B sites with large catalogs may include full category taxonomy as an alternative sitemap. |
| **Newsletter**         | Can duplicate CTA banner signup if not placed above                                                                                             |
| **Social icons**       | Row of social media links                                                                                                                       |
| **Payment icons**      | Accepted payment methods                                                                                                                        |
| **Legal links**        | Privacy, Terms, Accessibility                                                                                                                   |
| **Copyright**          | Year + company name                                                                                                                             |
| **Location info**      | For businesses with showrooms: address, hours, contact. Can include multiple locations in columns.                                              |
| **Return/parent link** | For subsidiary storefronts: prominent link back to parent corporate site                                                                        |

**Footer variants by archetype:**

- **Distributor:** Dark footer (`--neutral-900` or `--neutral-950`), full category taxonomy in columns, customer service phone/email prominently displayed
- **Lifestyle Brand:** Dark or light footer, balanced nav columns, brand story teaser, newsletter signup
- **Editorial Studio:** Minimal footer — contact info, physical location(s) with hours, social links, newsletter. Often lighter/simpler than typical eCommerce footers

### Section Rhythm Guidelines

When composing the homepage, alternate section types for visual rhythm. Here are typical flows by archetype:

**Industrial Distributor:**

1. **Hero** (search-first or carousel) → 2. **"Ways to Shop"** (category grid or bento) → 3. **Featured Products/Brands** → 4. **Quote Request CTA** → 5. **Account Benefits CTA** → 6. **Footer** (mega-nav with full taxonomy)

**Lifestyle Brand:**

1. **Hero** (carousel or full-bleed) → 2. **Categories** (grid or tabbed) → 3. **Featured Products** → 4. **Brand Family** → 5. **Trust Signals / Catalogs** → 6. **Brand Story** → 7. **CTA Banner** → 8. **Footer**

**Editorial Studio:**

1. **Hero** (video or hotspot) → 2. **Catalog** (category grid with counts) → 3. **Craft Story** → 4. **Featured Product** → 5. **Craft Story** (repeat) → 6. **Trade Program** → 7. **Collections** → 8. **Showroom/Visit** → 9. **Newsletter** → 10. **Footer** (minimal)

Not all sections are needed — prioritize based on:

- **Archetype** — Match the rhythm to the site's personality (see Section 1)
- **Catalog size** — Larger catalogs need stronger category navigation and search
- **Business model** — B2B sites need quote/account CTAs; D2C sites need cart-focused flows
- **Brand maturity** — New brands need more trust signals and story; established brands lean on heritage
- **Traffic source** — Returning customers benefit from personalization (recently viewed); new visitors need wayfinding
- **Conversion goals** — Account creation, quote requests, newsletter signups, or immediate purchase

Use `--gap-xl` (6rem) between major sections to create clear visual separation. Use horizontal rules (`1px solid var(--border)`) for lighter separation within editorial layouts.
