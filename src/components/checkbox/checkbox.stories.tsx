import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./checkbox";

export default {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1635-27838",
    },
  },
} satisfies Meta<typeof Checkbox>;

export const AllStates: StoryFn<typeof Checkbox> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Checkbox label="Unchecked" />
    <Checkbox label="Checked" checked />
    <Checkbox label="Indeterminate" indeterminate />
    <Checkbox label="Disabled" disabled />
    <Checkbox label="Checked disabled" checked disabled />
    <Checkbox label="With sublabel" subLabel="Additional info" checked />
  </div>
);

export const Interactive: StoryFn<typeof Checkbox> = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Click me"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default: StoryFn<typeof Checkbox> = (args) => <Checkbox {...args} />;
Default.args = { label: "Label", checked: false };
