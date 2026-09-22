import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Divider } from "./divider";

export default {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=2537-162703",
    },
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    type: { control: "select", options: ["default", "draggable"] },
  },
} satisfies Meta<typeof Divider>;

// Horizontal — Margins=False
export const HorizontalNoMargins: StoryFn<typeof Divider> = () => (
  <div style={{ width: 300, padding: 16, background: "white" }}>
    <p style={{ fontFamily: "Mulish", fontSize: 14, color: "#0D2976", marginBottom: 8 }}>Above</p>
    <Divider orientation="horizontal" margins={false} />
    <p style={{ fontFamily: "Mulish", fontSize: 14, color: "#0D2976", marginTop: 8 }}>Below</p>
  </div>
);

// Horizontal — Margins=True
export const HorizontalWithMargins: StoryFn<typeof Divider> = () => (
  <div style={{ width: 300, padding: 16, background: "white" }}>
    <p style={{ fontFamily: "Mulish", fontSize: 14, color: "#0D2976" }}>Above</p>
    <Divider orientation="horizontal" margins={true} />
    <p style={{ fontFamily: "Mulish", fontSize: 14, color: "#0D2976" }}>Below</p>
  </div>
);

// Vertical — Margins=False
export const VerticalNoMargins: StoryFn<typeof Divider> = () => (
  <div style={{ display: "flex", height: 80, padding: 16, background: "white", alignItems: "stretch" }}>
    <span style={{ fontFamily: "Mulish", fontSize: 14, color: "#0D2976" }}>Left</span>
    <Divider orientation="vertical" margins={false} />
    <span style={{ fontFamily: "Mulish", fontSize: 14, color: "#0D2976" }}>Right</span>
  </div>
);

// Vertical — Margins=True
export const VerticalWithMargins: StoryFn<typeof Divider> = () => (
  <div style={{ display: "flex", height: 80, padding: 16, background: "white", alignItems: "stretch" }}>
    <span style={{ fontFamily: "Mulish", fontSize: 14, color: "#0D2976" }}>Left</span>
    <Divider orientation="vertical" margins={true} />
    <span style={{ fontFamily: "Mulish", fontSize: 14, color: "#0D2976" }}>Right</span>
  </div>
);

// Draggable — Default + Hover
export const Draggable: StoryFn<typeof Divider> = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center", padding: 24, height: 120, background: "white" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Divider type="draggable" />
        <span style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1" }}>Default</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Divider
          type="draggable"
          isHovered={hovered}
          onDragHandleMouseDown={() => {}}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        <span style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1" }}>Hover (hover me)</span>
      </div>
    </div>
  );
};

// All variants
export const AllVariants: StoryFn<typeof Divider> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24, background: "white" }}>
    <div>
      <span style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Horizontal</span>
      <div style={{ marginTop: 8 }}><Divider orientation="horizontal" margins={false} /></div>
      <div style={{ marginTop: 16 }}><Divider orientation="horizontal" margins={true} /></div>
    </div>
    <div style={{ display: "flex", gap: 32, height: 80, alignItems: "stretch" }}>
      <span style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, alignSelf: "flex-start" }}>Vertical</span>
      <Divider orientation="vertical" margins={false} />
      <Divider orientation="vertical" margins={true} />
    </div>
  </div>
);

export const Default: StoryFn<typeof Divider> = (args) => (
  <div style={{ width: 300, height: 80, padding: 16, background: "white", display: "flex", alignItems: "center" }}>
    <Divider {...args} />
  </div>
);
Default.args = { orientation: "horizontal", margins: false, type: "default" };
