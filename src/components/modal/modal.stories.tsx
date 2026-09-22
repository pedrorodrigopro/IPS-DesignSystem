import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button/button";
import { Modal } from "./modal";

export default {
  title: "Organisms/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r",
    },
  },
} satisfies Meta<typeof Modal>;

export const DeleteBooking: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "24px" }}>
      <Button kind="danger" text="Delete booking" onClick={() => setIsOpen(true)} />
      <Modal
        isOpen={isOpen}
        title="Delete booking"
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        confirmLabel="Delete"
        confirmKind="danger"
      >
        Are you sure you want to delete this booking? This action cannot be undone.
      </Modal>
    </div>
  );
};

export const Cancel: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "24px" }}>
      <Button kind="secondary" text="Cancel booking" onClick={() => setIsOpen(true)} />
      <Modal
        isOpen={isOpen}
        title="Cancel booking"
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        confirmLabel="Yes, cancel"
        confirmKind="danger"
      >
        Cancelling this booking will notify the resource and remove them from the role.
        Do you want to continue?
      </Modal>
    </div>
  );
};
