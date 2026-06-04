/*
  INPUT GROUP — .input-group
  ─────────────────────────────────────────────────────────────────────────────
  A single bordered shell fusing a text control with addons (icons, text, kbd)
  and buttons. Addons come AFTER the control in the DOM; data-align positions them:
    inline-start (default) · inline-end · block-start · block-end

  Composition: .input-group > [.input | .textarea] + .input-group__addon
  where an addon may hold .input-group__text, an <svg>, <kbd>, or .button.

  The .input-group shell is a <label> for click-to-focus, not the field's label.
  Wrap it in a .field with a real .field__label[for] so the control is named by
  visible text — never by the surrounding legend. .field__hint / .field__error
  add a description and a :user-invalid error message just like any other field.
  ─────────────────────────────────────────────────────────────────────────────
*/

const html = /* html */ `
<!-- Input groups START -->
<div class="flex flex-col gap-md">
  <form class="flex flex-col gap-sm">
    <div class="field">
      <label class="field__label" for="f-search">Search</label>
      <label class="input-group">
        <input class="input" id="f-search" type="search" name="q" inputmode="search" placeholder="Placeholder" autocomplete="off" spellcheck="false" enterkeyhint="search" aria-describedby="f-search-hint" />
        <span class="input-group__addon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <circle cx="112" cy="112" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
            <line x1="168.57" y1="168.57" x2="224" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
          </svg>
        </span>
        <span class="input-group__addon" data-align="inline-end">
          <button class="button" data-variant="ghost" data-size="icon-sm" type="submit" aria-label="Submit search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
            </svg>
          </button>
        </span>
      </label>
      <div class="field__description">
        <span class="field__hint" id="f-search-hint">Search across every page in the docs.</span>
      </div>
    </div>
  </form>

  <form class="flex flex-col gap-sm">
    <div class="field">
      <label class="field__label" for="f-url">Website</label>
      <label class="input-group">
        <input class="input" id="f-url" type="url" name="url" inputmode="url" required placeholder="zazz.design" autocomplete="url" autocapitalize="off" spellcheck="false" enterkeyhint="go" aria-describedby="f-url-hint" />
        <span class="input-group__addon">
          <span class="input-group__text">https://</span>
        </span>
        <span class="input-group__addon" data-align="inline-end">
          <button class="button" data-variant="primary" data-size="sm" type="submit">Apply</button>
        </span>
      </label>
      <div class="field__description">
        <span class="field__hint" id="f-url-hint">Where people can find you online.</span>
        <span class="field__error" role="alert">Enter a valid URL, e.g. zazz.design.</span>
      </div>
    </div>
  </form>

  <form class="flex flex-col gap-sm">
    <div class="field">
      <label class="field__label" for="f-prompt">Prompt</label>
      <label class="input-group">
        <textarea id="f-prompt" class="textarea" name="prompt" inputmode="text" placeholder="Ask anything…" aria-describedby="f-prompt-hint"></textarea>
        <span class="input-group__addon" data-align="block-end">
          <button class="button ml-auto" data-variant="muted" data-size="sm" type="submit">
            <span>Send</span> <kbd>↵</kbd>
          </button>
        </span>
      </label>
      <div class="field__description">
        <span class="field__hint" id="f-prompt-hint">Enter to send · Shift + Enter for a new line.</span>
      </div>
    </div>
  </form>
</div>
<!-- Input groups END -->
`;

export function InputGroup() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
