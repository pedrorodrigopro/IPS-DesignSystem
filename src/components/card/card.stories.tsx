// Card stories — Figma nodes 9780:172031 (Match) + 9786:67261 (Directory)
// Storybook category: Molecules/Card
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Card } from "./card";
import type { SkillGroup } from "./card";

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Profile card in two variants: **match** (scores + expand/collapse + role fields) and **directory** (with avatar, Open CV button). " +
          "Skills use the SkillMatch component with built-in hover tooltip. " +
          "Shell: white bg, radius 8px, box-shadow rgba(203,225,242,0.8).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const sampleSkillGroups: SkillGroup[] = [
  {
    label: "Essential skills",
    count: "2/2",
    skills: [
      { name: "Project Management", requiredProficiency: "intermediate", profileProficiency: "advanced" },
      { name: "Jira",               requiredProficiency: "intermediate", profileProficiency: "intermediate" },
    ],
  },
  {
    label: "Supporting skills",
    count: "1/1",
    skills: [
      { name: "Agile", requiredProficiency: "basic", profileProficiency: "intermediate" },
    ],
  },
];

const expandedSkillGroups: SkillGroup[] = [
  {
    label: "Related skills",
    skills: [
      { name: "Scrum",      requiredProficiency: "intermediate", profileProficiency: "advanced" },
      { name: "Kanban",     requiredProficiency: "basic", profileProficiency: "basic" },
      { name: "Confluence", requiredProficiency: "basic", profileProficiency: "basic", missing: true },
    ],
  },
  {
    label: "Skills in Framework",
    skills: [
      { name: "Leadership",     requiredProficiency: "intermediate", profileProficiency: "intermediate" },
      { name: "Communication",  requiredProficiency: "intermediate", profileProficiency: "advanced" },
    ],
  },
];

const sampleRoleFields = [
  { label: "Grade",       value: "Senior",       matches: true },
  { label: "Location",    value: "London",        matches: true },
  { label: "Clearance",   value: "SC Required",   matches: false },
  { label: "Start date",  value: "01 Jan 2024",   matches: undefined },
];

// ── Match card — not shortlisted (as in Figma) ─────────────────────────────────

export const MatchNotShortlisted: Story = {
  name: "Match — not shortlisted (collapsed)",
  render: () => (
    <div style={{ maxWidth: 960 }}>
      <Card
        variant="match"
        name="Ashlynn Lipshutz"
        jobTitle="Senior Project Manager"
        initials="AL"
        matchPercent={80}
        availabilityPercent={90}
        skillGroups={sampleSkillGroups}
        expandedSkillGroups={expandedSkillGroups}
        roleFields={sampleRoleFields}
        actions={{
          step: "not-shortlisted",
          onShortlist: () => alert("Shortlist"),
          onFillBook: () => alert("Fill & Book"),
          onFillBookDropdown: () => alert("Fill & Book dropdown"),
        }}
      />
    </div>
  ),
};

// ── Match card — expandable (interactive) ──────────────────────────────────────

export const MatchExpandable: Story = {
  name: "Match — expandable (click chevron)",
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <div style={{ maxWidth: 960 }}>
        <Card
          variant="match"
          name="Ashlynn Lipshutz"
          jobTitle="Senior Project Manager"
          initials="AL"
          matchPercent={80}
          availabilityPercent={90}
          expanded={expanded}
          onExpandedChange={setExpanded}
          skillGroups={sampleSkillGroups}
          expandedSkillGroups={expandedSkillGroups}
          roleFields={sampleRoleFields}
          actions={{
            step: "not-shortlisted",
            onShortlist: () => alert("Shortlist"),
            onFillBook: () => alert("Fill & Book"),
          }}
        />
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginTop: 8 }}>
          {expanded ? "Expanded — click chevron to collapse" : "Collapsed — click chevron to expand"}
        </p>
      </div>
    );
  },
};

// ── Match card — expanded by default ──────────────────────────────────────────

export const MatchExpanded: Story = {
  name: "Match — expanded (with role fields + extra skills)",
  render: () => (
    <div style={{ maxWidth: 960 }}>
      <Card
        variant="match"
        name="Ashlynn Lipshutz"
        jobTitle="Senior Project Manager"
        initials="AL"
        matchPercent={80}
        availabilityPercent={90}
        defaultExpanded
        skillGroups={sampleSkillGroups}
        expandedSkillGroups={expandedSkillGroups}
        roleFields={sampleRoleFields}
        actions={{ step: "not-shortlisted", onShortlist: () => {} }}
      />
    </div>
  ),
};

// ── All resourcing steps ───────────────────────────────────────────────────────

const steps = [
  "not-shortlisted",
  "shortlisted",
  "shortlisted-reviewer",
  "accepted-invite",
  "invited",
  "accepted-fillbook",
  "booked",
  "filled",
  "declined",
] as const;

export const AllResourcingSteps: Story = {
  name: "All resourcing steps",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 960 }}>
      {steps.map((step) => (
        <div key={step}>
          <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 4, fontWeight: 700 }}>
            {step}
          </p>
          <Card
            variant="match"
            name="Ashlynn Lipshutz"
            jobTitle="Senior Project Manager"
            initials="AL"
            matchPercent={80}
            availabilityPercent={90}
            skillGroups={sampleSkillGroups.slice(0, 1)}
            actions={{
              step,
              onShortlist: () => alert("Shortlist"),
              onApprove: () => alert("Approve"),
              onReject: () => alert("Reject"),
              onRevert: () => alert(`Revert from ${step}`),
            }}
          />
        </div>
      ))}
    </div>
  ),
};

// ── Scores demo ────────────────────────────────────────────────────────────────

export const ScoresVariants: Story = {
  name: "Score variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 960 }}>
      {[
        { match: 95, avail: 100 },
        { match: 72, avail: 85 },
        { match: 45, avail: 60 },
        { match: 10, avail: 30 },
      ].map(({ match, avail }) => (
        <Card
          key={match}
          variant="match"
          name="Ashlynn Lipshutz"
          jobTitle="Senior Project Manager"
          initials="AL"
          matchPercent={match}
          availabilityPercent={avail}
          skillGroups={sampleSkillGroups.slice(0, 1)}
          actions={{ step: "not-shortlisted" }}
        />
      ))}
    </div>
  ),
};

// ── Directory ─────────────────────────────────────────────────────────────────

export const Directory: Story = {
  name: "Directory (with avatar, Open CV)",
  render: () => (
    <div style={{ maxWidth: 960 }}>
      <Card
        variant="directory"
        name="Ashlynn Lipshutz"
        jobTitle="Senior Project Manager"
        initials="AL"
        skillGroups={[
          {
            label: "Core skills",
            skills: [
              { name: "Project Management", requiredProficiency: "intermediate" as const, profileProficiency: "advanced" as const },
              { name: "Jira",               requiredProficiency: "basic" as const,        profileProficiency: "intermediate" as const },
            ],
          },
          {
            label: "Other skills",
            skills: [
              { name: "Agile", requiredProficiency: "basic" as const, profileProficiency: "intermediate" as const },
            ],
          },
        ] as SkillGroup[]}
        actions={{
          onShortlist: () => alert("Shortlist"),
          onSecondary: () => alert("Open CV"),
        }}
      />
    </div>
  ),
};

// ── Directory — with profile icons ────────────────────────────────────────────

export const DirectoryWithIcons: Story = {
  name: "Directory — profile flags",
  render: () => (
    <div style={{ maxWidth: 960 }}>
      <Card
        variant="directory"
        name="Charlie Parker"
        jobTitle="Agile Business Analyst"
        initials="CP"
        profileFlags={{ contractualTimeSlice: true, suggested: true }}
        skillGroups={sampleSkillGroups}
        actions={{
          onShortlist: () => alert("Shortlist"),
          onSecondary: () => alert("Open CV"),
        }}
      />
    </div>
  ),
};

// ── Card list ─────────────────────────────────────────────────────────────────

export const CardList: Story = {
  name: "Card list (multiple matches)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 960 }}>
      {[
        { name: "Ashlynn Lipshutz", initials: "AL", match: 80, avail: 90, step: "not-shortlisted" as const },
        { name: "Charlie Parker",   initials: "CP", match: 65, avail: 75, step: "shortlisted" as const },
        { name: "Jane Smith",       initials: "JS", match: 55, avail: 60, step: "invited" as const },
      ].map((p) => (
        <Card
          key={p.name}
          variant="match"
          name={p.name}
          jobTitle="Project Manager"
          initials={p.initials}
          matchPercent={p.match}
          availabilityPercent={p.avail}
          skillGroups={sampleSkillGroups.slice(0, 1)}
          actions={{ step: p.step, onShortlist: () => {} }}
        />
      ))}
    </div>
  ),
};
