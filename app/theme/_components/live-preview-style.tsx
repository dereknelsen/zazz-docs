"use client";

import { useMemo } from "react";
import { generateThemeCSS } from "../_lib/generate-css";
import { useTheme } from "../_state/theme-store";

/**
 * Injects the current theme's generated CSS into the page so the builder UI
 * itself reflects every edit live.
 */
export function LivePreviewStyle() {
  const { theme } = useTheme();
  const css = useMemo(() => generateThemeCSS(theme), [theme]);
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
