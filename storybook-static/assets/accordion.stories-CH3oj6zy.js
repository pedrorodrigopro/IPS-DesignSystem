import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{A as i}from"./accordion-BT_MrC5I.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DhMLlvMY.js";import"./icon-D1UQke6Y.js";const b={title:"Components/Accordion",component:i,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1581-35436"}},argTypes:{size:{control:"select",options:["body","heading5","heading4"]}}},s=()=>e.jsxs("div",{style:{width:382},children:[e.jsx(i,{title:"Title",size:"body"}),e.jsx(i,{title:"Title",size:"body",defaultExpanded:!0,children:e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#0D2976"},children:"Content"})})]}),n=()=>e.jsxs("div",{style:{width:382},children:[e.jsx(i,{title:"Title",size:"heading5"}),e.jsx(i,{title:"Title",size:"heading5",defaultExpanded:!0,children:e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#0D2976"},children:"Content"})})]}),o=()=>e.jsxs("div",{style:{width:382},children:[e.jsx(i,{title:"Title",size:"heading4"}),e.jsx(i,{title:"Title",size:"heading4",defaultExpanded:!0,children:e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#0D2976"},children:"Content"})})]}),d=()=>e.jsxs("div",{style:{width:382,display:"flex",flexDirection:"column",gap:16},children:[e.jsx(i,{title:"Title",size:"body"}),e.jsx(i,{title:"Title",size:"heading5"}),e.jsx(i,{title:"Title",size:"heading4"})]}),t=T=>e.jsx("div",{style:{width:382},children:e.jsx(i,{...T})});t.args={title:"Title",size:"body"};s.__docgenInfo={description:"",methods:[],displayName:"Body"};n.__docgenInfo={description:"",methods:[],displayName:"Heading5"};o.__docgenInfo={description:"",methods:[],displayName:"Heading4"};d.__docgenInfo={description:"",methods:[],displayName:"AllSizes"};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,a,l;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`() => <div style={{
  width: 382
}}>
    <Accordion title="Title" size="body" />
    <Accordion title="Title" size="body" defaultExpanded>
      <p style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 14,
      color: "#0D2976"
    }}>Content</p>
    </Accordion>
  </div>`,...(l=(a=s.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};var c,p,m;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`() => <div style={{
  width: 382
}}>
    <Accordion title="Title" size="heading5" />
    <Accordion title="Title" size="heading5" defaultExpanded>
      <p style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 14,
      color: "#0D2976"
    }}>Content</p>
    </Accordion>
  </div>`,...(m=(p=n.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var h,y,f;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`() => <div style={{
  width: 382
}}>
    <Accordion title="Title" size="heading4" />
    <Accordion title="Title" size="heading4" defaultExpanded>
      <p style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 14,
      color: "#0D2976"
    }}>Content</p>
    </Accordion>
  </div>`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var g,u,x;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`() => <div style={{
  width: 382,
  display: "flex",
  flexDirection: "column",
  gap: 16
}}>
    <Accordion title="Title" size="body" />
    <Accordion title="Title" size="heading5" />
    <Accordion title="Title" size="heading4" />
  </div>`,...(x=(u=d.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var z,j,A;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`args => <div style={{
  width: 382
}}>
    <Accordion {...args} />
  </div>`,...(A=(j=t.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};const F=["Body","Heading5","Heading4","AllSizes","Default"];export{d as AllSizes,s as Body,t as Default,o as Heading4,n as Heading5,F as __namedExportsOrder,b as default};
