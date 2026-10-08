import type { Meta, StoryFn } from "@storybook/react";
import { Icon, IconName } from "./icon";

export default {
  title: "Tokens/Icons",
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
  // Original set
  "activity-feed", "add", "admin", "ai", "arrow-down", "arrow-left",
  "arrow-right", "arrow-up", "audit-planner", "booking", "calendar",
  "caret-down", "caret-left", "caret-right", "caret-up", "check", "chat",
  "chevron-down", "chevron-left", "chevron-right", "chevron-up",
  "core", "cross", "development", "down", "edit", "engagement", "error",
  "filter", "filter-clean", "forbidden", "heart", "help", "hidden", "history",
  "home", "hourglass-half", "info", "insights", "learning",
  "link", "links", "list", "location", "locked", "logout",
  "mail", "mandatory", "marketplace", "menu-horizontal", "menu-vertical",
  "merge", "missing", "money", "move", "note", "notifications", "open",
  "pin", "placeholder-profile", "profile", "question", "reassign", "refresh",
  "remove", "reports", "role", "save", "search", "share", "shown",
  "skills-framework", "smart-allocation", "sort", "split",
  "substitute-parent-child", "subtract", "suggested", "table", "tag",
  "timeline", "undo", "unseen", "up", "user-filled",
  "verified", "verified-credly", "verified-others", "warning", "workflow",
  "zoom-in", "zoom-out",
  // New icons (Figma sync)
  "add-profile", "ai-agent",
  "arrow-2-directions", "arrow-2-directions-vertical", "arrow-4-directions",
  "availability", "baby", "bag", "bell", "book", "bubbles", "bug",
  "bulk", "bulk-move",
  "calendar-clash", "calendar-delete", "calendar-misaligned",
  "car", "certificate", "clock", "close-role", "collapse", "compare",
  "copy", "cost", "created", "department", "dot", "dot-big", "duplicate",
  "engagement-audit", "expand", "expand-all", "expanded-all",
  "export", "extend", "face-smile", "facebook",
  "filter-applied", "filter2", "fire", "flower-spa", "folder",
  "ghost", "head-heart", "heatmap", "hierarchical",
  "hourglass-empty", "house-laptop", "house-user",
  "import", "industry", "instagram", "key", "keyboard", "linkedin",
  "manage-roles", "mobile", "mouse-cursor", "non-demand",
  "overbooking", "overbooking-acknowledged", "owner",
  "palm-tree", "paper-clip", "paper-plane", "path", "pen",
  "person-minus", "pf-logo", "phone", "plane", "play", "postpone",
  "preferences", "profile-field", "profiles",
  "refresh-clean", "refresh-warning", "remove-all",
  "role-audit", "rollforward", "save-add", "save-remove",
  "sector", "segment", "skype", "skype-for-business", "snooze",
  "soft-exception", "split2",
  "substitute-child", "substitute-parent",
  "target-allocation", "task", "teams", "twitter", "unpin",
  "user-interest", "web", "wine-glass", "work",
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
