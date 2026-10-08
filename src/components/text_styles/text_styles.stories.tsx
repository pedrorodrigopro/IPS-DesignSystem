// Text Styles — Figma node 4949:136702
// Canonical IPS typography. All components use these via SCSS mixins in text-styles.scss.
import type { Meta, StoryFn } from "@storybook/react";
import css from "./text_styles.module.scss";

export default {
  title: "Tokens/Text Styles",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=4949-136702",
    },
    controls: { hideNoControlsWarning: true },
  },
};

type StyleEntry = {
  name: string;
  cssClass: string;
  size: string;
  weight: string;
  lineHeight: string;
  usage: string;
};

const styles: StyleEntry[] = [
  // Labels
  { name: "label-small-regular", cssClass: "labelSmallRegular", size: "10px", weight: "400 Regular",  lineHeight: "115%", usage: "Chart labels" },
  { name: "label-small-bold",    cssClass: "labelSmallBold",    size: "10px", weight: "700 Bold",     lineHeight: "115%", usage: "Breadcrumbs" },
  { name: "label-regular",       cssClass: "labelRegular",       size: "12px", weight: "400 Regular",  lineHeight: "150%", usage: "Secondary text, input labels, instructions" },
  { name: "label-bold",          cssClass: "labelBold",          size: "12px", weight: "700 Bold",     lineHeight: "150%", usage: "Secondary text emphasized" },
  { name: "label-selected",      cssClass: "labelSelected",      size: "12px", weight: "700 Bold",     lineHeight: "115%", usage: "Small button labels" },
  { name: "label-unselected",    cssClass: "labelUnselected",    size: "12px", weight: "400 Regular",  lineHeight: "115%", usage: "Small button labels (unselected)" },
  // Body
  { name: "body-regular",        cssClass: "bodyRegular",        size: "14px", weight: "400 Regular",  lineHeight: "150%", usage: "Body text, unselected tabs/toggles" },
  { name: "body-bold",           cssClass: "bodyBold",           size: "14px", weight: "700 Bold",     lineHeight: "150%", usage: "Body text emphasized" },
  { name: "body-selected",       cssClass: "bodySelected",       size: "14px", weight: "700 Bold",     lineHeight: "115%", usage: "Regular button labels, selected tabs/toggles" },
  { name: "body-unselected",     cssClass: "bodyUnselected",     size: "14px", weight: "400 Regular",  lineHeight: "115%", usage: "Regular button labels (unselected)" },
  // Headings
  { name: "heading-6",           cssClass: "heading6",           size: "15px", weight: "600 SemiBold", lineHeight: "125%", usage: "Tertiary titles" },
  { name: "heading-5",           cssClass: "heading5",           size: "16px", weight: "600 SemiBold", lineHeight: "125%", usage: "Tertiary titles" },
  { name: "heading-4",           cssClass: "heading4",           size: "20px", weight: "600 SemiBold", lineHeight: "125%", usage: "Secondary titles" },
  { name: "heading-3",           cssClass: "heading3",           size: "24px", weight: "600 SemiBold", lineHeight: "125%", usage: "Section content titles" },
  { name: "heading-2",           cssClass: "heading2",           size: "28px", weight: "600 SemiBold", lineHeight: "125%", usage: "Page section titles" },
  { name: "heading-1",           cssClass: "heading1",           size: "32px", weight: "600 SemiBold", lineHeight: "125%", usage: "Page titles" },
];

export const AllTextStyles: StoryFn = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 0, padding: 24 }}>
    {styles.map((s) => (
      <div
        key={s.name}
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 24,
          padding: "16px 0",
          borderBottom: "1px solid var(--palette-neutral-0)",
          alignItems: "start",
        }}
      >
        {/* Meta column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: "var(--palette-blue-0)" }}>
            {s.name}
          </span>
          <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "var(--palette-neutral-3)" }}>
            {s.size} · {s.weight} · {s.lineHeight}
          </span>
          <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "var(--palette-neutral-3)", marginTop: 2 }}>
            {s.usage}
          </span>
        </div>
        {/* Preview column */}
        <span className={css[s.cssClass]}>
          The quick brown fox jumps over the lazy dog
        </span>
      </div>
    ))}
  </div>
);
