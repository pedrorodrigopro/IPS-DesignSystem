import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{L as n,P as u}from"./layout-gBOYLyF1.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";const Q={title:"Patterns/Layout",component:n,parameters:{layout:"fullscreen",docs:{description:{component:"Screen layout templates matching Figma Template/Layout (1769:70231). Four variants: full (fills all space), 1280 (centered max-width), profile-regular (280px sidebar + content), profile-summary (280px sidebar + content + 500px right panel). Page wraps Navbar + Layout into a full-viewport shell."}}}},a=({label:l,height:r="100%",bg:T="#E7EAF8"})=>e.jsx("div",{style:{background:T,borderRadius:8,height:r,minHeight:120,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Mulish, sans-serif",fontSize:13,fontWeight:700,color:"#0D2976",border:"1px dashed #CFDAF7"},children:l}),t={name:"full — fills all space",render:()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(n,{variant:"full",children:e.jsx(a,{label:"Main content (fills all available space)",height:"100%"})})})},i={name:"1280 — centered, max 1280px",render:()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(n,{variant:"1280",children:e.jsx(a,{label:"Main content (max-width 1280px, centered)",height:400})})})},s={name:"profile-regular — 280px sidebar + content",render:()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(n,{variant:"profile-regular",sidebar:e.jsx(a,{label:"Sidebar (280px)",bg:"#CFDAF7"}),children:e.jsx(a,{label:"Main content (fluid)",height:"100%"})})})},o={name:"profile-summary — 280px + content + 500px panel",render:()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(n,{variant:"profile-summary",sidebar:e.jsx(a,{label:"Sidebar (280px)",bg:"#CFDAF7"}),rightPanel:e.jsx(a,{label:"Right panel (500px)",bg:"#E7EAF8"}),children:e.jsx(a,{label:"Main content (fluid)",height:"100%"})})})},b=()=>e.jsx("div",{style:{width:60,background:"#0C1457",borderRadius:"0 16px 16px 0",display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 0 40px",gap:16,flexShrink:0},children:["●","●","●","●","●"].map((l,r)=>e.jsx("div",{style:{width:30,height:30,borderRadius:"50%",background:r===0?"white":"rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}},r))}),d={name:"Page — full layout with Navbar",render:()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(u,{navbar:e.jsx(b,{}),variant:"full",children:e.jsx(a,{label:"Page content (full layout)",height:"100%"})})})},h={name:"Page — 1280 layout with Navbar",render:()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(u,{navbar:e.jsx(b,{}),variant:"1280",children:e.jsx(a,{label:"Page content (1280px centered)",height:500})})})},c={name:"Page — profile-regular with Navbar",render:()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(u,{navbar:e.jsx(b,{}),variant:"profile-regular",sidebar:e.jsx(a,{label:"Sidebar (280px)",bg:"#CFDAF7"}),children:e.jsx(a,{label:"Main content (fluid)",height:"100%"})})})},p={name:"Page — profile-summary with Navbar",render:()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(u,{navbar:e.jsx(b,{}),variant:"profile-summary",sidebar:e.jsx(a,{label:"Sidebar (280px)",bg:"#CFDAF7"}),rightPanel:e.jsx(a,{label:"Right panel (500px)",bg:"#E7EAF8"}),children:e.jsx(a,{label:"Main content (fluid)",height:"100%"})})})},g={name:"All variants",parameters:{layout:"padded"},render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32},children:[{variant:"full",label:"full"},{variant:"1280",label:"1280"},{variant:"profile-regular",label:"profile-regular"},{variant:"profile-summary",label:"profile-summary"}].map(({variant:l,label:r})=>e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:6,fontWeight:700},children:r}),e.jsx("div",{style:{height:160,border:"1px solid #CFDAF7",borderRadius:8,overflow:"hidden"},children:e.jsx(n,{variant:l,sidebar:e.jsx(a,{label:"Sidebar",bg:"#CFDAF7",height:"100%"}),rightPanel:e.jsx(a,{label:"Right",bg:"#E7EAF8",height:"100%"}),children:e.jsx(a,{label:"Content",height:"100%"})})})]},l))})};var m,v,x;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "full — fills all space",
  render: () => <div style={{
    height: "100vh"
  }}>
      <Layout variant="full">
        <Slot label="Main content (fills all available space)" height="100%" />
      </Layout>
    </div>
}`,...(x=(v=t.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var f,y,j;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "1280 — centered, max 1280px",
  render: () => <div style={{
    height: "100vh"
  }}>
      <Layout variant="1280">
        <Slot label="Main content (max-width 1280px, centered)" height={400} />
      </Layout>
    </div>
}`,...(j=(y=i.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var S,F,P;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "profile-regular — 280px sidebar + content",
  render: () => <div style={{
    height: "100vh"
  }}>
      <Layout variant="profile-regular" sidebar={<Slot label="Sidebar (280px)" bg="#CFDAF7" />}>
        <Slot label="Main content (fluid)" height="100%" />
      </Layout>
    </div>
}`,...(P=(F=s.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};var A,C,N;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: "profile-summary — 280px + content + 500px panel",
  render: () => <div style={{
    height: "100vh"
  }}>
      <Layout variant="profile-summary" sidebar={<Slot label="Sidebar (280px)" bg="#CFDAF7" />} rightPanel={<Slot label="Right panel (500px)" bg="#E7EAF8" />}>
        <Slot label="Main content (fluid)" height="100%" />
      </Layout>
    </div>
}`,...(N=(C=o.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var E,M,w;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "Page — full layout with Navbar",
  render: () => <div style={{
    height: "100vh"
  }}>
      <Page navbar={<MockNavbar />} variant="full">
        <Slot label="Page content (full layout)" height="100%" />
      </Page>
    </div>
}`,...(w=(M=d.parameters)==null?void 0:M.docs)==null?void 0:w.source}}};var D,R,L;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: "Page — 1280 layout with Navbar",
  render: () => <div style={{
    height: "100vh"
  }}>
      <Page navbar={<MockNavbar />} variant="1280">
        <Slot label="Page content (1280px centered)" height={500} />
      </Page>
    </div>
}`,...(L=(R=h.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var W,k,z;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: "Page — profile-regular with Navbar",
  render: () => <div style={{
    height: "100vh"
  }}>
      <Page navbar={<MockNavbar />} variant="profile-regular" sidebar={<Slot label="Sidebar (280px)" bg="#CFDAF7" />}>
        <Slot label="Main content (fluid)" height="100%" />
      </Page>
    </div>
}`,...(z=(k=c.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var I,B,V;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: "Page — profile-summary with Navbar",
  render: () => <div style={{
    height: "100vh"
  }}>
      <Page navbar={<MockNavbar />} variant="profile-summary" sidebar={<Slot label="Sidebar (280px)" bg="#CFDAF7" />} rightPanel={<Slot label="Right panel (500px)" bg="#E7EAF8" />}>
        <Slot label="Main content (fluid)" height="100%" />
      </Page>
    </div>
}`,...(V=(B=p.parameters)==null?void 0:B.docs)==null?void 0:V.source}}};var _,H,O;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: "All variants",
  parameters: {
    layout: "padded"
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 32
  }}>
      {[{
      variant: "full" as const,
      label: "full"
    }, {
      variant: "1280" as const,
      label: "1280"
    }, {
      variant: "profile-regular" as const,
      label: "profile-regular"
    }, {
      variant: "profile-summary" as const,
      label: "profile-summary"
    }].map(({
      variant,
      label
    }) => <div key={variant}>
          <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 6,
        fontWeight: 700
      }}>
            {label}
          </p>
          <div style={{
        height: 160,
        border: "1px solid #CFDAF7",
        borderRadius: 8,
        overflow: "hidden"
      }}>
            <Layout variant={variant} sidebar={<Slot label="Sidebar" bg="#CFDAF7" height="100%" />} rightPanel={<Slot label="Right" bg="#E7EAF8" height="100%" />}>
              <Slot label="Content" height="100%" />
            </Layout>
          </div>
        </div>)}
    </div>
}`,...(O=(H=g.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};const U=["Full","Centered1280","ProfileRegular","ProfileSummary","WithNavbar","WithNavbar1280","WithNavbarProfileRegular","WithNavbarProfileSummary","AllVariants"];export{g as AllVariants,i as Centered1280,t as Full,s as ProfileRegular,o as ProfileSummary,d as WithNavbar,h as WithNavbar1280,c as WithNavbarProfileRegular,p as WithNavbarProfileSummary,U as __namedExportsOrder,Q as default};
