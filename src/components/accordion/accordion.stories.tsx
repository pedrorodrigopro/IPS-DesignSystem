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
  argTypes: {
    size: {
      control: "select",
      options: ["body", "heading5", "heading4"],
    },
  },
} satisfies Meta<typeof Accordion>;

export const Body: StoryFn<typeof Accordion> = () => (
  <div style={{ width: 382 }}>
    <Accordion title="Title" size="body" />
    <Accordion title="Title" size="body" defaultExpanded>
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976" }}>Content</p>
    </Accordion>
  </div>
);

export const Heading5: StoryFn<typeof Accordion> = () => (
  <div style={{ width: 382 }}>
    <Accordion title="Title" size="heading5" />
    <Accordion title="Title" size="heading5" defaultExpanded>
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976" }}>Content</p>
    </Accordion>
  </div>
);

export const Heading4: StoryFn<typeof Accordion> = () => (
  <div style={{ width: 382 }}>
    <Accordion title="Title" size="heading4" />
    <Accordion title="Title" size="heading4" defaultExpanded>
      <p style={{ fontFamily: "Mulish, sans-serif", fontSize: 14, color: "#0D2976" }}>Content</p>
    </Accordion>
  </div>
);

export const AllSizes: StoryFn<typeof Accordion> = () => (
  <div style={{ width: 382, display: "flex", flexDirection: "column", gap: 16 }}>
    <Accordion title="Title" size="body" />
    <Accordion title="Title" size="heading5" />
    <Accordion title="Title" size="heading4" />
  </div>
);

export const Default: StoryFn<typeof Accordion> = (args) => (
  <div style={{ width: 382 }}>
    <Accordion {...args} />
  </div>
);
Default.args = { title: "Title", size: "body" };
