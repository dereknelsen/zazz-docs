function Chevron() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
      <rect width="256" height="256" fill="none" />
      <polyline
        points="208 96 128 176 48 96"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}

export default function NavigationMenuDefault() {
  return (
    <nav className="navigation-menu">
      <menu className="navigation-menu__container">
        <li className="navigation-menu__item">
          <button
            className="button navigation-menu__trigger"
            type="button"
            data-variant="ghost"
            popoverTarget="nav-products"
          >
            Products <Chevron />
          </button>
          <div id="nav-products" className="navigation-menu__popover" popover="auto">
            <div className="navigation-menu__viewport grid grid-cols-2 gap-sm">
              <a href="#" className="navigation-menu__featured flex flex-col gap-xs p-md bg-muted">
                <span className="text-eyebrow text-muted-foreground">Featured</span>
                <span className="text-md weight-strong">Zazz Platform</span>
                <span className="text-sm text-muted-foreground text-pretty">
                  Design, build, and ship from one token set.
                </span>
              </a>
              <div className="grid">
                <a href="#" className="navigation-menu__link">
                  <span className="text-sm weight-strong">Analytics</span>
                  <span className="text-sm text-muted-foreground">Real-time product insights.</span>
                </a>
                <a href="#" className="navigation-menu__link">
                  <span className="text-sm weight-strong">Automation</span>
                  <span className="text-sm text-muted-foreground">
                    Workflows without the wiring.
                  </span>
                </a>
                <a href="#" className="navigation-menu__link">
                  <span className="text-sm weight-strong">Reports</span>
                  <span className="text-sm text-muted-foreground">Share what the data says.</span>
                </a>
              </div>
            </div>
          </div>
        </li>

        <li className="navigation-menu__item">
          <button
            className="button navigation-menu__trigger"
            type="button"
            data-variant="ghost"
            popoverTarget="nav-resources"
          >
            Resources <Chevron />
          </button>
          <div id="nav-resources" className="navigation-menu__popover" popover="auto">
            <div className="navigation-menu__viewport grid">
              <a href="#" className="navigation-menu__link">
                <span className="text-sm weight-strong">Documentation</span>
                <span className="text-sm text-muted-foreground">Guides and references.</span>
              </a>
              <a href="#" className="navigation-menu__link">
                <span className="text-sm weight-strong">Changelog</span>
                <span className="text-sm text-muted-foreground">What shipped recently.</span>
              </a>
            </div>
          </div>
        </li>

        <li className="navigation-menu__item">
          <a href="#" className="button" data-variant="ghost">
            Pricing
          </a>
        </li>
      </menu>
    </nav>
  );
}
