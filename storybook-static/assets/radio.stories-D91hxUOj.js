import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as f}from"./index-DhMLlvMY.js";import{c as y}from"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";const C="_radio_402br_1",W="_horizontal_402br_7",F="_vertical_402br_13",A="_disabled_402br_18",B="_input_402br_24",M="_circle_402br_32",K="_dot_402br_56",U="_checked_402br_64",Y="_labelWrapper_402br_68",$="_label_402br_68",J="_subLabel_402br_82",P="_group_402br_90",Q="_group_column_402br_94",X="_group_row_402br_99",l={radio:C,horizontal:W,vertical:F,disabled:A,input:B,circle:M,dot:K,checked:U,labelWrapper:Y,label:$,subLabel:J,group:P,group_column:Q,group_row:X},o=({label:a,subLabel:n,checked:t=!1,disabled:v=!1,layout:d="horizontal",name:g,value:c,onChange:u,className:r,id:H})=>{const E=f.useId(),x=H??E;return e.jsxs("label",{htmlFor:x,className:y(l.radio,l[d],{[l.disabled]:v},r),children:[d==="vertical"&&a&&e.jsx("span",{className:l.labelWrapper,children:e.jsx("span",{className:l.label,children:a})}),e.jsx("input",{type:"radio",id:x,name:g,value:c,checked:t,disabled:v,onChange:()=>c!==void 0&&(u==null?void 0:u(c)),className:l.input}),e.jsx("span",{className:y(l.circle,{[l.checked]:t}),"aria-hidden":"true",children:t&&e.jsx("span",{className:l.dot})}),d==="horizontal"&&a&&e.jsxs("span",{className:l.labelWrapper,children:[e.jsx("span",{className:l.label,children:a}),n&&e.jsx("span",{className:l.subLabel,children:n})]})]})},_=({options:a,value:n,onChange:t,name:v,layout:d="horizontal",groupLayout:g="column",disabled:c=!1,className:u})=>e.jsx("div",{className:y(l.group,l[`group_${g}`],u),role:"radiogroup",children:a.map(r=>e.jsx(o,{label:r.label,subLabel:r.subLabel,checked:n===r.value,disabled:c||r.disabled,layout:d,name:v,value:r.value,onChange:t},r.value))});o.__docgenInfo={description:"",methods:[],displayName:"Radio",props:{label:{required:!1,tsType:{name:"string"},description:""},subLabel:{required:!1,tsType:{name:"string"},description:""},checked:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},layout:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},name:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:""}}};_.__docgenInfo={description:"",methods:[],displayName:"RadioGroup",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: string;
  label: string;
  subLabel?: string;
  disabled?: boolean;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"subLabel",value:{name:"string",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}}]}}],raw:"RadioOption[]"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},name:{required:!1,tsType:{name:"string"},description:""},layout:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},groupLayout:{required:!1,tsType:{name:"union",raw:'"row" | "column"',elements:[{name:"literal",value:'"row"'},{name:"literal",value:'"column"'}]},description:"",defaultValue:{value:'"column"',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const oe={title:"Components/Radio",component:o,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1635-27857"},layout:"centered"},argTypes:{layout:{control:"select",options:["horizontal","vertical"]}}},s=({label:a,children:n})=>e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:a}),n]}),p=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,padding:16},children:[e.jsx(s,{label:"Horizontal — Default",children:e.jsx(o,{layout:"horizontal",label:"Label",checked:!1})}),e.jsx(s,{label:"Horizontal — Selected",children:e.jsx(o,{layout:"horizontal",label:"Label",checked:!0})}),e.jsxs(s,{label:"Horizontal — With subtext",children:[e.jsx(o,{layout:"horizontal",label:"Label",subLabel:"Info",checked:!1}),e.jsx(o,{layout:"horizontal",label:"Label",subLabel:"Info",checked:!0})]}),e.jsxs(s,{label:"Horizontal — Disabled",children:[e.jsx(o,{layout:"horizontal",label:"Label",checked:!1,disabled:!0}),e.jsx(o,{layout:"horizontal",label:"Label",checked:!0,disabled:!0})]})]}),b=()=>e.jsxs("div",{style:{display:"flex",gap:32,padding:16,alignItems:"flex-start"},children:[e.jsx(s,{label:"Unselected",children:e.jsx(o,{layout:"vertical",label:"Label",checked:!1})}),e.jsx(s,{label:"Selected",children:e.jsx(o,{layout:"vertical",label:"Label",checked:!0})}),e.jsx(s,{label:"Disabled",children:e.jsx(o,{layout:"vertical",label:"Label",checked:!1,disabled:!0})}),e.jsx(s,{label:"Selected disabled",children:e.jsx(o,{layout:"vertical",label:"Label",checked:!0,disabled:!0})})]}),m=()=>{const[a,n]=f.useState("option1"),t=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3",subLabel:"Additional info"},{value:"option4",label:"Option 4",disabled:!0}];return e.jsxs("div",{style:{padding:24},children:[e.jsx(s,{label:"Group (column, horizontal layout)",children:e.jsx(_,{name:"demo-group",options:t,value:a,onChange:n,layout:"horizontal",groupLayout:"column"})}),e.jsxs("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginTop:8},children:["Selected: ",e.jsx("strong",{style:{color:"#0D2976"},children:a})]})]})},h=()=>{const[a,n]=f.useState("a"),t=[{value:"a",label:"Option A"},{value:"b",label:"Option B"},{value:"c",label:"Option C"}];return e.jsx("div",{style:{padding:24},children:e.jsx(_,{name:"demo-row",options:t,value:a,onChange:n,layout:"horizontal",groupLayout:"row"})})},i=a=>e.jsx("div",{style:{padding:16},children:e.jsx(o,{...a})});i.args={label:"Label",checked:!1,layout:"horizontal"};p.__docgenInfo={description:"",methods:[],displayName:"HorizontalStates"};b.__docgenInfo={description:"",methods:[],displayName:"VerticalStates"};m.__docgenInfo={description:"",methods:[],displayName:"GroupInteractive"};h.__docgenInfo={description:"",methods:[],displayName:"GroupRow"};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var j,z,S;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(S=(z=p.parameters)==null?void 0:z.docs)==null?void 0:S.source}}};var L,k,R;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(R=(k=b.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};var q,w,T;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
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
}`,...(T=(w=m.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var N,I,O;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
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
}`,...(O=(I=h.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var D,V,G;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`args => <div style={{
  padding: 16
}}>
    <Radio {...args} />
  </div>`,...(G=(V=i.parameters)==null?void 0:V.docs)==null?void 0:G.source}}};const ne=["HorizontalStates","VerticalStates","GroupInteractive","GroupRow","Default"];export{i as Default,m as GroupInteractive,h as GroupRow,p as HorizontalStates,b as VerticalStates,ne as __namedExportsOrder,oe as default};
