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
          "Breadcrumbs lead back to the profile; “Create CV version” opens a modal (name, description) and adds the new card; in Screens/MyProfile the button instead opens CV Exporter (Creating version), whose Save asks for the name in that same modal at the end, and clicking a card opens CV Exporter (Exporting version). " +
          "Cards are clickable (shadow at rest, hover effect) and open the version; the switch toggles a version on or off and the menu button offers Duplicate and Delete. Search and sort work. " +
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
