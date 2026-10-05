import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as g}from"./index-Dd5QUkq_.js";import{I as x}from"./icon-D1UQke6Y.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DhMLlvMY.js";const z="_error_156ji_1",F="_warning_156ji_5",K="_success_156ji_9",V="_general_156ji_13",U="_ai_156ji_17",Y="_bulk_banner_156ji_21",$="_alert_156ji_25",J="_iconWrap_156ji_35",M="_inline_156ji_53",P="_left_156ji_62",Q="_message_156ji_70",X="_actionsRight_156ji_74",Z="_withHeader_156ji_81",ee="_headerRow_156ji_88",ne="_headerText_156ji_95",ie="_body_156ji_103",ae="_actionsBottom_156ji_111",te="_actionBtn_156ji_118",i={error:z,warning:F,success:K,general:V,ai:U,bulk_banner:Y,alert:$,iconWrap:J,inline:M,left:P,message:Q,actionsRight:X,withHeader:Z,headerRow:ee,headerText:ne,body:ie,actionsBottom:ae,actionBtn:te},_={error:"error",warning:"warning",success:"check",general:"info",ai:"ai","bulk-banner":"cross"},le=a=>a==="bulk-banner"?i.bulk_banner:i[a],j=({actions:a,className:b})=>e.jsx("div",{className:b,children:a.map((o,m)=>e.jsx("button",{type:"button",className:i.actionBtn,onClick:o.onClick,children:o.label},m))}),n=({type:a="general",layout:b="inline",message:o,body:m,actions:h,className:f})=>{const p=(h==null?void 0:h.filter(O=>!!O))??[],u=le(a);return b==="with-header"?e.jsxs("div",{className:g(i.alert,u,i.withHeader,f),role:"alert",children:[e.jsxs("div",{className:i.headerRow,children:[e.jsx("span",{className:g(i.iconWrap,u),children:e.jsx(x,{name:_[a],size:20})}),e.jsx("span",{className:i.headerText,children:o})]}),m&&e.jsx("p",{className:i.body,children:m}),p.length>0&&e.jsx(j,{actions:p,className:i.actionsBottom})]}):e.jsxs("div",{className:g(i.alert,u,i.inline,f),role:"alert",children:[e.jsxs("div",{className:i.left,children:[e.jsx("span",{className:g(i.iconWrap,u),children:e.jsx(x,{name:_[a],size:20})}),e.jsx("span",{className:i.message,children:o})]}),p.length>0&&e.jsx(j,{actions:p,className:i.actionsRight})]})};n.__docgenInfo={description:"",methods:[],displayName:"Alert",props:{type:{required:!1,tsType:{name:"union",raw:`| "error"        // bg: --palette-red-2    icon: --palette-red-0
| "warning"      // bg: --palette-orange-2 icon: --palette-orange-1
| "success"      // bg: --palette-green-2  icon: --palette-green-0
| "general"      // bg: --palette-neutral-1 icon: --palette-blue-0
| "ai"           // bg: --palette-neutral-0 icon: --palette-blue-0
| "bulk-banner"`,elements:[{name:"literal",value:'"error"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"success"'},{name:"literal",value:'"general"'},{name:"literal",value:'"ai"'},{name:"literal",value:'"bulk-banner"'}]},description:"",defaultValue:{value:'"general"',computed:!1}},layout:{required:!1,tsType:{name:"union",raw:'"inline" | "with-header"',elements:[{name:"literal",value:'"inline"'},{name:"literal",value:'"with-header"'}]},description:"",defaultValue:{value:'"inline"',computed:!1}},message:{required:!0,tsType:{name:"string"},description:"Inline: message text. With-header: bold title."},body:{required:!1,tsType:{name:"string"},description:'Body paragraph — only rendered when layout="with-header"'},actions:{required:!1,tsType:{name:"tuple",raw:"[AlertAction?, AlertAction?]",elements:[{name:"unknown"},{name:"unknown"}]},description:"Up to 2 action buttons (Ghost style). Optional in both layouts."},className:{required:!1,tsType:{name:"string"},description:""}}};const ye={title:"Components/Alert",component:n,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=2802-170745"}},argTypes:{type:{control:"select",options:["error","warning","success","general","ai","bulk-banner"]},layout:{control:"select",options:["inline","with-header"]}}},t="Body body Body body aBody body aBody body aBody body aBody body aBody body aBody body aBody body Body body",s=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,maxWidth:723},children:[e.jsx(n,{type:"error",layout:"inline",message:"Error inline notification",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"warning",layout:"inline",message:"Warning inline notification",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"success",layout:"inline",message:"Success inline notification",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"general",layout:"inline",message:"General inline notification",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"ai",layout:"inline",message:"AI notification",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"bulk-banner",layout:"inline",message:"10 items selected",actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]})]}),r=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,maxWidth:723},children:[e.jsx(n,{type:"error",layout:"inline",message:"Error inline notification"}),e.jsx(n,{type:"warning",layout:"inline",message:"Warning inline notification"}),e.jsx(n,{type:"success",layout:"inline",message:"Success inline notification"}),e.jsx(n,{type:"general",layout:"inline",message:"General inline notification"})]}),c=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:723},children:[e.jsx(n,{type:"error",layout:"with-header",message:"Error inline notification",body:t,actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"warning",layout:"with-header",message:"Warning inline notification",body:t,actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"success",layout:"with-header",message:"Success inline notification",body:t,actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]}),e.jsx(n,{type:"general",layout:"with-header",message:"General inline notification",body:t,actions:[{label:"Label",onClick:()=>{}},{label:"Label",onClick:()=>{}}]})]}),d=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:723},children:[e.jsx(n,{type:"error",layout:"with-header",message:"Error inline notification",body:t}),e.jsx(n,{type:"warning",layout:"with-header",message:"Warning inline notification",body:t}),e.jsx(n,{type:"success",layout:"with-header",message:"Success inline notification",body:t}),e.jsx(n,{type:"general",layout:"with-header",message:"General inline notification",body:t}),e.jsx(n,{type:"ai",layout:"with-header",message:"AI notification",body:t})]}),y=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:723},children:[e.jsx(n,{type:"error",layout:"with-header",message:"Error inline notification"}),e.jsx(n,{type:"warning",layout:"with-header",message:"Warning inline notification"}),e.jsx(n,{type:"success",layout:"with-header",message:"Success inline notification"}),e.jsx(n,{type:"general",layout:"with-header",message:"General inline notification"})]}),l=a=>e.jsx("div",{style:{maxWidth:723},children:e.jsx(n,{...a})});l.args={type:"general",layout:"inline",message:"General inline notification"};s.__docgenInfo={description:"",methods:[],displayName:"InlineWithActions"};r.__docgenInfo={description:"",methods:[],displayName:"InlineNoActions"};c.__docgenInfo={description:"",methods:[],displayName:"WithHeaderAndActions"};d.__docgenInfo={description:"",methods:[],displayName:"WithHeaderNoActions"};y.__docgenInfo={description:"",methods:[],displayName:"WithHeaderTitleOnly"};l.__docgenInfo={description:"",methods:[],displayName:"Default"};var w,k,A;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(A=(k=s.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var C,L,W;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 8,
  maxWidth: 723
}}>
    <Alert type="error" layout="inline" message="Error inline notification" />
    <Alert type="warning" layout="inline" message="Warning inline notification" />
    <Alert type="success" layout="inline" message="Success inline notification" />
    <Alert type="general" layout="inline" message="General inline notification" />
  </div>`,...(W=(L=r.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var v,N,I;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(I=(N=c.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var B,S,D;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(D=(S=d.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var T,E,H;y.parameters={...y.parameters,docs:{...(T=y.parameters)==null?void 0:T.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 16,
  maxWidth: 723
}}>
    <Alert type="error" layout="with-header" message="Error inline notification" />
    <Alert type="warning" layout="with-header" message="Warning inline notification" />
    <Alert type="success" layout="with-header" message="Success inline notification" />
    <Alert type="general" layout="with-header" message="General inline notification" />
  </div>`,...(H=(E=y.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var G,R,q;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`args => <div style={{
  maxWidth: 723
}}>
    <Alert {...args} />
  </div>`,...(q=(R=l.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};const me=["InlineWithActions","InlineNoActions","WithHeaderAndActions","WithHeaderNoActions","WithHeaderTitleOnly","Default"];export{l as Default,r as InlineNoActions,s as InlineWithActions,c as WithHeaderAndActions,d as WithHeaderNoActions,y as WithHeaderTitleOnly,me as __namedExportsOrder,ye as default};
