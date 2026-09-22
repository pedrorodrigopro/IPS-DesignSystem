import type { Meta, StoryFn } from "@storybook/react";
import { KpiCard } from "./kpi_card";

export default {
  title: "Molecules/KPI Card",
  component: KpiCard,
} satisfies Meta<typeof KpiCard>;

export const Default: StoryFn<typeof KpiCard> = () => (
  <div style={{ display: "flex", gap: "16px" }}>
    <KpiCard label="Compliant" value={24} status="success" statusLabel="On track" />
    <KpiCard label="Exceptions" value={3} status="danger" statusLabel="Needs review" />
    <KpiCard label="Requested" value={8} status="warning" statusLabel="Pending" />
    <KpiCard label="Total" value={35} />
  </div>
);
