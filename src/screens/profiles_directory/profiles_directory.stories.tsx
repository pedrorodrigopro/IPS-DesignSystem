// Profiles Directory stories — see profiles_directory.tsx for the screen

import type { Meta, StoryObj } from "@storybook/react";

import { ProfilesDirectoryScreen } from "./profiles_directory";

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Screens/ProfilesDirectory",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Profiles Directory — 4 variants. " +
          "Cards: Tile interactive content per profile row, Avatar + name link + skill dots (SkillProfile) + highlighted skill/bio text. " +
          "Every card and table row has Shortlist (primary) with a secondary “Open CV” under it (Figma CV row 163:49477): in this story it opens CV Studio for that person and Close comes back; inside Screens/MyProfile it goes through the CV flow, and clicking a profile opens its profile with the pending-updates review. " +
          "Table: Tile highlight content, custom expandable rows — collapsed shows name/counts/Shortlist, expanded shows Skills/Bio/Positions/skill dots on neutral-2 bg. " +
          "Table: tick profiles (or the header checkbox) and a 600px bulk banner appears horizontally centred in the title row (the row keeps its height) — “Export CV (N)” opens CV Studio for the N selected profiles, Close returns here; ESC or the banner’s cross clears the selection. Profile names use blue-0. Search highlights query matches in yellow. Toolbar has cards/table toggle using primary/icon Button kinds.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Cards: Story = {
  name: "Cards",
  render: () => <ProfilesDirectoryScreen initialSearch="" initialView="cards" initialSort="Profile name" />,
};

export const TableView: Story = {
  name: "Table",
  render: () => <ProfilesDirectoryScreen initialSearch="" initialView="table" initialSort="Profile name" />,
};

export const SearchingCards: Story = {
  name: "Searching — Cards",
  render: () => <ProfilesDirectoryScreen initialSearch="project management" initialView="cards" initialSort="Most relevant" />,
};

export const SearchingTable: Story = {
  name: "Searching — Table",
  render: () => <ProfilesDirectoryScreen initialSearch="project management" initialView="table" initialSort="Most relevant" />,
};

// Filters applied: SearchFilter shows them right next to the search box (after the sort and count), in the toolbar row
export const FiltersApplied: Story = {
  name: "Filters applied",
  render: () => <ProfilesDirectoryScreen initialSearch="" initialView="cards" initialSort="Profile name" initialFilters={[{ id: "loc", field: "Location", value: "London" }, { id: "skill", field: "Skill", value: "Project management" }]} />,
};
