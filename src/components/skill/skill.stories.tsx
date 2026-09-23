import type { Meta, StoryFn } from "@storybook/react";
import { SkillMatch, SkillProfile, SkillRole } from "./skill";

export default {
  title: "Components/Skill",
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=9732-260872" },
    layout: "centered",
  },
};

const Section = ({ label, dark, children }: { label: string; dark?: boolean; children: React.ReactNode }) => (
  <div style={{
    marginBottom: 24,
    background: dark ? "#0D2976" : "transparent",
    padding: dark ? "12px 16px" : 0,
    borderRadius: dark ? 8 : 0,
  }}>
    <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: dark ? "#5C6E9E" : "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{label}</div>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>{children}</div>
  </div>
);

// ── Proficiency level visual ───────────────────────────────────────────────────

export const ProficiencyLevels: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Role dots (10×4px pill) — light">
      <SkillRole label="Basic" proficiency="basic" />
      <SkillRole label="Intermediate" proficiency="intermediate" />
      <SkillRole label="Advanced" proficiency="advanced" />
    </Section>
    <Section label="Profile dots (10×10px circle) — light">
      <SkillProfile label="Basic" proficiency="basic" />
      <SkillProfile label="Intermediate" proficiency="intermediate" />
      <SkillProfile label="Advanced" proficiency="advanced" />
    </Section>
    <Section label="Role dots — dark" dark>
      <SkillRole label="Basic" proficiency="basic" theme="dark" />
      <SkillRole label="Intermediate" proficiency="intermediate" theme="dark" />
      <SkillRole label="Advanced" proficiency="advanced" theme="dark" />
    </Section>
    <Section label="Profile dots — dark" dark>
      <SkillProfile label="Basic" proficiency="basic" theme="dark" />
      <SkillProfile label="Intermediate" proficiency="intermediate" theme="dark" />
      <SkillProfile label="Advanced" proficiency="advanced" theme="dark" />
    </Section>
  </div>
);

// ── Skill/Role ────────────────────────────────────────────────────────────────

export const Role: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Skill/Role — light">
      <SkillRole label="Jira" proficiency="advanced" />
      <SkillRole label="Jira" proficiency="intermediate" career />
      <SkillRole label="Jira" proficiency="basic" showDivider />
    </Section>
    <Section label="Skill/Role — dark" dark>
      <SkillRole label="Jira" proficiency="advanced" theme="dark" />
      <SkillRole label="Jira" proficiency="intermediate" career theme="dark" />
    </Section>
  </div>
);

// ── Skill/Profile ─────────────────────────────────────────────────────────────

export const Profile: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Skill/Profile — with icons">
      <SkillProfile label="Jira" proficiency="advanced" core development verified verifiedCredy verifiedFeedback career />
    </Section>
    <Section label="Skill/Profile — partial icons">
      <SkillProfile label="Jira" proficiency="advanced" core career />
      <SkillProfile label="React" proficiency="intermediate" development verified />
      <SkillProfile label="Python" proficiency="basic" />
      <SkillProfile label="Python" proficiency="basic" showDivider />
    </Section>
    <Section label="Skill/Profile — dark" dark>
      <SkillProfile label="Jira" proficiency="advanced" core development verified theme="dark" />
    </Section>
  </div>
);

// ── Skill/Match ───────────────────────────────────────────────────────────────

export const Match: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Match — profile meets requirement">
      <SkillMatch label="Jira" requiredProficiency="basic" profileProficiency="basic" />
      <SkillMatch label="React" requiredProficiency="intermediate" profileProficiency="advanced" />
      <SkillMatch label="Python" requiredProficiency="advanced" profileProficiency="advanced" core development verified />
    </Section>
    <Section label="Match — profile below requirement">
      <SkillMatch label="Jira" requiredProficiency="advanced" profileProficiency="basic" />
      <SkillMatch label="React" requiredProficiency="advanced" profileProficiency="intermediate" />
    </Section>
    <Section label="Match — profile missing skill">
      <SkillMatch label="Jira" requiredProficiency="basic" missing />
      <SkillMatch label="React" requiredProficiency="intermediate" missing />
      <SkillMatch label="Python" requiredProficiency="advanced" missing />
    </Section>
    <Section label="Match — with divider">
      <SkillMatch label="Jira" requiredProficiency="advanced" profileProficiency="advanced" core showDivider />
    </Section>
    <Section label="Match — dark" dark>
      <SkillMatch label="Jira" requiredProficiency="advanced" profileProficiency="advanced" theme="dark" />
      <SkillMatch label="React" requiredProficiency="intermediate" missing theme="dark" />
    </Section>
  </div>
);

// ── Skill list (with dividers) ────────────────────────────────────────────────

export const SkillList: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Typical skill list — Role context">
      <SkillRole label="Jira" proficiency="advanced" showDivider />
      <SkillRole label="React" proficiency="intermediate" career showDivider />
      <SkillRole label="Python" proficiency="basic" />
    </Section>
    <Section label="Typical skill list — Profile context">
      <SkillProfile label="Jira" proficiency="advanced" core verified showDivider />
      <SkillProfile label="React" proficiency="intermediate" development career showDivider />
      <SkillProfile label="Python" proficiency="basic" verifiedCredy />
    </Section>
    <Section label="Typical skill list — Match context">
      <SkillMatch label="Jira" requiredProficiency="advanced" profileProficiency="advanced" core showDivider />
      <SkillMatch label="React" requiredProficiency="intermediate" profileProficiency="basic" showDivider />
      <SkillMatch label="Python" requiredProficiency="basic" missing />
    </Section>
  </div>
);

// ── All variants ──────────────────────────────────────────────────────────────

export const AllVariants: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="All proficiency × all contexts">
      {(["basic", "intermediate", "advanced"] as const).map((p) => (
        <div key={p} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 10, color: "#8F9ED1", textTransform: "uppercase", letterSpacing: "0.06em" }}>{p}</div>
          <SkillRole label="Jira" proficiency={p} />
          <SkillProfile label="Jira" proficiency={p} />
          <SkillMatch label="Jira" requiredProficiency={p} profileProficiency={p} />
          <SkillMatch label="Jira" requiredProficiency={p} missing />
        </div>
      ))}
    </Section>
  </div>
);
