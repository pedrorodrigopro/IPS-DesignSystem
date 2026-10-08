// Toggle — Figma nodes:
//   Field:   4473:102864 (Toggle input field)
//   Buttons: 1817:105580 (.Toggle button component set)
//
// Behaviour: radio-button semantics — once an option is selected it cannot be
// deselected. Can start with no selection (value = undefined / null).
//
// Button states (from .Toggle button component set 1817:105580):
//   Selected:         bg #0C1457, border #0C1457, text #FFFFFF body-selected
//   Unselected rest:  bg #FFFFFF,  border #CFDAF7, text #0D2976 body-unselected
//   Unselected hover: bg rgba(0,0,0,0.04), border #CFDAF7, text #0D2976
//   Unselected focus: bg #FFFFFF,  border #CFDAF7, text #0D2976,
//                     box-shadow 0 0 0 2px rgba(13,41,118,1)
//
// Button border / radius by position:
//   First:  radius 8px 0 0 8px, border 1px all sides
//   Middle: radius 0,            border 1px 1px 1px 0 (no left — avoids double)
//   Last:   radius 0 8px 8px 0, border 1px 1px 1px 0
//
// Button cell: padding 8px 16px, gap 8px, justify-content center
// Field layout: column, gap 4px — optional label (label-regular #0D2976) + buttons row
// Label: New/Label regular (12px 400 Mulish, #0D2976)
// Mandatory marker: 16×16 warning icon, red

import React, { useState } from "react";
import classNames from "classnames";
import { Icon } from "../icon/icon";
import css from "./toggle.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToggleOption = {
  value: string;
  label: string;
};

export type ToggleProps = {
  options: ToggleOption[];
  /** Currently selected value. Pass undefined for no selection. */
  value?: string;
  onChange?: (value: string) => void;
  /** Optional field label above the buttons */
  label?: string;
  /** Show mandatory asterisk/marker next to label */
  mandatory?: boolean;
  /** Disabled state — no interaction possible */
  disabled?: boolean;
  className?: string;
};

// ── Mandatory marker ──────────────────────────────────────────────────────────
// Same as Input component: Icon name="mandatory" size={16}, color --palette-red-0
// Figma node 12016:234944
const MandatoryMark = () => (
  <Icon name="mandatory" size={16} className={css.mandatoryIcon} aria-hidden="true" />
);

// ── Toggle ─────────────────────────────────────────────────────────────────────

export function Toggle({
  options,
  value,
  onChange,
  label,
  mandatory = false,
  disabled = false,
  className,
}: ToggleProps) {
  // Uncontrolled fallback
  const [internal, setInternal] = useState<string | undefined>(value);
  const isControlled = onChange !== undefined;
  const selected = isControlled ? value : internal;

  const handleSelect = (optValue: string) => {
    if (disabled) return;
    // Radio semantics: ignore click on already-selected option
    if (optValue === selected) return;
    if (!isControlled) setInternal(optValue);
    onChange?.(optValue);
  };

  const count = options.length;

  return (
    <div className={classNames(css.field, disabled && css.disabled, className)}>
      {/* ── Label row ──────────────────────────────────────────────── */}
      {label && (
        <div className={css.labelRow}>
          <span className={css.label}>{label}</span>
          {mandatory && <MandatoryMark />}
        </div>
      )}

      {/* ── Buttons row ────────────────────────────────────────────── */}
      <div
        className={css.buttons}
        role="group"
        aria-label={label}
      >
        {options.map((opt, i) => {
          const isSelected = opt.value === selected;
          const position =
            i === 0 ? "first" : i === count - 1 ? "last" : "middle";

          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              className={classNames(
                css.btn,
                css[position],
                isSelected ? css.selected : css.unselected
              )}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
