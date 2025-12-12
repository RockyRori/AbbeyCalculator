import React from "react";
import type { Lang, VirtueKey } from "../types";
import { t, virtueLabels } from "../i18n";
import type { RecipeSolution } from "../solver";

interface Props {
  lang: Lang;
  solutions: RecipeSolution[];
  hasSolved: boolean;
}

const VIRTUE_KEYS: VirtueKey[] = [
  "flavor",
  "color",
  "strength",
  "foam",
];

export const ResultsPanel: React.FC<Props> = ({
  lang,
  solutions,
  hasSolved,
}) => {
  if (!hasSolved) {
    return (
      <div className="panel panel-results">
        <p>{lang === "zh" ? "点击下方按钮生成配方。" : "Click the button to solve a recipe."}</p>
      </div>
    );
  }

  if (solutions.length === 0) {
    return (
      <div className="panel panel-results">
        <p>{t("noSolution", lang)}</p>
      </div>
    );
  }

  return (
    <div className="panel panel-results">
      <p>{t("solutionFound", lang)}</p>

      {solutions.map((sol, idx) => (
        <div key={idx} className="recipe-block">
          <h3>
            {lang === "zh"
              ? `配方 ${idx + 1}`
              : `Recipe ${idx + 1}`}
          </h3>

          <div className="result-virtues">
            {VIRTUE_KEYS.map((k) => (
              <div key={k} className="virtue-score">
                <strong>{virtueLabels[k][lang]}:</strong>{" "}
                {sol.totals[k]}
              </div>
            ))}
          </div>

          <h4>{lang === "zh" ? "选中的配料" : "Selected ingredients"}</h4>
          <ul>
            {sol.ingredients.map((item) => (
              <li key={item.ingredient.id}>
                {item.ingredient.name[lang]} × {item.count}{" "}
                {item.ingredient.required && (
                  <span className="tag-required">
                    {lang === "zh" ? "必选" : "required"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
