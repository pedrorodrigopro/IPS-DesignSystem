import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as B}from"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";const _="_bubble_4q9hk_1",j="_dark_4q9hk_12",D="_light_4q9hk_19",o={bubble:_,dark:j,light:D};function n({children:P,variant:k="dark",className:w}){return e.jsx("div",{className:B(o.bubble,o[k],w),children:P})}n.__docgenInfo={description:"",methods:[],displayName:"PPBubble",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"The message text to display inside the bubble"},variant:{required:!1,tsType:{name:"union",raw:'"dark" | "light"',elements:[{name:"literal",value:'"dark"'},{name:"literal",value:'"light"'}]},description:'Visual variant — use "dark" inside the floating glass window, "light" inside the docked panel',defaultValue:{value:'"dark"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional class names"}}};const R={title:"Components/PPBubble",component:n,parameters:{design:{type:"figma",url:"https://www.figma.com/design/xtnTudkEZpuxJoPDSN0xFJ?node-id=634-109034"},layout:"centered"}},i=()=>e.jsxs("div",{style:{padding:24,background:"linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)",borderRadius:12,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,width:400},children:[e.jsx(n,{variant:"dark",children:"Can you find conflicts in my allocation?"}),e.jsx(n,{variant:"dark",children:"Improve my profile for Senior Auditor"}),e.jsx(n,{variant:"dark",children:"Create a bio from my profile"})]});i.parameters={backgrounds:{default:"dark",values:[{name:"dark",value:"#0C1457"}]}};const a=()=>e.jsxs("div",{style:{padding:24,background:"white",border:"1px solid var(--palette-neutral-0)",borderRadius:12,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,width:400},children:[e.jsx(n,{variant:"light",children:"Can you find conflicts in my allocation?"}),e.jsx(n,{variant:"light",children:"Improve my profile for Senior Auditor"}),e.jsx(n,{variant:"light",children:"Create a bio from my profile"})]}),r=()=>e.jsxs("div",{style:{display:"flex",gap:32,alignItems:"flex-start"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginBottom:4},children:"Dark (floating window)"}),e.jsx("div",{style:{padding:16,background:"linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)",borderRadius:8,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8},children:e.jsx(n,{variant:"dark",children:"Find conflicts in my allocation"})})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginBottom:4},children:"Light (docked panel)"}),e.jsx("div",{style:{padding:16,background:"white",border:"1px solid #CFDAF7",borderRadius:8,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8},children:e.jsx(n,{variant:"light",children:"Find conflicts in my allocation"})})]})]});i.__docgenInfo={description:"Used inside the floating glass ProPilot window",methods:[],displayName:"Dark"};a.__docgenInfo={description:"Used inside the docked white ProPilot panel",methods:[],displayName:"Light"};r.__docgenInfo={description:"Both variants for direct comparison",methods:[],displayName:"Comparison"};var l,t,s,d,c;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  background: "linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)",
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 8,
  width: 400
}}>
    <PPBubble variant="dark">Can you find conflicts in my allocation?</PPBubble>
    <PPBubble variant="dark">Improve my profile for Senior Auditor</PPBubble>
    <PPBubble variant="dark">Create a bio from my profile</PPBubble>
  </div>`,...(s=(t=i.parameters)==null?void 0:t.docs)==null?void 0:s.source},description:{story:"Used inside the floating glass ProPilot window",...(c=(d=i.parameters)==null?void 0:d.docs)==null?void 0:c.description}}};var p,m,g,u,f;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  background: "white",
  border: "1px solid var(--palette-neutral-0)",
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 8,
  width: 400
}}>
    <PPBubble variant="light">Can you find conflicts in my allocation?</PPBubble>
    <PPBubble variant="light">Improve my profile for Senior Auditor</PPBubble>
    <PPBubble variant="light">Create a bio from my profile</PPBubble>
  </div>`,...(g=(m=a.parameters)==null?void 0:m.docs)==null?void 0:g.source},description:{story:"Used inside the docked white ProPilot panel",...(f=(u=a.parameters)==null?void 0:u.docs)==null?void 0:f.description}}};var b,h,y,x,v;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  gap: 32,
  alignItems: "flex-start"
}}>
    <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "#5C6E9E",
      marginBottom: 4
    }}>
        Dark (floating window)
      </span>
      <div style={{
      padding: 16,
      background: "linear-gradient(138deg, rgba(10,16,72,0.85) 0%, rgba(64,58,157,1) 28%, rgba(13,75,176,0.92) 61%, rgba(24,39,174,0.72) 96%)",
      borderRadius: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8
    }}>
        <PPBubble variant="dark">Find conflicts in my allocation</PPBubble>
      </div>
    </div>

    <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "#5C6E9E",
      marginBottom: 4
    }}>
        Light (docked panel)
      </span>
      <div style={{
      padding: 16,
      background: "white",
      border: "1px solid #CFDAF7",
      borderRadius: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8
    }}>
        <PPBubble variant="light">Find conflicts in my allocation</PPBubble>
      </div>
    </div>
  </div>`,...(y=(h=r.parameters)==null?void 0:h.docs)==null?void 0:y.source},description:{story:"Both variants for direct comparison",...(v=(x=r.parameters)==null?void 0:x.docs)==null?void 0:v.description}}};const S=["Dark","Light","Comparison"];export{r as Comparison,i as Dark,a as Light,S as __namedExportsOrder,R as default};
