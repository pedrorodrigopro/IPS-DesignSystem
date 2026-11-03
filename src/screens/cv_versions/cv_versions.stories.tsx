// CV Versions stories — see cv_versions.tsx for the screen (layout notes, Figma node)

import type { Meta, StoryObj } from "@storybook/react";

import { CVVersionsScreen } from "./cv_versions";

const meta: Meta = {
  title: "Screens/CVVersions",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/eLJ4mtITbBhHCbONvKtGZU?node-id=132-53016",
    },
    docs: {
      description: {
        component:
          "CV Versions — every saved version of a person's CV, as cards with a live thumbnail, template, language and last editor. " +
          "Breadcrumbs lead back to the profile; “Create CV version” and the edit icons open CV Studio (in Screens/MyProfile). " +
          "Search and sort work, the switch toggles a version on or off, and the bin removes a card. " +
          "The three versions are the ones in the Figma; all use the same placeholder CV.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "Default",
  render: () => <CVVersionsScreen />,
};
