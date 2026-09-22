import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { LoadingIcon, LoadingOverlay } from "./loading";

export default {
  title: "Components/Loading",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1890-123451",
    },
  },
} satisfies Meta;

// ── Loading icon (1981:166760) ────────────────────────────────────────────────
// Inline 32×32px — 3 dots at 8px each, gap 4px

export const Icon: StoryFn = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 24 }}>
    <LoadingIcon />
    <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976" }}>
      Loading…
    </span>
  </div>
);

// ── Loading overlay (1890:123451) ─────────────────────────────────────────────
// Full-screen, rgba(248,249,253,0.75), dots 24px, padding-top 160px

export const Overlay: StoryFn = () => {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ position: "relative", width: "100%", height: 400, background: "#E7EAF8", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976" }}>
        Content behind the overlay
      </p>
      {visible && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(248,249,253,0.75)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 80 }}>
          {/* Dots at overlay size */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: 24, height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#0C1457",
                  animation: "bounce 1.4s ease-in-out infinite both",
                  animationDelay: `${[-0.32, -0.16, 0][i]}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        style={{
          position: "absolute", bottom: 16, right: 16,
          padding: "8px 16px", borderRadius: 8, border: "1px solid #CFDAF7",
          background: "white", cursor: "pointer",
          fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976",
        }}
      >
        {visible ? "Hide overlay" : "Show overlay"}
      </button>
    </div>
  );
};

// ── Loading overlay component ─────────────────────────────────────────────────

export const OverlayComponent: StoryFn = () => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ padding: 24 }}>
      <button
        type="button"
        onClick={() => { setShow(true); setTimeout(() => setShow(false), 3000); }}
        style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: "#2358F8", cursor: "pointer",
          fontFamily: "Mulish, sans-serif", fontSize: 14, color: "white",
        }}
      >
        Trigger loading (3s)
      </button>
      <LoadingOverlay visible={show} />
    </div>
  );
};

// ── All variants ──────────────────────────────────────────────────────────────

export const AllVariants: StoryFn = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
    <div>
      <div style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
        Loading icon (32×32px, 8px dots)
      </div>
      <LoadingIcon />
    </div>
    <div>
      <div style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
        In context (e.g. inside a row)
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", border: "1px solid #CFDAF7", borderRadius: 8, width: "fit-content" }}>
        <LoadingIcon />
        <span style={{ fontFamily: "Mulish", fontSize: 14, color: "#5C6E9E" }}>Loading results…</span>
      </div>
    </div>
  </div>
);
