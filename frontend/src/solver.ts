// src/solver.ts
import type { Ingredient, VirtueKey, VirtueTarget } from "./types";

export interface RecipeSolution {
  ingredients: { ingredient: Ingredient; count: number }[];
  totals: Record<VirtueKey, number>; // 已裁剪到 0–110
}

export interface SolveOptions {
  maxSolutions?: number;
  maxIngredients?: number;
  maxCountPerIngredient?: number;
}

const VIRTUE_KEYS: VirtueKey[] = ["flavor", "color", "strength", "foam"];

export function solveRecipes(
  ingredients: Ingredient[],
  targets: VirtueTarget[],
  options: SolveOptions = {}
): RecipeSolution[] {
  const {
    maxSolutions = 3,
    maxIngredients = 5,
    maxCountPerIngredient = 8,
  } = options;

  const enabled = ingredients.filter((i) => i.enabled);
  if (enabled.length === 0) return [];

  // 限制参与搜索的配料种类数
  const arr =
    enabled.length > maxIngredients
      ? enabled.slice(0, maxIngredients)
      : enabled;

  // 目标区间
  const minBound: Record<VirtueKey, number> = {
    flavor: 0,
    color: 0,
    strength: 0,
    foam: 0,
  };
  const maxBound: Record<VirtueKey, number> = {
    flavor: 110,
    color: 110,
    strength: 110,
    foam: 110,
  };

  for (const t of targets) {
    minBound[t.key] = t.min;
    maxBound[t.key] = t.max;
  }

  // 原始和（允许负数 / 超 110）
  const sums: Record<VirtueKey, number> = {
    flavor: 0,
    color: 0,
    strength: 0,
    foam: 0,
  };

  const counts = new Array<number>(arr.length).fill(0);
  const solutions: RecipeSolution[] = [];

  function dfs(idx: number) {
    if (solutions.length >= maxSolutions) return;

    if (idx === arr.length) {
      // 计算裁剪后的 totals
      const clamped: Record<VirtueKey, number> = {
        flavor: 0,
        color: 0,
        strength: 0,
        foam: 0,
      };

      for (const k of VIRTUE_KEYS) {
        let v = sums[k];
        if (v < 0) v = 0;
        else if (v > 110) v = 110;
        clamped[k] = v;
      }

      // 检查是否在 [min, max] 区间内
      for (const k of VIRTUE_KEYS) {
        const v = clamped[k];
        if (v < minBound[k] || v > maxBound[k]) return;
      }

      // 至少有一个配料
      let any = false;
      for (let i = 0; i < counts.length; i++) {
        if (counts[i] > 0) {
          any = true;
          break;
        }
      }
      if (!any) return;

      const picked: { ingredient: Ingredient; count: number }[] = [];
      for (let i = 0; i < arr.length; i++) {
        if (counts[i] > 0) {
          picked.push({ ingredient: arr[i], count: counts[i] });
        }
      }

      solutions.push({ ingredients: picked, totals: clamped });
      return;
    }

    const ing = arr[idx];

    const base: Record<VirtueKey, number> = {
      flavor: sums.flavor,
      color: sums.color,
      strength: sums.strength,
      foam: sums.foam,
    };

    const minCount = ing.required ? 1 : 0;

    for (let c = minCount; c <= maxCountPerIngredient; c++) {
      for (const k of VIRTUE_KEYS) {
        const delta = (ing.virtues[k] ?? 0) * 10;
        sums[k] = base[k] + c * delta;
      }

      counts[idx] = c;
      dfs(idx + 1);
      if (solutions.length >= maxSolutions) break;
    }

    counts[idx] = 0;
    for (const k of VIRTUE_KEYS) {
      sums[k] = base[k];
    }
  }

  dfs(0);
  return solutions;
}
