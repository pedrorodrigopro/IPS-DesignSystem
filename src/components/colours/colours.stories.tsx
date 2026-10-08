// Colours — Figma node 4928:136651
// Canonical IPS design system palette. All components use these tokens.
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Tokens/Colours",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=4928-136651",
    },
    controls: { hideNoControlsWarning: true },
  },
};

type SwatchGroup = {
  label: string;
  swatches: { token: string; hex: string; name: string }[];
};

const groups: SwatchGroup[] = [
  {
    label: "Primary",
    swatches: [
      { token: "--palette-primary-0",      hex: "#2358F8", name: "Primary 0" },
      { token: "--palette-primary-1",      hex: "#1531B8", name: "Primary 1" },
      { token: "--palette-primary-2",      hex: "#4B75FF", name: "Primary 2" },
      { token: "--palette-primary-3",      hex: "#E7F9FE", name: "Primary 3" },
      { token: "--palette-primary-5",      hex: "#436FB6", name: "Primary 5" },
      { token: "--palette-primary-action", hex: "#6EF29C", name: "Primary Action" },
    ],
  },
  {
    label: "Blue",
    swatches: [
      { token: "--palette-blue-0", hex: "#0D2976", name: "Blue 0" },
      { token: "--palette-blue-1", hex: "#0C1457", name: "Blue 1" },
      { token: "--palette-blue-2", hex: "#5C6E9E", name: "Blue 2" },
      { token: "--palette-blue-3", hex: "#31A2CE", name: "Blue 3" },
    ],
  },
  {
    label: "Black",
    swatches: [
      { token: "--palette-black-0", hex: "#000000", name: "Black 0" },
      { token: "--palette-black-1", hex: "#333333", name: "Black 1" },
    ],
  },
  {
    label: "White",
    swatches: [
      { token: "--palette-white-0", hex: "#FFFFFF", name: "White 0" },
      { token: "--palette-white-1", hex: "#F7F7F8", name: "White 1" },
      { token: "--palette-white-2", hex: "#ECECEC", name: "White 2" },
      { token: "--palette-white-3", hex: "#D5D5D5", name: "White 3" },
    ],
  },
  {
    label: "Red",
    swatches: [
      { token: "--palette-red-0", hex: "#D42A36", name: "Red 0" },
      { token: "--palette-red-1", hex: "#A30013", name: "Red 1" },
      { token: "--palette-red-2", hex: "#FFE2E2", name: "Red 2" },
      { token: "--palette-red-3", hex: "#FF0000", name: "Red 3" },
    ],
  },
  {
    label: "Orange",
    swatches: [
      { token: "--palette-orange-0", hex: "#FFCD38", name: "Orange 0" },
      { token: "--palette-orange-1", hex: "#9B5A01", name: "Orange 1" },
      { token: "--palette-orange-2", hex: "#FFE8AD", name: "Orange 2" },
      { token: "--palette-orange-3", hex: "#FF6B00", name: "Orange 3" },
      { token: "--palette-orange-4", hex: "#FFE606", name: "Orange 4" },
    ],
  },
  {
    label: "Green",
    swatches: [
      { token: "--palette-green-0", hex: "#248E61", name: "Green 0" },
      { token: "--palette-green-1", hex: "#1F6648", name: "Green 1" },
      { token: "--palette-green-2", hex: "#C8EEDE", name: "Green 2" },
    ],
  },
  {
    label: "Neutral",
    swatches: [
      { token: "--palette-neutral-0", hex: "#CFDAF7", name: "Neutral 0" },
      { token: "--palette-neutral-1", hex: "#E7EAF8", name: "Neutral 1" },
      { token: "--palette-neutral-2", hex: "#F8F9FD", name: "Neutral 2" },
      { token: "--palette-neutral-3", hex: "#8F9ED1", name: "Neutral 3" },
    ],
  },
  {
    label: "Reserved",
    swatches: [
      { token: "--palette-reserved-0", hex: "#1F363D", name: "Reserved 0" },
      { token: "--palette-reserved-1", hex: "#5E7A83", name: "Reserved 1" },
      { token: "--palette-reserved-2", hex: "#40798C", name: "Reserved 2" },
      { token: "--palette-reserved-3", hex: "#70A9A1", name: "Reserved 3" },
    ],
  },
  {
    label: "Echarts",
    swatches: [
      { token: "--palette-echarts-0", hex: "#5470C6", name: "Echarts 0" },
      { token: "--palette-echarts-1", hex: "#91CC75", name: "Echarts 1" },
      { token: "--palette-echarts-2", hex: "#FAC858", name: "Echarts 2" },
      { token: "--palette-echarts-3", hex: "#EE6666", name: "Echarts 3" },
      { token: "--palette-echarts-4", hex: "#73C0DE", name: "Echarts 4" },
      { token: "--palette-echarts-5", hex: "#3BA272", name: "Echarts 5" },
      { token: "--palette-echarts-6", hex: "#FC8452", name: "Echarts 6" },
      { token: "--palette-echarts-7", hex: "#9A60B4", name: "Echarts 7" },
    ],
  },
  {
    label: "Transparency",
    swatches: [
      { token: "--palette-trans-0",       hex: "rgba(0,0,0,0.04)",     name: "Trans 0 (4%)" },
      { token: "--palette-trans-1",       hex: "rgba(0,0,0,0.08)",     name: "Trans 1 (8%)" },
      { token: "--palette-trans-2",       hex: "rgba(0,0,0,0.12)",     name: "Trans 2 (12%)" },
      { token: "--palette-trans-light-0", hex: "rgba(255,255,255,0.04)", name: "Trans Light 0" },
    ],
  },
];

const Swatch = ({ token, hex, name }: { token: string; hex: string; name: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 88 }}>
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 8,
        background: `var(${token})`,
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    />
    <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, lineHeight: 1.4 }}>
      <div style={{ fontWeight: 700, color: "#0D2976" }}>{name}</div>
      <div style={{ color: "#8F9ED1", fontFamily: "monospace", fontSize: 10 }}>{token}</div>
      <div style={{ color: "#8F9ED1", fontFamily: "monospace", fontSize: 10 }}>{hex}</div>
    </div>
  </div>
);

export const AllColours: StoryFn = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
    {groups.map((group) => (
      <div key={group.label}>
        <h3 style={{
          fontFamily: "Mulish, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          color: "#8F9ED1",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 12,
        }}>
          {group.label}
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {group.swatches.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </div>
    ))}
  </div>
);
