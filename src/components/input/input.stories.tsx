import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Input, InputBookingCategory, InputInline, InputMultiselect, InputSearch } from "./input";

export default {
  title: "Components/Input",
  parameters: { layout: "centered" },
} satisfies Meta;

// ── Text field — all states (Input new, 1779:112429) ──────────────────────────

export const TextFieldStates: StoryFn = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 283 }}>
    <Input label="Label" value="Value" state="default" showChevron />
    <Input label="Label" value="Value" state="default" showChevron />
    {/* Hover — visual only in Figma */}
    <Input label="Label" value="Value" state="error" message="Error message" showChevron />
    <Input label="Label" value="Value" state="error" message="Error message" showChevron />
    <Input label="Label" state="warning" message="Missing translation" />
    <Input label="Label" state="warning" message="Missing translation" />
    <Input label="Label" state="instructions" message="Instructions" />
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
        placeholder="Type something..."
        onChange={(e) => setValue(e.target.value)}
        showChevron
      />
    </div>
  );
};

// ── Search (13240:87513) ──────────────────────────────────────────────────────

export const Search: StoryFn = () => {
  const [value, setValue] = useState("test search");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 283 }}>
      {/* Searching=False — magnifying glass */}
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

// ── Multiselect (12657:591296) ────────────────────────────────────────────────

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
        tags={tags}
        onRemoveTag={(id) => setTags(tags.filter((t) => t.id !== id))}
        onClearAll={() => setTags([])}
      />
    </div>
  );
};

// ── Booking category (12120:278386) ───────────────────────────────────────────

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

// ── Inline label (14536:52162) ────────────────────────────────────────────────

export const InlineLabel: StoryFn = () => (
  <div style={{ width: 283 }}>
    <InputInline inlineLabel="Label" value="Value" onClick={() => {}} />
  </div>
);

// ── All variants ──────────────────────────────────────────────────────────────

export const AllVariants: StoryFn = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
    <div>
      <div style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Text field — states</div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <Input label="Label" value="Value" state="default" showChevron />
        <Input label="Label" value="Value" state="error" message="Error message" showChevron />
        <Input label="Label" state="warning" message="Missing translation" />
        <Input label="Label" state="instructions" message="Instructions" />
        <Input label="Label" value="Value" readOnly />
      </div>
    </div>
    <div>
      <div style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Search</div>
      <InputSearch placeholder="Search" value="" />
    </div>
    <div>
      <div style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Multiselect</div>
      <InputMultiselect label="State" tags={[{ id: "1", label: "Draft" }, { id: "2", label: "Draft" }, { id: "3", label: "Draft" }]} />
    </div>
    <div>
      <div style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Booking category</div>
      <InputBookingCategory label="Category" mandatory selectedLabel="Default" selectedColor="#A8C5F5" />
    </div>
    <div>
      <div style={{ fontFamily: "Mulish", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Inline label</div>
      <InputInline inlineLabel="Label" value="Value" />
    </div>
  </div>
);
