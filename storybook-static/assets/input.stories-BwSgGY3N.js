import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as I}from"./index-DhMLlvMY.js";import{I as a,a as n,b as x,c as ee,d as ae,e as v}from"./input-BvTNqKpH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-v-ZctF2y.js";const de={title:"Components/Input",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1779-112429"},layout:"centered"}},o=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:283},children:[e.jsx(a,{label:"Label",value:"Value",state:"default"}),e.jsx(a,{label:"Label",value:"Value",state:"default",mandatory:!0}),e.jsx(a,{label:"Label",value:"Value",state:"error",message:"Error message"}),e.jsx(a,{label:"Label",state:"warning",message:"Missing translation"}),e.jsx(a,{label:"Label",state:"instructions",message:"Instructions"}),e.jsx(a,{label:"Label",value:"Value",readOnly:!0})]}),i=()=>{const[t,l]=I.useState("");return e.jsx("div",{style:{width:283},children:e.jsx(a,{label:"Label",value:t,placeholder:"Type something…",onChange:s=>l(s.target.value),mandatory:!0})})},d=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:283},children:[e.jsx(n,{label:"Label",value:"Value"}),e.jsx(n,{label:"Label",placeholder:"Select…"}),e.jsx(n,{label:"Label",value:"Value",mandatory:!0}),e.jsx(n,{label:"Label",value:"Value",state:"error",message:"Error message"}),e.jsx(n,{label:"Label",state:"warning",message:"Missing translation"}),e.jsx(n,{label:"Label",value:"Value",readOnly:!0})]}),c=()=>{const[t,l]=I.useState("test search");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,width:283},children:[e.jsx(x,{placeholder:"Search",value:""}),e.jsx(x,{value:t,placeholder:"Search",onChange:s=>l(s.target.value),onClear:()=>l("")})]})},u=()=>{const[t,l]=I.useState([{id:"1",label:"Draft"},{id:"2",label:"Draft"},{id:"3",label:"Draft"},{id:"4",label:"Draft"}]);return e.jsx("div",{style:{width:600},children:e.jsx(ee,{label:"State",mandatory:!0,tags:t,onRemoveTag:s=>l(t.filter(le=>le.id!==s)),onClearAll:()=>l([])})})},p=()=>e.jsx("div",{style:{width:307},children:e.jsx(ae,{label:"Category",mandatory:!0,selectedLabel:"Default",selectedColor:"#A8C5F5",onClick:()=>{}})}),m=()=>e.jsx("div",{style:{width:283},children:e.jsx(v,{inlineLabel:"Label",value:"Value",onClick:()=>{}})}),b=()=>e.jsx("div",{style:{width:283},children:e.jsx(v,{inlineLabel:"Version",value:"V1, English Banking",readOnly:!0})}),g=()=>e.jsx("div",{style:{width:283},children:e.jsx(v,{inlineLabel:"Sort by",value:"Due days",rightIcon:"sort",onClick:()=>{}})}),h=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32,padding:24},children:[e.jsx(r,{label:"Text field",children:e.jsx(a,{label:"Label",value:"Value",mandatory:!0})}),e.jsx(r,{label:"Select",children:e.jsx(n,{label:"Label",value:"Value",mandatory:!0})}),e.jsx(r,{label:"Search",children:e.jsx(x,{placeholder:"Search",value:""})}),e.jsx(r,{label:"Multiselect",children:e.jsx(ee,{label:"State",tags:[{id:"1",label:"Draft"},{id:"2",label:"Draft"}],mandatory:!0})}),e.jsx(r,{label:"Booking category",children:e.jsx(ae,{label:"Category",mandatory:!0,selectedLabel:"Default",selectedColor:"#A8C5F5"})}),e.jsx(r,{label:"Inline label",children:e.jsx(v,{inlineLabel:"Label",value:"Value"})})]}),r=({label:t,children:l})=>e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12},children:t}),e.jsx("div",{style:{width:283},children:l})]}),y=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:283},children:[e.jsx(a,{label:"Start date",rightIcon:"calendar",value:"1 Oct 2026",onChange:()=>{}}),e.jsx(a,{label:"End date",rightIcon:"calendar",placeholder:"Pick a date",mandatory:!0}),e.jsx(a,{label:"Start date (clearable)",rightIcon:"calendar",value:"1 Oct 2026",onChange:()=>{},onClear:()=>{}}),e.jsx(n,{label:"Template",value:"2 selected",onClear:()=>{}})]});o.__docgenInfo={description:"",methods:[],displayName:"TextFieldStates"};i.__docgenInfo={description:"",methods:[],displayName:"TextFieldInteractive"};d.__docgenInfo={description:"",methods:[],displayName:"Select"};c.__docgenInfo={description:"",methods:[],displayName:"Search"};u.__docgenInfo={description:"",methods:[],displayName:"Multiselect"};p.__docgenInfo={description:"",methods:[],displayName:"BookingCategory"};m.__docgenInfo={description:"",methods:[],displayName:"InlineLabel"};b.__docgenInfo={description:"",methods:[],displayName:"InlineLabelReadOnly"};g.__docgenInfo={description:"",methods:[],displayName:"InlineLabelSort"};h.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};y.__docgenInfo={description:"",methods:[],displayName:"RightIconAndClear"};var S,f,L;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(L=(f=o.parameters)==null?void 0:f.docs)==null?void 0:L.source}}};var j,C,w;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const [value, setValue] = useState("");
  return <div style={{
    width: 283
  }}>
      <Input label="Label" value={value} placeholder="Type something…" onChange={e => setValue(e.target.value)} mandatory />
    </div>;
}`,...(w=(C=i.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var V,D,_;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(_=(D=d.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};var R,T,k;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
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
}`,...(k=(T=c.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var F,O,A;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
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
}`,...(A=(O=u.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var E,M,B;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`() => <div style={{
  width: 307
}}>
    <InputBookingCategory label="Category" mandatory selectedLabel="Default" selectedColor="#A8C5F5" onClick={() => {}} />
  </div>`,...(B=(M=p.parameters)==null?void 0:M.docs)==null?void 0:B.source}}};var N,K,P;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`() => <div style={{
  width: 283
}}>
    <InputInline inlineLabel="Label" value="Value" onClick={() => {}} />
  </div>`,...(P=(K=m.parameters)==null?void 0:K.docs)==null?void 0:P.source}}};var z,W,Y;b.parameters={...b.parameters,docs:{...(z=b.parameters)==null?void 0:z.docs,source:{originalSource:`() => <div style={{
  width: 283
}}>
    <InputInline inlineLabel="Version" value="V1, English Banking" readOnly />
  </div>`,...(Y=(W=b.parameters)==null?void 0:W.docs)==null?void 0:Y.source}}};var q,G,H;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`() => <div style={{
  width: 283
}}>
    <InputInline inlineLabel="Sort by" value="Due days" rightIcon="sort" onClick={() => {}} />
  </div>`,...(H=(G=g.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var J,Q,U;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(U=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Z,$;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 24,
  width: 283
}}>
    <Input label="Start date" rightIcon="calendar" value="1 Oct 2026" onChange={() => {}} />
    <Input label="End date" rightIcon="calendar" placeholder="Pick a date" mandatory />
    <Input label="Start date (clearable)" rightIcon="calendar" value="1 Oct 2026" onChange={() => {}} onClear={() => {}} />
    <InputSelect label="Template" value="2 selected" onClear={() => {}} />
  </div>`,...($=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};const ce=["TextFieldStates","TextFieldInteractive","Select","Search","Multiselect","BookingCategory","InlineLabel","InlineLabelReadOnly","InlineLabelSort","AllVariants","RightIconAndClear"];export{h as AllVariants,p as BookingCategory,m as InlineLabel,b as InlineLabelReadOnly,g as InlineLabelSort,u as Multiselect,y as RightIconAndClear,c as Search,d as Select,i as TextFieldInteractive,o as TextFieldStates,ce as __namedExportsOrder,de as default};
