// SuggestSidePanel stories — Figma "Suggest side panel" 119:27378

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { SuggestSidePanel } from "./suggest_side_panel";
import type { SuggestCandidate } from "./suggest_side_panel";
import { Navbar } from "../navbar/navbar";
import { Button } from "../button/button";

const shortlist: SuggestCandidate[] = [
  { id: "jn", name: "John Norton",  initials: "JN", email: "john.norton@example.com",  rank: "Manager", match: 75, avail: 95,  status: "Shortlisted" },
  { id: "ls", name: "Leslie Smith", initials: "LS", email: "leslie.smith@example.com", rank: "Manager", match: 90, avail: 92,  status: "Shortlisted" },
  { id: "aj", name: "Ashley Jones", initials: "AJ", email: "ashley.jones@example.com", rank: "Manager", match: 50, avail: 100, status: "Shortlisted" },
];

const matches: SuggestCandidate[] = [
  { id: "ml", name: "Mary Lee",        initials: "ML", email: "mary.lee@example.com",        rank: "Senior",    match: 88, avail: 80 },
  { id: "sh", name: "Spencer Harmon",  initials: "SH", email: "spencer.harmon@example.com",  rank: "Manager",   match: 82, avail: 70 },
  { id: "sa", name: "Santi Angulo",    initials: "SA", email: "santi.angulo@example.com",    rank: "Consultant", match: 64, avail: 100 },
  { id: "fa", name: "Fatima Al-Rashid", initials: "FA", email: "fatima.alrashid@example.com", rank: "Manager",  match: 58, avail: 60 },
];

const other: SuggestCandidate[] = [
  { id: "ap", name: "Albert Pierce", initials: "AP", email: "albert.pierce@example.com", rank: "Analyst" },
  { id: "au", name: "Aubrey Lee",    initials: "AL", email: "aubrey.lee@example.com",    rank: "Senior" },
  { id: "bc", name: "Brett Coleen",  initials: "BC", email: "brett.coleen@example.com",  rank: "Manager" },
];

function Demo({ suggested = [], vacancies = 1 }: { suggested?: SuggestCandidate[]; vacancies?: number }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--palette-neutral-2)" }}>
      <Navbar activeId="workflow" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button kind="secondary" onClick={() => setOpen(true)}>Open Suggest panel</Button>
      </div>
      <SuggestSidePanel
        open={open}
        onClose={() => setOpen(false)}
        roleTitle="Senior Financial Manager"
        vacancies={vacancies}
        requestedRank="Manager"
        shortlist={shortlist}
        matches={matches}
        other={other}
        suggested={suggested}
      />
    </div>
  );
}

const meta: Meta = {
  title: "Side Panels/Suggest",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Suggest side panel — Figma 119:27378. Width: 600px. Suggests the workforce members for a role's open vacancies: " +
          "info alert with the vacancies left, sortable Suggested WM table (empty state \"No suggested WM\"), then Shortlist | Matches | Other resources, " +
          "search and a sortable WM table with a Suggest button per row. A suggested row turns into \"Suggested\" (click to remove). " +
          "Suggest is disabled once every vacancy is suggested. Done returns the list through `onDone`.",
      },
    },
  },
};
export default meta;

export const NoSuggestion: StoryFn = () => <Demo />;
NoSuggestion.storyName = "No suggested WM";

export const AllVacanciesSuggested: StoryFn = () => <Demo suggested={[shortlist[1]]} />;
AllVacanciesSuggested.storyName = "All vacancies suggested";

export const TwoVacancies: StoryFn = () => <Demo vacancies={2} suggested={[shortlist[1]]} />;
TwoVacancies.storyName = "Two vacancies, one suggested";
