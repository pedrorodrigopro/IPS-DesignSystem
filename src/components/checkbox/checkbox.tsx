// Checkbox — Figma node 1635:27838
// Box: 24×24px, radius 6px
// Default: white fill, #CFDAF7 border (--palette-neutral-0)
// Hover: rgba(0,0,0,0.04) bg, darker border
// Focus: double ring
// Selected: #0C1457 fill (--palette-blue-1), white icon
// Indeterminate: #0C1457 fill, white minus
// Disabled: opacity 0.5
// Layouts: horizontal (box left, label right) | vertical (label above, box below)
import classNames from "classnames";
import { useRef } from "react";
import css from "./checkbox.module.scss";

export type CheckboxLayout = "horizontal" | "vertical";

export type CheckboxProps = {
  label?: string;
  subLabel?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  layout?: CheckboxLayout;
  onChange?: (checked: boolean) => void;
  className?: string;
  id?: string;
};

// White checkmark SVG
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// White minus SVG (indeterminate)
const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7H11" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

export const Checkbox = ({
  label,
  subLabel,
  checked = false,
  indeterminate = false,
  disabled = false,
  layout = "horizontal",
  onChange,
  className,
  id,
}: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync indeterminate state (not a standard HTML attribute)
  const setInputRef = (el: HTMLInputElement | null) => {
    if (el) { el.indeterminate = indeterminate; }
    (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
  };

  const isSelected = checked || indeterminate;

  return (
    <label
      className={classNames(
        css.checkbox,
        css[layout],
        { [css.disabled]: disabled },
        className
      )}
    >
      <input
        ref={setInputRef}
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className={css.input}
        aria-checked={indeterminate ? "mixed" : checked}
      />
      <span
        className={classNames(css.box, {
          [css.selected]: isSelected,
        })}
        aria-hidden="true"
      >
        {checked && !indeterminate && <CheckIcon />}
        {indeterminate && <MinusIcon />}
      </span>
      {label && (
        <span className={css.labelWrapper}>
          <span className={css.label}>{label}</span>
          {subLabel && <span className={css.subLabel}>{subLabel}</span>}
        </span>
      )}
    </label>
  );
};
