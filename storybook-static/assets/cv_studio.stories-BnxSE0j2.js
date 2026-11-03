import{j as i}from"./jsx-runtime-D_zvdyIk.js";import{C as s,Z as n,J as v,M as V}from"./cv_studio-CSdZ8KV4.js";import"./index-DhMLlvMY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./navbar-DtEW6gcU.js";import"./index-Dd5QUkq_.js";import"./avatar-DzCkQh3P.js";import"./icon-D2SvuOdm.js";import"./layout-DzxHakKM.js";import"./tile-DxGAws7a.js";import"./header-DAkfIBk_.js";import"./navigation-B3zRlfJK.js";import"./button-CreEIUG8.js";import"./button_group-DJgC8Wz_.js";import"./actions-BEYLSr8Q.js";import"./divider-CKitOyrn.js";import"./input-BpruS0E4.js";import"./loading-CDoiP5Xh.js";import"./dropdown-BvmSHwjt.js";import"./pp_bubble-DOPJhvqj.js";import"./pp_chat_input-DRuOu2E_.js";const B={title:"Screens/CVStudio",parameters:{layout:"fullscreen",viewport:{defaultViewport:"screen1440"},design:{type:"figma",url:"https://www.figma.com/design/eLJ4mtITbBhHCbONvKtGZU?node-id=653-36523"},docs:{description:{component:'CV Studio — preview, edit and export CVs. Two export variants (single CV, multiple CVs); the left module has two tabs (ProPilot, Edit fields) under a Translate tile that goes through four states (pick a language, Translate now, progress, Reset). Uses Page variant="fluid", Header, InputInline selectors, Tile, Navigation, Input / InputTextarea, PPChatInput, ButtonGroup and Actions sticky-panel. Edits in the fields update the preview live. Names, bio and details of John Smith and Mary Lee are placeholders.'}}}},e={name:"Single export",parameters:{docs:{description:{story:"One CV (Figma 653:36523). Left module in Edit fields mode."}}},render:()=>i.jsx(s,{cvs:[n],initialMode:"edit"})},t={name:"Single export — ProPilot",parameters:{docs:{description:{story:"One CV, ProPilot tab active."}}},render:()=>i.jsx(s,{cvs:[n],initialMode:"propilot"})},r={name:"Multi export",parameters:{docs:{description:{story:"Three CVs (Figma 653:37833): “3 CVs” title with names, pager, “Translate 3 CVs to”, split Save (3) / Export (3) with “Save current” / “Export current” menus."}}},render:()=>i.jsx(s,{cvs:[n,v,V],initialMode:"edit"})},o={name:"Multi export — ProPilot",parameters:{docs:{description:{story:"Three CVs, ProPilot tab active (Figma 1440:36072)."}}},render:()=>i.jsx(s,{cvs:[n,v,V],initialMode:"propilot"})};var a,p,d;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Single export",
  parameters: {
    docs: {
      description: {
        story: "One CV (Figma 653:36523). Left module in Edit fields mode."
      }
    }
  },
  render: () => <CVStudioScreen cvs={[ZARA]} initialMode="edit" />
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var l,m,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Single export — ProPilot",
  parameters: {
    docs: {
      description: {
        story: "One CV, ProPilot tab active."
      }
    }
  },
  render: () => <CVStudioScreen cvs={[ZARA]} initialMode="propilot" />
}`,...(c=(m=t.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var u,g,x;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Multi export",
  parameters: {
    docs: {
      description: {
        story: "Three CVs (Figma 653:37833): “3 CVs” title with names, pager, “Translate 3 CVs to”, split Save (3) / Export (3) with “Save current” / “Export current” menus."
      }
    }
  },
  render: () => <CVStudioScreen cvs={[ZARA, JOHN, MARY]} initialMode="edit" />
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var S,P,C;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Multi export — ProPilot",
  parameters: {
    docs: {
      description: {
        story: "Three CVs, ProPilot tab active (Figma 1440:36072)."
      }
    }
  },
  render: () => <CVStudioScreen cvs={[ZARA, JOHN, MARY]} initialMode="propilot" />
}`,...(C=(P=o.parameters)==null?void 0:P.docs)==null?void 0:C.source}}};const G=["SingleExport","SingleExportProPilot","MultiExport","MultiExportProPilot"];export{r as MultiExport,o as MultiExportProPilot,e as SingleExport,t as SingleExportProPilot,G as __namedExportsOrder,B as default};
