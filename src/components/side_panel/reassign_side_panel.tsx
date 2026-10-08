// ReassignSidePanel — Figma node 11416:198965 (Sidepanel/Reassign booking)
// Source: IPS Components adFvaOeh8E3AKLFKRjYD3r
// Width: 600px
//
// Variants:
//   Type=Matches        — scope radios + Shortlist|Matches|Other toggle + search + WM table
//   Type=Other resources — scope radios + toggle + search + simple list (Radio + name/email)
//   Type=Loading        — same chrome at 0.5 opacity + LoadingIcon + "Matches calculation started"
//
// Shared top: Header (role H4 + "Reassign" subtitle) + scope radios + divider + "Reassign from X to:" + Toggle
// Sticky bottom: Cancel | Reassign

import React, { useState } from "react";
import { SidePanel }       from "./side_panel";
import css from "./side_panel.module.scss";
import { Header }          from "../header/header";
import { Icon }            from "../icon/icon";
import { Button }          from "../button/button";
import { Divider }         from "../divider/divider";
import { InputSearch }     from "../input/input";
import { Actions }         from "../actions/actions";
import { Radio }           from "../radio/radio";
import { Toggle }          from "../toggle/toggle";
import { WorkforceMember } from "../workforce_member/workforce_member";
import { EmptyState }      from "../empty_state/empty_state";
import { LoadingIcon }     from "../loading/loading";
import { Accordion }       from "../accordion/accordion";
import { BookingPill }     from "../booking_pill/booking_pill";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ReassignScope    = "this" | "future" | "all";
export type ReassignListTab  = "shortlist" | "matches" | "other";

export type ReassignCandidate = {
  id:       string;
  name:     string;
  initials: string;
  email?:   string;
  grade?:   string;
  match?:   number;
  avail?:   number;
};

export type BulkBooking = {
  booking:   string;
  role:      string;
  category:  string;
  categoryColor?: string;
  dates:     string;
  hours:     string | number;
};

export type ReassignSidePanelData = {
  roleTitle:           string;
  fromName:            string;
  /** Bulk variant: number of selected bookings */
  bookingCount?:       number;
  /** Bulk variant: selected bookings table */
  bulkBookings?:       BulkBooking[];
  thisBookingDate?:    string;
  futureBookingDate?:  string;
  allBookingsDate?:    string;
  allBookingsCount?:   number;
  candidates?:         ReassignCandidate[];
  lastUpdated?:        string;
  onReassign?:         (candidateId: string, scope: ReassignScope) => void;
  onCancel?:           () => void;
};

export type ReassignVariant = "matches" | "other" | "loading" | "bulk";

export type ReassignSidePanelProps = {
  open:      boolean;
  onClose:   () => void;
  variant?:  ReassignVariant;
  data?:     ReassignSidePanelData;
};

// ── Typography ────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};
const bodyBold: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
  color: "var(--palette-blue-0)", lineHeight: "115%",
};
const labelMuted: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-2)", lineHeight: "150%",
};
const h5: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 16, fontWeight: 600,
  color: "var(--palette-blue-0)", lineHeight: "125%",
};
const bodyPrimary: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
  color: "var(--palette-primary-0)", lineHeight: "115%",
};
const thStyle: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-2)", textAlign: "left",
  padding: "8px 8px", borderBottom: "1px solid var(--palette-neutral-0)",
  whiteSpace: "nowrap",
};
const tdStyle: React.CSSProperties = {
  padding: "10px 8px", verticalAlign: "middle",
  borderBottom: "1px solid var(--palette-neutral-0)",
};

// ── Matches table ─────────────────────────────────────────────────────────────

function MatchesTable({ candidates, selected, onSelect, lastUpdated }: {
  candidates: ReassignCandidate[];
  selected: string | null;
  onSelect: (id: string) => void;
  lastUpdated?: string;
}) {
  if (candidates.length === 0) {
    return (
      <EmptyState
        size="small-vertical"
        title="No matches found"
        subtitle="Try a different search or switch to Other resources"
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Table actions row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Button kind="secondary" size="regular">Pin top 5</Button>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {lastUpdated && <span style={labelMuted}>Last updated: {lastUpdated}</span>}
          <Button kind="iconTertiary" size="regular" title="Refresh">
            <Icon name="refresh" size={16} />
          </Button>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: 32 }} />
            <th style={thStyle}>Workforce Member</th>
            <th style={{ ...thStyle, width: 60 }}>Grade</th>
            <th style={{ ...thStyle, width: 70 }}>Match</th>
            <th style={{ ...thStyle, width: 70 }}>Avail.</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr
              key={c.id}
              onClick={() => onSelect(c.id)}
              style={{
                cursor: "pointer",
                background: selected === c.id ? "var(--palette-primary-3)" : "white",
              }}
            >
              <td style={tdStyle}>
                <Radio
                  checked={selected === c.id}
                  onChange={() => onSelect(c.id)}
                  name="reassign-candidate"
                  value={c.id}
                />
              </td>
              <td style={tdStyle}>
                <WorkforceMember
                  variant="small-2lines"
                  name={c.name}
                  initials={c.initials}
                  email={c.email}
                />
              </td>
              <td style={{ ...tdStyle, ...body }}>{c.grade ?? "—"}</td>
              <td style={{ ...tdStyle, ...body }}>{c.match !== undefined ? `${c.match}%` : "—"}</td>
              <td style={{ ...tdStyle, ...body }}>{c.avail  !== undefined ? `${c.avail}%`  : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Other resources list ──────────────────────────────────────────────────────

function OtherResourcesList({ candidates, selected, onSelect }: {
  candidates: ReassignCandidate[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  if (candidates.length === 0) {
    return (
      <EmptyState
        size="small-vertical"
        title="No resources found"
        subtitle="Try a different search term"
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {candidates.map(c => (
        <div
          key={c.id}
          onClick={() => onSelect(c.id)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 0 4px",
            borderBottom: "1px solid var(--palette-neutral-1)",
            cursor: "pointer",
            background: selected === c.id ? "var(--palette-primary-3)" : "transparent",
          }}
        >
          <Radio
            checked={selected === c.id}
            onChange={() => onSelect(c.id)}
            name="reassign-other"
            value={c.id}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={bodyBold}>{c.name}</span>
            {c.email && <span style={labelMuted}>{c.email}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Bulk — selected bookings accordion + table ────────────────────────────────

function BulkBookingsTable({ bookings }: { bookings: BulkBooking[] }) {
  return (
    <Accordion title="Selected bookings" size="body" defaultExpanded>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
        <thead>
          <tr>
            {["Booking", "Role", "Category", "Dates", "Hours"].map(h => (
              <th key={h} style={thStyle}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, ...bodyPrimary }}>{b.booking}</td>
              <td style={{ ...tdStyle, ...body }}>{b.role}</td>
              <td style={tdStyle}>
                <BookingPill
                  category="booking-blue"
                  label={b.category}
                  size="small"
                />
              </td>
              <td style={{ ...tdStyle, ...body }}>{b.dates}</td>
              <td style={{ ...tdStyle, ...body }}>{b.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Accordion>
  );
}

// ── Loading state ─────────────────────────────────────────────────────────────

function LoadingContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, flex: 1, paddingTop: 32 }}>
      <LoadingIcon />
      <span style={h5}>Matches calculation started</span>
    </div>
  );
}

// ── Shared chrome — scope + toggle + search ───────────────────────────────────

function SharedChrome({
  data,
  scope, onScopeChange,
  listTab, onListTabChange,
  search, onSearchChange,
  disabled,
}: {
  data: ReassignSidePanelData;
  scope: ReassignScope;         onScopeChange: (v: ReassignScope) => void;
  listTab: ReassignListTab;     onListTabChange: (v: ReassignListTab) => void;
  search: string;               onSearchChange: (v: string) => void;
  disabled?: boolean;
}) {
  const opacity = disabled ? 0.5 : 1;
  const pointerEvents: React.CSSProperties["pointerEvents"] = disabled ? "none" : undefined;

  const toggleOptions = [
    { value: "shortlist", label: "Shortlist"        },
    { value: "matches",   label: "Matches"           },
    { value: "other",     label: "Other resources"   },
  ];

  return (
    <>
      {/* Scope radios */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, opacity, pointerEvents }}>
        <span style={body}>Would you like to reassign:</span>
        <Radio
          label="This booking"
          subLabel={data.thisBookingDate}
          checked={scope === "this"}
          onChange={() => onScopeChange("this")}
          name="reassign-scope"
          value="this"
        />
        <Radio
          label="This and future bookings"
          subLabel={data.futureBookingDate}
          checked={scope === "future"}
          onChange={() => onScopeChange("future")}
          name="reassign-scope"
          value="future"
        />
        <Radio
          label={`All ${data.allBookingsCount ?? ""} bookings`.trim()}
          subLabel={data.allBookingsDate}
          checked={scope === "all"}
          onChange={() => onScopeChange("all")}
          name="reassign-scope"
          value="all"
        />
      </div>

      <Divider orientation="horizontal" />

      {/* "Reassign from X to:" + Toggle */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, opacity, pointerEvents }}>
        <span style={body}>
          Reassign from <strong>{data.fromName}</strong> to:
        </span>
        <Toggle
          options={toggleOptions}
          value={listTab}
          onChange={v => onListTabChange(v as ReassignListTab)}
        />
      </div>

      {/* Search */}
      <div style={{ opacity, pointerEvents }}>
        <InputSearch
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          onClear={() => onSearchChange("")}
          placeholder="Search"
        />
      </div>
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function ReassignSidePanel({
  open,
  onClose,
  variant = "matches",
  data = { roleTitle: "Role", fromName: "Unknown" },
}: ReassignSidePanelProps) {
  const [scope,    setScope]    = useState<ReassignScope>("this");
  const [listTab,  setListTab]  = useState<ReassignListTab>("shortlist");
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const isLoading = variant === "loading";
  const isBulk    = variant === "bulk";

  const filtered = (data.candidates ?? []).filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Bulk header shows booking count instead of role title
  const headerTitle = isBulk
    ? `${data.bookingCount ?? data.bulkBookings?.length ?? 0} bookings`
    : data.roleTitle;

  return (
    <SidePanel open={open} onClose={onClose} width={600}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* Scrollable content */}
        <div className={css.content} style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Header — IPS Header component */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Header
              size="content"
              title={headerTitle}
              subtitle="Reassign"
            />
            <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
              <Icon name="cross" size={16} />
            </Button>
          </div>

          {/* Bulk: selected bookings accordion + table */}
          {isBulk && (data.bulkBookings?.length ?? 0) > 0 && (
            <BulkBookingsTable bookings={data.bulkBookings!} />
          )}

          {/* Scope radios + divider + toggle + search — not shown in bulk */}
          {!isBulk && (
            <SharedChrome
              data={data}
              scope={scope}         onScopeChange={setScope}
              listTab={listTab}     onListTabChange={setListTab}
              search={search}       onSearchChange={setSearch}
              disabled={isLoading}
            />
          )}

          {/* Bulk: "Reassign from X to:" + toggle + search (no scope radios) */}
          {isBulk && (
            <>
              <span style={body}>
                Reassign from <strong>{data.fromName}</strong> to:
              </span>
              <Toggle
                options={[
                  { value: "shortlist", label: "Shortlist"      },
                  { value: "matches",   label: "Matches"         },
                  { value: "other",     label: "Other resources" },
                ]}
                value={listTab}
                onChange={v => setListTab(v as ReassignListTab)}
              />
              <InputSearch
                value={search}
                onChange={e => setSearch(e.target.value)}
                onClear={() => setSearch("")}
                placeholder="Search"
              />
            </>
          )}

          {/* Content area */}
          {isLoading ? (
            <LoadingContent />
          ) : variant === "other" ? (
            <OtherResourcesList
              candidates={filtered}
              selected={selected}
              onSelect={setSelected}
            />
          ) : (
            <MatchesTable
              candidates={filtered}
              selected={selected}
              onSelect={setSelected}
              lastUpdated={data.lastUpdated}
            />
          )}

          <div style={{ height: 16 }} />
        </div>

        {/* Sticky actions */}
        <Actions
          variant="sticky-panel"
          leftActions={[{ label: "Cancel",   variant: "secondary", onClick: onClose }]}
          rightActions={[{
            label:    "Reassign",
            variant:  "primary",
            disabled: !selected || isLoading,
            onClick:  () => selected && data.onReassign?.(selected, scope),
          }]}
        />

      </div>
    </SidePanel>
  );
}
