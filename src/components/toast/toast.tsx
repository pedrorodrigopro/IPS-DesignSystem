// Toast — Figma node 1465:25421 (Notification/Toast component set)
//
// Types: success | warning | error
// Layout: fixed bottom-centre, z-index 9000
// Content: [icon 20×20] [bold white text] [cross close button]
// Border-radius: 8px
// Left padding: 16px, gap: 10px
// Right padding: 8px (close button area)
// Text: New/Body bold (14px 700 Mulish, white; warning uses #0D2976)
//
// Colours (from Figma globalVars):
//   success: bg #0D2976, icon check, text/icon white
//   warning: bg #FFCD38, icon warning, text/icon #0D2976
//   error:   bg #A30013, icon error,   text/icon white
//
// Animation:
//   - Mount: slides up from bottom (translateY(100%) → translateY(0)), opacity 0→1, 300ms ease-out
//   - Auto-dismiss after 5 000ms (configurable via duration prop)
//   - Dismiss: slides back down (translateY(0) → translateY(120%)), opacity 1→0, 250ms ease-in
//   - onClose fires after the dismiss animation completes
//
// Usage (imperative via ToastProvider + useToast):
//   const { showToast } = useToast();
//   showToast({ type: "success", message: "Saved successfully" });

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { Icon } from "../icon/icon";
import css from "./toast.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "warning" | "error";

export type ToastOptions = {
  type: ToastType;
  message: string;
  /** Auto-dismiss delay in ms. Defaults to 5000. Set to 0 to disable. */
  duration?: number;
};

type ToastEntry = ToastOptions & { id: number };

// ── Icon map ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<ToastType, Parameters<typeof Icon>[0]["name"]> = {
  success: "check",
  warning: "warning",
  error:   "error",
};

// ── Single Toast item ─────────────────────────────────────────────────────────

type ToastItemProps = {
  entry: ToastEntry;
  onDismiss: (id: number) => void;
};

function ToastItem({ entry, onDismiss }: ToastItemProps) {
  // "visible" drives the CSS animation class
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Trigger enter animation on mount (needs a frame delay so CSS transition fires)
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    // Wait for exit animation (250ms) before calling onDismiss
    setTimeout(() => onDismiss(entry.id), 260);
  }, [entry.id, onDismiss]);

  // Auto-dismiss
  useEffect(() => {
    const duration = entry.duration ?? 5000;
    if (duration <= 0) return;
    timerRef.current = setTimeout(dismiss, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismiss, entry.duration]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={classNames(
        css.toast,
        css[entry.type],
        visible ? css.visible : css.hidden
      )}
    >
      {/* Left — icon + message */}
      <div className={css.left}>
        <Icon name={ICON_MAP[entry.type]} size={20} className={css.typeIcon} />
        <span className={css.message}>{entry.message}</span>
      </div>

      {/* Right — close button */}
      <div className={css.right}>
        <button
          type="button"
          className={css.closeBtn}
          aria-label="Close notification"
          onClick={dismiss}
        >
          <Icon name="cross" size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Context ───────────────────────────────────────────────────────────────────

type ToastContextValue = {
  showToast: (options: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let _nextId = 1;

// ── Provider ──────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const showToast = useCallback((options: ToastOptions) => {
    const id = _nextId++;
    setToasts((prev) => [...prev, { ...options, id }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Portal-like fixed container — bottom-centre of the viewport */}
      <div className={css.container} aria-label="Notifications">
        {toasts.map((entry) => (
          <ToastItem key={entry.id} entry={entry} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}

// ── Standalone Toast (for Storybook / direct usage) ───────────────────────────
// Renders a single toast in-place (no portal, no provider needed).

export type ToastProps = {
  type: ToastType;
  message: string;
  /** Whether the toast is currently visible */
  visible?: boolean;
  onClose?: () => void;
  className?: string;
};

export function Toast({ type, message, visible = true, onClose, className }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={classNames(
        css.toast,
        css[type],
        visible ? css.visible : css.hidden,
        className
      )}
    >
      <div className={css.left}>
        <Icon name={ICON_MAP[type]} size={20} className={css.typeIcon} />
        <span className={css.message}>{message}</span>
      </div>
      <div className={css.right}>
        <button
          type="button"
          className={css.closeBtn}
          aria-label="Close notification"
          onClick={onClose}
        >
          <Icon name="cross" size={14} />
        </button>
      </div>
    </div>
  );
}
