// PPWidget stories — the in-page ProPilot widget
import type { Meta, StoryFn } from "@storybook/react";

import { PPWidget } from "./pp_widget";
import { PPSuggestionCard } from "../pp_suggestion_card/pp_suggestion_card";

export default {
  title: "Components/PPWidget",
  component: PPWidget,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The ProPilot glass gradient (as in the floating PPWindow) as a block that sits in the page, e.g. a dashboard widget. Header with the ProPilot mark, title and optional subtitle; " +
          "below it the suggestions as `PPSuggestionCard`s in the `dark` variant, two columns by default.",
      },
    },
  },
} satisfies Meta<typeof PPWidget>;

/** Two suggestions side by side */
export const TwoSuggestions: StoryFn = () => (
  <PPWidget subtitle="ProPilot looked at your workforce and found two things worth a look">
    <PPSuggestionCard variant="dark" hideDismiss action="3 people on the bench" detail="ProPilot found open roles that match Sarah Cox, Marcus Webb and Nina Okafor." acceptLabel="See suggested roles" />
    <PPSuggestionCard variant="dark" hideDismiss action="2 people with conflicts" detail="Alexandra I. Poane is 120% overbooked and Kevin O'Brien is double booked. ProPilot found ways to fix both." acceptLabel="See suggestions" />
  </PPWidget>
);

/** One column, with a count on the right */
export const OneColumn: StoryFn = () => (
  <div style={{ width: 420 }}>
    <PPWidget columns={1} rightContent={<span style={{ fontFamily: "var(--font-family)", fontSize: "var(--font-size-label)", color: "rgba(255,255,255,0.75)" }}>2 suggestions</span>}>
      <PPSuggestionCard variant="dark" hideDismiss action="3 people on the bench" detail="ProPilot found open roles that match them." acceptLabel="See suggested roles" />
      <PPSuggestionCard variant="dark" hideDismiss action="2 people with conflicts" detail="ProPilot found ways to fix them." acceptLabel="See suggestions" />
    </PPWidget>
  </div>
);
