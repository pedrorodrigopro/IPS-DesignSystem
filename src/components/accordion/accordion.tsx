import classNames from "classnames";
import { ReactNode, useState } from "react";
import css from "./accordion.module.scss";

export type AccordionProps = {
  title: string;
  children?: ReactNode;
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
    <div className={classNames(css.accordion, className)}>
      <button
        type="button"
        className={classNames(css.header, { [css.expanded]: expanded })}
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {/* chevron-right (collapsed) / chevron-down (expanded) — 16×16px, #0D2976 */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={css.chevron}
          aria-hidden="true"
        >
          {expanded ? (
            /* chevron-down */
            <path d="M4 6L8 10L12 6" stroke="#0D2976" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            /* chevron-right */
            <path d="M6 4L10 8L6 12" stroke="#0D2976" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
        <span className={css.title}>{title}</span>
      </button>
      {expanded && children && (
        <div className={css.content}>{children}</div>
      )}
    </div>
  );
};
