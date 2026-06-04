/*
  RADIO — .radio (+ .radio-group)
  ─────────────────────────────────────────────────────────────────────────────
  appearance: none redraws the circle from theme tokens; the checked dot is a
  radial-gradient. Group by shared `name`; wrap in a <fieldset>/<legend> or
  .radio-group for an accessible labelled set.
  ─────────────────────────────────────────────────────────────────────────────
*/

const html = /* html */ `
<!-- Radios START -->
<fieldset class="radio-group">
  <legend>Billing cycle</legend>
  <div class="flex flex-col gap-xs">
    <label class="field" data-direction="horizontal">
      <input class="radio" type="radio" name="plan" value="monthly" />
      <span class="field__label">Monthly billing</span>
    </label>
    <label class="field" data-direction="horizontal">
      <input class="radio" type="radio" name="plan" value="annual" checked />
      <span class="field__label">Annual billing</span>
    </label>
  </div>
</fieldset>
<!-- Radios END -->
`;

export function Radio() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
