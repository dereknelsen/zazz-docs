"use client";

import { useTheme } from "../../_state/theme-store";
import { SectionHeader } from "../section-header";
import { TextInput } from "../text-input";

const KEYS = ["none", "xs", "sm", "md", "lg", "xl"] as const;

export function EffectsPanel() {
  const { theme, update } = useTheme();
  const { effects } = theme;

  const setShadow = (k: (typeof KEYS)[number], v: string) =>
    update((p) => ({ ...p, effects: { ...p.effects, shadows: { ...p.effects.shadows, [k]: v } } }));

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <SectionHeader
        title="Effects"
        description="Focus rings and layered drop shadows. Multi-layer shadows are comma-separated."
      />
      <div className="flex flex-col gap-5 px-6 py-4">
        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Focus ring</h3>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-fd-muted-foreground">
              --focus-ring
            </span>
            <textarea
              value={effects.focusRing}
              onChange={(e) =>
                update((p) => ({ ...p, effects: { ...p.effects, focusRing: e.target.value } }))
              }
              rows={2}
              spellCheck={false}
              className="rounded-md border border-fd-border/60 bg-fd-background px-2.5 py-1.5 font-mono text-xs text-fd-foreground outline-none focus:border-fd-ring focus:ring-2 focus:ring-fd-ring/30"
            />
          </label>
        </section>

        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Shadows</h3>
          <div className="flex flex-col gap-3">
            {KEYS.map((k) => (
              <div key={k} className="grid grid-cols-[120px_1fr_60px] items-start gap-3">
                <span className="pt-2 font-mono text-xs text-fd-foreground">--shadow-{k}</span>
                <textarea
                  value={effects.shadows[k]}
                  onChange={(e) => setShadow(k, e.target.value)}
                  rows={Math.min(6, (effects.shadows[k].match(/,/g) || []).length + 1)}
                  spellCheck={false}
                  className="rounded-md border border-fd-border/60 bg-fd-background px-2.5 py-1.5 font-mono text-[11px] text-fd-foreground outline-none focus:border-fd-ring focus:ring-2 focus:ring-fd-ring/30"
                />
                <div
                  className="aspect-square rounded-md border border-fd-border/30 bg-fd-card"
                  style={{ boxShadow: effects.shadows[k] }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
