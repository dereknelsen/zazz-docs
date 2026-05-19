"use client";

import { cn } from "../../../lib/cn";

interface Props {
  label?: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
  suffix?: string;
  className?: string;
  inputClassName?: string;
  id?: string;
}

export function NumericInput({
  label,
  value,
  onChange,
  step = 1,
  min,
  max,
  suffix,
  className,
  inputClassName,
  id,
}: Props) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)} htmlFor={id}>
      {label && (
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-fd-muted-foreground">
          {label}
        </span>
      )}
      <div className="flex items-center gap-1.5 rounded-md border border-fd-border/60 bg-fd-background px-2.5 py-1.5 focus-within:border-fd-ring focus-within:ring-2 focus-within:ring-fd-ring/30">
        <input
          id={id}
          type="number"
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => {
            const n = e.target.valueAsNumber;
            if (Number.isFinite(n)) onChange(n);
          }}
          step={step}
          min={min}
          max={max}
          className={cn(
            "w-full bg-transparent font-mono text-sm text-fd-foreground outline-none placeholder:text-fd-muted-foreground/40",
            inputClassName,
          )}
        />
        {suffix && <span className="font-mono text-xs text-fd-muted-foreground/70">{suffix}</span>}
      </div>
    </label>
  );
}
