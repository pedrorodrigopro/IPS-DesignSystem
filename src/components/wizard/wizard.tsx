// Wizard — Figma nodes:
//   Steps container: 8273:200202 (Steps component)
//   Step item:       8273:197838 (Wizard Step component set)
//
// Step properties:
//   Current          — body-selected (700 14px), bar #0D2976 (fill_8S2WPL)
//   Enabled previous — body-unselected (400 14px), bar #8F9ED1 (fill_40Q0IM)
//   Enabled next     — body-unselected (400 14px), bar #0D2976 (fill_8S2WPL)
//   Disabled         — body-unselected (400 14px), bar #8F9ED1, opacity 0.5
//   Hover (prev/next)— body-unselected, bar #2358F8 (fill_VPV22R, primary blue)
//
// Layout (Steps):
//   row, gap 16px, each step fills equal width (flex: 1)
//   Step: column, gap 8px, items stretch
//     - Title text: fill width
//     - Indicator bar: fill width × 12px height
//
// Behaviour:
//   - Steps before activeIndex: "enabled-previous" (visited/completed)
//   - activeIndex step:         "current"
//   - Steps after activeIndex that are <= maxReachable: "enabled-next"
//   - Steps after maxReachable: "disabled"
//   - Clicking enabled-previous or enabled-next calls onChange
//   - Clicking current or disabled is a no-op

import React from "react";
import classNames from "classnames";
import css from "./wizard.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type WizardStepState =
  | "current"
  | "enabled-previous"
  | "enabled-next"
  | "disabled";

export type WizardStep = {
  id: string;
  label: string;
};

export type WizardProps = {
  steps: WizardStep[];
  /** Index of the currently active step (0-based) */
  activeIndex: number;
  /**
   * How far ahead the user can jump. Defaults to activeIndex + 1
   * (only the immediately next step is available).
   * Set to steps.length - 1 to make all future steps available.
   */
  maxReachableIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
};

// ── Single step ───────────────────────────────────────────────────────────────

type StepProps = {
  label: string;
  state: WizardStepState;
  onClick: () => void;
};

function WizardStepItem({ label, state, onClick }: StepProps) {
  const isClickable = state === "enabled-previous" || state === "enabled-next";

  return (
    <button
      type="button"
      className={classNames(css.step, css[state])}
      onClick={isClickable ? onClick : undefined}
      disabled={state === "disabled"}
      aria-current={state === "current" ? "step" : undefined}
      aria-disabled={state === "disabled" ? true : undefined}
      tabIndex={isClickable ? 0 : -1}
    >
      <span className={css.label}>{label}</span>
      <span className={css.bar} aria-hidden="true" />
    </button>
  );
}

// ── Wizard ────────────────────────────────────────────────────────────────────

export function Wizard({
  steps,
  activeIndex,
  maxReachableIndex,
  onChange,
  className,
}: WizardProps) {
  // By default only one step ahead is reachable
  const maxReachable = maxReachableIndex ?? activeIndex + 1;

  const getState = (index: number): WizardStepState => {
    if (index === activeIndex) return "current";
    if (index < activeIndex) return "enabled-previous";
    if (index <= maxReachable) return "enabled-next";
    return "disabled";
  };

  return (
    <nav
      className={classNames(css.wizard, className)}
      aria-label="Progress"
      role="tablist"
    >
      {steps.map((step, i) => {
        const state = getState(i);
        return (
          <WizardStepItem
            key={step.id}
            label={step.label}
            state={state}
            onClick={() => onChange?.(i)}
          />
        );
      })}
    </nav>
  );
}
