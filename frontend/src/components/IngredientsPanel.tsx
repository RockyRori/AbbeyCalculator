// src/components/IngredientsPanel.tsx
import React from "react";
import type { Ingredient, Lang } from "../types";
import { categoryLabels } from "../i18n";

interface Props {
  lang: Lang;
  ingredients: Ingredient[];
  onChange(next: Ingredient[]): void;
}

export const IngredientsPanel: React.FC<Props> = ({
  lang,
  ingredients,
  onChange,
}) => {
  const toggleEnabled = (id: string) => {
    const next = ingredients.map((ing) =>
      ing.id === id ? { ...ing, enabled: !ing.enabled } : ing
    );
    onChange(next);
  };

  const toggleRequired = (id: string) => {
    const next = ingredients.map((ing) =>
      ing.id === id ? { ...ing, required: !ing.required, enabled: true } : ing
    );
    onChange(next);
  };

  const groups = new Map<string, Ingredient[]>();
  for (const ing of ingredients) {
    const arr = groups.get(ing.category) ?? [];
    arr.push(ing);
    groups.set(ing.category, arr);
  }

  return (
    <div className="panel panel-ingredients">
      {Array.from(groups.entries()).map(([cat, items]) => (
        <div key={cat} className="ingredient-category">
          <h3>{categoryLabels[cat as any][lang]}</h3>
          <ul>
            {items.map((ing) => (
              <li key={ing.id} className={ing.enabled ? "" : "disabled"}>
                <div className="ingredient-main">
                  <label>
                    <input
                      type="checkbox"
                      checked={ing.enabled}
                      onChange={() => toggleEnabled(ing.id)}
                    />
                    <span className="ingredient-name">
                      {ing.name[lang]}{" "}
                      {ing.required && (
                        <span className="tag-required">
                          {lang === "zh" ? "必选" : "required"}
                        </span>
                      )}
                    </span>
                  </label>
                  <button
                    className="btn-small"
                    onClick={() => toggleRequired(ing.id)}
                  >
                    {ing.required
                      ? lang === "zh"
                        ? "改为可选"
                        : "Make optional"
                      : lang === "zh"
                      ? "设为必选"
                      : "Make required"}
                  </button>
                </div>
                {ing.description && (
                  <div className="ingredient-desc">
                    {ing.description[lang]}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
