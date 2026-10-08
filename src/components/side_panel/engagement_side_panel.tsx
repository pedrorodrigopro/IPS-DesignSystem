// EngagementSidePanel — Figma node 1644:28000 (Sidepanel/BM/Engagement)
// Content node: 1644:27981 (.Booking/Engagement sidepanel content)
// Width: 400px | Shadow: -6px 0 12px rgba(27,72,195,0.2) | Radius: 8px 0 0 8px
//
// Header:
//   Left:  engagement icon (20×20) + title "New/Heading 4" (20px 600 blue-0)
//   Right: two iconTertiary buttons (external link + close)
//   Below: "Engagement" type label at padding-left:28px (New/Body unselected = 14px 400 blue-2)
//
// Content (scrollable, gap 16):
//   Role Subtitle row — ID | State | Privacy | Participant (14px 400, bold parts)
//   Owner — label + WorkforceMember link chip + add icon button
//   Divider
//   Description — "Description" H5 + body text + "show more" link
//   Dates — Duration | Time left + Date created | Roles & Filled (read-only KV grid)
//   Divider
//   Budget vs Cost — title + bar chart (simplified) + legend + Budget/Cost KV
//   Divider
//   Details — Privacy (KV + info icon) | Service Line Group | Requested by
//   Divider
//   Creator — read-only label + link name
//
// Actions/Overlays sticky — Cancel (secondary) | Create booking (primary)

import React from "react";
import { SidePanel }      from "./side_panel";
import css from "./side_panel.module.scss";
import { Header }         from "../header/header";
import { Divider }        from "../divider/divider";
import { Icon }           from "../icon/icon";
import { Button }         from "../button/button";
import { WorkforceMember }from "../workforce_member/workforce_member";
import { PillWFState }    from "../pill/pill";
import { Actions }        from "../actions/actions";

import type { WFState } from "../pill/pill";

// ── Typography — exact Figma text styles ──────────────────────────────────────

// New/Heading 4: 20px 600 blue-0
const h4: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 20, fontWeight: 600,
  color: "var(--palette-blue-0)", lineHeight: "125%",
};
// New/Heading 5: 16px 600 blue-0
const h5: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 16, fontWeight: 600,
  color: "var(--palette-blue-0)", lineHeight: "125%",
};
// New/Body unselected: 14px 400 blue-0
const bodyReg: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
  color: "var(--palette-blue-0)", lineHeight: "115%",
};
// New/Body selected: 14px 700 blue-0
const bodyBold: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
  color: "var(--palette-blue-0)", lineHeight: "115%",
};
// New/Label regular: 12px 400 blue-2
const labelReg: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-2)", lineHeight: "150%",
};
// New/Body selected primary: 14px 700 primary-0 (links)
const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
  color: "var(--palette-primary-0)", lineHeight: "115%",
  background: "none", border: "none", cursor: "pointer", padding: 0,
};
// Type label below header: 14px 400 blue-2 (padded 28px left = icon 20 + gap 8)
const typeLabel: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
  color: "var(--palette-blue-2)", lineHeight: "115%",
};

// ── Subtitle row — "Label **Bold**" mixed text ────────────────────────────────
// Figma: "ID **100000064**" etc — label text + bold value separated by vertical divider

function SubtitleItem({ label, value }: { label: string; value: string }) {
  return (
    <span style={bodyReg}>
      {label}{" "}<span style={bodyBold}>{value}</span>
    </span>
  );
}

function VertDivider() {
  return <div style={{ width: 1, height: 18, background: "var(--palette-neutral-0)", flexShrink: 0 }} />;
}

// ── Read-only KV field (Entered=True, Read only=True) ─────────────────────────
// Figma: label (12px 400 blue-2) + value (14px 400 blue-0)

function KVField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
      <span style={labelReg}>{label}</span>
      <span style={bodyReg}>{value || "—"}</span>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type EngagementSidePanelData = {
  // Header
  title:         string;
  wfState?:      WFState;
  // Subtitle row
  id?:           string;
  state?:        string;
  privacy?:      string;
  participant?:  string;
  // Owner
  ownerName?:    string;
  ownerInitials?: string;
  // Description
  description?:  string;
  // Dates
  duration?:     string;
  timeLeft?:     string;
  dateCreated?:  string;
  roles?:        string;
  filled?:       string;
  // Budget vs Cost
  budget?:       string;
  cost?:         string;
  // Details
  privacyValue?:    string;
  serviceLineGroup?: string;
  requestedBy?:     string;
  // Creator
  creatorName?:     string;
  creatorInitials?: string;
  // Actions
  onCreateBooking?:       () => void;
};

export type EngagementSidePanelProps = {
  open:    boolean;
  onClose: () => void;
  data:    EngagementSidePanelData;
};

// ── Component ─────────────────────────────────────────────────────────────────

export function EngagementSidePanel({ open, onClose, data }: EngagementSidePanelProps) {
  return (
    <SidePanel open={open} onClose={onClose} width={400}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* ── Header section (padding-bottom 16px, outside scroll) ── */}
        <div style={{ padding: "24px 24px 16px", flexShrink: 0 }}>
          {/* Title row: icon + name | action buttons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 }}>
              {/* engagement icon 20×20 */}
              <Icon name="engagement" size={20} style={{ color: "var(--palette-blue-2)", flexShrink: 0 }} />
              <span style={{ ...h4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.title}</span>
            </div>
            <div style={{ display: "flex", gap: 4, flexShrink: 0, marginLeft: 8 }}>
              <Button kind="iconTertiary" size="regular" title="Open engagement" onClick={data.onCreateBooking}>
                <Icon name="open" size={16} />
              </Button>
              <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
                <Icon name="cross" size={16} />
              </Button>
            </div>
          </div>
          {/* Type label — padding-left 28px (icon 20 + gap 8) */}
          <span style={{ ...typeLabel, paddingLeft: 28 }}>Engagement</span>
        </div>

        {/* ── Scrollable content ── */}
        <div className={css.content} style={{ padding: "0 24px" }}>

          {/* Role Subtitle — wrapping row, gap 8, padding-bottom 16px */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, paddingBottom: 16 }}>
            {data.id        && <SubtitleItem label="ID"          value={data.id} />}
            {data.id && data.state && <VertDivider />}
            {data.state     && <SubtitleItem label="State"       value={data.state} />}
            {data.state && data.privacy && <VertDivider />}
            {data.privacy   && <SubtitleItem label="Privacy"     value={data.privacy} />}
            {data.privacy && data.participant && <VertDivider />}
            {data.participant && <SubtitleItem label="Participant" value={data.participant} />}
          </div>

          {/* Owner row — gap 16 */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
              <span style={labelReg}>Owner</span>
              {data.ownerName
                ? <WorkforceMember variant="small-1line" name={data.ownerName} initials={data.ownerInitials} />
                : <button style={{ ...linkStyle, textAlign: "left" }}>Add owner</button>}
            </div>
            <Button kind="icon" size="regular" title="Add owner">
              <Icon name="owner" size={16} />
            </Button>
          </div>

          <Divider orientation="horizontal" />

          {/* Description */}
          {data.description && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={h5}>Description</span>
              <span style={bodyReg}>{data.description}</span>
              <button style={{ ...linkStyle, textAlign: "left" }}>show more</button>
            </div>
          )}

          {/* Dates — three rows of KV pairs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.duration && (
              <KVField label="Duration" value={data.duration} />
            )}
            {(data.timeLeft || data.dateCreated) && (
              <div style={{ display: "flex", gap: 8 }}>
                {data.timeLeft    && <KVField label="Time left"    value={data.timeLeft} />}
                {data.dateCreated && <KVField label="Date created" value={data.dateCreated} />}
              </div>
            )}
            {(data.roles || data.filled) && (
              <div style={{ display: "flex", gap: 8 }}>
                {data.roles  && <KVField label="Roles"  value={data.roles} />}
                {data.filled && <KVField label="Filled" value={data.filled} />}
              </div>
            )}
          </div>

          <Divider orientation="horizontal" />

          {/* Budget vs Cost */}
          {(data.budget || data.cost) && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={h5}>Budget vs Cost</span>
              {/* Simplified bar chart */}
              <div style={{ height: 8, borderRadius: 4, background: "var(--palette-neutral-0)", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "62%", background: "#5470C6", borderRadius: "4px 0 0 4px" }} />
                <div style={{ position: "absolute", left: "62%", top: 0, bottom: 0, right: 0, background: "#91CC75", borderRadius: "0 4px 4px 0" }} />
              </div>
              {/* Legend */}
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 2, background: "#5470C6", flexShrink: 0 }} />
                  <span style={labelReg}>Budget</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 2, background: "#91CC75", flexShrink: 0 }} />
                  <span style={labelReg}>Cost</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {data.budget && <KVField label="Budget" value={data.budget} />}
                {data.cost   && <KVField label="Cost"   value={data.cost}   />}
              </div>
            </div>
          )}

          <Divider orientation="horizontal" />

          {/* Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.privacyValue && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <KVField label="Privacy" value={data.privacyValue} />
                <Icon name="info" size={14} style={{ color: "var(--palette-blue-2)", marginBottom: 4, flexShrink: 0 }} />
              </div>
            )}
            {(data.serviceLineGroup || data.requestedBy) && (
              <div style={{ display: "flex", gap: 8 }}>
                {data.serviceLineGroup && <KVField label="Service Line Group" value={data.serviceLineGroup} />}
                {data.requestedBy     && <KVField label="Requested by"        value={data.requestedBy}     />}
              </div>
            )}
          </div>

          <Divider orientation="horizontal" />

          {/* Creator */}
          {data.creatorName && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={labelReg}>Creator</span>
              <WorkforceMember variant="small-1line" name={data.creatorName} initials={data.creatorInitials} />
            </div>
          )}

          <div style={{ height: 8 }} />
        </div>

        {/* ── Sticky actions ── */}
        <Actions
          variant="sticky-panel"
          leftActions={[{ label: "Cancel",           variant: "secondary", onClick: onClose }]}
          rightActions={[{ label: "Create booking", variant: "primary",   onClick: data.onCreateBooking }]}
        />

      </div>
    </SidePanel>
  );
}
