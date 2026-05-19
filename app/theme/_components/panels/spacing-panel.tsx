"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../_state/theme-store";
import { SectionHeader } from "../section-header";
import { TextInput } from "../text-input";

export function SpacingPanel() {
  const { theme, update } = useTheme();
  const { spacing } = theme;
  const [newStep, setNewStep] = useState("");

  const setInterval = (v: string) =>
    update((p) => ({ ...p, spacing: { ...p.spacing, interval: v } }));

  const setGap = (k: keyof typeof spacing.gaps, v: string) =>
    update((p) => ({ ...p, spacing: { ...p.spacing, gaps: { ...p.spacing.gaps, [k]: v } } }));

  const addStep = () => {
    const v = newStep.trim();
    if (!v) return;
    if (spacing.steps.includes(v)) return;
    update((p) => ({ ...p, spacing: { ...p.spacing, steps: [...p.spacing.steps, v] } }));
    setNewStep("");
  };

  const removeStep = (s: string) =>
    update((p) => ({ ...p, spacing: { ...p.spacing, steps: p.spacing.steps.filter((x) => x !== s) } }));

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <SectionHeader title="Spacing" description="Spacing interval and step scale. Steps multiply --spacing-interval." />
      <div className="flex flex-col gap-5 px-6 py-4">
        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Interval</h3>
          <TextInput mono label="--spacing-interval" value={spacing.interval} onChange={setInterval} className="max-w-xs" />
        </section>

        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Semantic gaps</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((k) => (
              <TextInput key={k} mono label={`--gap-${k}`} value={spacing.gaps[k]} onChange={(v) => setGap(k, v)} />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <header className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-fd-foreground">Step scale</h3>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                placeholder="e.g. 100, 0_25"
                className="rounded-md border border-fd-border/60 bg-fd-background px-2 py-1 text-xs outline-none focus:border-fd-ring focus:ring-2 focus:ring-fd-ring/30"
              />
              <button
                type="button"
                onClick={addStep}
                className="inline-flex items-center gap-1 rounded-md bg-fd-primary px-2 py-1 text-xs font-medium text-fd-primary-foreground hover:bg-fd-primary/90"
              >
                <Plus className="size-3" /> Add
              </button>
            </div>
          </header>
          <ul className="flex flex-wrap gap-1.5">
            {spacing.steps.map((s) => (
              <li key={s} className="inline-flex items-center gap-1 rounded-md border border-fd-border/40 bg-fd-card/60 pl-2 pr-1 py-1">
                <span className="font-mono text-xs text-fd-foreground">step-{s}</span>
                <button
                  type="button"
                  onClick={() => removeStep(s)}
                  className="rounded p-0.5 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
                  aria-label={`Remove step ${s}`}
                >
                  <X className="size-3" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
