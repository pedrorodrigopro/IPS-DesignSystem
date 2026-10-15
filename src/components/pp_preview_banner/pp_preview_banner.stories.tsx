import type { Meta, StoryFn } from "@storybook/react";
import { PPPreviewBanner } from "./pp_preview_banner";

export default {
  title: "Components/PPPreviewBanner",
  component: PPPreviewBanner,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "neutral", values: [{ name: "neutral", value: "#F8F9FD" }] },
  },
} satisfies Meta<typeof PPPreviewBanner>;

/** Visible — with label (most common usage) */
export const WithLabel: StoryFn = () => (
  <div style={{ position: "relative", height: 120, background: "#F8F9FD" }}>
    <PPPreviewBanner visible label="Result after applying — Kevin & Diana" />
  </div>
);

/** Visible — without label */
export const WithoutLabel: StoryFn = () => (
  <div style={{ position: "relative", height: 120, background: "#F8F9FD" }}>
    <PPPreviewBanner visible />
  </div>
);

/** Not visible — renders nothing */
export const Hidden: StoryFn = () => (
  <div style={{ position: "relative", height: 120, background: "#F8F9FD", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <PPPreviewBanner visible={false} label="This should not show" />
    <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#5C6E9E" }}>Banner is hidden</span>
  </div>
);
