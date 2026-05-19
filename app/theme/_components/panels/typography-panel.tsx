"use client";

import { useMemo } from "react";
import { calculateTypeScale, FONT_SIZE_NAMES, FONT_SIZE_STEP_MAP } from "../../_lib/utopia-type";
import { useTheme } from "../../_state/theme-store";
import type { FontSizeName } from "../../_lib/types";
import { NumericInput } from "../numeric-input";
import { SectionHeader } from "../section-header";
import { TextInput } from "../text-input";

export function TypographyPanel() {
  const { theme, update } = useTheme();
  const { typography } = theme;
  const utopia = typography.utopia;

  const scale = useMemo(() => {
    const allSteps = calculateTypeScale(utopia);
    const byStep = new Map(allSteps.map((s) => [s.step, s]));
    return FONT_SIZE_NAMES.map((name) => {
      const step = FONT_SIZE_STEP_MAP[name];
      const data = byStep.get(step) ?? calculateTypeScale({ ...utopia, positiveSteps: 16, negativeSteps: 8 }).find((s) => s.step === step);
      return { name, step, data };
    });
  }, [utopia]);

  const setUtopia = (patch: Partial<typeof utopia>) =>
    update((p) => ({ ...p, typography: { ...p.typography, utopia: { ...p.typography.utopia, ...patch } } }));

  const setFont = (key: "body" | "heading" | "mono", v: string) =>
    update((p) => ({ ...p, typography: { ...p.typography, fonts: { ...p.typography.fonts, [key]: v } } }));

  const setWeight = (key: keyof typeof typography.weights, v: number) =>
    update((p) => ({ ...p, typography: { ...p.typography, weights: { ...p.typography.weights, [key]: v } } }));

  const setTracking = (key: FontSizeName, v: string) =>
    update((p) => ({ ...p, typography: { ...p.typography, tracking: { ...p.typography.tracking, [key]: v } } }));

  const setLeading = (key: FontSizeName, v: string) =>
    update((p) => ({
      ...p,
      typography: {
        ...p.typography,
        leading: {
          ...p.typography.leading,
          [key]: Number.isFinite(Number(v)) && v.trim() !== "" ? Number(v) : v,
        },
      },
    }));

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <SectionHeader title="Typography" description="Utopia fluid type scale + per-step weight/tracking/leading." />
      <div className="flex flex-col gap-5 px-6 py-4">
        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Utopia config</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <NumericInput label="Min viewport" suffix="px" value={utopia.minWidth} onChange={(n) => setUtopia({ minWidth: n })} />
            <NumericInput label="Min font" suffix="px" value={utopia.minFontSize} onChange={(n) => setUtopia({ minFontSize: n })} />
            <NumericInput label="Min scale" step={0.01} value={utopia.minTypeScale} onChange={(n) => setUtopia({ minTypeScale: n })} />
            <div />
            <NumericInput label="Max viewport" suffix="px" value={utopia.maxWidth} onChange={(n) => setUtopia({ maxWidth: n })} />
            <NumericInput label="Max font" suffix="px" value={utopia.maxFontSize} onChange={(n) => setUtopia({ maxFontSize: n })} />
            <NumericInput label="Max scale" step={0.01} value={utopia.maxTypeScale} onChange={(n) => setUtopia({ maxTypeScale: n })} />
            <div />
            <NumericInput label="Positive steps" value={utopia.positiveSteps} onChange={(n) => setUtopia({ positiveSteps: n })} />
            <NumericInput label="Negative steps" value={utopia.negativeSteps} onChange={(n) => setUtopia({ negativeSteps: n })} />
          </div>
        </section>

        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Font families</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <TextInput mono label="Body" value={typography.fonts.body} onChange={(v) => setFont("body", v)} />
            <TextInput mono label="Heading" value={typography.fonts.heading} onChange={(v) => setFont("heading", v)} />
            <TextInput mono label="Mono" value={typography.fonts.mono} onChange={(v) => setFont("mono", v)} />
          </div>
        </section>

        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Weights</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {(Object.keys(typography.weights) as (keyof typeof typography.weights)[]).map((k) => (
              <NumericInput
                key={k}
                label={k}
                value={typography.weights[k]}
                step={100}
                min={100}
                max={900}
                onChange={(n) => setWeight(k, n)}
              />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Scale (per-name)</h3>
          <div className="grid grid-cols-[1fr_auto_2fr_1fr_1fr] items-center gap-3 border-b border-fd-border/30 pb-2 text-[11px] uppercase tracking-[0.08em] text-fd-muted-foreground">
            <span>Name</span>
            <span>Step</span>
            <span>Clamp</span>
            <span>Tracking</span>
            <span>Leading</span>
          </div>
          {scale.map(({ name, step, data }) => (
            <div
              key={name}
              className="grid grid-cols-[1fr_auto_2fr_1fr_1fr] items-center gap-3 border-b border-fd-border/20 py-2 text-sm last:border-0"
            >
              <span className="font-mono text-fd-foreground">{name}</span>
              <span className="font-mono text-xs text-fd-muted-foreground">{step}</span>
              <div className="flex flex-col gap-0.5">
                <span className="truncate font-mono text-[11px] text-fd-foreground" title={data?.clamp}>
                  {data?.clamp ?? "—"}
                </span>
                {data?.wcagViolation && (
                  <span className="font-mono text-[10px] text-fd-warning">
                    WCAG: {data.wcagViolation.from}–{data.wcagViolation.to}px
                  </span>
                )}
              </div>
              <TextInput
                mono
                value={typography.tracking[name as FontSizeName]}
                onChange={(v) => setTracking(name as FontSizeName, v)}
              />
              <TextInput
                mono
                value={String(typography.leading[name as FontSizeName])}
                onChange={(v) => setLeading(name as FontSizeName, v)}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
