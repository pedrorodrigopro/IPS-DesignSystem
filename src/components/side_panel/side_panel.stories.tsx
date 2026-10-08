// Side Panels — Figma: adFvaOeh8E3AKLFKRjYD3r node 1601:20413 (Sidepanel/Profile)
//
// SidePanel:        base container — 600px, slides in from right, -x shadow, 8px 0 0 8px radius
// ProfileSidePanel: full lite-profile panel with all sections from Figma

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { SidePanel }        from "./side_panel";
import { ProfileSidePanel } from "./profile_side_panel";
import { Button }           from "../button/button";
import { Icon }             from "../icon/icon";
import { Navbar }           from "../navbar/navbar";

// ── Sample profile data ───────────────────────────────────────────────────────

// Sample data matching Figma Sidepanel/Profile (Charlie Parker defaults + Spencer Harmon extras)
const CHARLIE: import("./profile_side_panel").ProfileSidePanelData = {
  // Top datapoints — from Figma WorkforceMember datapoints
  name:         "Charlie Parker",
  initials:     "CP",
  jobTitle:     "Agile Business Analyst",
  location:     "Brown",
  startingDate: "31 May 1996",
  languages:    "English, French, Romanian, Spanish",
  // Contact — from Figma Contact section
  email:        "charlie.parker@profinda.com",
  phone:        "56565656500 mobile",
  website:      "charlieparker.com",
  // Availability
  availabilityPct:  75,
  availabilityFrom: "01-10-2026",
  availabilityTo:   "30-06-2027",
  // Core skills — from Figma: Digital Media, Postman, Jira (all core)
  coreSkills: [
    { label: "Digital Media", proficiency: "advanced",     core: true },
    { label: "Postman",       proficiency: "intermediate", core: true },
    { label: "Jira",          proficiency: "basic",        core: true },
  ],
  // Other skills — 3 Accordion groups from Figma
  otherSkillGroups: [
    {
      label: "Programming Languages",
      skills: [
        { label: "Ruby (Programming Language)", proficiency: "intermediate", verified: true },
        { label: "JavaScript",                  proficiency: "advanced",     verified: true },
        { label: "Python",                      proficiency: "basic" },
      ],
    },
    {
      label: "Frameworks",
      skills: [
        { label: "React",      proficiency: "advanced" },
        { label: "Ruby on Rails", proficiency: "intermediate" },
      ],
    },
    {
      label: "Tools",
      skills: [
        { label: "Figma",      proficiency: "intermediate" },
        { label: "Git",        proficiency: "advanced" },
      ],
    },
  ],
  // Job level — plain text (Figma shows "Mid" as read-only text field)
  jobLevel:      "Mid",
  officeLocation: "London HQ",
  clients:       ["Siemens Limited", "ProFinda", "Audi"],
  industryKnowledge: [
    { label: "Technology",        proficiency: "advanced" },
    { label: "Financial Services",proficiency: "intermediate" },
  ],
  bio: "I started painting as a hobby when I was little. I didn't know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. Just go back and put one little more happy tree in there.",
};

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Side Panels/Profile",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Profile Side Panel — Figma node 1601:20413. " +
          "600px wide, slides in from right with CSS transform animation (300ms ease). " +
          "Shadow: -6px 0 12px rgba(27,72,195,0.2). Border-radius: 8px 0 0 8px. " +
          "Backdrop dims the page. Open icon navigates to full profile. Cross icon closes. " +
          "Sections: WorkforceMember + actions | Contact | Availability | Core skills | " +
          "Other skills (accordions) | Grade | Office Location | Clients | Industry knowledge | Bio.",
      },
    },
  },
};

export default meta;

// ── Interactive story — shows actual slide animation ─────────────────────────

export const Profile: StoryFn = () => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="profiles" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Profile side panel
        </p>
      </div>
      <ProfileSidePanel
        open={open}
        onClose={() => setOpen(false)}
        onOpenProfile={() => alert("Navigate to full profile screen")}
        data={CHARLIE}
      />
    </div>
  );
};
