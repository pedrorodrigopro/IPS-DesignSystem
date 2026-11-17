import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as q}from"./index-DhMLlvMY.js";import{P as t}from"./pp_suggestion_card-CPN9dMYl.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const c="linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)",E={title:"Components/PPSuggestionCard",component:t,parameters:{design:{type:"figma",url:"https://www.figma.com/design/xtnTudkEZpuxJoPDSN0xFJ?node-id=634-109034"},layout:"centered"}},i=()=>{const[d,n]=q.useState("default");return e.jsx("div",{style:{width:380,padding:16,background:c,borderRadius:12,display:"flex",flexDirection:"column",gap:8},children:e.jsx(t,{variant:"dark",state:d,action:"Move Tech Lead to week 3 (Mon 14 Sep)",detail:"Shift the 160h Tech Lead booking from Mon 7 Sep → Mon 14 Sep. ST Role#2 stays unchanged. Result: no overlap.",previewHint:"Hover to preview result in calendar",onAccept:()=>n("accepted"),onDismiss:()=>n("dismissed")})})};i.parameters={backgrounds:{default:"dark",values:[{name:"dark",value:"#0C1457"}]}};const s=()=>{const[d,n]=q.useState("default");return e.jsx("div",{style:{width:380,padding:16,background:"white",border:"1px solid #CFDAF7",borderRadius:12,display:"flex",flexDirection:"column",gap:8},children:e.jsx(t,{variant:"light",state:d,action:"Add Risk Management to your skills",detail:"Senior Auditor roles typically require Risk Management. Adding it increases your match score by ~12%.",previewHint:"Hover to preview on profile",onAccept:()=>n("accepted"),onDismiss:()=>n("dismissed")})})},a=()=>e.jsxs("div",{style:{width:380,padding:16,background:c,borderRadius:12,display:"flex",flexDirection:"column",gap:8},children:[e.jsx(t,{variant:"dark",state:"default",action:"Move Tech Lead to week 3",detail:"Shift the booking to avoid overlap.",previewHint:"Hover to preview",onAccept:()=>{},onDismiss:()=>{}}),e.jsx(t,{variant:"dark",state:"accepted",action:"Move Tech Lead to week 3",detail:"Shift the booking to avoid overlap."}),e.jsx(t,{variant:"dark",state:"dismissed",action:"Move Tech Lead to week 3",detail:"Shift the booking to avoid overlap."})]});a.parameters={backgrounds:{default:"dark",values:[{name:"dark",value:"#0C1457"}]}};const o=()=>e.jsxs("div",{style:{width:380,padding:16,background:"white",border:"1px solid #CFDAF7",borderRadius:12,display:"flex",flexDirection:"column",gap:8},children:[e.jsx(t,{variant:"light",state:"default",action:"Add Risk Management",detail:"Senior Auditor roles require it.",previewHint:"Hover to preview",onAccept:()=>{},onDismiss:()=>{}}),e.jsx(t,{variant:"light",state:"accepted",action:"Add Risk Management",detail:"Senior Auditor roles require it."}),e.jsx(t,{variant:"light",state:"dismissed",action:"Add Risk Management",detail:"Senior Auditor roles require it."})]}),r=()=>e.jsx("div",{style:{padding:24,background:c,borderRadius:12,width:420},children:e.jsx(t,{variant:"dark",action:"Option 1",detail:"Reduce the availability requirements, which will result in 5 matches",acceptLabel:"Reduce availability",hideDismiss:!0})});i.__docgenInfo={description:"Dark variant — inside the floating glass window",methods:[],displayName:"Dark"};s.__docgenInfo={description:"Light variant — inside the docked white panel",methods:[],displayName:"Light"};a.__docgenInfo={description:"All states — dark",methods:[],displayName:"AllStatesDark"};o.__docgenInfo={description:"All states — light",methods:[],displayName:"AllStatesLight"};r.__docgenInfo={description:"Custom main button label, no Dismiss button — e.g. an option with a single call to action",methods:[],displayName:"CustomButton"};var l,p,u,g,m;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const [state, setState] = useState<"default" | "accepted" | "dismissed">("default");
  return <div style={{
    width: 380,
    padding: 16,
    background: GLASS_BG,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      <PPSuggestionCard variant="dark" state={state} action="Move Tech Lead to week 3 (Mon 14 Sep)" detail="Shift the 160h Tech Lead booking from Mon 7 Sep → Mon 14 Sep. ST Role#2 stays unchanged. Result: no overlap." previewHint="Hover to preview result in calendar" onAccept={() => setState("accepted")} onDismiss={() => setState("dismissed")} />
    </div>;
}`,...(u=(p=i.parameters)==null?void 0:p.docs)==null?void 0:u.source},description:{story:"Dark variant — inside the floating glass window",...(m=(g=i.parameters)==null?void 0:g.docs)==null?void 0:m.description}}};var h,v,k,S,f;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [state, setState] = useState<"default" | "accepted" | "dismissed">("default");
  return <div style={{
    width: 380,
    padding: 16,
    background: "white",
    border: "1px solid #CFDAF7",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      <PPSuggestionCard variant="light" state={state} action="Add Risk Management to your skills" detail="Senior Auditor roles typically require Risk Management. Adding it increases your match score by ~12%." previewHint="Hover to preview on profile" onAccept={() => setState("accepted")} onDismiss={() => setState("dismissed")} />
    </div>;
}`,...(k=(v=s.parameters)==null?void 0:v.docs)==null?void 0:k.source},description:{story:"Light variant — inside the docked white panel",...(f=(S=s.parameters)==null?void 0:S.docs)==null?void 0:f.description}}};var w,b,y,A,x;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`() => <div style={{
  width: 380,
  padding: 16,
  background: GLASS_BG,
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  gap: 8
}}>
    <PPSuggestionCard variant="dark" state="default" action="Move Tech Lead to week 3" detail="Shift the booking to avoid overlap." previewHint="Hover to preview" onAccept={() => {}} onDismiss={() => {}} />
    <PPSuggestionCard variant="dark" state="accepted" action="Move Tech Lead to week 3" detail="Shift the booking to avoid overlap." />
    <PPSuggestionCard variant="dark" state="dismissed" action="Move Tech Lead to week 3" detail="Shift the booking to avoid overlap." />
  </div>`,...(y=(b=a.parameters)==null?void 0:b.docs)==null?void 0:y.source},description:{story:"All states — dark",...(x=(A=a.parameters)==null?void 0:A.docs)==null?void 0:x.description}}};var D,R,L,M,P;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`() => <div style={{
  width: 380,
  padding: 16,
  background: "white",
  border: "1px solid #CFDAF7",
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  gap: 8
}}>
    <PPSuggestionCard variant="light" state="default" action="Add Risk Management" detail="Senior Auditor roles require it." previewHint="Hover to preview" onAccept={() => {}} onDismiss={() => {}} />
    <PPSuggestionCard variant="light" state="accepted" action="Add Risk Management" detail="Senior Auditor roles require it." />
    <PPSuggestionCard variant="light" state="dismissed" action="Add Risk Management" detail="Senior Auditor roles require it." />
  </div>`,...(L=(R=o.parameters)==null?void 0:R.docs)==null?void 0:L.source},description:{story:"All states — light",...(P=(M=o.parameters)==null?void 0:M.docs)==null?void 0:P.description}}};var C,_,j,H,T;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  background: GLASS_BG,
  borderRadius: 12,
  width: 420
}}>
    <PPSuggestionCard variant="dark" action="Option 1" detail="Reduce the availability requirements, which will result in 5 matches" acceptLabel="Reduce availability" hideDismiss />
  </div>`,...(j=(_=r.parameters)==null?void 0:_.docs)==null?void 0:j.source},description:{story:"Custom main button label, no Dismiss button — e.g. an option with a single call to action",...(T=(H=r.parameters)==null?void 0:H.docs)==null?void 0:T.description}}};const O=["Dark","Light","AllStatesDark","AllStatesLight","CustomButton"];export{a as AllStatesDark,o as AllStatesLight,r as CustomButton,i as Dark,s as Light,O as __namedExportsOrder,E as default};
