import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{C as r,Z as t,J as E,M as S}from"./cv_exporter-T28Fy1gC.js";import"./index-DhMLlvMY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./navbar-BPKVQzl8.js";import"./index-Dd5QUkq_.js";import"./avatar-DzCkQh3P.js";import"./icon-v-ZctF2y.js";import"./layout-DR1-_U9c.js";import"./tile-2UbfjZnD.js";import"./header-BF0ryUYE.js";import"./navigation-LAMgMzd1.js";import"./alert-J8G0QdH-.js";import"./button-CreEIUG8.js";import"./button_group-CaZ6FzT3.js";import"./index-2UU9FgV2.js";import"./index-D7lG0nq1.js";import"./actions-B1Wf2eIL.js";import"./tooltip-CfgRuyaf.js";import"./divider-CKitOyrn.js";import"./input-BvTNqKpH.js";import"./loading-CDoiP5Xh.js";import"./dropdown-DAkVyk4L.js";import"./pp_bubble-DOPJhvqj.js";import"./pp_chat_input-DUtPaZwa.js";import"./pp_suggestion_card-CPN9dMYl.js";import"./modal-Bu9S5Al6.js";import"./pp_preview_banner-C1TPj0CD.js";import"./skill-CBW85QGe.js";const ee={title:"Screens/CVExporter",parameters:{layout:"fullscreen",viewport:{defaultViewport:"screen1440"},design:{type:"figma",url:"https://www.figma.com/design/eLJ4mtITbBhHCbONvKtGZU?node-id=653-36523"},docs:{description:{component:'CV Exporter — preview, edit and export CVs. Three variants: Creating version (one CV, “Data source” select instead of Version, Close | Save, Export), Exporting version (one CV, Cancel | Save as a split button whose menu offers “Save to new CV Version”, Export) and Multi exporting (several CVs, no Save); the left module has two tabs (ProPilot, Edit fields) under a Translate tile that goes through four states (pick a language, Translate now, progress, Reset). Uses Page variant="fluid", Header, InputInline selectors, Tile, Navigation, Input / InputTextarea, PPChatInput, ButtonGroup and Actions sticky-panel. Edits in the fields update the preview live. With pending profile edits (Screens/MyProfile → Profiles Directory → a profile) an alert and Before / After boxes ask whether to use the new values in this version or in all versions. Names, bio and details of John Smith and Mary Lee are placeholders.'}}}},o={name:"Creating version",parameters:{docs:{description:{story:"One CV while a new CV version is being created. Instead of Version the toolbar has a “Data source” select (Profile fields or an existing CV version: what the new version starts from); the footer has a regular Save: Close | Save, Export. Save opens the “Create CV version” modal. Left module in Edit fields mode."}}},render:()=>e.jsx(r,{variant:"creating-version",cvs:[t],initialMode:"edit"})},i={name:"Exporting version",parameters:{docs:{description:{story:"One CV (Figma 653:36523). The Version field picks the version to export; the footer reads Cancel | Save▾, Export. Save is a ButtonGroup: its chevron opens a menu above it with “Save to new CV Version”. Left module in Edit fields mode."}}},render:()=>e.jsx(r,{variant:"exporting-version",cvs:[t],initialMode:"edit"})},n={name:"Exporting version — ProPilot",parameters:{docs:{description:{story:"One CV, ProPilot tab active. Try typing “Please adapt this CV to the banking industry”: ProPilot loads, then offers a suggestion card; hovering it previews the result on the CV (PPPreviewBanner + the affected rows outlined with the ProPilot gradient), Apply commits it, Dismiss mutes it. Placeholder content, no real AI."}}},render:()=>e.jsx(r,{variant:"exporting-version",cvs:[t],initialMode:"propilot"})},s={name:"Multi exporting",parameters:{docs:{description:{story:"Three CVs (Figma 653:37833): “3 CVs” title with names, pager, “Translate 3 CVs to”, and a split Export (3) button whose menu offers “Export current”. No Save."}}},render:()=>e.jsx(r,{variant:"multi-exporting",cvs:[t,E,S],initialMode:"edit"})},a={name:"Multi exporting — ProPilot",parameters:{docs:{description:{story:"Three CVs, ProPilot tab active (Figma 1440:36072). The industry flow applies to the CV currently shown."}}},render:()=>e.jsx(r,{variant:"multi-exporting",cvs:[t,E,S],initialMode:"propilot"})};var p,l,d;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Creating version",
  parameters: {
    docs: {
      description: {
        story: "One CV while a new CV version is being created. Instead of Version the toolbar has a “Data source” select (Profile fields or an existing CV version: what the new version starts from); the footer has a regular Save: Close | Save, Export. Save opens the “Create CV version” modal. Left module in Edit fields mode."
      }
    }
  },
  render: () => <CVExporterScreen variant="creating-version" cvs={[ZARA]} initialMode="edit" />
}`,...(d=(l=o.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var c,m,v;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Exporting version",
  parameters: {
    docs: {
      description: {
        story: "One CV (Figma 653:36523). The Version field picks the version to export; the footer reads Cancel | Save▾, Export. Save is a ButtonGroup: its chevron opens a menu above it with “Save to new CV Version”. Left module in Edit fields mode."
      }
    }
  },
  render: () => <CVExporterScreen variant="exporting-version" cvs={[ZARA]} initialMode="edit" />
}`,...(v=(m=i.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var u,h,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Exporting version — ProPilot",
  parameters: {
    docs: {
      description: {
        story: "One CV, ProPilot tab active. Try typing “Please adapt this CV to the banking industry”: ProPilot loads, then offers a suggestion card; hovering it previews the result on the CV (PPPreviewBanner + the affected rows outlined with the ProPilot gradient), Apply commits it, Dismiss mutes it. Placeholder content, no real AI."
      }
    }
  },
  render: () => <CVExporterScreen variant="exporting-version" cvs={[ZARA]} initialMode="propilot" />
}`,...(g=(h=n.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var x,f,C;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Multi exporting",
  parameters: {
    docs: {
      description: {
        story: "Three CVs (Figma 653:37833): “3 CVs” title with names, pager, “Translate 3 CVs to”, and a split Export (3) button whose menu offers “Export current”. No Save."
      }
    }
  },
  render: () => <CVExporterScreen variant="multi-exporting" cvs={[ZARA, JOHN, MARY]} initialMode="edit" />
}`,...(C=(f=s.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var V,P,w;a.parameters={...a.parameters,docs:{...(V=a.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: "Multi exporting — ProPilot",
  parameters: {
    docs: {
      description: {
        story: "Three CVs, ProPilot tab active (Figma 1440:36072). The industry flow applies to the CV currently shown."
      }
    }
  },
  render: () => <CVExporterScreen variant="multi-exporting" cvs={[ZARA, JOHN, MARY]} initialMode="propilot" />
}`,...(w=(P=a.parameters)==null?void 0:P.docs)==null?void 0:w.source}}};const re=["CreatingVersion","ExportingVersion","ExportingVersionProPilot","MultiExporting","MultiExportingProPilot"];export{o as CreatingVersion,i as ExportingVersion,n as ExportingVersionProPilot,s as MultiExporting,a as MultiExportingProPilot,re as __namedExportsOrder,ee as default};
