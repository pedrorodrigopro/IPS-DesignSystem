// Dropdown — Figma nodes 1671:37795 (item), 1671:37903 (actions), 11580:76761 (multi),
//            10332:397347 (icons), 4988:280212 (booking category), 12228:371904 (WM)
//
// Shared anatomy:
//   Card: white bg, radius 8px, shadow "0 0 4px rgba(203,225,242,0.8)", padding 8px
//   Item: row, padding 4px 12px, radius 12px, hover rgba(0,0,0,0.04)
//   Line 1: body-unselected (14px/400), --palette-blue-0
//   Line 2: label-regular (12px/400), --palette-blue-2
//   Selected: checkmark + body-selected (14px/Bold)
import classNames from "classnames";
import { ReactNode, useState } from "react";
import { Avatar } from "../avatar/avatar";
import { Icon, IconName } from "../icon/icon";
import css from "./dropdown.module.scss";

// ── Shared item type ──────────────────────────────────────────────────────────

export type DropdownItem = {
  id: string;
  label: string;
  subLabel?: string;
};

// ── Actions dropdown ──────────────────────────────────────────────────────────
// Plain list of clickable labels, no selection state

export type DropdownActionsProps = {
  items: DropdownItem[];
  onSelect: (id: string) => void;
  className?: string;
};

export const DropdownActions = ({ items, onSelect, className }: DropdownActionsProps) => (
  <div className={classNames(css.card, className)}>
    <div className={css.list}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={css.item}
          onClick={() => onSelect(item.id)}
        >
          {/* Wrap in texts column so line2 appears below line1 */}
          <span className={css.texts}>
            <span className={css.line1}>{item.label}</span>
            {item.subLabel && <span className={css.line2}>{item.subLabel}</span>}
          </span>
        </button>
      ))}
    </div>
  </div>
);

// ── Single selection dropdown ─────────────────────────────────────────────────
// Items with checkmark when selected

export type DropdownSelectionProps = {
  items: DropdownItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  className?: string;
};

export const DropdownSelection = ({ items, selectedId, onSelect, className }: DropdownSelectionProps) => (
  <div className={classNames(css.card, className)}>
    <div className={css.list}>
      {items.map((item) => {
        const isSelected = item.id === selectedId;
        return (
          <button
            key={item.id}
            type="button"
            className={classNames(css.item, css.itemSelection)}
            onClick={() => onSelect(item.id)}
            aria-pressed={isSelected}
          >
            <span className={css.checkSlot}>
              {isSelected && <Icon name="check" size={16} className={css.checkIcon} />}
            </span>
            <span className={css.texts}>
              <span className={classNames(css.line1, { [css.line1Selected]: isSelected })}>
                {item.label}
              </span>
              {item.subLabel && <span className={css.line2}>{item.subLabel}</span>}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

// ── Visual-only checkbox box (no label, no input — for use inside buttons) ────
const VisualCheckbox = ({ checked, indeterminate }: { checked: boolean; indeterminate?: boolean }) => (
  <span className={classNames(css.visualBox, { [css.visualBoxChecked]: checked || indeterminate })} aria-hidden="true">
    {checked && !indeterminate && (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
    {indeterminate && (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6H9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )}
  </span>
);

// ── Multi-selection dropdown ──────────────────────────────────────────────────
// Search box + "Select all" + checkboxes per item

export type DropdownMultiSelectionProps = {
  items: DropdownItem[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  searchable?: boolean;
  className?: string;
};

export const DropdownMultiSelection = ({
  items,
  selectedIds,
  onSelectionChange,
  searchable = true,
  className,
}: DropdownMultiSelectionProps) => {
  const [query, setQuery] = useState("");
  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
  const allSelected = items.every((item) => selectedIds.includes(item.id));
  const someSelected = items.some((item) => selectedIds.includes(item.id));

  const toggleAll = () => {
    onSelectionChange(allSelected ? [] : items.map((i) => i.id));
  };

  const toggleItem = (id: string) => {
    onSelectionChange(
      selectedIds.includes(id)
        ? selectedIds.filter((s) => s !== id)
        : [...selectedIds, id]
    );
  };

  return (
    <div className={classNames(css.card, className)}>
      {searchable && (
        <div className={css.searchRow}>
          <input
            type="search"
            className={css.searchInput}
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
          <Icon name="search" size={16} className={css.searchIcon} />
        </div>
      )}
      <div className={css.list}>
        {/* Select all */}
        <button
            type="button"
            className={classNames(css.item, css.itemSelection)}
            onClick={toggleAll}
          >
            <VisualCheckbox checked={allSelected} indeterminate={someSelected && !allSelected} />
            <span className={css.texts}>
              <span className={css.line1}>
                Select all ({items.length})
              </span>
            </span>
          </button>
          {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            className={classNames(css.item, css.itemSelection)}
            onClick={() => toggleItem(item.id)}
          >
            <VisualCheckbox checked={selectedIds.includes(item.id)} />
            <span className={css.texts}>
              <span className={css.line1}>{item.label}</span>
              {item.subLabel && <span className={css.line2}>{item.subLabel}</span>}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Icons selection dropdown ──────────────────────────────────────────────────
// Grid of icons — used for booking category icon picker

export type DropdownIconsProps = {
  icons: IconName[];
  selectedIcon?: IconName;
  onSelect: (icon: IconName) => void;
  className?: string;
};

export const DropdownIcons = ({ icons, selectedIcon, onSelect, className }: DropdownIconsProps) => (
  <div className={classNames(css.card, className)}>
    <div className={css.iconGrid}>
      {icons.map((name) => (
        <button
          key={name}
          type="button"
          className={classNames(css.iconCell, { [css.iconCellSelected]: name === selectedIcon })}
          onClick={() => onSelect(name)}
          aria-label={name}
          aria-pressed={name === selectedIcon}
          title={name}
        >
          <Icon name={name} size={20} />
        </button>
      ))}
    </div>
  </div>
);

// ── Booking category dropdown ─────────────────────────────────────────────────
// Label + colour pill per row

export type BookingCategoryItem = {
  id: string;
  label: string;
  color: string; // CSS colour value
};

export type DropdownBookingCategoryProps = {
  items: BookingCategoryItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  className?: string;
};

export const DropdownBookingCategory = ({
  items,
  selectedId,
  onSelect,
  className,
}: DropdownBookingCategoryProps) => (
  <div className={classNames(css.card, className)}>
    <div className={css.list}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={classNames(css.item, css.itemCategory)}
          onClick={() => onSelect(item.id)}
          aria-pressed={item.id === selectedId}
        >
          <span className={css.line1}>{item.label}</span>
          <span
            className={css.colorPill}
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  </div>
);

// ── WM (Workforce Member) dropdown ────────────────────────────────────────────
// Search + avatar + name (bold) + email/subLabel

export type WMItem = {
  id: string;
  name: string;
  subLabel?: string;
  avatarSrc?: string;
  initials?: string;
  avatarColor?: string;
  isGroup?: boolean;
};

export type DropdownWMProps = {
  items: WMItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  searchable?: boolean;
  className?: string;
};

export const DropdownWM = ({
  items,
  selectedId,
  onSelect,
  searchable = true,
  className,
}: DropdownWMProps) => {
  const [query, setQuery] = useState("");
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.subLabel?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={classNames(css.card, className)}>
      {searchable && (
        <div className={css.searchRow}>
          <input
            type="search"
            className={css.searchInput}
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
          <Icon name="search" size={16} className={css.searchIcon} />
        </div>
      )}
      <div className={css.list}>
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            className={classNames(css.item, css.itemWM)}
            onClick={() => onSelect(item.id)}
            aria-pressed={item.id === selectedId}
          >
            {item.isGroup ? (
              <span className={css.wmGroupIcon}>
                <Icon name="search" size={20} />
              </span>
            ) : (
              <Avatar
                size="small"
                initials={item.initials}
                src={item.avatarSrc}
                className={css.wmAvatar}
              />
            )}
            <span className={css.texts}>
              <span className={css.line1Selected}>{item.name}</span>
              {item.subLabel && <span className={css.line2}>{item.subLabel}</span>}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Typeahead / autocomplete dropdown (6567:48581) ────────────────────────────
// search-ac-dropdown: mixed-type search results with bold matched term,
// type label (PROFILE / ENGAGEMENT / ROLE), open icon, "See all results" link
//
// Card: white, radius 8px, shadow 0 6px 12px rgba(27,72,195,0.2), padding 8px
// Item row: padding 4px 8px, gap 10px, width fills card
//   Left:  icon 20×20px + title (body-unselected, matched term bold) + subtext
//   Right: type label (label-unselected uppercase, #5C6E9E) + open icon
//   Search item: no RIGHT section

export type TypeaheadResultType = "profile" | "engagement" | "role" | "search";

export type TypeaheadResult = {
  id: string;
  type: TypeaheadResultType;
  /** Full label — matched portion shown bold, rest regular */
  label: string;
  /** Bold portion (matched query) — rendered bold, rest of label is regular */
  matchedPart?: string;
  subLabel?: string;
  onOpen?: () => void;
};

const TYPE_ICON: Record<TypeaheadResultType, IconName> = {
  profile:    "profile",
  engagement: "engagement",
  role:       "role",
  search:     "search",
};

const TYPE_LABEL: Record<TypeaheadResultType, string> = {
  profile:    "PROFILE",
  engagement: "ENGAGEMENT",
  role:       "ROLE",
  search:     "",
};

export type DropdownTypeaheadProps = {
  results: TypeaheadResult[];
  onSelect: (id: string) => void;
  onSeeAll?: () => void;
  className?: string;
};

export const DropdownTypeahead = ({
  results,
  onSelect,
  onSeeAll,
  className,
}: DropdownTypeaheadProps) => (
  <div className={classNames(css.card, css.typeaheadCard, className)}>
    <div className={css.typeaheadList}>
      {results.map((result) => {
        const icon = TYPE_ICON[result.type];
        const typeLabel = TYPE_LABEL[result.type];
        const showRight = result.type !== "search";

        // Split label into matched (bold) + rest (regular)
        const { label, matchedPart } = result;
        let boldPart = matchedPart ?? "";
        let regularPart = label;
        if (boldPart && label.toLowerCase().startsWith(boldPart.toLowerCase())) {
          boldPart = label.slice(0, boldPart.length);
          regularPart = label.slice(boldPart.length);
        } else {
          boldPart = "";
          regularPart = label;
        }

        return (
          <button
            key={result.id}
            type="button"
            className={css.typeaheadItem}
            onClick={() => onSelect(result.id)}
          >
            {/* Left: icon + body */}
            <span className={css.typeaheadLeft}>
              <Icon name={icon} size={20} className={css.typeaheadIcon} />
              <span className={css.typeaheadBody}>
                <span className={css.typeaheadTitle}>
                  {boldPart && <strong className={css.typeaheadBold}>{boldPart}</strong>}
                  {regularPart}
                </span>
                {result.subLabel && (
                  <span className={css.typeaheadSub}>{result.subLabel}</span>
                )}
              </span>
            </span>
            {/* Right: type label + open icon */}
            {showRight && (
              <span className={css.typeaheadRight}>
                <span className={css.typeaheadTypeLabel}>{typeLabel}</span>
                <button
                  type="button"
                  className={css.typeaheadOpenBtn}
                  onClick={(e) => { e.stopPropagation(); result.onOpen?.(); }}
                  aria-label={`Open ${result.label}`}
                >
                  <Icon name="open" size={16} className={css.typeaheadOpenIcon} />
                </button>
              </span>
            )}
          </button>
        );
      })}
    </div>
    {onSeeAll && (
      <button type="button" className={css.typeaheadSeeAll} onClick={onSeeAll}>
        See all results
      </button>
    )}
  </div>
);

// Re-export a unified Dropdown type for convenience
export type DropdownVariant = "actions" | "selection" | "multi" | "icons" | "booking-category" | "wm";

// Generic trigger wrapper (not in Figma — just for stories to show open state)
export type DropdownProps = {
  variant: DropdownVariant;
  children: ReactNode;
  className?: string;
};

export const Dropdown = ({ children, className }: DropdownProps) => (
  <div className={classNames(css.dropdownWrapper, className)}>
    {children}
  </div>
);
