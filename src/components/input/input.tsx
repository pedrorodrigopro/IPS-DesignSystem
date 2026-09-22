// Input — Figma nodes:
//   Text field:        1779:112429 (Input new)
//   Search:            13240:87513 (Input search)
//   Multiselect:       12657:591296 (Input multiselect)
//   Booking category:  12120:278386 (Input booking category)
//   Inline label:      14536:52162 (Input inline)
//
// Shared input box:
//   row, padding 8px, gap 8px, border-radius 8px, border 1px #CFDAF7
//   Default bg: white | Hover bg: #F7F7F8 | Error bg: #FFE2E2 | Warning bg: #FFE8AD
//   Focus: double ring 0 0 0 4px rgba(12,20,87,1), 0 0 0 2px white
//   Read-only: no border, no bg, padding 8px 0
//
// Label: label-regular (12px/400/150%), --palette-blue-0
// Value: body-selected (14px/Bold/115%), --palette-blue-0
// Message: label-regular (12px/400/150%)
//   Error message: --palette-red-0 | Warning: --palette-orange-1 | Instructions: --palette-blue-2
import classNames from "classnames";
import { ReactNode, useRef } from "react";
import { Icon } from "../icon/icon";
import css from "./input.module.scss";

// ── Text field (Input new — 1779:112429) ──────────────────────────────────────

export type InputState = "default" | "error" | "warning" | "instructions";

export type InputProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  message?: string;
  state?: InputState;
  readOnly?: boolean;
  disabled?: boolean;
  mandatory?: boolean;
  /** Show chevron-down icon (default true for text field) */
  showChevron?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
};

export const Input = ({
  label,
  value,
  placeholder,
  message,
  state = "default",
  readOnly = false,
  disabled = false,
  mandatory = false,
  showChevron = false,
  onChange,
  onFocus,
  onBlur,
  className,
  id,
  type = "text",
}: InputProps) => (
  <div className={classNames(css.field, { [css.disabled]: disabled }, className)}>
    {label && (
      <div className={css.labelRow}>
        <label className={css.label} htmlFor={id}>{label}</label>
        {mandatory && <span className={css.mandatory} aria-label="required">*</span>}
      </div>
    )}
    <div className={classNames(css.inputBox, css[state], {
      [css.readOnly]: readOnly,
    })}>
      <input
        id={id}
        type={type}
        className={css.inputEl}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {showChevron && <Icon name="chevron-down" size={16} className={css.icon} />}
    </div>
    {message && (
      <div className={css.messageRow}>
        {state === "error" && <Icon name="error" size={16} className={css.msgIconError} />}
        {state === "warning" && <Icon name="warning" size={16} className={css.msgIconWarning} />}
        {state === "instructions" && <Icon name="info" size={16} className={css.msgIconInfo} />}
        <span className={classNames(css.message, css[`msg_${state}`])}>{message}</span>
      </div>
    )}
  </div>
);

// ── Search input (Input search — 13240:87513) ─────────────────────────────────
// No label, search icon right, clear button when has value

export type InputSearchProps = {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  className?: string;
  id?: string;
};

export const InputSearch = ({
  value,
  placeholder = "Search",
  onChange,
  onClear,
  className,
  id,
}: InputSearchProps) => {
  const hasValue = value && value.length > 0;
  return (
    <div className={classNames(css.field, className)}>
      <div className={css.inputBox}>
        <input
          id={id}
          type="search"
          className={css.inputEl}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {hasValue && onClear ? (
          <button type="button" className={css.clearBtn} onClick={onClear} aria-label="Clear search">
            <Icon name="cross" size={16} />
          </button>
        ) : (
          <Icon name="search" size={16} className={css.icon} />
        )}
      </div>
    </div>
  );
};

// ── Multiselect input (12657:591296) ──────────────────────────────────────────
// Label row (label + optional clear-all icon), input row with removable pills + chevron

export type InputMultiselectTag = {
  id: string;
  label: string;
};

export type InputMultiselectProps = {
  label?: string;
  tags?: InputMultiselectTag[];
  onRemoveTag?: (id: string) => void;
  onClearAll?: () => void;
  showChevron?: boolean;
  className?: string;
};

export const InputMultiselect = ({
  label,
  tags = [],
  onRemoveTag,
  onClearAll,
  showChevron = true,
  className,
}: InputMultiselectProps) => (
  <div className={classNames(css.field, className)}>
    {label && (
      <div className={css.labelRow}>
        <span className={css.label}>{label}</span>
        {onClearAll && (
          <button type="button" className={css.clearAllBtn} onClick={onClearAll} aria-label="Clear all">
            <Icon name="cross" size={16} />
          </button>
        )}
      </div>
    )}
    <div className={css.multiBox}>
      <div className={css.tagsRow}>
        {tags.map((tag) => (
          <span key={tag.id} className={css.tag}>
            <Icon name="cross" size={16} className={css.tagRemoveIcon} />
            {tag.label}
            {onRemoveTag && (
              <button
                type="button"
                className={css.tagRemoveBtn}
                onClick={() => onRemoveTag(tag.id)}
                aria-label={`Remove ${tag.label}`}
              />
            )}
          </span>
        ))}
      </div>
      {showChevron && <Icon name="chevron-down" size={16} className={css.icon} />}
    </div>
  </div>
);

// ── Booking category input (12120:278386) ─────────────────────────────────────
// Mandatory label, input with selected label + colour swatch + chevron
// Compact: padding 4px 8px, inner input 8px 0

export type InputBookingCategoryProps = {
  label?: string;
  selectedLabel?: string;
  selectedColor?: string;
  mandatory?: boolean;
  onClick?: () => void;
  className?: string;
};

export const InputBookingCategory = ({
  label,
  selectedLabel,
  selectedColor,
  mandatory = false,
  onClick,
  className,
}: InputBookingCategoryProps) => (
  <div className={classNames(css.field, className)}>
    {label && (
      <div className={css.labelRow}>
        <span className={css.label}>{label}</span>
        {mandatory && <span className={css.mandatory} aria-label="required">*</span>}
      </div>
    )}
    <button type="button" className={css.bookingBox} onClick={onClick}>
      <span className={css.bookingContent}>
        <span className={css.bookingLabel}>{selectedLabel}</span>
        {selectedColor && (
          <span className={css.colorSwatch} style={{ backgroundColor: selectedColor }} aria-hidden="true" />
        )}
      </span>
      <Icon name="chevron-down" size={16} className={css.icon} />
    </button>
  </div>
);

// ── Inline label input (14536:52162) ──────────────────────────────────────────
// No top label — value text is "Label: Value" where label part is regular weight
// Single input box, chevron-down right

export type InputInlineProps = {
  inlineLabel?: string;
  value?: string;
  onClick?: () => void;
  className?: string;
};

export const InputInline = ({
  inlineLabel,
  value,
  onClick,
  className,
}: InputInlineProps) => (
  <div className={classNames(css.field, className)}>
    <button type="button" className={classNames(css.inputBox, css.inlineBox)} onClick={onClick}>
      <span className={css.inputEl} style={{ textAlign: "left" }}>
        {inlineLabel && <span className={css.inlineLabel}>{inlineLabel}: </span>}
        <span className={css.inlineValue}>{value}</span>
      </span>
      <Icon name="chevron-down" size={16} className={css.icon} />
    </button>
  </div>
);
