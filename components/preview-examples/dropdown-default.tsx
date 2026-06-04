export default function DropdownDefault() {
  return (
    <div className="dropdown">
      <button className="button" type="button" popoverTarget="dropdown-preview">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
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
        <span>Menu</span>
      </button>
      <div
        id="dropdown-preview"
        className="dropdown__popover"
        data-side="bottom"
        data-align="start"
        popover="auto"
      >
        <menu>
          <li className="weight-strong text-eyebrow text-muted-foreground p-xs">Account</li>
          <li>
            <a href="#" className="button justify-start" data-variant="ghost">
              Profile
            </a>
          </li>
          <li>
            <a href="#" className="button justify-start" data-variant="ghost">
              Settings
            </a>
          </li>
          <hr className="my-xs" />
          <li>
            <a href="#" className="button justify-start" data-variant="ghost">
              Sign out
            </a>
          </li>
        </menu>
      </div>
    </div>
  );
}
