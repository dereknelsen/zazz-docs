export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-sm">
      <span className="badge">Category</span>
      <span className="badge" data-variant="primary">
        New
      </span>
      <span className="badge" data-variant="muted">
        Draft
      </span>
      <span className="badge" data-variant="ghost">
        Inline
      </span>
      <a className="badge" data-variant="link" href="#">
        Posts
      </a>
    </div>
  );
}
