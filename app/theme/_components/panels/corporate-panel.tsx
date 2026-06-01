"use client";

import { useTheme } from "../../_state/theme-store";
import type { PaletteName } from "../../_lib/types";
import { SectionHeader } from "../section-header";
import { PaletteEditor } from "./palette-editor";

const BRAND: PaletteName[] = ["primary", "secondary", "tertiary"];

export function CorporatePanel() {
  const { theme, update } = useTheme();
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <SectionHeader
        title="Corporate"
        description="Brand color scales (50–950) generated via tints.dev algorithm."
      />
      <div className="flex flex-col gap-5 px-6 py-4">
        {BRAND.map((name) => (
          <PaletteEditor
            key={name}
            palette={theme.palettes[name]}
            onChange={(next) =>
              update((prev) => ({ ...prev, palettes: { ...prev.palettes, [name]: next } }))
            }
          />
        ))}
      </div>
    </div>
  );
}
