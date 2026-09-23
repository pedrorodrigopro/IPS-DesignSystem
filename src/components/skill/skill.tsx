// Skill — Figma nodes:
//   Proficiency level: 9780:114099
//   Skill/Role:        9732:260872
//   Skill/Profile:     9732:260881
//   Skill/Match:       9732:260900
//   Not-met visual:    12319:240427 — cross + faded dots + level name
//   Tooltip:           1457:22694  — dark #0C1457 bg, 16px padding, 8px radius
//
// Proficiency:
//   Role dots:    3 × (10×4px pill, radius 32px, gap 2px) — active=#0D2976, inactive=#CFDAF7
//   Profile dots: 3 × (10×10px circle, radius 32px, 2×2px gap) — same colours
//   Levels: basic=1, intermediate=2, advanced=3 active dots
//
// Skill row: row, align-items center, gap 4px, padding 5px 2px, height 24px
//   Light: #0D2976 | Dark: #FFFFFF
//
// Not-met: cross icon (red #D42A36) + faded dots (opacity 0.3) + level name
//
// Tooltip (dark, #0C1457 bg):
//   Role:    "Required" header + role dots + level name + optional tags
//   Profile: "Profile" header + profile dots + level name + icons + tags
//   Match:   two columns (Required | Profile) separated by divider
import classNames from "classnames";
import { useState } from "react";
import { Divider } from "../divider/divider";
import { Icon } from "../icon/icon";
import css from "./skill.module.scss";

export type ProficiencyLevel = "basic" | "intermediate" | "advanced";
export type SkillTheme = "light" | "dark";

const LEVEL_LABELS: Record<ProficiencyLevel, string> = {
  basic: "Basic",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

// ── Role dots — 10×4px pill ───────────────────────────────────────────────────

type RoleDotsProps = { level: ProficiencyLevel; theme?: SkillTheme; faded?: boolean };

const RoleDots = ({ level, theme = "light", faded = false }: RoleDotsProps) => {
  const count = level === "basic" ? 1 : level === "intermediate" ? 2 : 3;
  return (
    <span className={classNames(css.roleDots)} style={{ opacity: faded ? 0.3 : 1 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={css.roleDot}
          style={{
            backgroundColor: i < count
              ? (theme === "dark" ? "var(--palette-white-0)" : "var(--palette-blue-0)")
              : (theme === "dark" ? "var(--palette-blue-2)" : "var(--palette-neutral-0)"),
          }}
          aria-hidden="true"
        />
      ))}
    </span>
  );
};

// ── Profile dots — 10×10px circle ────────────────────────────────────────────

type ProfileDotsProps = { level: ProficiencyLevel; theme?: SkillTheme; faded?: boolean };

const ProfileDots = ({ level, theme = "light", faded = false }: ProfileDotsProps) => {
  const count = level === "basic" ? 1 : level === "intermediate" ? 2 : 3;
  return (
    <span className={css.profileDots} style={{ opacity: faded ? 0.3 : 1 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={css.profileDot}
          style={{
            backgroundColor: i < count
              ? (theme === "dark" ? "var(--palette-white-0)" : "var(--palette-blue-0)")
              : (theme === "dark" ? "var(--palette-blue-2)" : "var(--palette-neutral-0)"),
          }}
          aria-hidden="true"
        />
      ))}
    </span>
  );
};

// ── Not-met dots — cross + faded profile dots ─────────────────────────────────
// From node 12319:240427: cross icon (red #D42A36) + faded dots (opacity 0)

const NotMetDots = ({ theme = "light" }: { theme?: SkillTheme }) => (
  <span className={css.profileDots}>
    <Icon name="cross" size={16} style={{ color: "var(--palette-red-0)", flex: "none" }} />
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className={css.profileDot}
        style={{
          backgroundColor: theme === "dark" ? "var(--palette-blue-2)" : "var(--palette-neutral-0)",
          opacity: 0.3,
        }}
        aria-hidden="true"
      />
    ))}
  </span>
);

// ── Skill icons ───────────────────────────────────────────────────────────────

export type SkillIconFlags = {
  core?: boolean;
  development?: boolean;
  verified?: boolean;
  verifiedCredy?: boolean;
  verifiedFeedback?: boolean;
  career?: boolean;
};

const SkillIcons = ({ core, development, verified, verifiedCredy, verifiedFeedback, career }: SkillIconFlags) => (
  <>
    {career && <Icon name="learning" size={16} className={css.iconCareer} />}
    {core && <Icon name="core" size={16} className={css.iconCore} />}
    {development && <Icon name="development" size={16} className={css.iconDevelopment} />}
    {verified && <Icon name="verified" size={16} className={css.iconVerified} />}
    {verifiedCredy && <Icon name="verified-credly" size={16} className={css.iconVerifiedCredy} />}
    {verifiedFeedback && <Icon name="verified-others" size={16} className={css.iconVerifiedFeedback} />}
  </>
);

// ── Tooltip ───────────────────────────────────────────────────────────────────
// Dark bg #0C1457, 16px padding, 8px radius, arrow below
// Role: single column | Profile: single column | Match: two columns

type SkillTooltipRoleProps = {
  proficiency: ProficiencyLevel;
  tags?: string[];
  theme?: SkillTheme;
};

const TooltipRole = ({ proficiency, tags }: SkillTooltipRoleProps) => (
  <div className={css.tooltip}>
    <div className={css.tooltipCol}>
      <span className={css.tooltipHeader}>Required</span>
      <div className={css.tooltipRow}>
        <RoleDots level={proficiency} theme="dark" />
        <span className={css.tooltipLevel}>{LEVEL_LABELS[proficiency]}</span>
      </div>
      {tags && tags.map((tag) => (
        <span key={tag} className={css.tooltipTag}>{tag}</span>
      ))}
    </div>
    <div className={css.tooltipArrow} />
  </div>
);

type SkillTooltipProfileProps = SkillIconFlags & {
  proficiency: ProficiencyLevel;
  tags?: string[];
};

const TooltipProfile = ({ proficiency, tags, ...icons }: SkillTooltipProfileProps) => (
  <div className={css.tooltip}>
    <div className={css.tooltipCol}>
      <span className={css.tooltipHeader}>Profile</span>
      <div className={css.tooltipRow}>
        <ProfileDots level={proficiency} theme="dark" />
        <span className={css.tooltipLevel}>{LEVEL_LABELS[proficiency]}</span>
      </div>
      {icons.core && (
        <div className={css.tooltipRow}>
          <Icon name="core" size={16} className={css.iconCore} />
          <span className={css.tooltipLevel}>Core</span>
        </div>
      )}
      {icons.development && (
        <div className={css.tooltipRow}>
          <Icon name="development" size={16} className={css.iconDevelopment} />
          <span className={css.tooltipLevel}>Developmental</span>
        </div>
      )}
      {icons.verified && (
        <div className={css.tooltipRow}>
          <Icon name="verified" size={16} className={css.iconVerified} />
          <span className={css.tooltipLevel}>Experience</span>
        </div>
      )}
      {icons.verifiedCredy && (
        <div className={css.tooltipRow}>
          <Icon name="verified-credly" size={16} className={css.iconVerifiedCredy} />
          <span className={css.tooltipLevel}>Credly</span>
        </div>
      )}
      {icons.verifiedFeedback && (
        <div className={css.tooltipRow}>
          <Icon name="verified-others" size={16} className={css.iconVerifiedFeedback} />
          <span className={css.tooltipLevel}>Feedback</span>
        </div>
      )}
      {icons.career && (
        <div className={css.tooltipRow}>
          <Icon name="learning" size={16} className={css.iconCareer} />
          <span className={css.tooltipLevel}>Career</span>
        </div>
      )}
      {tags && tags.map((tag) => (
        <span key={tag} className={css.tooltipTag}>{tag}</span>
      ))}
    </div>
    <div className={css.tooltipArrow} />
  </div>
);

type SkillTooltipMatchProps = SkillIconFlags & {
  requiredProficiency: ProficiencyLevel;
  profileProficiency?: ProficiencyLevel;
  missing?: boolean;
  tags?: string[];
};

const TooltipMatch = ({
  requiredProficiency, profileProficiency, missing, tags, ...icons
}: SkillTooltipMatchProps) => (
  <div className={css.tooltip}>
    <div className={css.tooltipCols}>
      {/* Required column */}
      <div className={css.tooltipCol}>
        <span className={css.tooltipHeader}>Required</span>
        <div className={css.tooltipRow}>
          <RoleDots level={requiredProficiency} theme="dark" />
          <span className={css.tooltipLevel}>{LEVEL_LABELS[requiredProficiency]}</span>
        </div>
      </div>
      {/* Vertical divider */}
      <div className={css.tooltipDivider} />
      {/* Profile column */}
      <div className={css.tooltipCol}>
        <span className={css.tooltipHeader}>Profile</span>
        {missing ? (
          <div className={css.tooltipRow}>
            <NotMetDots theme="dark" />
            <span className={classNames(css.tooltipLevel, css.tooltipMissing)}>Profile does not have this skill</span>
          </div>
        ) : (
          <>
            <div className={css.tooltipRow}>
              <ProfileDots level={profileProficiency ?? "basic"} theme="dark" />
              <span className={css.tooltipLevel}>{LEVEL_LABELS[profileProficiency ?? "basic"]}</span>
            </div>
            {icons.core && <div className={css.tooltipRow}><Icon name="core" size={16} className={css.iconCore} /><span className={css.tooltipLevel}>Core</span></div>}
            {icons.development && <div className={css.tooltipRow}><Icon name="development" size={16} className={css.iconDevelopment} /><span className={css.tooltipLevel}>Developmental</span></div>}
            {icons.verified && <div className={css.tooltipRow}><Icon name="verified" size={16} className={css.iconVerified} /><span className={css.tooltipLevel}>Experience</span></div>}
            {icons.verifiedCredy && <div className={css.tooltipRow}><Icon name="verified-credly" size={16} className={css.iconVerifiedCredy} /><span className={css.tooltipLevel}>Credly</span></div>}
            {icons.verifiedFeedback && <div className={css.tooltipRow}><Icon name="verified-others" size={16} className={css.iconVerifiedFeedback} /><span className={css.tooltipLevel}>Feedback</span></div>}
            {icons.career && <div className={css.tooltipRow}><Icon name="learning" size={16} className={css.iconCareer} /><span className={css.tooltipLevel}>Career</span></div>}
          </>
        )}
        {tags && tags.map((tag) => <span key={tag} className={css.tooltipTag}>{tag}</span>)}
      </div>
    </div>
    <div className={css.tooltipArrow} />
  </div>
);

// ── Skill/Role ────────────────────────────────────────────────────────────────

export type SkillRoleProps = {
  label: string;
  proficiency: ProficiencyLevel;
  career?: boolean;
  showDivider?: boolean;
  tags?: string[];
  theme?: SkillTheme;
  className?: string;
};

export const SkillRole = ({
  label, proficiency, career = false, showDivider = false, tags, theme = "light", className,
}: SkillRoleProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className={classNames(css.skillWrapper, className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && <TooltipRole proficiency={proficiency} tags={tags} />}
      <span className={classNames(css.skill, css[theme])}>
        <RoleDots level={proficiency} theme={theme} />
        <span className={css.skillLabel}>{label}</span>
        {career && <Icon name="learning" size={16} className={css.iconCareer} />}
        {showDivider && <Divider orientation="vertical" className={classNames(css.divider, css[`divider_${theme}`])} />}
      </span>
    </span>
  );
};

// ── Skill/Profile ─────────────────────────────────────────────────────────────

export type SkillProfileProps = SkillIconFlags & {
  label: string;
  proficiency: ProficiencyLevel;
  showDivider?: boolean;
  tags?: string[];
  theme?: SkillTheme;
  className?: string;
};

export const SkillProfile = ({
  label, proficiency, showDivider = false, tags, theme = "light", className, ...icons
}: SkillProfileProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className={classNames(css.skillWrapper, className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && <TooltipProfile proficiency={proficiency} tags={tags} {...icons} />}
      <span className={classNames(css.skill, css[theme])}>
        <ProfileDots level={proficiency} theme={theme} />
        <span className={css.skillLabel}>{label}</span>
        <SkillIcons {...icons} />
        {showDivider && <Divider orientation="vertical" className={classNames(css.divider, css[`divider_${theme}`])} />}
      </span>
    </span>
  );
};

// ── Match proficiency display ─────────────────────────────────────────────────
// Column: profile dots (circles) top, role dots (pills) bottom — layout_Y37N5E
// Not-met: cross icon above role dots (no profile dots shown)

type MatchDotsProps = {
  requiredProficiency: ProficiencyLevel;
  profileProficiency?: ProficiencyLevel;
  missing?: boolean;
  theme?: SkillTheme;
};

const MatchDots = ({ requiredProficiency, profileProficiency, missing = false, theme = "light" }: MatchDotsProps) => (
  <span className={css.matchDotStack}>
    {/* Top: profile dots or 10×10px cross when missing */}
    {missing ? (
      <span className={css.matchCrossRow}>
        {/* 10×10px cross icon, aligned over the first bar */}
        <Icon name="cross" size={16} className={css.matchCrossIcon} />
      </span>
    ) : (
      <ProfileDots level={profileProficiency ?? "basic"} theme={theme} />
    )}
    {/* Bottom: role dots (always shown) — coloured red when missing */}
    {missing ? (
      <span className={css.roleDots}>
        {(() => {
          const count = requiredProficiency === "basic" ? 1 : requiredProficiency === "intermediate" ? 2 : 3;
          return [0, 1, 2].map((i) => (
            <span
              key={i}
              className={css.roleDot}
              style={{
                backgroundColor: i < count ? "var(--palette-red-0)" : "var(--palette-neutral-0)",
              }}
              aria-hidden="true"
            />
          ));
        })()}
      </span>
    ) : (
      <RoleDots level={requiredProficiency} theme={theme} />
    )}
  </span>
);

// ── Skill/Match ───────────────────────────────────────────────────────────────

export type SkillMatchProps = SkillIconFlags & {
  label: string;
  requiredProficiency: ProficiencyLevel;
  profileProficiency?: ProficiencyLevel;
  missing?: boolean;
  substitute?: boolean;
  showDivider?: boolean;
  tags?: string[];
  theme?: SkillTheme;
  className?: string;
};

export const SkillMatch = ({
  label, requiredProficiency, profileProficiency, missing = false, substitute = false,
  showDivider = false, tags, theme = "light", className, ...icons
}: SkillMatchProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className={classNames(css.skillWrapper, className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <TooltipMatch
          requiredProficiency={requiredProficiency}
          profileProficiency={profileProficiency}
          missing={missing}
          tags={tags}
          {...icons}
        />
      )}
      <span className={classNames(css.skill, css[theme])}>
        {/* Stacked dots: profile (top) + role (bottom) */}
        <MatchDots
          requiredProficiency={requiredProficiency}
          profileProficiency={profileProficiency}
          missing={missing}
          theme={theme}
        />
        <span className={css.skillLabel}>{label}</span>
        <SkillIcons {...icons} />
        {showDivider && <Divider orientation="vertical" className={classNames(css.divider, css[`divider_${theme}`])} />}
      </span>
    </span>
  );
};
