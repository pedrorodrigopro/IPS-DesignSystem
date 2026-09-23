// Skill — Figma nodes:
//   Proficiency level: 9780:114099
//   Skill/Role:        9732:260872
//   Skill/Profile:     9732:260881
//   Skill/Match:       9732:260900
//
// Proficiency:
//   Role dots:    3 × (10×4px pill, radius 32px, gap 2px) — active=#0D2976, inactive=#CFDAF7
//   Profile dots: 3 × (10×10px circle, radius 32px, 2×2px gap rects) — same colours
//   Levels: basic=1, intermediate=2, advanced=3 active dots
//
// Skill row: row, align-items center, gap 4px, padding 5px 2px, height 24px
//   Light: #0D2976 (--palette-blue-0) | Dark: #FFFFFF (--palette-white-0)
//
// Icons (all 16×16px):
//   core:             star (gold #FFCD38)
//   development:      bar chart (teal #31A2CE)
//   verified:         green badge (#248E61)
//   verified-credly:  orange badge (#FF6B00)
//   verified-others:  dark badge (white check)
//   career:           graduation cap (learning icon)
//
// Divider: 1px vertical, #CFDAF7 (light) / #E7EAF8 (dark)
// Hover: rgba(0,0,0,0.04) bg, dark tooltip #0C1457
import classNames from "classnames";
import { Icon } from "../icon/icon";
import { Divider } from "../divider/divider";
import css from "./skill.module.scss";

export type ProficiencyLevel = "basic" | "intermediate" | "advanced";
export type SkillContext = "role" | "profile" | "match";
export type SkillTheme = "light" | "dark";

// ── Proficiency dots ──────────────────────────────────────────────────────────

type RoleDotsProps = { level: ProficiencyLevel; theme: SkillTheme };

const RoleDots = ({ level, theme }: RoleDotsProps) => {
  const count = level === "basic" ? 1 : level === "intermediate" ? 2 : 3;
  return (
    <span className={classNames(css.roleDots, css[theme])}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={classNames(css.roleDot, { [css.dotActive]: i < count })}
          aria-hidden="true"
        />
      ))}
    </span>
  );
};

type ProfileDotsProps = { level: ProficiencyLevel; theme: SkillTheme; missing?: boolean };

const ProfileDots = ({ level, theme, missing }: ProfileDotsProps) => {
  const count = level === "basic" ? 1 : level === "intermediate" ? 2 : 3;
  return (
    <span className={classNames(css.profileDots, css[theme])}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={classNames(css.profileDot, {
            [css.dotActive]: !missing && i < count,
            [css.dotMissing]: missing,
          })}
          aria-hidden="true"
        />
      ))}
    </span>
  );
};

// ── Skill icons ───────────────────────────────────────────────────────────────
// Rendered as coloured SVGs from the icon set

type SkillIconsProps = {
  core?: boolean;
  development?: boolean;
  verified?: boolean;
  verifiedCredy?: boolean;
  verifiedFeedback?: boolean;
  career?: boolean;
  theme?: SkillTheme;
};

const SkillIcons = ({
  core, development, verified, verifiedCredy, verifiedFeedback, career,
}: SkillIconsProps) => (
  <>
    {career && <Icon name="learning" size={16} className={css.iconCareer} />}
    {core && <Icon name="core" size={16} className={css.iconCore} />}
    {development && <Icon name="development" size={16} className={css.iconDevelopment} />}
    {verified && <Icon name="verified" size={16} className={css.iconVerified} />}
    {verifiedCredy && <Icon name="verified-credly" size={16} className={css.iconVerifiedCredy} />}
    {verifiedFeedback && <Icon name="verified-others" size={16} className={css.iconVerifiedFeedback} />}
  </>
);

// ── Skill/Role (9732:260872) ──────────────────────────────────────────────────
// Role dots + label + optional career icon + optional divider

export type SkillRoleProps = {
  label: string;
  proficiency: ProficiencyLevel;
  career?: boolean;
  showDivider?: boolean;
  theme?: SkillTheme;
  className?: string;
};

export const SkillRole = ({
  label,
  proficiency,
  career = false,
  showDivider = false,
  theme = "light",
  className,
}: SkillRoleProps) => (
  <span className={classNames(css.skill, css[theme], { [css.skillHoverable]: true }, className)}>
    <RoleDots level={proficiency} theme={theme} />
    <span className={css.skillLabel}>{label}</span>
    {career && <Icon name="learning" size={16} className={css.iconCareer} />}
    {showDivider && (
      <Divider orientation="vertical" className={classNames(css.divider, css[`divider_${theme}`])} />
    )}
  </span>
);

// ── Skill/Profile (9732:260881) ───────────────────────────────────────────────
// Profile dots + label + all optional icons + optional divider

export type SkillProfileProps = {
  label: string;
  proficiency: ProficiencyLevel;
  core?: boolean;
  development?: boolean;
  verified?: boolean;
  verifiedCredy?: boolean;
  verifiedFeedback?: boolean;
  career?: boolean;
  showDivider?: boolean;
  theme?: SkillTheme;
  className?: string;
};

export const SkillProfile = ({
  label,
  proficiency,
  core = false,
  development = false,
  verified = false,
  verifiedCredy = false,
  verifiedFeedback = false,
  career = false,
  showDivider = false,
  theme = "light",
  className,
}: SkillProfileProps) => (
  <span className={classNames(css.skill, css[theme], className)}>
    <ProfileDots level={proficiency} theme={theme} />
    <span className={css.skillLabel}>{label}</span>
    <SkillIcons
      core={core}
      development={development}
      verified={verified}
      verifiedCredy={verifiedCredy}
      verifiedFeedback={verifiedFeedback}
      career={career}
      theme={theme}
    />
    {showDivider && (
      <Divider orientation="vertical" className={classNames(css.divider, css[`divider_${theme}`])} />
    )}
  </span>
);

// ── Skill/Match (9732:260900) ─────────────────────────────────────────────────
// Profile dots (what person has) + Role dots (what's required) + label + icons + divider
// Missing: profile doesn't have the skill — shown with red cross on profile dots
// Substitute: similar skill identified — orange icon

export type SkillMatchProps = {
  label: string;
  requiredProficiency: ProficiencyLevel;
  profileProficiency?: ProficiencyLevel;
  missing?: boolean;
  substitute?: boolean;
  core?: boolean;
  development?: boolean;
  verified?: boolean;
  verifiedCredy?: boolean;
  verifiedFeedback?: boolean;
  career?: boolean;
  showDivider?: boolean;
  theme?: SkillTheme;
  className?: string;
};

export const SkillMatch = ({
  label,
  requiredProficiency,
  profileProficiency,
  missing = false,
  substitute = false,
  core = false,
  development = false,
  verified = false,
  verifiedCredy = false,
  verifiedFeedback = false,
  career = false,
  showDivider = false,
  theme = "light",
  className,
}: SkillMatchProps) => (
  <span className={classNames(css.skill, css[theme], className)}>
    {/* Profile dots (left) — what the person has */}
    <span className={css.matchDotGroup}>
      {missing || substitute ? (
        <span className={classNames(css.profileDots, css[theme])}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={classNames(css.profileDot, { [css.dotMissing]: missing, [css.dotSubstitute]: substitute })} aria-hidden="true" />
          ))}
        </span>
      ) : (
        <ProfileDots level={profileProficiency ?? "basic"} theme={theme} />
      )}
    </span>
    {/* Role dots (right) — what's required */}
    <RoleDots level={requiredProficiency} theme={theme} />
    <span className={css.skillLabel}>{label}</span>
    <SkillIcons
      core={core}
      development={development}
      verified={verified}
      verifiedCredy={verifiedCredy}
      verifiedFeedback={verifiedFeedback}
      career={career}
      theme={theme}
    />
    {showDivider && (
      <Divider orientation="vertical" className={classNames(css.divider, css[`divider_${theme}`])} />
    )}
  </span>
);
