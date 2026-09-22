import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Switch } from "./switch";

export default {
  title: "Atoms/Switch",
  component: Switch,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1635-27830",
    },
  },
} satisfies Meta<typeof Switch>;

export const AllStates: StoryFn<typeof Switch> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Switch label="Off" checked={false} />
    <Switch label="On" checked={true} />
    <Switch label="Disabled off" disabled />
    <Switch label="Disabled on" checked disabled />
  </div>
);

export const Interactive: StoryFn<typeof Switch> = () => {
  const [on, setOn] = useState(false);
  return (
    <Switch
      label={on ? "Enabled" : "Disabled"}
      checked={on}
      onChange={(e) => setOn(e.target.checked)}
    />
  );
};

export const Default: StoryFn<typeof Switch> = (args) => <Switch {...args} />;
Default.args = { label: "Label", checked: false };
