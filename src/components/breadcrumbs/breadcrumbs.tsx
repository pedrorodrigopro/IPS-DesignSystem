// Breadcrumbs — Figma node 4379:234729
// Links use Button small new / Type=Link (label-bold, --palette-primary-0)
// Separator "/" uses label-regular, --palette-blue-0
// Current page uses label-bold, --palette-blue-0 (no underline, not clickable)
import classNames from "classnames";
import css from "./breadcrumbs.module.scss";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className={classNames(css.breadcrumbs, className)}>
    <ol className={css.list}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={index} className={css.item}>
            {isLast ? (
              // Current page — label-bold, --palette-blue-0, not a link
              <span className={css.current} aria-current="page">
                {item.label}
              </span>
            ) : (
              // Ancestor — Button small new / Type=Link
              <>
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className={css.link}
                >
                  {item.label}
                </a>
                <span className={css.separator} aria-hidden="true">/ </span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
