// NotificationsSidePanel stories — Figma node 1737:67156 (Sidepanel/Notifications)

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { NotificationsSidePanel } from "./notifications_side_panel";
import { Navbar }                 from "../navbar/navbar";

const NOTIFICATIONS = [
  {
    id: "1",
    unseen: true,
    urgent: false,
    title: "Approved the resource request allocation",
    body: "Sancho Pansa has approved the resource request allocation for the Role - test3 07 with the following reason: test.",
    changes: {
      type: "hours" as const,
      beforeDate: "20 Apr 2026 - 24 Apr 2026",
      afterDate:  "20 Apr 2026 - 24 Apr 2026",
      beforeHours: [
        { day: "M", value: "8", changed: false },
        { day: "T", value: "8", changed: false },
        { day: "W", value: "8", changed: false },
        { day: "T", value: "8", changed: false },
        { day: "F", value: "8", changed: false },
        { day: "S", value: "0", changed: false },
        { day: "S", value: "0", changed: false },
      ],
      afterHours: [
        { day: "M", value: "4", changed: true  },
        { day: "T", value: "4", changed: true  },
        { day: "W", value: "4", changed: true  },
        { day: "T", value: "4", changed: true  },
        { day: "F", value: "4", changed: true  },
        { day: "S", value: "0", changed: false },
        { day: "S", value: "0", changed: false },
      ],
    },
    engagement: "Automation_Audit_SC1_130426180517 (PZ91041844) - Pre-Eng Activity (PZ91041844.1.2)",
    role: "0010 - Test D0 Assistant Manager - D0 Assistant Manager - UK01A.",
    date: "Today, 10:45",
  },
  {
    id: "2",
    unseen: true,
    urgent: true,
    title: "Role details changed",
    body: "The details for Role D0 Assistant Manager have been updated by Spencer Harmon.",
    changes: {
      type: "dates" as const,
      beforeDate:   "1 May - 15 May 2026",
      afterDate:    "1 Jun - 15 Jun 2026",
      beforeChanged: false,
      afterChanged:  true,
    },
    engagement: "Compliance Programme Q2 2026",
    role: "D0 Assistant Manager - London HQ",
    date: "Today, 09:12",
  },
  {
    id: "3",
    unseen: false,
    urgent: false,
    title: "Booking confirmed",
    body: "Bartosz Bartosz's booking for Role - ST Role#2 has been confirmed.",
    engagement: "ST engagement test",
    role: "ST Role#2",
    date: "Yesterday, 16:30",
  },
  {
    id: "4",
    unseen: false,
    urgent: false,
    title: "Availability requirement mismatch",
    body: "The availability requirement for Role - Javascript developer does not match the booked hours.",
    engagement: "Front end team Q2",
    role: "Javascript developer",
    date: "Yesterday, 14:05",
  },
  {
    id: "5",
    unseen: false,
    urgent: false,
    title: "Resource request submitted",
    body: "A new resource request has been submitted for the Analytics Platform role.",
    engagement: "Analytics Platform Build",
    role: "Senior Data Analyst",
    date: "25 Apr 2026, 11:20",
  },
];

function PanelWrapper({ data }: { data: typeof NOTIFICATIONS }) {
  const [open, setOpen] = useState(true);
  return (
    // Notifications opens from LEFT — right next to navbar
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="notifications" />
      <NotificationsSidePanel
        open={open}
        onClose={() => setOpen(false)}
        data={{
          notifications: data,
          filters: {
            notificationType: "Role details changed",
            groupBy: "None",
            filterCount: 1,
          },
          unreadCount: data.filter(n => n.unseen).length,
          onRefresh: () => console.log("Refresh"),
          onClearFilters: () => console.log("Clear filters"),
        }}
      />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-2)" }}>
          Main content area
        </p>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Side Panels/Notifications",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Notifications Side Panel — Figma node 1737:67156. Width: 400px. " +
          "Opens from LEFT (next to navbar). " +
          "Filters accordion (collapsed/expanded) with Engagement, Role, Notification type, Group by. " +
          "Unread only switch + refresh. " +
          "Notification items: unseen dot, title (bold=unread), body, metadata, date, hover actions.",
      },
    },
  },
};

export default meta;

export const Default: StoryFn    = () => <PanelWrapper data={NOTIFICATIONS} />;
export const AllRead: StoryFn    = () => <PanelWrapper data={NOTIFICATIONS.map(n => ({ ...n, unseen: false }))} />;
export const UnreadOnly: StoryFn = () => <PanelWrapper data={NOTIFICATIONS.filter(n => n.unseen)} />;
