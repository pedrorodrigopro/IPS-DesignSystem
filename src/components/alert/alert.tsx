import classNames from "classnames";
import { ReactNode } from "react";
import css from "./alert.module.scss";

// Type colours — Figma node 2802:170745 (Notification/Alert)
export type AlertType =
  | "error"       // #FFE2E2
  | "warning"     // #FFE8AD
  | "success"     // #C8EEDE
  | "general"     // #E7EAF8
  | "ai"          // #CFDAF7
  | "bulk-banner"; // #E7F9FE

// Layout variants — Figma node 5047:257830 (.Notification/Alert master)
// Header=False: single row — icon + text left, actions right
// Header=True:  column — bold title, body paragraph, actions below
export type AlertLayout = "inline" | "with-header";

export type AlertAction = {
  label: string;
  onClick: () => void;
};

export type AlertProps = {
  type?: AlertType;
  layout?: AlertLayout;
  /** Main message (inline) or bold title (with-header) */
  message: string;
  /** Body paragraph — only shown when layout="with-header" */
  body?: string;
  /** Up to 2 action buttons */
  actions?: [AlertAction?, AlertAction?];
  className?: string;
};

// Per-type icons as inline SVGs matching Figma icon references (20×20px)
const icons: Record<AlertType, ReactNode> = {
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#0D2976" />
      <path d="M10 6v5M10 14h.01" stroke="#FFE2E2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M9.134 3.5a1 1 0 0 1 1.732 0l7.294 12.5A1 1 0 0 1 17.294 17.5H2.706a1 1 0 0 1-.866-1.5L9.134 3.5Z" fill="#0D2976" />
      <path d="M10 8v4M10 14h.01" stroke="#FFE8AD" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10.5L8 14.5L16 7" stroke="#0D2976" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  general: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#0D2976" />
      <path d="M10 9v5M10 7h.01" stroke="#E7EAF8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  ai: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3l1.5 4.5L16 9l-4.5 1.5L10 15l-1.5-4.5L4 9l4.5-1.5L10 3Z" fill="#0D2976" />
    </svg>
  ),
  "bulk-banner": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5L15 15M15 5L5 15" stroke="#0D2976" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  ),
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

  if (layout === "with-header") {
    return (
      <div className={classNames(css.alert, typeClass, css.withHeader, className)} role="alert">
        <div className={css.headerRow}>
          {icons[type]}
          <span className={css.headerText}>{message}</span>
        </div>
        {body && <p className={css.body}>{body}</p>}
        {actions && actions.length > 0 && (
          <div className={css.actionsBottom}>
            {actions.filter(Boolean).map((action, i) => (
              <button key={i} type="button" className={css.actionBtn} onClick={action!.onClick}>
                {action!.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={classNames(css.alert, typeClass, css.inline, className)} role="alert">
      <div className={css.left}>
        {icons[type]}
        <span className={css.message}>{message}</span>
      </div>
      {actions && actions.length > 0 && (
        <div className={css.actionsRight}>
          {actions.filter(Boolean).map((action, i) => (
            <button key={i} type="button" className={css.actionBtn} onClick={action!.onClick}>
              {action!.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
