// MisalignmentSidePanel stories — Figma node 6958:182317 (Sidepanel/BM/Misalignments)

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { MisalignmentSidePanel } from "./misalignment_side_panel";
import { Navbar }                from "../navbar/navbar";

const SAMPLE_DATA = {
  roleName:       "Javascript developer",
  wmFilterValue:  "All (2 vacancies)",
  sortValue:      "Latest",
  ranges: [
    {
      id:        "1",
      dateRange: "13 Mar 2026 - 17 Mar 2026",
      subtitle:  "Duration, start date, end date",
      items: [
        { fieldName: "Duration",   expected: "40h",          current: "16h"          },
        { fieldName: "Start date", expected: "13 Mar 2026",  current: "15 Mar 2026"  },
        { fieldName: "End date",   expected: "17 Mar 2026",  current: "16 Mar 2026"  },
      ],
    },
    {
      id:        "2",
      dateRange: "20 Mar 2026 - 24 Mar 2026",
      subtitle:  "Duration, start date, end date",
      items: [
        { fieldName: "Duration",   expected: "40h",          current: "24h"          },
        { fieldName: "Start date", expected: "20 Mar 2026",  current: "21 Mar 2026"  },
        { fieldName: "End date",   expected: "24 Mar 2026",  current: "23 Mar 2026"  },
      ],
    },
    {
      id:        "3",
      dateRange: "27 Mar 2026 - 31 Mar 2026",
      subtitle:  "Duration",
      items: [
        { fieldName: "Duration",   expected: "40h",          current: "32h"          },
      ],
    },
    {
      id:        "4",
      dateRange: "03 Apr 2026 - 07 Apr 2026",
      subtitle:  "Start date, end date",
      items: [
        { fieldName: "Start date", expected: "03 Apr 2026",  current: "04 Apr 2026"  },
        { fieldName: "End date",   expected: "07 Apr 2026",  current: "06 Apr 2026"  },
      ],
    },
    {
      id:        "5",
      dateRange: "10 Apr 2026 - 14 Apr 2026",
      subtitle:  "Duration",
      items: [
        { fieldName: "Duration",   expected: "40h",          current: "8h"           },
      ],
    },
  ],
};

function PanelWrapper({ data }: { data: typeof SAMPLE_DATA }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="booking" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Misalignments side panel
        </p>
      </div>
      <MisalignmentSidePanel
        open={open}
        onClose={() => setOpen(false)}
        data={data}
      />
    </div>
  );
}

const meta: Meta = {
  title: "Side Panels/Misalignments",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Misalignments Side Panel — Figma node 6958:182317. Width: 400px. View-only. " +
          "Shows booking misalignments for a role — each tile is collapsible and lists " +
          "the mismatched fields (Duration, Start date, End date) with Expected vs Current values.",
      },
    },
  },
};

export default meta;

export const Default: StoryFn     = () => <PanelWrapper data={SAMPLE_DATA} />;
export const SingleRange: StoryFn = () => (
  <PanelWrapper data={{ ...SAMPLE_DATA, ranges: [SAMPLE_DATA.ranges[0]] }} />
);
