// BookingPill stories — Figma node 39:116612 (.Booking pill component set)
// Source: IPS Screens l3JiE7ZmAsjSZY5Z7yPCOZ

import type { Meta, StoryObj } from "@storybook/react";
import { BookingPill } from "./booking_pill";
import type { BookingPillCategory } from "./booking_pill";

const meta: Meta<typeof BookingPill> = {
  title: "Components/BookingPill",
  component: BookingPill,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/l3JiE7ZmAsjSZY5Z7yPCOZ?node-id=39-116612",
    },
  },
  argTypes: {
    category: {
      control: "select",
      options: [
        "booking-blue", "booking-red", "booking-purple",
        "engagement-booked", "engagement-partial",
        "role-booked", "role-partial",
        "pending", "hidden",
      ],
    },
    size: { control: "select", options: ["regular", "small"] },
  },
};

export default meta;
type Story = StoryObj<typeof BookingPill>;

// ── All categories — Regular size ─────────────────────────────────────────────

const ALL_CATEGORIES: { category: BookingPillCategory; label: string; hours?: string }[] = [
  { category: "booking-blue",       label: "Role 1 - Booking Category", hours: "40h" },
  { category: "booking-red",        label: "Role 1 - Booking Category", hours: "40h" },
  { category: "booking-purple",     label: "Role 1 - Booking Category", hours: "40h" },
  { category: "engagement-booked",  label: "ST engagement test - ST Role#2", hours: "26% (10h)" },
  { category: "engagement-partial", label: "ST engagement test - ST Role#2", hours: "26% (10h)" },
  { category: "role-booked",        label: "ST engagement test", hours: "100% (24h)" },
  { category: "role-partial",       label: "ST engagement test", hours: "42% (10h)" },
  { category: "pending",            label: "Role 1 - Booking Category", hours: "40h" },
  { category: "hidden",             label: "" },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, fontWeight: 700, color: "var(--palette-neutral-3)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>
    {children}
  </span>
);

export const AllCategories: Story = {
  name: "All Categories",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24 }}>
      <div>
        <SectionLabel>Regular — all categories</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ALL_CATEGORIES.map(({ category, label, hours }) => (
            <div key={category} style={{ width: 260 }}>
              <BookingPill category={category} label={label} hours={hours} size="regular" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Small — all categories</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ALL_CATEGORIES.filter(c => c.category !== "hidden").map(({ category, label }) => (
            <div key={category} style={{ width: 200 }}>
              <BookingPill category={category} label={label} size="small" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>With icons — otherBookings + nonDemand</SectionLabel>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 260 }}>
            <BookingPill category="booking-blue" label="With other bookings" hours="40h" otherBookings />
          </div>
          <div style={{ width: 260 }}>
            <BookingPill category="booking-blue" label="Non-demand booking" hours="40h" nonDemand />
          </div>
          <div style={{ width: 260 }}>
            <BookingPill category="booking-blue" label="Both icons" hours="40h" otherBookings nonDemand />
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>Pending — dashed border</SectionLabel>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 260 }}>
            <BookingPill category="pending" label="Pending booking" hours="40h" size="regular" />
          </div>
          <div style={{ width: 200 }}>
            <BookingPill category="pending" label="Pending" size="small" />
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>In Gantt context (narrow widths)</SectionLabel>
        <div style={{ display: "flex", gap: 4, background: "var(--palette-neutral-2)", padding: 8 }}>
          <BookingPill category="engagement-booked"  label="ST engagement test - ST Role#2" hours="26% (10h)" size="regular" />
          <BookingPill category="role-booked"         label="ST engage..." hours="100% (16h)" size="regular" />
          <BookingPill category="booking-blue"        label="Role booking" hours="8h" size="regular" />
          <BookingPill category="role-partial"        label="Partial" hours="42% (10h)" size="regular" />
        </div>
      </div>
    </div>
  ),
};

export const Default: Story = {
  args: {
    category: "booking-blue",
    label: "Role 1 - Booking Category",
    hours: "40h",
    size: "regular",
  },
};
