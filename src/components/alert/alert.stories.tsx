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
    type: {
      control: "select",
      options: ["error", "warning", "success", "general", "ai", "bulk-banner"],
    },
    layout: {
      control: "select",
      options: ["inline", "with-header"],
    },
  },
} satisfies Meta<typeof Alert>;

// ── Inline (Header=False) ─────────────────────────────────────────────────────

export const InlineAllTypes: StoryFn<typeof Alert> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 723 }}>
    <Alert type="error" layout="inline" message="Error inline notification"
      actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="warning" layout="inline" message="Warning inline notification"
      actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="success" layout="inline" message="Success inline notification"
      actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="general" layout="inline" message="General inline notification"
      actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="ai" layout="inline" message="AI notification"
      actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
    <Alert type="bulk-banner" layout="inline" message="10 items selected"
      actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]} />
  </div>
);

export const InlineNoActions: StoryFn<typeof Alert> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 723 }}>
    <Alert type="error" layout="inline" message="Error inline notification" />
    <Alert type="warning" layout="inline" message="Warning inline notification" />
    <Alert type="success" layout="inline" message="Success inline notification" />
  </div>
);

// ── With header (Header=True) ─────────────────────────────────────────────────

export const WithHeader: StoryFn<typeof Alert> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 723 }}>
    <Alert
      type="error"
      layout="with-header"
      message="Error inline notification"
      body="Body body Body body aBody body aBody body aBody body aBody body aBody body aBody body aBody body Body body"
      actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]}
    />
    <Alert
      type="warning"
      layout="with-header"
      message="Warning inline notification"
      body="Body body Body body aBody body aBody body aBody body aBody body aBody body aBody body aBody body Body body"
      actions={[{ label: "Label", onClick: () => {} }, { label: "Label", onClick: () => {} }]}
    />
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
  actions: [{ label: "Label", onClick: () => {} }],
};
