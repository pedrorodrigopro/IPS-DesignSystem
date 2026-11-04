// CV Studio screen — export one or several CVs (used by the Screens/CVStudio stories and by Screens/MyProfile)
// Figma: Export CV revamp (eLJ4mtITbBhHCbONvKtGZU)
//   Single export:  653:36523   Multi export: 653:37833   Left module (ProPilot): 1440:36072
//
// Layout (Page variant="fluid" — edge to edge, 24px top inset):
//   Header row      Header (page) — CV name, or "3 CVs" + names — and File type / Template selectors (InputInline)
//   Content row     LEFT module (413px) | RIGHT CV preview card
//                   Left: "Translate to" tile (4 states) + a tile with Navigation tabs (ProPilot | Edit fields):
//                     Edit fields — the CV fields (Input / InputTextarea)
//                     ProPilot    — conversation + PPChatInput
//                   Right: Tile highlight — toolbar (pager for multi, Version selector), then the scrolling
//                          CV preview (photo, logo, label/value rows)
//   Footer          Actions sticky-panel — Close | Save, Export (single)
//                   multi: split buttons "Save (3)" / "Export (3)"; their chevrons open "Save current" / "Export current"
//
// Both columns are taller than the visible area by 24px so the footer clips them, as in Figma.

import { Fragment, useEffect, useRef, useState } from "react";

import { Navbar }          from "../../components/navbar/navbar";
import { Page }            from "../../components/layout/layout";
import { Tile }            from "../../components/tile/tile";
import { Header }          from "../../components/header/header";
import { Navigation }      from "../../components/navigation/navigation";
import { Alert }           from "../../components/alert/alert";
import { Button }          from "../../components/button/button";
import { ButtonGroup }     from "../../components/button_group/button_group";
import { Actions }         from "../../components/actions/actions";
import { Divider }         from "../../components/divider/divider";
import { Icon }            from "../../components/icon/icon";
import { Input, InputInline, InputSelect, InputTextarea } from "../../components/input/input";
import { LoadingIcon }    from "../../components/loading/loading";
import { DropdownActions, DropdownSelection } from "../../components/dropdown/dropdown";
import type { DropdownItem } from "../../components/dropdown/dropdown";
import { PPBubble }        from "../../components/pp_bubble/pp_bubble";
import { PPChatInput }     from "../../components/pp_chat_input/pp_chat_input";
import { PPSuggestionCard } from "../../components/pp_suggestion_card/pp_suggestion_card";
import type { PPSuggestionCardState } from "../../components/pp_suggestion_card/pp_suggestion_card";
import { PPPreviewBanner } from "../../components/pp_preview_banner/pp_preview_banner";
import { SkillProfile }    from "../../components/skill/skill";
import { applyChange, summarize } from "../cv_review/cv_review";
import type { ReviewChange } from "../cv_review/cv_review";
import { adaptCV, industryName, isIndustryMessage } from "./propilot_industry";
import type { IndustryFields } from "./propilot_industry";

import cvPhoto  from "./assets/cv-photo.jpg";
import PFLogo   from "./assets/profinda-logo.svg";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type FieldKey =
  | "name" | "jobTitle" | "bio" | "email" | "phone" | "location" | "talentPool"
  | "businessLine" | "department" | "costCentre" | "team" | "languages" | "skills" | "accreditations";

export type CV = Record<FieldKey, string>;

const FIELDS: { key: FieldKey; label: string; multiline?: boolean }[] = [
  { key: "name",           label: "Name" },
  { key: "jobTitle",       label: "Job title" },
  { key: "bio",            label: "Bio", multiline: true },
  { key: "email",          label: "Email" },
  { key: "phone",          label: "Phone" },
  { key: "location",       label: "Location" },
  { key: "talentPool",     label: "Talent Pool" },
  { key: "businessLine",   label: "Business Line" },
  { key: "department",     label: "Department" },
  { key: "costCentre",     label: "Cost Centre" },
  { key: "team",           label: "Team" },
  { key: "languages",      label: "Languages" },
  { key: "skills",         label: "Skills" },
  { key: "accreditations", label: "Accreditations" },
];

export const ZARA: CV = {
  name: "Zara Bond",
  jobTitle: "Accountant",
  bio: "Reliable accounting professional, known for seriousness, integrity, and quick learning. Highly skilled with a sharp eye for identifying and correcting errors. Eager to find a position where a strong work ethic and resourceful character are valued.",
  email: "zara.bond@pf.com",
  phone: "378 098 738",
  location: "London",
  talentPool: "Admin’s pool",
  businessLine: "Operations",
  department: "Management",
  costCentre: "C01122",
  team: "Accounting",
  languages: "Dutch, English, Finnish, French",
  skills: "Payroll supervision, Invoicing and collections, Month-end reporting, Budgeting and forecasting, Expense reporting, Motivated professional, Communication skills, Data trend awareness",
  accreditations: "CPA, ACCA, CFA",
};

// Names are from the Figma ("Zara Bond, John Smith, Mary Lee, +5"); the rest of their data is placeholder.
export const JOHN: CV = {
  ...ZARA,
  name: "John Smith",
  jobTitle: "Senior Consultant",
  bio: "Consultant with ten years of experience leading finance transformation programmes for banks and insurers. Comfortable moving between executive workshops and detailed process design.",
  email: "john.smith@pf.com",
  phone: "378 098 112",
  location: "Manchester",
  talentPool: "Consulting pool",
  businessLine: "Advisory",
  department: "Finance transformation",
  costCentre: "C01340",
  team: "Banking",
  languages: "English, German",
  skills: "Programme management, Process design, Stakeholder management, Financial controls, Workshop facilitation",
  accreditations: "PMP, Prince2",
};
export const MARY: CV = {
  ...ZARA,
  name: "Mary Lee",
  jobTitle: "Financial Analyst",
  bio: "Analyst focused on forecasting and variance reporting. Builds clear dashboards that help non-finance teams make faster decisions.",
  email: "mary.lee@pf.com",
  phone: "378 098 475",
  location: "Edinburgh",
  talentPool: "Analytics pool",
  businessLine: "Finance",
  department: "Planning",
  costCentre: "C01207",
  team: "FP&A",
  languages: "English, Spanish",
  skills: "Forecasting, Variance analysis, SQL, Dashboarding, Budgeting",
  accreditations: "CFA Level II",
};

const FILE_TYPES  = [{ id: ".pdf", label: ".pdf" }, { id: ".docx", label: ".docx" }];
// Each template shows the language it is written in as a second line (Dropdown subLabel)
const TEMPLATES: DropdownItem[] = [
  { id: "PF_template_1", label: "PF_template_1", subLabel: "English" },
  { id: "PF_template_2", label: "PF_template_2", subLabel: "Polish" },
  { id: "PF_template_3", label: "PF_template_3", subLabel: "English" },
  { id: "PF_template_4", label: "PF_template_4", subLabel: "Spanish" },
];
const VERSIONS    = [{ id: "V1, English Banking", label: "V1, English Banking" }, { id: "V2, English Consulting", label: "V2, English Consulting" }];
const TRANSLATE   = ["Dutch", "English", "Finnish", "French", "German", "Spanish"].map(l => ({ id: l, label: l }));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Small helpers
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const body: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%",
};
const bodyBold: React.CSSProperties = { ...body, fontWeight: 700 };

/** Opens an IPS selection dropdown under whatever trigger is passed; closes on outside click. */
export function SelectMenu({
  items, selectedId, onSelect, align = "left", children,
}: {
  items: DropdownItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  align?: "left" | "right";
  children: (toggle: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {children(() => setOpen(o => !o))}
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 20 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "100%", [align]: 0, zIndex: 21, marginTop: 4, minWidth: "100%" }}>
            <DropdownSelection items={items} selectedId={selectedId} onSelect={id => { onSelect(id); setOpen(false); }} />
          </div>
        </>
      )}
    </div>
  );
}

/** Split button (ButtonGroup) whose chevron opens an actions menu above it (the footer is at the bottom of the screen). */
/** Joined main button + chevron menu. `onClick` is the main action, `onSelect` receives the picked menu item id. */
export function SplitButton({
  label, variant, items, onClick, onSelect, placement = "top",
}: {
  label: string; variant: "primary" | "secondary"; items: DropdownItem[];
  onClick?: () => void; onSelect?: (id: string) => void; placement?: "top" | "bottom";
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <ButtonGroup label={label} variant={variant} onClick={onClick} onDropdownClick={() => setOpen(o => !o)} />
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 100 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", ...(placement === "top" ? { bottom: "100%", marginBottom: 4 } : { top: "100%", marginTop: 4 }), right: 0, zIndex: 101, minWidth: "100%", width: "max-content" }}>
            <DropdownActions items={items} onSelect={id => { setOpen(false); onSelect?.(id); }} />
          </div>
        </>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CV preview (right) — label / value rows. Values come from the edited CV.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ProPilot preview stroke: white fill + 2px banner-gradient border (same technique as booking_pill "preview").
// Highlighted rows use 6px padding + 2px border = 8px, so nothing shifts when the stroke appears.
const PP_STROKE: React.CSSProperties = {
  backgroundColor: "transparent",
  backgroundImage:
    "linear-gradient(white, white), linear-gradient(138deg, rgba(10, 16, 72, 1) 0%, rgba(64, 58, 157, 1) 28%, rgba(13, 75, 176, 1) 61%, rgba(24, 39, 174, 1) 96%)",
  backgroundOrigin: "padding-box, border-box",
  backgroundClip: "padding-box, border-box",
  border: "2px solid transparent",
  borderRadius: 8,
};

function PreviewRow({ label, children, highlight }: { label: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10, padding: highlight ? 6 : 8, flex: 1, minWidth: 0, ...(highlight ? PP_STROKE : null) }}>
      <span style={{ ...body, width: 93, flexShrink: 0, lineHeight: "32px" }}>{label}</span>
      <span style={{ ...bodyBold, minWidth: 0, overflowWrap: "anywhere", padding: "5.5px 0" }}>{children}</span>
    </div>
  );
}

function PreviewPair({ left, right, cv, highlight }: { left: [string, FieldKey]; right: [string, FieldKey]; cv: CV; highlight?: FieldKey[] }) {
  return (
    <div style={{ display: "flex", gap: 8, padding: "0 4px" }}>
      <PreviewRow label={left[0]} highlight={highlight?.includes(left[1])}>{cv[left[1]]}</PreviewRow>
      <PreviewRow label={right[0]} highlight={highlight?.includes(right[1])}>{cv[right[1]]}</PreviewRow>
    </div>
  );
}

/** `highlight` = fields drawn with the ProPilot gradient stroke (suggestion preview). */
export function CVPreview({ cv, highlight }: { cv: CV; highlight?: FieldKey[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Tile tileStyle="default" padding="panel" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 8px 8px" }}>
          <img src={cvPhoto} alt={cv.name} width={100} height={100} style={{ borderRadius: "50%", objectFit: "cover" }} />
          <PFLogo width={250} height={66} style={{ margin: "-4px 0" }} />
        </div>
        <PreviewRow label="Name" highlight={highlight?.includes("name")}>{cv.name}</PreviewRow>
        <PreviewRow label="Job title" highlight={highlight?.includes("jobTitle")}>{cv.jobTitle}</PreviewRow>
        <PreviewRow label="Bio" highlight={highlight?.includes("bio")}>{cv.bio}</PreviewRow>
        <PreviewPair cv={cv} highlight={highlight} left={["Email", "email"]}               right={["Phone", "phone"]} />
        <PreviewPair cv={cv} highlight={highlight} left={["Location", "location"]}         right={["Talent Pool", "talentPool"]} />
        <PreviewPair cv={cv} highlight={highlight} left={["Business Line", "businessLine"]} right={["Department", "department"]} />
        <PreviewPair cv={cv} highlight={highlight} left={["Cost Centre", "costCentre"]}    right={["Team", "team"]} />
      </Tile>
      <PreviewRow label="Languages" highlight={highlight?.includes("languages")}>{cv.languages}</PreviewRow>
      <PreviewRow label="Skills" highlight={highlight?.includes("skills")}>{cv.skills}</PreviewRow>
      <PreviewRow label="Accreditations" highlight={highlight?.includes("accreditations")}>{cv.accreditations}</PreviewRow>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Review of profile edits (Figma 886:41024) — "Before / After" boxes under the changed fields
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type ReviewScope = "this" | "all";

/** Review of the profile's pending edits for the CV shown. The flow owns the state; the Studio reports the user's choices. */
export type StudioReview = {
  changes: ReviewChange[];
  /** The Studio has already written the value into its CV; `scope` says whether other versions get it too. */
  onUse: (id: string, scope: ReviewScope) => void;
  onDismiss: (id: string, scope: ReviewScope) => void;
  onPushAll: () => void;
  onDismissAll: () => void;
};

const clamp3: React.CSSProperties = { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", overflowWrap: "anywhere" };
const reviewLabel: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "115%" };

function ReviewButtons({ useLabel, useAllLabel, onUse, onDismiss }: {
  useLabel: string; useAllLabel: string; onUse: (scope: ReviewScope) => void; onDismiss: (scope: ReviewScope) => void;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
      <SplitButton label="Dismiss" variant="secondary" placement="bottom"
        items={[{ id: "all", label: "Dismiss in all versions" }]} onClick={() => onDismiss("this")} onSelect={() => onDismiss("all")} />
      <SplitButton label={useLabel} variant="primary" placement="bottom"
        items={[{ id: "all", label: useAllLabel }]} onClick={() => onUse("this")} onSelect={() => onUse("all")} />
    </div>
  );
}

/** A field edited on the profile: the field's input, a Before / After box and Dismiss | Use new. */
function ReviewField({ change, children, onUse, onDismiss }: {
  change: Extract<ReviewChange, { kind: "field" }>; children: React.ReactNode;
  onUse: (scope: ReviewScope) => void; onDismiss: (scope: ReviewScope) => void;
}) {
  return (
    <Tile tileStyle="default" padding="panel" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {children}
      <Tile tileStyle="object-light" padding="panel" style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ ...reviewLabel, fontWeight: 700 }}>Before</span>
          <span style={{ ...body, ...clamp3 }}>{change.before}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ ...reviewLabel, fontWeight: 700 }}>After</span>
          <span style={{ ...body, ...clamp3, alignSelf: "flex-start", background: "var(--palette-neutral-0)", borderRadius: 4, padding: "2px 4px" }}>{change.after}</span>
        </div>
      </Tile>
      <ReviewButtons useLabel="Use new" useAllLabel="Use new in all versions" onUse={onUse} onDismiss={onDismiss} />
    </Tile>
  );
}

/** A skill added on the profile: the skill and Dismiss | Add. */
function ReviewSkill({ change, onUse, onDismiss }: {
  change: Extract<ReviewChange, { kind: "skill" }>; onUse: (scope: ReviewScope) => void; onDismiss: (scope: ReviewScope) => void;
}) {
  return (
    <Tile tileStyle="default" padding="panel" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Tile tileStyle="object-light" padding="panel" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ ...reviewLabel, fontWeight: 700 }}>{change.label}</span>
        <div><SkillProfile label={change.skill} proficiency="advanced" disableTooltip /></div>
      </Tile>
      <ReviewButtons useLabel="Add" useAllLabel="Add to all versions" onUse={onUse} onDismiss={onDismiss} />
    </Tile>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ProPilot chat items (state lives in CVStudioScreen so the CV preview can react to suggestion hover)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ChatItem =
  | { id: number; kind: "user"; text: string }
  | { id: number; kind: "pp-text"; text: string }
  | { id: number; kind: "pp-loading" }
  | { id: number; kind: "suggestion"; industry: string; state: PPSuggestionCardState };

const INDUSTRY_FIELDS: FieldKey[] = ["bio", "skills"];
const SUGGESTION_DELAY = 2000;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Left module — Translate tile + tabs (ProPilot | Edit fields)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type Mode = "edit" | "propilot";

const MODE_TABS = [
  { id: "propilot", label: "ProPilot" },
  { id: "edit",     label: "Edit fields" },
];

// ── Translate to — four states (Figma "Export translation") ───────────────────
//   idle        label + empty select
//   selected    select shows the language; "Review before translating" + primary "Translate now"
//   translating centred loader + "N% translated"
//   done        "Translated to" + language; "Review translation before export" + link "Reset"

type TranslateState =
  | { status: "idle" }
  | { status: "selected"; language: string }
  | { status: "translating"; language: string; progress: number }
  | { status: "done"; language: string };

const labelText: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: "var(--font-size-label)", fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%",
};

function TranslateTile({ count }: { count: number }) {
  const [state, setState] = useState<TranslateState>({ status: "idle" });
  const many = count > 1;

  // Simulated progress: 25 → 50 → 75 → 100 %, then done
  useEffect(() => {
    if (state.status !== "translating") return;
    const t = setTimeout(() => {
      setState(s => s.status !== "translating" ? s
        : s.progress >= 100 ? { status: "done", language: s.language }
        : { ...s, progress: s.progress + 25 });
    }, 700);
    return () => clearTimeout(t);
  }, [state]);

  const note = (icon: "warning" | "check", color: string, text: string) => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 4, minHeight: 18 }}>
      <Icon name={icon} size={16} style={{ color, flexShrink: 0 }} />
      <span style={labelText}>{text}</span>
    </div>
  );

  let content: React.ReactNode;
  if (state.status === "translating") {
    content = (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, height: "100%" }}>
        <LoadingIcon />
        <span style={{ ...labelText, fontSize: "var(--font-size-body)" }}>{state.progress}% translated</span>
      </div>
    );
  } else if (state.status === "done") {
    content = (
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 110, flexShrink: 0 }}>
          <span style={labelText}>{many ? `Translated ${count} CVs to` : "Translated to"}</span>
          <span style={{ ...bodyBold, lineHeight: "32px" }}>{state.language}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
          {note("check", "var(--palette-green-0)", "Review translation before export")}
          <div style={{ display: "flex", alignItems: "center", height: 32 }}>
            <Button kind="link" size="regular" onClick={() => setState({ status: "idle" })}>
              <Icon name="history" size={16} />Reset
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    const language = state.status === "selected" ? state.language : "";
    content = (
      <div style={{ display: "flex", gap: 16 }}>
        <SelectMenu items={TRANSLATE} selectedId={language} onSelect={l => setState({ status: "selected", language: l })}>
          {toggle => (
            <div style={{ width: 190 }}>
              <InputSelect label={many ? `Translate ${count} CVs to` : "Translate to"} value={language} onClick={toggle} />
            </div>
          )}
        </SelectMenu>
        {state.status === "selected" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            {note("warning", "var(--palette-orange-1)", "Review before translating")}
            <div>
              <Button kind="primary" size="regular" onClick={() => setState({ status: "translating", language: state.language, progress: 25 })}>
                Translate now
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Tile tileStyle="highlight" padding="panel">
      {/* Fixed content height: every state (idle, selected, translating, done) occupies the same block */}
      <div style={{ padding: 4 }}><div style={{ height: 56 }}>{content}</div></div>
    </Tile>
  );
}

function LeftModule({
  cv, onChange, count, mode, onModeChange, items, onSend, onApply, onDismissSuggestion, onPreview,
  changes, onUseChange, onDismissChange,
}: {
  cv: CV; onChange: (k: FieldKey, v: string) => void; count: number; mode: Mode; onModeChange: (m: Mode) => void;
  changes: ReviewChange[]; onUseChange: (id: string, scope: ReviewScope) => void; onDismissChange: (id: string, scope: ReviewScope) => void;
  items: ChatItem[]; onSend: (text: string) => void; onApply: (id: number) => void; onDismissSuggestion: (id: number) => void;
  onPreview: (id: number | null) => void;
}) {
  const [draft, setDraft] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 413, flexShrink: 0, height: "calc(100% + 24px)" }}>
      <TranslateTile count={count} />

      {/* Tabs + content */}
      <Tile tileStyle="highlight" padding="content" style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, minHeight: 0 }}>
        <div style={{ padding: "0 8px" }}>
          <Navigation orientation="horizontal" tabs={MODE_TABS} activeId={mode} onChange={id => onModeChange(id as Mode)} />
        </div>

        {mode === "edit" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", flex: 1, minHeight: 0, padding: "0 8px 24px" }}>
            {FIELDS.map(f => {
              const input = f.multiline
                ? <InputTextarea label={f.label} rows={7} value={cv[f.key]} onChange={e => onChange(f.key, e.target.value)} />
                : <Input label={f.label} value={cv[f.key]} onChange={e => onChange(f.key, e.target.value)} />;
              const fieldChange = changes.find((c): c is Extract<ReviewChange, { kind: "field" }> => c.kind === "field" && c.field === f.key);
              const skillChange = f.key === "skills" ? changes.find((c): c is Extract<ReviewChange, { kind: "skill" }> => c.kind === "skill") : undefined;
              return (
                <Fragment key={f.key}>
                  {fieldChange
                    ? <ReviewField change={fieldChange} onUse={sc => onUseChange(fieldChange.id, sc)} onDismiss={sc => onDismissChange(fieldChange.id, sc)}>{input}</ReviewField>
                    : input}
                  {skillChange && <ReviewSkill change={skillChange} onUse={sc => onUseChange(skillChange.id, sc)} onDismiss={sc => onDismissChange(skillChange.id, sc)} />}
                </Fragment>
              );
            })}
          </div>
        ) : (
          <>
            <div style={{ padding: "0 8px", flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
              <Tile
                tileStyle="object-light"
                padding="content"
                style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8 }}
              >
                {items.map(it => {
                  switch (it.kind) {
                    case "user":
                      return <div key={it.id} style={{ alignSelf: "flex-end", maxWidth: "100%" }}><PPBubble variant="light">{it.text}</PPBubble></div>;
                    case "pp-text":
                      return <div key={it.id} style={{ ...body, alignSelf: "flex-start", maxWidth: "100%" }}>{it.text}</div>;
                    case "pp-loading":
                      return <div key={it.id} style={{ alignSelf: "flex-start" }}><LoadingIcon /></div>;
                    case "suggestion":
                      return (
                        <PPSuggestionCard
                          key={it.id}
                          variant="light"
                          state={it.state}
                          action={`Adapt CV to ${it.industry}`}
                          detail="Updates Bio and Skills."
                          previewHint="Hover to preview result"
                          onMouseEnter={() => onPreview(it.id)}
                          onMouseLeave={() => onPreview(null)}
                          onAccept={() => onApply(it.id)}
                          onDismiss={() => onDismissSuggestion(it.id)}
                        />
                      );
                  }
                })}
              </Tile>
            </div>
            <div style={{ padding: "0 8px 24px" }}>
              <PPChatInput
                value={draft}
                onChange={setDraft}
                onSend={text => { onSend(text); setDraft(""); }}
              />
            </div>
          </>
        )}
      </Tile>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Screen
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CVStudioScreen({
  cvs, initialMode = "edit", onClose, onNavigate, review, onCVChange,
}: {
  cvs: CV[]; initialMode?: Mode; onClose?: () => void; onNavigate?: (navbarId: string) => void;
  /** Pending profile edits to review for the CV shown (alert + Before / After boxes) */
  review?: StudioReview;
  /** Called with the CV at `index` whenever the user's edits (typing, Use new, Push all, ProPilot Apply) change it */
  onCVChange?: (index: number, cv: CV) => void;
}) {
  const multi = cvs.length > 1;
  const [data, setData] = useState(cvs);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [fileType, setFileType] = useState(FILE_TYPES[0].id);
  const [template, setTemplate] = useState(TEMPLATES[0].id);
  const [version, setVersion] = useState(VERSIONS[0].id);

  useEffect(() => { setMode(initialMode); }, [initialMode]);

  // ProPilot chat: typing "industry" -> loading -> suggestion card; hovering the card previews it on the CV
  const [items, setItems] = useState<ChatItem[]>([]);
  const [previewing, setPreviewing] = useState<number | null>(null);
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);
  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const cv = data[index];
  const patch = (fn: (c: CV) => CV) => setData(d => d.map((c, i) => (i === index ? fn(c) : c)));
  const edit = (k: FieldKey, v: string) => patch(c => ({ ...c, [k]: v }));

  // Report changed CVs (not the initial ones) to the flow so edits survive leaving the Studio
  const reported = useRef(data);
  useEffect(() => {
    data.forEach((c, i) => { if (c !== reported.current[i]) onCVChange?.(i, c); });
    reported.current = data;
  }, [data]);   // eslint-disable-line react-hooks/exhaustive-deps

  // Review of the profile's pending edits (alert + per-field boxes)
  const changes = review?.changes ?? [];
  const useChange = (id: string, scope: ReviewScope) => {
    const ch = changes.find(c => c.id === id);
    if (ch) patch(c => applyChange(c, ch));
    review?.onUse(id, scope);
  };
  const pushAll = () => { patch(c => changes.reduce(applyChange, c)); review?.onPushAll(); };

  const send = (text: string) => {
    const userId = nextId.current++;
    const replyId = nextId.current++;
    if (!isIndustryMessage(text)) {
      setItems(it => [...it, { id: userId, kind: "user", text }, { id: replyId, kind: "pp-text", text: "I can adapt this CV to an industry. Try: Please adapt this CV to the banking industry." }]);
      return;
    }
    const industry = industryName(text);
    setItems(it => [...it, { id: userId, kind: "user", text }, { id: replyId, kind: "pp-loading" }]);
    timers.current.push(window.setTimeout(() => {
      const textId = nextId.current++;
      const sugId = nextId.current++;
      setItems(it => it.flatMap<ChatItem>(i => i.id === replyId
        ? [
            { id: textId, kind: "pp-text", text: `I've adapted this CV to the ${industry.toLowerCase()} industry. Hover the suggestion to preview it.` },
            { id: sugId, kind: "suggestion", industry, state: "default" },
          ]
        : [i]));
    }, SUGGESTION_DELAY));
  };
  const setSuggestionState = (id: number, state: PPSuggestionCardState) =>
    setItems(it => it.map(i => (i.id === id && i.kind === "suggestion" ? { ...i, state } : i)));
  const apply = (id: number) => {
    const sug = items.find(i => i.id === id);
    if (sug?.kind === "suggestion") {   // proposed text is built from the CV shown right now
      const fields = adaptCV(cv, sug.industry);
      (Object.keys(fields) as (keyof IndustryFields)[]).forEach(k => edit(k, fields[k]));
    }
    setSuggestionState(id, "accepted");
    setPreviewing(null);
  };
  const dismissSuggestion = (id: number) => { setSuggestionState(id, "dismissed"); setPreviewing(null); };

  const previewItem = mode === "propilot" ? items.find(i => i.kind === "suggestion" && i.id === previewing && i.state === "default") : undefined;
  const preview = previewItem?.kind === "suggestion" ? { industry: previewItem.industry, fields: adaptCV(cv, previewItem.industry) } : undefined;
  const names = multi ? cvs.slice(0, 3).map(c => c.name).join(", ") + (cvs.length > 3 ? `, +${cvs.length - 3}` : "") : undefined;

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Page navbar={<Navbar activeId={multi ? "profiles" : undefined} onSelect={onNavigate} />} variant="fluid">
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>

          {/* Header row */}
          <div style={{ padding: "0 24px" }}>
            <Header
              size="page"
              title={multi ? `${cvs.length} CVs` : cv.name}
              subtitle={names}
              rightContent={
                <div style={{ display: "flex", gap: 10 }}>
                  <SelectMenu items={FILE_TYPES} selectedId={fileType} onSelect={setFileType} align="right">
                    {toggle => <InputInline inlineLabel="File type" value={fileType} onClick={toggle} />}
                  </SelectMenu>
                  <SelectMenu items={TEMPLATES} selectedId={template} onSelect={setTemplate} align="right">
                    {toggle => <InputInline inlineLabel="Template" value={template} onClick={toggle} />}
                  </SelectMenu>
                </div>
              }
            />
          </div>

          {/* Pending profile edits — Figma 886:41024 */}
          {changes.length > 0 && (
            <div style={{ padding: "16px 24px 0" }}>
              <Alert
                type="general"
                layout="inline"
                message={summarize(changes)}
                actions={[{ label: "Push all", onClick: pushAll }, { label: "Dismiss all", onClick: () => review?.onDismissAll() }]}
              />
            </div>
          )}

          {/* Content row */}
          <div style={{ display: "flex", gap: 16, padding: "16px 24px 0", flex: 1, minHeight: 0, overflow: "hidden", alignItems: "flex-start" }}>
            <LeftModule cv={cv} onChange={edit} count={cvs.length} mode={mode} onModeChange={setMode}
              items={items} onSend={send} onApply={apply} onDismissSuggestion={dismissSuggestion} onPreview={setPreviewing}
              changes={changes} onUseChange={useChange} onDismissChange={(id, sc) => review?.onDismiss(id, sc)} />

            {/* CV preview card */}
            <Tile
              tileStyle="highlight"
              padding="content"
              style={{ position: "relative", flex: 1, minWidth: 0, height: "calc(100% + 24px)", display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Centred in the header row's free space (after the pager, before the Version select) so it never covers either */}
              <div style={{ position: "absolute", top: 0, left: multi ? 140 : 16, right: 260, height: 0, pointerEvents: "none" }}>
                <PPPreviewBanner visible={!!preview} label={preview ? `Adapted to ${preview.industry}` : undefined} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {multi && (
                    <>
                      <Button kind="icon" size="regular" title="Previous CV" disabled={index === 0} onClick={() => setIndex(i => i - 1)}>
                        <Icon name="chevron-left" size={16} />
                      </Button>
                      <span style={{ ...body, lineHeight: "115%" }}>{index + 1}/{cvs.length}</span>
                      <Button kind="icon" size="regular" title="Next CV" disabled={index === cvs.length - 1} onClick={() => setIndex(i => i + 1)}>
                        <Icon name="chevron-right" size={16} />
                      </Button>
                    </>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <SelectMenu items={VERSIONS} selectedId={version} onSelect={setVersion} align="right">
                    {toggle => <InputInline inlineLabel="Version" value={version} onClick={toggle} />}
                  </SelectMenu>
                </div>
              </div>
              <Divider orientation="horizontal" style={{ margin: "0 -16px" }} />
              <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 8px 24px" }}>
                <CVPreview cv={preview ? { ...cv, ...preview.fields } : cv} highlight={preview ? INDUSTRY_FIELDS : undefined} />
              </div>
            </Tile>
          </div>

          {/* Footer */}
          <Actions
            variant="sticky-panel"
            leftActions={[{ label: "Close", variant: "secondary", onClick: onClose }]}
            rightActions={multi ? [] : [{ label: "Save", variant: "secondary" }, { label: "Export", variant: "primary" }]}
            rightContent={
              multi ? (
                <>
                  <SplitButton label={`Save (${cvs.length})`} variant="secondary" items={[{ id: "save-current", label: "Save current" }]} />
                  <SplitButton label={`Export (${cvs.length})`} variant="primary" items={[{ id: "export-current", label: "Export current" }]} />
                </>
              ) : undefined
            }
          />
        </div>
      </Page>
    </div>
  );
}

