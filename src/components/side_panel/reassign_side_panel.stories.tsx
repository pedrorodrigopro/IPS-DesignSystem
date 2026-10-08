// ReassignSidePanel stories — Figma node 11416:198965 (Sidepanel/Reassign booking)

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { ReassignSidePanel } from "./reassign_side_panel";
import type { ReassignVariant } from "./reassign_side_panel";
import { Navbar } from "../navbar/navbar";

const MATCH_CANDIDATES = [
  { id: "1", name: "Stan Michaels",    initials: "SM", email: "stan.michaels@profinda.com",    grade: "B", match: 75, avail: 95 },
  { id: "2", name: "Monique Sanders",  initials: "MS", email: "monique.sanders@profinda.com",  grade: "A", match: 88, avail: 80 },
  { id: "3", name: "Oliver Prentice",  initials: "OP", email: "oliver.prentice@profinda.com",  grade: "B", match: 62, avail: 100 },
  { id: "4", name: "Fatima Al-Rashid", initials: "FA", email: "fatima.alrashid@profinda.com",  grade: "C", match: 54, avail: 60 },
  { id: "5", name: "James Okonkwo",    initials: "JO", email: "james.okonkwo@profinda.com",    grade: "A", match: 91, avail: 75 },
];

const OTHER_CANDIDATES = [
  { id: "1", name: "Albert Pierce",  initials: "AP", email: "albert.pierce@profinda.com"  },
  { id: "2", name: "Aubrey Lee",     initials: "AL", email: "aubrey.lee@profinda.com"     },
  { id: "3", name: "Brett Coleen",   initials: "BC", email: "bret.coleen@profinda.com"    },
  { id: "4", name: "Becca Kassidy",  initials: "BK", email: "becca.kassidy@profinda.com"  },
  { id: "5", name: "Charles Leigh",  initials: "CL", email: "charles.leigh@profinda.com"  },
  { id: "6", name: "Colette Smith",  initials: "CS", email: "colette.smith@profinda.com"  },
  { id: "7", name: "Daniel Stuart",  initials: "DS", email: "daniel.stuart@profinda.com"  },
  { id: "8", name: "David Martin",   initials: "DM", email: "david.martin@profinda.com"   },
];

const BASE_DATA = {
  roleTitle:          "Javascript developer",
  fromName:           "Charlie Parker",
  thisBookingDate:    "20 Mar 2026 - 23 Mar 2026",
  futureBookingDate:  "20 Mar 2026 to 07 Apr 2026",
  allBookingsCount:   4,
  allBookingsDate:    "13 Mar 2026 to 07 Apr 2026",
  lastUpdated:        "5 May 2026, 15:23",
  onReassign:         (id: string, scope: string) => alert(`Reassigned to ${id} — scope: ${scope}`),
};

function PanelWrapper({ variant, candidates }: { variant: ReassignVariant; candidates: { id: string; name: string; initials: string; email?: string; grade?: string; match?: number; avail?: number }[] }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="booking" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Reassign booking side panel — {variant}
        </p>
      </div>
      <ReassignSidePanel
        open={open}
        onClose={() => setOpen(false)}
        variant={variant}
        data={{ ...BASE_DATA, candidates, onCancel: () => setOpen(false) }}
      />
    </div>
  );
}

const meta: Meta = {
  title: "Side Panels/Reassign Booking",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Reassign Booking Side Panel — Figma node 11416:198965. Width: 600px. " +
          "3 variants: Matches (table with Grade/Match/Avail), Other resources (simple list), Loading. " +
          "Scope radios (this / this+future / all) + Toggle + InputSearch. Sticky Cancel/Reassign.",
      },
    },
  },
};

export default meta;

const BULK_BOOKINGS = [
  { booking: "Javascript developer", role: "Javascript developer", category: "Hard", dates: "27 Mar 2026 - 9 Apr 2026", hours: "10" },
  { booking: "Javascript developer", role: "Javascript developer", category: "Hard", dates: "27 Mar 2026 - 9 Apr 2026", hours: "10" },
  { booking: "Javascript developer", role: "Javascript developer", category: "Hard", dates: "27 Mar 2026 - 9 Apr 2026", hours: "10" },
  { booking: "Javascript developer", role: "Javascript developer", category: "Hard", dates: "27 Mar 2026 - 9 Apr 2026", hours: "10" },
  { booking: "Javascript developer", role: "Javascript developer", category: "Hard", dates: "27 Mar 2026 - 9 Apr 2026", hours: "10" },
  { booking: "Javascript developer", role: "Javascript developer", category: "Hard", dates: "27 Mar 2026 - 9 Apr 2026", hours: "10" },
  { booking: "Javascript developer", role: "Javascript developer", category: "Hard", dates: "27 Mar 2026 - 9 Apr 2026", hours: "10" },
  { booking: "Javascript developer", role: "Javascript developer", category: "Hard", dates: "27 Mar 2026 - 9 Apr 2026", hours: "10" },
  { booking: "Javascript developer", role: "Javascript developer", category: "Hard", dates: "27 Mar 2026 - 9 Apr 2026", hours: "10" },
  { booking: "Javascript developer", role: "Javascript developer", category: "Hard", dates: "27 Mar 2026 - 9 Apr 2026", hours: "10" },
];

export const Matches: StoryFn        = () => <PanelWrapper variant="matches" candidates={MATCH_CANDIDATES} />;
export const OtherResources: StoryFn = () => <PanelWrapper variant="other"   candidates={OTHER_CANDIDATES} />;
export const Loading: StoryFn        = () => <PanelWrapper variant="loading"  candidates={[]} />;
export const NoResults: StoryFn      = () => <PanelWrapper variant="matches"  candidates={[]} />;
export const Bulk: StoryFn           = () => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="booking" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Reassign booking side panel — bulk
        </p>
      </div>
      <ReassignSidePanel
        open={open}
        onClose={() => setOpen(false)}
        variant="bulk"
        data={{
          ...BASE_DATA,
          bookingCount: 10,
          bulkBookings: BULK_BOOKINGS,
          candidates: MATCH_CANDIDATES,
          onCancel: () => setOpen(false),
        }}
      />
    </div>
  );
};
