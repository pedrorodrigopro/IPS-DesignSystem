import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Radio, RadioGroup } from "./radio";

export default {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1635-27857",
    },
    layout: "centered",
  },
  argTypes: {
    layout: { control: "select", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Radio>;

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{label}</div>
    {children}
  </div>
);

// ── All states — Horizontal ───────────────────────────────────────────────────

export const HorizontalStates: StoryFn<typeof Radio> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 16 }}>
    <Section label="Horizontal — Default">
      <Radio layout="horizontal" label="Label" checked={false} />
    </Section>
    <Section label="Horizontal — Selected">
      <Radio layout="horizontal" label="Label" checked={true} />
    </Section>
    <Section label="Horizontal — With subtext">
      <Radio layout="horizontal" label="Label" subLabel="Info" checked={false} />
      <Radio layout="horizontal" label="Label" subLabel="Info" checked={true} />
    </Section>
    <Section label="Horizontal — Disabled">
      <Radio layout="horizontal" label="Label" checked={false} disabled />
      <Radio layout="horizontal" label="Label" checked={true} disabled />
    </Section>
  </div>
);

// ── All states — Vertical ─────────────────────────────────────────────────────

export const VerticalStates: StoryFn<typeof Radio> = () => (
  <div style={{ display: "flex", gap: 32, padding: 16, alignItems: "flex-start" }}>
    <Section label="Unselected">
      <Radio layout="vertical" label="Label" checked={false} />
    </Section>
    <Section label="Selected">
      <Radio layout="vertical" label="Label" checked={true} />
    </Section>
    <Section label="Disabled">
      <Radio layout="vertical" label="Label" checked={false} disabled />
    </Section>
    <Section label="Selected disabled">
      <Radio layout="vertical" label="Label" checked={true} disabled />
    </Section>
  </div>
);

// ── RadioGroup — interactive ──────────────────────────────────────────────────

export const GroupInteractive: StoryFn<typeof Radio> = () => {
  const [value, setValue] = useState("option1");
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3", subLabel: "Additional info" },
    { value: "option4", label: "Option 4", disabled: true },
  ];
  return (
    <div style={{ padding: 24 }}>
      <Section label="Group (column, horizontal layout)">
        <RadioGroup
          name="demo-group"
          options={options}
          value={value}
          onChange={setValue}
          layout="horizontal"
          groupLayout="column"
        />
      </Section>
      <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E", marginTop: 8 }}>
        Selected: <strong style={{ color: "#0D2976" }}>{value}</strong>
      </div>
    </div>
  );
};

// ── RadioGroup — row layout ───────────────────────────────────────────────────

export const GroupRow: StoryFn<typeof Radio> = () => {
  const [value, setValue] = useState("a");
  const options = [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
    { value: "c", label: "Option C" },
  ];
  return (
    <div style={{ padding: 24 }}>
      <RadioGroup
        name="demo-row"
        options={options}
        value={value}
        onChange={setValue}
        layout="horizontal"
        groupLayout="row"
      />
    </div>
  );
};

export const Default: StoryFn<typeof Radio> = (args) => (
  <div style={{ padding: 16 }}>
    <Radio {...args} />
  </div>
);
Default.args = { label: "Label", checked: false, layout: "horizontal" };
