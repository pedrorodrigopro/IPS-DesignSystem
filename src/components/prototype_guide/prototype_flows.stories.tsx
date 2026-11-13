// PrototypeFlows stories — the flow bar with two flows and a tiny screen that changes with the selected flow.
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PrototypeFlows } from "./prototype_flows";
import { Navbar } from "../navbar/navbar";
import { Page } from "../layout/layout";
import { Header } from "../header/header";
import { Tile } from "../tile/tile";

const meta: Meta = {
  title: "Molecules/PrototypeFlows",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Flow switcher for HTML prototypes that show the same story in more than one way (for example Current and Future). " +
          "The dark bar looks like the PrototypeGuide tour bar but has one button per flow (the selected one is filled) and an optional " +
          "Restart. The prototype below sits in the same stage as in the tour, so Navbar / Layout / SidePanel fill the space under the bar. " +
          "There is no tour; the prototype decides what a flow is and resets itself when the flow changes.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const FLOWS = [{ id: "current", label: "Current" }, { id: "future", label: "Future" }];
const TEXT: Record<string, string> = {
  current: "Current flow: edit the availability rules in Manage roles, then fix the misaligned weeks in the Booking Engine.",
  future: "Future flow: edit the role row and the cells underneath together, in the Booking Engine.",
};

function Demo() {
  const [flow, setFlow] = useState("current");
  const [seq, setSeq] = useState(0);
  return (
    <PrototypeFlows flows={FLOWS} flow={flow} onFlow={f => { setFlow(f); setSeq(n => n + 1); }} onRestart={() => setSeq(n => n + 1)}>
      <div key={`${flow}-${seq}`} style={{ height: "var(--ips-vh, 100vh)", display: "flex", overflow: "hidden" }}>
        <Page navbar={<Navbar activeId="workflow" />} variant="1280">
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
            <Header size="page" title="Workflow" />
            <Tile tileStyle="highlight" padding="content">{TEXT[flow]} (render {seq})</Tile>
          </div>
        </Page>
      </div>
    </PrototypeFlows>
  );
}

export const Default: Story = { name: "Current / Future", render: () => <Demo /> };
