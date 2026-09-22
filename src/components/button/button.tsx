import classNames from "classnames";
import { forwardRef } from "react";
import css from "./button.module.scss";

export type ButtonKind =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "tertiary";

export type ButtonProps = {
  children?: React.ReactNode;
  text?: string;
  kind?: ButtonKind;
  small?: boolean;
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
      small = false,
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
      className={classNames(
        css.button,
        css[kind],
        { [css.small]: small },
        className
      )}
    >
      {children ?? text}
    </button>
  )
);

Button.displayName = "Button";
