// Screens/Analytics — Reports table + Create Report wizard (Details, Fields, Filters, Generate)
//
// Container mapping (RULE 2b):
//   Reports table:   Table sits directly on page bg (no Tile wrapper — table has own white bg)
//   Create Report:   Wizard (4 steps) + page content in Tile highlight content sections
//   Actions bar:     Actions variant="sticky-screen" — white panel, upward shadow, 1280px centred
//   Template cards:  Tile interactive content (clickable) / Tile dark content (selected)
//   Filter groups:   Switch + label, expanded group fields in plain flex grid (no Tile — flat form)
//   Generate summary: Tile highlight content, two-column layout
//
// Components used:
//   Wizard, Actions, Tile, Table, Navigation, Header, InputSearch, Input,
//   Button, ButtonGroup, Switch, Icon, PillSimple, Divider, Accordion

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Navbar }       from "../../components/navbar/navbar";
import { Header }       from "../../components/header/header";
import { Navigation }   from "../../components/navigation/navigation";
import { Tile }         from "../../components/tile/tile";
import { Divider }      from "../../components/divider/divider";
import { Icon }         from "../../components/icon/icon";
import { Button }       from "../../components/button/button";
import { ButtonGroup }  from "../../components/button_group/button_group";
import { InputSearch, InputSelect } from "../../components/input/input";
import { Switch }       from "../../components/switch/switch";
import { Wizard }       from "../../components/wizard/wizard";
import { Actions }      from "../../components/actions/actions";
import { PillSimple }   from "../../components/pill/pill";
import { Table }        from "../../components/table/table";
import { Accordion }    from "../../components/accordion/accordion";
import { Checkbox }     from "../../components/checkbox/checkbox";

import type { TableColumn, TableRow, SortDirection } from "../../components/table/table";

// ── Typography helpers ────────────────────────────────────────────────────────

const bodyBold: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%" };
const body:     React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%" };
const labelCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%" };
const linkCss:  React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-primary-0)", lineHeight: "150%" };
const h3:       React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 24, fontWeight: 600, color: "var(--palette-blue-0)", lineHeight: "125%", marginBottom: 4 };
const h4:       React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 20, fontWeight: 600, color: "var(--palette-blue-0)", lineHeight: "125%", marginBottom: 4 };

function Row({ children, gap = 8, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", alignItems: "center", gap, ...style }}>{children}</div>;
}
function SB({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...style }}>{children}</div>;
}

// ── Shared page shell ─────────────────────────────────────────────────────────

function AnalyticsShell({ children, scrollable = true }: { children: React.ReactNode; scrollable?: boolean }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="insights" />
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        overflowY: scrollable ? "auto" : "hidden",
        padding: scrollable ? "24px 24px 0" : 0,
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Booking count pill (top-right on Create Report) ───────────────────────────

function BookingCountPill({ count, ready = false }: { count: number; ready?: boolean }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "var(--palette-neutral-1)", borderRadius: "var(--radius-xl)",
      padding: "6px 16px",
    }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: ready ? "var(--palette-green-0)" : "var(--palette-orange-1)", flexShrink: 0, display: "inline-block" }} />
      <span style={body}>Number of bookings: {count.toLocaleString()}</span>
    </div>
  );
}

// ── Wizard steps ──────────────────────────────────────────────────────────────

const WIZARD_STEPS = [
  { id: "details",  label: "Details"  },
  { id: "fields",   label: "Fields"   },
  { id: "filters",  label: "Filters"  },
  { id: "generate", label: "Generate" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REPORTS TABLE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ReportRow = TableRow & {
  name: string;
  versions: string;
  template: string;
  templateIsLink: boolean;
  creationDate: string;
  status: "Processing" | "Cancelled" | "Ready" | "Error";
};

const REPORTS: ReportRow[] = [
  { id: "r1",  name: "SP-10300 /1",                                                                              versions: "-", template: "Custom",                           templateIsLink: false, creationDate: "25-09-2026", status: "Processing" },
  { id: "r2",  name: "Calendar: FC2026-extra week. Start date: January 5, 2026. Period: 2025-04-07- 2025-07-06 - Calendar:", versions: "-", template: "Custom",               templateIsLink: false, creationDate: "25-09-2026", status: "Processing" },
  { id: "r3",  name: "report1123",                                                                               versions: "-", template: "Custom",                           templateIsLink: false, creationDate: "03-09-2026", status: "Cancelled" },
  { id: "r4",  name: "Smoke Report - without templates",                                                         versions: "-", template: "Custom",                           templateIsLink: false, creationDate: "01-09-2026", status: "Cancelled" },
  { id: "r5",  name: "Smoke testing 01-09-2026",                                                                 versions: "-", template: "Smoke Template Demand (FC+extra week)", templateIsLink: true, creationDate: "01-09-2026", status: "Cancelled" },
  { id: "r6",  name: "S&D Report - Smoke 01/09-2026",                                                           versions: "-", template: "S&D monthly",                      templateIsLink: true,  creationDate: "01-09-2026", status: "Cancelled" },
  { id: "r7",  name: "Smoke testing - Demand + extra week - 01/09-2026",                                        versions: "-", template: "Smoke Template Demand (FC+extra week)", templateIsLink: true, creationDate: "01-09-2026", status: "Cancelled" },
  { id: "r8",  name: "Supply report - Smoke testing 01/09-2026",                                                 versions: "-", template: "Supply Template Smoke (Default)", templateIsLink: true,  creationDate: "01-09-2026", status: "Cancelled" },
  { id: "r9",  name: "Staging Smoke 01/09-2026",                                                                 versions: "-", template: "Smoke Template Demand (Default)", templateIsLink: true,  creationDate: "01-09-2026", status: "Cancelled" },
  { id: "r10", name: "asd",                                                                                      versions: "1", template: "Demand Report with no Dates",     templateIsLink: true,  creationDate: "06-08-2026", status: "Ready"     },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Processing: { bg: "var(--palette-orange-2)", color: "var(--palette-orange-1)" },
  Cancelled:  { bg: "var(--palette-red-2)",    color: "var(--palette-red-0)"    },
  Ready:      { bg: "var(--palette-green-2)",  color: "var(--palette-green-0)"  },
  Error:      { bg: "var(--palette-red-2)",    color: "var(--palette-red-0)"    },
};

const reportColumns: TableColumn<ReportRow>[] = [
  {
    key: "name",
    header: "Report name",
    sortable: true,
    width: "380px",
    renderCell: (row) => (
      <span style={{ fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: row.status === "Cancelled" ? "var(--palette-blue-2)" : "var(--palette-blue-0)" }}>
        {row.name}
      </span>
    ),
  },
  {
    key: "versions",
    header: "Versions",
    sortable: false,
    width: "80px",
    type: "text-regular",
  },
  {
    key: "template",
    header: "Template",
    sortable: true,
    width: "220px",
    renderCell: (row) => (
      <span style={row.templateIsLink ? linkCss : body}>{row.template}</span>
    ),
  },
  {
    key: "creationDate",
    header: "Creation date",
    sortable: false,
    width: "120px",
    renderCell: (row) => (
      <span style={{ fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: row.status === "Cancelled" ? "var(--palette-blue-2)" : "var(--palette-blue-0)" }}>
        {row.creationDate}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: false,
    width: "120px",
    renderCell: (row) => {
      const s = STATUS_STYLES[row.status] ?? STATUS_STYLES.Cancelled;
      return <PillSimple label={row.status} size="small" bg={s.bg} color={s.color} />;
    },
  },
  {
    key: "bookmark",
    header: "",
    sortable: false,
    sticky: true,
    width: "40px",
    renderCell: () => (
      <button style={{ width: 28, height: 28, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)" }}>
        <Icon name="save" size={16} />
      </button>
    ),
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

// Custom counter-tab bar (Report counts below label, active = blue underline)
function ReportCountTabs({ tabs, activeId, onChange }: {
  tabs: { id: string; label: string; count: number }[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--palette-neutral-0)", marginBottom: 24 }}>
      {tabs.map(tab => {
        const active = tab.id === activeId;
        return (
          <button key={tab.id} onClick={() => onChange(tab.id)} style={{
            display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4,
            padding: "12px 24px 12px 0", border: "none", background: "none", cursor: "pointer",
            borderBottom: active ? "2px solid var(--palette-primary-0)" : "2px solid transparent",
            marginBottom: -1,
          }}>
            <span style={{ fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: active ? "var(--palette-blue-0)" : "var(--palette-blue-2)" }}>{tab.label}</span>
            <span style={{ fontFamily: "var(--font-family)", fontSize: 20, fontWeight: 700, color: active ? "var(--palette-blue-0)" : "var(--palette-blue-2)" }}>{tab.count}</span>
          </button>
        );
      })}
    </div>
  );
}

function ReportsScreen({ onCreateClick }: { onCreateClick: () => void }) {
  const [activeTab, setActiveTab] = useState("my");
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDir, setSortDir] = useState<SortDirection>("none");
  const [search, setSearch] = useState("");

  const MAIN_TABS = [
    { id: "reports",  label: "Reports"         },
    { id: "insights", label: "Dynamic Insights" },
  ];

  const REPORT_TABS = [
    { id: "my",       label: "My reports",     count: 411 },
    { id: "bookmark", label: "Bookmarked",      count: 5   },
    { id: "shared",   label: "Shared with me",  count: 0   },
    { id: "template", label: "Templates",       count: 34  },
  ];

  return (
    <AnalyticsShell>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>

        {/* Page header + Create button */}
        <SB>
          <Header size="page" title="Analytics" />
          <Button kind="primary" size="regular" onClick={onCreateClick}>Create</Button>
        </SB>

        {/* Main tabs */}
        <Navigation orientation="horizontal" tabs={MAIN_TABS} activeId="reports" onChange={() => {}} />

        {/* Search + filter */}
        <Row gap={12}>
          <div style={{ width: 240 }}>
            <InputSearch value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Button kind="icon" size="regular" title="Filter">
              <Icon name="filter" size={16} />
            </Button>
          </div>
        </Row>

        {/* Counter tabs */}
        <ReportCountTabs tabs={REPORT_TABS} activeId={activeTab} onChange={setActiveTab} />

        {/* Table — sits directly on page bg, Table provides own white bg */}
        <Table
          columns={reportColumns}
          rows={REPORTS}
          compact={false}
          selectable
          selectedRows={[]}
          onSelectionChange={() => {}}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => { setSortKey(key); setSortDir(dir); }}
        />

      </div>
    </AnalyticsShell>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CREATE REPORT — shared shell
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CreateReportShell({ step, bookingCount, bookingReady = false, children, actions }: {
  step: number;
  bookingCount?: number;
  bookingReady?: boolean;
  children: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="insights" />
      {/* Outer column: scrollable content + fixed actions — no overflow on this div */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Scrollable content only */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "24px 24px 0", display: "flex", flexDirection: "column" }}>

            {/* Header row */}
            <SB style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: "var(--font-family)", fontSize: 32, fontWeight: 600, color: "var(--palette-blue-0)" }}>Create new report</span>
              {bookingCount !== undefined && <BookingCountPill count={bookingCount} ready={bookingReady} />}
            </SB>

            {/* Wizard steps */}
            <div style={{ marginBottom: 24 }}>
              <Wizard steps={WIZARD_STEPS} activeIndex={step} maxReachableIndex={step} onChange={() => {}} />
            </div>

            {/* Page content */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
              {children}
            </div>

          </div>
        </div>

        {/* Sticky actions — always visible at bottom, outside the scroll */}
        {actions}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DETAILS step (step 0)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TEMPLATES = [
  { id: "blank",    title: "New Blank Report",                type: "Supply and Demand", reports: null,        selected: false },
  { id: "t1",       title: "availability preview test x1",   type: "Supply and Demand", reports: "1 report",  selected: true  },
  { id: "t2",       title: "test x15",                       type: "Supply and Demand", reports: null,        selected: false },
  { id: "t3",       title: "test audit planner template ...", type: "Supply and Demand", reports: null,        selected: false },
  { id: "t4",       title: "test template with date filte...", type: "Supply and Demand", reports: null,       selected: false },
  { id: "t5",       title: "template S&D1",                  type: "Supply and Demand", reports: null,        selected: false },
  { id: "t6",       title: "template S&D2",                  type: "Supply and Demand", reports: "1 report",  selected: false },
  { id: "t7",       title: "template S&D3",                  type: "Supply and Demand", reports: null,        selected: false },
  { id: "t8",       title: "template S&D4",                  type: "Supply and Demand", reports: null,        selected: false },
  { id: "t9",       title: "S&D monthly",                    type: "Supply and Demand", reports: "2 reports", selected: false },
  { id: "t10",      title: "Supply and demand report",       type: "Supply and Demand", reports: "2 reports", selected: false },
  { id: "t11",      title: "Report for Staging Smoke ...",   type: "Supply and Demand", reports: "2 reports", selected: false },
];

function DetailsStep() {
  const [reportType, setReportType] = useState("sd");
  const [selectedTemplate, setSelectedTemplate] = useState("t1");

  const typeOptions = [
    { id: "sd",     label: "Supply and Demand" },
    { id: "supply", label: "Supply"            },
    { id: "demand", label: "Demand"            },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Details section */}
      <Tile tileStyle="highlight" padding="content">
        <span style={h3}>Details</span>
        <div style={labelCss}>Report type</div>
        {/* ButtonGroup-style multi-select — using Button variant inline */}
        <div style={{ display: "flex" }}>
          {typeOptions.map((opt, i) => (
            <button key={opt.id} onClick={() => setReportType(opt.id)} style={{
              fontFamily: "var(--font-family)", fontSize: 14, fontWeight: reportType === opt.id ? 700 : 400,
              padding: "8px 16px", cursor: "pointer", outline: "none",
              background: reportType === opt.id ? "var(--palette-blue-1)" : "white",
              color: reportType === opt.id ? "white" : "var(--palette-blue-0)",
              border: "1px solid var(--palette-neutral-0)",
              borderLeft: i > 0 ? "none" : "1px solid var(--palette-neutral-0)",
              borderRadius: i === 0 ? "var(--radius-md) 0 0 var(--radius-md)" : i === typeOptions.length - 1 ? "0 var(--radius-md) var(--radius-md) 0" : 0,
            }}>
              {opt.label}
            </button>
          ))}
        </div>
      </Tile>

      {/* Templates gallery + preview */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

        <Tile tileStyle="highlight" padding="content" style={{ flex: 1, minWidth: 0 }}>
          <span style={h4}>Templates gallery</span>
          <div style={{ marginBottom: 12 }}>
            <InputSearch value="" onChange={() => {}} placeholder="Search" />
          </div>
          {/* 3-col grid of template cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {TEMPLATES.map(t => (
              <Tile
                key={t.id}
                tileStyle={t.id === selectedTemplate ? "dark" : "interactive"}
                padding="content"
                onClick={() => setSelectedTemplate(t.id)}
              >
                <span style={{ fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: t.id === selectedTemplate ? "white" : "var(--palette-blue-0)", lineHeight: "115%" }}>{t.title}</span>
                <span style={{ fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: t.id === selectedTemplate ? "rgba(255,255,255,0.7)" : "var(--palette-blue-2)" }}>{t.type}</span>
                {t.reports && <span style={{ fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: t.id === selectedTemplate ? "rgba(255,255,255,0.7)" : "var(--palette-blue-2)" }}>{t.reports}</span>}
              </Tile>
            ))}
          </div>
        </Tile>

        {/* Template preview sidebar */}
        <Tile tileStyle="highlight" padding="content" style={{ width: 280, flexShrink: 0 }}>
          <span style={h4}>Template preview</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <div style={bodyBold}>Profile fields</div>
              <div style={body}>Availability</div>
            </div>
            <div>
              <div style={bodyBold}>Profiles filters</div>
              <div style={body}>Profile visibility : Live, Suspended.</div>
            </div>
          </div>
        </Tile>

      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FIELDS step (step 1)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SELECTED_FIELDS = [
  { label: "Booked Hours",           group: "Booking Fields" },
  { label: "Booking Category Name",  group: "Booking Fields" },
  { label: "Booking Description",    group: "Booking Fields" },
  { label: "Date",                   group: "Date Fields"    },
];

const FIELD_CATEGORIES = [
  { id: "date",      label: "Date Fields",       selected: 1, total: 1  },
  { id: "booking",   label: "Booking Fields",     selected: 3, total: 9  },
  { id: "profiles",  label: "Profiles",           selected: 0, total: 26 },
  { id: "roles",     label: "Roles",              selected: 0, total: 12 },
  { id: "eng",       label: "Engagements",        selected: 0, total: 14 },
  { id: "auditroles",label: "Audit Roles",        selected: 0, total: 11 },
  { id: "auditeng",  label: "Audit Engagements",  selected: 0, total: 12 },
];

type FieldRow = TableRow & { field: string; type: string; unit: string; checked: boolean; timeSeries: boolean };

const BOOKING_FIELDS: FieldRow[] = [
  { id: "f1", field: "Booked Hours",         type: "Metric",    unit: "hours", checked: true,  timeSeries: false },
  { id: "f2", field: "Booking Category Id",  type: "Dimension", unit: "",      checked: false, timeSeries: false },
  { id: "f3", field: "Booking Category Name",type: "Dimension", unit: "",      checked: true,  timeSeries: true  },
  { id: "f4", field: "Booking Description",  type: "Dimension", unit: "",      checked: true,  timeSeries: true  },
  { id: "f5", field: "Booking End Date",     type: "Dimension", unit: "",      checked: false, timeSeries: false },
  { id: "f6", field: "Booking Id",           type: "Dimension", unit: "",      checked: false, timeSeries: false },
  { id: "f7", field: "Booking Notes",        type: "Dimension", unit: "",      checked: false, timeSeries: false },
];

function FieldsStep() {
  const [activeCategory, setActiveCategory] = useState("booking");
  const [frequency, setFrequency] = useState("daily");

  const freqOptions = [
    { id: "daily",   label: "Daily"   },
    { id: "weekly",  label: "Weekly"  },
    { id: "monthly", label: "Monthly" },
  ];

  // selectedRows drives the header checkbox via Table's built-in selectable logic
  const [selectedFieldIds, setSelectedFieldIds] = useState<(string | number)[]>(
    BOOKING_FIELDS.filter(f => f.checked).map(f => f.id as string)
  );

  const fieldColumns: TableColumn<FieldRow>[] = [
    { key: "field",      header: "Field",       sortable: true,  width: "200px", type: "text-regular" },
    { key: "type",       header: "Type",        sortable: false, width: "120px", type: "text-regular" },
    { key: "unit",       header: "Unit",        sortable: false, width: "80px",  type: "text-regular" },
    { key: "groupBy",    header: "Group by",    sortable: false, width: "80px",  renderCell: () => null },
    {
      key: "timeSeries",
      header: "Time series",
      sortable: false,
      width: "100px",
      renderCell: (row) => row.timeSeries
        ? <Switch checked={true} onChange={() => {}} />
        : null,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Section title */}
      <div>
        <span style={h3}>Fields</span>
        <div style={labelCss}>Report type: Supply and Demand.</div>
        <div style={{ ...body, marginTop: 8 }}>4 fields selected.</div>
      </div>

      {/* Selected fields pills */}
      <Tile tileStyle="highlight" padding="content">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SELECTED_FIELDS.map(f => (
            <div key={f.label} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--palette-neutral-1)", borderRadius: "var(--radius-md)",
              padding: "6px 12px",
            }}>
              <Icon name="split" size={14} style={{ color: "var(--palette-blue-2)" }} />
              <div>
                <div style={bodyBold}>{f.label}</div>
                <div style={labelCss}>{f.group}</div>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "var(--palette-blue-2)", display: "flex" }}>
                <Icon name="cross" size={14} />
              </button>
            </div>
          ))}
        </div>
      </Tile>

      {/* Main panel: category list + field table + time fields */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

        {/* Category list */}
        <Tile tileStyle="highlight" padding="content" style={{ width: 200, flexShrink: 0 }}>
          {FIELD_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              width: "100%", padding: "8px 0", border: "none", background: "none", cursor: "pointer",
              borderRadius: "var(--radius-md)",
            }}>
              <span style={{ fontFamily: "var(--font-family)", fontSize: 14, fontWeight: cat.id === activeCategory ? 700 : 400, color: cat.id === activeCategory ? "var(--palette-blue-0)" : "var(--palette-blue-2)", background: cat.id === activeCategory ? "var(--palette-neutral-1)" : "none", padding: "4px 8px", borderRadius: "var(--radius-md)", textAlign: "left" }}>
                {cat.label}
              </span>
              <PillSimple
                label={`${cat.selected}/${cat.total}`}
                size="small"
                bg={cat.selected > 0 ? "var(--palette-blue-1)" : "var(--palette-neutral-1)"}
                color={cat.selected > 0 ? "white" : "var(--palette-blue-2)"}
              />
            </button>
          ))}
        </Tile>

        {/* Field table */}
        <Tile tileStyle="highlight" padding="content" style={{ flex: 1, minWidth: 0 }}>
          <Table
            columns={fieldColumns}
            rows={BOOKING_FIELDS}
            compact={false}
            selectable
            selectedRows={selectedFieldIds}
            onSelectionChange={setSelectedFieldIds}
          />
        </Tile>

        {/* Time fields sidebar */}
        <Tile tileStyle="highlight" padding="content" style={{ width: 240, flexShrink: 0 }}>
          <span style={{ ...bodyBold, fontSize: 16, display: "block", marginBottom: 12 }}>Time fields</span>

          <InputSelect label="Select financial calendar" value="Default" />
          <InputSelect label="Select a period" value="Last Week" mandatory />

          <div style={labelCss}>Frequency at which fields are calculated</div>
          <div style={{ display: "flex", marginBottom: 12 }}>
            {freqOptions.map((opt, i) => (
              <button key={opt.id} onClick={() => setFrequency(opt.id)} style={{
                fontFamily: "var(--font-family)", fontSize: 14, fontWeight: frequency === opt.id ? 700 : 400,
                padding: "6px 12px", cursor: "pointer", outline: "none",
                background: frequency === opt.id ? "var(--palette-blue-1)" : "white",
                color: frequency === opt.id ? "white" : "var(--palette-blue-0)",
                border: "1px solid var(--palette-neutral-0)",
                borderLeft: i > 0 ? "none" : "1px solid var(--palette-neutral-0)",
                borderRadius: i === 0 ? "var(--radius-md) 0 0 var(--radius-md)" : i === freqOptions.length - 1 ? "0 var(--radius-md) var(--radius-md) 0" : 0,
              }}>
                {opt.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div><div style={labelCss}>Financial year</div><div style={bodyBold}>01 Jan – 31 Dec</div></div>
            <div><div style={labelCss}>First day of the week</div><div style={bodyBold}>Monday</div></div>
          </div>
        </Tile>

      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILTERS step (step 2)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function FilterDropdown({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={labelCss}>{label}</span>
      <div style={{ height: 40, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", background: "white", cursor: "pointer" }}>
        <span style={value ? body : { ...body, color: "var(--palette-blue-2)" }}>{value ?? ""}</span>
        <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)", flexShrink: 0 }} />
      </div>
    </div>
  );
}

function FiltersStep() {
  const [profilesOn, setProfilesOn] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      <div>
        <span style={h3}>Filters</span>
        <div style={labelCss}>Report type: Supply and Demand.</div>
      </div>

      {/* Green info alert */}
      <div style={{
        background: "var(--palette-green-2)", borderRadius: "var(--radius-md)",
        padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--palette-green-0)", flexShrink: 0, display: "inline-block" }} />
        <span style={body}>Report generation should not take too much time (number of bookings: 75)</span>
      </div>

      {/* Filter groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

        {/* Profiles — expanded */}
        <Tile tileStyle="highlight" padding="content">
          <Row gap={12} style={{ marginBottom: 16 }}>
            <Switch checked={profilesOn} onChange={setProfilesOn} />
            <span style={{ ...bodyBold, fontSize: 16 }}>Profiles</span>
          </Row>
          {profilesOn && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                <FilterDropdown label="Main Position" />
                <FilterDropdown label="Main position start date" />
                <FilterDropdown label="Profile visibility" value="2 selected (OR)" />
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={labelCss}>Placeholder</span>
                  <Row gap={8}>
                    <Checkbox label="Placeholder" onChange={() => {}} />
                  </Row>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                <FilterDropdown label="Skills" />
                <FilterDropdown label="Business Line" />
                <FilterDropdown label="Business Unit !!111111" />
                <FilterDropdown label="How capable am I?" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                <FilterDropdown label="Talen pool" />
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Row gap={4}>
                    <span style={labelCss}>Grade</span>
                    <Icon name="sort" size={14} style={{ color: "var(--palette-blue-2)" }} />
                  </Row>
                  <div style={{ height: 40, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", background: "white" }}>
                    <span style={{ ...body, color: "var(--palette-blue-2)" }}></span>
                    <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)" }} />
                  </div>
                </div>
                <FilterDropdown label="Language" />
              </div>
            </div>
          )}
        </Tile>

        <div style={{ height: 16 }} />

        {/* Collapsed filter groups */}
        {["Engagements", "Roles", "Audit Engagements", "Audit Roles"].map(name => (
          <div key={name} style={{ marginBottom: 16 }}>
            <Tile tileStyle="highlight" padding="content">
              <Row gap={12}>
                <Switch checked={false} onChange={() => {}} />
                <span style={{ ...bodyBold, fontSize: 16 }}>{name}</span>
              </Row>
            </Tile>
          </div>
        ))}

      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GENERATE step (step 3)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function GenerateStep() {
  const [templateName, setTemplateName] = useState("");
  const [reportName, setReportName] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      <div>
        <span style={h3}>Generate</span>
        <div style={labelCss}>Report type: Supply and Demand.</div>
      </div>

      {/* Two-column layout: left=form, right=Report Summary */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

        {/* Left column: save-as-template + report name */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Save as template accordion */}
          <Tile tileStyle="highlight" padding="content">
            <Accordion title="Would you like to save this as a template?" size="body" defaultExpanded>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
                <div style={body}>Applied fields and filters would be used to create a new template.</div>
                <div style={labelCss}>Template name</div>
                <Row gap={12}>
                  <input
                    value={templateName}
                    onChange={e => setTemplateName(e.target.value)}
                    style={{ flex: 1, height: 40, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 12px", fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-0)", outline: "none" }}
                  />
                  <Button kind="secondary" size="regular" disabled={!templateName}>Save template</Button>
                </Row>
                <div style={labelCss}>0 / 100</div>
              </div>
            </Accordion>
          </Tile>

          {/* Report name */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Row gap={4}>
              <span style={labelCss}>Name</span>
              <span style={{ color: "var(--palette-red-0)", fontSize: 12 }}>*</span>
            </Row>
            <input
              value={reportName}
              onChange={e => setReportName(e.target.value)}
              style={{ width: "100%", height: 40, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 12px", fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-0)", outline: "none" }}
            />
            <div style={labelCss}>0 / 100</div>
          </div>

        </div>

        {/* Right column: Report Summary — Tile selected content (#E7EAF8 blue-tint bg) */}
        <Tile tileStyle="selected" padding="content" style={{ width: 380, flexShrink: 0 }}>
          <span style={{ ...bodyBold, fontSize: 18, display: "block", marginBottom: 16 }}>Report Summary</span>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={bodyBold}>Type</div>
              <div style={body}>Supply &amp; Demand</div>
            </div>

            <Divider orientation="horizontal" />

            <div>
              <div style={bodyBold}>Fields</div>
              <div style={body}>
                Booking ID, Profile last name, Booking ID, Profile last name, Booking ID, Profile last name, Booking ID, Profile last name, Booking ID, Profile last name, Booking ID, Profile last name, Booking ID, Profile last name,
              </div>
            </div>

            <Divider orientation="horizontal" />

            <div>
              <div style={bodyBold}>Time fields</div>
              <div style={body}>Frequency: weekly. Period: last week.</div>
            </div>

            <Divider orientation="horizontal" />

            <div>
              <div style={bodyBold}>Filters</div>
              <div style={body}>Talent pool: Admin's pool. Grade: B.</div>
            </div>

            <Divider orientation="horizontal" />

            <div>
              <div style={bodyBold}>Schedule</div>
              <div style={{ ...body, marginBottom: 8 }}>Your schedule settings will trigger this report at the following times:</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { date: "7 Jun 2026", period: "1 Jun 2026 - 30 Jun 2026" },
                  { date: "7 Jul 2026",  period: "1 Jul 2026 - 31 Jul 2026" },
                ].map(item => (
                  <div key={item.date} style={body}>
                    <span style={{ fontWeight: 700 }}>• {item.date}</span>
                    <span style={{ fontWeight: 400 }}>, period: {item.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tile>

      </div>

    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Storybook stories
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const meta: Meta = {
  title: "Screens/Analytics",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Analytics screen — Reports table + Create Report wizard (Details, Fields, Filters, Generate). " +
          "Create Report uses Actions variant='sticky-screen' for the fixed bottom bar. " +
          "Details: ButtonGroup report-type selector + 3-col template grid (Tile interactive / Tile dark for selected). " +
          "Fields: category list + field table with checkboxes + Time fields sidebar. " +
          "Filters: Switch-toggled filter groups + 4-col dropdown grids. " +
          "Generate: save-as-template Accordion + report name + summary grid + ButtonGroup split button.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Reports: Story = {
  name: "Reports",
  render: () => <ReportsScreen onCreateClick={() => {}} />,
};

export const CreateDetails: Story = {
  name: "Create — Details",
  render: () => (
    <CreateReportShell
      step={0}
      bookingCount={28835}
      actions={
        <Actions
          variant="sticky-screen"
          leftActions={[{ label: "Cancel", variant: "secondary" }]}
          rightActions={[
            { label: "← Previous", variant: "secondary", disabled: true },
            { label: "Customize report", variant: "secondary" },
            { label: "Proceed to report generation", variant: "primary" },
          ]}
        />
      }
    >
      <DetailsStep />
    </CreateReportShell>
  ),
};

export const CreateFields: Story = {
  name: "Create — Fields",
  render: () => (
    <CreateReportShell
      step={1}
      actions={
        <Actions
          variant="sticky-screen"
          leftActions={[{ label: "Cancel", variant: "secondary" }]}
          rightActions={[
            { label: "← Previous", variant: "secondary" },
            { label: "Next →", variant: "primary" },
          ]}
        />
      }
    >
      <FieldsStep />
    </CreateReportShell>
  ),
};

export const CreateFilters: Story = {
  name: "Create — Filters",
  render: () => (
    <CreateReportShell
      step={2}
      bookingCount={75}
      bookingReady
      actions={
        <Actions
          variant="sticky-screen"
          leftActions={[{ label: "Cancel", variant: "secondary" }]}
          rightActions={[
            { label: "← Previous", variant: "secondary" },
            { label: "Next →", variant: "primary" },
          ]}
        />
      }
    >
      <FiltersStep />
    </CreateReportShell>
  ),
};

export const CreateGenerate: Story = {
  name: "Create — Generate",
  render: () => (
    <CreateReportShell
      step={3}
      bookingCount={75}
      bookingReady
      actions={
        // Generate uses a custom right side: Previous (secondary) + ButtonGroup split button (primary)
        <div style={{ position: "sticky", bottom: 0, zIndex: 100, width: "100%", background: "white", borderTop: "1px solid var(--palette-neutral-0)", boxShadow: "0 -8px 20px 4px rgba(207,218,247,0.85)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 24px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button kind="secondary" size="regular">Cancel</Button>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <Button kind="secondary" size="regular">← Previous</Button>
              <ButtonGroup variant="primary" label="Generate report (.xlsx)" fill />
            </div>
          </div>
        </div>
      }
    >
      <GenerateStep />
    </CreateReportShell>
  ),
};
