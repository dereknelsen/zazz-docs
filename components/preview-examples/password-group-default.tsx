export default function PasswordGroupDefault() {
  return (
    <form className="flex flex-col gap-sm w-full max-w-sm">
      <div className="field">
        <label className="field__label" htmlFor="pw-preview">
          Password
        </label>
        <label className="password-group">
          <input
            className="input"
            id="pw-preview"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="••••••••"
            aria-describedby="pw-preview-hint pw-preview-warning"
          />
          <span className="password-group__addon" data-align="inline-end">
            <button
              className="button password-group__toggle"
              type="button"
              data-variant="ghost"
              data-size="icon-sm"
              aria-pressed="false"
              aria-label="Show password"
              aria-describedby="pw-preview-warning"
            >
              <svg
                className="password-group__icon password-group__icon--show"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                aria-hidden="true"
              >
                <rect width="256" height="256" fill="none" />
                <path
                  d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
              </svg>
              <svg
                className="password-group__icon password-group__icon--hide"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                aria-hidden="true"
              >
                <rect width="256" height="256" fill="none" />
                <line
                  x1="48"
                  y1="40"
                  x2="208"
                  y2="216"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M154.9,157.6A40,40,0,0,1,101,98.4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M73.8,69.7C33.6,90.6,16,128,16,128s32,72,112,72a118.1,118.1,0,0,0,54.1-12.8"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M208.6,169.1C229.8,149.1,240,128,240,128S208,56,128,56a126,126,0,0,0-20.5,1.6"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
              </svg>
            </button>
          </span>
        </label>
        <span className="field__hint" id="pw-preview-hint">
          Use eight or more characters.
        </span>
        <span className="field__error" role="alert">
          Password must be at least 8 characters.
        </span>
        <span className="sr-only" id="pw-preview-warning">
          Warning: showing the password makes it visible to anyone near your screen.
        </span>
      </div>
    </form>
  );
}
