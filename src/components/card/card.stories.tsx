import type { Meta, StoryFn } from "@storybook/react";
import { Card } from "./card";

export default {
  title: "Molecules/Card",
  component: Card,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r",
    },
  },
} satisfies Meta<typeof Card>;

export const Match: StoryFn<typeof Card> = () => (
  <Card
    name="Sarah Johnson"
    role="Senior Engineer"
    matchScore={92}
    status="Available"
    statusKind="success"
    onBook={() => alert("Book clicked")}
    onView={() => alert("View clicked")}
  />
);

export const WithoutScore: StoryFn<typeof Card> = () => (
  <Card
    name="Alex Chen"
    role="Product Manager"
    onView={() => alert("View clicked")}
  />
);

export const Default: StoryFn<typeof Card> = (args) => <Card {...args} />;
Default.args = {
  name: "Pedro Rodrigo",
  role: "Designer",
  matchScore: 87,
  status: "Booked",
  statusKind: "info",
};
