"use client";

import { useMemo } from "react";
import { hexToOklch } from "../../_lib/create-display-color";
import { createSwatches } from "../../_lib/create-swatches";
import { useTheme } from "../../_state/theme-store";
import { SectionHeader } from "../section-header";
import { PaletteEditor } from "./palette-editor";

const OVERLAY_STOPS: { key: string; alpha: number }[] = [
  { key: "none", alpha: 0 },
  { key: "50", alpha: 0.05 },
  { key: "100", alpha: 0.1 },
  { key: "200", alpha: 0.2 },
  { key: "300", alpha: 0.3 },
  { key: "400", alpha: 0.4 },
  { key: "500", alpha: 0.5 },
  { key: "600", alpha: 0.6 },
  { key: "700", alpha: 0.7 },
  { key: "800", alpha: 0.8 },
  { key: "900", alpha: 0.9 },
  { key: "950", alpha: 0.95 },
  { key: "full", alpha: 1 },
];

export function GrayscalePanel() {
  const { theme, update } = useTheme();
  const neutral = theme.palettes.neutral;

  const neutral950Hex = useMemo(() => {
    const sw = createSwatches(neutral).find((s) => s.stop === 950);
    return sw?.hex ?? "#000000";
  }, [neutral]);

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <SectionHeader title="Grayscale" description="Neutral scale plus derived shade (from neutral-950) and tint (from white) overlays." />
      <div className="flex flex-col gap-5 px-6 py-4">
        <PaletteEditor
          palette={neutral}
          onChange={(next) => update((prev) => ({ ...prev, palettes: { ...prev.palettes, neutral: next } }))}
        />

        <section className="flex flex-col gap-3 rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="text-sm font-semibold text-fd-foreground">shade — over neutral-950 ({hexToOklch(neutral950Hex)})</h3>
          <div className="grid grid-cols-13 gap-1.5" style={{ gridTemplateColumns: `repeat(${OVERLAY_STOPS.length}, minmax(0, 1fr))` }}>
            {OVERLAY_STOPS.map(({ key, alpha }) => (
              <div key={key} className="flex flex-col gap-1">
                <div
                  className="aspect-square rounded-md border border-fd-border/30 [background-image:repeating-conic-gradient(hsl(0_0%_85%)_0%_25%,white_0%_50%)] [background-size:8px_8px]"
                >
                  <div className="size-full rounded-md" style={{ background: `oklch(from ${neutral950Hex} l c h / ${alpha})` }} />
                </div>
                <span className="text-center font-mono text-[10px] text-fd-muted-foreground">{key}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="text-sm font-semibold text-fd-foreground">tint — over white</h3>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${OVERLAY_STOPS.length}, minmax(0, 1fr))` }}>
            {OVERLAY_STOPS.map(({ key, alpha }) => (
              <div key={key} className="flex flex-col gap-1">
                <div className="aspect-square rounded-md border border-fd-border/30 bg-neutral-900">
                  <div className="size-full rounded-md" style={{ background: `oklch(from white l c h / ${alpha})` }} />
                </div>
                <span className="text-center font-mono text-[10px] text-fd-muted-foreground">{key}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
