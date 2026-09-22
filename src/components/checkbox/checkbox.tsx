import classNames from "classnames";
import css from "./checkbox.module.scss";

export type CheckboxState = "default" | "selected" | "indeterminate";

export type CheckboxProps = {
  label?: string;
  subLabel?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  layout?: "horizontal" | "vertical";
};

export const Checkbox = ({
  label,
  subLabel,
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  className,
  id,
  layout = "horizontal",
}: CheckboxProps) => (
  <label
    className={classNames(
      css.checkbox,
      css[layout],
      { [css.disabled]: disabled },
      className
    )}
  >
    <input
      type="checkbox"
      id={id}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      className={css.input}
      ref={(el) => {
        if (el) { el.indeterminate = indeterminate; }
      }}
    />
    <span
      className={classNames(css.box, {
        [css.checked]: checked,
        [css.indeterminate]: indeterminate,
      })}
      aria-hidden="true"
    >
      {checked && !indeterminate && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {indeterminate && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7H11" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </span>
    {label && (
      <span className={css.labelWrapper}>
        <span className={css.label}>{label}</span>
        {subLabel && <span className={css.subLabel}>{subLabel}</span>}
      </span>
    )}
  </label>
);
