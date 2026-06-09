# Zazz token reference

A **map** of which token to reach for and when. Authoritative _values_ live in
`zazz/styles/_variables.css` (global Tiers 1–3) and each `zazz/styles/_*.css` (component
tokens, Tier 4) — read those when you need an exact number, so this file can't drift.

Two rules govern every choice:

1. **Never hardcode.** Every value is a `var(--…)` hook. Override at one of the three
   surfaces in `SKILL.md` (global → component-default → instance) instead of editing source.
2. **Most semantic that fits.** Reach for the semantic token first; drop to a literal scale
   only when no semantic token can express it. `gap-sm` → `var(--gap-sm)` → `var(--step-4)`,
   in that order of preference.

## Contents

1. Spacing · 2. Color roles · 3. Color scales & overlays · 4. Typography · 5. Radius ·
2. Shadow · 7. Layout & breakpoints · 8. Focus ring · 9. Motion

---

## 1. Spacing

- **Semantic gaps (use first):** `--gap-xs --gap-sm --gap-md --gap-lg --gap-xl`. These are
  the default for padding, margins, and `gap`.
- **Step scale (escape hatch):** `--step-0\.5 --step-1 … --step-96`, plus `--step-px`,
  `--step-0\.5px`, `--step-full`. Half-steps carry an escaped dot — write `var(--step-2\.5)` for 2.5×. Everything
  derives from `--spacing-interval` (a fluid `clamp()`), so spacing scales with the viewport.
- **Utilities (map to `--gap-*`, sizes xs/sm/md/lg/xl):** `.gap-*`,
  `.p-* .px-* .py-* .pt-* .pr-* .pb-* .pl-*`, `.m-* .mx-* .my-* …` (+ `.mx-auto`),
  `.inset-* .top-* .right-* .bottom-* .left-*`, `.w-* .h-* .size-*`.

## 2. Color — theme roles (use these; light/dark swaps for free)

Roles resolve via `light-dark()` and re-declare on `.dark`, so using a **role** (not a scale
step) keeps both modes correct automatically.

- **Surfaces & text (paired):** `--background`/`--foreground`, `--card`/`--card-foreground`,
  `--popover`/`--popover-foreground`, `--input`/`--input-foreground`, `--border`,
  `--border-foreground`.
- **Dim / fade (paired):** `--muted`/`--muted-foreground` (dim — darker than its surface),
  `--faded`/`--faded-foreground` (fade — lighter than its surface).
- **Brand:** `--primary` `--secondary` `--tertiary` (+ `-foreground`).
- **Status:** `--info` `--success` `--warning` `--destructive` (+ `-foreground`).
- **Utilities:** `.text-{role}`, `.bg-{role}`, `.border-{role}`.

## 3. Color — scales & overlays (escape hatch only)

Reach here only when a role can't express it (a specific tint, a backdrop, a fixed accent).

- **Scales 50–950:** `--primary-50…950` (same for `--secondary-*`, `--tertiary-*`,
  `--neutral-*`), plus `--white` / `--black`. Light theme binds primary/secondary at **600**,
  tertiary at **500**; dark shifts lighter.
- **Overlays (alpha):** `--shade-50…950` / `--shade-full` (darken; from neutral-950 — use for
  backdrops, e.g. `--shade-800` for modal backdrops) and `--tint-50…950` / `--tint-full`
  (lighten; from white). `*-none` = transparent.
- **Utilities:** `.text-primary-600`, `.bg-neutral-100`, `.bg-shade-800`, etc.

## 4. Typography — use `text-*` classes; never compose from parts

- **Scale classes (size + weight + leading + tracking bundled):** `.text-display`,
  `.text-h1 … .text-h6`, `.text-xl .text-lg .text-md .text-sm .text-xs`, `.text-eyebrow`.
  All sizes are fluid `clamp()`. This is the primary way to set type.
- **Tokens behind them (only when a class won't do):** `--font-size-*`, `--font-weight-*`
  (`body|heading|strong|eyebrow`), `--tracking-*`, `--leading-*`, `--paragraph-spacing-*`,
  families `--font-family-body|heading` and raw `--font-sans|serif|mono`.
- **Weight/family utilities (Tailwind-named):** `.font-thin … .font-black`, plus semantic
  `.font-body .font-heading .font-strong`, families `.font-sans .font-serif .font-mono`.
- **Helpers:** `.text-center|left|right|justify`, `.uppercase .lowercase .capitalize`,
  `.text-balance .text-pretty`, `.line-clamp-1..6`, `.tabular-nums`, `.text-link`,
  `.text-muted-foreground`. For long-form rich content, wrap in `.prose` (`_typography.css`).

## 5. Radius

`--radius-none|xs|sm|md|lg|xl|full`, scaled by `--radius-multiplier`. Conventions: **md** =
buttons/inputs, **lg** = cards/dialogs, **sm** = badges, **full** = pills/circles.
Utilities: `.rounded-0|xs|sm|md|lg|xl|full`.

## 6. Shadow & elevation

`--shadow-xs|sm|md|lg|xl` — soft, multi-layer. Surfaces are flat by default; apply elevation
intentionally (**md** ≈ popovers/modals). Utilities: `.shadow-none|xs|sm|md|lg|xl`.

## 7. Layout & breakpoints

- **Containers (self-padding; register as container-query contexts):** `.container`
  (`--container`, ~80rem cap) for full-width sections, `.article` (`--article`, ~66ch) for
  reading width. No wrapper div needed.
- **Breakpoints** (for `calc()` and **container** queries — not `@media`): `--screen-xs` 40rem,
  `--screen-sm` 48rem, `--screen-md` 64rem, `--screen-lg` 80rem, `--screen-xl` 96rem.
- **Responsive utilities are container-query prefixed:** `.xs:* .sm:* .md:* .lg:* .xl:*`
  (e.g. `.md:grid-cols-3`, `.lg:flex-row`) — they respond to the nearest container, not the
  viewport.
- **Layout utilities:** `.flex`/`.grid` families (`.flex-col`, `.items-center`,
  `.justify-between`, `.grid-cols-1..12`, `.col-span-*`, `.grid-area-pile`, `.place-*`,
  `.order-first|last`), `.z-0..50`, `.aspect-*`, `.object-*`, `.overflow-*` / `.no-scrollbar`,
  `.hidden|block|inline-block`, `.sr-only`.

## 8. Focus ring

`--ring` (= `--primary` at `--ring-opacity` 30%), with `--ring-color`, `--ring-size` (2px),
`--ring-offset` (1px), `--ring-style`. Applied automatically on `:focus-visible`. To recolor,
override **`--ring-color`** (not `--ring` — it recomputes via `color-mix`). `.ring` opts an
element in.

## 9. Motion

`--spring-easing` (natural spring) with `--bezier-easing` fallback; `--spring-duration`
(~0.333s). `--default-transition*` bundles the commonly animated properties.
`prefers-reduced-motion: reduce` zeroes the duration globally — don't fight it. Utilities:
`.transition`, `.transition-all|opacity|transform`.
