import type { Meta, StoryFn } from "@storybook/react";
import { Divider } from "./divider";

export default {
  title: "Atoms/Divider",
  component: Divider,
} satisfies Meta<typeof Divider>;

export const Horizontal: StoryFn<typeof Divider> = () => (
  <div style={{ width: 300 }}>
    <p>Above</p>
    <Divider />
    <p>Below</p>
  </div>
);
