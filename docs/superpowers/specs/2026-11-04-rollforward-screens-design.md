# RollForward screens — design

Date: 2026-11-04
Status: implemented (see "Implementation notes" at the end)

## Goal

Add a **Screens / RollForward** category to the IPS Storybook: the four-step "Roll forward" wizard,
one story per Figma state. Built from existing IPS components, same page structure as the
Analytics "Create" screens (navbar + title + Wizard + content tiles + sticky footer).

Source: Figma file `GNaUzdui1Ymrq8CZRyOLEJ` ("Rollforward in blueprints screen"), section
"Filters step" (node 2295:249944).

## Out of scope

- The Workflow entry frames (Roll forward button, bulk banner, filtered/selected states). The Workflow
  screen is not changed.
- A single interactive flow: Previous, Next and the Wizard steps switch between the step stories (see "Implementation notes"); there is no shared state across steps and Cancel does nothing. Controls inside a step work locally.
- A new wizard page template component. `Page`, `Header`, `Wizard`, `Tile` and `Actions` are composed in the
  screen file. The Analytics Create screens are not refactored.
- Pushing, committing, rebuilding `storybook-static/` or the hosted site (only on request).

## Files

| File | Purpose |
|---|---|
| `src/screens/roll_forward/roll_forward.tsx` | Page shell + the four step components + sample data |
| `src/screens/roll_forward/roll_forward.stories.tsx` | Thin stories, title `Screens/RollForward`, `layout: "fullscreen"` |
| `src/components/input/input.tsx` (+ scss, stories) | Add `rightIcon`, label clear action (see IPS additions) |
| `src/components/actions/actions.tsx` (+ scss, stories) | Add `infoText`, per-action `tooltip` and `iconPosition` (see IPS additions) |
| `src/components/tooltip/tooltip.module.scss` | Bubble wraps beyond `maxWidth` instead of overflowing (see IPS additions) |
| `src/components/table/table.tsx` (+ scss, stories) | Add `tone?: "default" \| "subtle"` and a `Subtle` story (see IPS additions) |

## Page shell (all stories)

- `Navbar activeId="workflow"` plus a 100vh column (scroll area + sticky footer), the same shell as `CreateReportShell` in the Analytics stories. (`Page` scrolls the document, so its sticky footer would not sit at the bottom.)
- Title: IPS `Header size="page"` with `title="Roll forward"`, `leftIcon="rollforward"`, and a per-step
  `subtitle` (grey body text).
- IPS `Wizard`, steps `Filters`, `Source and target engagements`, `Continuity and dates`, `Summary`.
  `activeIndex` per step, `maxReachableIndex` = `activeIndex`, `onChange` is a no-op.
- Content: one `Tile tileStyle="highlight" padding="screen"` per section (Figma: text sits 24px from the tile edge), gap 16. The content column is a true 1280px wide (Figma x 110 → 1390).
- Footer: `Actions variant="sticky-screen"` with `insetX={64}` (Figma: Cancel at x=124, Next ends at x=1376 on a 1440 canvas).
  - Left: `Cancel` (secondary).
  - Right: optional `infoText`, then `← Previous` (secondary, `icon="arrow-left"`) and `Next →` (primary,
    `icon="arrow-right"`, `iconPosition="right"`; on Summary the primary button is labelled `Create roles` and has no arrow).

Per-step subtitles (from Figma):

| Step | Subtitle |
|---|---|
| Filters | Use filters to narrow down the list of engagements and roles to roll forward |
| Source and target engagements | Select what the target engagements will be for roles that are going to be created |
| Continuity and dates | Settings |
| Summary | Confirm the engagements and roles that are about to be created |

## IPS additions (small, in the IPS source)

1. **`Input` / `InputSelect`**
   - `rightIcon?: IconName` — trailing icon inside the field (calendar for the date fields).
   - `onClear?: () => void` — when set, shows the "clear filter" icon (`filter-clean`) at the right end of the
     label row (Template, ID, Assignee, Rollforward start date when a value is set).
2. **`Actions`**
   - `infoText?: string` — muted text rendered on the right, before the right-hand buttons.
   - `ActionItem.tooltip?: string` — wraps the button in the existing IPS `Tooltip`; used for the disabled
     `Next` ("Please apply filters to narrow down engagements (max 100)").
   - `ActionItem.iconPosition?: "left" | "right"` — lets `Next →` show its arrow after the label.

3. **`Tooltip`** (`tooltip.module.scss`): the bubble used `white-space: nowrap`, so the `maxWidth` prop had no effect and long
   text spilled out of the dark bubble. It is now `width: max-content; white-space: normal`: short text still hugs, text
   wraps once it exceeds `maxWidth`. This is a global change. The only existing tooltip affected is the long one in
   `WorkforceMember`'s profile icons ("This practitioner is matching requirements in a future contractual time slice",
   `maxWidth` 280), which now wraps inside the bubble; the "Long content" Tooltip story changes the same way.

4. **`Table`** (`table.tsx`, `table.module.scss`, `table.stories.tsx`): `tone?: "default" | "subtle"`. `"default"` is the current look
   (white, cyan selected tint). `"subtle"` puts the header, rows and sticky column on neutral-2 (`#F8F9FD`), hover on neutral-1
   (`#E7EAF8`), no selected-row tint, and fades the horizontal-scroll gradient into neutral-2 instead of white. It is for tables nested
   inside a white tile (Figma Summary step). New `Subtle` story.

Additions 1, 2 and 4 are optional props with no change to existing behaviour. Existing stories must render as before.

## Steps and stories

Story names are `Filters — Empty`, etc. (same naming style as `Create — Details`).

### Step 1 — Filters (`activeIndex 0`)

Tile "Engagement filters": full-width `InputSearch`, then a 4-column grid:
Roll forward source (Yes/No checkboxes), Roll forward target (Yes/No), Roll forward start date (date),
Roll forward end date (date), Template (select), ID (select), Starts within (date), Workflow state (select),
Starting soon (checkbox), Sold (Yes/No), Chargeable (Yes/No), Job code (select), Assignee (select),
Principal Owner (select), Requested by (select), Service Line Group (select), Source ID (select), Owner (select).

Tile "Role filters": `Switch` + title. When on, shows the same grid with role labels (search, Rollforward
source/target/start/end, Starting soon, Job code, Source ID, Owner, Participant, Principal Owner,
Requested by, Service Line Group).

| Story | State | Footer |
|---|---|---|
| Empty | Template "2 selected", nothing else, Role filters off | info "101 engagements · 671 roles · Please apply filters to narrow down engagements (max 100)", Next disabled with tooltip |
| Narrowed | Template and ID "2 selected" | info "2 engagements · 12 roles", Next enabled |
| By assignee | Template "2 selected", Assignee "Charlie Parker" | info "2 engagements · 12 roles", Next enabled |
| Role filters | Template and ID "2 selected", Role filters on, Rollforward start date "1 Oct 2026" | info "2 engagements · 8 roles", Next enabled |

There is no `Previous` button on this step (first step); the footer has `Cancel` and `Next →` only.

### Step 2 — Source and target engagements (`activeIndex 1`)

Tile "Source and target engagements": intro text "Some of the selected engagements have placeholder
engagements associated to them, please decide how to proceed."

- Summary bar (neutral-2 background): "2 engagements · 1 new placeholder · 1 existing", `Create placeholder for
  all` (secondary button), "Placeholder prefix" + `Input` value `RF_CLONE_1_`.
- Column header row: Source engagement (with a decorative sort icon), Setting, Target engagement. This step is a form-like list, so it
  uses a shared CSS grid for the header and rows rather than the IPS `Table`.
- Row 1 `[2026 Q3] ProFinda IT`: `Toggle` "Create placeholder | Select existing engagement" with *Select existing*
  selected, an info icon, and an `InputSelect` value `RF_CLONE_2_[2026 Q3] ProFinda IT`.
- Row 2 `[2026 Q4] ProFinda Advisory`: `Toggle` with *Create placeholder* selected, target text
  "New: **RF_CLONE_1_[2026 Q4] ProFinda Advisory**".

| Story | State |
|---|---|
| Default | As above; the info icon shows a `Tooltip` on hover ("This engagement has been rolled forward and we have found 2 existing target for this engagement"). The icon belongs to the row, not to its setting: it stays when the row is switched to *Create placeholder* |

Footer: `Cancel`, `← Previous`, `Next →` (both enabled).

### Step 3 — Continuity and dates (`activeIndex 2`)

- Tile "Team continuity": description "Select whether rollforward functionality would suggest Workforce Members to
  keep team continuity if possible." and a `RadioGroup`: *Maintain continuity (except suspended)* (default),
  *Smart continuity (considering grade promotions, continuity, utilization)*, *Create roles without Workforce
  Members*.
- Tile "New roles dates" (with a dates icon): description "This will be the new start date for first role's
  availability rule. If more roles are created, those will keep original cadence". Fields: "Start date (first
  role)" (date input with calendar `rightIcon`, mandatory) and "Estimated end date (last role)" (read-only; `-`
  until a start date is set, then `31 Dec 2026`).

| Story | State | Footer |
|---|---|---|
| Empty | Start date empty, estimated end date `-` | Next disabled |
| Date set | Start date `1 Oct 2026`, estimated end date `31 Dec 2026` | Next enabled |

### Step 4 — Summary (`activeIndex 3`)

- `Alert type="general"`: "Planned dates and hours are an estimation and might not be 100% accurate".
- `InputSearch` + counter "8 target roles from 2 target engagements".
- Two engagement rows, each: chevron (expand), `Checkbox` (checked), bold title:
  `RF_CLONE_2_[2026 Q3] ProFinda IT`, `RF_CLONE_1_[2026 Q4] ProFinda Advisory`.
- Expanded row: IPS `Table` with `tone="subtle"` (neutral-2 background, no selected-row tint, as in Figma) with a header checkbox and columns Target role (sortable, working), Target dates,
  Target hours (estimated), Source hours, Delta (estimated). Delta is red when negative.

Sample data (from Figma):

| Engagement | Role | Target dates | Target h | Source h | Delta |
|---|---|---|---|---|---|
| RF_CLONE_2 … ProFinda IT | Javascript developer | 1 Oct 2026 - 31 Dec 2026 | 100 | 100 | 0 |
| | Junior Javascript developer | 1 Oct 2026 - 30 Nov 2026 | 50 | 50 | 0 |
| | Accessibility consultant | 1 Oct 2026 - 31 Dec 2026 | 50 | 50 | 0 |
| | React developer | 1 Oct 2026 - 30 Nov 2026 | 48 | 48 | 0 |
| RF_CLONE_1 … ProFinda Advisory | Javascript developer | 1 Oct 2026 - 31 Dec 2026 | 70 | 70 | 0 |
| | Junior Javascript developer | 1 Oct 2026 - 30 Nov 2026 | 50 | 50 | 0 |
| | Accessibility consultant | 1 Oct 2026 - 31 Dec 2026 | 80 | 120 | -40 |
| | React developer | 1 Oct 2026 - 30 Nov 2026 | 100 | 120 | -20 |

| Story | State |
|---|---|
| Collapsed | Both rows collapsed |
| Expanded | Both rows expanded |

Footer: `Cancel`, `← Previous`, `Create roles` (primary).

**Create roles → confirmation modal.** `SummaryScreen` (used by both stories) owns the role selection and the modal state.
`Create roles` opens an IPS `Modal`: title "Rollforward confirmation", body "You’re about to create N roles, are you sure you want to
proceed?" (N = number of selected roles, "1 role" when 1), footer `Cancel` (secondary, left) and `Proceed` (primary, right). N follows the
checkboxes (8 initially). `Create roles` is disabled while no role is selected. `Proceed` only closes the modal (no further navigation);
`Cancel`, the close X, the overlay and Escape close it too. Modal width is 500px: in the Figma capture (1632px wide) the card is 1472px
and the 20px title 688px, our title renders 234.6px, so scale 2.93 and 1472 / 2.93 ≈ 502. `SummaryStep` also accepts optional
`selected` / `onSelectedChange` (controlled selection; uncontrolled when absent) and `ALL_SUMMARY_ROLE_IDS` is exported.

## Verification

- `npx tsc --noEmit` passes.
- Each of the nine stories is opened in local Storybook at 1440×900 and compared with its Figma frame
  (rendered images saved outside the repo during exploration, in `sales_brochure/figma-rf/`), differences reported.
- The existing stories that use `Input`, `InputSelect` and `Actions` (Analytics, Admin, Workflow, ...) are spot-checked to
  confirm no visual change.
- IPS is rebuilt (`npx vite build`) after the component changes so the prototypes pick it up; prototypes are not
  rebuilt.

## Open assumptions

- The Figma frames show the Role filters panel taller than the viewport with the footer overlapping. In
  Storybook the page scrolls under the sticky footer.
- "Estimated end date (last role)" is a fixed sample value (`31 Dec 2026`, matching the latest target date in the
  Summary sample data) shown once a start date is set. It is not calculated from the start date. Figma shows `-` in both
  frames, so this is a deliberate deviation requested by the user.
- Frame 14 (assignee + role filters) is not a separate story; its content is covered by *By assignee* and
  *Role filters*.

## Implementation notes (final)

- Layout: content column is a true 1280px (Figma x 110 → 1390), tiles use `padding="screen"`, footer `insetX={64}`.
- Shell derives the primary button from the step: last step → `Create roles`, no arrow; other steps → `Next` + arrow;
  `Previous` only from step 2 on.
- Accessibility added beyond Figma: ids for labelled fields (`useId`), `role="group"` + label on Yes/No pairs, radios,
  Toggle rows and engagement rows, a focusable info icon with an `aria-label`, `aria-label` on the Switch.
- Known differences from Figma that come from shared IPS components (not changed): Wizard bar colours, Navbar look,
  `Input`/`Toggle`/`InputSelect` height 34px (Figma 32px), `Radio` row spacing, `Switch` size, the `timeline` icon glyph.
  (The `Table` background/selected tint used to be on this list; it is solved by `tone="subtle"`.)
- The footer and the Summary counter text are static per story; only the controls inside a step are interactive. On the Summary
  stories the `Create roles` state and the confirmation count follow the role checkboxes.
- Fixed widths (408 / 390 / 400 / 302px) are tuned for a 1440px canvas.

### Update (2026-11-05)

- **Info icon:** on a row whose target engagement was found (`rolledForward`), the info icon + tooltip is shown whichever setting
  is selected (*Select existing engagement* or *Create placeholder*).
- **Wizard steps are clickable exactly as far as the footer buttons allow:** every earlier step while `Previous` exists, and the
  next step only while `Next` is enabled (`maxReachableIndex = nextDisabled || lastStep ? step : step + 1`). A disabled step
  ignores clicks. `RollForwardShell` takes `onStepChange(index)` and uses it for Previous, Next and the Wizard.
  In Storybook the stories wire `onStepChange` to the step stories (`selectStory` channel event): forward lands on the step's
  initial state (Filters → *Narrowed*, Source and target → *Default*, Continuity → *Empty*, Summary → *Collapsed*); going back from
  Summary lands on *Continuity — Date set*. `SummaryScreen` accepts `onStepChange` too; `Create roles` still opens the modal.
- **Date fields in Filters** (`DateField`) open the IPS `Calendar` in a popover under the field when clicked or tabbed into.
  Picking a day fills the field as `d Mon yyyy` and closes it; Escape or a click outside also close it. The text stays editable
  and the calendar opens on the typed/initial date. Fields in the right-hand column (end dates) open the calendar right-aligned
  so it stays on screen. The Continuity start date is unchanged (free text, no picker).
