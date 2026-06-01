"use client";

import { useTheme } from "../../_state/theme-store";
import { SectionHeader } from "../section-header";
import { TextInput } from "../text-input";

export function AnimationsPanel() {
  const { theme, update } = useTheme();
  const { animations } = theme;

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <SectionHeader
        title="Animations"
        description="Spring easing curve and default transition timing/duration."
      />
      <div className="flex flex-col gap-5 px-6 py-4">
        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Spring</h3>
          <label className="mb-3 flex flex-col gap-1.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-fd-muted-foreground">
              --spring-easing
            </span>
            <textarea
              value={animations.springEasing}
              onChange={(e) =>
                update((p) => ({
                  ...p,
                  animations: { ...p.animations, springEasing: e.target.value },
                }))
              }
              rows={12}
              spellCheck={false}
              className="rounded-md border border-fd-border/60 bg-fd-background px-2.5 py-1.5 font-mono text-[11px] text-fd-foreground outline-none focus:border-fd-ring focus:ring-2 focus:ring-fd-ring/30"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              mono
              label="--spring-duration"
              value={animations.springDuration}
              onChange={(v) =>
                update((p) => ({ ...p, animations: { ...p.animations, springDuration: v } }))
              }
            />
            <TextInput
              mono
              label="--default-transition-duration"
              value={animations.defaultDuration}
              onChange={(v) =>
                update((p) => ({ ...p, animations: { ...p.animations, defaultDuration: v } }))
              }
            />
          </div>
        </section>

        <section className="rounded-xl border border-fd-border/30 bg-fd-card/30 p-4">
          <h3 className="mb-3 text-sm font-semibold text-fd-foreground">Default fallback</h3>
          <TextInput
            mono
            label="--default-transition-timing-function"
            value={animations.defaultTimingFunction}
            onChange={(v) =>
              update((p) => ({ ...p, animations: { ...p.animations, defaultTimingFunction: v } }))
            }
          />
        </section>
      </div>
    </div>
  );
}
