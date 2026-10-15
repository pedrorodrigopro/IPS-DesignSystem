import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import { PPSuggestionCard } from "./pp_suggestion_card";

const GLASS_BG = "linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)";

export default {
  title: "Components/PPSuggestionCard",
  component: PPSuggestionCard,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xtnTudkEZpuxJoPDSN0xFJ?node-id=634-109034",
    },
    layout: "centered",
  },
} satisfies Meta<typeof PPSuggestionCard>;

/** Dark variant — inside the floating glass window */
export const Dark: StoryFn = () => {
  const [state, setState] = useState<"default" | "accepted" | "dismissed">("default");
  return (
    <div style={{ width: 380, padding: 16, background: GLASS_BG, borderRadius: 12, display: "flex", flexDirection: "column", gap: 8 }}>
      <PPSuggestionCard
        variant="dark"
        state={state}
        action="Move Tech Lead to week 3 (Mon 14 Sep)"
        detail="Shift the 160h Tech Lead booking from Mon 7 Sep → Mon 14 Sep. ST Role#2 stays unchanged. Result: no overlap."
        previewHint="Hover to preview result in calendar"
        onAccept={() => setState("accepted")}
        onDismiss={() => setState("dismissed")}
      />
    </div>
  );
};
Dark.parameters = { backgrounds: { default: "dark", values: [{ name: "dark", value: "#0C1457" }] } };

/** Light variant — inside the docked white panel */
export const Light: StoryFn = () => {
  const [state, setState] = useState<"default" | "accepted" | "dismissed">("default");
  return (
    <div style={{ width: 380, padding: 16, background: "white", border: "1px solid #CFDAF7", borderRadius: 12, display: "flex", flexDirection: "column", gap: 8 }}>
      <PPSuggestionCard
        variant="light"
        state={state}
        action="Add Risk Management to your skills"
        detail="Senior Auditor roles typically require Risk Management. Adding it increases your match score by ~12%."
        previewHint="Hover to preview on profile"
        onAccept={() => setState("accepted")}
        onDismiss={() => setState("dismissed")}
      />
    </div>
  );
};

/** All states — dark */
export const AllStatesDark: StoryFn = () => (
  <div style={{ width: 380, padding: 16, background: GLASS_BG, borderRadius: 12, display: "flex", flexDirection: "column", gap: 8 }}>
    <PPSuggestionCard variant="dark" state="default"   action="Move Tech Lead to week 3" detail="Shift the booking to avoid overlap." previewHint="Hover to preview" onAccept={() => {}} onDismiss={() => {}} />
    <PPSuggestionCard variant="dark" state="accepted"  action="Move Tech Lead to week 3" detail="Shift the booking to avoid overlap." />
    <PPSuggestionCard variant="dark" state="dismissed" action="Move Tech Lead to week 3" detail="Shift the booking to avoid overlap." />
  </div>
);
AllStatesDark.parameters = { backgrounds: { default: "dark", values: [{ name: "dark", value: "#0C1457" }] } };

/** All states — light */
export const AllStatesLight: StoryFn = () => (
  <div style={{ width: 380, padding: 16, background: "white", border: "1px solid #CFDAF7", borderRadius: 12, display: "flex", flexDirection: "column", gap: 8 }}>
    <PPSuggestionCard variant="light" state="default"   action="Add Risk Management" detail="Senior Auditor roles require it." previewHint="Hover to preview" onAccept={() => {}} onDismiss={() => {}} />
    <PPSuggestionCard variant="light" state="accepted"  action="Add Risk Management" detail="Senior Auditor roles require it." />
    <PPSuggestionCard variant="light" state="dismissed" action="Add Risk Management" detail="Senior Auditor roles require it." />
  </div>
);
