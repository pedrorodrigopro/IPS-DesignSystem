// SkillSidePanel stories — Figma node 7347:213675 (Sidepanel/Skill)

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { SkillSidePanel } from "./skill_side_panel";
import type { SkillVariant } from "./skill_side_panel";
import { Navbar }           from "../navbar/navbar";

const BASE = {
  skillName:    "Ruby on Rails",
  description:  "A server-side web application framework written in Ruby under the MIT License.",
  status:       "Approved",
  source:       "Upload",
  creator:      "Dan Cooper",
  frameworks:   ["Consulting", "Tax audit", "SAP"],
  tags:         [],
  membersCount: 345,
  rolesCount:   4,
  addedDate:    "30 Jun 2026",
};

function Wrapper({ variant, data }: { variant: SkillVariant; data?: object }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="profiles" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Skill side panel — {variant}
        </p>
      </div>
      <SkillSidePanel
        open={open}
        onClose={() => setOpen(false)}
        variant={variant}
        data={{ ...BASE, ...data, onCancel: () => setOpen(false) }}
      />
    </div>
  );
}

const meta: Meta = {
  title: "Side Panels/Skill",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Skill Side Panel — Figma node 7347:213675. Width: 600px. 13 variants covering " +
          "skills management (admin), workforce member (add/update/search), role (requirement/match/search), " +
          "bulk edit, and peer view.",
      },
    },
  },
};

export default meta;

export const SkillsMgmtEdit: StoryFn    = () => <Wrapper variant="skills-mgmt-edit" />;
export const SkillsMgmtCreate: StoryFn  = () => <Wrapper variant="skills-mgmt-create" />;
export const MeDontHave: StoryFn        = () => <Wrapper variant="me-dont-have" />;
export const MeHave: StoryFn            = () => <Wrapper variant="me-have" data={{ proficiency: "intermediate" }} />;
export const RoleMatch: StoryFn         = () => <Wrapper variant="role-match" data={{ importance: "essential" }} />;
export const RoleReq: StoryFn           = () => <Wrapper variant="role-req" data={{ importance: "essential" }} />;
export const WMROInRole: StoryFn        = () => <Wrapper variant="wm-ro-in-role" data={{ subtitle: "Leslie Smith" }} />;
export const RoleSearching: StoryFn     = () => <Wrapper variant="role-searching" />;
export const MeSearching: StoryFn       = () => <Wrapper variant="me-searching" />;
export const ProfilePopulating: StoryFn = () => <Wrapper variant="profile-populating" />;
export const RolePopulating: StoryFn    = () => <Wrapper variant="role-populating" data={{ skillName: "Java" }} />;
export const BulkEdit: StoryFn          = () => <Wrapper variant="bulk-edit" data={{ bulkCount: 5 }} />;
export const Peers: StoryFn             = () => <Wrapper variant="peers" data={{ subtitle: "Charlie Parker", proficiency: "intermediate", isCore: true, isDevelopment: false }} />;
export const PeersNoFlags: StoryFn      = () => <Wrapper variant="peers" data={{ subtitle: "Charlie Parker", proficiency: "basic" }} />;
export const PeersBothFlags: StoryFn    = () => <Wrapper variant="peers" data={{ subtitle: "Charlie Parker", proficiency: "advanced", isCore: true, isDevelopment: true }} />;
