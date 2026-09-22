import type { Meta, StoryFn } from "@storybook/react";
import { Icon, IconName } from "./icon";

export default {
  title: "Atoms/Icons",
  component: Icon,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=2976-181531",
    },
  },
  argTypes: {
    size: { control: "select", options: [16, 20, 24] },
  },
} satisfies Meta<typeof Icon>;

const allIcons: IconName[] = [
  "activity-feed", "add", "admin", "ai", "arrow-down", "arrow-left",
  "arrow-right", "arrow-up", "audit-planner", "booking", "calendar",
  "caret-down", "caret-left", "caret-right", "caret-up", "check",
  "chevron-down", "chevron-left", "chevron-right", "chevron-up", "cross",
  "down", "edit", "engagement", "error", "help", "hidden", "history",
  "info", "insights", "link", "links", "list", "location", "locked",
  "logout", "mail", "marketplace", "menu-horizontal", "menu-vertical",
  "merge", "missing", "money", "move", "note", "notifications", "open",
  "pin", "profile", "question", "reassign", "refresh", "remove", "reports",
  "role", "save", "search", "share", "shown", "skills-framework",
  "smart-allocation", "sort", "split", "subtract", "table", "tag", "undo",
  "unseen", "up", "user-filled", "verified", "warning", "workflow",
  "zoom-in", "zoom-out",
];

export const AllIcons: StoryFn<typeof Icon> = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 16 }}>
    {allIcons.map((name) => (
      <div
        key={name}
        title={name}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          padding: "12px 8px",
          width: 88,
          borderRadius: 8,
          cursor: "default",
        }}
      >
        <Icon name={name} size={20} />
        <span style={{
          fontFamily: "Mulish, sans-serif",
          fontSize: 11,
          color: "#5C6E9E",
          textAlign: "center",
          wordBreak: "break-word",
          lineHeight: 1.3,
        }}>
          {name}
        </span>
      </div>
    ))}
  </div>
);

export const Sizes: StoryFn<typeof Icon> = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 24, padding: 16 }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <Icon name="booking" size={16} />
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E" }}>16</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <Icon name="booking" size={20} />
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E" }}>20</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <Icon name="booking" size={24} />
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E" }}>24</span>
    </div>
  </div>
);

export const Default: StoryFn<typeof Icon> = (args) => <Icon {...args} />;
Default.args = { name: "booking", size: 20 };
