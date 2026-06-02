/*
  ─────────────────────────────────────────────────────────────────────────────
  Element:   <a> (typical) or <button>
  Class:     .badge

  Smaller sibling of .button — used for tags, labels, navigation pills.
  Height: --step-5 (1.25rem). Font: --font-size-xs. Radius: --radius-sm.

  Variants (data-variant attribute):
    (none)    — Default: card background, border, foreground text
    "primary" — Primary brand color background, white text
    "muted"   — Muted/subtle background, no visible border
    "ghost"   — Transparent until hover (reveals muted fill)
    "link"    — No background, underline text decoration, no height constraint

  Sizes (data-size attribute):
    (none)    — Standard height (--step-5), inline padding (--step-2)
    "icon"    — Square (height × height), no padding, centers child SVG

  Icons:
    Place an <svg> directly inside .badge — it auto-sizes to --step-3 (0.75rem).

  Interactive states (hover/active/focus) only apply to:
    button.badge or a[href].badge — plain .badge without href is inert.

  States: hover, active, focus-visible (ring), disabled, aria-busy
  ─────────────────────────────────────────────────────────────────────────────
*/

// Markup is authored as raw HTML so the docs mirror the vanilla markup exactly.
const html = /* html */ `
<!-- Badges START -->
<div class="flex flex-col gap-sm">
  <div class="flex items-center gap-sm">
    <a href="#" class="badge">Badge</a>
    <a href="#" class="badge" data-size="icon">
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <circle cx="128" cy="128" r="12" />
        <circle cx="196" cy="128" r="12" />
        <circle cx="60" cy="128" r="12" />
      </svg>
    </a>
  </div>
  <div class="flex items-center gap-sm">
    <a href="#" class="badge" data-variant="primary">Badge</a>
    <a href="#" class="badge" data-variant="primary" data-size="icon">
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <circle cx="128" cy="128" r="12" />
        <circle cx="196" cy="128" r="12" />
        <circle cx="60" cy="128" r="12" />
      </svg>
    </a>
  </div>
  <div class="flex items-center gap-sm">
    <a href="#" class="badge" data-variant="muted">Badge</a>
    <a href="#" class="badge" data-variant="muted" data-size="icon">
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <circle cx="128" cy="128" r="12" />
        <circle cx="196" cy="128" r="12" />
        <circle cx="60" cy="128" r="12" />
      </svg>
    </a>
  </div>
  <div class="flex items-center gap-sm">
    <a href="#" class="badge" data-variant="ghost">Badge</a>
    <a href="#" class="badge" data-variant="ghost" data-size="icon">
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <circle cx="128" cy="128" r="12" />
        <circle cx="196" cy="128" r="12" />
        <circle cx="60" cy="128" r="12" />
      </svg>
    </a>
  </div>
  <div class="flex items-center gap-sm">
    <a href="#" class="badge" data-variant="link">Badge</a>
    <a href="#" class="badge" data-variant="link" data-size="icon">
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <circle cx="128" cy="128" r="12" />
        <circle cx="196" cy="128" r="12" />
        <circle cx="60" cy="128" r="12" />
      </svg>
    </a>
  </div>
</div>
<!-- Badges END -->
`;

export function Badge() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
