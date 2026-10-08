// Screens/Admin — Skills Frameworks
//
// Container mapping (RULE 2b):
//   Table sits directly on page bg (no Tile wrapper) — Table has own white bg
//   Same pattern as Workflow screen
//
// Columns: Name (link) | Description | Last Edited | Custom Field #1-4 | Skills | Profiles | Insights | Actions (sticky)
// Insights: percentage label + ProgressLinear bar (coloured by value)
// Actions: edit icon button (blue-2) + remove icon button (red-0) — sticky

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Navbar }        from "../../components/navbar/navbar";
import { Header }        from "../../components/header/header";
import { Navigation }    from "../../components/navigation/navigation";
import { Icon }          from "../../components/icon/icon";
import { Button }        from "../../components/button/button";
import { InputSearch }   from "../../components/input/input";
import { Table }         from "../../components/table/table";
import { ProgressLinear } from "../../components/progress_bar/progress_bar";
import { Pagination }    from "../../components/pagination/pagination";

import type { TableColumn, TableRow, SortDirection } from "../../components/table/table";

// ── Typography helpers ────────────────────────────────────────────────────────

const body:    React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)" };
const labelCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)" };
const linkCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-primary-0)", lineHeight: "150%" };

function Row({ children, gap = 8, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", alignItems: "center", gap, ...style }}>{children}</div>;
}
function SB({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...style }}>{children}</div>;
}

// ── Insights cell — % label + coloured progress bar ──────────────────────────

function InsightsCell({ pct }: { pct: number }) {
  // Bar colour: 0-5% = red, 6-20% = orange, 21-39% = yellow (orange-0), 40%+ = dark blue
  const barColor =
    pct <= 5  ? "var(--palette-red-0)"     :
    pct <= 20 ? "var(--palette-orange-1)"  :
    pct <= 39 ? "var(--palette-orange-0)"  :
                "var(--palette-blue-0)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 80 }}>
      <span style={{ fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)" }}>
        {pct}%
      </span>
      <div style={{ width: 80 }}>
        <ProgressLinear value={pct} />
      </div>
    </div>
  );
}

// Override the track fill colour inline — ProgressLinear uses its own fill class
// We achieve colour by rendering a custom bar directly
function InsightsCellCustom({ pct }: { pct: number }) {
  const barColor =
    pct <= 5  ? "var(--palette-red-0)"    :
    pct <= 20 ? "var(--palette-orange-1)" :
    pct <= 39 ? "var(--palette-orange-0)" :
                "var(--palette-blue-0)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 80 }}>
      <span style={body}>{pct}%</span>
      {/* Custom bar with semantic colour */}
      <div style={{ width: 80, height: 4, borderRadius: 2, background: "var(--palette-neutral-0)" }}>
        <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", borderRadius: 2, background: barColor, transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}

// ── Actions cell — edit + delete ──────────────────────────────────────────────

function ActionsCell() {
  return (
    <Row gap={4}>
      <Button kind="iconTertiary" size="regular" title="Edit">
        <Icon name="edit" size={16} />
      </Button>
      <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-red-0)", borderRadius: "var(--radius-md)" }}>
        <Icon name="remove" size={16} />
      </button>
    </Row>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

type FrameworkRow = TableRow & {
  name: string;
  description: string;
  lastEdited: string;
  custom1: string;
  custom2: string;
  custom3: string;
  custom4: string;
  skills: number;
  profiles: number;
  insights: number; // 0-100
};

const PRIMARY_FRAMEWORKS: FrameworkRow[] = [
  { id: "f1",  name: "Business Operations & Finance",  description: "The Business Operations & Finance framework combines...", lastEdited: "29-09-2026", custom1: "-", custom2: "-", custom3: "-", custom4: "-", skills: 2,  profiles: 0,  insights: 2  },
  { id: "f2",  name: "Product & Commercial Operations", description: "A Product & Commercial Operations professional...",         lastEdited: "29-09-2026", custom1: "-", custom2: "-", custom3: "-", custom4: "-", skills: 2,  profiles: 0,  insights: 6  },
  { id: "f3",  name: "QA",                              description: "A Project Manager leads, plans, and executes projects from...", lastEdited: "22-09-2026", custom1: "-", custom2: "-", custom3: "-", custom4: "-", skills: 5,  profiles: 0,  insights: 10 },
  { id: "f4",  name: "dsds",                            description: "-",                                                         lastEdited: "03-09-2026", custom1: "Taste",        custom2: "-", custom3: "-", custom4: "-", skills: 4,  profiles: 0,  insights: 2  },
  { id: "f5",  name: "QA-R01-Primary-Regression-20260826", description: "-",                                                    lastEdited: "03-09-2026", custom1: "-",            custom2: "-", custom3: "-", custom4: "-", skills: 4,  profiles: 0,  insights: 1  },
  { id: "f6",  name: "QA Smoke Test Framework SP-9743", description: "Created during SP-9743 QA follow-up smoke test",           lastEdited: "24-07-2026", custom1: "-",            custom2: "-", custom3: "-", custom4: "-", skills: 0,  profiles: 0,  insights: 0  },
  { id: "f7",  name: "New test framework 2",            description: "test - QA smoke edit SP-9743",                             lastEdited: "24-07-2026", custom1: "-",            custom2: "-", custom3: "-", custom4: "-", skills: 0,  profiles: 0,  insights: 0  },
  { id: "f8",  name: "New test framework",              description: "test",                                                      lastEdited: "13-07-2026", custom1: "-",            custom2: "-", custom3: "-", custom4: "-", skills: 0,  profiles: 0,  insights: 0  },
  { id: "f9",  name: "test A",                          description: "-",                                                         lastEdited: "13-07-2026", custom1: "-",            custom2: "-", custom3: "-", custom4: "-", skills: 0,  profiles: 0,  insights: 0  },
  { id: "f10", name: "Test - A - Regression",           description: "Test",                                                     lastEdited: "23-06-2026", custom1: "Sub Industry", custom2: "-", custom3: "-", custom4: "-", skills: 3,  profiles: 0,  insights: 40 },
  { id: "f11", name: "Sample Primary Skill Framework Creation", description: "Description info",                                lastEdited: "19-06-2026", custom1: "Languages",    custom2: "Grade", custom3: "-", custom4: "-", skills: 2, profiles: 3,  insights: 49 },
  { id: "f12", name: "#SF1",                            description: "-",                                                         lastEdited: "16-06-2026", custom1: "Business Unit",custom2: "-", custom3: "-", custom4: "-", skills: 1,  profiles: 1,  insights: 31 },
  { id: "f13", name: "Regression A-B",                  description: "Regression",                                               lastEdited: "16-06-2026", custom1: "Specialty",    custom2: "-", custom3: "-", custom4: "-", skills: 2,  profiles: 4,  insights: 20 },
  { id: "f14", name: "Re",                              description: "-",                                                         lastEdited: "16-06-2026", custom1: "Languages",    custom2: "-", custom3: "-", custom4: "-", skills: 3,  profiles: 56, insights: 28 },
  { id: "f15", name: "DevOps Engineer",                 description: "-",                                                         lastEdited: "21-04-2026", custom1: "-",            custom2: "-", custom3: "-", custom4: "-", skills: 0,  profiles: 0,  insights: 0  },
  { id: "f16", name: "Geostrategy expert",              description: "Geostrategy expert",                                       lastEdited: "06-04-2026", custom1: "-",            custom2: "-", custom3: "-", custom4: "-", skills: 2,  profiles: 0,  insights: 0  },
  { id: "f17", name: "Regression Primary SF",           description: "Regression Primary SF",                                   lastEdited: "17-03-2026", custom1: "Grade",        custom2: "-", custom3: "-", custom4: "-", skills: 3,  profiles: 26, insights: 9  },
];

// ── Screen component ──────────────────────────────────────────────────────────

function SkillsFrameworksScreen() {
  const [activeTab, setActiveTab] = useState("primary");
  const [search, setSearch]       = useState("");
  const [sortKey, setSortKey]     = useState<string | undefined>();
  const [sortDir, setSortDir]     = useState<SortDirection>("none");
  const [page, setPage]           = useState(1);
  const [selected, setSelected]   = useState<(string | number)[]>([]);

  const TABS = [
    { id: "primary",   label: "Primary Frameworks",   badge: 187 },
    { id: "secondary", label: "Secondary Frameworks", badge: 85  },
  ];

  const filtered = PRIMARY_FRAMEWORKS.filter(f =>
    !search.trim() ||
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.description.toLowerCase().includes(search.toLowerCase())
  );

  const columns: TableColumn<FrameworkRow>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      width: "160px",
      renderCell: (row) => <span style={linkCss}>{row.name}</span>,
    },
    {
      key: "description",
      header: "Description",
      sortable: true,
      width: "200px",
      renderCell: (row) => (
        <span style={{ ...body, color: "var(--palette-blue-2)", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
          {row.description}
        </span>
      ),
    },
    {
      key: "lastEdited",
      header: "Last Edited",
      sortable: true,
      width: "110px",
      type: "text-regular",
    },
    { key: "custom1", header: "Custom Field #1", sortable: false, width: "110px", renderCell: (row) => <span style={body}>{row.custom1}</span> },
    { key: "custom2", header: "Custom Field #2", sortable: false, width: "110px", renderCell: (row) => <span style={body}>{row.custom2}</span> },
    { key: "custom3", header: "Custom Field #3", sortable: false, width: "110px", renderCell: (row) => <span style={body}>{row.custom3}</span> },
    { key: "custom4", header: "Custom Field #4", sortable: false, width: "110px", renderCell: (row) => <span style={body}>{row.custom4}</span> },
    {
      key: "skills",
      header: "Skills",
      sortable: true,
      width: "70px",
      type: "text-regular",
    },
    {
      key: "profiles",
      header: "Profiles",
      sortable: true,
      width: "80px",
      type: "text-regular",
    },
    {
      key: "insights",
      header: "Insights",
      sortable: false,
      width: "100px",
      renderCell: (row) => <InsightsCellCustom pct={row.insights} />,
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      sticky: true,
      width: "80px",
      renderCell: () => <ActionsCell />,
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="admin" />

      <div style={{ flex: 1, padding: "24px 24px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ maxWidth: 1600, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Page header */}
          <SB>
            <Header size="page" title="Skills Frameworks" />
            <Row gap={8}>
              <Button kind="secondary" size="regular">
                <Icon name="export" size={16} />
                Export
              </Button>
              <Button kind="primary" size="regular">
                <Icon name="add" size={16} />
                Create Primary Framework
              </Button>
            </Row>
          </SB>

          {/* Tabs: Primary / Secondary */}
          <Navigation orientation="horizontal" tabs={TABS} activeId={activeTab} onChange={setActiveTab} />

          {/* Search + count */}
          <Row gap={12}>
            <div style={{ width: 240 }}>
              <InputSearch value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
            </div>
            <span style={labelCss}>{filtered.length} in total</span>
          </Row>

          {/* Table — no Tile wrapper, sits directly on page bg */}
          <Table
            columns={columns}
            rows={filtered}
            compact={false}
            selectable={false}
            selectedRows={selected}
            onSelectionChange={setSelected}
            sortKey={sortKey}
            sortDirection={sortDir}
            onSort={(key, dir) => { setSortKey(key); setSortDir(dir); }}
          />

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination total={10} current={page} onChange={setPage} />
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Screens/Admin",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Admin screen — Skills Frameworks table. " +
          "Table sits directly on page bg (no Tile wrapper — same pattern as Workflow). " +
          "Columns: Name (link) | Description | Last Edited | Custom Field #1-4 | Skills | Profiles | Insights (% + coloured bar) | Actions (edit + delete, sticky). " +
          "Insights bar: red ≤5%, orange ≤20%, yellow-orange ≤39%, dark blue 40%+. " +
          "Tabs: Primary Frameworks (187) | Secondary Frameworks (85).",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const SkillsFrameworks: Story = {
  name: "Skills Frameworks",
  render: () => <SkillsFrameworksScreen />,
};
