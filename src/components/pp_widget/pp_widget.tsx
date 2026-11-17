// PPWidget — in-page ProPilot widget
//
// The glass gradient of the floating PPWindow, as a block that sits in the page (a dashboard tile that is clearly ProPilot's).
// Header: the ProPilot mark, a title, an optional subtitle and optional right-hand content. `children` go below, laid out in `columns` columns
// (default 2): use PPSuggestionCard in its "dark" variant, one per suggestion.

import React from "react";
import classNames from "classnames";
import { ProPilotMark } from "../pp_window/pp_window";
import css from "./pp_widget.module.scss";

export type PPWidgetProps = {
  /** Header title. Default "ProPilot suggestions". */
  title?: string;
  /** Line under the title */
  subtitle?: string;
  /** Content at the right of the header (e.g. a count or a link) */
  rightContent?: React.ReactNode;
  /** Number of columns the children are laid out in. Default 2. */
  columns?: number;
  children?: React.ReactNode;
  className?: string;
};

export function PPWidget({ title = "ProPilot suggestions", subtitle, rightContent, columns = 2, children, className }: PPWidgetProps) {
  return (
    <section className={classNames(css.widget, className)} aria-label={title}>
      <div className={css.header}>
        <div className={css.brand}>
          <ProPilotMark />
          <div className={css.titles}>
            <span className={css.title}>{title}</span>
            {subtitle && <span className={css.subtitle}>{subtitle}</span>}
          </div>
        </div>
        {rightContent && <div className={css.right}>{rightContent}</div>}
      </div>
      <div className={css.body} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>{children}</div>
    </section>
  );
}
