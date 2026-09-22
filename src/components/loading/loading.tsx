// Loading — Figma nodes 1890:123451 (overlay) + 1981:166760 (icon)
//
// Overlay: full-screen, rgba(248,249,253,0.75) bg, 3 animated dots centred,
//          padding-top 160px, dots gap 16px, dot size 24×24px, colour #0C1457
//
// Icon: 32×32px container, 3 dots in a row, gap 4px, dot 8×8px, colour #0C1457
//       Used inline e.g. in buttons or table cells
import classNames from "classnames";
import css from "./loading.module.scss";

// ── Loading dots (shared animation) ──────────────────────────────────────────
// Three dots that animate with a staggered bounce

type DotsProps = {
  size?: "overlay" | "icon"; // overlay: 24px dots | icon: 8px dots
};

const Dots = ({ size = "overlay" }: DotsProps) => (
  <div className={classNames(css.dots, css[`dots_${size}`])} aria-label="Loading" role="status">
    <span className={classNames(css.dot, css.dot1)} />
    <span className={classNames(css.dot, css.dot2)} />
    <span className={classNames(css.dot, css.dot3)} />
  </div>
);

// ── Loading overlay (1890:123451) ─────────────────────────────────────────────
// Full-screen translucent overlay with centred dots, padding-top 160px

export type LoadingOverlayProps = {
  /** Whether the overlay is visible */
  visible?: boolean;
  className?: string;
};

export const LoadingOverlay = ({ visible = true, className }: LoadingOverlayProps) => {
  if (!visible) { return null; }
  return (
    <div className={classNames(css.overlay, className)} aria-live="polite">
      <Dots size="overlay" />
    </div>
  );
};

// ── Loading icon (1981:166760) ────────────────────────────────────────────────
// Inline 32×32px animated dots — for use inside buttons, cells, etc.

export type LoadingIconProps = {
  className?: string;
};

export const LoadingIcon = ({ className }: LoadingIconProps) => (
  <div className={classNames(css.iconWrapper, className)} aria-label="Loading" role="status">
    <Dots size="icon" />
  </div>
);
