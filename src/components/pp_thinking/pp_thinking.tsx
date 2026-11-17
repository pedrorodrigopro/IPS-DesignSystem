// PPThinking — ProPilot "working on it" indicator
// Source: propilot-be prototype (ThinkingIndicator)
//
// Three bouncing dots + a short text ("Analysing…", "Preparing your response…").
//   "dark"  — inside the floating glass window (PPWindow)
//   "light" — inside the docked white panel

import React from "react";
import classNames from "classnames";
import css from "./pp_thinking.module.scss";

export type PPThinkingVariant = "dark" | "light";

export type PPThinkingProps = {
  /** Text next to the dots. Default "Preparing your response…". */
  label?: string;
  /** Visual variant — "dark" inside the floating glass window, "light" inside the docked panel */
  variant?: PPThinkingVariant;
  className?: string;
};

export function PPThinking({ label = "Preparing your response…", variant = "dark", className }: PPThinkingProps) {
  return (
    <div className={classNames(css.thinking, css[variant], className)} role="status" aria-live="polite">
      <div className={css.dots} aria-hidden="true">
        <span className={css.dot} />
        <span className={css.dot} />
        <span className={css.dot} />
      </div>
      <span className={css.text}>{label}</span>
    </div>
  );
}
