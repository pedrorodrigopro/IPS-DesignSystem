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
//   Right order: info text (infoText), then rightActions, then rightContent.
//   Per-action extras: `tooltip` (hover tooltip, also on disabled) and `iconPosition`.
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
import { Icon } from "../icon/icon";
import { Tooltip } from "../tooltip/tooltip";
import type { IconName } from "../icon/icon";
import css from "./actions.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ActionsVariant = "content" | "sticky-screen" | "sticky-panel";

export type ActionItem = {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  /** Optional icon (leading unless iconPosition="right") */
  icon?: IconName;
  /** Where the icon sits relative to the label (default "left") (requires `icon`) */
  iconPosition?: "left" | "right";
  /**
   * Shown in an IPS Tooltip on mouse hover (also on disabled buttons).
   * Hover only — a disabled button is not keyboard-focusable.
   * Positioned above the button, so it is clipped by an ancestor with overflow:hidden.
   */
  tooltip?: string;
};

export type ActionsProps = {
  variant?: ActionsVariant;
  /** Buttons on the left side (typically cancel / secondary actions) */
  leftActions?: ActionItem[];
  /** Buttons on the right side (typically save / primary actions) */
  rightActions?: ActionItem[];
  /** sticky-screen only: drop the 1280px max width and use this horizontal padding (px) — aligns the bar with the page padding */
  insetX?: number;
  /** Extra content on the left, after leftActions (e.g. a ButtonGroup) */
  leftContent?: ReactNode;
  /** Extra content on the right, after rightActions (e.g. a split ButtonGroup) */
  rightContent?: ReactNode;
  /** Muted text shown on the right, before the right-hand buttons (e.g. "2 engagements · 12 roles") */
  infoText?: string;
  className?: string;
};

// ── Button ────────────────────────────────────────────────────────────────────

function ActionButton({ action }: { action: ActionItem }) {
  const iconEl = action.icon ? <Icon name={action.icon} size={16} /> : null;
  const button = (
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
      {action.iconPosition !== "right" && iconEl}
      {action.label}
      {action.iconPosition === "right" && iconEl}
    </button>
  );
  return action.tooltip ? (
    <Tooltip
      content={action.tooltip}
      placement="down-right"
      maxWidth={320}
    >
      {button}
    </Tooltip>
  ) : (
    button
  );
}

// ── Actions ───────────────────────────────────────────────────────────────────

export function Actions({
  variant = "content",
  leftActions = [],
  rightActions = [],
  insetX,
  leftContent,
  rightContent,
  infoText,
  className,
}: ActionsProps) {
  const buttonRow = (
    <div className={css.buttonRow}>
      {(leftActions.length > 0 || leftContent) && (
        <div className={css.left}>
          {leftActions.map((a, i) => <ActionButton key={a.label + i} action={a} />)}
          {leftContent}
        </div>
      )}
      {(rightActions.length > 0 || rightContent || infoText) && (
        <div className={css.right}>
          {infoText && <span className={css.infoText}>{infoText}</span>}
          {rightActions.map((a, i) => <ActionButton key={a.label + i} action={a} />)}
          {rightContent}
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
        <div className={css.screenInner} style={insetX !== undefined ? { maxWidth: "none", paddingLeft: insetX, paddingRight: insetX } : undefined}>
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
