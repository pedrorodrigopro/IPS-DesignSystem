import classNames from "classnames";
import { ReactNode } from "react";
import { Icon } from "../icon/icon";
import css from "./alert.module.scss";

// Type → background colours — Figma node 2802:170745 (Notification/Alert)
export type AlertType =
  | "error"        // #FFE2E2
  | "warning"      // #FFE8AD
  | "success"      // #C8EEDE
  | "general"      // #E7EAF8
  | "ai"           // #CFDAF7
  | "bulk-banner"; // #E7F9FE

// Layout variants — Figma node 5047:257830 (.Notification/Alert master)
// "inline"      → Header=False: row, icon + text left, optional actions right
// "with-header" → Header=True:  column, bold title, body paragraph, optional actions below
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
  className?: string;
};

// Icon names per type — real Figma icon components from node 2976:181531
const typeIcons: Record<AlertType, ReactNode> = {
  error: <Icon name="error" size={20} />,
  warning: <Icon name="warning" size={20} />,
  success: <Icon name="check" size={20} />,
  general: <Icon name="info" size={20} />,
  ai: <Icon name="ai" size={20} />,
  "bulk-banner": <Icon name="cross" size={20} />,
};

export const Alert = ({
  type = "general",
  layout = "inline",
  message,
  body,
  actions,
  className,
}: AlertProps) => {
  const typeClass = type === "bulk-banner" ? css.bulk_banner : css[type];
  const filteredActions = actions?.filter((a): a is AlertAction => !!a) ?? [];

  if (layout === "with-header") {
    return (
      <div
        className={classNames(css.alert, typeClass, css.withHeader, className)}
        role="alert"
      >
        <div className={css.headerRow}>
          {typeIcons[type]}
          <span className={css.headerText}>{message}</span>
        </div>
        {body && <p className={css.body}>{body}</p>}
        {filteredActions.length > 0 && (
          <div className={css.actionsBottom}>
            {filteredActions.map((action, i) => (
              <button
                key={i}
                type="button"
                className={css.actionBtn}
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

  return (
    <div
      className={classNames(css.alert, typeClass, css.inline, className)}
      role="alert"
    >
      <div className={css.left}>
        {typeIcons[type]}
        <span className={css.message}>{message}</span>
      </div>
      {filteredActions.length > 0 && (
        <div className={css.actionsRight}>
          {filteredActions.map((action, i) => (
            <button
              key={i}
              type="button"
              className={css.actionBtn}
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
