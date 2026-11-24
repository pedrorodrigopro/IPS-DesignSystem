// Booking Engine — table properties: which fields of engagements, roles and profiles the left table shows.
//
// Every field has one of three states (set in the Table properties side panel): hidden, inline or table.
//   table  → a column right of the title (150px), header named after the view's root row type
//   inline → one extra line under the row's sub-line, values joined with " · ", hover shows "Label: value"
//   hidden → not shown
// The config is per row type (engagement / role / profile): a row type picks its own fields, rows of different types
// fill the columns by position.

import React, { useEffect, useRef } from "react";

import type { BEColumn, BETab } from "../../components/side_panel/table_properties_side_panel";
import { Button }  from "../../components/button/button";
import { Icon }    from "../../components/icon/icon";
import { Tooltip } from "../../components/tooltip/tooltip";

// ── Layout constants ──────────────────────────────────────────────────────────

export const ROW_H = 60;
export const INLINE_LINE_H = 16;
export const COL_W = 150;
export const TITLE_MIN = 260;
export const MENU_W = 44;
export const MAX_AUTO_LEFT = 760;

export const rowHeight = (inlineCount: number) => ROW_H + (inlineCount > 0 ? INLINE_LINE_H : 0);

const labelCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%" };

// ── Types and catalog ─────────────────────────────────────────────────────────

export type RowKind = "engagement" | "role" | "profile";
export type FieldValue = { id: string; label: string; value: string };

type FieldDef = { id: string; label: string };

export const FIELD_CATALOG: Record<RowKind, FieldDef[]> = {
  engagement: [
    { id: "status",         label: "Status" },
    { id: "postUntil",      label: "Resourcing completed by" },
    { id: "assignee",       label: "Assignee" },
    { id: "due",            label: "Due in days" },
    { id: "startDate",      label: "Start date" },
    { id: "endDate",        label: "End date" },
    { id: "duration",       label: "Duration" },
    { id: "createdAt",      label: "Date created" },
    { id: "principalOwner", label: "Principal owner" },
  ],
  role: [
    { id: "id",             label: "ID" },
    { id: "status",         label: "Status" },
    { id: "postUntil",      label: "Expiry date" },
    { id: "assignee",       label: "Assignee" },
    { id: "due",            label: "Due in days" },
    { id: "createdAt",      label: "Date created" },
    { id: "startDate",      label: "Start date" },
    { id: "principalOwner", label: "Principal owner" },
    { id: "engagement",     label: "Engagement" },
    { id: "resource",       label: "Resource" },
  ],
  // From the profile screen (Organisation Data and side panel)
  profile: [
    { id: "jobTitle",     label: "Job title" },
    { id: "grade",        label: "Grade" },
    { id: "skills",       label: "Skills" },
    { id: "location",     label: "Location" },
    { id: "department",   label: "Department" },
    { id: "businessUnit", label: "Business unit" },
    { id: "talentPool",   label: "Talent pool" },
    { id: "dayRate",      label: "Day rate" },
    { id: "startingDate", label: "Starting date" },
    { id: "languages",    label: "Languages" },
    { id: "reportsTo",    label: "Reports to" },
  ],
};

/** The locked first field of each tab (the row's title: always in the table) */
export const TITLE_LABEL: Record<RowKind, string> = {
  engagement: "Engagement title",
  role: "Role title",
  profile: "Profile name",
};

const TAB_LABEL: Record<RowKind, string> = { engagement: "Engagements", role: "Roles", profile: "Profile" };
const TAB_ORDER: RowKind[] = ["engagement", "role", "profile"];
const TITLE_ID = "__title";

/** Ordered field ids per row type; every other field is hidden */
export type TableFieldsConfig = Record<RowKind, { table: string[]; inline: string[] }>;

export const NO_TABLE_FIELDS: TableFieldsConfig = {
  engagement: { table: [], inline: [] },
  role:       { table: [], inline: [] },
  profile:    { table: [], inline: [] },
};

// ── Config ↔ side panel tabs ──────────────────────────────────────────────────

export function configToTabs(cfg: TableFieldsConfig): BETab[] {
  return TAB_ORDER.map(kind => {
    const defs = FIELD_CATALOG[kind];
    const label = (id: string) => defs.find(d => d.id === id)?.label ?? id;
    const { table, inline } = cfg[kind];
    const used = new Set([...table, ...inline]);
    const columns: BEColumn[] = [
      { id: TITLE_ID, label: TITLE_LABEL[kind], section: "table", state: "table", locked: true },
      ...table.map(id => ({ id, label: label(id), section: "table" as const, state: "table" as const })),
      ...inline.map(id => ({ id, label: label(id), section: "inline" as const, state: "list" as const })),
      ...defs.filter(d => !used.has(d.id)).map(d => ({ id: d.id, label: d.label, section: "hidden" as const, state: "hidden" as const })),
    ];
    return { id: kind, label: TAB_LABEL[kind], columns };
  });
}

export function tabsToConfig(tabs: BETab[]): TableFieldsConfig {
  const cfg: TableFieldsConfig = { engagement: { table: [], inline: [] }, role: { table: [], inline: [] }, profile: { table: [], inline: [] } };
  tabs.forEach(tab => {
    const kind = tab.id as RowKind;
    if (!cfg[kind]) return;
    cfg[kind] = {
      table:  tab.columns.filter(c => c.section === "table"  && c.id !== TITLE_ID).map(c => c.id),
      inline: tab.columns.filter(c => c.section === "inline").map(c => c.id),
    };
  });
  return cfg;
}

export const hasTableColumns = (cfg: TableFieldsConfig) => TAB_ORDER.some(k => cfg[k].table.length > 0);
export const columnCount = (cfg: TableFieldsConfig) => Math.max(0, ...TAB_ORDER.map(k => cfg[k].table.length));
export const tableWidth = (cfg: TableFieldsConfig) => TITLE_MIN + columnCount(cfg) * COL_W + MENU_W;

// ── Sample values ─────────────────────────────────────────────────────────────
// Entries can bring their own `fields`; whatever is missing gets a deterministic sample value (the same row always shows the same).

function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}
const pick = <T,>(list: T[], seed: string): T => list[hash(seed) % list.length];

const pad = (n: number) => String(n).padStart(2, "0");
const fmtDate = (d: Date) => `${pad(d.getUTCDate())}-${pad(d.getUTCMonth() + 1)}-${d.getUTCFullYear()}`;
function sampleDate(seed: string, fromYear: number, years: number): Date {
  const h = hash(seed);
  return new Date(Date.UTC(fromYear + (h % years), (h >> 3) % 12, 1 + ((h >> 7) % 28)));
}
function parseDate(s: string): Date | null {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(s);
  return m ? new Date(Date.UTC(+m[3], +m[2] - 1, +m[1])) : null;
}

const PEOPLE = ["Gerard Chaudhari", "Maria Okafor", "Tomas Weber", "Ines Duarte", "Kwame Mensah", "Aiko Sato", "Sara Lindgren"];
const JOB_TITLES = ["Engagement Manager", "Senior Consultant", "Business Analyst", "Solution Architect", "Project Coordinator", "QA Engineer", "Data Analyst", "Tech Lead"];
const GRADES = ["Analyst", "Consultant", "Senior Consultant", "Manager", "Senior Manager", "Director", "Partner"];
const SKILLS = ["Agile", "Project management", "Stakeholder management", "Data analysis", "SAP", "Change management", "Risk", "Cloud", "Python"];
const LOCATIONS = ["London, UK", "Dubai, UAE", "Bangalore, India", "Madrid, Spain", "New York, USA", "Warsaw, Poland"];
const DEPARTMENTS = ["Operations", "Advisory", "Technology", "Finance", "Delivery"];
const BUSINESS_UNITS = ["Consulting", "Assurance", "Strategy", "Technology"];
const TALENT_POOLS = ["Manager's pool", "Delivery pool", "Strategy pool", "Bench"];
const LANGUAGES = ["English", "English, French", "English, Spanish", "English, Arabic", "English, German"];

export function sampleProfile(name: string): Record<string, string> {
  const skills = [0, 1, 2].map(i => SKILLS[(hash(name) + i * 3) % SKILLS.length]);
  return {
    jobTitle: pick(JOB_TITLES, name + "jt"),
    grade: pick(GRADES, name + "gr"),
    skills: Array.from(new Set(skills)).join(", "),
    location: pick(LOCATIONS, name + "lo"),
    department: pick(DEPARTMENTS, name + "de"),
    businessUnit: pick(BUSINESS_UNITS, name + "bu"),
    talentPool: pick(TALENT_POOLS, name + "tp"),
    dayRate: String(300 + (hash(name + "dr") % 12) * 50),
    startingDate: fmtDate(sampleDate(name + "sd", 2012, 12)),
    languages: pick(LANGUAGES, name + "la"),
    reportsTo: pick(PEOPLE, name + "rt"),
  };
}

type EngagementSource = { id: string; name: string; state: string; resourcingBy: string; assignee: string; dueDays: string; startDate: string; fields?: Record<string, string> };
type RoleSource = { id: string; name: string; state?: string; roleId?: string; expiry?: string; assignee?: string; dueDays?: string; engagement?: string; resource?: string; fields?: Record<string, string> };
type ProfileSource = { name: string; department?: string; fields?: Record<string, string> };

export function engagementValues(e: EngagementSource): Record<string, string> {
  const start = parseDate(e.startDate);
  const days = 30 + (hash(e.id + "len") % 170);
  const end = start ? new Date(start.getTime() + days * 86400000) : null;
  return {
    status: e.state, postUntil: e.resourcingBy, assignee: e.assignee, due: e.dueDays, startDate: e.startDate,
    endDate: end ? fmtDate(end) : "-",
    duration: start ? `${days} days` : "-",
    createdAt: fmtDate(sampleDate(e.id + "cr", 2025, 2)),
    principalOwner: pick(PEOPLE, e.id + "po"),
    ...e.fields,
  };
}

export function roleValues(r: RoleSource): Record<string, string> {
  return {
    id: r.roleId ?? "-", status: r.state ?? "-", postUntil: r.expiry ?? "-", assignee: r.assignee ?? "-", due: r.dueDays ?? "-",
    createdAt: fmtDate(sampleDate(r.id + "cr", 2025, 2)),
    startDate: fmtDate(sampleDate(r.id + "st", 2026, 2)),
    principalOwner: pick(PEOPLE, r.id + "po"),
    engagement: r.engagement || "-",
    resource: r.resource || "-",
    ...r.fields,
  };
}

export function profileValues(p: ProfileSource): Record<string, string> {
  return { ...sampleProfile(p.name), ...(p.department ? { department: p.department } : {}), ...p.fields };
}

/** The row's table and inline values, in the order set in the panel */
export function pickFields(kind: RowKind, values: Record<string, string>, cfg: TableFieldsConfig): { table: FieldValue[]; inline: FieldValue[] } {
  const defs = FIELD_CATALOG[kind];
  const toValue = (id: string): FieldValue => ({ id, label: defs.find(d => d.id === id)?.label ?? id, value: values[id] || "-" });
  return { table: cfg[kind].table.map(toValue), inline: cfg[kind].inline.map(toValue) };
}

// ── Components ────────────────────────────────────────────────────────────────

/** The inline line under a row's sub-line: values joined with " · "; hovering one shows "Label: value" */
export function InlineLine({ items }: { items: FieldValue[] }) {
  if (items.length === 0) return null;
  return (
    <div data-inline-fields style={{ ...labelCss, display: "flex", flexWrap: "nowrap", alignItems: "center", whiteSpace: "nowrap", overflow: "hidden", height: INLINE_LINE_H, lineHeight: `${INLINE_LINE_H}px` }}>
      {items.map((it, i) => (
        <React.Fragment key={it.id}>
          {i > 0 && <span style={{ margin: "0 4px", flexShrink: 0 }}>·</span>}
          <Tooltip content={`${it.label}: ${it.value}`} placement="up-left" portal>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", cursor: "default" }}>{it.value}</span>
          </Tooltip>
        </React.Fragment>
      ))}
    </div>
  );
}

export type LeftRowData = {
  key: string;
  kind: RowKind;
  leftContent: React.ReactNode;
  bg?: string;
  indent?: number;
  height: number;
  /** Values of the row's table fields (the row type's own selection) */
  table: FieldValue[];
  /** The row has a menu (⋮) */
  hasMenu?: boolean;
};

export type TableLayout = {
  cfg: TableFieldsConfig;
  /** Header names of the table columns (the view's root row type) */
  headers: string[];
  titleLabel: string;
  /** The view's root row type: rows of any other type are nested levels, which show each field's label under its value */
  rootKind: RowKind;
  /** Left panel scrolled sideways by this much (the header follows) */
  scrollX: number;
  onScrollX: (x: number) => void;
  onOpenProperties: () => void;
};

// label-unselected text token: 12px / 400 / 115%, blue-2
const nestedLabelCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "115%", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis" };

const cellText: Record<RowKind, React.CSSProperties> = {
  engagement: { fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-0)", lineHeight: "115%" },
  role:       { fontFamily: "var(--font-family)", fontSize: 13, color: "var(--palette-blue-0)", lineHeight: "115%" },
  profile:    { fontFamily: "var(--font-family)", fontSize: 12, color: "var(--palette-blue-0)", lineHeight: "115%" },
};

/** The row's menu: its own container at the end of the row, sticky while the columns scroll sideways */
function MenuCell({ bg, shadow, children }: { bg: string; shadow: boolean; children?: React.ReactNode }) {
  return (
    <div
      data-row-menu
      style={{
        position: "sticky", right: 0, zIndex: 2, width: MENU_W, flexShrink: 0, boxSizing: "border-box",
        display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 6,
        background: bg, boxShadow: shadow ? "-8px 0 8px -4px rgba(27,72,195,0.18)" : undefined,
      }}
    >
      {children}
    </div>
  );
}

/** One row of the left table: title cell | table columns | sticky menu */
export function LeftRow({ row, leftWidth, tbl }: { row: LeftRowData; leftWidth: number; tbl: TableLayout }) {
  const cols = columnCount(tbl.cfg);
  const width = Math.max(leftWidth, tableWidth(tbl.cfg));
  const bg = row.bg ?? "white";
  return (
    <div style={{ display: "flex", width, height: row.height, boxSizing: "border-box", borderBottom: "1px solid var(--palette-neutral-0)", background: bg }}>
      <div style={{ flex: 1, minWidth: TITLE_MIN - MENU_W, display: "flex", alignItems: "flex-start", paddingLeft: row.indent ?? 4, paddingRight: 8, overflow: "hidden" }}>
        {row.leftContent}
      </div>
      {Array.from({ length: cols }).map((_, i) => {
        const v = row.table[i];
        return (
          <div
            key={i}
            data-table-cell
            title={v ? `${v.label}: ${v.value}` : undefined}
            style={{ width: COL_W, flexShrink: 0, boxSizing: "border-box", borderLeft: "1px solid var(--palette-neutral-0)", padding: "8px 8px 0", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", ...cellText[row.kind] }}
          >
            {v?.value}
            {/* Nested levels: the field's label right below the value (label-unselected, blue-2) */}
            {v && row.kind !== tbl.rootKind && <div style={nestedLabelCss}>{v.label}</div>}
          </div>
        );
      })}
      <MenuCell bg={bg} shadow={cols > 0}>
        {row.hasMenu && (
          <button aria-label="Row menu" style={{ width: 24, height: 24, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)", flexShrink: 0 }}>
            <Icon name="menu-vertical" size={14} />
          </button>
        )}
      </MenuCell>
    </div>
  );
}

/**
 * The left column of the calendar body: the rows, sideways scroll without scrollbar (trackpad / shift+wheel) when the table is wider than the panel.
 * `style` lets the Gantt keep its sticky column.
 */
export function LeftBody({ rows, leftWidth, tbl, style }: { rows: LeftRowData[]; leftWidth: number; tbl: TableLayout; style?: React.CSSProperties }) {
  return (
    <div
      data-left-body
      onScroll={e => tbl.onScrollX((e.target as HTMLDivElement).scrollLeft)}
      style={{ width: leftWidth, flexShrink: 0, alignSelf: "flex-start", overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none", ...style }}
    >
      {rows.map(row => <LeftRow key={row.key} row={row} leftWidth={leftWidth} tbl={tbl} />)}
    </div>
  );
}

// body-unselected text token: 14px / 400 / 115%, blue-0
const titleCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "115%" };

/** Height of the column-titles row under the sort row (the day row of the calendar header next to it) */
export const TITLES_H = 28;
/** Height of the calendar / table header without table columns */
export const HEADER_H = 60;

/**
 * Header of the left table, in every Booking Engine variant:
 *   row 1: the sort select + the counter, and the table-properties button at the end;
 *   row 2 (only with table columns): the column names (the title + the view's root row type fields), scrolling with the rows.
 */
export function LeftHeader({
  leftWidth, tbl, sort, count,
}: {
  leftWidth: number;
  tbl: TableLayout;
  sort: React.ReactNode;
  count: string;
}) {
  // The titles follow the body's sideways scroll (a real scroll, so the sticky end cell keeps working)
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scroller.current) scroller.current.scrollLeft = tbl.scrollX; }, [tbl.scrollX]);

  const cols = columnCount(tbl.cfg);
  const width = Math.max(leftWidth, tableWidth(tbl.cfg));
  return (
    <div data-left-header style={{ width: leftWidth, flexShrink: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, minHeight: 40, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "0 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
          <span style={{ display: "inline-block", width: "max-content" }}>{sort}</span>
          <span style={{ ...labelCss, whiteSpace: "nowrap", flexShrink: 0 }}>{count}</span>
        </div>
        <Button kind="icon" size="regular" title="Table properties" onClick={tbl.onOpenProperties}><Icon name="table" size={16} /></Button>
      </div>
      {hasTableColumns(tbl.cfg) && (
        <div ref={scroller} data-left-titles style={{ height: TITLES_H, flexShrink: 0, overflow: "hidden", display: "flex", borderTop: "1px solid var(--palette-neutral-0)", boxSizing: "border-box" }}>
          <div style={{ display: "flex", width, flexShrink: 0 }}>
            <div style={{ flex: 1, minWidth: TITLE_MIN - MENU_W, display: "flex", alignItems: "center", padding: "0 8px", ...titleCss, whiteSpace: "nowrap" }}>{tbl.titleLabel}</div>
            {Array.from({ length: cols }).map((_, i) => (
              <div key={i} style={{ width: COL_W, flexShrink: 0, boxSizing: "border-box", borderLeft: "1px solid var(--palette-neutral-0)", padding: "0 8px", display: "flex", alignItems: "center", ...titleCss, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {tbl.headers[i] ?? ""}
              </div>
            ))}
            <div style={{ position: "sticky", right: 0, zIndex: 2, width: MENU_W, flexShrink: 0, background: "white", boxShadow: "-8px 0 8px -4px rgba(27,72,195,0.18)" }} />
          </div>
        </div>
      )}
    </div>
  );
}
