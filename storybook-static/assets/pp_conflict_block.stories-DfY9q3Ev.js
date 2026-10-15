import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as m}from"./index-DhMLlvMY.js";import{c as g}from"./index-Dd5QUkq_.js";import{P as l}from"./pp_suggestion_card-C80bYbNm.js";import"./_commonjsHelpers-CqkleIqs.js";const H="_block_9qubm_1",R="_header_9qubm_7",T="_dot_9qubm_13",N="_error_9qubm_21",B="_warning_9qubm_25",L="_text_9qubm_29",M="_person_9qubm_34",J="_personDark_9qubm_41",E="_description_9qubm_45",O="_descriptionDark_9qubm_53",W="_suggestions_9qubm_57",s={block:H,header:R,dot:T,error:N,warning:B,text:L,person:M,personDark:J,description:E,descriptionDark:O,suggestions:W};function u({severity:r,person:o,description:t,variant:i="dark",children:a,className:n}){return e.jsxs("div",{className:g(s.block,n),children:[e.jsxs("div",{className:s.header,children:[e.jsx("div",{className:g(s.dot,s[r]),"aria-hidden":"true"}),e.jsxs("div",{className:s.text,children:[e.jsxs("span",{className:g(s.person,{[s.personDark]:i==="dark"}),children:[o,":"," "]}),e.jsx("span",{className:g(s.description,{[s.descriptionDark]:i==="dark"}),children:t})]})]}),a&&e.jsx("div",{className:s.suggestions,children:a})]})}u.__docgenInfo={description:"",methods:[],displayName:"PPConflictBlock",props:{severity:{required:!0,tsType:{name:"union",raw:'"error" | "warning"',elements:[{name:"literal",value:'"error"'},{name:"literal",value:'"warning"'}]},description:"Severity controls the dot colour: error = red, warning = orange"},person:{required:!0,tsType:{name:"string"},description:"Bold heading — person name + conflict label"},description:{required:!0,tsType:{name:"string"},description:"Supporting description"},variant:{required:!1,tsType:{name:"union",raw:'"dark"  | "light"',elements:[{name:"literal",value:'"dark"'},{name:"literal",value:'"light"'}]},description:"Visual variant",defaultValue:{value:'"dark"',computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Suggestion cards or other content rendered below the description"},className:{required:!1,tsType:{name:"string"},description:""}}};const q="linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)",z={title:"Components/PPConflictBlock",component:u,parameters:{design:{type:"figma",url:"https://www.figma.com/design/xtnTudkEZpuxJoPDSN0xFJ?node-id=634-109034"},layout:"centered"}},d=()=>{const[r,o]=m.useState({s1:"default"}),t=(i,a)=>o(n=>({...n,[i]:a}));return e.jsx("div",{style:{width:420,padding:16,background:q,borderRadius:12},children:e.jsx(u,{variant:"dark",severity:"error",person:"Alexandra I. Poane — 120% overbooked",description:"ST Role#2 (136h, days 1–8) overlaps with Tech Lead (160h starting day 7). She has 12h/day booked for 5 consecutive days.",children:e.jsx(l,{variant:"dark",state:r.s1,action:"Move Tech Lead to week 3 (Mon 14 Sep)",detail:"Shift the 160h Tech Lead booking from Mon 7 Sep → Mon 14 Sep. No overlap remains.",previewHint:"Hover to preview result in calendar",onAccept:()=>t("s1","accepted"),onDismiss:()=>t("s1","dismissed")})})})};d.parameters={backgrounds:{default:"dark",values:[{name:"dark",value:"#0C1457"}]}};const c=()=>{const[r,o]=m.useState({s1:"default",s2:"default"}),t=(i,a)=>o(n=>({...n,[i]:a}));return e.jsx("div",{style:{width:420,padding:16,background:q,borderRadius:12},children:e.jsxs(u,{variant:"dark",severity:"warning",person:"Senior Auditor — Duration misalignment",description:"The role requests 160h but only 80h is booked (Mon 31 Aug – 4 Sep). 80h is unaccounted for.",children:[e.jsx(l,{variant:"dark",state:r.s1,action:"Reduce role duration to 80h",detail:"Adjust the role's duration from 160h → 80h to match the existing booking.",previewHint:"Hover to preview on profile",onAccept:()=>t("s1","accepted"),onDismiss:()=>t("s1","dismissed")}),e.jsx(l,{variant:"dark",state:r.s2,action:"Book missing 80h — reassign to James Obi",detail:"Create an additional 80h booking for the remaining slot and reassign to James Obi.",previewHint:"Hover to preview on profile",onAccept:()=>t("s2","accepted"),onDismiss:()=>t("s2","dismissed")})]})})};c.parameters={backgrounds:{default:"dark",values:[{name:"dark",value:"#0C1457"}]}};const p=()=>{const[r,o]=m.useState({s1:"default",s2:"default"}),t=(i,a)=>o(n=>({...n,[i]:a}));return e.jsx("div",{style:{width:420,padding:16,background:"white",border:"1px solid #CFDAF7",borderRadius:12},children:e.jsxs(u,{variant:"light",severity:"warning",person:"Senior Auditor — Duration misalignment",description:"The role requests 160h but only 80h is booked (Mon 31 Aug – 4 Sep). 80h is unaccounted for.",children:[e.jsx(l,{variant:"light",state:r.s1,action:"Reduce role duration to 80h",detail:"Adjust the role's duration from 160h → 80h to match the existing booking.",previewHint:"Hover to preview on profile",onAccept:()=>t("s1","accepted"),onDismiss:()=>t("s1","dismissed")}),e.jsx(l,{variant:"light",state:r.s2,action:"Book missing 80h — reassign to James Obi",detail:"Create an additional 80h booking for Mon 31 Aug – 4 Sep and reassign to James Obi.",previewHint:"Hover to preview on profile",onAccept:()=>t("s2","accepted"),onDismiss:()=>t("s2","dismissed")})]})})};d.__docgenInfo={description:"Error severity — dark variant with suggestion cards",methods:[],displayName:"ErrorDark"};c.__docgenInfo={description:"Warning severity — dark variant",methods:[],displayName:"WarningDark"};p.__docgenInfo={description:"Light variant — docked panel",methods:[],displayName:"WarningLight"};var h,v,k,S,f;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [states, setStates] = useState<Record<string, "default" | "accepted" | "dismissed">>({
    s1: "default"
  });
  const setState = (id: string, val: "accepted" | "dismissed") => setStates(prev => ({
    ...prev,
    [id]: val
  }));
  return <div style={{
    width: 420,
    padding: 16,
    background: GLASS_BG,
    borderRadius: 12
  }}>
      <PPConflictBlock variant="dark" severity="error" person="Alexandra I. Poane — 120% overbooked" description="ST Role#2 (136h, days 1–8) overlaps with Tech Lead (160h starting day 7). She has 12h/day booked for 5 consecutive days.">
        <PPSuggestionCard variant="dark" state={states.s1} action="Move Tech Lead to week 3 (Mon 14 Sep)" detail="Shift the 160h Tech Lead booking from Mon 7 Sep → Mon 14 Sep. No overlap remains." previewHint="Hover to preview result in calendar" onAccept={() => setState("s1", "accepted")} onDismiss={() => setState("s1", "dismissed")} />
      </PPConflictBlock>
    </div>;
}`,...(k=(v=d.parameters)==null?void 0:v.docs)==null?void 0:k.source},description:{story:"Error severity — dark variant with suggestion cards",...(f=(S=d.parameters)==null?void 0:S.docs)==null?void 0:f.description}}};var b,w,_,y,x;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  const [states, setStates] = useState<Record<string, "default" | "accepted" | "dismissed">>({
    s1: "default",
    s2: "default"
  });
  const setState = (id: string, val: "accepted" | "dismissed") => setStates(prev => ({
    ...prev,
    [id]: val
  }));
  return <div style={{
    width: 420,
    padding: 16,
    background: GLASS_BG,
    borderRadius: 12
  }}>
      <PPConflictBlock variant="dark" severity="warning" person="Senior Auditor — Duration misalignment" description="The role requests 160h but only 80h is booked (Mon 31 Aug – 4 Sep). 80h is unaccounted for.">
        <PPSuggestionCard variant="dark" state={states.s1} action="Reduce role duration to 80h" detail="Adjust the role's duration from 160h → 80h to match the existing booking." previewHint="Hover to preview on profile" onAccept={() => setState("s1", "accepted")} onDismiss={() => setState("s1", "dismissed")} />
        <PPSuggestionCard variant="dark" state={states.s2} action="Book missing 80h — reassign to James Obi" detail="Create an additional 80h booking for the remaining slot and reassign to James Obi." previewHint="Hover to preview on profile" onAccept={() => setState("s2", "accepted")} onDismiss={() => setState("s2", "dismissed")} />
      </PPConflictBlock>
    </div>;
}`,...(_=(w=c.parameters)==null?void 0:w.docs)==null?void 0:_.source},description:{story:"Warning severity — dark variant",...(x=(y=c.parameters)==null?void 0:y.docs)==null?void 0:x.description}}};var P,A,D,j,C;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
  const [states, setStates] = useState<Record<string, "default" | "accepted" | "dismissed">>({
    s1: "default",
    s2: "default"
  });
  const setState = (id: string, val: "accepted" | "dismissed") => setStates(prev => ({
    ...prev,
    [id]: val
  }));
  return <div style={{
    width: 420,
    padding: 16,
    background: "white",
    border: "1px solid #CFDAF7",
    borderRadius: 12
  }}>
      <PPConflictBlock variant="light" severity="warning" person="Senior Auditor — Duration misalignment" description="The role requests 160h but only 80h is booked (Mon 31 Aug – 4 Sep). 80h is unaccounted for.">
        <PPSuggestionCard variant="light" state={states.s1} action="Reduce role duration to 80h" detail="Adjust the role's duration from 160h → 80h to match the existing booking." previewHint="Hover to preview on profile" onAccept={() => setState("s1", "accepted")} onDismiss={() => setState("s1", "dismissed")} />
        <PPSuggestionCard variant="light" state={states.s2} action="Book missing 80h — reassign to James Obi" detail="Create an additional 80h booking for Mon 31 Aug – 4 Sep and reassign to James Obi." previewHint="Hover to preview on profile" onAccept={() => setState("s2", "accepted")} onDismiss={() => setState("s2", "dismissed")} />
      </PPConflictBlock>
    </div>;
}`,...(D=(A=p.parameters)==null?void 0:A.docs)==null?void 0:D.source},description:{story:"Light variant — docked panel",...(C=(j=p.parameters)==null?void 0:j.docs)==null?void 0:C.description}}};const K=["ErrorDark","WarningDark","WarningLight"];export{d as ErrorDark,c as WarningDark,p as WarningLight,K as __namedExportsOrder,z as default};
