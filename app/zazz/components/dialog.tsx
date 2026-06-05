/*
  DIALOG — .dialog
  ─────────────────────────────────────────────────────────────────────────────
  Element:   Native <dialog> with class="dialog"
  Opening:   Invoker Commands API — button[command="show-modal"][commandfor="id"]
  Closing:   closedby="any" (backdrop click) + button[command="close"]

  Sizes (data-size attribute on .dialog):
    none    — Default width: var(--article) ≈ 40rem
    "large"   — Width: var(--container) ≈ 80rem
    "screen"  — Full viewport minus gap-md margins

  Structure:
    dialog.dialog
      .dialog__content          — Scrollable content area (max-height: 100svh - gaps)
        .dialog__header         — Title + description (padding-inline: gap-sm, padding-top: gap-sm)
        .dialog__body           — Main content (padding-inline: gap-sm, padding-block: gap-md)
      .dialog__footer           — Sticky bottom bar (border-top, flex-end, gap-xs)
      button[command="close"]   — Top-right close icon (absolute positioned)

  Styling: --card background, --shadow-lg, --radius-lg, overflow clip.
  Backdrop: handled by native dialog ::backdrop (styled in _reset.css).
  Animation: scale + opacity via native dialog open/close transitions.

  Note: Requires NO JavaScript. Uses the Invoker Commands API (command/commandfor).
  ─────────────────────────────────────────────────────────────────────────────
*/

// Markup is authored as raw HTML so the docs mirror the vanilla markup exactly.
const html = /* html */ `
<!-- Dialog START -->
<button class="button" type="button" command="show-modal" commandfor="dialog-1">
  Dialog
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none" />
    <line x1="64" y1="192" x2="192" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
    <polyline points="88 64 192 64 192 168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
  </svg>
</button>
<dialog id="dialog-1" class="dialog" closedby="any">
  <div class="dialog__content">
    <header class="dialog__header">
      <h2 class="text-lg font-heading weight-strong">Dialog title</h2>
      <p class="text-muted-foreground"> This dialog was opened using an
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API" target="_blank" class="text-link">invoker command</a>.</p>
    </header>
    <div class="dialog__body">
      <p>
        Set the size of the dialog with the <code>data-size</code> attribute. Use <code>data-size="large"</code> or <code>data-size="screen"</code> to change the size of the dialog.
      </p>
    </div>
    <footer class="dialog__footer">
      <button class="button" type="button" commandfor="dialog-1" command="close">Cancel</button>
      <button class="button" data-variant="primary" commandfor="dialog-1" command="close">Accept</button>
    </footer>
  </div>
  <button class="button dialog__close" data-size="icon" data-variant="ghost" type="button" commandfor="dialog-1" command="close">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none" />
      <line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
      <line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
    </svg>
  </button>
</dialog>
<!-- Dialog END -->
`;

export function Dialog() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
