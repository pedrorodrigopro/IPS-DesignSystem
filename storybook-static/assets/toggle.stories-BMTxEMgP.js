import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as t}from"./index-DhMLlvMY.js";import{T as n}from"./toggle--NM9s2ys.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-D1UQke6Y.js";const _={title:"Components/Toggle",component:n,parameters:{layout:"centered",docs:{description:{component:"Segmented toggle with radio-button semantics — once selected an option cannot be deselected. Supports 2–N options, optional label, mandatory marker, and disabled state. States: selected (#0C1457 bg), unselected resting, hover (rgba(0,0,0,0.04)), focus (2px outline)."}}}},s={name:"Two options",render:()=>{const[l,a]=t.useState();return e.jsx("div",{style:{width:320},children:e.jsx(n,{options:[{value:"yes",label:"Yes"},{value:"no",label:"No"}],value:l,onChange:a})})}},i={name:"Three options",render:()=>{const[l,a]=t.useState("week");return e.jsx("div",{style:{width:360},children:e.jsx(n,{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"}],value:l,onChange:a})})}},o={name:"Five options (from Figma)",render:()=>{const[l,a]=t.useState("first");return e.jsx("div",{style:{width:560},children:e.jsx(n,{options:[{value:"first",label:"First"},{value:"second",label:"Middle"},{value:"third",label:"Middle"},{value:"fourth",label:"Middle"},{value:"last",label:"Last"}],value:l,onChange:a})})}},r={name:"With label",render:()=>{const[l,a]=t.useState();return e.jsx("div",{style:{width:360},children:e.jsx(n,{label:"New start date",options:[{value:"asap",label:"ASAP"},{value:"specific",label:"Specific date"},{value:"flexible",label:"Flexible"}],value:l,onChange:a})})}},d={name:"With label + mandatory",render:()=>{const[l,a]=t.useState();return e.jsx("div",{style:{width:360},children:e.jsx(n,{label:"New start date",mandatory:!0,options:[{value:"asap",label:"ASAP"},{value:"specific",label:"Specific date"},{value:"flexible",label:"Flexible"}],value:l,onChange:a})})}},u={name:"No initial selection",render:()=>{const[l,a]=t.useState(void 0);return e.jsxs("div",{style:{width:360},children:[e.jsx(n,{label:"Preference",options:[{value:"low",label:"Low"},{value:"medium",label:"Medium"},{value:"high",label:"High"}],value:l,onChange:a}),e.jsxs("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginTop:8},children:["Selected: ",l??"(none)"]})]})}},c={render:()=>e.jsx("div",{style:{width:360},children:e.jsx(n,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:"active",disabled:!0})})},v={name:"All states",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:400},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"First selected"}),e.jsx(n,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"a"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Middle selected"}),e.jsx(n,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"b"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Last selected"}),e.jsx(n,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"c"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"None selected"}),e.jsx(n,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:void 0})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Disabled (first selected)"}),e.jsx(n,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"a",disabled:!0})]})]})};var p,b,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(m=(b=s.parameters)==null?void 0:b.docs)==null?void 0:m.source}}};var h,g,f;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(f=(g=i.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var y,S,x;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(x=(S=o.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var F,M,j;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(j=(M=r.parameters)==null?void 0:M.docs)==null?void 0:j.source}}};var w,E,C;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(C=(E=d.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};var T,L,V;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(V=(L=u.parameters)==null?void 0:L.docs)==null?void 0:V.source}}};var A,N,z;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(z=(N=c.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};var B,W,D;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(D=(W=v.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};const R=["TwoOptions","ThreeOptions","FiveOptions","WithLabel","WithLabelMandatory","NoInitialSelection","Disabled","AllStates"];export{v as AllStates,c as Disabled,o as FiveOptions,u as NoInitialSelection,i as ThreeOptions,s as TwoOptions,r as WithLabel,d as WithLabelMandatory,R as __namedExportsOrder,_ as default};
