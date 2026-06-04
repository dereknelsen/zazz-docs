/*
  TEXT INPUTS — .input
  ─────────────────────────────────────────────────────────────────────────────
  One class for every text-like type (text, search, email, number, date, …);
  the type only changes the picker/keyboard, not the box.
  Shares the --field-* tokens defined in _fields.css so it aligns with .select,
  .textarea, and .button.

  Each field carries the attributes that make autofill and on-screen keyboards
  work: type (semantics + validation), inputmode (keyboard), autocomplete
  (autofill), plus autocapitalize / spellcheck / enterkeyhint where they help.

  Wrap in .field for label, hint, and :user-invalid error messaging.
  ─────────────────────────────────────────────────────────────────────────────
*/

const html = /* html */ `
<!-- Inputs START -->
<form class="flex flex-col gap-sm">
  <div class="grid grid-flow-row grid-cols-2 gap-sm">
    <div class="field">
      <label class="field__label" for="f-name">Name</label>
      <input class="input" id="f-name" name="name" type="text" inputmode="text" placeholder="Ada Lovelace" autocomplete="name" autocapitalize="words" enterkeyhint="next" />
    </div>
    <div class="field">
      <label class="field__label" for="f-email">Email</label>
      <input class="input" id="f-email" name="email" type="email" inputmode="email" required placeholder="you@example.com" autocomplete="email" autocapitalize="off" spellcheck="false" enterkeyhint="next" aria-describedby="f-email-hint" />
      <div class="field__description">
        <span class="field__hint" id="f-email-hint">We'll only use this to send receipts.</span>
        <span class="field__error" role="alert">Please enter a valid email address.</span>
      </div>
    </div>
    <div class="field">
      <label class="field__label" for="f-phone">Phone</label>
      <input class="input" id="f-phone" name="phone" type="tel" inputmode="tel" placeholder="+1 (555) 012-3456" autocomplete="tel" enterkeyhint="next" />
    </div>
    <div class="field">
      <label class="field__label" for="f-date">Date</label>
      <input class="input" id="f-date" name="date" type="date" inputmode="none" autocomplete="off" />
    </div>
  </div>
</form>
<!-- Inputs END -->
`;

export function Input() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
