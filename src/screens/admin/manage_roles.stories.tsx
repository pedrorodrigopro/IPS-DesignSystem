// Screens/ManageRoles — stories for the reusable ManageRolesScreen (admin/manage_roles.tsx)
//
//   DTT              Edit Project Team Template: no selection, pencil row actions, Save
//   EngagementRoles  one engagement's roles: merged Engagement cell, checkboxes, bulk banner + "Manage tags"
//   RolledForward    roles of several engagements (after a roll forward): one merged Engagement cell per engagement

import type { Meta, StoryObj } from "@storybook/react";

import { ManageRolesScreen } from "./manage_roles";
import type { ManageRolesGroup, ManageRolesRole, PotentialOverbooking, BookedScheduleItem } from "./manage_roles";
import { ToastProvider, useToast } from "../../components/toast/toast";

// ── Data ─────────────────────────────────────────────────────────────────────

// Template editor (no engagement column)
const GPS_ROLES: ManageRolesRole[] = [
  {
    id: "r1", title: "Role 1", description: "Role 1", vacancies: 1, assignee: "",
    bookingCategory: { label: "Holiday", category: "booking-blue" },
    businessUnit: "Executive", label: "label", location: "Quận Hoàn Kiếm, VNM",
  },
  {
    id: "r2", title: "Role 2", description: "Role 2", vacancies: 1, assignee: "",
    bookingCategory: { label: "Confirmed External Customer Project", category: "booking-red" },
    businessUnit: "Executive", label: "label", location: ", USA",
  },
];

const NO_REQ_ROLES: ManageRolesRole[] = [
  { id: "r3", title: "x", description: "x", vacancies: 1, assignee: "", businessUnit: "Executive", label: "", location: "", extraColumns: true },
  { id: "r4", title: "x", description: "x", vacancies: 1, assignee: "", businessUnit: "Executive", label: "", location: "", extraColumns: true },
];

const DTT_GROUPS: ManageRolesGroup[] = [
  { name: "GPS Role", roles: GPS_ROLES },
  { name: "No Requirements :)", roles: NO_REQ_ROLES },
];

// Requested hours per week for the availability table: 40h (or `hours`) in one week per role; `flag` marks a conflict (red) or a warning (orange)
const wk = (week: number, flag?: "error" | "warning", hours = 40, overbooking?: PotentialOverbooking): ManageRolesRole["availability"] =>
  Array.from({ length: 6 }, (_, i) => (i === week ? (flag ? { hours, flag, overbooking } : hours) : null));

// What the Potential overbookings panel lists for a flagged week: the suggested WM's other commitments colliding with the role's availability rules.
const OVER_RED: PotentialOverbooking = {      // role asks 40h; 16h + 8h already booked on 40h capacity = 24h over. Editing the 40h down to 16h or less makes it go away
  items: [
    { roleName: "Brightwell Insurance - Tax Compliance FY27", bookingLabel: "Booked 16h", bookingCategory: "booking-red", hours: 16 },
    { roleName: "Internal training", bookingLabel: "Booked 8h", bookingCategory: "booking-purple", hours: 8 },
  ],
};
const OVER_ORANGE: PotentialOverbooking = {   // role asks 24h; 24h already booked = 8h over
  items: [{ roleName: "RF_CLONE_1_[2026 Q4] ProFinda Advisory", bookingLabel: "Booked 24h", bookingCategory: "booking-blue", hours: 24 }],
};

// The booked person's schedule in the six weeks of the availability table (Booked WM eye button): their other roles, hours per week. Spencer Harmon has none (empty state)
const SCHEDULE_LESLIE: BookedScheduleItem[] = [
  { id: "l1", roleName: "Tax compliance manager", engagement: "Brightwell Insurance - Tax Compliance FY27", category: "red", hours: [16, 16, 16, null, null, null] },
  { id: "l2", roleName: "Internal training", engagement: "ProFinda Academy", category: "purple", hours: [8, null, null, null, null, null] },
  { id: "l3", roleName: "Senior consultant", engagement: "RF_CLONE_1_[2026 Q4] ProFinda Advisory", category: "blue", hours: [null, null, 8, 24, 24, 24] },
];
const SCHEDULE_MARY: BookedScheduleItem[] = [
  { id: "m1", roleName: "Accessibility consultant", engagement: "RF_CLONE_1_[2026 Q4] ProFinda Advisory", category: "blue", hours: [null, null, 24, 24, null, null] },
];

const SCHEDULE_SPENCER: BookedScheduleItem[] = [   // 24h on this role + 24h here = 8h over his 40h capacity in week one
  { id: "s1", roleName: "Delivery lead", engagement: "Brightwell Insurance - Tax Compliance FY27", category: "red", hours: [24, 24, null, null, null, null] },
];
const SCHEDULE_FATIMA: BookedScheduleItem[] = [
  { id: "f1", roleName: "Compliance reviewer", engagement: "RF_CLONE_1_[2026 Q4] ProFinda Advisory", category: "blue", hours: [8, 16, 16, null, null, null] },
  { id: "f2", roleName: "Internal training", engagement: "ProFinda Academy", category: "purple", hours: [null, 8, null, null, null, null] },
];

// Engagement roles — every role carries its engagement, so the Engagement cell is merged across them
const role = (id: string, engagement: string, title: string, extra: Partial<ManageRolesRole> = {}): ManageRolesRole => ({
  id, engagement, title, description: title, vacancies: 1, wfState: "not-filled", businessUnit: "Executive", label: "label", location: "London, UK", ...extra,
});

const ENGAGEMENT_GROUPS: ManageRolesGroup[] = [
  {
    name: "GPS Role",
    roles: [
      role("e1", "ST engagement test", "Role 1", { wfState: "confirmed", bookedHours: 40, booked: { name: "Leslie Smith", schedule: SCHEDULE_LESLIE }, bookingCategory: { label: "Holiday", category: "booking-blue" }, suggested: { name: "Leslie Smith", rank: "Manager" }, requestedRank: "Manager", availability: wk(0, "warning", 40, OVER_RED) }),
      role("e2", "ST engagement test", "Role 2", { wfState: "booked", bookedHours: 20, booked: { name: "Mary Lee", schedule: SCHEDULE_MARY }, bookingCategory: { label: "Confirmed External Customer Project", category: "booking-red" }, availability: wk(1) }),
    ],
  },
  {
    name: "No Requirements :)",
    roles: [role("e3", "ST engagement test", "x", { label: "", suggested: { name: "Mary Lee", rank: "Senior" }, availability: wk(2, "warning", 24, OVER_ORANGE) }), role("e4", "ST engagement test", "x", { label: "", availability: wk(1, undefined, 32) })],
  },
];

// Several engagements (what a roll forward creates)
const ROLLED_FORWARD_GROUPS: ManageRolesGroup[] = [
  {
    name: "Rolled forward roles",
    roles: [
      role("f1", "RF_CLONE_2_[2026 Q3] ProFinda IT", "Javascript developer", { wfState: "confirmed", bookedHours: 40, booked: { name: "Leslie Smith", schedule: SCHEDULE_LESLIE }, suggested: { name: "Leslie Smith", rank: "Manager" }, requestedRank: "Manager", availability: wk(0, "warning", 40, OVER_RED) }),
      role("f2", "RF_CLONE_2_[2026 Q3] ProFinda IT", "Junior Javascript developer", { requestedRank: "Manager", availability: wk(1, undefined, 32) }),
      role("f3", "RF_CLONE_2_[2026 Q3] ProFinda IT", "Accessibility consultant", { suggested: { name: "Mary Lee", rank: "Senior" }, availability: wk(2, "warning", 24, OVER_ORANGE) }),
      role("f4", "RF_CLONE_2_[2026 Q3] ProFinda IT", "React developer", { wfState: "booked", bookedHours: 40,
        // Two people booked on one role: two pills (the row grows), each with their own hours on the role and their own eye button
        booked: [
          { name: "Spencer Harmon", hours: [24, null, null, null, null, null], schedule: SCHEDULE_SPENCER },
          { name: "Fatima Al-Rashid", hours: [16, null, null, null, null, null], schedule: SCHEDULE_FATIMA },
        ],
        suggested: { name: "Spencer Harmon", rank: "Principal Consultant" }, requestedRank: "Manager", availability: wk(0) }),
      role("f5", "RF_CLONE_1_[2026 Q4] ProFinda Advisory", "Javascript developer", { availability: wk(1) }),
      role("f6", "RF_CLONE_1_[2026 Q4] ProFinda Advisory", "Junior Javascript developer", { suggested: { name: "Santi Angulo", rank: "Consultant" }, availability: wk(1, undefined, 16) }),
      role("f7", "RF_CLONE_1_[2026 Q4] ProFinda Advisory", "Accessibility consultant", { availability: wk(2, undefined, 36) }),
      role("f8", "RF_CLONE_1_[2026 Q4] ProFinda Advisory", "React developer", { wfState: "confirmed", bookedHours: 20, booked: { name: "Mary Lee", schedule: SCHEDULE_MARY }, suggested: { name: "Mary Lee", rank: "Senior" }, availability: wk(0) }),
    ],
  },
];

// "Manage tags" → Update confirms with a toast
function WithToast(props: React.ComponentProps<typeof ManageRolesScreen>) {
  const { showToast } = useToast();
  return (
    <ManageRolesScreen
      deltaMissing
      {...props}
      onFillBook={({ roleIds }) => showToast({ type: "success", message: `Fill & Book: ${roleIds.length} ${roleIds.length === 1 ? "role" : "roles"}` })}
      onTagged={({ tag, roles, target, engagements }) => showToast({ type: "success", message: target === "engagements"
        ? `Tag “${tag}” added to ${engagements.length} ${engagements.length === 1 ? "engagement" : "engagements"}`
        : `Tag “${tag}” added to ${roles} ${roles === 1 ? "role" : "roles"}` })}
    />
  );
}
const withToast = (props: React.ComponentProps<typeof ManageRolesScreen>) => (
  <ToastProvider><WithToast {...props} /></ToastProvider>
);

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Screens/ManageRoles",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Manage roles — Excel-like editable table split into accordion groups. " +
          "Cells: editable text/number inputs (borderless, focus underline), inline selects, BookingPill for booking category, " +
          "MultiValue fields with Add link, Switch toggles, sticky actions. " +
          "Roles of an engagement share one merged, read-only Engagement cell. Checkboxes on the header, the Engagement cell and each role " +
          "(engagement and role selection are mutually exclusive) show a 600px bulk banner centred in the header row with three ghost icon " +
          "buttons: roles selected = tag (opens the “Manage tags” modal, Figma 2738:67102 — see Modals / Manage tags), tag-engagements (tags the engagements those roles belong to) and owner; engagements selected = tag-roles (opens the same modal for every role inside them: the tag goes in the Tag column), tag (tags the engagements themselves: the tag shows right below each engagement title) and owner. A Tag column after Role title shows the tag a role was given. In the engagement variants a read-only Delta column (same look as the engagement title cell) shows booked minus requested hours (live while the hours are edited; the stories turn on `deltaMissing`): a role that is not booked nor confirmed has nothing booked, so its delta is always negative (red-0); booked and confirmed roles can be 0h (green-0), positive (neutral) or negative (red-0). Engagement variants add a Suggested WM column (an empty one shows the warning background), a Booked WM column right next to it (the pill only shows when the Workflow state is confirmed or booked; any other state leaves it empty). A booked or confirmed role always has someone in Suggested WM (its own suggestion, else the person booked on it) and a separate availability-rules table to the right (Figma 2362:258886): requested hours per week (editable), one column per week, red/orange top borders for conflicts/warnings, row actions at its right edge. Drag the divider to resize the table; it can take almost the whole width, and the week columns stretch. Edited hours are reported through onAvailabilityChange({ roleId, weekIndex, hours }). " +
          "Bottom: Actions variant='sticky-screen' — Cancel | Save in the DTT variant, Close | Fill & Book in the engagement variants.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DTT: Story = {
  name: "DTT — Demand Team Template",
  render: () => (
    <ManageRolesScreen
      groups={DTT_GROUPS}
      header={{ label: "Demand Team Template", value: "Booking Categories at Template Level - Test" }}
      rowActions="dtt"
      saveLabel="Save"
      selectable={false}
    />
  ),
};

export const EngagementRoles: Story = {
  name: "Manage Roles — Engagement",
  render: () => withToast({ groups: ENGAGEMENT_GROUPS, header: { label: "Engagement", value: "ST engagement test" } }),
};

export const RolledForward: Story = {
  name: "Manage Roles — Rolled forward (several engagements)",
  parameters: { docs: { description: { story: "The roles a roll forward created: one merged Engagement cell per engagement. Tick the Engagement header checkbox to select every role." } } },
  render: () => withToast({ groups: ROLLED_FORWARD_GROUPS, navbarActiveId: "workflow" }),
};

// "Open" buttons of the role-rows layout answer with a toast
function RoleRowsScreen() {
  const { showToast } = useToast();
  return (
    <ManageRolesScreen
      deltaMissing roleRows navbarActiveId="workflow" groups={ROLLED_FORWARD_GROUPS}
      onFillBook={({ roleIds }) => showToast({ type: "success", message: `Fill & Book: ${roleIds.length} ${roleIds.length === 1 ? "role" : "roles"}` })}
      onOpenRole={id => showToast({ type: "success", message: `Open role ${id}` })}
      onOpenEngagement={name => showToast({ type: "success", message: `Open engagement ${name}` })}
    />
  );
}

export const RolledForwardRoleRows: Story = {
  name: "Manage Roles — Rolled forward (role rows)",
  parameters: { docs: { description: { story: "The rolled-forward variant with role rows (roleRows): no merged engagement cell. The first column is Role (checkbox + editable title), the second Engagement (editable, one line with an ellipsis, one per row). On hover the Role and Engagement cells turn input-grey over the whole cell and show an “open” button, with the text fading out under it. Every editable cell has the same hover fill. Selection is by role." } } },
  render: () => <ToastProvider><RoleRowsScreen /></ToastProvider>,
};
