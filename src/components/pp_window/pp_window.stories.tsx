// PPWindow stories — the floating ProPilot window
import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import { PPWindow } from "./pp_window";
import { PPBubble } from "../pp_bubble/pp_bubble";
import { PPThinking } from "../pp_thinking/pp_thinking";
import { PPSuggestionCard } from "../pp_suggestion_card/pp_suggestion_card";

export default {
  title: "Components/PPWindow",
  component: PPWindow,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The floating ProPilot window: glass gradient, header with the ProPilot mark + dock / close, a glass chat area for `children` and an input row. " +
          "Drag the header to move it, drag any edge or corner to resize. Inside it use the `dark` variants: PPBubble (the user), plain white text (ProPilot), " +
          "PPSuggestionCard / PPConflictBlock (suggestions) and PPThinking (while ProPilot works).",
      },
    },
  },
} satisfies Meta<typeof PPWindow>;

const aiText: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: "var(--font-size-body)", fontWeight: "var(--font-weight-regular)", lineHeight: "150%", color: "white" };
const Page = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: "100vh", background: "var(--palette-neutral-2)", padding: 24, fontFamily: "var(--font-family)", color: "var(--palette-blue-2)" }}>
    The page behind the window
    {children}
  </div>
);

/** An empty window with the input row */
export const Empty: StoryFn = () => {
  const [value, setValue] = useState("");
  return <Page><PPWindow inputValue={value} onInputChange={setValue} onSend={() => setValue("")} onClose={() => {}} onDock={() => {}} /></Page>;
};

/** A conversation: ProPilot text, the user's bubble, the analysing indicator and an option with its own button */
export const Conversation: StoryFn = () => {
  const [value, setValue] = useState("");
  return (
    <Page>
      <PPWindow inputValue={value} onInputChange={setValue} onSend={() => setValue("")} onClose={() => {}} onDock={() => {}}>
        <div style={aiText}>Hey there :) What can I do for you today?</div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}><PPBubble variant="dark">Find me a better start date</PPBubble></div>
        <PPThinking label="Analysing…" />
        <PPSuggestionCard variant="dark" action="Option 1" detail="Move the start date forward by 1 week, which will result in 15 matches" acceptLabel="Move start date" hideDismiss />
      </PPWindow>
    </Page>
  );
};
