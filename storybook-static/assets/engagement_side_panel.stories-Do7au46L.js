import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as j}from"./index-DhMLlvMY.js";import{S as b,c as k}from"./side_panel-CZBeQyPv.js";import{D as o}from"./divider-CKitOyrn.js";import{I as l}from"./icon-D1UQke6Y.js";import{B as c}from"./button-CreEIUG8.js";import{W as m}from"./workforce_member-DGZhzlsU.js";import{A as S}from"./actions-C2C3mw1v.js";import{N as w}from"./navbar-CeuCg8an.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./avatar-DzCkQh3P.js";import"./tooltip-Bkp5rPqR.js";const C={fontFamily:"var(--font-family)",fontSize:20,fontWeight:600,color:"var(--palette-blue-0)",lineHeight:"125%"},g={fontFamily:"var(--font-family)",fontSize:16,fontWeight:600,color:"var(--palette-blue-0)",lineHeight:"125%"},u={fontFamily:"var(--font-family)",fontSize:14,fontWeight:400,color:"var(--palette-blue-0)",lineHeight:"115%"},q={fontFamily:"var(--font-family)",fontSize:14,fontWeight:700,color:"var(--palette-blue-0)",lineHeight:"115%"},a={fontFamily:"var(--font-family)",fontSize:12,fontWeight:400,color:"var(--palette-blue-2)",lineHeight:"150%"},y={fontFamily:"var(--font-family)",fontSize:14,fontWeight:700,color:"var(--palette-primary-0)",lineHeight:"115%",background:"none",border:"none",cursor:"pointer",padding:0},I={fontFamily:"var(--font-family)",fontSize:14,fontWeight:400,color:"var(--palette-blue-2)",lineHeight:"115%"};function d({label:r,value:t}){return e.jsxs("span",{style:u,children:[r," ",e.jsx("span",{style:q,children:t})]})}function p(){return e.jsx("div",{style:{width:1,height:18,background:"var(--palette-neutral-0)",flexShrink:0}})}function n({label:r,value:t}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:2,flex:1,minWidth:0},children:[e.jsx("span",{style:a,children:r}),e.jsx("span",{style:u,children:t||"—"})]})}function h({open:r,onClose:t,data:i}){return e.jsx(b,{open:r,onClose:t,width:400,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"24px 24px 16px",flexShrink:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,minWidth:0,flex:1},children:[e.jsx(l,{name:"engagement",size:20,style:{color:"var(--palette-blue-2)",flexShrink:0}}),e.jsx("span",{style:{...C,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:i.title})]}),e.jsxs("div",{style:{display:"flex",gap:4,flexShrink:0,marginLeft:8},children:[e.jsx(c,{kind:"iconTertiary",size:"regular",title:"Open engagement",onClick:i.onCreateBooking,children:e.jsx(l,{name:"open",size:16})}),e.jsx(c,{kind:"iconTertiary",size:"regular",title:"Close",onClick:t,children:e.jsx(l,{name:"cross",size:16})})]})]}),e.jsx("span",{style:{...I,paddingLeft:28},children:"Engagement"})]}),e.jsxs("div",{className:k.content,style:{padding:"0 24px"},children:[e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,paddingBottom:16},children:[i.id&&e.jsx(d,{label:"ID",value:i.id}),i.id&&i.state&&e.jsx(p,{}),i.state&&e.jsx(d,{label:"State",value:i.state}),i.state&&i.privacy&&e.jsx(p,{}),i.privacy&&e.jsx(d,{label:"Privacy",value:i.privacy}),i.privacy&&i.participant&&e.jsx(p,{}),i.participant&&e.jsx(d,{label:"Participant",value:i.participant})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4,minWidth:0},children:[e.jsx("span",{style:a,children:"Owner"}),i.ownerName?e.jsx(m,{variant:"small-1line",name:i.ownerName,initials:i.ownerInitials}):e.jsx("button",{style:{...y,textAlign:"left"},children:"Add owner"})]}),e.jsx(c,{kind:"icon",size:"regular",title:"Add owner",children:e.jsx(l,{name:"owner",size:16})})]}),e.jsx(o,{orientation:"horizontal"}),i.description&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx("span",{style:g,children:"Description"}),e.jsx("span",{style:u,children:i.description}),e.jsx("button",{style:{...y,textAlign:"left"},children:"show more"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[i.duration&&e.jsx(n,{label:"Duration",value:i.duration}),(i.timeLeft||i.dateCreated)&&e.jsxs("div",{style:{display:"flex",gap:8},children:[i.timeLeft&&e.jsx(n,{label:"Time left",value:i.timeLeft}),i.dateCreated&&e.jsx(n,{label:"Date created",value:i.dateCreated})]}),(i.roles||i.filled)&&e.jsxs("div",{style:{display:"flex",gap:8},children:[i.roles&&e.jsx(n,{label:"Roles",value:i.roles}),i.filled&&e.jsx(n,{label:"Filled",value:i.filled})]})]}),e.jsx(o,{orientation:"horizontal"}),(i.budget||i.cost)&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx("span",{style:g,children:"Budget vs Cost"}),e.jsxs("div",{style:{height:8,borderRadius:4,background:"var(--palette-neutral-0)",overflow:"hidden",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",left:0,top:0,bottom:0,width:"62%",background:"#5470C6",borderRadius:"4px 0 0 4px"}}),e.jsx("div",{style:{position:"absolute",left:"62%",top:0,bottom:0,right:0,background:"#91CC75",borderRadius:"0 4px 4px 0"}})]}),e.jsxs("div",{style:{display:"flex",gap:16},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("div",{style:{width:12,height:12,borderRadius:2,background:"#5470C6",flexShrink:0}}),e.jsx("span",{style:a,children:"Budget"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("div",{style:{width:12,height:12,borderRadius:2,background:"#91CC75",flexShrink:0}}),e.jsx("span",{style:a,children:"Cost"})]})]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[i.budget&&e.jsx(n,{label:"Budget",value:i.budget}),i.cost&&e.jsx(n,{label:"Cost",value:i.cost})]})]}),e.jsx(o,{orientation:"horizontal"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[i.privacyValue&&e.jsxs("div",{style:{display:"flex",alignItems:"flex-end",gap:8},children:[e.jsx(n,{label:"Privacy",value:i.privacyValue}),e.jsx(l,{name:"info",size:14,style:{color:"var(--palette-blue-2)",marginBottom:4,flexShrink:0}})]}),(i.serviceLineGroup||i.requestedBy)&&e.jsxs("div",{style:{display:"flex",gap:8},children:[i.serviceLineGroup&&e.jsx(n,{label:"Service Line Group",value:i.serviceLineGroup}),i.requestedBy&&e.jsx(n,{label:"Requested by",value:i.requestedBy})]})]}),e.jsx(o,{orientation:"horizontal"}),i.creatorName&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("span",{style:a,children:"Creator"}),e.jsx(m,{variant:"small-1line",name:i.creatorName,initials:i.creatorInitials})]}),e.jsx("div",{style:{height:8}})]}),e.jsx(S,{variant:"sticky-panel",leftActions:[{label:"Cancel",variant:"secondary",onClick:t}],rightActions:[{label:"Create booking",variant:"primary",onClick:i.onCreateBooking}]})]})})}h.__docgenInfo={description:"",methods:[],displayName:"EngagementSidePanel",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},data:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  // Header
  title:         string;
  wfState?:      WFState;
  // Subtitle row
  id?:           string;
  state?:        string;
  privacy?:      string;
  participant?:  string;
  // Owner
  ownerName?:    string;
  ownerInitials?: string;
  // Description
  description?:  string;
  // Dates
  duration?:     string;
  timeLeft?:     string;
  dateCreated?:  string;
  roles?:        string;
  filled?:       string;
  // Budget vs Cost
  budget?:       string;
  cost?:         string;
  // Details
  privacyValue?:    string;
  serviceLineGroup?: string;
  requestedBy?:     string;
  // Creator
  creatorName?:     string;
  creatorInitials?: string;
  // Actions
  onCreateBooking?:       () => void;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"wfState",value:{name:"union",raw:`| "new" | "shortlisting" | "in-review" | "invited"
| "partially-filled" | "filled" | "partially-booked" | "booked"
| "partially-confirmed" | "confirmed" | "not-filled" | "exceptions" | "pending"
// Audit-planner-specific overlay states (red, bold label)
| "technical-overlay" | "accreditations"`,elements:[{name:"literal",value:'"new"'},{name:"literal",value:'"shortlisting"'},{name:"literal",value:'"in-review"'},{name:"literal",value:'"invited"'},{name:"literal",value:'"partially-filled"'},{name:"literal",value:'"filled"'},{name:"literal",value:'"partially-booked"'},{name:"literal",value:'"booked"'},{name:"literal",value:'"partially-confirmed"'},{name:"literal",value:'"confirmed"'},{name:"literal",value:'"not-filled"'},{name:"literal",value:'"exceptions"'},{name:"literal",value:'"pending"'},{name:"literal",value:'"technical-overlay"'},{name:"literal",value:'"accreditations"'}],required:!1}},{key:"id",value:{name:"string",required:!1}},{key:"state",value:{name:"string",required:!1}},{key:"privacy",value:{name:"string",required:!1}},{key:"participant",value:{name:"string",required:!1}},{key:"ownerName",value:{name:"string",required:!1}},{key:"ownerInitials",value:{name:"string",required:!1}},{key:"description",value:{name:"string",required:!1}},{key:"duration",value:{name:"string",required:!1}},{key:"timeLeft",value:{name:"string",required:!1}},{key:"dateCreated",value:{name:"string",required:!1}},{key:"roles",value:{name:"string",required:!1}},{key:"filled",value:{name:"string",required:!1}},{key:"budget",value:{name:"string",required:!1}},{key:"cost",value:{name:"string",required:!1}},{key:"privacyValue",value:{name:"string",required:!1}},{key:"serviceLineGroup",value:{name:"string",required:!1}},{key:"requestedBy",value:{name:"string",required:!1}},{key:"creatorName",value:{name:"string",required:!1}},{key:"creatorInitials",value:{name:"string",required:!1}},{key:"onCreateBooking",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}},description:""}}};const V={title:"Side Panels/Engagement",parameters:{layout:"fullscreen",viewport:{defaultViewport:"screen1440"},docs:{description:{component:"Engagement Side Panel — Figma node 1644:28000. Width: 400px. Triggered from Booking Engine engagement rows or Workflow engagement list. Header: engagement icon + title (H4) + two icon buttons | 'Engagement' type label (28px indent). Subtitle: ID | State | Privacy | Participant (bold values). Sections: Owner → Description → Dates → Budget vs Cost (bar chart) → Details → Creator. Sticky actions: Cancel | Open engagement."}}}},s=()=>{const[r,t]=j.useState(!0);return e.jsxs("div",{style:{display:"flex",height:"100vh",background:"var(--palette-neutral-2)"},children:[e.jsx(w,{activeId:"booking"}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:14,color:"var(--palette-blue-2)"},children:"Engagement side panel"})}),e.jsx(h,{open:r,onClose:()=>t(!1),data:{title:"[2025] ProFinda Consulting",id:"100000064",state:"Open",privacy:"Public",participant:"Co-Owner",ownerName:"Fake Surname",ownerInitials:"FS",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",duration:"365 days",timeLeft:"280 days",dateCreated:"25-09-2025",roles:"3",filled:"2",budget:"£180,000",cost:"£112,000",privacyValue:"Public",serviceLineGroup:"Strategy",requestedBy:"Spencer Harmon",creatorName:"Spencer Harmon",creatorInitials:"SH"}})]})};s.__docgenInfo={description:"",methods:[],displayName:"Engagement"};var f,v,x;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
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
}`,...(x=(v=s.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};const G=["Engagement"];export{s as Engagement,G as __namedExportsOrder,V as default};
