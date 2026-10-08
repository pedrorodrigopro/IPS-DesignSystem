// RoleSidePanel stories — Figma 1644:29133 (Sidepanel/BM/Role)

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { RoleSidePanel } from "./role_side_panel";
import { Button } from "../button/button";
import { Icon }   from "../icon/icon";
import { Navbar } from "../navbar/navbar";

const meta: Meta = {
  title: "Side Panels/Role",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Role Side Panel — Figma node 1644:29133. Width: 400px. " +
          "Triggered from Booking Engine role rows or Workflow role names. " +
          "Header: role icon + title (H4) + two icon buttons | 'Role' type label (28px indent). " +
          "Subtitle: PillWFState + Activity tag pill + ID | State | Privacy | Participant. " +
          "Object card (neutral-2 bg): engagement reference with open/workforce icons. " +
          "Sections: Owner → Description → Dates → Skills → Privacy → Creator. " +
          "No sticky actions.",
      },
    },
  },
};

export default meta;

export const Role: StoryFn = () => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="booking" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Role side panel
        </p>
      </div>
      <RoleSidePanel
        open={open}
        onClose={() => setOpen(false)}
        data={{
          title:        "Project Manager",
          wfState:      "shortlisting",
          activityTag:  "RM to review",
          id:           "100000064",
          state:        "Open",
          privacy:      "Public",
          participant:  "Co-Owner",
          engagementName:   "Front end team Q2 Front end team Q2",
          owners: [{ name: "Santiago A CV Upload", initials: "SC" }],
          description:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
          duration:     "14 days",
          timeLeft:     "6 days",
          dateCreated:  "13-07-2026",
          rolesCount:   "2/3",
          filled:       "2",
          skills: [
            { label: "Jira",             proficiency: "advanced" },
            { label: "Project Management",proficiency: "intermediate", core: true },
            { label: "Agile",            proficiency: "basic" },
          ],
          privacyValue: "Public",
          creatorName:  "Spencer Harmon",
          creatorInitials: "SH",
        }}
      />
    </div>
  );
};
