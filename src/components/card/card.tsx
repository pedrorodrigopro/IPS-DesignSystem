// Card — Figma nodes:
//   Match:     9780:172031 / 9780:173416 (Card/Match new — Expanded=False/True)
//   Directory: 9786:67261  (Card/Directory new)
//
// Card shell: white bg, radius 8px, box-shadow 0 0 8px 0 rgba(203,225,242,0.8), padding 16px
//
// ── Scores (match variant) ────────────────────────────────────────────────────
// Scores frame: row, width 148px, gap 8px
//   Frame 35: row, gap 16px, fill
//     Match field: label "Match" (label-regular 12px #5C6E9E) + value (800/36px #0D2976 + "%" 700/14px)
//     Avail field:  label "Avail." (same) + value (300/36px #1531B8 + "%" 700/14px)
//
// ── Action column ─────────────────────────────────────────────────────────────
// Width: 120px (user spec), align-items: flex-end, gap: 8px
// Buttons fill the column width (width: 100%)
//
// ── Expand animation ──────────────────────────────────────────────────────────
// .expandedContent uses max-height + opacity CSS transition (overflow: hidden)
// Expanded=False: max-height: 0, opacity: 0
// Expanded=True:  max-height: 500px, opacity: 1, transition 300ms ease
//
// ── Expanded left column ──────────────────────────────────────────────────────
// layout_T8GF64: column, gap 8px, width 156px, border-right 1px #CFDAF7
// Each field: label (label-regular 12px #5C6E9E) + value (label-bold 12px #0D2976)
// Profile has / has-not icon: check (green) or cross (red)
//
// ── Skills ────────────────────────────────────────────────────────────────────
// Uses SkillMatch component from skill.tsx (built-in tooltip on hover)
// SkillMatch: requiredProficiency + profileProficiency + label + showDivider
//
// ── Directory ─────────────────────────────────────────────────────────────────
// Secondary action button label: "Open CV"

import React, { ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { Icon } from "../icon/icon";
import { WorkforceMember } from "../workforce_member/workforce_member";
import { ButtonGroup } from "../button_group/button_group";
import { DropdownActions } from "../dropdown/dropdown";
import type { DropdownItem } from "../dropdown/dropdown";
import { SkillMatch } from "../skill/skill";
import type { ProficiencyLevel } from "../skill/skill";
import type { ProfileIconFlags } from "../workforce_member/workforce_member";
import css from "./card.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type CardVariant = "match" | "directory";

export type ResourcingStep =
  | "not-shortlisted"
  | "shortlisted"
  | "shortlisted-reviewer"
  | "accepted-invite"
  | "invited"
  | "accepted-fillbook"
  | "booked"
  | "filled"
  | "declined";

export type SkillItem = {
  name: string;
  /** Role required proficiency: "basic" | "intermediate" | "advanced" */
  requiredProficiency?: ProficiencyLevel;
  /** Profile's actual proficiency; omit if profile doesn't have the skill */
  profileProficiency?: ProficiencyLevel;
  /** Skill is required but profile does not meet it */
  missing?: boolean;
  /** Hover tooltip tags */
  tags?: string[];
};

export type SkillGroup = {
  label: string;    // "Essential skills" / "Supporting skills"
  count?: string;   // "2/2"
  skills: SkillItem[];
};

/** Key/value pair shown in the expanded left column */
export type RoleField = {
  label: string;
  value: string;
  /** Whether the profile matches this field — shows check (true) or cross (false) */
  matches?: boolean;
};

export type CardActions = {
  step?: ResourcingStep;
  /** Primary CTA for directory: label shown on secondary button (default "Open CV") */
  secondaryLabel?: string;
  onShortlist?: () => void;
  onFillBook?: () => void;
  onFillBookDropdown?: () => void;
  /** Items of the Fill & Book split-button menu (e.g. "no overbookings" / "Custom"). When set, the chevron opens this menu. */
  fillBookMenu?: DropdownItem[];
  /** Info tooltip shown on an info icon inside the Fill & Book button */
  fillBookInfo?: string;
  /** Disable all action buttons (rendered at 50% opacity) */
  disabled?: boolean;
  onFillBookSelect?: (id: string) => void;
  onInvite?: () => void;
  onFill?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  /** Revert to previous step — shown as history icon button next to status badge */
  onRevert?: () => void;
  /** Directory: secondary action (Open CV) */
  onSecondary?: () => void;
};

export type CardProps = {
  variant?: CardVariant;
  // ── Profile ───────────────────────────────────────────────────────────────
  name: string;
  jobTitle?: string;
  initials?: string;
  avatarSrc?: string;
  profileFlags?: ProfileIconFlags;
  // ── Match scores (match variant only) ────────────────────────────────────
  matchPercent?: number;
  availabilityPercent?: number;
  // ── Expand (match variant only) ───────────────────────────────────────────
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  // ── Skills ────────────────────────────────────────────────────────────────
  skillGroups?: SkillGroup[];
  // Expanded-only extra skill groups
  expandedSkillGroups?: SkillGroup[];
  // ── Role fields (expanded left column) ───────────────────────────────────
  roleFields?: RoleField[];
  // ── Actions ───────────────────────────────────────────────────────────────
  actions?: CardActions;
  className?: string;
};

// ── Scores section ────────────────────────────────────────────────────────────
// row, width 148px, gap 8px → two field cols with gap 16px
// Match: 800/36px #0D2976 + "%" 700/14px
// Avail: 300/36px #1531B8 + "%" 700/14px, label colour same #5C6E9E

function Scores({ matchPercent, availabilityPercent }: {
  matchPercent?: number;
  availabilityPercent?: number;
}) {
  return (
    <div className={css.scores}>
      <div className={css.scoresPair}>
          {matchPercent !== undefined && (
            <div className={css.scoreField}>
              <span className={css.scoreLabel}>Match</span>
              <div className={classNames(css.scoreValue, css.scoreValueMatch)}>
                <span className={css.scoreNumberMatch}>{matchPercent}</span>
                <span className={css.scoreSuffix}>%</span>
              </div>
            </div>
          )}
          {availabilityPercent !== undefined && (
            <div className={css.scoreField}>
              <span className={css.scoreLabel}>Avail.</span>
              <div className={classNames(css.scoreValue, css.scoreValueAvail)}>
                <span className={css.scoreNumberAvail}>{availabilityPercent}</span>
                <span className={css.scoreSuffix}>%</span>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

// ── Skill group ───────────────────────────────────────────────────────────────
// Uses SkillMatch from the skill component — includes built-in hover tooltip

function SkillGroupSection({ group }: { group: SkillGroup }) {
  return (
    <div className={css.skillGroup}>
      <div className={css.skillGroupTitle}>
        <span className={css.skillGroupLabel}>{group.label}</span>
        {group.count && <span className={css.skillGroupCount}>{group.count}</span>}
      </div>
      <div className={css.skillRow}>
        {group.skills.map((skill, i) => (
          <SkillMatch
            key={skill.name}
            label={skill.name}
            requiredProficiency={skill.requiredProficiency ?? "basic"}
            profileProficiency={skill.profileProficiency}
            missing={skill.missing}
            showDivider={i < group.skills.length - 1}
            tags={skill.tags}
            theme="light"
          />
        ))}
      </div>
    </div>
  );
}

// ── Role fields (expanded left column) ────────────────────────────────────────
// column, gap 8px, width 156px, border-right 1px #CFDAF7
// Each: label (12px 400 #5C6E9E) + value row (check/cross + 12px 700 #0D2976)

function RoleFields({ fields }: { fields: RoleField[] }) {
  return (
    <div className={css.roleFields}>
      {fields.map((f) => (
        <div key={f.label} className={css.roleField}>
          <span className={css.roleFieldLabel}>{f.label}</span>
          <span className={css.roleFieldValue}>
            {f.matches !== undefined && (
              <Icon
                name={f.matches ? "check" : "cross"}
                size={14}
                className={f.matches ? css.matchIcon : css.missIcon}
              />
            )}
            {f.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Resourcing action buttons ─────────────────────────────────────────────────

const STATUS_LABELS: Partial<Record<ResourcingStep, string>> = {
  shortlisted:            "Shortlisted",
  "shortlisted-reviewer": "Shortlisted",
  "accepted-invite":      "Accepted",
  invited:                "Invited",
  "accepted-fillbook":    "Accepted",
  booked:                 "Booked",
  filled:                 "Filled",
  declined:               "Declined",
};

// Steps that show a status badge (have been actioned) — includes history revert btn
const STEPS_WITH_STATUS: Set<ResourcingStep> = new Set([
  "shortlisted", "shortlisted-reviewer",
  "accepted-invite", "invited", "accepted-fillbook",
  "booked", "filled", "declined",
]);

// Fill & Book split button; when `fillBookMenu` is given the chevron opens a dropdown (portalled, right-aligned)
function FillBookGroup({ actions, variant }: { actions: CardActions; variant: "primary" | "secondary" }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos]   = useState<{ top: number; right: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); close(); } };
    const t = setTimeout(() => document.addEventListener("mousedown", close), 0);
    window.addEventListener("keydown", onKey, true);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", close); window.removeEventListener("keydown", onKey, true); };
  }, [open]);

  const toggle = () => {
    if (!actions.fillBookMenu) { actions.onFillBookDropdown?.(); return; }
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos({ top: r.bottom + 4, right: window.innerWidth - r.right });
    setOpen(o => !o);
  };

  return (
    <div ref={ref}>
      <ButtonGroup variant={variant} label="Fill &amp; Book" fill info={actions.fillBookInfo} disabled={actions.disabled} onClick={actions.onFillBook} onDropdownClick={toggle} />
      {open && pos && actions.fillBookMenu && ReactDOM.createPortal(
        <div onMouseDown={e => e.stopPropagation()} style={{ position: "fixed", top: pos.top, right: pos.right, zIndex: 100000 }}>
          <DropdownActions
            items={actions.fillBookMenu}
            onSelect={id => { setOpen(false); actions.onFillBookSelect?.(id); }}
          />
        </div>,
        document.body
      )}
    </div>
  );
}

function ActionButtons({ actions, variant }: { actions: CardActions; variant: CardVariant }) {
  const { step = "not-shortlisted" } = actions;
  const statusLabel = STATUS_LABELS[step];
  const hasStatus = STEPS_WITH_STATUS.has(step);

  return (
    <div className={css.actionCol}>
      {/* Status badge row: label + history (revert) icon button */}
      {hasStatus && statusLabel && (
        <div className={css.statusRow}>
          <span className={css.statusBadge}>{statusLabel}</span>
          {actions.onRevert && (
            <button
              type="button"
              className={css.revertBtn}
              onClick={actions.onRevert}
              aria-label="Revert to previous step"
              title="Revert"
            >
              <Icon name="history" size={14} />
            </button>
          )}
        </div>
      )}

      {variant === "directory" && (
        <>
          <button className={classNames(css.btn, css.primary)} onClick={actions.onShortlist}>
            Shortlist
          </button>
          <button className={classNames(css.btn, css.secondary)} onClick={actions.onSecondary}>
            {actions.secondaryLabel ?? "Open CV"}
          </button>
        </>
      )}

      {variant === "match" && step === "not-shortlisted" && (
        <>
          <button className={classNames(css.btn, css.primary)} onClick={actions.onShortlist}>
            Shortlist
          </button>
          <FillBookGroup variant="secondary" actions={actions} />
        </>
      )}

      {step === "shortlisted-reviewer" && (
        <>
          <button className={classNames(css.btn, css.primary)} onClick={actions.onApprove} disabled={actions.disabled}>
            <Icon name="check" size={16} />
            Approve
          </button>
          <button className={classNames(css.btn, css.destructive)} onClick={actions.onReject} disabled={actions.disabled}>
            <Icon name="cross" size={16} />
            Reject
          </button>
          {(actions.onFillBook || actions.fillBookMenu) && <FillBookGroup variant="secondary" actions={actions} />}
        </>
      )}

      {step === "accepted-invite" && (
        <button className={classNames(css.btn, css.primary)} onClick={actions.onInvite}>
          Invite
        </button>
      )}

      {step === "invited" && (
        <button className={classNames(css.btn, css.primary)} onClick={actions.onFill}>
          Fill
        </button>
      )}

      {step === "accepted-fillbook" && (
        <FillBookGroup variant="primary" actions={actions} />
      )}
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

export function Card({
  variant = "match",
  name,
  jobTitle,
  initials,
  avatarSrc,
  profileFlags,
  matchPercent,
  availabilityPercent,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onExpandedChange,
  skillGroups = [],
  expandedSkillGroups = [],
  roleFields = [],
  actions,
  className,
}: CardProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const toggleExpand = () => {
    const next = !expanded;
    if (!isControlled) setInternalExpanded(next);
    onExpandedChange?.(next);
  };

  const hasExpandedContent = expandedSkillGroups.length > 0 || roleFields.length > 0;

  return (
    <div className={classNames(css.card, className)}>
      <div className={css.contentRow}>
        {/* ── Match col: toggle + scores ──────────────────────────── */}
        {variant === "match" && (
          <div className={css.matchCol}>
            <button
              type="button"
              className={css.expandBtn}
              onClick={toggleExpand}
              aria-expanded={expanded}
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              <Icon
                name={expanded ? "chevron-down" : "chevron-right"}
                size={20}
                className={css.expandIcon}
              />
            </button>
            <Scores matchPercent={matchPercent} availabilityPercent={availabilityPercent} />
          </div>
        )}

        {/* ── Profile + skills ─────────────────────────────────────── */}
        <div className={classNames(css.profileCol, variant === "match" && css.profileColBorder)}>
          {/* WM + skills stacked on the left (skills sit right under the job title), actions on the right */}
          <div className={css.profileTop}>
            <div className={css.profileMain}>
              <WorkforceMember
                variant="card"
                name={name}
                jobTitle={jobTitle}
                initials={initials}
                avatarSrc={avatarSrc}
                hideAvatar={variant === "match"}
                {...profileFlags}
                className={css.wm}
              />

              {/* Collapsed skill groups */}
              {skillGroups.length > 0 && (
                <div className={css.skills}>
                  {skillGroups.map((group) => (
                    <SkillGroupSection key={group.label} group={group} />
                  ))}
                </div>
              )}
            </div>
            {actions && <ActionButtons actions={actions} variant={variant} />}
          </div>
        </div>
      </div>

      {/* ── Expanded section — animated ───────────────────────────────── */}
      {variant === "match" && hasExpandedContent && (
        <div
          className={classNames(css.expandedWrapper, expanded && css.expandedWrapperOpen)}
          aria-hidden={!expanded}
        >
          <div className={css.expandedContent}>
            <div className={css.expandedDivider} />
            <div className={css.expandedBody}>
              {/* Left: role fields */}
              {roleFields.length > 0 && (
                <RoleFields fields={roleFields} />
              )}
              {/* Right: extra skill groups */}
              {expandedSkillGroups.length > 0 && (
                <div className={css.expandedSkills}>
                  {expandedSkillGroups.map((group) => (
                    <SkillGroupSection key={group.label} group={group} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
