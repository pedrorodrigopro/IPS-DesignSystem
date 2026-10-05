// Screens/AuditPlanner — AI Planner screen
//
// Container mapping (RULE 2b):
//   Stat tiles:    row of Tile interactive panel — clickable counters
//   Table area:    Tile highlight content wrapping the custom nested table
//   Parent rows:   white bg (palette-white-0)
//   Child rows:    palette-neutral-2 bg (#F8F9FD) — expanded role sub-rows
//   Progress bar:  ProgressLinear under each parent row
//
// The table is NOT the standard IPS Table component — it's a custom expandable
// nested structure. The IPS Table doesn't support expandable rows with
// sub-row content of a different type. We build it with semantic divs following
// the same visual token system.

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Navbar }        from "../../components/navbar/navbar";
import { Icon }          from "../../components/icon/icon";
import { Button }        from "../../components/button/button";
import { Tile }          from "../../components/tile/tile";
import { InputSearch } from "../../components/input/input";
import { ProgressLinear } from "../../components/progress_bar/progress_bar";
import { PillWFState, PillSimple } from "../../components/pill/pill";
import { WorkforceMember } from "../../components/workforce_member/workforce_member";
import { Avatar }        from "../../components/avatar/avatar";

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

// ── Stat tile ─────────────────────────────────────────────────────────────────

type StatTile = { label: string; value: number; accent?: string };

function StatCounter({ label, value, accent }: StatTile) {
  return (
    <Tile tileStyle="interactive" padding="panel" style={{ flex: "1 1 0", minWidth: 120 }}>
      <div style={{ ...labelCss, marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: "var(--font-family)", fontSize: 24, fontWeight: 700, color: accent ?? "var(--palette-blue-0)", lineHeight: 1 }}>
        {value}
      </div>
    </Tile>
  );
}

const STATS: StatTile[] = [
  { label: "Total roles", value: 8 },
  { label: "Exceptions",  value: 4,  accent: "var(--palette-orange-1)" },
  { label: "Not Filled",  value: 0,  accent: "var(--palette-orange-1)" },
  { label: "Booked",      value: 2 },
  { label: "Confirmed",   value: 2 },
  { label: "Pending",     value: 0 },
];

// ── Data ──────────────────────────────────────────────────────────────────────

type RoleRow = {
  id: string;
  name: string;
  grade: string;
  availability: string;
  resourceName: string;
  resourceInitials: string;
  hasWarning?: boolean;
  state: string;
  wfStates: WFState[];
};

type EngagementRow = {
  id: string;
  title: string;
  roles: string;           // e.g. "14/57"
  assigneeName: string;
  assigneeInitials: string;
  endDate: string;
  duration: string;
  dueDays: string;
  resourcingCompleted: string;
  startDate: string;
  state: string;
  dateCreated: string;
  principalOwner: string;
  principalOwnerInitials: string;
  engagementNumber: string;
  referenceCode: string;
  engagementManager: string;
  engagementTier: string;
  costCentre: string;
  progress: number;        // 0-100
  progressColor: string;   // CSS color
  roles_expanded: RoleRow[];
};

const TECH_OVERLAY: WFState  = "technical-overlay";
const ACCREDITATIONS: WFState = "accreditations";
const CONFIRMED_STATE: WFState = "confirmed";

const ENGAGEMENTS: EngagementRow[] = [
  {
    id: "1",
    title: "[2024Q3] - Goodyear Tire Audit",
    roles: "14/57",
    assigneeName: "Alexandra I. Poone",
    assigneeInitials: "AP",
    endDate: "15-07-2024",
    duration: "13 days",
    dueDays: "813 days",
    resourcingCompleted: "21-12-2028",
    startDate: "01-07-2024",
    state: "Open",
    dateCreated: "23-07-2024",
    principalOwner: "Alexandra I. Poone",
    principalOwnerInitials: "AP",
    engagementNumber: "Audit#0",
    referenceCode: "",
    engagementManager: "",
    engagementTier: "1A",
    costCentre: "",
    progress: 25,
    progressColor: "var(--palette-blue-3)",
    roles_expanded: [
      { id: "r1a", name: "smoke test July, 8-3 CLONE", grade: "Director", availability: "13-07-2026 - 19-07-2026", resourceName: "Rutu Shah",    resourceInitials: "RS", hasWarning: true,  state: "Open", wfStates: [TECH_OVERLAY] },
      { id: "r1b", name: "smoke test July, 8-3",       grade: "Director", availability: "13-07-2026 - 19-07-2026", resourceName: "Manuel stg03", resourceInitials: "MS", hasWarning: true,  state: "Open", wfStates: [ACCREDITATIONS, TECH_OVERLAY] },
    ],
  },
  {
    id: "2",
    title: "Marek test",
    roles: "0/1",
    assigneeName: "Rutu Shah",
    assigneeInitials: "RS",
    endDate: "04-10-2025",
    duration: "4 days",
    dueDays: "-272 days",
    resourcingCompleted: "31-12-2025",
    startDate: "30-09-2025",
    state: "Draft",
    dateCreated: "22-09-2025",
    principalOwner: "",
    principalOwnerInitials: "",
    engagementNumber: "123",
    referenceCode: "1",
    engagementManager: "qwe",
    engagementTier: "5",
    costCentre: "CC2157",
    progress: 0,
    progressColor: "var(--palette-orange-0)",
    roles_expanded: [],
  },
  {
    id: "3",
    title: "smoke test July, 8",
    roles: "4/4",
    assigneeName: "Steve Talos",
    assigneeInitials: "ST",
    endDate: "02-08-2026",
    duration: "20 days",
    dueDays: "6 days",
    resourcingCompleted: "06-10-2026",
    startDate: "13-07-2026",
    state: "Open",
    dateCreated: "08-07-2026",
    principalOwner: "",
    principalOwnerInitials: "",
    engagementNumber: "1111",
    referenceCode: "",
    engagementManager: "",
    engagementTier: "3",
    costCentre: "",
    progress: 100,
    progressColor: "var(--palette-blue-3)",
    roles_expanded: [
      { id: "r3a", name: "smoke test July, 8-3 CLONE", grade: "Director", availability: "13-07-2026 - 19-07-2026", resourceName: "Rutu Shah",    resourceInitials: "RS", hasWarning: true,  state: "Open", wfStates: [TECH_OVERLAY] },
      { id: "r3b", name: "smoke test July, 8-3",       grade: "Director", availability: "13-07-2026 - 19-07-2026", resourceName: "Manuel stg03", resourceInitials: "MS", hasWarning: true,  state: "Open", wfStates: [ACCREDITATIONS, TECH_OVERLAY] },
      { id: "r3c", name: "smoke test July, 8-2",       grade: "Director", availability: "20-07-2026 - 24-07-2026", resourceName: "Manuel stg01", resourceInitials: "MS", hasWarning: false, state: "Open", wfStates: [CONFIRMED_STATE] },
      { id: "r3d", name: "smoke test July, 8-1",       grade: "Director", availability: "13-07-2026 - 19-07-2026", resourceName: "Spencer Harmon", resourceInitials: "SH", hasWarning: false, state: "Open", wfStates: [CONFIRMED_STATE] },
    ],
  },
  {
    id: "4",
    title: "Twin Falls",
    roles: "2/3",
    assigneeName: "Steve Talos",
    assigneeInitials: "ST",
    endDate: "-",
    duration: "",
    dueDays: "0 days",
    resourcingCompleted: "30-09-2026",
    startDate: "",
    state: "Open",
    dateCreated: "02-07-2026",
    principalOwner: "",
    principalOwnerInitials: "",
    engagementNumber: "",
    referenceCode: "",
    engagementManager: "",
    engagementTier: "",
    costCentre: "",
    progress: 67,
    progressColor: "var(--palette-blue-3)",
    roles_expanded: [],
  },
  {
    id: "5",
    title: "Troy",
    roles: "1/2",
    assigneeName: "",
    assigneeInitials: "",
    endDate: "-",
    duration: "",
    dueDays: "5 days",
    resourcingCompleted: "05-10-2026",
    startDate: "",
    state: "Open",
    dateCreated: "07-07-2026",
    principalOwner: "",
    principalOwnerInitials: "",
    engagementNumber: "",
    referenceCode: "",
    engagementManager: "",
    engagementTier: "",
    costCentre: "",
    progress: 50,
    progressColor: "var(--palette-blue-3)",
    roles_expanded: [],
  },
  {
    id: "6",
    title: "Audit Engagement 1",
    roles: "1/3",
    assigneeName: "Rachel Green Green",
    assigneeInitials: "RG",
    endDate: "-",
    duration: "",
    dueDays: "6 days",
    resourcingCompleted: "06-10-2026",
    startDate: "",
    state: "Open",
    dateCreated: "08-07-2026",
    principalOwner: "",
    principalOwnerInitials: "",
    engagementNumber: "",
    referenceCode: "",
    engagementManager: "",
    engagementTier: "",
    costCentre: "",
    progress: 33,
    progressColor: "var(--palette-red-0)",
    roles_expanded: [],
  },
  {
    id: "7",
    title: "Michal Audit Engagement",
    roles: "1/1",
    assigneeName: "Sancha Ponsa",
    assigneeInitials: "SP",
    endDate: "-",
    duration: "",
    dueDays: "49 days",
    resourcingCompleted: "18-11-2026",
    startDate: "",
    state: "Open",
    dateCreated: "20-08-2026",
    principalOwner: "",
    principalOwnerInitials: "",
    engagementNumber: "1397248",
    referenceCode: "",
    engagementManager: "",
    engagementTier: "",
    costCentre: "C01368",
    progress: 100,
    progressColor: "var(--palette-red-0)",
    roles_expanded: [],
  },
];

// ── Table column header ───────────────────────────────────────────────────────

const COL_HEADERS = [
  { label: "Engagement Title", sortable: true,  width: 200 },
  { label: "Roles",             sortable: false, width: 70  },
  { label: "Assignee",          sortable: false, width: 160 },
  { label: "End date",          sortable: true,  width: 110 },
  { label: "Duration",          sortable: true,  width: 90  },
  { label: "Due in days",       sortable: true,  width: 90  },
  { label: "Resourcing completed by", sortable: false, width: 130 },
  { label: "Start date",        sortable: true,  width: 110 },
  { label: "State",             sortable: false, width: 80  },
  { label: "Date created",      sortable: true,  width: 110 },
  { label: "Principal Owner",   sortable: false, width: 160 },
  { label: "Engagement Number", sortable: false, width: 130 },
  { label: "Reference Code",    sortable: false, width: 110 },
  { label: "Engagement Manager",sortable: false, width: 140 },
  { label: "Engagement Tier",   sortable: true,  width: 110 },
  { label: "Cost Centre",       sortable: false, width: 100 },
];

// No fixed widths — columns spread across full container width
const ROLE_COL_HEADERS = [
  { label: "Role name"                },
  { label: "Grade"                    },
  { label: "Availability requirement" },
  { label: "Resource"                 },
  { label: "State"                    },
  { label: "Workflow state"           },
];

const MENU_W = 44; // sticky menu column width px

const thStyle: React.CSSProperties = {
  padding: "12px 8px", textAlign: "left", whiteSpace: "nowrap",
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
  color: "var(--palette-blue-0)", borderBottom: "1px solid var(--palette-neutral-0)",
  background: "var(--palette-white-0)",
};
const tdStyle: React.CSSProperties = {
  padding: "12px 8px", verticalAlign: "middle",
};
// Sticky right column — menu button always visible
const stickyMenuTh = (bg = "var(--palette-white-0)"): React.CSSProperties => ({
  ...thStyle, background: bg,
  position: "sticky", right: 0, width: MENU_W,
  boxShadow: "-4px 0 8px rgba(12,20,87,0.06)",
});
const stickyMenuTd = (bg = "var(--palette-white-0)"): React.CSSProperties => ({
  ...tdStyle, background: bg,
  position: "sticky", right: 0, width: MENU_W,
  boxShadow: "-4px 0 8px rgba(12,20,87,0.06)",
});

// ── Engagement parent row ─────────────────────────────────────────────────────

function EngRow({ eng, expanded, onToggle }: { eng: EngagementRow; expanded: boolean; onToggle: () => void }) {
  const state = eng.state as "Open" | "Draft";
  return (
    <>
      {/* Parent row */}
      <tr style={{ background: "var(--palette-white-0)", borderBottom: expanded ? "none" : "1px solid var(--palette-neutral-0)" }}>
        <td style={{ ...tdStyle, width: 200 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
              {/* Expand chevron — top-aligned */}
              <button onClick={onToggle} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 0 0", color: "var(--palette-blue-2)", display: "flex", flexShrink: 0, transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>
                <Icon name="chevron-right" size={16} />
              </button>
              {/* Engagement icon — top-aligned */}
              <Icon name="engagement-audit" size={16} style={{ color: "var(--palette-blue-2)", flexShrink: 0, marginTop: 2 }} />
              {/* Title as link button */}
              <Button kind="link" size="regular" style={{ textAlign: "left", padding: 0 }}>
                {eng.title}
              </Button>
            </div>
            {/* Progress bar row */}
            <Row gap={6} style={{ paddingLeft: 44 }}>
              <span style={labelCss}>{eng.progress}%</span>
              <div style={{ flex: 1, minWidth: 80 }}>
                <ProgressLinear value={eng.progress} />
              </div>
            </Row>
          </div>
        </td>
        <td style={tdStyle}><PillSimple label={eng.roles} size="small" /></td>
        <td style={tdStyle}>
          {eng.assigneeName
            ? <WorkforceMember variant="small-1line" name={eng.assigneeName} initials={eng.assigneeInitials} />
            : null}
        </td>
        <td style={{ ...tdStyle, ...body }}>{eng.endDate}</td>
        <td style={{ ...tdStyle, ...body }}>{eng.duration}</td>
        <td style={{ ...tdStyle, ...body }}>{eng.dueDays}</td>
        <td style={{ ...tdStyle, ...body }}>{eng.resourcingCompleted}</td>
        <td style={{ ...tdStyle, ...body }}>{eng.startDate}</td>
        <td style={tdStyle}>
          <PillSimple
            label={eng.state}
            size="small"
            bg="var(--palette-neutral-1)"
            color={state === "Draft" ? "var(--palette-blue-2)" : "var(--palette-blue-2)"}
          />
        </td>
        <td style={{ ...tdStyle, ...body }}>{eng.dateCreated}</td>
        <td style={tdStyle}>
          {eng.principalOwner
            ? <WorkforceMember variant="small-1line" name={eng.principalOwner} initials={eng.principalOwnerInitials} />
            : null}
        </td>
        <td style={{ ...tdStyle, ...body }}>{eng.engagementNumber}</td>
        <td style={{ ...tdStyle, ...body }}>{eng.referenceCode}</td>
        <td style={{ ...tdStyle, ...body }}>{eng.engagementManager}</td>
        <td style={{ ...tdStyle, ...body }}>{eng.engagementTier}</td>
        <td style={{ ...tdStyle, ...body }}>{eng.costCentre}</td>
        {/* Sticky menu */}
        <td style={stickyMenuTd()}>
          <Button kind="iconTertiary" size="regular" title="Actions">
            <Icon name="menu-vertical" size={16} />
          </Button>
        </td>
      </tr>

      {/* Expanded child rows — nested table spanning full parent width incl. sticky menu column */}
      {expanded && eng.roles_expanded.length > 0 && (
        <tr style={{ background: "var(--palette-neutral-2)" }}>
          {/* colSpan = engagement cols + sticky menu col */}
          <td colSpan={COL_HEADERS.length + 1} style={{ padding: 0, borderBottom: "1px solid var(--palette-neutral-0)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup>
                {/* Role name — wider */}
                <col style={{ width: "28%" }} />
                {/* Grade */}
                <col style={{ width: "10%" }} />
                {/* Availability requirement */}
                <col style={{ width: "22%" }} />
                {/* Resource */}
                <col style={{ width: "18%" }} />
                {/* State */}
                <col style={{ width: "10%" }} />
                {/* Workflow state */}
                <col style={{ width: "12%" }} />
                {/* Sticky menu */}
                <col style={{ width: `${MENU_W}px` }} />
              </colgroup>
              <thead>
                <tr style={{ background: "var(--palette-neutral-2)" }}>
                  {ROLE_COL_HEADERS.map(h => (
                    <th key={h.label} style={{ ...thStyle, background: "var(--palette-neutral-2)", paddingLeft: h.label === "Role name" ? 44 : 8 }}>
                      {h.label}
                    </th>
                  ))}
                  {/* Sticky menu header */}
                  <th style={stickyMenuTh("var(--palette-neutral-2)")} />
                </tr>
              </thead>
              <tbody>
                {eng.roles_expanded.map(role => (
                  <tr key={role.id} style={{ background: "var(--palette-neutral-2)", borderBottom: "1px solid var(--palette-neutral-0)" }}>
                    <td style={{ ...tdStyle, paddingLeft: 44 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                        <Icon name="role-audit" size={14} style={{ color: "var(--palette-blue-2)", flexShrink: 0, marginTop: 2 }} />
                        <Button kind="link" size="regular" style={{ textAlign: "left", padding: 0 }}>
                          {role.name}
                        </Button>
                      </div>
                    </td>
                    <td style={{ ...tdStyle, ...body }}>{role.grade}</td>
                    <td style={tdStyle}>
                      <Row gap={4}>
                        <span style={body}>{role.availability}</span>
                        <Icon name="info" size={14} style={{ color: "var(--palette-blue-2)" }} />
                      </Row>
                    </td>
                    <td style={tdStyle}>
                      <Row gap={4}>
                        {role.resourceName
                          ? <WorkforceMember variant="small-1line" name={role.resourceName} initials={role.resourceInitials} />
                          : null}
                        {role.hasWarning && <Icon name="error" size={14} style={{ color: "var(--palette-red-0)" }} />}
                      </Row>
                    </td>
                    <td style={tdStyle}>
                      <PillSimple label={role.state} size="small" bg="var(--palette-neutral-1)" color="var(--palette-blue-2)" />
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
                        {role.wfStates.map((wfState, i) => (
                          <PillWFState key={i} state={wfState} size="small" />
                        ))}
                      </div>
                    </td>
                    {/* Sticky menu */}
                    <td style={stickyMenuTd("var(--palette-neutral-2)")}>
                      <Button kind="iconTertiary" size="regular" title="Actions">
                        <Icon name="menu-vertical" size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
}

// ── AuditPlanner screen ───────────────────────────────────────────────────────

function AuditPlannerScreen() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["3"])); // smoke test July expanded by default
  const [search, setSearch] = useState("");

  const toggleRow = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filtered = ENGAGEMENTS.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="audit-planner" />

      <div style={{ flex: 1, padding: "24px 24px 32px", overflow: "auto" }}>
        <div style={{ maxWidth: 1600, margin: "0 auto" }}>

          {/* Header */}
          <SB style={{ marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-family)", fontSize: 32, fontWeight: 600, color: "var(--palette-blue-0)" }}>AI Planner</span>
            {/* Target selector — input box style with target-allocation icon inside */}
            <button style={{
              display: "flex", alignItems: "center", gap: 8,
              height: 40, padding: "0 12px",
              border: "1px solid var(--palette-neutral-0)",
              borderRadius: "var(--radius-md)",
              background: "white", cursor: "pointer",
              fontFamily: "var(--font-family)", fontSize: 14,
              fontWeight: 400, color: "var(--palette-blue-0)",
              whiteSpace: "nowrap",
            }}>
              <Icon name="target-allocation" size={16} style={{ color: "var(--palette-blue-2)", flexShrink: 0 }} />
              Target: All
              <Icon name="chevron-down" size={16} style={{ color: "var(--palette-blue-2)", marginLeft: 4 }} />
            </button>
          </SB>

          {/* Stat tiles */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            {STATS.map(s => <StatCounter key={s.label} {...s} />)}
          </div>

          {/* Toolbar */}
          <Row gap={12} style={{ marginBottom: 16 }}>
            <div style={{ width: 240 }}>
              <InputSearch value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
            </div>
            <span style={labelCss}>8 Roles in 7 Engagements</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
              <Button kind="icon" size="regular" title="Filter">
                <Icon name="filter" size={16} />
              </Button>
              <Button kind="icon" size="regular" title="Bulk select">
                <Icon name="bulk" size={16} />
              </Button>
              <Button kind="icon" size="regular" title="Grid view">
                <Icon name="table" size={16} />
              </Button>
            </div>
          </Row>

          {/* Nested expandable table */}
          <Tile tileStyle="highlight" padding="content">
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", borderSpacing: 0, minWidth: 1400 }}>
                <thead>
                  <tr>
                    {COL_HEADERS.map(h => (
                      <th key={h.label} style={{ ...thStyle, width: h.width }}>
                        <Row gap={4} style={{ display: "inline-flex" }}>
                          {h.label}
                          {h.sortable && <Icon name="sort" size={14} style={{ color: "var(--palette-neutral-3)" }} />}
                        </Row>
                      </th>
                    ))}
                    {/* Sticky menu header */}
                    <th style={stickyMenuTh()} />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(eng => (
                    <EngRow
                      key={eng.id}
                      eng={eng}
                      expanded={expanded.has(eng.id)}
                      onToggle={() => toggleRow(eng.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </Tile>

        </div>
      </div>
    </div>
  );
}

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Screens/AuditPlanner",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "AI Planner screen — expandable nested table with engagement parent rows and role sub-rows. " +
          "Stat tiles use Tile interactive panel. " +
          "Table wrapped in Tile highlight, padding:0 + overflow:hidden to clip corners. " +
          "Parent rows: white bg. Expanded child rows: palette-neutral-2 bg. " +
          "Sub-row workflow states shown as coloured dot + bold label. " +
          "Progress bar (ProgressLinear) shown under each parent row title.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "Default",
  render: () => <AuditPlannerScreen />,
};
