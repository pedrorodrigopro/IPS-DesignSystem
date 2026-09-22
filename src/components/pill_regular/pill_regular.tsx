import classNames from "classnames";
import css from "./pill_regular.module.scss";

export type PillRegularType =
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

export type PillRegularProps = {
  label: string;
  type?: PillRegularType;
  onRemove?: () => void;
  className?: string;
};

export const PillRegular = ({ label, type = "role-new", onRemove, className }: PillRegularProps) => {
  const removable = onRemove !== undefined;

  return (
    <span className={classNames(css.pill, css[type.replace(/-/g, "_")], { [css.removable]: removable }, className)}>
      {removable && (
        <button className={css.removeBtn} onClick={onRemove} aria-label={`Remove ${label}`} type="button">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
      <span className={css.label}>{label}</span>
    </span>
  );
};
