export type PaletteName = "primary" | "secondary" | "tertiary" | "neutral";

export type ColorMode = "linear" | "perceived";
export type StopSelection = "auto" | "manual";

export type Stop = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export interface PaletteConfig {
  name: PaletteName;
  value: string;
  valueStop: number;
  colorMode: ColorMode;
  h: number;
  s: number;
  lMin: number;
  lMax: number;
  stopSelection: StopSelection;
}

export interface SwatchValue {
  hex: string;
  stop: number;
  h: number;
  hScale: number;
  s: number;
  sScale: number;
  l: number;
}

export type StatusName = "info" | "success" | "warning" | "destructive";
export type StatusConfig = Record<StatusName, { light: string; dark: string }>;

export type SemanticGroup = "base" | "overlay" | "brand";
export type SemanticVar =
  | "background"
  | "foreground"
  | "border"
  | "border-foreground"
  | "card"
  | "card-foreground"
  | "input"
  | "input-foreground"
  | "muted"
  | "muted-foreground"
  | "faded"
  | "faded-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "tertiary"
  | "tertiary-foreground";

export type Binding = string;
export type ThemeBindings = Record<SemanticVar, { light: Binding; dark: Binding }>;

export interface UtopiaTypeConfig {
  minWidth: number;
  maxWidth: number;
  minFontSize: number;
  maxFontSize: number;
  minTypeScale: number;
  maxTypeScale: number;
  positiveSteps: number;
  negativeSteps: number;
  relativeTo: "viewport" | "container" | "viewport-width";
}

export type FontSizeName =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "xl"
  | "lg"
  | "md"
  | "sm"
  | "xs"
  | "eyebrow";

export interface TypographyConfig {
  utopia: UtopiaTypeConfig;
  fonts: { body: string; heading: string; mono: string };
  weights: Record<"body" | "heading" | "strong" | "mono" | "eyebrow", number>;
  tracking: Record<FontSizeName, string>;
  leading: Record<FontSizeName, string | number>;
}

export interface SpacingConfig {
  interval: string;
  gaps: Record<"xs" | "sm" | "md" | "lg" | "xl", string>;
  steps: string[];
}

export interface RadiusConfig {
  multiplier: number;
  semantic: Record<"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full", string>;
  primitives: Record<"button" | "input" | "badge" | "card", string>;
}

export interface LayoutConfig {
  article: string;
  container: string;
  screens: Record<"xs" | "sm" | "md" | "lg" | "xl", string>;
}

export interface EffectsConfig {
  focusRing: string;
  shadows: Record<"none" | "xs" | "sm" | "md" | "lg" | "xl", string>;
}

export interface AnimationsConfig {
  springEasing: string;
  springDuration: string;
  defaultTimingFunction: string;
  defaultDuration: string;
}

export interface ThemeConfig {
  palettes: Record<PaletteName, PaletteConfig>;
  status: StatusConfig;
  bindings: ThemeBindings;
  typography: TypographyConfig;
  spacing: SpacingConfig;
  radius: RadiusConfig;
  layout: LayoutConfig;
  effects: EffectsConfig;
  animations: AnimationsConfig;
}
