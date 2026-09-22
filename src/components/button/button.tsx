import classNames from "classnames";
import { forwardRef } from "react";
import css from "./button.module.scss";

// Figma nodes:
//   Regular: "Button regular new" (3134:190313) — body-selected, radius 8px, padding 8px 16px
//   Small:   "Button small new"   (5893:33691)  — label-selected, radius 4px, padding 5px 8px
export type ButtonSize = "regular" | "small";

export type ButtonKind =
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive"
  | "ghost"
  | "inverted"
  | "link"
  | "icon"
  | "iconTertiary"
  | "iconGhost";

export type ButtonProps = {
  children?: React.ReactNode;
  text?: string;
  kind?: ButtonKind;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  title?: string;
  id?: string;
  style?: React.CSSProperties;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      text,
      kind = "primary",
      size = "regular",
      disabled = false,
      className,
      onClick,
      type = "button",
      title,
      id,
      style,
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      id={id}
      title={title}
      disabled={disabled}
      style={style}
      onClick={onClick}
      className={classNames(css.button, css[kind], css[size], className)}
    >
      {children ?? text}
    </button>
  )
);

Button.displayName = "Button";
