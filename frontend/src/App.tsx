// src/App.tsx
import React, { useState } from "react";
import type { Lang } from "./types";
import { defaultVirtues, initialIngredients } from "./data";
import { t } from "./i18n";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { VirtuesPanel } from "./components/VirtuesPanel";
import { IngredientsPanel } from "./components/IngredientsPanel";
import { ResultsPanel } from "./components/ResultsPanel";
import { SolverSettingsPanel } from "./components/SolverSettingsPanel";
import { StylePanel } from "./components/StylePanel";
import { stylePresets } from "./data";
import { applyVirtueRanges } from "./data";
import {
  solveRecipes,
  type RecipeSolution,
} from "./solver";
import "./styles.css";

const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>("zh");
  const [styleId, setStyleId] = useState<string>("__custom__");

  const [virtues, setVirtues] = useState(defaultVirtues);
  const [ingredients, setIngredients] = useState(initialIngredients);

  const [hasSolved, setHasSolved] = useState(false);
  const [solutions, setSolutions] = useState<RecipeSolution[]>([]);

  // 新增：搜索参数
  const [maxSolutions, setMaxSolutions] = useState<number>(3);
  const [maxIngredients, setMaxIngredients] = useState<number>(5);
  const [maxCountPerIngredient, setMaxCountPerIngredient] =
    useState<number>(8);

  const handleSolve = () => {
    const res = solveRecipes(ingredients, virtues, {
      maxSolutions,
      maxIngredients,
      maxCountPerIngredient,
    });
    setSolutions(res);
    setHasSolved(true);
  };

  return (
    <div className="app-root">
      <header>
        <div>
          <h1>{t("appTitle", lang)}</h1>
          <p>{t("subtitle", lang)}</p>
        </div>
        <LanguageSwitcher lang={lang} onChange={setLang} />
      </header>

      <main>
        <section className="left">

          <h2>{lang === "zh" ? "风格" : "Style"}</h2>
          <StylePanel
            lang={lang}
            styles={stylePresets}
            selectedStyleId={styleId}
            onChangeStyleId={(id) => {
              setStyleId(id);

              const preset = stylePresets.find((s) => s.id === id);
              if (!preset) return; // 选“自定义”不改当前状态

              // 1) 自动设置 4 个指标上下限
              setVirtues((cur) => applyVirtueRanges(cur, preset.virtues));

              // 2) 自动设置必选配料（仍保留下面手动改必选/可选的能力）
              const required = new Set(preset.requiredIngredientIds);
              setIngredients((cur) =>
                cur.map((ing) =>
                  required.has(ing.id)
                    ? { ...ing, required: true, enabled: true }
                    : { ...ing, required: false } // 风格切换时用预设覆盖必选
                )
              );
            }}
          />

          <h2>{t("virtues", lang)}</h2>
          <VirtuesPanel
            lang={lang}
            virtues={virtues}
            onChange={setVirtues}
          />

          <h2>{t("ingredients", lang)}</h2>
          <IngredientsPanel
            lang={lang}
            ingredients={ingredients}
            onChange={setIngredients}
          />

          {/* 新增的设置面板 */}
          <SolverSettingsPanel
            lang={lang}
            maxIngredients={maxIngredients}
            maxCountPerIngredient={maxCountPerIngredient}
            maxSolutions={maxSolutions}
            onChangeMaxIngredients={setMaxIngredients}
            onChangeMaxCountPerIngredient={setMaxCountPerIngredient}
            onChangeMaxSolutions={setMaxSolutions}
          />

          <button className="btn-solve" onClick={handleSolve}>
            {t("solve", lang)}
          </button>
        </section>

        <section className="right">
          <h2>{t("results", lang)}</h2>
          <ResultsPanel
            lang={lang}
            solutions={solutions}
            hasSolved={hasSolved}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
