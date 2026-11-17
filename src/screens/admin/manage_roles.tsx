// Screens/ManageRoles — Manage roles (Edit Project Team Template / engagement roles)
//
// Reusable screen: the Storybook stories (admin/manage_roles.stories.tsx) and the standalone bundle (IPS.ManageRolesScreen,
// used by prototypes) render this component with their own data.
//
// Selection (engagement roles): checkbox on the header, on each merged engagement cell and on each role. Engagement and role
// selection are mutually exclusive: ticking an engagement leaves its roles unticked and disabled, but the actions still apply to the
// roles inside it. Selecting rows shows a 600px bulk banner centred in the page header row with three
// ghost icon buttons — tag-roles (opens "Manage tags"), tag and owner. "Manage tags" is Figma "Tag roles" (2738:67102).
//
// Container mapping (RULE 2b):
//   Page bg: white (form/edit screen — not neutral-2)
//   Groups: Accordion header + flat inline table on white (no Tile wrapper)
//   Bottom: Actions variant="sticky-screen" — Cancel (DTT) / Close (engagement variants) left | Save right
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

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Navbar }          from "../../components/navbar/navbar";
import { Icon }            from "../../components/icon/icon";
import { Button }          from "../../components/button/button";
import { Switch }          from "../../components/switch/switch";
import { Actions }         from "../../components/actions/actions";
import { Alert }           from "../../components/alert/alert";
import { Checkbox }        from "../../components/checkbox/checkbox";
import { Tooltip }         from "../../components/tooltip/tooltip";
import { Tile }            from "../../components/tile/tile";
import { Avatar }          from "../../components/avatar/avatar";
import { Divider }         from "../../components/divider/divider";
import { BookingPill }     from "../../components/booking_pill/booking_pill";
import type { BookingPillCategory } from "../../components/booking_pill/booking_pill";
import { PillSimple, PillWFState } from "../../components/pill/pill";
import type { WFState }    from "../../components/pill/pill";
import { Modal }           from "../../components/modal/modal";
import { InputSelect, InputTextarea } from "../../components/input/input";
import { DropdownActions, DropdownMultiSelection, DropdownSelection } from "../../components/dropdown/dropdown";
import { SuggestSidePanel } from "../../components/side_panel/suggest_side_panel";
import type { SuggestCandidate } from "../../components/side_panel/suggest_side_panel";


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

// ── Suggested workforce member cell — Figma "Input excel select" (name + rank, chevron); empty = warning background ──────

const SUGGESTED_W = 170;

/** Sample candidates of the Suggest side panel (people the role's Suggested WM cell can be set to) */
export const DEFAULT_SUGGEST_CANDIDATES: { shortlist: SuggestCandidate[]; matches: SuggestCandidate[]; other: SuggestCandidate[] } = {
  shortlist: [
    { id: "jn", name: "John Norton",  initials: "JN", email: "john.norton@example.com",  rank: "Manager", match: 75, avail: 95,  status: "Shortlisted" },
    { id: "ls", name: "Leslie Smith", initials: "LS", email: "leslie.smith@example.com", rank: "Manager", match: 90, avail: 92,  status: "Shortlisted" },
    { id: "aj", name: "Ashley Jones", initials: "AJ", email: "ashley.jones@example.com", rank: "Manager", match: 50, avail: 100, status: "Shortlisted" },
  ],
  matches: [
    { id: "ml", name: "Mary Lee",         initials: "ML", email: "mary.lee@example.com",         rank: "Senior",     match: 88, avail: 80 },
    { id: "sh", name: "Spencer Harmon",   initials: "SH", email: "spencer.harmon@example.com",   rank: "Manager",    match: 82, avail: 70 },
    { id: "sa", name: "Santi Angulo",     initials: "SA", email: "santi.angulo@example.com",     rank: "Consultant", match: 64, avail: 100 },
    { id: "fa", name: "Fatima Al-Rashid", initials: "FA", email: "fatima.alrashid@example.com",  rank: "Manager",    match: 58, avail: 60 },
  ],
  other: [
    { id: "ap", name: "Albert Pierce", initials: "AP", email: "albert.pierce@example.com", rank: "Analyst" },
    { id: "au", name: "Aubrey Lee",    initials: "AL", email: "aubrey.lee@example.com",    rank: "Senior" },
    { id: "bc", name: "Brett Coleen",  initials: "BC", email: "brett.coleen@example.com",  rank: "Manager" },
  ],
};

// What the cell shows and what a click does come from the screen (it owns the suggestions and the side panel)
type SuggestCtx = { valueFor: (role: RoleRow) => SuggestCandidate[]; open: (role: RoleRow) => void };
const SuggestContext = createContext<SuggestCtx | null>(null);

function SuggestedWMCell({ role }: { role: RoleRow }) {
  const ctx = useContext(SuggestContext);
  const list = ctx ? ctx.valueFor(role) : role.suggested ? [{ id: role.id, name: role.suggested.name, initials: "", rank: role.suggested.rank }] : [];
  const first = list[0];
  const empty = !first;
  const rankLine = first ? [first.rank, list.length > 1 ? `+${list.length - 1} more` : null].filter(Boolean).join(" · ") : "";
  return (
    // Fills the whole cell edge to edge; the empty state uses the warning yellow (palette-orange-2), a populated cell stays transparent so the row tint shows through
    <td
      style={{ ...tdStyle, padding: 0, background: empty ? "var(--palette-orange-2)" : "transparent", cursor: ctx ? "pointer" : "default" }}
      title={empty ? "No suggested workforce member" : undefined}
      onClick={() => ctx?.open(role)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 4, padding: "8px 8px 8px 12px" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4, minHeight: 32, justifyContent: "center" }}>
          {first && <span style={{ ...body, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{first.name}</span>}
          {rankLine && <span style={{ ...labelCss, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rankLine}</span>}
        </div>
        <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)", flexShrink: 0, marginTop: 9 }} />
      </div>
    </td>
  );
}

// ── Booked workforce member cell — a removable pill: × + avatar + name (neutral-1, fully rounded) ───────────────────────

const BOOKED_W = 240;
const initialsOf = (name: string) => name.split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase();
const BookedUnbookContext = createContext<((role: RoleRow) => void) | undefined>(undefined);

function BookedWMCell({ role }: { role: RoleRow }) {
  const unbook = useContext(BookedUnbookContext);
  return (
    <td style={{ ...tdStyle, padding: "8px", verticalAlign: "top", whiteSpace: "nowrap" }}>
      {role.booked && isBookedState(role) && (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, maxWidth: "100%", boxSizing: "border-box", padding: "4px 10px 4px 6px", verticalAlign: "middle", borderRadius: "var(--radius-2xl, 32px)", background: "var(--palette-neutral-1)" }}>
          <button
            type="button"
            title={`Remove ${role.booked.name}`}
            aria-label={`Remove booked workforce member ${role.booked.name}`}
            onClick={() => unbook?.(role)}
            style={{ width: 20, height: 20, padding: 0, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-0)", flexShrink: 0 }}
          >
            <Icon name="cross" size={16} />
          </button>
          <Avatar initials={initialsOf(role.booked.name)} size="small" />
          <span style={{ ...body, fontWeight: 700, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{role.booked.name}</span>
          {/* Potential overbooking: the warning sits inside the pill, right after the name */}
          {role.booked.overbooking && (
            // portal: the table pane scrolls (overflow), which would cut a normal tooltip off at the cell edge
            <Tooltip
              portal
              placement="up-right"
              maxWidth={320}
              content={
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <strong>Potential overbooking</strong>
                  <span>Weeks affected:</span>
                  {role.booked.overbooking.weeks.map(w => <span key={w}>{w}</span>)}
                </span>
              }
            >
              <span aria-label="Potential overbooking" style={{ display: "inline-flex", cursor: "default", flexShrink: 0 }}>
                <Icon name="warning" size={16} style={{ color: "var(--palette-orange-1)" }} />
              </span>
            </Tooltip>
          )}
        </span>
      )}
    </td>
  );
}

// ── Editable hours cell (availability table) — Figma "Input week time rule" 2757:286931 ───────────────────────────────
// Default: the value, centred. Hover: grey cell (rgba(0,0,0,.04)) with the value in an 8px-radius pill (1px neutral-0 border).
// Focused (typing): white cell with a 2px navy border (blue-1), the pill turns light blue (primary-3).

function HoursTd({ defaultValue, flag, onChange }: { defaultValue?: number; flag?: "error" | "warning"; onChange?: (hours: number | null) => void }) {
  const [val, setVal] = useState(defaultValue == null ? "" : String(defaultValue));
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  return (
    <td
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={e => { if (e.target !== input.current) { e.preventDefault(); input.current?.focus(); } }}
      style={{
        ...tdStyle, position: "relative", textAlign: "center", cursor: "text",
        background: focus ? "var(--palette-white-0)" : hover ? "rgba(0, 0, 0, 0.04)" : undefined,
        boxShadow: focus ? "inset 0 0 0 2px var(--palette-blue-1)" : undefined,
      }}
    >
      {flag && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: flag === "error" ? "var(--palette-red-0)" : "var(--palette-orange-1)" }} />}
      <input
        ref={input}
        value={val}
        inputMode="numeric"
        aria-label="Requested hours"
        onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 3); setVal(v); onChange?.(v === "" ? null : Number(v)); }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          display: "block", width: "100%", height: 24, marginTop: 4, boxSizing: "border-box", textAlign: "center", outline: "none", padding: "0 8px",
          fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, lineHeight: "115%", color: "var(--palette-blue-0)",
          borderRadius: 8, border: "1px solid transparent",
          background: focus ? "var(--palette-primary-3)" : hover ? "rgba(0, 0, 0, 0.04)" : "transparent",
          borderColor: focus || hover ? "var(--palette-neutral-0)" : "transparent",
        }}
      />
    </td>
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
  /** Requested hours per week for the availability-rules table, one entry per week column (missing / null = empty cell).
   *  `flag` draws a 2px red (error) or orange (warning) top border on the cell. */
  availability?: AvailabilityCell[];
  /** Suggested workforce member ("Suggested WM" column of the engagement tables). Missing / null = nobody suggested yet: the cell shows the warning background, except on a booked or confirmed role, which always shows someone (its own suggestion, else the booked WM). */
  suggested?: { name: string; rank?: string } | null;
  /** Booked workforce member ("Booked WM" column, right after Suggested WM in every engagement variant): who is booked. The pill only shows when the role's Workflow state is confirmed or booked; in any other state the cell stays empty. */
  booked?: { name: string; /** Potential overbooking: an orange warning icon next to the pill; its tooltip says "Potential overbooking" and lists these weeks */ overbooking?: { weeks: string[] } } | null;
  /** Rank the role asks for: a suggested WM of that rank gets the green check in the Suggest side panel */
  requestedRank?: string;
  /** Hours booked on the role (confirmed and booked roles). Feeds the read-only **Delta** column of the engagement variants: requested hours (the sum of the
   *  availability cells, live while they are edited) minus these hours for confirmed and booked roles (negative = red-0, 0h = green-0); every other state has nothing booked, so its delta is the requested hours (always above 0h). */
  bookedHours?: number;
};

export type AvailabilityCell = number | { hours: number; flag?: "error" | "warning" } | null;

/** Reported while a requested-hours cell of the availability-rules table is edited (hours = null when the cell is emptied) */
export type AvailabilityChange = { roleId: string; weekIndex: number; hours: number | null };
type AvailabilityChangeHandler = (change: AvailabilityChange) => void;

/** Week columns of the availability-rules table (Figma "Manage roles" 2362:258886) */
export const DEFAULT_AVAILABILITY_WEEKS = [
  "5 - 9 Jan 2026", "12 - 16 Jan 2026", "19 - 22 Jan 2026", "25 - 29 Jan 2026", "2 - 6 Feb 2026", "9 - 13 Feb 2026",
];

// Row / header heights shared by the roles table and the availability table so their rows line up
const ROW_H = 100;
const HEAD_H = 49;   // the roles table header is as tall as its checkboxes need (32px + padding + border)
const WEEK_W = 96;           // narrow week columns (the Figma's are 143px); headers wrap onto two lines
const ACTIONS_W = 64;
const DEFAULT_AVAILABILITY_W = WEEK_W * 4 + ACTIONS_W;   // four weeks visible by default; drag the divider to change it
const MIN_AVAILABILITY_W = WEEK_W + ACTIONS_W;
const DIVIDER_W = 4;           // the draggable strip
const MIN_LEFT_W = 240;        // the roles table always keeps at least this much room

// ── Group table ───────────────────────────────────────────────────────────────

// rowActions variants:
//   "dtt"   — edit pencil in neutral-1 pill + menu-vertical
//   "roles" — green tick in green pill (no edit icon)
type RowActionsVariant = "dtt" | "roles";

/** Actions in the menu at the end of each row (variant "roles") */
export type RowMenuAction = "duplicate" | "fill-book" | "tag" | "close" | "delete";
const ROW_MENU_ITEMS: { id: RowMenuAction; label: string }[] = [
  { id: "duplicate", label: "Duplicate" }, { id: "fill-book", label: "Fill & Book" }, { id: "tag", label: "Tag" }, { id: "close", label: "Close" }, { id: "delete", label: "Delete" },
];
// The screen owns the menu; the buttons only say which row and where they are
const FreshRowContext = createContext<string | null>(null);
// Hours the user typed into the availability cells so far (role id → week index → hours), so Delta follows the edits
const HoursEditsContext = createContext<Record<string, Record<number, number | null>>>({});

const DELTA_W = 88;
/** Only a confirmed or booked role has someone booked: its Booked WM pill shows, and its Delta is requested − booked */
const isBookedState = (role: RoleRow) => role.wfState === "confirmed" || role.wfState === "booked";
/** Delta column. Confirmed and booked roles: requested − booked hours (negative = red-0, 0h = green-0, positive = neutral). Every other role has nothing booked yet, so its delta is simply the requested hours: always above 0h. */
function deltaHours(role: RoleRow, edits: Record<string, Record<number, number | null>>): number {
  const cell = (c: AvailabilityCell | undefined) => (c == null ? 0 : typeof c === "number" ? c : c.hours);
  const requested = (role.availability ?? []).reduce<number>((n, c, i) => n + (edits[role.id] && i in edits[role.id] ? (edits[role.id][i] ?? 0) : cell(c)), 0)
    + Object.keys(edits[role.id] ?? {}).filter(k => Number(k) >= (role.availability?.length ?? 0)).reduce((n, k) => n + (edits[role.id][Number(k)] ?? 0), 0);
  if (!isBookedState(role)) return requested;
  return requested - (role.bookedHours ?? 0);
}
const fmtDelta = (d: number) => `${d > 0 ? "+" : ""}${d}h`;

// Read-only, same look as the merged engagement title cell: neutral-2 background, regular weight
function DeltaCell({ role }: { role: RoleRow }) {
  const edits = useContext(HoursEditsContext);
  const d = deltaHours(role, edits);
  return (
    <td style={{ ...tdStyle, background: "var(--palette-neutral-2)" }}>
      {/* Bold; negative = red-0 (#D42A36), 0h = green-0 (#248E61), positive = neutral */}
      <span style={{ ...body, fontWeight: 700, lineHeight: "20px", color: d < 0 ? "var(--palette-red-0)" : d === 0 ? "var(--palette-green-0)" : "var(--palette-blue-0)" }}>{fmtDelta(d)}</span>
    </td>
  );
}
const RowMenuContext = createContext<((role: RoleRow, anchor: HTMLElement) => void) | null>(null);
// Entry animation of a duplicated row: it slides in from above while a blue tint fades out
const ROW_ANIM_CSS = `@keyframes mr-row-in { 0% { opacity: 0; transform: translateY(-14px); background-color: var(--palette-primary-3); } 55% { opacity: 1; } 100% { opacity: 1; transform: none; } }
.mr-row-new { animation: mr-row-in 0.8s cubic-bezier(0.2, 0.7, 0.2, 1); }`;

function StickyActions({ variant = "dtt", role }: { variant?: RowActionsVariant; role?: RoleRow }) {
  const openMenu = useContext(RowMenuContext);
  const menuBtn = (
    <button
      type="button" title="More actions" aria-label="More actions" aria-haspopup="menu"
      onClick={e => { if (role && openMenu) openMenu(role, e.currentTarget); }}
      style={{ width: 24, height: 24, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-2)" }}
    >
      <Icon name="menu-vertical" size={14} />
    </button>
  );
  if (variant === "roles") {
    return (
      <Row gap={4}>
        {/* Green tick pill */}
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 20, borderRadius: 16, background: "var(--palette-green-2)" }}>
          <Icon name="check" size={14} style={{ color: "var(--palette-green-0)" }} />
        </div>
        {menuBtn}
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
// Engagement and role selection are mutually exclusive. `selected` holds what the active kind picked:
//   mode "engagement" → engagement titles (the roles inside are NOT ticked, their boxes are disabled, but every action applies to them)
//   mode "role"       → role ids (the engagement boxes are disabled)
type Selection = { selected: Set<string>; mode: SelectKind | null; toggle: (ids: string[], kind: SelectKind) => void };

/** Is this role part of the selection (picked itself, or inside a picked engagement)? Drives the row highlight and the actions. */
const roleInSelection = (sel: Selection, role: RoleRow) =>
  sel.mode === "role" ? sel.selected.has(role.id) : sel.mode === "engagement" ? !!role.engagement && sel.selected.has(role.engagement) : false;

// The other kind's checkboxes are disabled (unticked) with an explanatory tooltip
function SelectBox({ kind, selection, checked, indeterminate, onChange, header = false }: { header?: boolean; kind: SelectKind; selection: Selection; checked: boolean; indeterminate?: boolean; onChange: () => void }) {
  const locked = selection.mode !== null && selection.mode !== kind;
  const box = <Checkbox checked={!locked && checked} indeterminate={!locked && indeterminate} disabled={locked} onChange={onChange} />;
  if (!locked) return box;
  return (
    <Tooltip content={kind === "engagement" ? "Clear role selection to select engagements" : "Clear engagement selection to select roles"} placement={header ? "up-left" : "down-left"} maxWidth={400}>
      <span style={{ display: "inline-flex" }}>{box}</span>
    </Tooltip>
  );
}

function RolesTable({ roles, showExtraColumns = false, rowActions = "dtt", selection, selectable = true, tags = {}, engagementTags = {}, availability = false, weeks = DEFAULT_AVAILABILITY_WEEKS, availabilityWidth = DEFAULT_AVAILABILITY_W, onAvailabilityWidth, onAvailabilityChange }: { engagementTags?: Record<string, string>; roles: RoleRow[]; showExtraColumns?: boolean; rowActions?: RowActionsVariant; selection: Selection; selectable?: boolean; tags?: Record<string, string>; availability?: boolean; weeks?: string[]; availabilityWidth?: number; onAvailabilityWidth?: (w: number) => void; onAvailabilityChange?: AvailabilityChangeHandler }) {
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const paneRef = useRef<HTMLDivElement>(null);
  // The merged Engagement column only exists when the roles belong to engagements (not on the template editor)
  const hasEngagement = roles.some(r => r.engagement);
  // What each header checkbox toggles: this table's engagement titles / role ids
  // Every engagement variant has it (DTT has no availability table); only confirmed / booked roles carry a person, the rest show an empty cell
  const showBooked = !!availability;
  const showDelta = !!availability;     // every engagement variant: the rule needs no booked hours (nothing booked = the requested hours)
  const engagementKeys = [...new Set(roles.map(r => r.engagement).filter((e): e is string => !!e))];
  const roleKeys = roles.map(r => r.id);
  const headerState = (kind: SelectKind) => {
    const keys = kind === "engagement" ? engagementKeys : roleKeys;
    const n = keys.filter(k => selection.selected.has(k)).length;
    return { keys, checked: selection.mode === kind && keys.length > 0 && n === keys.length, indeterminate: selection.mode === kind && n > 0 && n < keys.length };
  };
  const freshRow = useContext(FreshRowContext);
  const headers = [
    ...(hasEngagement ? [{ label: "Engagement title", mandatory: false, width: 168, checkbox: selectable }] : []),
    { label: "Role title",         mandatory: true,  width: 168, checkbox: selectable },
    // Tag column (set with "Manage tags"); the template editor has no tags
    ...(selectable ? [{ label: "Tag", mandatory: false, width: 140 }] : []),
    { label: "Workflow state",     mandatory: false, width: 140 },
    // Requested − booked hours of confirmed / booked roles (read-only)
    ...(showDelta ? [{ label: "Delta", mandatory: false, width: DELTA_W }] : []),
    // Engagement tables: the workforce member the rollforward suggests (empty = needs attention)
    ...(availability ? [{ label: "Suggested WM", mandatory: false, width: SUGGESTED_W }] : []),
    // Right next to it: who is booked (roles that are confirmed)
    ...(showBooked ? [{ label: "Booked WM", mandatory: false, width: BOOKED_W }] : []),
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
    // With the availability table the row actions live at the end of that table instead
    ...(availability ? [] : [{ label: "", mandatory: false, width: ACTIONS_W, sticky: true }]),
  ];

  const rolesTable = (
    <div style={{ overflowX: "auto", ...(availability ? { flex: "1 1 0", minWidth: 0 } : null) }}>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", minWidth: 1524 + (availability ? SUGGESTED_W : 0) + (showBooked ? BOOKED_W : 0) + (showDelta ? DELTA_W : 0) }}>
        <thead>
          <tr style={availability ? { height: HEAD_H } : undefined}>
            {headers.map((h, i) => (
              <th key={i} style={{ ...thStyle, width: h.width, position: h.sticky ? "sticky" : "sticky", right: h.sticky ? 0 : undefined, zIndex: h.sticky ? 2 : 1, ...(availability ? { height: HEAD_H, boxSizing: "border-box" as const } : null) }}>
                {"checkbox" in h && h.checkbox
                  ? (() => {
                    const kind: SelectKind = h.mandatory ? "role" : "engagement";
                    const st = headerState(kind);
                    return (
                    <Row gap={8}>
                      <SelectBox header kind={kind} selection={selection} checked={st.checked} indeterminate={st.indeterminate} onChange={() => selection.toggle(st.keys, kind)} />
                      {h.mandatory ? <MandatoryHeader label={h.label} /> : <span style={labelCss}>{h.label}</span>}
                    </Row>
                    );
                  })()
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
            return (
            <tr key={role.id} className={freshRow === role.id ? "mr-row-new" : undefined} style={{ background: selectable && roleInSelection(selection, role) ? "var(--palette-primary-3)" : "white", ...(availability ? { height: ROW_H } : null) }}>
              {/* Read-only engagement title, merged across the engagement's roles: neutral light background, regular weight, checkbox selects them all */}
              {first && (
                <td rowSpan={run.length} style={{ ...tdStyle, background: "var(--palette-neutral-2)" }}>
                  <Row gap={8} style={{ alignItems: "flex-start" }}>
                    {selectable && <SelectBox kind="engagement" selection={selection} checked={!!role.engagement && selection.selected.has(role.engagement)} onChange={() => role.engagement && selection.toggle([role.engagement], "engagement")} />}
                    <div style={{ minWidth: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                      <span style={{ ...body, lineHeight: "20px", minWidth: 0 }}>{role.engagement}</span>
                      {/* The tag the engagement got (bulk Tag), right below its title */}
                      {role.engagement && engagementTags[role.engagement] && <PillSimple label={engagementTags[role.engagement]} size="small" leftIcon="tag" />}
                    </div>
                  </Row>
                </td>
              )}
              <td style={tdStyle}>
                <Row gap={8} style={{ alignItems: "flex-start" }}>
                  {selectable && <SelectBox kind="role" selection={selection} checked={selection.selected.has(role.id)} onChange={() => selection.toggle([role.id], "role")} />}
                  <EditableTextCell defaultValue={role.title} />
                </Row>
              </td>
              {selectable && (
                <td style={tdStyle}>
                  {tags[role.id] ? <PillSimple label={tags[role.id]} size="small" leftIcon="tag" /> : <span style={muted}>-</span>}
                </td>
              )}
              <td style={tdStyle}>{role.wfState && <PillWFState state={role.wfState} />}</td>
              {showDelta && <DeltaCell role={role} />}
              {availability && <SuggestedWMCell role={role} />}
              {showBooked && <BookedWMCell role={role} />}
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
              {!availability && (
                <td style={{ ...tdStyle, position: "sticky", right: 0, background: "white", zIndex: 1, borderRight: "none", filter: "drop-shadow(-4px 0 6px rgba(203,218,247,0.85))" }}>
                  <StickyActions variant={rowActions} role={role} />
                </td>
              )}
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  if (!availability) return rolesTable;

  // Drag the divider: moving it left widens the availability pane (all the way until only MIN_LEFT_W of the roles table is left),
  // right narrows it (down to one week). When the pane is wider than the weeks need, the week columns stretch.
  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startW = availabilityWidth;
    const maxWidth = Math.max(MIN_AVAILABILITY_W, (paneRef.current?.clientWidth ?? 0) - DIVIDER_W - MIN_LEFT_W);
    setDragging(true);
    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const move = (ev: MouseEvent) => onAvailabilityWidth?.(Math.min(maxWidth, Math.max(MIN_AVAILABILITY_W, startW + (startX - ev.clientX))));
    const up = () => {
      setDragging(false);
      document.body.style.cursor = prevCursor;
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  // Two panes side by side: the roles table (scrolls horizontally on its own), the IPS draggable Divider, and the availability rules table
  return (
    <div ref={paneRef} style={{ display: "flex", alignItems: "flex-start" }}>
      {rolesTable}
      {/* Same pattern as the Gantt in booking_engine / the Figma: a full-height neutral-0 strip that is itself the drag target,
          with the IPS draggable Divider handle sticky in the middle. On hover / while dragging the WHOLE strip turns blue, not just the handle */}
      <div
        onMouseDown={startDrag}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ width: DIVIDER_W, flex: "0 0 auto", alignSelf: "stretch", cursor: "col-resize", userSelect: "none", transition: "background-color 0.15s ease",
          background: dragging || hovered ? "var(--palette-primary-0)" : "var(--palette-neutral-0)" }}
      >
        <div style={{ position: "sticky", top: "50%", transform: "translateY(-50%)" }}>
          <Divider type="draggable" isHovered={dragging || hovered} />
        </div>
      </div>
      <AvailabilityTable roles={roles} weeks={weeks} selection={selection} selectable={selectable} rowActions={rowActions} width={availabilityWidth} onAvailabilityChange={onAvailabilityChange} />
    </div>
  );
}

// ── Availability rules table — requested hours per week (Figma "Manage roles" 2362:258886) ───────────────────────────
// A separate table to the right of the roles table; one row per role (same 100px rows), one narrow column per week, the IPS draggable
// Divider on its left (drag to resize the pane), and the row actions (tick + menu) sticky at its right edge.

function AvailabilityTable({ roles, weeks, selection, selectable, rowActions, width, onAvailabilityChange }: { roles: RoleRow[]; weeks: string[]; selection: Selection; selectable: boolean; rowActions: RowActionsVariant; width: number; onAvailabilityChange?: AvailabilityChangeHandler }) {
  const freshRow = useContext(FreshRowContext);
  const norm = (c: AvailabilityCell | undefined) => (c == null ? null : typeof c === "number" ? { hours: c, flag: undefined as "error" | "warning" | undefined } : c);
  return (
    <div style={{ flex: "0 0 auto", width, maxWidth: `calc(100% - ${DIVIDER_W + MIN_LEFT_W}px)`, overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", tableLayout: "fixed", width: "100%", minWidth: weeks.length * WEEK_W + ACTIONS_W }}>
        <thead>
          <tr style={{ height: HEAD_H }}>
            {weeks.map(w => (
              <th key={w} style={{ ...thStyle, height: HEAD_H, boxSizing: "border-box", textAlign: "center", color: "var(--palette-blue-0)", whiteSpace: "normal", lineHeight: "115%" }}>{w}</th>
            ))}
            <th style={{ ...thStyle, width: ACTIONS_W, height: HEAD_H, boxSizing: "border-box", position: "sticky", right: 0, zIndex: 2, borderRight: "none" }} />
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id} className={freshRow === role.id ? "mr-row-new" : undefined} style={{ height: ROW_H, background: selectable && roleInSelection(selection, role) ? "var(--palette-primary-3)" : "white" }}>
              {weeks.map((w, i) => {
                const c = norm(role.availability?.[i]);
                return (
                  <HoursTd key={w} defaultValue={c?.hours} flag={c?.flag} onChange={hours => onAvailabilityChange?.({ roleId: role.id, weekIndex: i, hours })} />
                );
              })}
              <td style={{ ...tdStyle, position: "sticky", right: 0, background: "white", zIndex: 1, borderRight: "none", filter: "drop-shadow(-4px 0 6px rgba(203,218,247,0.85))" }}>
                <StickyActions variant={rowActions} role={role} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Accordion group ───────────────────────────────────────────────────────────

function RoleGroup({ name, roles, showExtraColumns = false, rowActions = "dtt", selection, selectable = true, tags, engagementTags, availability = false, weeks, availabilityWidth, onAvailabilityWidth, onAvailabilityChange }: { engagementTags?: Record<string, string>; name: string; roles: RoleRow[]; showExtraColumns?: boolean; rowActions?: RowActionsVariant; selection: Selection; selectable?: boolean; tags?: Record<string, string>; availability?: boolean; weeks?: string[]; availabilityWidth?: number; onAvailabilityWidth?: (w: number) => void; onAvailabilityChange?: AvailabilityChangeHandler }) {
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
      {expanded && <RolesTable roles={roles} showExtraColumns={showExtraColumns} rowActions={rowActions} selection={selection} selectable={selectable} tags={tags} engagementTags={engagementTags} availability={availability} weeks={weeks} availabilityWidth={availabilityWidth} onAvailabilityWidth={onAvailabilityWidth} onAvailabilityChange={onAvailabilityChange} />}
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

export const DEFAULT_TAG_OPTIONS = ["EM to review", "RM to resource", "Ready to fill", "Needs rework", "On hold"];
export const DEFAULT_PEOPLE_OPTIONS = ["Megan Taylor", "Charlie Parker", "Spencer Harmon", "Santi Angulo"];
const toItems = (xs: string[]) => xs.map(t => ({ id: t, label: t }));
const NOTE_MAX = 500;
const summary = (ids: string[]) => (ids.length === 0 ? "" : ids.length <= 2 ? ids.join(", ") : `${ids.length} selected`);

export type TagRolesResult = { tag: string; note: string; notify: string[] };

export type TagPrefill = { tag: string; notify?: string[] };

export function ManageTagsModal({ open, count, unit = "role", onClose, onUpdate, tagOptions, peopleOptions, defaultNotify, prefill }: { open: boolean; count: number; /** What is being tagged: roles (default) or engagements */ unit?: "role" | "engagement"; onClose: () => void; onUpdate: (r: TagRolesResult) => void; tagOptions: string[]; peopleOptions: string[]; defaultNotify: string; prefill?: TagPrefill }) {
  const [tag, setTag] = useState("");
  const [tagOpen, setTagOpen] = useState(false);
  const [note, setNote] = useState("");
  const [notify, setNotify] = useState(false);
  const [people, setPeople] = useState<string[]>([]);
  const [peopleOpen, setPeopleOpen] = useState(false);

  // Every opening starts empty
  useEffect(() => {
    if (open) { setTag(prefill?.tag ?? ""); setTagOpen(false); setNote(""); setNotify(!!prefill?.notify?.length); setPeople(prefill?.notify ?? []); setPeopleOpen(false); }
  }, [open]);

  const toggleNotify = (on: boolean) => {
    setNotify(on);
    if (on && people.length === 0) setPeople([defaultNotify]);   // Figma shows Megan Taylor prefilled
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Manage tags"
      subtitle={`${count} ${count === 1 ? unit : `${unit}s`}`}
      width={500}
      leftActions={[{ label: "Cancel", variant: "secondary", onClick: onClose }]}
      rightActions={[{ label: "Update", variant: "primary", disabled: !tag, onClick: () => onUpdate({ tag, note, notify: notify ? people : [] }) }]}
    >
      <span style={body}>Pick a tag to add to these {unit}s:</span>

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
              <DropdownSelection items={toItems(tagOptions)} selectedId={tag} onSelect={id => { setTag(id); setTagOpen(false); }} />
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
                <DropdownMultiSelection items={toItems(peopleOptions)} selectedIds={people} onSelectionChange={setPeople} searchable={false} />
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
// Engagements selected: tag tags the picked engagements (the tag shows right below each engagement title), tag-roles tags every role inside them (Tag column).
// Roles selected: tag tags the picked roles (no tag-roles). All of them open "Manage tags".
const ENGAGEMENT_ACTIONS: BulkAction[] = [
  { id: "tag-roles", label: "Tag roles" },
  { id: "tag",       label: "Tag" },
  { id: "owner",     label: "Owners" },
];
const ROLE_ACTIONS: BulkAction[] = [
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
  /** Availability rules table (requested hours per week) to the right of the roles table. Default: on whenever `selectable` is on (engagement roles), off for the template editor. */
  availability?: boolean;
  /** Week column labels of the availability table (default: six weeks from "5 - 9 Jan 2026") */
  weeks?: string[];
  /** An hours cell of the availability-rules table was edited (one call per keystroke). The cell keeps its own value; the host decides what to do with it. */
  onAvailabilityChange?: AvailabilityChangeHandler;
  /** Replaces the default Navbar (e.g. a prototype's navbar with an unread badge) */
  navbar?: React.ReactNode;
  navbarActiveId?: string;
  onNavigate?: (navbarId: string) => void;
  onBack?: () => void;
  onSave?: () => void;
  /** "Manage tags" → Update: the tag was applied to `roles` roles (`roleIds` says which). `target` "engagements": it was applied to the picked engagements themselves (`engagements` = their names), not to their roles. */
  onTagged?: (info: { tag: string; roles: number; roleIds: string[]; notified: string[]; target: "roles" | "engagements"; engagements: string[] }) => void;
  /** Adds a secondary "Open in Booking Engine" button to the page header, top right. Called with the ids of the roles the screen shows right now (duplicates and deletes included). */
  onOpenInBookingEngine?: (roleIds: string[]) => void;
  /** A row menu action was chosen (menu at the end of each row). Duplicate (a new row right below, animated; the copy is reset to Shortlisting with no Booked WM), Tag (opens Manage tags for that role) and Delete (removes the row) are done by the screen; Fill & Book and Close are only reported here. */
  onRowAction?: (info: { action: RowMenuAction; roleId: string }) => void;
  /** Tags engagements already have when the screen opens: engagement name → tag (shown right below the engagement title) */
  initialEngagementTags?: Record<string, string>;
  /** Tags in the "Manage tags" dropdown (default: EM to review, RM to resource, Ready to fill, Needs rework, On hold) */
  tagOptions?: string[];
  /** People in the "Send a notification to" dropdown (default: Megan Taylor, Charlie Parker, Spencer Harmon, Santi Angulo) */
  peopleOptions?: string[];
  /** Person preselected when "Notify others" is switched on (default Megan Taylor, as in the Figma) */
  defaultNotify?: string;
  /** Tags already on roles when the screen opens: role id → tag */
  initialTags?: Record<string, string>;
  /** The × of a Booked WM pill was clicked (the host decides what unbooking means) */
  onUnbook?: (info: { roleId: string; name: string }) => void;
  /** Candidates of the Suggest side panel (opened by clicking a Suggested WM cell); defaults to a sample list */
  suggestCandidates?: { shortlist?: SuggestCandidate[]; matches?: SuggestCandidate[]; other?: SuggestCandidate[] };
  /** The Suggest side panel's Done: the WMs now suggested for a role */
  onSuggestedChange?: (info: { roleId: string; suggested: SuggestCandidate[] }) => void;
  /** Suggestions already made when the screen opens: role id → WMs (wins over a role's own `suggested`) */
  initialSuggested?: Record<string, SuggestCandidate[]>;
  /** Opens (`roleId`) or closes (`null`) the Suggest side panel from outside, e.g. a prototype tour. A new `n` re-applies the command. */
  suggestCommand?: { n: number; roleId: string | null };
  /** The Suggest side panel opened (role id) or closed (null) */
  onSuggestOpenChange?: (roleId: string | null) => void;
  /** Selects roles / engagements and opens Manage tags from outside, e.g. a prototype's flow map. Applied on mount and whenever `n` changes while `open` is true. */
  tagCommand?: { n: number; open?: boolean; select?: { kind: "role" | "engagement"; keys: string[] }; prefill?: TagPrefill };
};

export function ManageRolesScreen({
  groups: groupsIn, header, title = "Manage roles", rowActions = "roles", saveLabel = "Fill & Book", selectable = true, availability, weeks, onAvailabilityChange,
  navbar, navbarActiveId = "admin", onNavigate, onBack, onSave, onTagged, onUnbook, onRowAction, onOpenInBookingEngine,
  tagOptions = DEFAULT_TAG_OPTIONS, peopleOptions = DEFAULT_PEOPLE_OPTIONS, defaultNotify = "Megan Taylor", initialTags = {}, initialEngagementTags = {},
  suggestCandidates = DEFAULT_SUGGEST_CANDIDATES, onSuggestedChange, initialSuggested = {}, suggestCommand, onSuggestOpenChange, tagCommand,
}: ManageRolesScreenProps) {
  // Row menu edits: duplicated rows (inserted right below their source) and deleted rows, on top of the groups the host passes
  const [dups, setDups] = useState<{ id: string; afterId: string; role: RoleRow }[]>([]);
  const [deleted, setDeleted] = useState<Set<string>>(new Set());
  const [freshRow, setFreshRow] = useState<string | null>(null);
  const [hoursEdits, setHoursEdits] = useState<Record<string, Record<number, number | null>>>({});
  const dupSeq = useRef(0);
  const trackHours: AvailabilityChangeHandler = c => { setHoursEdits(e => ({ ...e, [c.roleId]: { ...e[c.roleId], [c.weekIndex]: c.hours } })); onAvailabilityChange?.(c); };
  const groups: ManageRolesGroup[] = groupsIn.map(g => {
    let roles = [...g.roles];
    dups.forEach(d => { const i = roles.findIndex(r => r.id === d.afterId); if (i >= 0) roles.splice(i + 1, 0, d.role); });
    return { ...g, roles: roles.filter(r => !deleted.has(r.id)) };
  });
  const total = groups.reduce((n, g) => n + g.roles.length, 0);
  // Counter above the groups: "X engagements · Y roles" (engagements = distinct titles; the template editor has none, so it shows roles only)
  const engagementCount = new Set(groups.flatMap(g => g.roles.map(r => r.engagement).filter(Boolean))).size;
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const counter = engagementCount > 0 ? `${plural(engagementCount, "engagement")} · ${plural(total, "role")}` : plural(total, "role");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  // Engagement and role selection are mutually exclusive: `mode` is the kind that made the current selection
  const [mode, setMode] = useState<SelectKind | null>(null);
  const [tagging, setTagging] = useState(false);
  const [tagTarget, setTagTarget] = useState<"roles" | "engagements">("roles");   // what the open Manage tags modal tags
  const [tagRoleIds, setTagRoleIds] = useState<string[] | null>(null);            // Tag from a row menu: just that role (null = the selection)
  const [menu, setMenu] = useState<{ role: RoleRow; top: number; right: number; up: boolean } | null>(null);
  const [tagPrefill, setTagPrefill] = useState<TagPrefill | undefined>();
  const [tags, setTags] = useState<Record<string, string>>(initialTags);
  const [engTags, setEngTags] = useState<Record<string, string>>(initialEngagementTags);
  // Suggested WMs: the Suggest side panel writes them here (role id → WMs); roles never opened keep their own `suggested`
  const [suggestedBy, setSuggestedBy] = useState<Record<string, SuggestCandidate[]>>(initialSuggested);
  const [suggestRole, setSuggestRole] = useState<RoleRow | null>(null);
  const allCandidates = [...(suggestCandidates.shortlist ?? []), ...(suggestCandidates.matches ?? []), ...(suggestCandidates.other ?? [])];
  const candidateOf = (id: string, name: string, rank?: string): SuggestCandidate => {
    const known = allCandidates.find(c => c.name === name);
    return known ?? { id, name, initials: name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(), rank };
  };
  const suggestedFor = (role: RoleRow): SuggestCandidate[] => {
    const own = suggestedBy[role.id] ?? (role.suggested ? [candidateOf(`s-${role.id}`, role.suggested.name, role.suggested.rank)] : []);
    // A booked or confirmed role always has someone in Suggested WM: with no suggestion of its own it shows the person booked on it
    if (own.length === 0 && isBookedState(role) && role.booked) return [candidateOf(`b-${role.id}`, role.booked.name, role.requestedRank)];
    return own;
  };
  const suggestCtx: SuggestCtx = { valueFor: suggestedFor, open: setSuggestRole };
  // Open / close the panel on command (also applied when the screen mounts with one), and report every change
  useEffect(() => {
    if (!suggestCommand) return;
    setSuggestRole(suggestCommand.roleId ? groups.flatMap(g => g.roles).find(r => r.id === suggestCommand.roleId) ?? null : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestCommand?.n]);
  useEffect(() => { onSuggestOpenChange?.(suggestRole?.id ?? null); }, [suggestRole?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  // Flow map / prototypes: select what the command says and open Manage tags (prefilled)
  useEffect(() => {
    if (!tagCommand?.open) return;
    if (tagCommand.select) { setSelected(new Set(tagCommand.select.keys)); setMode(tagCommand.select.kind); }
    setTagPrefill(tagCommand.prefill);
    setTagTarget("roles");
    setTagging(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagCommand?.n]);
  const showAvailability = availability ?? selectable;
  const rolesWithSuggestion = groups.flatMap(g => g.roles).filter(r => suggestedFor(r).length > 0).length;
  // Width of the availability pane, shared by every group so dragging one divider resizes them all
  // Booked WM (and Delta) need room in the roles table, so the weeks pane opens on two weeks (one with both) instead of four (drag the divider to widen it)
  const hasBooked = groups.some(g => g.roles.some(r => r.availability));
  const hasDelta = hasBooked;
  const [availabilityWidth, setAvailabilityWidth] = useState(hasBooked && hasDelta ? WEEK_W + ACTIONS_W : hasBooked ? WEEK_W * 2 + ACTIONS_W : DEFAULT_AVAILABILITY_W);

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
  // The actions apply to the roles in the selection: the picked roles, or every role inside the picked engagements.
  // The banner counts what was picked (engagements or roles); the modal always counts roles.
  const selectedRoles = groups.flatMap(g => g.roles).filter(r => roleInSelection(selection, r));
  const selectedCount = selected.size;

  const applyTag = (r: TagRolesResult) => {
    const engagements = tagTarget === "engagements" ? [...selected] : [];
    const targetRoles = tagRoleIds ? groups.flatMap(g => g.roles).filter(x => tagRoleIds.includes(x.id)) : selectedRoles;
    if (tagTarget === "engagements") setEngTags(prev => ({ ...prev, ...Object.fromEntries(engagements.map(e => [e, r.tag])) }));
    else setTags(prev => ({ ...prev, ...Object.fromEntries(targetRoles.map(x => [x.id, r.tag])) }));
    setTagging(false);
    onTagged?.({ tag: r.tag, roles: targetRoles.length, roleIds: targetRoles.map(x => x.id), notified: r.notify, target: tagTarget, engagements });
    if (!tagRoleIds) clearSelection();
    setTagRoleIds(null);
  };
  const openTagging = (target: "roles" | "engagements") => { setTagTarget(target); setTagRoleIds(null); setTagPrefill(undefined); setTagging(true); };

  // Row menu: opens under its button (above it near the bottom of the screen)
  const openRowMenu = (role: RoleRow, anchor: HTMLElement) => {
    const r = anchor.getBoundingClientRect();
    setMenu(m => (m?.role.id === role.id ? null : { role, top: r.bottom + 4, right: window.innerWidth - r.right, up: r.bottom + 230 > window.innerHeight }));
  };
  const onRowMenuAction = (action: RowMenuAction) => {
    const role = menu!.role;
    setMenu(null);
    if (action === "duplicate") {
      const id = `${role.id}-copy-${++dupSeq.current}`;
      // A copy starts over: back to Shortlisting, nobody booked (no Booked WM, no booked hours: its Delta is its requested hours, negative)
      const copy: RoleRow = { ...role, id, wfState: "shortlisting", booked: role.booked === undefined ? undefined : null, bookedHours: role.bookedHours === undefined ? undefined : 0 };
      setDups(d => [...d, { id, afterId: role.id, role: copy }]);
      setFreshRow(id);
      setTimeout(() => setFreshRow(f => (f === id ? null : f)), 1100);
    } else if (action === "delete") {
      setDeleted(d => new Set(d).add(role.id));
      if (selected.has(role.id)) { const next = new Set(selected); next.delete(role.id); setSelected(next); if (!next.size) setMode(null); }
    } else if (action === "tag") {
      setTagTarget("roles"); setTagRoleIds([role.id]); setTagPrefill(undefined); setTagging(true);
    }
    onRowAction?.({ action, roleId: role.id });
  };

  return (
    <BookedUnbookContext.Provider value={onUnbook ? (r => r.booked && onUnbook({ roleId: r.id, name: r.booked.name })) : undefined}>
    <SuggestContext.Provider value={suggestCtx}>
    <HoursEditsContext.Provider value={hoursEdits}>
    <FreshRowContext.Provider value={freshRow}>
    <RowMenuContext.Provider value={rowActions === "roles" ? openRowMenu : null}>
    <style>{ROW_ANIM_CSS}</style>
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
                  rightContent={(mode === "role" ? ROLE_ACTIONS : ENGAGEMENT_ACTIONS).map(a => (
                    <Tooltip key={a.id} content={a.label} placement="up-center" maxWidth={240}>
                      <Button kind="iconGhost" size="regular" onClick={a.id === "tag-roles" || (a.id === "tag" && mode === "role") ? () => openTagging("roles") : a.id === "tag" ? () => openTagging("engagements") : undefined}>
                        <Icon name={a.id} size={16} />
                        <span style={srOnly}>{a.label}</span>
                      </Button>
                    </Tooltip>
                  ))}
                />
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 8, flexShrink: 0 }}>
            <h1 style={{ fontFamily: "var(--font-family)", fontSize: 28, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "125%" }}>
              {title}
            </h1>
            {onOpenInBookingEngine && (
              <Button kind="secondary" size="regular" onClick={() => onOpenInBookingEngine(groups.flatMap(g => g.roles).map(r => r.id))}>Open in Booking Engine</Button>
            )}
          </div>

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

            <div style={{ ...labelCss, margin: header ? "12px 0 16px" : "0 0 16px", flexShrink: 0 }}>{counter}</div>

            {groups.map((g, i) => (
              <RoleGroup key={g.name + i} name={g.name} roles={g.roles} showExtraColumns={g.roles.some(r => r.extraColumns)} rowActions={rowActions} selection={selection} selectable={selectable} tags={tags} engagementTags={engTags} availability={availability ?? selectable} weeks={weeks} availabilityWidth={availabilityWidth} onAvailabilityWidth={setAvailabilityWidth} onAvailabilityChange={trackHours} />
            ))}

            <div style={{ flex: 1, minHeight: 24 }} />
          </Tile>

          <div style={{ height: 24, flexShrink: 0 }} />
        </div>

        <Actions
          variant="sticky-screen"
          insetX={32}
          // DTT (template editor) still has a pending Save, so it keeps "Cancel"; the engagement variants save per row, so the button just leaves: "Close"
          leftActions={[{ label: rowActions === "dtt" ? "Cancel" : "Close", variant: "secondary", onClick: onBack }]}
          // Engagement tables: "All roles saved" before the button, and the button counts the roles that already have a suggested WM
          infoText={showAvailability ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Icon name="check" size={16} style={{ color: "var(--palette-green-0)" }} />
              All roles saved
            </span>
          ) : undefined}
          rightActions={[{ label: showAvailability ? `${saveLabel} (${rolesWithSuggestion})` : saveLabel, variant: "primary", onClick: onSave }]}
        />
      </div>

      <ManageTagsModal open={tagging} prefill={tagPrefill} unit={tagTarget === "engagements" ? "engagement" : "role"} count={tagTarget === "engagements" ? selected.size : tagRoleIds ? tagRoleIds.length : selectedRoles.length} onClose={() => { setTagging(false); setTagRoleIds(null); }} onUpdate={applyTag} tagOptions={tagOptions} peopleOptions={peopleOptions} defaultNotify={defaultNotify} />
      <SuggestSidePanel
        open={!!suggestRole}
        onClose={() => setSuggestRole(null)}
        roleTitle={suggestRole?.title ?? ""}
        vacancies={suggestRole?.vacancies ?? 1}
        requestedRank={suggestRole?.requestedRank}
        shortlist={suggestCandidates.shortlist}
        matches={suggestCandidates.matches}
        other={suggestCandidates.other}
        suggested={suggestRole ? suggestedFor(suggestRole) : []}
        onDone={list => {
          if (!suggestRole) return;
          setSuggestedBy(prev => ({ ...prev, [suggestRole.id]: list }));
          onSuggestedChange?.({ roleId: suggestRole.id, suggested: list });
        }}
      />

      {/* Row menu: drawn in body (fixed) so the tables' scroll panes can't clip it */}
      {menu && createPortal(
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 9500 }} onClick={() => setMenu(null)} onContextMenu={e => { e.preventDefault(); setMenu(null); }} />
          <div role="menu" aria-label="Row actions" style={{ position: "fixed", zIndex: 9501, right: menu.right, minWidth: 180, ...(menu.up ? { bottom: window.innerHeight - menu.top + 32 } : { top: menu.top }) }}>
            <DropdownActions items={ROW_MENU_ITEMS} onSelect={id => onRowMenuAction(id as RowMenuAction)} />
          </div>
        </>,
        document.body,
      )}
    </div>
    </RowMenuContext.Provider>
    </FreshRowContext.Provider>
    </HoursEditsContext.Provider>
    </SuggestContext.Provider>
    </BookedUnbookContext.Provider>
  );
}
