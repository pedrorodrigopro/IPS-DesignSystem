// TablePropertiesSidePanel stories — Figma node 9657:92683

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { TablePropertiesSidePanel } from "./table_properties_side_panel";
import { Navbar }                   from "../navbar/navbar";

// ── Default (Workflow) ────────────────────────────────────────────────────────

const DEFAULT_COLS = [
  { id: "role-title",   label: "Role title",               visible: true  },
  { id: "status",       label: "Status",                   visible: true  },
  { id: "skills",       label: "Skills",                   visible: true  },
  { id: "date-created", label: "Date created",             visible: true  },
  { id: "talent-pool",  label: "Talent pool",              visible: true  },
  { id: "vacancies",    label: "Vacancies [open/total]",   visible: true  },
  { id: "avail-req",    label: "Availability requirement", visible: true  },
  { id: "id",           label: "ID",                       visible: false },
  { id: "reply-by",     label: "Reply by",                 visible: false },
  { id: "assignee",     label: "Assignee",                 visible: false },
  { id: "due-in-days",  label: "Due in days",              visible: false },
];

// ── BE (Booking Engine) ───────────────────────────────────────────────────────

const engagementCols = [
  { id: "engagement-title", label: "Engagement title", section: "table" as const, state: "table" as const, locked: true },
  { id: "role-title",   label: "Role title",    section: "table"  as const, state: "table"  as const },
  { id: "assignee",     label: "Assignee",      section: "table"  as const, state: "table"  as const },
  { id: "date-created", label: "Date created",  section: "table"  as const, state: "table"  as const },
  { id: "talent-pool",  label: "Talent pool",   section: "inline" as const, state: "list"   as const },
  { id: "status",       label: "Status",        section: "hidden" as const, state: "hidden" as const },
  { id: "vacancies",    label: "Vacancies [open/total]", section: "hidden" as const, state: "hidden" as const },
  { id: "avail-req",    label: "Availability requirement", section: "hidden" as const, state: "hidden" as const },
  { id: "skills",       label: "Skills",        section: "hidden" as const, state: "hidden" as const },
  { id: "id",           label: "ID",            section: "hidden" as const, state: "hidden" as const },
  { id: "reply-by",     label: "Reply by",      section: "hidden" as const, state: "hidden" as const },
];

const roleCols = [
  { id: "role-title",   label: "Role title",      section: "table"  as const, state: "table"  as const, locked: true },
  { id: "wf-state",     label: "Workflow state",  section: "table"  as const, state: "table"  as const },
  { id: "grade",        label: "Grade",            section: "table"  as const, state: "table"  as const },
  { id: "start-date",   label: "Start date",       section: "inline" as const, state: "list"   as const },
  { id: "end-date",     label: "End date",         section: "inline" as const, state: "list"   as const },
  { id: "duration",     label: "Duration",         section: "hidden" as const, state: "hidden" as const },
  { id: "location",     label: "Location",         section: "hidden" as const, state: "hidden" as const },
  { id: "grade-be",     label: "Grade",            section: "hidden" as const, state: "hidden" as const },
  { id: "clients",      label: "Clients",          section: "hidden" as const, state: "hidden" as const },
];

// ── Wrapper ───────────────────────────────────────────────────────────────────

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="workflow" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Table properties side panel
        </p>
      </div>
      {children}
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Side Panels/Table Properties",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Table Properties Side Panel — Figma node 9657:92683. Width: 400px. " +
          "Default: no tabs, grouping switch, visible/hidden columns with Switch. " +
          "BE: tabs (fillWidth), no grouping, fields with 3-state icon toggle (table|list|hidden).",
      },
    },
  },
};

export default meta;

export const Default: StoryFn = () => {
  const [open, setOpen] = useState(true);
  return (
    <Wrapper>
      <TablePropertiesSidePanel
        open={open}
        onClose={() => setOpen(false)}
        data={{ variant: "default", columns: DEFAULT_COLS, groupingOn: false }}
      />
    </Wrapper>
  );
};

export const BookingEngine: StoryFn = () => {
  const [open, setOpen] = useState(true);
  return (
    <Wrapper>
      <TablePropertiesSidePanel
        open={open}
        onClose={() => setOpen(false)}
        data={{
          variant: "be",
          tabs: [
            { id: "engagements", label: "Engagements", columns: engagementCols },
            { id: "roles",       label: "Roles",        columns: roleCols       },
          ],
        }}
      />
    </Wrapper>
  );
};
