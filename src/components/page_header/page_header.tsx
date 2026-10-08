// PageHeader — Figma node 3653:206152 (Page header component)
//
// A screen-level header pattern composing:
//   1. Breadcrumbs (optional, Level=2)
//   2. Header (size=page, with title + optional actions)
//   3. RoleSubtitle (optional — WF State pill, activity tag, label:value pairs)
//
// Layout: column, gap 8px, fill width
// Used at the top of every Role screen tab.

import React, { ReactNode } from "react";
import classNames from "classnames";
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import type { BreadcrumbItem } from "../breadcrumbs/breadcrumbs";
import { Header } from "../header/header";
import type { HeaderAction } from "../header/header";
import { RoleSubtitle } from "../role_subtitle/role_subtitle";
import type { RoleLabelValue } from "../role_subtitle/role_subtitle";
import type { WFState } from "../pill/pill";
import css from "./page_header.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type PageHeaderProps = {
  // ── Breadcrumbs ────────────────────────────────────────────────────────────
  breadcrumbs?: BreadcrumbItem[];
  // ── Header ─────────────────────────────────────────────────────────────────
  title: string;
  actions?: HeaderAction[];
  /** Extra content in the header right slot (e.g. segment selector) */
  headerRight?: ReactNode;
  // ── Role subtitle ───────────────────────────────────────────────────────────
  wfState?: WFState;
  activityTag?: string;
  subtitleItems?: RoleLabelValue[];
  className?: string;
};

// ── PageHeader ────────────────────────────────────────────────────────────────

export function PageHeader({
  breadcrumbs,
  title,
  actions,
  headerRight,
  wfState,
  activityTag,
  subtitleItems,
  className,
}: PageHeaderProps) {
  const hasSubtitle = wfState || activityTag || (subtitleItems && subtitleItems.length > 0);

  return (
    <div className={classNames(css.pageHeader, className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}
      <Header
        size="page"
        title={title}
        actions={actions}
        rightContent={headerRight}
      />
      {hasSubtitle && (
        <RoleSubtitle
          wfState={wfState}
          activityTag={activityTag}
          items={subtitleItems}
        />
      )}
    </div>
  );
}
