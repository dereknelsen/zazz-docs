# Zazz — source of truth

This directory is the **Zazz design framework itself**, kept deliberately separate
from the fumadocs site that documents it. The app is the wrapper; this is the truth.

```
zazz/
  styles/      CSS — tokens, reset, typography, utilities, one partial per component
               (see styles/CONVENTIONS.md for how component CSS is written)
  examples/    One vanilla-HTML file per documented demo — the single source rendered
               as BOTH the live preview iframe and the copy-paste code on the docs page
  scripts/     Runtime JS for interactive primitives (reveal, embla, utils)
  examples/manifest.ts   Per-demo preview metadata (scripts, min-height, alignment)
```

## The boundary (do not cross it)

- **Nothing in `zazz/` imports from the app** — no `@/…`, no Tailwind, no shadcn, no
  fumadocs. It is plain CSS, HTML, and JS that would work in any project.
- The app consumes Zazz one direction only, via:
  - `lib/zazz-assets.ts` — reads CSS / scripts / examples from here (server-side).
  - `app/zazz/[...asset]/route.ts` — serves `/zazz/styles.css` and `/zazz/scripts/*`.
  - `components/preview.tsx` + `components/preview-frame.tsx` — render examples inside
    isolated iframes that load **only** `/zazz/styles.css`, so Zazz's reset/utilities
    never mingle with the docs' Tailwind/fumadocs styles (and vice-versa).
- Docs reference an example with `<Preview src="button/variants" />`. The same file
  feeds the page's processed markdown / `llms.txt` (see `expandPreviewsInMarkdown`),
  so an AI reading a component's page gets correct, current markup.

## Adding a demo

1. Write `examples/<primitive>/<demo>.html` as pure Zazz markup.
2. If it needs a script, a taller frame, or centering, add an entry to
   `examples/manifest.ts`.
3. Reference it from the MDX page: `<Preview src="<primitive>/<demo>" />`.

## Known gaps (CSS not yet authored)

These primitives are **documented and have examples, but no component CSS yet**, so
their previews render with only the base reset/tokens until the partials are written:

- [ ] `styles/_avatar.css` — `.avatar`, `.avatar__initials`, `.avatar__profile`, `.avatar-author*`
- [ ] `styles/_card.css` — `.card`, `.card__figure/__image/__content/__body/__footer/__button` (documented as a composition pattern; may stay utility-composed)
- [ ] `styles/_slider.css` — styled `input[type="range"]`
- [ ] `styles/_checkbox.css` — `.field` checkbox visuals (a `checkbox.tsx` demo existed but no partial was ever wired into `styles/load.ts`)

When authoring, follow `styles/CONVENTIONS.md` and add the new partial to
`styles/load.ts` (the asset route derives its concatenation order from that file).
