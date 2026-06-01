function DropdownMenu() {
  return (
    <menu>
      <li className="weight-strong text-eyebrow text-muted-foreground p-xs">Group 1</li>
      <li><a href="#" className="button justify-start" data-variant="ghost">Link 1</a></li>
      <li><a href="#" className="button justify-start" data-variant="ghost">Link 2</a></li>
      <li><a href="#" className="button justify-start" data-variant="ghost">Link 3</a></li>
      <hr className="my-xs" />
      <li className="weight-strong text-eyebrow text-muted-foreground p-xs">Group 2</li>
      <li><a href="#" className="button justify-start" data-variant="ghost">Link 4</a></li>
      <li><a href="#" className="button justify-start" data-variant="ghost">Link 5</a></li>
      <li><a href="#" className="button justify-start" data-variant="ghost">Link 6</a></li>
    </menu>
  );
}

export function Popover() {
  return (
    <div className="flex flex-col gap-md">
      {/* bottom */}
      <div className="grid grid-cols-3 items-start gap-md">
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-bottom">
            Bottom / start
          </button>
          <div
            id="dropdown-bottom"
            className="dropdown__popover"
            data-side="bottom"
            data-align="start"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-bottom-center">
            Bottom / center
          </button>
          <div
            id="dropdown-bottom-center"
            className="dropdown__popover"
            data-side="bottom"
            data-align="center"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-bottom-end">
            Bottom / end
          </button>
          <div
            id="dropdown-bottom-end"
            className="dropdown__popover"
            data-side="bottom"
            data-align="end"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
      </div>

      {/* top */}
      <div className="grid grid-cols-3 items-start gap-md">
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-top">
            Top / start
          </button>
          <div
            id="dropdown-top"
            className="dropdown__popover"
            data-side="top"
            data-align="start"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-top-center">
            Top / center
          </button>
          <div
            id="dropdown-top-center"
            className="dropdown__popover"
            data-side="top"
            data-align="center"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-top-end">
            Top / end
          </button>
          <div
            id="dropdown-top-end"
            className="dropdown__popover"
            data-side="top"
            data-align="end"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
      </div>

      {/* right */}
      <div className="grid grid-cols-3 items-start gap-md">
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-right">
            Right / start
          </button>
          <div
            id="dropdown-right"
            className="dropdown__popover"
            data-side="right"
            data-align="start"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-right-center">
            Right / center
          </button>
          <div
            id="dropdown-right-center"
            className="dropdown__popover"
            data-side="right"
            data-align="center"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-right-end">
            Right / end
          </button>
          <div
            id="dropdown-right-end"
            className="dropdown__popover"
            data-side="right"
            data-align="end"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
      </div>

      {/* left */}
      <div className="grid grid-cols-3 items-start gap-md">
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-left">
            Left / start
          </button>
          <div
            id="dropdown-left"
            className="dropdown__popover"
            data-side="left"
            data-align="start"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-left-center">
            Left / center
          </button>
          <div
            id="dropdown-left-center"
            className="dropdown__popover"
            data-side="left"
            data-align="center"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
        <div className="dropdown">
          <button className="button" type="button" popoverTarget="dropdown-left-end">
            Left / end
          </button>
          <div
            id="dropdown-left-end"
            className="dropdown__popover"
            data-side="left"
            data-align="end"
            popover="auto"
          >
            <DropdownMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
