import classNames from "classnames";
import { ReactNode, useState } from "react";
import css from "./accordion.module.scss";

export type AccordionProps = {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
};

export const Accordion = ({
  title,
  children,
  defaultExpanded = false,
  className,
}: AccordionProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={classNames(css.accordion, { [css.expanded]: expanded }, className)}>
      <button
        className={css.header}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        type="button"
      >
        <svg
          className={classNames(css.icon, { [css.rotated]: expanded })}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d={expanded ? "M4 6L8 10L12 6" : "M6 4L10 8L6 12"}
            stroke="#0D2976"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={css.title}>{title}</span>
      </button>
      {expanded && <div className={css.content}>{children}</div>}
    </div>
  );
};
