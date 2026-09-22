import classNames from "classnames";
import { ReactNode } from "react";
import css from "./alert.module.scss";

export type AlertType = "error" | "warning" | "success" | "general" | "bulk-banner" | "ai";

export type AlertProps = {
  type?: AlertType;
  message: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export const Alert = ({
  type = "general",
  message,
  actions,
  className,
}: AlertProps) => (
  <div
    className={classNames(css.alert, css[type.replace("-", "_")], className)}
    role="alert"
  >
    <div className={css.message}>{message}</div>
    {actions && <div className={css.actions}>{actions}</div>}
  </div>
);
