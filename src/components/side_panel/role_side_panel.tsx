// RoleSidePanel — Figma node 1644:29133 (Sidepanel/BM/Role)
// Content node: 1644:29890 (.Booking/Role sidepanel content)
// Width: 400px | Shadow: -6px 0 12px rgba(27,72,195,0.2) | Radius: 8px 0 0 8px
//
// Header:
//   Left:  role icon (20×20) + title "Project Manager" (New/Heading 4 = 20px 600)
//   Right: two iconTertiary buttons
//   Below: "Role" type label at padding-left:28px (14px 400 blue-2)
//
// Content (scrollable, gap 16):
//   Role Subtitle row — PillWFState(Shortlisting) | Pill/ActivityTag("RM to review") |
//                       ID | State | Privacy | Participant (mixed bold text)
//   Object card (neutral-2 bg, 8px padding, 8px radius):
//     Header: "Engagement" label + workforce tab icon + open icon
//     Body: engagement name link "Front end team Q2..."
//   Divider
//   Owner row — Owner label + WorkforceMember chips + add icon button
//   Divider
//   Description — "Description" H5 + body text + "show more" link
//   Dates — Duration | Time left + Date created | Roles & Filled
//   Skills — "Skills" header + wrapped SkillProfile chips
//   Divider
//   Privacy — Privacy KV + info icon | another KV field
//   Divider
//   Creator — label + WorkforceMember link
//   (No sticky actions)

import React from "react";
import { SidePanel }      from "./side_panel";
import css from "./side_panel.module.scss";
import { Header }         from "../header/header";
import { Divider }        from "../divider/divider";
import { Icon }           from "../icon/icon";
import { Button }         from "../button/button";
import { WorkforceMember }from "../workforce_member/workforce_member";
import { PillWFState, PillSimple } from "../pill/pill";
import { SkillProfile }   from "../skill/skill";

import type { WFState } from "../pill/pill";

// ── Typography — exact Figma text styles ──────────────────────────────────────

const h4: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 20, fontWeight: 600,
  color: "var(--palette-blue-0)", lineHeight: "125%",
};
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

// ── Shared helpers ────────────────────────────────────────────────────────────

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

function KVField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
      <span style={labelReg}>{label}</span>
      <span style={bodyReg}>{value || "—"}</span>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type RoleSidePanelSkill = {
  label:       string;
  proficiency: "basic" | "intermediate" | "advanced";
  core?:       boolean;
  verified?:   boolean;
};

export type RoleSidePanelData = {
  // Header
  title:         string;
  wfState?:      WFState;
  activityTag?:  string;
  // Subtitle
  id?:           string;
  state?:        string;
  privacy?:      string;
  participant?:  string;
  // Object card — engagement reference
  engagementName?:     string;
  engagementLabel?:    string; // defaults "Engagement"
  onOpenEngagement?:   () => void;
  // Owner
  owners?:       { name: string; initials: string }[];
  // Description
  description?:  string;
  // Dates
  duration?:     string;
  timeLeft?:     string;
  dateCreated?:  string;
  rolesCount?:   string;
  filled?:       string;
  // Skills
  skills?:       RoleSidePanelSkill[];
  // Privacy section
  privacyValue?: string;
  privacyInfo?:  string;
  // Creator
  creatorName?:     string;
  creatorInitials?: string;
};

export type RoleSidePanelProps = {
  open:    boolean;
  onClose: () => void;
  data:    RoleSidePanelData;
};

// ── Component ─────────────────────────────────────────────────────────────────

export function RoleSidePanel({ open, onClose, data }: RoleSidePanelProps) {
  return (
    <SidePanel open={open} onClose={onClose} width={400}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* ── Header: outside scroll — no gap contribution ── */}
        <div style={{ padding: "24px 24px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 }}>
              <Icon name="role" size={20} style={{ color: "var(--palette-blue-2)", flexShrink: 0 }} />
              <span style={{ ...h4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.title}</span>
            </div>
            <div style={{ display: "flex", gap: 4, flexShrink: 0, marginLeft: 8 }}>
              <Button kind="iconTertiary" size="regular" title="External link" onClick={data.onOpenEngagement}>
                <Icon name="open" size={16} />
              </Button>
              <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
                <Icon name="cross" size={16} />
              </Button>
            </div>
          </div>
          {/* Type label — padding-left 28px (icon 20 + gap 8) */}
          <span style={{ ...labelReg, paddingLeft: 28 }}>Role</span>
        </div>

        {/* ── Scrollable content — gap:16px from .content class ── */}
        <div className={css.content} style={{ padding: "16px 24px 24px" }}>

        {/* ── Role Subtitle — WF state pill + activity tag pill + text items ── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
          {data.wfState    && <PillWFState state={data.wfState} size="small" />}
          {data.activityTag && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 16, background: "var(--palette-neutral-0)" }}>
              <Icon name="tag" size={14} style={{ color: "var(--palette-blue-0)" }} />
              <span style={{ fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-0)" }}>{data.activityTag}</span>
            </div>
          )}
          {data.id          && <SubtitleItem label="ID"          value={data.id} />}
          {data.id && data.state && <VertDivider />}
          {data.state       && <SubtitleItem label="State"       value={data.state} />}
          {data.state && data.privacy && <VertDivider />}
          {data.privacy     && <SubtitleItem label="Privacy"     value={data.privacy} />}
          {data.privacy && data.participant && <VertDivider />}
          {data.participant && <SubtitleItem label="Participant"  value={data.participant} />}
        </div>

        {/* ── Object card — engagement reference ── */}
        {/* Figma: neutral-2 bg (#F8F9FD), 8px padding, 8px radius, 352px width */}
        {data.engagementName && (
          <div style={{
            background: "var(--palette-neutral-2)",
            borderRadius: "var(--radius-md)",
            padding: 8,
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            {/* Card header: label + action buttons */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="engagement" size={14} style={{ color: "var(--palette-blue-2)" }} />
                <span style={labelReg}>{data.engagementLabel ?? "Engagement"}</span>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <Button kind="iconTertiary" size="regular" title="Show in workforce tab">
                  <Icon name="profiles" size={14} />
                </Button>
                <Button kind="iconTertiary" size="regular" title="Open engagement" onClick={data.onOpenEngagement}>
                  <Icon name="open" size={14} />
                </Button>
              </div>
            </div>
            {/* Engagement name link */}
            <button style={{ ...linkStyle, textAlign: "left", paddingLeft: 22 }}>{data.engagementName}</button>
          </div>
        )}

        <Divider orientation="horizontal" />

        {/* ── Owner row ── */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            <span style={labelReg}>Owner</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.owners?.length
                ? data.owners.map(o => (
                    <WorkforceMember key={o.name} variant="small-1line" name={o.name} initials={o.initials} />
                  ))
                : <button style={{ ...linkStyle, textAlign: "left" }}>Add owner</button>}
            </div>
          </div>
          <Button kind="icon" size="regular" title="Add owner">
            <Icon name="owner" size={16} />
          </Button>
        </div>

        <Divider orientation="horizontal" />

        {/* ── Description ── */}
        {data.description && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={h5}>Description</span>
            <span style={bodyReg}>{data.description}</span>
            <button style={{ ...linkStyle, textAlign: "left" }}>show more</button>
          </div>
        )}

        {/* ── Dates ── */}
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
          {(data.rolesCount || data.filled) && (
            <div style={{ display: "flex", gap: 8 }}>
              {data.rolesCount && <KVField label="Roles"  value={data.rolesCount} />}
              {data.filled     && <KVField label="Filled" value={data.filled}     />}
            </div>
          )}
        </div>

        {/* ── Skills ── */}
        {(data.skills?.length ?? 0) > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Header size="content" title="Skills" />
            {/* Wrapped row of SkillProfile chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.skills!.map(s => (
                <SkillProfile
                  key={s.label}
                  label={s.label}
                  proficiency={s.proficiency}
                  core={s.core}
                  verified={s.verified}
                />
              ))}
            </div>
          </div>
        )}

        <Divider orientation="horizontal" />

        {/* ── Privacy ── */}
        {(data.privacyValue || data.privacyInfo) && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.privacyValue && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <KVField label="Privacy" value={data.privacyValue} />
                <Icon name="info" size={14} style={{ color: "var(--palette-blue-2)", marginBottom: 4, flexShrink: 0 }} />
              </div>
            )}
            {data.privacyInfo && (
              <KVField label="Privacy info" value={data.privacyInfo} />
            )}
          </div>
        )}

        <Divider orientation="horizontal" />

        {/* ── Creator ── */}
        {data.creatorName && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={labelReg}>Creator</span>
            <WorkforceMember variant="small-1line" name={data.creatorName} initials={data.creatorInitials} />
          </div>
        )}

        </div>
        {/* No sticky actions on Role panel */}
      </div>
    </SidePanel>
  );
}
