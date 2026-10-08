// RoleSubtitle — Figma node 12685:585963 (Role Subtitle component)
//
// Layout: row, alignItems center, wrap, gap 8px, padding-bottom 16px
// Width: fills container (originally 1280px fixed in Figma)
//
// Elements in order:
//   1. PillWFState (small) — e.g. "Shortlisting" (#6EF29C bg)
//   2. PillActivityTag (small) — e.g. "RM to review" (tag icon + label, #CFDAF7 bg)
//   3–N. LabelValue pairs — "Label **Value**" body-unselected with bold value
//        separated by vertical Dividers (1px × 18px #CFDAF7)
//
// Text style for label-value: body-unselected (14px 400) with inline bold span for value
// Vertical divider: 1px wide × 18px tall, #CFDAF7
//
// Property flags:
//   Role tag (bool) — shows/hides the PillActivityTag (Figma prop "Role tag")

import React from "react";
import classNames from "classnames";
import { PillWFState } from "../pill/pill";
import { PillActivityTag } from "../pill/pill";
import type { WFState } from "../pill/pill";
import { Divider } from "../divider/divider";
import css from "./role_subtitle.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type RoleLabelValue = {
  /** Short descriptor e.g. "ID", "State", "Privacy" */
  label: string;
  /** Bold value e.g. "100000064", "Open", "Public" */
  value: string;
};

export type RoleSubtitleProps = {
  /** WF State pill — e.g. "shortlisting" */
  wfState?: WFState;
  /** Activity tag pill label — e.g. "RM to review". Omit to hide. */
  activityTag?: string;
  /** Array of label:value metadata pairs */
  items?: RoleLabelValue[];
  className?: string;
};

// ── LabelValue inline text ────────────────────────────────────────────────────
// "Label **Value**" — body-unselected base, value in bold

function LabelValue({ label, value }: RoleLabelValue) {
  return (
    <span className={css.labelValue}>
      {label}{" "}
      <strong className={css.valueStrong}>{value}</strong>
    </span>
  );
}

// ── RoleSubtitle ──────────────────────────────────────────────────────────────

export function RoleSubtitle({
  wfState,
  activityTag,
  items = [],
  className,
}: RoleSubtitleProps) {
  // Interleave items with vertical dividers
  const itemsWithDividers = items.flatMap((item, i) => [
    <LabelValue key={`item-${i}`} {...item} />,
    i < items.length - 1
      ? <Divider key={`div-${i}`} orientation="vertical" className={css.divider} />
      : null,
  ]).filter(Boolean);

  // Build a divider between the pill section and the items section if both exist
  const hasPills = wfState || activityTag;
  const hasItems = items.length > 0;

  return (
    <div className={classNames(css.row, className)}>
      {/* Pills */}
      {wfState && <PillWFState state={wfState} size="small" />}
      {activityTag && <PillActivityTag label={activityTag} size="small" />}

      {/* Divider between pills and items */}
      {hasPills && hasItems && (
        <Divider orientation="vertical" className={css.divider} />
      )}

      {/* Label:value pairs with dividers between them */}
      {itemsWithDividers}
    </div>
  );
}
