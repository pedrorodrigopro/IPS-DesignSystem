import type { Meta, StoryFn } from "@storybook/react";
import { PillRegular } from "./pill_regular";

export default {
  title: "Molecules/Pill Regular",
  component: PillRegular,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r",
    },
  },
} satisfies Meta<typeof PillRegular>;

export const AllStatuses: StoryFn<typeof PillRegular> = () => (
  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
    <PillRegular label="New" type="role-new" />
    <PillRegular label="Booked" type="booked" />
    <PillRegular label="Confirmed" type="confirmed" />
    <PillRegular label="Filled" type="filled" />
    <PillRegular label="Exceptions" type="exceptions" />
  </div>
);

export const Removable: StoryFn<typeof PillRegular> = () => (
  <PillRegular label="Senior Engineer" type="filter" onRemove={() => alert("removed")} />
);

export const Default: StoryFn<typeof PillRegular> = (args) => <PillRegular {...args} />;
Default.args = { label: "New", type: "role-new" };
