import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{C as t,Z as r,J as E,M as y}from"./cv_exporter-Cspq7GlF.js";import"./index-DhMLlvMY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./navbar-CLhydjZL.js";import"./index-Dd5QUkq_.js";import"./avatar-DzCkQh3P.js";import"./icon-q_ctI9hk.js";import"./layout-DR1-_U9c.js";import"./tile-2UbfjZnD.js";import"./header-GBiiDxBK.js";import"./navigation-BJkYk42j.js";import"./alert-CCf9NA_Q.js";import"./button-CreEIUG8.js";import"./button_group-Bo98Imkd.js";import"./index-2UU9FgV2.js";import"./index-D7lG0nq1.js";import"./actions-fPgFcG-R.js";import"./tooltip-CfgRuyaf.js";import"./divider-CKitOyrn.js";import"./input-Bdk4Uso5.js";import"./loading-CDoiP5Xh.js";import"./dropdown-mzjkBwST.js";import"./pp_bubble-DOPJhvqj.js";import"./pp_chat_input-Gf9tsqrK.js";import"./pp_suggestion_card-CPN9dMYl.js";import"./modal-DXJeiswI.js";import"./pp_preview_banner-C1TPj0CD.js";import"./skill-M9q1vr_X.js";const ee={title:"Screens/CVExporter",parameters:{layout:"fullscreen",viewport:{defaultViewport:"screen1440"},design:{type:"figma",url:"https://www.figma.com/design/eLJ4mtITbBhHCbONvKtGZU?node-id=653-36523"},docs:{description:{component:'CV Exporter — preview, edit and export CVs. Three variants: Creating version (one CV, “Fields source” select instead of Version, Cancel | Save to new version, Export), Exporting version (one CV, Close | Save as a split button whose menu offers “Save to new CV Version”, Export) and Multi exporting (several CVs, no Save); the left module has two tabs (ProPilot, Edit fields) under a Translate tile that goes through four states (pick a language, Translate now, progress, Reset). Uses Page variant="fluid", Header, InputInline selectors, Tile, Navigation, Input / InputTextarea, PPChatInput, ButtonGroup and Actions sticky-panel. Edits in the fields update the preview live. With pending profile edits (Screens/MyProfile → Profiles Directory → a profile) an alert and Before / After boxes ask whether to use the new values in this version or in all versions. Names, bio and details of John Smith and Mary Lee are placeholders.'}}}},o={name:"Creating version",parameters:{docs:{description:{story:"One CV while a new CV version is being created. There is no Version select. A “Fields source” select in the header (before File type and Template) picks what the new version starts from: Default (the profile fields) or an existing version, each with its description on a second line. The footer reads Cancel | Save to new version, Export; Save opens the “Create CV version” modal. Left module in Edit fields mode."}}},render:()=>e.jsx(t,{variant:"creating-version",cvs:[r],initialMode:"edit"})},i={name:"Exporting version",parameters:{docs:{description:{story:"One CV (Figma 653:36523). The Version field picks the version to export; the Version select (first item of the top row, left of File type) lists each version with its description truncated on a second line, and an info icon beside it shows the full description of the selected version in a tooltip; there is no toolbar row above the CV; the footer reads Close | Save▾, Export. Save is a ButtonGroup: its chevron opens a menu above it with “Save to new CV Version”. Left module in Edit fields mode."}}},render:()=>e.jsx(t,{variant:"exporting-version",cvs:[r],initialMode:"edit"})},n={name:"Exporting version — ProPilot",parameters:{docs:{description:{story:"One CV, ProPilot tab active. Try typing “Please adapt this CV to the banking industry”: ProPilot loads, then offers a suggestion card; hovering it previews the result on the CV (PPPreviewBanner + the affected rows outlined with the ProPilot gradient), Apply commits it, Dismiss mutes it. Placeholder content, no real AI."}}},render:()=>e.jsx(t,{variant:"exporting-version",cvs:[r],initialMode:"propilot"})},s={name:"Multi exporting",parameters:{docs:{description:{story:"Three CVs (Figma 653:37833): “3 CVs” title with names, pager, “Translate 3 CVs to”, and a split Export (3) button whose menu offers “Export current”. Cancel | Export (3)▾, no Save."}}},render:()=>e.jsx(t,{variant:"multi-exporting",cvs:[r,E,y],initialMode:"edit"})},a={name:"Multi exporting — ProPilot",parameters:{docs:{description:{story:"Three CVs, ProPilot tab active (Figma 1440:36072). The industry flow applies to the CV currently shown."}}},render:()=>e.jsx(t,{variant:"multi-exporting",cvs:[r,E,y],initialMode:"propilot"})};var p,l,d;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Creating version",
  parameters: {
    docs: {
      description: {
        story: "One CV while a new CV version is being created. There is no Version select. A “Fields source” select in the header (before File type and Template) picks what the new version starts from: Default (the profile fields) or an existing version, each with its description on a second line. The footer reads Cancel | Save to new version, Export; Save opens the “Create CV version” modal. Left module in Edit fields mode."
      }
    }
  },
  render: () => <CVExporterScreen variant="creating-version" cvs={[ZARA]} initialMode="edit" />
}`,...(d=(l=o.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var c,m,h;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Exporting version",
  parameters: {
    docs: {
      description: {
        story: "One CV (Figma 653:36523). The Version field picks the version to export; the Version select (first item of the top row, left of File type) lists each version with its description truncated on a second line, and an info icon beside it shows the full description of the selected version in a tooltip; there is no toolbar row above the CV; the footer reads Close | Save▾, Export. Save is a ButtonGroup: its chevron opens a menu above it with “Save to new CV Version”. Left module in Edit fields mode."
      }
    }
  },
  render: () => <CVExporterScreen variant="exporting-version" cvs={[ZARA]} initialMode="edit" />
}`,...(h=(m=i.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var v,u,f;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Exporting version — ProPilot",
  parameters: {
    docs: {
      description: {
        story: "One CV, ProPilot tab active. Try typing “Please adapt this CV to the banking industry”: ProPilot loads, then offers a suggestion card; hovering it previews the result on the CV (PPPreviewBanner + the affected rows outlined with the ProPilot gradient), Apply commits it, Dismiss mutes it. Placeholder content, no real AI."
      }
    }
  },
  render: () => <CVExporterScreen variant="exporting-version" cvs={[ZARA]} initialMode="propilot" />
}`,...(f=(u=n.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var g,x,C;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Multi exporting",
  parameters: {
    docs: {
      description: {
        story: "Three CVs (Figma 653:37833): “3 CVs” title with names, pager, “Translate 3 CVs to”, and a split Export (3) button whose menu offers “Export current”. Cancel | Export (3)▾, no Save."
      }
    }
  },
  render: () => <CVExporterScreen variant="multi-exporting" cvs={[ZARA, JOHN, MARY]} initialMode="edit" />
}`,...(C=(x=s.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var V,w,P;a.parameters={...a.parameters,docs:{...(V=a.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: "Multi exporting — ProPilot",
  parameters: {
    docs: {
      description: {
        story: "Three CVs, ProPilot tab active (Figma 1440:36072). The industry flow applies to the CV currently shown."
      }
    }
  },
  render: () => <CVExporterScreen variant="multi-exporting" cvs={[ZARA, JOHN, MARY]} initialMode="propilot" />
}`,...(P=(w=a.parameters)==null?void 0:w.docs)==null?void 0:P.source}}};const te=["CreatingVersion","ExportingVersion","ExportingVersionProPilot","MultiExporting","MultiExportingProPilot"];export{o as CreatingVersion,i as ExportingVersion,n as ExportingVersionProPilot,s as MultiExporting,a as MultiExportingProPilot,te as __namedExportsOrder,ee as default};
