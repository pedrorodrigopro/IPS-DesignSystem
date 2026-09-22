// Input — Figma nodes:
//   Text field (Input new):    1779:112429 — label + input box, no chevron
//   Select:                    derived from Input new with chevron-down icon
//   Search:                    13240:87513 — search icon / cross when searching
//   Multiselect:               12657:591296 — removable pill tags + chevron
//   Booking category:          12120:278386 — mandatory label + colour swatch + chevron, height 32px
//   Inline label:              14536:52162 — "Label: Value" in one box
//
// Mandatory icon: from Icon tokens (node 12016:234944) — asterisk/star, --palette-red-0
// Placed immediately after the label text (not right-aligned)
import classNames from "classnames";
import { useState } from "react";
import { Icon } from "../icon/icon";
import css from "./input.module.scss";

// ── Mandatory icon ────────────────────────────────────────────────────────────
// From Figma node 12016:234944 — mandatory icon (asterisk star), fill --palette-red-0

const MandatoryIcon = () => (
  <Icon name="mandatory" size={16} className={css.mandatoryIcon} />
);

// ── Text field (Input new — 1779:112429) ──────────────────────────────────────
// No chevron. States: default, hover, focus, error, warning, instructions, read-only.

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
        {mandatory && <MandatoryIcon />}
      </div>
    )}
    <div className={classNames(css.inputBox, css[state], { [css.readOnly]: readOnly })}>
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

// ── Select (Input new + chevron-down) ─────────────────────────────────────────
// Same as Input but with chevron-down icon on the right — for dropdown triggers

export type InputSelectProps = Omit<InputProps, "type" | "onChange" | "onFocus" | "onBlur"> & {
  onClick?: () => void;
};

export const InputSelect = ({
  label,
  value,
  placeholder,
  message,
  state = "default",
  readOnly = false,
  disabled = false,
  mandatory = false,
  onClick,
  className,
  id,
}: InputSelectProps) => (
  <div className={classNames(css.field, { [css.disabled]: disabled }, className)}>
    {label && (
      <div className={css.labelRow}>
        <label className={css.label} htmlFor={id}>{label}</label>
        {mandatory && <MandatoryIcon />}
      </div>
    )}
    <button
      id={id}
      type="button"
      className={classNames(css.inputBox, css[state], { [css.readOnly]: readOnly })}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={classNames(css.inputEl, css.selectValue, { [css.placeholder]: !value })}>
        {value ?? placeholder ?? ""}
      </span>
      <Icon name="chevron-down" size={16} className={css.icon} />
    </button>
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
// Searching=False: search icon right
// Searching=True: cross icon right, value shown

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
  const isSearching = !!value;
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
        {isSearching ? (
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

export type InputMultiselectTag = {
  id: string;
  label: string;
};

export type InputMultiselectProps = {
  label?: string;
  mandatory?: boolean;
  tags?: InputMultiselectTag[];
  onRemoveTag?: (id: string) => void;
  onClearAll?: () => void;
  showChevron?: boolean;
  className?: string;
};

export const InputMultiselect = ({
  label,
  mandatory = false,
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
        {mandatory && <MandatoryIcon />}
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
            {onRemoveTag && (
              <button
                type="button"
                className={css.tagRemoveBtn}
                onClick={() => onRemoveTag(tag.id)}
                aria-label={`Remove ${tag.label}`}
              >
                <Icon name="cross" size={16} className={css.tagRemoveIcon} />
              </button>
            )}
            {tag.label}
          </span>
        ))}
      </div>
      {showChevron && <Icon name="chevron-down" size={16} className={css.icon} />}
    </div>
  </div>
);

// ── Booking category input (12120:278386) ─────────────────────────────────────
// Mandatory label, box height 32px, label + colour swatch (right-aligned) + chevron

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
        {mandatory && <MandatoryIcon />}
      </div>
    )}
    <button type="button" className={css.bookingBox} onClick={onClick}>
      <span className={css.bookingLabel}>{selectedLabel}</span>
      {selectedColor && (
        <span className={css.colorSwatch} style={{ backgroundColor: selectedColor }} aria-hidden="true" />
      )}
      <Icon name="chevron-down" size={16} className={css.icon} />
    </button>
  </div>
);

// ── Inline label input (14536:52162) ──────────────────────────────────────────

export type InputInlineProps = {
  inlineLabel?: string;
  value?: string;
  mandatory?: boolean;
  onClick?: () => void;
  className?: string;
};

export const InputInline = ({
  inlineLabel,
  value,
  mandatory = false,
  onClick,
  className,
}: InputInlineProps) => (
  <div className={classNames(css.field, className)}>
    <button type="button" className={classNames(css.inputBox, css.inlineBox)} onClick={onClick}>
      <span className={css.inlineFlex}>
        {inlineLabel && <span className={css.inlineLabel}>{inlineLabel}: </span>}
        <span className={css.inlineValue}>{value}</span>
        {mandatory && <MandatoryIcon />}
      </span>
      <Icon name="chevron-down" size={16} className={css.icon} />
    </button>
  </div>
);
