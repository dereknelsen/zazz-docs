function ArrowRight() {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-sm">
      <a className="button" data-variant="primary" href="#">
        Start free trial
        <ArrowRight />
      </a>
      <a className="button" href="#">
        <ArrowRight />
        Read more
      </a>
    </div>
  );
}
