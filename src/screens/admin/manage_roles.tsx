// Screens/ManageRoles — Manage roles (Edit Project Team Template / engagement roles)
//
// Reusable screen: the Storybook stories (admin/manage_roles.stories.tsx) and the standalone bundle (IPS.ManageRolesScreen,
// used by prototypes) render this component with their own data.
//
// Selection (engagement roles): checkbox on the header, on each merged engagement cell and on each role. Engagement and role
// selection are mutually exclusive: ticking an engagement leaves its roles unticked and disabled, but the actions still apply to the
// roles inside it. Selecting rows shows a 600px bulk banner centred in the page header row with ghost icon buttons:
// engagements selected = tag-roles, tag, owner; roles selected = tag, tag-engagements (the engagements those roles belong to), owner.
// They open "Manage tags" (src/modals/manage_tags, Storybook: Modals / Manage tags; Figma "Tag roles" 2738:67102).
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

import { Fragment, createContext, useContext, useEffect, useRef, useState } from "react";
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
import { InputSelect } from "../../components/input/input";
import { DropdownActions, DropdownSelection } from "../../components/dropdown/dropdown";
import { ManageTagsModal, DEFAULT_TAG_OPTIONS, DEFAULT_PEOPLE_OPTIONS } from "../../modals/manage_tags/manage_tags_modal";
import type { TagRolesResult, TagPrefill } from "../../modals/manage_tags/manage_tags_modal";
import { SuggestSidePanel } from "../../components/side_panel/suggest_side_panel";
import { BookingCell } from "../../components/booking_cell/booking_cell";
import type { BookingCellCategory } from "../../components/booking_cell/booking_cell";
import { OverbookingSidePanel } from "../../components/side_panel/overbooking_side_panel";
import type { OverbookingItem } from "../../components/side_panel/overbooking_side_panel";
import { ProfileSidePanel } from "../../components/side_panel/profile_side_panel";
import { SAMPLE_PROFILE } from "../../components/side_panel/profile_side_panel";
import type { ProfileSidePanelData } from "../../components/side_panel/profile_side_panel";
import { RoleSidePanel } from "../../components/side_panel/role_side_panel";
import type { RoleSidePanelData } from "../../components/side_panel/role_side_panel";
import { EngagementSidePanel } from "../../components/side_panel/engagement_side_panel";
import type { EngagementSidePanelData } from "../../components/side_panel/engagement_side_panel";
import { MisalignmentSidePanel } from "../../components/side_panel/misalignment_side_panel";
import type { MisalignmentSidePanelData } from "../../components/side_panel/misalignment_side_panel";
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
  // One flow: the text and the "Add" link wrap together (two lines at most in these narrow columns, so the 60px rows hold it)
  return (
    <div style={{ fontSize: 12, lineHeight: "18px" }}>
      {value ? <span style={{ ...body, fontWeight: 700, fontSize: 12, lineHeight: "18px" }}>{value}</span> : <span style={{ ...muted, lineHeight: "18px" }}>{emptyLabel}</span>}{" "}
      <button style={{ ...linkCss, lineHeight: "18px", verticalAlign: "top" }}>Add</button>
    </div>
  );
}

// Clicking a text field cell focuses it and selects all of its text (the mouse-up that ends the click would clear the selection, so it is swallowed once).
// The focus look (outer ring on the cell border) is CSS: `.mr-field:focus` inside `.mr-edit` / `.mr-cell`, see FOCUS_CSS.
function useSelectAll<T extends HTMLInputElement | HTMLTextAreaElement>() {
  const fresh = useRef(false);
  return {
    className: "mr-field",
    onFocus: (e: React.FocusEvent<T>) => { fresh.current = true; e.target.select(); },
    onMouseUp: (e: React.MouseEvent<T>) => { if (fresh.current) { e.preventDefault(); fresh.current = false; } },
    onBlur: () => { fresh.current = false; },
  };
}

// ── Editable text cell ────────────────────────────────────────────────────────

// A text field that wraps instead of cropping: it is a textarea that grows with its content (one line high when short), Enter does not add a line break.
function EditableTextCell({ defaultValue = "" }: { defaultValue?: string }) {
  const [val, setVal] = useState(defaultValue);
  const ref = useRef<HTMLTextAreaElement>(null);
  const sel = useSelectAll<HTMLTextAreaElement>();
  // A one-line title is centred in 32px (6px padding); a two-line one drops the padding so it still fits the 60px rows
  const fit = () => { const t = ref.current; if (t) { t.style.padding = "6px 4px"; t.style.height = "auto"; if (t.scrollHeight > 32) { t.style.padding = "1px 4px"; t.style.height = "auto"; } t.style.height = `${t.scrollHeight}px`; } };
  useEffect(fit, [val]);
  useEffect(() => { document.fonts?.ready.then(fit); }, []);   // the web font changes how the text wraps: measure again once it is loaded
  return (
    <textarea
      ref={ref}
      rows={1}
      {...sel}
      value={val}
      onChange={e => setVal(e.target.value.replace(/\n/g, " "))}
      onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); (e.target as HTMLTextAreaElement).blur(); } }}
      style={{ display: "block", width: "100%", minHeight: 32, resize: "none", overflow: "hidden", boxSizing: "border-box", border: "none", borderBottom: "1px solid transparent", background: "transparent", fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, lineHeight: "20px", color: "var(--palette-blue-0)", outline: "none", padding: "6px 4px", borderRadius: 0, overflowWrap: "anywhere" }}
    />
  );
}

// Engagement cell of the role-rows layout: a select (value + chevron), not a text field. The list opens in a portal so the table's scroll pane cannot clip it.
function EngagementSelectCell({ value: val, onChange, options, tags }: { value: string; onChange: (engagement: string) => void; options: string[]; tags: Record<string, string> }) {
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const items = (options.includes(val) || !val ? options : [val, ...options]).map(o => ({ id: o, label: o }));
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pos) { setPos(null); return; }
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ top: r.bottom + 4, left: r.left, width: r.width });
  };
  return (
    <>
      <button type="button" className="mr-field" title={val} aria-haspopup="listbox" aria-expanded={!!pos} onClick={toggle}
        style={{ display: "flex", alignItems: "center", width: "100%", height: 32, padding: "0 4px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}>
        <span style={{ ...bodyBold, fontSize: 14, lineHeight: "20px", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</span>
        <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)", flexShrink: 0, marginLeft: 4 }} />
      </button>
      {tags[val] && <div style={{ padding: "4px 4px 0" }}><PillSimple label={tags[val]} size="small" leftIcon="tag" /></div>}
      {pos && createPortal(
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 9500 }} onClick={() => setPos(null)} />
          <div style={{ position: "fixed", zIndex: 9501, top: pos.top, left: pos.left, minWidth: pos.width, width: "max-content", maxWidth: 480 }}>
            <DropdownSelection items={items} selectedId={val} onSelect={id => { onChange(id); setPos(null); }} />
          </div>
        </>,
        document.body,
      )}
    </>
  );
}

// The "open" button of the Role / Engagement cells: the IPS Button (icon tertiary, small, icon only), shown on hover at the right end of the first line;
// the text fades out under it
function OpenButton({ label, onClick, right = 0 }: { label: string; onClick?: () => void; right?: number }) {
  return (
    <div className="mr-open-wrap" style={{ position: "absolute", top: 0, right, height: 32, display: "flex", alignItems: "center", paddingLeft: 28, paddingRight: 4 }}>
      <Button kind="iconTertiary" size="small" title={label} onClick={onClick}>
        <Icon name="open" size={16} />
      </Button>
    </div>
  );
}

// ── Editable number cell ──────────────────────────────────────────────────────

function EditableNumberCell({ defaultValue = 1 }: { defaultValue?: number }) {
  const [val, setVal] = useState(defaultValue.toString());
  const sel = useSelectAll<HTMLInputElement>();
  return (
    <input
      {...sel}
      type="number"
      value={val}
      onChange={e => setVal(e.target.value)}
      style={{ width: "100%", height: 32, border: "none", borderBottom: "1px solid transparent", background: "transparent", fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", outline: "none", padding: "0 4px", borderRadius: 0 }}
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

const SUGGESTED_W = 300;   // pills (× avatar name + icons) and the Edit link

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

// ── People on a role: who is suggested and who is booked ─────────────────────────────────────────────────────────────
// One entry per name (a person can be both). Their schedule comes from their own booking or from the screen's `schedules` by name.

type WMPerson = { name: string; rank?: string; candidateId?: string; suggested: boolean; booked?: BookedWM; schedule?: BookedScheduleItem[]; capacity?: number };
type RolePeople = { suggested: WMPerson[]; booked: WMPerson[]; all: WMPerson[] };
function buildRolePeople(role: RoleRow, suggested: { id?: string; name: string; rank?: string }[], schedules: Record<string, WMSchedule> = {}): RolePeople {
  const booked = bookedOf(role);
  const make = (name: string, rank: string | undefined, id: string | undefined, isSuggested: boolean): WMPerson => {
    const b = booked.find(x => x.name === name);
    const known = schedules[name];
    return { name, rank, candidateId: id, suggested: isSuggested, booked: b, schedule: b?.schedule ?? known?.schedule, capacity: b?.capacity ?? known?.capacity };
  };
  const sug = suggested.map(x => make(x.name, x.rank, x.id, true));
  const bk = booked.map(b => make(b.name, undefined, undefined, sug.some(x => x.name === b.name)));
  return { suggested: sug, booked: bk, all: [...sug, ...bk.filter(b => !sug.some(x => x.name === b.name))] };
}
// What the pills do comes from the screen (it owns the suggestions, the schedules and the side panels)
type WMActions = {
  peopleOf: (role: RoleRow) => RolePeople;
  /** Week labels in which the person is over capacity on this role (empty = none) */
  overWeeks: (role: RoleRow, person: WMPerson) => string[];
  openProfile: (name: string) => void;
  openOverbooking: (roleId: string, name: string) => void;
  openMisalignment: (roleId: string, name: string) => void;
  removeSuggested: (role: RoleRow, candidateId: string) => void;
};
const WMContext = createContext<WMActions>({
  peopleOf: role => buildRolePeople(role, role.suggested ? [{ name: role.suggested.name, rank: role.suggested.rank }] : []),
  overWeeks: () => [], openProfile: () => {}, openOverbooking: () => {}, openMisalignment: () => {}, removeSuggested: () => {},
});

const initialsOf = (name: string) => name.split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase();
const BookedUnbookContext = createContext<((role: RoleRow, name: string) => void) | undefined>(undefined);

// Workforce members whose schedule is shown (`roleId|name`): the eye button of their pill (Suggested or Booked WM) toggles it, the roles table and the availability table both add the rows
// `hours` / `edit`: the cells are editable like the Booking Engine grid; the screen keeps what was typed (role id → schedule row id → week → hours)
const ScheduleContext = createContext<{ open: Set<string>; toggle: (roleId: string, name: string) => void; hours: (roleId: string, item: BookedScheduleItem, week: number) => number | null; edit: (change: ScheduleChange) => void }>(
  { open: new Set(), toggle: () => {}, hours: (_r, item, w) => item.hours[w] ?? null, edit: () => {} },
);
const SCHEDULE_ROW_H = 52;
const SCHEDULE_NAME_W = 170;      // width of the floating name next to the role names
const SCHEDULE_LABEL_W = 340;     // ... and of the role-name block (fixed, so the names line up)
const BOOKED_PILL_H = 34;         // height of a workforce member pill (avatar + 1px border); a row holding n pills is 16 + n pills + gaps high
const BOOKED_GAP = 4;
const scheduleKey = (roleId: string, name: string) => `${roleId}|${name}`;
/** Who is booked on the role: nobody unless it is confirmed or booked */
const bookedOf = (role: RoleRow): BookedWM[] => !role.booked || !isBookedState(role) ? [] : Array.isArray(role.booked) ? role.booked : [role.booked];
/** Height of a role's row (both tables): 60px, or taller when several pills stack in its Suggested / Booked WM cell */
const rowHeightOf = (rp: RolePeople) => { const n = Math.max(rp.suggested.length, rp.booked.length); return Math.max(ROW_H, 16 + n * BOOKED_PILL_H + Math.max(0, n - 1) * BOOKED_GAP + 1); };
/** A row under a role while a person's schedule is shown (named in the block on the left, merged over their rows): the role itself (their hours on it), then their other roles, or a note when there are none */
type ScheduleEntry = { key: string; kind: "own" | "other" | "none"; person: WMPerson; item?: BookedScheduleItem; /** first row of the person's group, and how many rows the group has */ groupSize?: number };
function scheduleRowsOf(role: RoleRow, rp: RolePeople, open: Set<string>): ScheduleEntry[] | null {
  const out: ScheduleEntry[] = [];
  rp.all.forEach(person => {
    if (!open.has(scheduleKey(role.id, person.name))) return;
    const items = person.schedule ?? [];
    const from = out.length;
    out.push({ key: `${person.name}:own`, kind: "own", person });
    items.forEach(item => out.push({ key: `${person.name}:${item.id}`, kind: "other", person, item }));
    if (!items.length) out.push({ key: `${person.name}:none`, kind: "none", person });
    out[from].groupSize = out.length - from;
  });
  return out.length ? out : null;
}
const scheduleRowCount = (role: RoleRow, rp: RolePeople, open: Set<string>) => scheduleRowsOf(role, rp, open)?.length ?? 0;
/** Hours requested on the role in a week (what the availability cell shows, including what was typed) */
function ownHoursOf(role: RoleRow, week: number, edits: Record<string, Record<number, number | null>>): number | null {
  const e = edits[role.id];
  if (e && week in e) return e[week];
  const c = role.availability?.[week];
  return c == null ? null : typeof c === "number" ? c : c.hours;
}
/** Booking colour of the role's own row: the colour of its booking category (blue by default) */
const ownCategory = (role: RoleRow): BookingCellCategory => { const c = role.bookingCategory?.category; return c === "booking-red" ? "red" : c === "booking-purple" ? "purple" : "blue"; };
const sumHours = (h: (number | null)[]) => h.reduce<number>((n, x) => n + (x ?? 0), 0);
/** A person's starting hours on the role in a week: their own booking hours; else the requested hours (live) when there is one person (or one booked) on the role, or the requested hours split evenly between the people booked */
function ownBaseHours(role: RoleRow, rp: RolePeople, person: WMPerson, week: number, edits: Record<string, Record<number, number | null>>): number | null {
  if (person.booked?.hours) return person.booked.hours[week] ?? null;
  const slots = rp.booked.length || rp.all.length || 1;
  if (slots === 1) return ownHoursOf(role, week, edits);
  const c = role.availability?.[week];
  const h = c == null ? null : typeof c === "number" ? c : c.hours;
  return h == null ? null : Math.round(h / slots);
}
/** A person's hours on the role in a week: what was typed in their own schedule row, otherwise their starting hours. Editing the schedule row never touches the availability cells above. */
function personRoleHours(role: RoleRow, rp: RolePeople, person: WMPerson, week: number, edits: Record<string, Record<number, number | null>>, scheduleHours: (roleId: string, item: BookedScheduleItem, week: number) => number | null): number | null {
  const item: BookedScheduleItem = { id: `own-${person.name}`, roleName: role.title, engagement: role.engagement ?? "", hours: Array.from({ length: week + 1 }, (_, w) => ownBaseHours(role, rp, person, w, edits)) };
  return scheduleHours(role.id, item, week);
}

const pillIconBtn: React.CSSProperties = { width: 20, height: 20, padding: 0, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-0)", flexShrink: 0 };

/** A workforce member as a pill (the removable Pill look: neutral-1 fill, 1px neutral-0 border): [×] avatar name [misalignment] [overbooking] [eye = schedule] [open = profile] */
function WMPill({ name, rank, onRemove, removeLabel, shown, onToggle, onOpen, onMisalign, over, staticOverWeeks }: {
  name: string; rank?: string;
  onRemove?: () => void; removeLabel?: string;
  shown: boolean; onToggle: () => void; onOpen: () => void;
  /** Booking Engine's calendar-misaligned icon: opens the Misalignments panel */
  onMisalign?: () => void;
  /** Potential overbooking in these weeks: the warning icon (tooltip lists the weeks), a button opening the Potential overbookings panel when it has a handler */
  over?: { weeks: string[]; onClick?: () => void };
  /** Overbooking told by the data but not calculable (no schedule): the warning icon only */
  staticOverWeeks?: string[];
}) {
  const weeks = over?.weeks.length ? over : staticOverWeeks?.length ? { weeks: staticOverWeeks, onClick: undefined } : null;
  return (
    <span title={rank} style={{ display: "inline-flex", alignItems: "center", gap: 6, maxWidth: "100%", boxSizing: "border-box", height: BOOKED_PILL_H, padding: onRemove ? "0 6px" : "0 6px 0 4px", verticalAlign: "middle", borderRadius: "var(--radius-2xl, 32px)", background: "var(--palette-neutral-1)", border: "1px solid var(--palette-neutral-0)" }}>
      {onRemove && (
        <button type="button" title={`Remove ${name}`} aria-label={removeLabel ?? `Remove ${name}`} onClick={onRemove} style={pillIconBtn}>
          <Icon name="cross" size={16} />
        </button>
      )}
      <Avatar initials={initialsOf(name)} size="small" />
      <span style={{ ...body, fontWeight: 700, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
      {onMisalign && (
        <button type="button" title="Show misalignments" aria-label={`Show misalignments of ${name}`} onClick={onMisalign} style={pillIconBtn}>
          <Icon name="calendar-misaligned" size={14} style={{ color: "var(--palette-orange-3)" }} />
        </button>
      )}
      {weeks && (
        // portal: the table pane scrolls (overflow), which would cut a normal tooltip off at the cell edge
        <Tooltip portal placement="up-right" maxWidth={320} content={
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <strong>Potential overbooking</strong>
            <span>Weeks affected:</span>
            {weeks.weeks.map(w => <span key={w}>{w}</span>)}
          </span>
        }>
          {weeks.onClick
            ? <button type="button" aria-label={`Show potential overbookings of ${name}`} onClick={weeks.onClick} style={pillIconBtn}><Icon name="warning" size={16} style={{ color: "var(--palette-orange-1)" }} /></button>
            : <span aria-label="Potential overbooking" style={{ display: "inline-flex", cursor: "default", flexShrink: 0 }}><Icon name="warning" size={16} style={{ color: "var(--palette-orange-1)" }} /></span>}
        </Tooltip>
      )}
      {/* Schedule: the "hidden" eye turns into "shown" while this person's bookings are listed under the role (each person has their own eye) */}
      <button type="button" aria-pressed={shown} title={shown ? "Hide schedule" : "Show schedule"} aria-label={shown ? `Hide schedule of ${name}` : `Show schedule of ${name}`} onClick={onToggle} style={pillIconBtn}>
        <Icon name={shown ? "shown" : "hidden"} size={16} />
      </button>
      <button type="button" title="Open profile" aria-label={`Open profile of ${name}`} onClick={onOpen} style={pillIconBtn}>
        <Icon name="open" size={16} />
      </button>
    </span>
  );
}

// ── Suggested workforce member cell — pills (removable, schedule eye, open profile) + an Edit link that opens the Suggest panel; empty = warning background ──────

function SuggestedWMCell({ role }: { role: RoleRow }) {
  const ctx = useContext(SuggestContext);
  const wm = useContext(WMContext);
  const schedule = useContext(ScheduleContext);
  const rp = wm.peopleOf(role);
  const empty = rp.suggested.length === 0;
  return (
    // The empty state uses the warning yellow (palette-orange-2)
    <td style={{ ...tdStyle, padding: 8, background: empty ? "var(--palette-orange-2)" : undefined }} title={empty ? "No suggested workforce member" : undefined}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: BOOKED_GAP, minWidth: 0, flex: 1 }}>
          {rp.suggested.map(person => {
            const weeks = wm.overWeeks(role, person);
            return (
              <WMPill key={person.name} name={person.name} rank={person.rank}
                // a booked or confirmed role always shows someone: its suggestions cannot be emptied
                onRemove={isBookedState(role) || !person.candidateId ? undefined : () => wm.removeSuggested(role, person.candidateId!)}
                removeLabel={`Remove suggested workforce member ${person.name}`}
                shown={schedule.open.has(scheduleKey(role.id, person.name))} onToggle={() => schedule.toggle(role.id, person.name)}
                onOpen={() => wm.openProfile(person.name)}
                over={weeks.length ? { weeks, onClick: () => wm.openOverbooking(role.id, person.name) } : undefined} />
            );
          })}
        </div>
        <span style={{ flexShrink: 0, marginTop: 7 }}><Button kind="link" size="small" onClick={() => ctx?.open(role)}>{empty ? "Add" : "Edit"}</Button></span>
      </div>
    </td>
  );
}

// ── Booked workforce member cell — the same pills (the × unbooks), plus the misalignment icon ──────────────────────────

const BOOKED_W = 300;   // pill with × avatar name, misalignment, overbooking, eye and open icons

function BookedWMCell({ role }: { role: RoleRow }) {
  const unbook = useContext(BookedUnbookContext);
  const schedule = useContext(ScheduleContext);
  const wm = useContext(WMContext);
  const rp = wm.peopleOf(role);
  return (
    <td style={{ ...readOnlyTd, padding: "8px", verticalAlign: "top", whiteSpace: "nowrap" }}>
      {/* One pill per booked person, stacked: the row grows with them (see rowHeightOf) */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: BOOKED_GAP }}>
        {rp.booked.map(person => {
          const weeks = wm.overWeeks(role, person);
          return (
            <WMPill key={person.name} name={person.name}
              onRemove={() => unbook?.(role, person.name)} removeLabel={`Remove booked workforce member ${person.name}`}
              shown={schedule.open.has(scheduleKey(role.id, person.name))} onToggle={() => schedule.toggle(role.id, person.name)}
              onOpen={() => wm.openProfile(person.name)}
              onMisalign={person.booked?.misalignment ? () => wm.openMisalignment(role.id, person.name) : undefined}
              over={weeks.length ? { weeks, onClick: () => wm.openOverbooking(role.id, person.name) } : undefined}
              staticOverWeeks={person.booked?.overbooking?.weeks} />
          );
        })}
      </div>
    </td>
  );
}

// ── Editable hours cell (availability table) — Figma "Input week time rule" 2757:286931 ───────────────────────────────
// Default: the value, centred. Hover: grey cell (rgba(0,0,0,.04)) with the value in an 8px-radius pill (1px neutral-0 border).
// Focused (typing): white cell with a 2px navy border (blue-1), the pill turns light blue (primary-3).

// Drag fill: press on a cell and drag over others; the covered rectangle gets a blue outline and, on release, every cell in it takes the value of the cell the drag started from.
type FillEdges = { top: boolean; bottom: boolean; left: boolean; right: boolean };
const FILL_BLUE = "var(--palette-primary-0)";

function HoursTd({ defaultValue, flag, onFlagClick, onChange, fill, fillEdges, dragging, onDragStart, onDragEnter }: {
  defaultValue?: number; flag?: "error" | "warning"; onFlagClick?: () => void; onChange?: (hours: number | null) => void;
  /** A value pushed in from outside (drag fill): `n` changes every time, `v` is the text to show */
  fill?: { n: number; v: string };
  /** Edges of the drag rectangle that run along this cell (null = the cell is not inside it) */
  fillEdges?: FillEdges | null; dragging?: boolean;
  onDragStart?: () => void; onDragEnter?: () => void;
}) {
  const [val, setVal] = useState(defaultValue == null ? "" : String(defaultValue));
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const fresh = useRef(false);     // the click that focused the field: its mouse-up must not clear the "select all"
  useEffect(() => { if (fill) setVal(fill.v); }, [fill?.n]); // eslint-disable-line react-hooks/exhaustive-deps
  const edge = (on: boolean, inset: string) => (on ? inset : null);
  const outline = fillEdges
    ? [edge(fillEdges.top, `inset 0 2px 0 0 ${FILL_BLUE}`), edge(fillEdges.bottom, `inset 0 -2px 0 0 ${FILL_BLUE}`), edge(fillEdges.left, `inset 2px 0 0 0 ${FILL_BLUE}`), edge(fillEdges.right, `inset -2px 0 0 0 ${FILL_BLUE}`)].filter(Boolean).join(", ")
    : undefined;
  return (
    <td
      onMouseEnter={() => { setHover(true); onDragEnter?.(); }}
      onMouseLeave={() => setHover(false)}
      onMouseDown={e => { if (e.button !== 0) return; onDragStart?.(); if (e.target !== input.current) { e.preventDefault(); input.current?.focus(); } }}
      style={{
        ...tdStyle, position: "relative", textAlign: "center", cursor: dragging ? "cell" : "text",
        background: fillEdges ? "var(--palette-white-0)" : focus ? "var(--palette-white-0)" : hover && !dragging ? "rgba(0, 0, 0, 0.04)" : undefined,
        boxShadow: outline ?? (focus ? "inset 0 0 0 2px var(--palette-blue-1)" : undefined),
      }}
    >
      {flag && (
        // Potential overbooking: an 8px bar on top of the cell (it overlays the cell, the row keeps its height). The press must not reach the cell, which would focus the field / start a drag fill.
        <button
          type="button" className="mr-flag" aria-label="Show potential overbookings" title="Potential overbooking"
          onMouseDown={e => e.stopPropagation()} onClick={onFlagClick}
          style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, padding: 0, border: "none", cursor: "pointer", background: flag === "error" ? "var(--palette-red-0)" : "var(--palette-orange-1)" }}   /* orange-1 = the warning icon of the panel */
        />
      )}
      <input
        ref={input}
        value={val}
        inputMode="numeric"
        aria-label="Requested hours"
        onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 3); setVal(v); onChange?.(v === "" ? null : Number(v)); }}
        onFocus={e => { setFocus(true); fresh.current = true; e.target.select(); }}
        onMouseUp={e => { if (fresh.current) { e.preventDefault(); fresh.current = false; } }}
        onBlur={() => { setFocus(false); fresh.current = false; }}
        style={{
          display: "block", width: "100%", height: 24, marginTop: 4, boxSizing: "border-box", textAlign: "center", outline: "none", padding: "0 8px",
          fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, lineHeight: "115%", color: "var(--palette-blue-0)",
          borderRadius: 8, border: "1px solid transparent",
          background: fillEdges ? "transparent" : focus ? "var(--palette-primary-3)" : hover && !dragging ? "rgba(0, 0, 0, 0.04)" : "transparent",
          borderColor: !fillEdges && (focus || (hover && !dragging)) ? "var(--palette-neutral-0)" : "transparent",
          pointerEvents: dragging ? "none" : undefined,
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
// Cells that cannot be edited (Tag, Workflow state, Delta, Booked WM, Clients) sit on the neutral light background, like the Delta cell and the merged engagement cell
const readOnlyTd: React.CSSProperties = { ...tdStyle, background: "var(--palette-neutral-2)" };

// ── Sticky table headers ──────────────────────────────────────────────────────
// The tables sit inside horizontal-scroll wrappers (overflow-x makes them clip vertically too) and inside a Tile with overflow:hidden, so a plain
// `position: sticky; top: 0` can never stick to the PAGE scroll. Instead, on page scroll we shift the header cells down by however far the table has
// scrolled past the top of the scroller (clamped so the header never leaves its own table). Both tables get the same offset, so they stay level.
function useStickyHeader() {
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    const table = ref.current;
    if (!table) return;
    const scroller: HTMLElement | Window = (table.closest("[data-sticky-scroll]") as HTMLElement | null) ?? window;
    const cells = () => Array.from(table.querySelectorAll<HTMLElement>("thead th"));
    const update = () => {
      const head = table.tHead;
      if (!head) return;
      const top = scroller instanceof Window ? 0 : scroller.getBoundingClientRect().top;
      const max = Math.max(0, table.offsetHeight - head.offsetHeight);
      const offset = Math.min(max, Math.max(0, top - table.getBoundingClientRect().top));
      cells().forEach(th => {
        th.style.transform = offset ? `translateY(${offset}px)` : "";
        th.style.boxShadow = offset ? "0 4px 6px -2px rgba(203,218,247,0.9)" : "";
      });
    };
    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    ro?.observe(table);
    return () => { scroller.removeEventListener("scroll", update); window.removeEventListener("resize", update); ro?.disconnect(); };
  }, []);
  return ref;
}

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
   *  `flag` draws an 8px red (error) or orange (warning) bar on top of the cell; clicking it opens the Potential overbookings side panel. */
  availability?: AvailabilityCell[];
  /** Suggested workforce member ("Suggested WM" column of the engagement tables). Missing / null = nobody suggested yet: the cell shows the warning background, except on a booked or confirmed role, which always shows someone (its own suggestion, else the booked WM). */
  suggested?: { name: string; rank?: string } | null;
  /** Booked workforce member ("Booked WM" column, right after Suggested WM in every engagement variant): who is booked. The pill only shows when the role's Workflow state is confirmed or booked; in any other state the cell stays empty. */
  booked?: BookedWM | BookedWM[] | null;
  /** Rank the role asks for: a suggested WM of that rank gets the green check in the Suggest side panel */
  requestedRank?: string;
  /** Hours booked on the role (confirmed and booked roles). Feeds the read-only **Delta** column of the engagement variants: requested hours (the sum of the
   *  availability cells, live while they are edited) minus these hours for confirmed and booked roles (negative = red-0, 0h = green-0); every other state has nothing booked, so its delta is the requested hours (always above 0h). */
  bookedHours?: number;
};

/** What the Potential overbookings side panel shows for a flagged week: the suggested workforce member's other commitments in that week, colliding with the role's availability rules.
 *  The overbooking is live: requested hours + the hours of `items` − `capacity`. Editing the requested hours down to (or under) the capacity makes it go away: the bar disappears. */
export type PotentialOverbooking = {
  /** The person's capacity for the week, in hours (default 40) */
  capacity?: number;
  /** The person's colliding bookings in that week (the role's own requested hours are added on top by the panel) */
  items: (OverbookingItem & { hours: number })[];
};
const DEFAULT_CAPACITY = 40;
const PILL_OF: Record<BookingCellCategory, BookingPillCategory> = { blue: "booking-blue", red: "booking-red", purple: "booking-purple", empty: "booking-blue" };
type OverbookingNow = { name?: string; over: number; level: "warning" | "error"; items: (OverbookingItem & { hours: number })[]; roleHours: number };
type ScheduleHoursFn = (roleId: string, item: BookedScheduleItem, week: number) => number | null;
type HoursEdits = Record<string, Record<number, number | null>>;
/** One person's potential overbooking on a role in one week, or null: their hours on this role + their hours on the other roles of their schedule − capacity. Needs a `schedule`; editing the schedule rows or the hours moves it. */
function personOverbooking(role: RoleRow, rp: RolePeople, person: WMPerson, week: number, scheduleHours: ScheduleHoursFn, edits: HoursEdits): OverbookingNow | null {
  if (!person.schedule) return null;
  const raw = role.availability?.[week];
  const cell = raw == null || typeof raw === "number" ? null : raw;
  const roleHours = personRoleHours(role, rp, person, week, edits, scheduleHours) ?? 0;
  if (!(roleHours > 0)) return null;
  const items = person.schedule
    .map(it => { const hours = scheduleHours(role.id, it, week) ?? 0; return { roleName: it.roleName, bookingLabel: `Booked ${hours}h`, bookingCategory: PILL_OF[it.category ?? "blue"], hours }; })
    .filter(i => i.hours > 0);
  const over = roleHours + items.reduce((n, i) => n + i.hours, 0) - (person.capacity ?? DEFAULT_CAPACITY);
  return over > 0 ? { name: person.name, over, level: cell?.flag ?? "warning", items, roleHours } : null;
}
/** The potential overbookings of a role in one week: one per person (suggested or booked) who is over capacity (empty = none). A role where nobody has a schedule falls back to the cell's own `overbooking` data. */
function overbookingsNow(role: RoleRow, rp: RolePeople, week: number, requested: number | null | undefined, scheduleHours: ScheduleHoursFn, edits: HoursEdits): OverbookingNow[] {
  const raw = role.availability?.[week];
  const cell = raw == null || typeof raw === "number" ? null : raw;
  const out = rp.all.map(p => personOverbooking(role, rp, p, week, scheduleHours, edits)).filter((x): x is OverbookingNow => !!x);
  if (!rp.all.some(p => p.schedule) && cell?.overbooking && requested && requested > 0) {
    const items = cell.overbooking.items;
    const over = requested + items.reduce((n, i) => n + i.hours, 0) - (cell.overbooking.capacity ?? DEFAULT_CAPACITY);
    if (over > 0) out.push({ over, level: cell.flag ?? "warning", items, roleHours: requested });
  }
  return out;
}

/** A week of the availability table. A potential overbooking draws an 8px bar on top of the cell: the warning icon colour of the panel (orange), or red (`error`) for a higher overbooking range (defined by the account). Clicking the bar opens the Potential overbookings side panel.
 *  Where the role has a booked member with a `schedule` the overbooking is calculated live; otherwise `flag` + `overbooking` describe it. */
/** A workforce member booked on a role. A role may have several (`booked` takes an array): each gets a pill in the Booked WM cell (the row grows) and an eye button of their own */
export type BookedWM = {
  name: string;
  /** Potential overbooking: an orange warning icon next to the pill; its tooltip says "Potential overbooking" and lists these weeks */
  overbooking?: { weeks: string[] };
  /** The person's schedule in the weeks of the availability table: the other roles / engagements they are booked on. Shown as rows under the role (and the grid on the right) when the eye button of their pill is switched on */
  schedule?: BookedScheduleItem[];
  /** The person's weekly capacity in hours (default 40). With a `schedule`, the potential overbooking of every week is live: their hours on this role + their hours on the other roles − capacity */
  capacity?: number;
  /** The booking is misaligned with the role: the calendar-misaligned icon shows in the pill, next to the name, like in the Booking Engine; clicking it opens the Misalignments side panel with this content */
  misalignment?: MisalignmentSidePanelData;
  /** The person's hours on this role per week column. A role with one booked person can leave it out (their hours start as the requested hours, following the availability cells until the schedule row is edited); with several people each needs their own (default: the requested hours split evenly). Editing the schedule row never changes the availability cells */
  hours?: (number | null)[];
};

/** A workforce member's schedule by name: used for the people suggested on a role (and as the fallback of a booked person without a schedule of their own) */
export type WMSchedule = { schedule: BookedScheduleItem[]; capacity?: number };

/** An hours cell of a schedule row was edited (the booked workforce member's booking on another role) */
export type ScheduleChange = { roleId: string; scheduleId: string; weekIndex: number; hours: number };

/** One role (of another engagement or the same one) the booked workforce member is booked on */
export type BookedScheduleItem = {
  id: string;
  roleName: string;
  engagement: string;
  /** Booking colour of the grid cells (default blue) */
  category?: BookingCellCategory;
  /** Hours booked per week, one entry per week column of the availability table (null / 0 = nothing) */
  hours: (number | null)[];
};

export type AvailabilityCell = number | { hours: number; flag?: "error" | "warning"; overbooking?: PotentialOverbooking } | null;

/** Reported while a requested-hours cell of the availability-rules table is edited (hours = null when the cell is emptied) */
export type AvailabilityChange = { roleId: string; weekIndex: number; hours: number | null };
type AvailabilityChangeHandler = (change: AvailabilityChange) => void;

/** Week columns of the availability-rules table (Figma "Manage roles" 2362:258886) */
export const DEFAULT_AVAILABILITY_WEEKS = [
  "5 - 9 Jan 2026", "12 - 16 Jan 2026", "19 - 22 Jan 2026", "25 - 29 Jan 2026", "2 - 6 Feb 2026", "9 - 13 Feb 2026",
];

// Row / header heights shared by the roles table and the availability table so their rows line up
const ROW_H = 60;
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
// Clicking the overbooking bar of a cell asks the screen to open the Potential overbookings panel for that role and week
const OverbookingOpenContext = createContext<((roleId: string, weekIndex: number) => void) | null>(null);
// Hours the user typed into the availability cells so far (role id → week index → hours), so Delta follows the edits
const HoursEditsContext = createContext<Record<string, Record<number, number | null>>>({});

const DELTA_W = 88;
/** Only a confirmed or booked role has someone booked: its Booked WM pill shows, and its Delta is requested − booked */
const isBookedState = (role: RoleRow) => role.wfState === "confirmed" || role.wfState === "booked";
/** Delta column. Confirmed and booked roles: requested − booked hours (negative = red-0, 0h = green-0, positive = neutral). Every other role has nothing booked yet, so its delta is simply the requested hours: always above 0h. */
function deltaHours(role: RoleRow, edits: Record<string, Record<number, number | null>>, missing = false): number {
  const cell = (c: AvailabilityCell | undefined) => (c == null ? 0 : typeof c === "number" ? c : c.hours);
  const requested = (role.availability ?? []).reduce<number>((n, c, i) => n + (edits[role.id] && i in edits[role.id] ? (edits[role.id][i] ?? 0) : cell(c)), 0)
    + Object.keys(edits[role.id] ?? {}).filter(k => Number(k) >= (role.availability?.length ?? 0)).reduce((n, k) => n + (edits[role.id][Number(k)] ?? 0), 0);
  // `missing` (deltaMissing): booked − requested for every role, so hours still to book show as a negative number (nothing booked: minus the requested hours)
  if (missing) return (isBookedState(role) ? role.bookedHours ?? 0 : 0) - requested;
  if (!isBookedState(role)) return requested;
  return requested - (role.bookedHours ?? 0);
}
/** deltaMissing: Delta is booked − requested, i.e. negative (red-0) while hours are missing */
const DeltaMissingContext = createContext(false);
const fmtDelta = (d: number) => `${d > 0 ? "+" : ""}${d}h`;

// Read-only, same look as the merged engagement title cell: neutral-2 background, regular weight
function DeltaCell({ role }: { role: RoleRow }) {
  const edits = useContext(HoursEditsContext);
  const d = deltaHours(role, edits, useContext(DeltaMissingContext));
  return (
    <td style={readOnlyTd}>
      {/* Bold; negative = red-0 (#D42A36), 0h = green-0 (#248E61), positive = neutral */}
      <span style={{ ...body, fontWeight: 700, lineHeight: "20px", color: d < 0 ? "var(--palette-red-0)" : d === 0 ? "var(--palette-green-0)" : "var(--palette-blue-0)" }}>{fmtDelta(d)}</span>
    </td>
  );
}
const RowMenuContext = createContext<((role: RoleRow, anchor: HTMLElement) => void) | null>(null);
// Entry animation of a duplicated row: it slides in from above while a blue tint fades out
// Hover of editable cells = the hover of an IPS input field (white-1). Role-rows layout: the Role / Engagement cells also show an "open" button on hover
// (the text fades out under it), and their grey fill covers the whole cell height.
const HOVER_CSS = `.mr-edit:hover { background-color: var(--palette-white-1); }
.mr-cell:hover .mr-fill { background-color: var(--palette-white-1); }
.mr-open-wrap { opacity: 0; pointer-events: none; transition: opacity 0.12s ease; background: linear-gradient(90deg, rgba(247,247,248,0), var(--palette-white-1) 55%); }
.mr-cell:has(.mr-field:focus) .mr-open-wrap { background: linear-gradient(90deg, rgba(255,255,255,0), var(--palette-white-0) 55%); }
.mr-cell:hover .mr-open-wrap, .mr-cell:focus-within .mr-open-wrap { opacity: 1; pointer-events: auto; }
.mr-flag { transition: filter 0.12s ease; }
.mr-flag:hover { filter: brightness(0.8); }
.mr-flag:focus-visible { outline: 2px solid var(--palette-blue-1); outline-offset: -2px; }
`;
// Focus of a text field cell: the white cell with a navy ring (the IPS input focus) drawn on the cell's own outer border
const FOCUS_CSS = `.mr-edit:has(.mr-field:focus), .mr-cell:has(.mr-field:focus) { background-color: var(--palette-white-0); box-shadow: inset 0 0 0 2px var(--palette-blue-1); }
.mr-cell:has(.mr-field:focus) .mr-fill { background-color: transparent; }   /* the cell itself is white: the fill must not cover the ring */
.mr-field:focus { outline: none; }`;
const ROW_ANIM_CSS = `@keyframes mr-row-in { 0% { opacity: 0; transform: translateY(-14px); background-color: var(--palette-primary-3); } 55% { opacity: 1; } 100% { opacity: 1; transform: none; } }
.mr-row-new { animation: mr-row-in 0.8s cubic-bezier(0.2, 0.7, 0.2, 1); }`;

function StickyActions({ variant = "dtt", role }: { variant?: RowActionsVariant; role?: RoleRow }) {
  const openMenu = useContext(RowMenuContext);
  // Vertical: the menu dots on top of the status circle (20px each, they fit the 60px rows)
  const menuBtn = (
    <button
      type="button" title="More actions" aria-label="More actions" aria-haspopup="menu"
      onClick={e => { if (variant === "roles" && role && openMenu) openMenu(role, e.currentTarget); }}
      style={{ width: 20, height: 20, flexShrink: 0, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-0)" }}
    >
      <Icon name="menu-vertical" size={14} />
    </button>
  );
  const roles = variant === "roles";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {menuBtn}
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, flexShrink: 0, borderRadius: "50%", background: roles ? "var(--palette-green-2)" : "var(--palette-neutral-1)" }}>
        <Icon name={roles ? "check" : "edit"} size={14} style={{ color: roles ? "var(--palette-green-0)" : "var(--palette-blue-0)" }} />
      </div>
    </div>
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

function RolesTable({ roles, showExtraColumns = false, rowActions = "dtt", selection, selectable = true, tags = {}, engagementTags = {}, availability = false, weeks = DEFAULT_AVAILABILITY_WEEKS, availabilityWidth = DEFAULT_AVAILABILITY_W, onAvailabilityWidth, onAvailabilityChange, roleRows = false, onOpenRole, onOpenEngagement, onEngagementChange }: { onEngagementChange?: (roleId: string, engagement: string) => void; engagementTags?: Record<string, string>; roles: RoleRow[]; showExtraColumns?: boolean; rowActions?: RowActionsVariant; selection: Selection; selectable?: boolean; tags?: Record<string, string>; availability?: boolean; weeks?: string[]; availabilityWidth?: number; onAvailabilityWidth?: (w: number) => void; onAvailabilityChange?: AvailabilityChangeHandler; roleRows?: boolean; onOpenRole?: (roleId: string) => void; onOpenEngagement?: (engagement: string) => void }) {
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const paneRef = useRef<HTMLDivElement>(null);
  const stickyRef = useStickyHeader();
  // The merged Engagement column only exists when the roles belong to engagements (not on the template editor)
  const hasEngagement = roles.some(r => r.engagement);
  // Role-rows layout: no merged engagement cell. Role (checkbox + title) is the first column, Engagement the second: one line, editable, one per row.
  const mergedEngagement = hasEngagement && !roleRows;
  const engagementColumn = hasEngagement && roleRows;
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
  const scheduleCtx = useContext(ScheduleContext);
  const scheduleOpen = scheduleCtx.open;
  const hoursEdits = useContext(HoursEditsContext);
  const wm = useContext(WMContext);
  const headers = [
    ...(mergedEngagement ? [{ label: "Engagement title", mandatory: false, width: 168, checkbox: selectable }] : []),
    { label: roleRows ? "Role" : "Role title", mandatory: true, width: roleRows ? 220 : 168, checkbox: selectable },
    ...(engagementColumn ? [{ label: "Engagement", mandatory: false, width: 240 }] : []),
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
      <table ref={stickyRef} style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", minWidth: 1524 + (roleRows && hasEngagement ? 124 : 0) + (availability ? SUGGESTED_W : 0) + (showBooked ? BOOKED_W : 0) + (showDelta ? DELTA_W : 0) }}>
        <thead>
          <tr style={availability ? { height: HEAD_H } : undefined}>
            {headers.map((h, i) => (
              <th key={i} style={{ ...thStyle, width: h.width, position: "sticky", right: h.sticky ? 0 : undefined, zIndex: h.sticky ? 4 : 3, ...(availability ? { height: HEAD_H, boxSizing: "border-box" as const } : null) }}>
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
            const first = mergedEngagement && (idx === 0 || roles[idx - 1].engagement !== role.engagement);
            const run = first ? roles.filter((x, j) => j >= idx && roles.slice(idx, j + 1).every(y => y.engagement === role.engagement)) : [];
            // The schedule rows of an open role sit inside the merged engagement cell too
            const extra = run.reduce((n, r) => n + scheduleRowCount(r, wm.peopleOf(r), scheduleOpen), 0);
            const rp = wm.peopleOf(role);
            const sched = scheduleRowsOf(role, rp, scheduleOpen);
            return (
            <Fragment key={role.id}>
            <tr className={freshRow === role.id ? "mr-row-new" : undefined} style={{ background: selectable && roleInSelection(selection, role) ? "var(--palette-primary-3)" : "white", ...(availability ? { height: rowHeightOf(rp) } : null) }}>
              {/* Read-only engagement title, merged across the engagement's roles: neutral light background, regular weight, checkbox selects them all */}
              {first && (
                <td rowSpan={run.length + extra} style={{ ...tdStyle, background: "var(--palette-neutral-2)" }}>
                  <Row gap={8} style={{ alignItems: "flex-start" }}>
                    {selectable && <SelectBox kind="engagement" selection={selection} checked={!!role.engagement && selection.selected.has(role.engagement)} onChange={() => role.engagement && selection.toggle([role.engagement], "engagement")} />}
                    <div style={{ minWidth: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                      <span style={{ ...body, lineHeight: "20px", minWidth: 0, overflowWrap: "anywhere" }}>{role.engagement}</span>
                      {/* The tag the engagement got (bulk Tag), right below its title */}
                      {role.engagement && engagementTags[role.engagement] && <PillSimple label={engagementTags[role.engagement]} size="small" leftIcon="tag" />}
                    </div>
                  </Row>
                </td>
              )}
              {roleRows ? (
                // Role cell: the checkbox, then the editable title (wraps). On hover the text area turns input-grey over the whole cell height and an "open" button appears
                <td className="mr-cell" style={{ ...tdStyle, position: "relative", padding: 0 }}>
                  <div className="mr-fill" style={{ position: "absolute", top: 0, bottom: 0, left: 44, right: 0 }} />
                  <Row gap={4} style={{ alignItems: "flex-start", position: "relative", padding: "8px" }}>
                    {selectable && <SelectBox kind="role" selection={selection} checked={selection.selected.has(role.id)} onChange={() => selection.toggle([role.id], "role")} />}
                    <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
                      <EditableTextCell defaultValue={role.title} />
                      <OpenButton label={`Open role: ${role.title}`} onClick={() => onOpenRole?.(role.id)} />
                    </div>
                  </Row>
                </td>
              ) : (
              <td className="mr-edit" style={tdStyle}>
                <Row gap={8} style={{ alignItems: "flex-start" }}>
                  {selectable && <SelectBox kind="role" selection={selection} checked={selection.selected.has(role.id)} onChange={() => selection.toggle([role.id], "role")} />}
                  <EditableTextCell defaultValue={role.title} />
                </Row>
              </td>
              )}
              {engagementColumn && (
                // Engagement cell: a select (value + chevron, one line with an ellipsis); same hover fill and "open" button as the role cell, the button sits left of the chevron
                <td className="mr-cell" style={{ ...tdStyle, position: "relative", padding: 0 }}>
                  <div className="mr-fill" style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }} />
                  <div style={{ position: "relative", padding: "8px" }}>
                    {/* same box as in the role cell: the button is positioned against the text, not the cell padding, so it lines up with the first line */}
                    <div style={{ position: "relative" }}>
                      {/* the tag the engagement got (bulk "Tag parent engagements" / Tag) shows right below its title */}
                      <EngagementSelectCell value={role.engagement ?? ""} onChange={e => onEngagementChange?.(role.id, e)} options={[...new Set(roles.map(r => r.engagement).filter((e): e is string => !!e))]} tags={engagementTags} />
                      <OpenButton right={22} label={`Open engagement: ${role.engagement ?? ""}`} onClick={() => role.engagement && onOpenEngagement?.(role.engagement)} />
                    </div>
                  </div>
                </td>
              )}
              {selectable && (
                <td style={readOnlyTd}>
                  {tags[role.id] ? <PillSimple label={tags[role.id]} size="small" leftIcon="tag" /> : <span style={muted}>-</span>}
                </td>
              )}
              <td style={readOnlyTd}>{role.wfState && <PillWFState state={role.wfState} />}</td>
              {showDelta && <DeltaCell role={role} />}
              {availability && <SuggestedWMCell role={role} />}
              {showBooked && <BookedWMCell role={role} />}
              <td className="mr-edit" style={tdStyle}><EditableTextCell defaultValue={role.description} /></td>
              <td className="mr-edit" style={tdStyle}><EditableNumberCell defaultValue={role.vacancies} /></td>
              <td className="mr-edit" style={tdStyle}><InlineSelectCell placeholder="" value={role.assignee} /></td>
              <td className="mr-edit" style={tdStyle}>
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
              <td className="mr-edit" style={tdStyle}>
                <InlineSelectCell value={role.businessUnit} />
              </td>
              <td className="mr-edit" style={tdStyle}><InlineSelectCell placeholder="" value={role.priority} /></td>
              <td className="mr-edit" style={tdStyle}><EditableTextCell defaultValue={role.label ?? "label"} /></td>
              <td className="mr-edit" style={tdStyle}>
                <Row gap={4}>
                  <EditableTextCell defaultValue={role.location ?? ""} />
                  <Icon name="filter-clean" size={14} style={{ color: "var(--palette-blue-2)" }} />
                  <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)" }} />
                </Row>
              </td>
              <td style={readOnlyTd}><span style={muted}>-</span></td>
              {/* Sticky actions — filter:drop-shadow works on <td>, box-shadow does not */}
              {!availability && (
                <td style={{ ...tdStyle, position: "sticky", right: 0, background: "white", zIndex: 1, borderRight: "none", filter: "drop-shadow(-4px 0 6px rgba(203,218,247,0.85))" }}>
                  <StickyActions variant={rowActions} role={role} />
                </td>
              )}
            </tr>
            {sched !== null && sched.map((entry, ei) => {
              const item = entry.item;
              const person = entry.person;
              const lastOfPerson = !sched[ei + 1] || sched[ei + 1].person.name !== person.name;
              const status = person.booked ? "booked" : "requested";
              // Each person's group has a merged-looking block with their avatar and wrapping name, floating right next to the role names (the other rows of the group leave the room empty, so the names line up)
              const label = (children: React.ReactNode) => (
                <tr key={entry.key} style={{ height: SCHEDULE_ROW_H }}>
                  <td colSpan={headers.length - (mergedEngagement ? 1 : 0)} style={{ ...tdStyle, height: SCHEDULE_ROW_H, boxSizing: "border-box", background: "var(--palette-neutral-2)", verticalAlign: "middle", padding: "4px 12px", borderRight: "none",
                    // the empty room left of the name block has no row lines, only the divider between two people (the lines next to the role names are drawn by the label block)
                    ...(!lastOfPerson ? { borderBottom: "none" } : null) }}>
                    {/* Floating label: sticky to the right edge of the (horizontally scrolling) roles pane, so it stays right next to the divider */}
                    <div style={{ position: "sticky", right: 12, marginLeft: "auto", width: SCHEDULE_NAME_W + SCHEDULE_LABEL_W + 16, height: SCHEDULE_ROW_H - 9, display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: SCHEDULE_NAME_W, flexShrink: 0, alignSelf: "stretch", position: "relative" }}>
                        {entry.groupSize && (
                          // Like a merged cell: the block spans every row of the person's group (it overflows the first row), the name wraps next to the avatar
                          <div style={{ position: "absolute", zIndex: 1, top: -4, left: -12, width: SCHEDULE_NAME_W + 16, height: entry.groupSize * SCHEDULE_ROW_H, boxSizing: "border-box", padding: 8, background: "var(--palette-neutral-2)", borderBottom: "1px solid var(--palette-neutral-0)", borderRight: "1px solid var(--palette-neutral-0)" }}>
                            <Row gap={8} style={{ alignItems: "flex-start" }}>
                              <Avatar initials={initialsOf(person.name)} size="small" />
                              <span style={{ ...body, fontWeight: 700, minWidth: 0, overflowWrap: "anywhere", lineHeight: "24px" }}>{person.name}</span>
                            </Row>
                          </div>
                        )}
                      </div>
                      <div style={{ width: SCHEDULE_LABEL_W, flexShrink: 0, minWidth: 0, alignSelf: "stretch", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        {children}
                        {!lastOfPerson && <div style={{ position: "absolute", left: -12, right: -12, bottom: -4, height: 1, background: "var(--palette-neutral-0)" }} />}
                      </div>
                    </div>
                  </td>
                </tr>
              );
              const two = (title: string, sub: string) => (
                <div style={{ minWidth: 0, textAlign: "right" }}>
                  <div style={{ ...body, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
                  <div style={{ ...labelCss, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub}</div>
                </div>
              );
              if (entry.kind === "none") return label(<span style={{ ...muted, textAlign: "right" }}>{person.name} has no other bookings in these weeks</span>);
              if (entry.kind === "own") return label(two(role.title, `${role.engagement ?? ""} · ${sumHours(weeks.map((_, w) => personRoleHours(role, rp, person, w, hoursEdits, scheduleCtx.hours)))}h ${status}`));
              return label(two(item!.roleName, `${item!.engagement} · ${sumHours(item!.hours.map((_, w) => scheduleCtx.hours(role.id, item!, w)))}h booked`));
            })}
            </Fragment>
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
  const openOverbooking = useContext(OverbookingOpenContext);
  const hoursEdits = useContext(HoursEditsContext);
  const scheduleCtx = useContext(ScheduleContext);
  const scheduleOpen = scheduleCtx.open;
  const wm = useContext(WMContext);
  const stickyRef = useStickyHeader();
  const norm = (c: AvailabilityCell | undefined) => (c == null ? null : typeof c === "number" ? { hours: c, flag: undefined as "error" | "warning" | undefined, overbooking: undefined as PotentialOverbooking | undefined } : c);

  // Drag fill. `anchor` = the cell the press started on, `over` = the cell the pointer is on now; once they differ the drag is on.
  const [anchor, setAnchor] = useState<{ r: number; c: number } | null>(null);
  const [over, setOver] = useState<{ r: number; c: number } | null>(null);
  const [fills, setFills] = useState<Record<string, { n: number; v: string }>>({});
  const edited = useRef<Record<string, number | null>>({});      // what the user typed / filled, by "roleId:week"
  const fillSeq = useRef(0);
  const key = (roleId: string, c: number) => `${roleId}:${c}`;
  const valueAt = (r: number, c: number): number | null => {
    const k = key(roles[r].id, c);
    return k in edited.current ? edited.current[k] : (norm(roles[r].availability?.[c])?.hours ?? null);
  };
  const active = !!anchor && !!over && (anchor.r !== over.r || anchor.c !== over.c);
  const rect = active ? { r0: Math.min(anchor!.r, over!.r), r1: Math.max(anchor!.r, over!.r), c0: Math.min(anchor!.c, over!.c), c1: Math.max(anchor!.c, over!.c) } : null;
  useEffect(() => {
    if (!anchor) return;
    const up = () => {
      if (rect) {
        const v = valueAt(anchor.r, anchor.c);
        const next: Record<string, { n: number; v: string }> = {};
        for (let r = rect.r0; r <= rect.r1; r++) for (let c = rect.c0; c <= rect.c1; c++) {
          if (r === anchor.r && c === anchor.c) continue;
          const k = key(roles[r].id, c);
          edited.current[k] = v;
          next[k] = { n: ++fillSeq.current, v: v == null ? "" : String(v) };
          onAvailabilityChange?.({ roleId: roles[r].id, weekIndex: c, hours: v });
        }
        setFills(f => ({ ...f, ...next }));
      }
      setAnchor(null); setOver(null);
    };
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  });
  useEffect(() => { if (active) { (document.activeElement as HTMLElement | null)?.blur?.(); window.getSelection()?.removeAllRanges(); } }, [active]);

  return (
    <div style={{ flex: "0 0 auto", width, userSelect: active ? "none" : undefined, maxWidth: `calc(100% - ${DIVIDER_W + MIN_LEFT_W}px)`, overflowX: "auto" }}>
      <table ref={stickyRef} style={{ borderCollapse: "collapse", tableLayout: "fixed", width: "100%", minWidth: weeks.length * WEEK_W + ACTIONS_W }}>
        <thead>
          <tr style={{ height: HEAD_H }}>
            {weeks.map(w => (
              <th key={w} style={{ ...thStyle, position: "sticky", zIndex: 3, height: HEAD_H, boxSizing: "border-box", textAlign: "center", color: "var(--palette-blue-0)", whiteSpace: "normal", lineHeight: "115%" }}>{w}</th>
            ))}
            <th style={{ ...thStyle, width: ACTIONS_W, height: HEAD_H, boxSizing: "border-box", position: "sticky", right: 0, zIndex: 4, borderRight: "none" }} />
          </tr>
        </thead>
        <tbody>
          {roles.map((role, ri) => { const rp = wm.peopleOf(role); return (
            <Fragment key={role.id}>
            <tr className={freshRow === role.id ? "mr-row-new" : undefined} style={{ height: rowHeightOf(rp), background: selectable && roleInSelection(selection, role) ? "var(--palette-primary-3)" : "white" }}>
              {weeks.map((w, i) => {
                const c = norm(role.availability?.[i]);
                const edges: FillEdges | null = rect && ri >= rect.r0 && ri <= rect.r1 && i >= rect.c0 && i <= rect.c1
                  ? { top: ri === rect.r0, bottom: ri === rect.r1, left: i === rect.c0, right: i === rect.c1 } : null;
                return (
                  <HoursTd
                    key={w} defaultValue={c?.hours}
                    flag={(() => { const o = overbookingsNow(role, rp, i, i in (hoursEdits[role.id] ?? {}) ? hoursEdits[role.id][i] : c?.hours, scheduleCtx.hours, hoursEdits); return o.length ? (o.some(x => x.level === "error") ? "error" : "warning") : undefined; })()}
                    onFlagClick={() => openOverbooking?.(role.id, i)}
                    onChange={hours => { edited.current[key(role.id, i)] = hours; onAvailabilityChange?.({ roleId: role.id, weekIndex: i, hours }); }}
                    fill={fills[key(role.id, i)]} fillEdges={edges} dragging={active}
                    onDragStart={() => { setAnchor({ r: ri, c: i }); setOver({ r: ri, c: i }); }}
                    onDragEnter={() => { if (anchor) setOver({ r: ri, c: i }); }}
                  />
                );
              })}
              <td style={{ ...tdStyle, position: "sticky", right: 0, background: "white", zIndex: 1, borderRight: "none", filter: "drop-shadow(-4px 0 6px rgba(203,218,247,0.85))" }}>
                <StickyActions variant={rowActions} role={role} />
              </td>
            </tr>
            {(() => {
              // Per person shown: the role itself first (their hours on it; alone on the role they are the requested hours above), then their other bookings: Booking Engine grid cells with the booking colour dot, same rows as on the left
              const sched = scheduleRowsOf(role, rp, scheduleOpen);
              if (sched === null) return null;
              return sched.map(entry => {
                const item = entry.item;
                return (
                <tr key={entry.key} style={{ height: SCHEDULE_ROW_H }}>
                  {weeks.map((w, i) => {
                    const h = entry.kind === "own" ? personRoleHours(role, rp, entry.person, i, hoursEdits, scheduleCtx.hours) : item ? scheduleCtx.hours(role.id, item, i) : null;
                    const category = h ? (entry.kind === "own" ? ownCategory(role) : item?.category ?? "blue") : "empty";
                    const onChange = entry.kind === "own"
                      ? (v: number) => scheduleCtx.edit({ roleId: role.id, scheduleId: `own-${entry.person.name}`, weekIndex: i, hours: v })
                      : item ? (v: number) => scheduleCtx.edit({ roleId: role.id, scheduleId: item.id, weekIndex: i, hours: v }) : undefined;
                    return (
                      <td key={w} style={{ ...tdStyle, padding: 0, height: SCHEDULE_ROW_H, boxSizing: "border-box", background: "var(--palette-neutral-2)" }}>
                        <div style={{ height: SCHEDULE_ROW_H - 1 }}><BookingCell value={h || null} category={category} readOnly={!onChange} onChange={onChange} /></div>
                      </td>
                    );
                  })}
                  <td style={{ ...tdStyle, position: "sticky", right: 0, background: "var(--palette-neutral-2)", zIndex: 1, borderRight: "none", filter: "drop-shadow(-4px 0 6px rgba(203,218,247,0.85))" }} />
                </tr>
                );
              });
            })()}
            </Fragment>
          ); })}
        </tbody>
      </table>
    </div>
  );
}

// ── Accordion group ───────────────────────────────────────────────────────────

function RoleGroup({ name, roles, showExtraColumns = false, rowActions = "dtt", selection, selectable = true, tags, engagementTags, availability = false, weeks, availabilityWidth, onAvailabilityWidth, onAvailabilityChange, roleRows, onOpenRole, onOpenEngagement, onEngagementChange }: { onEngagementChange?: (roleId: string, engagement: string) => void; roleRows?: boolean; onOpenRole?: (roleId: string) => void; onOpenEngagement?: (engagement: string) => void; engagementTags?: Record<string, string>; name: string; roles: RoleRow[]; showExtraColumns?: boolean; rowActions?: RowActionsVariant; selection: Selection; selectable?: boolean; tags?: Record<string, string>; availability?: boolean; weeks?: string[]; availabilityWidth?: number; onAvailabilityWidth?: (w: number) => void; onAvailabilityChange?: AvailabilityChangeHandler }) {
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
      {expanded && <RolesTable roles={roles} showExtraColumns={showExtraColumns} rowActions={rowActions} selection={selection} selectable={selectable} tags={tags} engagementTags={engagementTags} availability={availability} weeks={weeks} availabilityWidth={availabilityWidth} onAvailabilityWidth={onAvailabilityWidth} onAvailabilityChange={onAvailabilityChange} roleRows={roleRows} onOpenRole={onOpenRole} onOpenEngagement={onOpenEngagement} onEngagementChange={onEngagementChange} />}
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

// The Manage tags modal lives in src/modals/manage_tags (Storybook: Modals / Manage tags); re-exported here for the standalone bundle and prototypes
export { ManageTagsModal, DEFAULT_TAG_OPTIONS, DEFAULT_PEOPLE_OPTIONS } from "../../modals/manage_tags/manage_tags_modal";
export type { TagRolesResult, TagPrefill } from "../../modals/manage_tags/manage_tags_modal";

// ── Bulk buttons — three ghost icon buttons in the bulk banner ────────────────────────────────────────────────────────

type BulkAction = { id: "tag-roles" | "tag" | "tag-engagements" | "owner"; label: string };
// Engagements selected: tag tags the picked engagements (the tag shows right below each engagement title), tag-roles tags every role inside them (Tag column).
// Roles selected: tag tags the picked roles, tag-engagements tags the engagements those roles belong to. All of them open "Manage tags".
const ENGAGEMENT_ACTIONS: BulkAction[] = [
  { id: "tag-roles", label: "Tag roles" },
  { id: "tag",       label: "Tag" },
  { id: "owner",     label: "Owners" },
];
const ROLE_ACTIONS: BulkAction[] = [
  { id: "tag",             label: "Tag" },
  { id: "tag-engagements", label: "Tag parent engagements" },
  { id: "owner",           label: "Owners" },
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
  /** Show the "Tag roles" button in the bulk banner when engagements are selected (it tags every role inside them). Default true; off leaves Tag (the engagements) and Owners. */
  tagRolesButton?: boolean;
  /** Role-rows layout (default false): no merged engagement cell. The first column is Role (checkbox + editable title), the second Engagement (editable, one line, one per row). On hover both show an "open" button (onOpenRole / onOpenEngagement). Selection is by role only. */
  roleRows?: boolean;
  /** Role-rows layout: the "open" button of a Role cell shows the role side panel; this is called by the open button in that panel's header (go to the role screen) */
  onOpenRole?: (roleId: string) => void;
  /** Role-rows layout: the "open" button of an Engagement cell shows the engagement side panel; this is called by the open button in that panel's header (go to the engagement screen) */
  onOpenEngagement?: (engagement: string) => void;
  /** Content of the role side panel for a role, on top of what the row says (title, state, engagement, description, owner) and a sample default */
  roleDetails?: (role: ManageRolesRole) => Partial<RoleSidePanelData>;
  /** Content of the engagement side panel, on top of what the rows say (name, roles, filled) and a sample default */
  engagementDetails?: (engagement: string, roles: ManageRolesRole[]) => Partial<EngagementSidePanelData>;
  /** Delta = booked − requested hours for every role (default: requested − booked, and just the requested hours when nothing is booked). The hours still missing then show as a negative number in red-0, e.g. "-40h"; 0h stays green. */
  deltaMissing?: boolean;
  /** How many week columns the availability pane shows when the screen opens (the divider still resizes it). Default: what the layout picks (one week next to Booked WM and Delta). */
  weeksVisible?: number;
  /** An hours cell of the availability-rules table was edited (one call per keystroke). The cell keeps its own value; the host decides what to do with it. */
  onAvailabilityChange?: AvailabilityChangeHandler;
  /** An hours cell of a booked workforce member's schedule rows was edited (committed on Enter / blur, like the Booking Engine grid) */
  onScheduleChange?: (change: ScheduleChange) => void;
  /** Replaces the default Navbar (e.g. a prototype's navbar with an unread badge) */
  navbar?: React.ReactNode;
  navbarActiveId?: string;
  onNavigate?: (navbarId: string) => void;
  onBack?: () => void;
  onSave?: () => void;
  /** Schedules by workforce member name: the other roles the people suggested on a role are booked on (their eye button shows them, and they feed the potential overbookings). A booked person's own `schedule` wins. */
  schedules?: Record<string, WMSchedule>;
  /** Profile side panel content by name (the open button of a pill); a person without one gets a basic profile */
  profiles?: Record<string, ProfileSidePanelData>;
  /** The open button of a Suggested / Booked WM pill was clicked: the screen shows the profile side panel and tells the host which profile */
  onOpenProfile?: (name: string) => void;
  /** The ghost "Fill & Book (X)" button at the end of the bulk banner: X is how many of the selected roles are not booked or confirmed and have a suggested WM (the roles inside the picked engagements when engagements are selected); `roleIds` are those roles */
  onFillBook?: (info: { roleIds: string[] }) => void;
  /** "Manage tags" → Update: the tag was applied to `roles` roles (`roleIds` says which). `target` "engagements": it was applied to the picked engagements themselves (`engagements` = their names), not to their roles. */
  onTagged?: (info: { tag: string; roles: number; roleIds: string[]; notified: string[]; target: "roles" | "engagements"; engagements: string[] }) => void;
  /** Adds a secondary "Open in Booking Engine" button to the page header, top right. Called with the ids of the roles the screen shows right now (duplicates and deletes included). */
  onOpenInBookingEngine?: (roleIds: string[]) => void;
  /** A row menu action was chosen (menu at the end of each row). Duplicate (a new row right below, animated; the copy is reset to Shortlisting with no Booked WM), Tag (opens Manage tags for that role) and Delete (removes the row) are done by the screen; Fill & Book and Close are only reported here. */
  onRowAction?: (info: { action: RowMenuAction; roleId: string }) => void;
  /** Tags engagements already have when the screen opens: engagement name → tag (shown right below the engagement title) */
  initialEngagementTags?: Record<string, string>;
  /** Tags in the "Manage tags" dropdown (default: EM to review, RM to review, Ready to book, Needs rework, On hold) */
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
  tagCommand?: { n: number; open?: boolean; select?: { kind: "role" | "engagement"; keys: string[] }; prefill?: TagPrefill; /** What the modal tags: the roles (default) or the selected engagements themselves */ target?: "roles" | "engagements" };
};

export function ManageRolesScreen({
  groups: groupsIn, header, title = "Manage roles", rowActions = "roles", saveLabel = "Fill & Book", selectable = true, availability, weeks, weeksVisible, tagRolesButton = true, deltaMissing = false, roleRows = false, onOpenRole, onOpenEngagement, roleDetails, engagementDetails, onAvailabilityChange, onScheduleChange,
  navbar, navbarActiveId = "admin", onNavigate, onBack, onSave, schedules = {}, profiles = {}, onOpenProfile, onFillBook, onTagged, onUnbook, onRowAction, onOpenInBookingEngine,
  tagOptions = DEFAULT_TAG_OPTIONS, peopleOptions = DEFAULT_PEOPLE_OPTIONS, defaultNotify = "Megan Taylor", initialTags = {}, initialEngagementTags = {},
  suggestCandidates = DEFAULT_SUGGEST_CANDIDATES, onSuggestedChange, initialSuggested = {}, suggestCommand, onSuggestOpenChange, tagCommand,
}: ManageRolesScreenProps) {
  // Row menu edits: duplicated rows (inserted right below their source) and deleted rows, on top of the groups the host passes
  const [dups, setDups] = useState<{ id: string; afterId: string; role: RoleRow }[]>([]);
  const [deleted, setDeleted] = useState<Set<string>>(new Set());
  const [freshRow, setFreshRow] = useState<string | null>(null);
  const [hoursEdits, setHoursEdits] = useState<Record<string, Record<number, number | null>>>({});
  const [engOverrides, setEngOverrides] = useState<Record<string, string>>({});   // role-rows layout: the engagement a role was moved to in its select (role id → engagement)
  const dupSeq = useRef(0);
  const trackHours: AvailabilityChangeHandler = c => { setHoursEdits(e => ({ ...e, [c.roleId]: { ...e[c.roleId], [c.weekIndex]: c.hours } })); onAvailabilityChange?.(c); };
  const groups: ManageRolesGroup[] = groupsIn.map(g => {
    let roles = [...g.roles];
    dups.forEach(d => { const i = roles.findIndex(r => r.id === d.afterId); if (i >= 0) roles.splice(i + 1, 0, d.role); });
    return { ...g, roles: roles.filter(r => !deleted.has(r.id)).map(r => (engOverrides[r.id] ? { ...r, engagement: engOverrides[r.id] } : r)) };
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
    if (own.length === 0 && bookedOf(role).length) return bookedOf(role).map((b, i) => candidateOf(`b-${role.id}-${i}`, b.name, role.requestedRank));
    return own;
  };
  // One side panel at a time: opening one closes the others
  const [overKey, setOverKey] = useState<{ roleId: string; week?: number; name?: string } | null>(null);     // Potential overbookings: of one week (the bar), or of every week of one person (the pill icon)
  const [misKey, setMisKey] = useState<{ roleId: string; name: string } | null>(null);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [rolePanel, setRolePanel] = useState<string | null>(null);          // role id of the role side panel
  const [engPanel, setEngPanel] = useState<string | null>(null);            // engagement name of the engagement side panel
  const closePanels = () => { setOverKey(null); setMisKey(null); setProfileName(null); setSuggestRole(null); setRolePanel(null); setEngPanel(null); };
  const openRolePanel = (id: string) => { closePanels(); setRolePanel(id); };
  const openEngagementPanel = (name: string) => { closePanels(); setEngPanel(name); };
  const suggestCtx: SuggestCtx = { valueFor: suggestedFor, open: r => { closePanels(); setSuggestRole(r); } };
  const [scheduleEdits, setScheduleEdits] = useState<Record<string, Record<number, number>>>({});
  const scheduleHours = (roleId: string, item: BookedScheduleItem, w: number): number | null => { const e = scheduleEdits[`${roleId}:${item.id}`]; return e && w in e ? e[w] : item.hours[w] ?? null; };
  const [scheduleOpen, setScheduleOpen] = useState<Set<string>>(new Set());   // `roleId|name` of the people whose schedule is shown
  const weekLabels = weeks ?? DEFAULT_AVAILABILITY_WEEKS;
  // Who is suggested / booked on a role (one entry per name), with their schedules
  const peopleOf = (role: RoleRow): RolePeople => buildRolePeople(role, suggestedFor(role).map(c => ({ id: c.id, name: c.name, rank: c.rank })), schedules);
  const overWeeksOf = (role: RoleRow, person: WMPerson): string[] => {
    const rp = peopleOf(role);
    return weekLabels.filter((_, w) => !!personOverbooking(role, rp, person, w, scheduleHours, hoursEdits));
  };
  const removeSuggested = (role: RoleRow, candidateId: string) => {
    const next = suggestedFor(role).filter(c => c.id !== candidateId);
    setSuggestedBy(prev => ({ ...prev, [role.id]: next }));
    onSuggestedChange?.({ roleId: role.id, suggested: next });
  };
  // A person without a profile of their own gets the sample profile content (all the sections) under their name
  const profileOf = (name: string): ProfileSidePanelData => profiles[name] ?? { ...SAMPLE_PROFILE, name, initials: initialsOf(name), jobTitle: allCandidates.find(c => c.name === name)?.rank ?? SAMPLE_PROFILE.jobTitle, email: `${name.toLowerCase().replace(/[^a-z ]/g, "").split(" ").filter(Boolean).join(".")}@profinda.com` };
  const roleData = (): RoleSidePanelData | undefined => {
    const r = rolePanel ? groups.flatMap(g => g.roles).find(x => x.id === rolePanel) : undefined;
    if (!r) return undefined;
    return {
      title: r.title, wfState: r.wfState, id: r.id, state: "Open", privacy: "Public", participant: "Co-Owner",
      engagementName: r.engagement, description: r.description,
      owners: r.assignee ? [{ name: r.assignee, initials: initialsOf(r.assignee) }] : [{ name: "Santiago A CV Upload", initials: "SC" }],
      duration: "14 days", timeLeft: "6 days", dateCreated: "13-07-2026",
      skills: [{ label: "Jira", proficiency: "advanced" }, { label: "Project Management", proficiency: "intermediate", core: true }, { label: "Agile", proficiency: "basic" }],
      privacyValue: "Public", creatorName: "Spencer Harmon", creatorInitials: "SH",
      ...roleDetails?.(r),
      onOpenRole: () => onOpenRole?.(r.id),
      onOpenEngagement: r.engagement ? () => onOpenEngagement?.(r.engagement!) : undefined,
    };
  };
  const engagementData = (): EngagementSidePanelData | undefined => {
    if (!engPanel) return undefined;
    const rs = groups.flatMap(g => g.roles).filter(x => x.engagement === engPanel);
    return {
      title: engPanel, id: "100000064", state: "Open", privacy: "Public", participant: "Co-Owner",
      ownerName: "Fake Surname", ownerInitials: "FS",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      duration: "365 days", timeLeft: "280 days", dateCreated: "25-09-2025",
      roles: String(rs.length), filled: String(rs.filter(isBookedState).length),
      budget: "£180,000", cost: "£112,000", privacyValue: "Public", serviceLineGroup: "Strategy", requestedBy: "Spencer Harmon",
      creatorName: "Spencer Harmon", creatorInitials: "SH",
      ...engagementDetails?.(engPanel, rs),
      onOpenEngagement: () => onOpenEngagement?.(engPanel),
    };
  };
  const wmActions: WMActions = {
    peopleOf, overWeeks: overWeeksOf, removeSuggested,
    openProfile: name => { closePanels(); setProfileName(name); onOpenProfile?.(name); },
    openOverbooking: (roleId, name) => { closePanels(); setOverKey({ roleId, name }); },
    openMisalignment: (roleId, name) => { closePanels(); setMisKey({ roleId, name }); },
  };
  // Potential overbookings panel: opened by the bar on top of a flagged availability cell (every person over capacity that week) or by the warning icon of a pill (every week that person is over capacity)
  const openOverbooking = (roleId: string, week: number) => { closePanels(); setOverKey({ roleId, week }); };
  const overData = (() => {
    if (!overKey) return undefined;
    const r = groups.flatMap(g => g.roles).find(x => x.id === overKey.roleId);
    if (!r) return undefined;
    const rp = peopleOf(r);
    const ranges: { id: string; dateRange: string; subtitle: string; level: "warning" | "error"; items: OverbookingItem[] }[] = [];
    const names = new Set<string>();
    (overKey.week != null ? [overKey.week] : weekLabels.map((_, i) => i)).forEach(w => {
      const raw = r.availability?.[w];
      const cell = raw == null || typeof raw === "number" ? null : raw;
      const hours = hoursEdits[r.id]?.[w] ?? cell?.hours ?? (typeof raw === "number" ? raw : null);
      const list = overbookingsNow(r, rp, w, hours, scheduleHours, hoursEdits).filter(n => !overKey.name || n.name === overKey.name);
      list.forEach(now => {
        if (now.name) names.add(now.name);
        ranges.push({
          id: `${r.id}-${w}-${now.name ?? ""}`,
          dateRange: weekLabels[w],
          subtitle: `${list.length > 1 && !overKey.name && now.name ? `${now.name} · ` : ""}${now.over} hours over this week`,
          level: now.level,
          items: [
            rp.booked.length > 1 && now.name && rp.booked.some(b => b.name === now.name) ? { roleName: r.title, bookingLabel: `Booked ${now.roleHours}h`, bookingCategory: "role-booked" as const } : { roleName: r.title, bookingLabel: `Requested ${now.roleHours}h`, bookingCategory: "role-partial" as const },
            ...now.items.map(({ hours: _h, ...item }) => item),
          ],
        });
      });
    });
    if (!ranges.length) return undefined;     // an edit made it go away: nothing left to show
    return {
      personName: overKey.name ?? (names.size > 1 ? `${names.size} workforce members` : [...names][0] ?? suggestedFor(r)[0]?.name ?? "No workforce member suggested"),
      potential: true,
      ranges,
    };
  })();
  const misData = (() => {
    if (!misKey) return undefined;
    const r = groups.flatMap(g => g.roles).find(x => x.id === misKey.roleId);
    const d = r && bookedOf(r).find(b => b.name === misKey.name)?.misalignment;
    return d ? { ...d, wmName: d.wmName ?? misKey.name } : undefined;
  })();
  // The Suggest side panel stores every pick (and removal) at once for the role it is open on
  const storeSuggested = (list: SuggestCandidate[]) => {
    if (!suggestRole) return;
    setSuggestedBy(prev => ({ ...prev, [suggestRole.id]: list }));
    onSuggestedChange?.({ roleId: suggestRole.id, suggested: list });
  };
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
    setTagTarget(tagCommand.target ?? "roles");
    setTagging(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagCommand?.n]);
  const showAvailability = availability ?? selectable;
  const rolesWithSuggestion = groups.flatMap(g => g.roles).filter(r => suggestedFor(r).length > 0).length;
  // Width of the availability pane, shared by every group so dragging one divider resizes them all
  // Booked WM (and Delta) need room in the roles table, so the weeks pane opens on two weeks (one with both) instead of four (drag the divider to widen it)
  const hasBooked = groups.some(g => g.roles.some(r => r.availability));
  const hasDelta = hasBooked;
  const [availabilityWidth, setAvailabilityWidth] = useState(weeksVisible ? WEEK_W * weeksVisible + ACTIONS_W : hasBooked && hasDelta ? WEEK_W + ACTIONS_W : hasBooked ? WEEK_W * 2 + ACTIONS_W : DEFAULT_AVAILABILITY_W);

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
  // Fill & Book (X) in the bulk banner: the selected roles that are not booked / confirmed and have a suggested WM
  const fillBookRoles = selectedRoles.filter(r => !isBookedState(r) && suggestedFor(r).length > 0);
  // What "tag engagements" tags: the picked engagements, or (roles selected) the engagements those roles belong to
  const taggedEngagements = mode === "role" ? [...new Set(selectedRoles.map(r => r.engagement).filter((e): e is string => !!e))] : [...selected];

  const applyTag = (r: TagRolesResult) => {
    const engagements = tagTarget === "engagements" ? taggedEngagements : [];
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
    <WMContext.Provider value={wmActions}>
    <ScheduleContext.Provider value={{ open: scheduleOpen, toggle: (roleId, name) => setScheduleOpen(prev => { const n = new Set(prev), k = scheduleKey(roleId, name); if (!n.delete(k)) n.add(k); return n; }),
      hours: scheduleHours,
      edit: c => { setScheduleEdits(prev => ({ ...prev, [`${c.roleId}:${c.scheduleId}`]: { ...prev[`${c.roleId}:${c.scheduleId}`], [c.weekIndex]: c.hours } })); onScheduleChange?.(c); } }}>
    <BookedUnbookContext.Provider value={onUnbook ? ((r, name) => onUnbook({ roleId: r.id, name })) : undefined}>
    <SuggestContext.Provider value={suggestCtx}>
    <DeltaMissingContext.Provider value={deltaMissing}>
    <HoursEditsContext.Provider value={hoursEdits}>
    <FreshRowContext.Provider value={freshRow}>
    <OverbookingOpenContext.Provider value={openOverbooking}>
    <RowMenuContext.Provider value={rowActions === "roles" ? openRowMenu : null}>
    <style>{ROW_ANIM_CSS}{HOVER_CSS}{FOCUS_CSS}</style>
    <div style={{ display: "flex", height: "var(--ips-vh, 100vh)", overflow: "hidden", background: "var(--palette-neutral-2)" }}>
      {navbar ?? <Navbar activeId={navbarActiveId} onSelect={onNavigate} />}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div data-sticky-scroll style={{ flex: 1, overflowY: "auto", padding: "24px 32px 0", background: "var(--palette-neutral-2)", display: "flex", flexDirection: "column" }}>

          {/* Bulk-selection banner — overlays the page header row (centred, 600px) without growing the layout */}
          {selectable && selected.size > 0 && (
            <div style={{ position: "sticky", top: 8, height: 0, zIndex: 40, pointerEvents: "none", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 600, pointerEvents: "auto", borderRadius: 8, boxShadow: "var(--shadow-card-hover, 0 4px 12px rgba(12,20,87,0.12))" }}>
                <Alert
                  type="bulk-banner"
                  layout="inline"
                  message={`${selectedCount} ${mode === "role" ? (selectedCount === 1 ? "role" : "roles") : (selectedCount === 1 ? "engagement" : "engagements")} selected`}
                  onDismiss={clearSelection}
                  rightContent={[...(mode === "role" ? ROLE_ACTIONS : ENGAGEMENT_ACTIONS.filter(a => tagRolesButton || a.id !== "tag-roles")).map(a => (
                    <Tooltip key={a.id} content={a.label} placement="up-center" maxWidth={240}>
                      <Button kind="iconGhost" size="regular" onClick={a.id === "tag-roles" || (a.id === "tag" && mode === "role") ? () => openTagging("roles") : a.id === "tag" || a.id === "tag-engagements" ? () => openTagging("engagements") : undefined}>
                        <Icon name={a.id} size={16} />
                        <span style={srOnly}>{a.label}</span>
                      </Button>
                    </Tooltip>
                  )),
                    // Last place: a ghost text button with the number of roles it applies to (disabled at 0)
                    <Button key="fill-book" kind="ghost" size="regular" disabled={fillBookRoles.length === 0} onClick={() => onFillBook?.({ roleIds: fillBookRoles.map(r => r.id) })}>Fill &amp; Book ({fillBookRoles.length})</Button>,
                  ]}
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
              <RoleGroup key={g.name + i} name={g.name} roles={g.roles} showExtraColumns={g.roles.some(r => r.extraColumns)} rowActions={rowActions} selection={selection} selectable={selectable} tags={tags} engagementTags={engTags} availability={availability ?? selectable} weeks={weeks} availabilityWidth={availabilityWidth} onAvailabilityWidth={setAvailabilityWidth} onAvailabilityChange={trackHours} roleRows={roleRows} onOpenRole={openRolePanel} onOpenEngagement={openEngagementPanel} onEngagementChange={(id, e) => setEngOverrides(o => ({ ...o, [id]: e }))} />
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

      <ManageTagsModal open={tagging} prefill={tagPrefill} unit={tagTarget === "engagements" ? "engagement" : "role"} count={tagTarget === "engagements" ? taggedEngagements.length : tagRoleIds ? tagRoleIds.length : selectedRoles.length} items={tagTarget === "engagements" ? taggedEngagements.map(e => ({ label: e })) : (tagRoleIds ? groups.flatMap(g => g.roles).filter(x => tagRoleIds.includes(x.id)) : selectedRoles).map(r => ({ label: r.title, subLabel: r.engagement }))} onClose={() => { setTagging(false); setTagRoleIds(null); }} onUpdate={applyTag} tagOptions={tagOptions} peopleOptions={peopleOptions} defaultNotify={defaultNotify} />
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
        // Every pick is stored at once (no need to press Done; closing the panel keeps it). Done is just another way to close.
        onChange={storeSuggested}
        onDone={storeSuggested}
      />

      <OverbookingSidePanel open={!!overData} onClose={() => setOverKey(null)} data={overData} />
      <MisalignmentSidePanel open={!!misData} onClose={() => setMisKey(null)} data={misData} />
      <RoleSidePanel open={!!rolePanel} onClose={() => setRolePanel(null)} data={roleData() ?? { title: "" }} />
      <EngagementSidePanel open={!!engPanel} onClose={() => setEngPanel(null)} data={engagementData() ?? { title: "" }} />
      <ProfileSidePanel open={!!profileName} onClose={() => setProfileName(null)} data={profileName ? profileOf(profileName) : { name: "" }} />

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
    </OverbookingOpenContext.Provider>
    </FreshRowContext.Provider>
    </HoursEditsContext.Provider>
    </DeltaMissingContext.Provider>
    </SuggestContext.Provider>
    </BookedUnbookContext.Provider>
    </ScheduleContext.Provider>
    </WMContext.Provider>
  );
}
