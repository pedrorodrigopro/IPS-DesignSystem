// Table stories — Figma nodes:
//   Standard: 5797:225575
//   Compact:  6207:127526
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Table } from "./table";
import type { TableColumn, TableRow, WMCellValue } from "./table";
import { PillWFState } from "../pill/pill";
import type { WFState } from "../pill/pill";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Data table with Standard (56px rows, checkbox column) and Compact (40px rows) sizes. " +
          "Supports sortable headers, row selection, and cell types: text-primary, text-regular, pill (WF State), wm, number, percentage, button, icon. " +
          "The last sticky column pins to the right and a gradient appears when the table overflows horizontally.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// ── Sample data ────────────────────────────────────────────────────────────────

type SampleRow = TableRow & {
  id: number;
  name: string;
  status: WFState;
  secondaryText: string;
  wm: WMCellValue;
  number: string;
  percentage: string;
};

const sampleRows: SampleRow[] = [
  {
    id: 1,
    name: "Alpha Project",
    status: "shortlisting",
    secondaryText: "Secondary text",
    wm: { name: "Charlie Parker", initials: "CP" },
    number: "12389293",
    percentage: "100",
  },
  {
    id: 2,
    name: "Beta Initiative",
    status: "in-review",
    secondaryText: "Secondary text",
    wm: { name: "Jane Smith", initials: "JS" },
    number: "98765432",
    percentage: "75",
  },
  {
    id: 3,
    name: "Gamma Phase",
    status: "confirmed",
    secondaryText: "Secondary text long example that may wrap across multiple lines",
    wm: { name: "Robert Chen", initials: "RC" },
    number: "11223344",
    percentage: "50",
  },
  {
    id: 4,
    name: "Delta Stream",
    status: "not-filled",
    secondaryText: "Secondary text",
    wm: { name: "Amara Nwosu", initials: "AN" },
    number: "55667788",
    percentage: "90",
  },
];

// ── Standard columns ───────────────────────────────────────────────────────────

const standardColumns: TableColumn<SampleRow>[] = [
  {
    key: "name",
    header: "Name",
    type: "text-primary",
    sortable: true,
    width: "180px",
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    width: "150px",
    renderCell: (row) => <PillWFState state={row.status} size="small" />,
  },
  {
    key: "secondaryText",
    header: "Secondary",
    type: "text-regular",
    sortable: false,
    width: "200px",
  },
  {
    key: "wm",
    header: "Workforce Member",
    type: "wm",
    sortable: false,
    width: "200px",
  },
  {
    key: "number",
    header: "Number",
    type: "number",
    sortable: true,
    align: "right",
    width: "120px",
  },
  {
    key: "percentage",
    header: "Completion",
    type: "percentage",
    sortable: true,
    align: "right",
    width: "100px",
  },
  {
    key: "actions",
    header: "Actions",
    type: "button",
    sortable: false,
    width: "220px",
    buttonLabels: ["View", "Edit", "Remove"],
    onButtonClick: (label, row) => alert(`${label}: ${row.name}`),
  },
  {
    key: "menu",
    header: "",
    type: "icon",
    iconName: "menu-vertical",
    width: "48px",
    sticky: true,
    onButtonClick: (_, row) => alert(`Menu: ${row.name}`),
  },
];

// ── Standard (with selection + sort) ──────────────────────────────────────────

export const Standard: Story = {
  render: () => {
    const [sortKey, setSortKey] = useState<string | undefined>();
    const [sortDir, setSortDir] = useState<"asc" | "desc" | "none">("none");

    return (
      <div style={{ padding: 24 }}>
        <Table
          columns={standardColumns}
          rows={sampleRows}
          compact={false}
          selectable={true}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => {
            setSortKey(key);
            setSortDir(dir);
          }}
        />
      </div>
    );
  },
};

// ── Standard — constrained width to demonstrate sticky + gradient ──────────────

export const StandardScrollable: Story = {
  name: "Standard (scrollable — sticky + gradient)",
  render: () => {
    const [sortKey, setSortKey] = useState<string | undefined>();
    const [sortDir, setSortDir] = useState<"asc" | "desc" | "none">("none");

    return (
      <div style={{ padding: 24, maxWidth: 640 }}>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E", marginBottom: 12 }}>
          Container constrained to 640px — scroll horizontally to see sticky column + gradient.
        </p>
        <Table
          columns={standardColumns}
          rows={sampleRows}
          compact={false}
          selectable={true}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => {
            setSortKey(key);
            setSortDir(dir);
          }}
        />
      </div>
    );
  },
};

// ── Compact ────────────────────────────────────────────────────────────────────

const compactColumns: TableColumn<SampleRow>[] = [
  {
    key: "name",
    header: "Name",
    type: "text-primary",
    sortable: true,
    width: "180px",
  },
  {
    key: "status",
    header: "Status",
    width: "150px",
    renderCell: (row) => <PillWFState state={row.status} size="small" />,
  },
  {
    key: "secondaryText",
    header: "Secondary",
    type: "text-regular",
    width: "200px",
  },
  {
    key: "wm",
    header: "Workforce Member",
    type: "wm",
    width: "200px",
  },
  {
    key: "number",
    header: "Number",
    type: "number",
    sortable: true,
    align: "right",
    width: "120px",
  },
  {
    key: "percentage",
    header: "Completion",
    type: "percentage",
    sortable: true,
    align: "right",
    width: "100px",
  },
  {
    key: "actions",
    header: "Actions",
    type: "button",
    width: "160px",
    buttonLabels: ["View", "Edit"],
    onButtonClick: (label, row) => alert(`${label}: ${row.name}`),
  },
  {
    key: "menu",
    header: "",
    type: "icon",
    iconName: "menu-vertical",
    width: "48px",
    sticky: true,
    onButtonClick: (_, row) => alert(`Menu: ${row.name}`),
  },
];

export const Compact: Story = {
  render: () => {
    const [sortKey, setSortKey] = useState<string | undefined>();
    const [sortDir, setSortDir] = useState<"asc" | "desc" | "none">("none");

    return (
      <div style={{ padding: 24 }}>
        <Table
          columns={compactColumns}
          rows={sampleRows}
          compact={true}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => {
            setSortKey(key);
            setSortDir(dir);
          }}
        />
      </div>
    );
  },
};

// ── Compact — constrained width ────────────────────────────────────────────────

export const CompactScrollable: Story = {
  name: "Compact (scrollable — sticky + gradient)",
  render: () => {
    const [sortKey, setSortKey] = useState<string | undefined>();
    const [sortDir, setSortDir] = useState<"asc" | "desc" | "none">("none");

    return (
      <div style={{ padding: 24, maxWidth: 500 }}>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E", marginBottom: 12 }}>
          Container constrained to 500px — scroll horizontally.
        </p>
        <Table
          columns={compactColumns}
          rows={sampleRows}
          compact={true}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => {
            setSortKey(key);
            setSortDir(dir);
          }}
        />
      </div>
    );
  },
};

// ── All Cell Types ─────────────────────────────────────────────────────────────

type AllCellRow = TableRow & {
  id: number;
  textPrimary: string;
  textRegular: string;
  status: WFState;
  wm: WMCellValue;
  number: string;
  percentage: string;
};

const allCellRows: AllCellRow[] = [
  {
    id: 1,
    textPrimary: "Primary bold text",
    textRegular: "Regular secondary text",
    status: "shortlisting",
    wm: { name: "Charlie Parker", initials: "CP" },
    number: "12389293",
    percentage: "87",
  },
];

const allCellColumns: TableColumn<AllCellRow>[] = [
  { key: "textPrimary", header: "Text Primary",  type: "text-primary" },
  { key: "textRegular", header: "Text Regular",  type: "text-regular" },
  {
    key: "status",
    header: "Pill (WF State)",
    renderCell: (row) => <PillWFState state={row.status} size="small" />,
  },
  { key: "wm",          header: "WM",            type: "wm",         width: "200px" },
  { key: "number",      header: "Number",         type: "number",     align: "right" },
  { key: "percentage",  header: "Percentage",     type: "percentage", align: "right" },
  {
    key: "button",
    header: "Button",
    type: "button",
    buttonLabels: ["Label", "Label", "Label"],
    onButtonClick: (label) => alert(label),
    width: "220px",
  },
  {
    key: "icon",
    header: "",
    type: "icon",
    iconName: "menu-vertical",
    width: "48px",
    sticky: true,
    onButtonClick: () => alert("icon clicked"),
  },
];

export const AllCellTypes: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ fontFamily: "Mulish, sans-serif", marginBottom: 16, color: "#0C1457", fontWeight: 700 }}>
        All Cell Types
      </h3>
      <Table
        columns={allCellColumns}
        rows={allCellRows}
        compact={false}
        selectable={true}
      />
    </div>
  ),
};
