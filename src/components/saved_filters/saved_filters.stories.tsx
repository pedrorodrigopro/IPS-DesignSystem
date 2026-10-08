// SavedFilters stories — Figma node 6792:167638
// Storybook category: Molecules/SavedFilters
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SavedFilters } from "./saved_filters";
import type { SavedFilter } from "./saved_filters";

const meta: Meta<typeof SavedFilters> = {
  title: "Molecules/SavedFilters",
  component: SavedFilters,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Accordion-driven saved filter pill bar (Figma node 6792:167638). " +
          "Header shows the count and a chevron toggle. " +
          "Expanded: wrap row of pills — each with remove + label + share. " +
          "Collapsed: pills hidden. Border-bottom separates from content below.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SavedFilters>;

const tenFilters: SavedFilter[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  label: `Filter ${i + 1}`,
}));

// ── Expanded (as in Figma) ─────────────────────────────────────────────────────

export const Expanded: Story = {
  name: "Expanded — 10 filters (as in Figma)",
  render: () => {
    const [filters, setFilters] = useState<SavedFilter[]>(tenFilters);
    return (
      <SavedFilters
        filters={filters}
        defaultExpanded
        onRemove={(id) => setFilters((prev) => prev.filter((f) => f.id !== id))}
        onShare={(id) => alert(`Share filter ${id}`)}
      />
    );
  },
};

// ── Collapsed ──────────────────────────────────────────────────────────────────

export const Collapsed: Story = {
  name: "Collapsed",
  render: () => (
    <SavedFilters
      filters={tenFilters}
      defaultExpanded={false}
    />
  ),
};

// ── Interactive toggle ─────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: "Interactive (add/remove/share)",
  render: () => {
    const [filters, setFilters] = useState<SavedFilter[]>([
      { id: "1", label: "Q1 2024 - EMEA" },
      { id: "2", label: "Senior Profiles" },
      { id: "3", label: "Available Now" },
      { id: "4", label: "London Office" },
      { id: "5", label: "Shortlisted" },
    ]);
    const [expanded, setExpanded] = useState(true);

    const addFilter = () => {
      const id = String(Date.now());
      setFilters((prev) => [...prev, { id, label: `Filter ${prev.length + 1}` }]);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <SavedFilters
          filters={filters}
          expanded={expanded}
          onExpandedChange={setExpanded}
          onRemove={(id) => setFilters((prev) => prev.filter((f) => f.id !== id))}
          onShare={(id) => alert(`Sharing filter: ${filters.find((f) => f.id === id)?.label}`)}
        />
        <button
          style={{
            alignSelf: "flex-start",
            padding: "5px 12px",
            borderRadius: 4,
            border: "1px solid #CFDAF7",
            background: "#fff",
            fontFamily: "Mulish, sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#0C1457",
            cursor: "pointer",
          }}
          onClick={addFilter}
        >
          + Add filter
        </button>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", margin: 0 }}>
          {filters.length} filter{filters.length !== 1 ? "s" : ""} · {expanded ? "expanded" : "collapsed"}
        </p>
      </div>
    );
  },
};

// ── Few filters ────────────────────────────────────────────────────────────────

export const FewFilters: Story = {
  name: "Few filters (3)",
  render: () => (
    <SavedFilters
      filters={[
        { id: "a", label: "Q1 2024 - EMEA" },
        { id: "b", label: "Senior Profiles" },
        { id: "c", label: "Available Now" },
      ]}
      defaultExpanded
      onRemove={(id) => alert(`Remove ${id}`)}
      onShare={(id) => alert(`Share ${id}`)}
    />
  ),
};

// ── Single filter ──────────────────────────────────────────────────────────────

export const SingleFilter: Story = {
  name: "Single filter",
  render: () => (
    <SavedFilters
      filters={[{ id: "x", label: "My Saved Search" }]}
      defaultExpanded
      onRemove={() => {}}
      onShare={() => {}}
    />
  ),
};

// ── No share handler ───────────────────────────────────────────────────────────

export const NoShare: Story = {
  name: "Without share button",
  render: () => (
    <SavedFilters
      filters={tenFilters.slice(0, 5)}
      defaultExpanded
      onRemove={(id) => alert(`Remove ${id}`)}
    />
  ),
};

// ── Custom title ───────────────────────────────────────────────────────────────

export const CustomTitle: Story = {
  name: "Custom header title",
  render: () => (
    <SavedFilters
      filters={tenFilters.slice(0, 4)}
      title="Recent searches"
      defaultExpanded
      onRemove={() => {}}
    />
  ),
};
