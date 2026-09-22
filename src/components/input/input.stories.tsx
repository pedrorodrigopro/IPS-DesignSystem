import type { Meta, StoryFn } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1779-112429",
    },
  },
} satisfies Meta<typeof Input>;

export const AllStates: StoryFn<typeof Input> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: 320 }}>
    <Input label="Label" placeholder="Placeholder" message="Help text" state="default" />
    <Input label="Label" value="Value" state="default" />
    <Input label="Label" value="Value" state="error" message="Error message" />
    <Input label="Label" value="Value" state="warning" message="Missing translation" />
    <Input label="Label" value="Value" state="instructions" message="Instructions" />
    <Input label="Label" value="Read only value" readOnly />
    <Input label="Label" value="Disabled value" disabled />
    <Input label="Mandatory field" placeholder="Required" mandatory />
  </div>
);

export const Default: StoryFn<typeof Input> = (args) => <Input {...args} />;
Default.args = { label: "Label", placeholder: "Placeholder", message: "Help text" };
