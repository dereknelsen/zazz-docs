"use client";

import { useState } from "react";
import { SectionNav, type SectionId } from "./section-nav";
import { OutputDrawer } from "./output-drawer";
import { ThemesPanel } from "./panels/themes-panel";
import { CorporatePanel } from "./panels/corporate-panel";
import { GrayscalePanel } from "./panels/grayscale-panel";
import { TypographyPanel } from "./panels/typography-panel";
import { SpacingPanel } from "./panels/spacing-panel";
import { RadiusPanel } from "./panels/radius-panel";
import { LayoutPanel } from "./panels/layout-panel";
import { EffectsPanel } from "./panels/effects-panel";
import { AnimationsPanel } from "./panels/animations-panel";

function ActivePanel({ id }: { id: SectionId }) {
  switch (id) {
    case "themes":
      return <ThemesPanel />;
    case "corporate":
      return <CorporatePanel />;
    case "grayscale":
      return <GrayscalePanel />;
    case "typography":
      return <TypographyPanel />;
    case "spacing":
      return <SpacingPanel />;
    case "radius":
      return <RadiusPanel />;
    case "layout":
      return <LayoutPanel />;
    case "effects":
      return <EffectsPanel />;
    case "animations":
      return <AnimationsPanel />;
  }
}

export function ThemeShell() {
  const [active, setActive] = useState<SectionId>("themes");
  return (
    <div className="grid h-[100dvh] w-full grid-rows-[1fr_auto] overflow-hidden">
      <div className="flex min-h-0 w-full">
        <SectionNav active={active} onChange={setActive} />
        <main className="flex min-w-0 flex-1 flex-col">
          <ActivePanel id={active} />
        </main>
      </div>
      <OutputDrawer />
    </div>
  );
}
