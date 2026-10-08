// BookingCategorySidePanel stories
// Figma: adFvaOeh8E3AKLFKRjYD3r node 7359:238082 (Sidepanel/Booking category)
//
// Width: 400px — from Figma
// Sticky actions: Actions variant="sticky-panel" — always visible at bottom
// Triggered from: Booking Engine (calendar booking category cells)

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { BookingCategorySidePanel } from "./booking_category_side_panel";
import { Button }   from "../button/button";
import { Icon }     from "../icon/icon";
import { Navbar }   from "../navbar/navbar";

const meta: Meta = {
  title: "Side Panels/Booking Category",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Booking Category Side Panel — Figma node 7359:238082. " +
          "Width: 400px. Slides in from right (300ms ease). " +
          "Fields: Name, Display as, Billable & Availability toggles, Properties toggles, " +
          "Requires Approval select, Colour picker. " +
          "Sticky actions (Actions/Overlays sticky-panel variant): Cancel | Save. " +
          "Triggered from Booking Engine calendar cells.",
      },
    },
  },
};

export default meta;

export const BookingCategory: StoryFn = () => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="booking" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Booking Category side panel
        </p>
      </div>
      <BookingCategorySidePanel
        open={open}
        onClose={() => setOpen(false)}
        onSave={(data) => { console.log("Saved:", data); }}
        data={{ name: "Holiday", displayAs: "Holiday", billable: false, affectsAvail: true, color: "#FFCD38" }}
      />
    </div>
  );
};
