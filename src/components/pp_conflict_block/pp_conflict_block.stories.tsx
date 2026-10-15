import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import { PPConflictBlock }   from "./pp_conflict_block";
import { PPSuggestionCard }  from "../pp_suggestion_card/pp_suggestion_card";

const GLASS_BG = "linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)";

export default {
  title: "Components/PPConflictBlock",
  component: PPConflictBlock,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xtnTudkEZpuxJoPDSN0xFJ?node-id=634-109034",
    },
    layout: "centered",
  },
} satisfies Meta<typeof PPConflictBlock>;

/** Error severity — dark variant with suggestion cards */
export const ErrorDark: StoryFn = () => {
  const [states, setStates] = useState<Record<string, "default" | "accepted" | "dismissed">>({
    s1: "default",
  });
  const setState = (id: string, val: "accepted" | "dismissed") =>
    setStates(prev => ({ ...prev, [id]: val }));

  return (
    <div style={{ width: 420, padding: 16, background: GLASS_BG, borderRadius: 12 }}>
      <PPConflictBlock
        variant="dark"
        severity="error"
        person="Alexandra I. Poane — 120% overbooked"
        description="ST Role#2 (136h, days 1–8) overlaps with Tech Lead (160h starting day 7). She has 12h/day booked for 5 consecutive days."
      >
        <PPSuggestionCard
          variant="dark"
          state={states.s1}
          action="Move Tech Lead to week 3 (Mon 14 Sep)"
          detail="Shift the 160h Tech Lead booking from Mon 7 Sep → Mon 14 Sep. No overlap remains."
          previewHint="Hover to preview result in calendar"
          onAccept={() => setState("s1", "accepted")}
          onDismiss={() => setState("s1", "dismissed")}
        />
      </PPConflictBlock>
    </div>
  );
};
ErrorDark.parameters = { backgrounds: { default: "dark", values: [{ name: "dark", value: "#0C1457" }] } };

/** Warning severity — dark variant */
export const WarningDark: StoryFn = () => {
  const [states, setStates] = useState<Record<string, "default" | "accepted" | "dismissed">>({
    s1: "default", s2: "default",
  });
  const setState = (id: string, val: "accepted" | "dismissed") =>
    setStates(prev => ({ ...prev, [id]: val }));

  return (
    <div style={{ width: 420, padding: 16, background: GLASS_BG, borderRadius: 12 }}>
      <PPConflictBlock
        variant="dark"
        severity="warning"
        person="Senior Auditor — Duration misalignment"
        description="The role requests 160h but only 80h is booked (Mon 31 Aug – 4 Sep). 80h is unaccounted for."
      >
        <PPSuggestionCard
          variant="dark"
          state={states.s1}
          action="Reduce role duration to 80h"
          detail="Adjust the role's duration from 160h → 80h to match the existing booking."
          previewHint="Hover to preview on profile"
          onAccept={() => setState("s1", "accepted")}
          onDismiss={() => setState("s1", "dismissed")}
        />
        <PPSuggestionCard
          variant="dark"
          state={states.s2}
          action="Book missing 80h — reassign to James Obi"
          detail="Create an additional 80h booking for the remaining slot and reassign to James Obi."
          previewHint="Hover to preview on profile"
          onAccept={() => setState("s2", "accepted")}
          onDismiss={() => setState("s2", "dismissed")}
        />
      </PPConflictBlock>
    </div>
  );
};
WarningDark.parameters = { backgrounds: { default: "dark", values: [{ name: "dark", value: "#0C1457" }] } };

/** Light variant — docked panel */
export const WarningLight: StoryFn = () => {
  const [states, setStates] = useState<Record<string, "default" | "accepted" | "dismissed">>({
    s1: "default", s2: "default",
  });
  const setState = (id: string, val: "accepted" | "dismissed") =>
    setStates(prev => ({ ...prev, [id]: val }));

  return (
    <div style={{ width: 420, padding: 16, background: "white", border: "1px solid #CFDAF7", borderRadius: 12 }}>
      <PPConflictBlock
        variant="light"
        severity="warning"
        person="Senior Auditor — Duration misalignment"
        description="The role requests 160h but only 80h is booked (Mon 31 Aug – 4 Sep). 80h is unaccounted for."
      >
        <PPSuggestionCard
          variant="light"
          state={states.s1}
          action="Reduce role duration to 80h"
          detail="Adjust the role's duration from 160h → 80h to match the existing booking."
          previewHint="Hover to preview on profile"
          onAccept={() => setState("s1", "accepted")}
          onDismiss={() => setState("s1", "dismissed")}
        />
        <PPSuggestionCard
          variant="light"
          state={states.s2}
          action="Book missing 80h — reassign to James Obi"
          detail="Create an additional 80h booking for Mon 31 Aug – 4 Sep and reassign to James Obi."
          previewHint="Hover to preview on profile"
          onAccept={() => setState("s2", "accepted")}
          onDismiss={() => setState("s2", "dismissed")}
        />
      </PPConflictBlock>
    </div>
  );
};
