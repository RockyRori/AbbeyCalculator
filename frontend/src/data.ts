import type { Ingredient, StylePreset, VirtueTarget, VirtueKey } from "./types";

import defaultVirtuesJson from "./data/defaultVirtues.json";
import ingredientsJson from "./data/ingredients.json";
import stylesJson from "./data/styles.json";

export const defaultVirtues: VirtueTarget[] = defaultVirtuesJson as VirtueTarget[];
export const initialIngredients: Ingredient[] = ingredientsJson as Ingredient[];
export const stylePresets: StylePreset[] = stylesJson as StylePreset[];

export function rangeToSliderValue(min: number, max: number): number {
  if (min === 0 && max === 110) return 0; // 你之前定义的“0=不限”
  return Math.max(0, Math.min(110, Math.round(min)));
}

export function applyVirtueRanges(
  current: VirtueTarget[],
  ranges: Record<VirtueKey, { min: number; max: number }>
): VirtueTarget[] {
  return current.map((v) => {
    const r = ranges[v.key];
    if (!r) return v;
    return { ...v, min: r.min, max: r.max, value: rangeToSliderValue(r.min, r.max) };
  });
}
