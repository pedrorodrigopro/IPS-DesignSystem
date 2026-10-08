// ProfileSidePanel — Figma node 1601:20413 (Sidepanel/Profile)
// Source: IPS Components adFvaOeh8E3AKLFKRjYD3r / .Profile/Sidepanel content 1606:23085
//
// Structure (exact from Figma):
//   Top:
//     Left  — Avatar (big) + datapoints: Name (H5), Job title label+value,
//              Location label+value, Starting date label+value, Languages label+value
//     Right — open icon button + cross icon button
//   Actions row:
//     Left  — View full profile (primary) + Matching roles (secondary) + chat icon btn
//   Divider
//   Contact: Header + mail / mobile / web rows
//   Divider
//   Availability: Header + [secondary btn + icon btn] + calendar content
//   Divider
//   Core Skills: Header + SkillProfile chips (wrapped)
//   Divider
//   Other skills: Header + [small secondary btn] + Accordion × 3
//   Divider
//   Job level: Header + plain text value (NOT a pill)
//   Divider
//   Location: Header + plain text value
//   Divider
//   Clients: Header + plain text values
//   Divider
//   Industry knowledge: Header + SkillProfile chips
//   Divider
//   Bio: Header + label-regular text

import React from "react";
import { SidePanel }      from "./side_panel";
import css from "./side_panel.module.scss";
import { Header }         from "../header/header";
import { Divider }        from "../divider/divider";
import { Icon }           from "../icon/icon";
import { Button }         from "../button/button";
import { Accordion }      from "../accordion/accordion";
import { SkillProfile }   from "../skill/skill";
import { Avatar }         from "../avatar/avatar";
import { useState }       from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ProfileSidePanelSkill = {
  label: string;
  proficiency: "basic" | "intermediate" | "advanced";
  core?: boolean;
  verified?: boolean;
  verifiedCredy?: boolean;
  development?: boolean;
};

export type ProfileSidePanelData = {
  // Top — WorkforceMember datapoints
  name:           string;
  initials?:      string;
  avatarSrc?:     string;
  jobTitle?:      string;
  location?:      string;
  startingDate?:  string;
  languages?:     string;
  // Contact
  email?:         string;
  phone?:         string;
  website?:       string;
  // Availability
  availabilityPct?:  number;
  availabilityFrom?: string;
  availabilityTo?:   string;
  // Skills
  coreSkills?:        ProfileSidePanelSkill[];
  otherSkillGroups?:  { label: string; skills: ProfileSidePanelSkill[] }[];
  industryKnowledge?: ProfileSidePanelSkill[];
  // Attributes — plain text, NOT pills
  jobLevel?:      string;
  officeLocation?: string;
  clients?:       string[];
  // Bio
  bio?:           string;
};

export type ProfileSidePanelProps = {
  open:              boolean;
  onClose:           () => void;
  onOpenProfile?:    () => void;
  onMatchingRoles?:  () => void;
  data:              ProfileSidePanelData;
};

// ── Typography helpers ────────────────────────────────────────────────────────

// From Figma: New/Label regular = 12px 400, New/Label bold = 12px 700
const labelRegular: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};
const labelBold: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 700,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};
const labelMuted: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-2)", lineHeight: "150%",
};

// ── Datapoint row: "Label" + "Bold value" ─────────────────────────────────────
// From Figma: layout_5GJD3L = column, gap 0

function DatapointRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <span style={labelMuted}>{label}</span>
      <span style={labelBold}>{value}</span>
    </div>
  );
}

// ── Availability mini-calendar ────────────────────────────────────────────────

const CAL_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const CAL_WEEKS = [
  ["31", "01", "02", "03", "04", "05", "06"],
  ["07", "08", "09", "10", "11", "12", "13"],
  ["14", "15", "16", "17", "18", "19", "20"],
  ["21", "22", "23", "24", "25", "26", "27"],
  ["28", "29", "30", "01", "02", "03", "04"],
];
const CAL_BOOKINGS: { week: number; startDay: number; endDay: number; label: string }[] = [
  { week: 0, startDay: 2, endDay: 6, label: "Data Quality Project - 153h" },
  { week: 2, startDay: 0, endDay: 6, label: "Compliance Programme - 60h" },
  { week: 3, startDay: 0, endDay: 6, label: "Compliance Programme - 60h" },
  { week: 4, startDay: 0, endDay: 2, label: "Compliance Programme - 60h" },
];

function AvailabilityCalendar({ pct, from, to }: { pct: number; from?: string; to?: string }) {
  const [month, setMonth] = useState("September");
  const [year,  setYear]  = useState("2026");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Month / year selectors + prev/next */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ height: 32, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 10px", display: "flex", alignItems: "center", gap: 4, background: "white", cursor: "pointer" }}>
            <span style={labelBold}>{month}</span>
            <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)" }} />
          </div>
          <div style={{ height: 32, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 10px", display: "flex", alignItems: "center", gap: 4, background: "white", cursor: "pointer" }}>
            <span style={labelBold}>{year}</span>
            <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          <Button kind="iconTertiary" size="regular" title="Previous"><Icon name="chevron-left" size={14} /></Button>
          <Button kind="iconTertiary" size="regular" title="Next"><Icon name="chevron-right" size={14} /></Button>
        </div>
      </div>

      {/* Calendar grid */}
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <thead>
          <tr>
            {CAL_DAYS.map((d, i) => (
              <th key={i} style={{ padding: "3px 1px", textAlign: "center", fontFamily: "var(--font-family)", fontSize: 11, fontWeight: 600, color: "var(--palette-blue-2)", width: "14.28%" }}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CAL_WEEKS.map((week, wi) => {
            const booking = CAL_BOOKINGS.find(b => b.week === wi);
            return (
              <React.Fragment key={wi}>
                <tr>
                  {week.map((day, di) => (
                    <td key={di} style={{ padding: "2px 1px", textAlign: "center" }}>
                      <span style={{ fontFamily: "var(--font-family)", fontSize: 11, fontWeight: 400, color: "var(--palette-blue-0)" }}>{day}</span>
                    </td>
                  ))}
                </tr>
                {booking && (
                  <tr>
                    <td colSpan={7} style={{ padding: "1px 0" }}>
                      <div style={{
                        background: "var(--palette-orange-0)",
                        borderRadius: 2,
                        padding: "2px 4px",
                        marginLeft: `${booking.startDay * (100/7)}%`,
                        marginRight: `${(6 - booking.endDay) * (100/7)}%`,
                      }}>
                        <span style={{ fontFamily: "var(--font-family)", fontSize: 10, fontWeight: 600, color: "var(--palette-blue-0)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
                          {booking.label}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Availability % + date range */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {from && to && <span style={labelMuted}>{from} – {to}</span>}
        <span style={{ ...labelBold, color: "var(--palette-green-0)", marginLeft: "auto" }}>{pct}% available</span>
      </div>

      {/* Legend row */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
        <Icon name="info" size={14} style={{ color: "var(--palette-blue-2)" }} />
        <span style={labelMuted}>Legend</span>
        <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)" }} />
      </div>
    </div>
  );
}

// ── Contact row: icon + text ──────────────────────────────────────────────────

function ContactRow({ icon, value }: { icon: "mail" | "mobile" | "web"; value: string }) {
  const iconName = icon === "web" ? "link" : icon === "mobile" ? "phone" : "mail";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Icon name={iconName} size={14} style={{ color: "var(--palette-blue-2)", flexShrink: 0 }} />
      <span style={labelRegular}>{value}</span>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ProfileSidePanel({
  open, onClose, onOpenProfile, onMatchingRoles, data,
}: ProfileSidePanelProps) {
  // Width 600 — from Figma layout_YBAFH8.dimensions.width: 600
  return (
    <SidePanel open={open} onClose={onClose} width={600}>
      <div className={css.content}>

        {/* ── Top: Avatar + datapoints (left) | open + cross icon buttons (right) ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>

          {/* WorkforceMember — big variant: Avatar + stacked datapoints */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1, minWidth: 0 }}>
            <Avatar initials={data.initials ?? data.name.slice(0, 2).toUpperCase()} size="big" />
            {/* Datapoints — column of label/value pairs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
              {/* Name — Heading 5 */}
              <span style={{ fontFamily: "var(--font-family)", fontSize: 16, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {data.name}
              </span>
              {data.jobTitle    && <DatapointRow label="Job title"     value={data.jobTitle} />}
              {data.location    && <DatapointRow label="Location"      value={data.location} />}
              {data.startingDate && <DatapointRow label="Starting date" value={data.startingDate} />}
              {data.languages   && <DatapointRow label="Languages"     value={data.languages} />}
            </div>
          </div>

          {/* Top-right icon buttons: open profile (open icon) + close (cross icon) */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <Button kind="iconTertiary" size="regular" title="Open full profile" onClick={onOpenProfile}>
              <Icon name="open" size={16} />
            </Button>
            <Button kind="iconTertiary" size="regular" title="Close panel" onClick={onClose}>
              <Icon name="cross" size={16} />
            </Button>
          </div>
        </div>

        {/* ── Actions row: View full profile (primary) + Matching roles (secondary) + chat ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Button kind="primary" size="regular" onClick={onOpenProfile}>View full profile</Button>
            <Button kind="secondary" size="regular" onClick={onMatchingRoles}>Matching roles</Button>
            <Button kind="icon" size="regular" title="Chat">
              <Icon name="chat" size={16} />
            </Button>
          </div>
        </div>

        <Divider orientation="horizontal" />

        {/* ── Contact ── */}
        {(data.email || data.phone || data.website) && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Header size="content" title="Contact" />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {data.email   && <ContactRow icon="mail"   value={data.email} />}
                {data.phone   && <ContactRow icon="mobile" value={data.phone} />}
                {data.website && <ContactRow icon="web"    value={data.website} />}
              </div>
            </div>
            <Divider orientation="horizontal" />
          </>
        )}

        {/* ── Availability ── */}
        {data.availabilityPct !== undefined && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Header size="content" title="Availability" />
                <div style={{ display: "flex", gap: 4 }}>
                  <Button kind="secondary" size="small">Book</Button>
                  <Button kind="icon" size="regular" title="Availability settings">
                    <Icon name="calendar" size={16} />
                  </Button>
                </div>
              </div>
              <AvailabilityCalendar
                pct={data.availabilityPct}
                from={data.availabilityFrom}
                to={data.availabilityTo}
              />
            </div>
            <Divider orientation="horizontal" />
          </>
        )}

        {/* ── Core skills ── */}
        {(data.coreSkills?.length ?? 0) > 0 && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Header size="content" title="Core Skills" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {data.coreSkills!.map(s => (
                  <SkillProfile key={s.label} label={s.label} proficiency={s.proficiency}
                    core={s.core} verified={s.verified} verifiedCredy={s.verifiedCredy} development={s.development} />
                ))}
              </div>
            </div>
            <Divider orientation="horizontal" />
          </>
        )}

        {/* ── Other skills (accordion groups) ── */}
        {(data.otherSkillGroups?.length ?? 0) > 0 && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Header size="content" title="Other skills" />
                <Button kind="secondary" size="small">Add skill</Button>
              </div>
              {data.otherSkillGroups!.map(group => (
                <Accordion key={group.label} title={group.label} size="body" defaultExpanded={false}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 8 }}>
                    {group.skills.map(s => (
                      <SkillProfile key={s.label} label={s.label} proficiency={s.proficiency} verified={s.verified} />
                    ))}
                  </div>
                </Accordion>
              ))}
            </div>
            <Divider orientation="horizontal" />
          </>
        )}

        {/* ── Job level — plain text, NOT a pill ── */}
        {data.jobLevel && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Header size="content" title="Job level" />
              <span style={labelRegular}>{data.jobLevel}</span>
            </div>
            <Divider orientation="horizontal" />
          </>
        )}

        {/* ── Office Location — plain text ── */}
        {data.officeLocation && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Header size="content" title="Location" />
              <span style={labelRegular}>{data.officeLocation}</span>
            </div>
            <Divider orientation="horizontal" />
          </>
        )}

        {/* ── Clients — plain text list ── */}
        {(data.clients?.length ?? 0) > 0 && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Header size="content" title="Clients" />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {data.clients!.map(c => <span key={c} style={labelRegular}>{c}</span>)}
              </div>
            </div>
            <Divider orientation="horizontal" />
          </>
        )}

        {/* ── Industry knowledge — SkillProfile chips ── */}
        {(data.industryKnowledge?.length ?? 0) > 0 && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Header size="content" title="Industry knowledge" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {data.industryKnowledge!.map(s => (
                  <SkillProfile key={s.label} label={s.label} proficiency={s.proficiency} />
                ))}
              </div>
            </div>
            <Divider orientation="horizontal" />
          </>
        )}

        {/* ── Bio — label-regular text (12px 400) ── */}
        {data.bio && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Header size="content" title="Bio" />
            <p style={labelRegular}>{data.bio}</p>
          </div>
        )}

      </div>
    </SidePanel>
  );
}
