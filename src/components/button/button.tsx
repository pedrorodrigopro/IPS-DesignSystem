import classNames from "classnames";
import { forwardRef } from "react";
import css from "./button.module.scss";

// Variant names match Figma "Button regular new" component set (node 3134:190313)
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
      className={classNames(css.button, css[kind], className)}
    >
      {children ?? text}
    </button>
  )
);

Button.displayName = "Button";
