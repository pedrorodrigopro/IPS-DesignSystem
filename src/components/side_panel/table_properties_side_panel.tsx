// TablePropertiesSidePanel — Figma node 9657:92683 (Sidepanel/Table properties)
// Source: IPS Components adFvaOeh8E3AKLFKRjYD3r
// Width: 400px
//
// Screen=Default:
//   No tabs
//   Switch "Table grouping"
//   "Visible columns" H5 + rows: drag handle + bold name + Switch on
//   Divider
//   "Hidden columns" H5 + rows: no drag + muted name + Switch off
//   Sticky: Cancel | Apply
//
// Screen=BE (Booking Engine):
//   Tabs: Engagements | Roles (fillWidth, each ~33%)
//   No grouping switch
//   "Visible fields in table" H5 + info icon + rows: drag + name + 3-state Toggle (table|list|hidden)
//   "Visible fields inline" H5 + info icon + rows: same
//   Divider
//   "Hidden fields" H5 + rows: no drag + muted name + Toggle all-disabled-looking
//   Sticky: Cancel | Apply

import React, { useRef, useState } from "react";
import { SidePanel }        from "./side_panel";
import css from "./side_panel.module.scss";
import { Header }           from "../header/header";
import { Icon }             from "../icon/icon";
import { Button }           from "../button/button";
import { Divider }          from "../divider/divider";
import { Navigation }       from "../navigation/navigation";
import { Switch }           from "../switch/switch";
import { Tile }             from "../tile/tile";
import { Actions }          from "../actions/actions";

// ── Types ─────────────────────────────────────────────────────────────────────

export type BEFieldState = "table" | "list" | "hidden";

export type TableColumn = {
  id:      string;
  label:   string;
  visible: boolean;
};

export type BEColumn = {
  id:       string;
  label:    string;
  section:  "table" | "inline" | "hidden";
  state:    BEFieldState;
  /** Locked columns cannot be dragged or have their state changed */
  locked?:  boolean;
};

export type TablePropertiesTab = {
  id:      string;
  label:   string;
  columns: TableColumn[];
};

export type BETab = {
  id:      string;
  label:   string;
  columns: BEColumn[];
};

export type TablePropertiesSidePanelData =
  | {
      variant:     "default";
      groupingOn?: boolean;
      columns:     TableColumn[];
      onApply?:    (columns: TableColumn[], grouping: boolean) => void;
    }
  | {
      variant:  "be";
      tabs:     BETab[];
      onApply?: (tabs: BETab[]) => void;
    };

export type TablePropertiesSidePanelProps = {
  open:    boolean;
  onClose: () => void;
  data:    TablePropertiesSidePanelData;
};

// ── Typography ────────────────────────────────────────────────────────────────

const h5: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 16, fontWeight: 600,
  color: "var(--palette-blue-0)", lineHeight: "125%",
};
const bodyBold: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
  color: "var(--palette-blue-0)", lineHeight: "115%",
};
const bodyMuted: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
  color: "var(--palette-blue-2)", lineHeight: "115%",
};

// ── Default variant rows ──────────────────────────────────────────────────────

function VisibleRow({ label, onToggle }: { label: string; onToggle: () => void }) {
  return (
    <Tile tileStyle="object-dark" padding="panel">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name="arrow-2-directions-vertical" size={16} style={{ color: "var(--palette-blue-2)", flexShrink: 0, cursor: "grab" }} />
        <span style={{ ...bodyBold, flex: 1 }}>{label}</span>
        <Switch checked onChange={onToggle} layout="horizontal-left" />
      </div>
    </Tile>
  );
}

function HiddenRow({ label, onToggle }: { label: string; onToggle: () => void }) {
  return (
    <Tile tileStyle="object-light" padding="panel">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 16, flexShrink: 0 }} />
        <span style={{ ...bodyMuted, flex: 1 }}>{label}</span>
        <Switch checked={false} onChange={onToggle} layout="horizontal-left" />
      </div>
    </Tile>
  );
}

// ── BE icon toggle — reversed order: hidden | list | table ───────────────────
// Uses the same border/radius strategy as Toggle.module.scss to avoid double borders

// Reversed so "table" appears rightmost (active/last position in visual order)
const BE_OPTIONS: { value: BEFieldState; icon: "hidden" | "list" | "table" }[] = [
  { value: "hidden", icon: "hidden" },
  { value: "list",   icon: "list"   },
  { value: "table",  icon: "table"  },
];

function BEIconToggle({ state, onChange, disabled }: {
  state:    BEFieldState;
  onChange: (v: BEFieldState) => void;
  disabled?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexShrink: 0 }} role="group">
      {BE_OPTIONS.map((opt, i) => {
        const active  = state === opt.value;
        const isFirst = i === 0;
        const isLast  = i === BE_OPTIONS.length - 1;

        // Exact same radius + border-left strategy as Toggle.module.scss
        const borderRadius = isFirst ? "8px 0 0 8px" : isLast ? "0 8px 8px 0" : "0";
        const borderLeft   = isFirst ? "1px solid" : "none";

        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            title={opt.value}
            disabled={disabled}
            onClick={() => !disabled && onChange(opt.value)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, padding: 0,
              cursor: disabled ? "default" : "pointer",
              borderRadius,
              borderTop:    "1px solid",
              borderRight:  "1px solid",
              borderBottom: "1px solid",
              borderLeft,
              borderColor: active ? "var(--palette-blue-1)" : "var(--palette-neutral-0)",
              background:  active ? "var(--palette-blue-1)" : disabled ? "var(--palette-neutral-2)" : "white",
              color:       active ? "white" : disabled ? "var(--palette-neutral-3)" : "var(--palette-blue-2)",
              opacity:     disabled ? 0.5 : 1,
            }}
          >
            <Icon name={opt.icon} size={16} />
          </button>
        );
      })}
    </div>
  );
}

function BEVisibleRow({ label, state, onChange, dragHandleProps, locked }: {
  label:           string;
  state:           BEFieldState;
  onChange:        (v: BEFieldState) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  locked?:         boolean;
}) {
  return (
    <Tile tileStyle="object-dark" padding="panel">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Drag handle — hidden when locked */}
        <div
          {...(!locked ? dragHandleProps : {})}
          style={{ cursor: locked ? "default" : "grab", flexShrink: 0, display: "flex", opacity: locked ? 0.3 : 1 }}
        >
          <Icon name="arrow-2-directions-vertical" size={16} style={{ color: "var(--palette-blue-2)" }} />
        </div>
        <span style={{ ...bodyBold, flex: 1 }}>{label}</span>
        <BEIconToggle state={state} onChange={onChange} disabled={locked} />
      </div>
    </Tile>
  );
}

function BEHiddenRow({ label, onChange }: {
  label:    string;
  onChange: (v: BEFieldState) => void;
}) {
  return (
    <Tile tileStyle="object-light" padding="panel">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 16, flexShrink: 0 }} />
        <span style={{ ...bodyMuted, flex: 1 }}>{label}</span>
        <BEIconToggle state="hidden" onChange={onChange} disabled />
      </div>
    </Tile>
  );
}

// ── Draggable list ────────────────────────────────────────────────────────────

function DraggableList<T extends { id: string; locked?: boolean }>({
  items,
  onReorder,
  renderItem,
}: {
  items:      T[];
  onReorder:  (newItems: T[]) => void;
  renderItem: (item: T, dragHandleProps: React.HTMLAttributes<HTMLDivElement>) => React.ReactNode;
}) {
  const dragIdx = useRef<number | null>(null);

  const handleDragStart = (i: number, locked?: boolean) => (e: React.DragEvent) => {
    if (locked) { e.preventDefault(); return; }
    dragIdx.current = i;
  };
  const handleDragOver  = (e: React.DragEvent) => e.preventDefault();
  const handleDrop      = (i: number, locked?: boolean) => () => {
    if (locked || dragIdx.current === null || dragIdx.current === i) return;
    // Prevent dropping onto or before a locked item
    if (items[i]?.locked) return;
    const next = [...items];
    const [moved] = next.splice(dragIdx.current, 1);
    next.splice(i, 0, moved);
    onReorder(next);
    dragIdx.current = null;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <div
          key={item.id}
          draggable={!item.locked}
          onDragStart={handleDragStart(i, item.locked)}
          onDragOver={handleDragOver}
          onDrop={handleDrop(i, item.locked)}
          style={{ cursor: "default" }}
        >
          {renderItem(item, {})}
        </div>
      ))}
    </div>
  );
}

// ── Section heading with info icon ────────────────────────────────────────────

function SectionHeading({ title, showInfo }: { title: string; showInfo?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={h5}>{title}</span>
      {showInfo && <Icon name="info" size={16} style={{ color: "var(--palette-blue-2)", flexShrink: 0 }} />}
    </div>
  );
}

// ── Default variant ───────────────────────────────────────────────────────────

function DefaultContent({
  columns, setColumns, grouping, setGrouping,
}: {
  columns:     TableColumn[];
  setColumns:  (cols: TableColumn[]) => void;
  grouping:    boolean;
  setGrouping: (v: boolean) => void;
}) {
  const toggle = (id: string) =>
    setColumns(columns.map(c => c.id === id ? { ...c, visible: !c.visible } : c));

  const visible = columns.filter(c => c.visible);
  const hidden  = columns.filter(c => !c.visible);

  return (
    <>
      <Switch
        checked={grouping}
        onChange={() => setGrouping(!grouping)}
        label="Table grouping"
        showLabel
        layout="horizontal-left"
      />

      {visible.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionHeading title="Visible columns" />
          {visible.map(col => (
            <VisibleRow key={col.id} label={col.label} onToggle={() => toggle(col.id)} />
          ))}
        </div>
      )}

      {visible.length > 0 && hidden.length > 0 && <Divider orientation="horizontal" margins />}

      {hidden.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionHeading title="Hidden columns" />
          {hidden.map(col => (
            <HiddenRow key={col.id} label={col.label} onToggle={() => toggle(col.id)} />
          ))}
        </div>
      )}
    </>
  );
}

// ── BE variant ────────────────────────────────────────────────────────────────

function BEContent({
  tabs, activeTab, setActiveTab, setTabs,
}: {
  tabs:        BETab[];
  activeTab:   string;
  setActiveTab:(v: string) => void;
  setTabs:     (tabs: BETab[]) => void;
}) {
  const tabIdx  = tabs.findIndex(t => t.id === activeTab);
  const current = tabs[tabIdx];

  const updateTab = (updater: (cols: BEColumn[]) => BEColumn[]) =>
    setTabs(tabs.map((t, i) => i === tabIdx ? { ...t, columns: updater(t.columns) } : t));

  const updateCol = (colId: string, newState: BEFieldState) => {
    const newSection: BEColumn["section"] =
      newState === "hidden" ? "hidden" : newState === "table" ? "table" : "inline";
    updateTab(cols => cols.map(c =>
      c.id === colId ? { ...c, state: newState, section: newSection } : c
    ));
  };

  const reorderSection = (section: BEColumn["section"], reordered: BEColumn[]) => {
    updateTab(cols => {
      const others  = cols.filter(c => c.section !== section);
      const indices = cols.reduce<number[]>((acc, c, i) => c.section === section ? [...acc, i] : acc, []);
      const next    = [...cols];
      indices.forEach((origIdx, i) => { next[origIdx] = reordered[i]; });
      return next;
    });
  };

  const tableFields  = current?.columns.filter(c => c.section === "table")  ?? [];
  const inlineFields = current?.columns.filter(c => c.section === "inline") ?? [];
  const hiddenFields = current?.columns.filter(c => c.section === "hidden") ?? [];

  return (
    <>
      {/* Tabs — fillWidth so each tab takes equal width */}
      <Navigation
        orientation="horizontal"
        tabs={tabs.map(t => ({ id: t.id, label: t.label }))}
        activeId={activeTab}
        onChange={setActiveTab}
        fillWidth
      />

      {/* Visible in table */}
      {tableFields.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionHeading title="Visible fields in table" showInfo />
          <DraggableList
            items={tableFields}
            onReorder={reordered => reorderSection("table", reordered)}
            renderItem={(col, dragHandleProps) => (
              <BEVisibleRow
                label={col.label}
                state={col.state}
                onChange={v => updateCol(col.id, v)}
                dragHandleProps={dragHandleProps}
                locked={col.locked}
              />
            )}
          />
        </div>
      )}

      {/* Visible inline */}
      {inlineFields.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionHeading title="Visible fields inline" showInfo />
          <DraggableList
            items={inlineFields}
            onReorder={reordered => reorderSection("inline", reordered)}
            renderItem={(col, dragHandleProps) => (
              <BEVisibleRow
                label={col.label}
                state={col.state}
                onChange={v => updateCol(col.id, v)}
                dragHandleProps={dragHandleProps}
                locked={col.locked}
              />
            )}
          />
        </div>
      )}

      {(tableFields.length > 0 || inlineFields.length > 0) && hiddenFields.length > 0 && (
        <Divider orientation="horizontal" margins />
      )}

      {/* Hidden fields */}
      {hiddenFields.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionHeading title="Hidden fields" />
          {hiddenFields.map(col => (
            <BEHiddenRow
              key={col.id}
              label={col.label}
              onChange={v => updateCol(col.id, v)}
            />
          ))}
        </div>
      )}
    </>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function TablePropertiesSidePanel({
  open,
  onClose,
  data,
}: TablePropertiesSidePanelProps) {
  // Default state
  const [defCols,    setDefCols]    = useState(data.variant === "default" ? data.columns : []);
  const [grouping,   setGrouping]   = useState(data.variant === "default" ? (data.groupingOn ?? false) : false);

  // BE state
  const [beTabs,     setBeTabs]     = useState(data.variant === "be" ? data.tabs : []);
  const [activeTab,  setActiveTab]  = useState(data.variant === "be" ? (data.tabs[0]?.id ?? "") : "");

  const handleApply = () => {
    if (data.variant === "default") data.onApply?.(defCols, grouping);
    if (data.variant === "be")      data.onApply?.(beTabs);
  };

  return (
    <SidePanel open={open} onClose={onClose} width={400}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        <div className={css.content} style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Header size="content" title="Table properties" />
            <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
              <Icon name="cross" size={16} />
            </Button>
          </div>

          {data.variant === "default" ? (
            <DefaultContent
              columns={defCols}
              setColumns={setDefCols}
              grouping={grouping}
              setGrouping={setGrouping}
            />
          ) : (
            <BEContent
              tabs={beTabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setTabs={setBeTabs}
            />
          )}

          <div style={{ height: 16 }} />
        </div>

        <Actions
          variant="sticky-panel"
          leftActions={[{ label: "Cancel", variant: "secondary", onClick: onClose }]}
          rightActions={[{ label: "Apply", variant: "primary", onClick: handleApply }]}
        />

      </div>
    </SidePanel>
  );
}
