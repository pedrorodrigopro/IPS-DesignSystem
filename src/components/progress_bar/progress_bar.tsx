// Progress Bar — Figma nodes:
//   Linear:  1615:51769 (Progress linear)
//   Radial:  2553:162743 (Progress circular)
//
// Linear:
//   Track: 200px wide × 10px tall, radius 16px, #CFDAF7 (--palette-neutral-0)
//   Fill:  width = value%, same height/radius, default #0C1457 (--palette-blue-1)
//
// Radial (circular):
//   40×40px donut ring, stroke-based SVG
//   Track: #CFDAF7 | Fill: #0C1457
//
// Semantic colour mode (value-based):
//   0%:        track only (no fill)
//   1–33%:     --palette-red-0    (#D42A36)
//   34–66%:    --palette-orange-0 (#FFCD38)
//   67–99%:    --palette-primary-0 (#2358F8)
//   100%:      --palette-green-0  (#248E61)
import classNames from "classnames";
import css from "./progress_bar.module.scss";

// ── Semantic colour helper ────────────────────────────────────────────────────

function semanticColor(value: number): string {
  if (value === 0)   { return "transparent"; }
  if (value <= 33)   { return "var(--palette-red-0)"; }
  if (value <= 66)   { return "var(--palette-orange-0)"; }
  if (value < 100)   { return "var(--palette-primary-0)"; }
  return "var(--palette-green-0)";
}

const defaultColor = "var(--palette-blue-1)"; // #0C1457 — fill_B41KWH

// ── Linear progress bar (Progress linear — 1615:51769) ───────────────────────
// Track: 200px × 10px | Fill overlays at value%

export type ProgressLinearProps = {
  /** 0–100 */
  value: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Use semantic colours based on value */
  semantic?: boolean;
  className?: string;
};

export const ProgressLinear = ({
  value,
  showLabel = false,
  semantic = false,
  className,
}: ProgressLinearProps) => {
  const pct = Math.max(0, Math.min(100, value));
  const fillColor = semantic ? semanticColor(pct) : defaultColor;

  return (
    <div className={classNames(css.linear, className)}>
      <div className={css.linearTrack} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        {pct > 0 && (
          <div
            className={css.linearFill}
            style={{ width: `${pct}%`, backgroundColor: fillColor }}
          />
        )}
      </div>
      {showLabel && (
        <span className={css.label}>{pct}%</span>
      )}
    </div>
  );
};

// ── Radial / circular progress bar (Progress circular — 2553:162743) ──────────
// 40×40px SVG donut. Track and fill as stroked circles.
// stroke-dasharray = circumference (≈ 2π × r)

const RADIAL_SIZE = 40;
const STROKE_WIDTH = 5; // visual donut thickness
const RADIUS = (RADIAL_SIZE - STROKE_WIDTH) / 2; // 17.5
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 109.96

export type ProgressRadialProps = {
  /** 0–100 */
  value: number;
  /** Show percentage label inside the ring */
  showLabel?: boolean;
  /** Use semantic colours based on value */
  semantic?: boolean;
  /** Size in px — default 40px (from Figma) */
  size?: number;
  className?: string;
};

export const ProgressRadial = ({
  value,
  showLabel = false,
  semantic = false,
  size = RADIAL_SIZE,
  className,
}: ProgressRadialProps) => {
  const pct = Math.max(0, Math.min(100, value));
  const fillColor = semantic ? semanticColor(pct) : defaultColor;
  const strokeWidth = STROKE_WIDTH * (size / RADIAL_SIZE);
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div
      className={classNames(css.radial, className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--palette-neutral-0)"
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        {pct > 0 && (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={fillColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
          />
        )}
      </svg>
      {showLabel && (
        <span className={css.radialLabel} style={{ fontSize: size < 32 ? 8 : 10 }}>
          {pct}%
        </span>
      )}
    </div>
  );
};
