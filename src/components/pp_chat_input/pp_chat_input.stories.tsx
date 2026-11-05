// PPChatInput stories — ProPilot chat input row (avatar + input + send)

import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";

import { PPChatInput } from "./pp_chat_input";
import { PPBubble } from "../pp_bubble/pp_bubble";

export default {
  title: "Components/PPChatInput",
  component: PPChatInput,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/eLJ4mtITbBhHCbONvKtGZU?node-id=1440-36113",
    },
    layout: "centered",
  },
} satisfies Meta<typeof PPChatInput>;

/** Empty — placeholder "Ask ProPilot". Long text wraps and the field grows (up to 5 lines, then scrolls); Enter sends, Shift+Enter adds a line. */
export const Default: StoryFn<typeof PPChatInput> = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: 420, padding: 24, background: "var(--palette-white-0)", borderRadius: 8 }}>
      <PPChatInput value={value} onChange={setValue} />
    </div>
  );
};

/** Type and press Enter (or click send): the message is added above as a light PPBubble */
export const WithMessages: StoryFn<typeof PPChatInput> = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<string[]>(["Shorten the bio to two sentences"]);
  return (
    <div style={{ width: 420, padding: 24, background: "var(--palette-white-0)", borderRadius: 8, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        {messages.map((m, i) => <PPBubble key={i} variant="light">{m}</PPBubble>)}
      </div>
      <PPChatInput
        value={value}
        onChange={setValue}
        onSend={text => { setMessages(ms => [...ms, text]); setValue(""); }}
      />
    </div>
  );
};
