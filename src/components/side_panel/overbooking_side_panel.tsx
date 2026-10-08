// OverbookingSidePanel — Figma node 4029:116175 (Sidepanel/BM/Overbookings)
// Source: IPS Components adFvaOeh8E3AKLFKRjYD3r
// Width: 400px — single variant, view-only (no sticky actions)
//
// Structure:
//   Header: profile icon + person name (H4) + "Overbookings" subtitle (indented)
//   "Bookings from" InputSelect (full width, "All")
//   Row: InputSelect "Latest" (sort icon) + "N overbooking ranges" label
//   Overbooking tiles (Tile object-dark), each:
//     Header row: chevron expand + warning icon + bold date range + "Show" link button
//     Item rows:  label-bold role name + BookingPill + edit + remove icon buttons

import React, { useState } from "react";
import { SidePanel }        from "./side_panel";
import css from "./side_panel.module.scss";
import { Header }           from "../header/header";
import { Icon }             from "../icon/icon";
import { Button }           from "../button/button";
import { Tile }             from "../tile/tile";
import { BookingPill }      from "../booking_pill/booking_pill";
import type { BookingPillCategory } from "../booking_pill/booking_pill";

// ── Types ─────────────────────────────────────────────────────────────────────

export type OverbookingItem = {
  roleName:         string;
  bookingLabel:     string;
  bookingCategory?: BookingPillCategory;
  onEdit?:          () => void;
  onRemove?:        () => void;
};

export type OverbookingRange = {
  id:          string;
  dateRange:   string;     // e.g. "20 Apr - 26 Apr 2026"
  subtitle:    string;     // e.g. "8 hours over per day"
  items:       OverbookingItem[];
  onShow?:     () => void;
};

export type OverbookingSidePanelData = {
  personName:    string;
  bookingsFrom?: string;   // filter value, default "All"
  sortValue?:    string;   // sort value, default "Latest"
  ranges:        OverbookingRange[];
  onClose?:      () => void;
};

export type OverbookingSidePanelProps = {
  open:    boolean;
  onClose: () => void;
  data?:   OverbookingSidePanelData;
};

// ── Typography ────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};
const labelBold: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 700,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};
const labelMuted: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-2)", lineHeight: "150%",
};
const bodyBold: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};

// ── Overbooking tile ──────────────────────────────────────────────────────────

function OverbookingTile({ range }: { range: OverbookingRange }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Tile tileStyle="object-dark" padding="panel" style={{ gap: 0, padding: 0 }}>
      {/* Header row */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: 8,
        borderRadius: expanded ? "8px 8px 0 0" : "8px",
      }}>
        {/* Expand/collapse chevron */}
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

        {/* Warning icon */}
        <Icon name="warning" size={16} style={{ color: "var(--palette-orange-1)", flexShrink: 0 }} />

        {/* Date range — fills remaining space */}
        <span style={{ ...bodyBold, flex: 1 }}>{range.dateRange}</span>

        {/* Show link */}
        <Button kind="link" size="regular" onClick={range.onShow}>Show</Button>
      </div>

      {/* Subtitle — only when expanded */}
      {expanded && (
        <div style={{ padding: "8px 8px 0", paddingLeft: 44 }}>
          <span style={body}>{range.subtitle}</span>
        </div>
      )}

      {/* Item rows */}
      {expanded && range.items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "4px 8px",
            background: "var(--palette-white-0)",
            borderTop: "1px solid var(--palette-neutral-0)",
          }}
        >
          {/* Role name */}
          <span style={{ ...labelBold, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.roleName}</span>

          {/* BookingPill small — height is content-driven */}
          <div style={{ flexShrink: 0 }}>
            <BookingPill
              category={item.bookingCategory ?? "booking-blue"}
              label={item.bookingLabel}
              size="small"
            />
          </div>

          {/* Edit */}
          <Button kind="iconTertiary" size="regular" title="Edit" onClick={item.onEdit}>
            <Icon name="edit" size={16} style={{ color: "var(--palette-blue-2)" }} />
          </Button>

          {/* Remove */}
          <Button kind="iconTertiary" size="regular" title="Remove" onClick={item.onRemove}>
            <Icon name="remove" size={16} style={{ color: "var(--palette-blue-2)" }} />
          </Button>
        </div>
      ))}
    </Tile>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function OverbookingSidePanel({
  open,
  onClose,
  data = { personName: "Workforce Member", ranges: [] },
}: OverbookingSidePanelProps) {
  const rangeCount = data.ranges.length;
  const rangeLabel = `${rangeCount} overbooking range${rangeCount !== 1 ? "s" : ""}`;

  return (
    <SidePanel open={open} onClose={onClose} width={400}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* Scrollable content */}
        <div className={css.content} style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Header — profile icon + name + "Overbookings" subtitle */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Header
                size="content"
                title={data.personName}
                leftIcon="profile"
              />
              {/* "Overbookings" subtitle indented to align with title (past icon + 8px gap) */}
              <span style={{ ...labelMuted, paddingLeft: 28 }}>Overbookings</span>
            </div>
            <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
              <Icon name="cross" size={16} />
            </Button>
          </div>

          {/* Sort row: sort-icon trigger (hug content) + range count label */}
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

          {/* Overbooking tiles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {data.ranges.map(range => (
              <OverbookingTile key={range.id} range={range} />
            ))}
          </div>

          <div style={{ height: 16 }} />
        </div>

      </div>
    </SidePanel>
  );
}
