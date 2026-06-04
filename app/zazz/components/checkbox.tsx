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
<!-- Checkbox START -->
<form class="flex flex-col gap-sm">
  <fieldset class="field-group">
    <legend>Preferences</legend>
    <div class="flex flex-col gap-xs">
      <label class="field" data-direction="horizontal">
        <input type="checkbox" name="preferences-newsletter" />
        <span class="field__label">Subscribe to the newsletter</span>
      </label>
      <label class="field" data-direction="horizontal">
        <input type="checkbox" name="preferences-terms" checked />
        <span class="field__label">Accept terms &amp; conditions</span>
      </label>
    </div>
  </fieldset>
</form>
<!-- Checkbox END -->
`;

export function Checkbox() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
