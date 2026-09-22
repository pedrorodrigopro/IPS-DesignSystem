import type { Meta, StoryFn } from "@storybook/react";
import { Avatar } from "./avatar";

export default {
  title: "Atoms/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export const AllSizes: StoryFn<typeof Avatar> = () => (
  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
    <Avatar size="sm" name="Pedro Rodrigo" />
    <Avatar size="md" name="Pedro Rodrigo" />
    <Avatar size="lg" name="Pedro Rodrigo" />
  </div>
);

export const WithImage: StoryFn<typeof Avatar> = () => (
  <Avatar size="lg" src="https://i.pravatar.cc/150?img=3" name="Pedro Rodrigo" />
);

export const Default: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;
Default.args = { name: "Pedro Rodrigo", size: "md" };
