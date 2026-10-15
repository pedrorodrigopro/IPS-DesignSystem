import{j as e}from"./jsx-runtime-D_zvdyIk.js";const w="_banner_11l8m_1",C="_title_11l8m_18",_="_label_11l8m_25",r={banner:w,title:C,label:_},j=()=>e.jsxs("svg",{width:20,height:20,viewBox:"0 0 34 36",fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:"M25.095 5C30.0202 5.04073 34.0003 9.03735 34.0003 13.9609C34.0002 18.833 30.1031 22.7943 25.2493 22.916L25.2503 22.9219H15.7346L14.8548 28.4727C14.7152 29.3524 13.9564 30 13.0657 30C11.9524 29.9999 11.1024 29.0048 11.2766 27.9053L12.6399 19.3066H25.0178C27.9772 19.3066 30.3781 16.9135 30.3782 13.9609C30.3782 11.0082 27.9783 8.61523 25.0188 8.61523H16.6194C15.5171 8.61523 14.6709 7.63656 14.8303 6.5459C14.9602 5.65817 15.7222 5 16.6194 5H25.095Z",fill:"white"}),e.jsx("path",{d:"M24.7931 9.66858C27.2105 9.66884 29.1704 11.5905 29.1704 13.9609C29.1704 16.3311 27.2105 18.2529 24.7931 18.2531H11.7707L10.1076 28.4173C9.95827 29.33 9.16965 30 8.24482 30C7.07282 30 6.18413 28.9431 6.38528 27.7885L8.45099 15.9314C8.58122 15.1839 9.23008 14.6383 9.98883 14.6383H24.7931C25.1264 14.638 25.4163 14.2934 25.4163 13.9609C25.4163 13.6283 25.1264 13.2837 24.7931 13.2834H16.0154C14.9133 13.2834 14.0678 12.3055 14.227 11.215C14.3566 10.327 15.118 9.66858 16.0154 9.66858H24.7931Z",fill:"white"}),e.jsx("path",{d:"M24 26L25.3505 29.6495L29 31L25.3505 32.3505L24 36L22.6495 32.3505L19 31L22.6495 29.6495L24 26Z",fill:"white"}),e.jsx("path",{d:"M4.5 6L5.71541 9.28459L9 10.5L5.71541 11.7154L4.5 15L3.28459 11.7154L0 10.5L3.28459 9.28459L4.5 6Z",fill:"white"}),e.jsx("path",{d:"M10.5 0L11.4453 2.55468L14 3.5L11.4453 4.44532L10.5 7L9.55468 4.44532L7 3.5L9.55468 2.55468L10.5 0Z",fill:"white"})]});function t({visible:P,label:a,className:o}){return P?e.jsxs("div",{className:`${r.banner}${o?` ${o}`:""}`,"aria-live":"polite",children:[e.jsx(j,{}),e.jsx("span",{className:r.title,children:"ProPilot Preview Mode"}),a&&e.jsxs("span",{className:r.label,children:["— ",a]})]}):null}t.__docgenInfo={description:"",methods:[],displayName:"PPPreviewBanner",props:{visible:{required:!0,tsType:{name:"boolean"},description:"Whether the banner is visible"},label:{required:!1,tsType:{name:"string"},description:'Optional label shown after the title — e.g. "Result after applying — Kevin & Diana"'},className:{required:!1,tsType:{name:"string"},description:"Additional class for positioning overrides"}}};const D={title:"Components/PPPreviewBanner",component:t,parameters:{layout:"fullscreen",backgrounds:{default:"neutral",values:[{name:"neutral",value:"#F8F9FD"}]}}},i=()=>e.jsx("div",{style:{position:"relative",height:120,background:"#F8F9FD"},children:e.jsx(t,{visible:!0,label:"Result after applying — Kevin & Diana"})}),s=()=>e.jsx("div",{style:{position:"relative",height:120,background:"#F8F9FD"},children:e.jsx(t,{visible:!0})}),n=()=>e.jsxs("div",{style:{position:"relative",height:120,background:"#F8F9FD",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx(t,{visible:!1,label:"This should not show"}),e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#5C6E9E"},children:"Banner is hidden"})]});i.__docgenInfo={description:"Visible — with label (most common usage)",methods:[],displayName:"WithLabel"};s.__docgenInfo={description:"Visible — without label",methods:[],displayName:"WithoutLabel"};n.__docgenInfo={description:"Not visible — renders nothing",methods:[],displayName:"Hidden"};var l,d,c,p,h;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`() => <div style={{
  position: "relative",
  height: 120,
  background: "#F8F9FD"
}}>
    <PPPreviewBanner visible label="Result after applying — Kevin & Diana" />
  </div>`,...(c=(d=i.parameters)==null?void 0:d.docs)==null?void 0:c.source},description:{story:"Visible — with label (most common usage)",...(h=(p=i.parameters)==null?void 0:p.docs)==null?void 0:h.description}}};var u,m,b,v,f;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`() => <div style={{
  position: "relative",
  height: 120,
  background: "#F8F9FD"
}}>
    <PPPreviewBanner visible />
  </div>`,...(b=(m=s.parameters)==null?void 0:m.docs)==null?void 0:b.source},description:{story:"Visible — without label",...(f=(v=s.parameters)==null?void 0:v.docs)==null?void 0:f.description}}};var g,L,y,x,F;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(y=(L=n.parameters)==null?void 0:L.docs)==null?void 0:y.source},description:{story:"Not visible — renders nothing",...(F=(x=n.parameters)==null?void 0:x.docs)==null?void 0:F.description}}};const B=["WithLabel","WithoutLabel","Hidden"];export{n as Hidden,i as WithLabel,s as WithoutLabel,B as __namedExportsOrder,D as default};
