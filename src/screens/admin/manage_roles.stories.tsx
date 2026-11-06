// Screens/ManageRoles — stories for the reusable ManageRolesScreen (admin/manage_roles.tsx)
//
//   DTT              Edit Project Team Template: no selection, pencil row actions, Save
//   EngagementRoles  one engagement's roles: merged Engagement cell, checkboxes, bulk banner + "Manage tags"
//   RolledForward    roles of several engagements (after a roll forward): one merged Engagement cell per engagement

import type { Meta, StoryObj } from "@storybook/react";

import { ManageRolesScreen } from "./manage_roles";
import type { ManageRolesGroup, ManageRolesRole } from "./manage_roles";
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

// Requested hours per week for the availability table: 40h in one week per role; `flag` marks a conflict (red) or a warning (orange)
const wk = (week: number, flag?: "error" | "warning"): ManageRolesRole["availability"] =>
  Array.from({ length: 6 }, (_, i) => (i === week ? (flag ? { hours: 40, flag } : 40) : null));

// Engagement roles — every role carries its engagement, so the Engagement cell is merged across them
const role = (id: string, engagement: string, title: string, extra: Partial<ManageRolesRole> = {}): ManageRolesRole => ({
  id, engagement, title, description: title, vacancies: 1, wfState: "not-filled", businessUnit: "Executive", label: "label", location: "London, UK", ...extra,
});

const ENGAGEMENT_GROUPS: ManageRolesGroup[] = [
  {
    name: "GPS Role",
    roles: [
      role("e1", "ST engagement test", "Role 1", { bookingCategory: { label: "Holiday", category: "booking-blue" }, availability: wk(0, "error") }),
      role("e2", "ST engagement test", "Role 2", { bookingCategory: { label: "Confirmed External Customer Project", category: "booking-red" }, availability: wk(1) }),
    ],
  },
  {
    name: "No Requirements :)",
    roles: [role("e3", "ST engagement test", "x", { label: "", availability: wk(2, "warning") }), role("e4", "ST engagement test", "x", { label: "", availability: wk(1) })],
  },
];

// Several engagements (what a roll forward creates)
const ROLLED_FORWARD_GROUPS: ManageRolesGroup[] = [
  {
    name: "Rolled forward roles",
    roles: [
      role("f1", "RF_CLONE_2_[2026 Q3] ProFinda IT", "Javascript developer", { availability: wk(0, "error") }),
      role("f2", "RF_CLONE_2_[2026 Q3] ProFinda IT", "Junior Javascript developer", { availability: wk(1) }),
      role("f3", "RF_CLONE_2_[2026 Q3] ProFinda IT", "Accessibility consultant", { availability: wk(2, "warning") }),
      role("f4", "RF_CLONE_2_[2026 Q3] ProFinda IT", "React developer", { availability: wk(1) }),
      role("f5", "RF_CLONE_1_[2026 Q4] ProFinda Advisory", "Javascript developer", { availability: wk(1) }),
      role("f6", "RF_CLONE_1_[2026 Q4] ProFinda Advisory", "Junior Javascript developer", { availability: wk(1) }),
      role("f7", "RF_CLONE_1_[2026 Q4] ProFinda Advisory", "Accessibility consultant", { availability: wk(2) }),
      role("f8", "RF_CLONE_1_[2026 Q4] ProFinda Advisory", "React developer", { availability: wk(0) }),
    ],
  },
];

// "Manage tags" → Update confirms with a toast
function WithToast(props: React.ComponentProps<typeof ManageRolesScreen>) {
  const { showToast } = useToast();
  return (
    <ManageRolesScreen
      {...props}
      onTagged={({ tag, roles }) => showToast({ type: "success", message: `Tag “${tag}” added to ${roles} ${roles === 1 ? "role" : "roles"}` })}
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
          "buttons: tag-roles (opens the “Manage tags” modal, Figma 2738:67102), tag and owner. A Tag column after Role title shows the tag a role was given. " +
          "Engagement variants add a separate availability-rules table to the right (Figma 2362:258886): requested hours per week, one column per week, red/orange top borders for conflicts/warnings, row actions at its right edge. " +
          "Bottom: Actions variant='sticky-screen' — Cancel | Save / Fill & Book.",
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
