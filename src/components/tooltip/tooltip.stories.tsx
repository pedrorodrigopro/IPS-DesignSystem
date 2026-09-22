import type { Meta, StoryFn } from "@storybook/react";
import { Tooltip } from "./tooltip";

export default {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1457-22694",
    },
  },
} satisfies Meta<typeof Tooltip>;

export const AllPlacements: StoryFn<typeof Tooltip> = () => (
  <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", padding: "64px" }}>
    {(["top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"] as const).map((p) => (
      <Tooltip key={p} content="Tooltip" placement={p}>
        <button style={{ padding: "8px 16px", background: "#e7eaf8", border: "1px solid #cfdaf7", borderRadius: "8px", cursor: "pointer" }}>
          {p}
        </button>
      </Tooltip>
    ))}
  </div>
);

export const Variants: StoryFn<typeof Tooltip> = () => (
  <div style={{ display: "flex", gap: "32px", padding: "64px" }}>
    <Tooltip content="Default tooltip" placement="bottom" variant="default">
      <button style={{ padding: "8px 16px", background: "#e7eaf8", border: "1px solid #cfdaf7", borderRadius: "8px", cursor: "pointer" }}>Default</button>
    </Tooltip>
    <Tooltip content="Activity feed tooltip" placement="bottom" variant="activity-feed">
      <button style={{ padding: "8px 16px", background: "#e7eaf8", border: "1px solid #cfdaf7", borderRadius: "8px", cursor: "pointer" }}>Activity feed</button>
    </Tooltip>
  </div>
);

export const Default: StoryFn<typeof Tooltip> = (args) => (
  <div style={{ padding: "64px" }}>
    <Tooltip {...args}>
      <button style={{ padding: "8px 16px", background: "#e7eaf8", border: "1px solid #cfdaf7", borderRadius: "8px", cursor: "pointer" }}>Hover me</button>
    </Tooltip>
  </div>
);
Default.args = { content: "Tooltip", placement: "top" };
