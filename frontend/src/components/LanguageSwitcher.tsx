// src/components/LanguageSwitcher.tsx
import React from "react";
import type { Lang } from "../types";
import { t } from "../i18n";

interface Props {
  lang: Lang;
  onChange(lang: Lang): void;
}

export const LanguageSwitcher: React.FC<Props> = ({ lang, onChange }) => {
  return (
    <div className="lang-switcher">
      <span>{t("language", lang)}:</span>
      <button
        className={lang === "zh" ? "active" : ""}
        onClick={() => onChange("zh")}
      >
        中文
      </button>
      <button
        className={lang === "en" ? "active" : ""}
        onClick={() => onChange("en")}
      >
        English
      </button>
    </div>
  );
};
