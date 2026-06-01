"use client";

import { cn } from "../../../lib/cn";

interface Props {
  /** CSS color string (e.g. "oklch(...)", "#ABC123", "var(--primary-500)") */
  color: string;
  label: string;
  hasAlpha?: boolean;
  className?: string;
  onClick?: () => void;
  as?: "button" | "div";
}

export function SwatchChip({ color, label, hasAlpha, className, onClick, as = "div" }: Props) {
  const checker =
    "[background-image:repeating-conic-gradient(hsl(0_0%_85%)_0%_25%,white_0%_50%)] [background-size:8px_8px]";

  const inner = (
    <div className="flex items-center gap-2 rounded-md px-1.5 py-1 pr-2 text-left">
      <div className={cn("relative size-4 overflow-hidden rounded-sm", hasAlpha && checker)}>
        <div className="absolute inset-0" style={{ background: color }} />
      </div>
      <span className="font-mono text-[11px] uppercase tracking-wide text-fd-foreground">
        {label}
      </span>
    </div>
  );

  if (as === "button" || onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex max-w-full items-center rounded-md border border-fd-border/40 bg-fd-card/40 hover:border-fd-border hover:bg-fd-accent/50 transition-colors",
          className,
        )}
      >
        {inner}
      </button>
    );
  }
  return (
    <div
      className={cn(
        "inline-flex max-w-full items-center rounded-md border border-fd-border/40 bg-fd-card/40",
        className,
      )}
    >
      {inner}
    </div>
  );
}
