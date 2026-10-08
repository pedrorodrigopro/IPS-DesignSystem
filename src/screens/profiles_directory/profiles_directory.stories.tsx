// Screens/ProfilesDirectory — 4 variants
//
// Searching Cards   — search active, card layout (Tile interactive per row)
// Searching Table   — search active, expandable table layout
// Cards             — no search, card layout
// Table             — no search, collapsed expandable table
//
// Container mapping (RULE 2b):
//   Page shell:     Navbar + plain full-width div (no Page component — no sidebar)
//   Card rows:      Tile interactive content — clickable, card shadow on hover
//   Table area:     Tile highlight content, padding:0 + overflow:hidden, custom expandable table
//   Toolbar:        plain flex row, no Tile
//
// Components used:
//   Navbar, Tile, Divider, Icon, Button, Avatar, Checkbox, SkillProfile,
//   InputSearch, PillSimple, WorkforceMember

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Navbar }           from "../../components/navbar/navbar";
import { Tile }             from "../../components/tile/tile";
import { Divider }          from "../../components/divider/divider";
import { Icon }             from "../../components/icon/icon";
import { Button }           from "../../components/button/button";
import { Avatar }           from "../../components/avatar/avatar";
import { Checkbox }         from "../../components/checkbox/checkbox";
import { SkillProfile }     from "../../components/skill/skill";
import { InputSearch }      from "../../components/input/input";

// ── Typography helpers ────────────────────────────────────────────────────────

const bodyBold: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%" };
const body:     React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%" };
const labelCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%" };
const linkCss:  React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 16, fontWeight: 700, color: "var(--palette-primary-0)", lineHeight: "115%" };

function Row({ children, gap = 8, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", alignItems: "center", gap, ...style }}>{children}</div>;
}
function SB({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...style }}>{children}</div>;
}

// ── Highlighted text (yellow bg on search matches) ────────────────────────────

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <span>{text}</span>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? <mark key={i} style={{ background: "#FFD700", color: "inherit", borderRadius: 2, padding: "0 1px" }}>{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </span>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

type SkillEntry = {
  label: string;
  proficiency: "basic" | "intermediate" | "advanced";
  core?: boolean;
  verified?: boolean;
  verifiedCredy?: boolean;
  development?: boolean;
};

type ProfileEntry = {
  id: string;
  name: string;
  initials: string;
  avatarBg?: string;
  subtitle: string;
  coreSkills: number;
  otherSkills: number;
  skills: SkillEntry[];
  skillsHighlightText?: string;
  bio?: string;
  currentPositionSummary?: string;
  currentPositionTitle?: string;
  pastPositionSummary?: string;
  pastPositionTitle?: string;
  hasPrivacyIcon?: boolean;
};

const PROFILES_SEARCH: ProfileEntry[] = [
  {
    id: "p1", name: "Steven Staging Fryer", initials: "SS",
    subtitle: "Head of Projects, English",
    coreSkills: 0, otherSkills: 107,
    skills: [
      { label: "Project Delivery",                   proficiency: "basic",        core: true },
      { label: "Project Management",                 proficiency: "advanced",     core: true },
      { label: "Regulatory Compliance",              proficiency: "basic",        core: true },
      { label: "Risk Management",                    proficiency: "intermediate", core: true },
      { label: "Strategic Thinking",                 proficiency: "intermediate", core: true },
      { label: "Agile Practices",                    proficiency: "advanced" },
      { label: "Agile and Waterfall Methodologies",  proficiency: "advanced" },
      { label: "IT Project Management",              proficiency: "advanced" },
      { label: "PRINCE2",                            proficiency: "advanced" },
      { label: "Project Management Office (PMO)",    proficiency: "advanced" },
    ],
    skillsHighlightText: "Project Management, Project Management Office (PMO), Project Delivery, Software Projects, IT Proje...",
    currentPositionSummary: "* Embedded project management best practice across, giving strategic advice to executive board on ...",
    currentPositionTitle: "Head of Projects",
    pastPositionSummary: "* Took control of two projects that had repeatedly, IT Project Manager * Took control of multiple transf...",
    pastPositionTitle: "Infrastructure Project Manager, IT Project Manager, Software Tester / Project Leader / Senior Project ...",
  },
  {
    id: "p2", name: "Caitlin D", initials: "CD", avatarBg: "var(--palette-primary-0)",
    subtitle: "IT Project Manager, Analyst",
    coreSkills: 0, otherSkills: 41,
    skills: [
      { label: "Adaptability",                       proficiency: "advanced" },
      { label: "Business Acumen",                    proficiency: "advanced",     verified: true },
      { label: "CI / CD",                            proficiency: "advanced",     verified: true },
      { label: "Change Management",                  proficiency: "advanced",     development: true, verified: true },
      { label: "JavaScript (Programming Language)",  proficiency: "advanced",     verified: true },
      { label: "Leadership",                         proficiency: "advanced",     verified: true },
      { label: "Node JS",                            proficiency: "advanced",     verified: true },
      { label: "Program Management",                 proficiency: "advanced" },
      { label: "Project Management",                 proficiency: "advanced",     verified: true },
      { label: "React",                              proficiency: "advanced",     verified: true },
    ],
    skillsHighlightText: "Program Management, Risk Management, Project Management, Stakeholder Management, Change ...",
    bio: "translating high-level corporate goals into executable project, plans, maintaining a keen focus on billab...",
    currentPositionSummary: "end-to-end execution of technology engagements, ensuring projects. Acts as the primary point of cont...",
    currentPositionTitle: "IT Project Manager",
    pastPositionTitle: "Change Manager",
  },
  {
    id: "p3", name: "Erwin Fisher", initials: "EF",
    subtitle: "IT Project Manager, Manager",
    coreSkills: 0, otherSkills: 8,
    skills: [
      { label: "Asana",                              proficiency: "basic" },
      { label: "Jira",                               proficiency: "intermediate" },
      { label: "Microsoft Project",                  proficiency: "intermediate" },
      { label: "Project Management",                 proficiency: "intermediate" },
      { label: "Software Development Life Cycle (SDLC)", proficiency: "intermediate" },
      { label: "Software Quality Assurance",         proficiency: "intermediate" },
      { label: "Vendor Management",                  proficiency: "advanced" },
      { label: "Workday HCM",                        proficiency: "intermediate" },
    ],
    skillsHighlightText: "Microsoft Project, Project Management, Vendor Management",
    currentPositionTitle: "IT Project Manager",
    pastPositionTitle: "Engagement Manager",
  },
  {
    id: "p4", name: "Maragaret Mayert", initials: "MM",
    subtitle: "Project Manager, Senior Consultant",
    coreSkills: 0, otherSkills: 8,
    skills: [
      { label: "Communications Planning",    proficiency: "basic" },
      { label: "Engagement",                 proficiency: "basic" },
      { label: "Financial Services Cloud",   proficiency: "basic" },
      { label: "Government Cloud",           proficiency: "intermediate" },
      { label: "Health Cloud",               proficiency: "intermediate" },
      { label: "Project Management Tools",   proficiency: "intermediate" },
      { label: "Salesforce Industries",      proficiency: "intermediate" },
      { label: "Time Management",            proficiency: "intermediate" },
    ],
    skillsHighlightText: "Project Management Tools, Time Management",
    currentPositionTitle: "Project Manager",
    pastPositionTitle: "Engagement Manager",
  },
  {
    id: "p5", name: "Spencer Harmon", initials: "SH", hasPrivacyIcon: true,
    subtitle: "Business Process Manager/Team Lead, Brand Development and Identity, 10-04-2026, Dutch, English, Finnish, French, Greek, Gujarati, Hebrew, Hungarian, Kannada, Korean, North America, President",
    coreSkills: 5, otherSkills: 513,
    skills: [
      { label: "A Cappella Singing",              proficiency: "advanced",     core: true, verified: true },
      { label: "C++14",                           proficiency: "advanced",     verifiedCredy: true },
      { label: "CFOs",                            proficiency: "advanced",     core: true, development: true },
      { label: "Java",                            proficiency: "advanced",     core: true },
      { label: "Ruby (Programming Language)",     proficiency: "intermediate", core: true, verified: true, verifiedCredy: true },
      { label: "C++ Builder",                     proficiency: "advanced" },
      { label: "Cobal (Programming Language)",    proficiency: "advanced" },
      { label: "Custom Objects",                  proficiency: "advanced" },
      { label: "Databases",                       proficiency: "advanced" },
    ],
    skillsHighlightText: "Technical Project Management, Project Management, D-Tools Project Management, IT Project Mana...",
    currentPositionSummary: "DAVID manages a team of business, process practitioners and project manager ...",
    currentPositionTitle: "Business Process Manager/Team Lead",
  },
];

const PROFILES_BROWSE: ProfileEntry[] = [
  { id: "b1",  name: "A. I Poane",                    initials: "AI", avatarBg: "var(--palette-primary-0)",   subtitle: "Accounting, QA, 02-09-1970, English, French, Italian, Spanish, Central and Eastern Europe, Mid", coreSkills: 1,  otherSkills: 165, skills: [{ label: "Ruby (Programming Language)", proficiency: "intermediate" }] },
  { id: "b2",  name: "AAAa Poane",                    initials: "AP",                                          subtitle: "Finance, English, Spanish, Lead",                                          coreSkills: 5,  otherSkills: 120, skills: [{ label: "Assets Recovery", proficiency: "intermediate" }] },
  { id: "b3",  name: "Aalex (New) Poane",             initials: "AP", avatarBg: "#9A60B4",                    subtitle: "QA Lead, President",                                                       coreSkills: 0,  otherSkills: 6,   skills: [{ label: "Java", proficiency: "basic" }] },
  { id: "b4",  name: "Adrian Stoica",                 initials: "AS", avatarBg: "#40798C",                    subtitle: "Software Engineer, Analyst",                                               coreSkills: 0,  otherSkills: 2,   skills: [{ label: "Ruby (Programming Language)", proficiency: "intermediate" }] },
  { id: "b5",  name: "Aide Lowe test",                initials: "AL",                                          subtitle: "High Net Worth (HNW) Compliance Return Preparer, Consultant",               coreSkills: 0,  otherSkills: 19,  skills: [{ label: "A Level", proficiency: "intermediate" }] },
  { id: "b6",  name: "Alessandro",                    initials: "A",  avatarBg: "var(--palette-primary-0)",   subtitle: "QA Engineer, English",                                                     coreSkills: 0,  otherSkills: 127, skills: [{ label: "AWS Certification", proficiency: "intermediate" }] },
  { id: "b7",  name: "Alessandro Clayton",            initials: "AC", avatarBg: "var(--palette-blue-3)",      subtitle: "QA, English",                                                              coreSkills: 0,  otherSkills: 127, skills: [{ label: "AWS Certification", proficiency: "intermediate" }] },
  { id: "b8",  name: "Alex (empty PG) Poane",         initials: "AP", avatarBg: "#9A60B4",                    subtitle: "Senior Implementation Consultant",                                         coreSkills: 0,  otherSkills: 0,   skills: [] },
  { id: "b9",  name: "Alex Jane Doe",                 initials: "AD", avatarBg: "var(--palette-blue-3)",      subtitle: "QA Engineer",                                                              coreSkills: 0,  otherSkills: 146, skills: [{ label: "Accounting", proficiency: "intermediate" }] },
  { id: "b10", name: "Alexandra Danish",              initials: "AD", avatarBg: "var(--palette-blue-3)",      subtitle: "Sales Intern",                                                             coreSkills: 0,  otherSkills: 54,  skills: [] },
];

// ── Toolbar ───────────────────────────────────────────────────────────────────

type ViewMode = "cards" | "table";

function Toolbar({
  search, onSearch, sort, count, unit,
  viewMode, onViewMode,
}: {
  search: string;
  onSearch: (v: string) => void;
  sort: string;
  count: number;
  unit: string;
  viewMode: ViewMode;
  onViewMode: (v: ViewMode) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
      {/* Search */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <InputSearch value={search} onChange={e => onSearch(e.target.value)} placeholder="Search" />
        {search && (
          <button onClick={() => onSearch("")} style={{ position: "absolute", right: 8, background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0, color: "var(--palette-blue-2)" }}>
            <Icon name="cross" size={14} />
          </button>
        )}
      </div>

      {/* Sort dropdown */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 36, border: "1px solid var(--palette-neutral-0)", borderRadius: "var(--radius-md)", padding: "0 12px", background: "white", cursor: "pointer" }}>
        <span style={body}>{sort}</span>
        <Icon name="chevron-down" size={14} style={{ color: "var(--palette-blue-2)" }} />
      </div>

      {/* Count */}
      <span style={labelCss}>{count} {unit}</span>

      {/* Right icons */}
      <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
        {/* Cards / Table toggle — joined two-button, same pattern as Availability block */}
        <div style={{ display: "flex" }}>
          <button
            onClick={() => onViewMode("cards")}
            title="Cards view"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 36, height: 36,
              border: "1px solid var(--palette-neutral-0)", borderRight: "none",
              borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
              background: viewMode === "cards" ? "var(--palette-blue-1)" : "white",
              color:      viewMode === "cards" ? "white" : "var(--palette-blue-2)",
              cursor: "pointer",
            }}>
            <Icon name="table" size={16} />
          </button>
          <button
            onClick={() => onViewMode("table")}
            title="Table view"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 36, height: 36,
              border: "1px solid var(--palette-neutral-0)",
              borderRadius: "0 var(--radius-md) var(--radius-md) 0",
              background: viewMode === "table" ? "var(--palette-blue-1)" : "white",
              color:      viewMode === "table" ? "white" : "var(--palette-blue-2)",
              cursor: "pointer",
            }}>
            <Icon name="list" size={16} />
          </button>
        </div>
        {/* Placeholder extra icon */}
        <Button kind="icon" size="regular" title="Grid">
          <Icon name="menu-horizontal" size={16} />
        </Button>
        <Button kind="icon" size="regular" title="Filter">
          <Icon name="filter" size={16} />
        </Button>
        <Button kind="icon" size="regular" title="Download">
          <Icon name="export" size={16} />
        </Button>
      </div>
    </div>
  );
}

// ── Card row ──────────────────────────────────────────────────────────────────

function ProfileCard({ profile, query }: { profile: ProfileEntry; query: string }) {
  return (
    <Tile tileStyle="interactive" padding="content">
      <SB style={{ alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Name + avatar */}
          <Row gap={12} style={{ marginBottom: 6 }}>
            <Avatar initials={profile.initials} size="big" />
            <div style={{ minWidth: 0 }}>
              <Row gap={6}>
                <span style={linkCss}>{profile.name}</span>
                {profile.hasPrivacyIcon && <Icon name="profile" size={14} style={{ color: "var(--palette-blue-2)" }} />}
              </Row>
              <div style={{ ...labelCss, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 700 }}>
                {profile.subtitle}
              </div>
            </div>
          </Row>

          {/* Skill dots row */}
          {profile.skills.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
              {profile.skills.map(s => (
                <SkillProfile
                  key={s.label}
                  label={s.label}
                  proficiency={s.proficiency}
                  core={s.core}
                  verified={s.verified}
                  verifiedCredy={s.verifiedCredy}
                  development={s.development}
                />
              ))}
            </div>
          )}

          {/* Highlighted skills row */}
          {profile.skillsHighlightText && (
            <Row gap={6} style={{ marginBottom: 4, flexWrap: "wrap" }}>
              <span style={labelCss}>Skills</span>
              <span style={{ ...labelCss, color: "var(--palette-blue-0)" }}>
                <Highlight text={profile.skillsHighlightText} query={query} />
              </span>
              {query && (
                <button style={{ ...labelCss, background: "none", border: "none", cursor: "pointer", color: "var(--palette-primary-0)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Icon name="chevron-right" size={14} /> View more
                </button>
              )}
            </Row>
          )}

          {/* Bio row */}
          {profile.bio && (
            <Row gap={6} style={{ flexWrap: "wrap" }}>
              <span style={labelCss}>Bio</span>
              <span style={{ ...labelCss, color: "var(--palette-blue-0)" }}>
                <Highlight text={profile.bio} query={query} />
              </span>
              <button style={{ ...labelCss, background: "none", border: "none", cursor: "pointer", color: "var(--palette-primary-0)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Icon name="chevron-right" size={14} /> View more
              </button>
            </Row>
          )}

        </div>

        {/* Shortlist button — right aligned */}
        <Button kind="primary" size="regular" style={{ flexShrink: 0, marginLeft: 16 }}>Shortlist</Button>
      </SB>
    </Tile>
  );
}

// ── Table variant ─────────────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: "10px 12px", textAlign: "left",
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-2)",
  borderBottom: "1px solid var(--palette-neutral-0)", background: "var(--palette-white-0)", whiteSpace: "nowrap",
};
const tdStyle: React.CSSProperties = { padding: "10px 12px", verticalAlign: "middle" };

function ProfileTableRow({ profile, query, showExpanded }: { profile: ProfileEntry; query: string; showExpanded: boolean }) {
  const [expanded, setExpanded] = useState(showExpanded);

  return (
    <>
      {/* Collapsed row */}
      <tr style={{ background: "white", borderBottom: expanded ? "none" : "1px solid var(--palette-neutral-0)", cursor: "pointer" }}>
        <td style={{ ...tdStyle, width: 20 }}>
          <button onClick={() => setExpanded(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "var(--palette-blue-2)", display: "flex", transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>
            <Icon name="chevron-right" size={14} />
          </button>
        </td>
        <td style={{ ...tdStyle, width: 28 }}>
          <Checkbox onChange={() => {}} />
        </td>
        <td style={{ ...tdStyle, minWidth: 220 }}>
          <Row gap={8}>
            <Avatar initials={profile.initials} size="small" />
            <div>
              <div style={linkCss}>{profile.name}</div>
              <div style={labelCss}>{profile.subtitle.split(",")[0]}</div>
            </div>
          </Row>
        </td>
        <td style={{ ...tdStyle, width: 100, ...body }}>{profile.coreSkills > 0 ? profile.coreSkills : "-"}</td>
        <td style={{ ...tdStyle, width: 100, ...body }}>{profile.otherSkills > 0 ? profile.otherSkills : "-"}</td>
        <td style={{ ...tdStyle, width: 100 }}>
          <Button kind="primary" size="regular">Shortlist</Button>
        </td>
      </tr>

      {/* Expanded detail rows */}
      {expanded && (
        <tr style={{ background: "var(--palette-neutral-2)", borderBottom: "1px solid var(--palette-neutral-0)" }}>
          <td colSpan={6} style={{ padding: "12px 60px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

              {/* Skills highlight */}
              {profile.skillsHighlightText && (
                <Row gap={12} style={{ alignItems: "flex-start" }}>
                  <span style={{ ...labelCss, width: 100, flexShrink: 0 }}>Skills</span>
                  <span style={body}><Highlight text={profile.skillsHighlightText} query={query} /></span>
                </Row>
              )}

              {/* Bio */}
              {profile.bio && (
                <Row gap={12} style={{ alignItems: "flex-start" }}>
                  <span style={{ ...labelCss, width: 100, flexShrink: 0 }}>Bio</span>
                  <span style={body}><Highlight text={profile.bio} query={query} /></span>
                </Row>
              )}

              {/* Current position */}
              {(profile.currentPositionSummary || profile.currentPositionTitle) && (
                <div>
                  <div style={{ ...labelCss, fontWeight: 700, marginBottom: 4 }}>Current position</div>
                  {profile.currentPositionSummary && (
                    <Row gap={12}>
                      <span style={{ ...labelCss, width: 100, flexShrink: 0 }}>Summary</span>
                      <span style={body}><Highlight text={profile.currentPositionSummary} query={query} /></span>
                    </Row>
                  )}
                  {profile.currentPositionTitle && (
                    <Row gap={12}>
                      <span style={{ ...labelCss, width: 100, flexShrink: 0 }}>Job title</span>
                      <span style={body}><Highlight text={profile.currentPositionTitle} query={query} /></span>
                    </Row>
                  )}
                </div>
              )}

              {/* Past positions */}
              {(profile.pastPositionSummary || profile.pastPositionTitle) && (
                <div>
                  <div style={{ ...labelCss, fontWeight: 700, marginBottom: 4 }}>Past positions</div>
                  {profile.pastPositionSummary && (
                    <Row gap={12}>
                      <span style={{ ...labelCss, width: 100, flexShrink: 0 }}>Summary</span>
                      <span style={body}><Highlight text={profile.pastPositionSummary} query={query} /></span>
                    </Row>
                  )}
                  {profile.pastPositionTitle && (
                    <Row gap={12}>
                      <span style={{ ...labelCss, width: 100, flexShrink: 0 }}>Job title</span>
                      <span style={body}><Highlight text={profile.pastPositionTitle} query={query} /></span>
                    </Row>
                  )}
                </div>
              )}

              {/* Skill dots */}
              {profile.skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, paddingTop: 4, borderTop: "1px solid var(--palette-neutral-0)", marginTop: 4 }}>
                  {profile.skills.map(s => (
                    <SkillProfile
                      key={s.label}
                      label={s.label}
                      proficiency={s.proficiency}
                      core={s.core}
                      verified={s.verified}
                      verifiedCredy={s.verifiedCredy}
                      development={s.development}
                    />
                  ))}
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function ProfileTable({ profiles, query, defaultExpanded = false }: { profiles: ProfileEntry[]; query: string; defaultExpanded?: boolean }) {
  return (
    <Tile tileStyle="highlight" padding="content" style={{ padding: 0, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: 20 }} />
            <th style={{ ...thStyle, width: 28 }}>
              <Checkbox onChange={() => {}} />
            </th>
            <th style={thStyle}>Name</th>
            <th style={{ ...thStyle, width: 100 }}>Core skills</th>
            <th style={{ ...thStyle, width: 100 }}>Other skills</th>
            <th style={{ ...thStyle, width: 100 }} />
          </tr>
        </thead>
        <tbody>
          {profiles.map(p => (
            <ProfileTableRow key={p.id} profile={p} query={query} showExpanded={defaultExpanded} />
          ))}
        </tbody>
      </table>
    </Tile>
  );
}

// ── Full screens ──────────────────────────────────────────────────────────────

function ProfilesDirectoryScreen({
  initialSearch = "",
  initialView = "cards" as ViewMode,
  initialSort = "Most relevant",
}) {
  const [search, setSearch]     = useState(initialSearch);
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const sort = initialSort;

  const profiles = search.trim() ? PROFILES_SEARCH : PROFILES_BROWSE;
  const count    = search.trim() ? 145 : 274;
  const unit     = search.trim() ? "profiles" : "profiles";

  const filtered = profiles.filter(p =>
    !search.trim() ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    (p.skillsHighlightText ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="profiles" />

      <div style={{ flex: 1, padding: "24px 24px 32px", display: "flex", flexDirection: "column" }}>
        <div style={{ maxWidth: 1600, margin: "0 auto", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>

          {/* Page header */}
          <SB style={{ marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-family)", fontSize: 32, fontWeight: 600, color: "var(--palette-blue-0)" }}>Profiles</span>
            <Button kind="secondary" size="regular">Import</Button>
          </SB>

          {/* Toolbar */}
          <Toolbar
            search={search}
            onSearch={setSearch}
            sort={sort}
            count={count}
            unit={unit}
            viewMode={viewMode}
            onViewMode={setViewMode}
          />

          {/* Results */}
          {viewMode === "cards" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filtered.map(p => (
                <ProfileCard key={p.id} profile={p} query={search} />
              ))}
            </div>
          ) : (
            <ProfileTable
              profiles={filtered}
              query={search}
              defaultExpanded={!!search.trim()}
            />
          )}

        </div>
      </div>
    </div>
  );
}

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Screens/ProfilesDirectory",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Profiles Directory — 4 variants. " +
          "Cards: Tile interactive content per profile row, Avatar + name link + skill dots (SkillProfile) + highlighted skill/bio text. " +
          "Table: Tile highlight content, custom expandable rows — collapsed shows name/counts/Shortlist, expanded shows Skills/Bio/Positions/skill dots on neutral-2 bg. " +
          "Search highlights query matches in yellow. Toolbar has cards/table toggle using primary/icon Button kinds.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Cards: Story = {
  name: "Cards",
  render: () => <ProfilesDirectoryScreen initialSearch="" initialView="cards" initialSort="Profile name" />,
};

export const TableView: Story = {
  name: "Table",
  render: () => <ProfilesDirectoryScreen initialSearch="" initialView="table" initialSort="Profile name" />,
};

export const SearchingCards: Story = {
  name: "Searching — Cards",
  render: () => <ProfilesDirectoryScreen initialSearch="project management" initialView="cards" initialSort="Most relevant" />,
};

export const SearchingTable: Story = {
  name: "Searching — Table",
  render: () => <ProfilesDirectoryScreen initialSearch="project management" initialView="table" initialSort="Most relevant" />,
};
