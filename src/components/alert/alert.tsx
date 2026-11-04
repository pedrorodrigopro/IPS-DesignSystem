import type { ReactNode } from "react";
import classNames from "classnames";
import { Icon } from "../icon/icon";
import css from "./alert.module.scss";

// Type → background colours — Figma node 2802:170745 (Notification/Alert)
export type AlertType =
  | "error"        // bg: --palette-red-2    icon: --palette-red-0
  | "warning"      // bg: --palette-orange-2 icon: --palette-orange-1
  | "success"      // bg: --palette-green-2  icon: --palette-green-0
  | "general"      // bg: --palette-neutral-1 icon: --palette-blue-0
  | "ai"           // bg: --palette-neutral-0 icon: --palette-blue-0
  | "bulk-banner"  // bg: --palette-primary-3 icon: --palette-blue-0
  | "misalignment"; // bg: orange-3 tint     icon: calendar-delete, --palette-orange-3

// Layout variants — Figma node 5047:257830 (.Notification/Alert master)
// "inline"      → Header=False: row, icon + text left, optional actions right
// "with-header" → Header=True: column, bold title, body paragraph, optional actions below
export type AlertLayout = "inline" | "with-header";

export type AlertAction = {
  label: string;
  onClick: () => void;
};

export type AlertProps = {
  type?: AlertType;
  layout?: AlertLayout;
  /** Inline: message text. With-header: bold title. */
  message: string;
  /** Body paragraph — only rendered when layout="with-header" */
  body?: string;
  /** Up to 2 action buttons (Ghost style). Optional in both layouts. */
  actions?: [AlertAction?, AlertAction?];
  /** bulk-banner only: makes the leading cross a clickable close button (e.g. clears the selection) */
  onClose?: () => void;
  /** Inline layout only: custom content on the right (e.g. icon buttons for bulk actions) */
  rightContent?: ReactNode;
  className?: string;
};

// Icon name per type — Figma node 2976:181531
const typeIconName: Record<AlertType, Parameters<typeof Icon>[0]["name"]> = {
  error:         "error",
  warning:       "warning",
  success:       "check",
  general:       "info",
  ai:            "ai",
  "bulk-banner": "cross",
  misalignment:  "calendar-delete",
};

const typeClass = (type: AlertType) =>
  type === "bulk-banner" ? css.bulk_banner : css[type];

const Actions = ({ actions, className }: { actions: AlertAction[]; className: string }) => (
  <div className={className}>
    {actions.map((action, i) => (
      <button key={i} type="button" className={css.actionBtn} onClick={action.onClick}>
        {action.label}
      </button>
    ))}
  </div>
);

export const Alert = ({
  type = "general",
  layout = "inline",
  message,
  body,
  actions,
  onClose,
  rightContent,
  className,
}: AlertProps) => {
  const filteredActions = actions?.filter((a): a is AlertAction => !!a) ?? [];
  const tc = typeClass(type);

  if (layout === "with-header") {
    return (
      <div className={classNames(css.alert, tc, css.withHeader, className)} role="alert">
        <div className={css.headerRow}>
          <span className={classNames(css.iconWrap, tc)}>
            <Icon name={typeIconName[type]} size={20} />
          </span>
          <span className={css.headerText}>{message}</span>
        </div>
        {body && <p className={css.body}>{body}</p>}
        {filteredActions.length > 0 && (
          <Actions actions={filteredActions} className={css.actionsBottom} />
        )}
      </div>
    );
  }

  return (
    <div className={classNames(css.alert, tc, css.inline, className)} role="alert">
      <div className={css.left}>
        {type === "bulk-banner" && onClose ? (
          <button type="button" className={classNames(css.closeBtn, css.iconWrap, tc)} onClick={onClose} aria-label="Clear selection">
            <Icon name="cross" size={24} />
          </button>
        ) : (
          <span className={classNames(css.iconWrap, tc)}>
            <Icon name={typeIconName[type]} size={20} />
          </span>
        )}
        <span className={css.message}>{message}</span>
      </div>
      {filteredActions.length > 0 && (
        <Actions actions={filteredActions} className={css.actionsRight} />
      )}
      {rightContent && <div className={css.actionsRight}>{rightContent}</div>}
    </div>
  );
};
