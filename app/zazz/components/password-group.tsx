/*
  PASSWORD — .password-group
  ─────────────────────────────────────────────────────────────────────────────
  A masked .input[type="password"] inside a .password-group, so it inherits the
  shared --field-* surface, hover/focus, and :user-invalid states. The only extra
  part is a show/hide toggle button in a trailing addon.

  Best practices baked in (see the modern-web-guidance forms guide):
    • autocomplete="new-password" so password managers offer to generate/save,
      and never autofill an existing password into a sign-up field.
    • Pasting is allowed (we never block it) so managers can fill the field.
    • A real .field__label[for], a hint describing the constraint, and a
      :user-invalid error message.
    • The reveal toggle is keyboard-reachable, exposes aria-pressed, swaps its
      aria-label, and warns (sr-only) that the password will become visible.

  This is reference markup only — plain, framework-agnostic HTML rendered via
  innerHTML, with no React/hook wiring. The reveal toggle's icon swap is driven
  purely by its aria-pressed state in CSS; the host app flips aria-pressed and
  the input's type (password ↔ text) with its own listener. With that wiring
  absent the field is still a fully working masked password input.
  ─────────────────────────────────────────────────────────────────────────────
*/

const html = /* html */ `
  <!-- Password START -->
  <form class="flex flex-col gap-sm">
    <div class="field">
        <label class="field__label" for="f-login-password">Password</label>
        <label class="password-group">
          <input
            class="input"
            id="f-login-password"
            name="password"
            type="password"
            autocomplete="new-password"
            minlength="8"
            required
            placeholder="••••••••"
            aria-describedby="f-login-password-hint f-login-password-warning"
          />
          <span class="password-group__addon" data-align="inline-end">
            <button class="button password-group__toggle" id="f-login-password-toggle" data-variant="ghost" data-size="icon-sm" type="button" aria-pressed="false" aria-label="Show password" aria-describedby="f-login-password-warning">
              <svg class="password-group__icon password-group__icon--show" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
                <rect width="256" height="256" fill="none" />
                <path d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                <circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
              </svg>
              <svg class="password-group__icon password-group__icon--hide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
                <rect width="256" height="256" fill="none" />
                <line x1="48" y1="40" x2="208" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                <path d="M154.9,157.6A40,40,0,0,1,101,98.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                <path d="M73.8,69.7C33.6,90.6,16,128,16,128s32,72,112,72a118.1,118.1,0,0,0,54.1-12.8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                <path d="M208.6,169.1C229.8,149.1,240,128,240,128S208,56,128,56a126,126,0,0,0-20.5,1.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
              </svg>
            </button>
          </span>
        </label>
        <div class="field__description">
          <span class="field__hint" id="f-login-password-hint">Use eight or more characters.</span>
          <span class="field__error" role="alert">Password must be at least 8 characters.</span>
        </div>
        <span class="sr-only" id="f-login-password-warning">Warning: showing the password makes it visible to anyone near your screen.</span>
      </div>
  </form>
  <!-- Password END -->
`;

export function Password() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
