import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button/button";
import { Sidepanel } from "./sidepanel";

export default {
  title: "Organisms/Sidepanel",
  component: Sidepanel,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r",
    },
  },
} satisfies Meta<typeof Sidepanel>;

export const BookingDetails: StoryFn<typeof Sidepanel> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "24px" }}>
      <Button text="Open Booking Sidepanel" onClick={() => setIsOpen(true)} />
      <Sidepanel
        isOpen={isOpen}
        title="Booking Details"
        onClose={() => setIsOpen(false)}
        onPrimary={() => setIsOpen(false)}
        primaryLabel="Save booking"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p><strong>Resource:</strong> Sarah Johnson</p>
          <p><strong>Role:</strong> Senior Engineer</p>
          <p><strong>Start date:</strong> 01 Oct 2026</p>
          <p><strong>End date:</strong> 31 Dec 2026</p>
          <p><strong>Allocation:</strong> 100%</p>
        </div>
      </Sidepanel>
    </div>
  );
};
