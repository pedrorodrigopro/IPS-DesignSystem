// SidePanel — base container component
// Figma: adFvaOeh8E3AKLFKRjYD3r, Template/Sidepanel (1578:29068)
//
// Width: 600px (fixed)
// Position: fixed right:0, full height
// Border-radius: 8px 0 0 8px (left corners only — slides in from right)
// Shadow: -6px 0 12px 0 rgba(27,72,195,0.2)
// Animation: CSS transform translateX — open slides in, close slides out
// Backdrop: semi-transparent overlay behind panel

import React, { useEffect, useState } from "react";
import css from "./side_panel.module.scss";
import classNames from "classnames";

export type SidePanelProps = {
  /** Whether the panel is visible */
  open: boolean;
  /** Called when backdrop or close button is clicked */
  onClose: () => void;
  /** Panel content */
  children: React.ReactNode;
  /** Width override — defaults to 600px */
  width?: number;
  className?: string;
};

export function SidePanel({ open, onClose, children, width = 600, className }: SidePanelProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Small delay so the CSS transition fires after mount
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      // Unmount after transition completes (300ms)
      const t = setTimeout(() => setMounted(false), 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={classNames(css.backdrop, { [css.backdropVisible]: visible })}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        className={classNames(css.panel, { [css.panelVisible]: visible }, className)}
        style={{ width }}
        aria-modal="true"
        role="dialog"
      >
        {children}
      </aside>
    </>
  );
}
