export default function InputIconLeading() {
  return (
    <div className="input-wrapper">
      <div className="input-icon-start">
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
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </span>
      </div>
      <input className="input pl-input" type="text" placeholder="Placeholder" />
    </div>
  );
}
