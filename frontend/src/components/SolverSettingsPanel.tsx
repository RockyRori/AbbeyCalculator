// src/components/SolverSettingsPanel.tsx
import React from "react";
import type { Lang } from "../types";

interface Props {
  lang: Lang;
  maxIngredients: number;
  maxCountPerIngredient: number;
  maxSolutions: number;
  onChangeMaxIngredients(value: number): void;
  onChangeMaxCountPerIngredient(value: number): void;
  onChangeMaxSolutions(value: number): void;
}

export const SolverSettingsPanel: React.FC<Props> = ({
  lang,
  maxIngredients,
  maxCountPerIngredient,
  maxSolutions,
  onChangeMaxIngredients,
  onChangeMaxCountPerIngredient,
  onChangeMaxSolutions,
}) => {
  return (
    <div className="panel panel-settings">
      <h2>{lang === "zh" ? "搜索设置" : "Search settings"}</h2>


      <div className="settings-row">
        <label>
          {lang === "zh"
            ? "最多生成的配方数量"
            : "Max number of recipes"}
          :
          <input
            type="number"
            min={1}
            max={10}
            step={1}
            value={maxSolutions}
            onChange={(e) =>
              onChangeMaxSolutions(
                Math.max(1, Number(e.target.value) || 1)
              )
            }
          />
        </label>
      </div>

      <div className="settings-row">
        <label>
          {lang === "zh"
            ? "最多参与搜索的配料种类数"
            : "Max ingredients in search"}
          :
          <input
            type="number"
            min={1}
            max={10}
            step={1}
            value={maxIngredients}
            onChange={(e) =>
              onChangeMaxIngredients(
                Math.max(1, Number(e.target.value) || 1)
              )
            }
          />
        </label>
      </div>

      <div className="settings-row">
        <label>
          {lang === "zh"
            ? "单个配料最大数量"
            : "Max count per ingredient"}
          :
          <input
            type="number"
            min={1}
            max={10}
            step={1}
            value={maxCountPerIngredient}
            onChange={(e) =>
              onChangeMaxCountPerIngredient(
                Math.max(1, Number(e.target.value) || 1)
              )
            }
          />
        </label>
      </div>

      <p className="settings-hint">
        {lang === "zh"
          ? "提示：配料种类数、最大数量和配方数量越大，搜索越慢，但越不容易出现“没有找到配方”。"
          : "Hint: larger limits and more recipes may slow search down, but reduce 'no solution' cases."}
      </p>

    </div>
  );
};
