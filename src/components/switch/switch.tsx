// Switch — Figma node 1635:27830 (Switch component set)
//
// Knob track: 43.2×24px, border-radius 16px (pill shape)
// Indicator handle: 19.2×19.2px white circle, 2.4px from active edge
//   Off: track bg #CFDAF7, handle left, cross icon right side of track
//   On:  track bg #0C1457, handle right, check icon left side of track
//   Off hover: track bg #D5D5D5
//   On hover:  track bg #1531B8
//   Focus: box-shadow 0 0 0 2px white, 0 0 0 4px #0C1457 (double ring)
//
// Track icons (in background, NOT on the handle):
//   Off: cross SVG — right side, #0D2976, 11×11px
//   On:  check SVG — left side,  white,    11×11px
//   Both are absolutely positioned in the track, hidden by the handle
//
// Types:
//   vertical         — column, gap 8px: label above, switch below
//   horizontal-left  — row, gap 8px, padding 4px 8px 4px 0: switch left, label right
//   mobile-full      — row, justify-between, width fill: label left, switch right
//
// Label: body-regular 14px 400 #0D2976 (optional)

import React, { useId } from "react";
import classNames from "classnames";
import css from "./switch.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SwitchLayout = "vertical" | "horizontal-left" | "mobile-full";

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  showLabel?: boolean;
  layout?: SwitchLayout;
  disabled?: boolean;
  id?: string;
  className?: string;
};

// ── Track icons ───────────────────────────────────────────────────────────────
// Inline SVGs so colour is fully controlled via CSS

// Check mark — shown on left side when ON
const CheckIcon = () => (
  <svg
    width="11" height="9"
    viewBox="0 0 11 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={css.trackIconCheck}
  >
    <path
      d="M1 4L4 7.5L10 1"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Cross — shown on right side when OFF
const CrossIcon = () => (
  <svg
    width="9" height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={css.trackIconCross}
  >
    <path
      d="M1 1L8 8M8 1L1 8"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

// ── Switch ────────────────────────────────────────────────────────────────────

export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  label,
  showLabel = true,
  layout = "horizontal-left",
  disabled = false,
  id: providedId,
  className,
}: SwitchProps) {
  const autoId = useId();
  const id = providedId ?? autoId;

  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const knob = (
    <span
      className={classNames(
        css.knobWrapper,
        isChecked && css.on,
        disabled && css.knobDisabled
      )}
    >
      {/* Track icon — check (left, visible when on) */}
      <span className={css.trackIconLeft} aria-hidden="true">
        <CheckIcon />
      </span>
      {/* Track icon — cross (right, visible when off) */}
      <span className={css.trackIconRight} aria-hidden="true">
        <CrossIcon />
      </span>
      {/* Sliding handle */}
      <span className={css.indicator} />
      {/* Native input for a11y + interaction */}
      <input
        type="checkbox"
        role="switch"
        id={id}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className={css.input}
        aria-checked={isChecked}
        aria-label={label}
      />
    </span>
  );

  const labelEl = showLabel && label ? (
    <label
      htmlFor={id}
      className={classNames(css.label, disabled && css.labelDisabled)}
    >
      {label}
    </label>
  ) : null;

  return (
    <div
      className={classNames(
        css.switch,
        css[layout.replace(/-/g, "_")],
        disabled && css.disabled,
        className
      )}
    >
      {layout === "horizontal-left" ? (
        <>{knob}{labelEl}</>
      ) : layout === "mobile-full" ? (
        <>{labelEl}{knob}</>
      ) : (
        // vertical
        <>{labelEl}{knob}</>
      )}
    </div>
  );
}
