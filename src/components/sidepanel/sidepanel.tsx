import classNames from "classnames";
import { Button } from "../button/button";
import { Divider } from "../divider/divider";
import css from "./sidepanel.module.scss";

export type SidepanelProps = {
  isOpen: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  onPrimary?: () => void;
  primaryLabel?: string;
  className?: string;
};

export const Sidepanel = ({
  isOpen,
  title,
  children,
  onClose,
  onPrimary,
  primaryLabel = "Save",
  className,
}: SidepanelProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={css.overlay} onClick={onClose} aria-hidden="true" />
      <aside className={classNames(css.sidepanel, className)} aria-label={title}>
        <div className={css.header}>
          <span className={css.title}>{title}</span>
          <button className={css.close} onClick={onClose} aria-label="Close sidepanel">
            ×
          </button>
        </div>
        <Divider />
        <div className={css.body}>{children}</div>
        {onPrimary && (
          <>
            <Divider />
            <div className={css.footer}>
              <Button kind="ghost" text="Cancel" onClick={onClose} />
              <Button kind="primary" text={primaryLabel} onClick={onPrimary} />
            </div>
          </>
        )}
      </aside>
    </>
  );
};
