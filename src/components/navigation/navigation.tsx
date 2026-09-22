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
import classNames from "classnames";
import { Icon } from "../icon/icon";
import css from "./navigation.module.scss";

export type NavigationOrientation = "horizontal" | "vertical";

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
  className?: string;
};

export const Navigation = ({
  orientation = "horizontal",
  tabs,
  activeId,
  onChange,
  className,
}: NavigationProps) => (
  <nav
    className={classNames(css.nav, css[orientation], className)}
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
