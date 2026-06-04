/*
  TEXTAREA — .textarea
  ─────────────────────────────────────────────────────────────────────────────
  field-sizing: content grows the box with the text; height clamps between
  5 and 12 lines, then scrolls. Shares the --field-* tokens from _fields.css.
  ─────────────────────────────────────────────────────────────────────────────
*/

const html = /* html */ `
<!-- Textarea START -->
<form class="flex flex-col gap-sm">
  <div class="field">
    <label class="field__label" for="f-message">Message</label>
    <textarea class="textarea" id="f-message" name="message" inputmode="text" placeholder="Your message"></textarea>
  </div>
</form>
<!-- Textarea END -->
`;

export function Textarea() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
