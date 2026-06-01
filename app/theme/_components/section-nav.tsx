"use client";

import Link from "next/link";
import { cn } from "../../../lib/cn";
import { ChevronRight, Plus, Sidebar } from "lucide-react";

export const SECTIONS = [
  { id: "themes", label: "Themes" },
  { id: "corporate", label: "Corporate" },
  { id: "grayscale", label: "Grayscale" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "layout", label: "Layout" },
  { id: "effects", label: "Effects" },
  { id: "animations", label: "Animations" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

interface Props {
  active: SectionId;
  onChange: (id: SectionId) => void;
}

export function SectionNav({ active, onChange }: Props) {
  return (
    <nav
      className="flex flex-col gap-1 border-r border-fd-border/40 bg-fd-card/30 p-3 min-w-[240px] max-w-[240px]"
      aria-label="Theme sections"
    >
      <header className="flex items-center justify-between px-2 py-1.5">
        <Link href="/" className="text-sm font-semibold text-fd-foreground">
          Zazz Theme Builder
        </Link>
        <div className="flex items-center gap-1 text-fd-muted-foreground">
          <button
            type="button"
            className="rounded-md p-1 hover:bg-fd-accent hover:text-fd-accent-foreground"
            aria-label="Add variable"
          >
            <Plus className="size-3.5" />
          </button>
          <button
            type="button"
            className="rounded-md p-1 hover:bg-fd-accent hover:text-fd-accent-foreground"
            aria-label="Collapse sidebar"
          >
            <Sidebar className="size-3.5" />
          </button>
        </div>
      </header>
      <ul className="flex flex-col gap-0.5">
        {SECTIONS.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onChange(s.id)}
                className={cn(
                  "group flex w-full items-center justify-between rounded-md px-2.5 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-fd-accent text-fd-accent-foreground"
                    : "text-fd-muted-foreground hover:bg-fd-accent/50 hover:text-fd-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{s.label}</span>
                {isActive && <ChevronRight className="size-3.5" />}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
