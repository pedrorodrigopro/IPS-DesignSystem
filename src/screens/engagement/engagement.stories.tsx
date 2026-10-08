// Screens/Engagement — Figma: Engagement detail screen
//
// Tabs: Overview | Roles N | Economics | KPIs | History
// (Feedback tab visible on some engagements — shown when roleCount > 0)
//
// Container mapping (RULE 2b):
//   Overview / KPIs: left sidebar = Tile selected content
//                    right column = plain flex col, each section = Tile highlight content
//   Roles tab:       full-width Tile highlight content (no sidebar)
//   Economics/History: placeholder Tile highlight content
//
// Sidebar sections separated by Divider margin:"0 -16px"
// Attributes section: CSS grid 4-col with label/value pairs

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Navbar }           from "../../components/navbar/navbar";
import { Page }             from "../../components/layout/layout";
import { PageHeader }       from "../../components/page_header/page_header";
import { Navigation }       from "../../components/navigation/navigation";
import { Header }           from "../../components/header/header";
import { Tile }             from "../../components/tile/tile";
import { Divider }          from "../../components/divider/divider";
import { Avatar }           from "../../components/avatar/avatar";
import { Icon }             from "../../components/icon/icon";
import { Button }           from "../../components/button/button";
import { WorkforceMember }  from "../../components/workforce_member/workforce_member";
import { PillWFState, PillSimple } from "../../components/pill/pill";
import { EmptyState }       from "../../components/empty_state/empty_state";
import { Table }            from "../../components/table/table";

import type { TableColumn, TableRow, SortDirection } from "../../components/table/table";
import type { WFState } from "../../components/pill/pill";

// ── Shared typography helpers ─────────────────────────────────────────────────

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

// ── Header icon buttons (top-right) ───────────────────────────────────────────

const HEADER_ICONS = ["edit", "save", "tag", "calendar", "share", "menu-vertical"] as const;

function HeaderActions() {
  return (
    <div style={{ position: "absolute", top: 0, right: 0, display: "flex", gap: 4 }}>
      {HEADER_ICONS.map(icon => (
        <button key={icon} style={{ width: 32, height: 32, borderRadius: "var(--radius-md)", border: "1px solid var(--palette-neutral-0)", background: "var(--palette-white-0)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--palette-blue-2)" }}>
          <Icon name={icon} size={16} />
        </button>
      ))}
    </div>
  );
}

// ── Left sidebar — Tile selected content ─────────────────────────────────────
// Shared across Overview and KPIs tabs.
// Sections: Participants → Resourcing Dates → Privacy → Creator

type SidebarData = {
  ownerInitials: string[];
  assigneeInitials: string;
  expired?: string;
  timeLeft?: string;
  dateCreated: string;
  creatorName: string;
  creatorInitials: string;
};

function EngagementSidebar({ data }: { data: SidebarData }) {
  return (
    <Tile tileStyle="selected" padding="content" style={{ width: 296, flexShrink: 0 }}>

      {/* Participants */}
      <SB>
        <span style={bodyBold}>Participants</span>
        <Icon name="profile" size={16} />
      </SB>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <SB>
          <span style={labelCss}>Owners</span>
          <Row gap={-4}>
            {data.ownerInitials.map((init, i) => (
              <Avatar key={i} initials={init} size="small" />
            ))}
          </Row>
        </SB>
        <SB>
          <span style={labelCss}>Assignee</span>
          <Avatar initials={data.assigneeInitials} size="small" />
        </SB>
      </div>

      <Divider orientation="horizontal" style={{ margin: "0 -16px" }} />

      {/* Resourcing Dates */}
      <span style={bodyBold}>Resourcing Dates</span>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
        <div>
          <div style={labelCss}>{data.expired ? "Expired" : "Time left"}</div>
          <div style={bodyBold}>{data.expired ?? data.timeLeft}</div>
        </div>
        <div>
          <div style={labelCss}>Date created</div>
          <div style={bodyBold}>{data.dateCreated}</div>
        </div>
      </div>

      <Divider orientation="horizontal" style={{ margin: "0 -16px" }} />

      {/* Privacy */}
      <SB>
        <span style={bodyBold}>Privacy</span>
        <Row gap={4}>
          <span style={body}>Public</span>
          <Icon name="info" size={16} />
        </Row>
      </SB>

      <Divider orientation="horizontal" style={{ margin: "0 -16px" }} />

      {/* Creator */}
      <span style={bodyBold}>Creator</span>
      <WorkforceMember variant="small-1line" name={data.creatorName} initials={data.creatorInitials} />

    </Tile>
  );
}

// ── Overview tab ──────────────────────────────────────────────────────────────

type AttributeItem = { label: string; value: string; isLink?: boolean };

function AttributeGrid({ items }: { items: AttributeItem[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px 8px" }}>
      {items.map(({ label, value, isLink }) => (
        <div key={label}>
          <div style={labelCss}>{label}</div>
          <div style={isLink ? linkCss : bodyBold}>{value}</div>
        </div>
      ))}
    </div>
  );
}

function OverviewTab({ roleCount }: { roleCount: number }) {
  const sidebarData: SidebarData = {
    ownerInitials: ["SH", "TU", "??"],
    assigneeInitials: "TU",
    expired: "24-01-2026",
    dateCreated: "10-04-2025",
    creatorName: "Spencer Harmon",
    creatorInitials: "SH",
  };

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      <EngagementSidebar data={sidebarData} />

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>

        {/* No roles / roles link */}
        <Tile tileStyle="highlight" padding="content">
          {roleCount === 0 ? (
            <Row gap={8}>
              <span style={body}>No roles</span>
              <Icon name="open" size={14} style={{ color: "var(--palette-primary-0)" }} />
            </Row>
          ) : (
            <Row gap={8}>
              <span style={linkCss}>{roleCount} role{roleCount !== 1 ? "s" : ""}</span>
              <Icon name="open" size={14} style={{ color: "var(--palette-primary-0)" }} />
            </Row>
          )}
        </Tile>

        {/* Description */}
        <Tile tileStyle="highlight" padding="content">
          <Header size="content" title="Description" />
          <p style={body}>test engagement 1</p>
        </Tile>

        {/* Attributes */}
        <Tile tileStyle="highlight" padding="content">
          <Header size="content" title="Attributes" />
          <AttributeGrid items={[
            { label: "Team",               value: "QA" },
            { label: "Grade",              value: "Lead" },
            { label: "Clients",            value: "Audi" },
            { label: "Industry knowledge", value: "Automobile\nConsumer" },
            { label: "Sales Stage",        value: "Sold: Yes" },
            { label: "Engagement Type",    value: "Chargeable: Yes" },
            { label: "Business Unit",      value: "Accounting" },
            { label: "Engagement Tier",    value: "1A" },
          ]} />
        </Tile>

      </div>
    </div>
  );
}

// ── Roles tab ─────────────────────────────────────────────────────────────────

type RoleRow = TableRow & {
  title: string;
  roleId: string;
  state: string;
  wfState: WFState;
  expiry: string;
  availability: string;
  assignee: string;
};

const ROLES: RoleRow[] = [
  { id: "1", title: "Eng #1 [Staging] Role #1 [Staging]", roleId: "385581", state: "Draft", wfState: "shortlisting",        expiry: "07-01-2027", availability: "03-01-2027 - 08-01-2027", assignee: "" },
  { id: "2", title: "Manchester4 edited",                  roleId: "385579", state: "Open",  wfState: "shortlisting",        expiry: "28-11-2026", availability: "26-10-2026 - 02-11-2026", assignee: "" },
  { id: "3", title: "Manchester3",                         roleId: "385580", state: "Open",  wfState: "partially-confirmed", expiry: "28-11-2026", availability: "09-11-2026 - 27-12-2026", assignee: "" },
];

const roleColumns: TableColumn<RoleRow>[] = [
  {
    key: "title",
    header: "Role Title",
    sortable: false,
    width: "220px",
    type: "text-primary",
  },
  {
    key: "roleId",
    header: "ID",
    sortable: false,
    width: "80px",
    type: "text-regular",
  },
  {
    key: "state",
    header: "State",
    sortable: false,
    width: "90px",
    renderCell: (row) => (
      <PillSimple label={row.state} size="small" bg="var(--palette-neutral-1)" color="var(--palette-blue-2)" />
    ),
  },
  {
    key: "wfState",
    header: "Workflow State",
    sortable: false,
    width: "160px",
    renderCell: (row) => <PillWFState state={row.wfState} size="small" />,
  },
  {
    key: "expiry",
    header: "Expiry date",
    sortable: false,
    width: "110px",
    type: "text-regular",
  },
  {
    key: "availability",
    header: "Availability requirement",
    sortable: false,
    width: "200px",
    renderCell: (row) => (
      <Row gap={6}>
        <span style={body}>{row.availability}</span>
        <Icon name="info" size={14} style={{ color: "var(--palette-blue-2)", flexShrink: 0 }} />
      </Row>
    ),
  },
  {
    key: "assignee",
    header: "Assignee",
    sortable: false,
    width: "120px",
    type: "text-regular",
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

function RolesTab() {
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDir, setSortDir] = useState<SortDirection>("none");
  const [selected, setSelected] = useState<(string | number)[]>([]);

  return (
    <Tile tileStyle="highlight" padding="content">
      {/* Header row: title + action buttons */}
      <SB style={{ marginBottom: 16 }}>
        <Header size="content" title="Roles" />
        <Row gap={8}>
          <Button kind="secondary" size="regular">Apply Project Team Template</Button>
          <Button kind="primary" size="regular">Add role</Button>
        </Row>
      </SB>

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
  );
}

// ── KPIs tab ──────────────────────────────────────────────────────────────────

function KpisTab() {
  const sidebarData: SidebarData = {
    ownerInitials: ["SH", "CD", "BS", "SP"],
    assigneeInitials: "SH",
    timeLeft: "49 months",
    dateCreated: "19-11-2025",
    creatorName: "Spencer Harmon",
    creatorInitials: "SH",
  };

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      <EngagementSidebar data={sidebarData} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 40 }}>
        <EmptyState
          size="big"
          title="Engagement does not have any KPIs configured."
        />
      </div>
    </div>
  );
}

// ── Placeholder tab ───────────────────────────────────────────────────────────

function PlaceholderTab({ name }: { name: string }) {
  return (
    <Tile tileStyle="highlight" padding="content" style={{ textAlign: "center" }}>
      <div style={{ ...labelCss, padding: "32px 0" }}>{name} — not yet built</div>
    </Tile>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────

type EngagementData = {
  id: string;
  title: string;
  state: string;
  roleCount: number;
  hasFeedback?: boolean;
};

function EngagementScreen({ engagement, defaultTab = "overview" }: { engagement: EngagementData; defaultTab?: string }) {
  const [tab, setTab] = useState(defaultTab);

  const tabs = [
    { id: "overview",   label: "Overview" },
    { id: "roles",      label: "Roles",     badge: engagement.roleCount },
    ...(engagement.hasFeedback ? [{ id: "feedback", label: "Feedback" }] : []),
    { id: "economics",  label: "Economics" },
    { id: "kpis",       label: "KPIs" },
    { id: "history",    label: "History" },
  ];

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Page navbar={<Navbar activeId="workflow" />} variant="1280">
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", paddingBottom: 32 }}>

          {/* Page header */}
          <div style={{ position: "relative" }}>
            <PageHeader
              breadcrumbs={[{ label: "Workflow", href: "#" }, { label: `Engagement: ${engagement.title}` }]}
              title={`Engagement: ${engagement.title}`}
              subtitleItems={[
                { label: "ID",      value: engagement.id },
                { label: "State",   value: engagement.state },
                { label: "Privacy", value: "Public" },
              ]}
            />
            <HeaderActions />
          </div>

          {/* Tabs */}
          <Navigation orientation="horizontal" tabs={tabs} activeId={tab} onChange={setTab} />

          {/* Tab content */}
          {tab === "overview"  && <OverviewTab roleCount={engagement.roleCount} />}
          {tab === "roles"     && <RolesTab />}
          {tab === "kpis"      && <KpisTab />}
          {tab === "feedback"  && <PlaceholderTab name="Feedback" />}
          {tab === "economics" && <PlaceholderTab name="Economics" />}
          {tab === "history"   && <PlaceholderTab name="History" />}

        </div>
      </Page>
    </div>
  );
}

// ── Sample engagements ────────────────────────────────────────────────────────

const ENG_CLOSED: EngagementData = { id: "61557",  title: "engagement_test_1",             state: "Closed", roleCount: 0 };
const ENG_OPEN:   EngagementData = { id: "385578", title: "A. Eng #1 [Staging]",           state: "Open",   roleCount: 3 };
const ENG_KPIS:   EngagementData = { id: "184734", title: "Aufderhar, Baumbach and Reinger", state: "Open",  roleCount: 1, hasFeedback: true };

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Screens/Engagement",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Engagement detail screen — 5 tabs (Overview, Roles, Economics, KPIs, History). " +
          "Overview + KPIs: Tile selected sidebar + Tile highlight right column. " +
          "Roles: full-width Tile highlight with table (Role Title, ID, State, WF State, Expiry, Availability, Assignee, ⋮). " +
          "Economics and History are placeholders.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: "Overview",
  render: () => <EngagementScreen engagement={ENG_CLOSED} defaultTab="overview" />,
};

export const Roles: Story = {
  name: "Roles",
  render: () => <EngagementScreen engagement={ENG_OPEN} defaultTab="roles" />,
};

export const KPIs: Story = {
  name: "KPIs",
  render: () => <EngagementScreen engagement={ENG_KPIS} defaultTab="kpis" />,
};
