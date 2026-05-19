export function round(value: number, precision: number = 0): number {
  const m = Math.pow(10, precision);
  return Math.round(value * m) / m;
}

export function clamp(x: number, min: number, max: number): number {
  return Math.min(Math.max(x, min), max);
}

export function isHex(value: string): boolean {
  const v = value.length === 6 && !value.startsWith("#") ? `#${value}` : value;
  return /^#[0-9A-F]{6}$/i.test(v);
}

export function normalizeHex(value: string): string {
  return value.replace(/^#/, "").toUpperCase();
}
