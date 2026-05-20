import chroma from "chroma-js";
import { Hsluv } from "hsluv";
import { isHex } from "./helpers";
import type { PaletteConfig, SwatchValue } from "./types";

const ALL_STOPS = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000];

export const VISIBLE_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function snapStop(n: number): number {
  const valid = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  let best = valid[0];
  let smallest = Math.abs(n - best);
  for (const v of valid) {
    const d = Math.abs(n - v);
    if (d < smallest) {
      smallest = d;
      best = v;
    }
  }
  return best;
}

export function createSwatches(palette: PaletteConfig): SwatchValue[] {
  const { value, colorMode, h, s, lMin, lMax } = palette;
  const valueStop = snapStop(palette.valueStop);

  // Bail out for partially-typed or otherwise invalid hex; caller can
  // re-render once user finishes typing.
  if (!value || !isHex(value)) return [];

  const baseColor = chroma(`#${value}`);
  const [baseH, baseS, baseL] = baseColor.hsl();
  const normalizedBaseH = isNaN(baseH) ? 0 : baseH;

  const valueStopIndex = ALL_STOPS.indexOf(valueStop);

  const hueScale = ALL_STOPS.map((stop, idx) => ({
    stop,
    tweak: h ? Math.abs(idx - valueStopIndex) * h : 0,
  }));

  const saturationScale = ALL_STOPS.map((stop, idx) => {
    const diff = Math.abs(idx - valueStopIndex);
    const tweak = s ? Math.round((diff + 1) * s * (1 + diff / 10)) : 0;
    return { stop, tweak: Math.min(tweak, 100) };
  });

  const hsluvBase = new Hsluv();
  hsluvBase.hex = `#${value}`;
  hsluvBase.hexToHsluv();
  const lightnessValue = colorMode === "linear" ? baseL * 100 : hsluvBase.hsluv_l;

  const anchors = [
    { stop: 0, tweak: lMax },
    { stop: valueStop, tweak: lightnessValue },
    { stop: 1000, tweak: lMin },
  ];

  const distributionScale = ALL_STOPS.map((stop) => {
    const anchor = anchors.find((a) => a.stop === stop);
    if (anchor) return anchor;
    const [left, right] = stop < valueStop ? [anchors[0], anchors[1]] : [anchors[1], anchors[2]];
    const ratio = (stop - left.stop) / (right.stop - left.stop);
    return { stop, tweak: Math.round(left.tweak + (right.tweak - left.tweak) * ratio) };
  });

  return ALL_STOPS.map((stop, idx) => {
    if (stop === valueStop) {
      const inputColor = chroma(`#${value.toUpperCase()}`);
      const [finalH, finalS, finalL] = inputColor.hsl();
      return {
        stop,
        hex: `#${value.toUpperCase()}`,
        h: isNaN(finalH) ? 0 : finalH,
        hScale: 0,
        s: isNaN(finalS) ? 0 : finalS * 100,
        sScale: (isNaN(finalS) ? 0 : finalS * 100) - 50,
        l: isNaN(finalL) ? 0 : finalL * 100,
      };
    }

    const hTweak = hueScale[idx].tweak;
    const sTweak = saturationScale[idx].tweak;
    const lTweak = distributionScale[idx].tweak;

    let newColor: chroma.Color;

    if (colorMode === "linear") {
      const newH = (normalizedBaseH + hTweak) % 360;
      const newS = Math.max(0, Math.min(100, baseS * 100 + sTweak));
      const newL = Math.max(0, Math.min(100, lTweak));
      newColor = chroma.hsl(newH, newS / 100, newL / 100);
    } else {
      const hsluv = new Hsluv();
      hsluv.hex = `#${value}`;
      hsluv.hexToHsluv();
      const normalizedHsluvH = isNaN(hsluv.hsluv_h) ? 0 : hsluv.hsluv_h;
      hsluv.hsluv_h = (normalizedHsluvH + hTweak) % 360;
      hsluv.hsluv_s = Math.max(0, Math.min(100, hsluv.hsluv_s + sTweak));
      hsluv.hsluv_l = Math.max(0, Math.min(100, lTweak));
      hsluv.hsluvToHex();
      newColor = chroma(hsluv.hex);
    }

    const [finalH, finalS, finalL] = newColor.hsl();
    return {
      stop,
      hex: newColor.hex().toUpperCase(),
      h: isNaN(finalH) ? 0 : finalH,
      hScale: ((((hTweak + 180) % 360) - 180) / 180) * 50,
      s: isNaN(finalS) ? 0 : finalS * 100,
      sScale: (isNaN(finalS) ? 0 : finalS * 100) - 50,
      l: isNaN(finalL) ? 0 : finalL * 100,
    };
  });
}

export function visibleSwatches(palette: PaletteConfig): SwatchValue[] {
  return createSwatches(palette).filter((sw) => sw.stop !== 0 && sw.stop !== 1000);
}
