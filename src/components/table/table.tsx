// Table — Figma nodes:
//   Standard: 5797:225575 (Table/Standard)
//   Compact:  6207:127526 (Table/Compact)
//
// Cell types (Table/Cell component set 1572:51648):
//   Checkbox    — checkbox per row (standard only)
//   Text Primary — bold body text (New/Body selected, #0C1457)
//   Text Regular — regular body text (New/Body unselected, #0C1457)
//   Pill        — Pill/WF State small pill (16px radius, semantic colours)
//   WM          — Workforce Member: avatar (30px) + name
//   Number      — right-aligned number (New/Body unselected)
//   Percentage  — number + "%" suffix
//   Button      — row of Button small new (secondary)
//   Icon        — icon button (Icon tertiary)
//
// Sticky column:
//   When column.sticky = true, the th/td gets position:sticky; right:0.
//   The wrapper shows a white→transparent gradient on its right edge
//   whenever the table is horizontally overflowing (detected via ResizeObserver).
//
// Header (Table/Header 1706:51230):
//   Sortable=True  — text + caret-up/caret-down sort icon
//   Sortable=False — text only
//
// Row heights:
//   Standard: 56px (padding 16px top/bottom)
//   Compact:  40px (padding 8px top/bottom)
//
// Header height: 40px (padding 12px top/bottom)
// Cell horizontal padding: 16px (standard), 12px (compact)
// Border: 1px solid #CFDAF7 bottom on each row; header bottom 1px #CFDAF7

import React, { useState, useRef, useEffect, ReactNode } from "react";
import classNames from "classnames";
import { Icon } from "../icon/icon";
import { Avatar } from "../avatar/avatar";
import { PillSimple } from "../pill/pill";
import { Checkbox } from "../checkbox/checkbox";
import css from "./table.module.scss";

// ── Column definition ─────────────────────────────────────────────────────────

export type TableCellType =
  | "text-primary"
  | "text-regular"
  | "pill"
  | "wm"
  | "number"
  | "percentage"
  | "button"
  | "icon"
  | "checkbox"
  | "custom";

export type SortDirection = "asc" | "desc" | "none";

export type TableColumn<T = Record<string, unknown>> = {
  /** Unique key; also used to read row[key] unless renderCell is provided */
  key: string;
  /** Header label */
  header: string;
  /** Cell rendering type — controls how row[key] is displayed */
  type?: TableCellType;
  /** Whether header shows sort arrows */
  sortable?: boolean;
  /** Explicit width (CSS value, e.g. "120px", "20%") */
  width?: string;
  /**
   * Stick this column to the right edge of the table wrapper.
   * Use for action/icon columns that should always be visible when scrolling.
   */
  sticky?: boolean;
  /** Custom cell renderer; receives the row and the resolved value */
  renderCell?: (row: T, value: unknown) => ReactNode;
  /** For type=pill: background colour */
  pillBg?: string;
  /** For type=pill: text colour */
  pillColor?: string;
  /** For type=wm: subtitle below the name */
  wmSubtitle?: boolean;
  /** For type=button: array of button labels (up to 3) */
  buttonLabels?: string[];
  /** For type=button/icon: click handler */
  onButtonClick?: (label: string, row: T) => void;
  /** For type=icon: icon name */
  iconName?: string;
  /** Alignment override; defaults based on type */
  align?: "left" | "center" | "right";
};

// ── Row shape ─────────────────────────────────────────────────────────────────

export type TableRow = Record<string, unknown> & {
  /** If provided, used as row key in React; otherwise index is used */
  id?: string | number;
};

// ── WM cell sub-type ─────────────────────────────────────────────────────────

export type WMCellValue = {
  name: string;
  initials?: string;
  avatarSrc?: string;
};

// ── Component props ───────────────────────────────────────────────────────────

export type TableProps<T extends TableRow = TableRow> = {
  columns: TableColumn<T>[];
  rows: T[];
  /** Standard (56px rows, checkbox col) or compact (40px rows, no checkbox) */
  compact?: boolean;
  /** Show checkbox column (standard only) */
  selectable?: boolean;
  /** Controlled selection — array of selected row ids or indices */
  selectedRows?: (string | number)[];
  onSelectionChange?: (selected: (string | number)[]) => void;
  /** Sorting — controlled */
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string, direction: SortDirection) => void;
  className?: string;
};

// ── Sort icon ─────────────────────────────────────────────────────────────────

const SortIcon = ({ direction }: { direction: SortDirection }) => (
  <span className={css.sortIcon} aria-hidden="true">
    <Icon
      name="caret-up"
      size={14}
      className={classNames(css.caretUp, direction === "asc" && css.active)}
    />
    <Icon
      name="caret-down"
      size={14}
      className={classNames(css.caretDown, direction === "desc" && css.active)}
    />
  </span>
);

// ── Cell renderer ─────────────────────────────────────────────────────────────

function renderCellContent<T extends TableRow>(
  col: TableColumn<T>,
  row: T,
  _compact: boolean
): ReactNode {
  const value = row[col.key];

  if (col.renderCell) return col.renderCell(row, value);

  const type = col.type ?? "text-regular";

  switch (type) {
    case "text-primary":
      return <span className={css.textPrimary}>{String(value ?? "")}</span>;

    case "text-regular":
      return <span className={css.textRegular}>{String(value ?? "")}</span>;

    case "pill": {
      const label = String(value ?? "");
      return (
        <PillSimple
          label={label}
          size="small"
          bg={col.pillBg}
          color={col.pillColor}
        />
      );
    }

    case "wm": {
      const wm = value as WMCellValue | undefined;
      if (!wm) return null;
      return (
        <span className={css.wmCell}>
          <Avatar initials={wm.initials} src={wm.avatarSrc} size="small" />
          <span className={css.wmName}>{wm.name}</span>
        </span>
      );
    }

    case "number":
      return (
        <span className={classNames(css.textRegular, css.numberCell)}>
          {String(value ?? "")}
        </span>
      );

    case "percentage":
      return (
        <span className={classNames(css.textRegular, css.numberCell)}>
          <span className={css.percentValue}>{String(value ?? "")}</span>
          <span className={css.percentSign}>%</span>
        </span>
      );

    case "button": {
      const labels = col.buttonLabels ?? [];
      return (
        <span className={css.buttonCell}>
          {labels.map((label) => (
            <button
              key={label}
              className={css.cellButton}
              onClick={() => col.onButtonClick?.(label, row)}
            >
              {label}
            </button>
          ))}
        </span>
      );
    }

    case "icon": {
      const iconName = col.iconName ?? "menu-vertical";
      return (
        <button
          className={css.iconButton}
          aria-label={col.header || iconName}
          onClick={() => col.onButtonClick?.(iconName, row)}
        >
          <Icon name={iconName as Parameters<typeof Icon>[0]["name"]} size={16} />
        </button>
      );
    }

    case "custom":
      return <>{String(value ?? "")}</>;

    default:
      return <span className={css.textRegular}>{String(value ?? "")}</span>;
  }
}

// ── Table ─────────────────────────────────────────────────────────────────────

export function Table<T extends TableRow = TableRow>({
  columns,
  rows,
  compact = false,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  sortKey,
  sortDirection = "none",
  onSort,
  className,
}: TableProps<T>) {
  // ── Selection state ──────────────────────────────────────────────────────
  const [internalSelected, setInternalSelected] = useState<(string | number)[]>([]);
  const selected = onSelectionChange ? selectedRows : internalSelected;
  const setSelected = onSelectionChange ?? setInternalSelected;

  const getRowId = (row: T, index: number): string | number =>
    row.id !== undefined ? row.id : index;

  const isSelected = (row: T, index: number) =>
    selected.includes(getRowId(row, index));

  const toggleRow = (row: T, index: number) => {
    const id = getRowId(row, index);
    setSelected(
      isSelected(row, index)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  const allSelected = rows.length > 0 && rows.every((r, i) => isSelected(r, i));
  const someSelected = !allSelected && rows.some((r, i) => isSelected(r, i));

  const toggleAll = () => {
    if (allSelected) setSelected([]);
    else setSelected(rows.map((r, i) => getRowId(r, i)));
  };

  // ── Sort ─────────────────────────────────────────────────────────────────
  const handleSort = (key: string) => {
    if (!onSort) return;
    if (sortKey !== key) onSort(key, "asc");
    else if (sortDirection === "asc") onSort(key, "desc");
    else if (sortDirection === "desc") onSort(key, "none");
    else onSort(key, "asc");
  };

  const getSortDir = (key: string): SortDirection =>
    sortKey === key ? sortDirection : "none";

  // ── Overflow detection for scroll gradient ───────────────────────────────
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const check = () => {
      const overflows = el.scrollWidth > el.clientWidth;
      setIsOverflowing(overflows);
      // Hide gradient once scrolled to the rightmost position
      setIsScrolledToEnd(
        overflows ? el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 : false
      );
    };

    check();

    const ro = new ResizeObserver(check);
    ro.observe(el);
    el.addEventListener("scroll", check, { passive: true });

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", check);
    };
  }, []);

  // Show gradient when overflowing and not yet scrolled to the end
  const showGradient = isOverflowing && !isScrolledToEnd;

  return (
    <div
      ref={wrapperRef}
      className={classNames(
        css.tableWrapper,
        compact ? css.compact : css.standard,
        className
      )}
    >
      {/* Gradient overlay — absolutely positioned, sits between scrollable
          content and the sticky column, visible only when overflowing */}
      {showGradient && <div className={css.scrollGradient} aria-hidden="true" />}
      <table className={css.table}>
        {/* ── Header ───────────────────────────────────────────────── */}
        <thead>
          <tr className={css.headerRow}>
            {selectable && !compact && (
              <th className={classNames(css.th, css.checkboxCell)}>
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((col) => {
              const dir = getSortDir(col.key);
              return (
                <th
                  key={col.key}
                  className={classNames(
                    css.th,
                    col.sortable && css.sortable,
                    col.align && css[`align-${col.align}`],
                    col.sticky && css.stickyCol
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    col.sortable
                      ? dir === "asc"
                        ? "ascending"
                        : dir === "desc"
                        ? "descending"
                        : "none"
                      : undefined
                  }
                >
                  <span className={css.headerContent}>
                    <span className={css.headerLabel}>{col.header}</span>
                    {col.sortable && <SortIcon direction={dir} />}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        {/* ── Body ─────────────────────────────────────────────────── */}
        <tbody>
          {rows.map((row, i) => {
            const key = getRowId(row, i);
            return (
              <tr
                key={key}
                className={classNames(
                  css.row,
                  isSelected(row, i) && css.rowSelected
                )}
              >
                {selectable && !compact && (
                  <td className={classNames(css.td, css.checkboxCell)}>
                    <Checkbox
                      checked={isSelected(row, i)}
                      onChange={() => toggleRow(row, i)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={classNames(
                      css.td,
                      col.align && css[`align-${col.align}`],
                      col.sticky && css.stickyCol
                    )}
                  >
                    {renderCellContent(col, row, compact)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
