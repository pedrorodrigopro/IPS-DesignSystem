import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{A as n}from"./alert-3N4EUYfQ.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./icon-D1UQke6Y.js";import"./index-DhMLlvMY.js";const G={title:"Components/Alert",component:n,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=2802-170745"}},argTypes:{type:{control:"select",options:["error","warning","success","general","ai","bulk-banner"]},layout:{control:"select",options:["inline","with-header"]}}},i="Body body Body body aBody body aBody body aBody body aBody body aBody body aBody body aBody body Body body",l=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,maxWidth:723},children:[e.jsx(n,{type:"error",layout:"inline",message:"Error inline notification",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"warning",layout:"inline",message:"Warning inline notification",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"success",layout:"inline",message:"Success inline notification",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"general",layout:"inline",message:"General inline notification",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"ai",layout:"inline",message:"AI notification",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"bulk-banner",layout:"inline",message:"10 items selected",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]})]}),t=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,maxWidth:723},children:[e.jsx(n,{type:"error",layout:"inline",message:"Error inline notification"}),e.jsx(n,{type:"warning",layout:"inline",message:"Warning inline notification"}),e.jsx(n,{type:"success",layout:"inline",message:"Success inline notification"}),e.jsx(n,{type:"general",layout:"inline",message:"General inline notification"})]}),o=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:723},children:[e.jsx(n,{type:"error",layout:"with-header",message:"Error inline notification",body:i,actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"warning",layout:"with-header",message:"Warning inline notification",body:i,actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"success",layout:"with-header",message:"Success inline notification",body:i,actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"general",layout:"with-header",message:"General inline notification",body:i,actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]})]}),s=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:723},children:[e.jsx(n,{type:"error",layout:"with-header",message:"Error inline notification",body:i}),e.jsx(n,{type:"warning",layout:"with-header",message:"Warning inline notification",body:i}),e.jsx(n,{type:"success",layout:"with-header",message:"Success inline notification",body:i}),e.jsx(n,{type:"general",layout:"with-header",message:"General inline notification",body:i}),e.jsx(n,{type:"ai",layout:"with-header",message:"AI notification",body:i})]}),r=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:723},children:[e.jsx(n,{type:"error",layout:"with-header",message:"Error inline notification"}),e.jsx(n,{type:"warning",layout:"with-header",message:"Warning inline notification"}),e.jsx(n,{type:"success",layout:"with-header",message:"Success inline notification"}),e.jsx(n,{type:"general",layout:"with-header",message:"General inline notification"})]}),a=v=>e.jsx("div",{style:{maxWidth:723},children:e.jsx(n,{...v})});a.args={type:"general",layout:"inline",message:"General inline notification"};l.__docgenInfo={description:"",methods:[],displayName:"InlineWithActions"};t.__docgenInfo={description:"",methods:[],displayName:"InlineNoActions"};o.__docgenInfo={description:"",methods:[],displayName:"WithHeaderAndActions"};s.__docgenInfo={description:"",methods:[],displayName:"WithHeaderNoActions"};r.__docgenInfo={description:"",methods:[],displayName:"WithHeaderTitleOnly"};a.__docgenInfo={description:"",methods:[],displayName:"Default"};var c,d,y;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 8,
  maxWidth: 723
}}>
    <Alert type="error" layout="inline" message="Error inline notification" actions={[{
    label: "Label",
    onClick: () => {}
  }, {
    label: "Label",
    onClick: () => {}
  }]} />
    <Alert type="warning" layout="inline" message="Warning inline notification" actions={[{
    label: "Label",
    onClick: () => {}
  }, {
    label: "Label",
    onClick: () => {}
  }]} />
    <Alert type="success" layout="inline" message="Success inline notification" actions={[{
    label: "Label",
    onClick: () => {}
  }, {
    label: "Label",
    onClick: () => {}
  }]} />
    <Alert type="general" layout="inline" message="General inline notification" actions={[{
    label: "Label",
    onClick: () => {}
  }, {
    label: "Label",
    onClick: () => {}
  }]} />
    <Alert type="ai" layout="inline" message="AI notification" actions={[{
    label: "Label",
    onClick: () => {}
  }, {
    label: "Label",
    onClick: () => {}
  }]} />
    <Alert type="bulk-banner" layout="inline" message="10 items selected" actions={[{
    label: "Label",
    onClick: () => {}
  }, {
    label: "Label",
    onClick: () => {}
  }]} />
  </div>`,...(y=(d=l.parameters)==null?void 0:d.docs)==null?void 0:y.source}}};var m,p,b;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 8,
  maxWidth: 723
}}>
    <Alert type="error" layout="inline" message="Error inline notification" />
    <Alert type="warning" layout="inline" message="Warning inline notification" />
    <Alert type="success" layout="inline" message="Success inline notification" />
    <Alert type="general" layout="inline" message="General inline notification" />
  </div>`,...(b=(p=t.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var g,u,h;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 16,
  maxWidth: 723
}}>
    <Alert type="error" layout="with-header" message="Error inline notification" body={body} actions={[{
    label: "Label",
    onClick: () => {}
  }, {
    label: "Label",
    onClick: () => {}
  }]} />
    <Alert type="warning" layout="with-header" message="Warning inline notification" body={body} actions={[{
    label: "Label",
    onClick: () => {}
  }, {
    label: "Label",
    onClick: () => {}
  }]} />
    <Alert type="success" layout="with-header" message="Success inline notification" body={body} actions={[{
    label: "Label",
    onClick: () => {}
  }, {
    label: "Label",
    onClick: () => {}
  }]} />
    <Alert type="general" layout="with-header" message="General inline notification" body={body} actions={[{
    label: "Label",
    onClick: () => {}
  }, {
    label: "Label",
    onClick: () => {}
  }]} />
  </div>`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var f,x,A;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 16,
  maxWidth: 723
}}>
    <Alert type="error" layout="with-header" message="Error inline notification" body={body} />
    <Alert type="warning" layout="with-header" message="Warning inline notification" body={body} />
    <Alert type="success" layout="with-header" message="Success inline notification" body={body} />
    <Alert type="general" layout="with-header" message="General inline notification" body={body} />
    <Alert type="ai" layout="with-header" message="AI notification" body={body} />
  </div>`,...(A=(x=s.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var k,w,C;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 16,
  maxWidth: 723
}}>
    <Alert type="error" layout="with-header" message="Error inline notification" />
    <Alert type="warning" layout="with-header" message="Warning inline notification" />
    <Alert type="success" layout="with-header" message="Success inline notification" />
    <Alert type="general" layout="with-header" message="General inline notification" />
  </div>`,...(C=(w=r.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var L,W,j;a.parameters={...a.parameters,docs:{...(L=a.parameters)==null?void 0:L.docs,source:{originalSource:`args => <div style={{
  maxWidth: 723
}}>
    <Alert {...args} />
  </div>`,...(j=(W=a.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};const B=["InlineWithActions","InlineNoActions","WithHeaderAndActions","WithHeaderNoActions","WithHeaderTitleOnly","Default"];export{a as Default,t as InlineNoActions,l as InlineWithActions,o as WithHeaderAndActions,s as WithHeaderNoActions,r as WithHeaderTitleOnly,B as __namedExportsOrder,G as default};
