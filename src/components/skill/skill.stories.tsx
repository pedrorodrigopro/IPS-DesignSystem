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
    marginBottom: 32,
    background: dark ? "#0D2976" : "transparent",
    padding: dark ? "16px" : 0,
    borderRadius: dark ? 8 : 0,
  }}>
    <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: dark ? "#5C6E9E" : "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{label}</div>
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>{children}</div>
  </div>
);

// ── Proficiency levels ────────────────────────────────────────────────────────

export const ProficiencyLevels: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Role dots (10×4px pill)">
      <SkillRole label="Basic" proficiency="basic" />
      <SkillRole label="Intermediate" proficiency="intermediate" />
      <SkillRole label="Advanced" proficiency="advanced" />
    </Section>
    <Section label="Profile dots (10×10px circle)">
      <SkillProfile label="Basic" proficiency="basic" />
      <SkillProfile label="Intermediate" proficiency="intermediate" />
      <SkillProfile label="Advanced" proficiency="advanced" />
    </Section>
    <Section label="Dark theme" dark>
      <SkillRole label="Basic" proficiency="basic" theme="dark" />
      <SkillProfile label="Intermediate" proficiency="intermediate" theme="dark" />
    </Section>
  </div>
);

// ── Skill/Role — hover shows tooltip ─────────────────────────────────────────

export const Role: StoryFn = () => (
  <div style={{ padding: "80px 24px 24px" }}>
    <Section label="Hover any skill to see tooltip">
      <SkillRole label="Jira" proficiency="advanced" />
      <SkillRole label="React" proficiency="intermediate" career />
      <SkillRole label="Python" proficiency="basic" showDivider />
    </Section>
    <Section label="Dark theme" dark>
      <SkillRole label="Jira" proficiency="advanced" theme="dark" />
      <SkillRole label="React" proficiency="intermediate" career theme="dark" />
    </Section>
  </div>
);

// ── Skill/Profile — tooltip shows icons ──────────────────────────────────────

export const Profile: StoryFn = () => (
  <div style={{ padding: "80px 24px 24px" }}>
    <Section label="Hover any skill to see tooltip">
      <SkillProfile label="Jira" proficiency="advanced" core development verified verifiedCredy verifiedFeedback career />
      <SkillProfile label="React" proficiency="intermediate" development verified />
      <SkillProfile label="Python" proficiency="basic" />
    </Section>
    <Section label="Dark theme" dark>
      <SkillProfile label="Jira" proficiency="advanced" core development verified theme="dark" />
    </Section>
  </div>
);

// ── Skill/Match — tooltip shows both columns ──────────────────────────────────

export const Match: StoryFn = () => (
  <div style={{ padding: "80px 24px 24px" }}>
    <Section label="Match — hover to see Required + Profile">
      <SkillMatch label="Jira" requiredProficiency="advanced" profileProficiency="advanced" core development />
      <SkillMatch label="React" requiredProficiency="intermediate" profileProficiency="basic" />
      <SkillMatch label="Vue" requiredProficiency="advanced" profileProficiency="intermediate" verified />
    </Section>
    <Section label="Not met — profile missing skill (cross + faded dots)">
      <SkillMatch label="Jira" requiredProficiency="basic" missing />
      <SkillMatch label="React" requiredProficiency="intermediate" missing />
      <SkillMatch label="Python" requiredProficiency="advanced" missing />
    </Section>
    <Section label="Dark theme" dark>
      <SkillMatch label="Jira" requiredProficiency="advanced" profileProficiency="advanced" theme="dark" />
      <SkillMatch label="React" requiredProficiency="intermediate" missing theme="dark" />
    </Section>
  </div>
);

// ── Skill list ────────────────────────────────────────────────────────────────

export const SkillList: StoryFn = () => (
  <div style={{ padding: "80px 24px 24px" }}>
    <Section label="Role requirements">
      <SkillRole label="Jira" proficiency="advanced" showDivider />
      <SkillRole label="React" proficiency="intermediate" career showDivider />
      <SkillRole label="Python" proficiency="basic" />
    </Section>
    <Section label="Profile skills">
      <SkillProfile label="Jira" proficiency="advanced" core verified showDivider />
      <SkillProfile label="React" proficiency="intermediate" development career showDivider />
      <SkillProfile label="Python" proficiency="basic" verifiedCredy />
    </Section>
    <Section label="Match view (with dividers)">
      <SkillMatch label="Jira" requiredProficiency="advanced" profileProficiency="advanced" core showDivider />
      <SkillMatch label="React" requiredProficiency="intermediate" profileProficiency="basic" showDivider />
      <SkillMatch label="Python" requiredProficiency="basic" missing />
    </Section>
  </div>
);
