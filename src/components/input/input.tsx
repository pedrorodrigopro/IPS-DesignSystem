import classNames from "classnames";
import css from "./input.module.scss";

export type InputState = "default" | "error" | "warning" | "instructions";

export type InputProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  message?: string;
  state?: InputState;
  readOnly?: boolean;
  disabled?: boolean;
  mandatory?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
};

export const Input = ({
  label,
  value,
  placeholder,
  message,
  state = "default",
  readOnly = false,
  disabled = false,
  mandatory = false,
  onChange,
  onBlur,
  className,
  id,
  type = "text",
}: InputProps) => (
  <div className={classNames(css.field, className)}>
    {label && (
      <label className={css.label} htmlFor={id}>
        {label}
        {mandatory && <span className={css.mandatory} aria-hidden="true"> *</span>}
      </label>
    )}
    <div className={classNames(css.inputWrapper, css[state], { [css.readOnly]: readOnly, [css.disabled]: disabled })}>
      <input
        id={id}
        type={type}
        className={css.input}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
    {message && (
      <span className={classNames(css.message, css[`message_${state}`])}>{message}</span>
    )}
  </div>
);
