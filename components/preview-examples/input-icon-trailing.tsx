export default function InputIconTrailing() {
  return (
    <label className="input-group">
      <input className="input" type="search" placeholder="Search…" aria-label="Search" />
      <span className="input-group__addon" data-align="inline-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
    </label>
  );
}
