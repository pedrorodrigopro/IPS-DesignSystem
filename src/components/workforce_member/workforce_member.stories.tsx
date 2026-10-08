// WorkforceMember stories — Figma node 2249:141815
import type { Meta, StoryObj } from "@storybook/react";
import { WorkforceMember } from "./workforce_member";

const meta: Meta<typeof WorkforceMember> = {
  title: "Components/WorkforceMember",
  component: WorkforceMember,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Profile/Workforce Member display in 5 variants: small-1line, small-2lines, small-3lines, big, card. " +
          "Supports profile icon badges (placeholder, suspended, interest, contractualTimeSlice, suggested, namedResource) " +
          "each with a tooltip on hover. Icons sit inline next to the name.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WorkforceMember>;

const baseProps = {
  name: "Charlie Parker",
  initials: "CP",
  email: "charlie.parker@profinda.com",
  jobTitle: "Project Manager",
};

// ── small-1line ────────────────────────────────────────────────────────────────

export const Small1Line: Story = {
  name: "small-1line (default)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <WorkforceMember variant="small-1line" {...baseProps} />
      <WorkforceMember variant="small-1line" {...baseProps} onClick={() => alert("clicked")} />
      <WorkforceMember variant="small-1line" {...baseProps} suspended />
      <WorkforceMember variant="small-1line" {...baseProps} placeholder />
      <WorkforceMember variant="small-1line" {...baseProps} interest />
      <WorkforceMember variant="small-1line" {...baseProps} contractualTimeSlice />
      <WorkforceMember variant="small-1line" {...baseProps} suggested />
      <WorkforceMember variant="small-1line" {...baseProps} namedResource />
    </div>
  ),
};

// ── small-2lines ───────────────────────────────────────────────────────────────

export const Small2Lines: Story = {
  name: "small-2lines",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <WorkforceMember variant="small-2lines" {...baseProps} />
      <WorkforceMember variant="small-2lines" {...baseProps} suspended />
      <WorkforceMember variant="small-2lines" {...baseProps} contractualTimeSlice suggested />
      <WorkforceMember variant="small-2lines" {...baseProps} namedResource />
    </div>
  ),
};

// ── small-3lines ───────────────────────────────────────────────────────────────

export const Small3Lines: Story = {
  name: "small-3lines",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <WorkforceMember variant="small-3lines" {...baseProps} />
      <WorkforceMember variant="small-3lines" {...baseProps} interest placeholder />
      <WorkforceMember variant="small-3lines" {...baseProps} namedResource />
    </div>
  ),
};

// ── big ────────────────────────────────────────────────────────────────────────

export const Big: Story = {
  name: "big",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <WorkforceMember
        variant="big"
        {...baseProps}
        datapoints={[
          { label: "Job title",    value: "Agile Business Analyst" },
          { label: "Location",     value: "Brown" },
          { label: "Starting date",value: "31 May 1996" },
          { label: "Languages",    value: "English, French, Romanian, Spanish" },
        ]}
      />
      <WorkforceMember
        variant="big"
        {...baseProps}
        contractualTimeSlice
        suggested
        datapoints={[
          { label: "Job title",    value: "Senior Developer" },
          { label: "Location",     value: "London" },
        ]}
      />
    </div>
  ),
};

// ── card ───────────────────────────────────────────────────────────────────────

export const Card: Story = {
  name: "card",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <WorkforceMember
        variant="card"
        name="Ashlynn Lipshutz"
        initials="AL"
        jobTitle="Senior Project Manager"
      />
      <WorkforceMember
        variant="card"
        name="Ashlynn Lipshutz"
        initials="AL"
        jobTitle="Senior Project Manager"
        addedBy="Integration"
        suggested
      />
      <WorkforceMember
        variant="card"
        name="Ashlynn Lipshutz"
        initials="AL"
        jobTitle="Senior Project Manager"
        namedResource
        suspended
      />
    </div>
  ),
};

// ── All profile icons ──────────────────────────────────────────────────────────

export const AllProfileIcons: Story = {
  name: "All profile icons (hover for tooltips)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 40 }}>
      {[
        { label: "Placeholder",            props: { placeholder: true } },
        { label: "Suspended",              props: { suspended: true } },
        { label: "Interest",               props: { interest: true } },
        { label: "Contractual time slice", props: { contractualTimeSlice: true } },
        { label: "Suggested",              props: { suggested: true } },
        { label: "Named resource",         props: { namedResource: true } },
        { label: "All flags",              props: { placeholder: true, suspended: true, interest: true, contractualTimeSlice: true, suggested: true, namedResource: true } },
      ].map(({ label, props }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", width: 180, flexShrink: 0 }}>
            {label}
          </span>
          <WorkforceMember variant="small-1line" {...baseProps} {...props} />
        </div>
      ))}
    </div>
  ),
};

// ── All variants ───────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 40 }}>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>small-1line</p>
        <WorkforceMember variant="small-1line" {...baseProps} interest />
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>small-2lines</p>
        <WorkforceMember variant="small-2lines" {...baseProps} suggested />
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>small-3lines</p>
        <WorkforceMember variant="small-3lines" {...baseProps} contractualTimeSlice />
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>big</p>
        <WorkforceMember
          variant="big"
          {...baseProps}
          datapoints={[
            { label: "Job title", value: "Agile Business Analyst" },
            { label: "Location",  value: "Brown" },
          ]}
        />
      </div>
      <div>
        <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#5C6E9E", marginBottom: 8, fontWeight: 700 }}>card</p>
        <WorkforceMember
          variant="card"
          name="Ashlynn Lipshutz"
          initials="AL"
          jobTitle="Senior Project Manager"
          addedBy="Integration"
          namedResource
        />
      </div>
    </div>
  ),
};
