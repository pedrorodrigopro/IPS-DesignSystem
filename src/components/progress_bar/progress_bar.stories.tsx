import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { ProgressLinear, ProgressRadial } from "./progress_bar";

export default {
  title: "Components/Progress Bar",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1615-51769",
    },
    layout: "centered",
  },
};

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{label}</div>
    {children}
  </div>
);

// ── Linear — Figma variants (0–100%) ─────────────────────────────────────────

export const LinearDefault: StoryFn = () => (
  <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
      <ProgressLinear key={v} value={v} showLabel />
    ))}
  </div>
);

export const LinearSemantic: StoryFn = () => (
  <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
    <Row label="Semantic colours (0–100%)">
      {[0, 10, 33, 34, 50, 66, 67, 85, 99, 100].map((v) => (
        <div key={v} style={{ marginBottom: 8 }}>
          <ProgressLinear value={v} showLabel semantic />
        </div>
      ))}
    </Row>
  </div>
);

export const LinearInteractive: StoryFn = () => {
  const [value, setValue] = useState(50);
  return (
    <div style={{ width: 320, padding: 24 }}>
      <ProgressLinear value={value} showLabel />
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ width: "100%", marginTop: 16 }}
      />
      <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E", textAlign: "center", marginTop: 4 }}>{value}%</div>
    </div>
  );
};

export const LinearSemanticInteractive: StoryFn = () => {
  const [value, setValue] = useState(50);
  return (
    <div style={{ width: 320, padding: 24 }}>
      <ProgressLinear value={value} showLabel semantic />
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ width: "100%", marginTop: 16 }}
      />
      <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E", textAlign: "center", marginTop: 4 }}>{value}%</div>
    </div>
  );
};

// ── Radial — Figma variants ───────────────────────────────────────────────────

export const RadialDefault: StoryFn = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 16 }}>
    {[0, 25, 50, 75, 100].map((v) => (
      <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <ProgressRadial value={v} />
        <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1" }}>{v}%</span>
      </div>
    ))}
  </div>
);

export const RadialWithLabel: StoryFn = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 16 }}>
    {[0, 25, 50, 75, 100].map((v) => (
      <ProgressRadial key={v} value={v} showLabel size={56} />
    ))}
  </div>
);

export const RadialSemantic: StoryFn = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 16 }}>
    {[0, 20, 50, 80, 100].map((v) => (
      <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <ProgressRadial value={v} semantic showLabel size={56} />
        <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1" }}>{v}%</span>
      </div>
    ))}
  </div>
);

export const RadialInteractive: StoryFn = () => {
  const [value, setValue] = useState(50);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: 24 }}>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <ProgressRadial value={value} showLabel size={56} />
        <ProgressRadial value={value} showLabel size={56} semantic />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ width: 200 }}
      />
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "#5C6E9E" }}>{value}%</span>
    </div>
  );
};

// ── Both together ─────────────────────────────────────────────────────────────

export const AllVariants: StoryFn = () => (
  <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 32 }}>
    <Row label="Linear — default colour">
      <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 10 }}>
        {[0, 25, 50, 75, 100].map((v) => <ProgressLinear key={v} value={v} showLabel />)}
      </div>
    </Row>
    <Row label="Linear — semantic colours">
      <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 10 }}>
        {[0, 25, 50, 75, 100].map((v) => <ProgressLinear key={v} value={v} showLabel semantic />)}
      </div>
    </Row>
    <Row label="Radial — default colour">
      <div style={{ display: "flex", gap: 16 }}>
        {[0, 25, 50, 75, 100].map((v) => <ProgressRadial key={v} value={v} />)}
      </div>
    </Row>
    <Row label="Radial — semantic colours">
      <div style={{ display: "flex", gap: 16 }}>
        {[0, 25, 50, 75, 100].map((v) => <ProgressRadial key={v} value={v} semantic />)}
      </div>
    </Row>
  </div>
);
