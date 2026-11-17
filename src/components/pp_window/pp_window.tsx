// PPWindow — floating ProPilot window
// Source: propilot-be / propilot-profile prototypes (ProPilotWindow)
//
// Glass gradient window, fixed on screen. Header with the ProPilot mark, title, dock and close buttons (drag the header to move it);
// a glass chat area for `children` (scrolls, newest content anchored to the bottom); a glass input row with a send button.
// Resizable from every edge and corner. Size follows the viewport (32% × 62%, never below 460 × 560) until the user resizes it.
//
// Chat content is up to the consumer: PPBubble for the user's messages, plain text for ProPilot's, PPSuggestionCard / PPConflictBlock
// for suggestions, PPThinking while ProPilot works. Use the "dark" variant of those inside this window.

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../icon/icon";
import css from "./pp_window.module.scss";

export const ProPilotMark = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 34 36" fill="none" aria-hidden="true">
    <path d="M25.095 5C30.0202 5.04073 34.0003 9.03735 34.0003 13.9609C34.0002 18.833 30.1031 22.7943 25.2493 22.916L25.2503 22.9219H15.7346L14.8548 28.4727C14.7152 29.3524 13.9564 30 13.0657 30C11.9524 29.9999 11.1024 29.0048 11.2766 27.9053L12.6399 19.3066H25.0178C27.9772 19.3066 30.3781 16.9135 30.3782 13.9609C30.3782 11.0082 27.9783 8.61523 25.0188 8.61523H16.6194C15.5171 8.61523 14.6709 7.63656 14.8303 6.5459C14.9602 5.65817 15.7222 5 16.6194 5H25.095Z" fill="white"/>
    <path d="M24.7931 9.66858C27.2105 9.66884 29.1704 11.5905 29.1704 13.9609C29.1704 16.3311 27.2105 18.2529 24.7931 18.2531H11.7707L10.1076 28.4173C9.95827 29.33 9.16965 30 8.24482 30C7.07282 30 6.18413 28.9431 6.38528 27.7885L8.45099 15.9314C8.58122 15.1839 9.23008 14.6383 9.98883 14.6383H24.7931C25.1264 14.638 25.4163 14.2934 25.4163 13.9609C25.4163 13.6283 25.1264 13.2837 24.7931 13.2834H16.0154C14.9133 13.2834 14.0678 12.3055 14.227 11.215C14.3566 10.327 15.118 9.66858 16.0154 9.66858H24.7931Z" fill="white"/>
    <path d="M24 26L25.3505 29.6495L29 31L25.3505 32.3505L24 36L22.6495 32.3505L19 31L22.6495 29.6495L24 26Z" fill="white"/>
    <path d="M4.5 6L5.71541 9.28459L9 10.5L5.71541 11.7154L4.5 15L3.28459 11.7154L0 10.5L3.28459 9.28459L4.5 6Z" fill="white"/>
    <path d="M10.5 0L11.4453 2.55468L14 3.5L11.4453 4.44532L10.5 7L9.55468 4.44532L7 3.5L9.55468 2.55468L10.5 0Z" fill="white"/>
  </svg>
);

const MIN_W = 460;
const MIN_H = 560;
const HANDLE = 6;

// 32% × 62% of the viewport, growing at half that rate beyond the minimum
const calcSize = () => {
  const rawW = Math.round(window.innerWidth * 0.32);
  const rawH = Math.round(window.innerHeight * 0.62);
  return {
    w: Math.round(MIN_W + Math.max(0, rawW - MIN_W) * 0.5),
    h: Math.round(MIN_H + Math.max(0, rawH - MIN_H) * 0.5),
  };
};

export type PPWindowProps = {
  /** Chat content (messages, suggestions, PPThinking) */
  children?: React.ReactNode;
  /** Header title. Default "ProPilot". */
  title?: string;
  /** Click on the close button */
  onClose?: () => void;
  /** Click on the dock button (the button is hidden when omitted) */
  onDock?: () => void;
  /** Input row */
  inputValue?: string;
  onInputChange?: (value: string) => void;
  /** Called with the text when send is clicked or Enter is pressed */
  onSend?: (value: string) => void;
  inputPlaceholder?: string;
  className?: string;
};

export function PPWindow({
  children,
  title = "ProPilot",
  onClose,
  onDock,
  inputValue = "",
  onInputChange,
  onSend,
  inputPlaceholder = "Ask ProPilot",
  className,
}: PPWindowProps) {
  const [size, setSize] = useState(calcSize);
  const [pos, setPos] = useState(() => ({ x: 84, y: Math.max(0, window.innerHeight - calcSize().h - 24) }));
  const userResized = useRef(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const [vh, setVh] = useState(() => window.innerHeight);

  // The window is position: fixed, but a host can shift its containing block (e.g. a bar above the prototype stage, or a transformed
  // parent). Measure where it really landed and move it up so its bottom edge keeps 24px from the bottom of the screen.
  useLayoutEffect(() => {
    const el = winRef.current;
    if (!el) return;
    const over = el.getBoundingClientRect().bottom - (window.innerHeight - 24);
    if (over > 1) setPos(p => ({ ...p, y: Math.max(0, p.y - over) }));
  }, [size.w, size.h, vh]);

  // Follow the viewport until the user resizes the window by hand
  useEffect(() => {
    const onViewport = () => {
      setVh(window.innerHeight);
      if (userResized.current) return;
      const next = calcSize();
      setSize(next);
      setPos(p => ({ x: p.x, y: Math.max(0, window.innerHeight - next.h - 24) }));
    };
    window.addEventListener("resize", onViewport);
    return () => window.removeEventListener("resize", onViewport);
  }, []);

  // Keep the newest content in view
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  const onHeaderMouseDown = (e: React.MouseEvent) => {
    const start = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y };
    const move = (me: MouseEvent) => setPos({ x: start.ox + me.clientX - start.x, y: start.oy + me.clientY - start.y });
    const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const onResizeMouseDown = (e: React.MouseEvent, dir: string) => {
    e.stopPropagation();
    userResized.current = true;
    const s = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y, ow: size.w, oh: size.h };
    const move = (me: MouseEvent) => {
      const dx = me.clientX - s.x, dy = me.clientY - s.y;
      let x = s.ox, y = s.oy, w = s.ow, h = s.oh;
      if (dir.includes("e")) w = Math.max(MIN_W, s.ow + dx);
      if (dir.includes("s")) h = Math.max(MIN_H, s.oh + dy);
      if (dir.includes("w")) { w = Math.max(MIN_W, s.ow - dx); x = s.ox + s.ow - w; }
      if (dir.includes("n")) { h = Math.max(MIN_H, s.oh - dy); y = s.oy + s.oh - h; }
      setSize({ w, h });
      setPos({ x, y });
    };
    const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const handle = (dir: string, style: React.CSSProperties) => (
    <div className={css.handle} onMouseDown={e => onResizeMouseDown(e, dir)} style={style} aria-hidden="true" />
  );

  const send = () => { if (inputValue.trim()) onSend?.(inputValue); };

  return (
    <div
      ref={winRef}
      className={[css.window, className].filter(Boolean).join(" ")}
      style={{ left: pos.x, top: pos.y, width: size.w, height: size.h }}
      role="dialog"
      aria-label={title}
    >
      {/* Resize handles: edges, then corners */}
      {handle("n",  { top: -HANDLE / 2, left: HANDLE, right: HANDLE, height: HANDLE, cursor: "n-resize" })}
      {handle("s",  { bottom: -HANDLE / 2, left: HANDLE, right: HANDLE, height: HANDLE, cursor: "s-resize" })}
      {handle("w",  { left: -HANDLE / 2, top: HANDLE, bottom: HANDLE, width: HANDLE, cursor: "w-resize" })}
      {handle("e",  { right: -HANDLE / 2, top: HANDLE, bottom: HANDLE, width: HANDLE, cursor: "e-resize" })}
      {handle("nw", { top: -HANDLE / 2, left: -HANDLE / 2, width: HANDLE * 2, height: HANDLE * 2, cursor: "nw-resize" })}
      {handle("ne", { top: -HANDLE / 2, right: -HANDLE / 2, width: HANDLE * 2, height: HANDLE * 2, cursor: "ne-resize" })}
      {handle("sw", { bottom: -HANDLE / 2, left: -HANDLE / 2, width: HANDLE * 2, height: HANDLE * 2, cursor: "sw-resize" })}
      {handle("se", { bottom: -HANDLE / 2, right: -HANDLE / 2, width: HANDLE * 2, height: HANDLE * 2, cursor: "se-resize" })}

      {/* Header — drag to move */}
      <div className={css.header} onMouseDown={onHeaderMouseDown}>
        <div className={css.brand}>
          <ProPilotMark />
          <span className={css.title}>{title}</span>
        </div>
        <div className={css.headerButtons}>
          {onDock && (
            <button type="button" className={css.headerBtn} title="Dock to side" onMouseDown={e => e.stopPropagation()} onClick={onDock}>
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
                <rect x="0.6" y="0.6" width="11.8" height="10.8" rx="1.4" stroke="white" strokeOpacity="0.85" strokeWidth="1.2" />
                <line x1="8.5" y1="0.6" x2="8.5" y2="11.4" stroke="white" strokeOpacity="0.85" strokeWidth="1.2" />
              </svg>
            </button>
          )}
          <button type="button" className={`${css.headerBtn} ${css.headerBtnClose}`} title="Close" onMouseDown={e => e.stopPropagation()} onClick={onClose}>
            <Icon name="cross" size={14} style={{ color: "white" }} />
          </button>
        </div>
      </div>

      {/* Chat area — scrolls, content anchored to the bottom */}
      <div className={`${css.glass} ${css.chat}`} ref={chatRef}>
        <div className={css.chatSpacer} />
        {children}
      </div>

      {/* Input row */}
      <div className={`${css.glass} ${css.inputRow}`}>
        <input
          className={css.input}
          value={inputValue}
          placeholder={inputPlaceholder}
          onChange={e => onInputChange?.(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") send(); }}
        />
        <div className={css.inputDivider} />
        <button type="button" className={css.sendBtn} aria-label="Send" onClick={send}>
          <Icon name="paper-plane" size={14} style={{ color: "white" }} />
        </button>
      </div>
    </div>
  );
}
