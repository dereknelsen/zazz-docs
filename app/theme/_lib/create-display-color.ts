import chroma from "chroma-js";
import { isHex, round } from "./helpers";

export function hexToOklch(hex: string): string | null {
  if (!hex || !isHex(hex)) return null;
  const h = hex.startsWith("#") ? hex : `#${hex}`;
  const [L, C, H] = chroma(h).oklch();
  if (C < 0.001) {
    return `oklch(${round(L, 4)} 0 0)`;
  }
  const hPart = isNaN(H) ? "0" : `${round(H, 2)}`;
  return `oklch(${round(L, 3)} ${round(C, 3)} ${hPart})`;
}

export function hexToOklchTriple(hex: string): { l: number; c: number; h: number } | null {
  if (!hex || !isHex(hex)) return null;
  const h = hex.startsWith("#") ? hex : `#${hex}`;
  const [L, C, H] = chroma(h).oklch();
  return { l: round(L, 4), c: round(C, 4), h: isNaN(H) ? 0 : round(H, 2) };
}
