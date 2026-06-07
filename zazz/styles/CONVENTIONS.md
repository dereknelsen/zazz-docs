# Zazz Component CSS Conventions

How component stylesheets in this folder are written. The goal is a clean, predictable
**override API**: every component exposes its design decisions as CSS custom properties, so a
project that consumes Zazz can retune a component by setting a variable — even when the
component's own CSS file can't be edited.

The reference examples for "good" are [_variables.css](./_variables.css) (global tokens) and
[_utilities.css](./_utilities.css) (utility classes). The model component is
[_button.css](./_button.css).

---

## 1. Token tiers — where a variable lives

Every value is a token at one of three tiers. Decide the tier first.

### Tier 1 — Global tokens → [_variables.css](./_variables.css)
Unprefixed, role-based, mode-aware. Brand, theme, scales, spacing, radius, effects, the focus
ring, decoration defaults. Use a global when **two or more components need it** or it's a
design primitive (`--primary`, `--gap-md`, `--radius-md`, `--ring`, `--decoration-color`).

### Tier 2 — Component tokens → the component file, on its base selector
`--<component>-<property>`, declared at the top of the base rule, consumed by the properties
below. Geometry plus the remapping of theme tokens for that one component. **This set is the
component's public override API.** Variants/sizes/states only re-point these tokens.

```css
.button {
  --button-background: var(--card);          /* declare the API up top … */
  --button-radius: var(--radius-md);
  background-color: var(--button-background); /* … consume it below */
  border-radius: var(--button-radius);
}
.button[data-variant="primary"] {
  --button-background: var(--primary);        /* a variant is just token swaps */
}
```

### Tier 3 — Shared family tokens → one owner file, siblings remap
A named set shared by a family of components. Declared and documented in one **owner** file;
sibling components only re-point the tokens, never redefine the set.

| Family        | Owner                              | Consumers                                              |
| ------------- | ---------------------------------- | ----------------------------------------------------- |
| `--field-*`   | [_fields.css](./_fields.css)       | `.input`, `.textarea`, `.select`, `.input-group`, `.password-group` |
| `--dialog-*`  | [_dialog.css](./_dialog.css)       | `.mobile-menu`                                         |
| `--popover-*` | shared vocabulary¹                 | `.dropdown__popover`, `.navigation-menu` (consumed by `:where([popover])` in [_reset.css](./_reset.css)) |

¹ `--popover-*` is a shared *vocabulary*: each popover component sets its own values under the
same names. Keep the names aligned; there's no single owner.

### Two rules that fall out of the tiers
- **No pass-through aliases.** Don't alias a global into a local unless a variant or state
  actually overrides it. If a component never changes a value, consume the global directly. A
  consumer can still override by setting the global token name at element scope.
  _Before:_ `--button-decoration-color: var(--decoration-color)` then
  `var(--button-decoration-color)` — never overridden, pure noise.
  _After:_ consume `var(--decoration-color)` directly.
- **Every consumed local token has a default** in the base rule. No implicit "caller must
  supply this" contracts (e.g. `--lightbox-columns: 3` is declared, not assumed).

---

## 2. Naming

- `--<component>-<property>`, **full words, no abbreviations**
  (`--navigation-menu-submenu-trigger`, not `--nav-sub-trg`).
- Sub-parts nest under the component: `--<component>-<part>-<property>`
  (`--tabs-label-foreground`, `--tabs-indicator-radius`).
- **Pseudo-element parts get a part name under the component prefix**, never a bare prefix:
  `--input-calendar-picker-size`, `--select-picker-icon-color` — not `--calendar-picker-*` /
  `--picker-icon-*`.
- **State suffix is a double dash:** `--<…>--<state>`, where state ∈ {`hover`, `active`,
  `focus`, `checked`, `disabled`, …}. Compound states chain after the `--`:

  ```css
  --switch-track-background: var(--muted);
  --switch-track-background--hover: …;
  --switch-track-background--checked: …;
  --switch-track-background--checked-hover: …;   /* compound */
  ```

---

## 3. `:where()` and specificity

Override-ability comes from **cascade layers**, declared in [index.css](./index.css):

```css
@layer variables, reset, components, utilities;
```

A consumer's own CSS (un-layered, or in a later layer) beats **any** layered rule regardless of
selector specificity. So `:where()` is **not** what makes components overridable — the layer is.
Use `:where()` only where it does real work:

- **Components — default to no `:where()`.** Within a component, precedence already comes from
  natural specificity in the order you want: base (`.button`) < variant/size
  (`.button[data-variant]`) < state (`.button:hover`). This works because the token-API pattern
  keeps variants setting *variables* while only the base and states set *properties* — so they
  don't collide. Add `:where()` back only to **demote** a selector that would otherwise win out
  of order — typically a `:has()` context or a deep descendant:

  ```css
  /* Keep :where() here: zero out the :has() context so only .field__label
     contributes specificity, matching the plain .field__label rule. */
  :where(.field:has(:user-invalid)) .field__label { --field-label-color: var(--destructive); }
  ```

  Never half-wrap a component (wrapping the base but not its variants inverts precedence).

- **Reset — keep `:where()`.** Native-element baselines (`html`, `input`, `dialog`) and native
  control internals (switch, `<select>` picker) intentionally sit at zero specificity so author
  styles always win. Don't nest `:where()` inside `:where()` — it's redundant (`:where(abbr[title])`,
  not `:where(abbr:where([title]))`).

- **Utilities — keep `:where()`.** Zero specificity is load-bearing: utilities must be trivially
  overridable, and stacked utilities resolve by source order, not specificity.

---

## 4. `data-*` attributes, not modifier classes

Variants and component state are **data attributes** that swap token sets; one-off layout on an
instance uses **utility classes**. Never mix a `.primary`-style modifier class with
`data-variant`. Values are full words, kebab-case.

| Attribute        | Purpose                | Values                                                |
| ---------------- | ---------------------- | ----------------------------------------------------- |
| `data-variant`   | visual intent          | `primary`, `muted`, `ghost`, `destructive`, `link`, … |
| `data-size`      | t-shirt sizing         | `sm`, `md`, `lg`, `icon`, `icon-sm`                    |
| `data-side`      | popover side           | `top`, `right`, `bottom`, `left`                       |
| `data-align`     | popover alignment      | `start`, `center`, `end`                               |
| `data-direction` | layout direction       | `horizontal`, `vertical`                               |
| `data-animation` | entrance animation     | `slide-down`, `slide-right`, …                         |

Otherwise lean on native state — `:checked`, `[open]`, `[aria-disabled]`, `:popover-open`.

**Documented exception:** width-bearing components (dialog, navigation-menu) use *semantic* size
names (`article`, `container`, `screen`) instead of the t-shirt scale, because the size names a
width role, not a t-shirt step.

---

## Checklist for a new component

1. Pick the tier for each value (global / component / shared family).
2. Declare the full `--<component>-*` API at the top of the base rule; consume it below.
3. Variants/sizes are `[data-*]` blocks that only re-point tokens.
4. No `:where()` unless you're demoting a `:has()`/descendant selector.
5. States use the `--…--state` suffix; every local token has a default.
6. Full words everywhere — selectors, variant values, and custom properties.
