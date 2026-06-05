/*
  SELECT — .select
  ─────────────────────────────────────────────────────────────────────────────
  Customizable native <select> (appearance: base-select): a
  <button><selectedcontent></button> trigger + styled ::picker(select), options,
  ::picker-icon, ::checkmark. Degrades to the native OS dropdown where unsupported.

  Rendered as static markup via innerHTML so React never validates the
  non-standard <button> child. In Chrome's customizable-select, the browser owns
  the control's shadow DOM — it mirrors the selected <option> into
  <selectedcontent> on the client, so the hydrated DOM legitimately differs from
  the SSR string. suppressHydrationWarning tells React to leave that subtree
  alone (no hooks, no client component needed).
  ─────────────────────────────────────────────────────────────────────────────
*/

const html = /* html */ `
<!-- Select START -->
<form class="flex flex-col gap-sm">
  <div class="field">
    <label class="field__label" for="f-sort">Sort by</label>
    <select class="select" id="f-sort" name="sort">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <!-- Keep label in optgroup as a fallback -->
      <optgroup class="grid gap-px" label="Sort by">
        <legend class="text-eyebrow text-muted-foreground p-xs">Sort by</legend>
        <option value="recent" selected>Most recent</option>
        <option value="popular">Most popular</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </optgroup>
    </select>
  </div>
</form>
<!-- Select END -->
`;

export function Select() {
  return (
    <div
      style={{ display: "contents" }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
