"use client";

import { cn } from "../../../lib/cn";

interface Props {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  mono?: boolean;
  className?: string;
  id?: string;
}

export function TextInput({ label, value, onChange, placeholder, mono = false, className, id }: Props) {
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
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          className={cn(
            "w-full bg-transparent text-sm text-fd-foreground outline-none placeholder:text-fd-muted-foreground/40",
            mono && "font-mono",
          )}
        />
      </div>
    </label>
  );
}
