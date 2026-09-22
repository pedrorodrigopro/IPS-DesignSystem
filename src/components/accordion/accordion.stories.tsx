import type { Meta, StoryFn } from "@storybook/react";
import { Accordion } from "./accordion";

export default {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1581-35436",
    },
  },
} satisfies Meta<typeof Accordion>;

export const Collapsed: StoryFn<typeof Accordion> = () => (
  <div style={{ width: 382 }}>
    <Accordion title="Title" />
  </div>
);

export const Expanded: StoryFn<typeof Accordion> = () => (
  <div style={{ width: 382 }}>
    <Accordion title="Title" defaultExpanded>
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976" }}>
        Content goes here.
      </p>
    </Accordion>
  </div>
);

export const Multiple: StoryFn<typeof Accordion> = () => (
  <div style={{ width: 382 }}>
    <Accordion title="Skills">
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976" }}>Skills content.</p>
    </Accordion>
    <Accordion title="Experience" defaultExpanded>
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976" }}>Experience content.</p>
    </Accordion>
    <Accordion title="Certificates">
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976" }}>Certificates content.</p>
    </Accordion>
  </div>
);
