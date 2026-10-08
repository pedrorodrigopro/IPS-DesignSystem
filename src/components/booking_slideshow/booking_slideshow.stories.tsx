// BookingSlideshow stories — Figma node 7324:192187 (.Booking component set)
// Storybook category: Molecules/BookingSlideshow

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BookingSlideshow } from "./booking_slideshow";
import type { BookingSlideshowTab } from "./booking_slideshow";

const meta: Meta<typeof BookingSlideshow> = {
  title: "Molecules/BookingSlideshow",
  component: BookingSlideshow,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Full booking card molecule (`Figma: .Booking / 7324:192187`). " +
          "Combines the **CarouselCard** rule navigator with three tabs: " +
          "**Details** (dates, overscheduling, category, title, description), " +
          "**Notes** (add note input + note rows), and " +
          "**History** (simple / single-field / multi-field change items). " +
          "Width: 352px (as per Figma). Background: `#F8F9FD`, border: `1px solid #CFDAF7`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BookingSlideshow>;

// ── Sample data ───────────────────────────────────────────────────────────────

const SAMPLE_RULES = [
  { startDate: "13 Mar 2026", endDate: "17 Mar 2026", value: "100" },
  { startDate: "20 Mar 2026", endDate: "31 Mar 2026", value: "80"  },
];

const SAMPLE_NOTES = [
  { author: "Spencer Harmon", initials: "SH", date: "25-09-2026", text: "Booking confirmed for Q2 engagement." },
  { author: "A. I Poane",     initials: "AP", date: "24-09-2026", text: "Please check availability for week 14." },
];

const SAMPLE_HISTORY = [
  {
    type: "simple" as const,
    actor:    "Spencer Harmon",
    initials: "SH",
    date:     "13 Feb 2026 14:06",
    action:   "Booking confirmed",
  },
  {
    type:     "single" as const,
    actor:    "A. I Poane",
    initials: "AP",
    date:     "14 Feb 2026 10:42",
    field:    "Category",
    from:     "Standard",
    to:       "Holiday",
  },
  {
    type:     "multiple" as const,
    actor:    "Charlie Parker",
    initials: "CP",
    date:     "12 Feb 2026 12:36",
    fields: [
      { name: "Workforce Member", from: "John Smith",  to: "Charlie Parker" },
      { name: "Category",         from: "Standard",    to: "Holiday" },
      { name: "Working days",     from: "Mon–Fri",     to: "Mon–Thu" },
    ],
  },
];

// ── Stories ───────────────────────────────────────────────────────────────────

// Read-only stories (tabs visible, plain KV layout)

export const ReadOnlyDetails: Story = {
  name: "Read-only — Details",
  render: () => {
    const [tab, setTab] = useState<BookingSlideshowTab>("details");
    return (
      <BookingSlideshow
        readOnly
        tab={tab}
        onTabChange={setTab}
        rules={SAMPLE_RULES}
        category="Default"
        categoryColor="#A8C4E0"
        description="description test"
        showVisible
        notesCount={2}
      />
    );
  },
};

export const ReadOnlyNotes: Story = {
  name: "Read-only — Notes",
  render: () => {
    const [tab, setTab] = useState<BookingSlideshowTab>("notes");
    return (
      <BookingSlideshow
        readOnly
        tab={tab}
        onTabChange={setTab}
        rules={SAMPLE_RULES}
        notes={SAMPLE_NOTES}
        notesCount={SAMPLE_NOTES.length}
      />
    );
  },
};

export const ReadOnlyHistory: Story = {
  name: "Read-only — History",
  render: () => {
    const [tab, setTab] = useState<BookingSlideshowTab>("history");
    return (
      <BookingSlideshow
        readOnly
        tab={tab}
        onTabChange={setTab}
        rules={SAMPLE_RULES}
        history={SAMPLE_HISTORY}
        notesCount={2}
      />
    );
  },
};

// Editable stories (no tabs, always shows form fields)

export const EditableDetails: Story = {
  name: "Editable — Details (no tabs)",
  render: () => (
    <BookingSlideshow
      rules={SAMPLE_RULES}
      category="Holiday"
      title="Accessibility consultant"
      description="description test"
      dateCreated="13 Feb 2026"
      showDateCreated
    />
  ),
};

export const EditableWithPhase: Story = {
  name: "Editable — With phase",
  render: () => (
    <BookingSlideshow
      rules={SAMPLE_RULES}
      category="Standard"
      showPhase
      phase="Reading"
      title="Backend developer"
    />
  ),
};

export const Hidden: Story = {
  name: "Hidden (no permission)",
  render: () => (
    <BookingSlideshow
      readOnly
      rules={SAMPLE_RULES}
      hidden
    />
  ),
};

export const MultipleRules: Story = {
  name: "Read-only — Multiple rules",
  render: () => {
    const [tab, setTab] = useState<BookingSlideshowTab>("details");
    return (
      <BookingSlideshow
        readOnly
        tab={tab}
        onTabChange={setTab}
        rules={[
          { startDate: "13 Mar 2026", endDate: "17 Mar 2026", value: "40" },
          { startDate: "20 Mar 2026", endDate: "31 Mar 2026", value: "96" },
          { startDate: "1 Apr 2026",  endDate: "14 Apr 2026", value: "112" },
        ]}
        category="Standard"
        categoryColor="#7EB8D4"
        description="Three-rule repeated booking example."
        showVisible
        notesCount={5}
      />
    );
  },
};
