{
  /*
  BUTTON — .button
  ─────────────────────────────────────────────────────────────────────────────
  Element:   <button> or <a> (add href for pointer cursor on anchors)
  Class:     .button

  Variants (data-variant attribute):
    (none)    — Default: card background, border, foreground text
    "primary" — Primary brand color background, white text
    "muted"   — Muted/subtle background, no visible border
    "ghost"   — Transparent until hover (reveals muted fill)
    "link"    — No background, underline text decoration, no height constraint

  Sizes (data-size attribute):
    (none)    — Standard height (--step-8), inline padding (--step-2_5)
    "icon"    — Square (height × height), no padding, centers child SVG

  Icons:
    Place an <svg> directly inside .button — it auto-sizes to --step-4 (1rem).
    Icons work alongside text or alone (with data-size="icon").

  States: hover, active, focus-visible (ring), disabled, aria-busy
  ─────────────────────────────────────────────────────────────────────────────
*/
}

export function Button() {
  return (
    <div className="flex flex-col gap-sm">
      {/* Buttons START */}
      <div className="flex items-center gap-sm">
        <button className="button">Button</button>
        <button className="button" data-size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <line
              x1="40"
              y1="128"
              x2="216"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="40"
              y1="64"
              x2="216"
              y2="64"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="40"
              y1="192"
              x2="216"
              y2="192"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-sm">
        <button className="button" data-variant="primary">
          Button
        </button>
        <button className="button" data-variant="primary" data-size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <line
              x1="40"
              y1="128"
              x2="216"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="40"
              y1="64"
              x2="216"
              y2="64"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="40"
              y1="192"
              x2="216"
              y2="192"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-sm">
        <button className="button" data-variant="muted">
          Button
        </button>
        <button className="button" data-variant="muted" data-size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <line
              x1="40"
              y1="128"
              x2="216"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="40"
              y1="64"
              x2="216"
              y2="64"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="40"
              y1="192"
              x2="216"
              y2="192"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
        </button>
      </div>
      <div className="flex itemcenter gap-sm">
        <button className="button" data-variant="ghost">
          Button
        </button>
        <button className="button" data-variant="ghost" data-size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <line
              x1="40"
              y1="128"
              x2="216"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="40"
              y1="64"
              x2="216"
              y2="64"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="40"
              y1="192"
              x2="216"
              y2="192"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
        </button>
      </div>
      <div className="flex itemcenter gap-sm">
        <button className="button" data-variant="link">
          Button
        </button>
        <button className="button" data-variant="link" data-size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <line
              x1="40"
              y1="128"
              x2="216"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="40"
              y1="64"
              x2="216"
              y2="64"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="40"
              y1="192"
              x2="216"
              y2="192"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
        </button>
      </div>
      {/* Buttons END */}
    </div>
  );
}
