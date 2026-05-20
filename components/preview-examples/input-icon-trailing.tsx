export default function InputIconTrailing() {
  return (
    <div className="input-wrapper">
      <input className="input pr-input" type="search" placeholder="Search…" />
      <div className="input-icon-right">
        <span className="input-icon">
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
      </div>
    </div>
  );
}
