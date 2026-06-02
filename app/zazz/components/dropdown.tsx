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

// The popover menu shared by every trigger below — raw HTML, no JS.
const menu = /* html */ `
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
`;

// One dropdown: trigger button + anchored popover panel.
const dropdown = (id: string, side: string, align: string, label: string) => /* html */ `
<div class="dropdown">
  <button class="button" type="button" popovertarget="${id}">${label}</button>
  <div id="${id}" class="dropdown__popover" data-side="${side}" data-align="${align}" popover="auto">
    ${menu}
  </div>
</div>
`;

// Markup is authored as raw HTML so the docs mirror the vanilla markup exactly.
const html = /* html */ `
<!-- Dropdown START -->
<div class="flex flex-col gap-md">

  <!-- bottom — panel below trigger -->
  <div class="grid grid-cols-3 items-start gap-md">
    ${dropdown("dropdown-bottom", "bottom", "start", "Bottom / start")}
    ${dropdown("dropdown-bottom-center", "bottom", "center", "Bottom / center")}
    ${dropdown("dropdown-bottom-end", "bottom", "end", "Bottom / end")}
  </div>

  <!-- top — panel above trigger -->
  <div class="grid grid-cols-3 items-start gap-md">
    ${dropdown("dropdown-top", "top", "start", "Top / start")}
    ${dropdown("dropdown-top-center", "top", "center", "Top / center")}
    ${dropdown("dropdown-top-end", "top", "end", "Top / end")}
  </div>

  <!-- right — panel to the right of trigger -->
  <div class="grid grid-cols-3 items-start gap-md">
    ${dropdown("dropdown-right", "right", "start", "Right / start")}
    ${dropdown("dropdown-right-center", "right", "center", "Right / center")}
    ${dropdown("dropdown-right-end", "right", "end", "Right / end")}
  </div>

  <!-- left — panel to the left of trigger -->
  <div class="grid grid-cols-3 items-start gap-md">
    ${dropdown("dropdown-left", "left", "start", "Left / start")}
    ${dropdown("dropdown-left-center", "left", "center", "Left / center")}
    ${dropdown("dropdown-left-end", "left", "end", "Left / end")}
  </div>

</div>
<!-- Dropdown END -->
`;

export function Popover() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
