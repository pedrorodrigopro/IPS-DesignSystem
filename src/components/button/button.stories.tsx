import type { Meta, StoryFn } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=3134-190313",
    },
  },
} satisfies Meta<typeof Button>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
    {children}
  </div>
);

const DarkBg = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#0d2976", padding: "16px", borderRadius: "8px", display: "flex", gap: "8px" }}>
    {children}
  </div>
);

// All variants as they appear in Figma
export const AllVariants: StoryFn<typeof Button> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
    <Row>
      <Button kind="primary" text="Primary" />
      <Button kind="primary" text="Primary" disabled />
    </Row>
    <Row>
      <Button kind="secondary" text="Secondary" />
      <Button kind="secondary" text="Secondary" disabled />
    </Row>
    <Row>
      <Button kind="tertiary" text="Tertiary" />
      <Button kind="tertiary" text="Tertiary" disabled />
    </Row>
    <Row>
      <Button kind="destructive" text="Destructive" />
      <Button kind="destructive" text="Destructive" disabled />
    </Row>
    <Row>
      <Button kind="ghost" text="Ghost" />
      <Button kind="ghost" text="Ghost" disabled />
    </Row>
    <Row>
      <Button kind="link" text="Link" />
      <Button kind="link" text="Link" disabled />
    </Row>
    <DarkBg>
      <Button kind="inverted" text="Inverted" />
      <Button kind="inverted" text="Inverted" disabled />
    </DarkBg>
  </div>
);

export const Primary: StoryFn<typeof Button> = (args) => <Button {...args} />;
Primary.args = { text: "Label", kind: "primary" };

export const Secondary: StoryFn<typeof Button> = (args) => <Button {...args} />;
Secondary.args = { text: "Label", kind: "secondary" };

export const Tertiary: StoryFn<typeof Button> = (args) => <Button {...args} />;
Tertiary.args = { text: "Label", kind: "tertiary" };

export const Destructive: StoryFn<typeof Button> = (args) => <Button {...args} />;
Destructive.args = { text: "Label", kind: "destructive" };

export const Ghost: StoryFn<typeof Button> = (args) => <Button {...args} />;
Ghost.args = { text: "Label", kind: "ghost" };

export const Link: StoryFn<typeof Button> = (args) => <Button {...args} />;
Link.args = { text: "Label", kind: "link" };
