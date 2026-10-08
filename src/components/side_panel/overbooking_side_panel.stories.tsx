// OverbookingSidePanel stories — Figma node 4029:116175 (Sidepanel/BM/Overbookings)

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { OverbookingSidePanel } from "./overbooking_side_panel";
import { Navbar }               from "../navbar/navbar";

const SAMPLE_DATA = {
  personName:    "Aubrey Stanton",
  bookingsFrom:  "All",
  sortValue:     "Latest",
  ranges: [
    {
      id:        "1",
      dateRange: "20 Apr - 26 Apr 2026",
      subtitle:  "8 hours over per day",
      items: [
        { roleName: "Role 1", bookingLabel: "Default", bookingCategory: "booking-blue" as const },
        { roleName: "Role 2", bookingLabel: "Default", bookingCategory: "booking-blue" as const },
        { roleName: "Role 3", bookingLabel: "Default", bookingCategory: "booking-blue" as const },
      ],
    },
    {
      id:        "2",
      dateRange: "28 Apr - 02 May 2026",
      subtitle:  "4 hours over per day",
      items: [
        { roleName: "Role 1", bookingLabel: "Default", bookingCategory: "booking-blue" as const },
        { roleName: "Role 2", bookingLabel: "Default", bookingCategory: "booking-blue" as const },
        { roleName: "Role 3", bookingLabel: "Default", bookingCategory: "booking-blue" as const },
      ],
    },
  ],
};

function PanelWrapper({ data }: { data: typeof SAMPLE_DATA }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="booking" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Overbookings side panel
        </p>
      </div>
      <OverbookingSidePanel
        open={open}
        onClose={() => setOpen(false)}
        data={data}
      />
    </div>
  );
}

const meta: Meta = {
  title: "Side Panels/Overbookings",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Overbookings Side Panel — Figma node 4029:116175. Width: 400px. View-only. " +
          "Shows overbooking ranges for a workforce member — each tile is collapsible and lists " +
          "the roles causing the overbooking with booking pills and edit/remove actions.",
      },
    },
  },
};

export default meta;

export const Default: StoryFn = () => <PanelWrapper data={SAMPLE_DATA} />;
export const SingleRange: StoryFn = () => (
  <PanelWrapper data={{ ...SAMPLE_DATA, ranges: [SAMPLE_DATA.ranges[0]] }} />
);
