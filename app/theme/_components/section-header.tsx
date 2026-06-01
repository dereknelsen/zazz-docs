"use client";

import { cn } from "../../../lib/cn";

interface Props {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, description, className }: Props) {
  return (
    <header className={cn("border-b border-fd-border/40 px-6 py-4", className)}>
      <h1 className="text-base font-semibold text-fd-foreground">{title}</h1>
      {description && <p className="mt-0.5 text-xs text-fd-muted-foreground">{description}</p>}
    </header>
  );
}

interface TableHeaderProps {
  columns: { label: string; className?: string }[];
}

export function TableHeader({ columns }: TableHeaderProps) {
  return (
    <div
      className="sticky top-0 z-10 grid items-center gap-4 border-b border-fd-border/40 bg-fd-card/60 px-6 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-fd-muted-foreground backdrop-blur"
      style={{ gridTemplateColumns: columns.map((c) => c.className ?? "1fr").join(" ") }}
    >
      {columns.map((c) => (
        <span key={c.label} className={cn(c.className)}>
          {c.label}
        </span>
      ))}
    </div>
  );
}
