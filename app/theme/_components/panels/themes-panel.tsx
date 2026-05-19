"use client";

import { useTheme } from "../../_state/theme-store";
import type { SemanticVar, StatusName } from "../../_lib/types";
import { ColorBindingPicker } from "../color-binding-picker";
import { SectionHeader } from "../section-header";
import { SwatchChip } from "../swatch-chip";

const GROUPS: { label: string; vars: SemanticVar[] }[] = [
  {
    label: "base",
    vars: [
      "background",
      "foreground",
      "border",
      "border-foreground",
      "card",
      "card-foreground",
      "input",
      "input-foreground",
    ],
  },
  { label: "overlay", vars: ["muted", "muted-foreground", "faded", "faded-foreground"] },
  {
    label: "brand",
    vars: ["primary", "primary-foreground", "secondary", "secondary-foreground", "tertiary", "tertiary-foreground"],
  },
];

const STATUS_VARS: StatusName[] = ["info", "success", "warning", "destructive"];

export function ThemesPanel() {
  const { theme, update } = useTheme();

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <SectionHeader title="Themes" description="Map semantic variables to scale tokens for light and dark modes." />
      <div className="px-6 py-4">
        {/* table head */}
        <div className="grid grid-cols-[1fr_minmax(220px,1fr)_minmax(220px,1fr)] items-center gap-4 border-b border-fd-border/40 pb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-fd-muted-foreground">
          <span>Name</span>
          <span>Base mode</span>
          <span>Dark</span>
        </div>

        {GROUPS.map((group) => (
          <section key={group.label} className="mt-4">
            <h2 className="mb-2 text-sm font-semibold text-fd-foreground">{group.label}</h2>
            <ul className="divide-y divide-fd-border/20 rounded-lg border border-fd-border/30 bg-fd-card/30">
              {group.vars.map((v) => (
                <li
                  key={v}
                  className="grid grid-cols-[1fr_minmax(220px,1fr)_minmax(220px,1fr)] items-center gap-4 px-3 py-2 text-sm"
                >
                  <span className="font-mono text-fd-foreground">{v}</span>
                  <ColorBindingPicker
                    theme={theme}
                    value={theme.bindings[v].light}
                    onChange={(b) =>
                      update((prev) => ({
                        ...prev,
                        bindings: { ...prev.bindings, [v]: { ...prev.bindings[v], light: b } },
                      }))
                    }
                  />
                  <ColorBindingPicker
                    theme={theme}
                    value={theme.bindings[v].dark}
                    onChange={(b) =>
                      update((prev) => ({
                        ...prev,
                        bindings: { ...prev.bindings, [v]: { ...prev.bindings[v], dark: b } },
                      }))
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mt-4">
          <h2 className="mb-2 text-sm font-semibold text-fd-foreground">status</h2>
          <ul className="divide-y divide-fd-border/20 rounded-lg border border-fd-border/30 bg-fd-card/30">
            {STATUS_VARS.map((name) => (
              <li
                key={name}
                className="grid grid-cols-[1fr_minmax(220px,1fr)_minmax(220px,1fr)] items-center gap-4 px-3 py-2 text-sm"
              >
                <span className="font-mono text-fd-foreground">{name}</span>
                <SwatchChip color={theme.status[name].light} label={theme.status[name].light.slice(0, 22) + "…"} />
                <SwatchChip color={theme.status[name].dark} label={theme.status[name].dark.slice(0, 22) + "…"} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
