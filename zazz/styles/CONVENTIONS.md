# Zazz CSS Conventions

How the stylesheets in `zazz/styles/` are documented and structured.

This is the source of truth for two things:

1. **CSSDoc** — a small, JSDoc-shaped comment vocabulary for file headers.
2. **File anatomy** — the cascade-layer structure every file follows, with special
   attention to the per-component **variables layer** that exposes theming "hooks".

---

## 1. Why CSSDoc (and not KSS)

[KSS](https://github.com/kss-node/kss) is the best-known CSS documentation format, but
it predates the platform we build on: `@layer`, `@property`, `light-dark()`, anchor
positioning, container `style()` queries, `@starting-style`, and `:has()`. Rather than
bend a 2010-era format around modern CSS, we use a minimal **JSDoc-shaped** convention.

CSSDoc is intentionally lightweight:

- It documents **files**, not every rule. The cascade layers and token names carry most
  of the structure; comments fill in intent, dependencies, and browser caveats.
- It is **machine-greppable**. `grep '@requires' zazz/styles/*.css` builds a dependency
  graph; `grep '@uses' …` inventories which modern CSS features the system relies on.
- It **keeps existing prose**. The tags relabel what the headers already said.

---

## 2. File anatomy

Cascade order is declared once, in [`_layers.css`](./_layers.css), and must load first:

```css
@layer variables, reset, components, utilities;
```

Load order lives in two parallel entry points. [`styles.ts`](./styles.ts) is the source
of truth — a bundler entry (Vite/webpack/esbuild) whose `import` sequence defines the
order and compiles the served `main.css` asset. [`main.css`](./main.css) is the
plain-CSS entry for `<link rel="stylesheet">` setups: it `@import`s `_layers.css` first
and then every component file in the same order. Everything slots into one of these four
layers. Layering — not selector specificity or BEM — is how we control the cascade, so a
plain `.button` rule in `components` can still be overridden by a `utilities` class
without `!important`.

A component file is written top-to-bottom in this order:

| # | Section | Layer | Required? |
|---|---------|-------|-----------|
| 1 | CSSDoc header | — | always |
| 2 | Component token hooks | `@layer variables` | when the component has tokens |
| 3 | Native-element baselines | `@layer reset` | only if it redraws native UI |
| 4 | Component rules | `@layer components` | the component itself |
| 5 | Utility classes | `@layer utilities` | only if it ships utilities |

```css
/**
 * _button.css — Button (.button)
 *
 * @layer      variables, components
 * @requires   _layers.css, _variables.css, _reset.css
 * @uses       color-mix(), oklch(from …) — variant hover/active tints
 * @uses       text-box — vertical trim (patchy browser support)
 * @tokens     --button-* (@layer variables)
 */
@layer variables {
  :root {
    /* the component's override hooks — see §5 */
  }
}

@layer components {
  .button {
    /* rules that consume the hooks above */
  }
}
```

The four layers, by responsibility:

- **`variables`** — token declarations only (`:root { --x: … }`). Global tokens live in
  [`_variables.css`](./_variables.css); each component adds its own namespace here.
- **`reset`** — native-element baselines and control internals that must *lose* to
  component rules (e.g. `::details-content` in [`_accordion.css`](./_accordion.css),
  the `::picker` chrome in [`_select.css`](./_select.css), the redrawn switch in
  [`_switch.css`](./_switch.css)). [`_reset.css`](./_reset.css) owns the global baseline.
- **`components`** — the actual component (`.button`, `.dialog`, `.field`).
- **`utilities`** — atomic, override-anything classes ([`_utilities.css`](./_utilities.css)),
  written with `:where()` for zero specificity.

---

## 3. The CSSDoc header standard

Every `.css` file opens with a JSDoc block comment (`/** … */`). A free-text summary
line comes first, then block tags. Within a block, tag **values align to a common
column** (tag name padded to 11 chars + a space) so headers scan like a table.

### Tag reference

| Tag           | Required | Meaning |
|---------------|----------|---------|
| *(summary)*   | yes | First line: `_file.css — Component (.selector)`. Kept verbatim. |
| `@layer`      | yes | Cascade layers this file contributes to, in order: `variables, components`. |
| `@requires`   | yes | Load-order dependencies — files that must load before this one. `none` for `_layers.css`. |
| `@uses`       | — | One modern CSS API/feature per line, with an inline `— note`. Flag support caveats here. |
| `@tokens`     | when owned | The token namespace this file exposes = its override hooks, e.g. `--button-* (@layer variables)`. |
| `@consumedby` | when applicable | Reverse dependency — files that build on this one. |
| `@see`        | — | External URL or cross-file reference. (Replaces the old block `@link`.) |
| `@example`    | — | Usage markup. Used where authoring is non-obvious (`_reveal.css`). |
| `@version` / `@since` | — | Optional, for versioned subsystems (`_reveal.css`). |

### Rules

- **Open with `/**`** (two stars), close with ` */`. One space-star-space per line.
- **Summary line is verbatim** — don't reword existing component descriptions.
- **`@requires`** is one comma-separated line; wrap long lists and indent the
  continuation to the value column. Always include `_layers.css` (every file needs the
  layer order) plus any token/component files it reads.
- **`@uses`** gets one tag per feature. Put the browser-support caveat in the note
  (`— Chromium 135+`, `— patchy browser support`, `— @supports gated`). This is where a
  reader learns what might need a fallback.
- **`@tokens`** names the namespace, not every token (the tokens self-document via
  naming — see §5). Note tier ownership for shared families:
  `--field-* (Tier 3 owner; @layer variables)`.
- **`@consumedby`** mirrors `@requires` from the other direction. If you add a file that
  `@requires _foo.css`, add it to `_foo.css`'s `@consumedby`.

### Worked example

The header from [`_fields.css`](./_fields.css), showing every tag in use:

```css
/**
 * _fields.css — Shared form field family (Tier 3 owner for --field-*)
 *
 * @layer      variables, components
 * @requires   _layers.css, _variables.css
 * @uses       :user-invalid — validation after commit (not while typing)
 * @uses       :has(:user-invalid) — label/hint/error crossfade
 * @uses       @starting-style + visibility allow-discrete — hint ↔ error swap
 * @uses       color-mix() — destructive field tint on invalid
 * @tokens     --field-*, --field-group-* (Tier 3 owner; @layer variables)
 * @consumedby _input.css, _textarea.css, _select.css, _input-group.css,
 *             _password-group.css, _radio.css (.radio-group)
 */
```

---

## 4. Comment styles inside a file

Three comment styles, each with a job:

**Section banners** separate major regions inside a layer. Keep the existing
75-column rule style:

```css
  /* ===========================================================================
  BUTTON VARIANTS
  =========================================================================== */
```

**Token group labels** are short lowercase tags inside a `@layer variables` block.
They group related hooks; they do **not** document individual tokens (the names do):

```css
  :root {
    /* surface */
    --button-background: var(--card);
    --button-background--hover: var(--muted);
    /* metrics */
    --button-height: var(--step-8);
  }
```

**Inline rule comments** explain intent — the *why*, not the *what* — above a
declaration or rule. Reserve them for non-obvious choices (a fallback, a calc, a hack):

```css
  /* Thumb centered on the track via a calc'd negative margin so retuning
     either size keeps it aligned. */
```

---

## 5. The variables layer = theming "hooks"

This is the heart of the system. Components never hard-code values; they read **tokens**,
and tokens are layered so an application can re-skin the system at three different scopes
without editing a single rule.

### Tiered tokens

Global tokens live in [`_variables.css`](./_variables.css) under `@layer variables`,
organized in tiers (literal scales → semantic roles → component primitives):

| Tier | Example | Where |
|------|---------|-------|
| Brand/literal scales | `--primary-600`, `--neutral-100`, `--shade-50` | `_variables.css` |
| Semantic roles | `--background`, `--foreground`, `--primary`, `--muted`, `--border` | `_variables.css` |
| Metrics & systems | `--step-*`, `--radius-*`, `--gap-*`, `--font-size-*`, `--shadow-*` | `_variables.css` |
| **Component tokens** | `--button-background`, `--field-border`, `--dialog-radius` | each component file |

Selected tokens are also **registered as typed `@property`** in
[`_properties.css`](./_properties.css) so they can be read by container `style()`
queries with typed comparison/range syntax. Theme roles register with `syntax: "*"` so
`light-dark()` re-resolves correctly under a descendant's `color-scheme`.

### Local component tokens

Every component re-declares a namespace in its own `@layer variables` block, and each
token **defaults to a global token**:

```css
@layer variables {
  :root {
    --button-background: var(--card);
    --button-background--hover: var(--muted);
    --button-height: var(--step-8);
    --button-radius: var(--radius-md);
  }
}
```

Naming convention:

- `--{component}-{property}` — `--button-background`, `--dialog-radius`.
- `--{component}-{property}--{state}` — a **double dash** before the state:
  `--button-background--hover`, `--field-background--focus`,
  `--button-background--active`.

### Rules reference a token once; variants swap the token

Component rules read the token a single time. Variants and sizes then only **reassign
token values** — they never restate the rule:

```css
@layer components {
  .button {
    background-color: var(--button-background);   /* referenced once */
  }

  /* a variant changes the value, not the rule */
  .button[data-variant="primary"] {
    --button-background: var(--primary);
    --button-background--hover: oklch(from var(--primary) l c h / 0.9);
  }

  .button[data-size="sm"] {
    --button-height: var(--step-6);
    --button-radius: var(--radius-sm);
  }
}
```

This is what keeps the files small and the system consistent: one declaration of
`background-color`, many token values.

### The three override surfaces (the hooks)

Because rules resolve tokens lazily, an app can intervene at any of three scopes:

1. **Global** — redefine a semantic token in `_variables.css` (or on `:root` in app CSS):
   ```css
   :root { --radius-md: 0; }        /* squares every component's medium radius */
   ```
2. **Component default** — redefine a component token on `:root`/a scope to re-skin
   every instance of that component:
   ```css
   :root { --button-radius: var(--radius-full); }   /* all buttons go pill-shaped */
   ```
3. **Instance** — set the token inline or via a variant/size attribute for a one-off:
   ```html
   <button class="button" style="--button-background: var(--secondary)">One-off</button>
   ```

Authoring an override never requires touching `zazz/styles/`. That is the point of the
variables layer.

### Dark mode is a hook too

- `color-scheme: light dark` on `:root` enables system dark mode; semantic tokens use
  `light-dark(<light>, <dark>)` so they resolve per `color-scheme`.
- A manual `.dark` class re-declares the same semantic tokens (descendant `color-scheme`
  alone won't re-resolve an already-inherited `light-dark()` color — keep these tokens
  **unregistered** so they re-resolve late).
- Inverted surfaces (dark popovers/menus over a light page) flip via a container style
  query: `@container style(--use-inverted-menu: "true")` on `[popover]`.

---

## 6. Naming & selector conventions

- **Blocks & elements**: `.component` and `.component__part`
  (`.input-group`, `.input-group__addon`). No BEM modifier classes — use attributes.
- **Variants & sizes**: data attributes — `[data-variant="primary"]`, `[data-size="sm"]`,
  `[data-side]`, `[data-align]`, `[data-animation]`. They read as state and double as
  token-override hooks.
- **Zero-specificity where overridable**: wrap reset and utility selectors in `:where()`
  so they sit at specificity 0 and stay overridable
  (`:where(input[type="range"])`, `:where(.grid)`).
- **Logical properties**: prefer `inline-size`/`block-size`,
  `padding-inline`/`margin-block`, `inset-inline-start` so components flip in RTL.
- **Focus**: `:focus-visible` + `outline` + `outline-offset`, never `outline: none`
  without a replacement. Rings are built from `--ring-*` tokens.
- **State exclusion**: express intent with `:not()` (`button:hover:not(:disabled)`)
  rather than order-dependent overrides.

---

## 7. Allowed variations

These deviate from the canonical shape on purpose — document the reason in-file:

- **Split `@layer variables` blocks** — [`_dialog.css`](./_dialog.css) declares motion
  tokens up top and sizing tokens in a second block lower down. Fine; label the second
  block.
- **Component living in `@layer reset`** — [`_switch.css`](./_switch.css) redraws the
  native `input[role="switch"]`, so it belongs in `reset` (it must lose to component
  overrides). Note it in `@tokens`.
- **`@supports`-gated progressive enhancement** — [`_popover.css`](./_popover.css),
  [`_tabs.css`](./_tabs.css), and [`_select.css`](./_select.css) gate anchor positioning
  / `base-select` behind `@supports` with a documented fallback. Always describe the
  fallback in the `@uses` note.
- **Attribute-hook components** — [`_embla.css`](./_embla.css) and
  [`_lightbox.css`](./_lightbox.css) style `[data-*]` hooks whose behaviour comes from
  `zazz/scripts/*.js`. Declare the JS dependency in a `@uses` line.
- **Extended header** — [`_reveal.css`](./_reveal.css) keeps `@version`/`@since`/
  `@example` plus a data-attribute table because it is a configurable subsystem, not a
  single component.

---

## 8. Adding a new component

1. Create `_<component>.css` and register it in load order (after anything it
   `@requires`) — add the `import` to [`styles.ts`](./styles.ts) (the source of truth)
   and the matching `@import` to [`main.css`](./main.css).
2. Start with the CSSDoc header skeleton:

   ```css
   /**
    * _<component>.css — <Component> (.<selector>)
    *
    * @layer      variables, components
    * @requires   _layers.css, _variables.css
    * @uses       <feature> — <note / support caveat>
    * @tokens     --<component>-* (@layer variables)
    */
   ```
3. Declare the token hooks, each defaulting to a global token:

   ```css
   @layer variables {
     :root {
       /* surface */
       --<component>-background: var(--card);
       --<component>-background--hover: var(--muted);
       /* metrics */
       --<component>-radius: var(--radius-md);
     }
   }
   ```
4. Write the rules in `@layer components`, referencing each token once.
5. Add variants/sizes as `[data-*]` selectors that **only reassign tokens**.
6. If you read another component's tokens, add this file to that file's `@consumedby`.
7. If you redraw native UI, put those rules in `@layer reset` and say why.
