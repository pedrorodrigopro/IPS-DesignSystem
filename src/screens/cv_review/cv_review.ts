// CV review — pure logic for "the profile (single source of truth) changed, review it in each CV version".
// Figma: Export CV revamp 886:40801 (Profile), 886:40981 (CV Versions), 886:41024 (CV Studio). Placeholder content.

import type { CV, FieldKey } from "../cv_studio/cv_studio";

export type ReviewChange =
  | { id: string; kind: "field"; field: FieldKey; label: string; before: string; after: string }
  | { id: string; kind: "skill"; label: string; skill: string };

/** Pending changes per CV version id */
export type PendingByVersion = Record<string, ReviewChange[]>;

const promote = (title: string) => (/^senior\b/i.test(title) ? title.replace(/^senior/i, "Lead") : `Senior ${title}`);

/** The edits made on the profile since the CV version was last updated: 3 edited fields + 1 added skill. */
export function seedChanges(cv: Pick<CV, "jobTitle" | "bio" | "location" | "skills">): ReviewChange[] {
  return [
    { id: "jobTitle", kind: "field", field: "jobTitle", label: "Job title", before: cv.jobTitle, after: promote(cv.jobTitle) },
    { id: "bio",      kind: "field", field: "bio",      label: "Bio",       before: cv.bio,      after: `${cv.bio} Recently led a forensic accounting review for a major client.` },
    { id: "location", kind: "field", field: "location", label: "Location",  before: cv.location, after: cv.location === "Dublin" ? "London" : "Dublin" },
    { id: "skill-forensic", kind: "skill", label: "Skill added", skill: "Forensic Accounting" },
  ];
}

/** Writes one change into a CV (idempotent: a skill already listed is not added twice). */
export function applyChange(cv: CV, change: ReviewChange): CV {
  if (change.kind === "field") return { ...cv, [change.field]: change.after };
  const skills = cv.skills.split(",").map(s => s.trim()).filter(Boolean);
  return skills.includes(change.skill) ? cv : { ...cv, skills: [...skills, change.skill].join(", ") };
}

/** CV Studio alert text, e.g. "3 fields edited and 1 new custom value added". */
export function summarize(changes: ReviewChange[]): string {
  const fields = changes.filter(c => c.kind === "field").length;
  const values = changes.filter(c => c.kind === "skill").length;
  const parts = [
    fields > 0 && `${fields} ${fields === 1 ? "field" : "fields"} edited`,
    values > 0 && `${values} new custom ${values === 1 ? "value" : "values"} added`,
  ].filter(Boolean);
  return parts.join(" and ");
}

/** Profile / CV Versions alert title. */
export const pendingVersionsText = (n: number) => `${n} CV ${n === 1 ? "version has" : "versions have"} pending updates`;
