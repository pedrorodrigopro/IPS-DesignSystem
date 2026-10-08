// BookingCategorySidePanel — Figma node 7359:238082 (Sidepanel/Booking category)
// Source: IPS Components adFvaOeh8E3AKLFKRjYD3r
//
// Width: 400px (from Figma layout_8D0HSI.dimensions.width: 400)
// Structure:
//   Header (size=content, Actions=True) — title "Booking category" + close icon
//   Scrollable content (gap 16px, padding 24px):
//     Input — Name
//     Input — Display as
//     Block: Billable & Availability (neutral-2 bg, 1px #CFDAF7 border, 16px padding)
//     Block: Properties (label + neutral bg section)
//     Input — Requires Approval (with icon, value "Never")
//     Colour picker — label "Color" + colour swatch grid
//   Sticky actions (Actions/Overlays — sticky-panel variant):
//     Divider + Cancel (secondary) + Save (primary)

import React, { useState } from "react";
import { SidePanel }     from "./side_panel";
import { Header }        from "../header/header";
import { Icon }          from "../icon/icon";
import { Button }        from "../button/button";
import { Input, InputSelect } from "../input/input";
import { Actions }       from "../actions/actions";
import { Checkbox }      from "../checkbox/checkbox";

// ── Types ─────────────────────────────────────────────────────────────────────

export type BookingCategoryData = {
  name?:             string;
  displayAs?:        string;
  // Billable & Availability toggles
  billable?:         boolean;
  affectsAvail?:     boolean;
  // Properties toggles
  isHoliday?:        boolean;
  isAbsence?:        boolean;
  isTraining?:       boolean;
  // Requires Approval
  requiresApproval?: string; // "Never" | "Always" | "Sometimes"
  // Colour — hex string e.g. "#2358F8"
  color?:            string;
};

export type BookingCategorySidePanelProps = {
  open:      boolean;
  onClose:   () => void;
  onSave?:   (data: BookingCategoryData) => void;
  data?:     BookingCategoryData;
};

// ── Typography helpers ────────────────────────────────────────────────────────

const labelRegular: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};

// ── Colour swatch palette (Figma Colour picker) ───────────────────────────────

const PALETTE_COLORS = [
  "#2358F8","#0C1457","#1AAFA3","#248E61","#FFCD38","#D42A36",
  "#9B5A01","#550568","#8D112E","#1C4B94","#6A82C5","#94B7EF",
  "#F3A1B4","#E3A1F3","#C8EEDE","#FFE8AD","#FFE2E2","#E7EAF8",
  "#0D2976","#5C6E9E","#000000","#333333","#FFFFFF","#F8F9FD",
];

function ColourPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={labelRegular}>Color</span>
      {/* Selected colour preview */}
      <div style={{ width: "100%", height: 40, borderRadius: "var(--radius-md)", border: "1px solid var(--palette-neutral-0)", background: value || "var(--palette-neutral-1)", cursor: "pointer", display: "flex", alignItems: "center", paddingLeft: 12, gap: 8 }}>
        <div style={{ width: 20, height: 20, borderRadius: "var(--radius-sm)", background: value, border: "1px solid rgba(0,0,0,0.1)" }} />
        <span style={{ ...labelRegular, fontWeight: 700 }}>{value || "Select colour"}</span>
      </div>
      {/* Swatch grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4 }}>
        {PALETTE_COLORS.map(color => (
          <button
            key={color}
            onClick={() => onChange(color)}
            title={color}
            style={{
              width: "100%", aspectRatio: "1", borderRadius: "var(--radius-sm)",
              background: color, cursor: "pointer",
              border: value === color ? "2px solid var(--palette-blue-1)" : "1px solid rgba(0,0,0,0.08)",
              outline: "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Checkbox row ──────────────────────────────────────────────────────────────

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <Checkbox label={label} checked={checked} onChange={onChange} />
  );
}

// ── Section block (neutral-2 bg, 1px CFDAF7 border) ──────────────────────────

function SectionBlock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--palette-neutral-2)", // #F8F9FD — Figma fill_EMZRJB
      border: "1px solid var(--palette-neutral-0)",  // #CFDAF7 — Figma fill_ZE58UC
      borderRadius: "var(--radius-md)",
      padding: 16,
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      {children}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function BookingCategorySidePanel({ open, onClose, onSave, data = {} }: BookingCategorySidePanelProps) {
  const [name,            setName]            = useState(data.name            ?? "");
  const [displayAs,       setDisplayAs]       = useState(data.displayAs       ?? "");
  const [billable,        setBillable]        = useState(data.billable        ?? true);
  const [affectsAvail,    setAffectsAvail]    = useState(data.affectsAvail    ?? true);
  const [isHoliday,       setIsHoliday]       = useState(data.isHoliday       ?? false);
  const [isAbsence,       setIsAbsence]       = useState(data.isAbsence       ?? false);
  const [isTraining,      setIsTraining]      = useState(data.isTraining      ?? false);
  const [requiresApproval,setRequiresApproval]= useState(data.requiresApproval ?? "Never");
  const [color,           setColor]           = useState(data.color           ?? "#2358F8");

  const handleSave = () => {
    onSave?.({ name, displayAs, billable, affectsAvail, isHoliday, isAbsence, isTraining, requiresApproval, color });
    onClose();
  };

  return (
    // Width 400 — from Figma dimensions
    <SidePanel open={open} onClose={onClose} width={400}>

      {/* ── Header — outside scroll, always visible at top, no divider ── */}
      <div style={{ padding: "24px 24px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Header size="content" title="Booking category" />
          <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
            <Icon name="cross" size={16} />
          </Button>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px 0", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Name input */}
        <Input
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter name"
        />

        {/* Display as input */}
        <Input
          label="Display as"
          value={displayAs}
          onChange={e => setDisplayAs(e.target.value)}
          placeholder="Enter display name"
        />

        {/* Billable & Availability block */}
        <SectionBlock>
          <CheckboxRow label="Billable"             checked={billable}     onChange={setBillable} />
          <CheckboxRow label="Affects availability" checked={affectsAvail} onChange={setAffectsAvail} />
        </SectionBlock>

        {/* Properties — flat checkboxes, no tile wrapper */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={labelRegular}>Properties</span>
          <CheckboxRow label="Holiday"  checked={isHoliday}  onChange={setIsHoliday} />
          <CheckboxRow label="Absence"  checked={isAbsence}  onChange={setIsAbsence} />
          <CheckboxRow label="Training" checked={isTraining} onChange={setIsTraining} />
        </div>

        {/* Requires Approval — InputSelect with icon */}
        <InputSelect
          label="Requires Approval"
          value={requiresApproval}
          onClick={() => {}}
        />

        {/* Colour picker */}
        <ColourPicker value={color} onChange={setColor} />

        {/* Bottom padding so last item clears sticky actions */}
        <div style={{ height: 8 }} />
      </div>

      {/* ── Sticky actions (Actions/Overlays — sticky-panel variant) ── */}
      {/* Rendered as flex sibling of scrollable content — always visible at bottom */}
      <Actions
        variant="sticky-panel"
        leftActions={[{ label: "Cancel", variant: "secondary", onClick: onClose }]}
        rightActions={[{ label: "Save",   variant: "primary",   onClick: handleSave }]}
      />

    </SidePanel>
  );
}
