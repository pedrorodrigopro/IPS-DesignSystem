import classNames from "classnames";
import css from "./switch.module.scss";

export type SwitchProps = {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
};

export const Switch = ({
  label,
  checked = false,
  disabled = false,
  onChange,
  className,
  id,
}: SwitchProps) => (
  <label className={classNames(css.switch, { [css.disabled]: disabled }, className)}>
    <input
      type="checkbox"
      role="switch"
      id={id}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      className={css.input}
    />
    <span className={classNames(css.track, { [css.on]: checked })} aria-hidden="true">
      <span className={css.knob} />
    </span>
    {label && <span className={css.label}>{label}</span>}
  </label>
);
