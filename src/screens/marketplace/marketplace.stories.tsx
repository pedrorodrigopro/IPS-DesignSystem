// Screens/Marketplace — two variants: Home and Work Opportunities
//
// Home:
//   Full-page blue gradient background (no neutral-2 page bg)
//   Left half: hero text directly on gradient
//   Right half: vertical stack of Tile components with rgba(255,255,255,0.15) background
//     — overrides tileStyle background via inline style (only safe exception: bg colour override on dark screens)
//   Sections: Opportunities for you (4 counters + CTA) | Next avail / Profile / Preferences row | Upcoming roles
//
// Work Opportunities:
//   Standard neutral-2 page bg, Navbar, "Work opportunities" H1
//   Toolbar: search + matching toggles + filter
//   Tabs: NavigationMarketplace (dark pill bar) — Matching Roles | Interested | Saved | Shared
//   Two-panel: left Tile highlight (role list) | right flat sections with Dividers (no Tile)
//
// Container mapping (RULE 2b):
//   Home panels: Tile highlight + inline style bg override rgba(255,255,255,0.15), padding content
//   Role list card (left): Tile highlight content
//   Selected role card: Tile selected content (blue-tint bg)
//   Right panel sections: flat divs separated by Divider (not Tiles — matches platform pattern)

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Navbar }          from "../../components/navbar/navbar";
import { Icon }            from "../../components/icon/icon";
import { Tile }            from "../../components/tile/tile";
import { Divider }         from "../../components/divider/divider";
import { Avatar }          from "../../components/avatar/avatar";
import { Button }          from "../../components/button/button";
import { InputSearch }     from "../../components/input/input";
import { Navigation, NavigationMarketplace } from "../../components/navigation/navigation";
import { ProgressLinear }  from "../../components/progress_bar/progress_bar";
import { PillSimple }      from "../../components/pill/pill";

// ── Shared helpers ────────────────────────────────────────────────────────────

function Row({ children, gap = 8, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", alignItems: "center", gap, ...style }}>{children}</div>;
}
function SB({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...style }}>{children}</div>;
}

// Top-right nav: NavigationMarketplace (dark navy pill, white icons, active = full opacity)
const MARKETPLACE_NAV_ITEMS = [
  { id: "home", icon: "home" as const, label: "Home" },
  { id: "work", icon: "booking" as const, label: "Work opportunities" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HOME SCREEN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Semi-transparent panel — Tile with white-low-opacity bg override.
// This is the one safe use of inline style bg: the base Tile variants are all
// designed for the neutral-2 page bg; on the blue gradient we need a custom bg.
function GlassPanel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <Tile
      tileStyle="highlight"
      padding="content"
      style={{ background: "rgba(255,255,255,0.15)", ...style }}
    >
      {children}
    </Tile>
  );
}

const whiteText:  React.CSSProperties = { fontFamily: "var(--font-family)", color: "white" };
const whiteMuted: React.CSSProperties = { ...whiteText, opacity: 0.7 };

// Counter tile inside "Opportunities for you"
function CounterTile({ label, value }: { label: string; value: number }) {
  return (
    <div style={{
      flex: 1, background: "white", borderRadius: "var(--radius-md)",
      padding: "12px 8px", display: "flex", flexDirection: "column",
      alignItems: "center", gap: 4,
    }}>
      <div style={{ ...whiteMuted, color: "var(--palette-blue-2)", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-family)", fontSize: 36, fontWeight: 800, color: "var(--palette-blue-1)", lineHeight: 1 }}>{value}</div>
    </div>
  );
}

// Dot pagination indicator
function Dots({ total = 5, active = 0 }: { total?: number; active?: number }) {
  return (
    <Row gap={4} style={{ justifyContent: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{
          width: i === active ? 8 : 6, height: i === active ? 8 : 6,
          borderRadius: "50%", background: i === active ? "white" : "rgba(255,255,255,0.4)",
          transition: "all 0.2s",
        }} />
      ))}
    </Row>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "linear-gradient(135deg, #2358F8 0%, #0C1457 100%)",
    }}>
      {/* Navbar */}
      <Navbar activeId="marketplace" />

      {/* Content: hero left + panels right */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", padding: "48px 40px", gap: 40 }}>

        {/* Hero text — sits directly on gradient */}
        <div style={{ flex: 1, paddingTop: 40 }}>
          <p style={{
            ...whiteText, fontSize: 36, fontWeight: 300, lineHeight: "140%", maxWidth: 480,
          }}>
            Every experience is a stepping stone to growth - embrace opportunities to discover new skills, connections, and possibilities.
          </p>
        </div>

        {/* Right panel stack */}
        <div style={{ width: 520, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>

          {/* Greeting + nav pills */}
          <SB>
            <span style={{ ...whiteText, fontSize: 14 }}>Hi Spencer, welcome to Opportunity Marketplace</span>
            <NavigationMarketplace items={MARKETPLACE_NAV_ITEMS} activeId="home" onChange={onNavigate} />
          </SB>

          {/* Opportunities for you */}
          <GlassPanel>
            <div style={{ ...whiteText, fontWeight: 600, marginBottom: 12 }}>Opportunities for you</div>
            <Row gap={8} style={{ marginBottom: 12 }}>
              <CounterTile label="Unread"      value={0}  />
              <CounterTile label="Interested"  value={39} />
              <CounterTile label="Saved"       value={20} />
              <CounterTile label="Shared"      value={0}  />
            </Row>
            {/* Browse CTA */}
            <div style={{
              background: "var(--palette-blue-1)", borderRadius: "var(--radius-md)",
              padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
              cursor: "pointer",
            }}>
              <Row gap={8}>
                <Icon name="booking" size={16} style={{ color: "white" }} />
                <span style={{ ...whiteText, fontSize: 14, fontWeight: 600 }}>Browse opportunities</span>
              </Row>
              <Icon name="chevron-right" size={16} style={{ color: "white" }} />
            </div>
          </GlassPanel>

          {/* Three-column row: Next availability | Profile Completion | My preferences */}
          <Row gap={12} style={{ alignItems: "stretch" }}>

            {/* Next availability */}
            <GlassPanel style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ ...whiteText, fontSize: 13, fontWeight: 600, opacity: 0.9 }}>Next availability</div>
              <Row gap={8} style={{ alignItems: "flex-end" }}>
                <span style={{ ...whiteText, fontSize: 56, fontWeight: 800, lineHeight: 1 }}>9</span>
                <Icon name="chevron-right" size={16} style={{ color: "white", marginBottom: 8 }} />
              </Row>
              <div style={{ ...whiteMuted, fontSize: 12 }}>Sep 2026 – 3 Days</div>
              <Dots total={5} active={0} />
            </GlassPanel>

            {/* Profile Completion */}
            <GlassPanel style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ ...whiteText, fontSize: 13, fontWeight: 600, opacity: 0.9 }}>Profile Completion</div>
              <ProgressLinear value={95} semantic />
              <div style={{ ...whiteText, fontSize: 13, fontWeight: 700 }}>Excellent</div>
              <div style={{ ...whiteMuted, fontSize: 12, lineHeight: "150%" }}>
                Your profile looks great! Remember to keep it up to date to always get the best matches.
              </div>
              <button style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "var(--palette-blue-1)", border: "none", borderRadius: "var(--radius-md)",
                padding: "8px 12px", cursor: "pointer", width: "100%",
              }}>
                <Row gap={6}>
                  <Icon name="profile" size={14} style={{ color: "white" }} />
                  <span style={{ ...whiteText, fontSize: 13, fontWeight: 600 }}>Edit Profile</span>
                </Row>
                <Icon name="chevron-right" size={14} style={{ color: "white" }} />
              </button>
            </GlassPanel>

            {/* My preferences */}
            <GlassPanel style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ ...whiteText, fontSize: 13, fontWeight: 600, opacity: 0.9 }}>My preferences</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {["Remote and hybrid types", "6-24 months duration", "Blitz BASIC (Object-Oriented Programming Language), CFOs, C (Programming Language), Java Module, Java"].map(pref => (
                  <div key={pref} style={{ ...whiteMuted, fontSize: 12, lineHeight: "140%" }}>{pref}</div>
                ))}
              </div>
              <button style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "var(--palette-blue-1)", border: "none", borderRadius: "var(--radius-md)",
                padding: "8px 12px", cursor: "pointer", width: "100%", marginTop: "auto",
              }}>
                <Row gap={6}>
                  <Icon name="admin" size={14} style={{ color: "white" }} />
                  <span style={{ ...whiteText, fontSize: 13, fontWeight: 600 }}>Edit preferences</span>
                </Row>
                <Icon name="chevron-right" size={14} style={{ color: "white" }} />
              </button>
            </GlassPanel>

          </Row>

          {/* My upcoming roles */}
          <GlassPanel>
            <SB style={{ marginBottom: 12 }}>
              <div style={{ ...whiteText, fontWeight: 600 }}>My upcoming roles</div>
              <Icon name="calendar" size={16} style={{ color: "white" }} />
            </SB>

            {/* Role card — white inside glass panel */}
            <div style={{
              background: "white", borderRadius: "var(--radius-md)", padding: 16,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)" }}>ww CLONE</div>
                <Row gap={6}>
                  <Icon name="calendar" size={14} style={{ color: "var(--palette-blue-2)" }} />
                  <span style={{ fontFamily: "var(--font-family)", fontSize: 12, color: "var(--palette-blue-2)" }}>16-06-2027 – 17-06-2027</span>
                </Row>
              </div>
              <Row gap={8}>
                <PillSimple label="Confirmed" size="small" bg="var(--palette-blue-1)" color="white" />
                <Icon name="chevron-right" size={16} style={{ color: "var(--palette-blue-2)" }} />
              </Row>
            </div>

            <div style={{ marginTop: 12 }}>
              <Dots total={5} active={0} />
            </div>
          </GlassPanel>

        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WORK OPPORTUNITIES SCREEN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const bodyBold: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)" };
const body:     React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)" };
const labelCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)" };
// Section headings use dark primary text, not primary blue — blue is only for interactive links
const sectionTitle: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 16, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%" };
// Interest questions / non-interactive body text — dark text, not primary blue
const bodyText: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)" };

const WORK_TABS = [
  { id: "matching", label: "Matching Roles", badge: 1 },
  { id: "interested", label: "Interested", badge: 39 },
  { id: "saved", label: "Saved Roles", badge: 20 },
  { id: "shared", label: "Shared with me", badge: 0 },
];

// Toggle switch (Requirements / Availability)
function Toggle({ on = true, label }: { on?: boolean; label: string }) {
  return (
    <Row gap={6}>
      <div style={{
        width: 36, height: 20, borderRadius: 10,
        background: on ? "var(--palette-primary-0)" : "var(--palette-neutral-0)",
        position: "relative", flexShrink: 0, cursor: "pointer",
      }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%", background: "white",
          position: "absolute", top: 2,
          left: on ? 18 : 2, transition: "left 0.15s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </div>
      <span style={body}>{label}</span>
    </Row>
  );
}

// Left panel: role list card (selected)
function RoleListCard({ selected = false }: { selected?: boolean }) {
  return (
    <Tile tileStyle={selected ? "selected" : "highlight"} padding="content" style={{ cursor: "pointer" }}>
      <div style={bodyBold}>420418 - Matches - Ordering</div>
      <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
        <div>
          <div style={labelCss}>Match</div>
          <Row gap={4}>
            <span style={{ ...bodyBold, color: "var(--palette-primary-0)" }}>71%</span>
            <Icon name="refresh" size={14} style={{ color: "var(--palette-blue-2)" }} />
          </Row>
        </div>
        <div>
          <div style={labelCss}>Availability</div>
          <span style={{ ...bodyBold }}>60%</span>
        </div>
      </div>
    </Tile>
  );
}

// Right panel: role detail — flat sections with Dividers, no Tile wrapper
function RoleDetail() {
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 0 }}>

      {/* Title row */}
      <div style={{ paddingBottom: 16 }}>
        <SB style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-family)", fontSize: 20, fontWeight: 700, color: "var(--palette-blue-0)" }}>
            420418 - Matches - Ordering
          </span>
          <Row gap={8}>
            <button style={{ width: 32, height: 32, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--palette-blue-2)" }}>
              <Icon name="save" size={16} />
            </button>
            <button style={{ width: 32, height: 32, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--palette-blue-2)" }}>
              <Icon name="share" size={16} />
            </button>
            <Button kind="primary" size="regular">Show interest</Button>
          </Row>
        </SB>
        <span style={{ ...labelCss }}>0 interested</span>
      </div>

      <Divider orientation="horizontal" />

      {/* Dates */}
      <div style={{ padding: "16px 0" }}>
        <Row gap={24}>
          <Row gap={6}>
            <Icon name="calendar" size={14} style={{ color: "var(--palette-blue-2)" }} />
            <span style={body}>26 days left to apply</span>
          </Row>
          <Row gap={6}>
            <Icon name="calendar" size={14} style={{ color: "var(--palette-blue-2)" }} />
            <span style={body}>28-09-2026 - 11-10-2026</span>
          </Row>
        </Row>
      </div>

      <Divider orientation="horizontal" />

      {/* Owners */}
      <div style={{ padding: "16px 0" }}>
        <div style={{ ...labelCss, marginBottom: 8 }}>Owners</div>
        <Row gap={-4}>
          <Avatar initials="SH" size="small" />
          <Avatar initials="AD" size="small" />
          <Avatar initials="RS" size="small" />
        </Row>
      </div>

      <Divider orientation="horizontal" />

      {/* Description */}
      <div style={{ padding: "16px 0" }}>
        <div style={{ ...sectionTitle, marginBottom: 8 }}>Description</div>
        <span style={body}>test</span>
      </div>

      <Divider orientation="horizontal" />

      {/* Interest Questions */}
      <div style={{ padding: "16px 0" }}>
        <div style={{ ...sectionTitle, marginBottom: 8 }}>Interest Questions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            "Are you working for ProFinda?",
            "Do you have automation testing experience (Ruby, Ruby on Rails or Javascript)?",
            "Do you have more than 5 years of experience on a similar role?",
          ].map(q => <div key={q} style={bodyText}>{q}</div>)}
        </div>
      </div>

      <Divider orientation="horizontal" />

      {/* Skills and Attributes */}
      <div style={{ padding: "16px 0" }}>
        <SB style={{ marginBottom: 10 }}>
          <div style={sectionTitle}>Skills and Attributes</div>
          <Row gap={6}>
            <Icon name="refresh" size={14} style={{ color: "var(--palette-primary-0)" }} />
            <span style={{ ...body, color: "var(--palette-primary-0)", fontWeight: 700 }}>71% Match</span>
          </Row>
        </SB>
        <Row gap={6}>
          {[1,2,3].map(i => (
            <span key={i} style={{ display: "inline-block", width: 10, height: 4, borderRadius: 2, background: i <= 2 ? "var(--palette-blue-0)" : "var(--palette-neutral-0)" }} />
          ))}
          <span style={body}>Ruby (Programming Language)</span>
          <span style={{ fontSize: 12 }}>⭐</span>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, borderRadius: "50%", background: "var(--palette-primary-0)", fontSize: 9, color: "white", fontWeight: 700 }}>✓</span>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, borderRadius: "50%", background: "var(--palette-green-0)", fontSize: 9, color: "white", fontWeight: 700 }}>✓</span>
        </Row>
      </div>

      <Divider orientation="horizontal" />

      {/* Availability requirements */}
      <div style={{ padding: "16px 0" }}>
        <div style={{ ...sectionTitle, marginBottom: 8 }}>Availability requirements</div>
        <div style={body}>28-09-2026 - 11-10-2026 (M: 8, T: 8, W: 8, T: 6.5, F: 7.5, S: 0, S: 0)</div>
        <div style={{ ...body, marginTop: 4 }}>matching at least 40%</div>
      </div>

      <Divider orientation="horizontal" />

      {/* Privacy */}
      <div style={{ padding: "16px 0" }}>
        <div style={{ ...sectionTitle, marginBottom: 8 }}>Privacy</div>
        <div style={body}>Public</div>
        <div style={{ ...labelCss, marginTop: 4 }}>Everyone with permissions can view this.</div>
      </div>

      <Divider orientation="horizontal" />

      {/* Footer: Created / Created by */}
      <div style={{ paddingTop: 16, display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={labelCss}>Created</div>
          <div style={bodyBold}>25-09-2026</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={labelCss}>Created by</div>
          <div style={bodyBold}>Spencer Harmon</div>
        </div>
      </div>

    </div>
  );
}

function WorkOpportunitiesScreen({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState("matching");
  const [search, setSearch] = useState("");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="marketplace" />

      <div style={{ flex: 1, padding: "24px 24px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Header row */}
          <SB>
            <span style={{ fontFamily: "var(--font-family)", fontSize: 32, fontWeight: 600, color: "var(--palette-blue-0)" }}>
              Work opportunities
            </span>
            <NavigationMarketplace items={MARKETPLACE_NAV_ITEMS} activeId="work" onChange={onNavigate} />
          </SB>

          {/* Toolbar */}
          <SB>
            <div style={{ width: 200 }}>
              <InputSearch value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
            </div>
            <Row gap={12}>
              <Row gap={6}>
                <span style={body}>Show opportunities matching</span>
                <Icon name="info" size={14} style={{ color: "var(--palette-blue-2)" }} />
              </Row>
              <Toggle on={true}  label="Requirements" />
              <Toggle on={true}  label="Availability"  />
              <Button kind="icon" size="regular" title="Filter">
                <Icon name="filter" size={16} />
              </Button>
            </Row>
          </SB>

          {/* Tabs + Preferences button */}
          <SB style={{ alignItems: "flex-end" }}>
            <Navigation
              orientation="horizontal"
              tabs={WORK_TABS}
              activeId={activeTab}
              onChange={setActiveTab}
            />
            <Button kind="secondary" size="regular">
              <Icon name="admin" size={14} />
              Preferences
            </Button>
          </SB>

          {/* Two-panel layout */}
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

            {/* Left panel: role list */}
            <div style={{ width: 320, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <Tile tileStyle="highlight" padding="content">
                <SB style={{ marginBottom: 12 }}>
                  <span style={bodyBold}>Matching Roles</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, height: 32, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 10px", background: "white", cursor: "pointer" }}>
                    <span style={body}>Skills &amp; Attrs</span>
                    <Icon name="chevron-down" size={14} />
                  </div>
                </SB>
                <RoleListCard selected />
              </Tile>
            </div>

            {/* Right panel: role detail — flat, no Tile wrapper */}
            <div style={{ flex: 1, minWidth: 0, background: "white", borderRadius: "var(--radius-md)", padding: 24 }}>
              <RoleDetail />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Storybook meta
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const meta: Meta = {
  title: "Screens/Marketplace",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Marketplace screen — two variants. " +
          "Home: blue gradient bg, hero text left, glass-panel Tiles right (rgba(255,255,255,0.15) bg override — " +
          "only safe exception to inline bg rule, as base Tile variants are designed for neutral-2 page bg). " +
          "Work Opportunities: neutral-2 bg, search toolbar, tab nav, two-panel layout " +
          "(left: Tile highlight role list; right: flat sections with Dividers, no Tile wrapper).",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function MarketplaceScreen({ defaultView = "home" }: { defaultView?: "home" | "work" }) {
  const [view, setView] = useState<"home" | "work">(defaultView);
  const navigate = (id: string) => setView(id as "home" | "work");
  return view === "home"
    ? <HomeScreen onNavigate={navigate} />
    : <WorkOpportunitiesScreen onNavigate={navigate} />;
}

export const Home: Story = {
  name: "Home",
  render: () => <MarketplaceScreen defaultView="home" />,
};

export const WorkOpportunities: Story = {
  name: "Work Opportunities",
  render: () => <MarketplaceScreen defaultView="work" />,
};
