import type { ThemeConfig } from "./types";
import { DEFAULT_THEME } from "./defaults";

const PREFIX = "t=";
const STORAGE_KEY = "zazz-theme-config";

function b64urlEncode(str: string): string {
  if (typeof window === "undefined") return "";
  return window
    .btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64urlDecode(str: string): string {
  if (typeof window === "undefined") return "";
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  return decodeURIComponent(escape(window.atob(str.replace(/-/g, "+").replace(/_/g, "/") + pad)));
}

export function encodeTheme(theme: ThemeConfig): string {
  return PREFIX + b64urlEncode(JSON.stringify(theme));
}

export function decodeTheme(hash: string): ThemeConfig | null {
  try {
    const clean = hash.startsWith("#") ? hash.slice(1) : hash;
    if (!clean.startsWith(PREFIX)) return null;
    const json = b64urlDecode(clean.slice(PREFIX.length));
    const parsed = JSON.parse(json);
    return mergeDefaults(parsed);
  } catch {
    return null;
  }
}

// Merge parsed config into defaults so missing keys (older shapes) don't break.
function mergeDefaults(partial: Partial<ThemeConfig>): ThemeConfig {
  return {
    palettes: { ...DEFAULT_THEME.palettes, ...(partial.palettes ?? {}) },
    status: { ...DEFAULT_THEME.status, ...(partial.status ?? {}) },
    bindings: { ...DEFAULT_THEME.bindings, ...(partial.bindings ?? {}) },
    typography: { ...DEFAULT_THEME.typography, ...(partial.typography ?? {}) },
    spacing: { ...DEFAULT_THEME.spacing, ...(partial.spacing ?? {}) },
    radius: { ...DEFAULT_THEME.radius, ...(partial.radius ?? {}) },
    layout: { ...DEFAULT_THEME.layout, ...(partial.layout ?? {}) },
    effects: { ...DEFAULT_THEME.effects, ...(partial.effects ?? {}) },
    animations: { ...DEFAULT_THEME.animations, ...(partial.animations ?? {}) },
  };
}

export function hydrateTheme(): ThemeConfig {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const fromHash = decodeTheme(window.location.hash);
  if (fromHash) return fromHash;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return mergeDefaults(JSON.parse(stored));
  } catch {}
  return DEFAULT_THEME;
}

export function persistTheme(theme: ThemeConfig): void {
  if (typeof window === "undefined") return;
  const hash = encodeTheme(theme);
  if (window.location.hash !== `#${hash}`) {
    window.history.replaceState(null, "", `#${hash}`);
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  } catch {}
}
