// SavedFilters — Figma node 6792:167638 (Saved filters component set, Expanded=True)
//
// Combines an Accordion header (expand/collapse) with a wrap row of saved filter pills.
//
// Container: column, gap 8px, padding-bottom 16px, border-bottom 1px #CFDAF7
//
// Header row (layout_J57AGJ): row, justify-between, gap 16px, wrap
//   Left: [chevron-down icon 16×16] + [title: "N saved filters", body-selected #0D2976]
//   Right: reserved slot (empty in Figma, can hold actions)
//
// Pills row (layout_VWNW43): row, wrap, gap 16px, fill width
//   Each pill (.Saved filter → Pill regular new):
//     bg #F8F9FD (--palette-neutral-2), border 1px #CFDAF7, radius 16px
//     padding 8px 12px 8px 8px
//     [remove icon 16×16] + [label, body-unselected #0D2976] + [share icon 16×16]

import React, { useState } from "react";
import classNames from "classnames";
import { Icon } from "../icon/icon";
import css from "./saved_filters.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SavedFilter = {
  id: string;
  label: string;
};

export type SavedFiltersProps = {
  filters: SavedFilter[];
  /** Override the header label. Defaults to "N saved filters" */
  title?: string;
  /** Controlled expand state */
  expanded?: boolean;
  /** Default expand state (uncontrolled) */
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onRemove?: (id: string) => void;
  onShare?: (id: string) => void;
  /** Slot for right-side header actions */
  headerRight?: React.ReactNode;
  className?: string;
};

// ── Filter pill ───────────────────────────────────────────────────────────────
// #F8F9FD bg, 1px #CFDAF7 border, radius 16px, padding 8px 12px 8px 8px
// remove icon + label (body-unselected) + share icon

type FilterPillProps = {
  label: string;
  onRemove?: () => void;
  onShare?: () => void;
};

function FilterPill({ label, onRemove, onShare }: FilterPillProps) {
  return (
    <span className={css.pill}>
      {onRemove && (
        <button
          type="button"
          className={css.pillIconBtn}
          onClick={onRemove}
          aria-label={`Remove ${label}`}
        >
          <Icon name="remove" size={16} />
        </button>
      )}
      <span className={css.pillLabel}>{label}</span>
      {onShare && (
        <button
          type="button"
          className={css.pillIconBtn}
          onClick={onShare}
          aria-label={`Share ${label}`}
        >
          <Icon name="share" size={16} />
        </button>
      )}
    </span>
  );
}

// ── SavedFilters ──────────────────────────────────────────────────────────────

export function SavedFilters({
  filters,
  title,
  expanded: controlledExpanded,
  defaultExpanded = true,
  onExpandedChange,
  onRemove,
  onShare,
  headerRight,
  className,
}: SavedFiltersProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const toggle = () => {
    const next = !expanded;
    if (!isControlled) setInternalExpanded(next);
    onExpandedChange?.(next);
  };

  const headerLabel = title ?? `${filters.length} saved filter${filters.length !== 1 ? "s" : ""}`;

  return (
    <div className={classNames(css.container, className)}>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className={css.header}>
        <button
          type="button"
          className={css.accordionBtn}
          onClick={toggle}
          aria-expanded={expanded}
        >
          <Icon
            name="chevron-down"
            size={16}
            className={classNames(css.chevron, expanded && css.chevronOpen)}
          />
          <span className={css.headerLabel}>{headerLabel}</span>
        </button>
        {headerRight && (
          <div className={css.headerRight}>{headerRight}</div>
        )}
      </div>

      {/* ── Pills ───────────────────────────────────────────────────── */}
      {expanded && filters.length > 0 && (
        <div className={css.pills}>
          {filters.map((f) => (
            <FilterPill
              key={f.id}
              label={f.label}
              onRemove={onRemove ? () => onRemove(f.id) : undefined}
              onShare={onShare ? () => onShare(f.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
