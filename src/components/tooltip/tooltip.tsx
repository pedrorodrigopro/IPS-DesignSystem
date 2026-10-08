// Tooltip — Figma node 1457:22694 (Tooltip component set)
//
// Bubble: bg #0C1457, radius 8px, padding 16px, body-regular white text
// Arrow: 10×10 equilateral triangle, same fill #0C1457, overlaps bubble by 3px
//
// Placements (Type= variants):
//   no-arrow                              — bubble only, no arrow
//   down-center / down-left / down-right  — arrow below bubble, pointing down
//   up-center   / up-left   / up-right    — arrow above bubble, pointing up
//   left-center / left-up   / left-down   — arrow to the left of bubble, pointing left
//   right-center/ right-up  / right-down  — arrow to the right, pointing right
//
// Arrow alignment (left/right variants):
//   -center: arrow centred on the edge
//   -left / -up: arrow near the start of the edge
//   -right / -down: arrow near the end of the edge
//
// Implemented via CSS ::after pseudo-element triangle on the bubble element.
// The wrapper is position:relative (inline-block); the bubble is position:absolute.
// Visibility toggled on :hover / :focus-within of the wrapper.

import React, { ReactNode } from "react";
import classNames from "classnames";
import css from "./tooltip.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type TooltipPlacement =
  | "no-arrow"
  | "down-center" | "down-left" | "down-right"
  | "up-center"   | "up-left"   | "up-right"
  | "left-center" | "left-up"   | "left-down"
  | "right-center"| "right-up"  | "right-down";

export type TooltipProps = {
  /** The content shown inside the tooltip bubble */
  content: ReactNode;
  /** The element that triggers the tooltip on hover/focus */
  children: ReactNode;
  placement?: TooltipPlacement;
  /** Max width of the bubble in px. Defaults to 320. Set to 0 to disable. */
  maxWidth?: number;
  /** Disable the tooltip entirely */
  disabled?: boolean;
  className?: string;
};

// ── CSS class lookup ──────────────────────────────────────────────────────────

const PLACEMENT_CLASS: Record<TooltipPlacement, string> = {
  "no-arrow":     css.noArrow,
  "down-center":  css.downCenter,
  "down-left":    css.downLeft,
  "down-right":   css.downRight,
  "up-center":    css.upCenter,
  "up-left":      css.upLeft,
  "up-right":     css.upRight,
  "left-center":  css.leftCenter,
  "left-up":      css.leftUp,
  "left-down":    css.leftDown,
  "right-center": css.rightCenter,
  "right-up":     css.rightUp,
  "right-down":   css.rightDown,
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Tooltip({
  content,
  children,
  placement = "down-center",
  maxWidth = 320,
  disabled = false,
  className,
}: TooltipProps) {
  if (disabled) return <>{children}</>;

  return (
    <span className={classNames(css.wrapper, className)}>
      {children}
      <span
        className={classNames(css.bubble, PLACEMENT_CLASS[placement])}
        role="tooltip"
        style={{ maxWidth }}
      >
        {content}
      </span>
    </span>
  );
}
