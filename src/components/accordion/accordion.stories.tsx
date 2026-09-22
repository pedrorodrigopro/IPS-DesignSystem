import type { Meta, StoryFn } from "@storybook/react";
import { Accordion } from "./accordion";

export default {
  title: "Atoms/Accordion",
  component: Accordion,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1581-35436",
    },
  },
} satisfies Meta<typeof Accordion>;

export const Default: StoryFn<typeof Accordion> = () => (
  <div style={{ maxWidth: 400 }}>
    <Accordion title="Skills">
      <p style={{ color: "#0d2976", fontSize: "14px" }}>Content goes here — any React node.</p>
    </Accordion>
    <Accordion title="Experience" defaultExpanded>
      <p style={{ color: "#0d2976", fontSize: "14px" }}>This one starts expanded.</p>
    </Accordion>
    <Accordion title="Certificates">
      <p style={{ color: "#0d2976", fontSize: "14px" }}>Another section.</p>
    </Accordion>
  </div>
);
