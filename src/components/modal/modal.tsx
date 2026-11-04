// Modal — dialog centred on screen that slides in from just above its final position, over a dark overlay.
//
//   Overlay: rgba(0,0,0,0.6) (fades in)
//   Dialog:  white, radius 8px, padding 24px, drops from -32px with a fade (300ms ease-out)
//   Header:  title (heading-4) + close icon button
//   Body:    children
//   Footer:  IPS Actions "content" bar (Cancel left, primary right)
//
// ESC / overlay click / close button → onClose. Stays mounted briefly after `open` turns false so it can animate out.

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import { Actions } from "../actions/actions";
import type { ActionItem } from "../actions/actions";
import css from "./modal.module.scss";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Dialog width in px (default 640) */
  width?: number;
  children?: React.ReactNode;
  leftActions?: ActionItem[];
  rightActions?: ActionItem[];
};

const EXIT_MS = 200;

export function Modal({ open, onClose, title, width = 640, children, leftActions, rightActions }: ModalProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const t = setTimeout(() => setMounted(false), EXIT_MS);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, onClose]);

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <div className={css.root} role="presentation">
      <div className={`${css.overlay} ${visible ? css.overlayVisible : ""}`} onClick={onClose} />
      <div
        className={`${css.dialog} ${visible ? css.dialogVisible : ""}`}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={css.header}>
          <span className={css.title}>{title}</span>
          <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
            <Icon name="cross" size={20} />
          </Button>
        </div>
        <div className={css.body}>{children}</div>
        {(leftActions?.length || rightActions?.length) ? (
          <Actions variant="content" leftActions={leftActions} rightActions={rightActions} />
        ) : null}
      </div>
    </div>,
    document.body
  );
}
