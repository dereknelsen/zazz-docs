/*
  NAVIGATION MENU — .navigation-menu
  ─────────────────────────────────────────────────────────────────────────────
  Element:   <nav class="navigation-menu"> wrapping a horizontal <menu> list
  Opening:   Native Popover API — button[popovertarget="id"] + div[popover="auto"]
  Closing:   Click outside / Esc (native popover light-dismiss). Opening one
             auto popover dismisses the others automatically.
  Anchoring: CSS anchor positioning. Each item scopes --navigation-menu-trigger
             (anchor-scope) so every trigger names its own anchor; each popover
             reads it via position-anchor and the --popover-* vars in _reset.css.

  Structure:
    nav.navigation-menu
      menu.navigation-menu__list                       — horizontal flex row
        li.navigation-menu__item                       — anchor scope + relative
          button.navigation-menu__trigger              — .button ghost + chevron svg
          div.navigation-menu__popover[popover="auto"] — anchored panel (top layer)
            div.navigation-menu__viewport              — grid of panel content
              a.navigation-menu__featured              — tall callout cell (optional)
              a.navigation-menu__link                  — title + description row
        li.navigation-menu__item                       — plain link (no popover)
          a.button[data-variant="ghost"]

  Alignment (data-align on .navigation-menu__popover):
    "start" (default) — left edge aligns to trigger start
    "center"          — centered under trigger
    "end"             — right edge aligns to trigger end

  Panel layout (data-layout on .navigation-menu__viewport):
    (none)     — single-column list of links
    "featured" — two columns: featured callout + link list

  Chevron: rotates 180° while the item's popover is open, via :has() — no JS.
  Note:    Requires NO JavaScript. Click-to-open, fully Baseline-supported.
  ─────────────────────────────────────────────────────────────────────────────
*/

// Markup is authored as raw HTML so the docs mirror the vanilla markup exactly.
const html = /* html */ `
<!-- Navigation Menu START -->
<nav class="navigation-menu">
  <menu class="navigation-menu__list">

    <!-- Rich panel — featured callout + link grid -->
    <li class="navigation-menu__item">
      <button class="button navigation-menu__trigger" data-variant="ghost" type="button" popovertarget="nav-products">
        Products
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        </svg>
      </button>
      <div id="nav-products" class="navigation-menu__popover" popover="auto">
        <div class="navigation-menu__viewport" data-layout="featured">
          <a href="#" class="navigation-menu__featured">
            <span class="text-eyebrow text-muted-foreground mb-xs">Featured</span>
            <span class="text-md weight-strong">Zazz Platform</span>
            <span class="text-sm text-muted-foreground text-pretty">
              Everything you need to design, build, and ship lightweight modern interfaces.
            </span>
          </a>
          <div class="grid">
            <a href="#" class="navigation-menu__link">
              <span class="text-sm weight-strong">Analytics</span>
              <span class="text-sm text-muted-foreground">Real-time insights into product usage.</span>
            </a>
            <a href="#" class="navigation-menu__link">
              <span class="text-sm weight-strong">Automation</span>
              <span class="text-sm text-muted-foreground">Workflows that run themselves.</span>
            </a>
            <a href="#" class="navigation-menu__link">
              <span class="text-sm weight-strong">Integrations</span>
              <span class="text-sm text-muted-foreground">Connect the tools your team already uses.</span>
            </a>
            <a href="#" class="navigation-menu__link">
              <span class="text-sm weight-strong">Features</span>
              <span class="text-sm text-muted-foreground">Everything you need to design, build, and ship.</span>
            </a>
          </div>
        </div>
      </div>
    </li>

    <!-- Simple panel — single-column link list -->
    <li class="navigation-menu__item">
      <button class="button navigation-menu__trigger" data-variant="ghost" type="button" popovertarget="nav-resources">
        Resources
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        </svg>
      </button>
      <div id="nav-resources" class="navigation-menu__popover" data-align="start" popover="auto">
        <div class="navigation-menu__viewport">
          <a href="#" class="navigation-menu__link">
            <span class="text-sm weight-strong">Documentation</span>
            <span class="text-sm text-muted-foreground">Guides and API references.</span>
          </a>
          <a href="#" class="navigation-menu__link">
            <span class="text-sm weight-strong">Blog</span>
            <span class="text-sm text-muted-foreground">Product news and engineering notes.</span>
          </a>
          <a href="#" class="navigation-menu__link">
            <span class="text-sm weight-strong">Community</span>
            <span class="text-sm text-muted-foreground">Join the conversation and get help.</span>
          </a>
        </div>
      </div>
    </li>

    <!-- Plain top-level link — no popover -->
    <li class="navigation-menu__item">
      <a href="#" class="button" data-variant="ghost">Docs</a>
    </li>

  </menu>
</nav>
<!-- Navigation Menu END -->
`;

export function NavigationMenu() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
