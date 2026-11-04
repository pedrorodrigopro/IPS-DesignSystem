// MisalignmentSidePanel — Figma node 6958:182317 (Sidepanel/BM/Misalignments)
// Source: IPS Components adFvaOeh8E3AKLFKRjYD3r
// Width: 400px — single variant, view-only (no sticky actions)
//
// Structure (very similar to OverbookingSidePanel):
//   Header: role icon + role name (H4) + "Misalignments" subtitle (indented)
//   "Workforce Member" InputSelect (full width, e.g. "All (2 vacancies)")
//   Row: sort button "Latest" + "N misalignments" label
//   Misalignment tiles (Tile object-dark), each:
//     Header row: chevron expand + calendar-delete icon + bold date range + "Show" link
//     Subtitle: "Duration, start date, end date" (below header)
//     Item rows: field name (body-bold) | Expected: X | Current: Y

import React, { useState } from "react";
import { SidePanel }        from "./side_panel";
import css from "./side_panel.module.scss";
import { Header }           from "../header/header";
import { Icon }             from "../icon/icon";
import { Button }           from "../button/button";
import { InputSelect }      from "../input/input";
import { Tile }             from "../tile/tile";
import { Actions }          from "../actions/actions";

// ── Types ─────────────────────────────────────────────────────────────────────

export type MisalignmentItem = {
  fieldName: string;   // e.g. "Duration", "Start date", "End date"
  expected:  string;   // e.g. "40h", "13 Mar 2026"
  current:   string;   // e.g. "16h", "15 Mar 2026"
};

export type MisalignmentRange = {
  id:        string;
  dateRange: string;   // e.g. "13 Mar 2026 - 17 Mar 2026"
  subtitle:  string;   // e.g. "Duration, start date, end date"
  items:     MisalignmentItem[];
  onShow?:   () => void;
};

export type MisalignmentSidePanelData = {
  roleName:         string;
  /** Show the booked WM as read-only text (label + bold name) instead of the select field; also hides the sort row */
  wmName?:          string;
  /** Labels for the two values of each item (default "Expected" / "Current") */
  expectedLabel?:   string;
  currentLabel?:    string;
  wmFilterValue?:   string;   // default "All (2 vacancies)"
  sortValue?:       string;   // default "Latest"
  ranges:           MisalignmentRange[];
};

export type MisalignmentSidePanelProps = {
  open:    boolean;
  onClose: () => void;
  data?:   MisalignmentSidePanelData;
  /** Sticky footer: Close (secondary, left) + Fix (primary, right). Footer hidden when omitted. */
  onFix?:  () => void;
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

// ── Misalignment tile ─────────────────────────────────────────────────────────

function MisalignmentTile({ range, expectedLabel = "Expected", currentLabel = "Current", alignColumns = false }: { range: MisalignmentRange; expectedLabel?: string; currentLabel?: string; alignColumns?: boolean }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Tile tileStyle="object-dark" padding="panel" style={{ padding: 0, borderRadius: 8, overflow: "hidden", gap: 0 }}>
      {/* Header row */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: 8,
      }}>
        {/* Expand/collapse */}
        <Button
          kind="iconTertiary"
          size="regular"
          title={expanded ? "Collapse" : "Expand"}
          onClick={() => setExpanded(e => !e)}
          style={{ flexShrink: 0 }}
        >
          <Icon
            name={expanded ? "chevron-up" : "chevron-down"}
            size={16}
            style={{ color: "var(--palette-blue-0)" }}
          />
        </Button>

        {/* Calendar-delete icon — orange-3 */}
        <Icon name="calendar-delete" size={16} style={{ color: "var(--palette-orange-3)", flexShrink: 0 }} />

        {/* Date range */}
        <span style={{ ...bodyBold, flex: 1 }}>{range.dateRange}</span>

        {/* Show link */}
        <Button kind="link" size="regular" onClick={range.onShow}>Show</Button>
      </div>

      {/* Subtitle */}
      {expanded && (
        <div style={{ padding: "0 8px 0 44px" }}>
          <span style={body}>{range.subtitle}</span>
        </div>
      )}

      {/* Item rows — white bg, field name on top, Expected/Current below */}
      {expanded && range.items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex", flexDirection: "column", gap: 0,
            padding: "8px 8px 8px 8px",
            background: "var(--palette-white-0)",
            borderTop: "1px solid var(--palette-neutral-0)",
          }}
        >
          <span style={bodyBold}>{item.fieldName}</span>
          <div style={alignColumns ? { display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 16 } : { display: "flex", gap: 32 }}>
            <span style={body}>{expectedLabel}: {item.expected}</span>
            <span style={body}>{currentLabel}: {item.current}</span>
          </div>
        </div>
      ))}
    </Tile>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function MisalignmentSidePanel({
  open,
  onClose,
  data = { roleName: "Role", ranges: [] },
  onFix,
}: MisalignmentSidePanelProps) {
  const rangeCount = data.ranges.length;
  const rangeLabel = `${rangeCount} misalignment${rangeCount !== 1 ? "s" : ""}`;

  return (
    <SidePanel open={open} onClose={onClose} width={400}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* Scrollable content */}
        <div className={css.content} style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Header — role icon + role name + "Misalignments" subtitle */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Header
                size="content"
                title={data.roleName}
                leftIcon="role"
              />
              <span style={{ ...labelMuted, paddingLeft: 28 }}>Misalignments</span>
            </div>
            <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
              <Icon name="cross" size={16} />
            </Button>
          </div>

          {/* Workforce Member — read-only text when wmName is given, otherwise the select field */}
          {data.wmName ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ ...body, fontSize: 12 }}>Workforce Member</span>
              <span style={bodyBold}>{data.wmName}</span>
            </div>
          ) : (
            <InputSelect
              label="Workforce Member"
              value={data.wmFilterValue ?? "All (2 vacancies)"}
              readOnly
            />
          )}

          {/* Sort row */}
          {!data.wmName && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              height: 40, padding: "0 8px",
              border: "1px solid var(--palette-neutral-0)",
              borderRadius: "var(--radius-md)",
              background: "white", cursor: "pointer",
              fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
              color: "var(--palette-blue-0)", whiteSpace: "nowrap",
            }}>
              {data.sortValue ?? "Latest"}
              <Icon name="sort" size={16} style={{ color: "var(--palette-blue-0)", flexShrink: 0 }} />
            </button>
            <span style={{ ...labelMuted, whiteSpace: "nowrap" }}>{rangeLabel}</span>
          </div>
          )}

          {/* Misalignment tiles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {data.ranges.map(range => (
              <MisalignmentTile key={range.id} range={range} expectedLabel={data.expectedLabel} currentLabel={data.currentLabel} alignColumns={!!data.expectedLabel} />
            ))}
          </div>

          <div style={{ height: 16 }} />
        </div>

        {onFix && (
          <Actions
            variant="sticky-panel"
            leftActions={[{ label: "Close", variant: "secondary", onClick: onClose }]}
            rightActions={[{ label: "Fix", variant: "primary", onClick: onFix }]}
          />
        )}

      </div>
    </SidePanel>
  );
}
