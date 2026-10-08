// BookingCell stories — Figma node 2001:502059 (Input week with category 2)

import type { Meta, StoryFn } from "@storybook/react";
import { BookingCell } from "./booking_cell";

export default {
  title: "Components/BookingCell",
  component: BookingCell,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/cGiQ5fBm2a4UqHye7JmeoB?node-id=2001-502059",
    },
  },
} satisfies Meta<typeof BookingCell>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 0, alignItems: "stretch", border: "1px solid var(--palette-neutral-0)", width: "fit-content" }}>
    {children}
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, fontWeight: 700, color: "var(--palette-blue-2)", textTransform: "uppercase", marginBottom: 8 }}>{children}</div>
);

export const AllStates: StoryFn = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24 }}>

    <div>
      <Label>Default — all categories</Label>
      <Row>
        <BookingCell value={10} category="empty"  />
        <BookingCell value={10} category="blue"   />
        <BookingCell value={20} category="red"    />
        <BookingCell value={40} category="purple" />
        <BookingCell value={0}  category="empty"  />
      </Row>
    </div>

    <div>
      <Label>Read-only (engagement aggregate row)</Label>
      <Row>
        <BookingCell value={10} readOnly />
        <BookingCell value={10} readOnly />
        <BookingCell value={10} readOnly />
        <BookingCell value={0}  readOnly />
        <BookingCell value={20} readOnly />
      </Row>
    </div>

    <div>
      <Label>With deadline marker (red line at bottom)</Label>
      <Row>
        <BookingCell value={10} category="blue" />
        <BookingCell value={10} category="blue" />
        <BookingCell value={10} category="blue" deadline />
        <BookingCell value={10} category="blue" />
        <BookingCell value={10} category="blue" />
      </Row>
    </div>

    <div>
      <Label>In grid context — engagement row + role rows + profile rows</Label>
      <div style={{ display: "inline-block" }}>
        {/* Engagement aggregate — read only */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--palette-neutral-0)" }}>
          {[10,10,10,10,10,10,10,10,10,10].map((v, i) => (
            <BookingCell key={i} value={v} readOnly />
          ))}
        </div>
        {/* Role row — editable */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--palette-neutral-0)" }}>
          {[10,10,10,10,10,10,10,10,10,10].map((v, i) => (
            <BookingCell key={i} value={v} category="empty" />
          ))}
        </div>
        {/* Profile booking row — editable with category dots */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--palette-neutral-0)" }}>
          {[20,0,40,0,0,0,10,0,0,20].map((v, i) => (
            <BookingCell key={i} value={v} category="blue" />
          ))}
        </div>
      </div>
    </div>

  </div>
);

export const Default = {
  args: { value: 10, category: "blue", readOnly: false, deadline: false },
};
