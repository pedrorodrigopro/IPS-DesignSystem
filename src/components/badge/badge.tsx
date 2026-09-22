import classNames from "classnames";
import css from "./badge.module.scss";

export type BadgeStatus = "default" | "success" | "danger" | "warning" | "highlight" | "info";

export type BadgeProps = {
  label: string;
  status?: BadgeStatus;
  className?: string;
};

export const Badge = ({ label, status = "default", className }: BadgeProps) => (
  <span className={classNames(css.badge, css[status], className)}>{label}</span>
);
