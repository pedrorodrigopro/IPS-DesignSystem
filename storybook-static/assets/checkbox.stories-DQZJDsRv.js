import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as j}from"./index-DhMLlvMY.js";import{C as a}from"./checkbox-Dd9w011Z.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const N={title:"Components/Checkbox",component:a,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1635-27838"}},argTypes:{layout:{control:"select",options:["horizontal","vertical"]}}},t=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,padding:16},children:[e.jsx(a,{layout:"horizontal",label:"Label",checked:!1}),e.jsx(a,{layout:"horizontal",label:"Label",checked:!0}),e.jsx(a,{layout:"horizontal",label:"Label",indeterminate:!0}),e.jsx(a,{layout:"horizontal",label:"Label",checked:!1,disabled:!0}),e.jsx(a,{layout:"horizontal",label:"Label",checked:!0,disabled:!0})]}),o=()=>e.jsxs("div",{style:{display:"flex",gap:32,padding:16,alignItems:"flex-start"},children:[e.jsx(a,{layout:"vertical",label:"Label",checked:!1}),e.jsx(a,{layout:"vertical",label:"Label",checked:!0}),e.jsx(a,{layout:"vertical",label:"Label",indeterminate:!0}),e.jsx(a,{layout:"vertical",label:"Label",checked:!1,disabled:!0}),e.jsx(a,{layout:"vertical",label:"Label",checked:!0,disabled:!0})]}),s=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,padding:16},children:[e.jsx(a,{layout:"horizontal",label:"Label",subLabel:"Info",checked:!1}),e.jsx(a,{layout:"horizontal",label:"Label",subLabel:"Info",checked:!0}),e.jsx(a,{layout:"horizontal",label:"Label",subLabel:"Info",indeterminate:!0})]}),r=()=>{const[c,C]=j.useState(!1);return e.jsx("div",{style:{padding:16},children:e.jsx(a,{layout:"horizontal",label:c?"Checked":"Unchecked",checked:c,onChange:C})})},l=c=>e.jsx("div",{style:{padding:16},children:e.jsx(a,{...c})});l.args={label:"Label",checked:!1,layout:"horizontal"};t.__docgenInfo={description:"",methods:[],displayName:"HorizontalStates"};o.__docgenInfo={description:"",methods:[],displayName:"VerticalStates"};s.__docgenInfo={description:"",methods:[],displayName:"WithSubLabel"};r.__docgenInfo={description:"",methods:[],displayName:"Interactive"};l.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,i,d;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16
}}>
    <Checkbox layout="horizontal" label="Label" checked={false} />
    <Checkbox layout="horizontal" label="Label" checked={true} />
    <Checkbox layout="horizontal" label="Label" indeterminate />
    <Checkbox layout="horizontal" label="Label" checked={false} disabled />
    <Checkbox layout="horizontal" label="Label" checked={true} disabled />
  </div>`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var b,h,u;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  gap: 32,
  padding: 16,
  alignItems: "flex-start"
}}>
    <Checkbox layout="vertical" label="Label" checked={false} />
    <Checkbox layout="vertical" label="Label" checked={true} />
    <Checkbox layout="vertical" label="Label" indeterminate />
    <Checkbox layout="vertical" label="Label" checked={false} disabled />
    <Checkbox layout="vertical" label="Label" checked={true} disabled />
  </div>`,...(u=(h=o.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var p,m,x;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16
}}>
    <Checkbox layout="horizontal" label="Label" subLabel="Info" checked={false} />
    <Checkbox layout="horizontal" label="Label" subLabel="Info" checked={true} />
    <Checkbox layout="horizontal" label="Label" subLabel="Info" indeterminate />
  </div>`,...(x=(m=s.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var y,k,f;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <div style={{
    padding: 16
  }}>
      <Checkbox layout="horizontal" label={checked ? "Checked" : "Unchecked"} checked={checked} onChange={setChecked} />
    </div>;
}`,...(f=(k=r.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var g,L,v;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`args => <div style={{
  padding: 16
}}>
    <Checkbox {...args} />
  </div>`,...(v=(L=l.parameters)==null?void 0:L.docs)==null?void 0:v.source}}};const E=["HorizontalStates","VerticalStates","WithSubLabel","Interactive","Default"];export{l as Default,t as HorizontalStates,r as Interactive,o as VerticalStates,s as WithSubLabel,E as __namedExportsOrder,N as default};
