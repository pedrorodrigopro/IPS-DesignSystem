import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-DhMLlvMY.js";import{E as l}from"./engagement_side_panel-BSj01ePX.js";import{N as d}from"./navbar-CLhydjZL.js";import"./_commonjsHelpers-CqkleIqs.js";import"./side_panel-BpkywXw5.js";import"./index-Dd5QUkq_.js";import"./divider-CKitOyrn.js";import"./icon-q_ctI9hk.js";import"./button-CreEIUG8.js";import"./workforce_member-B_MDXWt7.js";import"./avatar-DzCkQh3P.js";import"./tooltip-CfgRuyaf.js";import"./index-2UU9FgV2.js";import"./index-D7lG0nq1.js";import"./actions-fPgFcG-R.js";const I={title:"Side Panels/Engagement",parameters:{layout:"fullscreen",viewport:{defaultViewport:"screen1440"},docs:{description:{component:"Engagement Side Panel — Figma node 1644:28000. Width: 400px. Triggered from Booking Engine engagement rows or Workflow engagement list. Header: engagement icon + title (H4) + two icon buttons | 'Engagement' type label (28px indent). Subtitle: ID | State | Privacy | Participant (bold values). Sections: Owner → Description → Dates → Budget vs Cost (bar chart) → Details → Creator. Sticky actions: Cancel | Open engagement."}}}},t=()=>{const[i,o]=s.useState(!0);return e.jsxs("div",{style:{display:"flex",height:"100vh",background:"var(--palette-neutral-2)"},children:[e.jsx(d,{activeId:"booking"}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:14,color:"var(--palette-blue-2)"},children:"Engagement side panel"})}),e.jsx(l,{open:i,onClose:()=>o(!1),data:{title:"[2025] ProFinda Consulting",id:"100000064",state:"Open",privacy:"Public",participant:"Co-Owner",ownerName:"Fake Surname",ownerInitials:"FS",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",duration:"365 days",timeLeft:"280 days",dateCreated:"25-09-2025",roles:"3",filled:"2",budget:"£180,000",cost:"£112,000",privacyValue:"Public",serviceLineGroup:"Strategy",requestedBy:"Spencer Harmon",creatorName:"Spencer Harmon",creatorInitials:"SH"}})]})};t.__docgenInfo={description:"",methods:[],displayName:"Engagement"};var n,a,r;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const [open, setOpen] = useState(true);
  return <div style={{
    display: "flex",
    height: "100vh",
    background: "var(--palette-neutral-2)"
  }}>
      <Navbar activeId="booking" />
      <div style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
        <p style={{
        fontFamily: "var(--font-family)",
        fontSize: 14,
        color: "var(--palette-blue-2)"
      }}>
          Engagement side panel
        </p>
      </div>
      <EngagementSidePanel open={open} onClose={() => setOpen(false)} data={{
      title: "[2025] ProFinda Consulting",
      id: "100000064",
      state: "Open",
      privacy: "Public",
      participant: "Co-Owner",
      ownerName: "Fake Surname",
      ownerInitials: "FS",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      duration: "365 days",
      timeLeft: "280 days",
      dateCreated: "25-09-2025",
      roles: "3",
      filled: "2",
      budget: "£180,000",
      cost: "£112,000",
      privacyValue: "Public",
      serviceLineGroup: "Strategy",
      requestedBy: "Spencer Harmon",
      creatorName: "Spencer Harmon",
      creatorInitials: "SH"
    }} />
    </div>;
}`,...(r=(a=t.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};const O=["Engagement"];export{t as Engagement,O as __namedExportsOrder,I as default};
