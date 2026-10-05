// Screen/Role — Figma file l3JiE7ZmAsjSZY5Z7yPCOZ, node 2:351443
//
// Tabs implemented: Overview, Matches, Vacancies, History
// Shell: Navbar + Layout=1280 + PageHeader + Navigation
//
// Container system — uses Tile with padding prop:
//   Tile padding="panel"   (8px)  — side panel blocks (object-dark / object-light)
//   Tile padding="content" (16px) — main content cards (highlight)
//   Tile padding="screen"  (24px) — top-level screen tiles
//
// ⚠️ Still missing (placeholders):
//   - Interested tab (table rows)
//   - Shortlist tabs
//   - Create Role form
//   - Compare Roles / Availability

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Navbar }          from "../../components/navbar/navbar";
import { Page }            from "../../components/layout/layout";
import { PageHeader }      from "../../components/page_header/page_header";
import { Navigation }      from "../../components/navigation/navigation";
import { Header }          from "../../components/header/header";
import { Tile }            from "../../components/tile/tile";
import { Accordion }       from "../../components/accordion/accordion";
import { Divider }         from "../../components/divider/divider";
import { Avatar }          from "../../components/avatar/avatar";
import { Icon }            from "../../components/icon/icon";
import { Button }          from "../../components/button/button";
import { ButtonGroup }     from "../../components/button_group/button_group";
import { WorkforceMember } from "../../components/workforce_member/workforce_member";
import { PillWFState, PillSimple } from "../../components/pill/pill";
import { SliderNumber }     from "../../components/slider/slider";
import { InputSearch }     from "../../components/input/input";
import { Card }            from "../../components/card/card";
import type { SkillGroup } from "../../components/card/card";

import type { WFState } from "../../components/pill/pill";

// ── Shared data ───────────────────────────────────────────────────────────────

const breadcrumbs = [
  { label: "Workflow", href: "#" },
  { label: "Role: Matches - Ordering" },
];

const roleSubtitle = {
  wfState: "new" as WFState,
  subtitleItems: [
    { label: "ID",      value: "420418" },
    { label: "State",   value: "Open" },
    { label: "Privacy", value: "Public" },
  ],
};

const ROLE_TABS = [
  { id: "overview",   label: "Overview" },
  { id: "interested", label: "Interested", badge: 0 },
  { id: "matches",    label: "Matches",    badge: 118 },
  { id: "shortlist",  label: "Shortlist",  badge: 0 },
  { id: "vacancies",  label: "Vacancies",  badge: 1 },
  { id: "history",    label: "History" },
];

const HEADER_ICONS = [
  "edit", "save", "tag", "share", "menu-vertical",
] as const;

// ── Typography shortcuts ──────────────────────────────────────────────────────

const bodyBold : React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%" };
const body     : React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%" };
const label    : React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%" };
const link     : React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-primary-0)", textDecoration: "none" };

// ── Layout helpers ────────────────────────────────────────────────────────────

function Row({ children, gap = 8, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", alignItems: "center", gap, ...style }}>{children}</div>;
}

function Between({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...style }}>{children}</div>;
}

// ── Placeholder (for unbuilt components) ──────────────────────────────────────

function Placeholder({ text, height = 120 }: { text: string; height?: number }) {
  return (
    <Tile tileStyle="default" padding="panel" style={{ height, justifyContent: "center", alignItems: "center" }}>
      <span style={{ fontFamily: "var(--font-family)", fontSize: 12, color: "var(--palette-blue-2)", fontStyle: "italic", textAlign: "center" }}>{text} — not yet built</span>
    </Tile>
  );
}

// ── Shared screen shell ───────────────────────────────────────────────────────

function RoleShell({ children, activeTab, onTabChange }: {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Page navbar={<Navbar activeId="workflow" />} variant="1280">
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", paddingBottom: 32 }}>

          {/* Breadcrumbs + H1 + icon actions */}
          <div>
            <PageHeader
              breadcrumbs={breadcrumbs}
              title="Role: Matches - Ordering"
              wfState={roleSubtitle.wfState}
              subtitleItems={roleSubtitle.subtitleItems}
            />
            {/* Icon actions overlay — positioned top-right relative to page */}
            <div style={{ position: "absolute", top: 24, right: 24, display: "flex", gap: 4 }}>
              {HEADER_ICONS.map(icon => (
                <Button key={icon} kind="icon" size="regular" title={icon}>
                  <Icon name={icon} size={16} />
                </Button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Navigation
            orientation="horizontal"
            tabs={ROLE_TABS}
            activeId={activeTab}
            onChange={onTabChange}
          />

          {children}
        </div>
      </Page>
    </div>
  );
}

// ── Activity sidebar ──────────────────────────────────────────────────────────
// Used in Overview, Vacancies, History.
// Tile object-dark + panel padding — the three sections (Participants /
// Resourcing Dates / Creator) separated by Dividers.

// ActivitySidebar — each section is its own Tile object-dark panel.
// The outer wrapper has background=neutral-0 (#CFDAF7) and gap=1px,
// which shows through as a hairline divider between tiles — no Divider component needed.
// ActivitySidebar — one Tile selected + content padding (16px)
// with Divider between sections, matching the screenshot exactly.
function ActivitySidebar() {
  return (
    <Tile tileStyle="selected" padding="content" style={{ width: 296, flexShrink: 0 }}>

      {/* Participants */}
      <Between>
        <span style={bodyBold}>Participants</span>
        <Icon name="add" size={16} />
      </Between>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Between>
          <span style={label}>Owners</span>
          <Row gap={4}>
            <Avatar initials="SH" size="small" />
            <Avatar initials="AD" size="small" />
          </Row>
        </Between>
        <Between>
          <span style={label}>Assignee</span>
          <Avatar initials="AD" size="small" />
        </Between>
      </div>

      <Divider orientation="horizontal" />

      {/* Resourcing Dates */}
      <span style={bodyBold}>Resourcing Dates</span>
      <Row gap={24} style={{ alignItems: "flex-start" }}>
        <div>
          <div style={label}>Time left</div>
          <div style={bodyBold}>27 days</div>
        </div>
        <div>
          <div style={label}>Date created</div>
          <div style={bodyBold}>25-09-2026</div>
        </div>
      </Row>

      <Divider orientation="horizontal" />

      <Between>
        <span style={bodyBold}>Vacancies</span>
        <span style={label}>1 / 1 open</span>
      </Between>

      <Divider orientation="horizontal" />

      <Between>
        <span style={bodyBold}>Privacy</span>
        <Row gap={4}>
          <span style={label}>Public</span>
          <Icon name="info" size={14} />
        </Row>
      </Between>

      <Divider orientation="horizontal" />

      {/* Creator */}
      <span style={bodyBold}>Creator</span>
      <WorkforceMember variant="small-1line" name="Spencer Harmon" initials="SH" />

    </Tile>
  );
}

// ── Overview tab ──────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      <ActivitySidebar />

      {/* Right — individual Tile per section, highlight + content padding */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

        <Tile tileStyle="highlight" padding="content">
          <Header size="content" title="Description" />
          <p style={{ ...body, color: "var(--palette-blue-2)" }}>test</p>
        </Tile>

        <Tile tileStyle="highlight" padding="content">
          <Header size="content" title="Match attributes" />
          <div style={label}>Skills</div>
          <Row gap={6}>
            {[1,2,3].map(i => (
              <span key={i} style={{ width: 12, height: 4, borderRadius: 2, background: i <= 1 ? "var(--palette-blue-0)" : "var(--palette-neutral-0)", display: "inline-block" }} />
            ))}
            <span style={body}>Ruby (Programming Language)</span>
          </Row>
        </Tile>

        <Tile tileStyle="highlight" padding="content">
          <Header size="content" title="Availability" />
          <div style={body}>28-09-2026 - 11-10-2026</div>
          <div style={label}>(M: 8, T: 8, W: 8, T: 6.5, F: 7.5, S: 0, S: 0)</div>
          <div style={label}>matching at least 40%</div>
        </Tile>

        {/* Chats — panel padding, no internal header chrome */}
        <Tile tileStyle="highlight" padding="panel">
          <Accordion title="Chats (0)" size="body" defaultExpanded={false}>
            <div style={{ padding: "8px 0", ...label }}>No chats yet.</div>
          </Accordion>
        </Tile>

        <Tile tileStyle="highlight" padding="content">
          <Header size="content" title="Show Interest Questions" />
          {[
            { n: 1, q: "Are you working for ProFinda?" },
            { n: 2, q: "Do you have automation testing experience (Ruby, Ruby on Rails or Javascript)?" },
            { n: 3, q: "Do you have more than 5 years of experience on a similar role?" },
          ].map(({ n, q }) => (
            <div key={n}>
              <div style={bodyBold}>Question {n}</div>
              <div style={body}>{q}</div>
            </div>
          ))}
        </Tile>
      </div>
    </div>
  );
}

// ── Match card ────────────────────────────────────────────────────────────────

// ── Shared skill groups (used in both Matches and Shortlist) ─────────────────

const RUBY_SKILLS: SkillGroup[] = [
  {
    label: "Essential skills",
    count: "1/1",
    skills: [{ name: "Ruby (Programming Language)", requiredProficiency: "intermediate", profileProficiency: "advanced" }],
  },
];

const RUBY_SKILLS_EXPANDED: SkillGroup[] = [
  {
    label: "Supporting skills",
    count: "2/3",
    skills: [
      { name: "Ruby on Rails",  requiredProficiency: "basic",        profileProficiency: "intermediate" },
      { name: "RSpec",          requiredProficiency: "basic",        profileProficiency: "basic" },
      { name: "JavaScript",     requiredProficiency: "intermediate", profileProficiency: undefined, missing: true },
    ],
  },
];

// ── Match data ────────────────────────────────────────────────────────────────

type MatchEntry = { name: string; initials: string; title: string; match: number; avail: number };

const MATCHES: MatchEntry[] = [
  { name: "Sharanya Ramesh -1qa", initials: "SR", title: "Integrations Developer",             match: 74, avail: 100 },
  { name: "Orval Denesik",        initials: "OD", title: "Internal Auditor, Analyst",          match: 73, avail: 100 },
  { name: "Radek Wojnarowski",    initials: "RW", title: "Home Office Business Analyst",       match: 73, avail: 100 },
  { name: "Manuel Lopez+1",       initials: "ML", title: "QA Engineer, English, Spanish",      match: 72, avail: 100 },
  { name: "Manuel Lopez",         initials: "ML", title: "QA Engineer, Consultant",            match: 72, avail: 60  },
  { name: "John Doe",             initials: "JD", title: "Software Engineer, English",         match: 72, avail: 100 },
  { name: "Spencer Harmon",       initials: "SH", title: "Business Process Manager/Team Lead", match: 71, avail: 60  },
  { name: "Frank Sinatra",        initials: "FS", title: "Senior Ruby Developer, Operations",  match: 70, avail: 100 },
];

// ── Matches tab ───────────────────────────────────────────────────────────────

function MatchesTab() {
  const [avail, setAvail] = useState(40);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

      {/* Left filter sidebar — two Tile selected content blocks */}
      <div style={{ width: 296, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Top block — Role details / Matches distribution / Match attributes
            Tile selected + content (16px), Divider between each accordion */}
        <Tile tileStyle="selected" padding="content">
          <Accordion title="Role details" size="body" defaultExpanded={false} />
          <Divider orientation="horizontal" />
          <Accordion title="Matches distribution" size="body" defaultExpanded={false}>
            <Row gap={6} style={{ padding: "4px 0" }}>
              <Icon name="profile" size={14} />
              <span style={body}>132</span>
              <Icon name="info" size={14} />
            </Row>
          </Accordion>
          <Divider orientation="horizontal" />
          <Accordion title="Match attributes" size="body" defaultExpanded={false} />
        </Tile>

        {/* Bottom block — Filters: white background = highlight */}
        <Tile tileStyle="highlight" padding="content">
          <Between>
            <span style={bodyBold}>Filters</span>
            <Row gap={6}>
              <span style={label}>Auto refresh</span>
              <div
                onClick={() => setAutoRefresh(v => !v)}
                style={{ width: 32, height: 18, borderRadius: 9, background: autoRefresh ? "var(--palette-primary-0)" : "var(--palette-neutral-0)", position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
              >
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "white", position: "absolute", right: autoRefresh ? 2 : undefined, left: autoRefresh ? undefined : 2, top: 2, transition: "left 0.2s, right 0.2s" }} />
              </div>
            </Row>
          </Between>

          <Accordion title="Availability" size="body" defaultExpanded>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "4px 0" }}>
              <div style={label}>Daily availability requirement by (at least):</div>
              <Row gap={6}>
                <input value={avail} onChange={e => setAvail(Number(e.target.value))} style={{ width: 44, height: 28, border: "1px solid var(--palette-neutral-0)", borderRadius: 4, padding: "0 6px", fontFamily: "var(--font-family)", fontSize: 13 }} />
                <span style={label}>%</span>
                <SliderNumber value={avail} onChange={setAvail} min={0} max={100} />
              </Row>
              {/* Warning — default (neutral-2) for contrast against white parent */}
              <Tile tileStyle="default" padding="panel">
                <Row gap={6} style={{ alignItems: "flex-start" }}>
                  <Icon name="warning" size={14} />
                  <span style={{ ...label, color: "var(--palette-orange-1)" }}>
                    Adjusting the percentage too low may result in too many matches.
                  </span>
                </Row>
              </Tile>
              <div style={label}>28-09-2026 - 11-10-2026</div>
              <div style={label}>(M: 8, T: 8, W: 8, T: 6.5, F: 7.5, S: 0, S: 0)</div>
              <div style={label}>matching at least {avail}%</div>
              <a href="#" style={link}>Edit availability requirements</a>
            </div>
          </Accordion>

          <Divider orientation="horizontal" />
          <Accordion title="Activity filters" size="body" defaultExpanded={false} />
          <Divider orientation="horizontal" />
          <Accordion title="More filters" size="body" defaultExpanded={false}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "4px 0" }}>
              <div style={label}>Your attitude</div>
              {["Negative","Positive"].map(opt => (
                <Row key={opt} gap={8}>
                  <input type="radio" name="attitude" style={{ accentColor: "var(--palette-primary-0)" }} />
                  <span style={body}>{opt}</span>
                </Row>
              ))}
              <Divider orientation="horizontal" />
              <div style={label}>Day Rate</div>
              <SliderNumber value={260} onChange={() => {}} min={20} max={500} />
              <div style={label}>Min 20 - Max 500</div>
              <Divider orientation="horizontal" />
              <div style={label}>Business Unit</div>
              {["Accounting","Automobile","BU1","BU2","Dadwa"].map(bu => (
                <Row key={bu} gap={8}>
                  <input type="checkbox" style={{ accentColor: "var(--palette-primary-0)" }} />
                  <span style={body}>{bu}</span>
                </Row>
              ))}
            </div>
          </Accordion>

          {/* Cancel only shown when auto-refresh is OFF */}
          {!autoRefresh && (
            <Button kind="secondary" size="regular">Cancel</Button>
          )}
        </Tile>
      </div>

      {/* Right — search bar + match cards */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
        <Row gap={8} style={{ marginBottom: 4 }}>
          <div style={{ width: 220 }}>
            <InputSearch value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, height: 36, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 10px", background: "white", cursor: "pointer" }}>
            <span style={body}>Skills &amp; Attrs</span>
            <Icon name="chevron-down" size={14} />
          </div>
          <span style={{ ...label, marginLeft: 4 }}>1 - {MATCHES.length} of 118 matches</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
            {(["list","menu-horizontal","save","refresh"] as const).map(icon => (
              <Button key={icon} kind="icon" size="regular" title={icon}>
                <Icon name={icon} size={14} />
              </Button>
            ))}
          </div>
        </Row>
        {MATCHES.filter(m => m.name.toLowerCase().includes(search.toLowerCase())).map(m => (
          <Card
            key={m.name}
            variant="match"
            name={m.name}
            initials={m.initials}
            jobTitle={m.title}
            matchPercent={m.match}
            availabilityPercent={m.avail}
            skillGroups={RUBY_SKILLS}
            expandedSkillGroups={RUBY_SKILLS_EXPANDED}
            actions={{
              step: "not-shortlisted",
              onShortlist: () => {},
              onFillBook: () => {},
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Vacancies tab ─────────────────────────────────────────────────────────────

function VacanciesTab() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      <ActivitySidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
        <Between>
          <span style={label}>1 vacancy</span>
          <Button kind="secondary" size="regular">Close Vacancies</Button>
        </Between>
        {/* Vacancy card — highlight + content padding */}
        <Tile tileStyle="highlight" padding="content">
          <span style={bodyBold}>Vacancy #1</span>
          <div style={{ ...label, marginBottom: 4 }}>Reason to close</div>
          {/* Dropdown input */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 40, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 12px", background: "white", cursor: "pointer" }}>
            <span style={{ ...body, color: "var(--palette-blue-2)" }}></span>
            <Icon name="chevron-down" size={16} />
          </div>
        </Tile>
      </div>
    </div>
  );
}

// ── History tab ───────────────────────────────────────────────────────────────

type HistoryEntry = {
  actor: string; actorEmail: string; actorInitials: string; action: string;
  detail?: string; subject?: string; subjectInitials?: string; subjectEmail?: string;
  skillChange?: boolean;
};

const HISTORY: HistoryEntry[] = [
  { actor: "Spencer Harmon", actorEmail: "admin@example.net",              actorInitials: "SH", action: "Created owner, 25-09-2026, 14:39",   detail: "Owner created",    subject: "Alexandra Jane Doe D", subjectInitials: "AD", subjectEmail: "alexandra.poane+500@profinda.com" },
  { actor: "Spencer Harmon", actorEmail: "admin@example.net",              actorInitials: "SH", action: "Created assignee, 25-09-2026, 14:39", detail: "Assignee created", subject: "Alexandra Jane Doe D", subjectInitials: "AD", subjectEmail: "alexandra.poane+500@profinda.com" },
  { actor: "Spencer Harmon", actorEmail: "admin@example.net",              actorInitials: "SH", action: "Created owner, 25-09-2026, 14:39",   detail: "Owner created",    subject: "Spencer Harmon",       subjectInitials: "SH", subjectEmail: "admin@example.net" },
  { actor: "Spencer Harmon", actorEmail: "admin@example.net",              actorInitials: "SH", action: "Created activity, 25-09-2026, 14:39", detail: "Activity created", subject: "Spencer Harmon",       subjectInitials: "SH", subjectEmail: "admin@example.net" },
  { actor: "Spencer Harmon", actorEmail: "admin@example.net",              actorInitials: "SH", action: "Edited activity, 25-09-2026, 14:39",  detail: "Skills",           skillChange: true },
];

function HistoryTab() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

      {/* Left — white background = highlight, content padding */}
      <Tile tileStyle="highlight" padding="content" style={{ width: 296, flexShrink: 0 }}>
        <Accordion title="Filters" size="body" defaultExpanded>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "4px 0" }}>
            {[
              { lbl: "Initiator",      icon: "chevron-down" as const },
              { lbl: "Event type",     icon: "chevron-down" as const },
              { lbl: "Created after",  icon: "calendar" as const },
              { lbl: "Created before", icon: "calendar" as const },
            ].map(f => (
              <div key={f.lbl}>
                <div style={{ ...label, marginBottom: 4 }}>{f.lbl}</div>
                <div style={{ height: 36, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", background: "white" }}>
                  <span />
                  <Icon name={f.icon} size={14} />
                </div>
              </div>
            ))}
          </div>
        </Accordion>
      </Tile>

      {/* Right — activity feed */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
        {/* Latest dropdown */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 12px", border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", background: "white", cursor: "pointer", alignSelf: "flex-start" }}>
          <span style={body}>Latest</span>
          <Icon name="chevron-down" size={14} />
        </div>

        {HISTORY.map((entry, i) => (
          // Each entry — highlight tile, content padding
          <Tile key={i} tileStyle="highlight" padding="content">
            <Between>
              <WorkforceMember variant="small-2lines" name={entry.actor} initials={entry.actorInitials} email={entry.actorEmail} />
              <span style={label}>{entry.action}</span>
            </Between>
            {entry.detail && <div style={label}>{entry.detail}</div>}
            {entry.subject && (
              <WorkforceMember variant="small-2lines" name={entry.subject} initials={entry.subjectInitials!} email={entry.subjectEmail} />
            )}
            {entry.skillChange && (
              // Nested tile — default + panel padding for the change detail block
              <Tile tileStyle="default" padding="panel">
                <div style={{ ...label, marginBottom: 6 }}>After</div>
                <Row gap={8}>
                  <PillSimple label="Essential" size="small" bg="var(--palette-neutral-1)" />
                  {[1,2,3].map(j => (
                    <span key={j} style={{ width: 12, height: 4, borderRadius: 2, background: j <= 1 ? "var(--palette-blue-0)" : "var(--palette-neutral-0)", display: "inline-block" }} />
                  ))}
                  <span style={body}>Ruby (Programming Language)</span>
                  <PillSimple label="Added" size="small" bg="var(--palette-green-2)" color="var(--palette-green-0)" />
                </Row>
              </Tile>
            )}
          </Tile>
        ))}
      </div>
    </div>
  );
}

// ── Shortlist tab ─────────────────────────────────────────────────────────────

type ShortlistEntry = {
  id: string;
  name: string; initials: string; title: string; addedBy: string;
  match: number; avail: number;
};

const SHORTLIST: ShortlistEntry[] = [
  { id: "s1", name: "Sharanya Ramesh -1qa", initials: "SR", title: "Integrations Developer",      addedBy: "Spencer Harmon", match: 74, avail: 100 },
  { id: "s2", name: "Jane Doe",             initials: "JD", title: "QA Engineer, English, Spanish", addedBy: "Spencer Harmon", match: 71, avail: 93  },
  { id: "s3", name: "Alexandra Danish",     initials: "AD", title: "Sales Intern",                 addedBy: "Spencer Harmon", match: 71, avail: 93  },
];

// IPS Card handles expand/collapse, Approve/Reject via ResourcingStep prop.
// step mapping: "shortlisted" → "shortlisted-reviewer", "approved"/"rejected" → shown via revert
type CardStatus = "shortlisted" | "approved" | "rejected";

function shortlistStep(status: CardStatus): import("../../components/card/card").ResourcingStep {
  if (status === "approved") return "booked";
  if (status === "rejected") return "declined";
  return "shortlisted-reviewer";
}

function ShortlistTab() {
  const [statuses, setStatuses] = useState<Record<string, CardStatus>>(
    Object.fromEntries(SHORTLIST.map(e => [e.id, "shortlisted"]))
  );
  const [search, setSearch]           = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const setStatus = (id: string, s: CardStatus) =>
    setStatuses(prev => ({ ...prev, [id]: s }));

  const filtered = SHORTLIST.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

      {/* ── Left sidebar ────────────────────────────────────────────────── */}
      <div style={{ width: 296, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Role details + Match attributes */}
        <Tile tileStyle="selected" padding="content">
          <Accordion title="Role details"      size="body" defaultExpanded={false} />
          <Divider orientation="horizontal" />
          <Accordion title="Match attributes"  size="body" defaultExpanded={false}>
            <Row gap={6} style={{ padding: "4px 0" }}>
              <Icon name="profile" size={14} />
              <span style={body}>132</span>
              <Icon name="info" size={14} />
            </Row>
          </Accordion>
        </Tile>

        {/* Review module */}
        <Tile tileStyle="highlight" padding="content">
          <Between>
            <span style={bodyBold}>Review:</span>
            <Button kind="link" size="small">Add Reviewer</Button>
          </Between>
          <div style={{ display: "flex", gap: 4, margin: "4px 0 8px" }}>
            <Avatar initials="RV" size="small" />
          </div>
          <Button kind="primary" size="regular" style={{ width: "100%" }}>
            Set review deadline
          </Button>
        </Tile>

        {/* Filters */}
        <Tile tileStyle="highlight" padding="content">
          <Between>
            <span style={bodyBold}>Filters</span>
            <Row gap={6}>
              <span style={label}>Auto refresh</span>
              <div
                onClick={() => setAutoRefresh(v => !v)}
                style={{ width: 32, height: 18, borderRadius: 9, background: autoRefresh ? "var(--palette-primary-0)" : "var(--palette-neutral-0)", position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
              >
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "white", position: "absolute", right: autoRefresh ? 2 : undefined, left: autoRefresh ? undefined : 2, top: 2, transition: "left 0.2s, right 0.2s" }} />
              </div>
            </Row>
          </Between>

          <Accordion title="Shortlist filters" size="body" defaultExpanded>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "8px 0" }}>

              <div>
                <div style={{ ...label, marginBottom: 4 }}>Main Position Start Date</div>
                <div style={{ height: 36, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", background: "white" }}>
                  <span /><Icon name="calendar" size={14} />
                </div>
              </div>

              <div>
                <div style={{ ...label, marginBottom: 4 }}>Skills</div>
                <div style={{ height: 36, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", background: "white" }}>
                  <span /><Icon name="chevron-down" size={14} />
                </div>
              </div>

              {[
                { lbl: "Business Unit",  opts: ["Accounting", "Automobile", "BU1", "BU2", "Dadwa"] },
                { lbl: "Grade",          opts: ["123", "Analyst", "Consultant", "CTO", "Director"] },
                { lbl: "Talent Pool",    opts: ["Admin's pool", "Manager's pool", "Workforce pool"] },
                { lbl: "Clients",        opts: ["A", "AEG"] },
              ].map(({ lbl, opts }) => (
                <div key={lbl}>
                  <div style={{ ...label, marginBottom: 6 }}>{lbl}</div>
                  {opts.map(opt => (
                    <Row key={opt} gap={8} style={{ marginBottom: 6 }}>
                      <input type="checkbox" style={{ accentColor: "var(--palette-primary-0)", flexShrink: 0 }} />
                      <span style={body}>{opt}</span>
                    </Row>
                  ))}
                  {opts.length >= 4 && (
                    <Button kind="link" size="small">Show more</Button>
                  )}
                </div>
              ))}
            </div>
          </Accordion>

          {!autoRefresh && <Button kind="secondary" size="regular">Cancel</Button>}
        </Tile>
      </div>

      {/* ── Right: toolbar + cards ───────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>

        <Row gap={8} style={{ marginBottom: 4 }}>
          {/* Search */}
          <div style={{ width: 220 }}>
            <InputSearch value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
          </div>

          {/* Skills & Attrs — body-selected + sort icon */}
          <button style={{ display: "flex", alignItems: "center", gap: 6, height: 36, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 10px", background: "white", cursor: "pointer", fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)" }}>
            <Icon name="sort" size={14} />
            Skills &amp; Attrs
          </button>

          {/* Count */}
          <span style={{ ...label, whiteSpace: "nowrap" }}>{filtered.length} shortlists</span>

          {/* Right actions */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>

            {/* View toggle — note (selected) and list */}
            <div style={{ display: "flex", border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              {([
                { id: "note", icon: "note",  active: true  },
                { id: "list", icon: "list",  active: false },
              ] as { id: string; icon: string; active: boolean }[]).map(({ id, icon, active }) => (
                <button key={id} title={id} style={{ width: 32, height: 32, border: "none", borderLeft: id !== "note" ? "1px solid var(--palette-neutral-0)" : "none", background: active ? "var(--palette-blue-1)" : "white", color: active ? "white" : "var(--palette-blue-2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Icon name={icon as Parameters<typeof Icon>[0]["name"]} size={14} />
                </button>
              ))}
            </div>

            {/* Icon buttons */}
            <Button kind="icon" size="regular" title="Compare">
              <Icon name="compare" size={14} />
            </Button>
            <Button kind="icon" size="regular" title="Add profile">
              <Icon name="add-profile" size={14} />
            </Button>
            <Button kind="icon" size="regular" title="Remove all">
              <Icon name="remove-all" size={14} />
            </Button>
            <Button kind="icon" size="regular" title="Refresh">
              <Icon name="refresh" size={14} />
            </Button>
          </div>
        </Row>

        {filtered.map(entry => (
          <Card
            key={entry.id}
            variant="match"
            name={entry.name}
            initials={entry.initials}
            jobTitle={entry.title}
            matchPercent={entry.match}
            availabilityPercent={entry.avail}
            skillGroups={RUBY_SKILLS}
            expandedSkillGroups={RUBY_SKILLS_EXPANDED}
            actions={{
              step: shortlistStep(statuses[entry.id]),
              onApprove: () => setStatus(entry.id, "approved"),
              onReject:  () => setStatus(entry.id, "rejected"),
              onRevert:  () => setStatus(entry.id, "shortlisted"),
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Meta + stories ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Screens/Role",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Role screen — 5 tabs fully implemented using IPS Tile containers with the padding system. " +
          "Shortlist tab: match cards with Approve/Reject actions, Review module, filter sidebar. " +
          "⚠️ Interested tab pending.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ── Tabbed story (single interactive story, switch tabs inline) ────────────────

export const Overview: Story = {
  name: "Overview",
  render: () => {
    const [tab, setTab] = useState("overview");
    return (
      <RoleShell activeTab={tab} onTabChange={setTab}>
        {tab === "overview"  && <OverviewTab />}
        {tab === "matches"   && <MatchesTab />}
        {tab === "vacancies" && <VacanciesTab />}
        {tab === "history"   && <HistoryTab />}
        {tab === "shortlist"  && <ShortlistTab />}
        {tab === "interested" && (
          <Tile tileStyle="highlight" padding="content" style={{ textAlign: "center" }}>
            <div style={{ ...label, padding: "32px 0" }}>Interested — not yet built</div>
          </Tile>
        )}
      </RoleShell>
    );
  },
};

// Keep individual tab stories for direct linking

export const Matches: Story = {
  name: "Matches",
  render: () => {
    const [tab, setTab] = useState("matches");
    return <RoleShell activeTab={tab} onTabChange={setTab}><MatchesTab /></RoleShell>;
  },
};

export const Vacancies: Story = {
  name: "Vacancies",
  render: () => {
    const [tab, setTab] = useState("vacancies");
    return <RoleShell activeTab={tab} onTabChange={setTab}><VacanciesTab /></RoleShell>;
  },
};

export const History: Story = {
  name: "History",
  render: () => {
    const [tab, setTab] = useState("history");
    return <RoleShell activeTab={tab} onTabChange={setTab}><HistoryTab /></RoleShell>;
  },
};

export const Shortlist: Story = {
  name: "Shortlist",
  render: () => {
    const [tab, setTab] = useState("shortlist");
    return <RoleShell activeTab={tab} onTabChange={setTab}><ShortlistTab /></RoleShell>;
  },
};
