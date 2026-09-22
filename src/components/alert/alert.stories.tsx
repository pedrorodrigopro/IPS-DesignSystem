import type { Meta, StoryFn } from "@storybook/react";
import { Alert } from "./alert";

export default {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=2802-170745",
    },
  },
  argTypes: {
    type: { control: "select", options: ["error", "warning", "success", "general", "ai", "bulk-banner"] },
    layout: { control: "select", options: ["inline", "with-header"] },
  },
} satisfies Meta<typeof Alert>;

const body = "Body body Body body aBody body aBody body aBody body aBody body aBody body aBody body aBody body Body body";

// ── Inline (Header=False) ─────────────────────────────────────────────────────

export const InlineWithActions: StoryFn<typeof Alert> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 723 }}>
    <Alert type="error"       layout="inline" message="Error inline notification"   actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="warning"     layout="inline" message="Warning inline notification" actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="success"     layout="inline" message="Success inline notification" actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="general"     layout="inline" message="General inline notification" actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="ai"          layout="inline" message="AI notification"             actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="bulk-banner" layout="inline" message="10 items selected"           actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
  </div>
);

export const InlineNoActions: StoryFn<typeof Alert> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 723 }}>
    <Alert type="error"   layout="inline" message="Error inline notification" />
    <Alert type="warning" layout="inline" message="Warning inline notification" />
    <Alert type="success" layout="inline" message="Success inline notification" />
    <Alert type="general" layout="inline" message="General inline notification" />
  </div>
);

// ── With header (Header=True) — with actions ──────────────────────────────────

export const WithHeaderAndActions: StoryFn<typeof Alert> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 723 }}>
    <Alert type="error"   layout="with-header" message="Error inline notification"   body={body} actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="warning" layout="with-header" message="Warning inline notification" body={body} actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="success" layout="with-header" message="Success inline notification" body={body} actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="general" layout="with-header" message="General inline notification" body={body} actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
  </div>
);

// ── With header (Header=True) — no actions ────────────────────────────────────

export const WithHeaderNoActions: StoryFn<typeof Alert> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 723 }}>
    <Alert type="error"   layout="with-header" message="Error inline notification"   body={body} />
    <Alert type="warning" layout="with-header" message="Warning inline notification" body={body} />
    <Alert type="success" layout="with-header" message="Success inline notification" body={body} />
    <Alert type="general" layout="with-header" message="General inline notification" body={body} />
    <Alert type="ai"      layout="with-header" message="AI notification"             body={body} />
  </div>
);

// ── With header — title only (no body, no actions) ────────────────────────────

export const WithHeaderTitleOnly: StoryFn<typeof Alert> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 723 }}>
    <Alert type="error"   layout="with-header" message="Error inline notification" />
    <Alert type="warning" layout="with-header" message="Warning inline notification" />
    <Alert type="success" layout="with-header" message="Success inline notification" />
    <Alert type="general" layout="with-header" message="General inline notification" />
  </div>
);

export const Default: StoryFn<typeof Alert> = (args) => (
  <div style={{ maxWidth: 723 }}>
    <Alert {...args} />
  </div>
);
Default.args = {
  type: "general",
  layout: "inline",
  message: "General inline notification",
};
