// WorkforceMember (Profile) — Figma node 2249:141815 (Workforce Member component set)
//
// Profile icon component sets (each with Default + Hover/tooltip states):
//   Placeholder:            13512:136971 — icon "placeholder-profile" 16×16,  tooltip "Placeholder profile"
//   Suspended:              13512:136967 — icon "forbidden"           16×16,  tooltip "Suspended profile"
//   Interest:               13512:136964 — icon "heart"               16×16,  tooltip "Profile expressed interest"
//   Contractual time slice: 14529:103539 — icon "timeline"            20×20,  tooltip "This practitioner is matching requirements\nin a future contractual time slice"
//   Suggested:              14755:4845   — icon "suggested"            20×20,  tooltip "Suggested - Integration"
//
// Variants (Type=):
//   small-1line  — 20×20 avatar | name (body-selected 700) + inline profile icons | height 28px, padding 4px, hover bg rgba(0,0,0,0.04) r8
//   small-2lines — 40×40 avatar | name + icons row (16px height) + email (label-regular)
//   small-3lines — 40×40 avatar | name + icons row + job-title (label-unselected) + email (label-unselected)
//   big          — 80×80 avatar | heading-5 name + icons + key:value datapoints column
//   card         — 48×48 avatar | heading-4 name + icons + job-title label + optional "Added by" shortlist row
//
// Named resource pill: #E7EAF8 bg, label-unselected 12px, radius 16px, padding 5px 12px
// All text: #0D2976 (--palette-blue-0)
// Avatar bg: --palette-blue-0 (with white initials)

import React from "react";
import classNames from "classnames";
import { Avatar } from "../avatar/avatar";
import { Icon } from "../icon/icon";
import { Tooltip } from "../tooltip/tooltip";
import css from "./workforce_member.module.scss";

// ── Profile icon flags ────────────────────────────────────────────────────────

export type ProfileIconFlags = {
  /** Profile is a placeholder (no real person assigned) */
  placeholder?: boolean;
  /** Profile is suspended */
  suspended?: boolean;
  /** Profile expressed interest in this role */
  interest?: boolean;
  /** Profile matches in a future contractual time slice */
  contractualTimeSlice?: boolean;
  /** Profile is suggested by integration */
  suggested?: boolean;
  /** Profile is a named resource */
  namedResource?: boolean;
};

// ── Profile icon row ──────────────────────────────────────────────────────────
// Renders up to 5 small icon indicators next to the name, each with a tooltip.

type ProfileIconsProps = ProfileIconFlags & { className?: string };

export function ProfileIcons({
  placeholder,
  suspended,
  interest,
  contractualTimeSlice,
  suggested,
  namedResource,
  className,
}: ProfileIconsProps) {
  return (
    <span className={classNames(css.profileIcons, className)}>
      {contractualTimeSlice && (
        <Tooltip
          content="This practitioner is matching requirements in a future contractual time slice"
          placement="down-center"
          maxWidth={280}
        >
          <span className={css.profileIcon}>
            <Icon name="timeline" size={20} />
          </span>
        </Tooltip>
      )}
      {suggested && (
        <Tooltip content="Suggested - Integration" placement="down-center">
          <span className={css.profileIcon}>
            <Icon name="suggested" size={20} />
          </span>
        </Tooltip>
      )}
      {suspended && (
        <Tooltip content="Suspended profile" placement="down-center">
          <span className={classNames(css.profileIcon, css.profileIconSm)}>
            <Icon name="forbidden" size={16} />
          </span>
        </Tooltip>
      )}
      {placeholder && (
        <Tooltip content="Placeholder profile" placement="down-center">
          <span className={classNames(css.profileIcon, css.profileIconSm)}>
            <Icon name="placeholder-profile" size={16} />
          </span>
        </Tooltip>
      )}
      {interest && (
        <Tooltip content="Profile expressed interest" placement="down-center">
          <span className={classNames(css.profileIcon, css.profileIconSm)}>
            <Icon name="heart" size={16} />
          </span>
        </Tooltip>
      )}
      {namedResource && (
        <span className={css.namedResourcePill}>Named resource</span>
      )}
    </span>
  );
}

// ── Shared name row ───────────────────────────────────────────────────────────

type NameRowProps = ProfileIconFlags & {
  name: string;
  nameClassName?: string;
};

function NameRow({ name, nameClassName, ...icons }: NameRowProps) {
  return (
    <span className={css.nameRow}>
      <span className={classNames(css.name, nameClassName)}>{name}</span>
      <ProfileIcons {...icons} />
    </span>
  );
}

// ── Variant type ──────────────────────────────────────────────────────────────

export type WorkforceMemberVariant =
  | "small-1line"
  | "small-2lines"
  | "small-3lines"
  | "big"
  | "card";

// ── Datapoint (big variant) ───────────────────────────────────────────────────

export type ProfileDatapoint = {
  label: string;
  value: string;
};

// ── Props ─────────────────────────────────────────────────────────────────────

export type WorkforceMemberProps = ProfileIconFlags & {
  variant?: WorkforceMemberVariant;
  name: string;
  /** Initials shown in avatar when no src */
  initials?: string;
  /** Avatar photo URL */
  avatarSrc?: string;
  /** Hide avatar entirely */
  hideAvatar?: boolean;
  /** Email address — shown in small-2lines and small-3lines */
  email?: string;
  /** Job title — shown in small-3lines, card, big */
  jobTitle?: string;
  /** "Added by" label for shortlist row (card variant) */
  addedBy?: string;
  /** Key:value datapoints for big variant */
  datapoints?: ProfileDatapoint[];
  /** Click handler */
  onClick?: () => void;
  className?: string;
};

// ── Component ─────────────────────────────────────────────────────────────────

export function WorkforceMember({
  variant = "small-1line",
  name,
  initials,
  avatarSrc,
  hideAvatar = false,
  email,
  jobTitle,
  addedBy,
  datapoints,
  onClick,
  className,
  // profile icon flags
  placeholder,
  suspended,
  interest,
  contractualTimeSlice,
  suggested,
  namedResource,
}: WorkforceMemberProps) {
  const iconFlags: ProfileIconFlags = {
    placeholder, suspended, interest, contractualTimeSlice, suggested, namedResource,
  };

  const handleClick = onClick ? () => onClick() : undefined;

  // ── small-1line ─────────────────────────────────────────────────────────
  if (variant === "small-1line") {
    return (
      <span
        className={classNames(css.wm, css.small1line, onClick && css.clickable, className)}
        onClick={handleClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {!hideAvatar && (
          <span className={css.avatarSm}>
            <Avatar initials={initials} src={avatarSrc} size="small" />
          </span>
        )}
        <NameRow name={name} nameClassName={css.nameBodySelected} {...iconFlags} />
      </span>
    );
  }

  // ── small-2lines ────────────────────────────────────────────────────────
  if (variant === "small-2lines") {
    return (
      <span className={classNames(css.wm, css.small2lines, className)} onClick={handleClick}>
        {!hideAvatar && (
          <span className={css.avatarMd}>
            <Avatar initials={initials} src={avatarSrc} size="small" />
          </span>
        )}
        <span className={css.textCol}>
          <NameRow name={name} nameClassName={css.nameBodySelected} {...iconFlags} />
          {email && <span className={css.email}>{email}</span>}
        </span>
      </span>
    );
  }

  // ── small-3lines ────────────────────────────────────────────────────────
  if (variant === "small-3lines") {
    return (
      <span className={classNames(css.wm, css.small3lines, className)} onClick={handleClick}>
        {!hideAvatar && (
          <span className={css.avatarMd}>
            <Avatar initials={initials} src={avatarSrc} size="small" />
          </span>
        )}
        <span className={css.textCol}>
          <NameRow name={name} nameClassName={css.nameBodySelected} {...iconFlags} />
          {jobTitle && <span className={css.secondary}>{jobTitle}</span>}
          {email && <span className={css.secondary}>{email}</span>}
        </span>
      </span>
    );
  }

  // ── big ─────────────────────────────────────────────────────────────────
  if (variant === "big") {
    return (
      <span className={classNames(css.wm, css.big, className)} onClick={handleClick}>
        {!hideAvatar && (
          // Avatar size="big" is 80×80 — matches Figma exactly
          <Avatar initials={initials} src={avatarSrc} size="big" />
        )}
        <span className={css.textCol}>
          <NameRow name={name} nameClassName={css.nameHeading5} {...iconFlags} />
          {datapoints && datapoints.length > 0 && (
            <span className={css.datapoints}>
              {datapoints.map((dp) => (
                <span key={dp.label} className={css.datapointRow}>
                  <span className={css.datapointLabel}>{dp.label}</span>
                  <span className={css.datapointValue}>{dp.value}</span>
                </span>
              ))}
            </span>
          )}
        </span>
      </span>
    );
  }

  // ── card ─────────────────────────────────────────────────────────────────
  return (
    <span className={classNames(css.wm, css.card, className)} onClick={handleClick}>
      {!hideAvatar && (
        <span className={css.avatarCard}>
          <Avatar initials={initials} src={avatarSrc} size="small" />
        </span>
      )}
      <span className={css.cardRight}>
        <span className={css.cardNameRow}>
          <NameRow name={name} nameClassName={css.nameHeading4} {...iconFlags} />
        </span>
        {jobTitle && <span className={css.cardJobTitle}>{jobTitle}</span>}
        {addedBy && (
          <span className={css.shortlistRow}>
            <span className={css.secondary}>Added by: </span>
            <span className={css.shortlistLink}>{addedBy}</span>
          </span>
        )}
      </span>
    </span>
  );
}
