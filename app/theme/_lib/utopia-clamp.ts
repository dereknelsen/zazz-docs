export type RelativeTo = "viewport" | "container" | "viewport-width";

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
const clampN = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x: number, y: number, a: number) => clampN((a - x) / (y - x));
export const range = (x1: number, y1: number, x2: number, y2: number, a: number) =>
  lerp(x2, y2, invlerp(x1, y1, a));
export const roundValue = (n: number) => Math.round((n + Number.EPSILON) * 10000) / 10000;

interface ClampInput {
  minWidth: number;
  maxWidth: number;
  minSize: number;
  maxSize: number;
  usePx?: boolean;
  relativeTo?: RelativeTo;
}

export function calculateClamp({
  maxSize,
  minSize,
  minWidth,
  maxWidth,
  usePx = false,
  relativeTo = "viewport-width",
}: ClampInput): string {
  const isNegative = minSize > maxSize;
  const min = isNegative ? maxSize : minSize;
  const max = isNegative ? minSize : maxSize;

  const divider = usePx ? 1 : 16;
  const unit = usePx ? "px" : "rem";
  const relativeUnits: Record<RelativeTo, string> = {
    viewport: "vi",
    "viewport-width": "vw",
    container: "cqi",
  };
  const relativeUnit = relativeUnits[relativeTo];

  const slope = (maxSize / divider - minSize / divider) / (maxWidth / divider - minWidth / divider);
  const intersection = (-1 * (minWidth / divider)) * slope + minSize / divider;
  return `clamp(${roundValue(min / divider)}${unit}, ${roundValue(intersection)}${unit} + ${roundValue(
    slope * 100,
  )}${relativeUnit}, ${roundValue(max / divider)}${unit})`;
}

interface WcagInput {
  min: number;
  max: number;
  minWidth: number;
  maxWidth: number;
}

export function checkWCAG({ min, max, minWidth, maxWidth }: WcagInput): number[] | null {
  if (minWidth > maxWidth) {
    [minWidth, maxWidth] = [maxWidth, minWidth];
    [min, max] = [max, min];
  }
  const slope = (max - min) / (maxWidth - minWidth);
  const intercept = min - minWidth * slope;
  const lh = (5 * min - 2 * intercept) / (2 * slope);
  const rh = (5 * intercept - 2 * max) / (-1 * slope);
  const lh2 = (3 * intercept) / slope;

  let failRange: number[] | null = [];
  if (maxWidth < 5 * minWidth) {
    if (minWidth < lh && lh < maxWidth) failRange.push(Math.max(lh, minWidth), maxWidth);
    if (5 * min < 2 * max) failRange.push(maxWidth, 5 * minWidth);
    if (5 * minWidth < rh && rh < 5 * maxWidth) failRange.push(5 * minWidth, Math.min(rh, 5 * maxWidth));
  } else {
    if (minWidth < lh && lh < 5 * minWidth) failRange.push(Math.max(lh, minWidth), 5 * minWidth);
    if (5 * minWidth < lh2 && lh2 < maxWidth) failRange.push(Math.max(lh2, 5 * minWidth), maxWidth);
    if (maxWidth < rh && rh < 5 * maxWidth) failRange.push(maxWidth, Math.min(rh, 5 * maxWidth));
  }

  if (failRange.length) {
    failRange = [failRange[0], failRange[failRange.length - 1]];
    if (Math.abs(failRange[1] - failRange[0]) < 0.1) failRange = null;
  } else {
    failRange = null;
  }

  return failRange;
}
