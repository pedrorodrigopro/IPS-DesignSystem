import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Navbar } from "./navbar";

export default {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1420-19785",
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof Navbar>;

export const Default: StoryFn<typeof Navbar> = () => {
  const [active, setActive] = useState("marketplace");
  return (
    <div style={{ display: "flex", height: "100vh", background: "#F8F9FD" }}>
      <Navbar activeId={active} onSelect={setActive} avatarInitials="CP" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#5C6E9E" }}>
          Active: <strong style={{ color: "#0D2976" }}>{active}</strong>
        </span>
      </div>
    </div>
  );
};

export const NoSelection: StoryFn<typeof Navbar> = () => (
  <div style={{ display: "flex", height: "100vh", background: "#F8F9FD" }}>
    <Navbar avatarInitials="CP" />
  </div>
);

export const WithSearch: StoryFn<typeof Navbar> = () => (
  <div style={{ display: "flex", height: "100vh", background: "#F8F9FD" }}>
    <Navbar activeId="search" avatarInitials="AB" />
  </div>
);

/** `badges` puts a red unread count on a nav item (hidden at 0, "9+" above 9) */
export const WithBadge: StoryFn<typeof Navbar> = () => {
  const [active, setActive] = useState("workflow");
  const [unread, setUnread] = useState(1);
  return (
    <div style={{ display: "flex", height: "100vh", background: "#F8F9FD" }}>
      <Navbar
        activeId={active}
        badges={{ notifications: unread }}
        onSelect={id => { if (id === "notifications") setUnread(n => (n >= 12 ? 0 : n + 4)); else setActive(id); }}
      />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#5C6E9E" }}>
          Click the bell to change the unread count: <strong style={{ color: "#0D2976" }}>{unread}</strong>
        </span>
      </div>
    </div>
  );
};
