// PPBubble stories — ProPilot user chat bubble
// Two variants: dark (floating glass window) + light (docked white panel)

import type { Meta, StoryFn } from "@storybook/react";

import { PPBubble } from "./pp_bubble";

export default {
  title: "Components/PPBubble",
  component: PPBubble,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xtnTudkEZpuxJoPDSN0xFJ?node-id=634-109034",
    },
    layout: "centered",
  },
} satisfies Meta<typeof PPBubble>;

// ── Dark variant ──────────────────────────────────────────────────────────────

/** Used inside the floating glass ProPilot window */
export const Dark: StoryFn<typeof PPBubble> = () => (
  <div
    style={{
      padding: 24,
      background:
        "linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)",
      borderRadius: 12,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8,
      width: 400,
    }}
  >
    <PPBubble variant="dark">Can you find conflicts in my allocation?</PPBubble>
    <PPBubble variant="dark">Improve my profile for Senior Auditor</PPBubble>
    <PPBubble variant="dark">Create a bio from my profile</PPBubble>
  </div>
);
Dark.parameters = {
  backgrounds: { default: "dark", values: [{ name: "dark", value: "#0C1457" }] },
};

// ── Light variant ─────────────────────────────────────────────────────────────

/** Used inside the docked white ProPilot panel */
export const Light: StoryFn<typeof PPBubble> = () => (
  <div
    style={{
      padding: 24,
      background: "white",
      border: "1px solid var(--palette-neutral-0)",
      borderRadius: 12,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8,
      width: 400,
    }}
  >
    <PPBubble variant="light">Can you find conflicts in my allocation?</PPBubble>
    <PPBubble variant="light">Improve my profile for Senior Auditor</PPBubble>
    <PPBubble variant="light">Create a bio from my profile</PPBubble>
  </div>
);

// ── Side by side ──────────────────────────────────────────────────────────────

/** Both variants for direct comparison */
export const Comparison: StoryFn<typeof PPBubble> = () => (
  <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E", marginBottom: 4 }}>
        Dark (floating window)
      </span>
      <div
        style={{
          padding: 16,
          background:
            "linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        <PPBubble variant="dark">Find conflicts in my allocation</PPBubble>
      </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E", marginBottom: 4 }}>
        Light (docked panel)
      </span>
      <div
        style={{
          padding: 16,
          background: "white",
          border: "1px solid #CFDAF7",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        <PPBubble variant="light">Find conflicts in my allocation</PPBubble>
      </div>
    </div>
  </div>
);
