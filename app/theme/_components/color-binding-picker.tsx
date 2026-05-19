"use client";

import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { cn } from "../../../lib/cn";
import { hexToOklch } from "../_lib/create-display-color";
import { createSwatches } from "../_lib/create-swatches";
import type { PaletteName, ThemeConfig } from "../_lib/types";
import { SwatchChip } from "./swatch-chip";

const OVERLAY_STOPS = ["none", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950", "full"];
const NEUTRAL_KEYS = ["white", "black"];

interface Props {
  theme: ThemeConfig;
  value: string;
  onChange: (binding: string) => void;
}

function previewColor(binding: string, theme: ThemeConfig): { color: string; hasAlpha: boolean } {
  if (binding.startsWith("oklch") || binding.startsWith("hsl") || binding.startsWith("#")) {
    return { color: binding, hasAlpha: false };
  }
  if (binding === "white") return { color: "#ffffff", hasAlpha: false };
  if (binding === "black") return { color: "#000000", hasAlpha: false };
  const [name, stop] = binding.split("-");
  if (name === "shade" || name === "tint") {
    const alphaMap: Record<string, number> = {
      none: 0,
      "50": 0.05,
      "100": 0.1,
      "200": 0.2,
      "300": 0.3,
      "400": 0.4,
      "500": 0.5,
      "600": 0.6,
      "700": 0.7,
      "800": 0.8,
      "900": 0.9,
      "950": 0.95,
      full: 1,
    };
    const a = alphaMap[stop] ?? 1;
    if (name === "shade") {
      return { color: `oklch(0 0 0 / ${a})`, hasAlpha: a < 1 };
    }
    return { color: `oklch(1 0 0 / ${a})`, hasAlpha: a < 1 };
  }
  if (["primary", "secondary", "tertiary", "neutral"].includes(name)) {
    const palette = theme.palettes[name as PaletteName];
    if (!palette) return { color: "transparent", hasAlpha: false };
    const target = Number(stop);
    const sw = createSwatches(palette).find((x) => x.stop === target);
    if (!sw) return { color: "transparent", hasAlpha: false };
    return { color: hexToOklch(sw.hex) ?? sw.hex, hasAlpha: false };
  }
  return { color: "transparent", hasAlpha: false };
}

export function ColorBindingPicker({ theme, value, onChange }: Props) {
  const [query, setQuery] = useState("");

  const options = useMemo(() => {
    const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    const all: string[] = [];
    for (const name of ["primary", "secondary", "tertiary", "neutral"] as PaletteName[]) {
      for (const s of stops) all.push(`${name}-${s}`);
    }
    for (const k of OVERLAY_STOPS) all.push(`shade-${k}`);
    for (const k of OVERLAY_STOPS) all.push(`tint-${k}`);
    for (const n of NEUTRAL_KEYS) all.push(n);
    return all.filter((opt) => opt.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const preview = previewColor(value, theme);

  return (
    <Popover>
      <PopoverTrigger className="inline-flex max-w-full">
        <SwatchChip color={preview.color} label={value} hasAlpha={preview.hasAlpha} as="div" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[280px] p-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tokens…"
          autoFocus
          className="mb-2 w-full rounded-md border border-fd-border/60 bg-fd-background px-2 py-1.5 text-xs outline-none focus:border-fd-ring focus:ring-2 focus:ring-fd-ring/30"
        />
        <div className="max-h-[300px] overflow-y-auto pr-1">
          {options.length === 0 ? (
            <div className="px-2 py-3 text-xs text-fd-muted-foreground">No matches</div>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {options.map((opt) => {
                const p = previewColor(opt, theme);
                const selected = opt === value;
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => onChange(opt)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left text-xs hover:bg-fd-accent",
                        selected && "bg-fd-accent/80",
                      )}
                    >
                      <div
                        className={cn(
                          "relative size-4 overflow-hidden rounded-sm border border-fd-border/40",
                          p.hasAlpha &&
                            "[background-image:repeating-conic-gradient(hsl(0_0%_85%)_0%_25%,white_0%_50%)] [background-size:8px_8px]",
                        )}
                      >
                        <div className="absolute inset-0" style={{ background: p.color }} />
                      </div>
                      <span className="font-mono text-fd-foreground">{opt}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
