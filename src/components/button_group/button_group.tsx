// ButtonGroup — Figma node 14520:222688 (Group button component set)
//
// Two joined buttons: [main action label] [chevron-down dropdown trigger]
// The pair shares a border — first button has left radius, second has right radius,
// no double border between them.
//
// Type=Primary:
//   Both buttons: bg #2358F8, no border, white text/icon
//   First:  radius 8px 0 0 8px, padding 8px 16px
//   Second: radius 0 8px 8px 0, padding 8px (icon only — chevron-down 16×16)
//   Separator: 1px rgba(255,255,255,0.3) vertical line between the two buttons
//
// Type=Secondary:
//   Both buttons: bg white, border 1px #CFDAF7, #0D2976 text/icon
//   First:  radius 8px 0 0 8px, border 1px #CFDAF7, padding 8px 16px
//   Second: radius 0 8px 8px 0, border 1px #CFDAF7, border-left none (avoids double)
//           padding 8px
//
// Shared: h=32px, body-selected 14px 700

import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { Icon } from "../icon/icon";
import css from "./button_group.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ButtonGroupVariant = "primary" | "secondary";

export type ButtonGroupProps = {
  /** Main button label */
  label: string;
  variant?: ButtonGroupVariant;
  /** Main button click handler */
  onClick?: () => void;
  /** Chevron/dropdown button click handler */
  onDropdownClick?: () => void;
  disabled?: boolean;
  /** Optional info text: shows an info icon after the label that reveals a tooltip on hover */
  info?: string;
  /**
   * Fill mode — the group stretches to parent width, main button is flex:1,
   * padding reduced to fit narrow containers (e.g. 120px card action column).
   */
  fill?: boolean;
  className?: string;
};

// ── ButtonGroup ───────────────────────────────────────────────────────────────

export function ButtonGroup({
  label,
  variant = "primary",
  onClick,
  onDropdownClick,
  disabled = false,
  info,
  fill = false,
  className,
}: ButtonGroupProps) {
  const [tip, setTip] = useState<{ top: number; right: number } | null>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const showTip = () => {
    const r = iconRef.current?.getBoundingClientRect();
    if (r) setTip({ top: r.bottom + 10, right: window.innerWidth - r.right - 6 });
  };
  return (
    <div
      className={classNames(
        css.group,
        css[variant],
        disabled && css.disabled,
        fill && css.fill,
        className
      )}
    >
      {/* ── Main action button ─────────────────────────────────────── */}
      <button
        type="button"
        className={classNames(css.mainBtn, css[variant])}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
        {info && (
          <span
            ref={iconRef}
            onMouseEnter={showTip}
            onMouseLeave={() => setTip(null)}
            style={{ display: "inline-flex", marginLeft: 6, flexShrink: 0 }}
          >
            <Icon name="info" size={14} />
          </span>
        )}
      </button>
      {/* Tooltip is portalled so the button's overflow:hidden never clips it */}
      {info && tip && ReactDOM.createPortal(
        <div
          role="tooltip"
          style={{
            position: "fixed", top: tip.top, right: tip.right, zIndex: 100000, maxWidth: 240,
            background: "var(--palette-blue-1)", color: "var(--palette-white-0)", borderRadius: 8, padding: 16,
            fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, lineHeight: "150%", pointerEvents: "none",
          }}
        >
          {info}
          <span style={{ position: "absolute", top: -5, right: 10, width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: "5px solid var(--palette-blue-1)" }} />
        </div>,
        document.body
      )}

      {/* ── Separator ─────────────────────────────────────────────── */}
      <span className={css.separator} aria-hidden="true" />

      {/* ── Dropdown trigger button ────────────────────────────────── */}
      <button
        type="button"
        className={classNames(css.dropBtn, css[variant])}
        onClick={onDropdownClick}
        disabled={disabled}
        aria-label="Open dropdown"
        aria-haspopup="true"
      >
        <Icon name="chevron-down" size={16} />
      </button>
    </div>
  );
}
