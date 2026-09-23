// Radiobutton — Figma node 1635:27857
//
// Circle: 24×24px, radius 16px (full pill)
//   Unselected default: white fill, #CFDAF7 border (--palette-neutral-0)
//   Unselected hover:   rgba(0,0,0,0.04) fill, #5C6E9E border
//   Selected default:   white fill, #CFDAF7 border, inner dot #0C1457 (12×12px)
//   Selected hover:     rgba(0,0,0,0.04) fill, #5C6E9E border, inner dot #1531B8
//   Focus:              double ring 0 0 0 4px #0C1457, 0 0 0 2px white
//   Disabled:           opacity 0.5
//
// Layouts:
//   Horizontal: row, gap 8px, padding 4px 0 — circle left, label right
//   Vertical:   column, gap 8px             — label above, circle below
//
// Label: body-regular (14px/400/150%), #0D2976
// Subtext: label-regular (12px/400/150%), #5C6E9E
import classNames from "classnames";
import { useId } from "react";
import css from "./radio.module.scss";

export type RadioLayout = "horizontal" | "vertical";

export type RadioProps = {
  label?: string;
  subLabel?: string;
  checked?: boolean;
  disabled?: boolean;
  layout?: RadioLayout;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
};

export const Radio = ({
  label,
  subLabel,
  checked = false,
  disabled = false,
  layout = "horizontal",
  name,
  value,
  onChange,
  className,
  id: idProp,
}: RadioProps) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <label
      htmlFor={id}
      className={classNames(
        css.radio,
        css[layout],
        { [css.disabled]: disabled },
        className
      )}
    >
      {/* Vertical: label above circle */}
      {layout === "vertical" && label && (
        <span className={css.labelWrapper}>
          <span className={css.label}>{label}</span>
        </span>
      )}

      {/* Hidden native input */}
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => value !== undefined && onChange?.(value)}
        className={css.input}
      />

      {/* Visual circle */}
      <span className={classNames(css.circle, { [css.checked]: checked })} aria-hidden="true">
        {checked && <span className={css.dot} />}
      </span>

      {/* Horizontal: label right of circle */}
      {layout === "horizontal" && label && (
        <span className={css.labelWrapper}>
          <span className={css.label}>{label}</span>
          {subLabel && <span className={css.subLabel}>{subLabel}</span>}
        </span>
      )}
    </label>
  );
};

// ── RadioGroup — convenience wrapper for a group of radios ───────────────────

export type RadioOption = {
  value: string;
  label: string;
  subLabel?: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  layout?: RadioLayout;
  groupLayout?: "row" | "column";
  disabled?: boolean;
  className?: string;
};

export const RadioGroup = ({
  options,
  value,
  onChange,
  name,
  layout = "horizontal",
  groupLayout = "column",
  disabled = false,
  className,
}: RadioGroupProps) => (
  <div
    className={classNames(css.group, css[`group_${groupLayout}`], className)}
    role="radiogroup"
  >
    {options.map((opt) => (
      <Radio
        key={opt.value}
        label={opt.label}
        subLabel={opt.subLabel}
        checked={value === opt.value}
        disabled={disabled || opt.disabled}
        layout={layout}
        name={name}
        value={opt.value}
        onChange={onChange}
      />
    ))}
  </div>
);
