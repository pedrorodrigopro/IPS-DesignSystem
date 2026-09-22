// Pagination — Figma nodes 14220:3895 (Pagination) + 1690:49203 (Pagination item)
//
// Two variants:
//   Regular=True  (big):   items padding 8px 12px
//   Regular=False (small): items padding 0px 12px (no vertical padding)
//
// Item states (Pagination item — 1690:49203):
//   Default:  #E7EAF8 bg, label-regular (12px/400/150%), #0D2976 text
//   Hover:    rgba(0,0,0,0.04) bg
//   Focus:    double ring
//   Active:   #0C1457 bg, label-bold (12px/700/150%), white text
//
// Step border-radius:
//   First:  16px 2px 2px 16px  (left pill cap)
//   Middle: 2px                 (square)
//   Last:   2px 16px 16px 2px  (right pill cap)
//
// Container: row, gap 4px
import classNames from "classnames";
import css from "./pagination.module.scss";

export type PaginationSize = "regular" | "small";

export type PaginationProps = {
  /** Total number of pages */
  total: number;
  /** Currently active page (1-indexed) */
  current: number;
  onChange: (page: number) => void;
  size?: PaginationSize;
  className?: string;
};

// Build the page list: always show first, last, current ± 1, with ellipsis
function buildPages(current: number, total: number): (number | "...")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "...")[] = [1];
  if (current > 3) { pages.push("..."); }
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) { pages.push("..."); }
  pages.push(total);
  return pages;
}

export const Pagination = ({
  total,
  current,
  onChange,
  size = "regular",
  className,
}: PaginationProps) => {
  const pages = buildPages(current, total);

  return (
    <nav className={classNames(css.pagination, className)} aria-label="Pagination">
      {pages.map((page, index) => {
        const isFirst = index === 0;
        const isLast = index === pages.length - 1;
        const isActive = page === current;
        const isEllipsis = page === "...";

        const step = isFirst ? "first" : isLast ? "last" : "middle";

        return (
          <button
            key={`${page}-${index}`}
            type="button"
            className={classNames(
              css.item,
              css[step],
              css[size],
              {
                [css.active]: isActive,
                [css.ellipsis]: isEllipsis,
              }
            )}
            onClick={() => !isEllipsis && onChange(page as number)}
            aria-label={isEllipsis ? "More pages" : `Page ${page}`}
            aria-current={isActive ? "page" : undefined}
            disabled={isEllipsis}
          >
            {isEllipsis ? "..." : String(page).padStart(2, "0")}
          </button>
        );
      })}
    </nav>
  );
};
