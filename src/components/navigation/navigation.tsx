// Navigation — Figma nodes:
//   Navigation/Horizontal: 5797:282907 — row, gap 8px
//   Navigation/Vertical:   5797:282954 — column, width 175px, tabs fill width
//   Tab regular new:       5726:39488  — tab item states
//   .Tab master regular:   5726:39441  — optional icon, subtitle, badge
//
// Tab states:
//   Selected:  #E7EAF8 bg, body-selected (Bold 14px), #0D2976 text
//   Default:   transparent, body-unselected (Regular 14px), #5C6E9E text
//   Hover:     rgba(0,0,0,0.04) bg, unselected text
//   Focus:     white bg, double ring focus, unselected text
//   Disabled:  #8F9ED1 text, not interactive
//
// Tab optional slots: icon (check, 16px), subtitle (label-regular), badge (count)
//   Badge active:   #436FB6 bg, white text
//   Badge inactive: #E7EAF8 bg, dark text
//
// ── Marketplace variant (Figma section 7433:239440) ──────────────────────────
// NavigationMarketplace — horizontal dark pill bar used on marketplace/landing screens.
// Container: bg #0C1457, border-radius 16px, row, gap 24px, padding 16px
// Item: icon-only (20×20), all icons white, opacity signals state:
//   Selected: opacity 1.0 (full white)
//   Resting:  opacity 0.4 (dim white)
//   Hover:    opacity 0.7 (mid white)
//   Focus:    opacity 1.0 + box-shadow 0 0 0 2px #2358F8
import classNames from "classnames";
import { Icon, IconName } from "../icon/icon";
import css from "./navigation.module.scss";

export type NavigationOrientation = "horizontal" | "vertical";

// ── Marketing navigation ───────────────────────────────────────────────────────

export type MarketplaceNavItem = {
  id: string;
  icon: IconName;
  label: string; // used as aria-label only; not displayed
};

// Backward-compatible alias
export type MarketingNavItem = MarketplaceNavItem;

export type NavigationMarketplaceProps = {
  items: MarketplaceNavItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
};

// Backward-compatible alias
export type NavigationMarketingProps = NavigationMarketplaceProps;

export const NavigationMarketplace = ({
  items,
  activeId,
  onChange,
  className,
}: NavigationMarketplaceProps) => (
  <nav
    className={classNames(css.marketingNav, className)}
    aria-label="Marketplace navigation"
    role="tablist"
  >
    {items.map((item) => {
      const isActive = item.id === activeId;
      return (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={isActive}
          aria-label={item.label}
          className={classNames(css.marketingItem, { [css.marketingActive]: isActive })}
          onClick={() => onChange?.(item.id)}
        >
          <Icon name={item.icon} size={20} />
        </button>
      );
    })}
  </nav>
);

// Backward-compatible alias
export const NavigationMarketing = NavigationMarketplace;

export type NavigationTab = {
  id: string;
  label: string;
  /** Optional subtitle — shown below label (label-regular 12px) */
  subtitle?: string;
  /** Show check icon to the left of label */
  showIcon?: boolean;
  /** Badge count — shown to the right of label */
  badge?: number;
  disabled?: boolean;
};

export type NavigationProps = {
  orientation?: NavigationOrientation;
  tabs: NavigationTab[];
  activeId?: string;
  onChange?: (id: string) => void;
  /** Each tab stretches to fill equal share of available width */
  fillWidth?: boolean;
  className?: string;
};

export const Navigation = ({
  orientation = "horizontal",
  tabs,
  activeId,
  onChange,
  fillWidth = false,
  className,
}: NavigationProps) => (
  <nav
    className={classNames(css.nav, css[orientation], { [css.fillWidth]: fillWidth }, className)}
    aria-label="Navigation"
    role="tablist"
  >
    {tabs.map((tab) => {
      const isActive = tab.id === activeId;
      return (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={isActive}
          disabled={tab.disabled}
          className={classNames(css.tab, {
            [css.active]: isActive,
            [css.disabled]: tab.disabled,
            [css.tabFillWidth]: fillWidth,
          })}
          onClick={() => !tab.disabled && onChange?.(tab.id)}
        >
          {/* Icon — check mark, 16×16px */}
          {tab.showIcon && (
            <Icon name="check" size={16} className={css.icon} />
          )}

          {/* Texts — title + optional subtitle */}
          <span className={css.texts}>
            <span className={classNames(css.title, { [css.titleActive]: isActive })}>
              {tab.label}
            </span>
            {tab.subtitle && (
              <span className={css.subtitle}>{tab.subtitle}</span>
            )}
          </span>

          {/* Badge — count pill */}
          {tab.badge !== undefined && (
            <span className={classNames(css.badge, { [css.badgeActive]: isActive })}>
              {tab.badge}
            </span>
          )}
        </button>
      );
    })}
  </nav>
);
