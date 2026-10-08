// SmartAllocateSidePanel stories — Figma node 10998:112651

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { SmartAllocateSidePanel } from "./smart_allocate_side_panel";
import { Navbar }                 from "../navbar/navbar";

const SAMPLE_DATA = {
  roleCount:       2,
  vacancyCount:    3,
  engagementCount: 2,
  engagements: [
    {
      id: "eng-1",
      name: "[2025Q3] Front end team",
      roles: [
        {
          id:                  "role-1",
          roleName:            "Junior Javascript developer",
          wfState:             "shortlisting" as const,
          lastUpdated:         "Last updated 20 minutes ago",
          lastUpdatedWarning:  false,
          vacancies: [
            {
              type:        "staffed" as const,
              id:          "v-1",
              wmName:      "Ryan Curtis",
              wmInitials:  "RC",
              grade:       "B",
              gradeMatch:  true,
              cost:        "£0.3m",
              matchPct:    90,
              availPct:    92,
              wfState:     "in-review" as const,
            },
            {
              type: "empty" as const,
              id:   "v-2",
            },
          ],
        },
      ],
    },
    {
      id: "eng-2",
      name: "[2025Q3] Accessibility consultancy",
      roles: [
        {
          id:                  "role-2",
          roleName:            "Junior Javascript developer",
          wfState:             "shortlisting" as const,
          lastUpdated:         "Last updated 32 hours ago",
          lastUpdatedWarning:  true,
          vacancies: [
            {
              type:        "staffed" as const,
              id:          "v-3",
              wmName:      "Haylie Korsgaard",
              wmInitials:  "HK",
              grade:       "B",
              gradeMatch:  true,
              cost:        "£0.4m",
              matchPct:    90,
              availPct:    92,
              wfState:     "invited" as const,
            },
          ],
        },
      ],
    },
  ],
};

function Wrapper({ data, showAlert }: { data: typeof SAMPLE_DATA; showAlert?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="workflow" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Smart allocate side panel
        </p>
      </div>
      <SmartAllocateSidePanel
        open={open}
        onClose={() => setOpen(false)}
        data={{ ...data, showAlert, onCancel: () => setOpen(false) }}
      />
    </div>
  );
}

const meta: Meta = {
  title: "Side Panels/Smart Allocate",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Smart Allocate Side Panel — Figma node 10998:112651. Width: 900px. " +
          "Groups roles by engagement (Accordion). Each role shows a table of vacancies: " +
          "staffed rows (WM avatar + grade + match% + avail% + WF state) and " +
          "empty rows (WM select + Matches|Shortlist|Named resource toggle). " +
          "Last-updated label goes red when > 24h. Sticky Cancel + Fill & Book (N).",
      },
    },
  },
};

export default meta;

export const Default: StoryFn    = () => <Wrapper data={SAMPLE_DATA} />;
export const WithAlert: StoryFn  = () => <Wrapper data={SAMPLE_DATA} showAlert />;
export const AllEmpty: StoryFn   = () => (
  <Wrapper data={{
    ...SAMPLE_DATA,
    engagements: SAMPLE_DATA.engagements.map(e => ({
      ...e,
      roles: e.roles.map(r => ({
        ...r,
        vacancies: r.vacancies.map(v => ({ type: "empty" as const, id: v.id })),
      })),
    })),
  }} />
);
