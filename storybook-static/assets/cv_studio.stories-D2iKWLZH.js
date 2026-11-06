import{j as i}from"./jsx-runtime-D_zvdyIk.js";import{C as s,Z as n,J as x,M as C}from"./cv_studio-Dwqis4Ev.js";import"./index-DhMLlvMY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./navbar-DjLGQiJh.js";import"./index-Dd5QUkq_.js";import"./avatar-DzCkQh3P.js";import"./icon-BJcJHAAT.js";import"./layout-DzxHakKM.js";import"./tile-DxGAws7a.js";import"./header-DWdmCf9-.js";import"./navigation-CYj_iADS.js";import"./alert-f3XyiYhs.js";import"./button-CreEIUG8.js";import"./button_group-8N_ehe_C.js";import"./index-2UU9FgV2.js";import"./index-D7lG0nq1.js";import"./actions-D59ljUI3.js";import"./tooltip-CwLrwrm3.js";import"./divider-CKitOyrn.js";import"./input-q9z2Hils.js";import"./loading-CDoiP5Xh.js";import"./dropdown-BhkbDvWq.js";import"./pp_bubble-DOPJhvqj.js";import"./pp_chat_input-BLF45ZU1.js";import"./pp_suggestion_card-CycbDmzC.js";import"./pp_preview_banner-C1TPj0CD.js";import"./skill-D3ryRPT8.js";const q={title:"Screens/CVStudio",parameters:{layout:"fullscreen",viewport:{defaultViewport:"screen1440"},design:{type:"figma",url:"https://www.figma.com/design/eLJ4mtITbBhHCbONvKtGZU?node-id=653-36523"},docs:{description:{component:'CV Studio — preview, edit and export CVs. Two export variants (single CV, multiple CVs); the left module has two tabs (ProPilot, Edit fields) under a Translate tile that goes through four states (pick a language, Translate now, progress, Reset). Uses Page variant="fluid", Header, InputInline selectors, Tile, Navigation, Input / InputTextarea, PPChatInput, ButtonGroup and Actions sticky-panel. Edits in the fields update the preview live. With pending profile edits (Screens/MyProfile → Profiles Directory → a profile) an alert and Before / After boxes ask whether to use the new values in this version or in all versions. Names, bio and details of John Smith and Mary Lee are placeholders.'}}}},e={name:"Single export",parameters:{docs:{description:{story:"One CV (Figma 653:36523). Left module in Edit fields mode."}}},render:()=>i.jsx(s,{cvs:[n],initialMode:"edit"})},t={name:"Single export — ProPilot",parameters:{docs:{description:{story:"One CV, ProPilot tab active. Try typing “Please adapt this CV to the banking industry”: ProPilot loads, then offers a suggestion card; hovering it previews the result on the CV (PPPreviewBanner + the affected rows outlined with the ProPilot gradient), Apply commits it, Dismiss mutes it. Placeholder content, no real AI."}}},render:()=>i.jsx(s,{cvs:[n],initialMode:"propilot"})},r={name:"Multi export",parameters:{docs:{description:{story:"Three CVs (Figma 653:37833): “3 CVs” title with names, pager, “Translate 3 CVs to”, split Save (3) / Export (3) with “Save current” / “Export current” menus."}}},render:()=>i.jsx(s,{cvs:[n,x,C],initialMode:"edit"})},o={name:"Multi export — ProPilot",parameters:{docs:{description:{story:"Three CVs, ProPilot tab active (Figma 1440:36072). The industry flow applies to the CV currently shown."}}},render:()=>i.jsx(s,{cvs:[n,x,C],initialMode:"propilot"})};var a,p,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Single export",
  parameters: {
    docs: {
      description: {
        story: "One CV (Figma 653:36523). Left module in Edit fields mode."
      }
    }
  },
  render: () => <CVStudioScreen cvs={[ZARA]} initialMode="edit" />
}`,...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var d,m,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Single export — ProPilot",
  parameters: {
    docs: {
      description: {
        story: "One CV, ProPilot tab active. Try typing “Please adapt this CV to the banking industry”: ProPilot loads, then offers a suggestion card; hovering it previews the result on the CV (PPPreviewBanner + the affected rows outlined with the ProPilot gradient), Apply commits it, Dismiss mutes it. Placeholder content, no real AI."
      }
    }
  },
  render: () => <CVStudioScreen cvs={[ZARA]} initialMode="propilot" />
}`,...(c=(m=t.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var u,h,P;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Multi export",
  parameters: {
    docs: {
      description: {
        story: "Three CVs (Figma 653:37833): “3 CVs” title with names, pager, “Translate 3 CVs to”, split Save (3) / Export (3) with “Save current” / “Export current” menus."
      }
    }
  },
  render: () => <CVStudioScreen cvs={[ZARA, JOHN, MARY]} initialMode="edit" />
}`,...(P=(h=r.parameters)==null?void 0:h.docs)==null?void 0:P.source}}};var g,f,v;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Multi export — ProPilot",
  parameters: {
    docs: {
      description: {
        story: "Three CVs, ProPilot tab active (Figma 1440:36072). The industry flow applies to the CV currently shown."
      }
    }
  },
  render: () => <CVStudioScreen cvs={[ZARA, JOHN, MARY]} initialMode="propilot" />
}`,...(v=(f=o.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};const z=["SingleExport","SingleExportProPilot","MultiExport","MultiExportProPilot"];export{r as MultiExport,o as MultiExportProPilot,e as SingleExport,t as SingleExportProPilot,z as __namedExportsOrder,q as default};
