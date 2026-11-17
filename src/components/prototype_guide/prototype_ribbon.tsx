// PrototypeRibbon — the tour bar reduced to a Restart button, for prototypes that need no tour.
//
//   <PrototypeRibbon onRestart={() => setRun(r => r + 1)}>…prototype…</PrototypeRibbon>
//
// Same navy bar and the same stage as PrototypeGuide (see its SCSS): the prototype sits below the bar and `--ips-vh`
// is the stage height, so Navbar / Layout / SidePanel fill the stage and not the whole window.
// Restart is the host's job: bump a `key` on the prototype root (or reset its state) in `onRestart`.

import React from "react";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import css from "./prototype_guide.module.scss";

export type PrototypeRibbonProps = {
  /** Called when Restart is clicked: put the prototype back in its starting state */
  onRestart: () => void;
  children: React.ReactNode;
};

export function PrototypeRibbon({ onRestart, children }: PrototypeRibbonProps) {
  return (
    <div className={css.root}>
      <div className={css.bar} role="group" aria-label="Prototype">
        <Button kind="ghost" size="regular" className={css.barBtn} onClick={onRestart}>
          <span className={css.btnInner}><Icon name="refresh" size={16} />Restart</span>
        </Button>
      </div>
      <div className={css.stage}>
        <div className={css.scroll}>{children}</div>
      </div>
    </div>
  );
}
