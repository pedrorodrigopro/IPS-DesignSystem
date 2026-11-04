// CV Studio stories — see cv_studio.tsx for the screen (layout notes, Figma nodes)

import type { Meta, StoryObj } from "@storybook/react";

import { CVStudioScreen, JOHN, MARY, ZARA } from "./cv_studio";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Storybook meta + stories
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const meta: Meta = {
  title: "Screens/CVStudio",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/eLJ4mtITbBhHCbONvKtGZU?node-id=653-36523",
    },
    docs: {
      description: {
        component:
          "CV Studio — preview, edit and export CVs. Two export variants (single CV, multiple CVs); the left module has two tabs " +
          "(ProPilot, Edit fields) under a Translate tile that goes through four states (pick a language, Translate now, progress, Reset). " +
          "Uses Page variant=\"fluid\", Header, InputInline selectors, Tile, Navigation, Input / InputTextarea, PPChatInput, " +
          "ButtonGroup and Actions sticky-panel. Edits in the fields update the preview live. " +
          "Names, bio and details of John Smith and Mary Lee are placeholders.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const SingleExport: Story = {
  name: "Single export",
  parameters: { docs: { description: { story: "One CV (Figma 653:36523). Left module in Edit fields mode." } } },
  render: () => <CVStudioScreen cvs={[ZARA]} initialMode="edit" />,
};

export const SingleExportProPilot: Story = {
  name: "Single export — ProPilot",
  parameters: { docs: { description: { story: "One CV, ProPilot tab active. Try typing “Please adapt this CV to the banking industry”: ProPilot loads, then offers a suggestion card; hovering it previews the result on the CV (PPPreviewBanner + the affected rows outlined with the ProPilot gradient), Apply commits it, Dismiss mutes it. Placeholder content, no real AI." } } },
  render: () => <CVStudioScreen cvs={[ZARA]} initialMode="propilot" />,
};

export const MultiExport: Story = {
  name: "Multi export",
  parameters: { docs: { description: { story: "Three CVs (Figma 653:37833): “3 CVs” title with names, pager, “Translate 3 CVs to”, split Save (3) / Export (3) with “Save current” / “Export current” menus." } } },
  render: () => <CVStudioScreen cvs={[ZARA, JOHN, MARY]} initialMode="edit" />,
};

export const MultiExportProPilot: Story = {
  name: "Multi export — ProPilot",
  parameters: { docs: { description: { story: "Three CVs, ProPilot tab active (Figma 1440:36072). The industry flow applies to the CV currently shown." } } },
  render: () => <CVStudioScreen cvs={[ZARA, JOHN, MARY]} initialMode="propilot" />,
};
