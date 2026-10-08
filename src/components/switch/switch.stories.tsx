// Switch stories — Figma node 1635:27830
// Storybook category: Components/Switch
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toggle switch (Figma node 1635:27830). Pill track 43.2×24px. " +
          "White circle handle slides with 200ms ease. " +
          "Track shows a ✓ check on the left (ON) and × cross on the right (OFF) " +
          "for accessible visual indication. " +
          "Off: #CFDAF7 → #D5D5D5 hover. On: #0C1457 → #1531B8 hover. " +
          "Focus: double ring (4px #0C1457 + 2px white). " +
          "Layouts: horizontal-left, vertical, mobile-full.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ── Interactive ────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "Interactive",
  render: () => {
    const [on, setOn] = useState(false);
    return <Switch label="Enable notifications" checked={on} onChange={setOn} />;
  },
};

// ── Off / On ──────────────────────────────────────────────────────────────────

export const Off: Story = {
  name: "Off",
  render: () => <Switch label="Label" checked={false} />,
};

export const On: Story = {
  name: "On",
  render: () => <Switch label="Label" checked={true} />,
};

// ── Without label ─────────────────────────────────────────────────────────────

export const NoLabel: Story = {
  name: "Without label",
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Switch showLabel={false} checked={false} />
      <Switch showLabel={false} checked={true} />
    </div>
  ),
};

// ── Layouts ───────────────────────────────────────────────────────────────────

export const Layouts: Story = {
  name: "All layouts",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>
          horizontal-left (default)
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Switch layout="horizontal-left" label="Label" checked={false} />
          <Switch layout="horizontal-left" label="Label" checked={true} />
        </div>
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>
          vertical
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          <Switch layout="vertical" label="Label" checked={false} />
          <Switch layout="vertical" label="Label" checked={true} />
        </div>
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>
          mobile-full
        </p>
        <div style={{ width: 200, display: "flex", flexDirection: "column", gap: 8 }}>
          <Switch layout="mobile-full" label="Label" checked={false} />
          <Switch layout="mobile-full" label="Label" checked={true} />
        </div>
      </div>
    </div>
  ),
};

// ── All states ─────────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      {[
        { label: "Off",          checked: false, disabled: false },
        { label: "On",           checked: true,  disabled: false },
        { label: "Off disabled", checked: false, disabled: true  },
        { label: "On disabled",  checked: true,  disabled: true  },
      ].map(({ label, checked, disabled }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", width: 100 }}>
            {label}
          </span>
          <Switch checked={checked} disabled={disabled} showLabel={false} />
        </div>
      ))}
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", marginTop: 8 }}>
        Tab to a switch to see the focus ring.
      </p>
    </div>
  ),
};

// ── Settings list ──────────────────────────────────────────────────────────────

export const SettingsList: Story = {
  name: "Settings list",
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      emails: false,
      reminders: true,
      digest: false,
    });
    const toggle = (key: keyof typeof settings) =>
      setSettings((s) => ({ ...s, [key]: !s[key] }));
    return (
      <div style={{ display: "flex", flexDirection: "column", width: 280 }}>
        {(Object.entries(settings) as [keyof typeof settings, boolean][]).map(([key, val]) => (
          <div
            key={key}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 0", borderBottom: "1px solid #CFDAF7",
            }}
          >
            <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976", textTransform: "capitalize" }}>
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            <Switch showLabel={false} checked={val} onChange={() => toggle(key)} />
          </div>
        ))}
      </div>
    );
  },
};
