// Screens/MyProfile — three-column profile screen
//
// Container mapping (RULE 2b):
//   Left sidebar (~220px):    Tile selected content — avatar, progress, bio, nav
//   Centre main (flex-1):    plain flex column, each section = Tile highlight content
//   Right sidebar (~300px):  two Tile highlight content blocks (Org Data + Availability)
//
// Components used:
//   Navbar, Tile, Divider, Icon, Button, Avatar, ProgressLinear,
//   Navigation (vertical), Checkbox, SkillProfile, InputSearch

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Navbar }         from "../../components/navbar/navbar";
import { Page }           from "../../components/layout/layout";
import { Tile }           from "../../components/tile/tile";
import { Divider }        from "../../components/divider/divider";
import { Icon }           from "../../components/icon/icon";
import { Button }         from "../../components/button/button";
import { Avatar }         from "../../components/avatar/avatar";
import { ProgressLinear } from "../../components/progress_bar/progress_bar";
import { Navigation }     from "../../components/navigation/navigation";
import { Checkbox }       from "../../components/checkbox/checkbox";
import { SkillProfile }   from "../../components/skill/skill";
import { InputSearch }    from "../../components/input/input";

// ── Typography helpers ────────────────────────────────────────────────────────

const bodyBold: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%" };
const body:     React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%" };
const labelCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%" };
const linkCss:  React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-primary-0)" };
const h2:       React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 20, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%" };
const h3:       React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 20, fontWeight: 600, color: "var(--palette-blue-0)", lineHeight: "125%" };

function Row({ children, gap = 8, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", alignItems: "center", gap, ...style }}>{children}</div>;
}
function SB({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...style }}>{children}</div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LEFT SIDEBAR — Tile selected content
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const NAV_SECTIONS = [
  { id: "summary",        label: "Summary"        },
  { id: "experience",     label: "Experience"     },
  { id: "accomplishments",label: "Accomplishments"},
  { id: "additional",     label: "Additional"     },
];

const ADDITIONAL_ITEMS = [
  "Birthday", "Languages", "Industry knowledge", "Qualifications",
  "Capability", "Technical Overlay", "FSA Tag Present", "Budget", "Team", "Interested in",
];

function ProfileSidebar({ activeNav, onNavChange }: { activeNav: string; onNavChange: (id: string) => void }) {
  return (
    <Tile tileStyle="highlight" padding="content" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Avatar + action buttons */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", background: "var(--palette-neutral-0)", flexShrink: 0 }}>
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #6B8DD6 0%, #9B59B6 50%, #E67E22 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-family)", fontSize: 36, fontWeight: 700, color: "white" }}>SH</span>
          </div>
        </div>
        <Row gap={4}>
          <Button kind="iconTertiary" size="regular" title="Edit"><Icon name="edit" size={16} /></Button>
          <Button kind="iconTertiary" size="regular" title="More"><Icon name="menu-vertical" size={16} /></Button>
        </Row>
      </div>

      {/* Name */}
      <div style={{ textAlign: "center" }}>
        <div style={h2}>Spencer Harmon</div>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ ...labelCss, color: "var(--palette-primary-0)", fontWeight: 600 }}>Profile 90% Complete</div>
        <ProgressLinear value={90} />
      </div>

      {/* Bio */}
      <div style={{ ...body, fontSize: 12, color: "var(--palette-blue-2)" }}>
        Jestem wykwalifikowanym pracownikiem działu IT z doświadczeniem w projektach międzynarodowych.
      </div>

      {/* Last updated */}
      <div style={labelCss}>Last updated: 28-09-2026</div>

      <Divider orientation="horizontal" style={{ margin: "0 -16px" }} />

      {/* Contact */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={labelCss}>Contact Spencer</div>
        <Row gap={12}>
          {(["mail", "chat", "links", "marketplace", "link"] as const).map(icon => (
            <button key={icon} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "var(--palette-blue-2)", display: "flex" }}>
              <Icon name={icon} size={16} />
            </button>
          ))}
        </Row>
      </div>

      <Divider orientation="horizontal" style={{ margin: "0 -16px" }} />

      {/* Vertical navigation */}
      <Navigation
        orientation="vertical"
        tabs={NAV_SECTIONS}
        activeId={activeNav}
        onChange={onNavChange}
      />

      {/* Additional sub-items (shown when Additional is active) */}
      {activeNav === "additional" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingLeft: 8 }}>
          {ADDITIONAL_ITEMS.map(item => (
            <div key={item} style={{ ...labelCss, padding: "4px 8px", cursor: "pointer" }}>
              — {item}
            </div>
          ))}
        </div>
      )}

    </Tile>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENTRE — Skills section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SKILL_TABS = [
  { id: "proficiency", label: "By proficiency" },
  { id: "framework",   label: "By framework"   },
  { id: "category",    label: "By category"    },
  { id: "ungrouped",   label: "Ungrouped"      },
];

type SkillEntry = {
  label: string;
  proficiency: "basic" | "intermediate" | "advanced";
  date?: string;
  addable?: boolean;
  core?: boolean;
  verified?: boolean;
  verifiedCredy?: boolean;
};

const SKILLS_UNGROUPED: SkillEntry[] = [
  { label: "Computer Literate",                         proficiency: "basic",        addable: true  },
  { label: "Ruby Gems and Libraries",                   proficiency: "basic",        addable: true  },
  { label: "RubyMine",                                  proficiency: "basic",        addable: true  },
  { label: "Web Development with Ruby on Rails",        proficiency: "basic",        addable: true  },
  { label: "Web Frameworks (e.g., Ruby on Rails)",      proficiency: "basic",        addable: true  },
  { label: "Ramaze (Free Software Programmed In Ruby)", proficiency: "intermediate", date: "01-04-2025", verified: true },
  { label: "Ruby (Programming Language)",               proficiency: "intermediate", date: "01-04-2025", core: true, verifiedCredy: true, verified: true },
  { label: "Ruby Syntax and Language Fundamentals",     proficiency: "intermediate", date: "03-05-2026", verified: true },
  { label: "Ruby Version Management",                   proficiency: "intermediate", date: "01-04-2025", verifiedCredy: true },
  { label: "Ruby on Rails",                             proficiency: "intermediate", date: "01-04-2025", verified: true },
  { label: "Ruby on Rails Framework",                   proficiency: "intermediate", date: "01-04-2025", verified: true },
  { label: "Ruby on legs",                              proficiency: "intermediate", date: "03-05-2026", verified: true },
  { label: "Ruby: Ruby On Rails",                       proficiency: "intermediate", date: "18-09-2025", verified: true },
  { label: "Web Developer (Ruby/Rails/JS)",              proficiency: "intermediate", date: "01-04-2025", verified: true },
  { label: "Web Development Frameworks (e.g., Ruby on Rails)", proficiency: "intermediate", date: "21-09-2025", verified: true },
];

const SKILLS_GROUPED: { group: string; total: number; added: number; skills: SkillEntry[] }[] = [
  { group: "251030_SecondaryTest", total: 15, added: 10, skills: SKILLS_UNGROUPED.slice(5) },
  { group: "Multilanguage President", total: 1, added: 1, skills: [] },
];

function SkillRow({ skill }: { skill: SkillEntry }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid var(--palette-neutral-0)" }}>
      <Checkbox onChange={() => {}} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <SkillProfile
          label={skill.label}
          proficiency={skill.proficiency}
          core={skill.core}
          verified={skill.verified}
          verifiedCredy={skill.verifiedCredy}
        />
      </div>
      {skill.addable
        ? <Button kind="primary" size="small">Add</Button>
        : <span style={labelCss}>{skill.date}</span>
      }
    </div>
  );
}

function SkillsSection() {
  const [activeTab, setActiveTab] = useState("framework");
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggleGroup = (g: string) => {
    setCollapsed(prev => { const n = new Set(prev); if (n.has(g)) n.delete(g); else n.add(g); return n; });
  };

  return (
    <Tile tileStyle="highlight" padding="content">
      {/* Header */}
      <SB style={{ marginBottom: 12 }}>
        <span style={h3}>Skills (518)</span>
        <Row gap={8}>
          <div style={{ width: 200 }}>
            <InputSearch value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
          </div>
          <Button kind="primary" size="regular" title="Add skill"><Icon name="add" size={16} /></Button>
        </Row>
      </SB>

      {/* Tabs */}
      <Navigation orientation="horizontal" tabs={SKILL_TABS} activeId={activeTab} onChange={setActiveTab} />

      <div style={{ marginTop: 16 }} />

      {/* Grouped skill list */}
      {SKILLS_GROUPED.map(group => (
        <div key={group.group} style={{ marginBottom: 16 }}>
          <button onClick={() => toggleGroup(group.group)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "4px 0", marginBottom: 8, width: "100%" }}>
            <Icon name={collapsed.has(group.group) ? "chevron-right" : "chevron-down"} size={14} style={{ color: "var(--palette-blue-2)" }} />
            <span style={bodyBold}>{group.group} ({group.added}/{group.total})</span>
          </button>

          {!collapsed.has(group.group) && (
            <>
              {/* Sub-header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid var(--palette-neutral-0)" }}>
                <Checkbox onChange={() => {}} />
                <Row gap={4} style={{ flex: 1 }}>
                  <span style={labelCss}>Skill</span>
                  <Icon name="sort" size={14} style={{ color: "var(--palette-neutral-3)" }} />
                </Row>
                <Row gap={4}>
                  <span style={labelCss}>Added</span>
                  <Icon name="sort" size={14} style={{ color: "var(--palette-neutral-3)" }} />
                </Row>
              </div>
              {group.skills.map(skill => <SkillRow key={skill.label} skill={skill} />)}
            </>
          )}
        </div>
      ))}
    </Tile>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENTRE — Skills Groups section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type GroupSkillEntry = { label: string; proficiency: "basic" | "intermediate" | "advanced"; core?: boolean; verified?: boolean; verifiedCredy?: boolean };

const SKILL_GROUP_DATA: { title: string; skills: GroupSkillEntry[] }[] = [
  {
    title: "Core Skills",
    skills: [
      { label: "A Cappella Sin...",    proficiency: "advanced",     core: true, verified: true },
      { label: "C++14",               proficiency: "intermediate",  core: true },
      { label: "CFOs",                proficiency: "intermediate",  verifiedCredy: true },
      { label: "Java",                proficiency: "basic",         core: true },
      { label: "Ruby (Progr...",      proficiency: "intermediate",  core: true, verified: true },
    ],
  },
  {
    title: "Developmental Skills",
    skills: [
      { label: "CFOs",                proficiency: "intermediate",  verifiedCredy: true },
      { label: "Ruby (Progr...",      proficiency: "intermediate",  verifiedCredy: true, verified: true },
      { label: "A&D",                 proficiency: "intermediate"  },
      { label: "Blitz BASIC (Obje...",proficiency: "intermediate",  verifiedCredy: true },
      { label: "C (Programming La...",proficiency: "intermediate",  verifiedCredy: true },
      { label: "Microsoft Dynamic...",proficiency: "advanced",      verifiedCredy: true },
    ],
  },
];

function SkillGroupsSection() {
  return (
    <Tile tileStyle="highlight" padding="content">
      <SB style={{ marginBottom: 16 }}>
        <span style={h3}>Skills Groups</span>
        <Row gap={4}>
          <Button kind="iconTertiary" size="regular" title="Previous"><Icon name="chevron-left" size={16} /></Button>
          <Button kind="iconTertiary" size="regular" title="Next"><Icon name="chevron-right" size={16} /></Button>
        </Row>
      </SB>
      <div style={{ display: "flex", gap: 16 }}>
        {SKILL_GROUP_DATA.map(group => (
          <Tile key={group.title} tileStyle="default" padding="content" style={{ flex: 1 }}>
            <Row gap={6} style={{ marginBottom: 12 }}>
              <span style={bodyBold}>{group.title}</span>
              <Icon name="info" size={14} style={{ color: "var(--palette-blue-2)" }} />
            </Row>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {group.skills.map(skill => (
                <SkillProfile
                  key={skill.label}
                  label={skill.label}
                  proficiency={skill.proficiency}
                  core={skill.core}
                  verified={skill.verified}
                  verifiedCredy={skill.verifiedCredy}
                />
              ))}
            </div>
          </Tile>
        ))}
      </div>
    </Tile>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENTRE — Accreditations section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AccreditationsSection() {
  return (
    <Tile tileStyle="highlight" padding="content">
      <SB style={{ marginBottom: 12 }}>
        <span style={h3}>Accreditations</span>
        <Button kind="iconTertiary" size="regular" title="Edit"><Icon name="edit" size={16} /></Button>
      </SB>
      <div style={body}>Regional (Exp: 14-05-2027)</div>
    </Tile>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RIGHT — Organisation Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ORG_FIELDS = [
  { label: "Job Title",          value: "Business Process Manager/Team Lead", bold: true },
  { label: "Reports to",         value: "Perico Palotes",  link: true },
  { label: "Merge two",          value: "11",              bold: true },
  { label: "Boolean",            value: "-" },
  { label: "Bartosz Test 1",     value: "-" },
  { label: "Company",            value: "ProFinda",        bold: true },
  { label: "Business Unit",      value: "Operations",      bold: true },
  { label: "Department",         value: "Brand Development and Identity", bold: true },
  { label: "Day rate",           value: "500",             bold: true },
  { label: "Talent pool",        value: "Manager's pool",  bold: true },
  { label: "Grade",              value: "President",       bold: true },
  { label: "Service Line Group", value: "Strategy, Tax International", bold: true },
  { label: "Business Line",      value: "WordPress",       bold: true },
  { label: "Cost Centre",        value: "C01122",          bold: true },
  { label: "Accreditations",     value: "Regional",        bold: true },
  { label: "Clients",            value: "Siemens Limited", bold: true },
  { label: "santi custom field", value: "-" },
  { label: "Clearance Rank",     value: "Va2",             bold: true },
  { label: "Location",           value: "Arga, Karwar, Karnataka, India", bold: true },
];

function OrgDataSection() {
  return (
    <Tile tileStyle="highlight" padding="content">
      <SB style={{ marginBottom: 16 }}>
        <span style={h3}>Organisation Data</span>
        <Row gap={8}>
          <Button kind="iconTertiary" size="regular" title="Edit"><Icon name="edit" size={16} /></Button>
          <Button kind="primary" size="regular">Shortlist</Button>
        </Row>
      </SB>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6px 16px" }}>
        {ORG_FIELDS.map(field => (
          <>
            <span key={`l-${field.label}`} style={labelCss}>{field.label}</span>
            <span key={`v-${field.label}`} style={field.link ? linkCss : field.bold ? bodyBold : body}>{field.value}</span>
          </>
        ))}
      </div>
    </Tile>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RIGHT — Availability calendar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CAL_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// Simplified calendar — shows the September 2026 grid from the screenshot
const CAL_WEEKS = [
  ["31", "01", "02", "03", "04", "05", "06"],
  ["07", "08", "09", "10", "11", "12", "13"],
  ["14", "15", "16", "17", "18", "19", "20"],
  ["21", "22", "23", "24", "25", "26", "27"],
  ["28", "29", "30", "01", "02", "03", "04"],
];

// Booking bars (orange) — day index in week, week index
const BOOKINGS: { week: number; startDay: number; endDay: number; label: string }[] = [
  { week: 0, startDay: 2, endDay: 6, label: "Data Quality Project - 153h" },
  { week: 2, startDay: 0, endDay: 6, label: "Compliance Programme - 60h" },
  { week: 3, startDay: 0, endDay: 6, label: "Compliance Programme - 60h" },
  { week: 4, startDay: 0, endDay: 2, label: "Compliance Programme - 60h" },
];

function AvailabilitySection() {
  const [calView, setCalView] = useState<"table" | "list">("table");

  return (
    <Tile tileStyle="highlight" padding="content">
      {/* Header row: label + toggle + expand + link + booking all on one line */}
      <SB style={{ marginBottom: 12 }}>
        <span style={h3}>Availability</span>
        <Row gap={4}>
          {/* Two-icon view toggle: table | list */}
          <div style={{ display: "flex" }}>
            <button
              onClick={() => setCalView("table")}
              title="Calendar view"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 36, height: 36, border: "1px solid var(--palette-neutral-0)",
                borderRight: "none",
                borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
                background: calView === "table" ? "var(--palette-blue-1)" : "white",
                color:      calView === "table" ? "white" : "var(--palette-blue-2)",
                cursor: "pointer",
              }}>
              <Icon name="table" size={16} />
            </button>
            <button
              onClick={() => setCalView("list")}
              title="List view"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 36, height: 36, border: "1px solid var(--palette-neutral-0)",
                borderRadius: "0 var(--radius-md) var(--radius-md) 0",
                background: calView === "list" ? "var(--palette-blue-1)" : "white",
                color:      calView === "list" ? "white" : "var(--palette-blue-2)",
                cursor: "pointer",
              }}>
              <Icon name="list" size={16} />
            </button>
          </div>
          <Button kind="icon" size="regular" title="Expand">
            <Icon name="expand" size={16} />
          </Button>
          <Button kind="icon" size="regular" title="Link">
            <Icon name="link" size={16} />
          </Button>
          <Button kind="icon" size="regular" title="Booking">
            <Icon name="booking" size={16} />
          </Button>
          <Button kind="primary" size="regular">Create Booking</Button>
        </Row>
      </SB>

      {/* Month / Year dropdowns */}
      <Row gap={8} style={{ marginBottom: 12, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ height: 36, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 12px", display: "flex", alignItems: "center", gap: 6, background: "white", cursor: "pointer" }}>
            <span style={body}>September</span>
            <Icon name="chevron-down" size={14} />
          </div>
          <div style={{ height: 36, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 12px", display: "flex", alignItems: "center", gap: 6, background: "white", cursor: "pointer" }}>
            <span style={body}>2026</span>
            <Icon name="chevron-down" size={14} />
          </div>
        </div>
        <Row gap={4}>
          <Button kind="iconTertiary" size="regular" title="Previous"><Icon name="chevron-left" size={16} /></Button>
          <Button kind="iconTertiary" size="regular" title="Next"><Icon name="chevron-right" size={16} /></Button>
        </Row>
      </Row>

      {/* Calendar grid */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead>
            <tr>
              {CAL_DAYS.map((d, i) => (
                <th key={i} style={{ padding: "4px 2px", textAlign: "center", fontFamily: "var(--font-family)", fontSize: 11, fontWeight: 600, color: "var(--palette-blue-2)", width: "14.28%" }}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CAL_WEEKS.map((week, wi) => {
              const booking = BOOKINGS.find(b => b.week === wi);
              return (
                <>
                  <tr key={`d-${wi}`}>
                    {week.map((day, di) => (
                      <td key={di} style={{ padding: "2px", textAlign: "center" }}>
                        <div style={{ ...labelCss, fontSize: 11 }}>
                          {wi === 1 && di === 1 ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                              <Icon name="locked" size={14} style={{ color: "var(--palette-blue-2)" }} />
                              <span>{day}</span>
                            </div>
                          ) : day}
                        </div>
                      </td>
                    ))}
                  </tr>
                  {booking && (
                    <tr key={`b-${wi}`}>
                      <td colSpan={7} style={{ padding: "1px 0" }}>
                        <div style={{
                          background: "var(--palette-orange-0)", borderRadius: 2,
                          padding: "2px 4px", marginLeft: `${booking.startDay * (100/7)}%`,
                          marginRight: `${(6 - booking.endDay) * (100/7)}%`,
                        }}>
                          <span style={{ fontFamily: "var(--font-family)", fontSize: 10, fontWeight: 600, color: "var(--palette-blue-0)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
                            {booking.label}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <Row gap={4} style={{ marginTop: 8, justifyContent: "flex-end" }}>
        <Icon name="info" size={14} style={{ color: "var(--palette-blue-2)" }} />
        <span style={labelCss}>Legend</span>
        <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)" }} />
      </Row>
    </Tile>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Full profile screen
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MyProfileScreen() {
  const [activeNav, setActiveNav] = useState("summary");

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Page
        navbar={<Navbar activeId="profile" />}
        variant="profile-summary"
        sidebar={<ProfileSidebar activeNav={activeNav} onNavChange={setActiveNav} />}
        rightPanel={
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
            <OrgDataSection />
            <AvailabilitySection />
          </div>
        }
      >
        {/* CENTRE — main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
          <SkillsSection />
          <SkillGroupsSection />
          <AccreditationsSection />
        </div>
      </Page>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Storybook meta
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const meta: Meta = {
  title: "Screens/MyProfile",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "My Profile screen — three-column layout. " +
          "Left: Tile selected content (avatar, progress bar, bio, vertical Navigation, Additional sub-items). " +
          "Centre: Tile highlight content blocks — Skills with expandable framework groups (SkillProfile + Checkbox), Skills Groups carousel (Tile object-light cards), Accreditations. " +
          "Right: Tile highlight content — Organisation Data key-value grid + Availability mini-calendar with booking bars.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "Default",
  render: () => <MyProfileScreen />,
};

// ── Narrow variant — single content column (profile-regular) ─────────────────
// Same left sidebar. Centre column stacks: OrgData, Availability, Skills,
// SkillGroups, Accreditations — all in one vertical flow.
// No right panel — content that was in the right panel moves into the main column.

function MyProfileNarrowScreen() {
  const [activeNav, setActiveNav] = useState("summary");

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Page
        navbar={<Navbar activeId="profile" />}
        variant="profile-regular"
        sidebar={<ProfileSidebar activeNav={activeNav} onNavChange={setActiveNav} />}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
          <SkillsSection />
          <SkillGroupsSection />
          <AccreditationsSection />
          <OrgDataSection />
          <AvailabilitySection />
        </div>
      </Page>
    </div>
  );
}

export const Narrow: Story = {
  name: "Narrow (single column)",
  parameters: {
    viewport: { defaultViewport: "screen1280" },
    docs: {
      description: {
        story:
          "Narrow layout using `variant=\"profile-regular\"` — left sidebar fixed, " +
          "all content in a single fluid column. Organisation data and availability " +
          "appear first (previously in the right panel), followed by skills and accreditations.",
      },
    },
  },
  render: () => <MyProfileNarrowScreen />,
};
