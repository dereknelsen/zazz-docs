export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="badge">Category</span>
      <span className="badge badge-primary">New</span>
      <span className="badge badge-muted">Draft</span>
      <span className="badge badge-ghost">Inline</span>
      <a className="badge badge-link" href="#">
        Posts
      </a>
    </div>
  );
}
