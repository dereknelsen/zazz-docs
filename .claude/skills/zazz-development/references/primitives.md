# Zazz Primitives — Recipes

Primitives are **suggestions** for styling common atomic components using Zazz tokens. When asked to build a primitive in an existing component system (shadcn, Radix, Headless UI, your own React framework, Webflow), adapt the system's component patterns to use these tokens. Don't re-implement; reskin.

Each recipe below shows the anatomy (HTML and class names), the tokens it consumes, and the variants. Full per-primitive docs (states, accessibility notes, cross-platform paths) live at `https://zazz.example/docs/primitives`.

The 14 shipped primitives: Avatar, Badge, Button, Card, Carousel, Checkbox, Dialog, Input, Motion, Radio, Select, Slider, Switch, Textarea.

---

## Button

### Variants

| Class                   | Use for                                             | shadcn equivalent           |
| ----------------------- | --------------------------------------------------- | --------------------------- |
| `button`                | Default outlined                                    | `button` / `button-outline` |
| `button button-primary` | The page's most important action                    | `button-primary` (default)  |
| `button button-muted`   | Secondary action with weight                        | `button-secondary`          |
| `button button-ghost`   | Tertiary, toolbars                                  | `button-ghost`              |
| `button button-link`    | Inline text-style action                            | `button-link`               |
| `button button-minimal` | Square icon-only modifier (stacks with any variant) | —                           |

### Anatomy

```html
<a class="button button-primary" href="/start">
  <span class="button-icon"><!-- optional leading icon --></span>
  <span class="button-text">Get started</span>
  <span class="button-icon"><!-- optional trailing icon --></span>
</a>
```

### Tokens

| Property             | Token                                                             |
| -------------------- | ----------------------------------------------------------------- |
| Height               | `--step-9`                                                        |
| Padding (inline)     | `--step-2_5`                                                      |
| Icon ↔ label gap     | `--step-1_5`                                                      |
| Border               | `1px solid var(--border)` (default), variant-dependent elsewhere  |
| Radius               | `--radius-button`                                                 |
| Background (default) | `--card`                                                          |
| Background (primary) | `--primary` → text `--primary-foreground`                         |
| Background (muted)   | `--muted` with `--faded` border → text `--foreground`             |
| Background (ghost)   | transparent → hover paints `--muted`                              |
| Font                 | `--font-body`, `--font-size-sm`, `--weight-body`, line-height `1` |
| Hover (default)      | background `--muted`                                              |
| Active               | `opacity: 0.8`                                                    |
| Focus-visible        | `box-shadow: var(--focus-ring)`                                   |

Use `<button>` for in-page actions, `<a class="button">` for navigation. Icon-only buttons need `aria-label`.

---

## Card

### Anatomy

```html
<a class="card" href="/article">
  <a class="card__figure" href="/article">
    <img class="card__image" src="/cover.jpg" alt="" />
  </a>

  <div class="card__content">
    <div class="card__tags">
      <a class="badge badge-link" href="/category">Category</a>
    </div>

    <div class="card__body">
      <a class="card__title-link" href="/article">
        <h3 class="card__title text-h6">Title</h3>
      </a>
      <p class="card__description text-sm text-muted-foreground line-clamp-2">Short excerpt.</p>
    </div>

    <div class="card__footer">
      <!-- avatar/byline + CTA -->
    </div>
  </div>
</a>
```

### Tokens

| Property      | Token                                       |
| ------------- | ------------------------------------------- |
| Background    | `--card`                                    |
| Text          | `--card-foreground`                         |
| Border        | `1px solid var(--border)`                   |
| Radius        | `--radius-card`                             |
| Padding       | `--gap-md` (or larger on featured variants) |
| Figure radius | `--radius-md` (inner — half of card radius) |
| Figure aspect | `3 / 2` default                             |

Cards stretch to 100% of their container by default. The figure radius is intentionally smaller than the card radius (16px outer / 8px inner) for clean nested corners.

---

## Input

### Anatomy

```html
<!-- Simple input -->
<input class="input" type="email" placeholder="you@example.com" />

<!-- With leading icon -->
<div class="input-wrapper">
  <span class="input-icon-start"><svg class="input-icon">…</svg></span>
  <input class="input pl-input" type="search" placeholder="Search" />
</div>

<!-- Form composition -->
<div class="form-group">
  <label class="form-label" for="email">Email</label>
  <input class="input" id="email" type="email" />
</div>

<div class="form-row">
  <div class="form-group">…</div>
  <div class="form-group">…</div>
</div>
```

### Tokens

| Property          | Token                                           |
| ----------------- | ----------------------------------------------- |
| Height            | `--step-9`                                      |
| Padding (inline)  | `--step-2_5`                                    |
| Border            | `--border` (default), `--primary` (hover/focus) |
| Radius            | `--radius-input`                                |
| Background        | `--input`                                       |
| Foreground        | `--input-foreground`                            |
| Icon size         | `--step-4_5`                                    |
| Icon-side padding | `--step-8` (via `pl-input` / `pr-input`)        |
| Focus ring        | `--focus-ring`                                  |

Every input needs a `<label class="form-label">` — visible or `sr-only`. Placeholders are not labels.

---

## Badge

Same five-variant shape as button, just smaller and non-action.

```html
<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-muted">Muted</span>
<span class="badge badge-ghost">Ghost</span>
<a class="badge badge-link" href="/tag">Link</a>
```

### Tokens

| Property   | Token                              |
| ---------- | ---------------------------------- |
| Radius     | `--radius-badge` (capsule)         |
| Padding    | small inline/block from `--step-*` |
| Font       | `--font-size-xs`, `--weight-body`  |
| Background | matches button-variant pattern     |

---

## Dialog

Native `<dialog>` with Zazz-styled backdrop, spring-eased transition, and a `data-dialog` script hook pattern.

### Anatomy

```html
<dialog class="dialog">
  <div class="dialog__modal article shadow-md">
    <button
      class="dialog__close button button-ghost button-minimal"
      data-dialog="close"
      aria-label="Close dialog"
    >
      <span class="button-icon"><!-- x icon --></span>
    </button>

    <div class="dialog__content">
      <div class="dialog__titles">
        <h2 class="dialog__title">Dialog title</h2>
        <p class="dialog__subtitle text-sm text-muted-foreground">Supporting copy.</p>
      </div>

      <div class="dialog__body">
        <!-- forms, content -->
      </div>

      <div class="dialog__buttons">
        <button class="dialog__cancel button" type="button" data-dialog="close">Cancel</button>
        <button class="dialog__submit button button-primary" type="submit">Submit</button>
      </div>
    </div>
  </div>
</dialog>

<button class="button button-primary" data-dialog="trigger">Open dialog</button>
```

### Tokens

| Property              | Token                                                                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Modal padding         | `--gap-md`                                                                                                                                      |
| Modal border          | `1px solid var(--border)`                                                                                                                       |
| Modal radius          | `--radius-card`                                                                                                                                 |
| **Backdrop**          | **`--shade-800`** — note: this is `--shade-*` deliberately, so the backdrop dims in both light and dark modes. `--muted` would lighten in dark. |
| Open transition       | `--spring-duration` + `--spring-easing` (set in reset)                                                                                          |
| Title weight          | `--weight-strong`                                                                                                                               |
| Content gap           | `--gap-sm`                                                                                                                                      |
| Buttons gap           | `--gap-xs`                                                                                                                                      |
| Close button position | `--gap-xs` from top and right                                                                                                                   |
| z-index               | `9999`                                                                                                                                          |

Note: `dialog__modal` often composes with the `article` width for constrained reading. The native `<dialog>` handles focus trap, `Esc` to close, and the inert background — don't reinvent.

---

## Avatar

```html
<!-- Image avatar -->
<div class="avatar">
  <img class="avatar__profile" src="/user.jpg" alt="" />
</div>

<!-- Initials fallback -->
<div class="avatar">
  <span class="avatar__initials">DN</span>
</div>

<!-- Author block (avatar + name + meta) -->
<div class="avatar-author">
  <div class="avatar">
    <img class="avatar__profile" src="/user.jpg" alt="" />
  </div>
  <div class="avatar-author__info">
    <span class="avatar-author__name text-sm">Derek Nelsen</span>
    <span class="avatar-author__description text-xs text-muted-foreground">15 Mar 2025</span>
  </div>
</div>
```

Tokens: circular (`--radius-full`), sized via `--step-*`, fallback initials use `--font-size-sm` and `--weight-strong`.

---

## Native form controls

Checkbox, radio, switch, slider, select — Zazz styles the native HTML elements directly via utility classes. Don't re-implement; just apply the right class.

```html
<input type="checkbox" class="checkbox" />
<input type="radio" class="radio" name="group" />
<input type="checkbox" class="switch" role="switch" />
<input type="range" class="slider" min="0" max="100" />
<select class="select">
  …
</select>
<textarea class="textarea"></textarea>
```

Each consumes theme tokens for fill, border, focus ring, and check/dot marks.

---

## Carousel and Motion

Behavior-layer primitives wired by data attributes.

- **Carousel** uses Embla Carousel under the hood, exposed via `data-carousel` and `data-carousel-*` attributes on a `<div class="carousel">` shell.
- **Motion** uses Intersection Observer to add `data-motion-state="visible"` to elements with `data-motion`. Transitions are wired in CSS using `--spring-duration` and `--spring-easing`.

When implementing in React/Vue/etc., port the behavior to your framework's idioms but keep the class names and token references for visual parity.

---

## Building a primitive that doesn't exist yet

When the user asks for a primitive Zazz doesn't ship (a tooltip, a tab bar, a breadcrumb, a toast):

1. **Use the right tokens.** Surface → `--card` or `--muted`. Text → `--card-foreground` / `--muted-foreground` / `--foreground`. Border → `--border`. Radius → match a primitive (`--radius-card` for surface-y things, `--radius-button` for inline-action things). Shadow → match the elevation intent (`--shadow-md` for floating, `--shadow-xs` for resting, `--shadow-xl` for overlay-most).
2. **Use the right type style.** `text-h6` / `text-sm` for titles in a small primitive; `text-md` for body inside a primitive.
3. **Use `--gap-*` for spacing.** Internal padding usually `--gap-sm` or `--gap-md`. Tight grouping `--gap-xs`. `--step-*` only when the gap doesn't fit.
4. **Follow the BEM pattern.** A tooltip is `tooltip` / `tooltip__arrow` / `tooltip__body`. A tab bar is `tabs` / `tabs__tab` / `tabs--vertical`.
5. **Focus-visible always.** `box-shadow: var(--focus-ring)` on `:focus-visible`. Never `:focus`.
6. **Foreground pairs always.** If you set a background, set a matching foreground.

If you're working in a component system (shadcn, Radix, etc.), let that system's pattern carry the structure and behavior; Zazz just owns the visual layer.
