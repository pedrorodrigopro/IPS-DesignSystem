// RoleSubtitle stories — Figma node 12685:585963
// Storybook category: Molecules/RoleSubtitle
import type { Meta, StoryObj } from "@storybook/react";
import { RoleSubtitle } from "./role_subtitle";

const meta: Meta<typeof RoleSubtitle> = {
  title: "Molecules/RoleSubtitle",
  component: RoleSubtitle,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Role subtitle bar combining WF State pill, Activity Tag pill, and label:value metadata pairs separated by vertical dividers. " +
          "Used below role/page headers. " +
          "Row wraps on narrow viewports (gap 8px). Text is body-unselected with bold values.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoleSubtitle>;

const items = [
  { label: "ID",          value: "100000064" },
  { label: "State",       value: "Open" },
  { label: "Privacy",     value: "Public" },
  { label: "Participant", value: "Co-Owner" },
];

// ── As in Figma ────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "As in Figma",
  render: () => (
    <RoleSubtitle
      wfState="shortlisting"
      activityTag="RM to review"
      items={items}
    />
  ),
};

// ── WF State only ──────────────────────────────────────────────────────────────

export const WFStateOnly: Story = {
  name: "WF State pill only",
  render: () => (
    <RoleSubtitle
      wfState="confirmed"
      items={[
        { label: "ID",    value: "100000064" },
        { label: "State", value: "Open" },
      ]}
    />
  ),
};

// ── All WF states ──────────────────────────────────────────────────────────────

const WF_STATES = [
  "new", "shortlisting", "in-review", "invited",
  "partially-filled", "filled", "partially-booked", "booked",
  "partially-confirmed", "confirmed", "not-filled", "exceptions", "pending",
] as const;

export const AllWFStates: Story = {
  name: "All WF states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {WF_STATES.map((state) => (
        <RoleSubtitle
          key={state}
          wfState={state}
          items={[{ label: "State", value: state }]}
        />
      ))}
    </div>
  ),
};

// ── Activity tag only ──────────────────────────────────────────────────────────

export const ActivityTagOnly: Story = {
  name: "Activity tag only",
  render: () => (
    <RoleSubtitle
      activityTag="RM to review"
      items={items}
    />
  ),
};

// ── Items only ─────────────────────────────────────────────────────────────────

export const ItemsOnly: Story = {
  name: "Items only (no pills)",
  render: () => (
    <RoleSubtitle
      items={[
        { label: "ID",          value: "100000064" },
        { label: "State",       value: "Open" },
        { label: "Privacy",     value: "Public" },
        { label: "Participant", value: "Co-Owner" },
        { label: "Location",    value: "London" },
      ]}
    />
  ),
};

// ── No items ───────────────────────────────────────────────────────────────────

export const PillsOnly: Story = {
  name: "Pills only (no items)",
  render: () => (
    <RoleSubtitle
      wfState="shortlisting"
      activityTag="RM to review"
    />
  ),
};

// ── Single item ────────────────────────────────────────────────────────────────

export const SingleItem: Story = {
  name: "Single item",
  render: () => (
    <RoleSubtitle
      wfState="booked"
      items={[{ label: "ID", value: "987654321" }]}
    />
  ),
};

// ── Many items (wrap) ─────────────────────────────────────────────────────────

export const ManyItems: Story = {
  name: "Many items (wraps on narrow viewport)",
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <RoleSubtitle
        wfState="shortlisting"
        activityTag="RM to review"
        items={[
          { label: "ID",          value: "100000064" },
          { label: "State",       value: "Open" },
          { label: "Privacy",     value: "Public" },
          { label: "Participant", value: "Co-Owner" },
          { label: "Location",    value: "London, UK" },
          { label: "Start",       value: "01 Jan 2024" },
        ]}
      />
    </div>
  ),
};
