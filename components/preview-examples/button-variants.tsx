export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-sm">
      <a className="button" href="#">
        Default
      </a>
      <a className="button" data-variant="primary" href="#">
        Primary
      </a>
      <a className="button" data-variant="muted" href="#">
        Muted
      </a>
      <a className="button" data-variant="ghost" href="#">
        Ghost
      </a>
      <a className="button" data-variant="link" href="#">
        Link
      </a>
    </div>
  );
}
