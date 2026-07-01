---
name: zazz-figma-design
description: >-
  Design and build UI in Figma with the Zazz design system. Use whenever you create or edit
  Figma frames, components, variables, or styles that should look like Zazz: buttons, badges,
  cards, dialogs, dropdowns, tooltips, tabs, accordions, carousels, forms (inputs, selects,
  switches, sliders, checkboxes, radios), navigation, heroes, and sections — plus any theming,
  dark-mode, spacing/typography/color, or "make it on-brand" work. Zazz is token-driven (map
  tokens to Figma variables), variant-driven (map variants to component properties), and
  sentence-case by house rule. Start here before hand-styling anything in Figma.
---

# Zazz design system — for Figma

Zazz is a conversion-focused commerce design system for B2B, wholesale, and retail frontends.
It pairs clean, product-forward surfaces with editorial typography. This skill is the
authoritative spec for designing Zazz in Figma — the values below are the source of truth
(the published Zazz Figma community library lags slightly; trust these numbers when they
disagree).

**Two ideas drive everything:**

1. **Never hardcode — bind to variables/styles.** Every color, size, radius, and type
   decision should reference a Figma variable or style, never a raw value typed into a layer.
2. **Most semantic that fits.** Reach for a semantic role (`primary`, `muted-foreground`,
   `gap-md`) before a raw scale step (`primary-600`, `step-6`). Roles carry light/dark and
   keep designs consistent.

> **House rule — sentence case, always.** Author *all* UI text in sentence case: headings,
> buttons, links, labels, nav, placeholders. "Add to cart", not "Add To Cart". The only caps
> are the eyebrow style, whose uppercase comes from its text-style Case setting — still type it
> in sentence case. Deviate only if the user explicitly asks.

## How Zazz concepts map to Figma

| Zazz (web) concept            | In Figma                                                          |
| ----------------------------- | ---------------------------------------------------------------- |
| CSS token `var(--token)`      | A **variable** (color / number / string), referenced everywhere |
| `light-dark()` + `.dark`      | A **mode** (Light / Dark) on the theme variable collection      |
| Token tiers (primitive→role)  | Variable **collections** + **aliases** (role aliases primitive) |
| `data-variant` / `data-size`  | A **Variant** component property (`primary`, `muted`, `sm`, …)   |
| Utility classes (flex/gap/p)  | **Auto layout** (direction, gap, padding) on a frame            |
| `text-*` classes              | **Text styles** (Display, H1–H6, Body XL–XS, Eyebrow, Mono)     |
| `--shadow-*`                  | **Effect styles** (layered drop shadows)                        |
| `.container` band system      | A full-width section frame + a centered, max-width content frame |

## Build order

When standing up or extending a Zazz file, work foundations-first so everything downstream can
bind to them:

1. **Variables** — primitives, then theme roles (with Light/Dark modes), then the numeric scale.
2. **Text styles** and **effect styles**.
3. **Components** with variant sets, bound to the variables/styles above.
4. **Layouts / pages** composed from those components on auto-layout frames.

---

## 1. Color

Model color as **three variable collections** (this mirrors Zazz's token tiers):

- **Primitives** (one mode): the raw scales — `primary/secondary/tertiary/neutral` 50–950,
  `white`, `black`, and the `shade`/`tint` alpha overlays. Raw values, never used directly on
  layers.
- **Theme** (two modes: **Light**, **Dark**): the semantic **roles**. Each role *aliases* a
  primitive, and the alias differs per mode. This is what layers and components bind to.
- **Scale** (one mode): numbers — spacing, radius, breakpoints (see §3–§4).

Color values are authored in **OKLCH** (authoritative; the scales are imprecise as HEX).
Figma's color input accepts OKLCH and HEX — paste OKLCH for fidelity; HEX seeds are given for
convenience.

### Brand seeds & scales

Generate the full 50–950 scales with [tints.dev](https://www.tints.dev) from these seeds, then
store each step as a primitive variable:

| Scale       | Seed (HEX) | Bound step | Light role | Dark role |
| ----------- | ---------- | ---------- | ---------- | --------- |
| `primary`   | `#4F46E5`  | 600        | 600        | 500       |
| `secondary` | `#DE4917`  | 600        | 600        | 500       |
| `tertiary`  | `#E5375B`  | 500        | 500        | 400       |
| `neutral`   | `#888890`  | 500        | —          | —         |

Brand colors step **lighter** in dark mode (the dark role is a lower number). All brand
foregrounds are white. Key neutral steps: `neutral-50` `#FCFCFC`, `neutral-100` (border),
`neutral-200` `#D4D4D7`, `neutral-500` `#888890`, `neutral-700` `#52525B`, `neutral-900`
`#1F1F24`, `neutral-950` `#151519`.

### Overlays (alpha primitives)

- **shade** `shade-50…950` — neutral-950 at 5%…95% alpha. Darkens. **Modal/dialog backdrops
  use `shade-800`** (not `muted`).
- **tint** `tint-50…950` — white at 5%…95% alpha. Lightens (for use over dark surfaces).

### Theme roles (bind layers to these)

Each role is one Theme variable with a Light and a Dark value. Surface/text roles are paired —
always put the matching `*-foreground` text on a surface.

| Role (variable)        | Light value      | Dark value     | Use for                              |
| ---------------------- | ---------------- | -------------- | ------------------------------------ |
| `background`           | white            | neutral-900    | Page surface                         |
| `foreground`           | neutral-900      | white          | Default text                         |
| `border`               | neutral-100      | tint-100       | 1px lines, dividers, outlines        |
| `border-foreground`    | tint-950         | shade-500      | Text on outlined elements            |
| `card`                 | white            | neutral-950    | Card / elevated surface              |
| `card-foreground`      | neutral-900      | white          | Text on cards                        |
| `popover`              | white            | neutral-950    | Popover / menu surface               |
| `popover-foreground`   | neutral-900      | white          | Text on popovers / menus             |
| `input`                | neutral-50       | tint-50        | Input field fill                     |
| `input-foreground`     | neutral-900      | white          | Input text                           |
| `muted`                | shade-50         | tint-50        | Subtle dim (darker than surface)     |
| `muted-foreground`     | shade-600        | tint-600       | De-emphasized / helper text          |
| `faded`                | tint-100         | shade-100      | Subtle fade (lighter than surface)   |
| `faded-foreground`     | tint-600         | shade-600      | Text on faded surfaces               |
| `primary`              | primary-600      | primary-500    | Brand anchor (deep blue-violet)      |
| `primary-foreground`   | white            | white          | Text on primary                      |
| `secondary`            | secondary-600    | secondary-500  | Burnt-orange complement              |
| `secondary-foreground` | white            | white          | Text on secondary                    |
| `tertiary`             | tertiary-500     | tertiary-400   | Rose-pink accent                     |
| `tertiary-foreground`  | white            | white          | Text on tertiary                     |

### Status roles

Each has a Light and Dark OKLCH value and a white foreground. Status steps go **darker** in
dark mode (opposite of brand). Badges have no status variant — apply status by overriding a
badge instance's fill/text to the status role.

| Role          | Light OKLCH                  | Dark OKLCH                   | Character        |
| ------------- | ---------------------------- | ---------------------------- | ---------------- |
| `info`        | `oklch(0.5876 0.1389 241.97)`| `oklch(0.5 0.1193 242.75)`   | Cerulean blue    |
| `success`     | `oklch(0.596 0.1274 163.23)` | `oklch(0.5081 0.1049 165.61)`| Teal green       |
| `warning`     | `oklch(0.6658 0.1574 58.32)` | `oklch(0.5553 0.1455 49)`    | Amber gold       |
| `destructive` | `oklch(0.5771 0.2152 27.33)` | `oklch(0.5054 0.1905 27.52)` | Red-orange       |

---

## 2. Typography

Create one **text style** per row. Family: **Geist** (body + headings), **Geist Mono** (mono).
Weights: body **400**, heading/eyebrow **600**, strong **500**. Sizes are the desktop maximums
of a 1.25 (major-third) modular scale; on web they scale fluidly, so optionally add mobile
size variants, but the desktop value is canonical. Letter-spacing and line-height are given in
Figma units (% and %). Headings use a tight line-height; body is generous.

| Text style     | Size (rem / px)   | Weight | Line height | Letter spacing | Use                       |
| -------------- | ----------------- | ------ | ----------- | -------------- | ------------------------- |
| `Display`      | 5.96rem / ~95px   | 600    | 95%         | -5%            | Massive hero statement    |
| `H1`           | 4.77rem / ~76px   | 600    | 95%         | -5%            | Primary page heading      |
| `H2`           | 3.81rem / ~61px   | 600    | 95%         | -2.5%          | Section heading           |
| `H3`           | 3.05rem / ~49px   | 600    | 100%        | -2.5%          | Subsection heading        |
| `H4`           | 2.44rem / ~39px   | 600    | 100%        | -1.5%          | Component heading         |
| `H5`           | 1.95rem / ~31px   | 600    | 100%        | -1%            | Small heading             |
| `H6`           | 1.56rem / ~25px   | 600    | 100%        | -0.5%          | Minor heading             |
| `Body XL`      | 1.56rem / ~25px   | 400    | 150%        | 0              | Intro paragraph / lead-in |
| `Body LG`      | 1.25rem / 20px    | 400    | 150%        | 0              | Lead text                 |
| `Body MD`      | 1rem / 16px       | 400    | 160%        | 0              | Default body              |
| `Body SM`      | 0.8rem / ~13px    | 400    | 150%        | 0              | Small UI labels           |
| `Body XS`      | 0.64rem / ~10px   | 400    | 150%        | 0              | Captions, fine print      |
| `Eyebrow`      | 0.58rem / ~9px    | 600    | 120%        | 10%            | Label — set Case=UPPERCASE|
| `Mono`         | 1rem / 16px       | 400    | 160%        | 0              | Code, tabular data        |

- Headings balance-wrap, body pretty-wraps on web — ignore in Figma, but keep headings short.
- **Text links:** `primary` color, 1px underline, ~2px underline offset.

---

## 3. Spacing

Store as **number variables** and apply as auto-layout **gap** and **padding**. Use the
semantic gap first; the step scale is the escape hatch.

| Semantic gap | px  | Use for                                   |
| ------------ | --- | ----------------------------------------- |
| `gap-xs`     | 8   | Tight grouping, button rows               |
| `gap-sm`     | 16  | Default component gap, gutters            |
| `gap-md`     | 24  | Card padding, internal section spacing    |
| `gap-lg`     | 44  | Large component separation                |
| `gap-xl`     | 96  | Section-level vertical rhythm             |

**Step scale** (escape hatch): a 4px base unit — `step-1` = 4px, `step-2` = 8px, `step-2_5` =
10px, `step-4` = 16px, `step-8` = 32px, etc. (`step-n` = 4 × n px). Used for fine component
metrics (e.g. button padding = 10px = `step-2_5`).

---

## 4. Radius, shadows, layout

### Corner radius (number variables)

| Token         | px   | Use for            |
| ------------- | ---- | ------------------ |
| `radius-xs`   | 4    | Subtle softening   |
| `radius-sm`   | 6    | Badges             |
| `radius-md`   | 10   | Buttons, inputs    |
| `radius-lg`   | 20   | Cards, dialogs     |
| `radius-xl`   | 28   | Statement surfaces |
| `radius-full` | 9999 | Pills, circles     |

### Shadows (effect styles)

Whisper-soft, multi-layer diffused drop shadows of near-black at very low opacity (1–6%),
increasing Y offset and blur, 0 spread. Surfaces are **flat by default** — apply elevation
intentionally. Scale: `shadow-xs` (resting) · `sm` (gentle lift) · `md` (modals/popovers) ·
`lg` (floating) · `xl` (overlay drama). Reference — `shadow-md` is four stacked black drop
shadows: `Y3 blur6 @5%`, `Y11 blur11 @4%`, `Y24 blur14 @3%`, `Y42 blur17 @1%`.

### Layout & containers

Zazz centers content in capped bands rather than a fixed grid. In Figma: a **full-width section
frame** (background spans the viewport) wrapping a **centered content frame** with a max width
and side gutters of `gap-md` (24px). Pick the content cap by the band:

| Band   | Max content width        | Typical use                    |
| ------ | ------------------------ | ------------------------------ |
| `lg`   | ~80rem / 1280px (default)| Standard page content          |
| `md`   | ~64rem / 1024px          | Narrower content               |
| `full` | viewport minus gutters   | Wide / dashboard layouts       |
| `bleed`| edge-to-edge             | Full-bleed imagery / heroes    |

Reading-width text ("article") caps at ~70ch (`lg`). Breakpoints for responsive frames:
`xs` 40rem/640 · `sm` 48rem/768 · `md` 64rem/1024 · `lg` 80rem/1280 · `xl` 96rem/1536.

### Motion

Spring easing, ~0.333s, subtle and unhurried. Use for prototype transitions and component
states.

---

## 5. Components

Build each as a Figma component with a variant set; expose **Variant** and **Size** as
component properties whose values exactly match the names below (this keeps design aligned with
code, including Code Connect). The **default variant is the absence of the attribute** — name
it `default`. Bind every fill/stroke/radius/spacing to the variables and styles above.

| Component        | Variant property                              | Size property        | Notes                                                            |
| ---------------- | --------------------------------------------- | -------------------- | --------------------------------------------------------------- |
| Button           | default, primary, muted, ghost, destructive, link | default, sm, icon, icon-sm | See spec below                                            |
| Badge            | default, primary, muted, ghost, link          | default, icon        | No destructive — use a status override                          |
| Button group     | —                                             | —                    | Wraps buttons; collapses shared borders + inner radii          |
| Toggle           | default, primary, muted, ghost, destructive   | default, sm, icon, icon-sm | Checked = active button look                              |
| Toggle group     | — (orientation: horizontal/vertical)          | —                    | Single- or multi-select                                         |
| Tooltip          | (side: top/bottom/left/right; align: start/center/end) | —           | Small floating hint + arrow                                     |
| Dialog           | —                                             | article, container, screen | `card` surface, `shadow-md`, `radius-lg`, `shade-800` backdrop |
| Dropdown         | (side; align: start/center/end)               | —                    | `popover` surface; items are ghost buttons                      |
| Navigation menu  | default, submenu (align: center/end)          | root, container, screen | Mega-panels: grid of rich link rows (title + description)   |
| Accordion        | —                                             | —                    | Disclosure rows with chevron                                   |
| Tabs             | — (orientation: horizontal/vertical)          | —                    | Segmented control with a sliding pill indicator                |
| Card             | default, inverted                             | —                    | Composition: `card` surface, 1px `border`, `radius-lg`, `gap-md` pad |
| Avatar           | —                                             | —                    | Circular (`radius-full`), image + text fallback                |
| Input            | —                                             | —                    | Shares field tokens; error state via validation                |
| Input group      | (addon align: inline-start/-end, block-start/-end) | —              | Input with leading/trailing addon                              |
| Password group   | (addon align)                                 | —                    | Input with a visibility-toggle addon                           |
| Textarea         | —                                             | —                    | Multi-line field                                               |
| Select           | —                                             | —                    | Native-style select with chevron                              |
| Checkbox         | —                                             | —                    | Restyled native box                                           |
| Radio            | —                                             | —                    | Restyled native radio + radio group                           |
| Switch           | —                                             | —                    | Toggle switch                                                 |
| Slider           | —                                             | —                    | Range input                                                   |
| Carousel         | —                                             | —                    | Horizontally scrolling slides                                |
| Lightbox         | —                                             | —                    | Gallery → fullscreen dialog with carousel + thumbnails        |
| Breadcrumbs      | —                                             | —                    | Link buttons separated by muted `/`; current crumb disabled   |
| Mobile menu      | — (screen size; slide-right)                  | screen               | Full-screen dialog with nested accordions                     |

### Button (canonical spec)

- **default:** fill `card`, 1px `border`, text `foreground`. **primary:** fill `primary`, text
  `primary-foreground`, no border. **muted:** fill `muted`, no border. **ghost:** transparent,
  hover reveals `muted`. **destructive:** fill `destructive`, text `destructive-foreground`.
  **link:** transparent, underlined, text `foreground` (→ `primary` on hover), no padding/height.
- **Size:** default height **32px** (`step-8`), inline padding **10px** (`step-2_5`),
  `radius-md`, text **Body SM**, weight **500**. `sm` → height 24px, padding 8px, `radius-sm`.
  `icon` → square at the height. `icon-sm` → square 24px.
- Gap between icon and label **4px**; focus ring is `primary` at ~70% (2px + 1px offset).

### Badge

Chip — `radius-sm`, height ~22px, padding ~8px, text **Body XS** weight 500. Variants
`default` (border + `card`), `primary`, `muted`, `ghost`, `link`.

### Forms

All field types share a common look (fill `input`, 1px `border`, `radius-md`). Wrap a control
with its label / hint / error in a field group. Validation styling (e.g. destructive border)
applies only after the field is touched — show it on error states, not the resting state.

---

## 6. Patterns

### Page structure

`<header>` (logo + nav) → `<main>` of sections → `<footer>`. In Figma, build each as a
full-width auto-layout frame; place a centered, max-width content frame inside (see §4). Each
section owns its vertical rhythm with top/bottom padding (`gap-xl` for major sections). Desktop
nav is a horizontal row of ghost-button links; mobile collapses to a menu button opening the
mobile-menu dialog.

### Heading group with CTAs

Group eyebrow + heading + subheading + action buttons in one auto-layout frame (vertical,
`gap-sm`). Center on mobile, left-align from `md`.

- Eyebrow → **Eyebrow** style. Heading → **Display** / **H1–H6**. Subheading → **Body XL** in
  `muted-foreground`.
- Lead CTA = button `primary`; secondary CTA = button `ghost`.

### Site archetypes

Pick the archetype that matches the brand; it shifts density, imagery, and whitespace:

| Archetype                  | Character                                                          | Clients                                   |
| -------------------------- | ----------------------------------------------------------------- | ----------------------------------------- |
| **Industrial Distributor** | Function-first, catalog-dense, prominent search, minimal atmosphere | Packaging, safety, industrial, janitorial |
| **Lifestyle Brand**        | Balanced — product-forward with storytelling, seasonal carousels  | Lighting, furniture, home, apparel        |
| **Editorial Studio**       | Gallery-like, story-driven, generous whitespace, video heroes     | Artisan, luxury, design-forward makers    |

Default to **Lifestyle Brand** when unclear. Avoid generic AI aesthetics (cold tech minimalism,
sterile layouts) — balance conversion mechanics (clear CTAs, product grids) with brand
storytelling (testimonials, premium photography). For editorial emphasis, pair Geist with a
classic serif italic (Playfair Display Italic, Cormorant Garamond Italic) on accent words
("*quality*", "*trusted*").

### Brand customization (when given a URL or brand)

1. Pull the brand's palette, logo, imagery style, and market position.
2. Regenerate the brand scales via [tints.dev](https://www.tints.dev) from the brand's hex
   values and update the **primitive** color variables — the theme roles realias automatically.
3. Update fonts and roundness to match.
4. Place the logo in the header and footer.
5. Choose the matching archetype.

---

## 7. Do / Don't

- **Do** bind every color/size/radius/type to a variable or style. **Don't** type raw hex or px
  onto layers.
- **Do** use semantic roles (`primary`, `muted-foreground`, `gap-md`). **Don't** reach for a
  raw scale step unless no role fits.
- **Do** drive light/dark with the Theme collection's modes. **Don't** build separate dark-mode
  copies of frames.
- **Do** name component-property values exactly (`primary`, `ghost`, `sm`). **Don't** invent
  names like "Button/Primary" that diverge from the system.
- **Do** write all UI text in sentence case. **Don't** Title-Case or UPPERCASE (except the
  Eyebrow style's Case setting).
- **Do** keep surfaces flat; add shadow intentionally. **Don't** over-elevate.
- **Do** reuse library components and override via properties/instances. **Don't** detach and
  hand-build what a component already provides.

## Zazz Figma library

Community file: <https://www.figma.com/community/file/1468718708506413296/zazz-v0-4-4>. Pull
components and variables from it when present — but it lags the current system, so when a value
there disagrees with this skill, **this skill wins** (especially the type scale, where the
library still carries the older `Body SM`/`Body XS` sizes).
