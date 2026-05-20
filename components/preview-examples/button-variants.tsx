export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-sm">
      <a className="button" href="#">
        <span className="button-text">Default</span>
      </a>
      <a className="button button-primary" href="#">
        <span className="button-text">Primary</span>
      </a>
      <a className="button button-muted" href="#">
        <span className="button-text">Muted</span>
      </a>
      <a className="button button-ghost" href="#">
        <span className="button-text">Ghost</span>
      </a>
      <a className="button button-link" href="#">
        <span className="button-text">Link</span>
      </a>
    </div>
  );
}
