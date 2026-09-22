import type { Meta, StoryFn } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r",
    },
  },
} satisfies Meta<typeof Button>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
    {children}
  </div>
);

export const AllVariants: StoryFn<typeof Button> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Row>
      <Button kind="primary" text="Primary" />
      <Button kind="secondary" text="Secondary" />
      <Button kind="ghost" text="Ghost" />
      <Button kind="danger" text="Danger" />
      <Button kind="tertiary" text="Tertiary" />
    </Row>
    <Row>
      <Button kind="primary" text="Small primary" small />
      <Button kind="secondary" text="Small secondary" small />
      <Button kind="ghost" text="Small ghost" small />
    </Row>
    <Row>
      <Button kind="primary" text="Disabled" disabled />
      <Button kind="secondary" text="Disabled" disabled />
    </Row>
  </div>
);

export const Primary: StoryFn<typeof Button> = (args) => <Button {...args} />;
Primary.args = { text: "Primary button", kind: "primary" };

export const Secondary: StoryFn<typeof Button> = (args) => <Button {...args} />;
Secondary.args = { text: "Secondary button", kind: "secondary" };

export const Danger: StoryFn<typeof Button> = (args) => <Button {...args} />;
Danger.args = { text: "Delete", kind: "danger" };
