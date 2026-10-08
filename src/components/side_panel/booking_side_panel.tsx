// BookingSidePanel — Figma node 1798:98291 (Sidepanel/BM/Booking)
// Source: IPS Components adFvaOeh8E3AKLFKRjYD3r
// Width: 400px | 10 tab variants
//
// Tabs: Details | Notes | History | Edit | Create demand | Create single |
//       Create repeated | Edit repeated | Edit hidden | Edit not editable
//
// Shared top section (Details/Notes/History):
//   Object cards — WM | Role | Engagement
//   Duration + Total hours (read-only KV)
//   Booking card:
//     Carousel (availability bar placeholder)
//     Navigation/Horizontal — Details | Notes | History
//     Tab content
//
// Edit/Create tabs:
//   Top: object cards OR WM/Engagement inputs
//   Single/Repeated toggle (create only)
//   Editable form fields
//   Actions/Overlays sticky — Cancel | Save/Create
//
// Actions sidepanel (view tabs): 4 icon buttons — edit, clone, reassign, remove

import React, { useState } from "react";
import { SidePanel }       from "./side_panel";
import css from "./side_panel.module.scss";
import { Header }          from "../header/header";
import { Icon }            from "../icon/icon";
import { Button }          from "../button/button";
import { Actions }         from "../actions/actions";
import { InputSelect }     from "../input/input";
import { BookingSlideshow, type BookingSlideshowNote, type BookingSlideshowHistoryAction, type BookingSlideshowRule } from "../booking_slideshow/booking_slideshow";


// ── Tab type ──────────────────────────────────────────────────────────────────

export type BookingTab =
  | "details"
  | "notes"
  | "history"
  | "edit"
  | "create-demand"
  | "create-single"
  | "create-repeated"
  | "edit-repeated"
  | "edit-hidden"
  | "edit-not-editable";

// ── Typography ────────────────────────────────────────────────────────────────

const h5: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 16, fontWeight: 600,
  color: "var(--palette-blue-0)", lineHeight: "125%",
};
const bodyReg: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
  color: "var(--palette-blue-0)", lineHeight: "115%",
};
const bodyBold: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
  color: "var(--palette-blue-0)", lineHeight: "115%",
};
const labelReg: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-2)", lineHeight: "150%",
};
const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
  color: "var(--palette-primary-0)", lineHeight: "115%",
  background: "none", border: "none", cursor: "pointer", padding: 0,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

// Object card — same as in Role panel
function ObjectCard({ icon, label, name, onOpen }: {
  icon: "profile" | "role" | "engagement";
  label: string;
  name: string;
  onOpen?: () => void;
}) {
  return (
    <div style={{ background: "var(--palette-neutral-2)", borderRadius: "var(--radius-md)", padding: 8, display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name={icon} size={14} style={{ color: "var(--palette-blue-2)" }} />
          <span style={labelReg}>{label}</span>
        </div>
        {onOpen && (
          <Button kind="iconTertiary" size="regular" title={`Open ${label}`} onClick={onOpen}>
            <Icon name="open" size={14} />
          </Button>
        )}
      </div>
      <button style={{ ...linkStyle, textAlign: "left", paddingLeft: 20, fontSize: 13 }}>{name}</button>
    </div>
  );
}



// Single/Repeated toggle
function BookingTypeToggle({ value, onChange }: { value: "single" | "repeated"; onChange: (v: "single" | "repeated") => void }) {
  const active: React.CSSProperties = { background: "var(--palette-blue-1)", color: "white", border: "none" };
  const inactive: React.CSSProperties = { background: "white", color: "var(--palette-blue-0)", border: "1px solid var(--palette-neutral-0)" };
  const base: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, height: 36, padding: "0 16px", cursor: "pointer", borderRadius: "var(--radius-md)" };
  return (
    <div style={{ display: "flex", gap: 4 }}>
      <button style={{ ...base, ...(value === "single" ? active : inactive) }} onClick={() => onChange("single")}>Single booking</button>
      <button style={{ ...base, ...(value === "repeated" ? active : inactive) }} onClick={() => onChange("repeated")}>Repeated booking</button>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type BookingSidePanelData = {
  // Shared context
  wmName?:           string;
  wmInitials?:       string;
  roleName?:         string;
  engagementName?:   string;
  // BookingSlideshow props
  rules?:            BookingSlideshowRule[];
  bookingCategory?:      string;
  bookingCategoryColor?: string;
  description?:      string;
  title?:            string;
  showPhase?:        boolean;
  phase?:            string;
  showDateCreated?:  boolean;
  dateCreated?:      string;
  notes?:            BookingSlideshowNote[];
  history?:          BookingSlideshowHistoryAction[];
  notesCount?:       number;
  // Callbacks
  onEdit?:           () => void;
  onClone?:          () => void;
  onReassign?:       () => void;
  onRemove?:         () => void;
  onSave?:           () => void;
};

export type BookingSidePanelProps = {
  open:    boolean;
  onClose: () => void;
  tab?:    BookingTab;
  data?:   BookingSidePanelData;
};

// ── View tabs (Details/Notes/History) — shared top + BookingSlideshow ────────

function ViewHeader({ data, tab, onTabChange, onClose }: {
  data: BookingSidePanelData;
  tab: "details" | "notes" | "history";
  onTabChange: (t: "details" | "notes" | "history") => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Panel header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Header size="content" title="Booking" leftIcon="booking" />
        <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
          <Icon name="cross" size={16} />
        </Button>
      </div>

      {/* Object cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
        {data.wmName         && <ObjectCard icon="profile"    label="Workforce member" name={data.wmName}         />}
        {data.roleName       && <ObjectCard icon="role"       label="Role"             name={data.roleName}       />}
        {data.engagementName && <ObjectCard icon="engagement" label="Engagement"       name={data.engagementName} />}
      </div>

      {/* BookingSlideshow — read-only mode (tabs visible, plain KV details) */}
      <div style={{ marginTop: 12 }}>
        <BookingSlideshow
          readOnly
          tab={tab}
          onTabChange={onTabChange}
          rules={data.rules}
          category={data.bookingCategory}
          categoryColor={data.bookingCategoryColor}
          title={data.title}
          description={data.description}
          showPhase={data.showPhase}
          phase={data.phase}
          showDateCreated={data.showDateCreated}
          dateCreated={data.dateCreated}
          notes={data.notes}
          history={data.history}
          notesCount={data.notesCount}
          width="100%"
        />
      </div>
    </>
  );
}

// ── Edit/Create form ──────────────────────────────────────────────────────────

function BookingForm({ tab, data, onClose }: {
  tab: BookingTab;
  data: BookingSidePanelData;
  onClose: () => void;
}) {
  const [bookingType, setBookingType] = useState<"single" | "repeated">(
    tab === "create-repeated" || tab === "edit-repeated" ? "repeated" : "single"
  );

  const isCreate   = tab.startsWith("create");
  const isRepeated = tab === "create-repeated" || tab === "edit-repeated";
  const isHidden   = tab === "edit-hidden";

  return (
    <>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Header size="content" title={isCreate ? "Create booking" : "Edit booking"} leftIcon="booking" />
        <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
          <Icon name="cross" size={16} />
        </Button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>

        {/* Create: WM + Engagement select inputs */}
        {isCreate && (
          <>
            <InputSelect label="Workforce member" placeholder="Select workforce member" mandatory />
            <InputSelect label="Engagement" placeholder="Select engagement" value={data.engagementName} />
          </>
        )}

        {/* Edit: object cards */}
        {!isCreate && (
          <>
            {data.wmName         && <ObjectCard icon="profile"    label="Workforce member" name={data.wmName} />}
            {data.roleName       && <ObjectCard icon="role"       label="Role"             name={data.roleName} />}
            {data.engagementName && <ObjectCard icon="engagement" label="Engagement"       name={data.engagementName} />}
          </>
        )}

        {/* Single / Repeated toggle (create only) */}
        {isCreate && (
          <BookingTypeToggle value={bookingType} onChange={setBookingType} />
        )}

        {/* BookingSlideshow — editable mode (no tabs, shows form fields) */}
        <BookingSlideshow
          readOnly={false}
          rules={data.rules}
          category={data.bookingCategory}
          title={data.title}
          description={data.description}
          showPhase={data.showPhase}
          phase={data.phase}
          showDateCreated={data.showDateCreated}
          dateCreated={data.dateCreated}
          hidden={isHidden}
          width="100%"
        />

      </div>
    </>
  );
}

// ── Actions sidepanel (view tabs) — 4 icon buttons ────────────────────────────

function ViewActions({ data, onClose }: { data: BookingSidePanelData; onClose: () => void }) {
  return (
    <div style={{
      position: "sticky", bottom: 0, background: "white",
      borderTop: "1px solid var(--palette-neutral-0)",
      boxShadow: "0 -6px 12px rgba(27,72,195,0.1)",
      padding: "12px 24px",
      display: "flex", justifyContent: "flex-end", gap: 8, flexShrink: 0,
    }}>
      <Button kind="iconTertiary" size="regular" title="Edit"     onClick={data.onEdit}>     <Icon name="edit"     size={16} /></Button>
      <Button kind="iconTertiary" size="regular" title="Clone"    onClick={data.onClone}>    <Icon name="copy"     size={16} /></Button>
      <Button kind="iconTertiary" size="regular" title="Reassign" onClick={data.onReassign}> <Icon name="reassign" size={16} /></Button>
      <Button kind="iconTertiary" size="regular" title="Remove"   onClick={data.onRemove}>   <Icon name="remove"   size={16} /></Button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function BookingSidePanel({ open, onClose, tab = "details", data = {} }: BookingSidePanelProps) {
  const [activeTab, setActiveTab] = useState<"details" | "notes" | "history">(
    tab === "notes" ? "notes" : tab === "history" ? "history" : "details"
  );

  const isViewTab = tab === "details" || tab === "notes" || tab === "history";
  const isEditOrCreate = !isViewTab;

  return (
    <SidePanel open={open} onClose={onClose} width={400}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* Scrollable content */}
        <div className={css.content} style={{ padding: "24px 24px 0" }}>
          {isViewTab ? (
            <ViewHeader
              data={data}
              tab={activeTab}
              onTabChange={setActiveTab}
              onClose={onClose}
            />
          ) : (
            <BookingForm
              tab={tab}
              data={data}
              onClose={onClose}
            />
          )}
          <div style={{ height: 16 }} />
        </div>

        {/* Sticky bottom actions */}
        {isViewTab && <ViewActions data={data} onClose={onClose} />}
        {isEditOrCreate && (
          <Actions
            variant="sticky-panel"
            leftActions={[{ label: "Cancel", variant: "secondary", onClick: onClose }]}
            rightActions={[{ label: tab.startsWith("create") ? "Create booking" : "Save", variant: "primary", onClick: data.onSave }]}
          />
        )}

      </div>
    </SidePanel>
  );
}
