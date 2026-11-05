// Screens/RollForward — Roll forward wizard (Filters, Source and target engagements, Continuity and dates, Summary)
// Figma: GNaUzdui1Ymrq8CZRyOLEJ node 2295:249944. One story per Figma state.
import type { Meta, StoryObj } from "@storybook/react";
import { addons } from "@storybook/preview-api";
import { RollForwardShell, FiltersStep, SourceTargetStep, ContinuityStep, SummaryScreen } from "./roll_forward";
import type { RollForwardShellProps } from "./roll_forward";

const meta: Meta = {
  title: "Screens/RollForward",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Roll forward wizard — four steps (Filters, Source and target engagements, Continuity and dates, Summary). " +
          "One story per Figma state. Controls inside a step work locally. Previous, Next and the Wizard steps jump between the step stories (every earlier step is clickable, the next one only while Next is enabled); Cancel does nothing.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ── Navigation between the step stories ──────────────────────────────────────
// Each story is one Figma state, so Previous / Next / Wizard clicks switch to the story of the target step.
// Going forward lands on the step's initial state (e.g. Continuity — Empty); going back lands on a "completed" state.
const STORY_IDS = {
  filters: "screens-rollforward--filters-narrowed",
  sourceTarget: "screens-rollforward--source-target-default",
  continuityEmpty: "screens-rollforward--continuity-empty",
  continuityDone: "screens-rollforward--continuity-date-set",
  summary: "screens-rollforward--summary-collapsed",
};

function goToStep(from: number, to: number) {
  const id =
    to === 0 ? STORY_IDS.filters :
    to === 1 ? STORY_IDS.sourceTarget :
    to === 2 ? (from < 2 ? STORY_IDS.continuityEmpty : STORY_IDS.continuityDone) :
    STORY_IDS.summary;
  addons.getChannel().emit("selectStory", { storyId: id });
}

/** RollForwardShell wired to the step stories */
function Shell(props: Omit<RollForwardShellProps, "onStepChange">) {
  return <RollForwardShell {...props} onStepChange={to => goToStep(props.step, to)} />;
}

const APPLY_FILTERS = "Please apply filters to narrow down engagements (max 100)";

// ── Step 1 — Filters ──────────────────────────────────────────────────────────

export const FiltersEmpty: Story = {
  name: "Filters — Empty",
  render: () => (
    <Shell
      step={0}
      infoText={`101 engagements · 671 roles · ${APPLY_FILTERS}`}
      nextDisabled
      nextTooltip={APPLY_FILTERS}
    >
      <FiltersStep template="2 selected" />
    </Shell>
  ),
};

export const FiltersNarrowed: Story = {
  name: "Filters — Narrowed",
  render: () => (
    <Shell step={0} infoText="2 engagements · 12 roles">
      <FiltersStep template="2 selected" id="2 selected" />
    </Shell>
  ),
};

export const FiltersByAssignee: Story = {
  name: "Filters — By assignee",
  render: () => (
    <Shell step={0} infoText="2 engagements · 12 roles">
      <FiltersStep template="2 selected" assignee="Charlie Parker" />
    </Shell>
  ),
};

export const FiltersRoleFilters: Story = {
  name: "Filters — Role filters",
  render: () => (
    <Shell step={0} infoText="2 engagements · 8 roles">
      <FiltersStep template="2 selected" id="2 selected" roleFilters roleStartDate="1 Oct 2026" />
    </Shell>
  ),
};

// ── Step 2 — Source and target engagements ────────────────────────────────────

export const SourceTargetDefault: Story = {
  name: "Source and target — Default",
  render: () => (
    <Shell step={1}>
      <SourceTargetStep />
    </Shell>
  ),
};

// ── Step 3 — Continuity and dates ─────────────────────────────────────────────

export const ContinuityEmpty: Story = {
  name: "Continuity — Empty",
  render: () => (
    <Shell step={2} nextDisabled>
      <ContinuityStep />
    </Shell>
  ),
};

export const ContinuityDateSet: Story = {
  name: "Continuity — Date set",
  render: () => (
    <Shell step={2}>
      <ContinuityStep startDate="1 Oct 2026" />
    </Shell>
  ),
};

// ── Step 4 — Summary ──────────────────────────────────────────────────────────

export const SummaryCollapsed: Story = {
  name: "Summary — Collapsed",
  render: () => <SummaryScreen onStepChange={to => goToStep(3, to)} />,
};

export const SummaryExpanded: Story = {
  name: "Summary — Expanded",
  render: () => <SummaryScreen expanded onStepChange={to => goToStep(3, to)} />,
};
