import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-DhMLlvMY.js";import{R as s}from"./role_side_panel-C73wgg3o.js";import{N as c}from"./navbar-CLhydjZL.js";import"./_commonjsHelpers-CqkleIqs.js";import"./side_panel-BpkywXw5.js";import"./index-Dd5QUkq_.js";import"./header-GBiiDxBK.js";import"./icon-q_ctI9hk.js";import"./divider-CKitOyrn.js";import"./button-CreEIUG8.js";import"./workforce_member-B_MDXWt7.js";import"./avatar-DzCkQh3P.js";import"./tooltip-CfgRuyaf.js";import"./index-2UU9FgV2.js";import"./index-D7lG0nq1.js";import"./pill-_Y6bw78A.js";import"./alert-CCf9NA_Q.js";import"./skill-BRQYQHNr.js";const N={title:"Side Panels/Role",parameters:{layout:"fullscreen",viewport:{defaultViewport:"screen1440"},docs:{description:{component:"Role Side Panel — Figma node 1644:29133. Width: 400px. Triggered from Booking Engine role rows or Workflow role names. Header: role icon + title (H4) + two icon buttons | 'Role' type label (28px indent). Subtitle: PillWFState + Activity tag pill + ID | State | Privacy | Participant. Object card (neutral-2 bg): engagement reference with open/workforce icons. Sections: Owner → Description → Dates → Skills → Privacy → Creator. No sticky actions."}}}},t=()=>{const[r,o]=l.useState(!0);return e.jsxs("div",{style:{display:"flex",height:"100vh",background:"var(--palette-neutral-2)"},children:[e.jsx(c,{activeId:"booking"}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:14,color:"var(--palette-blue-2)"},children:"Role side panel"})}),e.jsx(s,{open:r,onClose:()=>o(!1),data:{title:"Project Manager",wfState:"shortlisting",activityTag:"RM to review",id:"100000064",state:"Open",privacy:"Public",participant:"Co-Owner",engagementName:"Front end team Q2 Front end team Q2",owners:[{name:"Santiago A CV Upload",initials:"SC"}],description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",duration:"14 days",timeLeft:"6 days",dateCreated:"13-07-2026",rolesCount:"2/3",filled:"2",skills:[{label:"Jira",proficiency:"advanced"},{label:"Project Management",proficiency:"intermediate",core:!0},{label:"Agile",proficiency:"basic"}],privacyValue:"Public",creatorName:"Spencer Harmon",creatorInitials:"SH"}})]})};t.__docgenInfo={description:"",methods:[],displayName:"Role"};var n,i,a;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
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
          Role side panel
        </p>
      </div>
      <RoleSidePanel open={open} onClose={() => setOpen(false)} data={{
      title: "Project Manager",
      wfState: "shortlisting",
      activityTag: "RM to review",
      id: "100000064",
      state: "Open",
      privacy: "Public",
      participant: "Co-Owner",
      engagementName: "Front end team Q2 Front end team Q2",
      owners: [{
        name: "Santiago A CV Upload",
        initials: "SC"
      }],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      duration: "14 days",
      timeLeft: "6 days",
      dateCreated: "13-07-2026",
      rolesCount: "2/3",
      filled: "2",
      skills: [{
        label: "Jira",
        proficiency: "advanced"
      }, {
        label: "Project Management",
        proficiency: "intermediate",
        core: true
      }, {
        label: "Agile",
        proficiency: "basic"
      }],
      privacyValue: "Public",
      creatorName: "Spencer Harmon",
      creatorInitials: "SH"
    }} />
    </div>;
}`,...(a=(i=t.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const F=["Role"];export{t as Role,F as __namedExportsOrder,N as default};
