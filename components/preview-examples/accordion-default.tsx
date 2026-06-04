function Chevron() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
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
  );
}

export default function AccordionDefault() {
  return (
    <div className="accordion w-full">
      <details open>
        <summary>
          What is an accordion?
          <Chevron />
        </summary>
        <div className="pb-sm">
          <p>
            A disclosure widget built from the native <code>&lt;details&gt;</code> and{" "}
            <code>&lt;summary&gt;</code> elements. The open/close animation uses the{" "}
            <code>::details-content</code> pseudo-element — no JavaScript.
          </p>
        </div>
      </details>
      <details>
        <summary>
          How does it work?
          <Chevron />
        </summary>
        <div className="pb-sm">
          <p>
            Each item is a separate <code>&lt;details&gt;</code>, so several can stay open at once.
            Click a summary or focus it and press Enter to toggle.
          </p>
        </div>
      </details>
      <details>
        <summary>
          Why use it?
          <Chevron />
        </summary>
        <div className="pb-sm">
          <p>
            Keyboard support, state, and accessibility come from the platform — Zazz only styles the
            chrome through theme tokens.
          </p>
        </div>
      </details>
    </div>
  );
}
