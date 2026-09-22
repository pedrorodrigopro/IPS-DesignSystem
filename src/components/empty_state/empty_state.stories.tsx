import type { Meta, StoryFn } from "@storybook/react";
import { EmptyState } from "./empty_state";

export default {
  title: "Components/Empty State",
  component: EmptyState,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1527-51923",
    },
    layout: "centered",
  },
  argTypes: {
    size: { control: "select", options: ["big", "small-vertical", "small-horizontal"] },
  },
} satisfies Meta<typeof EmptyState>;

// ── Small vertical — no actions ───────────────────────────────────────────────

export const SmallVertical: StoryFn<typeof EmptyState> = () => (
  <EmptyState size="small-vertical" title="No items to show" />
);

// ── Small vertical — with actions ─────────────────────────────────────────────

export const SmallVerticalWithActions: StoryFn<typeof EmptyState> = () => (
  <EmptyState
    size="small-vertical"
    title="No items to show"
    actions={[
      { label: "Add Role", kind: "primary", onClick: () => {} },
      { label: "Add Co-Owner", kind: "secondary", onClick: () => {} },
    ]}
  />
);

// ── Small horizontal ──────────────────────────────────────────────────────────

export const SmallHorizontal: StoryFn<typeof EmptyState> = () => (
  <EmptyState size="small-horizontal" title="No items to show" />
);

// ── Small horizontal — with actions ───────────────────────────────────────────

export const SmallHorizontalWithActions: StoryFn<typeof EmptyState> = () => (
  <EmptyState
    size="small-horizontal"
    title="No items to show"
    actions={[
      { label: "Add Role", kind: "primary", onClick: () => {} },
      { label: "Add Co-Owner", kind: "secondary", onClick: () => {} },
    ]}
  />
);

// ── Big — with illustration placeholder ───────────────────────────────────────

export const Big: StoryFn<typeof EmptyState> = () => (
  <EmptyState
    size="big"
    title="This engagement has no roles"
    subtitle="Add roles to get started, or add a Co-Owner"
    illustration={
      // Placeholder illustration circle — replace with real SVG from Figma graphics
      <div style={{
        width: 200, height: 200, borderRadius: "50%",
        background: "#FFD8A2",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#9B5A01" }}>Illustration</span>
      </div>
    }
  />
);

// ── Big — with actions ────────────────────────────────────────────────────────

export const BigWithActions: StoryFn<typeof EmptyState> = () => (
  <EmptyState
    size="big"
    title="This engagement has no roles"
    subtitle="Add roles to get started, or add a Co-Owner"
    illustration={
      <div style={{
        width: 200, height: 200, borderRadius: "50%",
        background: "#FFD8A2",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#9B5A01" }}>Illustration</span>
      </div>
    }
    actions={[
      { label: "Add Role", kind: "primary", onClick: () => {} },
      { label: "Add Co-Owner", kind: "secondary", onClick: () => {} },
    ]}
  />
);

// ── All sizes ─────────────────────────────────────────────────────────────────

export const AllSizes: StoryFn<typeof EmptyState> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 48, padding: 32, alignItems: "center" }}>
    <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
        <span style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Small vertical</span>
        <EmptyState size="small-vertical" title="No items to show" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
        <span style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Small horizontal</span>
        <EmptyState size="small-horizontal" title="No items to show" />
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      <span style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Big</span>
      <EmptyState
        size="big"
        title="This engagement has no roles"
        subtitle="Add roles to get started, or add a Co-Owner"
        illustration={
          <div style={{ width: 200, height: 200, borderRadius: "50%", background: "#FFD8A2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "Mulish", fontSize: 12, color: "#9B5A01" }}>Illustration</span>
          </div>
        }
        actions={[
          { label: "Add Role", kind: "primary", onClick: () => {} },
          { label: "Add Co-Owner", kind: "secondary", onClick: () => {} },
        ]}
      />
    </div>
  </div>
);

export const Default: StoryFn<typeof EmptyState> = (args) => <EmptyState {...args} />;
Default.args = { size: "small-vertical", title: "No items to show" };
