// Tile — Figma node 9700:113417 (Tile master component set)
//
// A general-purpose content container with variant-driven background,
// shadow and border. The blue rectangle in Figma is a slot placeholder
// (not a real element) — the actual content is passed as children.
//
// Styles (from Figma):
//   default          bg #F8F9FD (neutral-2), no shadow, no border
//   selected         bg #E7EAF8 (neutral-1), no shadow, no border
//   highlight        bg #FFFFFF, no shadow, no border             ← main content card
//   interactive      bg #FFFFFF, shadow (Elevation-Hover), no border   ← clickable card
//   interactive-hover bg rgba(0,0,0,0.04), shadow, no border      ← hover state (CSS :hover)
//   dark             bg #0C1457 (blue-1), shadow, no border       ← dark clickable
//   object-dark      bg #F8F9FD, no shadow, border 1px #CFDAF7    ← side panel block
//   object-light     bg #FFFFFF, no shadow, border 1px #CFDAF7    ← side panel block light
//
// Padding scale (controlled by `padding` prop):
//   "panel"   → 8px  (--tile-padding-panel)   — side panel blocks
//   "content" → 16px (--tile-padding-content) — screen container content   [default]
//   "screen"  → 24px (--tile-padding-screen)  — top-level screen tiles
//
// All tiles: border-radius 8px, gap 8px between child elements.
// Interactive variants show a pointer cursor + hover shadow transition.

import React, { ReactNode } from "react";
import classNames from "classnames";
import css from "./tile.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type TileStyle =
  | "default"          // neutral-2 bg, flat — background container
  | "selected"         // neutral-1 bg, flat — selected state
  | "highlight"        // white bg, flat — primary content card
  | "interactive"      // white bg + shadow — clickable card
  | "dark"             // blue-1 bg + shadow — dark clickable card
  | "object-dark"      // neutral-2 bg + border — side panel object
  | "object-light";    // white bg + border — side panel object light

export type TilePadding =
  | "panel"     //  8px — content in side panels / overlays
  | "content"   // 16px — regular content within screen containers [default]
  | "screen";   // 24px — top-level screen content tiles

export type TileProps = {
  /** Visual style — controls background, shadow, border */
  tileStyle?: TileStyle;
  /** Padding scale — panel (8px) / content (16px) / screen (24px) */
  padding?: TilePadding;
  /** Makes the tile a button element with pointer cursor and hover shadow */
  onClick?: () => void;
  /** Render as a specific HTML element (div by default, button if onClick provided) */
  as?: "div" | "article" | "section";
  /** Fill available width */
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
};

// ── Tile ──────────────────────────────────────────────────────────────────────

export function Tile({
  tileStyle = "highlight",
  padding = "content",
  onClick,
  as: Tag = "div",
  fullWidth = true,
  className,
  children,
  style,
}: TileProps) {
  const isInteractive = !!onClick || tileStyle === "interactive" || tileStyle === "dark";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classNames(
          css.tile,
          css[tileStyle.replace("-", "_")],
          css[`padding_${padding}`],
          isInteractive && css.interactive,
          fullWidth && css.fullWidth,
          className
        )}
        style={style}
      >
        {children}
      </button>
    );
  }

  return (
    <Tag
      className={classNames(
        css.tile,
        css[tileStyle.replace("-", "_")],
        css[`padding_${padding}`],
        isInteractive && css.interactive,
        fullWidth && css.fullWidth,
        className
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}
