// PPDock stories — the ProPilot panel docked into the screen layout
import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import { PPDock } from "./pp_dock";
import { PPWindow } from "../pp_window/pp_window";
import { PPBubble } from "../pp_bubble/pp_bubble";
import { PPThinking } from "../pp_thinking/pp_thinking";
import { PPSuggestionCard } from "../pp_suggestion_card/pp_suggestion_card";
import { Navbar } from "../navbar/navbar";
import { Layout } from "../layout/layout";
import { Header } from "../header/header";
import { Tile } from "../tile/tile";

export default {
  title: "Components/PPDock",
  component: PPDock,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The ProPilot panel docked into the screen layout (the twin of the floating PPWindow). A 400px white column in the page's flex row, between the Navbar and the content, " +
          "which shrinks to make room. Header with the ProPilot mark, title, a float button (hands the conversation back to PPWindow) and close; a bordered chat area for `children`; an input row. " +
          "Inside it use the `light` variants: PPBubble (the user), plain blue text (ProPilot), PPSuggestionCard / PPConflictBlock (suggestions) and PPThinking (while ProPilot works).",
      },
    },
  },
} satisfies Meta<typeof PPDock>;

const aiText: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: "var(--font-size-body)", fontWeight: "var(--font-weight-regular)", lineHeight: "150%", color: "var(--palette-blue-0)" };

/** Navbar + docked panel + content, as in a screen: the Navbar's ProPilot item is open and the content shrinks */
const Screen = ({ dock }: { dock?: React.ReactNode }) => (
  <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--palette-neutral-2)" }}>
    <div style={{ flexShrink: 0, height: "100vh" }}>
      <Navbar activeId="profile" proPlilotOpen={!!dock} avatarInitials="CP" />
    </div>
    {dock}
    <div style={{ flex: 1, minWidth: 0, overflowY: "auto", height: "100vh" }}>
      <Layout variant="1280">
        <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
          <Header size="page" title="Profile" />
          <Tile tileStyle="highlight" padding="content"><Header size="content" title="Skills" /><span style={aiText}>The content next to the docked panel</span></Tile>
          <Tile tileStyle="highlight" padding="content"><Header size="content" title="Experience" /></Tile>
        </div>
      </Layout>
    </div>
  </div>
);

/** An empty panel with the input row */
export const Empty: StoryFn = () => {
  const [value, setValue] = useState("");
  return <Screen dock={<PPDock inputValue={value} onInputChange={setValue} onSend={() => setValue("")} onClose={() => {}} onFloat={() => {}} />} />;
};

/** A conversation: ProPilot text, the user's bubble, the analysing indicator and an option with its own button */
export const Conversation: StoryFn = () => {
  const [value, setValue] = useState("");
  return (
    <Screen dock={
      <PPDock inputValue={value} onInputChange={setValue} onSend={() => setValue("")} onClose={() => {}} onFloat={() => {}}>
        <div style={aiText}>Hey there :) What can I do for you today?</div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}><PPBubble variant="light">Suggest skills for my profile</PPBubble></div>
        <PPThinking variant="light" label="Analysing…" />
        <PPSuggestionCard variant="light" action="Option 1" detail="Add 3 skills found in your recent engagements" acceptLabel="Add skills" hideDismiss />
      </PPDock>
    } />
  );
};

/** Float and dock: the float button hands the conversation to the floating PPWindow, whose dock button brings it back; close hides it */
export const FloatAndDock: StoryFn = () => {
  const [mode, setMode] = useState<"docked" | "floating" | "closed">("docked");
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const send = (text: string) => { setMessages(m => [...m, text]); setValue(""); };
  const light = mode === "docked";
  const chat = (
    <>
      <div style={{ ...aiText, color: light ? "var(--palette-blue-0)" : "white" }}>Hey there :) What can I do for you today?</div>
      {messages.map((m, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}><PPBubble variant={light ? "light" : "dark"}>{m}</PPBubble></div>
      ))}
    </>
  );
  return (
    <>
      <Screen dock={mode === "docked" ? (
        <PPDock inputValue={value} onInputChange={setValue} onSend={send} onClose={() => setMode("closed")} onFloat={() => setMode("floating")}>{chat}</PPDock>
      ) : undefined} />
      {mode === "floating" && (
        <PPWindow inputValue={value} onInputChange={setValue} onSend={send} onClose={() => setMode("closed")} onDock={() => setMode("docked")}>{chat}</PPWindow>
      )}
      {mode === "closed" && (
        <button type="button" onClick={() => setMode("docked")} style={{ position: "fixed", right: 24, bottom: 24, padding: "8px 16px", borderRadius: 8, border: "1px solid var(--palette-neutral-0)", background: "white", fontFamily: "var(--font-family)", cursor: "pointer" }}>Open ProPilot</button>
      )}
    </>
  );
};
