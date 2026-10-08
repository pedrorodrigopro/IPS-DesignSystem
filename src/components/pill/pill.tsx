// Pill — Figma nodes:
//   Master:           14765:208276 (.Pill master new)
//   WF State:         14765:208360 (Pill/WF State)
//   Filter:           14765:208566 (Pill/Filter)
//   Saved Filter:     14765:208581 (Pill/Saved Filter)
//   Multiselect:      14765:208613 (Pill/Multiselect)
//   Certificate:      14765:208640 (Pill/Certificate)
//   Activity tag:     14766:209148 (Pill/Activity tag)
//   KPI:              14788:38337  (Pill/KPI)
//   Custom value:     14790:117316 (Pill/Custom value)
//   Report status:    14791:117359 (Pill/Report status)
//
// Master types: Simple | Removable | Modifier
// Sizes: regular (body-unselected 14px) | small (label-unselected 12px)
// All pills share: radius 16px, #E7EAF8 base bg, #CFDAF7 border
import classNames from "classnames";
import { Icon, IconName } from "../icon/icon";
import css from "./pill.module.scss";

export type PillSize = "regular" | "small";

// ── Simple pill ───────────────────────────────────────────────────────────────
// Optional left icon + text label. Used by WF State, Activity tag, KPI, etc.

export type PillSimpleProps = {
  label: string;
  leftIcon?: IconName;
  size?: PillSize;
  bg?: string;        // CSS colour override
  color?: string;     // text colour override
  className?: string;
};

export const PillSimple = ({
  label,
  leftIcon,
  size = "regular",
  bg,
  color,
  className,
}: PillSimpleProps) => (
  <span
    className={classNames(css.pill, css.simple, css[size], className)}
    style={{ ...(bg ? { backgroundColor: bg } : {}), ...(color ? { color } : {}) }}
  >
    {leftIcon && (
      <Icon name={leftIcon} size={size === "small" ? 14 : 16} className={css.icon} />
    )}
    <span className={css.label}>{label}</span>
  </span>
);

// ── Removable pill ────────────────────────────────────────────────────────────
// Cross icon left + text. Used by Filter, Multiselect, Saved Filter (partial).

export type PillRemovableProps = {
  label: string;
  size?: PillSize;
  bg?: string;
  color?: string;
  bordered?: boolean;
  onRemove?: () => void;
  className?: string;
};

export const PillRemovable = ({
  label,
  size = "regular",
  bg,
  color,
  bordered = true,
  onRemove,
  className,
}: PillRemovableProps) => (
  <span
    className={classNames(css.pill, css.removable, css[size], { [css.bordered]: bordered }, className)}
    style={{ ...(bg ? { backgroundColor: bg } : {}), ...(color ? { color } : {}) }}
  >
    <button
      type="button"
      className={css.removeBtn}
      onClick={onRemove}
      aria-label={`Remove ${label}`}
      tabIndex={0}
    >
      <Icon name="cross" size={size === "small" ? 14 : 16} className={css.icon} />
    </button>
    <span className={css.label}>{label}</span>
  </span>
);

// ── Modifier pill ─────────────────────────────────────────────────────────────
// Two joined sections: [× Variable] [Modifier ↓]
// Used by Certificate (calendar icon instead of chevron).

export type PillModifierProps = {
  leftLabel: string;
  rightLabel: string;
  size?: PillSize;
  bg?: string;
  rightIcon?: IconName;
  onRemoveLeft?: () => void;
  onClickRight?: () => void;
  className?: string;
};

export const PillModifier = ({
  leftLabel,
  rightLabel,
  size = "regular",
  bg,
  rightIcon = "chevron-down",
  onRemoveLeft,
  onClickRight,
  className,
}: PillModifierProps) => (
  <span className={classNames(css.modifier, css[size], className)}>
    {/* Left section */}
    <span
      className={classNames(css.modLeft, css[size], { [css.bg]: !!bg })}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      {onRemoveLeft && (
        <button type="button" className={css.removeBtn} onClick={onRemoveLeft} aria-label={`Remove ${leftLabel}`}>
          <Icon name="cross" size={size === "small" ? 14 : 16} className={css.icon} />
        </button>
      )}
      <span className={css.label}>{leftLabel}</span>
    </span>
    {/* Right section */}
    <button
      type="button"
      className={classNames(css.modRight, css[size])}
      onClick={onClickRight}
    >
      <span className={css.label}>{rightLabel}</span>
      <Icon name={rightIcon} size={size === "small" ? 14 : 16} className={css.icon} />
    </button>
  </span>
);

// ── Filter pill (Pill/Filter — 14765:208566) ──────────────────────────────────
// Cross + "Field\nValue" two-line text. Compact padding: 2px 16px 3px 8px.

export type PillFilterProps = {
  field: string;
  value: string;
  onRemove?: () => void;
  className?: string;
};

export const PillFilter = ({ field, value, onRemove, className }: PillFilterProps) => (
  <span className={classNames(css.pill, css.filter, className)}>
    <button type="button" className={css.removeBtn} onClick={onRemove} aria-label={`Remove filter ${field}`}>
      <Icon name="cross" size={16} className={css.icon} />
    </button>
    <span className={css.filterText}>
      <span className={css.filterField}>{field}</span>
      <span className={css.filterValue}>{value}</span>
    </span>
  </span>
);

// ── Saved filter pill (Pill/Saved Filter — 14765:208581) ──────────────────────
// Cross + bold title + share icon.

export type PillSavedFilterProps = {
  label: string;
  onRemove?: () => void;
  onShare?: () => void;
  className?: string;
};

export const PillSavedFilter = ({ label, onRemove, onShare, className }: PillSavedFilterProps) => (
  <span className={classNames(css.pill, css.savedFilter, className)}>
    <button type="button" className={css.removeBtn} onClick={onRemove} aria-label={`Remove ${label}`}>
      <Icon name="cross" size={16} className={css.icon} />
    </button>
    <span className={css.savedFilterLabel}>{label}</span>
    {onShare && (
      <button type="button" className={css.shareBtn} onClick={onShare} aria-label={`Share ${label}`}>
        <Icon name="share" size={16} className={css.icon} />
      </button>
    )}
  </span>
);

// ── WF State pill (Pill/WF State — 14765:208360) ──────────────────────────────

export type WFState =
  | "new" | "shortlisting" | "in-review" | "invited"
  | "partially-filled" | "filled" | "partially-booked" | "booked"
  | "partially-confirmed" | "confirmed" | "not-filled" | "exceptions" | "pending"
  // Audit-planner-specific overlay states (red, bold label)
  | "technical-overlay" | "accreditations";

const WF_STATE_CONFIG: Record<WFState, { label: string; bg: string; color: string; icon?: IconName }> = {
  "new":                  { label: "New",                 bg: "#E7EAF8", color: "#0D2976" },
  "shortlisting":         { label: "Shortlisting",        bg: "#6EF29C", color: "#0D2976" },
  "in-review":            { label: "In review",           bg: "#CFDAF7", color: "#0D2976" },
  "invited":              { label: "Invited",             bg: "#CFDAF7", color: "#0D2976" },
  "pending":              { label: "Pending",             bg: "#CFDAF7", color: "#0D2976" },
  "partially-filled":     { label: "Partially Filled",    bg: "#2358F8", color: "#FFFFFF" },
  "filled":               { label: "Filled",              bg: "#2358F8", color: "#FFFFFF" },
  "partially-booked":     { label: "Partially Booked",    bg: "#1F78B4", color: "#FFFFFF" },
  "booked":               { label: "Booked",              bg: "#1F78B4", color: "#FFFFFF" },
  "partially-confirmed":  { label: "Partially Confirmed", bg: "#0C1457", color: "#FFFFFF" },
  "confirmed":            { label: "Confirmed",           bg: "#0C1457", color: "#FFFFFF" },
  "not-filled":           { label: "Not filled",          bg: "#FFE8AD", color: "#9B5A01" },
  "exceptions":           { label: "Exceptions",          bg: "#FFE2E2", color: "#A30013", icon: "error" },
  "technical-overlay":   { label: "Technical Overlay",   bg: "#FFE2E2", color: "#A30013" },
  "accreditations":      { label: "Accreditations",      bg: "#FFE2E2", color: "#A30013" },
};

export type PillWFStateProps = {
  state: WFState;
  size?: PillSize;
  className?: string;
};

export const PillWFState = ({ state, size = "regular", className }: PillWFStateProps) => {
  const config = WF_STATE_CONFIG[state];
  return (
    <PillSimple
      label={config.label}
      leftIcon={config.icon}
      size={size}
      bg={config.bg}
      color={config.color}
      className={className}
    />
  );
};

// ── KPI pill (Pill/KPI — 14788:38337) ────────────────────────────────────────

export type KPIType = "compliant" | "approved" | "exception" | "rejected" | "requested" | "condition-not-met";

const KPI_CONFIG: Record<KPIType, { label: string; bg: string; color: string; icon?: IconName }> = {
  "compliant":          { label: "Compliant",        bg: "#C8EEDE", color: "#1F6648", icon: "check" },
  "approved":           { label: "Approved",         bg: "#C8EEDE", color: "#1F6648", icon: "check" },
  "exception":          { label: "Exception",        bg: "#FFE2E2", color: "#A30013", icon: "error" },
  "rejected":           { label: "Rejected",         bg: "#FFE2E2", color: "#A30013", icon: "forbidden" },
  "requested":          { label: "Requested",        bg: "#FFE8AD", color: "#9B5A01", icon: "hourglass-half" },
  "condition-not-met":  { label: "Condition not met",bg: "#E7EAF8", color: "#0D2976" },
};

export type PillKPIProps = {
  type: KPIType;
  className?: string;
};

export const PillKPI = ({ type, className }: PillKPIProps) => {
  const config = KPI_CONFIG[type];
  return (
    <PillSimple
      label={config.label}
      leftIcon={config.icon as IconName | undefined}
      size="small"
      bg={config.bg}
      color={config.color}
      className={className}
    />
  );
};

// ── Custom value pill (Pill/Custom value — 14790:117316) ──────────────────────

export type CustomValueType = "approved" | "awaiting" | "blocked" | "merged";

const CUSTOM_VALUE_CONFIG: Record<CustomValueType, { label: string; bg: string; color: string }> = {
  "approved": { label: "Approved", bg: "#C8EEDE", color: "#1F6648" },
  "awaiting": { label: "Awaiting", bg: "#FFE8AD", color: "#9B5A01" },
  "blocked":  { label: "Blocked",  bg: "#000000", color: "#FFFFFF" },
  "merged":   { label: "Merged",   bg: "#0C1457", color: "#FFFFFF" },
};

export type PillCustomValueProps = {
  type: CustomValueType;
  className?: string;
};

export const PillCustomValue = ({ type, className }: PillCustomValueProps) => {
  const config = CUSTOM_VALUE_CONFIG[type];
  return (
    <PillSimple label={config.label} size="small" bg={config.bg} color={config.color} className={className} />
  );
};

// ── Report status pill (Pill/Report status — 14791:117359) ────────────────────

export type ReportStatusType = "ready" | "no-data" | "failed" | "pending" | "in-progress";

const REPORT_STATUS_CONFIG: Record<ReportStatusType, { label: string; bg: string; color: string }> = {
  "ready":       { label: "Ready",       bg: "#C8EEDE", color: "#1F6648" },
  "no-data":     { label: "No data",     bg: "#FFE8AD", color: "#9B5A01" },
  "failed":      { label: "Failed",      bg: "#FFE2E2", color: "#A30013" },
  "pending":     { label: "Pending",     bg: "#E7EAF8", color: "#0D2976" },
  "in-progress": { label: "In progress", bg: "#CFDAF7", color: "#0D2976" },
};

export type PillReportStatusProps = {
  type: ReportStatusType;
  className?: string;
};

export const PillReportStatus = ({ type, className }: PillReportStatusProps) => {
  const config = REPORT_STATUS_CONFIG[type];
  return (
    <PillSimple label={config.label} size="small" bg={config.bg} color={config.color} className={className} />
  );
};

// ── Activity tag pill (Pill/Activity tag — 14766:209148) ──────────────────────
// Tag icon + text, #CFDAF7 bg

export type PillActivityTagProps = {
  label: string;
  size?: PillSize;
  className?: string;
};

export const PillActivityTag = ({ label, size = "regular", className }: PillActivityTagProps) => (
  <PillSimple label={label} leftIcon="tag" size={size} bg="#CFDAF7" color="#0D2976" className={className} />
);

// ── Certificate pill (Pill/Certificate — 14765:208640) ────────────────────────
// Modifier type: [× Name] [Date 📅]

export type PillCertificateProps = {
  name: string;
  date: string;
  onRemove?: () => void;
  size?: PillSize;
  className?: string;
};

export const PillCertificate = ({ name, date, onRemove, size = "regular", className }: PillCertificateProps) => (
  <PillModifier
    leftLabel={name}
    rightLabel={date}
    rightIcon="calendar"
    size={size}
    onRemoveLeft={onRemove}
    className={className}
  />
);
