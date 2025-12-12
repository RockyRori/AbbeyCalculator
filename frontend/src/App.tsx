// src/App.tsx
import React, { useState } from "react";
import type { Lang } from "./types";
import { defaultVirtues, initialIngredients } from "./data";
import { t } from "./i18n";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { VirtuesPanel } from "./components/VirtuesPanel";
import { IngredientsPanel } from "./components/IngredientsPanel";
import { ResultsPanel } from "./components/ResultsPanel";
import {
  solveRecipes,
  type RecipeSolution,
} from "./solver";
import { SolverSettingsPanel } from "./components/SolverSettingsPanel";
import "./styles.css";

const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>("zh");
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
