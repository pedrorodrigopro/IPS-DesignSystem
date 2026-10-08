// Actions stories — Figma nodes 1601:19589, 10003:166259, 6787:163871
// Storybook category: Molecules/Actions
import type { Meta, StoryObj } from "@storybook/react";
import { Actions } from "./actions";

const meta: Meta<typeof Actions> = {
  title: "Molecules/Actions",
  component: Actions,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Action bar with three variants: " +
          "**content** (inline, border-top, used at the bottom of form content), " +
          "**sticky-screen** (sticks to viewport bottom, white panel with blur shadow, 1280px centered), " +
          "**sticky-panel** (sticks to side panel/overlay bottom, fills parent width). " +
          "Left actions = secondary (cancel/back); right actions = primary CTA.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Actions>;

const commonActions = {
  leftActions: [
    { label: "Cancel",     variant: "secondary" as const, onClick: () => alert("Cancel") },
    { label: "Save Draft", variant: "secondary" as const, onClick: () => alert("Save Draft") },
  ],
  rightActions: [
    { label: "Create",     variant: "primary" as const,   onClick: () => alert("Create") },
  ],
};

// ── Content ────────────────────────────────────────────────────────────────────

export const Content: Story = {
  name: "content — inline (border-top)",
  render: () => (
    <div style={{ padding: 24, background: "#F8F9FD" }}>
      <div style={{
        fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#5C6E9E",
        marginBottom: 24, paddingBottom: 24,
        borderBottom: "1px solid #CFDAF7",
      }}>
        Form content above the actions bar...
      </div>
      <Actions variant="content" {...commonActions} />
    </div>
  ),
};

export const ContentCancelOnly: Story = {
  name: "content — cancel only (left)",
  render: () => (
    <div style={{ padding: 24, background: "#F8F9FD" }}>
      <Actions
        variant="content"
        leftActions={[{ label: "Back", variant: "secondary", onClick: () => {} }]}
        rightActions={[{ label: "Next", variant: "primary", onClick: () => {} }]}
      />
    </div>
  ),
};

export const ContentPrimaryOnly: Story = {
  name: "content — primary only (right)",
  render: () => (
    <div style={{ padding: 24, background: "#F8F9FD" }}>
      <Actions
        variant="content"
        rightActions={[
          { label: "Save", variant: "primary", onClick: () => {} },
        ]}
      />
    </div>
  ),
};

export const ContentWithDisabled: Story = {
  name: "content — with disabled button",
  render: () => (
    <div style={{ padding: 24 }}>
      <Actions
        variant="content"
        leftActions={[{ label: "Cancel", variant: "secondary" }]}
        rightActions={[
          { label: "Save Draft", variant: "secondary", disabled: true },
          { label: "Create", variant: "primary" },
        ]}
      />
    </div>
  ),
};

// ── Sticky screen ──────────────────────────────────────────────────────────────

export const StickyScreen: Story = {
  name: "sticky-screen — fixed to viewport bottom",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ minHeight: "100vh", background: "#F8F9FD", display: "flex", flexDirection: "column" }}>
      <div style={{
        flex: 1, padding: 40,
        fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#5C6E9E",
      }}>
        Page content — scroll down to see the sticky actions bar.
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>Paragraph {i + 1} of page content...</p>
        ))}
      </div>
      <Actions variant="sticky-screen" {...commonActions} />
    </div>
  ),
};

export const StickyScreenMinimal: Story = {
  name: "sticky-screen — minimal (no left actions)",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ minHeight: "200px", background: "#F8F9FD", position: "relative" }}>
      <div style={{ padding: 40, fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#5C6E9E" }}>
        Form content...
      </div>
      <Actions
        variant="sticky-screen"
        rightActions={[
          { label: "Cancel", variant: "secondary" },
          { label: "Save",   variant: "primary" },
        ]}
      />
    </div>
  ),
};

// ── Sticky panel ───────────────────────────────────────────────────────────────

export const StickyPanel: Story = {
  name: "sticky-panel — fixed to side panel bottom",
  render: () => (
    <div style={{
      width: 352, height: 400, background: "#F8F9FD",
      display: "flex", flexDirection: "column",
      border: "1px solid #CFDAF7", borderRadius: 8,
      overflow: "hidden", position: "relative",
    }}>
      <div style={{
        flex: 1, padding: 20, overflowY: "auto",
        fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#5C6E9E",
      }}>
        Side panel content...
        {Array.from({ length: 8 }).map((_, i) => (
          <p key={i} style={{ marginBottom: 8 }}>Panel item {i + 1}</p>
        ))}
      </div>
      <Actions
        variant="sticky-panel"
        leftActions={[{ label: "Cancel", variant: "secondary" }]}
        rightActions={[{ label: "Apply", variant: "primary" }]}
      />
    </div>
  ),
};

// ── All variants side-by-side ──────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>
          content
        </p>
        <Actions variant="content" {...commonActions} />
      </div>

      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>
          sticky-screen (shown inline for demonstration)
        </p>
        <div style={{ border: "1px solid #CFDAF7", borderRadius: 8, overflow: "hidden" }}>
          <Actions variant="sticky-screen" {...commonActions} />
        </div>
      </div>

      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>
          sticky-panel (shown in 352px container)
        </p>
        <div style={{ width: 352, border: "1px solid #CFDAF7", borderRadius: 8, overflow: "hidden" }}>
          <Actions variant="sticky-panel" {...commonActions} />
        </div>
      </div>
    </div>
  ),
};
