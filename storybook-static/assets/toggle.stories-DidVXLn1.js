import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as t}from"./index-DhMLlvMY.js";import{T as a}from"./toggle-x4xGpaH5.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-v-ZctF2y.js";const X={title:"Components/Toggle",component:a,parameters:{layout:"centered",docs:{description:{component:"Segmented toggle with radio-button semantics — once selected an option cannot be deselected. Supports 2–N options, optional label, mandatory marker, and disabled state. States: selected (#0C1457 bg), unselected resting, hover (rgba(0,0,0,0.04)), focus (2px outline)."}}}},s={name:"Two options",render:()=>{const[n,l]=t.useState();return e.jsx("div",{style:{width:320},children:e.jsx(a,{options:[{value:"yes",label:"Yes"},{value:"no",label:"No"}],value:n,onChange:l})})}},i={name:"Icon only (note / list)",render:()=>{const[n,l]=t.useState("note");return e.jsx(a,{options:[{value:"note",label:"Note view",icon:"note"},{value:"list",label:"List view",icon:"list"}],value:n,onChange:l})}},o={name:"Three options",render:()=>{const[n,l]=t.useState("week");return e.jsx("div",{style:{width:360},children:e.jsx(a,{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"}],value:n,onChange:l})})}},r={name:"Five options (from Figma)",render:()=>{const[n,l]=t.useState("first");return e.jsx("div",{style:{width:560},children:e.jsx(a,{options:[{value:"first",label:"First"},{value:"second",label:"Middle"},{value:"third",label:"Middle"},{value:"fourth",label:"Middle"},{value:"last",label:"Last"}],value:n,onChange:l})})}},u={name:"With label",render:()=>{const[n,l]=t.useState();return e.jsx("div",{style:{width:360},children:e.jsx(a,{label:"New start date",options:[{value:"asap",label:"ASAP"},{value:"specific",label:"Specific date"},{value:"flexible",label:"Flexible"}],value:n,onChange:l})})}},d={name:"With label + mandatory",render:()=>{const[n,l]=t.useState();return e.jsx("div",{style:{width:360},children:e.jsx(a,{label:"New start date",mandatory:!0,options:[{value:"asap",label:"ASAP"},{value:"specific",label:"Specific date"},{value:"flexible",label:"Flexible"}],value:n,onChange:l})})}},c={name:"No initial selection",render:()=>{const[n,l]=t.useState(void 0);return e.jsxs("div",{style:{width:360},children:[e.jsx(a,{label:"Preference",options:[{value:"low",label:"Low"},{value:"medium",label:"Medium"},{value:"high",label:"High"}],value:n,onChange:l}),e.jsxs("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginTop:8},children:["Selected: ",n??"(none)"]})]})}},v={render:()=>e.jsx("div",{style:{width:360},children:e.jsx(a,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:"active",disabled:!0})})},p={name:"All states",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:400},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"First selected"}),e.jsx(a,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"a"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Middle selected"}),e.jsx(a,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"b"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Last selected"}),e.jsx(a,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"c"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"None selected"}),e.jsx(a,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:void 0})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Disabled (first selected)"}),e.jsx(a,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"a",disabled:!0})]})]})},b={name:"Vertical",parameters:{docs:{description:{story:'`orientation="vertical"` stacks the buttons, e.g. to line up with two rows of values.'}}},render:()=>{const[n,l]=t.useState("rules");return e.jsx("div",{style:{width:220},children:e.jsx(a,{orientation:"vertical",options:[{value:"rules",label:"Availability rules"},{value:"actuals",label:"Actuals"}],value:n,onChange:l})})}};var m,h,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(g=(h=s.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var f,y,S;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(S=(y=i.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var x,w,j;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(j=(w=o.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var F,M,C;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(C=(M=r.parameters)==null?void 0:M.docs)==null?void 0:C.source}}};var V,E,T;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(T=(E=u.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var L,A,N;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(N=(A=d.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};var z,B,W;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(W=(B=c.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};var k,O,D;v.parameters={...v.parameters,docs:{...(k=v.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(D=(O=v.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};var I,P,H;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(H=(P=p.parameters)==null?void 0:P.docs)==null?void 0:H.source}}};var Y,_,R;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: "Vertical",
  parameters: {
    docs: {
      description: {
        story: "\`orientation=\\"vertical\\"\` stacks the buttons, e.g. to line up with two rows of values."
      }
    }
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>("rules");
    return <div style={{
      width: 220
    }}>
        <Toggle orientation="vertical" options={[{
        value: "rules",
        label: "Availability rules"
      }, {
        value: "actuals",
        label: "Actuals"
      }]} value={value} onChange={setValue} />
      </div>;
  }
}`,...(R=(_=b.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};const Z=["TwoOptions","IconOnly","ThreeOptions","FiveOptions","WithLabel","WithLabelMandatory","NoInitialSelection","Disabled","AllStates","Vertical"];export{p as AllStates,v as Disabled,r as FiveOptions,i as IconOnly,c as NoInitialSelection,o as ThreeOptions,s as TwoOptions,b as Vertical,u as WithLabel,d as WithLabelMandatory,Z as __namedExportsOrder,X as default};
