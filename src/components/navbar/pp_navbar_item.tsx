// PPNavbarItem — ProPilot animated navbar button
// Figma: adFvaOeh8E3AKLFKRjYD3r
//   Resting: node 15018:127289 (PP navbar / Resting=True)
//     - 50×50 circle, dark gradient bg, animated aurora glow, propilot icon 34px
//   Open:    node 15018:127322 (PP navbar / Resting=False)
//     - 50×50 circle, transparent bg, white 2px dashed border, propilot icon 34px at 50% opacity

import React from "react";
import { Icon } from "../icon/icon";
import css from "./pp_navbar_item.module.scss";
import classNames from "classnames";

export type PPNavbarItemProps = {
  /** Whether ProPilot is currently open (shows open/docked variant) */
  open?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Optional tooltip label override */
  label?: string;
};

export const PPNavbarItem = ({ open = false, onClick, label = "ProPilot" }: PPNavbarItemProps) => (
  <div className={css.wrapper}>
    <button
      type="button"
      aria-label={label}
      aria-pressed={open}
      onClick={onClick}
      className={classNames(css.btn, { [css.open]: open })}
    >
      {/* Aurora glow blobs — only shown when resting (not open) */}
      {!open && (
        <span className={css.glow} aria-hidden="true">
          <span className={css.blob1} />
          <span className={css.blob2} />
        </span>
      )}

      {/* ProPilot icon — 34px, dimmed to 50% opacity when open */}
      <span className={classNames(css.iconWrap, { [css.iconDimmed]: open })} aria-hidden="true">
        <Icon name="propilot" size={32} style={{ color: "white" }} />
      </span>
    </button>

    {/* Tooltip — shown on hover via CSS */}
    <span className={css.tooltip} aria-hidden="true">{label}</span>
  </div>
);
