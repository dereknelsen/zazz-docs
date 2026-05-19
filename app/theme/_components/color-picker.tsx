"use client";

import { cn } from "../../../lib/cn";
import { isHex, normalizeHex } from "../_lib/helpers";

interface Props {
  label?: string;
  value: string;
  onChange: (hex: string) => void;
  className?: string;
}

export function ColorPicker({ label, value, onChange, className }: Props) {
  const clean = normalizeHex(value).slice(0, 6);
  const valid = isHex(clean);
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-fd-muted-foreground">
          {label}
        </span>
      )}
      <div className="flex items-center gap-2 rounded-md border border-fd-border/60 bg-fd-background pl-1 pr-2.5 py-1 focus-within:border-fd-ring focus-within:ring-2 focus-within:ring-fd-ring/30">
        <input
          type="color"
          value={valid ? `#${clean}` : "#000000"}
          onChange={(e) => onChange(e.target.value.replace(/^#/, "").toUpperCase())}
          aria-label="Pick color"
          className="size-7 cursor-pointer rounded border border-fd-border/40 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-sm"
        />
        <span className="font-mono text-xs text-fd-muted-foreground/60 select-none">#</span>
        <input
          type="text"
          value={clean}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9A-Fa-f]/g, "").toUpperCase().slice(0, 6))}
          maxLength={6}
          spellCheck={false}
          className="flex-1 min-w-0 bg-transparent font-mono text-sm uppercase tracking-wide text-fd-foreground outline-none placeholder:text-fd-muted-foreground/40"
          placeholder="000000"
        />
      </div>
    </label>
  );
}
