// ButtonGroup stories — Figma node 14520:222688 (Group button)
// Storybook category: Molecules/ButtonGroup
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ButtonGroup } from "./button_group";

const meta: Meta<typeof ButtonGroup> = {
  title: "Molecules/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Split button combining a main action label and a chevron-down dropdown trigger. " +
          "Primary: #2358F8 bg, white text, rgba separator between the two buttons. " +
          "Secondary: white bg, #CFDAF7 border, #0D2976 text, no left border on dropdown half. " +
          "Both: h=32px, body-selected 14px 700, radius 8px on outer corners only.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

// ── Primary ────────────────────────────────────────────────────────────────────

export const Primary: Story = {
  name: "Primary",
  render: () => (
    <ButtonGroup
      variant="primary"
      label="Generate"
      onClick={() => alert("Generate")}
      onDropdownClick={() => alert("Dropdown")}
    />
  ),
};

// ── Secondary ──────────────────────────────────────────────────────────────────

export const Secondary: Story = {
  name: "Secondary",
  render: () => (
    <ButtonGroup
      variant="secondary"
      label="Generate"
      onClick={() => alert("Generate")}
      onDropdownClick={() => alert("Dropdown")}
    />
  ),
};

// ── Both variants ──────────────────────────────────────────────────────────────

export const BothVariants: Story = {
  name: "Both variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", width: 80 }}>primary</span>
        <ButtonGroup variant="primary" label="Generate" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", width: 80 }}>secondary</span>
        <ButtonGroup variant="secondary" label="Generate" />
      </div>
    </div>
  ),
};

// ── Custom labels ──────────────────────────────────────────────────────────────

export const CustomLabels: Story = {
  name: "Various labels",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      {["Save", "Export", "Add to shortlist", "Create booking"].map((label) => (
        <div key={label} style={{ display: "flex", gap: 12 }}>
          <ButtonGroup variant="primary"   label={label} />
          <ButtonGroup variant="secondary" label={label} />
        </div>
      ))}
    </div>
  ),
};

// ── Disabled ───────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <ButtonGroup variant="primary"   label="Generate" disabled />
      <ButtonGroup variant="secondary" label="Generate" disabled />
    </div>
  ),
};

// ── Interactive dropdown ───────────────────────────────────────────────────────

export const Interactive: Story = {
  name: "Interactive (dropdown open state)",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
        <ButtonGroup
          variant="primary"
          label="Generate"
          onClick={() => alert("Main action")}
          onDropdownClick={() => setOpen((o) => !o)}
        />
        {open && (
          <div style={{
            border: "1px solid #CFDAF7",
            borderRadius: 8,
            background: "#fff",
            padding: "8px 0",
            minWidth: 160,
            boxShadow: "0 4px 16px rgba(12,20,87,0.12)",
          }}>
            {["Option A", "Option B", "Option C"].map((opt) => (
              <button
                key={opt}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "8px 16px", background: "none", border: "none",
                  fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976",
                  cursor: "pointer",
                }}
                onClick={() => { alert(opt); setOpen(false); }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
};
