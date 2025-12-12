import React from "react";
import type { Lang, VirtueTarget, VirtueKey } from "../types";
import { virtueLabels } from "../i18n";

interface Props {
  lang: Lang;
  virtues: VirtueTarget[];
  onChange(next: VirtueTarget[]): void;
}

export const VirtuesPanel: React.FC<Props> = ({
  lang,
  virtues,
  onChange,
}) => {
  const updateRangeFromSlider = (key: VirtueKey, rawValue: number) => {
    let min: number;
    let max: number;

    if (rawValue === 0) {
      // 特殊规则：0 = 不限范围
      min = 0;
      max = 100;
    } else {
      const base = Math.floor(rawValue / 10) * 10; // 34 -> 30
      min = base;
      max = base + 10; // 30-40
    }

    const next = virtues.map((v) =>
      v.key === key ? { ...v, value: rawValue, min, max } : v
    );
    onChange(next);
  };

  const updateField = (
    key: VirtueKey,
    field: keyof VirtueTarget,
    value: number
  ) => {
    const next = virtues.map((v) =>
      v.key === key ? { ...v, [field]: value } : v
    );
    onChange(next);
  };

  return (
    <div className="panel panel-virtues">
      {virtues.map((v) => (
        <div key={v.key} className="virtue-row">
          <div className="virtue-label">
            {virtueLabels[v.key][lang]} ({Math.round(v.value)})
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={v.value}
            onChange={(e) =>
              updateRangeFromSlider(
                v.key,
                Number.parseInt(e.target.value, 10)
              )
            }
          />
          <div className="bounds">
            <label>
              min:
              <input
                type="number"
                value={v.min}
                step={10}
                onChange={(e) =>
                  updateField(v.key, "min", Number(e.target.value) || 0)
                }
              />
            </label>
            <label>
              max:
              <input
                type="number"
                value={v.max}
                step={10}
                onChange={(e) =>
                  updateField(v.key, "max", Number(e.target.value) || 0)
                }
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};
