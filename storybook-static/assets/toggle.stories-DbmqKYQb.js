import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as t}from"./index-DhMLlvMY.js";import{T as l}from"./toggle-BNLvGwJW.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-v-ZctF2y.js";const J={title:"Components/Toggle",component:l,parameters:{layout:"centered",docs:{description:{component:"Segmented toggle with radio-button semantics — once selected an option cannot be deselected. Supports 2–N options, optional label, mandatory marker, and disabled state. States: selected (#0C1457 bg), unselected resting, hover (rgba(0,0,0,0.04)), focus (2px outline)."}}}},s={name:"Two options",render:()=>{const[n,a]=t.useState();return e.jsx("div",{style:{width:320},children:e.jsx(l,{options:[{value:"yes",label:"Yes"},{value:"no",label:"No"}],value:n,onChange:a})})}},i={name:"Icon only (note / list)",render:()=>{const[n,a]=t.useState("note");return e.jsx(l,{options:[{value:"note",label:"Note view",icon:"note"},{value:"list",label:"List view",icon:"list"}],value:n,onChange:a})}},o={name:"Three options",render:()=>{const[n,a]=t.useState("week");return e.jsx("div",{style:{width:360},children:e.jsx(l,{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"}],value:n,onChange:a})})}},r={name:"Five options (from Figma)",render:()=>{const[n,a]=t.useState("first");return e.jsx("div",{style:{width:560},children:e.jsx(l,{options:[{value:"first",label:"First"},{value:"second",label:"Middle"},{value:"third",label:"Middle"},{value:"fourth",label:"Middle"},{value:"last",label:"Last"}],value:n,onChange:a})})}},d={name:"With label",render:()=>{const[n,a]=t.useState();return e.jsx("div",{style:{width:360},children:e.jsx(l,{label:"New start date",options:[{value:"asap",label:"ASAP"},{value:"specific",label:"Specific date"},{value:"flexible",label:"Flexible"}],value:n,onChange:a})})}},u={name:"With label + mandatory",render:()=>{const[n,a]=t.useState();return e.jsx("div",{style:{width:360},children:e.jsx(l,{label:"New start date",mandatory:!0,options:[{value:"asap",label:"ASAP"},{value:"specific",label:"Specific date"},{value:"flexible",label:"Flexible"}],value:n,onChange:a})})}},c={name:"No initial selection",render:()=>{const[n,a]=t.useState(void 0);return e.jsxs("div",{style:{width:360},children:[e.jsx(l,{label:"Preference",options:[{value:"low",label:"Low"},{value:"medium",label:"Medium"},{value:"high",label:"High"}],value:n,onChange:a}),e.jsxs("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginTop:8},children:["Selected: ",n??"(none)"]})]})}},v={render:()=>e.jsx("div",{style:{width:360},children:e.jsx(l,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:"active",disabled:!0})})},p={name:"All states",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:400},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"First selected"}),e.jsx(l,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"a"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Middle selected"}),e.jsx(l,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"b"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Last selected"}),e.jsx(l,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"c"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"None selected"}),e.jsx(l,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:void 0})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Disabled (first selected)"}),e.jsx(l,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"a",disabled:!0})]})]})};var b,m,h;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Two options",
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return <div style={{
      width: 320
    }}>
        <Toggle options={[{
        value: "yes",
        label: "Yes"
      }, {
        value: "no",
        label: "No"
      }]} value={value} onChange={setValue} />
      </div>;
  }
}`,...(h=(m=s.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var g,f,y;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Icon only (note / list)",
  render: () => {
    const [value, setValue] = useState<string | undefined>("note");
    return <Toggle options={[{
      value: "note",
      label: "Note view",
      icon: "note"
    }, {
      value: "list",
      label: "List view",
      icon: "list"
    }]} value={value} onChange={setValue} />;
  }
}`,...(y=(f=i.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var S,x,w;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Three options",
  render: () => {
    const [value, setValue] = useState<string | undefined>("week");
    return <div style={{
      width: 360
    }}>
        <Toggle options={[{
        value: "day",
        label: "Day"
      }, {
        value: "week",
        label: "Week"
      }, {
        value: "month",
        label: "Month"
      }]} value={value} onChange={setValue} />
      </div>;
  }
}`,...(w=(x=o.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var F,M,j;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: "Five options (from Figma)",
  render: () => {
    const [value, setValue] = useState<string | undefined>("first");
    return <div style={{
      width: 560
    }}>
        <Toggle options={[{
        value: "first",
        label: "First"
      }, {
        value: "second",
        label: "Middle"
      }, {
        value: "third",
        label: "Middle"
      }, {
        value: "fourth",
        label: "Middle"
      }, {
        value: "last",
        label: "Last"
      }]} value={value} onChange={setValue} />
      </div>;
  }
}`,...(j=(M=r.parameters)==null?void 0:M.docs)==null?void 0:j.source}}};var C,E,T;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "With label",
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return <div style={{
      width: 360
    }}>
        <Toggle label="New start date" options={[{
        value: "asap",
        label: "ASAP"
      }, {
        value: "specific",
        label: "Specific date"
      }, {
        value: "flexible",
        label: "Flexible"
      }]} value={value} onChange={setValue} />
      </div>;
  }
}`,...(T=(E=d.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var L,V,N;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: "With label + mandatory",
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return <div style={{
      width: 360
    }}>
        <Toggle label="New start date" mandatory options={[{
        value: "asap",
        label: "ASAP"
      }, {
        value: "specific",
        label: "Specific date"
      }, {
        value: "flexible",
        label: "Flexible"
      }]} value={value} onChange={setValue} />
      </div>;
  }
}`,...(N=(V=u.parameters)==null?void 0:V.docs)==null?void 0:N.source}}};var A,z,B;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: "No initial selection",
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <div style={{
      width: 360
    }}>
        <Toggle label="Preference" options={[{
        value: "low",
        label: "Low"
      }, {
        value: "medium",
        label: "Medium"
      }, {
        value: "high",
        label: "High"
      }]} value={value} onChange={setValue} />
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 12,
        color: "#5C6E9E",
        marginTop: 8
      }}>
          Selected: {value ?? "(none)"}
        </p>
      </div>;
  }
}`,...(B=(z=c.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var W,O,D;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360
  }}>
      <Toggle label="Status" options={[{
      value: "active",
      label: "Active"
    }, {
      value: "inactive",
      label: "Inactive"
    }]} value="active" disabled />
    </div>
}`,...(D=(O=v.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};var I,k,P;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: "All states",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 24,
    width: 400
  }}>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 6
      }}>
          First selected
        </p>
        <Toggle options={[{
        value: "a",
        label: "First"
      }, {
        value: "b",
        label: "Middle"
      }, {
        value: "c",
        label: "Last"
      }]} value="a" />
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 6
      }}>
          Middle selected
        </p>
        <Toggle options={[{
        value: "a",
        label: "First"
      }, {
        value: "b",
        label: "Middle"
      }, {
        value: "c",
        label: "Last"
      }]} value="b" />
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 6
      }}>
          Last selected
        </p>
        <Toggle options={[{
        value: "a",
        label: "First"
      }, {
        value: "b",
        label: "Middle"
      }, {
        value: "c",
        label: "Last"
      }]} value="c" />
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 6
      }}>
          None selected
        </p>
        <Toggle options={[{
        value: "a",
        label: "First"
      }, {
        value: "b",
        label: "Middle"
      }, {
        value: "c",
        label: "Last"
      }]} value={undefined} />
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 6
      }}>
          Disabled (first selected)
        </p>
        <Toggle options={[{
        value: "a",
        label: "First"
      }, {
        value: "b",
        label: "Middle"
      }, {
        value: "c",
        label: "Last"
      }]} value="a" disabled />
      </div>
    </div>
}`,...(P=(k=p.parameters)==null?void 0:k.docs)==null?void 0:P.source}}};const K=["TwoOptions","IconOnly","ThreeOptions","FiveOptions","WithLabel","WithLabelMandatory","NoInitialSelection","Disabled","AllStates"];export{p as AllStates,v as Disabled,r as FiveOptions,i as IconOnly,c as NoInitialSelection,o as ThreeOptions,s as TwoOptions,d as WithLabel,u as WithLabelMandatory,K as __namedExportsOrder,J as default};
