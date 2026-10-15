// PPBubble — ProPilot user chat bubble
// Figma source: propilot-be prototype (inline style)
//
// Two variants:
//   "dark"  — for the floating glass window (dark gradient background)
//             #007AFF blue fill, 1px rgba(255,255,255,0.32) border, white text
//             iMessage-style corners: 14px 14px 0px 14px (top-right cut)
//
//   "light" — for the docked white panel
//             var(--palette-neutral-1) fill, var(--palette-blue-0) text, no border
//             same corner treatment

import React from "react";
import css from "./pp_bubble.module.scss";
import classNames from "classnames";

export type PPBubbleVariant = "dark" | "light";

export type PPBubbleProps = {
  /** The message text to display inside the bubble */
  children: React.ReactNode;
  /** Visual variant — use "dark" inside the floating glass window, "light" inside the docked panel */
  variant?: PPBubbleVariant;
  /** Additional class names */
  className?: string;
};

export function PPBubble({
  children,
  variant = "dark",
  className,
}: PPBubbleProps) {
  return (
    <div className={classNames(css.bubble, css[variant], className)}>
      {children}
    </div>
  );
}
