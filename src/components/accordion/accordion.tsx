import classNames from "classnames";
import { ReactNode, useState } from "react";
import { Icon } from "../icon/icon";
import css from "./accordion.module.scss";

// Size variants from .Accordion label (node 11262:130821)
export type AccordionSize = "body" | "heading5" | "heading4";

export type AccordionProps = {
  title: string;
  size?: AccordionSize;
  children?: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
};

export const Accordion = ({
  title,
  size = "body",
  children,
  defaultExpanded = false,
  className,
}: AccordionProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={classNames(css.accordion, className)}>
      <button
        type="button"
        className={classNames(css.header, { [css.expanded]: expanded })}
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <Icon
          name={expanded ? "chevron-down" : "chevron-right"}
          size={16}
          className={css.chevron}
        />
        <span className={classNames(css.title, css[size])}>{title}</span>
      </button>
      {expanded && children && (
        <div className={css.content}>{children}</div>
      )}
    </div>
  );
};
