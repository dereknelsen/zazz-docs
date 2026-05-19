"use client";

import { useTheme } from "../../_state/theme-store";
import { NumericInput } from "../numeric-input";
import { SectionHeader } from "../section-header";
import { TextInput } from "../text-input";

export function RadiusPanel() {
  const { theme, update } = useTheme();
  const { radius } = theme;

  const setMul = (n: number) => update((p) => ({ ...p, radius: { ...p.radius, multiplier: n } }));
  const setSemantic = (k: keyof typeof radius.semantic, v: string) =>
    update((p) => ({ ...p, radius: { ...p.radius, semantic: { ...p.radius.semantic, [k]: v } } }));
  const setPrimitive = (k: keyof typeof radius.primitives, v: string) =>
    update((p) => ({ ...p, radius: { ...p.radius, primitives: { ...p.radius.primitives, [k]: v } } }));

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <SectionHeader title="Radius" description="Border-radius multiplier, semantic scale, and component primitives." />
      <div className="flex flex-col gap-5 px-6 py-4">
        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Multiplier</h3>
          <NumericInput label="--radius-multiplier" value={radius.multiplier} step={0.1} onChange={setMul} className="max-w-xs" />
        </section>

        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Semantic</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {(Object.keys(radius.semantic) as (keyof typeof radius.semantic)[]).map((k) => (
              <TextInput key={k} mono label={`--radius-${k}`} value={radius.semantic[k]} onChange={(v) => setSemantic(k, v)} />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Primitives</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {(Object.keys(radius.primitives) as (keyof typeof radius.primitives)[]).map((k) => (
              <TextInput key={k} mono label={`--radius-${k}`} value={radius.primitives[k]} onChange={(v) => setPrimitive(k, v)} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
