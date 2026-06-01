{
  /*
  DIALOG — .dialog
  ─────────────────────────────────────────────────────────────────────────────
  Element:   Native <dialog> with class="dialog"
  Opening:   Invoker Commands API — button[command="show-modal"][commandfor="id"]
  Closing:   closedby="any" (backdrop click) + button[command="close"]

  Sizes (data-size attribute on .dialog):
    (none)    — Default width: var(--article) ≈ 40rem
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
}

export function Dialog() {
  return (
    <>
      {/* Dialog START */}
      <button className="button" type="button" command="show-modal" commandfor="dialog-1">
        Dialog
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <line
            x1="64"
            y1="192"
            x2="192"
            y2="64"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <polyline
            points="88 64 192 64 192 168"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      </button>
      <dialog id="dialog-1" className="dialog" closedby="any">
        <div className="dialog__content">
          <header className="dialog__header">
            <h1 className="text-lg weight-strong">Dialog title</h1>
            <p className="text-muted-foreground">Dialog description goes here.</p>
          </header>
          <div className="dialog__body text-prose">
            <p>
              This dialog was opened using an{" "}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API"
                target="_blank"
                className="text-link"
              >
                invoker command
              </a>
              .
            </p>
            <p>
              Set the size of the dialog with the <code>data-size</code> attribute. <code>
              &lt;dialog class="dialog" data-size="large"&gt;
            </code>  <code>
              &lt;dialog class="dialog" data-size="screen"&gt;
            </code>
            </p>
          </div>
        </div>
        <footer className="dialog__footer">
          <button className="button" type="button" commandfor="dialog-1" command="close">
            Cancel
          </button>
          <button className="button" data-variant="primary" commandfor="dialog-1" command="close">
            Accept
          </button>
        </footer>
        <button
          className="button absolute top-xs right-xs"
          data-size="icon"
          data-variant="ghost"
          type="button"
          commandfor="dialog-1"
          command="close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <line
              x1="200"
              y1="56"
              x2="56"
              y2="200"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="200"
              y1="200"
              x2="56"
              y2="56"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
        </button>
      </dialog>
      {/* Dialog END */}
    </>
  );
}
