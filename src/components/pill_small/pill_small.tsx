import classNames from "classnames";
import css from "./pill_small.module.scss";

export type PillSmallType =
  | "role-new"
  | "pending"
  | "in-review"
  | "invited"
  | "shortlisting"
  | "partially-filled"
  | "not-filled"
  | "partially-booked"
  | "booked"
  | "partially-confirmed"
  | "confirmed"
  | "filled"
  | "exceptions"
  | "filter"
  | "input"
  | "custom-field";

export type PillSmallProps = {
  label: string;
  type?: PillSmallType;
  onRemove?: () => void;
  className?: string;
};

export const PillSmall = ({ label, type = "role-new", onRemove, className }: PillSmallProps) => {
  const removable = onRemove !== undefined;

  return (
    <span className={classNames(css.pill, css[type.replace(/-/g, "_")], { [css.removable]: removable }, className)}>
      {removable && (
        <button className={css.removeBtn} onClick={onRemove} aria-label={`Remove ${label}`} type="button">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
      <span className={css.label}>{label}</span>
    </span>
  );
};
