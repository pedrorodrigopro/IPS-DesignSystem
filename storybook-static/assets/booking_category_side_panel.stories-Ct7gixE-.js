import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-DhMLlvMY.js";import{S as w}from"./side_panel-CZBeQyPv.js";import{H}from"./header-C72qAAzd.js";import{I as R}from"./icon-D1UQke6Y.js";import{B as P}from"./button-CreEIUG8.js";import{I as x,a as N}from"./input-B84e0Cz_.js";import{A as O}from"./actions-C2C3mw1v.js";import{C as _}from"./checkbox-Dd9w011Z.js";import{N as z}from"./navbar-CeuCg8an.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./avatar-DzCkQh3P.js";const d={fontFamily:"var(--font-family)",fontSize:12,fontWeight:400,color:"var(--palette-blue-0)",lineHeight:"150%"},L=["#2358F8","#0C1457","#1AAFA3","#248E61","#FFCD38","#D42A36","#9B5A01","#550568","#8D112E","#1C4B94","#6A82C5","#94B7EF","#F3A1B4","#E3A1F3","#C8EEDE","#FFE8AD","#FFE2E2","#E7EAF8","#0D2976","#5C6E9E","#000000","#333333","#FFFFFF","#F8F9FD"];function W({value:n,onChange:i}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("span",{style:d,children:"Color"}),e.jsxs("div",{style:{width:"100%",height:40,borderRadius:"var(--radius-md)",border:"1px solid var(--palette-neutral-0)",background:n||"var(--palette-neutral-1)",cursor:"pointer",display:"flex",alignItems:"center",paddingLeft:12,gap:8},children:[e.jsx("div",{style:{width:20,height:20,borderRadius:"var(--radius-sm)",background:n,border:"1px solid rgba(0,0,0,0.1)"}}),e.jsx("span",{style:{...d,fontWeight:700},children:n||"Select colour"})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(8, 1fr)",gap:4},children:L.map(a=>e.jsx("button",{onClick:()=>i(a),title:a,style:{width:"100%",aspectRatio:"1",borderRadius:"var(--radius-sm)",background:a,cursor:"pointer",border:n===a?"2px solid var(--palette-blue-1)":"1px solid rgba(0,0,0,0.08)",outline:"none"}},a))})]})}function r({label:n,checked:i,onChange:a}){return e.jsx(_,{label:n,checked:i,onChange:a})}function V({children:n}){return e.jsx("div",{style:{background:"var(--palette-neutral-2)",border:"1px solid var(--palette-neutral-0)",borderRadius:"var(--radius-md)",padding:16,display:"flex",flexDirection:"column",gap:12},children:n})}function C({open:n,onClose:i,onSave:a,data:s={}}){const[c,j]=l.useState(s.name??""),[p,S]=l.useState(s.displayAs??""),[u,q]=l.useState(s.billable??!0),[g,F]=l.useState(s.affectsAvail??!0),[y,B]=l.useState(s.isHoliday??!1),[f,E]=l.useState(s.isAbsence??!1),[m,D]=l.useState(s.isTraining??!1),[v,Y]=l.useState(s.requiresApproval??"Never"),[b,T]=l.useState(s.color??"#2358F8"),I=()=>{a==null||a({name:c,displayAs:p,billable:u,affectsAvail:g,isHoliday:y,isAbsence:f,isTraining:m,requiresApproval:v,color:b}),i()};return e.jsxs(w,{open:n,onClose:i,width:400,children:[e.jsx("div",{style:{padding:"24px 24px 0",flexShrink:0},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(H,{size:"content",title:"Booking category"}),e.jsx(P,{kind:"iconTertiary",size:"regular",title:"Close",onClick:i,children:e.jsx(R,{name:"cross",size:16})})]})}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"16px 24px 0",display:"flex",flexDirection:"column",gap:16},children:[e.jsx(x,{label:"Name",value:c,onChange:o=>j(o.target.value),placeholder:"Enter name"}),e.jsx(x,{label:"Display as",value:p,onChange:o=>S(o.target.value),placeholder:"Enter display name"}),e.jsxs(V,{children:[e.jsx(r,{label:"Billable",checked:u,onChange:q}),e.jsx(r,{label:"Affects availability",checked:g,onChange:F})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx("span",{style:d,children:"Properties"}),e.jsx(r,{label:"Holiday",checked:y,onChange:B}),e.jsx(r,{label:"Absence",checked:f,onChange:E}),e.jsx(r,{label:"Training",checked:m,onChange:D})]}),e.jsx(N,{label:"Requires Approval",value:v,onClick:()=>{}}),e.jsx(W,{value:b,onChange:T}),e.jsx("div",{style:{height:8}})]}),e.jsx(O,{variant:"sticky-panel",leftActions:[{label:"Cancel",variant:"secondary",onClick:i}],rightActions:[{label:"Save",variant:"primary",onClick:I}]})]})}C.__docgenInfo={description:"",methods:[],displayName:"BookingCategorySidePanel",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSave:{required:!1,tsType:{name:"signature",type:"function",raw:"(data: BookingCategoryData) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  name?:             string;
  displayAs?:        string;
  // Billable & Availability toggles
  billable?:         boolean;
  affectsAvail?:     boolean;
  // Properties toggles
  isHoliday?:        boolean;
  isAbsence?:        boolean;
  isTraining?:       boolean;
  // Requires Approval
  requiresApproval?: string; // "Never" | "Always" | "Sometimes"
  // Colour — hex string e.g. "#2358F8"
  color?:            string;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!1}},{key:"displayAs",value:{name:"string",required:!1}},{key:"billable",value:{name:"boolean",required:!1}},{key:"affectsAvail",value:{name:"boolean",required:!1}},{key:"isHoliday",value:{name:"boolean",required:!1}},{key:"isAbsence",value:{name:"boolean",required:!1}},{key:"isTraining",value:{name:"boolean",required:!1}},{key:"requiresApproval",value:{name:"string",required:!1}},{key:"color",value:{name:"string",required:!1}}]}},name:"data"}],return:{name:"void"}}},description:""},data:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  name?:             string;
  displayAs?:        string;
  // Billable & Availability toggles
  billable?:         boolean;
  affectsAvail?:     boolean;
  // Properties toggles
  isHoliday?:        boolean;
  isAbsence?:        boolean;
  isTraining?:       boolean;
  // Requires Approval
  requiresApproval?: string; // "Never" | "Always" | "Sometimes"
  // Colour — hex string e.g. "#2358F8"
  color?:            string;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!1}},{key:"displayAs",value:{name:"string",required:!1}},{key:"billable",value:{name:"boolean",required:!1}},{key:"affectsAvail",value:{name:"boolean",required:!1}},{key:"isHoliday",value:{name:"boolean",required:!1}},{key:"isAbsence",value:{name:"boolean",required:!1}},{key:"isTraining",value:{name:"boolean",required:!1}},{key:"requiresApproval",value:{name:"string",required:!1}},{key:"color",value:{name:"string",required:!1}}]}},description:"",defaultValue:{value:"{}",computed:!1}}}};const le={title:"Side Panels/Booking Category",parameters:{layout:"fullscreen",viewport:{defaultViewport:"screen1440"},docs:{description:{component:"Booking Category Side Panel — Figma node 7359:238082. Width: 400px. Slides in from right (300ms ease). Fields: Name, Display as, Billable & Availability toggles, Properties toggles, Requires Approval select, Colour picker. Sticky actions (Actions/Overlays sticky-panel variant): Cancel | Save. Triggered from Booking Engine calendar cells."}}}},t=()=>{const[n,i]=l.useState(!0);return e.jsxs("div",{style:{display:"flex",height:"100vh",background:"var(--palette-neutral-2)"},children:[e.jsx(z,{activeId:"booking"}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:14,color:"var(--palette-blue-2)"},children:"Booking Category side panel"})}),e.jsx(C,{open:n,onClose:()=>i(!1),onSave:a=>{console.log("Saved:",a)},data:{name:"Holiday",displayAs:"Holiday",billable:!1,affectsAvail:!0,color:"#FFCD38"}})]})};t.__docgenInfo={description:"",methods:[],displayName:"BookingCategory"};var h,A,k;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
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
          Booking Category side panel
        </p>
      </div>
      <BookingCategorySidePanel open={open} onClose={() => setOpen(false)} onSave={data => {
      console.log("Saved:", data);
    }} data={{
      name: "Holiday",
      displayAs: "Holiday",
      billable: false,
      affectsAvail: true,
      color: "#FFCD38"
    }} />
    </div>;
}`,...(k=(A=t.parameters)==null?void 0:A.docs)==null?void 0:k.source}}};const se=["BookingCategory"];export{t as BookingCategory,se as __namedExportsOrder,le as default};
