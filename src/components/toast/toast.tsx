import classNames from "classnames";
import css from "./toast.module.scss";

export type ToastKind = "info" | "success" | "warning" | "error";

export type ToastProps = {
  message: string;
  kind?: ToastKind;
  onDismiss?: () => void;
  className?: string;
};

export const Toast = ({ message, kind = "info", onDismiss, className }: ToastProps) => (
  <div className={classNames(css.toast, css[kind], className)} role="alert">
    <span className={css.message}>{message}</span>
    {onDismiss && (
      <button className={css.dismiss} onClick={onDismiss} aria-label="Dismiss">
        ×
      </button>
    )}
  </div>
);
