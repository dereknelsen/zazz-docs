/*
  FORM — .field (field wrapper + inline controls)
  ─────────────────────────────────────────────────────────────────────────────
  Cross-control glue from _fields.css: shared --field-* tokens, the .field layout
  wrapper (label + control + hint/error), and :user-invalid validation messaging.

  Checkbox and switch styles live in _reset.css; use .field[] to place
  the control beside its label.
  ─────────────────────────────────────────────────────────────────────────────
*/

const html = /* html */ `

<!-- Switch START -->
<form class="flex flex-col gap-sm">
  <fieldset class="field-group">
    <legend>Notifications</legend>
    <div class="flex flex-col gap-xs">
      <label class="field" data-direction="horizontal">
        <input type="checkbox" role="switch" name="notifications-email" />
        <span class="field__label">Email notifications</span>
      </label>
      <label class="field" data-direction="horizontal">
        <input type="checkbox" role="switch" name="notifications-2fa" checked />
        <span class="field__label">Two-factor authentication</span>
      </label>
    </div>
  </fieldset>
</form>
<!-- Switch END -->
`;

export function Switch() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
