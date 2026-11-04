// SmartAllocateSidePanel — Figma node 10998:112651 (Sidepanel/Smart allocate)
// Source: IPS Components adFvaOeh8E3AKLFKRjYD3r
// Width: 900px — slides in from right
//
// Structure:
//   Header: "Smart allocate" H4 + "N roles (M vacancies) from K engagements" subtitle + close
//   Optional Alert (Warning)
//   Body: Engagement groups (Accordion) → Role cards → table rows
//     Staffed row:  Checkbox | WM (avatar+name) | Grade (check+letter) | Match% | Avail% | WF state | ⋮ menu → Fill&Book / Edit
//     Empty row:    disabled Checkbox | WM InputSelect (opens DropdownWM) | Matches|Shortlist|Named resource toggle
//     Editing row:  same as empty but pre-populated after selecting a WM
//   Sticky: Cancel | Fill & Book (N)

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM                from "react-dom";
import { SidePanel }          from "./side_panel";
import css from "./side_panel.module.scss";
import { Header }             from "../header/header";
import { Icon }               from "../icon/icon";
import { Button }             from "../button/button";
import { Divider }            from "../divider/divider";
import { Accordion }          from "../accordion/accordion";
import { Alert }              from "../alert/alert";
import { Navigation }         from "../navigation/navigation";
import { Actions }            from "../actions/actions";
import { Toggle }             from "../toggle/toggle";
import { Checkbox }           from "../checkbox/checkbox";
import { WorkforceMember }    from "../workforce_member/workforce_member";
import { PillWFState }        from "../pill/pill";
import { DropdownActions, DropdownWM } from "../dropdown/dropdown";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SmartAllocateWFState =
  | "new" | "shortlisting" | "in-review" | "invited" | "pending"
  | "partially-filled" | "filled" | "partially-booked" | "booked"
  | "partially-confirmed" | "confirmed" | "not-filled";

/** A mismatch between what the role asked for and what the suggested WM has */
export type VacancyIssue = { field: string; requested: string; actual: string };

export type StaffedVacancy = {
  type:              "staffed";
  id:                string;
  wmName:            string;
  wmInitials:        string;
  grade:             string;
  gradeMatch:        boolean;
  cost?:             string;   // e.g. "£0.3m"
  matchPct:          number;
  availPct:          number;
  wfState:           SmartAllocateWFState;
  /** Soft mismatches — shown as an orange exclamation circle next to the WM */
  concessions?:      VacancyIssue[];
  /** Hard mismatches (need approval) — shown as a red error icon next to the WM */
  exceptions?:       VacancyIssue[];
};

export type EmptyVacancy = {
  type: "empty";
  id:   string;
};

export type Vacancy = StaffedVacancy | EmptyVacancy;

export type RoleCard = {
  id:                   string;
  roleName:             string;
  wfState:              SmartAllocateWFState;
  lastUpdated:          string;
  lastUpdatedWarning?:  boolean;
  vacancies:            Vacancy[];
};

export type EngagementGroup = {
  id:     string;
  name:   string;
  roles:  RoleCard[];
};

export type SmartAllocateSidePanelData = {
  roleCount:       number;
  vacancyCount:    number;
  engagementCount: number;
  engagements:     EngagementGroup[];
  showAlert?:      boolean;
  onCancel?:       () => void;
  onFillBook?:     () => void;
};

export type SmartAllocateSidePanelProps = {
  open:               boolean;
  onClose:            () => void;
  data?:              SmartAllocateSidePanelData;
  onCreateScenario?:  () => void;
  /** Called when Fill & Book is clicked, with the number of checked staffed rows */
  onFillBook?:        (count: number) => void;
  /** Override the panel title (default "Smart allocate") */
  title?:             string;
  /** Read-only AI Tuning summary (e.g. "Cost > Staffing Mix > Utilization"). Row hidden when omitted. */
  tuning?:            string;
  /** Opens the AI Tuning panel */
  onOpenTuning?:      () => void;
};

// ── Portal dropdown — renders children into document.body to escape overflow:hidden ──

type DropdownPos = { top: number; left: number; width: number };

function PortalDropdown({ pos, open, onClose, children, align = "left" }: {
  pos:     DropdownPos;
  open:    boolean;
  onClose: () => void;
  children: React.ReactNode;
  align?:  "left" | "right";
}) {
  // Close on outside mousedown — defer one tick so opener click doesn't immediately close
  useEffect(() => {
    if (!open) return;
    let active = false;
    const timer = setTimeout(() => { active = true; }, 0);
    const handler = (e: MouseEvent) => {
      if (!active) return;
      onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handler);
    };
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div style={{
      position:  "absolute",
      top:       pos.top,
      left:      pos.left,
      minWidth:  Math.max(pos.width, 160),
      transform: align === "right" ? "translateX(-100%)" : undefined,
      zIndex:    9999,
    }}>
      {children}
    </div>,
    document.body
  );
}

/** Compute dropdown position from an anchor element's bounding rect */
function getDropdownPos(el: HTMLElement, align: "left" | "right" = "left"): DropdownPos {
  const r = el.getBoundingClientRect();
  return {
    top:   r.bottom + window.scrollY,
    left:  align === "right" ? r.right + window.scrollX : r.left + window.scrollX,
    width: r.width,
  };
}

// ── Sample WM candidates for the dropdown ────────────────────────────────────

const WM_CANDIDATES = [
  { id: "wm-1", name: "Charlie Parker",    initials: "CP", subLabel: "charlie.parker@profinda.com"    },
  { id: "wm-2", name: "Monique Sanders",   initials: "MS", subLabel: "monique.sanders@profinda.com"   },
  { id: "wm-3", name: "Oliver Prentice",   initials: "OP", subLabel: "oliver.prentice@profinda.com"   },
  { id: "wm-4", name: "Fatima Al-Rashid",  initials: "FA", subLabel: "fatima.alrashid@profinda.com"   },
  { id: "wm-5", name: "James Okonkwo",     initials: "JO", subLabel: "james.okonkwo@profinda.com"     },
  { id: "wm-6", name: "Stan Michaels",     initials: "SM", subLabel: "stan.michaels@profinda.com"     },
];

// ── Typography ────────────────────────────────────────────────────────────────

const labelMuted: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-2)", lineHeight: "150%",
};
const labelWarning: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-red-1)", lineHeight: "150%",
};
const bodyBold: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
  color: "var(--palette-blue-0)", lineHeight: "115%",
};
const h6: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 15, fontWeight: 600,
  color: "var(--palette-blue-0)", lineHeight: "125%",
};

// ── Row state type ────────────────────────────────────────────────────────────
// (removed — using local wm state instead)

// ── Table column widths ───────────────────────────────────────────────────────
const COL_WIDTHS = {
  checkbox: 40,
  wm:       undefined as undefined,  // fill
  grade:    80,
  cost:     90,
  match:    70,
  avail:    70,
  status:   140,
  menu:     44,
};

const thBase: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-2)", textAlign: "left",
  padding: "0 8px 8px",
  whiteSpace: "nowrap",
};
const tdBase: React.CSSProperties = {
  padding: "8px", verticalAlign: "middle",
};

// ── Concession / exception indicator with tooltip ─────────────────────────────

/** `potential` (default true) = suggested WM would cause it ("Potential concession"); false = it actually exists ("Concession") */
export function IssueIndicator({ issues, kind, potential = true }: { issues: VacancyIssue[]; kind: "concession" | "exception"; potential?: boolean }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const anchor = useRef<HTMLSpanElement>(null);
  const isExc = kind === "exception";

  const show = () => {
    const r = anchor.current?.getBoundingClientRect();
    if (r) setPos({ x: r.left + r.width / 2, y: r.top });
  };

  return (
    <span
      ref={anchor}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, flexShrink: 0 }}
      onMouseEnter={show}
      onMouseLeave={() => setPos(null)}
    >
      {/* Glyphs live inside a 20×20 viewBox with 1–2px padding → rendered glyph is 16px tall */}
      {isExc
        ? <Icon name="error" size={20} style={{ color: "var(--palette-red-0)", flexShrink: 0 }} />
        : <Icon name="soft-exception" size={20} style={{ color: "var(--palette-orange-1)", flexShrink: 0 }} />}
      {/* Tooltip is portalled to <body> so it is never clipped by row / card / panel overflow */}
      {pos && ReactDOM.createPortal(
        <div style={{
          position: "fixed", left: pos.x, top: pos.y - 8, transform: "translate(-50%, -100%)",
          zIndex: 100000, background: "var(--palette-blue-1)", borderRadius: 8,
          padding: "10px 14px", minWidth: 220, maxWidth: 320, pointerEvents: "none",
          boxShadow: "0 4px 16px rgba(12,20,87,0.28)",
        }}>
          <div style={{ fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
            {`${potential ? "Potential " : ""}${isExc ? (potential ? "exception" : "Exception") : (potential ? "concession" : "Concession")}`}
          </div>
          {issues.map((it, i) => (
            <div key={i} style={{ marginBottom: i < issues.length - 1 ? 8 : 0 }}>
              <div style={{ fontFamily: "var(--font-family)", fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>{it.field}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-family)", fontSize: 12 }}>
                <span style={{ color: isExc ? "#ff9999" : "#ffc87a", textDecoration: "line-through" }}>{it.requested}</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>→</span>
                <span style={{ color: "#fff", fontWeight: 600 }}>{it.actual}</span>
              </div>
            </div>
          ))}
          {isExc && (
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.15)", fontFamily: "var(--font-family)", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
              {potential ? "Booking this person would require approval" : "Booking this person requires approval"}
            </div>
          )}
          {/* Caret */}
          <div style={{
            position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
            width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
            borderTop: "6px solid var(--palette-blue-1)",
          }} />
        </div>,
        document.body
      )}
    </span>
  );
}

// ── Grade cell ────────────────────────────────────────────────────────────────

function GradeCell({ grade, match }: { grade: string; match: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {match && <Icon name="check" size={14} style={{ color: "var(--palette-green-0)", flexShrink: 0 }} />}
      <span style={bodyBold}>{grade}</span>
    </div>
  );
}

// ── Row — Staffed ─────────────────────────────────────────────────────────────

type VacancyRowState = "staffed" | "editing" | "empty";

function StaffedRow({
  vacancy, onEdit, onFillBook, checked, onToggle,
}: {
  vacancy:     StaffedVacancy;
  onEdit:      () => void;
  onFillBook:  () => void;
  checked:     boolean;
  onToggle:    () => void;
}) {
  const [menuOpen,  setMenuOpen] = useState(false);
  const [menuPos,   setMenuPos]  = useState<DropdownPos>({ top: 0, left: 0, width: 0 });
  const [hovered,   setHovered]  = useState(false);
  const menuAnchor = useRef<HTMLButtonElement>(null);
  const closeMenu  = useCallback(() => setMenuOpen(false), []);

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "var(--palette-trans-0)" : "white", cursor: "default" }}
    >
      <td style={{ ...tdBase, width: COL_WIDTHS.checkbox }}>
        {/* Checked by default — the checked count drives "Fill & Book (N)" */}
        <Checkbox checked={checked} onChange={onToggle} />
      </td>
      <td style={tdBase}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <WorkforceMember variant="small-1line" name={vacancy.wmName} initials={vacancy.wmInitials} />
          {vacancy.concessions && vacancy.concessions.length > 0 && <IssueIndicator issues={vacancy.concessions} kind="concession" />}
          {vacancy.exceptions  && vacancy.exceptions.length  > 0 && <IssueIndicator issues={vacancy.exceptions}  kind="exception" />}
        </div>
      </td>
      <td style={{ ...tdBase, width: COL_WIDTHS.grade }}>
        <GradeCell grade={vacancy.grade} match={vacancy.gradeMatch} />
      </td>
      <td style={{ ...tdBase, width: COL_WIDTHS.cost, textAlign: "right" }}>
        <span style={bodyBold}>{vacancy.cost ?? "—"}</span>
      </td>
      <td style={{ ...tdBase, width: COL_WIDTHS.match, textAlign: "right" }}>
        <span style={bodyBold}>{vacancy.matchPct}%</span>
      </td>
      <td style={{ ...tdBase, width: COL_WIDTHS.avail, textAlign: "right" }}>
        <span style={bodyBold}>{vacancy.availPct}%</span>
      </td>
      <td style={{ ...tdBase, width: COL_WIDTHS.status }}>
        <PillWFState state={vacancy.wfState} size="small" />
      </td>
      <td style={{ ...tdBase, width: COL_WIDTHS.menu }}>
        <Button
          ref={menuAnchor}
          kind="iconTertiary"
          size="regular"
          title="Actions"
          onClick={() => {
            if (menuAnchor.current) setMenuPos(getDropdownPos(menuAnchor.current, "right"));
            setMenuOpen(o => !o);
          }}
        >
          <Icon name="menu-vertical" size={16} />
        </Button>
        <PortalDropdown pos={menuPos} open={menuOpen} onClose={closeMenu} align="right">
          <DropdownActions
            items={[
              { id: "fill-book", label: "Fill & Book" },
              { id: "edit",      label: "Edit"        },
            ]}
            onSelect={id => {
              closeMenu();
              if (id === "fill-book") onFillBook();
              if (id === "edit")      onEdit();
            }}
          />
        </PortalDropdown>
      </td>
    </tr>
  );
}

// ── Row — No WM (empty input + toggle) ───────────────────────────────────────

type SelectedWM = { id: string; name: string; initials: string; grade?: string; gradeMatch?: boolean; cost?: string; matchPct?: number; availPct?: number; wfState?: SmartAllocateWFState; concessions?: VacancyIssue[]; exceptions?: VacancyIssue[] };

function EmptyRow({ onWMSelected }: {
  onWMSelected: (wm: SelectedWM) => void;
}) {
  const [wmDropOpen, setWMDropOpen] = useState(false);
  const [wmPos,      setWMPos]      = useState<DropdownPos>({ top: 0, left: 0, width: 0 });
  const [listMode,   setListMode]   = useState("matches");
  const [hovered,    setHovered]    = useState(false);
  const wmAnchor    = useRef<HTMLButtonElement>(null);
  const closeWMDrop = useCallback(() => setWMDropOpen(false), []);

  const handleWMSelect = (wmId: string) => {
    const wm = WM_CANDIDATES.find(w => w.id === wmId);
    if (wm) onWMSelected({
      id:       wm.id,
      name:     wm.name,
      initials: wm.initials,
      // Realistic defaults matching Figma (will show like Ryan Curtis row)
      grade:      "B",
      gradeMatch: true,
      cost:       "£0.3m",
      matchPct:   Math.floor(Math.random() * 30) + 70,
      availPct:   Math.floor(Math.random() * 30) + 70,
      wfState:    "shortlisting" as SmartAllocateWFState,
    });
    setWMDropOpen(false);
  };

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "var(--palette-trans-0)" : "white" }}
    >
      {/* Disabled checkbox */}
      <td style={{ ...tdBase, width: COL_WIDTHS.checkbox, opacity: 0.5 }}>
        <Checkbox checked={false} onChange={() => {}} disabled />
      </td>

      {/* WM InputSelect — opens DropdownWM via portal */}
      <td style={tdBase}>
        <button
          ref={wmAnchor}
          onClick={() => {
            if (wmAnchor.current) setWMPos(getDropdownPos(wmAnchor.current, "left"));
            setWMDropOpen(o => !o);
          }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", height: 36, padding: "0 8px",
            border: "1px solid var(--palette-neutral-0)",
            borderRadius: "var(--radius-md)",
            background: "white", cursor: "pointer",
            fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
            color: "var(--palette-blue-2)",
          }}
        >
          Workforce Member
          <Icon name="chevron-down" size={16} style={{ color: "var(--palette-blue-2)" }} />
        </button>
        <PortalDropdown pos={wmPos} open={wmDropOpen} onClose={closeWMDrop}>
          <DropdownWM items={WM_CANDIDATES} onSelect={handleWMSelect} />
        </PortalDropdown>
      </td>

      {/* Matches | Shortlist | All resources toggle — spans Grade+Cost+Match+Avail cols */}
      <td colSpan={4} style={tdBase}>
        <Toggle
          options={[
            { value: "matches",         label: "Matches"        },
            { value: "shortlist",       label: "Shortlist"      },
            { value: "all-resources",   label: "All resources" },
          ]}
          value={listMode}
          onChange={setListMode}
        />
      </td>

      {/* Empty status + menu cells */}
      <td style={{ ...tdBase, width: COL_WIDTHS.status }} />
      <td style={{ ...tdBase, width: COL_WIDTHS.menu }} />
    </tr>
  );
}

// ── Vacancy row — two clear states: has-WM | no-WM ────────────────────────────

function VacancyRow({ vacancy, checked, onToggle, onStaffedChange }: {
  vacancy:         Vacancy;
  checked:         boolean;
  onToggle:        () => void;
  onStaffedChange: (id: string, staffed: boolean) => void;
}) {
  // Local WM state — starts from the vacancy data, can be changed by selecting from dropdown
  const [wm, setWM] = useState<SelectedWM | null>(
    vacancy.type === "staffed"
      ? { id: vacancy.id, name: vacancy.wmName, initials: vacancy.wmInitials, grade: vacancy.grade, gradeMatch: vacancy.gradeMatch, cost: vacancy.cost, matchPct: vacancy.matchPct, availPct: vacancy.availPct, wfState: vacancy.wfState, concessions: vacancy.concessions, exceptions: vacancy.exceptions }
      : null
  );

  // Tell the panel whether this vacancy currently has a WM (drives Fill & Book count)
  const hasWM = !!wm;
  useEffect(() => {
    onStaffedChange(vacancy.id, hasWM);
    return () => onStaffedChange(vacancy.id, false);
  }, [vacancy.id, hasWM]); // eslint-disable-line react-hooks/exhaustive-deps

  if (wm) {
    // Has a WM — show staffed row with full datapoints
    return (
      <StaffedRow
        vacancy={{
          type: "staffed", id: vacancy.id,
          wmName: wm.name, wmInitials: wm.initials,
          grade: wm.grade ?? "—", gradeMatch: wm.gradeMatch ?? false,
          cost: wm.cost,
          matchPct: wm.matchPct ?? 0, availPct: wm.availPct ?? 0,
          wfState: wm.wfState ?? "new",
          concessions: wm.concessions, exceptions: wm.exceptions,
        }}
        checked={checked}
        onToggle={onToggle}
        onEdit={() => setWM(null)}
        onFillBook={() => alert(`Fill & Book: ${wm.name}`)}
      />
    );
  }

  // No WM — show InputSelect + toggle
  return (
    <EmptyRow
      onWMSelected={selected => setWM(selected)}
    />
  );
}

// ── Role card ─────────────────────────────────────────────────────────────────

function RoleCardBlock({ role, unchecked, onToggle, onStaffedChange }: {
  role:            RoleCard;
  unchecked:       Set<string>;
  onToggle:        (id: string) => void;
  onStaffedChange: (id: string, staffed: boolean) => void;
}) {
  return (
    <div style={{
      background: "white",
      borderRadius: "var(--radius-md)",
      boxShadow: "0 0 4px 0 rgba(203,225,242,0.8)",
      padding: 16,
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      {/* Role card header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
          <span style={h6}>{role.roleName}</span>
          <PillWFState state={role.wfState} size="small" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span style={role.lastUpdatedWarning ? labelWarning : labelMuted}>
            {role.lastUpdated}
          </span>
          <Button
            kind="iconTertiary"
            size="regular"
            title="Refresh matches"
            style={{ opacity: role.lastUpdatedWarning ? 1 : 0.5 }}
          >
            <Icon
              name={role.lastUpdatedWarning ? "refresh-warning" : "refresh"}
              size={16}
              style={{ color: role.lastUpdatedWarning ? "var(--palette-red-1)" : "var(--palette-blue-2)" }}
            />
          </Button>
        </div>
      </div>

      {/* Table — using IPS Table CSS conventions: no divider below header, rows have hover */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...thBase, width: COL_WIDTHS.checkbox }} />
              <th style={thBase}>Workforce Member</th>
              <th style={{ ...thBase, width: COL_WIDTHS.grade }}>WM Grade</th>
              <th style={{ ...thBase, width: COL_WIDTHS.cost, textAlign: "right" }}>Cost</th>
              <th style={{ ...thBase, width: COL_WIDTHS.match, textAlign: "right" }}>Match</th>
              <th style={{ ...thBase, width: COL_WIDTHS.avail, textAlign: "right" }}>Avail.</th>
              <th style={{ ...thBase, width: COL_WIDTHS.status }}>Shortlist status</th>
              <th style={{ ...thBase, width: COL_WIDTHS.menu }} />
            </tr>
          </thead>
          <tbody>
            {role.vacancies.map(v => (
              <VacancyRow
                key={v.id}
                vacancy={v}
                checked={!unchecked.has(v.id)}
                onToggle={() => onToggle(v.id)}
                onStaffedChange={onStaffedChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function SmartAllocateSidePanel({
  open,
  onClose,
  data = { roleCount: 0, vacancyCount: 0, engagementCount: 0, engagements: [] },
  onCreateScenario,
  onFillBook,
  title = "Smart allocate",
  tuning,
  onOpenTuning,
}: SmartAllocateSidePanelProps) {
  const [tab, setTab] = useState<"all" | "concessions" | "exceptions">("all");
  // All staffed rows are checked by default; unchecking removes them from the Fill & Book count
  const [unchecked,  setUnchecked]  = useState<Set<string>>(new Set());
  const [staffedIds, setStaffedIds] = useState<Set<string>>(() => new Set(
    data.engagements.flatMap(e => e.roles).flatMap(r => r.vacancies).filter(v => v.type === "staffed").map(v => v.id)
  ));
  const toggleId = useCallback((id: string) => setUnchecked(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  }), []);
  const onStaffedChange = useCallback((id: string, staffed: boolean) => setStaffedIds(prev => {
    if (prev.has(id) === staffed) return prev;
    const next = new Set(prev);
    staffed ? next.add(id) : next.delete(id);
    return next;
  }), []);
  const staffedCount = [...staffedIds].filter(id => !unchecked.has(id)).length;

  // Tab counts + role filtering (rows stay mounted when hidden so ticks / counts are preserved)
  const allVacancies = data.engagements.flatMap(e => e.roles).flatMap(r => r.vacancies);
  const concessionCount = allVacancies.filter(v => v.type === "staffed" && v.concessions?.length).length;
  const exceptionCount  = allVacancies.filter(v => v.type === "staffed" && v.exceptions?.length).length;
  const roleMatches = (r: RoleCard) =>
    tab === "all" ||
    r.vacancies.some(v => v.type === "staffed" &&
      (tab === "concessions" ? !!v.concessions?.length : !!v.exceptions?.length));
  const visibleEngIds = data.engagements.filter(e => e.roles.some(roleMatches)).map(e => e.id);

  return (
    <SidePanel open={open} onClose={onClose} width={900}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        <div className={css.content} style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="smart-allocation" size={20} style={{ color: "var(--palette-blue-0)" }} />
                <Header size="content" title={title} />
              </div>
              <span style={labelMuted}>
                {data.roleCount} role{data.roleCount !== 1 ? "s" : ""}{" "}
                ({data.vacancyCount} vacanc{data.vacancyCount !== 1 ? "ies" : "y"}){" "}
                from {data.engagementCount} engagement{data.engagementCount !== 1 ? "s" : ""}
              </span>
            </div>
            <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
              <Icon name="cross" size={16} />
            </Button>
          </div>

          {/* Read-only AI Tuning summary + button */}
          {tuning !== undefined && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={labelMuted}>Tuning</span>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span style={bodyBold}>{tuning}</span>
                <Button kind="secondary" size="regular" onClick={onOpenTuning}>
                  <Icon name="preferences" size={16} />AI Tuning
                </Button>
              </div>
            </div>
          )}

          {/* Tabs */}
          <Navigation
            orientation="horizontal"
            tabs={[
              { id: "all",         label: "All roles" },
              { id: "concessions", label: "Concessions", badge: concessionCount, icon: "soft-exception", iconColor: "var(--palette-orange-1)" },
              { id: "exceptions",  label: "Exceptions",  badge: exceptionCount,  icon: "error",   iconColor: "var(--palette-red-0)" },
            ]}
            activeId={tab}
            onChange={id => setTab(id as typeof tab)}
          />

          {/* Optional warning alert */}
          {data.showAlert && (
            <Alert
              type="warning"
              layout="inline"
              message="Some roles could not be allocated. Please review manually."
            />
          )}

          {/* Engagement groups */}
          {data.engagements.map(eng => {
            const engVisible = visibleEngIds.includes(eng.id);
            return (
              <div key={eng.id} style={{ display: engVisible ? "flex" : "none", flexDirection: "column", gap: 16 }}>
                {engVisible && visibleEngIds[0] !== eng.id && <Divider orientation="horizontal" />}
                <Accordion title={eng.name} size="body" defaultExpanded>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}>
                    {eng.roles.map(role => (
                      <div key={role.id} style={{ display: roleMatches(role) ? "block" : "none" }}>
                        <RoleCardBlock role={role} unchecked={unchecked} onToggle={toggleId} onStaffedChange={onStaffedChange} />
                      </div>
                    ))}
                  </div>
                </Accordion>
              </div>
            );
          })}

          <div style={{ height: 16 }} />
        </div>

        {/* Sticky actions */}
        <Actions
          variant="sticky-panel"
          leftActions={[{ label: "Cancel", variant: "secondary", onClick: onClose }]}
          rightActions={[
            ...(onCreateScenario ? [{ label: "Create scenario", variant: "secondary" as const, onClick: onCreateScenario }] : []),
            {
              label:    `Fill & Book${staffedCount > 0 ? ` (${staffedCount})` : ""}`,
              variant:  "primary" as const,
              onClick:  () => { onFillBook?.(staffedCount); data.onFillBook?.(); },
              disabled: staffedCount === 0,
            },
          ]}
        />

      </div>
    </SidePanel>
  );
}
