// RollForward — four-step wizard: Filters, Source and target engagements, Continuity and dates, Summary.
// Figma: GNaUzdui1Ymrq8CZRyOLEJ (Rollforward in blueprints screen), section "Filters step" node 2295:249944.
// Layout: same shell as CreateReportShell in analytics.stories.tsx (Navbar + scroll area + sticky Actions).

import React, { useEffect, useId, useState } from "react";
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
import { Calendar }    from "../../components/calendar/calendar";
import { Modal }       from "../../components/modal/modal";
import { Table }       from "../../components/table/table";
import type { TableColumn, TableRow, SortDirection } from "../../components/table/table";

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
  /** Label of the primary button (default "Next"; "Create roles" on the last step) */
  nextLabel?: string;
  /** Click handler of the primary button (defaults to going to the next step through `onStepChange`) */
  onNext?: () => void;
  /**
   * Called with the target step index by Previous, Next and the Wizard steps. The Wizard keeps every earlier step
   * clickable (Previous is enabled) and the following step only while Next is enabled.
   */
  onStepChange?: (index: number) => void;
};

export function RollForwardShell({ step, children, infoText, nextDisabled = false, nextTooltip, nextLabel, onNext, onStepChange }: RollForwardShellProps) {
  const isLastStep = step === ROLL_FORWARD_STEPS.length - 1;
  // Steps are reachable exactly as far as the footer buttons allow: back while Previous exists, one ahead while Next is enabled
  const maxReachableIndex = nextDisabled || isLastStep ? step : step + 1;
  const rightActions: ActionItem[] = [
    ...(step > 0 ? [{ label: "Previous", variant: "secondary" as const, icon: "arrow-left" as const, onClick: () => onStepChange?.(step - 1) }] : []),
    {
      label: nextLabel ?? (isLastStep ? "Create roles" : "Next"),
      variant: "primary",
      disabled: nextDisabled,
      onClick: onNext ?? (!isLastStep ? () => onStepChange?.(step + 1) : undefined),
      tooltip: nextDisabled ? nextTooltip : undefined,
      ...(!isLastStep ? { icon: "arrow-right" as const, iconPosition: "right" as const } : {}),
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
              <Wizard steps={ROLL_FORWARD_STEPS} activeIndex={step} maxReachableIndex={maxReachableIndex} onChange={onStepChange} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
              {children}
            </div>
          </div>
        </div>
        <Actions
          variant="sticky-screen"
          insetX={64} // Figma: Cancel at x=124, Next ends at x=1376 on a 1440 canvas
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

type FilterValues = { template?: string; id?: string; assignee?: string };

function YesNo({ label }: { label: string }) {
  const labelId = useId();
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  return (
    <div role="group" aria-labelledby={labelId} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span id={labelId} style={fieldLabel}>{label}</span>
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

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const formatDate = (d: Date) => `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
/** "1 Oct 2026" → Date (null when the text isn't a date in that format) */
const parseDate = (text: string): Date | null => {
  const m = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/.exec(text.trim());
  const month = m ? MONTHS_SHORT.findIndex(x => x.toLowerCase() === m[2].toLowerCase()) : -1;
  return m && month >= 0 ? new Date(Number(m[3]), month, Number(m[1])) : null;
};

type DateFieldProps = {
  label: string;
  /** Initial text, e.g. "1 Oct 2026" (later prop changes don't update it) */
  value?: string;
  /** Which edge the calendar lines up with: fields in the right-hand column open it leftwards so it stays on screen */
  popoverAlign?: "left" | "right";
};

// Date field: clicking (or tabbing into) it opens the IPS Calendar below the field. Picking a day fills the field and closes it;
// click outside / Escape also close it. The text stays editable.
function DateField({ label, value: initial = "", popoverAlign = "left" }: DateFieldProps) {
  const id = useId();
  const [text, setText] = useState(initial);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div style={{ position: "relative" }} onClick={() => setOpen(true)}>
      <Input
        id={id}
        label={label}
        rightIcon="calendar"
        value={text}
        onChange={e => setText(e.target.value)}
        onFocus={() => setOpen(true)}
        onClear={text ? () => setText("") : undefined}
      />
      {open && (
        <>
          {/* transparent catcher: a click anywhere outside the calendar closes it */}
          <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={e => { e.stopPropagation(); setOpen(false); }} />
          <div
            style={{ position: "absolute", top: "100%", [popoverAlign]: 0, zIndex: 41, marginTop: 4, borderRadius: "var(--radius-md)", boxShadow: "var(--tile-shadow-interactive)" }}
            onClick={e => e.stopPropagation()}
          >
            <Calendar value={parseDate(text)} onChange={d => { setText(formatDate(d)); setOpen(false); }} />
          </div>
        </>
      )}
    </div>
  );
}

function SelectField({ label, value, onClear }: { label: string; value?: string; onClear?: () => void }) {
  const id = useId();
  return <InputSelect id={id} label={label} value={value} onClear={value ? onClear : undefined} />;
}

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
  // Initial values come from props (stories pass them); later prop changes don't update this state
  const [v, setV] = useState<FilterValues>({ template, id, assignee });
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
            <DateField label="Roll forward end date" popoverAlign="right" />

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
            <Switch checked={rolesOn} onChange={setRolesOn} label="Role filters" showLabel={false} />
            <span style={h5}>Role filters</span>
          </div>
          {rolesOn && (
            <>
              <InputSearch value={roleSearch} onChange={e => setRoleSearch(e.target.value)} onClear={() => setRoleSearch("")} />
              {/* Labels spell "Rollforward …" (one word) in the role section — this is how Figma writes them */}
              <div style={GRID}>
                <YesNo label="Rollforward source" />
                <YesNo label="Rollforward target" />
                <DateField label="Rollforward start date" value={roleStartDate} />
                <DateField label="Rollforward end date" popoverAlign="right" />

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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 2 — SOURCE AND TARGET ENGAGEMENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ROLLED_FORWARD_NOTICE = "This engagement has been rolled forward and we have found 2 existing target for this engagement";

const SETTING_OPTIONS = [
  { value: "placeholder", label: "Create placeholder" },
  { value: "existing",    label: "Select existing engagement" },
];

// Columns line up with the header row: source (408px) | setting (408px) | target (rest) — Figma x: 142 | 550 | 958
const ROW_GRID: React.CSSProperties = { display: "grid", gridTemplateColumns: "408px 408px minmax(0, 1fr)", alignItems: "start" };

type Setting = "placeholder" | "existing";

type EngagementPair = {
  id: string;
  source: string;
  existingTarget: string;
  initialSetting: Setting;
  /** Engagement already rolled forward: shows the info icon + tooltip, whichever setting is selected */
  rolledForward?: boolean;
};

const ENGAGEMENT_PAIRS: EngagementPair[] = [
  { id: "q3-it",       source: "[2026 Q3] ProFinda IT",       existingTarget: "RF_CLONE_2_[2026 Q3] ProFinda IT",       initialSetting: "existing",    rolledForward: true },
  { id: "q4-advisory", source: "[2026 Q4] ProFinda Advisory", existingTarget: "RF_CLONE_1_[2026 Q4] ProFinda Advisory", initialSetting: "placeholder" },
];

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

export function SourceTargetStep() {
  const prefixId = useId();
  const [prefix, setPrefix] = useState("RF_CLONE_1_");
  const [settings, setSettings] = useState<Record<string, Setting>>(
    () => Object.fromEntries(ENGAGEMENT_PAIRS.map(p => [p.id, p.initialSetting])),
  );
  const placeholders = Object.values(settings).filter(s => s === "placeholder").length;
  const existing     = Object.values(settings).filter(s => s === "existing").length;
  const setOne = (id: string) => (value: string) => setSettings(prev => ({ ...prev, [id]: value as Setting }));
  const setAllPlaceholder = () =>
    setSettings(prev => Object.fromEntries(Object.keys(prev).map(id => [id, "placeholder" as Setting])));

  return (
    <Tile tileStyle="highlight" padding="screen">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Header size="content" title="Source and target engagements" />
        <span style={body}>Some of the selected engagements have placeholder engagements associated to them, please decide how to proceed.</span>

        {/* Summary bar */}
        <Tile tileStyle="default" padding="panel">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* 390 / 400: align the button with the Setting column (x=550) and the prefix label with the Target column (x=958) at 1440 wide — Figma */}
            <span style={{ ...labelCss, width: 390, flexShrink: 0 }}>
              {plural(ENGAGEMENT_PAIRS.length, "engagement")} · {plural(placeholders, "new placeholder")} · {existing} existing
            </span>
            <Button kind="secondary" size="regular" onClick={setAllPlaceholder}>Create placeholder for all</Button>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, width: 400 }}>
              <label htmlFor={prefixId} style={{ ...body, whiteSpace: "nowrap" }}>Placeholder prefix</label>
              <Input id={prefixId} value={prefix} onChange={e => setPrefix(e.target.value)} />
            </div>
          </div>
        </Tile>

        {/* IPS Table is a data grid (56px rows, no free-form cells); this step is a form-like list,
            so it uses a shared CSS grid (ROW_GRID) for header and rows — the sort icon is decorative.
            marginTop -2 brings header→divider spacing to Figma's 10px (tighter than the card gap). */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: -2 }}>
          <div style={{ ...ROW_GRID, padding: "0 8px 10px" }}>
            <span style={{ ...body, display: "inline-flex", alignItems: "center", gap: 4 }}>Source engagement <Icon name="sort" size={14} /></span>
            <span style={body}>Setting</span>
            <span style={body}>Target engagement</span>
          </div>
          <Divider orientation="horizontal" />

          {ENGAGEMENT_PAIRS.map((pair, i) => {
            const isExisting = settings[pair.id] === "existing";
            const showInfoIcon = !!pair.rolledForward;
            return (
              <React.Fragment key={pair.id}>
                <div style={{ padding: "10px 8px 16px" }}>
                  <div style={ROW_GRID}>
                    {/* paddingTop 2 / 7: optical alignment with the 34px Toggle / Select */}
                    <span style={{ ...bodyBold, paddingTop: 2 }}>{pair.source}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {/* max-content: Toggle is width:100%, this keeps it content-sized like Figma */}
                      <div role="group" aria-label={`Setting for ${pair.source}`} style={{ width: "max-content", flexShrink: 0 }}>
                        <Toggle options={SETTING_OPTIONS} value={settings[pair.id]} onChange={setOne(pair.id)} />
                      </div>
                      {showInfoIcon && (
                        <Tooltip content={ROLLED_FORWARD_NOTICE} placement="down-center" maxWidth={320}>
                          <span tabIndex={0} role="img" aria-label={ROLLED_FORWARD_NOTICE} style={{ display: "inline-flex" }}>
                            <Icon name="info" size={16} style={{ color: "var(--palette-blue-0)" }} />
                          </span>
                        </Tooltip>
                      )}
                    </div>
                    <div style={{ paddingTop: isExisting ? 0 : 7 }}>
                      {isExisting ? (
                        <InputSelect value={pair.existingTarget} />
                      ) : (
                        <span style={body}>New: <span style={bodyBold}>{prefix}{pair.source}</span></span>
                      )}
                    </div>
                  </div>
                </div>
                {i < ENGAGEMENT_PAIRS.length - 1 && <Divider orientation="horizontal" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </Tile>
  );
}

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

export type ContinuityStepProps = {
  /** Initial value of the start date field */
  startDate?: string;
};

export function ContinuityStep({ startDate = "" }: ContinuityStepProps) {
  const [continuity, setContinuity] = useState("maintain");
  // Initial value comes from the prop (stories pass it); later prop changes don't update this state
  const [start, setStart] = useState(startDate);
  const radioName = useId();
  const continuityDescId = useId();
  const startId = useId();
  const endId = useId();

  return (
    <>
      <Tile tileStyle="highlight" padding="screen">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Header size="content" title="Team continuity" />
          <span id={continuityDescId} style={body}>Select whether rollforward functionality would suggest Workforce Members to keep team continuity if possible.</span>
          {/* RadioGroup has role="radiogroup" but no label API, so the wrapper names the group */}
          <div role="group" aria-labelledby={continuityDescId}>
            <RadioGroup options={CONTINUITY_OPTIONS} value={continuity} onChange={setContinuity} groupLayout="column" name={radioName} />
          </div>
        </div>
      </Tile>

      <Tile tileStyle="highlight" padding="screen">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Header size="content" title="New roles dates" rightIcon="timeline" />
          <span style={body}>This will be the new start date for first role's availability rule. If more roles are created, those will keep original cadence</span>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            {/* Figma: 302px field; flexShrink 0 keeps the 302px column from shrinking next to the flex:1 end-date field */}
            <div style={{ width: 302, flexShrink: 0 }}>
              {/* free text — there is no date picker in this prototype */}
              <Input id={startId} label="Start date (first role)" mandatory rightIcon="calendar" value={start} onChange={e => setStart(e.target.value)} />
            </div>
            <Input id={endId} label="Estimated end date (last role)" value={start ? ESTIMATED_END_DATE : "-"} readOnly />
          </div>
        </div>
      </Tile>
    </>
  );
}

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

/** Ids of every role in the Summary sample data (all roles are selected initially) */
export const ALL_SUMMARY_ROLE_IDS: (string | number)[] = SUMMARY_ENGAGEMENTS.flatMap(e => e.roles.map(r => r.id));

const SUMMARY_ROLE_COUNT = ALL_SUMMARY_ROLE_IDS.length;

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

export type SummaryStepProps = {
  /** Engagement rows initially expanded */
  expanded?: boolean;
  /** Controlled selection (role ids). When omitted, the step keeps its own selection (all roles initially). */
  selected?: (string | number)[];
  /** Called with the next selection; required alongside `selected` to make it controlled */
  /** Receives the next selection computed from the current `selected` prop (not a functional updater). Controlled only when both props are given. */
  onSelectedChange?: (ids: (string | number)[]) => void;
};

export function SummaryStep({ expanded = false, selected: selectedProp, onSelectedChange }: SummaryStepProps) {
  const [search, setSearch] = useState("");
  // Initial state comes from props (stories pass `expanded`); later prop changes don't update it
  const [open, setOpen] = useState<Set<string>>(() => new Set(expanded ? SUMMARY_ENGAGEMENTS.map(e => e.id) : []));
  const [internalSelected, setInternalSelected] = useState<(string | number)[]>(ALL_SUMMARY_ROLE_IDS);
  const controlled = selectedProp !== undefined && onSelectedChange !== undefined;
  const selected = controlled ? selectedProp : internalSelected;
  const setSelected = (updater: (prev: (string | number)[]) => (string | number)[]) =>
    controlled ? onSelectedChange(updater(selectedProp)) : setInternalSelected(updater);
  // One sort state shared by every expanded table (Table only reports clicks; it doesn't sort rows itself)
  const [sortDirection, setSortDirection] = useState<SortDirection>("none");

  const toggleOpen = (id: string) => {
    setOpen(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Replace one engagement's selected roles (`ids`) with `picked`, leaving other engagements untouched
  const setEngagementPicked = (ids: (string | number)[], picked: (string | number)[]) =>
    setSelected(prev => [...prev.filter(id => !ids.includes(id)), ...picked]);

  const sortRows = (rows: SummaryRole[]) => {
    if (sortDirection === "none") return rows;
    const sorted = [...rows].sort((a, b) => a.role.localeCompare(b.role));
    return sortDirection === "asc" ? sorted : sorted.reverse();
  };

  return (
    <Tile tileStyle="highlight" padding="screen">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Alert type="general" layout="inline" message="Planned dates and hours are an estimation and might not be 100% accurate" />

        {/* Figma: search row is indented 24px from the alert's left edge (field x=158 vs alert x=134) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 24 }}>
          {/* Figma: 283px search field; inert in this prototype: it neither filters nor changes the counts */}
          <div style={{ width: 283 }}>
            <InputSearch value={search} onChange={e => setSearch(e.target.value)} onClear={() => setSearch("")} />
          </div>
          <span style={labelCss}>{SUMMARY_ROLE_COUNT} target roles from {SUMMARY_ENGAGEMENTS.length} target engagements</span>
        </div>

        {/* marginTop -8 trims the 16px stack gap to Figma's ~8px between search row and first engagement row */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: -8 }}>
          {SUMMARY_ENGAGEMENTS.map(eng => {
            const ids = eng.roles.map(r => r.id);
            const picked = ids.filter(id => selected.includes(id));
            const isOpen = open.has(eng.id);
            return (
              <React.Fragment key={eng.id}>
                {/* Checkbox has no aria-label prop, so the group names the chevron + checkbox + title by engagement.
                    padding 10px: 32px content + 20 = 52px row + 1px divider = Figma's 53px pitch */}
                <div role="group" aria-label={eng.title} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0" }}>
                  {/* margins -6/-6: Figma chevron centre x=142 (6px left of the row edge) while checkbox (x=158) and title (x=190) stay put */}
                  <Button kind="iconTertiary" size="small" title={isOpen ? "Collapse" : "Expand"} onClick={() => toggleOpen(eng.id)} style={{ marginLeft: -6, marginRight: -6 }}>
                    <Icon name={isOpen ? "chevron-down" : "chevron-right"} size={16} />
                  </Button>
                  <Checkbox
                    checked={ids.length > 0 && picked.length === ids.length}
                    indeterminate={picked.length > 0 && picked.length < ids.length}
                    onChange={checked => setEngagementPicked(ids, checked ? ids : [])}
                  />
                  <span style={bodyBold}>{eng.title}</span>
                </div>
                {isOpen && (
                  <div role="region" aria-label={`${eng.title} roles`}>
                    <Table<SummaryRole>
                      columns={SUMMARY_COLUMNS}
                      rows={sortRows(eng.roles)}
                      selectable
                      tone="subtle"
                      selectedRows={picked}
                      onSelectionChange={next => setEngagementPicked(ids, next)}
                      sortKey="role"
                      sortDirection={sortDirection}
                      onSort={(_key, dir) => setSortDirection(dir)}
                    />
                  </div>
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

// ── Summary screen: shell + step + "Create roles" confirmation modal ──────────

export function SummaryScreen({ expanded = false, onStepChange }: { expanded?: boolean; onStepChange?: (index: number) => void }) {
  const [selected, setSelected] = useState<(string | number)[]>(ALL_SUMMARY_ROLE_IDS);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const close = () => setConfirmOpen(false);

  return (
    <>
      <RollForwardShell step={3} onNext={() => setConfirmOpen(true)} nextDisabled={selected.length === 0} onStepChange={onStepChange}>
        <SummaryStep expanded={expanded} selected={selected} onSelectedChange={setSelected} />
      </RollForwardShell>
      {/* width 500: Figma card is 1472px wide on a 1632px capture where the 20px title measures 688px
          (our title renders 234.6px → scale 2.93), so 1472 / 2.93 ≈ 502 */}
      <Modal
        open={confirmOpen}
        onClose={close}
        title="Rollforward confirmation"
        width={500}
        leftActions={[{ label: "Cancel", variant: "secondary", onClick: close }]}
        rightActions={[{ label: "Proceed", variant: "primary", onClick: close }]}
      >
        <span style={body}>You’re about to create {plural(selected.length, "role")}, are you sure you want to proceed?</span>
      </Modal>
    </>
  );
}
