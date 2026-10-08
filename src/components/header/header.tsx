// Header — Figma node 1506:25833 (Header component set)
//
// 6 variants: Size × Actions
//   Size=Page    — Heading 1 (600 32px), Button regular (h=32px), left icon 28×28
//   Size=Section — Heading 2 (600 28px), Button regular (h=32px), left icon 20×20
//   Size=Content — Heading 4 (600 20px), Button small,            left icon 20×20
//
// Structure: column layout
//   Line 1 (always): row, justify-between
//     Left:  [left icon?] [title] [right icon?]   — row, gap 8px, align center
//     Right: [action buttons]                       — row, gap 8px (Actions=True only)
//   Line 2 (optional): subtitle text (body-unselected, #5C6E9E)
//
// Title colour: #0D2976
// Subtitle colour: #5C6E9E (--palette-blue-2)
// Actions: up to 3 buttons — typically [secondary...] [primary]
//          Page/Section use Button regular; Content uses Button small
//
// Property flags (from Figma component set):
//   Show Left Icon, Show Right Icon, Show Line 2, Show Updated, Show Sorting, Show Segment

import React, { ReactNode } from "react";
import classNames from "classnames";
import { Icon, IconName, IconSize } from "../icon/icon";
import css from "./header.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type HeaderSize = "page" | "section" | "content";

export type HeaderAction = {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  /** For icon-only buttons */
  icon?: IconName;
};

export type HeaderProps = {
  /** Controls title size: page=H1, section=H2, content=H4 */
  size?: HeaderSize;
  title: string;
  /** Optional subtitle — shown below the title row (body-unselected, muted) */
  subtitle?: string;
  /** Icon to the left of the title */
  leftIcon?: IconName;
  /** Icon to the right of the title */
  rightIcon?: IconName;
  /** Action buttons on the right side of line 1 */
  actions?: HeaderAction[];
  /** Additional right-side content (e.g. segment selector, sort dropdown) */
  rightContent?: ReactNode;
  className?: string;
};

// ── Action button ─────────────────────────────────────────────────────────────

function ActionButton({
  action,
  size,
}: {
  action: HeaderAction;
  size: HeaderSize;
}) {
  const isSmall = size === "content";
  return (
    <button
      type="button"
      className={classNames(
        css.actionBtn,
        isSmall ? css.actionBtnSmall : css.actionBtnRegular,
        action.variant === "primary" ? css.primary : css.secondary
      )}
      onClick={action.onClick}
      aria-label={action.icon && !action.label ? action.label : undefined}
    >
      {action.icon && !action.label && (
        <Icon name={action.icon} size={16} />
      )}
      {action.label}
    </button>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

export function Header({
  size = "content",
  title,
  subtitle,
  leftIcon,
  rightIcon,
  actions,
  rightContent,
  className,
}: HeaderProps) {
  const hasRight = (actions && actions.length > 0) || rightContent;
  const iconSize: IconSize = size === "page" ? 24 : 20;

  return (
    <div className={classNames(css.header, css[size], className)}>
      {/* ── Line 1 ──────────────────────────────────────────────────── */}
      <div className={classNames(css.line1, { [css.line1WithRight]: hasRight })}>
        {/* Left: icon + title + right-of-title icon */}
        <div className={css.left}>
          {leftIcon && (
            <Icon name={leftIcon} size={iconSize} className={css.titleIcon} />
          )}
          <span className={classNames(css.title, css[`title-${size}`])}>
            {title}
          </span>
          {rightIcon && (
            <Icon name={rightIcon} size={iconSize} className={css.titleIcon} />
          )}
        </div>

        {/* Right: actions + extra content */}
        {hasRight && (
          <div className={css.right}>
            {rightContent}
            {actions && actions.map((action, i) => (
              <ActionButton key={action.label + i} action={action} size={size} />
            ))}
          </div>
        )}
      </div>

      {/* ── Line 2: subtitle ────────────────────────────────────────── */}
      {subtitle && (
        <div className={css.line2}>
          <span className={css.subtitle}>{subtitle}</span>
        </div>
      )}
    </div>
  );
}
