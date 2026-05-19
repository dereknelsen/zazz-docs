"use client";

import { useTheme } from "../../_state/theme-store";
import { SectionHeader } from "../section-header";
import { TextInput } from "../text-input";

export function LayoutPanel() {
  const { theme, update } = useTheme();
  const { layout } = theme;

  const setScreen = (k: keyof typeof layout.screens, v: string) =>
    update((p) => ({ ...p, layout: { ...p.layout, screens: { ...p.layout.screens, [k]: v } } }));

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <SectionHeader title="Layout" description="Container widths and breakpoints. Breakpoints are for calcs and container queries, not @media." />
      <div className="flex flex-col gap-5 px-6 py-4">
        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Containers</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <TextInput mono label="--article" value={layout.article} onChange={(v) => update((p) => ({ ...p, layout: { ...p.layout, article: v } }))} />
            <TextInput mono label="--container" value={layout.container} onChange={(v) => update((p) => ({ ...p, layout: { ...p.layout, container: v } }))} />
          </div>
        </section>

        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Breakpoints</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {(Object.keys(layout.screens) as (keyof typeof layout.screens)[]).map((k) => (
              <TextInput key={k} mono label={`--screen-${k}`} value={layout.screens[k]} onChange={(v) => setScreen(k, v)} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
