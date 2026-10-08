// Tile stories — Figma node 9700:113417 (Tile master)
// Storybook category: Components/Tile
import type { Meta, StoryObj } from "@storybook/react";
import { Tile } from "./tile";

const meta: Meta<typeof Tile> = {
  title: "Components/Tile",
  component: Tile,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "General-purpose content container (Figma node 9700:113417). " +
          "Controls background, shadow, border via `tileStyle` prop. " +
          "Controls padding via `padding` prop: **panel** (8px, side panels), " +
          "**content** (16px, screen containers), **screen** (24px, top-level tiles). " +
          "Pass `onClick` to make it interactive (pointer cursor + hover shadow).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tile>;

const Placeholder = ({ label = "Content goes here", height = 60 }: { label?: string; height?: number }) => (
  <div style={{
    height,
    background: "var(--palette-primary-0)",
    borderRadius: 4,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff",
    fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 700,
    opacity: 0.7,
  }}>{label}</div>
);

// ── All styles ─────────────────────────────────────────────────────────────────

export const AllStyles: Story = {
  name: "All styles",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      {[
        { tileStyle: "highlight"     as const, label: "highlight — white, flat (main content card)" },
        { tileStyle: "default"       as const, label: "default — neutral-2, flat (background container)" },
        { tileStyle: "selected"      as const, label: "selected — neutral-1 bg (selected state)" },
        { tileStyle: "object-light"  as const, label: "object-light — white + border (side panel)" },
        { tileStyle: "object-dark"   as const, label: "object-dark — neutral-2 + border (side panel)" },
        { tileStyle: "dark"          as const, label: "dark — #0C1457 bg (dark interactive card)" },
      ].map(({ tileStyle, label }) => (
        <div key={tileStyle}>
          <p style={{ fontFamily: "var(--font-family)", fontSize: 11, color: "var(--palette-blue-2)", marginBottom: 4, fontWeight: 700 }}>
            {label}
          </p>
          <Tile tileStyle={tileStyle}>
            <Placeholder />
          </Tile>
        </div>
      ))}
    </div>
  ),
};

// ── Interactive (hover for shadow) ─────────────────────────────────────────────

export const Interactive: Story = {
  name: "Interactive (hover me)",
  render: () => (
    <div style={{ display: "flex", gap: 16, maxWidth: 800 }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 11, color: "var(--palette-blue-2)", marginBottom: 4, fontWeight: 700 }}>
          interactive (white + hover shadow)
        </p>
        <Tile tileStyle="interactive" onClick={() => alert("Clicked!")}>
          <Placeholder label="Click me — hover for shadow" />
        </Tile>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 11, color: "var(--palette-blue-2)", marginBottom: 4, fontWeight: 700 }}>
          dark (blue-1 + hover shadow)
        </p>
        <Tile tileStyle="dark" onClick={() => alert("Dark clicked!")}>
          <Placeholder label="Dark interactive tile" />
        </Tile>
      </div>
    </div>
  ),
};

// ── Padding scale ──────────────────────────────────────────────────────────────

export const PaddingScale: Story = {
  name: "Padding scale",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 500 }}>
      {([
        { padding: "screen"  as const, px: "24px", context: "Top-level screen content" },
        { padding: "content" as const, px: "16px", context: "Screen container content" },
        { padding: "panel"   as const, px: "8px",  context: "Side panel / overlay blocks" },
      ]).map(({ padding, px, context }) => (
        <div key={padding}>
          <p style={{ fontFamily: "var(--font-family)", fontSize: 11, color: "var(--palette-blue-2)", marginBottom: 4 }}>
            <strong>{padding}</strong> — {px} padding — {context}
          </p>
          <Tile tileStyle="highlight" padding={padding}>
            <Placeholder label={`padding="${padding}" (${px})`} />
          </Tile>
        </div>
      ))}
    </div>
  ),
};

// ── Composed example ───────────────────────────────────────────────────────────

export const ComposedExample: Story = {
  name: "Composed — screen layout example",
  render: () => (
    <div style={{ background: "var(--palette-neutral-2)", padding: 24, borderRadius: 8, display: "flex", gap: 24 }}>
      {/* Side panel */}
      <div style={{ width: 200, display: "flex", flexDirection: "column", gap: 8 }}>
        <Tile tileStyle="object-dark" padding="panel">
          <span style={{ fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 700, color: "var(--palette-blue-0)" }}>Participants</span>
          <Placeholder label="Content" height={40} />
        </Tile>
        <Tile tileStyle="object-light" padding="panel">
          <span style={{ fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 700, color: "var(--palette-blue-0)" }}>Resourcing Dates</span>
          <Placeholder label="Content" height={40} />
        </Tile>
      </div>
      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        <Tile tileStyle="highlight" padding="screen">
          <span style={{ fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)" }}>Description</span>
          <Placeholder label="Screen-level tile (24px padding)" />
        </Tile>
        <Tile tileStyle="highlight" padding="content">
          <span style={{ fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)" }}>Details</span>
          <Placeholder label="Content tile (16px padding)" />
        </Tile>
        <Tile tileStyle="interactive" padding="content" onClick={() => {}}>
          <span style={{ fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)" }}>Clickable card ↗</span>
          <Placeholder label="Hover for shadow" />
        </Tile>
      </div>
    </div>
  ),
};
