// Toggle stories — Figma nodes 4473:102864 + 1817:105580
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Segmented toggle with radio-button semantics — once selected an option cannot be deselected. " +
          "Supports 2–N options, optional label, mandatory marker, and disabled state. " +
          "States: selected (#0C1457 bg), unselected resting, hover (rgba(0,0,0,0.04)), focus (2px outline).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// ── Two options ────────────────────────────────────────────────────────────────

export const TwoOptions: Story = {
  name: "Two options",
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div style={{ width: 320 }}>
        <Toggle
          options={[
            { value: "yes", label: "Yes" },
            { value: "no",  label: "No" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// ── Three options ──────────────────────────────────────────────────────────────

export const ThreeOptions: Story = {
  name: "Three options",
  render: () => {
    const [value, setValue] = useState<string | undefined>("week");
    return (
      <div style={{ width: 360 }}>
        <Toggle
          options={[
            { value: "day",   label: "Day" },
            { value: "week",  label: "Week" },
            { value: "month", label: "Month" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// ── Five options ───────────────────────────────────────────────────────────────

export const FiveOptions: Story = {
  name: "Five options (from Figma)",
  render: () => {
    const [value, setValue] = useState<string | undefined>("first");
    return (
      <div style={{ width: 560 }}>
        <Toggle
          options={[
            { value: "first",  label: "First" },
            { value: "second", label: "Middle" },
            { value: "third",  label: "Middle" },
            { value: "fourth", label: "Middle" },
            { value: "last",   label: "Last" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// ── With label ─────────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  name: "With label",
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div style={{ width: 360 }}>
        <Toggle
          label="New start date"
          options={[
            { value: "asap",     label: "ASAP" },
            { value: "specific", label: "Specific date" },
            { value: "flexible", label: "Flexible" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// ── With label + mandatory ─────────────────────────────────────────────────────

export const WithLabelMandatory: Story = {
  name: "With label + mandatory",
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div style={{ width: 360 }}>
        <Toggle
          label="New start date"
          mandatory
          options={[
            { value: "asap",     label: "ASAP" },
            { value: "specific", label: "Specific date" },
            { value: "flexible", label: "Flexible" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// ── No initial selection ───────────────────────────────────────────────────────

export const NoInitialSelection: Story = {
  name: "No initial selection",
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div style={{ width: 360 }}>
        <Toggle
          label="Preference"
          options={[
            { value: "low",    label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high",   label: "High" },
          ]}
          value={value}
          onChange={setValue}
        />
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E", marginTop: 8 }}>
          Selected: {value ?? "(none)"}
        </p>
      </div>
    );
  },
};

// ── Disabled ───────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Toggle
        label="Status"
        options={[
          { value: "active",   label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        value="active"
        disabled
      />
    </div>
  ),
};

// ── All states side-by-side ────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 400 }}>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 6 }}>
          First selected
        </p>
        <Toggle
          options={[{ value: "a", label: "First" }, { value: "b", label: "Middle" }, { value: "c", label: "Last" }]}
          value="a"
        />
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 6 }}>
          Middle selected
        </p>
        <Toggle
          options={[{ value: "a", label: "First" }, { value: "b", label: "Middle" }, { value: "c", label: "Last" }]}
          value="b"
        />
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 6 }}>
          Last selected
        </p>
        <Toggle
          options={[{ value: "a", label: "First" }, { value: "b", label: "Middle" }, { value: "c", label: "Last" }]}
          value="c"
        />
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 6 }}>
          None selected
        </p>
        <Toggle
          options={[{ value: "a", label: "First" }, { value: "b", label: "Middle" }, { value: "c", label: "Last" }]}
          value={undefined}
        />
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 6 }}>
          Disabled (first selected)
        </p>
        <Toggle
          options={[{ value: "a", label: "First" }, { value: "b", label: "Middle" }, { value: "c", label: "Last" }]}
          value="a"
          disabled
        />
      </div>
    </div>
  ),
};
