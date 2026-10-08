// NotificationsSidePanel — Figma node 1737:67156 (Sidepanel/Notifications)
// Source: IPS Components adFvaOeh8E3AKLFKRjYD3r
// Width: 400px — opens from LEFT (next to navbar), borderRadius: 0 8px 8px 0
//
// Structure:
//   Header: "Notifications" H4 + close icon
//   Filters block (Accordion collapsed/expanded):
//     Collapsed: "Filters (N) and grouping" + filter-clean icon
//     Expanded: InputSelect × 4 (Engagement, Role, Notification type, Group by)
//   Subheader row: "N unread" label + Switch "Unread only" + refresh icon
//   Notification list — each item:
//     Optional "Urgent" pill (red bg)
//     Message row: unseen dot (blue, hidden when seen) + title (bold=unseen / regular=seen)
//     Body text (label-regular)
//     Metadata: Engagement / Role (label-regular, bold prefix)
//     Date (label-regular, muted)
//     Actions: "Options" secondary + "Open history" primary (split button)
//     Hover: rgba(0,0,0,0.04) background

import React, { useState } from "react";
import { SidePanel }        from "./side_panel";
import css from "./side_panel.module.scss";
import { Header }           from "../header/header";
import { Icon }             from "../icon/icon";
import { Button }           from "../button/button";
import { Divider }          from "../divider/divider";
import { Accordion }        from "../accordion/accordion";
import { InputSelect }      from "../input/input";
import { Switch }           from "../switch/switch";
import { PillSimple }       from "../pill/pill";

// ── Types ─────────────────────────────────────────────────────────────────────

export type NotificationHourChange = {
  day:     string;   // "M" | "T" | "W" etc.
  value:   string;
  changed: boolean;  // true = highlight with neutral-1 pill
};

export type NotificationChange = {
  /** Layout: hours grid (date range + M/T/W/T/F/S/S hours) */
  type:          "hours";
  beforeDate:    string;
  afterDate:     string;
  beforeHours?:  NotificationHourChange[];
  afterHours?:   NotificationHourChange[];
} | {
  /** Layout: two columns (Before | After) with date values */
  type:          "dates";
  beforeDate:    string;
  afterDate:     string;
  beforeChanged?: boolean;
  afterChanged?:  boolean;
};

export type NotificationItem = {
  id:           string;
  unseen:       boolean;
  urgent?:      boolean;
  title:        string;
  body:         string;
  changes?:     NotificationChange;
  engagement?:  string;
  role?:        string;
  date:         string;
  onOptions?:   () => void;
  onOpenHistory?: () => void;
};

export type NotificationFilters = {
  engagement?:      string;
  role?:            string;
  notificationType?: string;
  groupBy?:         string;
  filterCount?:     number;
};

export type NotificationsSidePanelData = {
  notifications:  NotificationItem[];
  filters?:       NotificationFilters;
  unreadCount?:   number;
  onClearFilters?: () => void;
  onRefresh?:     () => void;
};

export type NotificationsSidePanelProps = {
  open:    boolean;
  onClose: () => void;
  data?:   NotificationsSidePanelData;
};

// ── Typography ────────────────────────────────────────────────────────────────

const bodyBold: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};
const bodyReg: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};
const labelReg: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};
const labelMuted: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-2)", lineHeight: "150%",
};

// ── Notification change block ─────────────────────────────────────────────────

function HourCell({ h }: { h: NotificationHourChange }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 2,
      padding: h.changed ? "2px 6px" : "2px 0",
      background: h.changed ? "var(--palette-neutral-1)" : "transparent",
      borderRadius: h.changed ? "var(--radius-full)" : 0,
    }}>
      <span style={{ ...labelReg, color: "var(--palette-blue-2)" }}>{h.day}:</span>
      <span style={{ ...labelReg, fontWeight: h.changed ? 700 : 400 }}>{h.value}</span>
    </div>
  );
}

function NotificationChangeBlock({ change }: { change: NotificationChange }) {
  return (
    <div style={{
      background: "var(--palette-neutral-1)",
      border: "1px solid var(--palette-neutral-0)",
      borderRadius: "var(--radius-md)",
      padding: 12,
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      {change.type === "hours" ? (
        <>
          {/* Before row */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ ...labelReg, fontWeight: 700 }}>Before</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={labelReg}>{change.beforeDate}</span>
              {change.beforeHours && (
                <>
                  <div style={{ width: 1, background: "var(--palette-neutral-0)", alignSelf: "stretch" }} />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {change.beforeHours.map(h => <HourCell key={h.day} h={h} />)}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* After row */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ ...labelReg, fontWeight: 700 }}>After</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={labelReg}>{change.afterDate}</span>
              {change.afterHours && (
                <>
                  <div style={{ width: 1, background: "var(--palette-neutral-0)", alignSelf: "stretch" }} />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {change.afterHours.map(h => <HourCell key={h.day} h={h} />)}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Dates layout — two columns */
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", gap: 32 }}>
            <span style={{ ...labelReg, fontWeight: 700, flex: 1 }}>Before</span>
            <span style={{ ...labelReg, fontWeight: 700, flex: 1 }}>After</span>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <div style={{ flex: 1 }}>
              <span style={{
                ...labelReg,
                ...(change.beforeChanged ? {
                  background: "var(--palette-neutral-1)",
                  padding: "2px 8px", borderRadius: "var(--radius-full)", fontWeight: 700,
                } : {}),
              }}>{change.beforeDate}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{
                ...labelReg,
                ...(change.afterChanged ? {
                  background: "var(--palette-neutral-1)",
                  padding: "2px 8px", borderRadius: "var(--radius-full)", fontWeight: 700,
                } : {}),
              }}>{change.afterDate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Filters block ─────────────────────────────────────────────────────────────

function FiltersBlock({ filters, filterCount, onClear }: {
  filters:     NotificationFilters;
  filterCount: number;
  onClear?:    () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: "var(--palette-neutral-2)",
      borderRadius: "var(--radius-md)",
      padding: 16,
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            display: "flex", alignItems: "center", gap: 8, flex: 1,
            background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left",
          }}
        >
          <Icon
            name={expanded ? "chevron-down" : "chevron-right"}
            size={16}
            style={{ color: "var(--palette-blue-0)", flexShrink: 0 }}
          />
          <span style={{ ...bodyBold }}>
            Filters{filterCount > 0 ? ` (${filterCount})` : ""} and grouping
          </span>
        </button>
        <Button kind="iconTertiary" size="regular" title="Clear filters" onClick={onClear}>
          <Icon name="filter-clean" size={16} style={{ color: "var(--palette-blue-2)" }} />
        </Button>
      </div>

      {/* Filter inputs — when expanded */}
      {expanded && (
        <>
          <InputSelect label="Engagement" value={filters.engagement ?? ""} placeholder="All" />
          <InputSelect label="Role" value={filters.role ?? ""} placeholder="All" />
          <InputSelect label="Notification type" value={filters.notificationType ?? ""} placeholder="All" />
          <InputSelect label="Group by" value={filters.groupBy ?? "None"} />
        </>
      )}
    </div>
  );
}

// ── Notification item ─────────────────────────────────────────────────────────

function NotificationItemRow({ item }: { item: NotificationItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", gap: 8,
        padding: "12px 8px",
        background: hovered ? "rgba(0,0,0,0.04)" : "white",
        borderBottom: "1px solid var(--palette-neutral-0)",
        transition: "background 0.1s",
      }}
    >
      {/* Urgent pill */}
      {item.urgent && (
        <div>
          <PillSimple
            label="Urgent"
            bg="var(--palette-red-2)"
            color="var(--palette-red-1)"
            size="regular"
          />
        </div>
      )}

      {/* Title row: unseen dot + title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%", flexShrink: 0, marginTop: 5,
          background: item.unseen ? "var(--palette-primary-0)" : "transparent",
        }} />
        <span style={item.unseen ? bodyBold : bodyReg}>{item.title}</span>
      </div>

      {/* Body text */}
      <div style={{ paddingLeft: 16 }}>
        <span style={labelReg}>{item.body}</span>
      </div>

      {/* Changes block — Before/After */}
      {item.changes && (
        <div style={{ paddingLeft: 16 }}>
          <NotificationChangeBlock change={item.changes} />
        </div>
      )}

      {/* Metadata: Engagement + Role */}
      {(item.engagement || item.role) && (
        <div style={{ paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
          {item.engagement && (
            <span style={labelReg}>
              <strong>Engagement</strong>: {item.engagement}
            </span>
          )}
          {item.role && (
            <span style={labelReg}>
              <strong>Role</strong>: {item.role}
            </span>
          )}
        </div>
      )}

      {/* Date */}
      <div style={{ paddingLeft: 16 }}>
        <span style={labelMuted}>{item.date}</span>
      </div>

      {/* Actions — always visible */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8 }}>
        <Button kind="secondary" size="small" onClick={item.onOptions}>
          Options <Icon name="chevron-down" size={14} />
        </Button>
        <div style={{ display: "flex" }}>
          <Button
            kind="primary"
            size="small"
            onClick={item.onOpenHistory}
            style={{ borderRadius: "4px 0 0 4px" }}
          >
            Open history
          </Button>
          <Button
            kind="primary"
            size="small"
            style={{ borderRadius: "0 4px 4px 0", borderLeft: "1px solid rgba(255,255,255,0.3)", padding: "0 6px" }}
          >
            <Icon name="chevron-down" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function NotificationsSidePanel({
  open,
  onClose,
  data = { notifications: [] },
}: NotificationsSidePanelProps) {
  const [unreadOnly, setUnreadOnly] = useState(false);

  const filters      = data.filters ?? {};
  const filterCount  = data.filters?.filterCount ?? 0;
  const unreadCount  = data.unreadCount ?? data.notifications.filter(n => n.unseen).length;

  const visibleItems = unreadOnly
    ? data.notifications.filter(n => n.unseen)
    : data.notifications;

  return (
    // Note: opens from LEFT — borderRadius 0 8px 8px 0, placed after navbar
    <SidePanel open={open} onClose={onClose} width={400}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* Scrollable content */}
        <div className={css.content} style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Header size="content" title="Notifications" />
            <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
              <Icon name="cross" size={16} />
            </Button>
          </div>

          {/* Filters block */}
          <FiltersBlock
            filters={filters}
            filterCount={filterCount}
            onClear={data.onClearFilters}
          />

          {/* Subheader row: unread count + Unread only switch + refresh */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={labelMuted}>{unreadCount} unread</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Switch
                checked={unreadOnly}
                onChange={() => setUnreadOnly(v => !v)}
                label="Unread only"
                showLabel
                layout="horizontal-left"
              />
              <Button kind="iconTertiary" size="regular" title="Refresh" onClick={data.onRefresh}>
                <Icon name="refresh" size={16} style={{ color: "var(--palette-blue-2)" }} />
              </Button>
            </div>
          </div>

          {/* Notification list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {visibleItems.map(item => (
              <NotificationItemRow key={item.id} item={item} />
            ))}
          </div>

          <div style={{ height: 16 }} />
        </div>

      </div>
    </SidePanel>
  );
}
