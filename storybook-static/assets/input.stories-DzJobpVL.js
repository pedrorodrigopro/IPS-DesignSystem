import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as v}from"./index-DhMLlvMY.js";import{I as a,a as n,b as h,c as q,d as G,e as H}from"./input-DLpqIS1x.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-Dpkq_sne.js";const ae={title:"Components/Input",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1779-112429"},layout:"centered"}},o=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:283},children:[e.jsx(a,{label:"Label",value:"Value",state:"default"}),e.jsx(a,{label:"Label",value:"Value",state:"default",mandatory:!0}),e.jsx(a,{label:"Label",value:"Value",state:"error",message:"Error message"}),e.jsx(a,{label:"Label",state:"warning",message:"Missing translation"}),e.jsx(a,{label:"Label",state:"instructions",message:"Instructions"}),e.jsx(a,{label:"Label",value:"Value",readOnly:!0})]}),i=()=>{const[t,l]=v.useState("");return e.jsx("div",{style:{width:283},children:e.jsx(a,{label:"Label",value:t,placeholder:"Type something…",onChange:s=>l(s.target.value),mandatory:!0})})},d=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:283},children:[e.jsx(n,{label:"Label",value:"Value"}),e.jsx(n,{label:"Label",placeholder:"Select…"}),e.jsx(n,{label:"Label",value:"Value",mandatory:!0}),e.jsx(n,{label:"Label",value:"Value",state:"error",message:"Error message"}),e.jsx(n,{label:"Label",state:"warning",message:"Missing translation"}),e.jsx(n,{label:"Label",value:"Value",readOnly:!0})]}),c=()=>{const[t,l]=v.useState("test search");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,width:283},children:[e.jsx(h,{placeholder:"Search",value:""}),e.jsx(h,{value:t,placeholder:"Search",onChange:s=>l(s.target.value),onClear:()=>l("")})]})},u=()=>{const[t,l]=v.useState([{id:"1",label:"Draft"},{id:"2",label:"Draft"},{id:"3",label:"Draft"},{id:"4",label:"Draft"}]);return e.jsx("div",{style:{width:600},children:e.jsx(q,{label:"State",mandatory:!0,tags:t,onRemoveTag:s=>l(t.filter(J=>J.id!==s)),onClearAll:()=>l([])})})},p=()=>e.jsx("div",{style:{width:307},children:e.jsx(G,{label:"Category",mandatory:!0,selectedLabel:"Default",selectedColor:"#A8C5F5",onClick:()=>{}})}),m=()=>e.jsx("div",{style:{width:283},children:e.jsx(H,{inlineLabel:"Label",value:"Value",onClick:()=>{}})}),b=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32,padding:24},children:[e.jsx(r,{label:"Text field",children:e.jsx(a,{label:"Label",value:"Value",mandatory:!0})}),e.jsx(r,{label:"Select",children:e.jsx(n,{label:"Label",value:"Value",mandatory:!0})}),e.jsx(r,{label:"Search",children:e.jsx(h,{placeholder:"Search",value:""})}),e.jsx(r,{label:"Multiselect",children:e.jsx(q,{label:"State",tags:[{id:"1",label:"Draft"},{id:"2",label:"Draft"}],mandatory:!0})}),e.jsx(r,{label:"Booking category",children:e.jsx(G,{label:"Category",mandatory:!0,selectedLabel:"Default",selectedColor:"#A8C5F5"})}),e.jsx(r,{label:"Inline label",children:e.jsx(H,{inlineLabel:"Label",value:"Value"})})]}),r=({label:t,children:l})=>e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12},children:t}),e.jsx("div",{style:{width:283},children:l})]}),g=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:283},children:[e.jsx(a,{label:"Start date",rightIcon:"calendar",value:"1 Oct 2026",onChange:()=>{}}),e.jsx(a,{label:"End date",rightIcon:"calendar",placeholder:"Pick a date",mandatory:!0}),e.jsx(a,{label:"Start date (clearable)",rightIcon:"calendar",value:"1 Oct 2026",onChange:()=>{},onClear:()=>{}}),e.jsx(n,{label:"Template",value:"2 selected",onClear:()=>{}})]});o.__docgenInfo={description:"",methods:[],displayName:"TextFieldStates"};i.__docgenInfo={description:"",methods:[],displayName:"TextFieldInteractive"};d.__docgenInfo={description:"",methods:[],displayName:"Select"};c.__docgenInfo={description:"",methods:[],displayName:"Search"};u.__docgenInfo={description:"",methods:[],displayName:"Multiselect"};p.__docgenInfo={description:"",methods:[],displayName:"BookingCategory"};m.__docgenInfo={description:"",methods:[],displayName:"InlineLabel"};b.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};g.__docgenInfo={description:"",methods:[],displayName:"RightIconAndClear"};var x,y,I;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 24,
  width: 283
}}>
    <Input label="Label" value="Value" state="default" />
    <Input label="Label" value="Value" state="default" mandatory />
    <Input label="Label" value="Value" state="error" message="Error message" />
    <Input label="Label" state="warning" message="Missing translation" />
    <Input label="Label" state="instructions" message="Instructions" />
    <Input label="Label" value="Value" readOnly />
  </div>`,...(I=(y=o.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var f,S,j;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const [value, setValue] = useState("");
  return <div style={{
    width: 283
  }}>
      <Input label="Label" value={value} placeholder="Type something…" onChange={e => setValue(e.target.value)} mandatory />
    </div>;
}`,...(j=(S=i.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var L,C,w;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 24,
  width: 283
}}>
    <InputSelect label="Label" value="Value" />
    <InputSelect label="Label" placeholder="Select…" />
    <InputSelect label="Label" value="Value" mandatory />
    <InputSelect label="Label" value="Value" state="error" message="Error message" />
    <InputSelect label="Label" state="warning" message="Missing translation" />
    <InputSelect label="Label" value="Value" readOnly />
  </div>`,...(w=(C=d.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var V,D,_;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const [value, setValue] = useState("test search");
  return <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: 283
  }}>
      {/* Searching=False */}
      <InputSearch placeholder="Search" value="" />
      {/* Searching=True — cross + searched term */}
      <InputSearch value={value} placeholder="Search" onChange={e => setValue(e.target.value)} onClear={() => setValue("")} />
    </div>;
}`,...(_=(D=c.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};var R,T,F;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const [tags, setTags] = useState([{
    id: "1",
    label: "Draft"
  }, {
    id: "2",
    label: "Draft"
  }, {
    id: "3",
    label: "Draft"
  }, {
    id: "4",
    label: "Draft"
  }]);
  return <div style={{
    width: 600
  }}>
      <InputMultiselect label="State" mandatory tags={tags} onRemoveTag={id => setTags(tags.filter(t => t.id !== id))} onClearAll={() => setTags([])} />
    </div>;
}`,...(F=(T=u.parameters)==null?void 0:T.docs)==null?void 0:F.source}}};var k,A,M;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`() => <div style={{
  width: 307
}}>
    <InputBookingCategory label="Category" mandatory selectedLabel="Default" selectedColor="#A8C5F5" onClick={() => {}} />
  </div>`,...(M=(A=p.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var E,O,B;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`() => <div style={{
  width: 283
}}>
    <InputInline inlineLabel="Label" value="Value" onClick={() => {}} />
  </div>`,...(B=(O=m.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var N,K,P;b.parameters={...b.parameters,docs:{...(N=b.parameters)==null?void 0:N.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 32,
  padding: 24
}}>
    <Row label="Text field"><Input label="Label" value="Value" mandatory /></Row>
    <Row label="Select"><InputSelect label="Label" value="Value" mandatory /></Row>
    <Row label="Search"><InputSearch placeholder="Search" value="" /></Row>
    <Row label="Multiselect"><InputMultiselect label="State" tags={[{
      id: "1",
      label: "Draft"
    }, {
      id: "2",
      label: "Draft"
    }]} mandatory /></Row>
    <Row label="Booking category"><InputBookingCategory label="Category" mandatory selectedLabel="Default" selectedColor="#A8C5F5" /></Row>
    <Row label="Inline label"><InputInline inlineLabel="Label" value="Value" /></Row>
  </div>`,...(P=(K=b.parameters)==null?void 0:K.docs)==null?void 0:P.source}}};var z,W,Y;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 24,
  width: 283
}}>
    <Input label="Start date" rightIcon="calendar" value="1 Oct 2026" onChange={() => {}} />
    <Input label="End date" rightIcon="calendar" placeholder="Pick a date" mandatory />
    <Input label="Start date (clearable)" rightIcon="calendar" value="1 Oct 2026" onChange={() => {}} onClear={() => {}} />
    <InputSelect label="Template" value="2 selected" onClear={() => {}} />
  </div>`,...(Y=(W=g.parameters)==null?void 0:W.docs)==null?void 0:Y.source}}};const le=["TextFieldStates","TextFieldInteractive","Select","Search","Multiselect","BookingCategory","InlineLabel","AllVariants","RightIconAndClear"];export{b as AllVariants,p as BookingCategory,m as InlineLabel,u as Multiselect,g as RightIconAndClear,c as Search,d as Select,i as TextFieldInteractive,o as TextFieldStates,le as __namedExportsOrder,ae as default};
