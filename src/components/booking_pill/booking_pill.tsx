// BookingPill — Figma node 39:116612 (.Booking pill component set)
// Source: IPS Screens Figma file l3JiE7ZmAsjSZY5Z7yPCOZ
//
// Categories (exact Figma fills + strokes):
//   booking-blue:        rgba(124,168,237,0.8) / #1C4B94 1px
//   booking-red:         rgba(243,161,180,0.8) / #8D112E 1px
//   booking-purple:      rgba(227,161,243,0.8) / #550568 1px
//   engagement-booked:   rgba(106,130,197,0.8) / #6A82C5 2px
//   engagement-partial:  rgba(255,255,255,0.4) / #6A82C5 2px
//   role-booked:         rgba(26,175,163,0.8)  / #1AAFA3 2px
//   role-partial:        rgba(255,255,255,0.4) / #1AAFA3 2px
//   pending:             rgba(217,220,224,0.8) / #9B5A01 2px dashed 8,8
//   hidden:              rgba(236,236,236,0.8) / none
//
// Layout: column, gap -4px, padding 3px 8px (regular) / 0px 8px (small)
//   Row 1 (label row): optional other-bookings icon + optional non-demand icon + label text
//   Row 2 (hours row): hours text — regular size only
//
// Text styles (from Figma):
//   Regular label: New/Body selected = Mulish 14px 700 115%  fill #0D2976
//   Small label:   New/Label selected = Mulish 12px 700 115% fill #0D2976
//   Hours:         New/Label regular  = Mulish 12px 400 150% fill #0D2976
//
// Hover: resting bg + rgba(0,0,0,0.04) overlay — implemented via :hover CSS

import React, { useState } from "react";
import classNames from "classnames";
import { Icon } from "../icon/icon";
import css from "./booking_pill.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type BookingPillCategory =
  | "booking-blue"
  | "booking-red"
  | "booking-purple"
  | "engagement-booked"
  | "engagement-partial"
  | "role-booked"
  | "role-partial"
  | "pending"
  | "hidden";

export type BookingPillSize = "regular" | "small";

export type BookingPillProps = {
  category: BookingPillCategory;
  /** Main label — role / booking category name */
  label: string;
  /** Hours text — only shown in regular size (Row 2) */
  hours?: string;
  /** Show non-demand icon (palm-tree) before label */
  nonDemand?: boolean;
  /** Show other-bookings icon (shown) before label */
  otherBookings?: boolean;
  size?: BookingPillSize;
  /** Additional CSS classes */
  className?: string;
  onClick?: () => void;
};

// ── Component ─────────────────────────────────────────────────────────────────

export function BookingPill({
  category,
  label,
  hours,
  nonDemand = false,
  otherBookings = false,
  size = "regular",
  className,
  onClick,
}: BookingPillProps) {
  const [hovered, setHovered] = useState(false);

  if (category === "hidden") {
    return (
      <div
        className={classNames(css.pill, css.hidden, css[size], className)}
        onClick={onClick}
      />
    );
  }

  return (
    <div
      className={classNames(
        css.pill,
        css[category.replace(/-/g, "_")],
        css[size],
        { [css.hover]: hovered },
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      title={label}
    >
      {/* Row 1 — label (+ optional icons) */}
      <div className={css.labelRow}>
        {otherBookings && (
          <Icon name="shown" size={14} className={css.labelIcon} />
        )}
        {nonDemand && (
          <Icon name="palm-tree" size={14} className={css.labelIcon} />
        )}
        {category === "pending" && (
          <Icon name="hourglass-half" size={14} className={css.labelIcon} />
        )}
        <span className={css.label}>{label}</span>
      </div>

      {/* Row 2 — hours (regular only) */}
      {size === "regular" && hours && (
        <div className={css.hoursRow}>
          <span className={css.hours}>{hours}</span>
        </div>
      )}
    </div>
  );
}
