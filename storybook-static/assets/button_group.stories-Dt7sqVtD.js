import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as I}from"./index-DhMLlvMY.js";import{B as n}from"./button_group-DgNR1rlJ.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-D1UQke6Y.js";const P={title:"Molecules/ButtonGroup",component:n,parameters:{layout:"centered",docs:{description:{component:"Split button combining a main action label and a chevron-down dropdown trigger. Primary: #2358F8 bg, white text, rgba separator between the two buttons. Secondary: white bg, #CFDAF7 border, #0D2976 text, no left border on dropdown half. Both: h=32px, body-selected 14px 700, radius 8px on outer corners only."}}}},t={name:"Primary",render:()=>e.jsx(n,{variant:"primary",label:"Generate",onClick:()=>alert("Generate"),onDropdownClick:()=>alert("Dropdown")})},o={name:"Secondary",render:()=>e.jsx(n,{variant:"secondary",label:"Generate",onClick:()=>alert("Generate"),onDropdownClick:()=>alert("Dropdown")})},s={name:"Both variants",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,alignItems:"flex-start"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",width:80},children:"primary"}),e.jsx(n,{variant:"primary",label:"Generate"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",width:80},children:"secondary"}),e.jsx(n,{variant:"secondary",label:"Generate"})]})]})},i={name:"Various labels",render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,alignItems:"flex-start"},children:["Save","Export","Add to shortlist","Create booking"].map(r=>e.jsxs("div",{style:{display:"flex",gap:12},children:[e.jsx(n,{variant:"primary",label:r}),e.jsx(n,{variant:"secondary",label:r})]},r))})},l={name:"Disabled",render:()=>e.jsxs("div",{style:{display:"flex",gap:16},children:[e.jsx(n,{variant:"primary",label:"Generate",disabled:!0}),e.jsx(n,{variant:"secondary",label:"Generate",disabled:!0})]})},d={name:"Interactive (dropdown open state)",render:()=>{const[r,p]=I.useState(!1);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,alignItems:"flex-start"},children:[e.jsx(n,{variant:"primary",label:"Generate",onClick:()=>alert("Main action"),onDropdownClick:()=>p(a=>!a)}),r&&e.jsx("div",{style:{border:"1px solid #CFDAF7",borderRadius:8,background:"#fff",padding:"8px 0",minWidth:160,boxShadow:"0 4px 16px rgba(12,20,87,0.12)"},children:["Option A","Option B","Option C"].map(a=>e.jsx("button",{style:{display:"block",width:"100%",textAlign:"left",padding:"8px 16px",background:"none",border:"none",fontFamily:"Mulish, sans-serif",fontSize:14,color:"#0D2976",cursor:"pointer"},onClick:()=>{alert(a),p(!1)},children:a},a))})]})}};var c,m,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Primary",
  render: () => <ButtonGroup variant="primary" label="Generate" onClick={() => alert("Generate")} onDropdownClick={() => alert("Dropdown")} />
}`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var y,x,b;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Secondary",
  render: () => <ButtonGroup variant="secondary" label="Generate" onClick={() => alert("Generate")} onDropdownClick={() => alert("Dropdown")} />
}`,...(b=(x=o.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,v,g;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Both variants",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "flex-start"
  }}>
      <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16
    }}>
        <span style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        width: 80
      }}>primary</span>
        <ButtonGroup variant="primary" label="Generate" />
      </div>
      <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16
    }}>
        <span style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        width: 80
      }}>secondary</span>
        <ButtonGroup variant="secondary" label="Generate" />
      </div>
    </div>
}`,...(g=(v=s.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var h,G,w;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Various labels",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "flex-start"
  }}>
      {["Save", "Export", "Add to shortlist", "Create booking"].map(label => <div key={label} style={{
      display: "flex",
      gap: 12
    }}>
          <ButtonGroup variant="primary" label={label} />
          <ButtonGroup variant="secondary" label={label} />
        </div>)}
    </div>
}`,...(w=(G=i.parameters)==null?void 0:G.docs)==null?void 0:w.source}}};var C,D,k;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Disabled",
  render: () => <div style={{
    display: "flex",
    gap: 16
  }}>
      <ButtonGroup variant="primary" label="Generate" disabled />
      <ButtonGroup variant="secondary" label="Generate" disabled />
    </div>
}`,...(k=(D=l.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};var S,j,B;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Interactive (dropdown open state)",
  render: () => {
    const [open, setOpen] = useState(false);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
      alignItems: "flex-start"
    }}>
        <ButtonGroup variant="primary" label="Generate" onClick={() => alert("Main action")} onDropdownClick={() => setOpen(o => !o)} />
        {open && <div style={{
        border: "1px solid #CFDAF7",
        borderRadius: 8,
        background: "#fff",
        padding: "8px 0",
        minWidth: 160,
        boxShadow: "0 4px 16px rgba(12,20,87,0.12)"
      }}>
            {["Option A", "Option B", "Option C"].map(opt => <button key={opt} style={{
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "8px 16px",
          background: "none",
          border: "none",
          fontFamily: "Mulish, sans-serif",
          fontSize: 14,
          color: "#0D2976",
          cursor: "pointer"
        }} onClick={() => {
          alert(opt);
          setOpen(false);
        }}>
                {opt}
              </button>)}
          </div>}
      </div>;
  }
}`,...(B=(j=d.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};const V=["Primary","Secondary","BothVariants","CustomLabels","Disabled","Interactive"];export{s as BothVariants,i as CustomLabels,l as Disabled,d as Interactive,t as Primary,o as Secondary,V as __namedExportsOrder,P as default};
