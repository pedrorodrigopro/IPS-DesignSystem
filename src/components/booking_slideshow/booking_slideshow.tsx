// BookingSlideshow — Figma node 7324:192187 (.Booking component set)
// Source: IPS Components adFvaOeh8E3AKLFKRjYD3r
//
// Tab=Details:
//   Rule nav row (Booking N of M, chevron-left/right, add/remove)
//   ├── Phase input (optional, Figma: conditional visible)
//   ├── .Booking/Dates:
//   │     Start date + End date inputs (row)
//   │     Toggle group: % load | total hours | hours per day  +  value input  +  Switch "Use time"
//   ├── Overscheduling label + Checkbox "Non-working time" + Checkbox "Diary time"
//   ├── .Booking/Category:
//   │     InputBookingCategory + Tile selected (Billable / Affects Availability)
//   ├── Title input (with char counter)
//   ├── Description textarea (fixed 173px height)
//   └── Date created (read-only, optional)
//
// Tab=Notes:   rule nav + sort dropdown + add-note row + note rows
// Tab=History: rule nav + sort dropdown + history items
// Hidden state: lock icon + "no permission" message

import React, { useState } from "react";
import { Navigation }                          from "../navigation/navigation";
import { Input, InputSelect, InputBookingCategory } from "../input/input";
import { Button }                              from "../button/button";
import { Icon }                                from "../icon/icon";
import { Checkbox }                            from "../checkbox/checkbox";
import { Switch }                              from "../switch/switch";
import { Tile }                                from "../tile/tile";
import { WorkforceMember }                     from "../workforce_member/workforce_member";

// ── Types ─────────────────────────────────────────────────────────────────────

export type BookingSlideshowTab = "details" | "notes" | "history";

/** One availability rule — maps to a CarouselCard slide */
export type BookingSlideshowRule = {
  startDate: string;
  endDate:   string;
  /** Optional value displayed in the hours/load input */
  value?:    string;
};

export type BookingSlideshowNote = {
  author:   string;
  initials: string;
  date:     string;
  text:     string;
};

export type BookingSlideshowHistoryAction =
  | { type: "simple";   actor: string; initials: string; date: string; action: string }
  | { type: "single";   actor: string; initials: string; date: string; field: string; from: string; to: string }
  | { type: "multiple"; actor: string; initials: string; date: string; fields: { name: string; from: string; to: string }[] };

export type BookingSlideshowProps = {
  /** Currently active tab */
  tab?: BookingSlideshowTab;
  /** Called when tab changes */
  onTabChange?: (tab: BookingSlideshowTab) => void;
  /** Availability rules — each is one slide in the carousel */
  rules?: BookingSlideshowRule[];
  /** Whether to show the "Show" link in the carousel header */
  showVisible?: boolean;
  /** Show the Phase input (Figma: conditional) */
  showPhase?: boolean;
  /** Phase value */
  phase?: string;
  /** Show Date created read-only field */
  showDateCreated?: boolean;
  /** Date created value (read-only) */
  dateCreated?: string;
  /** Selected booking category label */
  category?: string;
  /** Booking category colour swatch (hex) — shown as pill in read-only mode */
  categoryColor?: string;
  /** Booking title */
  title?: string;
  /** Booking description */
  description?: string;
  /** Notes list */
  notes?: BookingSlideshowNote[];
  /** History items */
  history?: BookingSlideshowHistoryAction[];
  /** When true shows the locked / no-permission overlay */
  hidden?: boolean;
  /** Badge count on the Notes tab */
  notesCount?: number;
  /** Component width (default 352px per Figma) */
  width?: number | string;
  /**
   * Read-only mode (default false).
   * - true  → Details tab shows plain KV text; tabs (Details/Notes/History) are visible
   * - false → No tabs; Details shows editable form fields
   */
  readOnly?: boolean;
};

// ── Shared typography ─────────────────────────────────────────────────────────

const labelReg: React.CSSProperties = {
  fontFamily: "var(--font-family)",
  fontSize: 12,
  fontWeight: 400,
  color: "var(--palette-blue-2)",
  lineHeight: "150%",
};

const bodyReg: React.CSSProperties = {
  fontFamily: "var(--font-family)",
  fontSize: 14,
  fontWeight: 400,
  color: "var(--palette-blue-0)",
  lineHeight: "150%",
};

const bodyBold: React.CSSProperties = {
  fontFamily: "var(--font-family)",
  fontSize: 14,
  fontWeight: 700,
  color: "var(--palette-blue-0)",
  lineHeight: "115%",
};

const labelSecondary: React.CSSProperties = {
  fontFamily: "var(--font-family)",
  fontSize: 12,
  fontWeight: 400,
  color: "var(--palette-blue-2)",
  lineHeight: "150%",
  textAlign: "right",
};

const navChevronStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center",
  width: 24, height: 24, padding: 5,
  background: "none", border: "none", borderRadius: 4,
  cursor: "pointer", flexShrink: 0, color: "var(--palette-blue-0)",
};

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700,
  color: "var(--palette-primary-0)",
  background: "none", border: "none", cursor: "pointer", padding: 0,
  lineHeight: "150%",
};

// ── Hidden overlay ────────────────────────────────────────────────────────────

function HiddenOverlay() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px" }}>
      <Icon name="locked" size={20} style={{ color: "var(--palette-blue-0)", flexShrink: 0 }} />
      <span style={labelReg}>You do not have permission to view this booking</span>
    </div>
  );
}

// ── Toggle button group — % load | total hours | hours per day ────────────────

type LoadMode = "pct" | "total" | "perday";

function LoadToggle({ value, onChange }: { value: LoadMode; onChange: (v: LoadMode) => void }) {
  const buttons: { id: LoadMode; label: string; position: "first" | "middle" | "last" }[] = [
    { id: "pct",    label: "% load",        position: "first"  },
    { id: "total",  label: "total hours",   position: "middle" },
    { id: "perday", label: "hours per day", position: "last"   },
  ];

  return (
    <div style={{ display: "flex" }}>
      {buttons.map(b => {
        const active = b.id === value;
        const radius =
          b.position === "first"  ? "8px 0 0 8px" :
          b.position === "last"   ? "0 8px 8px 0" : "0";
        const borderLeft = b.position !== "first" ? "none" : undefined;
        return (
          <button
            key={b.id}
            onClick={() => onChange(b.id)}
            style={{
              fontFamily: "var(--font-family)",
              fontSize: 14,
              fontWeight: b.id === value ? 700 : 400,
              color: b.id === value ? "white" : "var(--palette-blue-0)",
              background: b.id === value ? "var(--palette-blue-1)" : "white",
              border: "1px solid var(--palette-neutral-0)",
              borderLeft,
              borderRadius: radius,
              padding: "6px 10px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {b.label}
          </button>
        );
      })}
    </div>
  );
}

// ── .Booking/Dates block ──────────────────────────────────────────────────────

function DatesBlock({ rule }: { rule: BookingSlideshowRule }) {
  const [loadMode, setLoadMode] = useState<LoadMode>("pct");

  return (
    <div style={{ display: "contents" }}>
      {/* Start date + End date — each occupies one grid column */}
      <InputSelect label="Start date" value={rule.startDate} placeholder="DD-MM-YYYY" />
      <InputSelect label="End date"   value={rule.endDate}   placeholder="DD-MM-YYYY" />

      {/* Toggle + narrow value input + Use time switch — spans both columns */}
      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "flex-end", gap: 8, flexWrap: "wrap" }}>
        <LoadToggle value={loadMode} onChange={setLoadMode} />
        {/* Narrow input — fixed width so Switch has room */}
        <div style={{ width: 72 }}>
          <Input label="" value={rule.value ?? "100"} onChange={() => {}} />
        </div>
        <Switch label="Use time" showLabel layout="horizontal-left" />
      </div>
    </div>
  );
}

// ── .Booking/Category block ───────────────────────────────────────────────────

function CategoryBlock({ category }: { category?: string }) {
  return (
    <div style={{ display: "contents" }}>
      {/* IPS InputBookingCategory — spans both grid columns */}
      <div style={{ gridColumn: "1 / -1" }}>
        <InputBookingCategory
          label="Category"
          selectedLabel={category}
          mandatory
        />
      </div>

      {/* Properties tile — only shown when a category is selected, spans both columns */}
      {category && (
        <Tile tileStyle="selected" padding="content" style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="check" size={20} style={{ color: "var(--palette-blue-0)" }} />
              <span style={bodyBold}>Billable</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="check" size={20} style={{ color: "var(--palette-blue-0)" }} />
              <span style={bodyBold}>Affects Availability</span>
            </div>
          </div>
        </Tile>
      )}
    </div>
  );
}

// ── Read-only Details tab ─────────────────────────────────────────────────────

function ReadOnlyDetailsContent({
  currentRule,
  category,
  categoryColor,
  description,
  showDateCreated,
  dateCreated,
}: {
  currentRule: BookingSlideshowRule;
  category?: string;
  categoryColor?: string;
  description?: string;
  showDateCreated?: boolean;
  dateCreated?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Start–end dates + Load % + Total */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={labelReg}>Start - end dates</span>
          <div style={{ display: "flex", gap: 24 }}>
            <span style={labelReg}>Load %</span>
            <span style={labelReg}>Total</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={bodyBold}>{currentRule.startDate} - {currentRule.endDate}</span>
          <div style={{ display: "flex", gap: 24 }}>
            <span style={bodyBold}>{currentRule.value ?? "100"}</span>
            <span style={bodyBold}>—</span>
          </div>
        </div>
      </div>

      {/* Category */}
      {category && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={labelReg}>Category</span>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={bodyBold}>{category}</span>
            {categoryColor && (
              <div style={{
                width: 120, height: 28,
                background: categoryColor,
                borderRadius: "var(--radius-2xl)",
                border: "1px solid rgba(0,0,0,0.08)",
              }} />
            )}
          </div>
        </div>
      )}

      {/* Description */}
      {description && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={labelReg}>Description</span>
          <span style={bodyBold}>{description}</span>
        </div>
      )}

      {/* Date created */}
      {showDateCreated && dateCreated && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={labelReg}>Date created</span>
          <span style={bodyBold}>{dateCreated}</span>
        </div>
      )}

    </div>
  );
}

// ── Details tab (editable) ────────────────────────────────────────────────────

function DetailsContent({
  showPhase,
  phase,
  showDateCreated,
  dateCreated,
  category,
  title,
  description,
  currentRule,
}: {
  showPhase?: boolean;
  phase?: string;
  showDateCreated?: boolean;
  dateCreated?: string;
  category?: string;
  title?: string;
  description?: string;
  currentRule: BookingSlideshowRule;
}) {
  const [titleVal, setTitleVal] = useState(title ?? "Accessibility consultant");
  const [descVal, setDescVal]   = useState(description ?? "description test");

  // 2-column grid — equal columns, 12px gap
  const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    alignItems: "start",
  };

  // Full-width span helper
  const fullSpan: React.CSSProperties = { gridColumn: "1 / -1" };

  return (
    <div style={grid}>

      {/* Phase input — full width, optional */}
      {showPhase && (
        <div style={fullSpan}>
          <InputSelect label="Phase" value={phase ?? "Reading"} mandatory />
        </div>
      )}

      {/* .Booking/Dates — Start date | End date (each 1 col), toggle row (full) */}
      <DatesBlock rule={currentRule} />

      {/* Overscheduling — full width */}
      <div style={{ ...fullSpan, display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={labelReg}>Overscheduling</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Checkbox label="Non-working time" onChange={() => {}} />
          <Checkbox label="Diary time"       onChange={() => {}} />
        </div>
      </div>

      {/* .Booking/Category — full width */}
      <CategoryBlock category={category} />

      {/* Title — full width, with char counter */}
      <div style={{ ...fullSpan, display: "flex", flexDirection: "column", gap: 4 }}>
        <Input
          label="Title"
          value={titleVal}
          onChange={e => setTitleVal(e.target.value)}
        />
        <span style={labelSecondary}>{titleVal.length} / 250</span>
      </div>

      {/* Description — full width, fixed 173px height textarea */}
      <div style={{ ...fullSpan, display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={labelReg}>Description</span>
        <textarea
          value={descVal}
          onChange={e => setDescVal(e.target.value)}
          style={{
            height: 173,
            padding: 8,
            border: "1px solid var(--palette-neutral-0)",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-family)",
            fontSize: 14,
            fontWeight: 400,
            color: "var(--palette-blue-0)",
            lineHeight: "150%",
            background: "white",
            resize: "none",
            outline: "none",
          }}
        />
      </div>

      {/* Date created — read-only, full width */}
      {showDateCreated && (
        <div style={{ ...fullSpan, display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={labelReg}>Date created</span>
          <span style={bodyBold}>{dateCreated ?? "11 Apr 2022"}</span>
        </div>
      )}

    </div>
  );
}

// ── Notes tab ─────────────────────────────────────────────────────────────────

function NoteRow({ note }: { note: BookingSlideshowNote }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 8,
      paddingBottom: 12,
      borderBottom: "1px solid var(--palette-neutral-0)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <WorkforceMember variant="small-1line" name={note.author} initials={note.initials} />
        <span style={labelReg}>{note.date}</span>
      </div>
      <span style={bodyReg}>{note.text}</span>
    </div>
  );
}

function NotesContent({ notes }: { notes?: BookingSlideshowNote[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Sort row — left-aligned, sort icon + "Latest" in body-selected style */}
      <button style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "none", border: "none", cursor: "pointer", padding: 0,
      }}>
        <Icon name="sort" size={16} style={{ color: "var(--palette-blue-0)", flexShrink: 0 }} />
        <span style={bodyBold}>Latest</span>
      </button>
      {/* Add note row */}
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <Input label="" placeholder="New note" value="" onChange={() => {}} />
        </div>
        <Button kind="primary" size="regular">Add</Button>
      </div>
      {/* Note rows */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {(notes ?? []).map((note, i) => <NoteRow key={i} note={note} />)}
      </div>
    </div>
  );
}

// ── History tab ───────────────────────────────────────────────────────────────

function HistoryItem({ item }: { item: BookingSlideshowHistoryAction }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 8,
      paddingBottom: 12,
      borderBottom: "1px solid var(--palette-neutral-0)",
    }}>
      {/* Actor + date */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <WorkforceMember variant="small-1line" name={item.actor} initials={item.initials} />
        <span style={labelReg}>{item.date}</span>
      </div>

      {/* Simple — just action text */}
      {item.type === "simple" && (
        <span style={{ ...bodyReg, paddingLeft: 16 }}>{item.action}</span>
      )}

      {/* Single field — From → To */}
      {item.type === "single" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={labelReg}>From</span>
            <span style={bodyReg}>{item.from}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={labelReg}>To</span>
            <span style={bodyReg}>{item.to}</span>
          </div>
        </div>
      )}

      {/* Multiple fields */}
      {item.type === "multiple" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: 16 }}>
          {item.fields.map((f, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={bodyBold}>{f.name}</span>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={labelReg}>From</span>
                  <span style={bodyReg}>{f.from}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={labelReg}>To</span>
                  <span style={bodyReg}>{f.to}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HistoryContent({ history }: { history?: BookingSlideshowHistoryAction[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Sort row — left-aligned, sort icon + "Latest" in body-selected style */}
      <button style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "none", border: "none", cursor: "pointer", padding: 0,
      }}>
        <Icon name="sort" size={16} style={{ color: "var(--palette-blue-0)", flexShrink: 0 }} />
        <span style={bodyBold}>Latest</span>
      </button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {(history ?? []).map((item, i) => <HistoryItem key={i} item={item} />)}
      </div>
    </div>
  );
}

// ── BookingSlideshow ──────────────────────────────────────────────────────────

export function BookingSlideshow({
  tab: tabProp,
  onTabChange,
  rules = [{ startDate: "13 Mar 2026", endDate: "17 Mar 2026", value: "100" }],
  showVisible = false,
  showPhase = false,
  phase,
  showDateCreated = true,
  dateCreated,
  category,
  categoryColor,
  title,
  description,
  notes,
  history,
  hidden = false,
  notesCount,
  width = 352,
  readOnly = false,
}: BookingSlideshowProps) {
  const [internalTab, setInternalTab] = useState<BookingSlideshowTab>(tabProp ?? "details");
  const [ruleIndex, setRuleIndex]     = useState(1);

  const total       = rules.length;
  const currentRule = rules[ruleIndex - 1];
  const activeTab   = tabProp ?? internalTab;

  const handleTabChange = (t: BookingSlideshowTab) => {
    setInternalTab(t);
    onTabChange?.(t);
  };

  const TABS = [
    { id: "details", label: "Details"  },
    { id: "notes",   label: "Notes",   badge: notesCount },
    { id: "history", label: "History" },
  ];

  return (
    <div style={{
      width,
      background: "var(--palette-neutral-2)",
      border: "1px solid var(--palette-neutral-0)",
      borderRadius: "var(--radius-md)",
      display: "flex",
      flexDirection: "column",
      paddingBottom: 16,
    }}>

      {/* ── Rule nav row ─────────────────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 22,
        padding: "8px 8px 0",
      }}>
        {/* Prev chevron */}
        <button
          onClick={() => setRuleIndex(i => Math.max(1, i - 1))}
          disabled={ruleIndex <= 1}
          aria-label="Previous rule"
          style={{ ...navChevronStyle, opacity: ruleIndex <= 1 ? 0.5 : 1 }}
        >
          <Icon name="chevron-left" size={14} />
        </button>

        {/* Centre: label + Show + (editable only: Add + Remove) */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{ ...bodyReg, textAlign: "center" }}>
            Booking {ruleIndex} of {total}
          </span>
          {showVisible && (
            <button style={linkStyle} onClick={() => {}}>Show</button>
          )}
          {!readOnly && (
            <>
              <Button kind="iconTertiary" size="small" title="Add rule" onClick={() => {}}>
                <Icon name="add" size={14} />
              </Button>
              <Button kind="iconTertiary" size="small" title="Remove rule" onClick={() => {}}>
                <Icon name="remove" size={14} />
              </Button>
            </>
          )}
        </div>

        {/* Next chevron */}
        <button
          onClick={() => setRuleIndex(i => Math.min(total, i + 1))}
          disabled={ruleIndex >= total}
          aria-label="Next rule"
          style={{ ...navChevronStyle, opacity: ruleIndex >= total ? 0.5 : 1 }}
        >
          <Icon name="chevron-right" size={14} />
        </button>
      </div>

      {/* Full-width divider under nav row */}
      <div style={{ borderBottom: "1px solid var(--palette-neutral-0)", marginTop: 8 }} />

      {/* ── Content area ────────────────────────────────────────────────── */}
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Tab navigation — only in read-only mode */}
        {readOnly && (
          <Navigation
            orientation="horizontal"
            tabs={TABS}
            activeId={activeTab}
            onChange={t => handleTabChange(t as BookingSlideshowTab)}
            fillWidth
          />
        )}

        {/* Hidden overlay */}
        {hidden ? (
          <HiddenOverlay />
        ) : readOnly ? (
          /* ── Read-only mode ── */
          <>
            {activeTab === "details" && (
              <ReadOnlyDetailsContent
                currentRule={currentRule}
                category={category}
                categoryColor={categoryColor}
                description={description}
                showDateCreated={showDateCreated}
                dateCreated={dateCreated}
              />
            )}
            {activeTab === "notes"   && <NotesContent   notes={notes}     />}
            {activeTab === "history" && <HistoryContent history={history}  />}
          </>
        ) : (
          /* ── Editable mode — no tabs, always shows Details form ── */
          <DetailsContent
            showPhase={showPhase}
            phase={phase}
            showDateCreated={showDateCreated}
            dateCreated={dateCreated}
            category={category}
            title={title}
            description={description}
            currentRule={currentRule}
          />
        )}
      </div>
    </div>
  );
}
