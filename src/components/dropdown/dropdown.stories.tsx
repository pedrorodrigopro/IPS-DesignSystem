import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import {
  DropdownActions,
  DropdownBookingCategory,
  DropdownIcons,
  DropdownMultiSelection,
  DropdownSelection,
  DropdownTypeahead,
  DropdownWM,
} from "./dropdown";
import type { IconName } from "../icon/icon";

export default {
  title: "Components/Dropdown",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1671-37903",
    },
    layout: "centered",
  },
};

const actionItems = [
  { id: "1", label: "Action" },
  { id: "2", label: "Action" },
  { id: "3", label: "Action" },
  { id: "4", label: "Action" },
  { id: "5", label: "Action" },
];

const selectionItems = [
  { id: "1", label: "Selection", subLabel: "Info" },
  { id: "2", label: "Selection", subLabel: "Info" },
  { id: "3", label: "Selection" },
  { id: "4", label: "Selection" },
];

const multiItems = [
  { id: "open", label: "Open" },
  { id: "draft", label: "Draft" },
  { id: "closed", label: "Closed" },
];

const iconNames: IconName[] = [
  "booking", "role", "engagement", "profile",
  "search", "calendar", "workflow", "marketplace",
  "reports", "insights", "history", "notifications",
  "edit", "save", "share", "open",
  "tag", "note", "refresh", "sort",
  "merge", "split", "move", "remove",
];

const bookingCategories = [
  { id: "default", label: "Default", color: "#FFB3B3" },
  { id: "hard", label: "Hard", color: "#A8C5F5" },
  { id: "soft", label: "Soft", color: "#F5A8F0" },
  { id: "holidays", label: "Holidays", color: "#A8F5C5" },
];

const wmItems = [
  { id: "group", name: "Group booking", subLabel: "150 users as a result from filters", isGroup: true },
  { id: "cp", name: "Charlie Parker", subLabel: "paul.trent@email.com", initials: "PT" },
  { id: "sp", name: "Steve Pauster", subLabel: "steve.pauster@email.com", initials: "SP" },
  { id: "lp", name: "Laura Pau", subLabel: "laura.pau@email.com", initials: "LP" },
];

// ── Actions ───────────────────────────────────────────────────────────────────

export const Actions: StoryFn = () => (
  <DropdownActions
    items={actionItems}
    onSelect={(id) => console.log("selected", id)}
  />
);

// ── Actions double-line ───────────────────────────────────────────────────────

export const ActionsDoubleLine: StoryFn = () => (
  <DropdownActions
    items={[
      { id: "1", label: "Action", subLabel: "Info" },
      { id: "2", label: "Action", subLabel: "Info" },
      { id: "3", label: "Action", subLabel: "Info" },
    ]}
    onSelect={(id) => console.log("selected", id)}
  />
);

// ── Single selection ──────────────────────────────────────────────────────────

export const Selection: StoryFn = () => {
  const [selected, setSelected] = useState("1");
  return (
    <DropdownSelection
      items={selectionItems}
      selectedId={selected}
      onSelect={setSelected}
    />
  );
};

// ── Multi-selection ───────────────────────────────────────────────────────────

export const MultiSelection: StoryFn = () => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <DropdownMultiSelection
      items={multiItems}
      selectedIds={selected}
      onSelectionChange={setSelected}
    />
  );
};

// ── Icons ─────────────────────────────────────────────────────────────────────

export const Icons: StoryFn = () => {
  const [selected, setSelected] = useState<IconName | undefined>("booking");
  return (
    <DropdownIcons
      icons={iconNames}
      selectedIcon={selected}
      onSelect={setSelected}
    />
  );
};

// ── Booking category ──────────────────────────────────────────────────────────

export const BookingCategory: StoryFn = () => {
  const [selected, setSelected] = useState("default");
  return (
    <DropdownBookingCategory
      items={bookingCategories}
      selectedId={selected}
      onSelect={setSelected}
    />
  );
};

// ── Workforce Member ──────────────────────────────────────────────────────────

export const WorkforceMember: StoryFn = () => {
  const [selected, setSelected] = useState<string | undefined>();
  return (
    <DropdownWM
      items={wmItems}
      selectedId={selected}
      onSelect={setSelected}
    />
  );
};

// ── All variants ──────────────────────────────────────────────────────────────

// ── Typeahead ─────────────────────────────────────────────────────────────────

export const Typeahead: StoryFn = () => (
  <DropdownTypeahead
    results={[
      { id: "1", type: "profile",    label: "Ruby Alpha",        matchedPart: "Ruby", subLabel: "ruby.alpha@profinda.com", onOpen: () => {} },
      { id: "2", type: "engagement", label: "Ruby banking audit", matchedPart: "Ruby", subLabel: "01 Mar 2024",            onOpen: () => {} },
      { id: "3", type: "role",       label: "Ruby developer",     matchedPart: "Ruby", subLabel: "01 Mar 2024",            onOpen: () => {} },
      { id: "4", type: "search",     label: "Ruby developer",     matchedPart: "Ruby" },
    ]}
    onSelect={(id) => console.log("selected", id)}
    onSeeAll={() => console.log("see all")}
  />
);

export const AllVariants: StoryFn = () => {
  const [singleSel, setSingleSel] = useState("1");
  const [multiSel, setMultiSel] = useState<string[]>([]);
  const [iconSel, setIconSel] = useState<IconName | undefined>("booking");
  const [catSel, setCatSel] = useState("default");
  const [wmSel, setWmSel] = useState<string | undefined>();

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start", padding: 24 }}>
      <div>
        <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Actions</div>
        <DropdownActions items={actionItems} onSelect={() => {}} />
      </div>
      <div>
        <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Selection</div>
        <DropdownSelection items={selectionItems} selectedId={singleSel} onSelect={setSingleSel} />
      </div>
      <div>
        <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Multi-selection</div>
        <DropdownMultiSelection items={multiItems} selectedIds={multiSel} onSelectionChange={setMultiSel} />
      </div>
      <div>
        <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Icons</div>
        <DropdownIcons icons={iconNames} selectedIcon={iconSel} onSelect={setIconSel} />
      </div>
      <div>
        <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Booking Category</div>
        <DropdownBookingCategory items={bookingCategories} selectedId={catSel} onSelect={setCatSel} />
      </div>
      <div>
        <div style={{ fontFamily: "Mulish, sans-serif", fontSize: 11, color: "#8F9ED1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Workforce Member</div>
        <DropdownWM items={wmItems} selectedId={wmSel} onSelect={setWmSel} />
      </div>
    </div>
  );
};
