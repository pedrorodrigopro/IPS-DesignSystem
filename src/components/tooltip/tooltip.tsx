import classNames from "classnames";
import { ReactNode, useState } from "react";
import css from "./tooltip.module.scss";

export type TooltipPlacement =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right";

export type TooltipVariant = "default" | "activity-feed" | "calendar";

export type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  placement?: TooltipPlacement;
  variant?: TooltipVariant;
  className?: string;
};

export const Tooltip = ({
  content,
  children,
  placement = "top",
  variant = "default",
  className,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={classNames(css.wrapper, className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          className={classNames(
            css.tooltip,
            css[placement.replace("-", "_")],
            css[variant.replace("-", "_")]
          )}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
};
