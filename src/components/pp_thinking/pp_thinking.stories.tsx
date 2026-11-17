// PPThinking stories — ProPilot "working on it" indicator
import type { Meta, StoryFn } from "@storybook/react";

import { PPThinking } from "./pp_thinking";

export default {
  title: "Components/PPThinking",
  component: PPThinking,
  parameters: { layout: "centered" },
} satisfies Meta<typeof PPThinking>;

const GLASS = "linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)";

/** Inside the floating glass window */
export const Dark: StoryFn<typeof PPThinking> = () => (
  <div style={{ padding: 24, background: GLASS, borderRadius: 12, minWidth: 320 }}>
    <PPThinking variant="dark" label="Analysing…" />
  </div>
);

/** Inside the docked white panel */
export const Light: StoryFn<typeof PPThinking> = () => (
  <div style={{ padding: 24, background: "white", border: "1px solid var(--palette-neutral-0)", borderRadius: 12, minWidth: 320 }}>
    <PPThinking variant="light" />
  </div>
);
