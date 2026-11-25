// Modals / Manage tags — the dialog that tags what is selected: a single role, several roles, a single engagement or several engagements
// (Figma "Tag roles" 2738:67102). Every story opens the dialog; Update / Cancel close it and "Manage tags" reopens it.

import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";

import { ManageTagsModal } from "./manage_tags_modal";
import type { ManageTagsModalProps, TagRolesResult } from "./manage_tags_modal";
import { Button } from "../../components/button/button";
import { ToastProvider, useToast } from "../../components/toast/toast";

export default {
  title: "Modals/Manage tags",
  component: ManageTagsModal,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=2738-67102" },
    docs: {
      description: {
        component:
          "Manage tags: pick a tag (required: Update stays disabled without one), add a note (500 characters) and, with Notify others on, choose who is notified (Megan Taylor is preselected). " +
          "What is being tagged is told by `unit` (role / engagement) and `items`, which the dialog lists (a role with its engagement as second line; the list scrolls when long): the subtitle reads “1 role”, “3 roles”, “1 engagement”, “3 engagements” and the sentence says “this role” or “these roles”. " +
          "It opens from the bulk banner of Manage roles and Workflow (Tag, Tag roles, Tag parent engagements) and from a row's menu.",
      },
    },
  },
} satisfies Meta<typeof ManageTagsModal>;

// Sample elements of the selection
const ROLES = [
  { label: "Javascript developer", subLabel: "RF_CLONE_2_[2026 Q3] ProFinda IT" },
  { label: "Junior Javascript developer", subLabel: "RF_CLONE_2_[2026 Q3] ProFinda IT" },
  { label: "Accessibility consultant", subLabel: "RF_CLONE_1_[2026 Q4] ProFinda Advisory" },
];
const ENGAGEMENTS = [
  { label: "RF_CLONE_2_[2026 Q3] ProFinda IT" },
  { label: "RF_CLONE_1_[2026 Q4] ProFinda Advisory" },
  { label: "Brightwell Insurance - Tax Compliance FY27" },
];

function Demo(props: Partial<ManageTagsModalProps> & { items: NonNullable<ManageTagsModalProps["items"]> }) {
  const [open, setOpen] = useState(true);
  const { showToast } = useToast();
  const update = (r: TagRolesResult) => {
    setOpen(false);
    const n = props.items.length;
    showToast({ type: "success", message: `Tag “${r.tag}” added to ${n} ${props.unit ?? "role"}${n === 1 ? "" : "s"}${r.notify.length ? `, ${r.notify.join(", ")} notified` : ""}` });
  };
  return (
    <>
      <Button kind="primary" size="regular" onClick={() => setOpen(true)}>Manage tags</Button>
      <ManageTagsModal open={open} onClose={() => setOpen(false)} onUpdate={update} {...props} />
    </>
  );
}
const story = (props: Partial<ManageTagsModalProps> & { items: NonNullable<ManageTagsModalProps["items"]> }): StoryFn => () => <ToastProvider><Demo {...props} /></ToastProvider>;

/** One role ticked: “1 role”, “Pick a tag to add to this role:” */
export const SingleRole: StoryFn = story({ items: ROLES.slice(0, 1), unit: "role" });
SingleRole.storyName = "Single role";

/** Several roles ticked: “3 roles” */
export const MultipleRoles: StoryFn = story({ items: ROLES, unit: "role" });
MultipleRoles.storyName = "Multiple roles";

/** One engagement: the tag goes on the engagement itself (it shows right below its title) */
export const SingleEngagement: StoryFn = story({ items: ENGAGEMENTS.slice(0, 1), unit: "engagement" });
SingleEngagement.storyName = "Single engagement";

/** Several engagements: “3 engagements” */
export const MultipleEngagements: StoryFn = story({ items: ENGAGEMENTS, unit: "engagement" });
MultipleEngagements.storyName = "Multiple engagements";

/** The filled state: a tag picked and Notify others on with people chosen (the Figma's second state) */
export const NotifyOthers: StoryFn = story({ items: ROLES, unit: "role", prefill: { tag: "EM to review", notify: ["Megan Taylor"] } });
NotifyOthers.storyName = "Filled — notify others";
