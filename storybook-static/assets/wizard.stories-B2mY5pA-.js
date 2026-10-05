import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-DhMLlvMY.js";import{W as n}from"./wizard-DbbF4pEk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const G={title:"Components/Wizard",component:n,parameters:{layout:"padded",docs:{description:{component:"Horizontal step indicator. Each step has a label and a 12px indicator bar. States: current (bold label, #0D2976 bar), enabled-previous (muted #8F9ED1 bar, clickable), enabled-next (#0D2976 bar, clickable), disabled (#8F9ED1 bar, opacity 0.5). Hover on enabled steps turns bar #2358F8. Steps fill equal width."}}}},p=[{id:"details",label:"Step 1"},{id:"skills",label:"Step 2"},{id:"schedule",label:"Step 3"},{id:"review",label:"Step 4"},{id:"confirm",label:"Step 5"}],t=[{id:"details",label:"Details"},{id:"skills",label:"Skills & Rates"},{id:"schedule",label:"Schedule"},{id:"review",label:"Review"},{id:"confirm",label:"Confirm"}],s={name:"Step 1 active (as in Figma)",render:()=>e.jsx(n,{steps:p,activeIndex:0,maxReachableIndex:0})},r={name:"Step 3 active",render:()=>e.jsx(n,{steps:p,activeIndex:2,maxReachableIndex:3})},i={name:"Last step active",render:()=>e.jsx(n,{steps:p,activeIndex:4,maxReachableIndex:4})},l={name:"All steps enabled",render:()=>e.jsx(n,{steps:p,activeIndex:2,maxReachableIndex:4})},d={name:"Interactive",render:()=>{const[a,w]=u.useState(0),[m,_]=u.useState(1),x=b=>{w(b),b+1>m&&_(b+1)};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32,padding:16},children:[e.jsx(n,{steps:t,activeIndex:a,maxReachableIndex:m,onChange:x}),e.jsxs("div",{style:{display:"flex",gap:12},children:[e.jsx("button",{style:{padding:"8px 16px",borderRadius:4,border:"1px solid #CFDAF7",background:"#fff",fontFamily:"Mulish, sans-serif",fontSize:13,fontWeight:700,color:"#0C1457",cursor:"pointer"},onClick:()=>a>0&&x(a-1),disabled:a===0,children:"Previous"}),e.jsx("button",{style:{padding:"8px 16px",borderRadius:4,border:"none",background:"#0C1457",fontFamily:"Mulish, sans-serif",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer"},onClick:()=>a<t.length-1&&x(a+1),disabled:a===t.length-1,children:"Next"})]}),e.jsxs("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",margin:0},children:["Active: ",t[a].label," · Max reachable: ",t[Math.min(m,t.length-1)].label]})]})}},o={name:"Named steps",render:()=>e.jsx(n,{steps:t,activeIndex:1,maxReachableIndex:2})},c={name:"Two steps",render:()=>e.jsx(n,{steps:[{id:"a",label:"Details"},{id:"b",label:"Confirm"}],activeIndex:0,maxReachableIndex:1})};var S,h,f;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Step 1 active (as in Figma)",
  render: () => <Wizard steps={STEPS} activeIndex={0} maxReachableIndex={0} />
}`,...(f=(h=s.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var v,g,E;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Step 3 active",
  render: () => <Wizard steps={STEPS} activeIndex={2} maxReachableIndex={3} />
}`,...(E=(g=r.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};var I,R,y;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: "Last step active",
  render: () => <Wizard steps={STEPS} activeIndex={4} maxReachableIndex={4} />
}`,...(y=(R=i.parameters)==null?void 0:R.docs)==null?void 0:y.source}}};var C,M,A;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "All steps enabled",
  render: () => <Wizard steps={STEPS} activeIndex={2} maxReachableIndex={4} />
}`,...(A=(M=l.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};var D,F,T;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: "Interactive",
  render: () => {
    const [active, setActive] = useState(0);
    // Allow forward one step at a time, always allow going back
    const [maxReachable, setMaxReachable] = useState(1);
    const handleChange = (index: number) => {
      setActive(index);
      if (index + 1 > maxReachable) setMaxReachable(index + 1);
    };
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 32,
      padding: 16
    }}>
        <Wizard steps={NAMED_STEPS} activeIndex={active} maxReachableIndex={maxReachable} onChange={handleChange} />
        <div style={{
        display: "flex",
        gap: 12
      }}>
          <button style={{
          padding: "8px 16px",
          borderRadius: 4,
          border: "1px solid #CFDAF7",
          background: "#fff",
          fontFamily: "Mulish, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: "#0C1457",
          cursor: "pointer"
        }} onClick={() => active > 0 && handleChange(active - 1)} disabled={active === 0}>
            Previous
          </button>
          <button style={{
          padding: "8px 16px",
          borderRadius: 4,
          border: "none",
          background: "#0C1457",
          fontFamily: "Mulish, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          cursor: "pointer"
        }} onClick={() => active < NAMED_STEPS.length - 1 && handleChange(active + 1)} disabled={active === NAMED_STEPS.length - 1}>
            Next
          </button>
        </div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 12,
        color: "#5C6E9E",
        margin: 0
      }}>
          Active: {NAMED_STEPS[active].label} · Max reachable: {NAMED_STEPS[Math.min(maxReachable, NAMED_STEPS.length - 1)].label}
        </p>
      </div>;
  }
}`,...(T=(F=d.parameters)==null?void 0:F.docs)==null?void 0:T.source}}};var z,P,j;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  name: "Named steps",
  render: () => <Wizard steps={NAMED_STEPS} activeIndex={1} maxReachableIndex={2} />
}`,...(j=(P=o.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};var k,N,W;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "Two steps",
  render: () => <Wizard steps={[{
    id: "a",
    label: "Details"
  }, {
    id: "b",
    label: "Confirm"
  }]} activeIndex={0} maxReachableIndex={1} />
}`,...(W=(N=c.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};const J=["FirstStep","MiddleStep","LastStep","AllEnabled","Interactive","NamedSteps","TwoSteps"];export{l as AllEnabled,s as FirstStep,d as Interactive,i as LastStep,r as MiddleStep,o as NamedSteps,c as TwoSteps,J as __namedExportsOrder,G as default};
