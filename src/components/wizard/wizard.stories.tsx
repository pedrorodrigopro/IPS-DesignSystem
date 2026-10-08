// Wizard stories — Figma nodes 8273:200202 + 8273:197838
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Wizard } from "./wizard";

const meta: Meta<typeof Wizard> = {
  title: "Components/Wizard",
  component: Wizard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Horizontal step indicator. Each step has a label and a 12px indicator bar. " +
          "States: current (bold label, #0D2976 bar), enabled-previous (muted #8F9ED1 bar, clickable), " +
          "enabled-next (#0D2976 bar, clickable), disabled (#8F9ED1 bar, opacity 0.5). " +
          "Hover on enabled steps turns bar #2358F8. Steps fill equal width.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Wizard>;

const STEPS = [
  { id: "details",     label: "Step 1" },
  { id: "skills",      label: "Step 2" },
  { id: "schedule",    label: "Step 3" },
  { id: "review",      label: "Step 4" },
  { id: "confirm",     label: "Step 5" },
];

const NAMED_STEPS = [
  { id: "details",     label: "Details" },
  { id: "skills",      label: "Skills & Rates" },
  { id: "schedule",    label: "Schedule" },
  { id: "review",      label: "Review" },
  { id: "confirm",     label: "Confirm" },
];

// ── First step active (as in Figma) ───────────────────────────────────────────

export const FirstStep: Story = {
  name: "Step 1 active (as in Figma)",
  render: () => (
    <Wizard
      steps={STEPS}
      activeIndex={0}
      maxReachableIndex={0}
    />
  ),
};

// ── Middle step active ─────────────────────────────────────────────────────────

export const MiddleStep: Story = {
  name: "Step 3 active",
  render: () => (
    <Wizard
      steps={STEPS}
      activeIndex={2}
      maxReachableIndex={3}
    />
  ),
};

// ── Last step active ───────────────────────────────────────────────────────────

export const LastStep: Story = {
  name: "Last step active",
  render: () => (
    <Wizard
      steps={STEPS}
      activeIndex={4}
      maxReachableIndex={4}
    />
  ),
};

// ── All steps enabled (can jump to any) ───────────────────────────────────────

export const AllEnabled: Story = {
  name: "All steps enabled",
  render: () => (
    <Wizard
      steps={STEPS}
      activeIndex={2}
      maxReachableIndex={4}
    />
  ),
};

// ── Interactive ────────────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: "Interactive",
  render: () => {
    const [active, setActive] = useState(0);
    // Allow forward one step at a time, always allow going back
    const [maxReachable, setMaxReachable] = useState(1);

    const handleChange = (index: number) => {
      setActive(index);
      if (index + 1 > maxReachable) setMaxReachable(index + 1);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 16 }}>
        <Wizard
          steps={NAMED_STEPS}
          activeIndex={active}
          maxReachableIndex={maxReachable}
          onChange={handleChange}
        />
        <div style={{ display: "flex", gap: 12 }}>
          <button
            style={{ padding: "8px 16px", borderRadius: 4, border: "1px solid #CFDAF7", background: "#fff", fontFamily: "Mulish, sans-serif", fontSize: 13, fontWeight: 700, color: "#0C1457", cursor: "pointer" }}
            onClick={() => active > 0 && handleChange(active - 1)}
            disabled={active === 0}
          >
            Previous
          </button>
          <button
            style={{ padding: "8px 16px", borderRadius: 4, border: "none", background: "#0C1457", fontFamily: "Mulish, sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer" }}
            onClick={() => active < NAMED_STEPS.length - 1 && handleChange(active + 1)}
            disabled={active === NAMED_STEPS.length - 1}
          >
            Next
          </button>
        </div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E", margin: 0 }}>
          Active: {NAMED_STEPS[active].label} · Max reachable: {NAMED_STEPS[Math.min(maxReachable, NAMED_STEPS.length - 1)].label}
        </p>
      </div>
    );
  },
};

// ── Named steps ───────────────────────────────────────────────────────────────

export const NamedSteps: Story = {
  name: "Named steps",
  render: () => (
    <Wizard
      steps={NAMED_STEPS}
      activeIndex={1}
      maxReachableIndex={2}
    />
  ),
};

// ── Two steps ─────────────────────────────────────────────────────────────────

export const TwoSteps: Story = {
  name: "Two steps",
  render: () => (
    <Wizard
      steps={[
        { id: "a", label: "Details" },
        { id: "b", label: "Confirm" },
      ]}
      activeIndex={0}
      maxReachableIndex={1}
    />
  ),
};
