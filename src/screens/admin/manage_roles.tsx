// Screens/ManageRoles — Manage roles (Edit Project Team Template / engagement roles)
//
// Reusable screen: the Storybook stories (admin/manage_roles.stories.tsx) and the standalone bundle (IPS.ManageRolesScreen,
// used by prototypes) render this component with their own data.
//
// Selection (engagement roles): checkbox on the header, on each merged engagement cell and on each role. Engagement and role
// selection are mutually exclusive. Selecting rows shows a 600px bulk banner centred in the page header row with three
// ghost icon buttons — tag-roles (opens "Manage tags"), tag and owner. "Manage tags" is Figma "Tag roles" (2738:67102).
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

import { useEffect, useState } from "react";

import { Navbar }          from "../../components/navbar/navbar";
import { Icon }            from "../../components/icon/icon";
import { Button }          from "../../components/button/button";
import { Switch }          from "../../components/switch/switch";
import { Actions }         from "../../components/actions/actions";
import { Alert }           from "../../components/alert/alert";
import { Checkbox }        from "../../components/checkbox/checkbox";
import { Tooltip }         from "../../components/tooltip/tooltip";
import { Tile }            from "../../components/tile/tile";
import { Divider }         from "../../components/divider/divider";
import { BookingPill }     from "../../components/booking_pill/booking_pill";
import type { BookingPillCategory } from "../../components/booking_pill/booking_pill";
import { PillSimple, PillWFState } from "../../components/pill/pill";
import type { WFState }    from "../../components/pill/pill";
import { Modal }           from "../../components/modal/modal";
import { InputSelect, InputTextarea } from "../../components/input/input";
import { DropdownMultiSelection, DropdownSelection } from "../../components/dropdown/dropdown";


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

function MultiValueCell({ emptyLabel, value }: { emptyLabel: string; value?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {value ? <span style={{ ...body, fontWeight: 700, fontSize: 12 }}>{value}</span> : <span style={muted}>{emptyLabel}</span>}
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
  const catMap: Record<string, BookingPillCategory> = {
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
  padding: "8px", verticalAlign: "top",
  borderBottom: "1px solid var(--palette-neutral-0)",
  borderRight: "1px solid var(--palette-neutral-0)",
};

// ── Role row data ─────────────────────────────────────────────────────────────

type RoleRow = {
  id: string;
  engagement?: string;
  wfState?: WFState;
  title: string;
  description: string;
  vacancies: number;
  assignee?: string;
  bookingCategory?: { label: string; category: "booking-blue" | "booking-red" | "booking-purple" | "booking-green" };
  businessUnit?: string;
  skills?: string;
  priority?: string;
  label?: string;
  location?: string;
  /** Adds the extra switch column (smoke-santi) to the group's table */
  extraColumns?: boolean;
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

type SelectKind = "engagement" | "role";
// Role ids that are selected + which kind of checkbox made the selection (engagement and role selection are mutually exclusive)
type Selection = { selected: Set<string>; mode: SelectKind | null; toggle: (ids: string[], kind: SelectKind) => void };

// Checkbox that is disabled — with an explanatory tooltip — while the other selection kind is active
function SelectBox({ kind, selection, checked, indeterminate, onChange, header = false }: { header?: boolean; kind: SelectKind; selection: Selection; checked: boolean; indeterminate?: boolean; onChange: () => void }) {
  const locked = selection.mode !== null && selection.mode !== kind;
  const box = <Checkbox checked={checked} indeterminate={indeterminate} disabled={locked} onChange={onChange} />;
  if (!locked) return box;
  return (
    <Tooltip content={kind === "engagement" ? "Clear role selection to select engagements" : "Clear engagement selection to select roles"} placement={header ? "up-left" : "down-left"} maxWidth={400}>
      <span style={{ display: "inline-flex" }}>{box}</span>
    </Tooltip>
  );
}

function RolesTable({ roles, showExtraColumns = false, rowActions = "dtt", selection, selectable = true, tags = {} }: { roles: RoleRow[]; showExtraColumns?: boolean; rowActions?: RowActionsVariant; selection: Selection; selectable?: boolean; tags?: Record<string, string> }) {
  // The merged Engagement column only exists when the roles belong to engagements (not on the template editor)
  const hasEngagement = roles.some(r => r.engagement);
  const allChecked  = roles.length > 0 && roles.every(r => selection.selected.has(r.id));
  const someChecked = roles.some(r => selection.selected.has(r.id)) && !allChecked;
  const headers = [
    ...(hasEngagement ? [{ label: "Engagement title", mandatory: false, width: 168, checkbox: selectable }] : []),
    { label: "Role title",         mandatory: true,  width: 168, checkbox: selectable },
    { label: "Workflow state",     mandatory: false, width: 140 },
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
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", minWidth: 1524 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ ...thStyle, width: h.width, position: h.sticky ? "sticky" : "sticky", right: h.sticky ? 0 : undefined, zIndex: h.sticky ? 2 : 1 }}>
                {"checkbox" in h && h.checkbox
                  ? (
                    <Row gap={8}>
                      <SelectBox header kind={h.mandatory ? "role" : "engagement"} selection={selection} checked={allChecked} indeterminate={someChecked} onChange={() => selection.toggle(roles.map(r => r.id), h.mandatory ? "role" : "engagement")} />
                      {h.mandatory ? <MandatoryHeader label={h.label} /> : <span style={labelCss}>{h.label}</span>}
                    </Row>
                  )
                  : h.mandatory ? <MandatoryHeader label={h.label} /> : <span style={labelCss}>{h.label}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map((role, idx) => {
            // Consecutive roles of the same engagement share one merged engagement cell
            const first = hasEngagement && (idx === 0 || roles[idx - 1].engagement !== role.engagement);
            const run = first ? roles.filter((x, j) => j >= idx && roles.slice(idx, j + 1).every(y => y.engagement === role.engagement)) : [];
            const runIds = run.map(x => x.id);
            const runAll = runIds.length > 0 && runIds.every(id => selection.selected.has(id));
            const runSome = runIds.some(id => selection.selected.has(id)) && !runAll;
            return (
            <tr key={role.id} style={{ background: selectable && selection.selected.has(role.id) ? "var(--palette-primary-3)" : "white" }}>
              {/* Read-only engagement title, merged across the engagement's roles: neutral light background, regular weight, checkbox selects them all */}
              {first && (
                <td rowSpan={run.length} style={{ ...tdStyle, background: "var(--palette-neutral-2)" }}>
                  <Row gap={8} style={{ alignItems: "flex-start" }}>
                    {selectable && <SelectBox kind="engagement" selection={selection} checked={runAll} indeterminate={runSome} onChange={() => selection.toggle(runIds, "engagement")} />}
                    <span style={{ ...body, lineHeight: "20px", minWidth: 0 }}>{role.engagement}</span>
                  </Row>
                </td>
              )}
              <td style={tdStyle}>
                <Row gap={8} style={{ alignItems: "flex-start" }}>
                  {selectable && <SelectBox kind="role" selection={selection} checked={selection.selected.has(role.id)} onChange={() => selection.toggle([role.id], "role")} />}
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                    <EditableTextCell defaultValue={role.title} />
                    {tags[role.id] && <div><PillSimple label={tags[role.id]} size="small" leftIcon="tag" /></div>}
                  </div>
                </Row>
              </td>
              <td style={tdStyle}>{role.wfState && <PillWFState state={role.wfState} />}</td>
              <td style={tdStyle}><EditableTextCell defaultValue={role.description} /></td>
              <td style={tdStyle}><EditableNumberCell defaultValue={role.vacancies} /></td>
              <td style={tdStyle}><InlineSelectCell placeholder="" value={role.assignee} /></td>
              <td style={tdStyle}>
                {role.bookingCategory
                  ? <BookingCategoryCell {...role.bookingCategory} />
                  : <InlineSelectCell placeholder="" />}
              </td>
              <td style={tdStyle}><MultiValueCell emptyLabel="No Skills Framework added" /></td>
              <td style={tdStyle}><MultiValueCell emptyLabel="No custom values added" value={role.skills} /></td>
              <td style={tdStyle}><MultiValueCell emptyLabel="No custom values added" /></td>
              {showExtraColumns && (
                <td style={tdStyle}>
                  <Switch checked={false} onChange={() => {}} />
                </td>
              )}
              <td style={tdStyle}>
                <InlineSelectCell value={role.businessUnit} />
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Accordion group ───────────────────────────────────────────────────────────

function RoleGroup({ name, roles, showExtraColumns = false, rowActions = "dtt", selection, selectable = true, tags }: { name: string; roles: RoleRow[]; showExtraColumns?: boolean; rowActions?: RowActionsVariant; selection: Selection; selectable?: boolean; tags?: Record<string, string> }) {
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
      {expanded && <RolesTable roles={roles} showExtraColumns={showExtraColumns} rowActions={rowActions} selection={selection} selectable={selectable} tags={tags} />}
    </Tile>
  );
}

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

export type ManageRolesRole = RoleRow;
export type ManageRolesGroup = { name: string; roles: RoleRow[] };
export type { RowActionsVariant };

// ── Manage tags modal — Figma "Tag roles" 2738:67102 (two states: empty / filled with "Notify others" on) ──────────────

const TAG_OPTIONS = ["EM to review", "Ready to fill", "Needs rework", "On hold"].map(t => ({ id: t, label: t }));
const PEOPLE_OPTIONS = ["Megan Taylor", "Charlie Parker", "Spencer Harmon", "Santi Angulo"].map(t => ({ id: t, label: t }));
const NOTE_MAX = 500;
const summary = (ids: string[]) => (ids.length === 0 ? "" : ids.length <= 2 ? ids.join(", ") : `${ids.length} selected`);

export type TagRolesResult = { tag: string; note: string; notify: string[] };

function ManageTagsModal({ open, count, onClose, onUpdate }: { open: boolean; count: number; onClose: () => void; onUpdate: (r: TagRolesResult) => void }) {
  const [tag, setTag] = useState("");
  const [tagOpen, setTagOpen] = useState(false);
  const [note, setNote] = useState("");
  const [notify, setNotify] = useState(false);
  const [people, setPeople] = useState<string[]>([]);
  const [peopleOpen, setPeopleOpen] = useState(false);

  // Every opening starts empty
  useEffect(() => {
    if (open) { setTag(""); setTagOpen(false); setNote(""); setNotify(false); setPeople([]); setPeopleOpen(false); }
  }, [open]);

  const toggleNotify = (on: boolean) => {
    setNotify(on);
    if (on && people.length === 0) setPeople(["Megan Taylor"]);   // Figma shows Megan Taylor prefilled
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Manage tags"
      subtitle={`${count} ${count === 1 ? "role" : "roles"}`}
      width={500}
      leftActions={[{ label: "Cancel", variant: "secondary", onClick: onClose }]}
      rightActions={[{ label: "Update", variant: "primary", disabled: !tag, onClick: () => onUpdate({ tag, note, notify: notify ? people : [] }) }]}
    >
      <span style={body}>Pick a tag to add to these roles:</span>

      <div style={{ position: "relative" }}>
        <InputSelect label="Tag" value={tag} onClick={() => setTagOpen(o => !o)} />
        {/* Figma: the empty field stays plain; a muted warning line says why Update is disabled */}
        {!tag && (
          <Row gap={4} style={{ marginTop: 4, paddingLeft: 4 }}>
            <Icon name="warning" size={14} style={{ color: "var(--palette-blue-2)" }} />
            <span style={labelCss}>No tag</span>
          </Row>
        )}
        {tag && (
          <button
            type="button"
            title="Clear tag"
            onClick={() => setTag("")}
            style={{ position: "absolute", top: -2, right: 0, width: 20, height: 20, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-0)" }}
          >
            <Icon name="filter-clean" size={14} />
          </button>
        )}
        {tagOpen && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 9 }} onClick={() => setTagOpen(false)} />
            <div style={{ position: "absolute", top: tag ? "calc(100% - 4px)" : "calc(100% - 24px)", left: 0, right: 0, zIndex: 10 }}>
              <DropdownSelection items={TAG_OPTIONS} selectedId={tag} onSelect={id => { setTag(id); setTagOpen(false); }} />
            </div>
          </>
        )}
      </div>

      <InputTextarea
        label="Note"
        rows={4}
        value={note}
        message={`${note.length}/${NOTE_MAX}`}
        onChange={e => setNote(e.target.value.slice(0, NOTE_MAX))}
      />

      <Switch checked={notify} onChange={toggleNotify} label="Notify others" showLabel layout="horizontal-left" />

      {notify && (
        <div style={{ position: "relative" }}>
          <InputSelect
            label="Send a notification to"
            value={summary(people)}
            state="instructions"
            message="All selected people will be notified."
            onClick={() => setPeopleOpen(o => !o)}
          />
          {peopleOpen && (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 9 }} onClick={() => setPeopleOpen(false)} />
              <div style={{ position: "absolute", top: "calc(100% - 28px)", left: 0, right: 0, zIndex: 10 }}>
                <DropdownMultiSelection items={PEOPLE_OPTIONS} selectedIds={people} onSelectionChange={setPeople} searchable={false} />
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}

// ── Bulk buttons — three ghost icon buttons in the bulk banner ────────────────────────────────────────────────────────

type BulkAction = { id: "tag-roles" | "tag" | "owner"; label: string };
const BULK_ACTIONS: BulkAction[] = [
  { id: "tag-roles", label: "Tag roles" },
  { id: "tag",       label: "Tag" },
  { id: "owner",     label: "Owners" },
];
// Visually hidden text gives the icon-only buttons an accessible name without a second (native) tooltip
const srOnly: React.CSSProperties = { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" };

// ── Screen ────────────────────────────────────────────────────────────────────

export type ManageRolesScreenProps = {
  groups: ManageRolesGroup[];
  /** Name block above the roles ("Engagement" / "Demand Team Template") with the Add role button. Omit when the roles belong to several engagements. */
  header?: { label: string; value: string };
  /** Page title (default "Manage roles") */
  title?: string;
  /** "dtt": pencil actions (template editor); "roles": green tick actions (default) */
  rowActions?: RowActionsVariant;
  /** Right footer button (default "Fill & Book") */
  saveLabel?: string;
  /** Checkboxes + bulk banner. Default true; off for the template editor. */
  selectable?: boolean;
  /** Replaces the default Navbar (e.g. a prototype's navbar with an unread badge) */
  navbar?: React.ReactNode;
  navbarActiveId?: string;
  onNavigate?: (navbarId: string) => void;
  onBack?: () => void;
  onSave?: () => void;
  /** "Manage tags" → Update: the tag was applied to `roles` roles */
  onTagged?: (info: { tag: string; roles: number; notified: string[] }) => void;
};

export function ManageRolesScreen({
  groups, header, title = "Manage roles", rowActions = "roles", saveLabel = "Fill & Book", selectable = true,
  navbar, navbarActiveId = "admin", onNavigate, onBack, onSave, onTagged,
}: ManageRolesScreenProps) {
  const total = groups.reduce((n, g) => n + g.roles.length, 0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  // Engagement and role selection are mutually exclusive: `mode` is the kind that made the current selection
  const [mode, setMode] = useState<SelectKind | null>(null);
  const [tagging, setTagging] = useState(false);
  const [tags, setTags] = useState<Record<string, string>>({});

  // Toggle a set of rows: if every one is already selected they get deselected, otherwise all get selected
  const toggle = (ids: string[], kind: SelectKind) => {
    if (mode !== null && mode !== kind) return; // the other kind is locked
    const next = new Set(selected);
    const all = ids.every(id => next.has(id));
    ids.forEach(id => (all ? next.delete(id) : next.add(id)));
    setSelected(next);
    setMode(next.size ? kind : null);
  };
  const clearSelection = () => { setSelected(new Set()); setMode(null); };
  const selection: Selection = { selected, mode, toggle };
  // The banner counts engagements when engagements were selected, roles otherwise; the modal always counts roles
  const selectedCount = mode === "engagement"
    ? new Set(groups.flatMap(g => g.roles).filter(x => selected.has(x.id)).map(x => x.engagement)).size
    : selected.size;

  const applyTag = (r: TagRolesResult) => {
    setTags(prev => ({ ...prev, ...Object.fromEntries([...selected].map(id => [id, r.tag])) }));
    setTagging(false);
    onTagged?.({ tag: r.tag, roles: selected.size, notified: r.notify });
    clearSelection();
  };

  return (
    <div style={{ display: "flex", height: "var(--ips-vh, 100vh)", overflow: "hidden", background: "var(--palette-neutral-2)" }}>
      {navbar ?? <Navbar activeId={navbarActiveId} onSelect={onNavigate} />}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px 0", background: "var(--palette-neutral-2)", display: "flex", flexDirection: "column" }}>

          {/* Bulk-selection banner — overlays the page header row (centred, 600px) without growing the layout */}
          {selectable && selected.size > 0 && (
            <div style={{ position: "sticky", top: 8, height: 0, zIndex: 40, pointerEvents: "none", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 600, pointerEvents: "auto", borderRadius: 8, boxShadow: "var(--shadow-card-hover, 0 4px 12px rgba(12,20,87,0.12))" }}>
                <Alert
                  type="bulk-banner"
                  layout="inline"
                  message={`${selectedCount} selected`}
                  onDismiss={clearSelection}
                  rightContent={BULK_ACTIONS.map(a => (
                    <Tooltip key={a.id} content={a.label} placement="up-center" maxWidth={240}>
                      <Button kind="iconGhost" size="regular" onClick={a.id === "tag-roles" ? () => setTagging(true) : undefined}>
                        <Icon name={a.id} size={16} />
                        <span style={srOnly}>{a.label}</span>
                      </Button>
                    </Tooltip>
                  ))}
                />
              </div>
            </div>
          )}

          <h1 style={{ fontFamily: "var(--font-family)", fontSize: 28, fontWeight: 700, color: "var(--palette-blue-0)", marginBottom: 8, lineHeight: "125%", flexShrink: 0 }}>
            {title}
          </h1>

          <Tile tileStyle="highlight" padding="content" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, marginBottom: 0 }}>
            {header && (
              <>
                <SB style={{ marginBottom: 16, flexShrink: 0 }}>
                  <div>
                    <div style={{ ...labelCss, color: "var(--palette-blue-0)" }}>{header.label}</div>
                    <div style={bodyBold}>{header.value}</div>
                  </div>
                  <AddRoleButton groups={groups.map(g => g.name)} />
                </SB>

                <Divider orientation="horizontal" style={{ flexShrink: 0 }} />
              </>
            )}

            <div style={{ ...labelCss, margin: header ? "12px 0 16px" : "0 0 16px", flexShrink: 0 }}>{total} role{total === 1 ? "" : "s"}</div>

            {groups.map((g, i) => (
              <RoleGroup key={g.name + i} name={g.name} roles={g.roles} showExtraColumns={g.roles.some(r => r.extraColumns)} rowActions={rowActions} selection={selection} selectable={selectable} tags={tags} />
            ))}

            <div style={{ flex: 1, minHeight: 24 }} />
          </Tile>

          <div style={{ height: 24, flexShrink: 0 }} />
        </div>

        <Actions
          variant="sticky-screen"
          insetX={32}
          leftActions={[{ label: "Cancel", variant: "secondary", onClick: onBack }]}
          rightActions={[{ label: saveLabel, variant: "primary", onClick: onSave }]}
        />
      </div>

      <ManageTagsModal open={tagging} count={selected.size} onClose={() => setTagging(false)} onUpdate={applyTag} />
    </div>
  );
}
