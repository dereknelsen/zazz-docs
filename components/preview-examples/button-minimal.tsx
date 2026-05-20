function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export default function ButtonMinimal() {
  return (
    <div className="flex flex-wrap items-center gap-sm">
      <button type="button" className="button button-minimal" aria-label="Open menu">
        <span className="button-icon">
          <MenuIcon />
        </span>
      </button>
      <button
        type="button"
        className="button button-primary button-minimal"
        aria-label="Open menu"
      >
        <span className="button-icon">
          <MenuIcon />
        </span>
      </button>
      <button
        type="button"
        className="button button-muted button-minimal"
        aria-label="Open menu"
      >
        <span className="button-icon">
          <MenuIcon />
        </span>
      </button>
      <button
        type="button"
        className="button button-ghost button-minimal"
        aria-label="Open menu"
      >
        <span className="button-icon">
          <MenuIcon />
        </span>
      </button>
    </div>
  );
}
