// Screens/Workflow — Figma: Workflow screen, Engagements + Roles tabs
//
// Container system:
//   Page shell: Navbar + Page variant="1280"
//   Table container: Tile highlight + content padding (16px)
//   Group header: Accordion above table (no Tile — sits directly on page bg)
//
// Columns:
//   Engagements: Title | Roles | State | Start date | Tier | Assignee | Dishes | Duration | ⋮ sticky
//   Roles:       Title | Tag | Vacancies | State | WF State | Expiry | Availability | Due in days | ⋮ sticky

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Navbar }       from "../../components/navbar/navbar";
import { Page }         from "../../components/layout/layout";
import { Header }       from "../../components/header/header";
import { Navigation }   from "../../components/navigation/navigation";
import { Tile }         from "../../components/tile/tile";
import { Accordion }    from "../../components/accordion/accordion";
import { Icon }         from "../../components/icon/icon";
import { Button }       from "../../components/button/button";
import { InputSearch }  from "../../components/input/input";
import { Table }        from "../../components/table/table";
import { PillWFState, PillSimple } from "../../components/pill/pill";
import { WorkforceMember } from "../../components/workforce_member/workforce_member";

import type { TableColumn, TableRow, SortDirection } from "../../components/table/table";
import type { WFState } from "../../components/pill/pill";

// ── Shared typography ─────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12,
  fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%",
};

// ── Toolbar ───────────────────────────────────────────────────────────────────

function Toolbar({ count, unit, gantt = false }: { count: number; unit: string; gantt?: boolean }) {
  const [search, setSearch] = useState("");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <div style={{ width: 240 }}>
        <InputSearch value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
      </div>
      <span style={labelStyle}>{count} {unit}</span>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        {gantt && (
          <>
            <span style={labelStyle}>Gantt view</span>
            <div style={{ width: 36, height: 20, borderRadius: 10, background: "var(--palette-neutral-0)", position: "relative", flexShrink: 0 }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: "white", position: "absolute", left: 2, top: 2, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
            </div>
          </>
        )}
        <Button kind="icon" size="regular" title="Filter">
          <Icon name="filter" size={16} />
        </Button>
        <button style={{ width: 32, height: 32, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", background: "var(--palette-blue-1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
          <Icon name="table" size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Engagements tab ───────────────────────────────────────────────────────────

type EngagementRow = TableRow & {
  title: string;
  roles: string;
  state: string;
  startDate: string;
  tier: string;
  assigneeName: string;
  assigneeInitials: string;
  dishes: string;
  duration: string;
};

const ENGAGEMENTS: EngagementRow[] = [
  { id: "e1",  title: "engagement_test_1",                roles: "0/0", state: "Closed", startDate: "",           tier: "1A", assigneeName: "test user",      assigneeInitials: "TU", dishes: "",                   duration: ""          },
  { id: "e2",  title: "A. Eng #1 [Staging]",             roles: "0/3", state: "Open",   startDate: "",           tier: "",   assigneeName: "Alex (empty PG)", assigneeInitials: "AP", dishes: "",                   duration: ""          },
  { id: "e3",  title: "A. Eng #1 [Staging]",             roles: "0/3", state: "Open",   startDate: "",           tier: "",   assigneeName: "Alex (empty PG)", assigneeInitials: "AP", dishes: "",                   duration: ""          },
  { id: "e4",  title: "Abbott LLC",                      roles: "1/1", state: "Open",   startDate: "01-05-2026", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "3447 days" },
  { id: "e5",  title: "Accessibility",                   roles: "0/3", state: "Draft",  startDate: "",           tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "Supper and breakfast", duration: ""        },
  { id: "e6",  title: "Adams LLC",                       roles: "1/1", state: "Open",   startDate: "01-10-2026", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "2580 days" },
  { id: "e7",  title: "Adams-Schultz",                   roles: "1/1", state: "Open",   startDate: "01-04-2026", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "3120 days" },
  { id: "e8",  title: "Altenwerth-Haag",                 roles: "0/1", state: "Open",   startDate: "01-04-2026", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "2651 days" },
  { id: "e9",  title: "Ankunding, Lehner and Wehner",    roles: "1/1", state: "Open",   startDate: "01-08-2025", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "1886 days" },
  { id: "e10", title: "Ankunding-Schumm",                roles: "1/1", state: "Open",   startDate: "01-09-2026", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "2407 days" },
  { id: "e11", title: "Aufderhar, Baumbach and Reinger", roles: "1/1", state: "Open",   startDate: "01-07-2025", tier: "",   assigneeName: "Spencer Harmon", assigneeInitials: "SH", dishes: "",                   duration: "2673 days" },
  { id: "e12", title: "Aufderhar, Romaguera and Renner", roles: "0/1", state: "Open",   startDate: "01-07-2026", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "1496 days" },
  { id: "e13", title: "Bailey Inc",                      roles: "1/1", state: "Open",   startDate: "01-10-2025", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "2924 days" },
  { id: "e14", title: "Balistreri-Schmeler",             roles: "1/1", state: "Open",   startDate: "01-08-2026", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "464 days"  },
  { id: "e15", title: "Bartoletti Group",                roles: "1/1", state: "Open",   startDate: "01-01-2026", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "2426 days" },
  { id: "e16", title: "Bartoletti Inc",                  roles: "1/1", state: "Open",   startDate: "01-09-2028", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "1648 days" },
  { id: "e17", title: "Bartoletti-Kertzmann",            roles: "1/1", state: "Open",   startDate: "01-09-2026", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "2190 days" },
  { id: "e18", title: "Bashirian and Sons",              roles: "0/1", state: "Open",   startDate: "01-06-2026", tier: "",   assigneeName: "",                assigneeInitials: "",   dishes: "",                   duration: "1729 days" },
  { id: "e19", title: "Baumbach Group",                  roles: "0/1", state: "Open",   startDate: "01-03-2028", tier: "",   assigneeName: "Santi Angulo",   assigneeInitials: "SA", dishes: "",                   duration: "2756 days" },
];

const engagementColumns: TableColumn<EngagementRow>[] = [
  {
    key: "title",
    header: "Engagement Title",
    sortable: true,
    width: "220px",
    type: "text-primary",
  },
  {
    key: "roles",
    header: "Roles",
    sortable: false,
    width: "80px",
    renderCell: (row) => <PillSimple label={row.roles} size="small" />,
  },
  {
    key: "state",
    header: "State",
    sortable: false,
    width: "90px",
    renderCell: (row) => (
      <PillSimple
        label={row.state}
        size="small"
        bg={row.state === "Closed" ? "var(--palette-neutral-1)" : row.state === "Draft" ? "var(--palette-neutral-1)" : "var(--palette-neutral-1)"}
        color="var(--palette-blue-2)"
      />
    ),
  },
  {
    key: "startDate",
    header: "Start date",
    sortable: true,
    width: "120px",
    type: "text-regular",
  },
  {
    key: "tier",
    header: "Engagement Tier",
    sortable: false,
    width: "130px",
    type: "text-regular",
  },
  {
    key: "assigneeName",
    header: "Assignee",
    sortable: true,
    width: "160px",
    renderCell: (row) => row.assigneeName ? (
      <WorkforceMember
        variant="small-1line"
        name={row.assigneeName}
        initials={row.assigneeInitials}
      />
    ) : null,
  },
  {
    key: "dishes",
    header: "Dishes",
    sortable: false,
    width: "160px",
    type: "text-regular",
  },
  {
    key: "duration",
    header: "Duration",
    sortable: true,
    width: "100px",
    type: "text-regular",
  },
  {
    key: "pin",
    header: "",
    sortable: false,
    sticky: true,
    width: "32px",
    renderCell: (row) => row.id === "e1" ? (
      <button style={{ width: 28, height: 28, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-primary-0)" }}>
        <Icon name="pin" size={16} />
      </button>
    ) : null,
  },
  {
    key: "actions",
    header: "",
    sortable: false,
    sticky: true,
    width: "40px",
    renderCell: () => (
      <button style={{ width: 28, height: 28, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)" }}>
        <Icon name="menu-vertical" size={16} />
      </button>
    ),
  },
];

function EngagementsTab() {
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDir, setSortDir] = useState<SortDirection>("none");
  const [selected, setSelected] = useState<(string | number)[]>([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Toolbar count={319} unit="engagements" />

      {/* Group header — Unseen Ownership */}
      <Accordion title="Unseen Ownership" size="body" defaultExpanded />

      <Tile tileStyle="highlight" padding="content">
        <Table
          columns={engagementColumns}
          rows={ENGAGEMENTS}
          compact={false}
          selectable
          selectedRows={selected}
          onSelectionChange={setSelected}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => { setSortKey(key); setSortDir(dir); }}
        />
      </Tile>
    </div>
  );
}

// ── Roles tab ─────────────────────────────────────────────────────────────────

type RoleRow = TableRow & {
  title: string;
  vacancies: string;
  state: string;
  wfState: WFState;
  expiry: string;
  start: string;
  dueDays: number;
};

const ROLES: RoleRow[] = [
  { id: "r1",  title: "SP-11459 - 1",       vacancies: "1/1", state: "Open", wfState: "new",          expiry: "28-10-2026", start: "19-10-2026 - 21-10-2026", dueDays: 28 },
  { id: "r2",  title: "test",               vacancies: "1/1", state: "Open", wfState: "new",          expiry: "29-10-2026", start: "16-09-2026 - 24-09-2026", dueDays: 29 },
  { id: "r3",  title: "Scranton",           vacancies: "1/1", state: "Open", wfState: "shortlisting", expiry: "28-10-2026", start: "",                        dueDays: 28 },
  { id: "r4",  title: "Matches - Ordering", vacancies: "1/1", state: "Open", wfState: "shortlisting", expiry: "25-10-2026", start: "28-09-2026 - 11-10-2026", dueDays: 25 },
  { id: "r5",  title: "Frisco",             vacancies: "1/1", state: "Open", wfState: "new",          expiry: "25-10-2026", start: "",                        dueDays: 25 },
  { id: "r6",  title: "Senior Sales Rep",   vacancies: "1/1", state: "Open", wfState: "new",          expiry: "24-10-2026", start: "",                        dueDays: 24 },
  { id: "r7",  title: "BRole1 CLONE",       vacancies: "3/3", state: "Open", wfState: "new",          expiry: "24-10-2026", start: "",                        dueDays: 24 },
  { id: "r8",  title: "BRole2",             vacancies: "2/2", state: "Open", wfState: "new",          expiry: "24-10-2026", start: "",                        dueDays: 24 },
  { id: "r9",  title: "BRole1",             vacancies: "3/3", state: "Open", wfState: "new",          expiry: "24-10-2026", start: "",                        dueDays: 24 },
  { id: "r10", title: "mlr-100",            vacancies: "1/1", state: "Open", wfState: "new",          expiry: "24-10-2026", start: "28-09-2026 - 30-09-2026", dueDays: 24 },
  { id: "r11", title: "ST Role#3",          vacancies: "1/1", state: "Open", wfState: "new",          expiry: "23-10-2026", start: "31-08-2026 - 12-09-2027", dueDays: 23 },
  { id: "r12", title: "ST Role#2",          vacancies: "0/2", state: "Open", wfState: "confirmed",    expiry: "23-10-2026", start: "31-08-2026 - 12-09-2027", dueDays: 23 },
  { id: "r13", title: "ST Role#1",          vacancies: "0/1", state: "Open", wfState: "confirmed",    expiry: "23-10-2026", start: "01-09-2026 - 10-10-2027", dueDays: 23 },
];

const roleColumns: TableColumn<RoleRow>[] = [
  { key: "title",     header: "Role Title",               sortable: false, width: "200px", type: "text-primary" },
  { key: "tag",       header: "Tag",                      sortable: true,  width: "80px",  renderCell: () => null },
  {
    key: "vacancies", header: "Vacancies [open/total]",   sortable: false, width: "120px",
    renderCell: (row) => <PillSimple label={row.vacancies} size="small" />,
  },
  {
    key: "state",     header: "State",                    sortable: false, width: "80px",
    renderCell: (row) => <PillSimple label={row.state} size="small" bg="var(--palette-neutral-1)" color="var(--palette-blue-2)" />,
  },
  {
    key: "wfState",   header: "Workflow state",           sortable: false, width: "150px",
    renderCell: (row) => <PillWFState state={row.wfState} size="small" />,
  },
  { key: "expiry",    header: "Expiry date",              sortable: true,  width: "120px", type: "text-regular" },
  {
    key: "start",     header: "Availability requirement", sortable: true,  width: "200px",
    renderCell: (row) => row.start ? (
      <span style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-0)" }}>
        {row.start}{" "}
        <Icon name="info" size={14} style={{ verticalAlign: "middle", color: "var(--palette-blue-2)" }} />
      </span>
    ) : null,
  },
  {
    key: "dueDays",   header: "Due in days",              sortable: true,  width: "90px",  align: "right",
    renderCell: (row) => (
      <span style={{ fontFamily: "var(--font-family)", fontSize: 14, color: row.dueDays < 20 ? "var(--palette-red-0)" : "var(--palette-blue-0)", fontWeight: row.dueDays < 20 ? 700 : 400 }}>
        {row.dueDays}
      </span>
    ),
  },
  {
    key: "actions",   header: "",                         sortable: false, sticky: true, width: "48px",
    renderCell: () => (
      <button style={{ width: 28, height: 28, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)" }}>
        <Icon name="menu-vertical" size={16} />
      </button>
    ),
  },
];

function RolesTab() {
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDir, setSortDir] = useState<SortDirection>("none");
  const [selected, setSelected] = useState<(string | number)[]>([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Toolbar count={374} unit="roles" gantt />
      <Tile tileStyle="highlight" padding="content">
        <Table
          columns={roleColumns}
          rows={ROLES}
          compact={false}
          selectable
          selectedRows={selected}
          onSelectionChange={setSelected}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => { setSortKey(key); setSortDir(dir); }}
        />
      </Tile>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "engagements", label: "Engagements" },
  { id: "roles",       label: "Roles", badge: 374 },
];

function WorkflowScreen({ defaultTab = "engagements" }: { defaultTab?: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Page navbar={<Navbar activeId="workflow" />} variant="1280">
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", paddingBottom: 32 }}>

          <Header
            size="page"
            title="Workflow"
            actions={[
              { label: "Import", variant: "secondary", onClick: () => {} },
              { label: "Export", variant: "primary",   onClick: () => {} },
            ]}
          />

          <Navigation
            orientation="horizontal"
            tabs={TABS}
            activeId={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === "engagements" && <EngagementsTab />}
          {activeTab === "roles"       && <RolesTab />}

        </div>
      </Page>
    </div>
  );
}

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Screens/Workflow",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Workflow screen — Engagements and Roles tabs. " +
          "Table wrapped in Tile highlight + content padding (16px). " +
          "Engagements: group header accordion + 19 sample rows with assignee WM cell, pin/menu sticky cols. " +
          "Roles: Gantt toggle, WFState pills, availability range, due days, menu sticky col.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Engagements: Story = {
  name: "Engagements",
  render: () => <WorkflowScreen defaultTab="engagements" />,
};

export const Roles: Story = {
  name: "Roles",
  render: () => <WorkflowScreen defaultTab="roles" />,
};
