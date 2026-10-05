import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as i}from"./index-DhMLlvMY.js";import{c as j}from"./index-Dd5QUkq_.js";import{I as ee}from"./icon-D1UQke6Y.js";import"./_commonjsHelpers-CqkleIqs.js";const ne="_field_12qdl_1",le="_disabled_12qdl_8",ae="_labelRow_12qdl_13",te="_label_12qdl_13",se="_mandatoryIcon_12qdl_28",ie="_buttons_12qdl_33",oe="_btn_12qdl_40",re="_first_12qdl_56",de="_middle_12qdl_60",ue="_last_12qdl_67",ce="_selected_12qdl_75",ve="_unselected_12qdl_85",t={field:ne,disabled:le,labelRow:ae,label:te,mandatoryIcon:se,buttons:ie,btn:oe,first:re,middle:de,last:ue,selected:ce,unselected:ve},me=()=>e.jsx(ee,{name:"mandatory",size:16,className:t.mandatoryIcon,"aria-hidden":"true"});function a({options:n,value:l,onChange:o,label:f,mandatory:J=!1,disabled:g=!1,className:K}){const[Q,U]=i.useState(l),h=o!==void 0,y=h?l:Q,X=s=>{g||s!==y&&(h||U(s),o==null||o(s))},Z=n.length;return e.jsxs("div",{className:j(t.field,g&&t.disabled,K),children:[f&&e.jsxs("div",{className:t.labelRow,children:[e.jsx("span",{className:t.label,children:f}),J&&e.jsx(me,{})]}),e.jsx("div",{className:t.buttons,role:"group","aria-label":f,children:n.map((s,x)=>{const S=s.value===y,$=x===0?"first":x===Z-1?"last":"middle";return e.jsx("button",{type:"button",role:"radio","aria-checked":S,disabled:g,className:j(t.btn,t[$],S?t.selected:t.unselected),onClick:()=>X(s.value),children:s.label},s.value)})})]})}a.__docgenInfo={description:"",methods:[],displayName:"Toggle",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: string;
  label: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}}]}}],raw:"ToggleOption[]"},description:""},value:{required:!1,tsType:{name:"string"},description:"Currently selected value. Pass undefined for no selection."},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:"Optional field label above the buttons"},mandatory:{required:!1,tsType:{name:"boolean"},description:"Show mandatory asterisk/marker next to label",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"Disabled state — no interaction possible",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const ye={title:"Components/Toggle",component:a,parameters:{layout:"centered",docs:{description:{component:"Segmented toggle with radio-button semantics — once selected an option cannot be deselected. Supports 2–N options, optional label, mandatory marker, and disabled state. States: selected (#0C1457 bg), unselected resting, hover (rgba(0,0,0,0.04)), focus (2px outline)."}}}},r={name:"Two options",render:()=>{const[n,l]=i.useState();return e.jsx("div",{style:{width:320},children:e.jsx(a,{options:[{value:"yes",label:"Yes"},{value:"no",label:"No"}],value:n,onChange:l})})}},d={name:"Three options",render:()=>{const[n,l]=i.useState("week");return e.jsx("div",{style:{width:360},children:e.jsx(a,{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"}],value:n,onChange:l})})}},u={name:"Five options (from Figma)",render:()=>{const[n,l]=i.useState("first");return e.jsx("div",{style:{width:560},children:e.jsx(a,{options:[{value:"first",label:"First"},{value:"second",label:"Middle"},{value:"third",label:"Middle"},{value:"fourth",label:"Middle"},{value:"last",label:"Last"}],value:n,onChange:l})})}},c={name:"With label",render:()=>{const[n,l]=i.useState();return e.jsx("div",{style:{width:360},children:e.jsx(a,{label:"New start date",options:[{value:"asap",label:"ASAP"},{value:"specific",label:"Specific date"},{value:"flexible",label:"Flexible"}],value:n,onChange:l})})}},v={name:"With label + mandatory",render:()=>{const[n,l]=i.useState();return e.jsx("div",{style:{width:360},children:e.jsx(a,{label:"New start date",mandatory:!0,options:[{value:"asap",label:"ASAP"},{value:"specific",label:"Specific date"},{value:"flexible",label:"Flexible"}],value:n,onChange:l})})}},m={name:"No initial selection",render:()=>{const[n,l]=i.useState(void 0);return e.jsxs("div",{style:{width:360},children:[e.jsx(a,{label:"Preference",options:[{value:"low",label:"Low"},{value:"medium",label:"Medium"},{value:"high",label:"High"}],value:n,onChange:l}),e.jsxs("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginTop:8},children:["Selected: ",n??"(none)"]})]})}},b={render:()=>e.jsx("div",{style:{width:360},children:e.jsx(a,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:"active",disabled:!0})})},p={name:"All states",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,width:400},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"First selected"}),e.jsx(a,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"a"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Middle selected"}),e.jsx(a,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"b"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Last selected"}),e.jsx(a,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"c"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"None selected"}),e.jsx(a,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:void 0})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6},children:"Disabled (first selected)"}),e.jsx(a,{options:[{value:"a",label:"First"},{value:"b",label:"Middle"},{value:"c",label:"Last"}],value:"a",disabled:!0})]})]})};var w,_,M;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(M=(_=r.parameters)==null?void 0:_.docs)==null?void 0:M.source}}};var F,T,E;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(E=(T=d.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};var C,N,q;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(q=(N=u.parameters)==null?void 0:N.docs)==null?void 0:q.source}}};var L,V,A;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(A=(V=c.parameters)==null?void 0:V.docs)==null?void 0:A.source}}};var k,z,I;v.parameters={...v.parameters,docs:{...(k=v.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(I=(z=v.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};var B,W,D;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(D=(W=m.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var O,P,R;b.parameters={...b.parameters,docs:{...(O=b.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(R=(P=b.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var H,Y,G;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(G=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:G.source}}};const xe=["TwoOptions","ThreeOptions","FiveOptions","WithLabel","WithLabelMandatory","NoInitialSelection","Disabled","AllStates"];export{p as AllStates,b as Disabled,u as FiveOptions,m as NoInitialSelection,d as ThreeOptions,r as TwoOptions,c as WithLabel,v as WithLabelMandatory,xe as __namedExportsOrder,ye as default};
