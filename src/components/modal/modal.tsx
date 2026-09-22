import classNames from "classnames";
import { Button } from "../button/button";
import { Divider } from "../divider/divider";
import css from "./modal.module.scss";

export type ModalProps = {
  isOpen: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  confirmKind?: "primary" | "destructive";
  className?: string;
};

export const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmLabel = "Confirm",
  confirmKind = "primary",
  className,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={css.backdrop} onClick={onClose} aria-modal="true" role="dialog">
      <div
        className={classNames(css.modal, className)}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={css.header}>
          <span className={css.title}>{title}</span>
          <button className={css.close} onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        <Divider />
        <div className={css.body}>{children}</div>
        {onConfirm && (
          <>
            <Divider />
            <div className={css.footer}>
              <Button kind="ghost" text="Cancel" onClick={onClose} />
              <Button kind={confirmKind} text={confirmLabel} onClick={onConfirm} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
