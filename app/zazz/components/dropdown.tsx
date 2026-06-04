/*
  DROPDOWN — .dropdown
  ─────────────────────────────────────────────────────────────────────────────
  Element:   <div class="dropdown"> wrapping a trigger button + popover panel
  Opening:   Native Popover API — button[popovertarget="id"] + div[popover="auto"]
  Closing:   Click outside / Esc (native popover light-dismiss)
  Anchoring: CSS anchor positioning. .dropdown sets anchor-scope: --dropdown-trigger;
             the trigger gets anchor-name; the popover reads it via position-anchor
             and the --popover-* vars in _reset.css.

  Structure:
    div.dropdown
      button[popovertarget="id"]                     — .button trigger
      div.dropdown__popover[popover="auto"]          — anchored panel (top layer)
        menu                                         — native list of actions
          li                                         — group label (optional)
          li > a.button[data-variant="ghost"]        — menu item
          hr                                         — group separator (optional)

  Positioning (data-side + data-align on .dropdown__popover):
    data-side="bottom" (default) — panel opens below trigger
    data-side="top"              — panel opens above trigger
    data-side="right"            — panel opens to the right
    data-side="left"             — panel opens to the left

    data-align="start" (default) — leading edge aligns to trigger
    data-align="center"          — centered along the cross axis
    data-align="end"             — trailing edge aligns to trigger

  Menu items: use .button with data-variant="ghost" and justify-start for
              full-width, left-aligned rows inside the popover.
  Note:       Requires NO JavaScript. Click-to-open, fully Baseline-supported.
  ─────────────────────────────────────────────────────────────────────────────
*/

// Markup is authored as raw HTML so the docs mirror the vanilla markup exactly.
const html = /* html */ `
<!-- Dropdown START -->
<div class="dropdown">
  <button class="button" type="button" popovertarget="dropdown-1">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
    <span>Menu</span>
  </button>
  <div id="dropdown-1" class="dropdown__popover" data-side="bottom" data-align="start" popover="auto">
    <menu>
      <li class="weight-strong text-eyebrow text-muted-foreground p-xs">Group 1</li>
      <li><a href="#" class="button justify-start" data-variant="ghost">Link 1</a></li>
      <li><a href="#" class="button justify-start" data-variant="ghost">Link 2</a></li>
      <li><a href="#" class="button justify-start" data-variant="ghost">Link 3</a></li>
      <hr class="my-xs" />
      <li class="weight-strong text-eyebrow text-muted-foreground p-xs">Group 2</li>
      <li><a href="#" class="button justify-start" data-variant="ghost">Link 4</a></li>
      <li><a href="#" class="button justify-start" data-variant="ghost">Link 5</a></li>
      <li><a href="#" class="button justify-start" data-variant="ghost">Link 6</a></li>
    </menu>
  </div>
</div>
<!-- Dropdown END -->
`;

export function Popover() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
