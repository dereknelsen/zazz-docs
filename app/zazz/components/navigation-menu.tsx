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
      menu.navigation-menu__container                       — horizontal flex row
        li.navigation-menu__item                       — anchor scope + relative
          button.navigation-menu__trigger              — .button ghost + chevron svg
          div.navigation-menu__popover[popover="auto"] — anchored panel (top layer)
            div.navigation-menu__viewport              — grid of panel content
              a.navigation-menu__featured              — tall callout cell (optional)
              a.navigation-menu__link                  — title + description row
        li.navigation-menu__item                       — anchor scope + relative
          button.navigation-menu__trigger              — opens the "Products" panel
          div.navigation-menu__popover[popover="auto"] — panel of categories
            div.navigation-menu__viewport
              div.navigation-menu__submenu                 — category, scopes its anchor
                button.navigation-menu__submenu-trigger    — category row + right caret
                div.navigation-menu__popover[data-variant="submenu"][popover="auto"]
                  div.navigation-menu__viewport        — the category's product list
                    a.navigation-menu__link            — product row
        li.navigation-menu__item                       — plain link (no popover)
          a.button[data-variant="ghost"]

  Submenus: A category's sub-trigger lives INSIDE the parent panel, so its
            popovertarget forms a native nested-popover ancestor chain — opening a
            product list keeps the Products panel open, and only one sibling
            submenu stays open at a time. A popover marked [data-variant="submenu"]
            reuses the base popover styling and only overrides position-anchor +
            --popover-position-area to fly out to the inline-end (right) edge,
            flipping leftward near the viewport edge. Still NO JavaScript.

  Alignment (data-align on .navigation-menu__popover):
    "start" (default) — left edge aligns to trigger start
    "center"          — centered under trigger
    "end"             — right edge aligns to trigger end

  Variant (data-variant on .navigation-menu__popover):
    (none)    — top-level panel, opens downward from the trigger
    "submenu" — nested submenu, opens to the inline-end (right) of its row

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
  <menu class="navigation-menu__container w-full">

    <!-- Rich panel — featured callout + link grid -->
    <li class="navigation-menu__item">
      <button class="button navigation-menu__trigger" data-variant="ghost" type="button" popovertarget="nav-dropdown-1">
        Platform
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        </svg>
      </button>

      <div id="nav-dropdown-1" class="navigation-menu__popover" popover="auto" data-animation="slide-down">
        <div class="navigation-menu__viewport grid grid-cols-3">
         <div class="grid py-xs pl-xs">
            <a href="#" class="flex flex-col items-start justify-end bg-muted rounded-sm p-sm">
              <span class="text-eyebrow text-muted-foreground mb-xs">Featured</span>
              <span class="text-md weight-strong">Zazz Platform</span>
              <span class="text-sm text-muted-foreground text-pretty">
                Everything you need to design, build, and ship.
              </span>
            </a>
          </div>
          <div class="flex flex-col gap-px py-xs pr-xs col-span-2">
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
      <button class="button navigation-menu__trigger" data-variant="ghost" type="button" popovertarget="nav-dropdown-2">
        Resources
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        </svg>
      </button>

      <div id="nav-dropdown-2" class="navigation-menu__popover" data-align="start" popover="auto" data-animation="slide-down">
        <div class="navigation-menu__viewport">
        <div class="flex flex-col gap-px p-xs">
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
      </div>
    </li>

    <!-- Submenu panel — categories whose products fly out to the right -->
    <li class="navigation-menu__item">
      <button class="button navigation-menu__trigger" data-variant="ghost" type="button" popovertarget="nav-dropdown-3">
        Products
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        </svg>
      </button>

      <div id="nav-dropdown-3" class="navigation-menu__popover" popover="auto" data-animation="slide-down">
        <div class="navigation-menu__viewport">
        <div class="flex flex-col gap-px p-xs">
          <!-- Category — opens its product list to the right -->
          <div class="navigation-menu__submenu">
            <button class="navigation-menu__submenu-trigger" type="button" popovertarget="nav-submenu-1">
              <span class="text-sm weight-strong">Design</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
              </svg>
            </button>

            <div id="nav-submenu-1" class="navigation-menu__popover" data-variant="submenu" popover="auto">
              <div class="navigation-menu__viewport">
              <div class="flex flex-col gap-px p-xs">
                <a href="#" class="navigation-menu__link">
                  <span class="text-sm weight-strong">Figma Kit</span>
                  <span class="text-sm text-muted-foreground">Variables, styles, and components.</span>
                </a>
                <a href="#" class="navigation-menu__link">
                  <span class="text-sm weight-strong">Color Generator</span>
                  <span class="text-sm text-muted-foreground">OKLCH scales from a single brand hex.</span>
                </a>
                <a href="#" class="navigation-menu__link">
                  <span class="text-sm weight-strong">Type Scale</span>
                  <span class="text-sm text-muted-foreground">Fluid sizes tuned with Utopia.</span>
                </a>
                <a href="#" class="navigation-menu__link">
                  <span class="text-sm weight-strong">Icon Set</span>
                  <span class="text-sm text-muted-foreground">A consistent, lightweight icon library.</span>
                </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Category — opens its product list to the right -->
          <div class="navigation-menu__submenu">
            <button class="navigation-menu__submenu-trigger" type="button" popovertarget="nav-submenu-2">
              <span class="text-sm weight-strong">Development</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
              </svg>
            </button>

            <div id="nav-submenu-2" class="navigation-menu__popover" data-variant="submenu" popover="auto">
              <div class="navigation-menu__viewport">
                <div class="flex flex-col gap-px p-xs">
                  <a href="#" class="navigation-menu__link">
                    <span class="text-sm weight-strong">CLI</span>
                    <span class="text-sm text-muted-foreground">Scaffold and ship from the terminal.</span>
                  </a>
                  <a href="#" class="navigation-menu__link">
                    <span class="text-sm weight-strong">React Components</span>
                    <span class="text-sm text-muted-foreground">Token-driven primitives for your app.</span>
                  </a>
                  <a href="#" class="navigation-menu__link">
                    <span class="text-sm weight-strong">REST API</span>
                    <span class="text-sm text-muted-foreground">Programmatic access to your design data.</span>
                  </a>
                  <a href="#" class="navigation-menu__link">
                    <span class="text-sm weight-strong">Webhooks</span>
                    <span class="text-sm text-muted-foreground">React to changes in real time.</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <!-- Category — opens its product list to the right -->
          <div class="navigation-menu__submenu">
            <button class="navigation-menu__submenu-trigger" type="button" popovertarget="nav-submenu-3">
              <span class="text-sm weight-strong">Content</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
              </svg>
            </button>

            <div id="nav-submenu-3" class="navigation-menu__popover" data-variant="submenu" popover="auto">
              <div class="navigation-menu__viewport">
              <div class="flex flex-col gap-px p-xs">
                <a href="#" class="navigation-menu__link">
                  <span class="text-sm weight-strong">CMS</span>
                  <span class="text-sm text-muted-foreground">Structured content for any surface.</span>
                </a>
                <a href="#" class="navigation-menu__link">
                  <span class="text-sm weight-strong">Localization</span>
                  <span class="text-sm text-muted-foreground">Ship in every language your users speak.</span>
                </a>
                <a href="#" class="navigation-menu__link">
                  <span class="text-sm weight-strong">Media Library</span>
                  <span class="text-sm text-muted-foreground">Optimized assets, delivered fast.</span>
                </a>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>
    </li>

    <li class="navigation-menu__item">
      <button class="button navigation-menu__trigger" data-variant="ghost" type="button" popovertarget="nav-megamenu-1">
        Megamenu
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        </svg>
      </button>

      <div id="nav-megamenu-1" class="navigation-menu__popover" popover="auto" data-size="container" data-animation="slide-down">
        <div class="navigation-menu__viewport">
          <div class="grid" style="min-height: 16rem;">
          <div class="flex flex-col gap-px p-xs">
            <!-- Tabs vertical START -->
              <div class="tabs h-full grid grid-cols-4 gap-xs" data-direction="vertical">
                <div class="tabs__list h-full" role="tablist">
                  <div class="tabs__indicator" aria-hidden="true"></div>

                  <input type="radio" name="tabs-megamenu-group-1" id="tab-megamenu-1" checked />
                  <label for="tab-megamenu-1" class="tabs__label grid justify-start p-sm flex-1">
                    <span class="text-md weight-strong">Women</span>
                    <span class="text-sm weight-body text-muted-foreground">Dresses, tops, bottoms, and shoes.</span>
                  </label>

                  <input type="radio" name="tabs-megamenu-group-1" id="tab-megamenu-2" />
                  <label for="tab-megamenu-2" class="tabs__label grid justify-start p-sm flex-1">
                    <span class="text-md weight-strong">Men</span>
                    <span class="text-sm weight-body text-muted-foreground">Shirts, pants, outerwear, and shoes.</span>
                  </label>

                  <input type="radio" name="tabs-megamenu-group-1" id="tab-megamenu-3" />
                  <label for="tab-megamenu-3" class="tabs__label grid justify-start p-sm flex-1">
                    <span class="text-md weight-strong">Home</span>
                    <span class="text-sm weight-body text-muted-foreground">Bedding, kitchen, dining, and decor.</span>
                  </label>
                </div>

                <div class="tabs__panel size-full col-span-3">
                  <div class="grid grid-cols-3 gap-xs">
                    <div class="grid gap-px">
                      <span class="text-eyebrow text-muted-foreground pt-xs pb-xs">Dresses</span>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Mini &amp; Midi</span>
                        <span class="text-sm text-muted-foreground">Everyday lengths for work and weekends.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Maxi Dresses</span>
                        <span class="text-sm text-muted-foreground">Flowing silhouettes in linen and cotton.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Jumpsuits</span>
                        <span class="text-sm text-muted-foreground">One-piece outfits, easy to style.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Shop all dresses</span>
                        <span class="text-sm text-muted-foreground">Browse the full collection.</span>
                      </a>
                    </div>

                    <div class="grid gap-px">
                      <span class="text-eyebrow text-muted-foreground pt-xs pb-xs">Tops</span>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">T-shirts &amp; Tanks</span>
                        <span class="text-sm text-muted-foreground">Basics in organic cotton blends.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Blouses &amp; Shirts</span>
                        <span class="text-sm text-muted-foreground">Office-ready and off-duty styles.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Sweaters &amp; Cardigans</span>
                        <span class="text-sm text-muted-foreground">Layering pieces for cooler days.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Activewear</span>
                        <span class="text-sm text-muted-foreground">Leggings, sports bras, and sets.</span>
                      </a>
                    </div>

                    <div class="grid gap-px">
                      <span class="text-eyebrow text-muted-foreground pt-xs pb-xs">Bottoms &amp; Shoes</span>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Jeans &amp; Denim</span>
                        <span class="text-sm text-muted-foreground">Straight, wide-leg, and high-rise fits.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Trousers &amp; Skirts</span>
                        <span class="text-sm text-muted-foreground">Tailored pants and A-line skirts.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Sneakers &amp; Flats</span>
                        <span class="text-sm text-muted-foreground">Comfort-first everyday footwear.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Boots &amp; Heels</span>
                        <span class="text-sm text-muted-foreground">Seasonal styles for dress-up moments.</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="tabs__panel size-full col-span-3">
                  <div class="grid grid-cols-3 gap-xs">
                    <div class="grid gap-px">
                      <span class="text-eyebrow text-muted-foreground pt-xs pb-xs">Shirts</span>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">T-shirts &amp; Polos</span>
                        <span class="text-sm text-muted-foreground">Classic fits in breathable fabrics.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Oxford &amp; Dress Shirts</span>
                        <span class="text-sm text-muted-foreground">Collared styles for work and events.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Henleys &amp; Sweaters</span>
                        <span class="text-sm text-muted-foreground">Casual layers for transitional weather.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Shop all shirts</span>
                        <span class="text-sm text-muted-foreground">See every cut and color.</span>
                      </a>
                    </div>

                    <div class="grid gap-px">
                      <span class="text-eyebrow text-muted-foreground pt-xs pb-xs">Pants &amp; Shorts</span>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Chinos &amp; Trousers</span>
                        <span class="text-sm text-muted-foreground">Smart casual staples in neutral tones.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Jeans</span>
                        <span class="text-sm text-muted-foreground">Slim, relaxed, and straight-leg denim.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Joggers &amp; Sweatpants</span>
                        <span class="text-sm text-muted-foreground">Loungewear you can wear out.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Shorts</span>
                        <span class="text-sm text-muted-foreground">Chino, cargo, and athletic cuts.</span>
                      </a>
                    </div>

                    <div class="grid gap-px">
                      <span class="text-eyebrow text-muted-foreground pt-xs pb-xs">Outerwear &amp; Shoes</span>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Jackets &amp; Coats</span>
                        <span class="text-sm text-muted-foreground">Bombers, parkas, and wool overcoats.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Sneakers</span>
                        <span class="text-sm text-muted-foreground">Low-top and high-top everyday pairs.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Boots &amp; Loafers</span>
                        <span class="text-sm text-muted-foreground">Leather and suede dress-casual options.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Accessories</span>
                        <span class="text-sm text-muted-foreground">Belts, wallets, and winter essentials.</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="tabs__panel size-full col-span-3">
                  <div class="grid grid-cols-3 gap-xs">
                    <div class="grid gap-px">
                      <span class="text-eyebrow text-muted-foreground pt-xs pb-xs">Bedding</span>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Sheet Sets</span>
                        <span class="text-sm text-muted-foreground">Percale, sateen, and linen weaves.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Duvets &amp; Comforters</span>
                        <span class="text-sm text-muted-foreground">All-season weights and down alternatives.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Pillows &amp; Throws</span>
                        <span class="text-sm text-muted-foreground">Accent layers for beds and sofas.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Shop all bedding</span>
                        <span class="text-sm text-muted-foreground">Build a complete sleep setup.</span>
                      </a>
                    </div>

                    <div class="grid gap-px">
                      <span class="text-eyebrow text-muted-foreground pt-xs pb-xs">Kitchen &amp; Dining</span>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Cookware</span>
                        <span class="text-sm text-muted-foreground">Pots, pans, and non-stick sets.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Tableware</span>
                        <span class="text-sm text-muted-foreground">Plates, bowls, and flatware collections.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Glassware &amp; Bar</span>
                        <span class="text-sm text-muted-foreground">Tumblers, wine glasses, and decanters.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Storage &amp; Organization</span>
                        <span class="text-sm text-muted-foreground">Pantry jars, bins, and drawer inserts.</span>
                      </a>
                    </div>

                    <div class="grid gap-px">
                      <span class="text-eyebrow text-muted-foreground pt-xs pb-xs">Decor &amp; Furniture</span>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Lighting</span>
                        <span class="text-sm text-muted-foreground">Floor lamps, pendants, and table lights.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Rugs &amp; Curtains</span>
                        <span class="text-sm text-muted-foreground">Textiles to anchor and soften a room.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Seating &amp; Tables</span>
                        <span class="text-sm text-muted-foreground">Chairs, side tables, and accent pieces.</span>
                      </a>
                      <a href="#" class="navigation-menu__link flex-1">
                        <span class="text-sm weight-strong">Wall Art &amp; Mirrors</span>
                        <span class="text-sm text-muted-foreground">Prints, frames, and statement mirrors.</span>
                      </a>
                    </div>
                  </div>
                </div>
              <!-- Tabs vertical END -->
            </div>
        </div>
        </div>
      </div>
    </li>

      <!-- Plain top-level link — no popover -->
      <li class="navigation-menu__item ml-auto">
        <!-- Form dialog START -->
        <button class="button" type="button" data-variant="ghost" command="show-modal" commandfor="form-sign-in-1">
          Sign in
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="24" y1="128" x2="136" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="96 88 136 128 96 168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="136 40 200 40 200 216 136 216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        </button>
        <dialog id="form-sign-in-1" class="dialog" closedby="any">
          <form method="dialog">
            <div class="dialog__content">
              <header class="dialog__header">
                <h2 class="text-lg font-heading weight-strong">Sign in</h2>
                <p class="text-muted-foreground">Enter your email and password to sign in.</p>
              </header>
              <div class="dialog__body flex flex-col gap-md">
                <fieldset class="field-group">
                  <legend class="sr-only">Sign in</legend>
                  <div class="grid gap-xs">
                    <div class="field">
                      <label class="field__label" for="fd-email">Email</label>
                      <input class="input" id="fd-email" name="email" type="email" inputmode="email" required placeholder="you@example.com" autocomplete="email" aria-describedby="fd-email-hint" />
                      <span class="field__hint" id="fd-email-hint">We'll only use this to send receipts.</span>
                      <span class="field__error" role="alert">Please enter a valid email address.</span>
                    </div>

                    <!-- Password START -->
                      <div class="field">
                      <label class="field__label" for="f-login-password">Password</label>
                      <label class="password-group">
                        <input
                          class="input"
                          id="f-login-password"
                          name="password"
                          type="password"
                          autocomplete="new-password"
                          minlength="8"
                          required
                          placeholder="••••••••"
                          aria-describedby="f-login-password-hint f-login-password-warning"
                        />
                        <span class="password-group__addon" data-align="inline-end">
                          <button class="button password-group__toggle" id="f-login-password-toggle" data-variant="ghost" data-size="icon-sm" type="button" aria-pressed="false" aria-label="Show password" aria-describedby="f-login-password-warning">
                            <svg class="password-group__icon password-group__icon--show" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
                              <rect width="256" height="256" fill="none" />
                              <path d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                              <circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                            </svg>
                            <svg class="password-group__icon password-group__icon--hide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
                              <rect width="256" height="256" fill="none" />
                              <line x1="48" y1="40" x2="208" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                              <path d="M154.9,157.6A40,40,0,0,1,101,98.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                              <path d="M73.8,69.7C33.6,90.6,16,128,16,128s32,72,112,72a118.1,118.1,0,0,0,54.1-12.8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                              <path d="M208.6,169.1C229.8,149.1,240,128,240,128S208,56,128,56a126,126,0,0,0-20.5,1.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                            </svg>
                          </button>
                        </span>
                      </label>
                      <span class="field__error" role="alert">Incorrect email or password.</span>
                      <span class="sr-only" id="f-login-password-warning">Warning: showing the password makes it visible to anyone near your screen.</span>
                    </div>
                    <!-- Password END -->

                  </div>

                </fieldset>

            </div>
            <footer class="dialog__footer">
              <button class="button" type="button" value="cancel" commandfor="form-sign-in-1" command="close">Cancel</button>
              <button class="button" data-variant="primary" type="submit" value="save">Sign in</button>
            </footer>
          </form>
          <button class="button absolute top-xs right-xs" data-size="icon" data-variant="ghost" type="button" commandfor="form-sign-in-1" command="close" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
              <line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
            </svg>
          </button>
        </dialog>
        <!-- Form dialog END -->
      </li>

    <!-- Plain CTA — no popover -->
    <li class="navigation-menu__item">
        <a href="#" class="button" data-variant="primary">Get started</a>
      </li>

  </menu>
</nav>
<!-- Navigation Menu END -->
`;

export function NavigationMenu() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
