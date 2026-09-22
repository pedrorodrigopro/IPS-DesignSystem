import classNames from "classnames";
import { Avatar } from "../avatar/avatar";
import { Badge, BadgeStatus } from "../badge/badge";
import { Button } from "../button/button";
import css from "./card.module.scss";

export type CardProps = {
  name: string;
  role?: string;
  matchScore?: number;
  status?: string;
  statusKind?: BadgeStatus;
  avatarSrc?: string;
  onBook?: () => void;
  onView?: () => void;
  className?: string;
};

export const Card = ({
  name,
  role,
  matchScore,
  status,
  statusKind = "default",
  avatarSrc,
  onBook,
  onView,
  className,
}: CardProps) => (
  <div className={classNames(css.card, className)}>
    <div className={css.header}>
      <Avatar src={avatarSrc} name={name} size="md" />
      <div className={css.info}>
        <span className={css.name}>{name}</span>
        {role && <span className={css.role}>{role}</span>}
      </div>
      {matchScore !== undefined && (
        <span className={css.score}>{matchScore}%</span>
      )}
    </div>
    {status && (
      <div className={css.statusRow}>
        <Badge label={status} status={statusKind} />
      </div>
    )}
    <div className={css.actions}>
      {onView && <Button kind="ghost" text="View" small onClick={onView} />}
      {onBook && <Button kind="primary" text="Book" small onClick={onBook} />}
    </div>
  </div>
);
