// FiltersApplied — Figma node 6848:115955 (Filters applied component set)
//
// Applied=False: renders nothing (zero height, empty)
// Applied=True:  row, gap 16px, padding 8px 0 8px 8px, height 32px
//   Left:  "Filters" label (body-unselected #0D2976) + "Clear all" link button
//            (filter-clean icon 16×16 + text body-selected #2358F8, padding 4px 0)
//   Right: filter pills (Type=Filter-Stacked):
//            bg #F8F9FD, border 1px #CFDAF7, radius 32px, padding 5px 16px 5px 8px
//            [cross icon 12×12] + [two-line text: field (10px regular) + value (12px bold)]
//
// The pill text is two lines stacked:
//   Line 1 — field name: label-small-regular 10px, #0D2976
//   Line 2 — value:      label-bold 12px, #0D2976

import React from "react";
import classNames from "classnames";
import { Icon } from "../icon/icon";
import css from "./filters_applied.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type AppliedFilter = {
  id: string;
  /** Field / category name — shown in small text above the value */
  field: string;
  /** Selected value — shown in bold below the field name */
  value: string;
};

export type FiltersAppliedProps = {
  filters: AppliedFilter[];
  onRemove?: (id: string) => void;
  onClearAll?: () => void;
  /** Label shown before "Clear all". Defaults to "Filters". */
  label?: string;
  className?: string;
};

// ── Filter pill ───────────────────────────────────────────────────────────────
// bg #F8F9FD, border 1px #CFDAF7, radius 32px, padding 5px 16px 5px 8px
// [cross 12×12] + [field 10px\nvalue 12px bold]

type FilterPillProps = {
  field: string;
  value: string;
  onRemove?: () => void;
};

function FilterPill({ field, value, onRemove }: FilterPillProps) {
  return (
    <span className={css.pill}>
      {onRemove && (
        <button
          type="button"
          className={css.pillRemove}
          onClick={onRemove}
          aria-label={`Remove filter: ${field} ${value}`}
        >
          <Icon name="cross" size={14} />
        </button>
      )}
      <span className={css.pillText}>
        <span className={css.pillField}>{field}</span>
        <span className={css.pillValue}>{value}</span>
      </span>
    </span>
  );
}

// ── FiltersApplied ────────────────────────────────────────────────────────────

export function FiltersApplied({
  filters,
  onRemove,
  onClearAll,
  label = "Filters",
  className,
}: FiltersAppliedProps) {
  // Applied=False: nothing to show
  if (filters.length === 0) return null;

  return (
    <div className={classNames(css.bar, className)}>
      {/* ── Left: label + Clear all ─────────────────────────────────── */}
      <div className={css.left}>
        <span className={css.label}>{label}</span>
        {onClearAll && (
          <button
            type="button"
            className={css.clearAll}
            onClick={onClearAll}
          >
            <Icon name="filter-clean" size={16} className={css.clearIcon} />
            Clear all
          </button>
        )}
      </div>

      {/* ── Right: filter pills ─────────────────────────────────────── */}
      <div className={css.right}>
        {filters.map((f) => (
          <FilterPill
            key={f.id}
            field={f.field}
            value={f.value}
            onRemove={onRemove ? () => onRemove(f.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
