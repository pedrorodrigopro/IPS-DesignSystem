import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as h}from"./index-DhMLlvMY.js";import{I as t,a as n,b as g,c as z,d as W,e as Y}from"./input-B84e0Cz_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-D1UQke6Y.js";const X={title:"Components/Input",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1779-112429"},layout:"centered"}},o=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:283},children:[e.jsx(t,{label:"Label",value:"Value",state:"default"}),e.jsx(t,{label:"Label",value:"Value",state:"default",mandatory:!0}),e.jsx(t,{label:"Label",value:"Value",state:"error",message:"Error message"}),e.jsx(t,{label:"Label",state:"warning",message:"Missing translation"}),e.jsx(t,{label:"Label",state:"instructions",message:"Instructions"}),e.jsx(t,{label:"Label",value:"Value",readOnly:!0})]}),i=()=>{const[l,a]=h.useState("");return e.jsx("div",{style:{width:283},children:e.jsx(t,{label:"Label",value:l,placeholder:"Type something…",onChange:r=>a(r.target.value),mandatory:!0})})},d=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:283},children:[e.jsx(n,{label:"Label",value:"Value"}),e.jsx(n,{label:"Label",placeholder:"Select…"}),e.jsx(n,{label:"Label",value:"Value",mandatory:!0}),e.jsx(n,{label:"Label",value:"Value",state:"error",message:"Error message"}),e.jsx(n,{label:"Label",state:"warning",message:"Missing translation"}),e.jsx(n,{label:"Label",value:"Value",readOnly:!0})]}),c=()=>{const[l,a]=h.useState("test search");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,width:283},children:[e.jsx(g,{placeholder:"Search",value:""}),e.jsx(g,{value:l,placeholder:"Search",onChange:r=>a(r.target.value),onClear:()=>a("")})]})},u=()=>{const[l,a]=h.useState([{id:"1",label:"Draft"},{id:"2",label:"Draft"},{id:"3",label:"Draft"},{id:"4",label:"Draft"}]);return e.jsx("div",{style:{width:600},children:e.jsx(z,{label:"State",mandatory:!0,tags:l,onRemoveTag:r=>a(l.filter(q=>q.id!==r)),onClearAll:()=>a([])})})},p=()=>e.jsx("div",{style:{width:307},children:e.jsx(W,{label:"Category",mandatory:!0,selectedLabel:"Default",selectedColor:"#A8C5F5",onClick:()=>{}})}),m=()=>e.jsx("div",{style:{width:283},children:e.jsx(Y,{inlineLabel:"Label",value:"Value",onClick:()=>{}})}),b=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32,padding:24},children:[e.jsx(s,{label:"Text field",children:e.jsx(t,{label:"Label",value:"Value",mandatory:!0})}),e.jsx(s,{label:"Select",children:e.jsx(n,{label:"Label",value:"Value",mandatory:!0})}),e.jsx(s,{label:"Search",children:e.jsx(g,{placeholder:"Search",value:""})}),e.jsx(s,{label:"Multiselect",children:e.jsx(z,{label:"State",tags:[{id:"1",label:"Draft"},{id:"2",label:"Draft"}],mandatory:!0})}),e.jsx(s,{label:"Booking category",children:e.jsx(W,{label:"Category",mandatory:!0,selectedLabel:"Default",selectedColor:"#A8C5F5"})}),e.jsx(s,{label:"Inline label",children:e.jsx(Y,{inlineLabel:"Label",value:"Value"})})]}),s=({label:l,children:a})=>e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12},children:l}),e.jsx("div",{style:{width:283},children:a})]});o.__docgenInfo={description:"",methods:[],displayName:"TextFieldStates"};i.__docgenInfo={description:"",methods:[],displayName:"TextFieldInteractive"};d.__docgenInfo={description:"",methods:[],displayName:"Select"};c.__docgenInfo={description:"",methods:[],displayName:"Search"};u.__docgenInfo={description:"",methods:[],displayName:"Multiselect"};p.__docgenInfo={description:"",methods:[],displayName:"BookingCategory"};m.__docgenInfo={description:"",methods:[],displayName:"InlineLabel"};b.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var v,y,x;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(x=(y=o.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var f,S,I;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const [value, setValue] = useState("");
  return <div style={{
    width: 283
  }}>
      <Input label="Label" value={value} placeholder="Type something…" onChange={e => setValue(e.target.value)} mandatory />
    </div>;
}`,...(I=(S=i.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var L,j,w;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(w=(j=d.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var V,C,D;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
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
}`,...(D=(C=c.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var _,T,R;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`() => {
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
}`,...(R=(T=u.parameters)==null?void 0:T.docs)==null?void 0:R.source}}};var F,M,k;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`() => <div style={{
  width: 307
}}>
    <InputBookingCategory label="Category" mandatory selectedLabel="Default" selectedColor="#A8C5F5" onClick={() => {}} />
  </div>`,...(k=(M=p.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var A,B,E;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`() => <div style={{
  width: 283
}}>
    <InputInline inlineLabel="Label" value="Value" onClick={() => {}} />
  </div>`,...(E=(B=m.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var N,O,K;b.parameters={...b.parameters,docs:{...(N=b.parameters)==null?void 0:N.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(K=(O=b.parameters)==null?void 0:O.docs)==null?void 0:K.source}}};const Z=["TextFieldStates","TextFieldInteractive","Select","Search","Multiselect","BookingCategory","InlineLabel","AllVariants"];export{b as AllVariants,p as BookingCategory,m as InlineLabel,u as Multiselect,c as Search,d as Select,i as TextFieldInteractive,o as TextFieldStates,Z as __namedExportsOrder,X as default};
