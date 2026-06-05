/*
  ALERT DIALOG — .dialog
  ─────────────────────────────────────────────────────────────────────────────
  Element:   Native <dialog> with class="dialog"
  Opening:   Invoker Commands API — button[command="show-modal"][commandfor="id"]
  Closing:   closedby="none" — only explicit footer actions (no backdrop, no Esc)

  Same structure and styling as .dialog. Differs from a regular dialog:
    - closedby="none" blocks light dismiss and Esc — user must choose an action
    - No top-right close icon
    - Short confirmation copy; footer holds Cancel + Confirm

  Structure:
    dialog.dialog
      .dialog__content
        .dialog__header         — Title + description
        .dialog__body           — Optional supporting copy
      .dialog__footer           — Cancel + Confirm actions

  Note: Requires NO JavaScript. Uses the Invoker Commands API (command/commandfor).
  ─────────────────────────────────────────────────────────────────────────────
*/

// Markup is authored as raw HTML so the docs mirror the vanilla markup exactly.
const html = /* html */ `
<!-- Alert dialog START -->
<button class="button" type="button" data-variant="destructive" command="show-modal" commandfor="alert-dialog-1">
  Delete account
</button>
<dialog id="alert-dialog-1" class="dialog" closedby="none">
  <div class="dialog__content">
    <header class="dialog__header flex-row items-center gap-xs text-destructive">
      <svg class="size-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path fill="currentColor" d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/></svg>
      <h2 class="text-lg font-heading weight-strong">Are you absolutely sure?</h2>
    </header>
    <div class="dialog__body italic">
      <p>
        Alert dialogs must be closed by clicking the Cancel or Continue buttons. Changing <code>closedby="none"</code> to <code>closedby="any"</code> allows the user to close the dialog by clicking outside the dialog or pressing the Escape key.
      </p>
    </div>
  </div>
  <footer class="dialog__footer">
    <button class="button" type="button" commandfor="alert-dialog-1" command="close">Cancel</button>
    <button class="button" data-variant="destructive" type="button" commandfor="alert-dialog-1" command="close">
      Delete account
    </button>
  </footer>
</dialog>
<!-- Alert dialog END -->
`;

export function DialogAlert() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
