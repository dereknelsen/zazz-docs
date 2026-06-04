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
    <header class="dialog__header mb-sm">
      <h2 class="text-lg font-heading weight-strong mb-xs">Are you absolutely sure?</h2>
      <p class="text-muted-foreground">
        Alert dialogs must be closed by clicking the Cancel or Continue buttons. Changing <code>closedby="none"</code> to <code>closedby="any"</code> allows the user to close the dialog by clicking outside the dialog or pressing the Escape key.
      </p>
    </header>
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
