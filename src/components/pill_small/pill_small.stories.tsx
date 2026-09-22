import type { Meta, StoryFn } from "@storybook/react";
import { PillSmall } from "./pill_small";

export default {
  title: "Molecules/Pill Small",
  component: PillSmall,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=4195-205036",
    },
  },
} satisfies Meta<typeof PillSmall>;

export const RoleStatuses: StoryFn<typeof PillSmall> = () => (
  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
    <PillSmall label="New" type="role-new" />
    <PillSmall label="Pending" type="pending" />
    <PillSmall label="In Review" type="in-review" />
    <PillSmall label="Shortlisting" type="shortlisting" />
    <PillSmall label="Partially Filled" type="partially-filled" />
    <PillSmall label="Not Filled" type="not-filled" />
    <PillSmall label="Exceptions" type="exceptions" />
    <PillSmall label="Filled" type="filled" />
    <PillSmall label="Partially Booked" type="partially-booked" />
    <PillSmall label="Booked" type="booked" />
    <PillSmall label="Partially Confirmed" type="partially-confirmed" />
    <PillSmall label="Confirmed" type="confirmed" />
  </div>
);

export const Removable: StoryFn<typeof PillSmall> = () => (
  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
    <PillSmall label="Filter" type="filter" onRemove={() => alert("removed")} />
    <PillSmall label="Skills Framework" type="input" onRemove={() => alert("removed")} />
    <PillSmall label="Custom Field" type="custom-field" />
  </div>
);

export const Default: StoryFn<typeof PillSmall> = (args) => <PillSmall {...args} />;
Default.args = { label: "Role - New", type: "role-new" };
