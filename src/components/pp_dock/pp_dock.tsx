// PPDock — the ProPilot panel docked into the screen layout
// Source: propilot-profile prototype (ProPilotDocked)
//
// The docked twin of PPWindow: a 400px white column that sits in the page's flex row, between the Navbar and the content (the content
// shrinks to make room). Header with the ProPilot mark, title, a float button (back to the floating PPWindow) and close; a bordered
// chat area for `children` (scrolls, newest content anchored to the bottom); an input row with a send button.
//
// Chat content is up to the consumer: PPBubble for the user's messages, plain text for ProPilot's, PPSuggestionCard / PPConflictBlock for
// suggestions, PPThinking while ProPilot works. Use the "light" variant of those inside this panel.

import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { Icon } from "../icon/icon";
import { ProPilotMark } from "../pp_window/pp_window";
import css from "./pp_dock.module.scss";

export type PPDockProps = {
  /** Chat content (messages, suggestions, PPThinking) */
  children?: React.ReactNode;
  /** Header title. Default "ProPilot". */
  title?: string;
  /** Click on the close button */
  onClose?: () => void;
  /** Click on the float button: take the panel out of the layout and show the floating PPWindow (the button is hidden when omitted) */
  onFloat?: () => void;
  /** Input row */
  inputValue?: string;
  onInputChange?: (value: string) => void;
  /** Called with the text when send is clicked or Enter is pressed */
  onSend?: (value: string) => void;
  inputPlaceholder?: string;
  className?: string;
};

export function PPDock({
  children,
  title = "ProPilot",
  onClose,
  onFloat,
  inputValue = "",
  onInputChange,
  onSend,
  inputPlaceholder = "Ask ProPilot",
  className,
}: PPDockProps) {
  const chatRef = useRef<HTMLDivElement>(null);

  // Keep the newest content in view
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  const send = () => { if (inputValue.trim()) onSend?.(inputValue); };

  return (
    <aside className={classNames(css.dock, className)} aria-label={title}>
      {/* Header */}
      <div className={css.header}>
        <div className={css.brand}>
          <span className={css.mark}><ProPilotMark size={16} /></span>
          <span className={css.title}>{title}</span>
        </div>
        <div className={css.headerButtons}>
          {onFloat && (
            <button type="button" className={css.headerBtn} title="Float" aria-label="Float" onClick={onFloat}>
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
                <rect x="0.6" y="0.6" width="11.8" height="10.8" rx="1.4" stroke="currentColor" strokeWidth="1.2" />
                <line x1="8.5" y1="0.6" x2="8.5" y2="11.4" stroke="currentColor" strokeWidth="1.2" />
                <path d="M10 3.5L11.5 2M11.5 2H9.5M11.5 2V4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <button type="button" className={css.headerBtn} title="Close" aria-label="Close" onClick={onClose}>
            <Icon name="cross" size={14} />
          </button>
        </div>
      </div>

      {/* Chat area — scrolls, content anchored to the bottom */}
      <div className={css.chat} ref={chatRef}>
        <div className={css.chatSpacer} />
        {children}
      </div>

      {/* Input row */}
      <div className={css.inputRow}>
        <input
          className={css.input}
          value={inputValue}
          placeholder={inputPlaceholder}
          onChange={e => onInputChange?.(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") send(); }}
        />
        <div className={css.inputDivider} />
        <button type="button" className={css.sendBtn} aria-label="Send" onClick={send}>
          <Icon name="paper-plane" size={14} />
        </button>
      </div>
    </aside>
  );
}
