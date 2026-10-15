import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as P}from"./index-DhMLlvMY.js";import{P as t}from"./pp_suggestion_card-C80bYbNm.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const L="linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)",F={title:"Components/PPSuggestionCard",component:t,parameters:{design:{type:"figma",url:"https://www.figma.com/design/xtnTudkEZpuxJoPDSN0xFJ?node-id=634-109034"},layout:"centered"}},a=()=>{const[n,s]=P.useState("default");return e.jsx("div",{style:{width:380,padding:16,background:L,borderRadius:12,display:"flex",flexDirection:"column",gap:8},children:e.jsx(t,{variant:"dark",state:n,action:"Move Tech Lead to week 3 (Mon 14 Sep)",detail:"Shift the 160h Tech Lead booking from Mon 7 Sep → Mon 14 Sep. ST Role#2 stays unchanged. Result: no overlap.",previewHint:"Hover to preview result in calendar",onAccept:()=>s("accepted"),onDismiss:()=>s("dismissed")})})};a.parameters={backgrounds:{default:"dark",values:[{name:"dark",value:"#0C1457"}]}};const o=()=>{const[n,s]=P.useState("default");return e.jsx("div",{style:{width:380,padding:16,background:"white",border:"1px solid #CFDAF7",borderRadius:12,display:"flex",flexDirection:"column",gap:8},children:e.jsx(t,{variant:"light",state:n,action:"Add Risk Management to your skills",detail:"Senior Auditor roles typically require Risk Management. Adding it increases your match score by ~12%.",previewHint:"Hover to preview on profile",onAccept:()=>s("accepted"),onDismiss:()=>s("dismissed")})})},i=()=>e.jsxs("div",{style:{width:380,padding:16,background:L,borderRadius:12,display:"flex",flexDirection:"column",gap:8},children:[e.jsx(t,{variant:"dark",state:"default",action:"Move Tech Lead to week 3",detail:"Shift the booking to avoid overlap.",previewHint:"Hover to preview",onAccept:()=>{},onDismiss:()=>{}}),e.jsx(t,{variant:"dark",state:"accepted",action:"Move Tech Lead to week 3",detail:"Shift the booking to avoid overlap."}),e.jsx(t,{variant:"dark",state:"dismissed",action:"Move Tech Lead to week 3",detail:"Shift the booking to avoid overlap."})]});i.parameters={backgrounds:{default:"dark",values:[{name:"dark",value:"#0C1457"}]}};const r=()=>e.jsxs("div",{style:{width:380,padding:16,background:"white",border:"1px solid #CFDAF7",borderRadius:12,display:"flex",flexDirection:"column",gap:8},children:[e.jsx(t,{variant:"light",state:"default",action:"Add Risk Management",detail:"Senior Auditor roles require it.",previewHint:"Hover to preview",onAccept:()=>{},onDismiss:()=>{}}),e.jsx(t,{variant:"light",state:"accepted",action:"Add Risk Management",detail:"Senior Auditor roles require it."}),e.jsx(t,{variant:"light",state:"dismissed",action:"Add Risk Management",detail:"Senior Auditor roles require it."})]});a.__docgenInfo={description:"Dark variant — inside the floating glass window",methods:[],displayName:"Dark"};o.__docgenInfo={description:"Light variant — inside the docked white panel",methods:[],displayName:"Light"};i.__docgenInfo={description:"All states — dark",methods:[],displayName:"AllStatesDark"};r.__docgenInfo={description:"All states — light",methods:[],displayName:"AllStatesLight"};var d,c,l,p,g;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
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
}`,...(l=(c=a.parameters)==null?void 0:c.docs)==null?void 0:l.source},description:{story:"Dark variant — inside the floating glass window",...(g=(p=a.parameters)==null?void 0:p.docs)==null?void 0:g.description}}};var u,m,v,h,k;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
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
}`,...(v=(m=o.parameters)==null?void 0:m.docs)==null?void 0:v.source},description:{story:"Light variant — inside the docked white panel",...(k=(h=o.parameters)==null?void 0:h.docs)==null?void 0:k.description}}};var S,f,w,A,x;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(w=(f=i.parameters)==null?void 0:f.docs)==null?void 0:w.source},description:{story:"All states — dark",...(x=(A=i.parameters)==null?void 0:A.docs)==null?void 0:x.description}}};var y,b,D,M,R;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(D=(b=r.parameters)==null?void 0:b.docs)==null?void 0:D.source},description:{story:"All states — light",...(R=(M=r.parameters)==null?void 0:M.docs)==null?void 0:R.description}}};const q=["Dark","Light","AllStatesDark","AllStatesLight"];export{i as AllStatesDark,r as AllStatesLight,a as Dark,o as Light,q as __namedExportsOrder,F as default};
