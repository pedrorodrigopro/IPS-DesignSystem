import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./pagination";

export default {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=14220-3895",
    },
    layout: "centered",
  },
  argTypes: {
    size: { control: "select", options: ["regular", "small"] },
  },
} satisfies Meta<typeof Pagination>;

// ── Regular (big) — matches Figma Regular=True ────────────────────────────────

export const Regular: StoryFn<typeof Pagination> = () => {
  const [page, setPage] = useState(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
      <Pagination size="regular" total={10} current={page} onChange={setPage} />
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E" }}>
        Page {page} of 10
      </span>
    </div>
  );
};

// ── Small — matches Figma Regular=False ───────────────────────────────────────

export const Small: StoryFn<typeof Pagination> = () => {
  const [page, setPage] = useState(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
      <Pagination size="small" total={10} current={page} onChange={setPage} />
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E" }}>
        Page {page} of 10
      </span>
    </div>
  );
};

// ── Both sizes side by side ───────────────────────────────────────────────────

export const BothSizes: StoryFn<typeof Pagination> = () => {
  const [page, setPage] = useState(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center", padding: 24 }}>
      <div>
        <Label>Regular (big) — padding 8px 12px</Label>
        <Pagination size="regular" total={10} current={page} onChange={setPage} />
      </div>
      <div>
        <Label>Small — padding 0 12px</Label>
        <Pagination size="small" total={10} current={page} onChange={setPage} />
      </div>
    </div>
  );
};

// ── Mid-range active page ─────────────────────────────────────────────────────

export const MidPage: StoryFn<typeof Pagination> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
    <Pagination size="regular" total={10} current={5} onChange={() => {}} />
    <Pagination size="small"   total={10} current={5} onChange={() => {}} />
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
    {children}
  </div>
);

export const Default: StoryFn<typeof Pagination> = (args) => <Pagination {...args} />;
Default.args = { size: "regular", total: 10, current: 1 };
