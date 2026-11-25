// Side Panels — Figma: adFvaOeh8E3AKLFKRjYD3r node 1601:20413 (Sidepanel/Profile)
//
// SidePanel:        base container — 600px, slides in from right, -x shadow, 8px 0 0 8px radius
// ProfileSidePanel: full lite-profile panel with all sections from Figma

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { SidePanel }        from "./side_panel";
import { ProfileSidePanel, SAMPLE_PROFILE } from "./profile_side_panel";
import { Button }           from "../button/button";
import { Icon }             from "../icon/icon";
import { Navbar }           from "../navbar/navbar";

// ── Sample profile data ───────────────────────────────────────────────────────

const CHARLIE = SAMPLE_PROFILE;

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
