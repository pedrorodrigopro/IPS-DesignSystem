import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as b}from"./index-DhMLlvMY.js";import{T as p}from"./table_properties_side_panel-BPZ8oqii.js";import{N as m}from"./navbar-CLhydjZL.js";import"./_commonjsHelpers-CqkleIqs.js";import"./side_panel-BpkywXw5.js";import"./index-Dd5QUkq_.js";import"./header-GBiiDxBK.js";import"./icon-q_ctI9hk.js";import"./button-CreEIUG8.js";import"./divider-CKitOyrn.js";import"./navigation-BJkYk42j.js";import"./switch-CzqtCaZJ.js";import"./tile-2UbfjZnD.js";import"./actions-fPgFcG-R.js";import"./tooltip-CfgRuyaf.js";import"./index-2UU9FgV2.js";import"./index-D7lG0nq1.js";import"./avatar-DzCkQh3P.js";const h=[{id:"role-title",label:"Role title",visible:!0},{id:"status",label:"Status",visible:!0},{id:"skills",label:"Skills",visible:!0},{id:"date-created",label:"Date created",visible:!0},{id:"talent-pool",label:"Talent pool",visible:!0},{id:"vacancies",label:"Vacancies [open/total]",visible:!0},{id:"avail-req",label:"Availability requirement",visible:!0},{id:"id",label:"ID",visible:!1},{id:"reply-by",label:"Reply by",visible:!1},{id:"assignee",label:"Assignee",visible:!1},{id:"due-in-days",label:"Due in days",visible:!1}],g=[{id:"engagement-title",label:"Engagement title",section:"table",state:"table",locked:!0},{id:"role-title",label:"Role title",section:"table",state:"table"},{id:"assignee",label:"Assignee",section:"table",state:"table"},{id:"date-created",label:"Date created",section:"table",state:"table"},{id:"talent-pool",label:"Talent pool",section:"inline",state:"list"},{id:"status",label:"Status",section:"hidden",state:"hidden"},{id:"vacancies",label:"Vacancies [open/total]",section:"hidden",state:"hidden"},{id:"avail-req",label:"Availability requirement",section:"hidden",state:"hidden"},{id:"skills",label:"Skills",section:"hidden",state:"hidden"},{id:"id",label:"ID",section:"hidden",state:"hidden"},{id:"reply-by",label:"Reply by",section:"hidden",state:"hidden"}],f=[{id:"role-title",label:"Role title",section:"table",state:"table",locked:!0},{id:"wf-state",label:"Workflow state",section:"table",state:"table"},{id:"grade",label:"Grade",section:"table",state:"table"},{id:"start-date",label:"Start date",section:"inline",state:"list"},{id:"end-date",label:"End date",section:"inline",state:"list"},{id:"duration",label:"Duration",section:"hidden",state:"hidden"},{id:"location",label:"Location",section:"hidden",state:"hidden"},{id:"grade-be",label:"Grade",section:"hidden",state:"hidden"},{id:"clients",label:"Clients",section:"hidden",state:"hidden"}],v=[{id:"profile-name",label:"Profile name",section:"table",state:"table",locked:!0},{id:"job-title",label:"Job title",section:"table",state:"table"},{id:"grade",label:"Grade",section:"inline",state:"list"},{id:"location",label:"Location",section:"inline",state:"list"},{id:"skills",label:"Skills",section:"hidden",state:"hidden"},{id:"department",label:"Department",section:"hidden",state:"hidden"},{id:"business-unit",label:"Business unit",section:"hidden",state:"hidden"},{id:"talent-pool",label:"Talent pool",section:"hidden",state:"hidden"},{id:"day-rate",label:"Day rate",section:"hidden",state:"hidden"},{id:"starting-date",label:"Starting date",section:"hidden",state:"hidden"},{id:"languages",label:"Languages",section:"hidden",state:"hidden"},{id:"reports-to",label:"Reports to",section:"hidden",state:"hidden"}];function u({children:t}){return e.jsxs("div",{style:{display:"flex",height:"100vh",background:"var(--palette-neutral-2)"},children:[e.jsx(m,{activeId:"workflow"}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:14,color:"var(--palette-blue-2)"},children:"Table properties side panel"})}),t]})}const q={title:"Side Panels/Table Properties",parameters:{layout:"fullscreen",viewport:{defaultViewport:"screen1440"},docs:{description:{component:"Table Properties Side Panel — Figma node 9657:92683. Width: 400px. Default: no tabs, grouping switch, visible/hidden columns with Switch. BE: tabs Engagements | Roles | Profile (fillWidth), no grouping, fields with 3-state icon toggle (hidden|list|table); the first field of each tab (the title) is locked."}}}},i=()=>{const[t,a]=b.useState(!0);return e.jsx(u,{children:e.jsx(p,{open:t,onClose:()=>a(!1),data:{variant:"default",columns:h,groupingOn:!1}})})},l=()=>{const[t,a]=b.useState(!0);return e.jsx(u,{children:e.jsx(p,{open:t,onClose:()=>a(!1),data:{variant:"be",tabs:[{id:"engagements",label:"Engagements",columns:g},{id:"roles",label:"Roles",columns:f},{id:"profile",label:"Profile",columns:v}]}})})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};l.__docgenInfo={description:"",methods:[],displayName:"BookingEngine"};var n,s,o;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const [open, setOpen] = useState(true);
  return <Wrapper>
      <TablePropertiesSidePanel open={open} onClose={() => setOpen(false)} data={{
      variant: "default",
      columns: DEFAULT_COLS,
      groupingOn: false
    }} />
    </Wrapper>;
}`,...(o=(s=i.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var d,r,c;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const [open, setOpen] = useState(true);
  return <Wrapper>
      <TablePropertiesSidePanel open={open} onClose={() => setOpen(false)} data={{
      variant: "be",
      tabs: [{
        id: "engagements",
        label: "Engagements",
        columns: engagementCols
      }, {
        id: "roles",
        label: "Roles",
        columns: roleCols
      }, {
        id: "profile",
        label: "Profile",
        columns: profileCols
      }]
    }} />
    </Wrapper>;
}`,...(c=(r=l.parameters)==null?void 0:r.docs)==null?void 0:c.source}}};const F=["Default","BookingEngine"];export{l as BookingEngine,i as Default,F as __namedExportsOrder,q as default};
