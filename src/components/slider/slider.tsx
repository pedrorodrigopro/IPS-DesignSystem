// Slider regular — Figma node 7165:336045
//
// Three types:
//   Number:     single thumb, optional input showing value, min/max labels
//   Range:      two thumbs + two inputs (from/to), min/max labels
//   Percentage: single thumb, % suffix, 0–100
//
// Track: height 32px container, radius 16px, grey bg #E7EAF8 (--palette-neutral-1)
// Filled: #0C1457 (--palette-blue-1), from left to thumb
// Thumb:  circle 20px, #0C1457, white border
// Label:  label-regular (12px), #0D2976
// Min/max: label-regular (12px), #0D2976
// Input:  42px wide, Input new style
import classNames from "classnames";
import css from "./slider.module.scss";

export type SliderType = "number" | "range" | "percentage";

// ── Number slider ─────────────────────────────────────────────────────────────

export type SliderNumberProps = {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  showInput?: boolean;
  onChange?: (value: number) => void;
  className?: string;
};

export const SliderNumber = ({
  label,
  value,
  min = 0,
  max = 12,
  step = 1,
  showInput = true,
  onChange,
  className,
}: SliderNumberProps) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={classNames(css.slider, className)}>
      {label && <span className={css.label}>{label}</span>}
      <div className={css.rangeRow}>
        {showInput && (
          <input
            type="number"
            className={css.inputBox}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange?.(Number(e.target.value))}
            aria-label={label}
          />
        )}
        <span className={css.minLabel}>{min}</span>
        <div className={css.trackWrapper}>
          <div className={css.track}>
            <div className={css.fill} style={{ width: `${pct}%` }} />
            <div className={css.thumb} style={{ left: `${pct}%` }} />
          </div>
          <input
            type="range"
            className={css.nativeRange}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange?.(Number(e.target.value))}
            aria-label={label}
          />
        </div>
        <span className={css.maxLabel}>{max}</span>
      </div>
    </div>
  );
};

// ── Range slider (two thumbs) ─────────────────────────────────────────────────

export type SliderRangeProps = {
  label?: string;
  valueFrom: number;
  valueTo: number;
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  showInput?: boolean;
  onChangeFrom?: (value: number) => void;
  onChangeTo?: (value: number) => void;
  className?: string;
};

export const SliderRange = ({
  label,
  valueFrom,
  valueTo,
  min = 0,
  max = 24,
  step = 1,
  minLabel,
  maxLabel,
  showInput = true,
  onChangeFrom,
  onChangeTo,
  className,
}: SliderRangeProps) => {
  const pctFrom = ((valueFrom - min) / (max - min)) * 100;
  const pctTo = ((valueTo - min) / (max - min)) * 100;
  return (
    <div className={classNames(css.slider, className)}>
      {label && <span className={css.label}>{label}</span>}
      <div className={css.rangeRow}>
        {showInput && (
          <input
            type="number"
            className={css.inputBox}
            value={valueFrom}
            min={min}
            max={valueTo}
            step={step}
            onChange={(e) => onChangeFrom?.(Number(e.target.value))}
            aria-label="From"
          />
        )}
        <span className={css.minLabel}>{minLabel ?? min}</span>
        <div className={css.trackWrapper}>
          <div className={css.track}>
            {/* Fill between the two thumbs */}
            <div
              className={css.fill}
              style={{ left: `${pctFrom}%`, width: `${pctTo - pctFrom}%` }}
            />
            <div className={css.thumb} style={{ left: `${pctFrom}%` }} />
            <div className={css.thumb} style={{ left: `${pctTo}%` }} />
          </div>
          {/* Two native range inputs overlaid */}
          <input
            type="range"
            className={css.nativeRange}
            value={valueFrom}
            min={min}
            max={valueTo}
            step={step}
            onChange={(e) => onChangeFrom?.(Number(e.target.value))}
            aria-label="From"
          />
          <input
            type="range"
            className={css.nativeRange}
            value={valueTo}
            min={valueFrom}
            max={max}
            step={step}
            onChange={(e) => onChangeTo?.(Number(e.target.value))}
            aria-label="To"
          />
        </div>
        <span className={css.maxLabel}>{maxLabel ?? max}</span>
        {showInput && (
          <input
            type="number"
            className={css.inputBox}
            value={valueTo}
            min={valueFrom}
            max={max}
            step={step}
            onChange={(e) => onChangeTo?.(Number(e.target.value))}
            aria-label="To"
          />
        )}
      </div>
    </div>
  );
};

// ── Percentage slider ─────────────────────────────────────────────────────────

export type SliderPercentageProps = {
  label?: string;
  value: number;
  step?: number;
  showInput?: boolean;
  onChange?: (value: number) => void;
  className?: string;
};

export const SliderPercentage = ({
  label,
  value,
  step = 1,
  showInput = true,
  onChange,
  className,
}: SliderPercentageProps) => {
  return (
    <div className={classNames(css.slider, className)}>
      {label && <span className={css.label}>{label}</span>}
      <div className={css.rangeRow}>
        {showInput && (
          <input
            type="number"
            className={css.inputBox}
            value={value}
            min={0}
            max={100}
            step={step}
            onChange={(e) => onChange?.(Number(e.target.value))}
            aria-label={label}
          />
        )}
        <span className={css.pctSuffix}>%</span>
        <span className={css.minLabel}>0</span>
        <div className={css.trackWrapper}>
          <div className={css.track}>
            <div className={css.fill} style={{ width: `${value}%` }} />
            <div className={css.thumb} style={{ left: `${value}%` }} />
          </div>
          <input
            type="range"
            className={css.nativeRange}
            value={value}
            min={0}
            max={100}
            step={step}
            onChange={(e) => onChange?.(Number(e.target.value))}
            aria-label={label}
          />
        </div>
        <span className={css.maxLabel}>100</span>
      </div>
    </div>
  );
};
