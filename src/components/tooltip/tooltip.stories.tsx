// Tooltip stories — Figma node 1457:22694
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./tooltip";
import type { TooltipPlacement } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dark tooltip bubble (#0C1457, radius 8px, padding 16px) shown on hover/focus. " +
          "13 placements: no-arrow, down/up/left/right × center/left-right or up/down. " +
          "Arrow is a 10px CSS triangle overlapping the bubble by 3px.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const TriggerBtn = ({ label = "Hover me" }: { label?: string }) => (
  <button
    style={{
      padding: "8px 16px",
      borderRadius: 4,
      border: "1px solid #CFDAF7",
      background: "#fff",
      fontFamily: "Mulish, sans-serif",
      fontSize: 13,
      fontWeight: 700,
      color: "#0C1457",
      cursor: "default",
    }}
  >
    {label}
  </button>
);

// ── All placements grid ────────────────────────────────────────────────────────

const placements: { placement: TooltipPlacement; label: string }[] = [
  { placement: "no-arrow",     label: "No arrow" },
  { placement: "down-center",  label: "Down center" },
  { placement: "down-left",    label: "Down left" },
  { placement: "down-right",   label: "Down right" },
  { placement: "up-center",    label: "Up center" },
  { placement: "up-left",      label: "Up left" },
  { placement: "up-right",     label: "Up right" },
  { placement: "left-center",  label: "Left center" },
  { placement: "left-up",      label: "Left up" },
  { placement: "left-down",    label: "Left down" },
  { placement: "right-center", label: "Right center" },
  { placement: "right-up",     label: "Right up" },
  { placement: "right-down",   label: "Right down" },
];

export const AllPlacements: Story = {
  name: "All placements",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 80,
        padding: 60,
      }}
    >
      {placements.map(({ placement, label }) => (
        <div key={placement} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", margin: 0 }}>
            {label}
          </p>
          <Tooltip content="Tooltip" placement={placement}>
            <TriggerBtn label={label} />
          </Tooltip>
        </div>
      ))}
    </div>
  ),
};

// ── Individual stories ─────────────────────────────────────────────────────────

export const DownCenter: Story = {
  name: "Down center",
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="Tooltip" placement="down-center">
        <TriggerBtn />
      </Tooltip>
    </div>
  ),
};

export const UpCenter: Story = {
  name: "Up center",
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="Tooltip" placement="up-center">
        <TriggerBtn />
      </Tooltip>
    </div>
  ),
};

export const LeftCenter: Story = {
  name: "Left center (bubble right of trigger)",
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="Tooltip" placement="left-center">
        <TriggerBtn />
      </Tooltip>
    </div>
  ),
};

export const RightCenter: Story = {
  name: "Right center (bubble left of trigger)",
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="Tooltip" placement="right-center">
        <TriggerBtn />
      </Tooltip>
    </div>
  ),
};

export const NoArrow: Story = {
  name: "No arrow",
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="Tooltip" placement="no-arrow">
        <TriggerBtn />
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  name: "Long content",
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip
        content="This is a longer tooltip that wraps across multiple lines to demonstrate text wrapping behaviour."
        placement="down-center"
        maxWidth={200}
      >
        <TriggerBtn label="Long tooltip" />
      </Tooltip>
    </div>
  ),
};

export const OnIcon: Story = {
  name: "On icon trigger",
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="More options" placement="down-center">
        <span
          style={{
            display: "inline-flex",
            width: 28,
            height: 28,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            border: "1px solid #CFDAF7",
            cursor: "default",
            fontFamily: "Mulish, sans-serif",
            fontSize: 16,
            color: "#5C6E9E",
          }}
        >
          ⋮
        </span>
      </Tooltip>
    </div>
  ),
};
