// Modal stories — dialog over a dark overlay; ESC, overlay click and the close icon all close it

import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";

import { Modal } from "./modal";
import { Button } from "../button/button";
import { Input, InputTextarea } from "../input/input";

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Modal>;

/** Form dialog — title, fields, Cancel (left) and a primary action (right) in the Actions bar. */
export const Default: StoryFn<typeof Modal> = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <>
      <Button kind="primary" size="regular" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create CV version"
        width={512}
        leftActions={[{ label: "Cancel", variant: "secondary", onClick: () => setOpen(false) }]}
        rightActions={[{ label: "Create", variant: "primary", disabled: !name.trim(), onClick: () => setOpen(false) }]}
      >
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
        <InputTextarea label="Description" rows={4} value={description} onChange={e => setDescription(e.target.value)} />
      </Modal>
    </>
  );
};

/** `subtitle` is a small muted line under the title (Figma "Manage tags" — "8 roles") */
export const WithSubtitle: StoryFn<typeof Modal> = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button kind="primary" size="regular" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Manage tags"
        subtitle="8 roles"
        width={500}
        leftActions={[{ label: "Cancel", variant: "secondary", onClick: () => setOpen(false) }]}
        rightActions={[{ label: "Update", variant: "primary", onClick: () => setOpen(false) }]}
      >
        <span style={{ fontFamily: "var(--font-family)", fontSize: 14, color: "var(--palette-blue-0)" }}>Pick a tag to add to these roles:</span>
      </Modal>
    </>
  );
};
