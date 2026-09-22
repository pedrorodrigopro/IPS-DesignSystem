import classNames from "classnames";
import css from "./divider.module.scss";

export type DividerProps = {
  vertical?: boolean;
  className?: string;
};

export const Divider = ({ vertical = false, className }: DividerProps) => (
  <hr className={classNames(css.divider, { [css.vertical]: vertical }, className)} />
);
