// FiltersApplied stories — Figma node 6848:115955
// Storybook category: Molecules/FiltersApplied
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FiltersApplied } from "./filters_applied";
import type { AppliedFilter } from "./filters_applied";

const meta: Meta<typeof FiltersApplied> = {
  title: "Molecules/FiltersApplied",
  component: FiltersApplied,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Applied filter bar (Figma node 6848:115955). " +
          "Applied=False (empty filters array): renders nothing. " +
          "Applied=True: shows 'Filters' label + 'Clear all' link + removable filter pills. " +
          "Each pill has a field name (10px) stacked above a bold value (12px), with a cross to remove.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FiltersApplied>;

const sampleFilters: AppliedFilter[] = [
  { id: "1", field: "Workforce Member", value: "Charlie Parker" },
  { id: "2", field: "Status",           value: "Shortlisting" },
  { id: "3", field: "Location",         value: "London" },
];

// ── Applied=True (as in Figma) ─────────────────────────────────────────────────

export const Applied: Story = {
  name: "Applied=True (as in Figma)",
  render: () => {
    const [filters, setFilters] = useState<AppliedFilter[]>(sampleFilters);
    return (
      <FiltersApplied
        filters={filters}
        onRemove={(id) => setFilters((prev) => prev.filter((f) => f.id !== id))}
        onClearAll={() => setFilters([])}
      />
    );
  },
};

// ── Applied=False ──────────────────────────────────────────────────────────────

export const Empty: Story = {
  name: "Applied=False (renders nothing)",
  render: () => (
    <div>
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E", marginBottom: 8 }}>
        FiltersApplied with empty array → renders null:
      </p>
      <div style={{ border: "1px dashed #CFDAF7", padding: 8, borderRadius: 4 }}>
        <FiltersApplied filters={[]} />
        <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1" }}>
          (nothing rendered here)
        </span>
      </div>
    </div>
  ),
};

// ── Single filter ──────────────────────────────────────────────────────────────

export const SingleFilter: Story = {
  name: "Single filter",
  render: () => {
    const [filters, setFilters] = useState<AppliedFilter[]>([
      { id: "1", field: "Workforce Member", value: "Charlie Parker" },
    ]);
    return (
      <FiltersApplied
        filters={filters}
        onRemove={(id) => setFilters((prev) => prev.filter((f) => f.id !== id))}
        onClearAll={() => setFilters([])}
      />
    );
  },
};

// ── Many filters (wrapping) ────────────────────────────────────────────────────

export const ManyFilters: Story = {
  name: "Many filters (wrap)",
  render: () => {
    const many: AppliedFilter[] = [
      { id: "1", field: "Workforce Member", value: "Charlie Parker" },
      { id: "2", field: "Status",           value: "Shortlisting" },
      { id: "3", field: "Location",         value: "London" },
      { id: "4", field: "Role",             value: "Senior Developer" },
      { id: "5", field: "Start date",       value: "01 Jan 2024" },
      { id: "6", field: "End date",         value: "31 Dec 2024" },
    ];
    const [filters, setFilters] = useState(many);
    return (
      <div style={{ maxWidth: 700 }}>
        <FiltersApplied
          filters={filters}
          onRemove={(id) => setFilters((prev) => prev.filter((f) => f.id !== id))}
          onClearAll={() => setFilters([])}
        />
      </div>
    );
  },
};

// ── Without clear all ──────────────────────────────────────────────────────────

export const NoClearAll: Story = {
  name: "Without 'Clear all' button",
  render: () => (
    <FiltersApplied
      filters={sampleFilters}
      onRemove={() => {}}
    />
  ),
};

// ── Without remove ─────────────────────────────────────────────────────────────

export const NoRemove: Story = {
  name: "Read-only (no remove, no clear all)",
  render: () => (
    <FiltersApplied
      filters={sampleFilters}
    />
  ),
};

// ── Custom label ───────────────────────────────────────────────────────────────

export const CustomLabel: Story = {
  name: "Custom label",
  render: () => (
    <FiltersApplied
      filters={sampleFilters}
      label="Active filters"
      onRemove={() => {}}
      onClearAll={() => {}}
    />
  ),
};

// ── Becomes empty after removal ────────────────────────────────────────────────

export const DisappearsWhenEmpty: Story = {
  name: "Disappears when all removed",
  render: () => {
    const [filters, setFilters] = useState<AppliedFilter[]>(sampleFilters);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <FiltersApplied
          filters={filters}
          onRemove={(id) => setFilters((prev) => prev.filter((f) => f.id !== id))}
          onClearAll={() => setFilters([])}
        />
        {filters.length === 0 && (
          <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#8F9ED1" }}>
            All filters cleared — component is not rendered.
          </p>
        )}
      </div>
    );
  },
};
