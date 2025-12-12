import React from "react";
import type { Lang, StylePreset } from "../types";
import { t } from "../i18n";

interface Props {
  lang: Lang;
  styles: StylePreset[];
  selectedStyleId: string;
  onChangeStyleId(id: string): void;
}

export const StylePanel: React.FC<Props> = ({
  lang,
  styles,
  selectedStyleId,
  onChangeStyleId,
}) => {
  return (
    <div className="panel panel-style">
      <div className="style-row">
        <label className="style-label">{t("style", lang)}:</label>
        <select value={selectedStyleId} onChange={(e) => onChangeStyleId(e.target.value)}>
          <option value="__custom__">{t("custom", lang)}</option>
          {styles.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name[lang]}
            </option>
          ))}
        </select>
      </div>

      <div className="style-hint">
        {lang === "zh"
          ? "选择风格会自动设置指标上下限与必选配料；你仍可以在下方手动调整必选/可选。"
          : "Selecting a style auto-fills virtue ranges and required ingredients; you can still override required/optional below."}
      </div>
    </div>
  );
};
