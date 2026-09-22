import type { Meta, StoryFn } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=3134-190313",
    },
  },
  argTypes: {
    kind: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "destructive", "ghost", "inverted", "link", "icon", "iconTertiary", "iconGhost"],
    },
    size: { control: "select", options: ["regular", "small"] },
  },
} satisfies Meta<typeof Button>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
    {children}
  </div>
);

const DarkBg = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "var(--palette-blue-0)", padding: 16, borderRadius: 8, display: "flex", gap: 8, alignItems: "center" }}>
    {children}
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, fontWeight: 700, color: "var(--palette-neutral-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
    {children}
  </span>
);

// ── Regular (Button regular new — 3134:190313) ────────────────────────────────

export const Regular: StoryFn<typeof Button> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
    <SectionLabel>Regular — all types</SectionLabel>
    <Row>
      <Button size="regular" kind="primary" text="Primary" />
      <Button size="regular" kind="secondary" text="Secondary" />
      <Button size="regular" kind="tertiary" text="Tertiary" />
      <Button size="regular" kind="destructive" text="Destructive" />
      <Button size="regular" kind="ghost" text="Ghost" />
      <Button size="regular" kind="link" text="Link" />
    </Row>
    <DarkBg>
      <Button size="regular" kind="inverted" text="Inverted" />
    </DarkBg>
    <SectionLabel>Regular — disabled</SectionLabel>
    <Row>
      <Button size="regular" kind="primary" text="Primary" disabled />
      <Button size="regular" kind="secondary" text="Secondary" disabled />
      <Button size="regular" kind="destructive" text="Destructive" disabled />
      <Button size="regular" kind="ghost" text="Ghost" disabled />
    </Row>
  </div>
);

// ── Small (Button small new — 5893:33691) ─────────────────────────────────────

export const Small: StoryFn<typeof Button> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
    <SectionLabel>Small — all types</SectionLabel>
    <Row>
      <Button size="small" kind="primary" text="Primary" />
      <Button size="small" kind="secondary" text="Secondary" />
      <Button size="small" kind="tertiary" text="Tertiary" />
      <Button size="small" kind="destructive" text="Destructive" />
      <Button size="small" kind="ghost" text="Ghost" />
      <Button size="small" kind="link" text="Link" />
    </Row>
    <DarkBg>
      <Button size="small" kind="inverted" text="Inverted" />
    </DarkBg>
    <SectionLabel>Small — disabled</SectionLabel>
    <Row>
      <Button size="small" kind="primary" text="Primary" disabled />
      <Button size="small" kind="secondary" text="Secondary" disabled />
      <Button size="small" kind="destructive" text="Destructive" disabled />
      <Button size="small" kind="ghost" text="Ghost" disabled />
    </Row>
  </div>
);

// ── Side by side comparison ───────────────────────────────────────────────────

export const SizesCompared: StoryFn<typeof Button> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
    {(["primary", "secondary", "tertiary", "destructive", "ghost", "link"] as const).map((kind) => (
      <div key={kind} style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "var(--palette-neutral-3)", width: 80 }}>{kind}</span>
        <Button size="regular" kind={kind} text="Regular" />
        <Button size="small" kind={kind} text="Small" />
      </div>
    ))}
  </div>
);

export const Default: StoryFn<typeof Button> = (args) => <Button {...args} />;
Default.args = { text: "Label", kind: "primary", size: "regular" };
