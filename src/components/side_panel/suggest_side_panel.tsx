// SuggestSidePanel — Figma "Suggest side panel" 119:27378 (Improve end to end resourcing of named resources)
// Width: 600px
//
// Header (role title + "Suggested WM") → info Alert with the open vacancies → "Suggested WM" table (sortable; empty state
// "No suggested WM") → divider → "Pick WMs below to be suggested above" → Shortlist | Matches | Other resources toggle →
// search → WM table with a Suggest button per row (a suggested row turns the button into "Suggested", which removes it).
// Sticky bottom: Done.

import React, { useEffect, useMemo, useState } from "react";
import { SidePanel }       from "./side_panel";
import css from "./side_panel.module.scss";
import { Header }          from "../header/header";
import { Icon }            from "../icon/icon";
import { Button }          from "../button/button";
import { Divider }         from "../divider/divider";
import { InputSearch }     from "../input/input";
import { Actions }         from "../actions/actions";
import { Toggle }          from "../toggle/toggle";
import { Alert }           from "../alert/alert";
import { Avatar }          from "../avatar/avatar";
import { PillRemovable, PillSimple } from "../pill/pill";
import { Table }           from "../table/table";
import type { SortDirection, TableColumn, TableRow } from "../table/table";
import { EmptyState }      from "../empty_state/empty_state";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SuggestCandidate = {
  id:         string;
  name:       string;
  initials:   string;
  email?:     string;
  avatarSrc?: string;
  /** WM grade / rank, e.g. "Manager" */
  rank?:      string;
  /** Match with the role, 0–100 */
  match?:     number;
  /** Availability for the role, 0–100 */
  avail?:     number;
  /** e.g. "Shortlisted" */
  status?:    string;
};

export type SuggestListTab = "shortlist" | "matches" | "other";

export type SuggestSidePanelProps = {
  open:     boolean;
  onClose:  () => void;
  /** Role the suggestions are for (header title) */
  roleTitle: string;
  /** Header subtitle (default "Suggested WM") */
  subtitle?: string;
  /** How many WMs can be suggested for the role (default 1) */
  vacancies?: number;
  /** Rank the role asks for: a suggested WM of that rank gets a green check in the Grade column */
  requestedRank?: string;
  /** Candidates per tab */
  shortlist?: SuggestCandidate[];
  matches?:   SuggestCandidate[];
  other?:     SuggestCandidate[];
  /** WMs already suggested when the panel opens */
  suggested?: SuggestCandidate[];
  /** Every Suggest / remove */
  onChange?:  (suggested: SuggestCandidate[]) => void;
  /** Done: the final list (the panel closes itself) */
  onDone?:    (suggested: SuggestCandidate[]) => void;
};

// ── Typography ────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};
const bodyBold: React.CSSProperties = { ...body, fontWeight: 700, lineHeight: "115%" };
const labelMuted: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-2)", lineHeight: "150%",
};

// ── Tables: the IPS Table (compact, fixed layout so text truncates, 12px headers, row hover) ─────────────────────────

type Row = SuggestCandidate & TableRow;
type SortState = { key: string; dir: "asc" | "desc" } | null;

function sortRows(rows: Row[], sort: SortState): Row[] {
  if (!sort) return rows;
  const val = (c: Row): string | number => {
    switch (sort.key) {
      case "name":   return c.name.toLowerCase();
      case "match":  return c.match ?? -1;
      case "avail":  return c.avail ?? -1;
      case "status": return (c.status ?? "").toLowerCase();
      case "rank":   return (c.rank ?? "").toLowerCase();
      default:       return 0;
    }
  };
  const out = [...rows].sort((a, b) => (val(a) < val(b) ? -1 : val(a) > val(b) ? 1 : 0));
  return sort.dir === "asc" ? out : out.reverse();
}

// Sorting state for a Table: `props` go straight onto the component, `apply` sorts the rows
function useSort() {
  const [sort, setSort] = useState<SortState>(null);
  return {
    props: {
      sortKey: sort?.key,
      sortDirection: (sort?.dir ?? "none") as SortDirection,
      onSort: (key: string, dir: SortDirection) => setSort(dir === "none" ? null : { key, dir }),
    },
    apply: (rows: Row[]) => sortRows(rows, sort),
  };
}

// The (fixed layout) Table's cells indent their text by 8px; the Figma tables are flush with the panel content, so they bleed out by the same amount
const TABLE_BLEED: React.CSSProperties = { margin: "0 -8px" };
const ellipsis: React.CSSProperties = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 };
const pct = (n?: number) => (n === undefined ? "–" : `${n}%`);

// Name + email (no avatar, as in the Figma list); the email truncates, a suggested WM gets the "suggested" icon next to the name
function WMNameCell({ name, email, suggested }: { name: string; email?: string; suggested?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
        <span style={{ ...bodyBold, ...ellipsis }}>{name}</span>
        {suggested && <Icon name="suggested" size={16} style={{ flexShrink: 0 }} />}
      </span>
      {email && <span style={{ ...labelMuted, color: "var(--palette-blue-0)", ...ellipsis }}>{email}</span>}
    </div>
  );
}

// ── Suggested WM table ────────────────────────────────────────────────────────

function SuggestedTable({ rows, requestedRank, onRemove }: { rows: SuggestCandidate[]; requestedRank?: string; onRemove: (id: string) => void }) {
  const { props, apply } = useSort();
  const sorted = useMemo(() => apply(rows as Row[]), [rows, props.sortKey, props.sortDirection]); // eslint-disable-line react-hooks/exhaustive-deps

  const columns: TableColumn<Row>[] = [
    { key: "name", header: "Suggested WM", sortable: true,
      renderCell: c => (
        <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span style={{ flexShrink: 0, display: "inline-flex" }}><Avatar initials={c.initials} src={c.avatarSrc} size="small" /></span>
          <span style={{ ...bodyBold, ...ellipsis }}>{c.name}</span>
        </span>
      ) },
    { key: "rank", header: "WM Grade", width: "96px",
      renderCell: c => (
        <span style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 0 }}>
          {requestedRank && c.rank === requestedRank && <Icon name="check" size={16} style={{ color: "var(--palette-green-0)", flexShrink: 0 }} />}
          <span style={{ ...body, ...ellipsis }}>{c.rank ?? "–"}</span>
        </span>
      ) },
    { key: "match", header: "Match", sortable: true, width: "72px", align: "right", renderCell: c => <span style={bodyBold}>{pct(c.match)}</span> },
    { key: "avail", header: "Avail.", sortable: true, width: "72px", align: "right", renderCell: c => <span style={bodyBold}>{pct(c.avail)}</span> },
    { key: "status", header: "Shortlist status", sortable: true, width: "116px",
      renderCell: c => (
        <span style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 0 }}>
          {c.status && <span style={{ minWidth: 0, display: "inline-flex" }}><PillSimple label={c.status} size="small" /></span>}
          <Button kind="iconTertiary" size="regular" title={`Remove ${c.name}`} onClick={() => onRemove(c.id)}>
            <Icon name="cross" size={16} />
          </Button>
        </span>
      ) },
  ];

  return (
    <div style={TABLE_BLEED}>
      <Table<Row> columns={columns} rows={sorted} compact layout="fixed" headerSize="label" {...props} />
      {sorted.length === 0 && (
        // Same height as a row with a suggested WM (51px incl. its 1px bottom border), so the table doesn't jump when someone is suggested
        <div style={{ height: 51, boxSizing: "border-box", display: "flex", alignItems: "center", padding: "0 8px", borderBottom: "1px solid var(--palette-neutral-0)" }}>
          <EmptyState size="small-horizontal" title="No suggested WM" />
        </div>
      )}
    </div>
  );
}

// ── Candidates table ──────────────────────────────────────────────────────────

function CandidatesTable({ rows, suggestedIds, canSuggest, onSuggest, onRemove }: {
  rows: SuggestCandidate[];
  suggestedIds: Set<string>;
  canSuggest: boolean;
  onSuggest: (c: SuggestCandidate) => void;
  onRemove: (id: string) => void;
}) {
  const { props, apply } = useSort();
  const sorted = useMemo(() => apply(rows as Row[]), [rows, props.sortKey, props.sortDirection]); // eslint-disable-line react-hooks/exhaustive-deps

  const columns: TableColumn<Row>[] = [
    { key: "name", header: "WM", sortable: true, renderCell: c => <WMNameCell name={c.name} email={c.email} suggested={suggestedIds.has(c.id)} /> },
    { key: "rank", header: "Rank", width: "82px", type: "text-regular" },
    { key: "match", header: "Match", sortable: true, width: "72px", align: "right", renderCell: c => <span style={body}>{pct(c.match)}</span> },
    { key: "avail", header: "Avail.", sortable: true, width: "72px", align: "right", renderCell: c => <span style={body}>{pct(c.avail)}</span> },
    { key: "status", header: "Shortlist status", sortable: true, width: "104px",
      renderCell: c => c.status ? (
        <span style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
          <span style={{ ...body, ...ellipsis }}>{c.status}</span>
          <Icon name="history" size={14} style={{ flexShrink: 0 }} />
        </span>
      ) : <span style={labelMuted}>–</span> },
    { key: "action", header: "", width: "116px", align: "right",
      renderCell: c => suggestedIds.has(c.id) ? (
        <PillRemovable label="Suggested" size="small" onRemove={() => onRemove(c.id)} />
      ) : (
        <Button kind="secondary" size="small" disabled={!canSuggest} onClick={() => onSuggest(c)} title={canSuggest ? undefined : "All vacancies are suggested"}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="suggested" size={14} />
            Suggest
          </span>
        </Button>
      ) },
  ];

  return <div style={TABLE_BLEED}><Table<Row> columns={columns} rows={sorted} compact layout="fixed" headerSize="label" {...props} /></div>;
}

// ── Main component ────────────────────────────────────────────────────────────

export function SuggestSidePanel({
  open, onClose, roleTitle, subtitle = "Suggested WM", vacancies = 1, requestedRank,
  shortlist = [], matches = [], other = [], suggested = [], onChange, onDone,
}: SuggestSidePanelProps) {
  const [tab, setTab] = useState<SuggestListTab>("shortlist");
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState<SuggestCandidate[]>(suggested);

  // Every opening starts from the WMs already suggested for the role, on the Shortlist tab
  useEffect(() => {
    if (open) { setPicked(suggested); setTab("shortlist"); setSearch(""); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const update = (next: SuggestCandidate[]) => { setPicked(next); onChange?.(next); };
  const suggest = (c: SuggestCandidate) => update([...picked, c]);
  const remove = (id: string) => update(picked.filter(p => p.id !== id));

  const left = Math.max(0, vacancies - picked.length);
  const alertMessage = left > 0 ? `${left} open ${left === 1 ? "vacancy" : "vacancies"} left` : "All vacancies are suggested";

  const list = tab === "shortlist" ? shortlist : tab === "matches" ? matches : other;
  const q = search.trim().toLowerCase();
  const rows = q ? list.filter(c => c.name.toLowerCase().includes(q) || (c.email ?? "").toLowerCase().includes(q)) : list;
  const suggestedIds = useMemo(() => new Set(picked.map(p => p.id)), [picked]);

  return (
    <SidePanel open={open} onClose={onClose} width={600}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* Scrollable content */}
        <div className={css.content} style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 16 }}>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Header size="content" title={roleTitle} subtitle={subtitle} />
            <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
              <Icon name="cross" size={16} />
            </Button>
          </div>

          <Alert type="general" message={alertMessage} />

          <SuggestedTable rows={picked} requestedRank={requestedRank} onRemove={remove} />

          <Divider orientation="horizontal" />

          <span style={body}>Pick WMs below to be suggested above</span>

          <Toggle
            options={[
              { value: "shortlist", label: "Shortlist" },
              { value: "matches",   label: "Matches" },
              { value: "other",     label: "Other resources" },
            ]}
            value={tab}
            onChange={v => setTab(v as SuggestListTab)}
          />

          <InputSearch value={search} onChange={e => setSearch(e.target.value)} onClear={() => setSearch("")} placeholder="Search" />

          <CandidatesTable rows={rows} suggestedIds={suggestedIds} canSuggest={left > 0} onSuggest={suggest} onRemove={remove} />

          <div style={{ height: 16 }} />
        </div>

        {/* Sticky actions */}
        <Actions
          variant="sticky-panel"
          rightActions={[{ label: "Done", variant: "primary", onClick: () => { onDone?.(picked); onClose(); } }]}
        />

      </div>
    </SidePanel>
  );
}
