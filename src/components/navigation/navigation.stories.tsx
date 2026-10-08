import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Navigation, NavigationMarketplace } from "./navigation";
import type { MarketplaceNavItem } from "./navigation";

export default {
  title: "Components/Navigation",
  component: Navigation,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=5797-282907",
    },
    layout: "centered",
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Navigation>;

const tabs = [
  { id: "description", label: "Description" },
  { id: "matches",     label: "Matches",     badge: 4 },
  { id: "interested",  label: "Interested" },
  { id: "shortlist",   label: "Shortlist" },
  { id: "vacancies",   label: "Vacancies",  badge: 1 },
];

// ── Horizontal (5797:282907) ──────────────────────────────────────────────────

export const Horizontal: StoryFn<typeof Navigation> = () => {
  const [active, setActive] = useState("matches");
  return (
    <Navigation
      orientation="horizontal"
      tabs={tabs}
      activeId={active}
      onChange={setActive}
    />
  );
};

// ── Vertical (5797:282954) ────────────────────────────────────────────────────

export const Vertical: StoryFn<typeof Navigation> = () => {
  const [active, setActive] = useState("matches");
  return (
    <Navigation
      orientation="vertical"
      tabs={tabs}
      activeId={active}
      onChange={setActive}
    />
  );
};

// ── Tab variants (5726:39488) ─────────────────────────────────────────────────
// Selected, Default, Hover, Focus, Disabled + optional features

export const TabVariants: StoryFn<typeof Navigation> = () => {
  const [active, setActive] = useState("selected");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24 }}>
      <div>
        <Label>All states</Label>
        <Navigation
          orientation="horizontal"
          tabs={[
            { id: "selected",  label: "Feedback" },
            { id: "default",   label: "Feedback" },
            { id: "disabled",  label: "Feedback", disabled: true },
          ]}
          activeId={active}
          onChange={setActive}
        />
      </div>
      <div>
        <Label>With icon (check)</Label>
        <Navigation
          orientation="horizontal"
          tabs={[
            { id: "icon-active",   label: "Feedback", showIcon: true },
            { id: "icon-inactive", label: "Feedback", showIcon: true },
          ]}
          activeId="icon-active"
          onChange={() => {}}
        />
      </div>
      <div>
        <Label>With badge</Label>
        <Navigation
          orientation="horizontal"
          tabs={[
            { id: "badge-active",   label: "Feedback", badge: 4 },
            { id: "badge-inactive", label: "Feedback", badge: 1 },
          ]}
          activeId="badge-active"
          onChange={() => {}}
        />
      </div>
      <div>
        <Label>With subtitle (two lines)</Label>
        <Navigation
          orientation="horizontal"
          tabs={[
            { id: "sub-active",   label: "Feedback", subtitle: "Feedback" },
            { id: "sub-inactive", label: "Feedback", subtitle: "Feedback" },
          ]}
          activeId="sub-active"
          onChange={() => {}}
        />
      </div>
      <div>
        <Label>With icon + badge + subtitle</Label>
        <Navigation
          orientation="horizontal"
          tabs={[
            { id: "full-active",   label: "Feedback", showIcon: true, badge: 4, subtitle: "Feedback" },
            { id: "full-inactive", label: "Feedback", showIcon: true, badge: 1, subtitle: "Feedback" },
          ]}
          activeId="full-active"
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
    {children}
  </div>
);

export const Default: StoryFn<typeof Navigation> = (args) => (
  <Navigation {...args} />
);
Default.args = {
  orientation: "horizontal",
  tabs,
  activeId: "matches",
};

// ── Marketing variant (Figma section 7433:239440) ─────────────────────────────
// Horizontal dark pill nav, icon-only. Used on marketing / landing screens.

const marketingItems: MarketplaceNavItem[] = [
  { id: "home",        icon: "home",        label: "Home" },
  { id: "marketplace", icon: "marketplace", label: "Marketplace" },
  { id: "workflow",    icon: "workflow",    label: "Workflow" },
  { id: "insights",    icon: "insights",    label: "Insights" },
  { id: "profiles",    icon: "profile",     label: "Profiles" },
];

export const Marketing: StoryFn<typeof Navigation> = () => {
  const [activeId, setActiveId] = useState("home");
  return (
    <div style={{ padding: 40, background: "#F8F9FD", display: "inline-block" }}>
      <NavigationMarketplace
        items={marketingItems}
        activeId={activeId}
        onChange={setActiveId}
      />
    </div>
  );
};
Marketing.storyName = "Marketing (dark pill)";

export const MarketingAllStates: StoryFn<typeof Navigation> = () => (
  <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 24 }}>
    <div>
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8 }}>
        First item selected
      </p>
      <NavigationMarketplace
        items={marketingItems}
        activeId="home"
      />
    </div>
    <div>
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8 }}>
        Middle item selected
      </p>
      <NavigationMarketplace
        items={marketingItems}
        activeId="workflow"
      />
    </div>
    <div>
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8 }}>
        No selection
      </p>
      <NavigationMarketplace
        items={marketingItems}
      />
    </div>
  </div>
);
MarketingAllStates.storyName = "Marketing — all states";
