import type { Meta, StoryFn } from "@storybook/react";
import { Badge } from "./badge";

export default {
  title: "Atoms/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;

export const AllStatuses: StoryFn<typeof Badge> = () => (
  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
    <Badge label="Default" status="default" />
    <Badge label="Success" status="success" />
    <Badge label="Danger" status="danger" />
    <Badge label="Warning" status="warning" />
    <Badge label="Highlight" status="highlight" />
    <Badge label="Info" status="info" />
  </div>
);

export const Default: StoryFn<typeof Badge> = (args) => <Badge {...args} />;
Default.args = { label: "Role filled", status: "success" };
