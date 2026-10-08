// EngagementSidePanel stories — Figma 1644:28000 (Sidepanel/BM/Engagement)

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { EngagementSidePanel } from "./engagement_side_panel";
import { Button } from "../button/button";
import { Icon }   from "../icon/icon";
import { Navbar } from "../navbar/navbar";

const meta: Meta = {
  title: "Side Panels/Engagement",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Engagement Side Panel — Figma node 1644:28000. Width: 400px. " +
          "Triggered from Booking Engine engagement rows or Workflow engagement list. " +
          "Header: engagement icon + title (H4) + two icon buttons | 'Engagement' type label (28px indent). " +
          "Subtitle: ID | State | Privacy | Participant (bold values). " +
          "Sections: Owner → Description → Dates → Budget vs Cost (bar chart) → Details → Creator. " +
          "Sticky actions: Cancel | Open engagement.",
      },
    },
  },
};

export default meta;

export const Engagement: StoryFn = () => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="booking" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Engagement side panel
        </p>
      </div>
      <EngagementSidePanel
        open={open}
        onClose={() => setOpen(false)}
        data={{
          title:        "[2025] ProFinda Consulting",
          id:           "100000064",
          state:        "Open",
          privacy:      "Public",
          participant:  "Co-Owner",
          ownerName:    "Fake Surname",
          ownerInitials:"FS",
          description:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          duration:     "365 days",
          timeLeft:     "280 days",
          dateCreated:  "25-09-2025",
          roles:        "3",
          filled:       "2",
          budget:       "£180,000",
          cost:         "£112,000",
          privacyValue: "Public",
          serviceLineGroup: "Strategy",
          requestedBy:  "Spencer Harmon",
          creatorName:  "Spencer Harmon",
          creatorInitials: "SH",
        }}
      />
    </div>
  );
};
