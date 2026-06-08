import { hexToOklch } from "./create-display-color";
import { createSwatches } from "./create-swatches";
import { fontSizeClampMap, FONT_SIZE_NAMES } from "./utopia-type";
import type { PaletteConfig, PaletteName, ThemeConfig, ThemeBindings, SemanticVar } from "./types";

const SEMANTIC_GROUPS: { label: string; vars: SemanticVar[] }[] = [
  {
    label: "base",
    vars: [
      "background",
      "foreground",
      "border",
      "border-foreground",
      "card",
      "card-foreground",
      "input",
      "input-foreground",
    ],
  },
  {
    label: "overlay",
    vars: ["muted", "muted-foreground", "faded", "faded-foreground"],
  },
  {
    label: "brand",
    vars: [
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "tertiary",
      "tertiary-foreground",
    ],
  },
];

const STATUS_VARS = ["info", "success", "warning", "destructive"] as const;

function bindingValue(binding: string): string {
  // If looks like a CSS color literal (oklch/hsl/rgb/#...), pass through;
  // otherwise wrap in var().
  if (
    binding.startsWith("oklch") ||
    binding.startsWith("hsl") ||
    binding.startsWith("rgb") ||
    binding.startsWith("#")
  ) {
    return binding;
  }
  return `var(--${binding})`;
}

function emitThemeVars(
  bindings: ThemeBindings,
  side: "light" | "dark",
  status: ThemeConfig["status"],
) {
  const lines: string[] = [];
  for (const group of SEMANTIC_GROUPS) {
    lines.push(`  /* ${group.label}${side === "dark" ? " - dark" : ""} */`);
    for (const v of group.vars) {
      lines.push(`  --${v}: ${bindingValue(bindings[v][side])};`);
    }
    lines.push("");
  }
  lines.push(`  /* status${side === "dark" ? " - dark" : ""} */`);
  for (const s of STATUS_VARS) {
    lines.push(`  --${s}: ${status[s][side]};`);
    lines.push(`  --${s}-foreground: var(--white);`);
  }
  return lines.join("\n");
}

function emitPaletteScale(palette: PaletteConfig): string {
  const sw = createSwatches(palette).filter((s) => s.stop !== 0 && s.stop !== 1000);
  return sw.map((s) => `  --${palette.name}-${s.stop}: ${hexToOklch(s.hex)};`).join("\n");
}

function emitNeutralScale(palette: PaletteConfig): string {
  const sw = createSwatches(palette).filter((s) => s.stop !== 0 && s.stop !== 1000);
  return sw.map((s) => `  --neutral-${s.stop}: ${hexToOklch(s.hex)};`).join("\n");
}

function emitOverlayScale(name: "shade" | "tint", base: "neutral-950" | "white"): string {
  const stops: { key: string; alpha: string }[] = [
    { key: "none", alpha: "0" },
    { key: "50", alpha: "0.05" },
    { key: "100", alpha: "0.1" },
    { key: "200", alpha: "0.2" },
    { key: "300", alpha: "0.3" },
    { key: "400", alpha: "0.4" },
    { key: "500", alpha: "0.5" },
    { key: "600", alpha: "0.6" },
    { key: "700", alpha: "0.7" },
    { key: "800", alpha: "0.8" },
    { key: "900", alpha: "0.9" },
    { key: "950", alpha: "0.95" },
    { key: "full", alpha: "1" },
  ];
  return stops
    .map((s) => `  --${name}-${s.key}: oklch(from var(--${base}) l c h / ${s.alpha});`)
    .join("\n");
}

export function generateThemeCSS(theme: ThemeConfig): string {
  const { palettes, status, bindings, typography, spacing, radius, layout, effects, animations } =
    theme;
  const fontClamps = fontSizeClampMap(typography.utopia);

  const themeLight = emitThemeVars(bindings, "light", status);
  const themeDark = emitThemeVars(bindings, "dark", status);

  const brandScales: PaletteName[] = ["primary", "secondary", "tertiary"];

  const out: string[] = [];
  out.push(":root {");
  out.push("  /* Enable light/dark mode */");
  out.push("  color-scheme: light dark;");
  out.push("");
  out.push("  /* Enable discrete value animations, e.g. height: auto; */");
  out.push("  interpolate-size: allow-keywords;");
  out.push("");
  out.push("  /* ==========================================================================");
  out.push("  * 1. Theme — light/dark modes; background–foreground roles");
  out.push("  * ========================================================================== */");
  out.push("");
  out.push(themeLight);
  out.push("");
  const indented = themeDark.replace(/^(?=.)/gm, "  ");
  out.push("  @media (prefers-color-scheme: dark) {");
  out.push(indented);
  out.push("  }");
  out.push("");
  out.push("  :is(.dark, .dark *) {");
  out.push(indented);
  out.push("  }");
  out.push("");
  out.push("  /* ==========================================================================");
  out.push("  * 2. Corporate — brand color scales (50–950)");
  out.push("  * ========================================================================== */");
  out.push("");
  for (const name of brandScales) {
    out.push(`  /* ${name} */`);
    out.push(emitPaletteScale(palettes[name]));
    out.push("");
  }
  out.push("  /* ==========================================================================");
  out.push("  * 3. Grayscale — neutrals, shade (dim), tint (fade)");
  out.push("  * ========================================================================== */");
  out.push("");
  out.push("  /* neutral */");
  out.push("  --white: white;");
  out.push(emitNeutralScale(palettes.neutral));
  out.push("  --black: black;");
  out.push("");
  out.push("  /* shade — darkened overlays (derived from neutral-950) */");
  out.push(emitOverlayScale("shade", "neutral-950"));
  out.push("");
  out.push("  /* tint — faded overlays (derived from white) */");
  out.push(emitOverlayScale("tint", "white"));
  out.push("");
  out.push("  /* ==========================================================================");
  out.push("  * 4. Typography — typefaces, sizes, weights, tracking, leading");
  out.push("  * ========================================================================== */");
  out.push("");
  out.push("  /* font-family */");
  out.push(`  --font-family-body: ${typography.fonts.body};`);
  out.push(`  --font-family-heading: ${typography.fonts.heading};`);
  out.push(`  --font-family-mono: ${typography.fonts.mono};`);
  out.push("");
  out.push("  /* font-size — fluid clamp() from Desktop/Mobile Figma values */");
  for (const name of FONT_SIZE_NAMES) {
    out.push(`  --font-size-${name}: ${fontClamps[name]};`);
  }
  out.push("");
  out.push("  /* font-weight */");
  out.push(`  --font-weight-body: ${typography.weights.body};`);
  out.push(`  --font-weight-heading: ${typography.weights.heading};`);
  out.push(`  --font-weight-strong: ${typography.weights.strong};`);
  out.push(`  --font-weight-mono: ${typography.weights.mono};`);
  out.push(`  --font-weight-eyebrow: ${typography.weights.eyebrow};`);
  out.push("");
  out.push("  /* letter-spacing */");
  for (const name of FONT_SIZE_NAMES) {
    if (name === "eyebrow" || /^(display|h[1-6]|xl|lg|md|sm|xs)$/.test(name)) {
      out.push(`  --tracking-${name}: ${typography.tracking[name]};`);
    }
  }
  out.push("");
  out.push("  /* line-height — not in Figma (variable limits) */");
  for (const name of FONT_SIZE_NAMES) {
    out.push(`  --leading-${name}: ${typography.leading[name]};`);
  }
  out.push("");
  out.push("  /* paragraph-spacing — Figma only; add per-style margin tokens as needed */");
  out.push("");
  out.push("  /* ==========================================================================");
  out.push("  * 5. Spacing — interval modifier, semantic gaps, step scale");
  out.push("  * ========================================================================== */");
  out.push("");
  out.push("  /* modifiers (dev) */");
  out.push(`  --spacing-interval: ${spacing.interval};`);
  out.push("");
  out.push("  /* semantic */");
  out.push(`  --gap-xs: ${spacing.gaps.xs};`);
  out.push(`  --gap-sm: ${spacing.gaps.sm};`);
  out.push(`  --gap-md: ${spacing.gaps.md};`);
  out.push(`  --gap-lg: ${spacing.gaps.lg};`);
  out.push(`  --gap-xl: ${spacing.gaps.xl};`);
  out.push("");
  out.push("  /* scale */");
  for (const step of spacing.steps) {
    if (step === "px") {
      out.push("  --step-px: 1px;");
    } else if (step === "0_5") {
      out.push("  --step-0_5: calc(var(--spacing-interval) / 2);");
    } else if (step === "1") {
      out.push("  --step-1: var(--spacing-interval);");
    } else if (step.includes("_")) {
      const [whole, frac] = step.split("_");
      const value = Number(`${whole}.${frac}`);
      out.push(`  --step-${step}: calc(var(--spacing-interval) * ${value});`);
    } else {
      out.push(`  --step-${step}: calc(var(--spacing-interval) * ${step});`);
    }
  }
  out.push("");
  out.push("  /* ==========================================================================");
  out.push("  * 6. Radius — multiplier, semantic scale, component primitives");
  out.push("  * ========================================================================== */");
  out.push("");
  out.push("  /* modifiers (dev) */");
  out.push(`  --radius-multiplier: ${radius.multiplier};`);
  out.push("");
  out.push("  /* semantic */");
  out.push(`  --radius-xs: calc(${radius.semantic.xs} * var(--radius-multiplier));`);
  out.push(`  --radius-sm: calc(${radius.semantic.sm} * var(--radius-multiplier));`);
  out.push(`  --radius-md: calc(${radius.semantic.md} * var(--radius-multiplier));`);
  out.push(`  --radius-lg: calc(${radius.semantic.lg} * var(--radius-multiplier));`);
  out.push(`  --radius-xl: calc(${radius.semantic.xl} * var(--radius-multiplier));`);
  out.push(`  --radius-full: ${radius.semantic.full};`);
  out.push("");
  out.push("  /* primitives */");
  out.push(`  --radius-button: ${radius.primitives.button};`);
  out.push(`  --radius-input: ${radius.primitives.input};`);
  out.push(`  --radius-badge: ${radius.primitives.badge};`);
  out.push(`  --radius-card: ${radius.primitives.card};`);
  out.push("");
  out.push("  /* ==========================================================================");
  out.push("  * 7. Layout — container widths and breakpoints");
  out.push("  * ========================================================================== */");
  out.push("");
  out.push("  /* semantic */");
  out.push(`  --article: ${layout.article};`);
  out.push(`  --container: ${layout.container};`);
  out.push("");
  out.push("  /* breakpoints — for calcs and container queries, not @media */");
  out.push(`  --screen-xs: ${layout.screens.xs};`);
  out.push(`  --screen-sm: ${layout.screens.sm};`);
  out.push(`  --screen-md: ${layout.screens.md};`);
  out.push(`  --screen-lg: ${layout.screens.lg};`);
  out.push(`  --screen-xl: ${layout.screens.xl};`);
  out.push("");
  out.push("  /* ==========================================================================");
  out.push("  * 8. Effects — shadows, focus rings");
  out.push("  * ========================================================================== */");
  out.push("");
  out.push("  /* states - focus rings */");
  out.push(`  --focus-ring: ${effects.focusRing};`);
  out.push("");
  out.push("  /* shadows */");
  out.push(`  none: ${effects.shadows.none};`);
  for (const k of ["xs", "sm", "md", "lg", "xl"] as const) {
    out.push(`  --shadow-${k}:\n    ${effects.shadows[k]};`);
  }
  out.push("");
  out.push("  /* ==========================================================================");
  out.push("  * 9. Animations — spring easing, duration");
  out.push("  * ========================================================================== */");
  out.push("");
  out.push("  /* Spring easing curve for smooth, natural animations */");
  out.push(`  --spring-easing: ${animations.springEasing};`);
  out.push(`  --spring-duration: ${animations.springDuration};`);
  out.push("");
  out.push("  /* Fallback to easeOutQuart for browsers that don't support spring easing */");
  out.push(`  --default-transition-timing-function: ${animations.defaultTimingFunction};`);
  out.push(`  --default-transition-duration: ${animations.defaultDuration};`);
  out.push("}");
  out.push("");
  return out.join("\n");
}
