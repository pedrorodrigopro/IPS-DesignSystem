// Empty State — Figma node 1527:51923
// Sizes:
//   Big:              column centred, gap 32px — illustration (200×200px) + heading-2 title + heading-5 subtitle + optional buttons
//   Small vertical:   column centred, gap 3px  — missing icon (20×20px) + label-regular text
//   Small horizontal: row, gap 8px             — missing icon + label-regular text (+ optional actions)
// Colour: --palette-blue-2 (#5C6E9E) for small text, --palette-blue-0 for big text
import classNames from "classnames";
import { ReactNode } from "react";
import { Icon } from "../icon/icon";
import css from "./empty_state.module.scss";

export type EmptyStateSize = "big" | "small-vertical" | "small-horizontal";

export type EmptyStateAction = {
  label: string;
  kind?: "primary" | "secondary";
  onClick: () => void;
};

export type EmptyStateProps = {
  size?: EmptyStateSize;
  /** Big: heading-2 title. Small: label-regular text. */
  title: string;
  /** Big only: heading-5 subtitle */
  subtitle?: string;
  /** Big: custom illustration node (200×200px). Small: uses "missing" icon. */
  illustration?: ReactNode;
  /** Optional action buttons (up to 2) */
  actions?: [EmptyStateAction?, EmptyStateAction?];
  /** Small: show the missing icon (default true) */
  showIcon?: boolean;
  className?: string;
};

export const EmptyState = ({
  size = "small-vertical",
  title,
  subtitle,
  illustration,
  actions,
  showIcon = true,
  className,
}: EmptyStateProps) => {
  const filteredActions = actions?.filter((a): a is EmptyStateAction => !!a) ?? [];

  if (size === "big") {
    return (
      <div className={classNames(css.big, className)}>
        {illustration && (
          <div className={css.illustration}>{illustration}</div>
        )}
        <div className={css.bigTexts}>
          <span className={css.bigTitle}>{title}</span>
          {subtitle && <span className={css.bigSubtitle}>{subtitle}</span>}
        </div>
        {filteredActions.length > 0 && (
          <div className={css.bigActions}>
            {filteredActions.map((action, i) => (
              <button
                key={i}
                type="button"
                className={classNames(css.actionBtn, css[action.kind ?? "primary"])}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (size === "small-horizontal") {
    return (
      <div className={classNames(css.smallHorizontal, className)}>
        {showIcon && <Icon name="missing" size={20} className={css.smallIcon} />}
        <span className={css.smallText}>{title}</span>
        {filteredActions.length > 0 && (
          <div className={css.smallActions}>
            {filteredActions.map((action, i) => (
              <button
                key={i}
                type="button"
                className={classNames(css.actionBtn, css[action.kind ?? "primary"])}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // small-vertical (default)
  return (
    <div className={classNames(css.smallVertical, className)}>
      {showIcon && <Icon name="missing" size={20} className={css.smallIcon} />}
      <span className={css.smallText}>{title}</span>
      {filteredActions.length > 0 && (
        <div className={css.smallActions}>
          {filteredActions.map((action, i) => (
            <button
              key={i}
              type="button"
              className={classNames(css.actionBtn, css[action.kind ?? "primary"])}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
