"use client";

import { cn } from "../../../lib/cn";

const STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

interface Props {
  label?: string;
  value: number;
  onChange: (v: number) => void;
  className?: string;
}

export function StopSelect({ label, value, onChange, className }: Props) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-fd-muted-foreground">
          {label}
        </span>
      )}
      <div className="flex items-center gap-1.5 rounded-md border border-fd-border/60 bg-fd-background px-2.5 py-1.5 focus-within:border-fd-ring focus-within:ring-2 focus-within:ring-fd-ring/30">
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent font-mono text-sm text-fd-foreground outline-none"
        >
          {STOPS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}
