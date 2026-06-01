{
  /*
  ACCORDION — .accordion
  ─────────────────────────────────────────────────────────────────────────────
  Container: <div class="accordion">
  Items:     Native <details> elements (no JS required)

  Structure:
    .accordion
      details
        summary          — Trigger text + chevron SVG
          <svg>          — Rotates -180deg on open (CSS handles this)
        div.pb-sm        — Content wrapper (use padding utility for spacing)
          <p>            — Your content

  Behavior:
    - Items separated by border-bottom (except last)
    - Summary has underline decoration with animated offset on hover/open
    - Content animates via ::details-content pseudo-element
    - Multiple items can be open simultaneously (no exclusive mode)

  Font: summary uses --weight-strong. Content inherits body styles.
  ─────────────────────────────────────────────────────────────────────────────
*/
}

export function Accordion() {
  return (
    <>
      {/* Accordion START */}
      <div className="accordion">
        <details>
          <summary>
            What is an accordion?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <polyline
                points="208 96 128 176 48 96"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
          </summary>
          <div className="pb-sm">
            <p>
              This is an accordion component built using the native
              <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> elements. It uses the
              new <code>::details-content</code> pseudo-element to apply transitions to the content
              when the accordion is opened and closed.
            </p>
          </div>
        </details>
        <details>
          <summary>
            How does an accordion work?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <polyline
                points="208 96 128 176 48 96"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
          </summary>
          <div className="pb-sm">
            <p>
              This is an accordion component built using the native
              <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> elements. It uses the
              new <code>::details-content</code> pseudo-element to apply transitions to the content
              when the accordion is opened and closed.
            </p>
          </div>
        </details>
        <details>
          <summary>
            Why use an accordion?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <polyline
                points="208 96 128 176 48 96"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
          </summary>
          <div className="pb-sm">
            <p>
              This is an accordion component built using the native
              <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> elements. It uses the
              new <code>::details-content</code> pseudo-element to apply transitions to the content
              when the accordion is opened and closed.
            </p>
          </div>
        </details>
      </div>
      {/* Accordion END */}
    </>
  );
}
