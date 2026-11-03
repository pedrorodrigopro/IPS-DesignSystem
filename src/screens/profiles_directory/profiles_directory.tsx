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

import { useEffect, useState } from "react";

import { Navbar }           from "../../components/navbar/navbar";
import { Tile }             from "../../components/tile/tile";
import { Divider }          from "../../components/divider/divider";
import { Icon }             from "../../components/icon/icon";
import { Button }           from "../../components/button/button";
import { Avatar }           from "../../components/avatar/avatar";
import { Checkbox }         from "../../components/checkbox/checkbox";
import { Alert }            from "../../components/alert/alert";
import { CVStudioScreen, ZARA } from "../cv_studio/cv_studio";
import { SkillProfile }     from "../../components/skill/skill";
import { InputSearch }      from "../../components/input/input";
import { Pagination }       from "../../components/pagination/pagination";

// ── Typography helpers ────────────────────────────────────────────────────────

const bodyBold: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%" };
const body:     React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%" };
const labelCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%" };
const linkCss:  React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 16, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%" };

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

// 30 fictional people (first + last name), alphabetical like the "Profile name" sort; shown 10 per page
const PROFILES_BROWSE: ProfileEntry[] = [
  { id: "b1", name: "Aisha Rahman", initials: "AR", subtitle: "Senior Accountant, English, Urdu, Senior", coreSkills: 0, otherSkills: 40, skills: [{ label: "Financial Reporting", proficiency: "basic", core: true }, { label: "Budgeting and Forecasting", proficiency: "intermediate" }, { label: "IFRS", proficiency: "advanced" }] },
  { id: "b2", name: "Amelie Dubois", initials: "AD", subtitle: "UX Designer, English, French, Mid", coreSkills: 0, otherSkills: 77, skills: [{ label: "Interaction Design", proficiency: "advanced" }, { label: "Figma", proficiency: "basic" }, { label: "Design Systems", proficiency: "intermediate" }] },
  { id: "b3", name: "Chloe Nakamura", initials: "CN", subtitle: "QA Engineer, English, Japanese, Mid", coreSkills: 0, otherSkills: 114, skills: [{ label: "Cypress", proficiency: "intermediate" }, { label: "Test Planning", proficiency: "advanced" }, { label: "Bug Triage", proficiency: "basic" }] },
  { id: "b4", name: "Daniel Kowalski", initials: "DK", subtitle: "Software Engineer, English, Polish, Senior", coreSkills: 3, otherSkills: 151, skills: [{ label: "AWS", proficiency: "basic", core: true }, { label: "System Design", proficiency: "intermediate" }, { label: "Kubernetes", proficiency: "advanced" }] },
  { id: "b5", name: "Elena Popescu", initials: "EP", subtitle: "Project Manager, English, Romanian, Lead", coreSkills: 0, otherSkills: 188, skills: [{ label: "Roadmapping", proficiency: "advanced" }, { label: "Project Management", proficiency: "basic" }, { label: "Agile Practices", proficiency: "intermediate" }] },
  { id: "b6", name: "Emma Fischer", initials: "EF", subtitle: "Data Analyst, English, German, Mid", coreSkills: 0, otherSkills: 55, skills: [{ label: "SQL", proficiency: "intermediate" }, { label: "Python", proficiency: "advanced" }, { label: "Data Modelling", proficiency: "basic" }] },
  { id: "b7", name: "Ethan Walsh", initials: "EW", subtitle: "Sales Manager, English, Lead", coreSkills: 0, otherSkills: 92, skills: [{ label: "Negotiation", proficiency: "basic", core: true }, { label: "Pipeline Management", proficiency: "intermediate" }, { label: "CRM", proficiency: "advanced" }] },
  { id: "b8", name: "Fatima Zahra", initials: "FZ", subtitle: "Compliance Officer, English, Arabic, French, Senior", coreSkills: 0, otherSkills: 129, skills: [{ label: "Data Protection", proficiency: "advanced" }, { label: "Policy Drafting", proficiency: "basic" }, { label: "Risk Management", proficiency: "intermediate" }] },
  { id: "b9", name: "Grace Thompson", initials: "GT", subtitle: "HR Business Partner, English, Senior", coreSkills: 0, otherSkills: 166, skills: [{ label: "Onboarding", proficiency: "intermediate" }, { label: "Performance Management", proficiency: "advanced" }, { label: "Talent Acquisition", proficiency: "basic" }] },
  { id: "b10", name: "Hannah Lindqvist", initials: "HL", subtitle: "Financial Analyst, English, Swedish, Junior", coreSkills: 3, otherSkills: 203, skills: [{ label: "Risk Management", proficiency: "basic", core: true }, { label: "Financial Reporting", proficiency: "intermediate" }, { label: "Budgeting and Forecasting", proficiency: "advanced" }] },
  { id: "b11", name: "Hugo Santos", initials: "HS", subtitle: "DevOps Engineer, English, Portuguese, Senior", coreSkills: 0, otherSkills: 70, skills: [{ label: "AWS", proficiency: "advanced" }, { label: "System Design", proficiency: "basic" }, { label: "Kubernetes", proficiency: "intermediate" }] },
  { id: "b12", name: "Isabella Rossi", initials: "IR", subtitle: "Business Analyst, English, Italian, Mid", coreSkills: 0, otherSkills: 107, skills: [{ label: "Agile Practices", proficiency: "intermediate" }, { label: "Stakeholder Management", proficiency: "advanced" }, { label: "PRINCE2", proficiency: "basic" }] },
  { id: "b13", name: "Jonas Berg", initials: "JB", subtitle: "Solutions Architect, English, Norwegian, German, Principal", coreSkills: 0, otherSkills: 144, skills: [{ label: "Kubernetes", proficiency: "basic", core: true }, { label: "PostgreSQL", proficiency: "intermediate" }, { label: "TypeScript", proficiency: "advanced" }] },
  { id: "b14", name: "Kofi Mensah", initials: "KM", subtitle: "Consultant, English, Twi, Mid", coreSkills: 0, otherSkills: 181, skills: [{ label: "Business Cases", proficiency: "advanced" }, { label: "Change Management", proficiency: "basic" }, { label: "Stakeholder Management", proficiency: "intermediate" }] },
  { id: "b15", name: "Layla Haddad", initials: "LH", subtitle: "Product Designer, English, Arabic, Senior", coreSkills: 0, otherSkills: 48, skills: [{ label: "Prototyping", proficiency: "intermediate" }, { label: "User Research", proficiency: "advanced" }, { label: "Interaction Design", proficiency: "basic" }] },
  { id: "b16", name: "Liam Brennan", initials: "LB", subtitle: "Account Executive, English, Mid", coreSkills: 3, otherSkills: 85, skills: [{ label: "Account Management", proficiency: "basic", core: true }, { label: "Negotiation", proficiency: "intermediate" }, { label: "Pipeline Management", proficiency: "advanced" }] },
  { id: "b17", name: "Lucas Moreau", initials: "LM", subtitle: "Data Engineer, English, French, Senior", coreSkills: 0, otherSkills: 122, skills: [{ label: "Python", proficiency: "advanced" }, { label: "Data Modelling", proficiency: "basic" }, { label: "Dashboards", proficiency: "intermediate" }] },
  { id: "b18", name: "Mateo Alvarez", initials: "MA", subtitle: "QA Lead, English, Spanish, Lead", coreSkills: 0, otherSkills: 159, skills: [{ label: "Cypress", proficiency: "intermediate" }, { label: "Test Planning", proficiency: "advanced" }, { label: "Bug Triage", proficiency: "basic" }] },
  { id: "b19", name: "Maya Okonkwo", initials: "MO", subtitle: "Engagement Manager, English, Igbo, Lead", coreSkills: 0, otherSkills: 196, skills: [{ label: "Business Cases", proficiency: "basic", core: true }, { label: "Change Management", proficiency: "intermediate" }, { label: "Stakeholder Management", proficiency: "advanced" }] },
  { id: "b20", name: "Mikhail Petrov", initials: "MP", subtitle: "Backend Developer, English, Russian, Mid", coreSkills: 0, otherSkills: 63, skills: [{ label: "Kubernetes", proficiency: "advanced" }, { label: "PostgreSQL", proficiency: "basic" }, { label: "TypeScript", proficiency: "intermediate" }] },
  { id: "b21", name: "Noah Ivanov", initials: "NI", subtitle: "Risk Analyst, English, Bulgarian, Mid", coreSkills: 0, otherSkills: 100, skills: [{ label: "Financial Reporting", proficiency: "intermediate" }, { label: "Budgeting and Forecasting", proficiency: "advanced" }, { label: "IFRS", proficiency: "basic" }] },
  { id: "b22", name: "Nora Johansson", initials: "NJ", subtitle: "Legal Counsel, English, Swedish, Senior", coreSkills: 3, otherSkills: 137, skills: [{ label: "Contract Review", proficiency: "basic", core: true }, { label: "Data Protection", proficiency: "intermediate" }, { label: "Policy Drafting", proficiency: "advanced" }] },
  { id: "b23", name: "Oscar Andersson", initials: "OA", subtitle: "Scrum Master, English, Swedish, Mid", coreSkills: 0, otherSkills: 174, skills: [{ label: "Stakeholder Management", proficiency: "advanced" }, { label: "PRINCE2", proficiency: "basic" }, { label: "Roadmapping", proficiency: "intermediate" }] },
  { id: "b24", name: "Priya Nair", initials: "PN", subtitle: "Data Scientist, English, Hindi, Malayalam, Senior", coreSkills: 0, otherSkills: 41, skills: [{ label: "Dashboards", proficiency: "intermediate" }, { label: "Machine Learning", proficiency: "advanced" }, { label: "SQL", proficiency: "basic" }] },
  { id: "b25", name: "Ravi Patel", initials: "RP", subtitle: "Frontend Developer, English, Gujarati, Mid", coreSkills: 0, otherSkills: 78, skills: [{ label: "AWS", proficiency: "basic", core: true }, { label: "System Design", proficiency: "intermediate" }, { label: "Kubernetes", proficiency: "advanced" }] },
  { id: "b26", name: "Samuel Adeyemi", initials: "SA", subtitle: "Sales Intern, English, Yoruba, Intern", coreSkills: 0, otherSkills: 115, skills: [{ label: "Account Management", proficiency: "advanced" }, { label: "Negotiation", proficiency: "basic" }, { label: "Pipeline Management", proficiency: "intermediate" }] },
  { id: "b27", name: "Sofia Marchetti", initials: "SM", subtitle: "Talent Acquisition Lead, English, Italian, Lead", coreSkills: 0, otherSkills: 152, skills: [{ label: "Employee Relations", proficiency: "intermediate" }, { label: "Workforce Planning", proficiency: "advanced" }, { label: "Onboarding", proficiency: "basic" }] },
  { id: "b28", name: "Tomas Novak", initials: "TN", subtitle: "Test Automation Engineer, English, Czech, Senior", coreSkills: 3, otherSkills: 189, skills: [{ label: "Cypress", proficiency: "basic", core: true }, { label: "Test Planning", proficiency: "intermediate" }, { label: "Bug Triage", proficiency: "advanced" }] },
  { id: "b29", name: "Yuki Tanaka", initials: "YT", subtitle: "Management Consultant, English, Japanese, Senior", coreSkills: 0, otherSkills: 56, skills: [{ label: "Business Cases", proficiency: "advanced" }, { label: "Change Management", proficiency: "basic" }, { label: "Stakeholder Management", proficiency: "intermediate" }] },
  { id: "b30", name: "Zainab Hussein", initials: "ZH", subtitle: "Finance Manager, English, Somali, Arabic, Lead", coreSkills: 0, otherSkills: 93, skills: [{ label: "Risk Management", proficiency: "intermediate" }, { label: "Financial Reporting", proficiency: "advanced" }, { label: "Budgeting and Forecasting", proficiency: "basic" }] },
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

function ProfileTableRow({
  profile, query, showExpanded, selected, onToggle,
}: { profile: ProfileEntry; query: string; showExpanded: boolean; selected: boolean; onToggle: (checked: boolean) => void }) {
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
          <Checkbox checked={selected} onChange={onToggle} />
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

function ProfileTable({
  profiles, query, defaultExpanded = false, selectedIds, onToggle, onToggleAll,
}: {
  profiles: ProfileEntry[]; query: string; defaultExpanded?: boolean;
  selectedIds: string[]; onToggle: (id: string, checked: boolean) => void; onToggleAll: (checked: boolean) => void;
}) {
  const selectedCount = profiles.filter(p => selectedIds.includes(p.id)).length;
  return (
    <Tile tileStyle="highlight" padding="content" style={{ padding: 0, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: 20 }} />
            <th style={{ ...thStyle, width: 28 }}>
              <Checkbox
                checked={profiles.length > 0 && selectedCount === profiles.length}
                indeterminate={selectedCount > 0 && selectedCount < profiles.length}
                onChange={onToggleAll}
              />
            </th>
            <th style={thStyle}>Name</th>
            <th style={{ ...thStyle, width: 100 }}>Core skills</th>
            <th style={{ ...thStyle, width: 100 }}>Other skills</th>
            <th style={{ ...thStyle, width: 100 }} />
          </tr>
        </thead>
        <tbody>
          {profiles.map(p => (
            <ProfileTableRow key={p.id} profile={p} query={query} showExpanded={defaultExpanded} selected={selectedIds.includes(p.id)} onToggle={checked => onToggle(p.id, checked)} />
          ))}
        </tbody>
      </table>
    </Tile>
  );
}

const PAGE_SIZE = 10;

// ── Full screens ──────────────────────────────────────────────────────────────

export function ProfilesDirectoryScreen({
  initialSearch = "",
  initialView = "cards" as ViewMode,
  initialSort = "Most relevant",
  onNavigate,
}: {
  initialSearch?: string;
  initialView?: ViewMode;
  initialSort?: string;
  /** Navbar item clicked (e.g. "profile" → back to My Profile) */
  onNavigate?: (id: string) => void;
}) {
  const [search, setSearch]     = useState(initialSearch);
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [exporting, setExporting] = useState(false);
  const [page, setPage]     = useState(1);
  const sort = initialSort;

  const profiles = search.trim() ? PROFILES_SEARCH : PROFILES_BROWSE;
  const count    = search.trim() ? 145 : PROFILES_BROWSE.length;
  const unit     = search.trim() ? "profiles" : "profiles";

  const filtered = profiles.filter(p =>
    !search.trim() ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    (p.skillsHighlightText ?? "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination — PAGE_SIZE rows per page; the bulk selection survives page changes
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current   = Math.min(page, pageCount);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  // ESC closes the bulk selection
  useEffect(() => {
    if (selectedIds.length === 0 || exporting) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedIds([]); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIds.length, exporting]);

  // Bulk selection (table view) → "Export CV" opens CV Studio for the selected profiles; Close comes back here
  const selected = filtered.filter(p => selectedIds.includes(p.id));
  if (exporting && selected.length > 0) {
    const cvs = selected.map(p => ({
      ...ZARA,
      name: p.name,
      jobTitle: p.subtitle.split(",")[0],
      email: `${p.name.toLowerCase().replace(/[^a-z ]/g, "").trim().replace(/ +/g, ".")}@pf.com`,
    }));
    return <CVStudioScreen cvs={cvs} onClose={() => setExporting(false)} onNavigate={id => { if (id === "profiles") setExporting(false); else onNavigate?.(id); }} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="profiles" onSelect={onNavigate} />

      <div style={{ flex: 1, padding: "24px 24px 32px", display: "flex", flexDirection: "column" }}>
        <div style={{ maxWidth: 1600, margin: "0 auto", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>

          {/* Page header — the bulk banner appears horizontally centred in this row (600px); the row keeps its height so nothing shifts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 600px 1fr", alignItems: "center", columnGap: 24, height: 48, marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-family)", fontSize: 32, fontWeight: 600, color: "var(--palette-blue-0)" }}>Profiles</span>
            <div>
              {viewMode === "table" && selected.length > 0 && (
                <Alert
                  type="bulk-banner"
                  layout="inline"
                  message={`${selected.length} ${selected.length === 1 ? "profile" : "profiles"} selected`}
                  actions={[{ label: `Export CV (${selected.length})`, onClick: () => setExporting(true) }]}
                  onDismiss={() => setSelectedIds([])}
                />
              )}
            </div>
            <div style={{ justifySelf: "end" }}>
              <Button kind="secondary" size="regular">Import</Button>
            </div>
          </div>

          {/* Toolbar */}
          <Toolbar
            search={search}
            onSearch={v => { setSearch(v); setPage(1); }}
            sort={sort}
            count={count}
            unit={unit}
            viewMode={viewMode}
            onViewMode={setViewMode}
          />

          {/* Results */}
          {viewMode === "cards" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {pageItems.map(p => (
                <ProfileCard key={p.id} profile={p} query={search} />
              ))}
            </div>
          ) : (
            <ProfileTable
              profiles={pageItems}
              query={search}
              defaultExpanded={!!search.trim()}
              selectedIds={selectedIds}
              onToggle={(id, checked) => setSelectedIds(ids => (checked ? [...ids, id] : ids.filter(x => x !== id)))}
              onToggleAll={checked => setSelectedIds(ids => { const rest = ids.filter(id => !pageItems.some(p => p.id === id)); return checked ? [...rest, ...pageItems.map(p => p.id)] : rest; })}
            />
          )}

          {/* Pagination — only when there is more than one page */}
          {pageCount > 1 && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
              <Pagination total={pageCount} current={current} onChange={setPage} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

