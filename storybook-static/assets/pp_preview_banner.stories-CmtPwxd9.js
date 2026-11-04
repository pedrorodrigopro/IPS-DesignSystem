import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{P as t}from"./pp_preview_banner-C1TPj0CD.js";const x={title:"Components/PPPreviewBanner",component:t,parameters:{layout:"fullscreen",backgrounds:{default:"neutral",values:[{name:"neutral",value:"#F8F9FD"}]}}},i=()=>e.jsx("div",{style:{position:"relative",height:120,background:"#F8F9FD"},children:e.jsx(t,{visible:!0,label:"Result after applying — Kevin & Diana"})}),s=()=>e.jsx("div",{style:{position:"relative",height:120,background:"#F8F9FD"},children:e.jsx(t,{visible:!0})}),n=()=>e.jsxs("div",{style:{position:"relative",height:120,background:"#F8F9FD",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx(t,{visible:!1,label:"This should not show"}),e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#5C6E9E"},children:"Banner is hidden"})]});i.__docgenInfo={description:"Visible — with label (most common usage)",methods:[],displayName:"WithLabel"};s.__docgenInfo={description:"Visible — without label",methods:[],displayName:"WithoutLabel"};n.__docgenInfo={description:"Not visible — renders nothing",methods:[],displayName:"Hidden"};var r,o,a,l,d;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:`() => <div style={{
  position: "relative",
  height: 120,
  background: "#F8F9FD"
}}>
    <PPPreviewBanner visible label="Result after applying — Kevin & Diana" />
  </div>`,...(a=(o=i.parameters)==null?void 0:o.docs)==null?void 0:a.source},description:{story:"Visible — with label (most common usage)",...(d=(l=i.parameters)==null?void 0:l.docs)==null?void 0:d.description}}};var c,p,u,h,m;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`() => <div style={{
  position: "relative",
  height: 120,
  background: "#F8F9FD"
}}>
    <PPPreviewBanner visible />
  </div>`,...(u=(p=s.parameters)==null?void 0:p.docs)==null?void 0:u.source},description:{story:"Visible — without label",...(m=(h=s.parameters)==null?void 0:h.docs)==null?void 0:m.description}}};var b,v,g,y,F;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`() => <div style={{
  position: "relative",
  height: 120,
  background: "#F8F9FD",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}}>
    <PPPreviewBanner visible={false} label="This should not show" />
    <span style={{
    fontFamily: "Mulish, sans-serif",
    fontSize: 14,
    color: "#5C6E9E"
  }}>Banner is hidden</span>
  </div>`,...(g=(v=n.parameters)==null?void 0:v.docs)==null?void 0:g.source},description:{story:"Not visible — renders nothing",...(F=(y=n.parameters)==null?void 0:y.docs)==null?void 0:F.description}}};const w=["WithLabel","WithoutLabel","Hidden"];export{n as Hidden,i as WithLabel,s as WithoutLabel,w as __namedExportsOrder,x as default};
