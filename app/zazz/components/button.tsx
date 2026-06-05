/*
  BUTTON — .button
  ─────────────────────────────────────────────────────────────────────────────
  Element:   <button> or <a> (add href for pointer cursor on anchors)
  Class:     .button

  Variants (data-variant attribute):
    none    — Default: card background, border, foreground text
    "primary" — Primary brand color background, white text
    "muted"   — Muted/subtle background, no visible border
    "ghost"   — Transparent until hover (reveals muted fill)
    "link"    — No background, underline text decoration, no height constraint

  Sizes (data-size attribute):
    none    — Standard height (--step-8), inline padding (--step-2_5)
    "icon"    — Square (height × height), no padding, centers child SVG

  Icons:
    Place an <svg> directly inside .button — it auto-sizes to --step-4 (1rem).
    Icons work alongside text or alone (with data-size="icon").

  States: hover, active, focus-visible (ring), disabled, aria-busy
  ─────────────────────────────────────────────────────────────────────────────
*/

// Markup is authored as raw HTML so the docs mirror the vanilla markup exactly.
const html = /* html */ `
<!-- Buttons START -->
<div class="flex flex-col gap-sm">
  <div class="flex items-center gap-sm">
    <button class="button">Button</button>
    <button class="button" data-size="icon">
      <span class="sr-only">Icon button default</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
      </svg>
    </button>
  </div>
  <div class="flex items-center gap-sm">
    <button class="button" data-variant="primary">Primary</button>
    <button class="button" data-variant="primary" data-size="icon">
      <span class="sr-only">Icon button primary</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
      </svg>
    </button>
  </div>
  <div class="flex items-center gap-sm">
    <button class="button" data-variant="muted">Muted</button>
    <button class="button" data-variant="muted" data-size="icon">
      <span class="sr-only">Icon button muted</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
      </svg>
    </button>
  </div>
  <div class="flex items-center gap-sm">
    <button class="button" data-variant="ghost">Ghost</button>
    <button class="button" data-variant="ghost" data-size="icon">
      <span class="sr-only">Icon button ghost</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
      </svg>
    </button>
  </div>
  <div class="flex items-center gap-sm">
    <button class="button" data-variant="destructive">Destructive</button>
    <button class="button" data-variant="destructive" data-size="icon">
      <span class="sr-only">Icon button destructive</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
      </svg>
    </button>
  </div>
  <div class="flex items-center gap-sm">
    <button class="button" data-variant="link">Button Link</button>
    <button class="button" data-variant="link" data-size="icon">
      <span class="sr-only">Icon button link</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
      </svg>
    </button>
  </div>
</div>
<!-- Buttons END -->
`;

export function Button() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
