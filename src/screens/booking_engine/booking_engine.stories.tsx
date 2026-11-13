import type { Meta, StoryObj } from "@storybook/react";
import { BookingEngineScreen } from "./booking_engine";
import type { EngagementEntry, GridWeeks } from "./booking_engine";

const meta: Meta = {
  title: "Screens/BookingEngine",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Booking Engine — Projects tab / Engagements view / Calendar Gantt / Group / Show Role level. " +
          "Figma: l3JiE7ZmAsjSZY5Z7yPCOZ node 2:261721. " +
          "Split layout: left 620px engagement table with expandable role+booking rows | right Gantt calendar. " +
          "Booking pills from Figma fills: booking-blue rgba(124,168,237,0.8), engagement-booked rgba(106,130,197,0.8), role-booked rgba(26,175,163,0.8), partial rgba(255,255,255,0.4). " +
          "Bottom bar: IPS Pagination + timeline minimap scroll indicator.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ProjectsEngagementsGantt: Story = {
  name: "Projects / Engagements / Gantt",
  render: () => <BookingEngineScreen view="engagements" calendar="gantt" />,
};

export const ProjectsRolesGantt: Story = {
  name: "Projects / Roles / Gantt",
  render: () => <BookingEngineScreen view="roles" calendar="gantt" />,
};

export const ProjectsEngagementsGrid: Story = {
  name: "Projects / Engagements / Grid",
  render: () => <BookingEngineScreen view="engagements" calendar="grid" />,
};

export const ProjectsRolesGrid: Story = {
  name: "Projects / Roles / Grid",
  render: () => <BookingEngineScreen view="roles" calendar="grid" />,
};

export const WorkforceBookings: Story = {
  name: "Workforce / Bookings",
  render: () => <BookingEngineScreen panel="workforce" calendar="gantt" />,
};

export const WorkforceGrid: Story = {
  name: "Workforce / Grid",
  render: () => <BookingEngineScreen panel="workforce" calendar="grid" />,
};

// Filters applied: SearchFilter shows them right next to the search box in the toolbar row; the Filter icon becomes filter-applied.
// The screen manages them itself here (a prototype can pass filters + onRemoveFilter + onClearFilters to control them).
export const ProjectsEngagementsGanttFiltersApplied: Story = {
  name: "Projects / Engagements / Gantt — filters applied",
  render: () => <BookingEngineScreen view="engagements" calendar="gantt" filters={[{ id: "eng", field: "Engagement", value: "Q4 Financial Audit" }, { id: "state", field: "State", value: "Open" }]} />,
};

export const WorkforceBookingsFiltersApplied: Story = {
  name: "Workforce / Bookings — filters applied",
  render: () => <BookingEngineScreen panel="workforce" calendar="gantt" filters={[{ id: "wm", field: "Workforce Member", value: "Alexandra I. Poane" }, { id: "unit", field: "Business unit", value: "Executive" }]} />,
};

// ── Misalignment demo: one role, role row as a green role pill, a profile row with the dashed line ──────────────

const MIS_WEEKS: GridWeeks = [
  { month: "Jan 2026", weeks: ["W1", "W2", "W3", "W4"] },
  { month: "Feb 2026", weeks: ["W5", "W6", "W7", "W8"] },
  { month: "Mar 2026", weeks: ["W9", "W10", "W11", "W12", "W13"] },
  { month: "Apr 2026", weeks: ["W14", "W15", "W16", "W17"] },
];
// Requested 40h for 14 weeks; booked 40h for the first 12: weeks 13 and 14 are misaligned (requested, nobody booked)
const MIS_ENGAGEMENTS: EngagementEntry[] = [{
  id: "e2", name: "ST engagement test", state: "new", resourcingBy: "23-10-2026", assignee: "Fake Surname", dueDays: "23 days", startDate: "-", rolesBooked: "1/1 Roles booked",
  roles: [{
    id: "r2", name: "ST Role#2", state: "confirmed", roleId: "415009", expiry: "23-10-2026", assignee: "Bartosz Kowalski", misaligned: true,
    // Clicking the misalignment icon (role card or Bartosz's card) opens the Misalignments panel. Role-level numbers:
    // Expected = all hours the role requests (14 weeks x 40h; first week starts 5 Jan, last week ends Fri 10 Apr);
    // Current  = all hours booked (12 weeks x 40h; last week ends Fri 27 Mar).
    misalignment: {
      roleName: "ST Role#2", wmName: "Bartosz Kowalski",
      ranges: [{
        id: "1", dateRange: "5 Jan 2026 - 10 Apr 2026", subtitle: "Duration, start date, end date", weekStart: 12,
        items: [
          { fieldName: "Duration",   expected: "560h",       current: "480h" },
          { fieldName: "Start date", expected: "5 Jan 2026", current: "5 Jan 2026" },
          { fieldName: "End date",   expected: "10 Apr 2026", current: "27 Mar 2026" },
        ],
      }],
    },
    weekHours: Array.from({ length: 17 }, (_, i) => (i < 14 ? 40 : 0)),
    bookings: [{ name: "Bartosz Kowalski", hours: "480h booked", misaligned: true, misalignedWeeks: [12, 13], weekHours: Array.from({ length: 17 }, (_, i) => (i < 12 ? 40 : 0)) }],
  }],
}];

export const ProjectsRolesGridMisalignment: Story = {
  name: "Projects / Roles / Grid / Misalignment",
  parameters: {
    docs: {
      description: {
        story:
          "The Grid with data of its own: one role, filtered (Filters applied). The role row can be editable cells (roleRow=\"cells\") or a green role pill " +
          "over the weeks that have requested hours (roleRow=\"pill\"). A misaligned role and profile show the calendar-misaligned icon at the start of the " +
          "second line of their card (click it to open the Misalignments panel: all requested hours vs all booked hours, and the first and last week requested vs booked; Show scrolls the grid to the first misaligned week), and the profile row gets a dashed orange pill outline over the misaligned weeks. onCellChange reports edited cells.",
      },
    },
  },
  render: () => (
    <BookingEngineScreen
      view="roles" calendar="grid" engagements={MIS_ENGAGEMENTS} weeks={MIS_WEEKS} roleRow="pill" countLabel="1 role"
      filters={[{ id: "role", field: "Role", value: "ST Role#2" }]}
    />
  ),
};
