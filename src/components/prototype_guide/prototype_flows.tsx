// PrototypeFlows — flow switcher for HTML prototypes that tell the same story in more than one way (e.g. Current vs Future).
//
//   <PrototypeFlows flows={[{ id: "current", label: "Current" }, { id: "future", label: "Future" }]} flow={flow} onFlow={setFlow} onRestart={reset}>
//     …prototype…
//   </PrototypeFlows>
//
// Same dark bar as the PrototypeGuide tour bar (and the same stage below it, so Navbar / Layout / SidePanel fill the stage instead
// of the window), but with one button per flow instead of a tour. The prototype decides what a flow is: this component only says which
// one is selected. There is no tour and nothing is stored.

import React from "react";
import { Button } from "../button/button";
import { Divider } from "../divider/divider";
import { Icon } from "../icon/icon";
import css from "./prototype_guide.module.scss";

export type PrototypeFlow = { id: string; label: string };

export type PrototypeFlowsProps = {
  flows: PrototypeFlow[];
  /** Id of the selected flow */
  flow: string;
  onFlow: (id: string) => void;
  /** Shows a Restart button after the flows (starts the selected flow again from its first screen) */
  onRestart?: () => void;
  /** Bar label before the flows (default "Flow") */
  label?: string;
  /** Extra buttons at the right of the bar */
  barActions?: { label: string; onClick: () => void }[];
  children: React.ReactNode;
};

export function PrototypeFlows({ flows, flow, onFlow, onRestart, label = "Flow", barActions, children }: PrototypeFlowsProps) {
  return (
    <div className={css.root}>
      <div className={css.bar} role="group" aria-label="Prototype flows">
        <span className={css.barLabel}>{label}</span>
        <div role="group" aria-label={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {flows.map(f => (
            // The selected flow is the filled (inverted) button; the others are the white ghost buttons of the tour bar
            <Button
              key={f.id}
              kind={f.id === flow ? "inverted" : "ghost"}
              size="regular"
              className={f.id === flow ? undefined : css.barBtn}
              title={f.id === flow ? `${f.label} flow (selected)` : `Switch to the ${f.label} flow`}
              onClick={() => { if (f.id !== flow) onFlow(f.id); }}
            >
              <span className={css.btnInner}>{f.label}</span>
            </Button>
          ))}
        </div>
        {onRestart && (
          <>
            <Divider orientation="vertical" />
            <Button kind="ghost" size="regular" className={css.barBtn} onClick={onRestart}>
              <span className={css.btnInner}><Icon name="refresh" size={16} />Restart</span>
            </Button>
          </>
        )}
        {barActions && barActions.length > 0 && (
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            {barActions.map(a => (
              <Button key={a.label} kind="ghost" size="regular" className={css.barBtn} onClick={a.onClick}>
                <span className={css.btnInner}>{a.label}</span>
              </Button>
            ))}
          </span>
        )}
      </div>

      <div className={css.stage}>
        <div className={css.scroll}>{children}</div>
      </div>
    </div>
  );
}
