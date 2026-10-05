import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as k}from"./index-DhMLlvMY.js";import{S,c as w}from"./side_panel-CZBeQyPv.js";import{H as C}from"./header-C72qAAzd.js";import{D as d}from"./divider-CKitOyrn.js";import{I as t}from"./icon-D1UQke6Y.js";import{B as s}from"./button-CreEIUG8.js";import{W as v}from"./workforce_member-DGZhzlsU.js";import{d as q}from"./pill-bqMN6uXB.js";import{b as z}from"./skill-D--uWoeQ.js";import{N as I}from"./navbar-CeuCg8an.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./avatar-DzCkQh3P.js";import"./tooltip-Bkp5rPqR.js";const P={fontFamily:"var(--font-family)",fontSize:20,fontWeight:600,color:"var(--palette-blue-0)",lineHeight:"125%"},R={fontFamily:"var(--font-family)",fontSize:16,fontWeight:600,color:"var(--palette-blue-0)",lineHeight:"125%"},f={fontFamily:"var(--font-family)",fontSize:14,fontWeight:400,color:"var(--palette-blue-0)",lineHeight:"115%"},D={fontFamily:"var(--font-family)",fontSize:14,fontWeight:700,color:"var(--palette-blue-0)",lineHeight:"115%"},o={fontFamily:"var(--font-family)",fontSize:12,fontWeight:400,color:"var(--palette-blue-2)",lineHeight:"150%"},m={fontFamily:"var(--font-family)",fontSize:14,fontWeight:700,color:"var(--palette-primary-0)",lineHeight:"115%",background:"none",border:"none",cursor:"pointer",padding:0};function p({label:r,value:l}){return e.jsxs("span",{style:f,children:[r," ",e.jsx("span",{style:D,children:l})]})}function u(){return e.jsx("div",{style:{width:1,height:18,background:"var(--palette-neutral-0)",flexShrink:0}})}function a({label:r,value:l}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:2,flex:1,minWidth:0},children:[e.jsx("span",{style:o,children:r}),e.jsx("span",{style:f,children:l||"—"})]})}function b({open:r,onClose:l,data:i}){var y,g;return e.jsx(S,{open:r,onClose:l,width:400,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"24px 24px 0",flexShrink:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,minWidth:0,flex:1},children:[e.jsx(t,{name:"role",size:20,style:{color:"var(--palette-blue-2)",flexShrink:0}}),e.jsx("span",{style:{...P,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:i.title})]}),e.jsxs("div",{style:{display:"flex",gap:4,flexShrink:0,marginLeft:8},children:[e.jsx(s,{kind:"iconTertiary",size:"regular",title:"External link",onClick:i.onOpenEngagement,children:e.jsx(t,{name:"open",size:16})}),e.jsx(s,{kind:"iconTertiary",size:"regular",title:"Close",onClick:l,children:e.jsx(t,{name:"cross",size:16})})]})]}),e.jsx("span",{style:{...o,paddingLeft:28},children:"Role"})]}),e.jsxs("div",{className:w.content,style:{padding:"16px 24px 24px"},children:[e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8},children:[i.wfState&&e.jsx(q,{state:i.wfState,size:"small"}),i.activityTag&&e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:4,padding:"4px 8px",borderRadius:16,background:"var(--palette-neutral-0)"},children:[e.jsx(t,{name:"tag",size:14,style:{color:"var(--palette-blue-0)"}}),e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:12,fontWeight:400,color:"var(--palette-blue-0)"},children:i.activityTag})]}),i.id&&e.jsx(p,{label:"ID",value:i.id}),i.id&&i.state&&e.jsx(u,{}),i.state&&e.jsx(p,{label:"State",value:i.state}),i.state&&i.privacy&&e.jsx(u,{}),i.privacy&&e.jsx(p,{label:"Privacy",value:i.privacy}),i.privacy&&i.participant&&e.jsx(u,{}),i.participant&&e.jsx(p,{label:"Participant",value:i.participant})]}),i.engagementName&&e.jsxs("div",{style:{background:"var(--palette-neutral-2)",borderRadius:"var(--radius-md)",padding:8,display:"flex",flexDirection:"column",gap:6},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx(t,{name:"engagement",size:14,style:{color:"var(--palette-blue-2)"}}),e.jsx("span",{style:o,children:i.engagementLabel??"Engagement"})]}),e.jsxs("div",{style:{display:"flex",gap:4},children:[e.jsx(s,{kind:"iconTertiary",size:"regular",title:"Show in workforce tab",children:e.jsx(t,{name:"profiles",size:14})}),e.jsx(s,{kind:"iconTertiary",size:"regular",title:"Open engagement",onClick:i.onOpenEngagement,children:e.jsx(t,{name:"open",size:14})})]})]}),e.jsx("button",{style:{...m,textAlign:"left",paddingLeft:22},children:i.engagementName})]}),e.jsx(d,{orientation:"horizontal"}),e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:16},children:[e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4,minWidth:0},children:[e.jsx("span",{style:o,children:"Owner"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:(y=i.owners)!=null&&y.length?i.owners.map(n=>e.jsx(v,{variant:"small-1line",name:n.name,initials:n.initials},n.name)):e.jsx("button",{style:{...m,textAlign:"left"},children:"Add owner"})})]}),e.jsx(s,{kind:"icon",size:"regular",title:"Add owner",children:e.jsx(t,{name:"owner",size:16})})]}),e.jsx(d,{orientation:"horizontal"}),i.description&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx("span",{style:R,children:"Description"}),e.jsx("span",{style:f,children:i.description}),e.jsx("button",{style:{...m,textAlign:"left"},children:"show more"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[i.duration&&e.jsx(a,{label:"Duration",value:i.duration}),(i.timeLeft||i.dateCreated)&&e.jsxs("div",{style:{display:"flex",gap:8},children:[i.timeLeft&&e.jsx(a,{label:"Time left",value:i.timeLeft}),i.dateCreated&&e.jsx(a,{label:"Date created",value:i.dateCreated})]}),(i.rolesCount||i.filled)&&e.jsxs("div",{style:{display:"flex",gap:8},children:[i.rolesCount&&e.jsx(a,{label:"Roles",value:i.rolesCount}),i.filled&&e.jsx(a,{label:"Filled",value:i.filled})]})]}),(((g=i.skills)==null?void 0:g.length)??0)>0&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx(C,{size:"content",title:"Skills"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:i.skills.map(n=>e.jsx(z,{label:n.label,proficiency:n.proficiency,core:n.core,verified:n.verified},n.label))})]}),e.jsx(d,{orientation:"horizontal"}),(i.privacyValue||i.privacyInfo)&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[i.privacyValue&&e.jsxs("div",{style:{display:"flex",alignItems:"flex-end",gap:8},children:[e.jsx(a,{label:"Privacy",value:i.privacyValue}),e.jsx(t,{name:"info",size:14,style:{color:"var(--palette-blue-2)",marginBottom:4,flexShrink:0}})]}),i.privacyInfo&&e.jsx(a,{label:"Privacy info",value:i.privacyInfo})]}),e.jsx(d,{orientation:"horizontal"}),i.creatorName&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("span",{style:o,children:"Creator"}),e.jsx(v,{variant:"small-1line",name:i.creatorName,initials:i.creatorInitials})]})]})]})})}b.__docgenInfo={description:"",methods:[],displayName:"RoleSidePanel",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},data:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  // Header
  title:         string;
  wfState?:      WFState;
  activityTag?:  string;
  // Subtitle
  id?:           string;
  state?:        string;
  privacy?:      string;
  participant?:  string;
  // Object card — engagement reference
  engagementName?:     string;
  engagementLabel?:    string; // defaults "Engagement"
  onOpenEngagement?:   () => void;
  // Owner
  owners?:       { name: string; initials: string }[];
  // Description
  description?:  string;
  // Dates
  duration?:     string;
  timeLeft?:     string;
  dateCreated?:  string;
  rolesCount?:   string;
  filled?:       string;
  // Skills
  skills?:       RoleSidePanelSkill[];
  // Privacy section
  privacyValue?: string;
  privacyInfo?:  string;
  // Creator
  creatorName?:     string;
  creatorInitials?: string;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"wfState",value:{name:"union",raw:`| "new" | "shortlisting" | "in-review" | "invited"
| "partially-filled" | "filled" | "partially-booked" | "booked"
| "partially-confirmed" | "confirmed" | "not-filled" | "exceptions" | "pending"
// Audit-planner-specific overlay states (red, bold label)
| "technical-overlay" | "accreditations"`,elements:[{name:"literal",value:'"new"'},{name:"literal",value:'"shortlisting"'},{name:"literal",value:'"in-review"'},{name:"literal",value:'"invited"'},{name:"literal",value:'"partially-filled"'},{name:"literal",value:'"filled"'},{name:"literal",value:'"partially-booked"'},{name:"literal",value:'"booked"'},{name:"literal",value:'"partially-confirmed"'},{name:"literal",value:'"confirmed"'},{name:"literal",value:'"not-filled"'},{name:"literal",value:'"exceptions"'},{name:"literal",value:'"pending"'},{name:"literal",value:'"technical-overlay"'},{name:"literal",value:'"accreditations"'}],required:!1}},{key:"activityTag",value:{name:"string",required:!1}},{key:"id",value:{name:"string",required:!1}},{key:"state",value:{name:"string",required:!1}},{key:"privacy",value:{name:"string",required:!1}},{key:"participant",value:{name:"string",required:!1}},{key:"engagementName",value:{name:"string",required:!1}},{key:"engagementLabel",value:{name:"string",required:!1}},{key:"onOpenEngagement",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"owners",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ name: string; initials: string }",signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"initials",value:{name:"string",required:!0}}]}}],raw:"{ name: string; initials: string }[]",required:!1}},{key:"description",value:{name:"string",required:!1}},{key:"duration",value:{name:"string",required:!1}},{key:"timeLeft",value:{name:"string",required:!1}},{key:"dateCreated",value:{name:"string",required:!1}},{key:"rolesCount",value:{name:"string",required:!1}},{key:"filled",value:{name:"string",required:!1}},{key:"skills",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label:       string;
  proficiency: "basic" | "intermediate" | "advanced";
  core?:       boolean;
  verified?:   boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"proficiency",value:{name:"union",raw:'"basic" | "intermediate" | "advanced"',elements:[{name:"literal",value:'"basic"'},{name:"literal",value:'"intermediate"'},{name:"literal",value:'"advanced"'}],required:!0}},{key:"core",value:{name:"boolean",required:!1}},{key:"verified",value:{name:"boolean",required:!1}}]}}],raw:"RoleSidePanelSkill[]",required:!1}},{key:"privacyValue",value:{name:"string",required:!1}},{key:"privacyInfo",value:{name:"string",required:!1}},{key:"creatorName",value:{name:"string",required:!1}},{key:"creatorInitials",value:{name:"string",required:!1}}]}},description:""}}};const U={title:"Side Panels/Role",parameters:{layout:"fullscreen",viewport:{defaultViewport:"screen1440"},docs:{description:{component:"Role Side Panel — Figma node 1644:29133. Width: 400px. Triggered from Booking Engine role rows or Workflow role names. Header: role icon + title (H4) + two icon buttons | 'Role' type label (28px indent). Subtitle: PillWFState + Activity tag pill + ID | State | Privacy | Participant. Object card (neutral-2 bg): engagement reference with open/workforce icons. Sections: Owner → Description → Dates → Skills → Privacy → Creator. No sticky actions."}}}},c=()=>{const[r,l]=k.useState(!0);return e.jsxs("div",{style:{display:"flex",height:"100vh",background:"var(--palette-neutral-2)"},children:[e.jsx(I,{activeId:"booking"}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:14,color:"var(--palette-blue-2)"},children:"Role side panel"})}),e.jsx(b,{open:r,onClose:()=>l(!1),data:{title:"Project Manager",wfState:"shortlisting",activityTag:"RM to review",id:"100000064",state:"Open",privacy:"Public",participant:"Co-Owner",engagementName:"Front end team Q2 Front end team Q2",owners:[{name:"Santiago A CV Upload",initials:"SC"}],description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",duration:"14 days",timeLeft:"6 days",dateCreated:"13-07-2026",rolesCount:"2/3",filled:"2",skills:[{label:"Jira",proficiency:"advanced"},{label:"Project Management",proficiency:"intermediate",core:!0},{label:"Agile",proficiency:"basic"}],privacyValue:"Public",creatorName:"Spencer Harmon",creatorInitials:"SH"}})]})};c.__docgenInfo={description:"",methods:[],displayName:"Role"};var x,h,j;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
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
}`,...(j=(h=c.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};const K=["Role"];export{c as Role,K as __namedExportsOrder,U as default};
