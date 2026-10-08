// Layout stories — Figma node 2834:178203 (Template/Layout + Template/Page)
import type { Meta, StoryObj } from "@storybook/react";
import { Layout, Page } from "./layout";

const meta: Meta<typeof Layout> = {
  title: "Patterns/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Screen layout templates matching Figma Template/Layout (1769:70231). " +
          "Four variants: full (fills all space), 1280 (centered max-width), " +
          "profile-regular (280px sidebar + content), profile-summary (280px sidebar + content + 500px right panel). " +
          "Page wraps Navbar + Layout into a full-viewport shell.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

// Placeholder slot helper
const Slot = ({ label, height = "100%", bg = "#E7EAF8" }: { label: string; height?: string | number; bg?: string }) => (
  <div style={{
    background: bg,
    borderRadius: 8,
    height,
    minHeight: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Mulish, sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "#0D2976",
    border: "1px dashed #CFDAF7",
  }}>
    {label}
  </div>
);

// ── Full ───────────────────────────────────────────────────────────────────────

export const Full: Story = {
  name: "full — fills all space",
  render: () => (
    <div style={{ height: "100vh" }}>
      <Layout variant="full">
        <Slot label="Main content (fills all available space)" height="100%" />
      </Layout>
    </div>
  ),
};

// ── 1280 ──────────────────────────────────────────────────────────────────────

export const Centered1280: Story = {
  name: "1280 — centered, max 1280px",
  render: () => (
    <div style={{ height: "100vh" }}>
      <Layout variant="1280">
        <Slot label="Main content (max-width 1280px, centered)" height={400} />
      </Layout>
    </div>
  ),
};

// ── Profile regular ────────────────────────────────────────────────────────────

export const ProfileRegular: Story = {
  name: "profile-regular — 280px sidebar + content",
  render: () => (
    <div style={{ height: "100vh" }}>
      <Layout
        variant="profile-regular"
        sidebar={<Slot label="Sidebar (280px)" bg="#CFDAF7" />}
      >
        <Slot label="Main content (fluid)" height="100%" />
      </Layout>
    </div>
  ),
};

// ── Profile summary ────────────────────────────────────────────────────────────

export const ProfileSummary: Story = {
  name: "profile-summary — 280px + content + 500px panel",
  render: () => (
    <div style={{ height: "100vh" }}>
      <Layout
        variant="profile-summary"
        sidebar={<Slot label="Sidebar (280px)" bg="#CFDAF7" />}
        rightPanel={<Slot label="Right panel (500px)" bg="#E7EAF8" />}
      >
        <Slot label="Main content (fluid)" height="100%" />
      </Layout>
    </div>
  ),
};

// ── Page with Navbar ───────────────────────────────────────────────────────────

const MockNavbar = () => (
  <div style={{
    width: 60,
    background: "#0C1457",
    borderRadius: "0 16px 16px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 0 40px",
    gap: 16,
    flexShrink: 0,
  }}>
    {["●", "●", "●", "●", "●"].map((dot, i) => (
      <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: i === 0 ? "white" : "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }} />
    ))}
  </div>
);

export const WithNavbar: Story = {
  name: "Page — full layout with Navbar",
  render: () => (
    <div style={{ height: "100vh" }}>
      <Page navbar={<MockNavbar />} variant="full">
        <Slot label="Page content (full layout)" height="100%" />
      </Page>
    </div>
  ),
};

export const WithNavbar1280: Story = {
  name: "Page — 1280 layout with Navbar",
  render: () => (
    <div style={{ height: "100vh" }}>
      <Page navbar={<MockNavbar />} variant="1280">
        <Slot label="Page content (1280px centered)" height={500} />
      </Page>
    </div>
  ),
};

export const WithNavbarProfileRegular: Story = {
  name: "Page — profile-regular with Navbar",
  render: () => (
    <div style={{ height: "100vh" }}>
      <Page
        navbar={<MockNavbar />}
        variant="profile-regular"
        sidebar={<Slot label="Sidebar (280px)" bg="#CFDAF7" />}
      >
        <Slot label="Main content (fluid)" height="100%" />
      </Page>
    </div>
  ),
};

export const WithNavbarProfileSummary: Story = {
  name: "Page — profile-summary with Navbar",
  render: () => (
    <div style={{ height: "100vh" }}>
      <Page
        navbar={<MockNavbar />}
        variant="profile-summary"
        sidebar={<Slot label="Sidebar (280px)" bg="#CFDAF7" />}
        rightPanel={<Slot label="Right panel (500px)" bg="#E7EAF8" />}
      >
        <Slot label="Main content (fluid)" height="100%" />
      </Page>
    </div>
  ),
};

// ── All variants side-by-side ──────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {[
        { variant: "full" as const, label: "full" },
        { variant: "1280" as const, label: "1280" },
        { variant: "profile-regular" as const, label: "profile-regular" },
        { variant: "profile-summary" as const, label: "profile-summary" },
      ].map(({ variant, label }) => (
        <div key={variant}>
          <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 6, fontWeight: 700 }}>
            {label}
          </p>
          <div style={{ height: 160, border: "1px solid #CFDAF7", borderRadius: 8, overflow: "hidden" }}>
            <Layout
              variant={variant}
              sidebar={<Slot label="Sidebar" bg="#CFDAF7" height="100%" />}
              rightPanel={<Slot label="Right" bg="#E7EAF8" height="100%" />}
            >
              <Slot label="Content" height="100%" />
            </Layout>
          </div>
        </div>
      ))}
    </div>
  ),
};
