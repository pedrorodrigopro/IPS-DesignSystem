import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Input, InputBookingCategory, InputInline, InputMultiselect, InputSearch, InputSelect } from "./input";

export default {
  title: "Components/Input",
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1779-112429" },
    layout: "centered",
  },
} satisfies Meta;

// ── Text field — all states (no chevron) ──────────────────────────────────────

export const TextFieldStates: StoryFn = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 283 }}>
    <Input label="Label" value="Value" state="default" />
    <Input label="Label" value="Value" state="default" mandatory />
    <Input label="Label" value="Value" state="error" message="Error message" />
    <Input label="Label" state="warning" message="Missing translation" />
    <Input label="Label" state="instructions" message="Instructions" />
    <Input label="Label" value="Value" readOnly />
  </div>
);

export const TextFieldInteractive: StoryFn = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: 283 }}>
      <Input
        label="Label"
        value={value}
        placeholder="Type something…"
        onChange={(e) => setValue(e.target.value)}
        mandatory
      />
    </div>
  );
};

// ── Select — with chevron ─────────────────────────────────────────────────────

export const Select: StoryFn = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 283 }}>
    <InputSelect label="Label" value="Value" />
    <InputSelect label="Label" placeholder="Select…" />
    <InputSelect label="Label" value="Value" mandatory />
    <InputSelect label="Label" value="Value" state="error" message="Error message" />
    <InputSelect label="Label" state="warning" message="Missing translation" />
    <InputSelect label="Label" value="Value" readOnly />
  </div>
);

// ── Search ────────────────────────────────────────────────────────────────────

export const Search: StoryFn = () => {
  const [value, setValue] = useState("test search");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 283 }}>
      {/* Searching=False */}
      <InputSearch placeholder="Search" value="" />
      {/* Searching=True — cross + searched term */}
      <InputSearch
        value={value}
        placeholder="Search"
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
      />
    </div>
  );
};

// ── Multiselect ───────────────────────────────────────────────────────────────

export const Multiselect: StoryFn = () => {
  const [tags, setTags] = useState([
    { id: "1", label: "Draft" },
    { id: "2", label: "Draft" },
    { id: "3", label: "Draft" },
    { id: "4", label: "Draft" },
  ]);
  return (
    <div style={{ width: 600 }}>
      <InputMultiselect
        label="State"
        mandatory
        tags={tags}
        onRemoveTag={(id) => setTags(tags.filter((t) => t.id !== id))}
        onClearAll={() => setTags([])}
      />
    </div>
  );
};

// ── Booking category ──────────────────────────────────────────────────────────

export const BookingCategory: StoryFn = () => (
  <div style={{ width: 307 }}>
    <InputBookingCategory
      label="Category"
      mandatory
      selectedLabel="Default"
      selectedColor="#A8C5F5"
      onClick={() => {}}
    />
  </div>
);

// ── Inline label ──────────────────────────────────────────────────────────────

export const InlineLabel: StoryFn = () => (
  <div style={{ width: 283 }}>
    <InputInline inlineLabel="Label" value="Value" onClick={() => {}} />
  </div>
);

// ── All variants ──────────────────────────────────────────────────────────────

export const AllVariants: StoryFn = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
    <Row label="Text field"><Input label="Label" value="Value" mandatory /></Row>
    <Row label="Select"><InputSelect label="Label" value="Value" mandatory /></Row>
    <Row label="Search"><InputSearch placeholder="Search" value="" /></Row>
    <Row label="Multiselect"><InputMultiselect label="State" tags={[{ id: "1", label: "Draft" }, { id: "2", label: "Draft" }]} mandatory /></Row>
    <Row label="Booking category"><InputBookingCategory label="Category" mandatory selectedLabel="Default" selectedColor="#A8C5F5" /></Row>
    <Row label="Inline label"><InputInline inlineLabel="Label" value="Value" /></Row>
  </div>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <div style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>{label}</div>
    <div style={{ width: 283 }}>{children}</div>
  </div>
);
