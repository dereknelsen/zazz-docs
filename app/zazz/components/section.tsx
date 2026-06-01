export function Section({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
  SECTION — Layout wrapper
  ─────────────────────────────────────────────────────────────────────────────
  Standard section wrapper pattern for page vertical rhythm.

  Structure:
    section.grid.py-xl         — Outer section with vertical padding (--gap-xl = 6rem)
      div.container            — Full-width content (max 80rem, self-padding)
        OR
      div.article              — Reading-width content (max 40rem, self-padding)

  Layout utilities:
    .flex / .grid              — Choose layout mode for the inner container
    .flex-col                  — Stack children vertically
    .items-start               — Align items to start
    .gap-lg                    — Spacing between child elements (--gap-lg = 2.75rem)

  Separators:
    Add .border-t to <section> for a top border between stacked sections.

  Typical pattern: sections stack vertically with py-xl for generous rhythm,
  border-t between them, container/article for width constraint.
  ─────────────────────────────────────────────────────────────────────────────
*/}
      <section className="grid py-xl">
        <div className="container flex flex-col">{children}</div>
      </section>
    </>
  );
}
