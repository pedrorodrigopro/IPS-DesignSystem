import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1635-27838",
    },
  },
  argTypes: {
    layout: { control: "select", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Checkbox>;

// All states — horizontal layout (matches top section of Figma)
export const HorizontalStates: StoryFn<typeof Checkbox> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
    <Checkbox layout="horizontal" label="Label" checked={false} />
    <Checkbox layout="horizontal" label="Label" checked={true} />
    <Checkbox layout="horizontal" label="Label" indeterminate />
    <Checkbox layout="horizontal" label="Label" checked={false} disabled />
    <Checkbox layout="horizontal" label="Label" checked={true} disabled />
  </div>
);

// All states — vertical layout (matches bottom section of Figma)
export const VerticalStates: StoryFn<typeof Checkbox> = () => (
  <div style={{ display: "flex", gap: 32, padding: 16, alignItems: "flex-start" }}>
    <Checkbox layout="vertical" label="Label" checked={false} />
    <Checkbox layout="vertical" label="Label" checked={true} />
    <Checkbox layout="vertical" label="Label" indeterminate />
    <Checkbox layout="vertical" label="Label" checked={false} disabled />
    <Checkbox layout="vertical" label="Label" checked={true} disabled />
  </div>
);

// With sub-label (2nd line) — horizontal
export const WithSubLabel: StoryFn<typeof Checkbox> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
    <Checkbox layout="horizontal" label="Label" subLabel="Info" checked={false} />
    <Checkbox layout="horizontal" label="Label" subLabel="Info" checked={true} />
    <Checkbox layout="horizontal" label="Label" subLabel="Info" indeterminate />
  </div>
);

// Interactive
export const Interactive: StoryFn<typeof Checkbox> = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ padding: 16 }}>
      <Checkbox
        layout="horizontal"
        label={checked ? "Checked" : "Unchecked"}
        checked={checked}
        onChange={setChecked}
      />
    </div>
  );
};

export const Default: StoryFn<typeof Checkbox> = (args) => (
  <div style={{ padding: 16 }}>
    <Checkbox {...args} />
  </div>
);
Default.args = { label: "Label", checked: false, layout: "horizontal" };
