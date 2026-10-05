import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as B}from"./index-DhMLlvMY.js";import{S as n}from"./switch-yHtKPN7c.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const $={title:"Components/Switch",component:n,parameters:{layout:"centered",docs:{description:{component:"Toggle switch (Figma node 1635:27830). Pill track 43.2×24px. White circle handle slides with 200ms ease. Track shows a ✓ check on the left (ON) and × cross on the right (OFF) for accessible visual indication. Off: #CFDAF7 → #D5D5D5 hover. On: #0C1457 → #1531B8 hover. Focus: double ring (4px #0C1457 + 2px white). Layouts: horizontal-left, vertical, mobile-full."}}}},i={name:"Interactive",render:()=>{const[l,t]=B.useState(!1);return e.jsx(n,{label:"Enable notifications",checked:l,onChange:t})}},o={name:"Off",render:()=>e.jsx(n,{label:"Label",checked:!1})},r={name:"On",render:()=>e.jsx(n,{label:"Label",checked:!0})},c={name:"Without label",render:()=>e.jsxs("div",{style:{display:"flex",gap:16},children:[e.jsx(n,{showLabel:!1,checked:!1}),e.jsx(n,{showLabel:!1,checked:!0})]})},d={name:"All layouts",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32,alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"horizontal-left (default)"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx(n,{layout:"horizontal-left",label:"Label",checked:!1}),e.jsx(n,{layout:"horizontal-left",label:"Label",checked:!0})]})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"vertical"}),e.jsxs("div",{style:{display:"flex",gap:24},children:[e.jsx(n,{layout:"vertical",label:"Label",checked:!1}),e.jsx(n,{layout:"vertical",label:"Label",checked:!0})]})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"mobile-full"}),e.jsxs("div",{style:{width:200,display:"flex",flexDirection:"column",gap:8},children:[e.jsx(n,{layout:"mobile-full",label:"Label",checked:!1}),e.jsx(n,{layout:"mobile-full",label:"Label",checked:!0})]})]})]})},f={name:"All states",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,alignItems:"flex-start"},children:[[{label:"Off",checked:!1,disabled:!1},{label:"On",checked:!0,disabled:!1},{label:"Off disabled",checked:!1,disabled:!0},{label:"On disabled",checked:!0,disabled:!0}].map(({label:l,checked:t,disabled:m})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",width:100},children:l}),e.jsx(n,{checked:t,disabled:m,showLabel:!1})]},l)),e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",marginTop:8},children:"Tab to a switch to see the focus ring."})]})},h={name:"Settings list",render:()=>{const[l,t]=B.useState({notifications:!0,emails:!1,reminders:!0,digest:!1}),m=s=>t(a=>({...a,[s]:!a[s]}));return e.jsx("div",{style:{display:"flex",flexDirection:"column",width:280},children:Object.entries(l).map(([s,a])=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #CFDAF7"},children:[e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#0D2976",textTransform:"capitalize"},children:s.replace(/([A-Z])/g," $1")}),e.jsx(n,{showLabel:!1,checked:a,onChange:()=>m(s)})]},s))})}};var p,u,b;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Interactive",
  render: () => {
    const [on, setOn] = useState(false);
    return <Switch label="Enable notifications" checked={on} onChange={setOn} />;
  }
}`,...(b=(u=i.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var y,g,x;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Off",
  render: () => <Switch label="Label" checked={false} />
}`,...(x=(g=o.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var v,S,k;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "On",
  render: () => <Switch label="Label" checked={true} />
}`,...(k=(S=r.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var j,w,L;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "Without label",
  render: () => <div style={{
    display: "flex",
    gap: 16
  }}>
      <Switch showLabel={false} checked={false} />
      <Switch showLabel={false} checked={true} />
    </div>
}`,...(L=(w=c.parameters)==null?void 0:w.docs)==null?void 0:L.source}}};var O,F,E;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: "All layouts",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 32,
    alignItems: "flex-start"
  }}>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>
          horizontal-left (default)
        </p>
        <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}>
          <Switch layout="horizontal-left" label="Label" checked={false} />
          <Switch layout="horizontal-left" label="Label" checked={true} />
        </div>
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>
          vertical
        </p>
        <div style={{
        display: "flex",
        gap: 24
      }}>
          <Switch layout="vertical" label="Label" checked={false} />
          <Switch layout="vertical" label="Label" checked={true} />
        </div>
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>
          mobile-full
        </p>
        <div style={{
        width: 200,
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}>
          <Switch layout="mobile-full" label="Label" checked={false} />
          <Switch layout="mobile-full" label="Label" checked={true} />
        </div>
      </div>
    </div>
}`,...(E=(F=d.parameters)==null?void 0:F.docs)==null?void 0:E.source}}};var D,z,C;f.parameters={...f.parameters,docs:{...(D=f.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: "All states",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "flex-start"
  }}>
      {[{
      label: "Off",
      checked: false,
      disabled: false
    }, {
      label: "On",
      checked: true,
      disabled: false
    }, {
      label: "Off disabled",
      checked: false,
      disabled: true
    }, {
      label: "On disabled",
      checked: true,
      disabled: true
    }].map(({
      label,
      checked,
      disabled
    }) => <div key={label} style={{
      display: "flex",
      alignItems: "center",
      gap: 16
    }}>
          <span style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        width: 100
      }}>
            {label}
          </span>
          <Switch checked={checked} disabled={disabled} showLabel={false} />
        </div>)}
      <p style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 11,
      color: "#8F9ED1",
      marginTop: 8
    }}>
        Tab to a switch to see the focus ring.
      </p>
    </div>
}`,...(C=(z=f.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};var M,A,I;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "Settings list",
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      emails: false,
      reminders: true,
      digest: false
    });
    const toggle = (key: keyof typeof settings) => setSettings(s => ({
      ...s,
      [key]: !s[key]
    }));
    return <div style={{
      display: "flex",
      flexDirection: "column",
      width: 280
    }}>
        {(Object.entries(settings) as [keyof typeof settings, boolean][]).map(([key, val]) => <div key={key} style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: "1px solid #CFDAF7"
      }}>
            <span style={{
          fontFamily: "Mulish, sans-serif",
          fontSize: 14,
          color: "#0D2976",
          textTransform: "capitalize"
        }}>
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            <Switch showLabel={false} checked={val} onChange={() => toggle(key)} />
          </div>)}
      </div>;
  }
}`,...(I=(A=h.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};const P=["Default","Off","On","NoLabel","Layouts","AllStates","SettingsList"];export{f as AllStates,i as Default,d as Layouts,c as NoLabel,o as Off,r as On,h as SettingsList,P as __namedExportsOrder,$ as default};
