// PPSuggestionCard — ProPilot suggestion card
// Source: propilot-be prototype (SuggestionCardUI)
//
// Variants:
//   "dark"  — for the floating glass window (white/alpha fills, white text)
//   "light" — for the docked white panel (neutral-1 fill, blue text)
//
// States:
//   "default"   — hoverable, shows Apply + Dismiss buttons
//   "accepted"  — green confirmed state
//   "dismissed" — muted/faded state

import React from "react";
import css from "./pp_suggestion_card.module.scss";
import classNames from "classnames";

export type PPSuggestionCardVariant = "dark" | "light";
export type PPSuggestionCardState   = "default" | "accepted" | "dismissed";

export type PPSuggestionCardProps = {
  /** Bold action label shown at top */
  action: string;
  /** Supporting detail text */
  detail: string;
  /** Visual variant — use "dark" inside the floating glass window, "light" inside the docked panel */
  variant?: PPSuggestionCardVariant;
  /** Current state of the card */
  state?: PPSuggestionCardState;
  /** Optional label shown as hover-preview hint (e.g. "Hover to preview result") */
  previewHint?: string;
  /** Optional content rendered between detail and buttons (e.g. a skill table) */
  children?: React.ReactNode;
  /** Called when Apply is clicked */
  onAccept?: () => void;
  /** Called when Dismiss is clicked */
  onDismiss?: () => void;
  /** Hover handlers — used by parent to drive preview state */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
};

export function PPSuggestionCard({
  action,
  detail,
  variant = "dark",
  state = "default",
  previewHint,
  children,
  onAccept,
  onDismiss,
  onMouseEnter,
  onMouseLeave,
  className,
}: PPSuggestionCardProps) {
  if (state === "dismissed") {
    return (
      <div className={classNames(css.card, css[variant], css.dismissed, className)}>
        <span className={css.dismissedLabel}>Dismissed — {action}</span>
      </div>
    );
  }

  if (state === "accepted") {
    return (
      <div className={classNames(css.card, css.accepted, className)}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7l4 4 6-6" stroke="#248E61" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={classNames(css.acceptedLabel, { [css.acceptedLabelDark]: variant === "dark" })}>
          Applied — {action}
        </span>
      </div>
    );
  }

  return (
    <div
      className={classNames(css.card, css[variant], className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={classNames(css.action, { [css.actionDark]: variant === "dark" })}>{action}</div>
      <div className={classNames(css.detail, { [css.detailDark]: variant === "dark" })}>{detail}</div>
      {previewHint && (
        <div className={classNames(css.hint, { [css.hintDark]: variant === "dark" })}>
          <span aria-hidden="true">👆</span> {previewHint}
        </div>
      )}
      {children && <div className={css.childrenSlot}>{children}</div>}
      <div className={css.actions}>
        <button
          onClick={onAccept}
          className={css.applyBtn}
          type="button"
        >
          Apply
        </button>
        <button
          onClick={onDismiss}
          className={classNames(css.dismissBtn, { [css.dismissBtnDark]: variant === "dark" })}
          type="button"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
