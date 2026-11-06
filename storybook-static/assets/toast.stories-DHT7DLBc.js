import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as E}from"./index-DhMLlvMY.js";import{T as s,a as A,u as I}from"./toast-T5KYSdiW.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-Dpkq_sne.js";const N={title:"Components/Toast",component:s,parameters:{layout:"centered",docs:{description:{component:"Bottom-centre fixed notification. Three types: success (#0D2976), warning (#FFCD38), error (#A30013). Slides up on mount, auto-dismisses after 5s, closeable via cross button. Use `ToastProvider` + `useToast()` hook for imperative usage in apps."}}}},n={render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:e.jsx(s,{type:"success",message:"Success message toaster",visible:!0,onClose:()=>{},className:void 0})})},a={render:()=>e.jsx(s,{type:"warning",message:"Warning message toaster",visible:!0,onClose:()=>{}})},i={render:()=>e.jsx(s,{type:"error",message:"Toast message",visible:!0,onClose:()=>{}})},c={name:"All Types",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,alignItems:"center"},children:[e.jsx(s,{type:"success",message:"Success message toaster",visible:!0,onClose:()=>{}}),e.jsx(s,{type:"warning",message:"Warning message toaster",visible:!0,onClose:()=>{}}),e.jsx(s,{type:"error",message:"Toast message",visible:!0,onClose:()=>{}})]})};function P(){const{showToast:r}=I(),t=["success","warning","error"],m={success:"Saved successfully!",warning:"Please review before continuing.",error:"Something went wrong. Try again."};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,alignItems:"center"},children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:13,color:"#5C6E9E",marginBottom:8},children:"Click a button to show a toast (auto-dismisses after 5s)."}),e.jsx("div",{style:{display:"flex",gap:12},children:t.map(o=>e.jsxs("button",{style:{padding:"8px 20px",borderRadius:4,border:"1px solid #CFDAF7",background:"#fff",fontFamily:"Mulish, sans-serif",fontWeight:700,fontSize:13,color:"#0C1457",cursor:"pointer"},onClick:()=>r({type:o,message:m[o]}),children:["Show ",o]},o))}),e.jsx("button",{style:{padding:"8px 20px",borderRadius:4,border:"1px solid #CFDAF7",background:"#fff",fontFamily:"Mulish, sans-serif",fontWeight:700,fontSize:13,color:"#0C1457",cursor:"pointer"},onClick:()=>r({type:"success",message:"This one stays until closed.",duration:0}),children:"Show persistent (no auto-dismiss)"})]})}const l={name:"Interactive (live, with animation)",parameters:{layout:"centered"},render:()=>e.jsx(A,{children:e.jsx(P,{})})};function z(){const{showToast:r}=I(),[t,m]=E.useState([]);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,alignItems:"center",fontFamily:"Mulish, sans-serif",color:"#0D2976"},children:[e.jsx("button",{style:{padding:"8px 20px",borderRadius:4,border:"1px solid #CFDAF7",background:"#fff",fontWeight:700,fontSize:13,color:"#0C1457",cursor:"pointer"},onClick:()=>r({type:"success",message:"Roles are being created in the background.",onClose:()=>m(o=>[...o,"toast closed"])}),children:"Show toast"}),e.jsx("span",{style:{fontSize:13},children:t.length===0?"onClose has not fired yet":`onClose fired ${t.length}×`})]})}const d={name:"onClose (fires when the toast has closed)",parameters:{layout:"centered",docs:{description:{story:"`showToast({ …, onClose })` calls back once after the exit animation, whether the toast timed out or the cross was clicked. Use it to continue a flow once the toast is gone."}}},render:()=>e.jsx(A,{children:e.jsx(z,{})})};var p,u,g;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12
  }}>
      <Toast type="success" message="Success message toaster" visible onClose={() => {}} className={undefined} />
    </div>
}`,...(g=(u=n.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var f,h,y;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <Toast type="warning" message="Warning message toaster" visible onClose={() => {}} />
}`,...(y=(h=a.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var x,v,C;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <Toast type="error" message="Toast message" visible onClose={() => {}} />
}`,...(C=(v=i.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var b,T,w;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "All Types",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "center"
  }}>
      <Toast type="success" message="Success message toaster" visible onClose={() => {}} />
      <Toast type="warning" message="Warning message toaster" visible onClose={() => {}} />
      <Toast type="error" message="Toast message" visible onClose={() => {}} />
    </div>
}`,...(w=(T=c.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var S,j,D;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Interactive (live, with animation)",
  parameters: {
    layout: "centered"
  },
  render: () => <ToastProvider>
      <LiveDemo />
    </ToastProvider>
}`,...(D=(j=l.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var k,F,W;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "onClose (fires when the toast has closed)",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story: "\`showToast({ …, onClose })\` calls back once after the exit animation, whether the toast timed out or the cross was clicked. Use it to continue a flow once the toast is gone."
      }
    }
  },
  render: () => <ToastProvider>
      <OnCloseDemo />
    </ToastProvider>
}`,...(W=(F=d.parameters)==null?void 0:F.docs)==null?void 0:W.source}}};const _=["Success","Warning","Error","AllTypes","Interactive","OnClose"];export{c as AllTypes,i as Error,l as Interactive,d as OnClose,n as Success,a as Warning,_ as __namedExportsOrder,N as default};
