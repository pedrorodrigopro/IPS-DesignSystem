import type { Meta, StoryFn } from "@storybook/react";
import { Alert } from "./alert";

export default {
  title: "Atoms/Alert",
  component: Alert,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=2802-170745",
    },
  },
} satisfies Meta<typeof Alert>;

export const AllTypes: StoryFn<typeof Alert> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: 600 }}>
    <Alert type="error" message="Something went wrong. Please try again." />
    <Alert type="warning" message="This action may have unintended consequences." />
    <Alert type="success" message="Changes saved successfully." />
    <Alert type="general" message="Here is some general information." />
    <Alert type="bulk-banner" message="Bulk action applied to 12 items." />
    <Alert type="ai" message="AI suggestion: consider reviewing these matches." />
  </div>
);

export const WithActions: StoryFn<typeof Alert> = () => (
  <Alert
    type="warning"
    message="This booking overlaps with an existing one."
    actions={
      <button style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, color: "#9b5a01" }}>
        View conflict
      </button>
    }
  />
);

export const Default: StoryFn<typeof Alert> = (args) => <Alert {...args} />;
Default.args = { type: "general", message: "Alert message" };
