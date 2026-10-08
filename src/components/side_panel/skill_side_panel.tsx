// SkillSidePanel — Figma node 7347:213675 (Sidepanel/Skill)
// Source: IPS Components adFvaOeh8E3AKLFKRjYD3r
// Width: 400px — no divider below header
//
// Variants: skills-mgmt-edit | skills-mgmt-create | me-dont-have | me-have |
//           role-match | role-req | wm-ro-in-role | role-searching | me-searching |
//           profile-populating | role-populating | bulk-edit | peers

import React, { useState } from "react";
import { SidePanel }        from "./side_panel";
import css from "./side_panel.module.scss";
import { Icon }             from "../icon/icon";
import { Button }           from "../button/button";
import { Divider }          from "../divider/divider";
import { Input, InputSelect, InputSearch } from "../input/input";
import { Checkbox }         from "../checkbox/checkbox";
import { Switch }           from "../switch/switch";
import { Actions }          from "../actions/actions";
import { PillSimple }       from "../pill/pill";
import { EmptyState }       from "../empty_state/empty_state";
import { SkillProfile }     from "../skill/skill";
import type { ProficiencyLevel } from "../skill/skill";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SkillVariant =
  | "skills-mgmt-edit"
  | "skills-mgmt-create"
  | "me-dont-have"
  | "me-have"
  | "role-match"
  | "role-req"
  | "wm-ro-in-role"
  | "role-searching"
  | "me-searching"
  | "profile-populating"
  | "role-populating"
  | "bulk-edit"
  | "peers";

export type SkillSidePanelData = {
  skillName?:       string;
  subtitle?:        string;
  proficiency?:     ProficiencyLevel;
  importance?:      string;
  status?:          string;
  source?:          string;
  creator?:         string;
  description?:     string;
  addedDate?:       string;
  frameworks?:      string[];
  tags?:            string[];
  mergedWith?:      string[];
  membersCount?:    number;
  rolesCount?:      number;
  bulkCount?:       number;
  searchQuery?:     string;
  isCore?:          boolean;
  isDevelopment?:   boolean;
  onCancel?:        () => void;
  onPrimary?:       () => void;
  onRemove?:        () => void;
};

export type SkillSidePanelProps = {
  open:     boolean;
  onClose:  () => void;
  variant:  SkillVariant;
  data?:    SkillSidePanelData;
};

// ── Typography ────────────────────────────────────────────────────────────────

const h4: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 20, fontWeight: 600,
  color: "var(--palette-blue-0)", lineHeight: "125%",
};
const h5: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 16, fontWeight: 600,
  color: "var(--palette-blue-0)", lineHeight: "125%",
};
const body: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400,
  color: "var(--palette-blue-0)", lineHeight: "150%",
};
const labelReg: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400,
  color: "var(--palette-blue-2)", lineHeight: "150%",
};

// ── Shared helpers ────────────────────────────────────────────────────────────

function KVRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={labelReg}>{label}</span>
      <span style={body}>{value}</span>
    </div>
  );
}

function SectionHeader({ title, badge }: { title: string; badge?: string | number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={h5}>{title}</span>
      {badge !== undefined && (
        <PillSimple label={String(badge)} size="regular" bg="var(--palette-neutral-1)" />
      )}
    </div>
  );
}

// ── Proficiency toggle with dots ──────────────────────────────────────────────
// Each segment: dots (from SkillProfile's internal dot system) + label text
// Selected segment: navy bg (#0C1457), white text/dots
// Unselected: white bg, border, dark text/dots

const PROFICIENCY_LEVELS: { value: ProficiencyLevel; label: string }[] = [
  { value: "basic",        label: "Basic"        },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced",     label: "Advanced"     },
];

const DOT_COUNT: Record<ProficiencyLevel, number> = {
  basic: 1, intermediate: 2, advanced: 3,
};

function ProficiencyDots({ level, active, selected }: {
  level:    ProficiencyLevel;
  active:   boolean;   // whether THIS segment is selected
  selected: boolean;   // same — for colour logic
}) {
  const count = DOT_COUNT[level];
  const activeColor   = selected ? "white" : "var(--palette-blue-0)";
  const inactiveColor = selected ? "rgba(255,255,255,0.3)" : "var(--palette-neutral-0)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          style={{
            width: 10, height: 10, borderRadius: "50%",
            background: i < count ? activeColor : inactiveColor,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function ProficiencyToggle({
  value, onChange, mandatory,
}: {
  value?:   ProficiencyLevel;
  onChange: (v: ProficiencyLevel) => void;
  mandatory?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={labelReg}>Proficiency</span>
        {mandatory && <Icon name="mandatory" size={16} style={{ color: "var(--palette-red-0)", flexShrink: 0 }} />}
      </div>
      <div style={{ display: "flex" }}>
        {PROFICIENCY_LEVELS.map((opt, i) => {
          const selected = value === opt.value;
          const isFirst  = i === 0;
          const isLast   = i === PROFICIENCY_LEVELS.length - 1;
          const radius   = isFirst ? "8px 0 0 8px" : isLast ? "0 8px 8px 0" : "0";
          const borderL  = !isFirst ? "none" : undefined;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              style={{
                flex: 1,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                padding: "8px 4px",
                borderRadius: radius,
                borderTop:    "1px solid",
                borderRight:  "1px solid",
                borderBottom: "1px solid",
                borderLeft:   borderL ?? "1px solid",
                borderColor:  selected ? "var(--palette-blue-1)" : "var(--palette-neutral-0)",
                background:   selected ? "var(--palette-blue-1)" : "white",
                cursor: "pointer",
                fontFamily: "var(--font-family)", fontSize: 14,
                fontWeight: selected ? 700 : 400,
                color: selected ? "white" : "var(--palette-blue-0)",
                whiteSpace: "nowrap",
              }}
            >
              <ProficiencyDots level={opt.value} active={selected} selected={selected} />
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Importance toggle ─────────────────────────────────────────────────────────

function ImportanceToggle({
  value, onChange, mandatory,
}: {
  value?:    string;
  onChange:  (v: string) => void;
  mandatory?: boolean;
}) {
  const opts = [
    { value: "essential",  label: "Essential"  },
    { value: "desirable",  label: "Desirable"  },
    { value: "beneficial", label: "Beneficial" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={labelReg}>Importance</span>
        {mandatory && <Icon name="mandatory" size={16} style={{ color: "var(--palette-red-0)", flexShrink: 0 }} />}
      </div>
      <div style={{ display: "flex" }}>
        {opts.map((opt, i) => {
          const selected = value === opt.value;
          const isFirst  = i === 0;
          const isLast   = i === opts.length - 1;
          const radius   = isFirst ? "8px 0 0 8px" : isLast ? "0 8px 8px 0" : "0";
          const borderL  = !isFirst ? "none" : undefined;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              style={{
                flex: 1, padding: "8px 4px",
                borderRadius: radius,
                borderTop: "1px solid", borderRight: "1px solid",
                borderBottom: "1px solid", borderLeft: borderL ?? "1px solid",
                borderColor: selected ? "var(--palette-blue-1)" : "var(--palette-neutral-0)",
                background:  selected ? "var(--palette-blue-1)" : "white",
                cursor: "pointer",
                fontFamily: "var(--font-family)", fontSize: 14,
                fontWeight: selected ? 700 : 400,
                color: selected ? "white" : "var(--palette-blue-0)",
                whiteSpace: "nowrap",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Variant content blocks ────────────────────────────────────────────────────

function SkillsMgmtEditContent({ data }: { data: SkillSidePanelData }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Row 1: Status + ProFinda Global */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={labelReg}>Status</span>
          {/* Pill hugs text width */}
          <div style={{ display: "inline-flex" }}>
            <PillSimple label={data.status ?? "Approved"} size="regular" bg="var(--palette-neutral-1)" />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <KVRow label="ProFinda Global" value="Yes" />
        </div>
      </div>

      {/* Row 2: Source + Creator */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Input label="Source" value={data.source ?? "Upload"} readOnly />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={labelReg}>Creator</span>
          <Button kind="link" size="regular" style={{ padding: 0, justifyContent: "flex-start" }}>
            {data.creator ?? "Dan Cooper"}
          </Button>
        </div>
      </div>

      {/* Show full history — left-aligned */}
      <Button kind="link" size="regular" style={{ padding: 0, justifyContent: "flex-start" }}>
        Show full history
      </Button>

      <Divider orientation="horizontal" />

      {/* Description */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Description" />
        <span style={body}>{data.description ?? "No description available."}</span>
      </div>

      <Divider orientation="horizontal" />

      {/* Tags */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Tags" />
        {(data.tags ?? []).length === 0
          ? <EmptyState size="small-horizontal" title="No tags added" />
          : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.tags!.map(t => <PillSimple key={t} label={t} size="regular" bg="var(--palette-neutral-1)" />)}
            </div>
        }
      </div>

      <Divider orientation="horizontal" />

      {/* Merged with */}
      {(data.mergedWith ?? []).length > 0 && (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SectionHeader title="Merged with" badge={(data.mergedWith ?? []).length} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.mergedWith!.map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <PillSimple label={s} size="regular" bg="var(--palette-neutral-1)" />
                  <Button kind="iconTertiary" size="regular" title="Remove">
                    <Icon name="cross" size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Divider orientation="horizontal" />
        </>
      )}

      {/* Skills Frameworks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Skills Frameworks" badge={(data.frameworks ?? []).length} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {(data.frameworks ?? []).map((f, i) => (
            <span key={f} style={body}>
              <Button kind="link" size="regular" style={{ padding: 0 }}>{f}</Button>
              {i < (data.frameworks ?? []).length - 1 && <span style={{ color: "var(--palette-blue-2)" }}>,&nbsp;</span>}
            </span>
          ))}
        </div>
      </div>

      <Divider orientation="horizontal" />

      {/* Insights */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Insights" />
        <div style={{ display: "flex", gap: 16 }}>
          <KVRow label="Members with this" value={String(data.membersCount ?? 345)} />
          <KVRow label="Required in current roles" value={String(data.rolesCount ?? 4)} />
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <KVRow label="Added to account" value={data.addedDate ?? "30 Jun 2026"} />
          <KVRow label="Last edited in account" value="10 Oct 2026" />
        </div>
      </div>
    </div>
  );
}

function SkillsMgmtCreateContent() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Input label="Name" value={name} onChange={e => setName(e.target.value)} mandatory />
      <Input label="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <InputSelect label="Tags" />
    </div>
  );
}

function WMContent({
  hasSkill, proficiency, onProficiencyChange,
  showBackNav, mandatory, data,
}: {
  hasSkill:            boolean;
  proficiency:         ProficiencyLevel | undefined;
  onProficiencyChange: (v: ProficiencyLevel) => void;
  showBackNav?:        boolean;
  mandatory?:          boolean;
  data:                SkillSidePanelData;
}) {
  const [core, setCore]    = useState(false);
  const [dev,  setDev]     = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {showBackNav && (
        <Button kind="link" size="regular" style={{ padding: 0, justifyContent: "flex-start" }}>
          <Icon name="arrow-left" size={16} /> Search for another skill
        </Button>
      )}

      <span style={body}>
        {hasSkill
          ? "You already have this skill, update it below:"
          : "You don't have this skill yet, add it below:"}
      </span>

      {/* Proficiency toggle with dots */}
      <ProficiencyToggle value={proficiency} onChange={onProficiencyChange} mandatory={mandatory} />

      {/* Core + Development checkboxes with icons after label */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Checkbox label="Core" checked={core} onChange={() => setCore(v => !v)} />
          <Icon name="core" size={16} style={{ color: "var(--palette-blue-2)", flexShrink: 0 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Checkbox label="Development" checked={dev} onChange={() => setDev(v => !v)} />
          <Icon name="development" size={16} style={{ color: "var(--palette-blue-2)", flexShrink: 0 }} />
        </div>
      </div>

      {/* If user has the skill — source + dates */}
      {hasSkill && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Input label="Source" value={data.source ?? "Internal experience"} readOnly />
            </div>
            <div style={{ flex: 1 }}>
              <Input label="Added to profile" value={data.addedDate ?? "30 Jun 2026"} readOnly />
            </div>
          </div>
        </div>
      )}

      <Divider orientation="horizontal" />

      {/* Description */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Description" />
        <span style={body}>{data.description ?? "No description available."}</span>
      </div>

      <Divider orientation="horizontal" />

      {/* Tags */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Tags" />
        {(data.tags ?? []).length === 0
          ? <EmptyState size="small-horizontal" title="No tags added" />
          : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.tags!.map(t => <PillSimple key={t} label={t} size="regular" bg="var(--palette-neutral-1)" />)}
            </div>
        }
      </div>

      <Divider orientation="horizontal" />

      {/* Insights */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Insights" />
        <div style={{ display: "flex", gap: 16 }}>
          <KVRow label="Members with this" value={String(data.membersCount ?? 345)} />
          <KVRow label="Required in current roles" value={String(data.rolesCount ?? 4)} />
        </div>
      </div>
    </div>
  );
}

function RoleContent({
  importance, onImportanceChange, readOnly,
  proficiency, onProficiencyChange, addedDate, mandatory, data,
}: {
  importance?:          string;
  onImportanceChange?:  (v: string) => void;
  readOnly?:            boolean;
  proficiency:          ProficiencyLevel | undefined;
  onProficiencyChange:  (v: ProficiencyLevel) => void;
  addedDate?:           string;
  mandatory?:           boolean;
  data?:                SkillSidePanelData;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {readOnly
        ? <KVRow label="Importance" value={importance ?? "Essential"} />
        : <ImportanceToggle value={importance} onChange={onImportanceChange ?? (() => {})} mandatory={mandatory} />
      }
      {readOnly
        ? <KVRow label="Proficiency" value={proficiency ? (proficiency.charAt(0).toUpperCase() + proficiency.slice(1)) : "—"} />
        : <ProficiencyToggle value={proficiency} onChange={onProficiencyChange} />
      }
      {addedDate && <KVRow label="Added to account" value={addedDate} />}

      {/* Description, Tags, Insights — shared for role-match and role-req */}
      {data && (
        <>
          <Divider orientation="horizontal" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SectionHeader title="Description" />
            <span style={body}>{data.description ?? "No description available."}</span>
          </div>
          <Divider orientation="horizontal" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SectionHeader title="Tags" />
            {(data.tags ?? []).length === 0
              ? <EmptyState size="small-horizontal" title="No tags added" />
              : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {data.tags!.map(t => <PillSimple key={t} label={t} size="regular" bg="var(--palette-neutral-1)" />)}
                </div>
            }
          </div>
          <Divider orientation="horizontal" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SectionHeader title="Insights" />
            <div style={{ display: "flex", gap: 16 }}>
              <KVRow label="Members with this" value={String(data.membersCount ?? 345)} />
              <KVRow label="Required in current roles" value={String(data.rolesCount ?? 4)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SearchContent({ searchQuery, onSearchChange }: {
  searchQuery?: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <InputSearch
      value={searchQuery ?? ""}
      onChange={e => onSearchChange(e.target.value)}
      onClear={() => onSearchChange("")}
      placeholder="Search for a skill"
    />
  );
}

function RolePopulatingContent({
  proficiency, onProficiencyChange, importance, onImportanceChange, data,
}: {
  proficiency:         ProficiencyLevel;
  onProficiencyChange: (v: ProficiencyLevel) => void;
  importance?:         string;
  onImportanceChange:  (v: string) => void;
  data:                SkillSidePanelData;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Button kind="link" size="regular" style={{ padding: 0, justifyContent: "flex-start" }}>
        <Icon name="arrow-left" size={16} /> Search for another skill
      </Button>
      <span style={body}>Role doesn't have this skill yet, add it below:</span>
      <ImportanceToggle value={importance} onChange={onImportanceChange} mandatory />
      <ProficiencyToggle value={proficiency} onChange={onProficiencyChange} />

      <Divider orientation="horizontal" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Description" />
        <span style={body}>{data.description ?? "No description available."}</span>
      </div>

      <Divider orientation="horizontal" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Tags" />
        {(data.tags ?? []).length === 0
          ? <EmptyState size="small-horizontal" title="No tags added" />
          : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.tags!.map(t => <PillSimple key={t} label={t} size="regular" bg="var(--palette-neutral-1)" />)}
            </div>
        }
      </div>

      <Divider orientation="horizontal" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Insights" />
        <div style={{ display: "flex", gap: 16 }}>
          <KVRow label="Members with this" value={String(data.membersCount ?? 345)} />
          <KVRow label="Required in current roles" value={String(data.rolesCount ?? 4)} />
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <KVRow label="Added to account" value={data.addedDate ?? "30 Jun 2026"} />
          <KVRow label="Last edited in account" value="10 Oct 2026" />
        </div>
      </div>
    </div>
  );
}

function SkillChipRow({ skills }: { skills: string[] }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", alignItems: "center",
      background: "var(--palette-neutral-2)",
      border: "1px solid var(--palette-neutral-0)",
      borderRadius: "var(--radius-md)",
      padding: "6px 8px", gap: 0,
    }}>
      {skills.map((s, i) => (
        <span key={s} style={{ display: "flex", alignItems: "center" }}>
          <span style={{ ...labelReg, fontWeight: 700, color: "var(--palette-blue-0)", padding: "2px 6px" }}>{s}</span>
          {i < skills.length - 1 && (
            <span style={{ width: 1, height: 16, background: "var(--palette-neutral-0)", flexShrink: 0 }} />
          )}
        </span>
      ))}
    </div>
  );
}

function BulkEditContent({ count, proficiency, onProficiencyChange }: {
  count:               number;
  proficiency:         ProficiencyLevel | undefined;
  onProficiencyChange: (v: ProficiencyLevel) => void;
}) {
  const [coreOn, setCoreOn] = useState(false);
  const [devOn,  setDevOn]  = useState(false);

  const editingSkills = ["Negotiation", "Planning"].slice(0, Math.min(count, 2));
  const addingSkills  = ["Adaptability", "Excel", "Miro", "Analysis", "Talent resourcing"].slice(0, Math.min(count, 5));

  const [coreChecked, setCoreChecked] = useState(false);
  const [devChecked,  setDevChecked]  = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Editing tile — label above */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={labelReg}>Editing</span>
        <SkillChipRow skills={editingSkills} />
      </div>

      {/* Adding tile — label above */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={labelReg}>Adding</span>
        <SkillChipRow skills={addingSkills} />
      </div>

      {/* Proficiency toggle */}
      <ProficiencyToggle value={proficiency} onChange={onProficiencyChange} mandatory />

      {/* Core tag row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "var(--palette-neutral-2)", border: "1px solid var(--palette-neutral-0)",
        borderRadius: "var(--radius-md)", padding: 8, gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Switch checked={coreOn} onChange={() => setCoreOn(v => !v)} label="Core tag" showLabel layout="horizontal-left" />
          <Icon name="info" size={16} style={{ color: "var(--palette-blue-2)" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: coreOn ? 1 : 0.4, pointerEvents: coreOn ? undefined : "none" }}>
          <Checkbox label="Core" checked={coreChecked} onChange={() => setCoreChecked(v => !v)} />
          <Icon name="core" size={16} style={{ color: "var(--palette-blue-2)" }} />
        </div>
      </div>

      {/* Development tag row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "var(--palette-neutral-2)", border: "1px solid var(--palette-neutral-0)",
        borderRadius: "var(--radius-md)", padding: 8, gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Switch checked={devOn} onChange={() => setDevOn(v => !v)} label="Development tag" showLabel layout="horizontal-left" />
          <Icon name="info" size={16} style={{ color: "var(--palette-blue-2)" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: devOn ? 1 : 0.4, pointerEvents: devOn ? undefined : "none" }}>
          <Checkbox label="Development" checked={devChecked} onChange={() => setDevChecked(v => !v)} />
          <Icon name="development" size={16} style={{ color: "var(--palette-blue-2)" }} />
        </div>
      </div>
    </div>
  );
}

function PeersContent({ proficiency, data }: { proficiency: ProficiencyLevel; data: SkillSidePanelData }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Proficiency — left-aligned label + SkillProfile */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
        <span style={labelReg}>Proficiency</span>
        <SkillProfile label={proficiency} proficiency={proficiency} />
      </div>

      {/* Core / Development — read-only flags, only shown when true */}
      {(data.isCore || data.isDevelopment) && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {data.isCore && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="core" size={16} style={{ color: "var(--palette-blue-2)" }} />
              <span style={body}>Core</span>
            </div>
          )}
          {data.isDevelopment && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="development" size={16} style={{ color: "var(--palette-blue-2)" }} />
              <span style={body}>Development</span>
            </div>
          )}
        </div>
      )}

      {/* Verified + Source */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <KVRow label="Verified" value="—" />
        </div>
        <div style={{ flex: 1 }}>
          <Input label="Source" value={data.source ?? "Internal experience"} readOnly />
        </div>
      </div>

      {/* Added to profile + Last edited in profile */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Input label="Added to profile"       value={data.addedDate ?? "30 Jun 2026"} readOnly />
        </div>
        <div style={{ flex: 1 }}>
          <Input label="Last edited in profile" value="10 Oct 2026" readOnly />
        </div>
      </div>

      <Divider orientation="horizontal" />

      {/* Description */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Description" />
        <span style={body}>{data.description ?? "No description available."}</span>
      </div>

      <Divider orientation="horizontal" />

      {/* Tags */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Tags" />
        {(data.tags ?? []).length === 0
          ? <EmptyState size="small-horizontal" title="No tags added" />
          : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.tags!.map(t => <PillSimple key={t} label={t} size="regular" bg="var(--palette-neutral-1)" />)}
            </div>
        }
      </div>

      <Divider orientation="horizontal" />

      {/* Insights */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader title="Insights" />
        <div style={{ display: "flex", gap: 16 }}>
          <KVRow label="Members with this" value={String(data.membersCount ?? 345)} />
          <KVRow label="Required in current roles" value={String(data.rolesCount ?? 4)} />
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <KVRow label="Added to account"       value={data.addedDate ?? "30 Jun 2026"} />
          <KVRow label="Last edited in account" value="10 Oct 2026" />
        </div>
      </div>

    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function SkillSidePanel({
  open, onClose, variant, data = {},
}: SkillSidePanelProps) {
  // me-dont-have starts with no selection; all others default to basic (or data value)
  const [proficiency, setProficiency] = useState<ProficiencyLevel | undefined>(
    variant === "me-dont-have" ? undefined : (data.proficiency ?? "basic")
  );
  const [importance,  setImportance]  = useState(data.importance ?? "essential");
  const [search,      setSearch]      = useState(data.searchQuery ?? "");

  const headers: Record<SkillVariant, { title: string; subtitle?: string; showEditIcon?: boolean }> = {
    "skills-mgmt-edit":   { title: data.skillName ?? "Ruby on Rails", subtitle: "Skill", showEditIcon: true },
    "skills-mgmt-create": { title: "Create Skill" },
    "me-dont-have":       { title: data.skillName ?? "Ruby on Rails", subtitle: "Skill" },
    "me-have":            { title: data.skillName ?? "Ruby on Rails", subtitle: "Skill" },
    "role-match":         { title: data.skillName ?? "Ruby on Rails", subtitle: "Skill" },
    "role-req":           { title: data.skillName ?? "Ruby on Rails", subtitle: "Skill" },
    "wm-ro-in-role":      { title: data.skillName ?? "Ruby on Rails", subtitle: data.subtitle ?? "Leslie Smith" },
    "role-searching":     { title: "Add skill" },
    "me-searching":       { title: "Add skill" },
    "profile-populating": { title: data.skillName ?? "Ruby on Rails", subtitle: "Skill" },
    "role-populating":    { title: data.skillName ?? "Java",          subtitle: "Skill" },
    "bulk-edit":          { title: `Edit ${data.bulkCount ?? 5} skills` },
    "peers":              { title: data.skillName ?? "Ruby on Rails", subtitle: data.subtitle ?? "Charlie Parker" },
  };

  type LocalAction = { label: string; variant: "primary" | "secondary"; onClick?: () => void };
  const actionsMap: Record<SkillVariant, { left: LocalAction[]; right: LocalAction[] }> = {
    "skills-mgmt-edit":   { left: [], right: [{ label: "Save", variant: "primary", onClick: data.onPrimary }, { label: "Delete", variant: "secondary", onClick: data.onRemove }] },
    "skills-mgmt-create": { left: [{ label: "Cancel", variant: "secondary", onClick: onClose }], right: [{ label: "Create", variant: "primary", onClick: data.onPrimary }] },
    "me-dont-have":       { left: [{ label: "Cancel", variant: "secondary", onClick: onClose }], right: [{ label: "Add to my profile", variant: "primary", onClick: data.onPrimary }] },
    "me-have":            { left: [{ label: "Cancel", variant: "secondary", onClick: onClose }, { label: "Remove", variant: "secondary", onClick: data.onRemove }], right: [{ label: "Update", variant: "primary", onClick: data.onPrimary }] },
    "role-match":         { left: [{ label: "Cancel", variant: "secondary", onClick: onClose }, { label: "Remove", variant: "secondary", onClick: data.onRemove }], right: [{ label: "Update", variant: "primary", onClick: data.onPrimary }] },
    "role-req":           { left: [{ label: "Close", variant: "secondary", onClick: onClose }], right: [] },
    "wm-ro-in-role":      { left: [{ label: "Cancel", variant: "secondary", onClick: onClose }, { label: "Remove", variant: "secondary", onClick: data.onRemove }], right: [{ label: "Update", variant: "primary", onClick: data.onPrimary }] },
    "role-searching":     { left: [{ label: "Cancel", variant: "secondary", onClick: onClose }], right: [{ label: "Add to role", variant: "primary", onClick: data.onPrimary }] },
    "me-searching":       { left: [{ label: "Cancel", variant: "secondary", onClick: onClose }], right: [{ label: "Add to my profile", variant: "primary", onClick: data.onPrimary }] },
    "profile-populating": { left: [{ label: "Cancel", variant: "secondary", onClick: onClose }], right: [{ label: "Add to my profile", variant: "primary", onClick: data.onPrimary }] },
    "role-populating":    { left: [{ label: "Cancel", variant: "secondary", onClick: onClose }], right: [{ label: "Add to role", variant: "primary", onClick: data.onPrimary }] },
    "bulk-edit":          { left: [{ label: "Cancel", variant: "secondary", onClick: onClose }], right: [{ label: `Remove (${data.bulkCount ?? 5})`, variant: "secondary", onClick: data.onRemove }, { label: `Update (${data.bulkCount ?? 5})`, variant: "primary", onClick: data.onPrimary }] },
    "peers":              { left: [{ label: "Close", variant: "secondary", onClick: onClose }], right: [] },
  };

  const { title, subtitle, showEditIcon } = headers[variant];
  const actions = actionsMap[variant];

  return (
    <SidePanel open={open} onClose={onClose} width={400}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        <div className={css.content} style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Header — no divider below */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={h4}>{title}</span>
              {subtitle && (
                <span style={{ fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "115%" }}>
                  {subtitle}
                </span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
              {showEditIcon && (
                <>
                  <Button kind="icon" size="regular" title="Edit">
                    <Icon name="edit" size={16} />
                  </Button>
                  <Divider orientation="vertical" />
                </>
              )}
              <Button kind="iconTertiary" size="regular" title="Close" onClick={onClose}>
                <Icon name="cross" size={16} />
              </Button>
            </div>
          </div>

          {/* Content */}
          {variant === "skills-mgmt-edit"   && <SkillsMgmtEditContent data={data} />}
          {variant === "skills-mgmt-create" && <SkillsMgmtCreateContent />}
          {(variant === "me-dont-have" || variant === "me-have" || variant === "profile-populating") && (
            <WMContent
              hasSkill={variant === "me-have"}
              proficiency={proficiency}
              onProficiencyChange={setProficiency}
              showBackNav={variant === "profile-populating"}
              mandatory={variant === "me-dont-have" || variant === "profile-populating"}
              data={data}
            />
          )}
          {(variant === "role-match" || variant === "role-req" || variant === "wm-ro-in-role") && (
            <RoleContent
              importance={importance}
              onImportanceChange={setImportance}
              readOnly={variant === "role-req" || variant === "wm-ro-in-role"}
              proficiency={proficiency}
              onProficiencyChange={setProficiency}
              addedDate={data.addedDate}
              data={data}
            />
          )}
          {(variant === "role-searching" || variant === "me-searching") && (
            <SearchContent searchQuery={search} onSearchChange={setSearch} />
          )}
          {variant === "role-populating" && (
            <RolePopulatingContent
              proficiency={proficiency ?? "basic"}
              onProficiencyChange={setProficiency}
              importance={importance}
              onImportanceChange={setImportance}
              data={data}
            />
          )}
          {variant === "bulk-edit" && (
            <BulkEditContent
              count={data.bulkCount ?? 5}
              proficiency={proficiency}
              onProficiencyChange={setProficiency}
            />
          )}
          {variant === "peers" && <PeersContent proficiency={proficiency ?? "intermediate"} data={data} />}

          <div style={{ height: 16 }} />
        </div>

        {/* Sticky actions */}
        <Actions
          variant="sticky-panel"
          leftActions={actions.left}
          rightActions={actions.right}
        />

      </div>
    </SidePanel>
  );
}
