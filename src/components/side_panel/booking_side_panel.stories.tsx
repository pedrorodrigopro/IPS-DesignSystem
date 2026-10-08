// BookingSidePanel stories — Figma 1798:98291 (Sidepanel/BM/Booking)
// 10 tab variants, one story per variant

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { BookingSidePanel } from "./booking_side_panel";
import { Navbar } from "../navbar/navbar";

const SAMPLE_DATA = {
  wmName:          "Bartosz Bartosz",
  wmInitials:      "BB",
  roleName:        "ST Role#2",
  engagementName:  "ST engagement test",
  bookingCategory: "Holiday",
  description:     "description test",
  title:           "Accessibility consultant",
  showDateCreated: true,
  dateCreated:     "11 Apr 2022",
  rules: [
    { startDate: "13 Mar 2026", endDate: "07 Apr 2026", value: "100" },
    { startDate: "08 Apr 2026", endDate: "30 Apr 2026", value: "80"  },
  ],
  notes: [
    { author: "Spencer Harmon", initials: "SH", date: "25-09-2026", text: "Booking confirmed for Q2 engagement." },
    { author: "A. I Poane",     initials: "AP", date: "24-09-2026", text: "Please check availability for week 14." },
  ],
  history: [
    { type: "simple"   as const, actor: "Spencer Harmon", initials: "SH", date: "25-09-2026 14:32", action: "Booking confirmed" },
    { type: "single"   as const, actor: "Spencer Harmon", initials: "SH", date: "24-09-2026 09:11", field: "Category", from: "Standard", to: "Holiday" },
    { type: "simple"   as const, actor: "Bartosz Bartosz", initials: "BB", date: "23-09-2026 16:45", action: "Booking created" },
  ],
  notesCount: 2,
};

function PanelWrapper({ tab, title }: { tab: import("./booking_side_panel").BookingTab; title: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="booking" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>{title}</p>
      </div>
      <BookingSidePanel
        open={open}
        onClose={() => setOpen(false)}
        tab={tab}
        data={SAMPLE_DATA}
      />
    </div>
  );
}

const meta: Meta = {
  title: "Side Panels/Booking",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Booking Side Panel — Figma node 1798:98291. Width: 400px. 10 tab variants. " +
          "View tabs (Details/Notes/History): object cards + availability bar + tab navigation + 4 icon actions sticky. " +
          "Edit/Create tabs: editable form fields + Cancel/Save sticky. " +
          "Triggered from Booking Engine calendar booking pills.",
      },
    },
  },
};

export default meta;

export const Details: StoryFn       = () => <PanelWrapper tab="details"          title="Details tab — read-only booking info + Notes + History tabs" />;
export const Notes: StoryFn         = () => <PanelWrapper tab="notes"            title="Notes tab — add note + note list" />;
export const History: StoryFn       = () => <PanelWrapper tab="history"          title="History tab — chronological change log" />;
export const Edit: StoryFn          = () => <PanelWrapper tab="edit"             title="Edit tab — editable booking form + Cancel/Save" />;
export const CreateDemand: StoryFn  = () => <PanelWrapper tab="create-demand"    title="Create demand booking — availability-based" />;
export const CreateSingle: StoryFn  = () => <PanelWrapper tab="create-single"    title="Create single booking — WM + Engagement inputs" />;
export const CreateRepeated: StoryFn = () => <PanelWrapper tab="create-repeated" title="Create repeated booking — recurring schedule" />;
export const EditRepeated: StoryFn  = () => <PanelWrapper tab="edit-repeated"    title="Edit repeated booking" />;
export const EditHidden: StoryFn    = () => <PanelWrapper tab="edit-hidden"      title="Edit hidden booking — not visible to workforce member" />;
export const EditNotEditable: StoryFn = () => <PanelWrapper tab="edit-not-editable" title="Edit not editable — read-only locked booking" />;
