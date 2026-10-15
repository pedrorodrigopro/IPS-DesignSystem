// PPConflictBlock — ProPilot conflict/misalignment block header
// Source: propilot-be prototype (ConflictBlockUI)
//
// Renders a coloured severity dot + bold person name + description text.
// Suggestion cards are passed as children — the consumer renders them.
//
// Variants: "dark" (glass window) | "light" (docked panel)
// Severity: "error" (red dot) | "warning" (orange dot)

import React from "react";
import css from "./pp_conflict_block.module.scss";
import classNames from "classnames";

export type PPConflictBlockSeverity = "error" | "warning";
export type PPConflictBlockVariant  = "dark"  | "light";

export type PPConflictBlockProps = {
  /** Severity controls the dot colour: error = red, warning = orange */
  severity: PPConflictBlockSeverity;
  /** Bold heading — person name + conflict label */
  person: string;
  /** Supporting description */
  description: string;
  /** Visual variant */
  variant?: PPConflictBlockVariant;
  /** Suggestion cards or other content rendered below the description */
  children?: React.ReactNode;
  className?: string;
};

export function PPConflictBlock({
  severity,
  person,
  description,
  variant = "dark",
  children,
  className,
}: PPConflictBlockProps) {
  return (
    <div className={classNames(css.block, className)}>
      {/* Dot + heading + description */}
      <div className={css.header}>
        <div className={classNames(css.dot, css[severity])} aria-hidden="true" />
        <div className={css.text}>
          <span className={classNames(css.person, { [css.personDark]: variant === "dark" })}>
            {person}:{" "}
          </span>
          <span className={classNames(css.description, { [css.descriptionDark]: variant === "dark" })}>
            {description}
          </span>
        </div>
      </div>

      {/* Suggestions slot */}
      {children && (
        <div className={css.suggestions}>
          {children}
        </div>
      )}
    </div>
  );
}
