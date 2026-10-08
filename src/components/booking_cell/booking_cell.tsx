// BookingCell — Figma node 2001:502059 (Input week with category 2)
// Source: Tax 2025 Workshop — cGiQ5fBm2a4UqHye7JmeoB
//
// Cell: 39×51px, column layout, gap 4px, padding 0 0 0 2px
// Structure: top spacer (flex:1) | Input box (number centered) | Category dots | bottom spacer (flex:1)
//
// States:
//   default:       white bg, left border 1px #CFDAF7
//   hover:         rgba(0,0,0,0.04) bg, input gets bordered box
//   focused:       white bg, 2px #0C1457 outer border, input gets #E7F9FE bg + cursor
//   read-only:     neutral-2 bg, no interaction (engagement aggregate rows)
//   deadline:      red 2px bottom line on cell (role deadline marker)
//
// Category dots: 6×6px circles, colour = booking category
//   Blue:   #94B7EF (booking-blue)
//   Red:    booking-red
//   Purple: booking-purple
//   Empty:  transparent (neutral-1 bg)

import React, { useState } from "react";
import css from "./booking_cell.module.scss";
import classNames from "classnames";

// ── Types ─────────────────────────────────────────────────────────────────────

export type BookingCellCategory = "blue" | "red" | "purple" | "empty";
export type BookingCellState    = "default" | "read-only";

export type BookingCellProps = {
  /** Numeric value displayed in the cell */
  value: number | null;
  /** Category dot colour */
  category?: BookingCellCategory;
  /** Whether cell is read-only (engagement aggregate row — no editing) */
  readOnly?: boolean;
  /** Show red deadline marker at bottom */
  deadline?: boolean;
  /** Called when value changes */
  onChange?: (value: number) => void;
  className?: string;
};

const CATEGORY_COLORS: Record<BookingCellCategory, string> = {
  blue:   "#94B7EF",
  red:    "#F3A1B4",
  purple: "#E3A1F3",
  empty:  "transparent",
};

// ── Component ─────────────────────────────────────────────────────────────────

export function BookingCell({
  value,
  category = "empty",
  readOnly = false,
  deadline = false,
  onChange,
  className,
}: BookingCellProps) {
  const [hovered,  setHovered]  = useState(false);
  const [focused,  setFocused]  = useState(false);
  const [editing,  setEditing]  = useState(false);
  const [inputVal, setInputVal] = useState(value?.toString() ?? "");

  const handleFocus = () => { if (!readOnly) { setFocused(true); setEditing(true); setInputVal(value?.toString() ?? ""); } };
  const handleBlur  = () => {
    setFocused(false);
    setEditing(false);
    const n = parseInt(inputVal, 10);
    if (!isNaN(n)) onChange?.(n);
  };
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") (e.target as HTMLElement).blur();
  };

  return (
    <div
      className={classNames(
        css.cell,
        readOnly  && css.readOnly,
        hovered && !readOnly  && !focused && css.hovered,
        focused  && css.focused,
        deadline && css.deadline,
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top spacer */}
      <div className={css.spacer} />

      {/* Input box */}
      <div className={classNames(css.input, hovered && !readOnly && !focused && css.inputHovered, focused && css.inputFocused)}>
        {editing && !readOnly ? (
          <input
            className={css.inputEl}
            value={inputVal}
            autoFocus
            onChange={e => setInputVal(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKey}
          />
        ) : (
          <span
            className={css.inputValue}
            onClick={handleFocus}
            tabIndex={readOnly ? -1 : 0}
            onFocus={handleFocus}
          >
            {value ?? ""}
          </span>
        )}
      </div>

      {/* Category dot — only rendered for non-empty categories */}
      {category !== "empty" && (
        <div className={css.dots}>
          <div
            className={css.dot}
            style={{ background: CATEGORY_COLORS[category] }}
          />
        </div>
      )}

      {/* Bottom spacer */}
      <div className={css.spacer} />
    </div>
  );
}
