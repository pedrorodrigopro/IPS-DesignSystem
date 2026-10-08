// Actions — Figma nodes:
//   Content:       1601:19589  (Actions/Screens, Width=Full)
//   Sticky screen: 10003:166259 (Actions/Screens, Width=Full sticky)
//   Sticky panel:  6787:163871  (Actions/Overlays, Saved filters=False)
//
// All variants share the same button style (Button regular):
//   h=32px, padding 8px 16px, radius 8px
//   secondary: white bg, 1px #CFDAF7 border, #0D2976 text
//   primary:   #2358F8 bg, no border, white text
//
// Content (inline):
//   row, justify-between, padding-top 24px, border-top 1px #CFDAF7
//   Left: secondary buttons (gap 16px)
//   Right: secondary + primary buttons (gap 16px)
//
// Sticky screen (fixed bottom of viewport):
//   White bg panel + top divider + shadow blur above
//   Actions centered in 1280px, padding 0 24px 24px
//   Sticks to bottom of the page (position:sticky bottom:0)
//
// Sticky panel (fixed bottom of a side panel / overlay):
//   Same structure but fills full parent width (no 1280px centering)
//   Designed for 352px panels
//   Sticks to bottom of nearest scroll container (position:sticky bottom:0)

import React, { ReactNode } from "react";
import classNames from "classnames";
import css from "./actions.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ActionsVariant = "content" | "sticky-screen" | "sticky-panel";

export type ActionItem = {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
};

export type ActionsProps = {
  variant?: ActionsVariant;
  /** Buttons on the left side (typically cancel / secondary actions) */
  leftActions?: ActionItem[];
  /** Buttons on the right side (typically save / primary actions) */
  rightActions?: ActionItem[];
  className?: string;
};

// ── Button ────────────────────────────────────────────────────────────────────

function ActionButton({ action }: { action: ActionItem }) {
  return (
    <button
      type="button"
      disabled={action.disabled}
      className={classNames(
        css.btn,
        action.variant === "primary" ? css.primary : css.secondary,
        action.disabled && css.disabled
      )}
      onClick={action.onClick}
    >
      {action.label}
    </button>
  );
}

// ── Actions ───────────────────────────────────────────────────────────────────

export function Actions({
  variant = "content",
  leftActions = [],
  rightActions = [],
  className,
}: ActionsProps) {
  const buttonRow = (
    <div className={css.buttonRow}>
      {leftActions.length > 0 && (
        <div className={css.left}>
          {leftActions.map((a, i) => <ActionButton key={a.label + i} action={a} />)}
        </div>
      )}
      {rightActions.length > 0 && (
        <div className={css.right}>
          {rightActions.map((a, i) => <ActionButton key={a.label + i} action={a} />)}
        </div>
      )}
    </div>
  );

  // ── content — inline bar with top border ────────────────────────────────
  if (variant === "content") {
    return (
      <div className={classNames(css.content, className)}>
        {buttonRow}
      </div>
    );
  }

  // ── sticky-screen — white panel fixed to viewport bottom ─────────────────
  if (variant === "sticky-screen") {
    return (
      <div className={classNames(css.stickyScreen, className)}>
        <div className={css.screenInner}>
          {buttonRow}
        </div>
      </div>
    );
  }

  // ── sticky-panel — white panel fixed to side panel bottom ─────────────────
  return (
    <div className={classNames(css.stickyPanel, className)}>
      <div className={css.panelInner}>
        {buttonRow}
      </div>
    </div>
  );
}
