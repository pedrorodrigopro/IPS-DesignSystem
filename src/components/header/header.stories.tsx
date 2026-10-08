// Header stories — Figma node 1506:25833
// Storybook category: Molecules/Header
import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";

const meta: Meta<typeof Header> = {
  title: "Molecules/Header",
  component: Header,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Page/section/content header with optional left icon, right icon, subtitle, and action buttons. " +
          "Size controls title scale: page=H1 (32px), section=H2 (28px), content=H4 (20px). " +
          "Actions use Button regular for page/section and Button small for content.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// ── Page size ──────────────────────────────────────────────────────────────────

export const PageNoActions: Story = {
  name: "Page — no actions",
  render: () => (
    <Header size="page" title="Page Title" />
  ),
};

export const PageWithActions: Story = {
  name: "Page — with actions",
  render: () => (
    <Header
      size="page"
      title="Create Role"
      actions={[
        { label: "Cancel",     variant: "secondary", onClick: () => alert("Cancel") },
        { label: "Save Draft", variant: "secondary", onClick: () => alert("Save Draft") },
        { label: "Create",     variant: "primary",   onClick: () => alert("Create") },
      ]}
    />
  ),
};

export const PageWithSubtitle: Story = {
  name: "Page — with subtitle",
  render: () => (
    <Header
      size="page"
      title="Marketplace"
      subtitle="Senior Project Manager"
      actions={[
        { label: "Cancel", variant: "secondary", onClick: () => {} },
        { label: "Save",   variant: "primary",   onClick: () => {} },
      ]}
    />
  ),
};

export const PageWithLeftIcon: Story = {
  name: "Page — with left icon",
  render: () => (
    <Header
      size="page"
      title="Marketplace"
      leftIcon="role"
    />
  ),
};

// ── Section size ───────────────────────────────────────────────────────────────

export const SectionNoActions: Story = {
  name: "Section — no actions",
  render: () => (
    <Header size="section" title="Section Header" />
  ),
};

export const SectionWithActions: Story = {
  name: "Section — with actions",
  render: () => (
    <Header
      size="section"
      title="Skills & Rates"
      actions={[
        { label: "Label", variant: "secondary", onClick: () => {} },
        { label: "Label", variant: "primary",   onClick: () => {} },
      ]}
    />
  ),
};

export const SectionWithSubtitle: Story = {
  name: "Section — with subtitle",
  render: () => (
    <Header
      size="section"
      title="Workflow"
      subtitle="Last update: 12 Jan 2024"
    />
  ),
};

export const SectionWithIcons: Story = {
  name: "Section — with left + right icons",
  render: () => (
    <Header
      size="section"
      title="Reports"
      leftIcon="reports"
      rightIcon="info"
      actions={[
        { label: "Export", variant: "primary", onClick: () => {} },
      ]}
    />
  ),
};

// ── Content size ───────────────────────────────────────────────────────────────

export const ContentNoActions: Story = {
  name: "Content — no actions",
  render: () => (
    <Header size="content" title="Content Header" />
  ),
};

export const ContentWithActions: Story = {
  name: "Content — with actions",
  render: () => (
    <Header
      size="content"
      title="Skills"
      actions={[
        { label: "Label", variant: "secondary", onClick: () => {} },
        { label: "Label", variant: "primary",   onClick: () => {} },
      ]}
    />
  ),
};

export const ContentWithSubtitle: Story = {
  name: "Content — with subtitle",
  render: () => (
    <Header
      size="content"
      title="Skills"
      subtitle="Showing 12 results"
      actions={[
        { label: "Add skill", variant: "primary", onClick: () => {} },
      ]}
    />
  ),
};

// ── All sizes ──────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: "All sizes",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>page</p>
        <Header
          size="page"
          title="Page Title"
          actions={[
            { label: "Cancel", variant: "secondary" },
            { label: "Create", variant: "primary" },
          ]}
        />
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>section</p>
        <Header
          size="section"
          title="Section Title"
          actions={[
            { label: "Label", variant: "secondary" },
            { label: "Label", variant: "primary" },
          ]}
        />
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>content</p>
        <Header
          size="content"
          title="Content Title"
          actions={[
            { label: "Label", variant: "secondary" },
            { label: "Label", variant: "primary" },
          ]}
        />
      </div>
    </div>
  ),
};

// ── All sizes with subtitle ────────────────────────────────────────────────────

export const AllSizesWithSubtitle: Story = {
  name: "All sizes — with subtitle",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {(["page", "section", "content"] as const).map((size) => (
        <div key={size}>
          <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>{size}</p>
          <Header
            size={size}
            title="Title"
            subtitle="Subtitle line — additional context"
          />
        </div>
      ))}
    </div>
  ),
};
