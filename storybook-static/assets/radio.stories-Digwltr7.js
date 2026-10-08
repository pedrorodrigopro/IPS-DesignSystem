import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as k}from"./index-DhMLlvMY.js";import{R as a,a as O}from"./radio-Dhk2kUYT.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const w={title:"Components/Radio",component:a,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1635-27857"},layout:"centered"},argTypes:{layout:{control:"select",options:["horizontal","vertical"]}}},l=({label:o,children:n})=>e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:o}),n]}),i=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,padding:16},children:[e.jsx(l,{label:"Horizontal — Default",children:e.jsx(a,{layout:"horizontal",label:"Label",checked:!1})}),e.jsx(l,{label:"Horizontal — Selected",children:e.jsx(a,{layout:"horizontal",label:"Label",checked:!0})}),e.jsxs(l,{label:"Horizontal — With subtext",children:[e.jsx(a,{layout:"horizontal",label:"Label",subLabel:"Info",checked:!1}),e.jsx(a,{layout:"horizontal",label:"Label",subLabel:"Info",checked:!0})]}),e.jsxs(l,{label:"Horizontal — Disabled",children:[e.jsx(a,{layout:"horizontal",label:"Label",checked:!1,disabled:!0}),e.jsx(a,{layout:"horizontal",label:"Label",checked:!0,disabled:!0})]})]}),s=()=>e.jsxs("div",{style:{display:"flex",gap:32,padding:16,alignItems:"flex-start"},children:[e.jsx(l,{label:"Unselected",children:e.jsx(a,{layout:"vertical",label:"Label",checked:!1})}),e.jsx(l,{label:"Selected",children:e.jsx(a,{layout:"vertical",label:"Label",checked:!0})}),e.jsx(l,{label:"Disabled",children:e.jsx(a,{layout:"vertical",label:"Label",checked:!1,disabled:!0})}),e.jsx(l,{label:"Selected disabled",children:e.jsx(a,{layout:"vertical",label:"Label",checked:!0,disabled:!0})})]}),r=()=>{const[o,n]=k.useState("option1"),c=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3",subLabel:"Additional info"},{value:"option4",label:"Option 4",disabled:!0}];return e.jsxs("div",{style:{padding:24},children:[e.jsx(l,{label:"Group (column, horizontal layout)",children:e.jsx(O,{name:"demo-group",options:c,value:o,onChange:n,layout:"horizontal",groupLayout:"column"})}),e.jsxs("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginTop:8},children:["Selected: ",e.jsx("strong",{style:{color:"#0D2976"},children:o})]})]})},d=()=>{const[o,n]=k.useState("a"),c=[{value:"a",label:"Option A"},{value:"b",label:"Option B"},{value:"c",label:"Option C"}];return e.jsx("div",{style:{padding:24},children:e.jsx(O,{name:"demo-row",options:c,value:o,onChange:n,layout:"horizontal",groupLayout:"row"})})},t=o=>e.jsx("div",{style:{padding:16},children:e.jsx(a,{...o})});t.args={label:"Label",checked:!1,layout:"horizontal"};i.__docgenInfo={description:"",methods:[],displayName:"HorizontalStates"};s.__docgenInfo={description:"",methods:[],displayName:"VerticalStates"};r.__docgenInfo={description:"",methods:[],displayName:"GroupInteractive"};d.__docgenInfo={description:"",methods:[],displayName:"GroupRow"};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var u,p,b;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 16
}}>
    <Section label="Horizontal — Default">
      <Radio layout="horizontal" label="Label" checked={false} />
    </Section>
    <Section label="Horizontal — Selected">
      <Radio layout="horizontal" label="Label" checked={true} />
    </Section>
    <Section label="Horizontal — With subtext">
      <Radio layout="horizontal" label="Label" subLabel="Info" checked={false} />
      <Radio layout="horizontal" label="Label" subLabel="Info" checked={true} />
    </Section>
    <Section label="Horizontal — Disabled">
      <Radio layout="horizontal" label="Label" checked={false} disabled />
      <Radio layout="horizontal" label="Label" checked={true} disabled />
    </Section>
  </div>`,...(b=(p=i.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var h,m,y;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  gap: 32,
  padding: 16,
  alignItems: "flex-start"
}}>
    <Section label="Unselected">
      <Radio layout="vertical" label="Label" checked={false} />
    </Section>
    <Section label="Selected">
      <Radio layout="vertical" label="Label" checked={true} />
    </Section>
    <Section label="Disabled">
      <Radio layout="vertical" label="Label" checked={false} disabled />
    </Section>
    <Section label="Selected disabled">
      <Radio layout="vertical" label="Label" checked={true} disabled />
    </Section>
  </div>`,...(y=(m=s.parameters)==null?void 0:m.docs)==null?void 0:y.source}}};var v,g,f;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const [value, setValue] = useState("option1");
  const options = [{
    value: "option1",
    label: "Option 1"
  }, {
    value: "option2",
    label: "Option 2"
  }, {
    value: "option3",
    label: "Option 3",
    subLabel: "Additional info"
  }, {
    value: "option4",
    label: "Option 4",
    disabled: true
  }];
  return <div style={{
    padding: 24
  }}>
      <Section label="Group (column, horizontal layout)">
        <RadioGroup name="demo-group" options={options} value={value} onChange={setValue} layout="horizontal" groupLayout="column" />
      </Section>
      <div style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "#5C6E9E",
      marginTop: 8
    }}>
        Selected: <strong style={{
        color: "#0D2976"
      }}>{value}</strong>
      </div>
    </div>;
}`,...(f=(g=r.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var x,S,j;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const [value, setValue] = useState("a");
  const options = [{
    value: "a",
    label: "Option A"
  }, {
    value: "b",
    label: "Option B"
  }, {
    value: "c",
    label: "Option C"
  }];
  return <div style={{
    padding: 24
  }}>
      <RadioGroup name="demo-row" options={options} value={value} onChange={setValue} layout="horizontal" groupLayout="row" />
    </div>;
}`,...(j=(S=d.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var z,L,R;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`args => <div style={{
  padding: 16
}}>
    <Radio {...args} />
  </div>`,...(R=(L=t.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};const C=["HorizontalStates","VerticalStates","GroupInteractive","GroupRow","Default"];export{t as Default,r as GroupInteractive,d as GroupRow,i as HorizontalStates,s as VerticalStates,C as __namedExportsOrder,w as default};
