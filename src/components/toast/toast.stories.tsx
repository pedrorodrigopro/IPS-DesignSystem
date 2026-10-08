// Toast stories — Figma node 1465:25421 (Notification/Toast)
// Types: success | warning | error
// Animation: slides up from bottom, auto-dismisses after 5s, closeable via cross
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toast, ToastProvider, useToast } from "./toast";
import type { ToastType } from "./toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Bottom-centre fixed notification. Three types: success (#0D2976), warning (#FFCD38), error (#A30013). " +
          "Slides up on mount, auto-dismisses after 5s, closeable via cross button. " +
          "Use `ToastProvider` + `useToast()` hook for imperative usage in apps.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// ── Static previews ────────────────────────────────────────────────────────────
// Rendered in-place (no fixed positioning) so they're visible in Storybook.

export const Success: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Toast
        type="success"
        message="Success message toaster"
        visible
        onClose={() => {}}
        className={undefined}
      />
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <Toast
      type="warning"
      message="Warning message toaster"
      visible
      onClose={() => {}}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <Toast
      type="error"
      message="Toast message"
      visible
      onClose={() => {}}
    />
  ),
};

export const AllTypes: Story = {
  name: "All Types",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <Toast type="success" message="Success message toaster" visible onClose={() => {}} />
      <Toast type="warning" message="Warning message toaster" visible onClose={() => {}} />
      <Toast type="error"   message="Toast message"           visible onClose={() => {}} />
    </div>
  ),
};

// ── Live demo — uses ToastProvider + useToast ──────────────────────────────────
// Shows the actual slide-up animation from the bottom of the viewport.

function LiveDemo() {
  const { showToast } = useToast();
  const types: ToastType[] = ["success", "warning", "error"];
  const messages: Record<ToastType, string> = {
    success: "Saved successfully!",
    warning: "Please review before continuing.",
    error:   "Something went wrong. Try again.",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 13, color: "#5C6E9E", marginBottom: 8 }}>
        Click a button to show a toast (auto-dismisses after 5s).
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        {types.map((type) => (
          <button
            key={type}
            style={{
              padding: "8px 20px",
              borderRadius: 4,
              border: "1px solid #CFDAF7",
              background: "#fff",
              fontFamily: "Mulish, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: "#0C1457",
              cursor: "pointer",
            }}
            onClick={() => showToast({ type, message: messages[type] })}
          >
            Show {type}
          </button>
        ))}
      </div>
      <button
        style={{
          padding: "8px 20px",
          borderRadius: 4,
          border: "1px solid #CFDAF7",
          background: "#fff",
          fontFamily: "Mulish, sans-serif",
          fontWeight: 700,
          fontSize: 13,
          color: "#0C1457",
          cursor: "pointer",
        }}
        onClick={() =>
          showToast({ type: "success", message: "This one stays until closed.", duration: 0 })
        }
      >
        Show persistent (no auto-dismiss)
      </button>
    </div>
  );
}

export const Interactive: Story = {
  name: "Interactive (live, with animation)",
  parameters: { layout: "centered" },
  render: () => (
    <ToastProvider>
      <LiveDemo />
    </ToastProvider>
  ),
};
