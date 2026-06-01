import type { FontSizeName, UtopiaTypeConfig } from "./types";
import { calculateClamp, checkWCAG, range, roundValue } from "./utopia-clamp";

export interface UtopiaStep {
  step: number;
  minFontSize: number;
  maxFontSize: number;
  clamp: string;
  wcagViolation: { from: number; to: number } | null;
}

const calculateTypeSize = (config: UtopiaTypeConfig, viewport: number, step: number): number => {
  const scale = range(
    config.minWidth,
    config.maxWidth,
    config.minTypeScale,
    config.maxTypeScale,
    viewport,
  );
  const fontSize = range(
    config.minWidth,
    config.maxWidth,
    config.minFontSize,
    config.maxFontSize,
    viewport,
  );
  return fontSize * Math.pow(scale, step);
};

export const calculateTypeStep = (config: UtopiaTypeConfig, step: number): UtopiaStep => {
  const minFontSize = calculateTypeSize(config, config.minWidth, step);
  const maxFontSize = calculateTypeSize(config, config.maxWidth, step);
  const wcag = checkWCAG({
    min: minFontSize,
    max: maxFontSize,
    minWidth: config.minWidth,
    maxWidth: config.maxWidth,
  });
  return {
    step,
    minFontSize: roundValue(minFontSize),
    maxFontSize: roundValue(maxFontSize),
    clamp: calculateClamp({
      minSize: minFontSize,
      maxSize: maxFontSize,
      minWidth: config.minWidth,
      maxWidth: config.maxWidth,
      relativeTo: config.relativeTo,
    }),
    wcagViolation: wcag?.length ? { from: Math.round(wcag[0]), to: Math.round(wcag[1]) } : null,
  };
};

export function calculateTypeScale(config: UtopiaTypeConfig): UtopiaStep[] {
  const positive = Array.from({ length: config.positiveSteps })
    .map((_, i) => calculateTypeStep(config, i + 1))
    .reverse();
  const negative = Array.from({ length: config.negativeSteps }).map((_, i) =>
    calculateTypeStep(config, -1 * (i + 1)),
  );
  return [...positive, calculateTypeStep(config, 0), ...negative];
}

// Map font-size variable names to Utopia step indices.
// Defaults assume positiveSteps=8, negativeSteps=2.
export const FONT_SIZE_STEP_MAP: Record<FontSizeName, number> = {
  display: 8,
  h1: 7,
  h2: 6,
  h3: 5,
  h4: 4,
  h5: 3,
  h6: 2,
  xl: 2,
  lg: 1,
  md: 0,
  sm: -1,
  xs: -2,
  eyebrow: -2,
};

export const FONT_SIZE_NAMES: FontSizeName[] = [
  "display",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "xl",
  "lg",
  "md",
  "sm",
  "xs",
  "eyebrow",
];

export function fontSizeClampMap(config: UtopiaTypeConfig): Record<FontSizeName, string> {
  const out = {} as Record<FontSizeName, string>;
  for (const name of FONT_SIZE_NAMES) {
    const step = FONT_SIZE_STEP_MAP[name];
    const inRange = step >= -config.negativeSteps && step <= config.positiveSteps;
    if (!inRange) {
      out[name] = calculateTypeStep(config, step).clamp;
    } else {
      out[name] = calculateTypeStep(config, step).clamp;
    }
  }
  return out;
}
