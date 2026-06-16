# Zazz

**A variables-driven design framework that survives real projects.**

Zazz is a zero-build CSS and UI kit for the modern web, a lightweight alternative to Tailwind and shadcn. It needs no bundler and no framework. It runs on native web standards: design tokens, cascade layers, and modern browser APIs like Popover, `<dialog>`, anchor positioning, and view transitions. You link one stylesheet and write markup.

To customize it, you change tokens rather than override rules. Change one variable and every component that reads it updates, with no source edits and no `!important`.

This repository holds both **Zazz itself** (the `zazz/` folder) and the **documentation site** that demonstrates it.

## Why Zazz

- **Zero build step.** Plain CSS and native HTML APIs. No bundler or framework dependency.
- **Tokens drive everything.** Spacing, color, radius, and type all resolve from variables. To customize, you override a token instead of editing the source.
- **Cascade layers.** Utilities override components without `!important` or selector tricks.
- **Dark mode included.** Role tokens resolve light and dark through `light-dark()`, so you never hand-write `.dark` overrides.
- **Portable.** Works in plain HTML and in any framework, including Next.js, Astro, Webflow, and WordPress. The markup stays the same when your stack changes.

## Quick start

1. Copy the `zazz/styles/` folder into your project:

   ```bash
   git clone https://github.com/dereknelsen/zazz-docs.git
   cp -r zazz-docs/zazz/styles ./zazz/styles
   ```

2. Link the stylesheet and declare your color scheme:

   ```html
   <head>
     <meta name="color-scheme" content="light dark" />
     <link rel="stylesheet" href="./zazz/styles/zazz.css" />
   </head>
   ```

3. Write markup with components and utility classes:

   ```html
   <button class="button" data-variant="primary">It works</button>
   ```

`zazz.css` imports every token, reset, component, and utility in the correct cascade order. For the full walkthrough, see [Installation](content/docs/getting-started/installation.mdx).

## What's in this repo

| Path                          | What it is                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| `zazz/styles/`                | The design system: tokens, reset, components, and utilities. This is what you ship. |
| `zazz/scripts/`               | Vanilla-JS enhancements: carousel, lightbox, reveal, tabs, password. No build step. |
| `zazz/components/`            | The canonical HTML example for each component, used as the single source of truth.  |
| `content/docs/`               | The documentation, authored in MDX.                                                 |
| `app/`, `components/`, `lib/` | The Next.js and Fumadocs site that renders the docs.                                |

## Run the docs site

The documentation is a Next.js app built with [Fumadocs](https://fumadocs.dev).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `pnpm build` (production build), `pnpm types:check` (typecheck and MDX), `pnpm lint`, `pnpm fmt`.

## Documentation

- [Introduction](content/docs/index.mdx): what Zazz is, and the four commitments behind it
- [Getting started](content/docs/getting-started): install, structuring your head tag, page transitions
- [Core concepts](content/docs/core-concepts): utility classes, states, responsive design, dark mode, theming, colors
- [Core files](content/docs/core-files): `layers.css`, `_reset.css`, file anatomy, scripting
- [Components](content/docs/components): buttons, forms, dialogs, navigation, and more
- [Utilities](content/docs/utilities): the full utility-class reference

## License

[MIT](LICENSE) © Derek Nelsen
