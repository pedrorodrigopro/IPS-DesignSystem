import classNames from "classnames";
import { Badge, BadgeStatus } from "../badge/badge";
import css from "./kpi_card.module.scss";

export type KpiCardProps = {
  label: string;
  value: string | number;
  status?: BadgeStatus;
  statusLabel?: string;
  className?: string;
};

export const KpiCard = ({
  label,
  value,
  status,
  statusLabel,
  className,
}: KpiCardProps) => (
  <div className={classNames(css.kpiCard, className)}>
    <span className={css.label}>{label}</span>
    <span className={css.value}>{value}</span>
    {status && statusLabel && (
      <Badge label={statusLabel} status={status} />
    )}
  </div>
);
