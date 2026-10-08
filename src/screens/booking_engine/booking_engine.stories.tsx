// Screens/BookingEngine — Figma: l3JiE7ZmAsjSZY5Z7yPCOZ node 2:261721
// Variant: Tab=Overview / Projects tab / View=Engagements / Gantt / Group / Show Role level
//
// Layout (from Figma):
//   Full-width page, no sidebar. Navbar + page content.
//   Top bar: Header "Booking Engine" + date range + billable utilisation
//   Tab row: Overview | Approvals (Navigation horizontal)
//   Toolbar: filter/tag/cross/add icon buttons + "Engagements" dropdown (right)
//   Content: split — left 370px (engagement table) | right fill (Gantt calendar)
//   Bottom bar: Pagination + timeline scroll indicator
//
// Booking pill colours (from Figma fills):
//   Booking Blue:        rgba(124,168,237,0.8)  border #1C4B94
//   Engagement booked:   rgba(106,130,197,0.8)  border #6A82C5
//   Engagement partial:  rgba(255,255,255,0.4)  border #6A82C5
//   Role partial:        rgba(255,255,255,0.4)  border #1AAFA3
//   Role booked:         rgba(26,175,163,0.8)   border #1AAFA3
//
// Container mapping (RULE 2b):
//   Left panel:  Tile object-light (white bg + 1px #CFDAF7 border), padding:0
//   Gantt area:  white bg div, overflow hidden
//   Bottom bar:  white bg + upward shadow (Actions sticky-screen pattern)

import type { Meta, StoryObj } from "@storybook/react";
import { useState, useRef, useCallback } from "react";

import { Navbar }       from "../../components/navbar/navbar";
import { Header }       from "../../components/header/header";
import { Navigation }   from "../../components/navigation/navigation";
import { Tile }         from "../../components/tile/tile";
import { Icon }         from "../../components/icon/icon";
import { Button }       from "../../components/button/button";
import { Checkbox }     from "../../components/checkbox/checkbox";
import { Avatar }       from "../../components/avatar/avatar";
import { PillSimple, PillWFState } from "../../components/pill/pill";
import { Pagination }   from "../../components/pagination/pagination";
import { InputSearch, InputSelect } from "../../components/input/input";
import { Divider }      from "../../components/divider/divider";
import { BookingPill }  from "../../components/booking_pill/booking_pill";
import type { BookingPillCategory } from "../../components/booking_pill/booking_pill";
import { WorkforceMember } from "../../components/workforce_member/workforce_member";
import { BookingCell }  from "../../components/booking_cell/booking_cell";
import type { BookingCellCategory } from "../../components/booking_cell/booking_cell";

import type { WFState } from "../../components/pill/pill";

// ── Typography helpers ────────────────────────────────────────────────────────

const bodyBold: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%" };
const body:     React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%" };
const labelCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%" };
const linkCss:  React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-primary-0)", lineHeight: "150%" };

function Row({ children, gap = 8, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", alignItems: "center", gap, ...style }}>{children}</div>;
}
function SB({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...style }}>{children}</div>;
}

// ── Gantt calendar header ─────────────────────────────────────────────────────

const WEEKS = [
  { label: "31 Aug - 6 Sep (W36)", days: ["Mo 31","Tu 1","We 2","Th 3","Fr 4","Sa 5","Su 6"] },
  { label: "7 Sep - 13 Sep (W37)", days: ["Mo 7","Tu 8","We 9","Th 10","Fr 11","Sa 12","Su 13"] },
  { label: "14 Sep - 20 Sep (W38)", days: ["Mo 14","Tu 15","We 16","Th 17","Fr 18","Sa 19","Su 20"] },
  { label: "21 Sep - 27 Sep (W39)", days: ["Mo 21","Tu 22","We 23","Th 24","Fr 25","Sa 26","Su 27"] },
];

function GanttHeader({ colW = GANTT_COL_DEFAULT }: { colW?: number }) {
  const totalW = colW * GANTT_TOTAL_COLS;
  return (
    <div style={{ background: "white", width: totalW, minWidth: totalW }}>
      {/* Week labels */}
      <div style={{ display: "flex" }}>
        {WEEKS.map(w => (
          <div key={w.label} style={{ width: 7 * colW, flexShrink: 0, padding: "4px 8px", borderRight: "1px solid var(--palette-neutral-0)", fontFamily: "var(--font-family)", fontSize: 11, fontWeight: 600, color: "var(--palette-blue-2)" }}>
            {w.label}
          </div>
        ))}
      </div>
      {/* Day labels */}
      <div style={{ display: "flex" }}>
        {WEEKS.flatMap(w => w.days).map((d, i) => (
          <div key={i} style={{ width: colW, flexShrink: 0, padding: "2px 4px", borderRight: "1px solid var(--palette-neutral-0)", fontFamily: "var(--font-family)", fontSize: 10, color: "var(--palette-blue-2)", textAlign: "center" }}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Gantt row ─────────────────────────────────────────────────────────────────

// Each Gantt row aligns with a left-panel row (60px height)
// Pills are positioned absolutely across the day columns
const GANTT_TOTAL_COLS = 28; // 4 weeks × 7 days
const GANTT_COL_MIN = 24;
const GANTT_COL_MAX = 96;
const GANTT_COL_DEFAULT = 48;

function GanttRow({ height = 60, pills, colW }: {
  height?: number;
  pills?: { category: BookingPillCategory; label: string; hours?: string; startCol: number; spanCols: number }[];
  colW?: number;
}) {
  const totalCols = GANTT_TOTAL_COLS;
  const cw = colW ?? GANTT_COL_DEFAULT;
  const totalW = cw * totalCols;
  return (
    <div style={{ position: "relative", height, borderBottom: "1px solid var(--palette-neutral-0)", display: "flex", width: totalW, minWidth: totalW }}>
      {/* Day column grid lines */}
      {Array.from({ length: totalCols }).map((_, i) => (
        <div key={i} style={{ width: cw, flexShrink: 0, borderRight: "1px solid var(--palette-neutral-0)", height: "100%" }} />
      ))}
      {/* Booking pills */}
      {pills?.map((pill, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${(pill.startCol / totalCols) * 100}%`,
          width: `${(pill.spanCols / totalCols) * 100}%`,
          top: "50%", transform: "translateY(-50%)",
          padding: "0 2px",
        }}>
          <BookingPill
            category={pill.category}
            // Engagement and role pills show no text — only profile booking pills do
            label={
              pill.category === "engagement-booked" ||
              pill.category === "engagement-partial" ||
              pill.category === "role-booked" ||
              pill.category === "role-partial"
                ? ""
                : pill.label
            }
            hours={
              pill.category === "engagement-booked" ||
              pill.category === "engagement-partial" ||
              pill.category === "role-booked" ||
              pill.category === "role-partial"
                ? undefined
                : pill.hours
            }
          />
        </div>
      ))}
    </div>
  );
}

// ── Data — pills attached to each row so expand/collapse always aligns ────────

type GanttPill = { category: BookingPillCategory; label: string; hours?: string; startCol: number; spanCols: number };

type BookingEntry  = { name: string; hours: string; warning?: boolean; ganttPills?: GanttPill[] };
type RoleEntry     = { id: string; name: string; state: WFState; roleId: string; expiry: string; assignee: string; bookings: BookingEntry[]; ganttPills?: GanttPill[] };
type EngagementEntry = { id: string; name: string; state: string; resourcingBy: string; assignee: string; dueDays: string; startDate: string; roles: RoleEntry[]; rolesBooked: string; ganttPills?: GanttPill[] };

const ENGAGEMENTS: EngagementEntry[] = [
  {
    id: "e1", name: "smoke test Sep. 11", state: "new", resourcingBy: "17-10-2026", assignee: "-", dueDays: "16 days", startDate: "28-09-2026", rolesBooked: "0/2 Roles booked",
    ganttPills: [],
    roles: [
      { id: "e1r1", name: "Smoke Role A", state: "new",       roleId: "415020", expiry: "17-10-2026", assignee: "-", ganttPills: [], bookings: [] },
      { id: "e1r2", name: "Smoke Role B", state: "shortlisting", roleId: "415021", expiry: "17-10-2026", assignee: "Rutu Shah", ganttPills: [
          { category: "booking-blue", label: "Rutu Shah - Smoke B", hours: "40h", startCol: 0, spanCols: 14 },
        ],
        bookings: [{ name: "Rutu Shah", hours: "40h booked", ganttPills: [{ category: "booking-blue", label: "Rutu Shah - Smoke B", hours: "40h", startCol: 0, spanCols: 14 }] }],
      },
    ],
  },
  {
    id: "e2", name: "ST engagement test", state: "new", resourcingBy: "23-10-2026", assignee: "Fake Surname", dueDays: "23 days", startDate: "-", rolesBooked: "2/3 Roles booked",
    ganttPills: [
      { category: "engagement-booked",  label: "ST engagement test - ST Role#2", hours: "26% (10h)", startCol: 0,  spanCols: 7 },
      { category: "engagement-booked",  label: "ST engagement test - ST Role#2", hours: "26% (8h)",  startCol: 7,  spanCols: 7 },
      { category: "engagement-booked",  label: "ST engagement test",             hours: "26% (10h)", startCol: 14, spanCols: 6 },
      { category: "engagement-partial", label: "0% (0%)",                                            startCol: 20, spanCols: 3 },
    ],
    roles: [
      { id: "r1", name: "ST Role#3", state: "pending",   roleId: "415010", expiry: "23-10-2026", assignee: "Santiago A CV Upload", ganttPills: [], bookings: [] },
      {
        id: "r2", name: "ST Role#2", state: "confirmed", roleId: "415009", expiry: "23-10-2026", assignee: "Santiago A CV Upload",
        ganttPills: [
          { category: "role-partial", label: "ST Role#2",     hours: "26% (10h)", startCol: 7,  spanCols: 7 },
          { category: "role-partial", label: "ST Role#2",     hours: "26% (10h)", startCol: 14, spanCols: 7 },
          { category: "role-partial", label: "ST Role#2",     hours: "42% (10h)", startCol: 21, spanCols: 7 },
        ],
        bookings: [
          { name: "Bartosz Bartosz", hours: "666h booked", warning: true, ganttPills: [
            { category: "booking-blue", label: "Bartosz Bartosz",  hours: "40h", startCol: 0,  spanCols: 7 },
            { category: "booking-blue", label: "Bartosz Bartosz",  hours: "40h", startCol: 7,  spanCols: 7 },
            { category: "booking-blue", label: "Bartosz Bartosz",  hours: "40h", startCol: 14, spanCols: 7 },
            { category: "booking-blue", label: "Bartosz Bartosz",  hours: "40h", startCol: 21, spanCols: 7 },
          ]},
          { name: "Fake Surname", hours: "540h booked", ganttPills: [
            { category: "role-booked", label: "ST Role#2 - Fake Surname", hours: "100% (16h)", startCol: 0,  spanCols: 5 },
            { category: "role-booked", label: "ST Role#2 - Fake Surname", hours: "100% (24h)", startCol: 7,  spanCols: 5 },
            { category: "role-booked", label: "ST Role#2 - Fake Surname", hours: "100% (24h)", startCol: 14, spanCols: 5 },
            { category: "role-booked", label: "ST Role#2 - Fake Surname", hours: "100% (24h)", startCol: 21, spanCols: 5 },
          ]},
        ],
      },
      {
        id: "r3", name: "ST Role#1", state: "confirmed", roleId: "415008", expiry: "23-10-2026", assignee: "Krystal Hansen",
        ganttPills: [
          { category: "role-booked", label: "ST Role#1", hours: "100% (24h)", startCol: 0,  spanCols: 28 },
        ],
        bookings: [
          { name: "Krystal Hansen", hours: "2185h booked", ganttPills: [
            { category: "booking-blue", label: "Krystal Hansen", hours: "2185h", startCol: 0, spanCols: 28 },
          ]},
        ],
      },
    ],
  },
  {
    id: "e3", name: "Regression Blueprints", state: "new", resourcingBy: "30-06-2028", assignee: "Alexandra I. Poane", dueDays: "638 days", startDate: "28-09-2026", rolesBooked: "0/12 Roles booked",
    ganttPills: [{ category: "engagement-partial", label: "Regression Blueprints", startCol: 0, spanCols: 28 }],
    roles: [
      { id: "e3r1", name: "QA Engineer",          state: "new", roleId: "414001", expiry: "30-06-2028", assignee: "-",                    ganttPills: [], bookings: [] },
      { id: "e3r2", name: "Data Analyst",          state: "new", roleId: "414002", expiry: "30-06-2028", assignee: "-",                    ganttPills: [], bookings: [] },
      { id: "e3r3", name: "Tech Lead",             state: "shortlisting", roleId: "414003", expiry: "30-06-2028", assignee: "A. I Poane",  ganttPills: [
          { category: "booking-purple", label: "Tech Lead vacancy", hours: "160h", startCol: 3, spanCols: 18 },
        ], bookings: [
          { name: "A. I Poane", hours: "160h booked", ganttPills: [{ category: "booking-purple", label: "A. I Poane", hours: "160h", startCol: 3, spanCols: 18 }] },
        ],
      },
    ],
  },
  {
    id: "e4", name: "Wyoming", state: "new", resourcingBy: "15-05-2027", assignee: "-", dueDays: "226 days", startDate: "-", rolesBooked: "1/5 Roles booked",
    ganttPills: [{ category: "engagement-booked", label: "Wyoming", hours: "100%", startCol: 7, spanCols: 14 }],
    roles: [
      { id: "e4r1", name: "Senior Consultant",   state: "confirmed",  roleId: "413001", expiry: "15-05-2027", assignee: "Steve Talos",     ganttPills: [{ category: "role-booked", label: "Senior Consultant", hours: "100%", startCol: 7, spanCols: 14 }],
        bookings: [{ name: "Steve Talos", hours: "320h booked", ganttPills: [{ category: "booking-blue", label: "Steve Talos", hours: "320h", startCol: 7, spanCols: 14 }] }] },
      { id: "e4r2", name: "Business Analyst",    state: "shortlisting", roleId: "413002", expiry: "15-05-2027", assignee: "-",               ganttPills: [], bookings: [] },
      { id: "e4r3", name: "Project Coordinator", state: "new",          roleId: "413003", expiry: "15-05-2027", assignee: "-",               ganttPills: [], bookings: [] },
    ],
  },
  {
    id: "e5", name: "Esse aggero spes brevis", state: "new", resourcingBy: "11-10-2026", assignee: "Shelli Bergnaum", dueDays: "11 days", startDate: "-", rolesBooked: "1/2 Roles booked",
    ganttPills: [{ category: "engagement-booked", label: "Esse aggero", hours: "50%", startCol: 0, spanCols: 10 }],
    roles: [
      { id: "e5r1", name: "Lead Auditor",    state: "confirmed", roleId: "412001", expiry: "11-10-2026", assignee: "Shelli Bergnaum", ganttPills: [{ category: "role-booked", label: "Lead Auditor", hours: "100%", startCol: 0, spanCols: 10 }],
        bookings: [{ name: "Shelli Bergnaum", hours: "80h booked", ganttPills: [{ category: "booking-blue", label: "Shelli Bergnaum", hours: "80h", startCol: 0, spanCols: 10 }] }] },
      { id: "e5r2", name: "Audit Support",   state: "new",       roleId: "412002", expiry: "11-10-2026", assignee: "-",               ganttPills: [], bookings: [] },
    ],
  },
  {
    id: "e6", name: "SP-9540", state: "new", resourcingBy: "11-10-2026", assignee: "-", dueDays: "10 days", startDate: "-", rolesBooked: "1/2 Roles booked",
    ganttPills: [{ category: "booking-red", label: "SP-9540 overbooked", hours: "120%", startCol: 14, spanCols: 7 }],
    roles: [
      { id: "e6r1", name: "Risk Analyst",    state: "confirmed",   roleId: "411001", expiry: "11-10-2026", assignee: "Vic Fenets",  ganttPills: [{ category: "role-booked", label: "Risk Analyst", hours: "100%", startCol: 14, spanCols: 7 }],
        bookings: [{ name: "Vic Fenets", hours: "56h booked", ganttPills: [{ category: "booking-blue", label: "Vic Fenets", hours: "56h", startCol: 14, spanCols: 7 }] }] },
      { id: "e6r2", name: "Compliance Lead", state: "shortlisting", roleId: "411002", expiry: "11-10-2026", assignee: "-",           ganttPills: [], bookings: [] },
    ],
  },
  {
    id: "e7", name: "Pasadena - Test", state: "new", resourcingBy: "16-10-2026", assignee: "Vic Fenets", dueDays: "15 days", startDate: "-", rolesBooked: "1/2 Roles booked",
    ganttPills: [{ category: "engagement-booked", label: "Pasadena Test", hours: "60%", startCol: 3, spanCols: 21 }],
    roles: [
      { id: "e7r1", name: "Senior Dev",      state: "confirmed", roleId: "410001", expiry: "16-10-2026", assignee: "Vic Fenets",  ganttPills: [{ category: "role-booked",   label: "Senior Dev",  hours: "100%", startCol: 3, spanCols: 21 }],
        bookings: [{ name: "Vic Fenets", hours: "168h booked", ganttPills: [{ category: "booking-blue", label: "Vic Fenets", hours: "168h", startCol: 3, spanCols: 21 }] }] },
      { id: "e7r2", name: "UX Designer",     state: "new",       roleId: "410002", expiry: "16-10-2026", assignee: "-",           ganttPills: [], bookings: [] },
    ],
  },
  {
    id: "e8", name: "[02/09] - Engagement", state: "new", resourcingBy: "02-10-2026", assignee: "A. I Poane", dueDays: "2 days", startDate: "-", rolesBooked: "1/3 Roles booked",
    ganttPills: [{ category: "pending", label: "[02/09] pending", hours: "pending", startCol: 21, spanCols: 7 }],
    roles: [
      { id: "e8r1", name: "Implementation Lead", state: "pending",      roleId: "409001", expiry: "02-10-2026", assignee: "A. I Poane", ganttPills: [{ category: "pending", label: "Impl. Lead pending", startCol: 21, spanCols: 7 }], bookings: [] },
      { id: "e8r2", name: "Business Analyst",    state: "new",          roleId: "409002", expiry: "02-10-2026", assignee: "-",          ganttPills: [], bookings: [] },
      { id: "e8r3", name: "QA Specialist",       state: "shortlisting", roleId: "409003", expiry: "02-10-2026", assignee: "-",          ganttPills: [], bookings: [] },
    ],
  },
];

// ── Row height constant — MUST match Gantt row height exactly ────────────────
const ROW_H = 60;

// ── Left cell + Right cell rendered as a single logical row ──────────────────
// This ensures pixel-perfect alignment between left text and right Gantt pills.

function EngRow({
  leftContent,
  rightContent,
  bg = "white",
  indent = 0,
}: {
  leftContent: React.ReactNode;
  rightContent?: React.ReactNode;
  bg?: string;
  indent?: number;
}) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--palette-neutral-0)", background: bg, flexShrink: 0 }}>
      {/* Left cell */}
      <div style={{
        flexShrink: 0, display: "flex", alignItems: "center",
        paddingLeft: indent, paddingRight: 8, height: ROW_H,
        overflow: "hidden",
      }}>
        {leftContent}
      </div>
      {/* Right cell — Gantt pills, width fills remaining space */}
      <div style={{ flex: 1, position: "relative", height: ROW_H, borderLeft: "1px solid var(--palette-neutral-0)" }}>
        {rightContent}
      </div>
    </div>
  );
}

// ── Flat row list builder ──────────────────────────────────────────────────────
// Pills live on each data node — no parallel index needed.
// Expanding any engagement always aligns correctly.

type FlatRow = {
  key: string;
  leftContent: React.ReactNode;
  rightPills?: GanttPill[];
  bg?: string;
  indent?: number;
};

function buildRows(
  engagements: EngagementEntry[],
  expanded: Set<string>,
  expandedRoles: Set<string>,
  onToggleEng: (id: string) => void,
  onToggleRole: (id: string) => void,
): FlatRow[] {
  const rows: FlatRow[] = [];

  engagements.forEach(eng => {
    const isExpanded = expanded.has(eng.id);

    // ── Engagement row ────────────────────────────────────────────────────────
    rows.push({
      key: eng.id,
      bg: "white",
      indent: 4,
      rightPills: eng.ganttPills,
      leftContent: (
        <Row gap={0} style={{ width: "100%", minWidth: 0, alignItems: "flex-start", paddingTop: 4 }}>
          {/* Chevron aligned to top line */}
          <button onClick={() => onToggleEng(eng.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px 0", color: "var(--palette-blue-0)", display: "flex", alignItems: "flex-start", flexShrink: 0, transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>
            <Icon name="chevron-right" size={14} />
          </button>
          {/* Engagement icon — primary text colour, top-aligned */}
          <Icon name="engagement" size={14} style={{ color: "var(--palette-blue-0)", flexShrink: 0, marginRight: 6, marginTop: 2 }} />
          {/* Title + sub-label */}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ ...bodyBold, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{eng.name}</div>
            <div style={labelCss}>{eng.rolesBooked}</div>
          </div>
          <button style={{ width: 24, height: 24, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)", flexShrink: 0 }}>
            <Icon name="menu-vertical" size={14} />
          </button>
        </Row>
      ),
    });

    if (!isExpanded) return;

    eng.roles.forEach(role => {
      const roleExpanded = expandedRoles.has(role.id);

      // ── Role row ────────────────────────────────────────────────────────────
      rows.push({
        key: role.id,
        bg: "var(--palette-neutral-2)",
        indent: 20,
        rightPills: role.ganttPills,
        leftContent: (
          <Row gap={0} style={{ width: "100%", minWidth: 0, alignItems: "flex-start", paddingTop: 4 }}>
            {/* Chevron — top-aligned */}
            <button onClick={() => onToggleRole(role.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px 0", color: "var(--palette-blue-0)", display: "flex", alignItems: "flex-start", flexShrink: 0, transform: roleExpanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>
              <Icon name="chevron-right" size={14} />
            </button>
            {/* Role icon — primary text colour, top-aligned */}
            <Icon name="role" size={14} style={{ color: "var(--palette-blue-0)", flexShrink: 0, marginRight: 6, marginTop: 2 }} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ ...bodyBold, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{role.name}</div>
              <Row gap={6} style={{ marginTop: 2 }}>
                <PillWFState state={role.state} size="small" />
                {role.bookings.length > 0 && <span style={labelCss}>{role.bookings.length} Vacancies booked</span>}
              </Row>
            </div>
            <button style={{ width: 24, height: 24, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)", flexShrink: 0 }}>
              <Icon name="menu-vertical" size={14} />
            </button>
          </Row>
        ),
      });

      if (!roleExpanded) return;

      // ── Booking / profile rows ──────────────────────────────────────────────
      role.bookings.forEach((booking, bi) => {
        rows.push({
          key: `${role.id}-b${bi}`,
          bg: "var(--palette-neutral-2)",
          indent: 40,
          rightPills: booking.ganttPills,
          leftContent: (
            <Row gap={6} style={{ width: "100%", minWidth: 0, alignItems: "flex-start", paddingTop: 4 }}>
              {/* Profile icon — primary text colour, top-aligned */}
              <Icon name="profile" size={14} style={{ color: "var(--palette-blue-0)", flexShrink: 0, marginTop: 2 }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <Row gap={4}>
                  <span style={{ ...body, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{booking.name}</span>
                  {booking.warning && <Icon name="warning" size={14} style={{ color: "var(--palette-orange-1)" }} />}
                </Row>
                <div style={labelCss}>{booking.hours}</div>
              </div>
            </Row>
          ),
        });
      });
    });
  });

  return rows;
}

// ── Roles view row builder ────────────────────────────────────────────────────
// Flattens all roles across all engagements — no engagement grouping.
// Each role is expandable to show booking/profile sub-rows.
// Gantt shows role-level pills only.

function buildRolesRows(
  engagements: EngagementEntry[],
  expandedRoles: Set<string>,
  onToggleRole: (id: string) => void,
): FlatRow[] {
  const rows: FlatRow[] = [];

  engagements.forEach(eng => {
    eng.roles.forEach(role => {
      const roleExpanded = expandedRoles.has(role.id);

      // Role row — top level in Roles view
      rows.push({
        key: role.id,
        bg: "white",
        indent: 4,
        rightPills: role.ganttPills,
        leftContent: (
          <Row gap={0} style={{ width: "100%", minWidth: 0, alignItems: "flex-start", paddingTop: 4 }}>
            <button onClick={() => onToggleRole(role.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px 0", color: "var(--palette-blue-0)", display: "flex", alignItems: "flex-start", flexShrink: 0, transform: roleExpanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>
              <Icon name="chevron-right" size={14} />
            </button>
            <Icon name="role" size={14} style={{ color: "var(--palette-blue-0)", flexShrink: 0, marginRight: 6, marginTop: 2 }} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ ...bodyBold, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{role.name}</div>
              <span style={{ ...labelCss, marginTop: 2, display: "block" }}>{eng.name}</span>
            </div>
            <button style={{ width: 24, height: 24, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)", flexShrink: 0 }}>
              <Icon name="menu-vertical" size={14} />
            </button>
          </Row>
        ),
      });

      if (!roleExpanded) return;

      // Booking sub-rows
      role.bookings.forEach((booking, bi) => {
        rows.push({
          key: `roles-${role.id}-b${bi}`,
          bg: "var(--palette-neutral-2)",
          indent: 28,
          rightPills: booking.ganttPills,
          leftContent: (
            <Row gap={6} style={{ width: "100%", minWidth: 0, alignItems: "flex-start", paddingTop: 4 }}>
              <Icon name="profile" size={14} style={{ color: "var(--palette-blue-0)", flexShrink: 0, marginTop: 2 }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <Row gap={4}>
                  <span style={{ ...body, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{booking.name}</span>
                  {booking.warning && <Icon name="warning" size={14} style={{ color: "var(--palette-orange-1)" }} />}
                </Row>
                <div style={labelCss}>{booking.hours}</div>
              </div>
            </Row>
          ),
        });
      });
    });
  });

  return rows;
}

// ── View selector dropdown ────────────────────────────────────────────────────
// Grouped dropdown: View (Engagements/Roles) + Calendar (Gantt/Grid)
// Matches the screenshot: bordered trigger, two labeled groups, checkmark on active

type ViewType     = "engagements" | "roles";
type CalendarType = "gantt" | "grid";

type WfView   = "bookings" | "grid";
type WfMetric = "total-hours" | "availability" | "utilization";

const WF_VIEW_LABELS:   Record<WfView,   string> = { "bookings": "Bookings", "grid": "Grid" };
const WF_METRIC_LABELS: Record<WfMetric, string> = { "total-hours": "Total hours", "availability": "Availability", "utilization": "Utilization" };

// Shared check option row
function DropdownOption({ checked, label, sub, onClick }: { checked: boolean; label: string; sub?: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 16px", border: "none", background: "none", cursor: "pointer", textAlign: "left", outline: "none" }}>
      <span style={{ width: 16, flexShrink: 0, color: "var(--palette-blue-0)", paddingTop: 2, display: "flex", justifyContent: "center" }}>
        {checked && <Icon name="check" size={14} />}
      </span>
      <div>
        <div style={{ fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)" }}>{label}</div>
        {sub && <div style={{ fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)" }}>{sub}</div>}
      </div>
    </button>
  );
}

function GroupLabel({ children }: { children: string }) {
  return <div style={{ padding: "6px 16px 4px", fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)" }}>{children}</div>;
}

function DropdownDivider() {
  return <div style={{ height: 1, background: "var(--palette-neutral-0)", margin: "8px 16px" }} />;
}

// Projects view selector — View: Engagements/Roles, Calendar: Gantt/Grid
// Trigger label: "{view} - {calendar}" e.g. "Engagements - Gantt"
function ProjectsViewSelector({ view, calendar, onView, onCalendar }: {
  view: ViewType; calendar: CalendarType;
  onView: (v: ViewType) => void; onCalendar: (c: CalendarType) => void;
}) {
  const [open, setOpen] = useState(false);
  const label = `${view === "engagements" ? "Engagements" : "Roles"} - ${calendar === "gantt" ? "Gantt" : "Grid"}`;
  return (
    <div style={{ position: "relative", width: 220 }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 36, padding: "0 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--palette-neutral-0)", background: "white", fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", cursor: "pointer", outline: "none" }}>
        {label}
        <Icon name="chevron-down" size={16} style={{ color: "var(--palette-blue-2)" }} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 200, background: "white", borderRadius: "var(--radius-md)", boxShadow: "0 6px 16px rgba(27,72,195,0.2)", border: "1px solid var(--palette-neutral-0)", minWidth: 260, padding: "8px 0" }} onMouseLeave={() => setOpen(false)}>
          <GroupLabel>View</GroupLabel>
          <DropdownOption checked={view === "engagements"} label="Engagements" sub="& Audit Engagements" onClick={() => { onView("engagements"); setOpen(false); }} />
          <DropdownOption checked={view === "roles"}       label="Roles"        sub="& Audit Roles"       onClick={() => { onView("roles");       setOpen(false); }} />
          <DropdownDivider />
          <GroupLabel>Calendar</GroupLabel>
          <DropdownOption checked={calendar === "gantt"} label="Gantt" onClick={() => { onCalendar("gantt"); setOpen(false); }} />
          <DropdownOption checked={calendar === "grid"}  label="Grid"  onClick={() => { onCalendar("grid");  setOpen(false); }} />
        </div>
      )}
    </div>
  );
}

// Workforce view selector — View: Bookings/Grid, Metric: Total hours/Availability/Utilization
// Trigger label: "{view} - {metric}" e.g. "Bookings - Total hours"
function WorkforceViewSelector({ wfView, wfMetric, onWfView, onWfMetric }: {
  wfView: WfView; wfMetric: WfMetric;
  onWfView: (v: WfView) => void; onWfMetric: (m: WfMetric) => void;
}) {
  const [open, setOpen] = useState(false);
  const label = `${WF_VIEW_LABELS[wfView]} - ${WF_METRIC_LABELS[wfMetric]}`;
  return (
    <div style={{ position: "relative", width: 240 }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 36, padding: "0 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--palette-neutral-0)", background: "white", fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", cursor: "pointer", outline: "none" }}>
        {label}
        <Icon name="chevron-down" size={16} style={{ color: "var(--palette-blue-2)" }} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 200, background: "white", borderRadius: "var(--radius-md)", boxShadow: "0 6px 16px rgba(27,72,195,0.2)", border: "1px solid var(--palette-neutral-0)", minWidth: 260, padding: "8px 0" }} onMouseLeave={() => setOpen(false)}>
          <GroupLabel>View</GroupLabel>
          <DropdownOption checked={wfView === "bookings"} label="Bookings" onClick={() => { onWfView("bookings"); setOpen(false); }} />
          <DropdownOption checked={wfView === "grid"}     label="Grid"     onClick={() => { onWfView("grid");     setOpen(false); }} />
          <DropdownDivider />
          <GroupLabel>Metric</GroupLabel>
          <DropdownOption checked={wfMetric === "total-hours"}  label="Total hours"  onClick={() => { onWfMetric("total-hours");  setOpen(false); }} />
          <DropdownOption checked={wfMetric === "availability"} label="Availability" onClick={() => { onWfMetric("availability"); setOpen(false); }} />
          <DropdownOption checked={wfMetric === "utilization"}  label="Utilization"  onClick={() => { onWfMetric("utilization");  setOpen(false); }} />
        </div>
      )}
    </div>
  );
}


// ── Grid calendar ─────────────────────────────────────────────────────────────
// Weeks header (month + week number) + rows per engagement/role/profile
// Engagement rows: read-only aggregated hours
// Role rows: editable booking cells
// Profile rows: editable with category dot

const GRID_WEEKS = [
  { month: "Jan 2026", weeks: ["W1","W2","W3","W4","W5"] },
  { month: "Feb 2026", weeks: ["W6","W7","W8","W9"] },
  { month: "Mar 2026", weeks: ["W10","W11","W12","W13","W14"] },
  { month: "Apr 2026", weeks: ["W15","W16","W17","W18"] },
  { month: "May 2026", weeks: ["W19","W20"] },
];
const ALL_WEEKS = GRID_WEEKS.flatMap(m => m.weeks);
const CELL_W    = 52; // px per week column

type GridRow = {
  key:      string;
  label:    string;
  subLabel?: string;
  readOnly: boolean;
  values:   number[];
  category: BookingCellCategory;
  deadline?: number; // index of week with deadline marker
  bg?:      string;
  indent?:  number;
};

// buildGridRows mirrors flatRows structure exactly — same expansion state.
// One GridRow per FlatRow, same order, same count → rows always align.
function buildGridRows(
  engagements: EngagementEntry[],
  view: ViewType,
  expanded: Set<string>,
  expandedRoles: Set<string>,
): GridRow[] {
  const rows: GridRow[] = [];
  const n = ALL_WEEKS.length;

  engagements.forEach(eng => {
    if (view === "engagements") {
      // Engagement aggregate row — read only
      rows.push({
        key: eng.id, label: eng.name, readOnly: true, category: "empty",
        values: Array.from({ length: n }, (_, i) => i % 3 === 0 ? 10 : 0),
      });

      if (!expanded.has(eng.id)) return;
    }

    eng.roles.forEach(role => {
      rows.push({
        key: role.id, label: role.name,
        subLabel: view === "roles" ? eng.name : undefined,
        readOnly: false, category: "empty",
        indent: view === "engagements" ? 16 : 0,
        values: Array.from({ length: n }, () => 10),
        deadline: 11,
      });

      if (!expandedRoles.has(role.id)) return;

      role.bookings.forEach((booking, bi) => {
        rows.push({
          key: `${role.id}-b${bi}`, label: booking.name,
          readOnly: false, category: "blue",
          indent: view === "engagements" ? 32 : 16,
          values: Array.from({ length: n }, (_, i) => [0,20,0,40,0,0,10,0,0,20,20,40,0,0,0,0,40,0,10,0][i] ?? 0),
          bg: "var(--palette-neutral-2)",
        });
      });
    });
  });

  return rows;
}

function GridCalendar({
  engagements, view,
  flatRows, leftWidth, onDragStart,
  expanded, expandedRoles,
}: {
  engagements: EngagementEntry[];
  view: ViewType;
  flatRows: FlatRow[];
  leftWidth: number;
  onDragStart: (e: React.MouseEvent) => void;
  expanded: Set<string>;
  expandedRoles: Set<string>;
}) {
  const gridRows = buildGridRows(engagements, view, expanded, expandedRoles);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Shared header row: left sort header | divider | Gantt-style month/week headers ── */}
      <div style={{ display: "flex", flexShrink: 0, borderBottom: "1px solid var(--palette-neutral-0)", background: "white" }}>
        {/* Left header — identical to Gantt */}
        <div style={{ width: leftWidth, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px", minHeight: 48 }}>
          <Row gap={8} style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "inline-block", width: "max-content" }}>
              <InputSelect value="Latest first" />
            </span>
            <span style={{ ...labelCss, whiteSpace: "nowrap", flexShrink: 0 }}>874 projects</span>
          </Row>
          <Button kind="secondary" size="small"><Icon name="list" size={14} /></Button>
        </div>
        {/* Divider */}
        <div style={{ width: 4, flexShrink: 0, background: "var(--palette-neutral-0)" }} />
        {/* Right: month + week headers stacked */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {/* Month row */}
          <div style={{ display: "flex", height: 24, borderBottom: "1px solid var(--palette-neutral-0)" }}>
            {GRID_WEEKS.map(m => (
              <div key={m.month} style={{ width: m.weeks.length * CELL_W, flexShrink: 0, padding: "2px 8px", borderRight: "2px solid var(--palette-neutral-0)", fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 700, color: "var(--palette-blue-0)" }}>
                {m.month}
              </div>
            ))}
          </div>
          {/* Week number row */}
          <div style={{ display: "flex", flex: 1 }}>
            {ALL_WEEKS.map((w, i) => (
              <div key={i} style={{ width: CELL_W, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid var(--palette-neutral-0)", fontFamily: "var(--font-family)", fontSize: 11, fontWeight: 700, color: "var(--palette-blue-2)" }}>
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Single shared scroll: left rows | divider | grid cells ── */}
      <div style={{ flex: 1, display: "flex", overflowY: "auto", overflowX: "auto" }}>

        {/* LEFT — identical Gantt rows (same flatRows, same height ROW_H) */}
        <div style={{ width: leftWidth, flexShrink: 0 }}>
          {flatRows.map(row => (
            <div key={row.key} style={{ height: ROW_H, display: "flex", alignItems: "flex-start", paddingLeft: row.indent ?? 4, paddingRight: 8, borderBottom: "1px solid var(--palette-neutral-0)", background: row.bg ?? "white", overflow: "hidden" }}>
              {row.leftContent}
            </div>
          ))}
        </div>

        {/* Draggable divider — same as Gantt */}
        <div onMouseDown={onDragStart} style={{ width: 4, flexShrink: 0, cursor: "col-resize", background: "var(--palette-neutral-0)", position: "relative", userSelect: "none" }}>
          <div style={{ position: "sticky", top: "50%", transform: "translateY(-50%)" }}>
            <Divider orientation="vertical" type="draggable" />
          </div>
        </div>

        {/* RIGHT — grid data rows (one per flatRow, same ROW_H) */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {gridRows.map((row, ri) => (
            <div key={row.key} style={{ display: "flex", height: ROW_H, borderBottom: "1px solid var(--palette-neutral-0)" }}>
              {row.values.map((val, ci) => (
                <div key={ci} style={{ width: CELL_W, flexShrink: 0, height: "100%" }}>
                  <BookingCell
                    value={val}
                    category={row.category}
                    readOnly={row.readOnly}
                    deadline={row.deadline === ci}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── Workforce data ────────────────────────────────────────────────────────────

type WorkforceBooking = {
  id: string;
  roleName: string;
  engagementName: string;
  hours: string;
  ganttPills?: GanttPill[];
  gridValues?: number[];
  /** Booking colour — drives both Gantt pill category and Grid cell dot colour */
  dotCategory?: BookingCellCategory;
};

type WorkforceProfile = {
  id: string;
  name: string;
  initials: string;
  department: string;
  birthday: string;
  utilPct: number;     // 0-100
  availHours: string;  // "428h available"
  bookings: WorkforceBooking[];
};

// Utilisation pill colour: 0% = red, 1-10% = red, 11-25% = orange, 26%+ = neutral
function utilisationStyle(pct: number): { bg: string; color: string } {
  if (pct === 0)        return { bg: "var(--palette-red-0)",    color: "white" };
  if (pct <= 10)        return { bg: "var(--palette-red-0)",    color: "white" };
  if (pct <= 25)        return { bg: "var(--palette-orange-0)", color: "var(--palette-blue-0)" };
  return                       { bg: "var(--palette-neutral-1)", color: "var(--palette-blue-0)" };
}

const WF_WEEK_N = 20; // 20 week columns

const WORKFORCE: WorkforceProfile[] = [
  {
    id: "wf1", name: "A. I Poane", initials: "AP", department: "QA", birthday: "02-09-1970",
    utilPct: 16, availHours: "428h available",
    bookings: [
      { id: "b1", roleName: "[02/09] - Role 2 CLONE", engagementName: "[02/09] - Engagement", hours: "136h",
        dotCategory: "blue" as BookingCellCategory,
        ganttPills: [
          { category: "booking-blue" as BookingPillCategory, label: "[02/09] - Role 2 CLONE", hours: "136h", startCol: 0, spanCols: 6 },
          { category: "booking-blue" as BookingPillCategory, label: "[02/09] - Role 2 CLONE", hours: "136h", startCol: 8, spanCols: 4 },
        ],
        gridValues: Array.from({ length: WF_WEEK_N }, (_, i) => i < 4 ? 10 : i < 8 ? 0 : i < 12 ? 10 : 0) },
      { id: "b2", roleName: "Test", engagementName: "", hours: "8h",
        dotCategory: undefined,
        ganttPills: [],
        gridValues: Array.from({ length: WF_WEEK_N }, () => 0) },
      { id: "b3", roleName: "Engagement with booking category", engagementName: "", hours: "188h",
        dotCategory: "blue" as BookingCellCategory,
        ganttPills: [{ category: "booking-blue" as BookingPillCategory, label: "Engagement with book...", hours: "53% (20h)", startCol: 2, spanCols: 5 }],
        gridValues: Array.from({ length: WF_WEEK_N }, (_, i) => i === 2 ? 20 : 0) },
      { id: "b4", roleName: "[02/09] - Role 1", engagementName: "[02/09] - Engagement", hours: "8h",
        dotCategory: undefined,
        ganttPills: [],
        gridValues: Array.from({ length: WF_WEEK_N }, () => 0) },
      { id: "b5", roleName: "Holiday", engagementName: "", hours: "229.5h",
        dotCategory: "purple" as BookingCellCategory,
        ganttPills: [
          { category: "booking-purple" as BookingPillCategory, label: "Holiday", hours: "229.5h", startCol: 8, spanCols: 3 },
          { category: "booking-purple" as BookingPillCategory, label: "Holiday", hours: "229.5h", startCol: 13, spanCols: 3 },
        ],
        gridValues: Array.from({ length: WF_WEEK_N }, (_, i) => i === 10 || i === 12 ? 40 : i === 14 ? 30 : 0) },
    ],
  },
  { id: "wf2",  name: "AAAa Poane",           initials: "AP", department: "Finance", birthday: "-",   utilPct: 4,  availHours: "512h available", bookings: [] },
  { id: "wf3",  name: "Aalex (New) Poane",    initials: "AP", department: "-",       birthday: "-",   utilPct: 0,  availHours: "96h available",  bookings: [] },
  { id: "wf4",  name: "Adrian Stoica",        initials: "AS", department: "-",       birthday: "-",   utilPct: 0,  availHours: "441h available", bookings: [] },
  { id: "wf5",  name: "Aide Lowe test",       initials: "AL", department: "-",       birthday: "-",   utilPct: 0,  availHours: "27.92h available", bookings: [] },
  { id: "wf6",  name: "Alessandro",           initials: "A",  department: "-",       birthday: "-",   utilPct: 0,  availHours: "508h available", bookings: [] },
  { id: "wf7",  name: "Alessandro Clayton",   initials: "AC", department: "-",       birthday: "-",   utilPct: 0,  availHours: "508h available", bookings: [] },
  { id: "wf8",  name: "Alex (empty PG) Poane",initials: "AP", department: "-",       birthday: "-",   utilPct: 0,  availHours: "508h available", bookings: [] },
  { id: "wf9",  name: "Alex Jane Doe",        initials: "AJ", department: "-",       birthday: "-",   utilPct: 0,  availHours: "508h available", bookings: [] },
  { id: "wf10", name: "Alexandra Danish",     initials: "AD", department: "-",       birthday: "-",   utilPct: 6,  availHours: "476h available", bookings: [] },
  { id: "wf11", name: "Alexandra Finnish",    initials: "AF", department: "-",       birthday: "-",   utilPct: 0,  availHours: "508h available", bookings: [] },
  { id: "wf12", name: "Alexandra French [Canada]", initials: "AF", department: "-", birthday: "-",   utilPct: 0,  availHours: "300h available", bookings: [] },
  { id: "wf13", name: "Alexandra French [France]", initials: "AF", department: "-", birthday: "-",   utilPct: 0,  availHours: "508h available", bookings: [] },
  { id: "wf14", name: "Alexandra German",     initials: "AG", department: "-",       birthday: "-",   utilPct: 0,  availHours: "506h available", bookings: [] },
  { id: "wf15", name: "Alexandra I. Poane",   initials: "AI", department: "QA",      birthday: "31-05-1996", utilPct: 0, availHours: "536h available", bookings: [] },
];

// ── Workforce Gantt row builder ───────────────────────────────────────────────

function buildWorkforceRows(
  profiles: WorkforceProfile[],
  expanded: Set<string>,
  onToggle: (id: string) => void,
): FlatRow[] {
  const rows: FlatRow[] = [];

  profiles.forEach(profile => {
    const isExpanded = expanded.has(profile.id);
    const util = utilisationStyle(profile.utilPct);

    // Profile row
    rows.push({
      key: profile.id,
      bg: "white",
      indent: 4,
      rightPills: undefined, // profile row has no Gantt pill — bookings below
      leftContent: (
        <Row gap={0} style={{ width: "100%", minWidth: 0, alignItems: "flex-start", paddingTop: 6 }}>
          <button onClick={() => onToggle(profile.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px 0", color: "var(--palette-blue-0)", display: "flex", alignItems: "flex-start", flexShrink: 0, transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>
            <Icon name="chevron-right" size={14} />
          </button>
          <div style={{ minWidth: 0, flex: 1 }}>
            <Row gap={6}>
              <span style={bodyBold}>{profile.name}</span>
            </Row>
            <Row gap={6} style={{ marginTop: 2 }}>
              {/* Utilisation pill */}
              <PillSimple label={`${profile.utilPct}%`} size="small" bg={util.bg} color={util.color} />
              <span style={labelCss}>{profile.availHours}</span>
            </Row>
          </div>
          <button style={{ width: 24, height: 24, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)", flexShrink: 0 }}>
            <Icon name="menu-vertical" size={14} />
          </button>
        </Row>
      ),
    });

    if (!isExpanded) return;

    profile.bookings.forEach(booking => {
      rows.push({
        key: booking.id,
        bg: "var(--palette-neutral-2)",
        indent: 20,
        rightPills: booking.ganttPills,
        leftContent: (
          <Row gap={6} style={{ width: "100%", minWidth: 0, alignItems: "flex-start", paddingTop: 4 }}>
            {/* Role icon — bookings in workforce are role assignments */}
            <Icon name="role" size={14} style={{ color: "var(--palette-blue-0)", flexShrink: 0, marginTop: 2 }} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ ...bodyBold, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{booking.roleName}</div>
              <div style={labelCss}>{booking.hours} booked</div>
            </div>
            <button style={{ width: 24, height: 24, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)", flexShrink: 0 }}>
              <Icon name="menu-vertical" size={14} />
            </button>
          </Row>
        ),
      });
    });
  });

  return rows;
}

// ── Workforce Grid ────────────────────────────────────────────────────────────

// Grid cell colour for workforce: based on booked/available ratio
function wfCellCategory(booked: number, _available: number): BookingCellCategory {
  if (booked === 0) return "empty";
  return "blue"; // simplification — could be red/orange based on ratio
}

function WorkforceGridCalendar({
  profiles, flatRows, leftWidth, onDragStart, expanded,
}: {
  profiles: WorkforceProfile[];
  flatRows: FlatRow[];
  leftWidth: number;
  onDragStart: (e: React.MouseEvent) => void;
  expanded: Set<string>;
}) {
  // Build grid rows aligned to flatRows
  const gridData: { values: number[]; readOnly: boolean; bg?: string; dotCategory?: BookingCellCategory }[] = [];

  profiles.forEach(profile => {
    // Profile header row — read-only aggregate
    gridData.push({ values: Array.from({ length: WF_WEEK_N }, (_, i) => i % 4 === 0 ? 0 : 38), readOnly: true });

    if (!expanded.has(profile.id)) return;

    profile.bookings.forEach(booking => {
      gridData.push({
        values: booking.gridValues ?? Array.from({ length: WF_WEEK_N }, () => 0),
        readOnly: false,
        bg: "var(--palette-neutral-2)",
        // Dot colour matches the Gantt pill category for this booking
        dotCategory: booking.dotCategory,
      });
    });
  });

  const WF_WEEKS_DATA = [
    { month: "Oct 2026", weeks: ["W40","W41","W42","W43","W44"] },
    { month: "Nov 2026", weeks: ["W45","W46","W47","W48"] },
    { month: "Dec 2026", weeks: ["W49","W50","W51","W52"] },
    { month: "Jan 2027", weeks: ["W1","W2","W3","W4"] },
    { month: "Feb 2027", weeks: ["W5","W6","W7","W8"] },
    { month: "Mar 2027", weeks: ["W9","W10","W11","W12"] },
    { month: "Apr 2027", weeks: ["W13"] },
  ];
  const allWfWeeks = WF_WEEKS_DATA.flatMap(m => m.weeks);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header row: left sort | divider | month/week headers */}
      <div style={{ display: "flex", flexShrink: 0, borderBottom: "1px solid var(--palette-neutral-0)", background: "white" }}>
        <div style={{ width: leftWidth, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px", minHeight: 48 }}>
          <Row gap={8} style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "inline-block", width: "max-content" }}>
              <InputSelect value="A-Z" />
            </span>
            <span style={{ ...labelCss, whiteSpace: "nowrap" }}>274 profiles</span>
          </Row>
          <Button kind="icon" size="small"><Icon name="calendar" size={14} /></Button>
        </div>
        <div style={{ width: 4, flexShrink: 0, background: "var(--palette-neutral-0)" }} />
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 24, borderBottom: "1px solid var(--palette-neutral-0)" }}>
            {WF_WEEKS_DATA.map(m => (
              <div key={m.month} style={{ width: m.weeks.length * CELL_W, flexShrink: 0, padding: "2px 8px", borderRight: "2px solid var(--palette-neutral-0)", fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 700, color: "var(--palette-blue-0)" }}>
                {m.month}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flex: 1 }}>
            {allWfWeeks.map((w, i) => (
              <div key={i} style={{ width: CELL_W, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid var(--palette-neutral-0)", fontFamily: "var(--font-family)", fontSize: 11, fontWeight: 700, color: "var(--palette-blue-2)" }}>
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Single shared scroll */}
      <div style={{ flex: 1, display: "flex", overflowY: "auto", overflowX: "auto" }}>
        {/* LEFT — same flatRows */}
        <div style={{ width: leftWidth, flexShrink: 0 }}>
          {flatRows.map(row => (
            <div key={row.key} style={{ height: ROW_H, display: "flex", alignItems: "flex-start", paddingLeft: row.indent ?? 4, paddingRight: 8, borderBottom: "1px solid var(--palette-neutral-0)", background: row.bg ?? "white", overflow: "hidden" }}>
              {row.leftContent}
            </div>
          ))}
        </div>
        {/* Draggable divider */}
        <div onMouseDown={onDragStart} style={{ width: 4, flexShrink: 0, cursor: "col-resize", background: "var(--palette-neutral-0)", position: "relative", userSelect: "none" }}>
          <div style={{ position: "sticky", top: "50%", transform: "translateY(-50%)" }}>
            <Divider orientation="vertical" type="draggable" />
          </div>
        </div>
        {/* RIGHT — BookingCell grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {gridData.map((row, ri) => (
            <div key={ri} style={{ display: "flex", height: ROW_H, borderBottom: "1px solid var(--palette-neutral-0)", background: row.bg ?? "white" }}>
              {row.values.map((val, ci) => (
                <div key={ci} style={{ width: CELL_W, flexShrink: 0, height: "100%" }}>
                  <BookingCell
                    value={val}
                    // If this booking has a colour (from Gantt pill), use it for the dot.
                    // Otherwise fall back to "empty" when value is 0, or "blue" when non-zero.
                    category={row.dotCategory ?? (val > 0 ? "blue" : "empty")}
                    readOnly={row.readOnly}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Booking Engine Screen ─────────────────────────────────────────────────────

function BookingEngineScreen({ view: initialView = "engagements", calendar: initialCalendar = "gantt", panel: initialPanel = "projects" }: { view?: ViewType; calendar?: CalendarType; panel?: "projects" | "workforce" }) {
  const [panel,    setPanel]    = useState<"projects" | "workforce">(initialPanel);
  const [view,     setView]     = useState<ViewType>(initialView);
  const [calendar, setCalendar] = useState<CalendarType>(initialCalendar);
  const [wfView,   setWfView]   = useState<WfView>("bookings");
  const [wfMetric, setWfMetric] = useState<WfMetric>("total-hours");
  const [activeMainTab, setActiveMainTab]   = useState("overview");
  const [expanded, setExpanded]             = useState<Set<string>>(new Set(["e2"]));
  const [expandedRoles, setExpandedRoles]   = useState<Set<string>>(new Set(["r2"]));
  const [page, setPage]                     = useState(1);
  const [leftWidth, setLeftWidth]           = useState(420);
  const [isDragging, setIsDragging]         = useState(false);
  const [ganttColW,  setGanttColW]          = useState(GANTT_COL_DEFAULT);

  // ── Timeline minimap state ────────────────────────────────────────────────
  const [thumbLeft, setThumbLeft] = useState(0);
  const ganttScrollRef = useRef<HTMLDivElement>(null);

  // Derived: thumb width = viewport/totalWidth ratio
  const ganttTotalW = ganttColW * GANTT_TOTAL_COLS;

  // Recompute thumb size + position from scroll state
  const onGanttScroll = useCallback(() => {
    const el = ganttScrollRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth - el.clientWidth;
    const ratio = scrollable > 0 ? el.scrollLeft / scrollable : 0;
    const tw = Math.min(100, (el.clientWidth / el.scrollWidth) * 100);
    setThumbLeft(ratio * (100 - tw));
  }, []);

  // Thumb width derived from current colW (recalculated on render via ref)
  const getThumbWidth = () => {
    const el = ganttScrollRef.current;
    if (!el || el.scrollWidth === 0) return 30;
    return Math.min(100, (el.clientWidth / el.scrollWidth) * 100);
  };

  // Drag thumb body → scroll gantt
  const onThumbDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const track = (e.currentTarget as HTMLElement).closest<HTMLElement>("[data-minimap-track]");
    if (!track) return;
    const trackW    = track.getBoundingClientRect().width;
    const startX    = e.clientX;
    const tw        = getThumbWidth();
    const startLeft = thumbLeft;
    const onMove = (me: MouseEvent) => {
      const dx      = me.clientX - startX;
      const newLeft = Math.max(0, Math.min(100 - tw, startLeft + (dx / trackW) * 100));
      setThumbLeft(newLeft);
      const el = ganttScrollRef.current;
      if (el) {
        const ratio = newLeft / Math.max(1, 100 - tw);
        el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
      }
    };
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // Drag left handle → zoom out (increase colW = wider columns = scroll to left)
  const onLeftHandleDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const track = (e.currentTarget as HTMLElement).closest<HTMLElement>("[data-minimap-track]");
    if (!track) return;
    const trackW   = track.getBoundingClientRect().width;
    const startX   = e.clientX;
    const startColW = ganttColW;
    const onMove = (me: MouseEvent) => {
      // dragging left = zoom out (smaller colW), dragging right = zoom in (larger colW)
      const dx = me.clientX - startX;
      const newColW = Math.max(GANTT_COL_MIN, Math.min(GANTT_COL_MAX, startColW - Math.round(dx / (trackW / GANTT_TOTAL_COLS))));
      setGanttColW(newColW);
      setTimeout(onGanttScroll, 0);
    };
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // Drag right handle → zoom in (decrease colW = narrower columns = more visible)
  const onRightHandleDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const track = (e.currentTarget as HTMLElement).closest<HTMLElement>("[data-minimap-track]");
    if (!track) return;
    const trackW   = track.getBoundingClientRect().width;
    const startX   = e.clientX;
    const startColW = ganttColW;
    const onMove = (me: MouseEvent) => {
      const dx = me.clientX - startX;
      const newColW = Math.max(GANTT_COL_MIN, Math.min(GANTT_COL_MAX, startColW + Math.round(dx / (trackW / GANTT_TOTAL_COLS))));
      setGanttColW(newColW);
      setTimeout(onGanttScroll, 0);
    };
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const toggleEng  = (id: string) => setExpanded(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const toggleRole = (id: string) => setExpandedRoles(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  const onDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startW = leftWidth;
    const onMove = (me: MouseEvent) => setLeftWidth(Math.max(200, Math.min(700, startW + me.clientX - startX)));
    const onUp   = () => { setIsDragging(false); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const MAIN_TABS = [
    { id: "overview",  label: "Overview"  },
    { id: "approvals", label: "Approvals" },
  ];

  const [expandedWf, setExpandedWf] = useState<Set<string>>(new Set(["wf1"]));
  const toggleWf = (id: string) => setExpandedWf(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  const projectsFlatRows = view === "roles"
    ? buildRolesRows(ENGAGEMENTS, expandedRoles, toggleRole)
    : buildRows(ENGAGEMENTS, expanded, expandedRoles, toggleEng, toggleRole);

  const workforceFlatRows = buildWorkforceRows(WORKFORCE, expandedWf, toggleWf);

  const flatRows = panel === "workforce" ? workforceFlatRows : projectsFlatRows;

  // Workforce: wfView drives the calendar type (bookings = gantt pills, grid = BookingCell)
  const effectiveCalendar: CalendarType = panel === "workforce"
    ? (wfView === "grid" ? "grid" : "gantt")
    : calendar;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--palette-neutral-2)", cursor: isDragging ? "col-resize" : undefined }}>
      <Navbar activeId="booking" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* ── Row 1: Header + date range pill + info + utilisation dropdown + chart ── */}
        <div style={{ padding: "16px 24px 0", flexShrink: 0 }}>
          <SB>
            <Header size="page" title="Booking Engine" />
            {/* Top-right: white container, no border, no shadow, 8px padding, hugs content */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", borderRadius: "var(--radius-md)", padding: 8 }}>
              {/* Date range pill */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 36, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 12px", background: "white", cursor: "pointer" }}>
                <span style={{ ...bodyBold, color: "var(--palette-blue-0)", whiteSpace: "nowrap" }}>30-09-2026 - 30-12-2026</span>
                <Icon name="calendar" size={16} style={{ color: "var(--palette-blue-0)", flexShrink: 0 }} />
              </div>
              {/* Info icon */}
              <Button kind="iconTertiary" size="regular" title="Info"><Icon name="info" size={16} /></Button>
              {/* Workforce Utilisation — InputSelect, hug width */}
              <span style={{ display: "inline-block", width: "max-content" }}>
                <InputSelect value="4% Workforce Utilization" />
              </span>
              {/* Preferences icon button */}
              <Button kind="icon" size="regular" title="Preferences">
                <Icon name="preferences" size={16} />
              </Button>
            </div>
          </SB>
        </div>

        {/* ── Row 2: Overview | Approvals tabs ── */}
        <div style={{ padding: "8px 24px 0", flexShrink: 0 }}>
          <Navigation orientation="horizontal" tabs={MAIN_TABS} activeId={activeMainTab} onChange={setActiveMainTab} />
        </div>

        {/* ── Row 3 (full width): Search left | filter icons + Engagements dropdown right ── */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0, padding: "8px 24px", gap: 0 }}>
          <div style={{ width: leftWidth, flexShrink: 0, paddingRight: 8 }}>
            <InputSearch value="" onChange={() => {}} placeholder="Search" />
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
            <Button kind="icon" size="regular" title="Filter"><Icon name="filter" size={16} /></Button>
            <Button kind="icon" size="regular" title="Tag"><Icon name="tag" size={16} /></Button>
            <Button kind="icon" size="regular" title="Split"><Icon name="split" size={16} /></Button>
            <Button kind="icon" size="regular" title="Add"><Icon name="add" size={16} /></Button>
            {panel === "workforce"
              ? <WorkforceViewSelector wfView={wfView} wfMetric={wfMetric} onWfView={setWfView} onWfMetric={setWfMetric} />
              : <ProjectsViewSelector view={view} calendar={calendar} onView={setView} onCalendar={setCalendar} />
            }
          </div>
        </div>

        {/* ── Row 4 (full width): Projects/Workforce | Today ← date range → | Custom — all one line ── */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0, padding: "4px 24px 8px" }}>
          {/* Projects / Workforce tabs — active one gets neutral-1 bg */}
          <div style={{ width: leftWidth, flexShrink: 0, display: "flex", alignItems: "center", gap: 4, paddingRight: 8, paddingLeft: 4 }}>
            <button onClick={() => setPanel("projects")} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 36, background: panel === "projects" ? "var(--palette-neutral-1)" : "none", border: "none", borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-family)", fontSize: 14, fontWeight: panel === "projects" ? 700 : 400, color: panel === "projects" ? "var(--palette-blue-0)" : "var(--palette-blue-2)" }}>
              <Icon name="engagement" size={16} style={{ color: panel === "projects" ? "var(--palette-blue-0)" : "var(--palette-blue-2)" }} />
              Projects
            </button>
            <button onClick={() => setPanel("workforce")} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 36, background: panel === "workforce" ? "var(--palette-neutral-1)" : "none", border: "none", borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-family)", fontSize: 14, fontWeight: panel === "workforce" ? 700 : 400, color: panel === "workforce" ? "var(--palette-blue-0)" : "var(--palette-blue-2)" }}>
              <Icon name="profiles" size={16} style={{ color: panel === "workforce" ? "var(--palette-blue-0)" : "var(--palette-blue-2)" }} />
              Workforce
            </button>
          </div>
          {/* Today ← date range → — centred in the Gantt area | Custom flush right */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
            {/* Today button — left */}
            <Button kind="secondary" size="regular">Today</Button>
            {/* Date nav group — centred */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Button kind="iconTertiary" size="regular" title="Previous"><Icon name="chevron-left" size={16} /></Button>
              <span style={bodyBold}>31-08-2026 - 27-09-2026</span>
              <Button kind="iconTertiary" size="regular" title="Next"><Icon name="chevron-right" size={16} /></Button>
            </div>
            {/* Custom dropdown — right */}
            <span style={{ display: "inline-block", width: "max-content" }}>
              <InputSelect value="Custom (28 days)" />
            </span>
          </div>
        </div>

        {/* ── Content area — Gantt or Grid ── */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden", background: "white", borderTop: "1px solid var(--palette-neutral-0)" }}>
          {panel === "workforce" && effectiveCalendar === "grid" ? (
            /* ── Workforce Grid ── */
            <WorkforceGridCalendar profiles={WORKFORCE} flatRows={flatRows} leftWidth={leftWidth} onDragStart={onDragStart} expanded={expandedWf} />
          ) : effectiveCalendar === "grid" ? (
            /* ── Projects Grid ── */
            <GridCalendar engagements={ENGAGEMENTS} view={view} flatRows={flatRows} leftWidth={leftWidth} onDragStart={onDragStart} expanded={expanded} expandedRoles={expandedRoles} />
          ) : (
            /* ── Gantt calendar ── */
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

              {/* Sticky header row */}
              <div style={{ display: "flex", flexShrink: 0, borderBottom: "1px solid var(--palette-neutral-0)", background: "white" }}>
                <div style={{ width: leftWidth, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px", minHeight: 48 }}>
                  <Row gap={8} style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "inline-block", width: "max-content" }}>
                      <InputSelect value="Latest first" />
                    </span>
                    <span style={{ ...labelCss, whiteSpace: "nowrap", flexShrink: 0 }}>874 projects</span>
                  </Row>
                  <Button kind="secondary" size="small"><Icon name="list" size={14} /></Button>
                </div>
                <div style={{ width: 4, flexShrink: 0, background: "var(--palette-neutral-0)" }} />
                {/* Header gantt area — overflow hidden, synced via scroll */}
                <div id="gantt-hdr" style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                  <GanttHeader colW={ganttColW} />
                </div>
              </div>

              {/* Single shared scroll */}
              <div
                ref={ganttScrollRef}
                onScroll={e => {
                  onGanttScroll();
                  const hdr = document.getElementById("gantt-hdr");
                  if (hdr) hdr.scrollLeft = (e.target as HTMLDivElement).scrollLeft;
                }}
                style={{ flex: 1, overflowY: "auto", overflowX: "auto", display: "flex" }}
              >
                {/* Left label column — fixed, no horizontal scroll */}
                <div style={{ width: leftWidth, flexShrink: 0, position: "sticky", left: 0, zIndex: 1, background: "white" }}>
                  {flatRows.map(row => (
                    <div key={row.key} style={{ height: ROW_H, display: "flex", alignItems: "flex-start", paddingLeft: row.indent ?? 4, paddingRight: 8, borderBottom: "1px solid var(--palette-neutral-0)", background: row.bg ?? "white", overflow: "hidden" }}>
                      {row.leftContent}
                    </div>
                  ))}
                </div>
                <div onMouseDown={onDragStart} style={{ width: 4, flexShrink: 0, cursor: "col-resize", background: "var(--palette-neutral-0)", position: "sticky", left: leftWidth, zIndex: 1, userSelect: "none" }}>
                  <div style={{ position: "sticky", top: "50%", transform: "translateY(-50%)" }}>
                    <Divider orientation="vertical" type="draggable" />
                  </div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  {flatRows.map(row => (
                    <GanttRow key={row.key} height={ROW_H} pills={row.rightPills} colW={ganttColW} />
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* ── Bottom bar: Pagination centred in left-panel width | timeline minimap in Gantt width ── */}
        <div style={{
          display: "flex", alignItems: "stretch",
          background: "white", borderTop: "1px solid var(--palette-neutral-0)",
          boxShadow: "0 -2px 6px rgba(27,72,195,0.2)",
          flexShrink: 0,
        }}>
          {/* Left section — pagination centred within left panel width */}
          <div style={{ width: leftWidth, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px" }}>
            <Pagination total={59} current={page} onChange={setPage} />
          </div>
          {/* Divider spacer */}
          <div style={{ width: 4, flexShrink: 0, background: "var(--palette-neutral-0)" }} />
          {/* Right section — interactive timeline minimap */}
          <div style={{ flex: 1, display: "flex", alignItems: "stretch", padding: "0 8px" }}>
            <div
              data-minimap-track
              style={{ flex: 1, background: "white", position: "relative", cursor: "default", display: "flex", alignItems: "center" }}
            >
              {/* Dots background */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8px", pointerEvents: "none" }}>
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--palette-neutral-0)", flexShrink: 0 }} />
                ))}
              </div>
              {/* Draggable thumb */}
              <div
                onMouseDown={onThumbDrag}
                style={{
                  position: "absolute", top: 2, bottom: 2,
                  left: `${thumbLeft}%`, width: `${Math.min(100 - thumbLeft, getThumbWidth())}%`,
                  background: "var(--palette-neutral-1)",
                  border: "2px solid var(--palette-neutral-3)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex", alignItems: "stretch",
                  cursor: "grab", userSelect: "none",
                }}
              >
                {/* Left handle — zoom out */}
                <div
                  onMouseDown={onLeftHandleDrag}
                  style={{ width: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, cursor: "col-resize" }}
                >
                  <div style={{ width: 2, height: "50%", background: "var(--palette-blue-2)", borderRadius: 1 }} />
                  <div style={{ width: 2, height: "50%", background: "var(--palette-blue-2)", borderRadius: 1 }} />
                </div>
                <div style={{ flex: 1 }} />
                {/* Right handle — zoom in */}
                <div
                  onMouseDown={onRightHandleDrag}
                  style={{ width: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, cursor: "col-resize" }}
                >
                  <div style={{ width: 2, height: "50%", background: "var(--palette-blue-2)", borderRadius: 1 }} />
                  <div style={{ width: 2, height: "50%", background: "var(--palette-blue-2)", borderRadius: 1 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Screens/BookingEngine",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Booking Engine — Projects tab / Engagements view / Calendar Gantt / Group / Show Role level. " +
          "Figma: l3JiE7ZmAsjSZY5Z7yPCOZ node 2:261721. " +
          "Split layout: left 620px engagement table with expandable role+booking rows | right Gantt calendar. " +
          "Booking pills from Figma fills: booking-blue rgba(124,168,237,0.8), engagement-booked rgba(106,130,197,0.8), role-booked rgba(26,175,163,0.8), partial rgba(255,255,255,0.4). " +
          "Bottom bar: IPS Pagination + timeline minimap scroll indicator.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ProjectsEngagementsGantt: Story = {
  name: "Projects / Engagements / Gantt",
  render: () => <BookingEngineScreen view="engagements" calendar="gantt" />,
};

export const ProjectsRolesGantt: Story = {
  name: "Projects / Roles / Gantt",
  render: () => <BookingEngineScreen view="roles" calendar="gantt" />,
};

export const ProjectsEngagementsGrid: Story = {
  name: "Projects / Engagements / Grid",
  render: () => <BookingEngineScreen view="engagements" calendar="grid" />,
};

export const ProjectsRolesGrid: Story = {
  name: "Projects / Roles / Grid",
  render: () => <BookingEngineScreen view="roles" calendar="grid" />,
};

export const WorkforceBookings: Story = {
  name: "Workforce / Bookings",
  render: () => <BookingEngineScreen panel="workforce" calendar="gantt" />,
};

export const WorkforceGrid: Story = {
  name: "Workforce / Grid",
  render: () => <BookingEngineScreen panel="workforce" calendar="grid" />,
};
