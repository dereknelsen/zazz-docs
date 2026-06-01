"use client";

import { useMemo } from "react";
import { cn } from "../../../../lib/cn";
import { hexToOklch } from "../../_lib/create-display-color";
import { createSwatches } from "../../_lib/create-swatches";
import type { PaletteConfig } from "../../_lib/types";
import { ColorPicker } from "../color-picker";
import { NumericInput } from "../numeric-input";
import { StopSelect } from "../stop-select";

interface Props {
  palette: PaletteConfig;
  onChange: (next: PaletteConfig) => void;
}

const STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export function PaletteEditor({ palette, onChange }: Props) {
  const swatches = useMemo(
    () => createSwatches(palette).filter((s) => s.stop !== 0 && s.stop !== 1000),
    [palette],
  );

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
      <header className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold capitalize text-fd-foreground">{palette.name}</h3>
        <span className="font-mono text-[11px] text-fd-muted-foreground">
          --{palette.name}-{palette.valueStop}
        </span>
      </header>

      <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-3">
        <ColorPicker
          label="Base hex"
          value={palette.value}
          onChange={(v) => onChange({ ...palette, value: v })}
        />
        <StopSelect
          label="Stop"
          value={palette.valueStop}
          onChange={(n) => onChange({ ...palette, valueStop: n })}
        />
        <NumericInput
          label="H"
          value={palette.h}
          step={1}
          onChange={(n) => onChange({ ...palette, h: n })}
        />
        <NumericInput
          label="S"
          value={palette.s}
          step={1}
          onChange={(n) => onChange({ ...palette, s: n })}
        />
        <NumericInput
          label="L min"
          value={palette.lMin}
          step={1}
          onChange={(n) => onChange({ ...palette, lMin: n })}
        />
        <NumericInput
          label="L max"
          value={palette.lMax}
          step={1}
          onChange={(n) => onChange({ ...palette, lMax: n })}
        />
      </div>

      <div className="flex items-center gap-1 text-xs">
        <span className="mr-2 text-[11px] uppercase tracking-[0.08em] text-fd-muted-foreground">
          Mode
        </span>
        {(["perceived", "linear"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChange({ ...palette, colorMode: m })}
            className={cn(
              "rounded-md px-2 py-1 text-[11px]",
              palette.colorMode === m
                ? "bg-fd-primary text-fd-primary-foreground"
                : "bg-fd-card/60 text-fd-muted-foreground hover:bg-fd-accent",
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-11 gap-1.5">
        {STOPS.map((stop) => {
          const sw = swatches.find((s) => s.stop === stop);
          if (!sw) return null;
          const oklch = hexToOklch(sw.hex);
          const isAnchor = stop === palette.valueStop;
          return (
            <div key={stop} className="flex flex-col gap-1">
              <div
                className={cn(
                  "aspect-[3/4] rounded-md border border-fd-border/30 shadow-sm",
                  isAnchor && "ring-2 ring-fd-ring ring-offset-2 ring-offset-fd-card",
                )}
                style={{ background: oklch ?? sw.hex }}
                title={oklch ?? sw.hex}
              />
              <span className="text-center font-mono text-[10px] text-fd-muted-foreground">
                {stop}
              </span>
              <span className="text-center font-mono text-[9px] text-fd-muted-foreground/60">
                {sw.hex}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
