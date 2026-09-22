import type { Meta, StoryFn } from "@storybook/react";
import { Breadcrumbs } from "./breadcrumbs";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=4379-234729",
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

// Level=1 — 1 link + current
export const Level1: StoryFn<typeof Breadcrumbs> = () => (
  <Breadcrumbs
    items={[
      { label: "Workflow", href: "#" },
      { label: "Engagement: Q3 Planning" },
    ]}
  />
);

// Level=2 — 2 links + current
export const Level2: StoryFn<typeof Breadcrumbs> = () => (
  <Breadcrumbs
    items={[
      { label: "Workflow", href: "#" },
      { label: "Engagement: Q3 Planning", href: "#" },
      { label: "Role: Business Developer" },
    ]}
  />
);

// Level=3 — 3 links + current
export const Level3: StoryFn<typeof Breadcrumbs> = () => (
  <Breadcrumbs
    items={[
      { label: "Workflow", href: "#" },
      { label: "Engagement: Q3 Planning", href: "#" },
      { label: "Role: Business Developer", href: "#" },
      { label: "Compare" },
    ]}
  />
);

export const AllLevels: StoryFn<typeof Breadcrumbs> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
    <Breadcrumbs items={[{ label: "Workflow", href: "#" }, { label: "Engagement: Q3 Planning" }]} />
    <Breadcrumbs items={[{ label: "Workflow", href: "#" }, { label: "Engagement: Q3 Planning", href: "#" }, { label: "Role: Business Developer" }]} />
    <Breadcrumbs items={[{ label: "Workflow", href: "#" }, { label: "Engagement: Q3 Planning", href: "#" }, { label: "Role: Business Developer", href: "#" }, { label: "Compare" }]} />
  </div>
);

export const Default: StoryFn<typeof Breadcrumbs> = (args) => <Breadcrumbs {...args} />;
Default.args = {
  items: [
    { label: "Workflow", href: "#" },
    { label: "Engagement: Q3 Planning", href: "#" },
    { label: "Role: Business Developer" },
  ],
};
