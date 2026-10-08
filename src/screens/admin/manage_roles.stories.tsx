// Screens/Admin — Manage Roles (Edit Project Team Template)
//
// Container mapping (RULE 2b):
//   Page bg: white (form/edit screen — not neutral-2)
//   Groups: Accordion header + flat inline table on white (no Tile wrapper)
//   Bottom: Actions variant="sticky-screen" — Cancel left | Save right
//
// Editable table cells per column:
//   Title, Description: plain text Input
//   # Vacancies: number Input
//   Assignee: InputSelect
//   Booking Category: BookingPill (coloured) + filter icon + chevron
//   Skills frameworks, Skills, Languages: "No X added" + "Add" link
//   Business Unit, Priority, Label, Location: InputSelect / Input
//   Switch columns: Switch component
//   Row actions: check icon (sticky) + menu-vertical

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Navbar }    from "../../components/navbar/navbar";
import { Icon }      from "../../components/icon/icon";
import { Button }    from "../../components/button/button";
import { Input, InputSelect } from "../../components/input/input";
import { Switch }    from "../../components/switch/switch";
import { Actions }   from "../../components/actions/actions";
import { BookingPill } from "../../components/booking_pill/booking_pill";
import { Tile }       from "../../components/tile/tile";
import { Divider }    from "../../components/divider/divider";

// ── Typography helpers ────────────────────────────────────────────────────────

const bodyBold: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%" };
const body:     React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%" };
const labelCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%" };
const linkCss:  React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 700, color: "var(--palette-primary-0)", lineHeight: "150%", cursor: "pointer", background: "none", border: "none", padding: 0 };
const muted:    React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%" };

function Row({ children, gap = 8, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", alignItems: "center", gap, ...style }}>{children}</div>;
}
function SB({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...style }}>{children}</div>;
}

// ── Mandatory label ───────────────────────────────────────────────────────────

function MandatoryHeader({ label }: { label: string }) {
  return (
    <Row gap={2}>
      <span style={labelCss}>{label}</span>
      <span style={{ color: "var(--palette-red-0)", fontSize: 12 }}>*</span>
    </Row>
  );
}

// ── "No X added / Add" multi-value cell ──────────────────────────────────────

function MultiValueCell({ emptyLabel }: { emptyLabel: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={muted}>{emptyLabel}</span>
      <button style={{ ...linkCss }}>Add</button>
    </div>
  );
}

// ── Editable text cell ────────────────────────────────────────────────────────

function EditableTextCell({ defaultValue = "" }: { defaultValue?: string }) {
  const [val, setVal] = useState(defaultValue);
  return (
    <input
      value={val}
      onChange={e => setVal(e.target.value)}
      style={{ width: "100%", height: 32, border: "none", borderBottom: "1px solid transparent", background: "transparent", fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", outline: "none", padding: "0 4px", borderRadius: 0 }}
      onFocus={e => e.target.style.borderBottomColor = "var(--palette-primary-0)"}
      onBlur={e => e.target.style.borderBottomColor = "transparent"}
    />
  );
}

// ── Editable number cell ──────────────────────────────────────────────────────

function EditableNumberCell({ defaultValue = 1 }: { defaultValue?: number }) {
  const [val, setVal] = useState(defaultValue.toString());
  return (
    <input
      type="number"
      value={val}
      onChange={e => setVal(e.target.value)}
      style={{ width: "100%", height: 32, border: "none", borderBottom: "1px solid transparent", background: "transparent", fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", outline: "none", padding: "0 4px", borderRadius: 0 }}
      onFocus={e => e.target.style.borderBottomColor = "var(--palette-primary-0)"}
      onBlur={e => e.target.style.borderBottomColor = "transparent"}
    />
  );
}

// ── Inline select cell ────────────────────────────────────────────────────────

function InlineSelectCell({ value, placeholder }: { value?: string; placeholder?: string }) {
  return (
    // flex + flex:1 on text pushes chevron to the right end of the cell
    <div style={{ display: "flex", alignItems: "center", cursor: "pointer", padding: "0 4px", height: 32, width: "100%" }}>
      <span style={{ ...(value ? { ...body, fontWeight: 700 } : muted), flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {value ?? placeholder ?? ""}
      </span>
      <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)", flexShrink: 0, marginLeft: 4 }} />
    </div>
  );
}

// ── Booking category cell ─────────────────────────────────────────────────────

function BookingCategoryCell({ label, category }: { label: string; category: "booking-blue" | "booking-red" | "booking-purple" | "booking-green" }) {
  // Map to BookingPill categories
  const catMap: Record<string, import("../../components/booking_pill/booking_pill").BookingPillCategory> = {
    "booking-blue":   "booking-blue",
    "booking-red":    "booking-red",
    "booking-purple": "booking-purple",
    "booking-green":  "role-booked", // use teal for "green"
  };
  return (
    // Icons pinned to top-right; pill fills left side
    <div style={{ position: "relative", width: "100%", paddingRight: 36 }}>
      <div style={{ maxWidth: "100%" }}>
        <BookingPill category={catMap[category] ?? "booking-blue"} label={label} size="small" />
      </div>
      {/* Icons top-right */}
      <div style={{ position: "absolute", top: 0, right: 0, display: "flex", alignItems: "center", gap: 2 }}>
        <Icon name="filter-clean" size={14} style={{ color: "var(--palette-blue-2)" }} />
        <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)" }} />
      </div>
    </div>
  );
}

// ── Table header row ──────────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: "8px 8px", textAlign: "left",
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)",
  borderBottom: "1px solid var(--palette-neutral-0)",
  borderRight: "1px solid var(--palette-neutral-0)",
  whiteSpace: "nowrap",
  background: "white",
};
const tdStyle: React.CSSProperties = {
  padding: "4px 8px", verticalAlign: "middle",
  borderBottom: "1px solid var(--palette-neutral-0)",
  borderRight: "1px solid var(--palette-neutral-0)",
};

// ── Role row data ─────────────────────────────────────────────────────────────

type RoleRow = {
  id: string;
  title: string;
  description: string;
  vacancies: number;
  assignee?: string;
  bookingCategory?: { label: string; category: "booking-blue" | "booking-red" | "booking-purple" | "booking-green" };
  businessUnit?: string;
  priority?: string;
  label?: string;
  location?: string;
};

// ── Group table ───────────────────────────────────────────────────────────────

// rowActions variants:
//   "dtt"   — edit pencil in neutral-1 pill + menu-vertical
//   "roles" — green tick in green pill (no edit icon)
type RowActionsVariant = "dtt" | "roles";

function StickyActions({ variant = "dtt" }: { variant?: RowActionsVariant }) {
  if (variant === "roles") {
    return (
      <Row gap={4}>
        {/* Green tick pill */}
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 20, borderRadius: 16, background: "var(--palette-green-2)" }}>
          <Icon name="check" size={14} style={{ color: "var(--palette-green-0)" }} />
        </div>
        <button style={{ width: 24, height: 24, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)" }}>
          <Icon name="menu-vertical" size={14} />
        </button>
      </Row>
    );
  }
  // dtt — pencil in neutral-1 pill
  return (
    <Row gap={4}>
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 20, borderRadius: 16, background: "var(--palette-neutral-1)" }}>
        <Icon name="edit" size={14} style={{ color: "var(--palette-blue-0)" }} />
      </div>
      <button style={{ width: 24, height: 24, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)" }}>
        <Icon name="menu-vertical" size={14} />
      </button>
    </Row>
  );
}

function RolesTable({ roles, showExtraColumns = false, rowActions = "dtt" }: { roles: RoleRow[]; showExtraColumns?: boolean; rowActions?: RowActionsVariant }) {
  const headers = [
    { label: "Title",              mandatory: true,  width: 120 },
    { label: "Description",        mandatory: true,  width: 180 },
    { label: "# Vacancies",        mandatory: true,  width: 90  },
    { label: "Assignee",           mandatory: false, width: 110 },
    { label: "Booking Category",   mandatory: false, width: 200 },
    { label: "Skills frameworks",  mandatory: false, width: 140 },
    { label: "Skills",             mandatory: false, width: 130 },
    { label: "Languages",          mandatory: false, width: 130 },
    ...(showExtraColumns ? [
      { label: "smoke-santi",      mandatory: false, width: 80  },
    ] : []),
    { label: "Business Unit",      mandatory: true,  width: 130 },
    { label: "Priority",           mandatory: false, width: 90  },
    { label: "Label",              mandatory: true,  width: 90  },
    { label: "Location",           mandatory: true,  width: 160 },
    { label: "Clients",            mandatory: false, width: 100 },
    { label: "",                   mandatory: false, width: 64, sticky: true },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", minWidth: 1200 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ ...thStyle, width: h.width, position: h.sticky ? "sticky" : "sticky", right: h.sticky ? 0 : undefined, zIndex: h.sticky ? 2 : 1 }}>
                {h.mandatory ? <MandatoryHeader label={h.label} /> : <span style={labelCss}>{h.label}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id} style={{ background: "white" }}>
              <td style={tdStyle}><EditableTextCell defaultValue={role.title} /></td>
              <td style={tdStyle}><EditableTextCell defaultValue={role.description} /></td>
              <td style={tdStyle}><EditableNumberCell defaultValue={role.vacancies} /></td>
              <td style={tdStyle}><InlineSelectCell placeholder="" value={role.assignee} /></td>
              <td style={tdStyle}>
                {role.bookingCategory
                  ? <BookingCategoryCell {...role.bookingCategory} />
                  : <InlineSelectCell placeholder="" />}
              </td>
              <td style={tdStyle}><MultiValueCell emptyLabel="No Skills Framework added" /></td>
              <td style={tdStyle}><MultiValueCell emptyLabel="No custom values added" /></td>
              <td style={tdStyle}><MultiValueCell emptyLabel="No custom values added" /></td>
              {showExtraColumns && (
                <td style={tdStyle}>
                  <Switch checked={false} onChange={() => {}} />
                </td>
              )}
              <td style={tdStyle}>
                <InlineSelectCell value="Executive" />
              </td>
              <td style={tdStyle}><InlineSelectCell placeholder="" value={role.priority} /></td>
              <td style={tdStyle}><EditableTextCell defaultValue={role.label ?? "label"} /></td>
              <td style={tdStyle}>
                <Row gap={4}>
                  <EditableTextCell defaultValue={role.location ?? ""} />
                  <Icon name="filter-clean" size={14} style={{ color: "var(--palette-blue-2)" }} />
                  <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)" }} />
                </Row>
              </td>
              <td style={tdStyle}><span style={muted}>-</span></td>
              {/* Sticky actions — filter:drop-shadow works on <td>, box-shadow does not */}
              <td style={{ ...tdStyle, position: "sticky", right: 0, background: "white", zIndex: 1, borderRight: "none", filter: "drop-shadow(-4px 0 6px rgba(203,218,247,0.85))" }}>
                <StickyActions variant={rowActions} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Accordion group ───────────────────────────────────────────────────────────

function RoleGroup({ name, roles, showExtraColumns = false, rowActions = "dtt" }: { name: string; roles: RoleRow[]; showExtraColumns?: boolean; rowActions?: RowActionsVariant }) {
  const [expanded, setExpanded] = useState(true);

  return (
    // The Tile wraps BOTH the accordion header and the table — header is the container top
    <Tile tileStyle="highlight" padding="panel" style={{ padding: 0, overflow: "hidden", marginBottom: 24 }}>
      {/* Accordion header — inside the white container */}
      <SB style={{
        padding: "12px 16px",
        background: "white",
      }}>
        <button
          onClick={() => setExpanded(v => !v)}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <Icon name={expanded ? "chevron-down" : "chevron-right"} size={16} style={{ color: "var(--palette-blue-2)" }} />
          <span style={bodyBold}>{name}</span>
        </button>
        <button style={{ width: 28, height: 28, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)" }}>
          <Icon name="add" size={16} />
        </button>
      </SB>

      {/* Roles table — no extra wrapper, sits directly inside the Tile */}
      {expanded && <RolesTable roles={roles} showExtraColumns={showExtraColumns} rowActions={rowActions} />}
    </Tile>
  );
}

// ── Screen data ───────────────────────────────────────────────────────────────

const GPS_ROLES: RoleRow[] = [
  {
    id: "r1", title: "Role 1", description: "Role 1", vacancies: 1, assignee: "",
    bookingCategory: { label: "Holiday", category: "booking-blue" },
    businessUnit: "Executive", label: "label", location: "Quận Hoàn Kiếm, VNM",
  },
  {
    id: "r2", title: "Role 2", description: "Role 2", vacancies: 1, assignee: "",
    bookingCategory: { label: "Confirmed External Customer Project", category: "booking-red" },
    businessUnit: "Executive", label: "label", location: ", USA",
  },
];

const NO_REQ_ROLES: RoleRow[] = [
  {
    id: "r3", title: "x", description: "x", vacancies: 1, assignee: "",
    businessUnit: "Executive", label: "", location: "",
  },
  {
    id: "r4", title: "x", description: "x", vacancies: 1, assignee: "",
    businessUnit: "Executive", label: "", location: "",
  },
];

// ── Screen ────────────────────────────────────────────────────────────────────

// ── Add role button with group dropdown ───────────────────────────────────────

// AddRoleButton — "Add role" button always; dropdown says "Select a subtemplate"
function AddRoleButton({ groups }: { groups: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          height: 32, padding: "0 12px",
          border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)",
          background: "white", fontFamily: "var(--font-family)", fontSize: 14,
          fontWeight: 700, color: "var(--palette-blue-0)", cursor: "pointer", outline: "none",
        }}
      >
        Add role
        <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)" }} />
      </button>

      {/* Subtemplate selection dropdown */}
      {open && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 200,
            background: "white", borderRadius: "var(--radius-md)",
            boxShadow: "0 6px 16px rgba(27,72,195,0.15)",
            border: "1px solid var(--palette-neutral-0)",
            minWidth: 220, padding: "8px 0",
          }}
          onMouseLeave={() => setOpen(false)}
        >
          <div style={{ padding: "4px 16px 8px", ...labelCss }}>Select a subtemplate</div>
          {groups.map(group => (
            <button
              key={group}
              onClick={() => setOpen(false)}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                padding: "8px 16px", border: "none", background: "none",
                cursor: "pointer", textAlign: "left", outline: "none",
                fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
                color: "var(--palette-blue-0)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--palette-trans-0)")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}
            >
              {group}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type ManageRolesVariant = "dtt" | "engagement";

function ManageRolesScreen({ screenVariant = "dtt" }: { screenVariant?: ManageRolesVariant }) {
  const isDtt = screenVariant === "dtt";

  // Variant-specific config
  const pageTitle    = "Manage roles";
  const nameLabel    = isDtt ? "Demand Team Template" : "Engagement";
  const nameValue    = isDtt ? "Booking Categories at Template Level - Test" : "ST engagement test";
  const rightAction  = isDtt ? "Save" : "Fill & Book";
  const rowActions: RowActionsVariant = isDtt ? "dtt" : "roles";

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="admin" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Scrollable content */}
        {/* Scrollable area — flex column so Tile can stretch to fill */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px 0", background: "var(--palette-neutral-2)", display: "flex", flexDirection: "column" }}>

          {/* Page title — outside the white container */}
          <h1 style={{ fontFamily: "var(--font-family)", fontSize: 28, fontWeight: 700, color: "var(--palette-blue-0)", marginBottom: 8, lineHeight: "125%", flexShrink: 0 }}>
            {pageTitle}
          </h1>

          {/* White container — flex:1 so it fills all remaining scroll height */}
          <Tile tileStyle="highlight" padding="content" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, marginBottom: 0 }}>

            {/* Read-only name field + Add role button — same row */}
            <SB style={{ marginBottom: 16, flexShrink: 0 }}>
              <div>
                {/* Name label in primary text colour */}
                <div style={{ ...labelCss, color: "var(--palette-blue-0)" }}>{nameLabel}</div>
                <div style={bodyBold}>{nameValue}</div>
              </div>
              <AddRoleButton groups={["GPS Role", "No Requirements :)"]} />
            </SB>

            {/* Divider respects content padding — natural width, no bleed */}
            <Divider orientation="horizontal" style={{ flexShrink: 0 }} />

            {/* Roles counter */}
            <div style={{ ...labelCss, margin: "12px 0 16px", flexShrink: 0 }}>4 roles</div>

            {/* Accordion groups */}
            <RoleGroup name="GPS Role" roles={GPS_ROLES} rowActions={rowActions} />
            <RoleGroup name="No Requirements :)" roles={NO_REQ_ROLES} showExtraColumns rowActions={rowActions} />

            {/* Flex spacer pushes content up, ensures container fills height */}
            <div style={{ flex: 1, minHeight: 24 }} />

          </Tile>

          {/* Bottom padding for sticky actions clearance */}
          <div style={{ height: 24, flexShrink: 0 }} />
        </div>

        {/* Sticky bottom actions */}
        <Actions
          variant="sticky-screen"
          leftActions={[{ label: "Cancel", variant: "secondary" }]}
          rightActions={[{ label: rightAction, variant: "primary" }]}
        />

      </div>
    </div>
  );
}

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Screens/ManageRoles",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Admin — Manage Roles (Edit Project Team Template). " +
          "Excel-like editable table split into accordion groups. " +
          "Cells: editable text/number inputs (borderless, focus underline), inline selects, BookingPill for booking category, " +
          "MultiValue fields with Add link, Switch toggles, sticky check+menu actions. " +
          "Bottom: Actions variant='sticky-screen' — Cancel | Save.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DTT: Story = {
  name: "DTT — Demand Team Template",
  render: () => <ManageRolesScreen screenVariant="dtt" />,
};

export const EngagementRoles: Story = {
  name: "Manage Roles — Engagement",
  render: () => <ManageRolesScreen screenVariant="engagement" />,
};
