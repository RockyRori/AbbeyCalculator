// src/i18n.ts
import type { Lang, VirtueKey, IngredientCategory } from "./types";

type Dict = Record<string, { en: string; zh: string }>;

export const dict: Dict = {
  appTitle: { en: "Beer Recipe Solver", zh: "啤酒配方求解器" },
  subtitle: {
    en: "Design a recipe matching your desired flavor, color, strength and foam.",
    zh: "根据你想要的风味、颜色、酒精度和泡沫感设计配方。",
  },
  language: { en: "Language", zh: "语言" },
  virtues: { en: "Virtues", zh: "指标设置" },
  ingredients: { en: "Ingredients", zh: "配料" },
  results: { en: "Results", zh: "配方结果" },
  required: { en: "Required", zh: "必选" },
  optional: { en: "Optional", zh: "可选" },
  solve: { en: "Solve recipe", zh: "生成配方" },
  noSolution: { en: "No solution found.", zh: "没有找到满足条件的配方。" },
  solutionFound: { en: "Solution found!", zh: "找到了配方：" },
};

export const virtueLabels: Record<VirtueKey, { en: string; zh: string }> = {
  flavor: { en: "Flavor", zh: "风味" },
  color: { en: "Color", zh: "颜色" },
  strength: { en: "Strength", zh: "酒精" },
  foam: { en: "Foam", zh: "泡沫" },
};

export const categoryLabels: Record<
  IngredientCategory,
  { en: string; zh: string }
> = {
  malt: { en: "Malts", zh: "麦芽" },
  yeast: { en: "Yeasts", zh: "酵母" },
  hop: { en: "Hops", zh: "酒花" },
  sugar: { en: "Sugar & Honey", zh: "糖与蜂蜜" },
  various: { en: "Various", zh: "其他" },
  spice: { en: "Spice", zh: "香料" },
  fruit: { en: "Fruit", zh: "水果" },
};

export function t(key: keyof typeof dict, lang: Lang): string {
  return dict[key][lang];
}
