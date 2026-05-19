"use client";

import { LivePreviewStyle } from "./_components/live-preview-style";
import { ThemeShell } from "./_components/theme-shell";
import { ThemeProvider } from "./_state/theme-store";

export default function ThemePage() {
  return (
    <ThemeProvider>
      <LivePreviewStyle />
      <ThemeShell />
    </ThemeProvider>
  );
}
