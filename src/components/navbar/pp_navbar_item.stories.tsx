import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { PPNavbarItem } from "./pp_navbar_item";
import { Navbar } from "./navbar";

export default {
  title: "Components/PPNavbarItem",
  component: PPNavbarItem,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=15018-127289",
    },
    layout: "centered",
    backgrounds: {
      default: "navy",
      values: [{ name: "navy", value: "#0C1457" }],
    },
  },
} satisfies Meta<typeof PPNavbarItem>;

/** Resting state — animated aurora glow, dark gradient background */
export const Resting: StoryFn<typeof PPNavbarItem> = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 32, background: "#0C1457", borderRadius: 16, display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      <PPNavbarItem open={open} onClick={() => setOpen(o => !o)} />
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
        Click to toggle open state
      </span>
    </div>
  );
};

/** Open state — transparent with white dashed border, dimmed icon */
export const Open: StoryFn<typeof PPNavbarItem> = () => (
  <div style={{ padding: 32, background: "#0C1457", borderRadius: 16, display: "inline-flex", gap: 32, alignItems: "center" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <PPNavbarItem open={false} onClick={() => {}} />
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Resting</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <PPNavbarItem open={true} onClick={() => {}} />
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Open</span>
    </div>
  </div>
);

/** PPNavbarItem integrated in the Navbar component */
export const InNavbar: StoryFn = () => {
  const [navActive, setNavActive] = useState("marketplace");
  const [ppOpen, setPpOpen] = useState(false);
  return (
    <div style={{ display: "flex", height: "100vh", background: "#F8F9FD" }}>
      <Navbar
        activeId={navActive}
        onSelect={setNavActive}
        avatarInitials="CP"
        proPlilotOpen={ppOpen}
        onProPilot={() => setPpOpen(o => !o)}
      />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#5C6E9E" }}>
          ProPilot is <strong style={{ color: "#0D2976" }}>{ppOpen ? "open" : "closed"}</strong>
        </span>
      </div>
    </div>
  );
};
InNavbar.parameters = { layout: "fullscreen" };
