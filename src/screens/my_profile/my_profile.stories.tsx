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
import { useEffect, useState } from "react";

import { Navbar }                    from "../../components/navbar/navbar";
import { Page }                      from "../../components/layout/layout";
import { Tile }                      from "../../components/tile/tile";
import { Divider }                   from "../../components/divider/divider";
import { Icon }                      from "../../components/icon/icon";
import { Button }                    from "../../components/button/button";
import { Avatar }                    from "../../components/avatar/avatar";
import { ProgressLinear }            from "../../components/progress_bar/progress_bar";
import { Navigation }                from "../../components/navigation/navigation";
import { Checkbox }                  from "../../components/checkbox/checkbox";
import { SkillList, SkillProfile }   from "../../components/skill/skill";
import { Input, InputSearch, InputSelect } from "../../components/input/input";
import { DropdownMultiSelection }    from "../../components/dropdown/dropdown";
import { Header }                    from "../../components/header/header";
import { CVStudioScreen, ZARA }      from "../cv_studio/cv_studio";
import cvPhoto                       from "../cv_studio/assets/cv-photo.jpg";
import { CVVersionsScreen, INITIAL_CV_VERSIONS } from "../cv_versions/cv_versions";
import type { CVVersion }        from "../cv_versions/cv_versions";
import { ProfilesDirectoryScreen }   from "../profiles_directory/profiles_directory";
import { PillSimple }                from "../../components/pill/pill";
import { EmptyState }                from "../../components/empty_state/empty_state";
import { SidePanel }                 from "../../components/side_panel/side_panel";
import { Actions }                   from "../../components/actions/actions";

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

// Profile ⇄ CV Studio ⇄ CV Versions (Figma: Export CV revamp)
//   "Open main CV"      → CV Studio            (Close → profile)
//   "See all versions"  → CV Versions          (breadcrumb → profile)
//   CV Versions: "Create CV version" / edit icon → CV Studio   (Close → CV Versions)
//   Create CV version  → modal (name, description) → adds the version → CV Studio
//   Navbar "Profiles" (any screen) → Profiles Directory (table). Tick profiles → bulk banner → "Export CV (N)" → CV Studio
//                         with every selected CV (Close → directory). Navbar profile item → back to My Profile
type CVView = "profile" | "studio" | "versions" | "directory";

function useCVFlow() {
  const [view, setView] = useState<CVView>("profile");
  const [studioFrom, setStudioFrom] = useState<"profile" | "versions">("profile");
  const [versions, setVersions] = useState<CVVersion[]>(INITIAL_CV_VERSIONS);
  return {
    view,
    versions,
    setVersions,
    openStudio: (from: "profile" | "versions") => { setStudioFrom(from); setView("studio"); },
    openVersions: () => setView("versions"),
    openDirectory: () => setView("directory"),
    toProfile: () => setView("profile"),
    closeStudio: () => setView(studioFrom),
  };
}

/** Navbar clicks from any screen of the flow: "Profiles" → Profiles Directory, the avatar → My Profile. */
function navbarHandler(flow: ReturnType<typeof useCVFlow>) {
  return (id: string) => {
    if (id === "profiles") flow.openDirectory();
    else if (id === "profile") flow.toProfile();
  };
}

/** The CV Studio / CV Versions screens, for the person shown on this profile. */
function CVFlowView({ flow, personName }: { flow: ReturnType<typeof useCVFlow>; personName: string }) {
  if (flow.view === "directory") {
    return (
      <ProfilesDirectoryScreen
        initialView="table"
        initialSort="Profile name"
        onNavigate={navbarHandler(flow)}
      />
    );
  }
  const cv = { ...ZARA, name: personName, email: `${personName.toLowerCase().replace(/ /g, ".")}@pf.com` };
  if (flow.view === "studio") return <CVStudioScreen cvs={[cv]} onClose={flow.closeStudio} onNavigate={navbarHandler(flow)} />;
  return (
    <CVVersionsScreen
      personName={personName}
      cv={cv}
      versions={flow.versions}
      onVersionsChange={flow.setVersions}
      onBack={flow.toProfile}
      onCreate={() => flow.openStudio("versions")}
      onEdit={() => flow.openStudio("versions")}
      onNavigate={navbarHandler(flow)}
    />
  );
}

const NAV_SECTIONS = [
  { id: "summary",        label: "Summary"        },
  { id: "experience",     label: "Experience"     },
  { id: "accomplishments",label: "Accomplishments"},
  { id: "academic",       label: "Academic"       },
  { id: "additional",     label: "Additional"     },
];

function ProfileSidebar({
  activeNav, onNavChange, onOpenMainCV, onSeeAllVersions, cvVersionCount = 3,
}: {
  activeNav: string;
  onNavChange: (id: string) => void;
  onOpenMainCV?: () => void;
  onSeeAllVersions?: () => void;
  cvVersionCount?: number;
}) {
  return (
    <Tile tileStyle="highlight" padding="content" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Avatar + action buttons */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <img src={cvPhoto} alt={ZARA.name} width={100} height={100} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
        <Row gap={4}>
          <Button kind="iconTertiary" size="regular" title="Edit"><Icon name="edit" size={16} /></Button>
          <Button kind="iconTertiary" size="regular" title="More"><Icon name="menu-vertical" size={16} /></Button>
        </Row>
      </div>

      {/* Name */}
      <div style={{ textAlign: "center" }}>
        <div style={h2}>{ZARA.name}</div>
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

      {/* CV Versions — Figma Export CV revamp, 132:53016 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-family)", fontSize: "var(--font-size-h5)", fontWeight: 600, color: "var(--palette-blue-0)", lineHeight: "125%" }}>
          CV Versions ({cvVersionCount})
        </span>
        <Row gap={8} style={{ flexWrap: "wrap" }}>
          <Button kind="primary" size="small" onClick={onOpenMainCV}>Open main CV</Button>
          <Button kind="secondary" size="small" onClick={onSeeAllVersions}>See all versions</Button>
        </Row>
      </div>

      {/* Contact */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={labelCss}>Contact {ZARA.name.split(" ")[0]}</div>
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
            <SkillList items={group.skills} />
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
  const flow = useCVFlow();
  if (flow.view !== "profile") return <CVFlowView flow={flow} personName={ZARA.name} />;

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Page
        navbar={<Navbar activeId="profile" onSelect={navbarHandler(flow)} />}
        variant="profile-summary"
        sidebar={<ProfileSidebar activeNav={activeNav} onNavChange={setActiveNav} onOpenMainCV={() => flow.openStudio("profile")} onSeeAllVersions={flow.openVersions} cvVersionCount={flow.versions.length} />}
        rightPanel={
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
            <OrgDataSection />
            <AvailabilitySection />
          </div>
        }
      >
        {/* CENTRE — main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
          {activeNav === "additional" ? (
            <AdditionalSection />
          ) : activeNav === "experience" ? (
            <ExperienceSection />
          ) : activeNav === "academic" ? (
            <AcademicSection />
          ) : (
            <>
              <SkillsSection />
              <SkillGroupsSection />
              <AccreditationsSection />
            </>
          )}
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
          "Left: Tile selected content (avatar, progress bar, bio, vertical Navigation); a CV Versions block above Contact opens CV Studio (“Open main CV”) or CV Versions (“See all versions”). Clicking Experience shows a collapsible Filters box (search + Industry / Company / Client / Skills multi-selects, “Clear filters”) above the position cards. Clicking Additional shows the Additional fields (Figma: Education section in Profile, 56:41690): one Tile highlight per field with a Header, iconTertiary edit button and a SkillList without proficiency; Languages as nested Tile object-light cards. " +
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
  const flow = useCVFlow();
  if (flow.view !== "profile") return <CVFlowView flow={flow} personName={ZARA.name} />;

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Page
        navbar={<Navbar activeId="profile" onSelect={navbarHandler(flow)} />}
        variant="profile-regular"
        sidebar={<ProfileSidebar activeNav={activeNav} onNavChange={setActiveNav} onOpenMainCV={() => flow.openStudio("profile")} onSeeAllVersions={flow.openVersions} cvVersionCount={flow.versions.length} />}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
          {activeNav === "additional" ? (
            <AdditionalSection />
          ) : activeNav === "experience" ? (
            <ExperienceSection />
          ) : activeNav === "academic" ? (
            <AcademicSection />
          ) : (
            <>
              <SkillsSection />
              <SkillGroupsSection />
              <AccreditationsSection />
              <OrgDataSection />
              <AvailabilitySection />
            </>
          )}
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADDITIONAL — extra profile fields
// Figma: Education section in Profile, node 56:41690
//   One Tile highlight per field: Header (content size) + edit icon, then the
//   values as a SkillList without proficiency (labels separated by dividers).
//   Languages: nested Tile object-light per language, four label/value columns.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ADDITIONAL_FIELDS: { title: string; values: string[] }[] = [
  { title: "Badges",                     values: ["Badge 1", "Badge 2"] },
  { title: "Driving Licenses",           values: ["Car (B)", "Car (BE)", "Motorbike (A)"] },
];

const ADDITIONAL_LANGUAGES = [
  { name: "English", knowledge: "Advanced", reading: "Advanced", writing: "Advanced", speaking: "Advanced" },
  { name: "Spanish", knowledge: "Advanced", reading: "Advanced", writing: "Advanced", speaking: "Advanced" },
];

const ADDITIONAL_FIELDS_AFTER_LANGUAGES: string[] = [
  "Licenses and Certifications", "Representative clients", "Industry knowledge", "Clients", "Department",
  "Projects", "Job function", "Qualifications", "Custom field sorted", "Internal work experience",
  "Cost Centre", "Previous client experience", "Interested in",
];

function EditButton() {
  return (
    <Button kind="iconTertiary" size="regular" title="Edit">
      <Icon name="edit" size={16} />
    </Button>
  );
}

function AdditionalField({ title, values }: { title: string; values: string[] }) {
  return (
    <Tile tileStyle="highlight" padding="content" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Header size="content" title={title} rightContent={<EditButton />} />
      <SkillList items={values.map(label => ({ label }))} disableTooltip />
    </Tile>
  );
}

function LanguageCard({ lang }: { lang: typeof ADDITIONAL_LANGUAGES[number] }) {
  const cols: [string, string][] = [
    ["Knowledge level",      lang.knowledge],
    ["Reading proficiency",  lang.reading],
    ["Writing proficiency",  lang.writing],
    ["Speaking proficiency", lang.speaking],
  ];
  return (
    <Tile tileStyle="object-light" padding="content" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <SB>
        <div style={h3}>{lang.name}</div>
        <EditButton />
      </SB>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
        {cols.map(([label, value]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={labelCss}>{label}</span>
            <span style={bodyBold}>{value}</span>
          </div>
        ))}
      </div>
    </Tile>
  );
}

function AdditionalSection() {
  return (
    <>
      {ADDITIONAL_FIELDS.map(f => <AdditionalField key={f.title} {...f} />)}
      <Tile tileStyle="highlight" padding="content" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Header size="content" title="Languages" />
        {ADDITIONAL_LANGUAGES.map(l => <LanguageCard key={l.name} lang={l} />)}
      </Tile>
      {ADDITIONAL_FIELDS_AFTER_LANGUAGES.map(title => (
        <AdditionalField key={title} title={title} values={["Badge 1", "Badge 2"]} />
      ))}
    </>
  );
}

// ── Experience ─────────────────────────────────────────────────────────────────
// Figma: Education section in Profile, node 55:34625
//   Header (section) + primary "Add experience", then a timeline of position cards
//   (Tile object-light). Cards collapse: collapsed = title, company line and summary;
//   expanded adds Skills, a 4-column details grid and "Internal Roles & Projects",
//   whose rows collapse too.

type InternalRole = { name: string; range: string; duration: string; details: [string, string][] };
type Position = {
  title: string; company: string; hours: string; period: string; current?: boolean;
  summary: string; skills: string[]; details: [string, string][]; internalRoles: InternalRole[];
};

const EXP_DETAILS: [string, string][] = [
  ["Industry knowledge", "Banking / Financial Services, Payments"],
  ["Job title",          "Tech Lead"],
  ["Company",            "BarclaysX"],
  ["Previous company",   "Previous company"],
  ["Languages",          "English, French"],
  ["Clients",            "BarclaysX"],
];

const EXP_INTERNAL_ROLE: InternalRole = {
  name: "Project Atlas · Tech Lead", range: "01-09-2026 – 13-11-2026", duration: "10 weeks",
  details: EXP_DETAILS.slice(0, 4),
};

const EXP_POSITION: Position = {
  title: "Tech Lead", company: "BarclaysX", hours: "1,800h", period: "Sep 2024 - present",
  summary: "Re-architected payments ingestion (Python · Postgres · AWS). 60% latency reduction; production for 3 Tier-1 banks.",
  skills: ["Python", "PostgreSQL", "AWS", "Apache Kafka", "System Design", "Team Leadership", "REST API", "Distributed Systems"],
  details: EXP_DETAILS,
  internalRoles: [EXP_INTERNAL_ROLE, EXP_INTERNAL_ROLE, EXP_INTERNAL_ROLE],
};

// Varied placeholder positions (so the filters have something to filter). `industry` and `clients` feed the filters
// and the details grid.
type ExpEntry = Position & { id: number; industry: string[]; clients: string[] };

function mkPosition(o: Omit<ExpEntry, "details" | "internalRoles"> & { previous?: string; internalRoles?: InternalRole[] }): ExpEntry {
  return {
    ...o,
    internalRoles: o.internalRoles ?? [EXP_INTERNAL_ROLE, EXP_INTERNAL_ROLE],
    details: [
      ["Industry knowledge", o.industry.join(", ")], ["Job title", o.title], ["Company", o.company],
      ["Previous company", o.previous ?? "Previous company"], ["Languages", "English, French"], ["Clients", o.clients.join(", ")],
    ],
  };
}

const EXPERIENCE_POSITIONS: ExpEntry[] = [
  mkPosition({ id: 1, current: true, title: "Tech Lead", company: "BarclaysX", hours: "1,800h", period: "Sep 2024 - present",
    industry: ["Banking / Financial Services", "Payments"], clients: ["BarclaysX"],
    summary: "Re-architected payments ingestion (Python · Postgres · AWS). 60% latency reduction; production for 3 Tier-1 banks.",
    skills: ["Python", "PostgreSQL", "AWS", "Apache Kafka", "System Design", "Team Leadership", "REST API", "Distributed Systems"],
    internalRoles: [EXP_INTERNAL_ROLE, EXP_INTERNAL_ROLE, EXP_INTERNAL_ROLE] }),
  mkPosition({ id: 2, title: "Senior Data Engineer", company: "NorthRail", hours: "2,400h", period: "Mar 2021 - Aug 2024",
    industry: ["Transport / Logistics"], clients: ["NorthRail", "Transport for Wales"], previous: "BarclaysX",
    summary: "Built the timetable analytics platform on Spark and Airflow; cut nightly batch time from 6h to 90 minutes.",
    skills: ["Python", "Apache Spark", "Airflow", "AWS", "SQL", "Data Modelling"] }),
  mkPosition({ id: 3, title: "Software Engineer", company: "Medix Health", hours: "3,100h", period: "Jun 2018 - Feb 2021",
    industry: ["Healthcare", "Life Sciences"], clients: ["NHS Digital", "Medix Health"], previous: "NorthRail",
    summary: "Delivered a patient scheduling service used by 40 clinics; introduced contract testing across 12 services.",
    skills: ["Java", "PostgreSQL", "REST API", "Docker", "Test Automation"] }),
  mkPosition({ id: 4, title: "Graduate Developer", company: "BarclaysX", hours: "1,900h", period: "Sep 2016 - May 2018",
    industry: ["Banking / Financial Services"], clients: ["BarclaysX"], previous: "Medix Health",
    summary: "Maintained internal reconciliation tooling and automated month-end reporting.",
    skills: ["Java", "SQL", "Python", "Team Leadership"] }),
];

function ExpChevron({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <Button kind="iconTertiary" size="small" title={open ? "Collapse" : "Expand"} onClick={onClick}>
      <Icon name={open ? "chevron-down" : "chevron-right"} size={14} />
    </Button>
  );
}

function ExpDetails({ fields }: { fields: [string, string][] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px 24px" }}>
      {fields.map(([label, value]) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={labelCss}>{label}</span>
          <span style={bodyBold}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function InternalRoleRow({ role, defaultOpen }: { role: InternalRole; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "4px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) auto", alignItems: "center", gap: 8 }}>
        <Row gap={8}>
          <ExpChevron open={open} onClick={() => setOpen(o => !o)} />
          <span style={bodyBold}>Role: {role.name}</span>
        </Row>
        <Row gap={8}>
          <span style={bodyBold}>{role.range}</span>
          <span style={labelCss}>({role.duration})</span>
        </Row>
        <Button kind="iconTertiary" size="small" title="Edit role"><Icon name="edit" size={14} /></Button>
      </div>
      {open && <div style={{ paddingLeft: 8, paddingBottom: 4 }}><ExpDetails fields={role.details} /></div>}
    </div>
  );
}

function ExperienceCard({ position, isLast, defaultOpen }: { position: Position; isLast: boolean; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const DOT_TOP = 26;
  const DOT_GAP = 4;
  return (
    <div style={{ display: "flex", gap: 12 }}>
      {/* timeline rail: dot level with the title, line running to the next dot */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 12, flexShrink: 0 }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%", marginTop: DOT_TOP, flexShrink: 0,
          background: position.current ? "var(--palette-primary-0)" : "var(--palette-neutral-0)",
        }} />
        {!isLast && (
          <div style={{ width: 2, flex: 1, background: "var(--palette-neutral-0)", marginTop: DOT_GAP, marginBottom: -(DOT_TOP - DOT_GAP) }} />
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0, marginBottom: 16 }}>
        <Tile tileStyle="object-light" padding="content" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <SB style={{ alignItems: "flex-start" }}>
              <Row gap={8}>
                <ExpChevron open={open} onClick={() => setOpen(o => !o)} />
                <span style={{ ...h3, fontSize: 16 }}>{position.title}</span>
                {position.current && <PillSimple label="Current position" size="small" />}
              </Row>
              <Button kind="iconTertiary" size="small" title="Edit position"><Icon name="edit" size={14} /></Button>
            </SB>
            <div style={{ paddingLeft: 34 }}>
              <span style={labelCss}>
                <span style={{ color: "var(--palette-blue-0)", fontWeight: 700 }}>{position.company}</span> · {position.hours} · {position.period}
              </span>
            </div>
          </div>
          <div style={{ ...body, paddingLeft: 0 }}>{position.summary}</div>

          {open && (
            <>
              <Divider orientation="horizontal" style={{ margin: "4px 0" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={bodyBold}>Skills ({position.skills.length})</span>
                <SkillList items={position.skills.map(label => ({ label }))} disableTooltip />
              </div>
              <Divider orientation="horizontal" style={{ margin: "4px 0" }} />
              <ExpDetails fields={position.details} />
              <Divider orientation="horizontal" style={{ margin: "4px 0" }} />
              <SB>
                <span style={bodyBold}>Internal Roles &amp; Projects ({position.internalRoles.length})</span>
                <Button kind="iconTertiary" size="small" title="Add role or project"><Icon name="add" size={14} /></Button>
              </SB>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {position.internalRoles.map((r, i) => (
                  <div key={i}>
                    {i > 0 && <Divider orientation="horizontal" />}
                    <InternalRoleRow role={r} defaultOpen={i === 0} />
                  </div>
                ))}
              </div>
            </>
          )}
        </Tile>
      </div>
    </div>
  );
}

// Filters box between the section header and the cards: search + Industry / Company / Client / Skills multi-selects.
type FilterKey = "industry" | "company" | "client" | "skills";
type FilterSel = Record<FilterKey, string[]>;
const NO_FILTERS: FilterSel = { industry: [], company: [], client: [], skills: [] };

const uniqSorted = (xs: string[]) => [...new Set(xs)].sort();
const EXP_FILTER_FIELDS: { key: FilterKey; label: string; values: (p: ExpEntry) => string[]; options: string[] }[] = ([
  { key: "industry", label: "Industry", values: (p: ExpEntry) => p.industry },
  { key: "company",  label: "Company",  values: (p: ExpEntry) => [p.company] },
  { key: "client",   label: "Client",   values: (p: ExpEntry) => p.clients },
  { key: "skills",   label: "Skills",   values: (p: ExpEntry) => p.skills },
] as const).map(f => ({ ...f, options: uniqSorted(EXPERIENCE_POSITIONS.flatMap(f.values)) }));

const filterSummary = (ids: string[]) => (ids.length === 0 ? "" : ids.length <= 2 ? ids.join(", ") : `${ids.length} selected`);

function ExpFilterSelect({ field, selected, onChange }: { field: (typeof EXP_FILTER_FIELDS)[number]; selected: string[]; onChange: (ids: string[]) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", minWidth: 0 }}>
      <InputSelect label={field.label} value={filterSummary(selected)} onClick={() => setOpen(o => !o)} />
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 9 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 10, minWidth: "100%" }}>
            <DropdownMultiSelection
              items={field.options.map(o => ({ id: o, label: o }))}
              selectedIds={selected}
              onSelectionChange={onChange}
              searchable={field.options.length > 6}
            />
          </div>
        </>
      )}
    </div>
  );
}

function ExperienceFiltersBox({
  open, onToggle, search, onSearch, sel, onSel, count, onClear,
}: {
  open: boolean; onToggle: () => void; search: string; onSearch: (v: string) => void;
  sel: FilterSel; onSel: (s: FilterSel) => void; count: number; onClear: () => void;
}) {
  return (
    <Tile tileStyle="default" padding="content" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SB>
        <Row gap={8}>
          <Button kind="iconTertiary" size="small" title={open ? "Collapse filters" : "Expand filters"} onClick={onToggle}>
            <Icon name={open ? "chevron-down" : "chevron-right"} size={16} />
          </Button>
          <span style={{ fontFamily: "var(--font-family)", fontSize: "var(--font-size-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--palette-blue-0)" }}>
            Filters ({count})
          </span>
        </Row>
        {count > 0 && <Button kind="link" size="small" onClick={onClear}>Clear filters</Button>}
      </SB>
      {open && (
        <>
          <InputSearch value={search} placeholder="Search" onChange={e => onSearch(e.target.value)} onClear={() => onSearch("")} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
            {EXP_FILTER_FIELDS.map(f => (
              <ExpFilterSelect key={f.key} field={f} selected={sel[f.key]} onChange={ids => onSel({ ...sel, [f.key]: ids })} />
            ))}
          </div>
        </>
      )}
    </Tile>
  );
}

function ExperienceSection() {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState<FilterSel>(NO_FILTERS);
  const count = EXP_FILTER_FIELDS.filter(f => sel[f.key].length > 0).length + (search.trim() ? 1 : 0);
  const q = search.trim().toLowerCase();
  const shown = EXPERIENCE_POSITIONS.filter(p =>
    EXP_FILTER_FIELDS.every(f => sel[f.key].length === 0 || f.values(p).some(v => sel[f.key].includes(v))) &&
    (!q || [p.title, p.company, p.summary, ...p.skills].join(" ").toLowerCase().includes(q)));
  return (
    <Tile tileStyle="highlight" padding="screen" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Header size="section" title="Experience" actions={[{ label: "Add experience", variant: "primary" }]} />
      <ExperienceFiltersBox
        open={open} onToggle={() => setOpen(o => !o)} search={search} onSearch={setSearch}
        sel={sel} onSel={setSel} count={count} onClear={() => { setSearch(""); setSel(NO_FILTERS); }}
      />
      {shown.length === 0 ? (
        <EmptyState size="small-vertical" title="No experience matches the filters" />
      ) : (
        <div>
          {shown.map((p, i) => (
            <ExperienceCard key={p.id} position={p} isLast={i === shown.length - 1} defaultOpen={!!p.current} />
          ))}
        </div>
      )}
    </Tile>
  );
}

// ── Academic ───────────────────────────────────────────────────────────────────
// Figma: Education section in Profile, node 76:11187 (six screens)
//   Tile highlight with Header "Academic" and a horizontal Navigation with count badges
//   (Education, Courses, Lecture experience, Professional associations, Publications,
//   Honors & Awards). Each tab: section title + primary Add, then two-column cards
//   (Tile object-light, iconTertiary edit) or an EmptyState when there are no items.
//   Add / Edit open a SidePanel with Inputs and sticky Cancel / Save actions.

type AcademicKey = "education" | "courses" | "lecture" | "associations" | "publications" | "honors";
type AcademicItem = { title: string; sub?: string; start?: string; end?: string; desc?: string };
type AcademicField = [keyof AcademicItem, string, boolean?];   // key, label, required

const ACADEMIC_LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium sem et vestibulum auctor. Nunc euismod lacus eget justo interdum, vitae venenat…";
const ACADEMIC_STUDY = "This comprehensive study explores innovative methodologies in computer science, focusing on algorithm optimization and system architecture improvements.";

const ACADEMIC: Record<AcademicKey, { tab: string; add: string; fields: AcademicField[]; items: AcademicItem[] }> = {
  education: {
    tab: "Education", add: "Add education",
    fields: [["title", "Degree", true], ["sub", "Institution"], ["start", "Start date"], ["end", "End date"], ["desc", "Description"]],
    items: [
      { title: "Computer Science", sub: "Imperial College London", start: "01 Sep 2012", end: "30 May 2016", desc: ACADEMIC_LOREM },
      { title: "Mathematics", sub: "University of Warwick", start: "01 Sep 2010", end: "30 May 2012", desc: ACADEMIC_LOREM },
    ],
  },
  courses: {
    tab: "Courses", add: "Add course",
    fields: [["title", "Course", true], ["start", "Start date"], ["end", "End date"]],
    items: [
      { title: "Machine Learning",     start: "01 Sep 2012", end: "30 May 2016" },
      { title: "Distributed Systems",  start: "01 Sep 2012", end: "30 May 2016" },
      { title: "Databases",            start: "01 Sep 2013", end: "30 May 2014" },
      { title: "Computer Networks",    start: "01 Sep 2014", end: "30 May 2015" },
    ],
  },
  lecture: {
    tab: "Lecture experience", add: "Add lecture experience",
    fields: [["title", "Subject", true], ["start", "Start date"], ["end", "End date"], ["desc", "Description"]],
    items: [
      { title: "Advanced Data Structures", start: "15 Jan 2015", end: "20 Dec 2018",
        desc: "Developed and delivered comprehensive lectures on algorithms and data structures, guiding students through complex problem-solving techniques and practical applications." },
    ],
  },
  associations: {
    tab: "Professional associations", add: "Add association",
    fields: [["title", "Association", true], ["start", "Start date"], ["end", "End date"], ["desc", "Description"]],
    items: [],
  },
  publications: {
    tab: "Publications", add: "Add publication",
    fields: [["title", "Title", true], ["sub", "Author(s)"], ["start", "Start date"], ["end", "End date"], ["desc", "Description"]],
    items: [
      { title: "Advances in Computer Science", sub: "Sancho Pansa",              start: "September 2012", end: "May 2016", desc: ACADEMIC_STUDY },
      { title: "Advances in Computer Science", sub: "Sancho Pansa and Mike Lee", start: "September 2012", end: "May 2016", desc: ACADEMIC_STUDY },
      { title: "Advances in Computer Science", sub: "Sancho Pansa and Mike Lee", start: "September 2012", end: "May 2016", desc: ACADEMIC_STUDY },
    ],
  },
  honors: {
    tab: "Honors & Awards", add: "Add honor or award",
    fields: [["title", "Title", true], ["start", "Start date"], ["end", "End date"], ["desc", "Description"]],
    items: [
      { title: "Bachelor of Science in Computer Science", start: "September 2012", end: "May 2016",
        desc: "Awarded for outstanding academic achievement and contribution to the Computer Science department." },
    ],
  },
};

const ACADEMIC_ORDER: AcademicKey[] = ["education", "courses", "lecture", "associations", "publications", "honors"];

function AcademicCard({ section, item, onEdit }: { section: AcademicKey; item: AcademicItem; onEdit: () => void }) {
  const mutedBody: React.CSSProperties = { ...body, color: "var(--palette-blue-2)" };
  const isPublication = section === "publications";
  return (
    <Tile tileStyle="object-light" padding="content">
      <SB style={{ alignItems: "flex-start", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          <span style={h3}>{item.title}</span>
          {item.sub && <span style={mutedBody}>{isPublication ? "Author(s): " : ""}{item.sub}</span>}
          <span style={body}>{[item.start, item.end].filter(Boolean).join(" - ")}</span>
        </div>
        <Button kind="iconTertiary" size="regular" title="Edit" onClick={onEdit}><Icon name="edit" size={16} /></Button>
      </SB>
      {item.desc && <div style={{ ...body, marginTop: 16 }}>{isPublication ? "Description: " : ""}{item.desc}</div>}
    </Tile>
  );
}

type AcademicPanelState = { section: AcademicKey; index: number | null; initial: AcademicItem } | null;

function AcademicPanel({ panel, onClose, onSave }: { panel: AcademicPanelState; onClose: () => void; onSave: (item: AcademicItem) => void }) {
  const [draft, setDraft] = useState<AcademicItem>({ title: "" });
  useEffect(() => { if (panel) setDraft(panel.initial); }, [panel]);
  const sec = ACADEMIC[panel ? panel.section : "education"];
  const missing = sec.fields.some(([key, , required]) => required && !(draft[key] ?? "").trim());
  return (
    <SidePanel open={!!panel} onClose={onClose} width={480}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
        <div style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 16, flex: 1, overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Header size="content" title={panel && panel.index !== null ? `Edit ${sec.tab.toLowerCase()}` : sec.add} />
            <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}><Icon name="cross" size={16} /></Button>
          </div>
          {sec.fields.map(([key, label, required]) => (
            <Input
              key={key}
              label={label}
              mandatory={!!required}
              value={draft[key] ?? ""}
              onChange={e => setDraft({ ...draft, [key]: e.target.value })}
            />
          ))}
        </div>
        <Actions
          variant="sticky-panel"
          leftActions={[{ label: "Cancel", variant: "secondary", onClick: onClose }]}
          rightActions={[{ label: "Save", variant: "primary", disabled: missing, onClick: () => onSave(draft) }]}
        />
      </div>
    </SidePanel>
  );
}

function AcademicSection() {
  const [tab, setTab] = useState<AcademicKey>("education");
  const [data, setData] = useState<Record<AcademicKey, AcademicItem[]>>(
    () => Object.fromEntries(ACADEMIC_ORDER.map(k => [k, ACADEMIC[k].items])) as Record<AcademicKey, AcademicItem[]>,
  );
  const [panel, setPanel] = useState<AcademicPanelState>(null);

  const open = (section: AcademicKey, index: number | null) =>
    setPanel({ section, index, initial: index === null ? { title: "" } : { ...data[section][index] } });
  const save = (item: AcademicItem) => {
    if (!panel) return;
    const list = [...data[panel.section]];
    if (panel.index === null) list.push(item); else list[panel.index] = item;
    setData({ ...data, [panel.section]: list });
    setPanel(null);
  };

  const tabs = ACADEMIC_ORDER.map(id => ({ id, label: ACADEMIC[id].tab, badge: data[id].length }));
  const items = data[tab];
  return (
    <>
      <Tile tileStyle="highlight" padding="content" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Header size="content" title="Academic" />
        <Navigation orientation="horizontal" tabs={tabs} activeId={tab} onChange={id => setTab(id as AcademicKey)} />
        <SB>
          <span style={{ ...h3, fontSize: 16 }}>{ACADEMIC[tab].tab}</span>
          <Button kind="primary" size="regular" onClick={() => open(tab, null)}>Add</Button>
        </SB>
        {items.length === 0 ? (
          <EmptyState size="small-vertical" title="No items to show" />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, alignItems: "start" }}>
            {items.map((item, i) => <AcademicCard key={`${tab}-${i}`} section={tab} item={item} onEdit={() => open(tab, i)} />)}
          </div>
        )}
      </Tile>
      <AcademicPanel panel={panel} onClose={() => setPanel(null)} onSave={save} />
    </>
  );
}
