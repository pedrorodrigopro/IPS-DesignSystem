import type { Meta, StoryFn } from "@storybook/react";
import {
  PillActivityTag, PillCertificate, PillCustomValue, PillFilter,
  PillKPI, PillModifier, PillRemovable, PillReportStatus,
  PillSavedFilter, PillSimple, PillWFState,
} from "./pill";

export default {
  title: "Components/Pill",
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=14765-208276" },
    layout: "centered",
  },
};

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{label}</div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>{children}</div>
  </div>
);

// ── Master types ──────────────────────────────────────────────────────────────

export const MasterTypes: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Simple — Regular">
      <PillSimple label="New" leftIcon="error" size="regular" />
      <PillSimple label="New" size="regular" />
    </Section>
    <Section label="Removable — Regular">
      <PillRemovable label="Removable" size="regular" onRemove={() => {}} />
    </Section>
    <Section label="Modifier — Regular">
      <PillModifier leftLabel="Variable" rightLabel="Modifier" size="regular" onRemoveLeft={() => {}} onClickRight={() => {}} />
    </Section>
    <Section label="Simple — Small">
      <PillSimple label="New" leftIcon="error" size="small" />
      <PillSimple label="New" size="small" />
    </Section>
    <Section label="Removable — Small">
      <PillRemovable label="Removable" size="small" onRemove={() => {}} />
    </Section>
    <Section label="Modifier — Small">
      <PillModifier leftLabel="Variable" rightLabel="Modifier" size="small" onRemoveLeft={() => {}} onClickRight={() => {}} />
    </Section>
  </div>
);

// ── WF State ──────────────────────────────────────────────────────────────────

export const WFState: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="WF State — Regular">
      {(["new","shortlisting","in-review","invited","pending","partially-filled","filled","partially-booked","booked","partially-confirmed","confirmed","not-filled","exceptions"] as const).map((s) => (
        <PillWFState key={s} state={s} size="regular" />
      ))}
    </Section>
    <Section label="WF State — Small">
      {(["new","shortlisting","in-review","partially-filled","booked","confirmed","not-filled","exceptions"] as const).map((s) => (
        <PillWFState key={s} state={s} size="small" />
      ))}
    </Section>
  </div>
);

// ── Filter ────────────────────────────────────────────────────────────────────

export const Filter: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Filter pill">
      <PillFilter field="Field" value="Value" onRemove={() => {}} />
      <PillFilter field="Status" value="Active" onRemove={() => {}} />
    </Section>
    <Section label="Saved filter pill">
      <PillSavedFilter label="Title" onRemove={() => {}} onShare={() => {}} />
    </Section>
    <Section label="Multiselect pill (PillRemovable)">
      <PillRemovable label="Value" size="regular" bg="#F8F9FD" bordered onRemove={() => {}} />
      <PillRemovable label="Draft" size="regular" bg="#F8F9FD" bordered onRemove={() => {}} />
    </Section>
  </div>
);

// ── Certificate ───────────────────────────────────────────────────────────────

export const Certificate: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Certificate">
      <PillCertificate name="Certificate" date="24 Sep 2027" onRemove={() => {}} />
      <PillCertificate name="AWS Cloud" date="01 Jan 2026" onRemove={() => {}} size="small" />
    </Section>
  </div>
);

// ── Activity tag ──────────────────────────────────────────────────────────────

export const ActivityTag: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Activity tag">
      <PillActivityTag label="RM to review" />
      <PillActivityTag label="Pending approval" size="small" />
    </Section>
  </div>
);

// ── KPI ───────────────────────────────────────────────────────────────────────

export const KPI: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="KPI (small)">
      {(["compliant","approved","exception","rejected","requested","condition-not-met"] as const).map((t) => (
        <PillKPI key={t} type={t} />
      ))}
    </Section>
  </div>
);

// ── Custom value ──────────────────────────────────────────────────────────────

export const CustomValue: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Custom value (small)">
      {(["approved","awaiting","blocked","merged"] as const).map((t) => (
        <PillCustomValue key={t} type={t} />
      ))}
    </Section>
  </div>
);

// ── Report status ─────────────────────────────────────────────────────────────

export const ReportStatus: StoryFn = () => (
  <div style={{ padding: 24 }}>
    <Section label="Report status (small)">
      {(["ready","no-data","failed","pending","in-progress"] as const).map((t) => (
        <PillReportStatus key={t} type={t} />
      ))}
    </Section>
  </div>
);

// ── All pills ─────────────────────────────────────────────────────────────────

export const AllPills: StoryFn = () => (
  <div style={{ padding: 24, maxWidth: 900 }}>
    <Section label="Master — Simple">
      <PillSimple label="New" leftIcon="error" /><PillSimple label="Simple" />
      <PillSimple label="Small" leftIcon="error" size="small" /><PillSimple label="Small" size="small" />
    </Section>
    <Section label="Master — Removable">
      <PillRemovable label="Removable" onRemove={() => {}} />
      <PillRemovable label="Small" size="small" onRemove={() => {}} />
    </Section>
    <Section label="Master — Modifier">
      <PillModifier leftLabel="Variable" rightLabel="Modifier" onRemoveLeft={() => {}} />
    </Section>
    <Section label="WF State">
      {(["new","shortlisting","partially-filled","booked","confirmed","not-filled","exceptions"] as const).map((s) => (
        <PillWFState key={s} state={s} />
      ))}
    </Section>
    <Section label="Filter / Saved Filter">
      <PillFilter field="Field" value="Value" onRemove={() => {}} />
      <PillSavedFilter label="Title" onRemove={() => {}} onShare={() => {}} />
    </Section>
    <Section label="Certificate">
      <PillCertificate name="AWS" date="24 Sep 2027" onRemove={() => {}} />
    </Section>
    <Section label="Activity / KPI / Custom / Report">
      <PillActivityTag label="RM to review" size="small" />
      <PillKPI type="compliant" /><PillKPI type="exception" /><PillKPI type="requested" />
      <PillCustomValue type="approved" /><PillCustomValue type="blocked" />
      <PillReportStatus type="ready" /><PillReportStatus type="failed" />
    </Section>
  </div>
);
