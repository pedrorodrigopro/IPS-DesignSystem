// Layout — Figma node 2834:178203 (Layout section)
// Template/Layout component set: 1769:70231 / 7411:205767
// Template/Page component: 1549:27042
//
// Layout variants (Template/Layout):
//
//   full            — content fills all available space
//                     padding: 24px (sides), bg #F8F9FD
//                     Slot: fill × fill
//
//   1280            — centered content, max 1280px wide
//                     padding: 24px top, centering via alignItems:center
//                     Slot: 1280px fixed width
//
//   profile-regular — 2-col row: 280px fixed sidebar | fluid content
//                     gap: 24px, padding: 0 24px 0 0
//
//   profile-summary — 3-col row: 280px sidebar | fluid content | 500px right panel
//                     gap: 24px, padding: 0 24px 0 0
//
// Template/Page — full viewport shell: Navbar (60px) + Layout content area
//   Layout: row, fill × fill, bg #F8F9FD
//   Navbar sits on the left (fixed width ~60px, bg #0C1457, radius 0 16px 16px 0)
//   Content area fills the remaining space
//
// Page bg: #F8F9FD (--palette-neutral-2)

import React, { ReactNode } from "react";
import classNames from "classnames";
import css from "./layout.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type LayoutVariant = "full" | "1280" | "profile-regular" | "profile-summary";

// ── Layout (content area only) ────────────────────────────────────────────────

export type LayoutProps = {
  variant?: LayoutVariant;
  /** Main content slot */
  children: ReactNode;
  /** profile-regular / profile-summary: left sidebar content (280px) */
  sidebar?: ReactNode;
  /** profile-summary only: right panel content (500px) */
  rightPanel?: ReactNode;
  className?: string;
};

// CSS class map — "1280" can't start a CSS class name so we alias it
const VARIANT_CLASS: Record<LayoutVariant, string> = {
  "full":            css.full,
  "1280":            css.v1280,
  "profile-regular": css["profile-regular"],
  "profile-summary": css["profile-summary"],
};

export function Layout({
  variant = "full",
  children,
  sidebar,
  rightPanel,
  className,
}: LayoutProps) {
  return (
    <div className={classNames(css.layout, VARIANT_CLASS[variant], className)}>
      {/* Sidebar slot — profile variants only */}
      {(variant === "profile-regular" || variant === "profile-summary") && (
        <aside className={css.sidebar}>{sidebar}</aside>
      )}

      {/* Main content slot */}
      <main className={css.content}>{children}</main>

      {/* Right panel slot — profile-summary only */}
      {variant === "profile-summary" && (
        <aside className={css.rightPanel}>{rightPanel}</aside>
      )}
    </div>
  );
}

// ── Page (full viewport shell with Navbar) ────────────────────────────────────
// Wraps Navbar + Layout for full-screen app page composition.

export type PageProps = {
  /** Navbar component to render on the left */
  navbar?: ReactNode;
  /** Layout variant for the content area */
  variant?: LayoutVariant;
  children: ReactNode;
  sidebar?: ReactNode;
  rightPanel?: ReactNode;
  className?: string;
};

export function Page({
  navbar,
  variant = "full",
  children,
  sidebar,
  rightPanel,
  className,
}: PageProps) {
  return (
    <div className={classNames(css.page, className)}>
      {navbar && <div className={css.navbarSlot}>{navbar}</div>}
      <Layout
        variant={variant}
        sidebar={sidebar}
        rightPanel={rightPanel}
        className={css.pageContent}
      >
        {children}
      </Layout>
    </div>
  );
}
