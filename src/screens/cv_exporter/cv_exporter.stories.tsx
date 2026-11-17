// CV Exporter stories — see cv_exporter.tsx for the screen (layout notes, Figma nodes)

import type { Meta, StoryObj } from "@storybook/react";

import { CVExporterScreen, JOHN, MARY, ZARA } from "./cv_exporter";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Storybook meta + stories
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const meta: Meta = {
  title: "Screens/CVExporter",
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
          "CV Exporter — preview, edit and export CVs. Three variants: Creating version (one CV, read-only Version field, Close | Save, Export), " +
          "Exporting version (one CV, Cancel | Save as a split button whose menu offers “Save to new CV Version”, Export) and Multi exporting (several CVs, no Save); the left module has two tabs " +
          "(ProPilot, Edit fields) under a Translate tile that goes through four states (pick a language, Translate now, progress, Reset). " +
          "Uses Page variant=\"fluid\", Header, InputInline selectors, Tile, Navigation, Input / InputTextarea, PPChatInput, " +
          "ButtonGroup and Actions sticky-panel. Edits in the fields update the preview live. With pending profile edits (Screens/MyProfile → Profiles Directory → a profile) an alert and Before / After boxes ask whether to use the new values in this version or in all versions. " +
          "Names, bio and details of John Smith and Mary Lee are placeholders.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const CreatingVersion: Story = {
  name: "Creating version",
  parameters: { docs: { description: { story: "One CV while a new CV version is being created. The Version field is read-only (no chevron, stroke or hover); the footer has a regular Save: Close | Save, Export. Left module in Edit fields mode." } } },
  render: () => <CVExporterScreen variant="creating-version" cvs={[ZARA]} initialMode="edit" />,
};

export const ExportingVersion: Story = {
  name: "Exporting version",
  parameters: { docs: { description: { story: "One CV (Figma 653:36523). The Version field picks the version to export; the footer reads Cancel | Save▾, Export. Save is a ButtonGroup: its chevron opens a menu above it with “Save to new CV Version”. Left module in Edit fields mode." } } },
  render: () => <CVExporterScreen variant="exporting-version" cvs={[ZARA]} initialMode="edit" />,
};

export const ExportingVersionProPilot: Story = {
  name: "Exporting version — ProPilot",
  parameters: { docs: { description: { story: "One CV, ProPilot tab active. Try typing “Please adapt this CV to the banking industry”: ProPilot loads, then offers a suggestion card; hovering it previews the result on the CV (PPPreviewBanner + the affected rows outlined with the ProPilot gradient), Apply commits it, Dismiss mutes it. Placeholder content, no real AI." } } },
  render: () => <CVExporterScreen variant="exporting-version" cvs={[ZARA]} initialMode="propilot" />,
};

export const MultiExporting: Story = {
  name: "Multi exporting",
  parameters: { docs: { description: { story: "Three CVs (Figma 653:37833): “3 CVs” title with names, pager, “Translate 3 CVs to”, and a split Export (3) button whose menu offers “Export current”. No Save." } } },
  render: () => <CVExporterScreen variant="multi-exporting" cvs={[ZARA, JOHN, MARY]} initialMode="edit" />,
};

export const MultiExportingProPilot: Story = {
  name: "Multi exporting — ProPilot",
  parameters: { docs: { description: { story: "Three CVs, ProPilot tab active (Figma 1440:36072). The industry flow applies to the CV currently shown." } } },
  render: () => <CVExporterScreen variant="multi-exporting" cvs={[ZARA, JOHN, MARY]} initialMode="propilot" />,
};
