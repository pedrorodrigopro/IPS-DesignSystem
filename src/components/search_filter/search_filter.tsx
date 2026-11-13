// SearchFilter — search box + applied filters + the buttons at the end of the row, in ONE row
//
// Use this for the toolbar row above every list / table instead of laying out InputSearch, FiltersApplied and the buttons by hand.
// Applied filters (FiltersApplied) always go right next to the search box, in this same row, never in a row of their own.
//
// Slots (all optional, left to right):
//   search     InputSearch, width 240 by default (searchWidth)
//   leading    e.g. a sort dropdown (Profiles directory)
//   count      e.g. "8 Roles in 7 Engagements"
//   filters    FiltersApplied: appears when `filters` has entries, renders nothing otherwise
//   actions    the buttons at the end of the row — every screen has its own set (filter, view toggles, bulk, …)

import React from "react";
import classNames from "classnames";
import { InputSearch } from "../input/input";
import { FiltersApplied } from "../filters_applied/filters_applied";
import type { AppliedFilter } from "../filters_applied/filters_applied";
import css from "./search_filter.module.scss";

export type SearchFilterProps = {
  /** Search text */
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  /** Width of the search box. Default 240. */
  searchWidth?: number | string;
  /** Content right after the search box, e.g. a sort dropdown */
  leading?: React.ReactNode;
  /** Count text after the search box, e.g. "874 workforce members" */
  count?: React.ReactNode;
  /** Applied filters. Empty or undefined: the filters area is not rendered. */
  filters?: AppliedFilter[];
  onRemoveFilter?: (id: string) => void;
  onClearFilters?: () => void;
  /** Label before "Clear all". Defaults to "Filters". */
  filtersLabel?: string;
  /** The buttons at the end of the row (each screen has its own) */
  actions?: React.ReactNode;
  className?: string;
};

export function SearchFilter({
  search,
  onSearchChange,
  searchPlaceholder = "Search",
  searchWidth = 240,
  leading,
  count,
  filters,
  onRemoveFilter,
  onClearFilters,
  filtersLabel,
  actions,
  className,
}: SearchFilterProps) {
  const hasFilters = !!filters && filters.length > 0;
  return (
    <div className={classNames(css.row, className)}>
      <div className={css.search} style={{ width: searchWidth }}>
        <InputSearch value={search} onChange={e => onSearchChange(e.target.value)} onClear={() => onSearchChange("")} placeholder={searchPlaceholder} />
      </div>
      {leading && <div className={css.leading}>{leading}</div>}
      {count != null && count !== "" && <span className={css.count}>{count}</span>}
      {hasFilters && (
        <div className={css.filters}>
          <FiltersApplied filters={filters!} onRemove={onRemoveFilter} onClearAll={onClearFilters} label={filtersLabel} />
        </div>
      )}
      {actions && <div className={css.actions}>{actions}</div>}
    </div>
  );
}
