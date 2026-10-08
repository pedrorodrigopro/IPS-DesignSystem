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
  open:    boolean;
  onClose: () => void;
  data?:   SmartAllocateSidePanelData;
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
  vacancy, onEdit, onFillBook,
}: {
  vacancy:     StaffedVacancy;
  onEdit:      () => void;
  onFillBook:  () => void;
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
        {/* Figma: IMAGE-SVG checkbox — not interactive on staffed rows */}
        <Checkbox checked={false} onChange={() => {}} />
      </td>
      <td style={tdBase}>
        <WorkforceMember variant="small-1line" name={vacancy.wmName} initials={vacancy.wmInitials} />
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

type SelectedWM = { id: string; name: string; initials: string; grade?: string; gradeMatch?: boolean; cost?: string; matchPct?: number; availPct?: number; wfState?: SmartAllocateWFState };

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

      {/* Matches | Shortlist | Other resource toggle — spans Grade+Cost+Match+Avail cols */}
      <td colSpan={4} style={tdBase}>
        <Toggle
          options={[
            { value: "matches",         label: "Matches"        },
            { value: "shortlist",       label: "Shortlist"      },
            { value: "other-resource",  label: "Other resource" },
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

function VacancyRow({ vacancy }: { vacancy: Vacancy }) {
  // Local WM state — starts from the vacancy data, can be changed by selecting from dropdown
  const [wm, setWM] = useState<SelectedWM | null>(
    vacancy.type === "staffed"
      ? { id: vacancy.id, name: vacancy.wmName, initials: vacancy.wmInitials, grade: vacancy.grade, gradeMatch: vacancy.gradeMatch, matchPct: vacancy.matchPct, availPct: vacancy.availPct, wfState: vacancy.wfState }
      : null
  );

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
        }}
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

function RoleCardBlock({ role }: { role: RoleCard }) {
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
              <VacancyRow key={v.id} vacancy={v} />
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
}: SmartAllocateSidePanelProps) {
  const staffedCount = data.engagements
    .flatMap(e => e.roles)
    .flatMap(r => r.vacancies)
    .filter(v => v.type === "staffed").length;

  return (
    <SidePanel open={open} onClose={onClose} width={900}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        <div className={css.content} style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Header size="content" title="Smart allocate" />
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

          {/* Optional warning alert */}
          {data.showAlert && (
            <Alert
              type="warning"
              layout="inline"
              message="Some roles could not be allocated. Please review manually."
            />
          )}

          {/* Engagement groups */}
          {data.engagements.map((eng, i) => (
            <React.Fragment key={eng.id}>
              {i > 0 && <Divider orientation="horizontal" />}
              <Accordion title={eng.name} size="body" defaultExpanded>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}>
                  {eng.roles.map(role => (
                    <RoleCardBlock key={role.id} role={role} />
                  ))}
                </div>
              </Accordion>
            </React.Fragment>
          ))}

          <div style={{ height: 16 }} />
        </div>

        {/* Sticky actions */}
        <Actions
          variant="sticky-panel"
          leftActions={[{ label: "Cancel", variant: "secondary", onClick: onClose }]}
          rightActions={[{
            label:    `Fill & Book${staffedCount > 0 ? ` (${staffedCount})` : ""}`,
            variant:  "primary",
            onClick:  data.onFillBook,
            disabled: staffedCount === 0,
          }]}
        />

      </div>
    </SidePanel>
  );
}
