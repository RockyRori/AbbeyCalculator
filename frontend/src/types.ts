// src/types.ts

export type Lang = "en" | "zh";

export type VirtueKey = "flavor" | "color" | "strength" | "foam";

export interface VirtueTarget {
  key: VirtueKey;
  value: number;   // 0-100
  min: number;     // lower bound
  max: number;     // upper bound
}

export type IngredientCategory =
  | "malt"
  | "yeast"
  | "hop"
  | "sugar"
  | "various"
  | "spice"
  | "fruit";

export interface LocalizedName {
  en: string;
  zh: string;
}

export interface Ingredient {
  id: string;
  category: IngredientCategory;
  name: LocalizedName;
  description?: LocalizedName;
  virtues: Record<VirtueKey, number>; // -5 ~ +5 之类的加成
  cost: number;
  required: boolean;
  enabled: boolean;
}
