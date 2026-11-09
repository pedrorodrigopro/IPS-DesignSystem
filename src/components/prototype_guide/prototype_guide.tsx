// PrototypeGuide — switchable tour for HTML prototypes.
//
//   <PrototypeGuide screen={screenId} steps={STEPS} screenLabels={{ home: "Home" }}>…prototype…</PrototypeGuide>
//
// A dark tour bar sits on top of the prototype (outside the platform design): Tour switch, Back / Next, a step jump list and
// Restart. The prototype itself lives in a "stage" below it (see the SCSS). Off by default on every load; nothing is stored.
//
// Steps are data. Targets are CSS selectors (normally `[data-tour="…"]` on layout wrappers around IPS components).
// `enter()` puts the prototype in the state where the step's screen is showing; it runs when the user reaches the step through
// the bar from a different screen, and always for Restart.

import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Switch } from "../switch/switch";
import { Divider } from "../divider/divider";
import { Button } from "../button/button";
import { InputSelect } from "../input/input";
import { DropdownSelection } from "../dropdown/dropdown";
import { Tile } from "../tile/tile";
import { Header } from "../header/header";
import { PillSimple } from "../pill/pill";
import { Tooltip } from "../tooltip/tooltip";
import { Icon } from "../icon/icon";
import css from "./prototype_guide.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type GuidePlacement = "top" | "bottom" | "left" | "right";

export type GuideStep = {
  /** Unique within `steps` */
  id: string;
  /** Screen id this step belongs to (matches the `screen` prop) */
  screen: string;
  /** CSS selector of the target, normally `[data-tour="roll-forward"]` */
  target: string;
  title: string;
  body: string;
  /** Preferred popover side; flips when there is no room (default "bottom") */
  placement?: GuidePlacement;
  /**
   * Puts the prototype in the state where this step's screen is showing. Called when the step is reached through the bar
   * (Next, Back, jump) from a different screen, and always for Restart (step 1). Optional.
   *
   * - It only runs when the step belongs to a different screen than the one showing (or for Restart). Two steps that need
   *   different sub-states of the SAME screen id therefore never call it: give such states different screen ids.
   * - It must land on `step.screen`; otherwise the screen-sync effect snaps the guide back to that screen's first step.
   * - `steps` may be passed inline (a new array every render), so `enter` closures must be safe to call from a later render
   *   (use state setters, not values captured from a stale render).
   */
  enter?: () => void;
  /** Show only as a hotspot (never part of the tour sequence / jump list) */
  hotspotOnly?: boolean;
};

export type PrototypeGuideProps = {
  /** Which screen of the prototype is showing */
  screen: string;
  /**
   * The tour. May be passed inline (a new array every render). Step ids must be unique. Don't switch `steps` between empty and
   * non-empty while mounted: with no steps the guide renders only `children`, so the tree shape changes and the prototype remounts.
   */
  steps: GuideStep[];
  /** Readable screen names for the step list (default: the screen id) */
  screenLabels?: Record<string, string>;
  /** Initial state of the Tour switch. For stories / tests; prototypes leave it off */
  defaultEnabled?: boolean;
  /** Extra buttons at the right of the tour bar (shown whether or not the tour is on), e.g. a prototype's "Map" */
  barActions?: { label: string; onClick: () => void }[];
  children: React.ReactNode;
};

// ── Geometry helpers ──────────────────────────────────────────────────────────

type Rect = { x: number; y: number; w: number; h: number };
type RectMap = Record<string, Rect | null>;
type Bounds = { w: number; h: number };
type Measure = { rects: RectMap; bounds: Bounds };

const POPOVER_W = 320;      // applied inline as the popover width
const HOTSPOT = 20;         // hotspot box; keep in sync with .hotspot width / height in the SCSS
const POP_CLEAR = 4;        // hotspots closer than this to the popover are hidden
const SPOT_PAD = 4;         // spotlight padding around the target
const GAP = 12;             // distance popover ↔ target
const EDGE = 8;             // minimum distance popover ↔ stage edge

const EMPTY_MEASURE: Measure = { rects: {}, bounds: { w: 0, h: 0 } };

/** The hotspot's box: a HOTSPOT-sized square centred on the target's top-right corner. */
const hotspotBox = (r: Rect): Rect => ({ x: r.x + r.w - HOTSPOT / 2, y: r.y - HOTSPOT / 2, w: HOTSPOT, h: HOTSPOT });

/** `document.querySelector` that treats an invalid selector as "no target" instead of throwing (which would kill the rAF loop). */
function queryTarget(selector: string): Element | null {
  try { return document.querySelector(selector); } catch { return null; }
}

const sameRects = (a: RectMap, b: RectMap) => {
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return kb.every(k => {
    const x = a[k];
    const y = b[k];
    return x === y || (!!x && !!y && x.x === y.x && x.y === y.y && x.w === y.w && x.h === y.h);
  });
};

const sameMeasure = (a: Measure, b: Measure) =>
  a.bounds.w === b.bounds.w && a.bounds.h === b.bounds.h && sameRects(a.rects, b.rects);

/**
 * Popover position next to `target`: the preferred side first, then bottom, top, right, left. A side is used when the popover fits
 * on its MAIN axis (the cross axis is clamped into the stage afterwards). When no side fits, the preferred side is used and,
 * after clamping, the popover may overlap the target.
 */
function placePopover(target: Rect, size: Bounds, bounds: Bounds, preferred: GuidePlacement) {
  const at = (side: GuidePlacement) => {
    switch (side) {
      case "top":    return { x: target.x + target.w / 2 - size.w / 2, y: target.y - size.h - GAP };
      case "left":   return { x: target.x - size.w - GAP, y: target.y + target.h / 2 - size.h / 2 };
      case "right":  return { x: target.x + target.w + GAP, y: target.y + target.h / 2 - size.h / 2 };
      default:       return { x: target.x + target.w / 2 - size.w / 2, y: target.y + target.h + GAP };
    }
  };
  const fitsMain = (side: GuidePlacement) => {
    switch (side) {
      case "top":    return target.y - GAP - size.h >= EDGE;
      case "left":   return target.x - GAP - size.w >= EDGE;
      case "right":  return target.x + target.w + GAP + size.w <= bounds.w - EDGE;
      default:       return target.y + target.h + GAP + size.h <= bounds.h - EDGE;
    }
  };
  const order: GuidePlacement[] = [preferred, ...(["bottom", "top", "right", "left"] as GuidePlacement[]).filter(s => s !== preferred)];
  const side = order.find(fitsMain) ?? preferred;
  const p = at(side);
  return {
    x: Math.min(Math.max(p.x, EDGE), Math.max(EDGE, bounds.w - size.w - EDGE)),
    y: Math.min(Math.max(p.y, EDGE), Math.max(EDGE, bounds.h - size.h - EDGE)),
  };
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// ── Hooks ─────────────────────────────────────────────────────────────────────

/**
 * Rectangles (relative to the stage) of the steps' targets plus the stage's size, refreshed every animation frame while `on`.
 * Measured here (not during render) so overlays follow resizes in the same frame.
 */
function useTargetRects(stepsRef: React.MutableRefObject<GuideStep[]>, stageRef: React.RefObject<HTMLDivElement | null>, on: boolean): Measure {
  const [measure, setMeasure] = useState<Measure>(EMPTY_MEASURE);
  useEffect(() => {
    if (!on) { setMeasure(prev => (sameMeasure(prev, EMPTY_MEASURE) ? prev : EMPTY_MEASURE)); return; }
    let raf = 0;
    const tick = () => {
      const stage = stageRef.current;
      if (stage) {
        const sb = stage.getBoundingClientRect();
        const rects: RectMap = {};
        for (const s of stepsRef.current) {
          const r = queryTarget(s.target)?.getBoundingClientRect();
          rects[s.id] = r && r.width > 0 && r.height > 0
            ? { x: Math.round(r.left - sb.left), y: Math.round(r.top - sb.top), w: Math.round(r.width), h: Math.round(r.height) }
            : null;
        }
        const next: Measure = { rects, bounds: { w: stage.clientWidth, h: stage.clientHeight } };
        setMeasure(prev => (sameMeasure(prev, next) ? prev : next));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, stepsRef, stageRef]);
  return measure;
}

/**
 * True while a blocking modal is open: an `aria-modal="true"` element OUTSIDE the stage. The IPS Modal portals to `document.body`;
 * a SidePanel renders inside the stage (also with aria-modal) and must not hide the guide, so steps inside a panel keep working.
 */
function useModalOpen(on: boolean, stageRef: React.RefObject<HTMLDivElement | null>) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!on) { setOpen(false); return; }
    const check = () => setOpen([...document.querySelectorAll('[aria-modal="true"]')].some(el => !stageRef.current?.contains(el)));
    check();
    const mo = new MutationObserver(check);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-modal"] });
    return () => mo.disconnect();
  }, [on, stageRef]);
  return open;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function PrototypeGuide({ screen, steps, screenLabels, defaultEnabled = false, barActions, children }: PrototypeGuideProps) {
  // The tour sequence: every step that is not hotspot-only, in the order given
  const tour = useMemo(() => steps.filter(s => !s.hotspotOnly), [steps]);

  const [enabled, setEnabled] = useState(defaultEnabled);
  const [activeId, setActiveId] = useState<string | undefined>(() => (tour.find(s => s.screen === screen) ?? tour[0])?.id);
  const [listOpen, setListOpen] = useState(false);
  const pickerId = useId();
  const [dismissed, setDismissed] = useState(false);   // Escape: hide the popover / spotlight of the current step
  const stageRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [popSize, setPopSize] = useState({ w: POPOVER_W, h: 160 });
  const scrolledFor = useRef("");
  const lastPopPos = useRef({ x: 0, y: 0 });           // last placed position, so a hidden popover never sits at 0,0

  // Falls back to the current screen's first step when `activeId` no longer exists, so the guide can't get stuck
  const foundIndex = tour.findIndex(s => s.id === activeId);
  const active = foundIndex >= 0 ? tour[foundIndex] : (tour.find(s => s.screen === screen) ?? tour[0]);
  const activeIndex = active ? tour.indexOf(active) : -1;
  const activeKey = active?.id;
  const activeTarget = active?.target;

  // Latest values for callbacks / effects that must not re-run on every change
  const activeRef = useRef(active);
  activeRef.current = active;
  const screenRef = useRef(screen);
  screenRef.current = screen;
  const listOpenRef = useRef(listOpen);
  listOpenRef.current = listOpen;
  const modalOpenRef = useRef(false);

  /** Go to a step. `enter()` runs when the step belongs to another screen than the one showing (or when forced: Restart). */
  const goTo = useCallback((id: string, forceEnter = false) => {
    const step = tour.find(s => s.id === id);
    if (!step) return;
    setActiveId(id);
    setDismissed(false);
    if (forceEnter || step.screen !== screenRef.current) step.enter?.();
  }, [tour]);

  const goBack = () => { if (activeIndex > 0) goTo(tour[activeIndex - 1].id); };
  const goNext = () => { if (activeIndex >= 0 && activeIndex < tour.length - 1) goTo(tour[activeIndex + 1].id); };
  const restart = () => { if (tour[0]) goTo(tour[0].id, true); };

  // The user navigated the prototype itself: continue from the first step of the new screen
  useEffect(() => {
    const cur = activeRef.current;
    if (cur && cur.screen === screen) return;
    const first = tour.find(s => s.screen === screen);
    if (first) { setActiveId(first.id); setDismissed(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const toggle = (on: boolean) => {
    setEnabled(on);
    setDismissed(false);
    setListOpen(false);
    if (on && (!active || active.screen !== screen)) {
      const first = tour.find(s => s.screen === screen);
      if (first) setActiveId(first.id);
    }
  };

  const focusPicker = () => document.getElementById(pickerId)?.focus();

  // Escape: closes the step list (and returns focus to the picker) if it is open; otherwise hides the current popover + spotlight
  // (hotspots and the bar stay). Ignored while a blocking modal is open (the popover must not stay dismissed behind it) or when
  // something else already handled the key. One handler, so the order of the two cases can't depend on listener order.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (listOpenRef.current) {
        setListOpen(false);
        document.getElementById(pickerId)?.focus();
        return;
      }
      if (!enabled || modalOpenRef.current || e.defaultPrevented) return;
      setDismissed(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, pickerId]);

  const modalOpen = useModalOpen(enabled, stageRef);
  modalOpenRef.current = modalOpen;

  // Targets to track: every step of the current screen, plus the active step (it may belong to another screen for a moment)
  const trackedRef = useRef<GuideStep[]>([]);
  trackedRef.current = enabled ? steps.filter(s => s.screen === screen || s.id === active?.id) : [];
  const { rects, bounds } = useTargetRects(trackedRef, stageRef, enabled && !modalOpen);

  const hasRect = !!(activeKey && rects[activeKey]);

  // Bring the active target into view once per step
  useEffect(() => {
    if (!enabled || !activeKey || !activeTarget || !hasRect) return;
    const key = `${activeKey}|${screen}`;
    if (scrolledFor.current === key) return;
    scrolledFor.current = key;
    queryTarget(activeTarget)?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [enabled, activeKey, activeTarget, hasRect, screen]);

  // The stage never scrolls (the prototype scrolls inside .scroll). scrollIntoView on a position:fixed target can still scroll
  // the overflow:hidden stage and shift every overlay, so while the tour is on, snap it back.
  useEffect(() => {
    if (!enabled) return;
    const el = stageRef.current;
    if (!el) return;
    const reset = () => {
      if (el.scrollTop !== 0) el.scrollTop = 0;
      if (el.scrollLeft !== 0) el.scrollLeft = 0;
    };
    el.addEventListener("scroll", reset);
    return () => el.removeEventListener("scroll", reset);
  }, [enabled]);

  // Slide spotlight / popover for ~250ms when the active step changes while the tour is on. Not on first mount, not when the tour
  // is switched on (that placement must not animate), and never on resize. Derived during render (state adjusted before commit)
  // so the .animate class is present in the same commit that moves the popover; an effect would be one commit too late.
  const [anim, setAnim] = useState({ key: activeKey, enabled, on: false });
  if (anim.key !== activeKey || anim.enabled !== enabled) {
    setAnim({ key: activeKey, enabled, on: enabled && anim.enabled && anim.key !== activeKey });
  }
  const animate = anim.on;
  useEffect(() => {
    if (!anim.on) return;
    const t = setTimeout(() => setAnim(a => (a.on ? { ...a, on: false } : a)), 250);
    return () => clearTimeout(t);
  }, [anim.on, anim.key]);

  // Measure the popover so it can be placed / flipped
  useLayoutEffect(() => {
    const el = popRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    setPopSize(p => (p.w === w && p.h === h ? p : { w, h }));
  });

  // No steps → no guide at all (the prototype renders untouched)
  if (steps.length === 0) return <>{children}</>;

  const stepItems = tour.map((s, i) => ({
    id: s.id,
    label: `${i + 1} · ${s.title}`,
    subLabel: screenLabels?.[s.screen] ?? s.screen,
  }));

  const activeRect = active ? rects[active.id] ?? null : null;
  const showPopover = enabled && !modalOpen && !dismissed && !!active && !!activeRect && bounds.w > 0;
  const popPos = showPopover && activeRect && active
    ? placePopover(activeRect, popSize, bounds, active.placement ?? "bottom")
    : null;
  if (popPos) lastPopPos.current = popPos;
  // A dot over / under the popover is noise (and the step stays reachable from the bar), so hotspots that touch it are hidden
  const popBox = popPos ? { x: popPos.x - POP_CLEAR, y: popPos.y - POP_CLEAR, w: popSize.w + POP_CLEAR * 2, h: popSize.h + POP_CLEAR * 2 } : null;
  const hotspots = enabled && !modalOpen
    ? steps.filter(s => {
        const r = rects[s.id];
        if (!r || s.screen !== screen || (showPopover && s.id === active?.id)) return false;
        if (!popBox) return true;
        const h = hotspotBox(r);
        const overlaps = h.x < popBox.x + popBox.w && h.x + h.w > popBox.x && h.y < popBox.y + popBox.h && h.y + h.h > popBox.y;
        return !overlaps;
      })
    : [];
  const animClass = animate ? ` ${css.animate}` : "";
  const shownPos = popPos ?? lastPopPos.current;

  return (
    <div className={css.root}>
      {/* A labelled group, not role="toolbar": a toolbar promises roving tabindex / arrow-key navigation, which isn't implemented */}
      <div className={css.bar} role="group" aria-label="Prototype tour">
        <Switch checked={enabled} onChange={toggle} label="Tour" showLabel={false} />
        <span className={css.barLabel} aria-hidden="true" onClick={() => toggle(!enabled)}>Tour</span>

        {enabled && tour.length > 0 && (
          <>
            <Divider orientation="vertical" />
            <div
              role="group"
              aria-label="Jump to step"
              className={css.picker}
              onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setListOpen(false); }}
            >
              <InputSelect
                id={pickerId}
                value={active ? `${activeIndex + 1} of ${tour.length} · ${active.title}` : "Select a step"}
                onClick={() => setListOpen(o => !o)}
              />
              {listOpen && (
                <>
                  <div className={css.catcher} onClick={() => setListOpen(false)} />
                  <div className={css.stepList} onMouseDown={e => e.preventDefault()}>
                    <DropdownSelection
                      items={stepItems}
                      selectedId={active?.id}
                      onSelect={id => { setListOpen(false); goTo(id); focusPicker(); }}
                    />
                  </div>
                </>
              )}
            </div>

            <Button kind="ghost" size="regular" className={css.barBtn} disabled={activeIndex <= 0} onClick={goBack}>
              <span className={css.btnInner}><Icon name="arrow-left" size={16} />Back</span>
            </Button>
            <Button kind="ghost" size="regular" className={css.barBtn} disabled={activeIndex < 0 || activeIndex >= tour.length - 1} onClick={goNext}>
              <span className={css.btnInner}>Next<Icon name="arrow-right" size={16} /></span>
            </Button>
            <Divider orientation="vertical" />
            <Button kind="ghost" size="regular" className={css.barBtn} onClick={restart}>
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

      <div ref={stageRef} className={css.stage}>
        <div className={css.scroll}>{children}</div>
        {enabled && !modalOpen && (
          <div className={css.overlay}>
            {showPopover && activeRect && (
              <div
                className={`${css.spotlight}${animClass}`}
                style={{ left: activeRect.x - SPOT_PAD, top: activeRect.y - SPOT_PAD, width: activeRect.w + SPOT_PAD * 2, height: activeRect.h + SPOT_PAD * 2 }}
              />
            )}

            {/* Popover first, hotspots after it: hotspots stack above the popover so a hotspot is never hidden under it */}
            {active && (
              <div
                ref={popRef}
                className={`${css.popover}${animClass}`}
                role="group"
                aria-label={active.title}
                style={{ width: POPOVER_W, left: shownPos.x, top: shownPos.y, visibility: popPos ? "visible" : "hidden" }}
              >
                <Tile tileStyle="object-light" padding="content">
                  <div className={css.popHead}>
                    <Header size="content" title={active.title} />
                    <PillSimple label={`${activeIndex + 1} of ${tour.length}`} size="small" />
                  </div>
                  <span className={css.popBody}>{active.body}</span>
                </Tile>
              </div>
            )}

            {hotspots.map(s => {
              const box = hotspotBox(rects[s.id]!);
              const inTour = tour.some(t => t.id === s.id);
              return (
                <div key={s.id} className={css.hotspotAnchor} style={{ left: box.x, top: box.y }}>
                  <Tooltip content={s.title} placement="up-center" maxWidth={240}>
                    <button
                      type="button"
                      className={css.hotspot}
                      aria-label={s.title}
                      onClick={() => { if (inTour) goTo(s.id); }}
                    >
                      <span className={css.hotspotDot}><Icon name="dot-big" size={16} /></span>
                    </button>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
