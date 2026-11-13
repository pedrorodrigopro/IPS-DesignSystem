// SearchFilter stories — the toolbar row above lists / tables
// Storybook category: Molecules/SearchFilter
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchFilter } from "./search_filter";
import type { AppliedFilter } from "../filters_applied/filters_applied";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import { InputSelect } from "../input/input";

const meta: Meta<typeof SearchFilter> = {
  title: "Molecules/SearchFilter",
  component: SearchFilter,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The toolbar row above every list or table: search box, optional `leading` (sort dropdown) and `count`, applied filters, and the screen's own `actions` at the end. " +
          "**Applied filters (FiltersApplied) always sit right next to the search box, in this same row, never in a row of their own.** " +
          "The filters area renders nothing until `filters` has entries, so the row looks the same with and without filters. " +
          "Every screen has different buttons at the end of the row: pass them as `actions`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchFilter>;

const sampleFilters: AppliedFilter[] = [
  { id: "1", field: "Workforce Member", value: "Charlie Parker" },
  { id: "2", field: "State",            value: "Shortlisting" },
];

const manyFilters: AppliedFilter[] = [
  { id: "1", field: "Workforce Member", value: "Charlie Parker" },
  { id: "2", field: "State",            value: "Shortlisting" },
  { id: "3", field: "Location",         value: "London" },
  { id: "4", field: "Business unit",    value: "Executive" },
  { id: "5", field: "Role",             value: "Senior Auditor" },
  { id: "6", field: "Engagement ID",    value: "2 selected" },
  { id: "7", field: "Assignee",         value: "Myself" },
  { id: "8", field: "Start date",       value: "01-10-2026" },
];

const FilterButton = ({ applied = false }: { applied?: boolean }) => <Button kind="icon" size="regular" title="Filter"><Icon name={applied ? "filter-applied" : "filter"} size={16} /></Button>;

/** Search + count + filter button; no filters applied: the row has no filters area */
export const Default: Story = {
  name: "No filters applied",
  render: () => {
    const [search, setSearch] = useState("");
    return <SearchFilter search={search} onSearchChange={setSearch} count="101 engagements" actions={<FilterButton />} />;
  },
};

/** Filters applied: they appear right after the search box (and count); Clear all and the pills' crosses work */
export const WithFilters: Story = {
  name: "Filters applied",
  render: () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<AppliedFilter[]>(sampleFilters);
    return (
      <SearchFilter
        search={search} onSearchChange={setSearch} count={`${filters.length ? 2 : 101} engagements`}
        filters={filters} onRemoveFilter={id => setFilters(f => f.filter(x => x.id !== id))} onClearFilters={() => setFilters([])}
        actions={<FilterButton applied={filters.length > 0} />}
      />
    );
  },
};

/** Profiles directory pattern: sort dropdown (`leading`) and count after the search box */
export const SortAndCount: Story = {
  name: "Sort + count (Profiles directory)",
  render: () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<AppliedFilter[]>(sampleFilters);
    return (
      <SearchFilter
        search={search} onSearchChange={setSearch}
        leading={<span style={{ display: "inline-block", width: "max-content" }}><InputSelect value="By name" /></span>}
        count="2 profiles"
        filters={filters} onRemoveFilter={id => setFilters(f => f.filter(x => x.id !== id))} onClearFilters={() => setFilters([])}
        actions={<><Button kind="icon" size="regular" title="Cards view"><Icon name="table" size={16} /></Button><Button kind="icon" size="regular" title="Table view"><Icon name="list" size={16} /></Button></>}
      />
    );
  },
};

/** Many filters: the pills wrap onto more lines and the row grows; the actions stay at the end */
export const ManyFilters: Story = {
  name: "Many filters (wrap)",
  render: () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<AppliedFilter[]>(manyFilters);
    return (
      <div style={{ maxWidth: 1000 }}>
        <SearchFilter
          search={search} onSearchChange={setSearch} count="8 roles"
          filters={filters} onRemoveFilter={id => setFilters(f => f.filter(x => x.id !== id))} onClearFilters={() => setFilters([])}
          actions={<FilterButton applied={filters.length > 0} />}
        />
      </div>
    );
  },
};

/** The same row with the end-of-row buttons of three screens: the buttons differ per screen, everything else is shared */
export const ActionsPerScreen: Story = {
  name: "Actions per screen",
  render: () => {
    const [search, setSearch] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <SearchFilter search={search} onSearchChange={setSearch} count="101 engagements"
          actions={<><Button kind="icon" size="regular" title="Filter"><Icon name="filter" size={16} /></Button><Button kind="icon" size="regular" title="Table"><Icon name="table" size={16} /></Button></>} />
        <SearchFilter search={search} onSearchChange={setSearch} count="8 Roles in 7 Engagements"
          actions={<><Button kind="icon" size="regular" title="Filter"><Icon name="filter" size={16} /></Button><Button kind="icon" size="regular" title="Bulk select"><Icon name="bulk" size={16} /></Button><Button kind="icon" size="regular" title="Grid view"><Icon name="table" size={16} /></Button></>} />
        <SearchFilter search={search} onSearchChange={setSearch} count="12 in total" />
      </div>
    );
  },
};
