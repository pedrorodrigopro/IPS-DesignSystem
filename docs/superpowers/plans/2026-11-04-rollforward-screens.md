# RollForward Screens Implementation Plan

> **Status: executed — superseded by the final code where they differ.** Later changes (not reflected below): removed the `With notice` variant/`withNotice` prop; `Table` got `tone="subtle"`; `Create roles` opens a confirmation `Modal` via `SummaryScreen`; tiles use `padding="screen"`, footer `insetX={64}`, grid columns 408/408. See the spec's "Implementation notes".


> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `Screens/RollForward` Storybook category with the four-step Roll forward wizard, one story per Figma state (10 stories).

**Architecture:** Compose existing IPS components (Navbar, Header, Wizard, Tile, Actions, Input*, Toggle, Radio, Switch, Checkbox, Table, Alert, Tooltip) in `src/screens/roll_forward/roll_forward.tsx` (shell + four step components + sample data) with a thin `roll_forward.stories.tsx`. Two small, backwards-compatible IPS additions come first: `Input`/`InputSelect` (`rightIcon`, `onClear`) and `Actions` (`infoText`, `ActionItem.tooltip`, `ActionItem.iconPosition`).

**Tech Stack:** React 19, TypeScript (strict), SCSS modules, Storybook 8 (Vite). Repo: `/Users/pedrorodrigo/workspace/workspace/IPS-DesignSystem`.

Spec: `docs/superpowers/specs/2026-11-04-rollforward-screens-design.md`.

**Conventions for this repo (read first)**
- There is no unit-test runner. "Test" = `npx tsc --noEmit` (must print nothing) + opening the story in the running local Storybook and comparing with the Figma frame image.
- Figma frames were exported to `/Users/pedrorodrigo/workspace/sales_brochure/figma-rf/` (`f01.png` ... `f15-component.png`). Mapping used below: f01/f02 = Source & target, f03/f04 = Continuity, f07 = Summary collapsed, f10 = Filters empty, f11 = Filters narrowed, f12 = Filters + role filters, f13 = Filters by assignee, f15 = Summary expanded.
- Local Storybook: `http://localhost:6006` (start with `npx storybook dev -p 6006 --no-open` from the repo root if `curl -s -o /dev/null -w "%{http_code}" http://localhost:6006` is not `200`). It hot-reloads.
- Story URL pattern: `http://localhost:6006/iframe.html?id=screens-rollforward--<kebab-export-name>&viewMode=story`. Set the browser viewport to 1440×900.
- **Do not commit, push, rebuild `storybook-static/` or deploy.** The user only does that on request, so these tasks have no commit step.
- Layout note (deviation from the spec text): the spec said to compose `Page`. `Page` scrolls the document, so the sticky footer would not sit at the bottom of a fixed-height viewport. This plan uses the same shell as `CreateReportShell` in `analytics.stories.tsx` (Navbar + a 100vh column with a scroll area and the sticky `Actions`). Update the spec sentence accordingly in Task 3 Step 5.

---

## File structure

| File | Action | Responsibility |
|---|---|---|
| `src/components/input/input.tsx` | Modify | `rightIcon` on `Input`; `onClear` label action on `Input` and `InputSelect` |
| `src/components/input/input.module.scss` | Modify | `.labelClear` style |
| `src/components/input/input.stories.tsx` | Modify | Story showing the new props |
| `src/components/actions/actions.tsx` | Modify | `infoText`, `ActionItem.tooltip`, `ActionItem.iconPosition` |
| `src/components/actions/actions.module.scss` | Modify | `.infoText` style |
| `src/components/actions/actions.stories.tsx` | Modify | Story showing the new props |
| `src/screens/roll_forward/roll_forward.tsx` | Create | `RollForwardShell`, `FiltersStep`, `SourceTargetStep`, `ContinuityStep`, `SummaryStep`, sample data |
| `src/screens/roll_forward/roll_forward.stories.tsx` | Create | Ten stories, title `Screens/RollForward` |
| `docs/superpowers/specs/2026-11-04-rollforward-screens-design.md` | Modify | Layout + Actions notes (Task 3 Step 5) |

---

### Task 1: `Input` / `InputSelect` — `rightIcon` and `onClear`

**Files:**
- Modify: `src/components/input/input.tsx` (imports ~line 12; `InputProps` ~line 28; `Input` ~line 45; `InputSelectProps` ~line 155; `InputSelect` ~line 159)
- Modify: `src/components/input/input.module.scss` (after `.mandatoryIcon`, ~line 36)
- Modify: `src/components/input/input.stories.tsx` (append)

- [ ] **Step 1: Add the type import and the clear button helper**

In `src/components/input/input.tsx`, replace

```tsx
import { Icon } from "../icon/icon";
import css from "./input.module.scss";
```

with

```tsx
import { Icon } from "../icon/icon";
import type { IconName } from "../icon/icon";
import css from "./input.module.scss";

// Small "clear filter" action shown at the right end of the label row
const LabelClear = ({ onClear }: { onClear: () => void }) => (
  <button type="button" className={css.labelClear} aria-label="Clear filter" onClick={onClear}>
    <Icon name="filter-clean" size={14} />
  </button>
);
```

Keep the existing `MandatoryIcon` constant untouched below this block.

- [ ] **Step 2: Add the props**

In `InputProps`, after `mandatory?: boolean;` add:

```tsx
  /** Trailing icon inside the field (e.g. "calendar" for date fields). Text input only. */
  rightIcon?: IconName;
  /** When set, shows a "clear filter" icon at the right end of the label row and calls this on click */
  onClear?: () => void;
```

Change `InputSelectProps` from

```tsx
export type InputSelectProps = Omit<InputProps, "type" | "onChange" | "onFocus" | "onBlur"> & {
```

to

```tsx
export type InputSelectProps = Omit<InputProps, "type" | "onChange" | "onFocus" | "onBlur" | "rightIcon"> & {
```

- [ ] **Step 3: Use them in `Input`**

In the `Input` component destructuring add `rightIcon,` and `onClear,` after `mandatory = false,`. Replace its label block and input box:

```tsx
    {label && (
      <div className={css.labelRow}>
        <label className={css.label} htmlFor={id}>{label}</label>
        {mandatory && <MandatoryIcon />}
      </div>
    )}
    <div className={classNames(css.inputBox, css[state], { [css.readOnly]: readOnly })}>
      <input
        id={id}
        type={type}
        className={css.inputEl}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
```

with

```tsx
    {label && (
      <div className={css.labelRow}>
        <label className={css.label} htmlFor={id}>{label}</label>
        {mandatory && <MandatoryIcon />}
        {onClear && <LabelClear onClear={onClear} />}
      </div>
    )}
    <div className={classNames(css.inputBox, css[state], { [css.readOnly]: readOnly })}>
      <input
        id={id}
        type={type}
        className={css.inputEl}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {rightIcon && <Icon name={rightIcon} size={16} className={css.icon} />}
    </div>
```

NOTE: the `Input` block above appears once in the file. Edit only the `Input` component (the first occurrence that contains `type={type}`), not `InputTextarea`.

- [ ] **Step 4: Use `onClear` in `InputSelect`**

In `InputSelect` destructuring add `onClear,` after `mandatory = false,`. In its label block (the one directly above `<button id={id} type="button"`), change

```tsx
        {mandatory && <MandatoryIcon />}
      </div>
    )}
    <button
```

to

```tsx
        {mandatory && <MandatoryIcon />}
        {onClear && <LabelClear onClear={onClear} />}
      </div>
    )}
    <button
```

- [ ] **Step 5: Style the clear button**

In `src/components/input/input.module.scss`, after the `.mandatoryIcon { ... }` block add:

```scss
// "Clear filter" action at the right end of the label row
.labelClear {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--palette-blue-0);
  cursor: pointer;

  &:hover { color: var(--palette-primary-0); }
}
```

- [ ] **Step 6: Add a story**

Append to `src/components/input/input.stories.tsx`:

```tsx
// ── Right icon + clear filter (used by date fields and filter selects) ───────

export const RightIconAndClear: StoryFn = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 283 }}>
    <Input label="Start date" rightIcon="calendar" value="1 Oct 2026" onChange={() => {}} />
    <Input label="Start date" rightIcon="calendar" placeholder="Pick a date" mandatory />
    <Input label="Start date" rightIcon="calendar" value="1 Oct 2026" onChange={() => {}} onClear={() => {}} />
    <InputSelect label="Template" value="2 selected" onClear={() => {}} />
  </div>
);
```

- [ ] **Step 7: Verify**

Run (from repo root): `npx tsc --noEmit`
Expected: no output.

Open `http://localhost:6006/iframe.html?id=components-input--right-icon-and-clear&viewMode=story`. Expected: calendar icon at the right inside the first three inputs; the third input and the select show a small slash-funnel icon at the far right of the label row.

Open `http://localhost:6006/iframe.html?id=components-input--text-field-states&viewMode=story` and `...--select` and confirm they look unchanged (no icons, no clear button).

---

### Task 2: `Actions` — `infoText`, `tooltip`, `iconPosition`

**Files:**
- Modify: `src/components/actions/actions.tsx` (imports; `ActionItem`; `ActionsProps`; `ActionButton`; `Actions`)
- Modify: `src/components/actions/actions.module.scss` (after `.right`)
- Modify: `src/components/actions/actions.stories.tsx` (append)

- [ ] **Step 1: Import `Tooltip`**

In `actions.tsx`, after `import { Icon } from "../icon/icon";` add:

```tsx
import { Tooltip } from "../tooltip/tooltip";
```

- [ ] **Step 2: Extend `ActionItem` and `ActionsProps`**

Replace the `ActionItem` type with:

```tsx
export type ActionItem = {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  /** Optional icon (leading unless iconPosition="right") */
  icon?: IconName;
  /** Where the icon sits relative to the label (default "left") */
  iconPosition?: "left" | "right";
  /** Shows this text in an IPS Tooltip when hovering the button (works on disabled buttons) */
  tooltip?: string;
};
```

In `ActionsProps`, after `rightContent?: ReactNode;` add:

```tsx
  /** Muted text shown on the right, before the right-hand buttons (e.g. "2 engagements · 12 roles") */
  infoText?: string;
```

- [ ] **Step 3: Update `ActionButton`**

Replace the whole `ActionButton` function with:

```tsx
function ActionButton({ action }: { action: ActionItem }) {
  const iconEl = action.icon ? <Icon name={action.icon} size={16} /> : null;
  const button = (
    <button
      type="button"
      disabled={action.disabled}
      className={classNames(
        css.btn,
        action.variant === "primary" ? css.primary : css.secondary,
        action.disabled && css.disabled
      )}
      onClick={action.onClick}
    >
      {action.iconPosition !== "right" && iconEl}
      {action.label}
      {action.iconPosition === "right" && iconEl}
    </button>
  );
  return action.tooltip ? (
    <Tooltip content={action.tooltip} placement="down-right" maxWidth={320}>{button}</Tooltip>
  ) : (
    button
  );
}
```

- [ ] **Step 4: Render `infoText`**

In `Actions`, add `infoText,` to the destructured props (after `rightContent,`). Replace the right block of `buttonRow`:

```tsx
      {(rightActions.length > 0 || rightContent) && (
        <div className={css.right}>
          {rightActions.map((a, i) => <ActionButton key={a.label + i} action={a} />)}
          {rightContent}
        </div>
      )}
```

with

```tsx
      {(rightActions.length > 0 || rightContent || infoText) && (
        <div className={css.right}>
          {infoText && <span className={css.infoText}>{infoText}</span>}
          {rightActions.map((a, i) => <ActionButton key={a.label + i} action={a} />)}
          {rightContent}
        </div>
      )}
```

- [ ] **Step 5: Style it**

In `actions.module.scss`, after the `.right { ... }` block add:

```scss
// Muted info text before the right-hand buttons
.infoText {
  @include ts.label-regular; // 12px / 400
  color: var(--palette-blue-2);
  text-align: right;
}
```

- [ ] **Step 6: Add a story**

Append to `src/components/actions/actions.stories.tsx`:

```tsx
export const StickyScreenWithInfoAndTooltip: Story = {
  args: {
    variant: "sticky-screen",
    leftActions: [{ label: "Cancel", variant: "secondary" }],
    infoText: "101 engagements · 671 roles · Please apply filters to narrow down engagements (max 100)",
    rightActions: [
      { label: "Previous", variant: "secondary", icon: "arrow-left" },
      {
        label: "Next",
        variant: "primary",
        icon: "arrow-right",
        iconPosition: "right",
        disabled: true,
        tooltip: "Please apply filters to narrow down engagements (max 100)",
      },
    ],
  },
};
```

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit` → expected: no output.

Open `http://localhost:6006/iframe.html?id=molecules-actions--sticky-screen-with-info-and-tooltip&viewMode=story`. Expected: Cancel on the left; on the right a muted 12px text, then "← Previous", then a faded blue "Next →" with the arrow after the label. Hover Next: a dark tooltip appears above it. If the tooltip bubble is clipped at the right edge of the viewport, change `placement="down-right"` in Step 3 to `"down-left"` and recheck.

Open `...--sticky-screen`, `...--content` and `...--sticky-panel` stories and confirm they look unchanged.

---

### Task 3: Shell + Filters step (4 stories)

**Files:**
- Create: `src/screens/roll_forward/roll_forward.tsx`
- Create: `src/screens/roll_forward/roll_forward.stories.tsx`
- Modify: `docs/superpowers/specs/2026-11-04-rollforward-screens-design.md`

- [ ] **Step 1: Create `roll_forward.tsx` with the shell and the Filters step**

```tsx
// RollForward — four-step wizard: Filters, Source and target engagements, Continuity and dates, Summary.
// Figma: GNaUzdui1Ymrq8CZRyOLEJ (Rollforward in blueprints screen), section "Filters step" node 2295:249944.
// Layout: same shell as CreateReportShell in analytics.stories.tsx (Navbar + scroll area + sticky Actions).

import React, { useState } from "react";
import { Navbar }      from "../../components/navbar/navbar";
import { Header }      from "../../components/header/header";
import { Wizard }      from "../../components/wizard/wizard";
import { Actions }     from "../../components/actions/actions";
import type { ActionItem } from "../../components/actions/actions";
import { Tile }        from "../../components/tile/tile";
import { Divider }     from "../../components/divider/divider";
import { Icon }        from "../../components/icon/icon";
import { Button }      from "../../components/button/button";
import { Input, InputSearch, InputSelect } from "../../components/input/input";
import { Switch }      from "../../components/switch/switch";
import { Checkbox }    from "../../components/checkbox/checkbox";
import { Toggle }      from "../../components/toggle/toggle";
import { RadioGroup }  from "../../components/radio/radio";
import { Alert }       from "../../components/alert/alert";
import { Tooltip }     from "../../components/tooltip/tooltip";
import { Table }       from "../../components/table/table";
import type { TableColumn, TableRow } from "../../components/table/table";

// ── Typography helpers (same values as the other screens) ─────────────────────

const bodyBold: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "115%" };
const body:     React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%" };
const labelCss: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%" };
const fieldLabel: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%" };
const h5:       React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 16, fontWeight: 600, color: "var(--palette-blue-0)", lineHeight: "125%" };

// ── Wizard shell ──────────────────────────────────────────────────────────────

export const ROLL_FORWARD_STEPS = [
  { id: "filters",       label: "Filters" },
  { id: "source-target", label: "Source and target engagements" },
  { id: "continuity",    label: "Continuity and dates" },
  { id: "summary",       label: "Summary" },
];

const SUBTITLES = [
  "Use filters to narrow down the list of engagements and roles to roll forward",
  "Select what the target engagements will be for roles that are going to be created",
  "Settings",
  "Confirm the engagements and roles that are about to be created",
];

export type RollForwardShellProps = {
  /** 0 Filters · 1 Source and target · 2 Continuity · 3 Summary */
  step: number;
  children: React.ReactNode;
  /** Muted text before the right-hand footer buttons */
  infoText?: string;
  nextDisabled?: boolean;
  /** Tooltip shown on the disabled Next button */
  nextTooltip?: string;
  /** Label of the primary button (default "Next"; "Create roles" on Summary) */
  nextLabel?: string;
};

export function RollForwardShell({ step, children, infoText, nextDisabled = false, nextTooltip, nextLabel = "Next" }: RollForwardShellProps) {
  const rightActions: ActionItem[] = [
    ...(step > 0 ? [{ label: "Previous", variant: "secondary" as const, icon: "arrow-left" as const }] : []),
    {
      label: nextLabel,
      variant: "primary",
      disabled: nextDisabled,
      tooltip: nextDisabled ? nextTooltip : undefined,
      ...(nextLabel === "Next" ? { icon: "arrow-right" as const, iconPosition: "right" as const } : {}),
    },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="workflow" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 0" }}>
          {/* content column is a true 1280px (Figma: x 110 → 1390 on a 1440 canvas) */}
          <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: 16 }}>
              <Header size="page" title="Roll forward" leftIcon="rollforward" subtitle={SUBTITLES[step]} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Wizard steps={ROLL_FORWARD_STEPS} activeIndex={step} maxReachableIndex={step} onChange={() => {}} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
              {children}
            </div>
          </div>
        </div>
        <Actions
          variant="sticky-screen"
          insetX={64}
          leftActions={[{ label: "Cancel", variant: "secondary" }]}
          rightActions={rightActions}
          infoText={infoText}
        />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 1 — FILTERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const GRID: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, alignItems: "start" };
const COLUMN: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 16 };

type FilterValues = { template?: string; id?: string; assignee?: string; roleStart?: string };

function YesNo({ label }: { label: string }) {
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={fieldLabel}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 16, minHeight: 40 }}>
        <Checkbox label="Yes" checked={yes} onChange={setYes} />
        <Checkbox label="No" checked={no} onChange={setNo} />
      </div>
    </div>
  );
}

function SingleCheck({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* invisible label keeps the checkbox on the same line as its row neighbours */}
      <span style={{ ...fieldLabel, visibility: "hidden" }}>.</span>
      <div style={{ display: "flex", alignItems: "center", minHeight: 40 }}>
        <Checkbox label={label} checked={checked} onChange={setChecked} />
      </div>
    </div>
  );
}

const DateField = ({ label, value, onClear }: { label: string; value?: string; onClear?: () => void }) => (
  <Input label={label} rightIcon="calendar" value={value ?? ""} onChange={() => {}} onClear={value ? onClear : undefined} />
);

const SelectField = ({ label, value, onClear }: { label: string; value?: string; onClear?: () => void }) => (
  <InputSelect label={label} value={value} onClear={value ? onClear : undefined} />
);

export type FiltersStepProps = {
  template?: string;
  id?: string;
  assignee?: string;
  /** Role filters switch initially on */
  roleFilters?: boolean;
  /** Value of "Rollforward start date" in the role filters */
  roleStartDate?: string;
};

export function FiltersStep({ template, id, assignee, roleFilters = false, roleStartDate }: FiltersStepProps) {
  const [v, setV] = useState<FilterValues>({ template, id, assignee, roleStart: roleStartDate });
  const [rolesOn, setRolesOn] = useState(roleFilters);
  const [engSearch, setEngSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("");
  const clear = (k: keyof FilterValues) => () => setV(p => ({ ...p, [k]: undefined }));

  return (
    <>
      <Tile tileStyle="highlight" padding="screen">
        <div style={COLUMN}>
          <span style={h5}>Engagement filters</span>
          <InputSearch value={engSearch} onChange={e => setEngSearch(e.target.value)} onClear={() => setEngSearch("")} />
          <div style={GRID}>
            <YesNo label="Roll forward source" />
            <YesNo label="Roll forward target" />
            <DateField label="Roll forward start date" />
            <DateField label="Roll forward end date" />

            <SelectField label="Template" value={v.template} onClear={clear("template")} />
            <SelectField label="ID" value={v.id} onClear={clear("id")} />
            <DateField label="Starts within" />
            <SelectField label="Workflow state" />

            <SingleCheck label="Starting soon" />
            <YesNo label="Sold" />
            <YesNo label="Chargeable" />
            <SelectField label="Job code" />

            <SelectField label="Assignee" value={v.assignee} onClear={clear("assignee")} />
            <SelectField label="Principal Owner" />
            <SelectField label="Requested by" />
            <SelectField label="Service Line Group" />

            <SelectField label="Source ID" />
            <SelectField label="Owner" />
          </div>
        </div>
      </Tile>

      <Tile tileStyle="highlight" padding="screen">
        <div style={COLUMN}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Switch checked={rolesOn} onChange={setRolesOn} />
            <span style={h5}>Role filters</span>
          </div>
          {rolesOn && (
            <>
              <InputSearch value={roleSearch} onChange={e => setRoleSearch(e.target.value)} onClear={() => setRoleSearch("")} />
              <div style={GRID}>
                <YesNo label="Rollforward source" />
                <YesNo label="Rollforward target" />
                <DateField label="Rollforward start date" value={v.roleStart} onClear={clear("roleStart")} />
                <DateField label="Rollforward end date" />

                <SingleCheck label="Starting soon" />
                <SelectField label="Job code" />
                <SelectField label="Source ID" />
                <SelectField label="Owner" />

                <SelectField label="Participant" />
                <SelectField label="Principal Owner" />
                <SelectField label="Requested by" />
                <SelectField label="Service Line Group" />
              </div>
            </>
          )}
        </div>
      </Tile>
    </>
  );
}
```

- [ ] **Step 2: Create `roll_forward.stories.tsx` with the four Filters stories**

```tsx
// Screens/RollForward — Roll forward wizard (Filters, Source and target engagements, Continuity and dates, Summary)
// Figma: GNaUzdui1Ymrq8CZRyOLEJ node 2295:249944. One story per Figma state.
import type { Meta, StoryObj } from "@storybook/react";
import { RollForwardShell, FiltersStep } from "./roll_forward";

const meta: Meta = {
  title: "Screens/RollForward",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Roll forward wizard — four steps (Filters, Source and target engagements, Continuity and dates, Summary). " +
          "One story per Figma state. Controls inside a step work locally; Previous / Next / Cancel do not navigate.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const APPLY_FILTERS = "Please apply filters to narrow down engagements (max 100)";

// ── Step 1 — Filters ──────────────────────────────────────────────────────────

export const FiltersEmpty: Story = {
  name: "Filters — Empty",
  render: () => (
    <RollForwardShell
      step={0}
      infoText={`101 engagements · 671 roles · ${APPLY_FILTERS}`}
      nextDisabled
      nextTooltip={APPLY_FILTERS}
    >
      <FiltersStep template="2 selected" />
    </RollForwardShell>
  ),
};

export const FiltersNarrowed: Story = {
  name: "Filters — Narrowed",
  render: () => (
    <RollForwardShell step={0} infoText="2 engagements · 12 roles">
      <FiltersStep template="2 selected" id="2 selected" />
    </RollForwardShell>
  ),
};

export const FiltersByAssignee: Story = {
  name: "Filters — By assignee",
  render: () => (
    <RollForwardShell step={0} infoText="2 engagements · 12 roles">
      <FiltersStep template="2 selected" assignee="Charlie Parker" />
    </RollForwardShell>
  ),
};

export const FiltersRoleFilters: Story = {
  name: "Filters — Role filters",
  render: () => (
    <RollForwardShell step={0} infoText="2 engagements · 8 roles">
      <FiltersStep template="2 selected" id="2 selected" roleFilters roleStartDate="1 Oct 2026" />
    </RollForwardShell>
  ),
};
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no output. (Imports for `Toggle`, `RadioGroup`, `Alert`, `Tooltip`, `Table`, `Divider`, `Icon`, `Button` are unused until Tasks 4–6; unused imports do not fail this repo's tsconfig.)

- [ ] **Step 4: Verify the four stories against Figma**

For each URL below, set the viewport to 1440×900, take a screenshot and compare with the frame:

| Story URL id | Figma frame |
|---|---|
| `screens-rollforward--filters-empty` | `f10.png` |
| `screens-rollforward--filters-narrowed` | `f11.png` |
| `screens-rollforward--filters-by-assignee` | `f13.png` |
| `screens-rollforward--filters-role-filters` | `f12.png` (scroll the page down to see the rest of the role filters) |

Check: title "Roll forward" with the roll-forward icon; grey subtitle; Wizard with "Filters" bar dark and the others light; Engagement filters tile with a 4-column grid in the same order as Figma; clear-filter icons only on filled selects/dates; footer has Cancel on the left and (no Previous) info text + `Next →` on the right; in *Empty*, Next is faded and hovering it shows the tooltip; toggling the Role filters switch shows/hides the role grid. Note any difference in the final report (do not guess fixes beyond spacing/alignment).

- [ ] **Step 5: Update the spec**

In `docs/superpowers/specs/2026-11-04-rollforward-screens-design.md`:
1. Replace the bullet starting with `- \`Navbar activeId="workflow"\` inside the existing \`Page\` layout, \`variant="1280"\`.` with `- \`Navbar activeId="workflow"\` plus a 100vh column (scroll area + sticky footer), the same shell as \`CreateReportShell\` in the Analytics stories. (\`Page\` scrolls the document, so its sticky footer would not sit at the bottom.)`
2. In the "IPS additions" section, under **`Actions`**, add the bullet: `- \`ActionItem.iconPosition?: "left" | "right"\` — lets \`Next →\` show its arrow after the label.`

---

### Task 4: Source and target engagements step (2 stories)

**Files:**
- Modify: `src/screens/roll_forward/roll_forward.tsx` (append)
- Modify: `src/screens/roll_forward/roll_forward.stories.tsx`

- [ ] **Step 1: Append `SourceTargetStep` to `roll_forward.tsx`**

```tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 2 — SOURCE AND TARGET ENGAGEMENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ROLLED_FORWARD_NOTICE = "This engagement has been rolled forward and we have found 2 existing target for this engagement";

const SETTING_OPTIONS = [
  { value: "placeholder", label: "Create placeholder" },
  { value: "existing",    label: "Select existing engagement" },
];

// Columns line up with the header row: source (416px) | setting (408px) | target (rest)
const ROW_GRID: React.CSSProperties = { display: "grid", gridTemplateColumns: "416px 408px minmax(0, 1fr)", alignItems: "start", columnGap: 0 };

type EngagementPair = { source: string; existingTarget: string };

const ENGAGEMENT_PAIRS: EngagementPair[] = [
  { source: "[2026 Q3] ProFinda IT",       existingTarget: "RF_CLONE_2_[2026 Q3] ProFinda IT" },
  { source: "[2026 Q4] ProFinda Advisory", existingTarget: "RF_CLONE_1_[2026 Q4] ProFinda Advisory" },
];

export function SourceTargetStep({ withNotice = false }: { withNotice?: boolean }) {
  const [prefix, setPrefix] = useState("RF_CLONE_1_");
  const [settings, setSettings] = useState<string[]>(["existing", "placeholder"]);
  const placeholders = settings.filter(s => s === "placeholder").length;
  const setOne = (i: number) => (value: string) => setSettings(prev => prev.map((s, j) => (j === i ? value : s)));

  return (
    <Tile tileStyle="highlight" padding="screen">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Header size="content" title="Source and target engagements" />
        <span style={body}>Some of the selected engagements have placeholder engagements associated to them, please decide how to proceed.</span>

        {/* Summary bar */}
        <Tile tileStyle="default" padding="panel">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ ...labelCss, width: 408 }}>
              {settings.length} engagements · {placeholders} new placeholder{placeholders === 1 ? "" : "s"} · {settings.length - placeholders} existing
            </span>
            <Button kind="secondary" size="regular" onClick={() => setSettings(settings.map(() => "placeholder"))}>Create placeholder for all</Button>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, width: 398 }}>
              <span style={{ ...body, whiteSpace: "nowrap" }}>Placeholder prefix</span>
              <Input value={prefix} onChange={e => setPrefix(e.target.value)} />
            </div>
          </div>
        </Tile>

        {/* Table header */}
        <div style={{ ...ROW_GRID, padding: "0 8px" }}>
          <span style={{ ...body, display: "inline-flex", alignItems: "center", gap: 4 }}>Source engagement <Icon name="sort" size={14} /></span>
          <span style={body}>Setting</span>
          <span style={body}>Target engagement</span>
        </div>
        <Divider orientation="horizontal" />

        {ENGAGEMENT_PAIRS.map((pair, i) => {
          const isExisting = settings[i] === "existing";
          const showInfoIcon = isExisting && i === 0 && !withNotice;
          const showNotice = isExisting && i === 0 && withNotice;
          return (
            <React.Fragment key={pair.source}>
              <div style={{ ...ROW_GRID, padding: "0 8px" }}>
                <span style={{ ...bodyBold, paddingTop: 8 }}>{pair.source}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Toggle options={SETTING_OPTIONS} value={settings[i]} onChange={setOne(i)} />
                  {showInfoIcon && (
                    <Tooltip content={ROLLED_FORWARD_NOTICE} placement="down-center" maxWidth={320}>
                      <Icon name="info" size={16} style={{ color: "var(--palette-blue-0)" }} />
                    </Tooltip>
                  )}
                </div>
                <div style={{ paddingTop: isExisting ? 0 : 8 }}>
                  {isExisting ? (
                    <InputSelect value={pair.existingTarget} />
                  ) : (
                    <span style={body}>New: <span style={bodyBold}>{prefix}{pair.source}</span></span>
                  )}
                </div>
              </div>
              {showNotice && <Alert type="general" layout="inline" message={ROLLED_FORWARD_NOTICE} />}
              {i < ENGAGEMENT_PAIRS.length - 1 && <Divider orientation="horizontal" />}
            </React.Fragment>
          );
        })}
      </div>
    </Tile>
  );
}
```

- [ ] **Step 2: Add the two stories**

In `roll_forward.stories.tsx` change the import line to

```tsx
import { RollForwardShell, FiltersStep, SourceTargetStep } from "./roll_forward";
```

and append:

```tsx
// ── Step 2 — Source and target engagements ────────────────────────────────────

export const SourceTargetDefault: Story = {
  name: "Source and target — Default",
  render: () => (
    <RollForwardShell step={1}>
      <SourceTargetStep />
    </RollForwardShell>
  ),
};

export const SourceTargetWithNotice: Story = {
  name: "Source and target — With notice",
  render: () => (
    <RollForwardShell step={1}>
      <SourceTargetStep withNotice />
    </RollForwardShell>
  ),
};
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` → expected: no output.

Compare at 1440×900:

| Story id | Figma |
|---|---|
| `screens-rollforward--source-target-default` | `f01.png` |
| `screens-rollforward--source-target-with-notice` | `f02.png` |

Check: wizard has the 2nd bar dark; summary bar reads "2 engagements · 1 new placeholder · 1 existing"; row 1 has *Select existing engagement* selected with an info icon (hover → tooltip) and an `InputSelect` target; row 2 has *Create placeholder* selected and "New: **RF_CLONE_1_[2026 Q4] ProFinda Advisory**"; clicking a Toggle option flips the row and the summary-bar counts; "Create placeholder for all" flips both; editing the prefix updates the "New:" text. In *With notice* the info icon is replaced by a blue-tinted inline alert under row 1. Footer: Cancel, `← Previous`, `Next →`, no info text.

---

### Task 5: Continuity and dates step (2 stories)

**Files:**
- Modify: `src/screens/roll_forward/roll_forward.tsx` (append)
- Modify: `src/screens/roll_forward/roll_forward.stories.tsx`

- [ ] **Step 1: Append `ContinuityStep` to `roll_forward.tsx`**

```tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 3 — CONTINUITY AND DATES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CONTINUITY_OPTIONS = [
  { value: "maintain", label: "Maintain continuity (except suspended)" },
  { value: "smart",    label: "Smart continuity (considering grade promotions, continuity, utilization)" },
  { value: "none",     label: "Create roles without Workforce Members" },
];

// Fixed sample: latest target date in the Summary sample data (not calculated from the start date)
const ESTIMATED_END_DATE = "31 Dec 2026";

export function ContinuityStep({ startDate = "" }: { startDate?: string }) {
  const [continuity, setContinuity] = useState("maintain");
  const [start, setStart] = useState(startDate);

  return (
    <>
      <Tile tileStyle="highlight" padding="screen">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Header size="content" title="Team continuity" />
          <span style={body}>Select whether rollforward functionality would suggest Workforce Members to keep team continuity if possible.</span>
          <RadioGroup options={CONTINUITY_OPTIONS} value={continuity} onChange={setContinuity} groupLayout="column" name="continuity" />
        </div>
      </Tile>

      <Tile tileStyle="highlight" padding="screen">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Header size="content" title="New roles dates" rightIcon="timeline" />
          <span style={body}>This will be the new start date for first role's availability rule. If more roles are created, those will keep original cadence</span>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ width: 302 }}>
              <Input label="Start date (first role)" mandatory rightIcon="calendar" value={start} onChange={e => setStart(e.target.value)} />
            </div>
            <Input label="Estimated end date (last role)" value={start ? ESTIMATED_END_DATE : "-"} readOnly />
          </div>
        </div>
      </Tile>
    </>
  );
}
```

- [ ] **Step 2: Add the two stories**

Change the stories import to

```tsx
import { RollForwardShell, FiltersStep, SourceTargetStep, ContinuityStep } from "./roll_forward";
```

and append:

```tsx
// ── Step 3 — Continuity and dates ─────────────────────────────────────────────

export const ContinuityEmpty: Story = {
  name: "Continuity — Empty",
  render: () => (
    <RollForwardShell step={2} nextDisabled>
      <ContinuityStep />
    </RollForwardShell>
  ),
};

export const ContinuityDateSet: Story = {
  name: "Continuity — Date set",
  render: () => (
    <RollForwardShell step={2}>
      <ContinuityStep startDate="1 Oct 2026" />
    </RollForwardShell>
  ),
};
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` → expected: no output.

Compare at 1440×900:

| Story id | Figma |
|---|---|
| `screens-rollforward--continuity-empty` | `f03.png` |
| `screens-rollforward--continuity-date-set` | `f04.png` |

Check: wizard 3rd bar dark; "Team continuity" tile with three radios and the first selected (clicking another switches it); "New roles dates" tile with the timeline icon after the title; mandatory marker after "Start date (first role)"; calendar icon inside the date input; in *Empty* the estimated end date shows `-` and Next is faded; typing in the start date input shows `31 Dec 2026` as the estimated end date (deliberate difference from Figma, which shows `-`); in *Date set* the start date reads `1 Oct 2026`, estimated end date `31 Dec 2026`, Next enabled.

---

### Task 6: Summary step (2 stories)

**Files:**
- Modify: `src/screens/roll_forward/roll_forward.tsx` (append)
- Modify: `src/screens/roll_forward/roll_forward.stories.tsx`

- [ ] **Step 1: Append `SummaryStep` and its data to `roll_forward.tsx`**

```tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 4 — SUMMARY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type SummaryRole = TableRow & { id: string; role: string; dates: string; target: number; source: number; delta: number };

const SUMMARY_ENGAGEMENTS: { id: string; title: string; roles: SummaryRole[] }[] = [
  {
    id: "e-it",
    title: "RF_CLONE_2_[2026 Q3] ProFinda IT",
    roles: [
      { id: "it-1", role: "Javascript developer",        dates: "1 Oct 2026 - 31 Dec 2026", target: 100, source: 100, delta: 0 },
      { id: "it-2", role: "Junior Javascript developer", dates: "1 Oct 2026 - 30 Nov 2026", target: 50,  source: 50,  delta: 0 },
      { id: "it-3", role: "Accessibility consultant",    dates: "1 Oct 2026 - 31 Dec 2026", target: 50,  source: 50,  delta: 0 },
      { id: "it-4", role: "React developer",             dates: "1 Oct 2026 - 30 Nov 2026", target: 48,  source: 48,  delta: 0 },
    ],
  },
  {
    id: "e-adv",
    title: "RF_CLONE_1_[2026 Q4] ProFinda Advisory",
    roles: [
      { id: "adv-1", role: "Javascript developer",        dates: "1 Oct 2026 - 31 Dec 2026", target: 70,  source: 70,  delta: 0 },
      { id: "adv-2", role: "Junior Javascript developer", dates: "1 Oct 2026 - 30 Nov 2026", target: 50,  source: 50,  delta: 0 },
      { id: "adv-3", role: "Accessibility consultant",    dates: "1 Oct 2026 - 31 Dec 2026", target: 80,  source: 120, delta: -40 },
      { id: "adv-4", role: "React developer",             dates: "1 Oct 2026 - 30 Nov 2026", target: 100, source: 120, delta: -20 },
    ],
  },
];

const SUMMARY_COLUMNS: TableColumn<SummaryRole>[] = [
  { key: "role", header: "Target role", sortable: true, renderCell: r => <span style={bodyBold}>{r.role}</span> },
  { key: "dates", header: "Target dates", renderCell: r => <span style={body}>{r.dates}</span> },
  { key: "target", header: "Target hours (estimated)", renderCell: r => <span style={body}>{r.target}</span> },
  { key: "source", header: "Source hours", renderCell: r => <span style={body}>{r.source}</span> },
  {
    key: "delta", header: "Delta (estimated)",
    renderCell: r => <span style={{ ...body, color: r.delta < 0 ? "var(--palette-red-0)" : "var(--palette-blue-0)" }}>{r.delta}</span>,
  },
];

export function SummaryStep({ expanded = false }: { expanded?: boolean }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<Set<string>>(new Set(expanded ? SUMMARY_ENGAGEMENTS.map(e => e.id) : []));
  const [selected, setSelected] = useState<(string | number)[]>(SUMMARY_ENGAGEMENTS.flatMap(e => e.roles.map(r => r.id)));
  const toggleOpen = (id: string) => setOpen(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (
    <Tile tileStyle="highlight" padding="screen">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Alert type="general" layout="inline" message="Planned dates and hours are an estimation and might not be 100% accurate" />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 283 }}>
            <InputSearch value={search} onChange={e => setSearch(e.target.value)} onClear={() => setSearch("")} />
          </div>
          <span style={labelCss}>8 target roles from 2 target engagements</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {SUMMARY_ENGAGEMENTS.map(eng => {
            const ids = eng.roles.map(r => r.id);
            const picked = ids.filter(id => selected.includes(id));
            const isOpen = open.has(eng.id);
            return (
              <React.Fragment key={eng.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 0" }}>
                  <Button kind="iconTertiary" size="small" title={isOpen ? "Collapse" : "Expand"} onClick={() => toggleOpen(eng.id)}>
                    <Icon name={isOpen ? "chevron-down" : "chevron-right"} size={16} />
                  </Button>
                  <Checkbox
                    checked={picked.length === ids.length}
                    indeterminate={picked.length > 0 && picked.length < ids.length}
                    onChange={checked => setSelected(prev => (checked ? Array.from(new Set([...prev, ...ids])) : prev.filter(id => !ids.includes(id))))}
                  />
                  <span style={bodyBold}>{eng.title}</span>
                </div>
                {isOpen && (
                  <Table<SummaryRole>
                    columns={SUMMARY_COLUMNS}
                    rows={eng.roles}
                    selectable
                    selectedRows={picked}
                    onSelectionChange={next => setSelected(prev => [...prev.filter(id => !ids.includes(id as string)), ...next])}
                  />
                )}
                <Divider orientation="horizontal" />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </Tile>
  );
}
```

- [ ] **Step 2: Add the two stories**

Change the stories import to

```tsx
import { RollForwardShell, FiltersStep, SourceTargetStep, ContinuityStep, SummaryStep } from "./roll_forward";
```

and append:

```tsx
// ── Step 4 — Summary ──────────────────────────────────────────────────────────

export const SummaryCollapsed: Story = {
  name: "Summary — Collapsed",
  render: () => (
    <RollForwardShell step={3} nextLabel="Create roles">
      <SummaryStep />
    </RollForwardShell>
  ),
};

export const SummaryExpanded: Story = {
  name: "Summary — Expanded",
  render: () => (
    <RollForwardShell step={3} nextLabel="Create roles">
      <SummaryStep expanded />
    </RollForwardShell>
  ),
};
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` → expected: no output. If `Table<SummaryRole>` errors on the generic constraint, change the explicit generic to `<Table columns={SUMMARY_COLUMNS} rows={eng.roles} ... />` (inference) and re-run.

Compare at 1440×900:

| Story id | Figma |
|---|---|
| `screens-rollforward--summary-collapsed` | `f07.png` |
| `screens-rollforward--summary-expanded` | `f15-component.png` |

Check: wizard 4th bar dark; blue-tinted info alert; search with "8 target roles from 2 target engagements"; two rows with chevron + checked checkbox + bold title; footer's primary button reads "Create roles" (no arrow); clicking a chevron expands the table with the header checkbox, a checked checkbox per role, Target role / Target dates / Target hours (estimated) / Source hours / Delta (estimated); `-40` and `-20` are red; unchecking one role makes its engagement checkbox indeterminate; unchecking the engagement checkbox unchecks all its roles. Known difference to report: the IPS `Table` has a white background while the Figma expanded table is neutral-2 tinted.

---

### Task 7: Final verification and handoff

**Files:** none modified.

- [ ] **Step 1: Type-check and rebuild IPS**

Run (repo root):

```bash
npx tsc --noEmit && npx vite build 2>&1 | grep -E "built in|rror"
```

Expected: no tsc output; `✓ built in …s` (the vite d.ts step may also print a "Declaration files built" line).

- [ ] **Step 2: Check all ten stories load**

Run in the browser (viewport 1440×900) for each id: `filters-empty`, `filters-narrowed`, `filters-by-assignee`, `filters-role-filters`, `source-target-default`, `source-target-with-notice`, `continuity-empty`, `continuity-date-set`, `summary-collapsed`, `summary-expanded` (`screens-rollforward--<id>`). Expected for each: `nav[aria-label="Main navigation"]` present, the Storybook error display not visible, no console errors other than the favicon 404.

- [ ] **Step 3: Spot-check existing stories that use the changed components**

Open and glance at: `components-input--text-field-states`, `components-input--select`, `components-input--all-variants`, `molecules-actions--content`, `molecules-actions--sticky-screen`, `molecules-actions--sticky-panel`, `screens-analytics--create-details`, `screens-manageroles--engagement-roles`, `screens-workflow--roles`. Expected: no visual change.

- [ ] **Step 4: Report to the user**

Summarise: the ten story ids and their URLs on `http://localhost:6006`; the IPS additions (`Input.rightIcon`, `Input/InputSelect.onClear`, `Actions.infoText`, `ActionItem.tooltip`, `ActionItem.iconPosition`); the deliberate difference (estimated end date shows `31 Dec 2026`); any differences from Figma found in Tasks 3–6 (e.g. white Summary table); that nothing was committed, pushed or deployed, and that `storybook-static/`, the hosted site and the prototypes' IPS `dist/` copies still need a rebuild/publish when the user asks.
