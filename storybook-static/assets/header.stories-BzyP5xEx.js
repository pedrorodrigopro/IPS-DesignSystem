import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{H as n}from"./header-C72qAAzd.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./icon-D1UQke6Y.js";import"./index-DhMLlvMY.js";const se={title:"Molecules/Header",component:n,parameters:{layout:"padded",docs:{description:{component:"Page/section/content header with optional left icon, right icon, subtitle, and action buttons. Size controls title scale: page=H1 (32px), section=H2 (28px), content=H4 (20px). Actions use Button regular for page/section and Button small for content."}}}},t={name:"Page — no actions",render:()=>e.jsx(n,{size:"page",title:"Page Title"})},a={name:"Page — with actions",render:()=>e.jsx(n,{size:"page",title:"Create Role",actions:[{label:"Cancel",variant:"secondary",onClick:()=>alert("Cancel")},{label:"Save Draft",variant:"secondary",onClick:()=>alert("Save Draft")},{label:"Create",variant:"primary",onClick:()=>alert("Create")}]})},i={name:"Page — with subtitle",render:()=>e.jsx(n,{size:"page",title:"Marketplace",subtitle:"Senior Project Manager",actions:[{label:"Cancel",variant:"secondary",onClick:()=>{}},{label:"Save",variant:"primary",onClick:()=>{}}]})},r={name:"Page — with left icon",render:()=>e.jsx(n,{size:"page",title:"Marketplace",leftIcon:"role"})},o={name:"Section — no actions",render:()=>e.jsx(n,{size:"section",title:"Section Header"})},s={name:"Section — with actions",render:()=>e.jsx(n,{size:"section",title:"Skills & Rates",actions:[{label:"Label",variant:"secondary",onClick:()=>{}},{label:"Label",variant:"primary",onClick:()=>{}}]})},l={name:"Section — with subtitle",render:()=>e.jsx(n,{size:"section",title:"Workflow",subtitle:"Last update: 12 Jan 2024"})},c={name:"Section — with left + right icons",render:()=>e.jsx(n,{size:"section",title:"Reports",leftIcon:"reports",rightIcon:"info",actions:[{label:"Export",variant:"primary",onClick:()=>{}}]})},d={name:"Content — no actions",render:()=>e.jsx(n,{size:"content",title:"Content Header"})},m={name:"Content — with actions",render:()=>e.jsx(n,{size:"content",title:"Skills",actions:[{label:"Label",variant:"secondary",onClick:()=>{}},{label:"Label",variant:"primary",onClick:()=>{}}]})},p={name:"Content — with subtitle",render:()=>e.jsx(n,{size:"content",title:"Skills",subtitle:"Showing 12 results",actions:[{label:"Add skill",variant:"primary",onClick:()=>{}}]})},u={name:"All sizes",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:40},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"page"}),e.jsx(n,{size:"page",title:"Page Title",actions:[{label:"Cancel",variant:"secondary"},{label:"Create",variant:"primary"}]})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"section"}),e.jsx(n,{size:"section",title:"Section Title",actions:[{label:"Label",variant:"secondary"},{label:"Label",variant:"primary"}]})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"content"}),e.jsx(n,{size:"content",title:"Content Title",actions:[{label:"Label",variant:"secondary"},{label:"Label",variant:"primary"}]})]})]})},g={name:"All sizes — with subtitle",render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:40},children:["page","section","content"].map(b=>e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:b}),e.jsx(n,{size:b,title:"Title",subtitle:"Subtitle line — additional context"})]},b))})};var S,h,f;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Page — no actions",
  render: () => <Header size="page" title="Page Title" />
}`,...(f=(h=t.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var C,y,v;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Page — with actions",
  render: () => <Header size="page" title="Create Role" actions={[{
    label: "Cancel",
    variant: "secondary",
    onClick: () => alert("Cancel")
  }, {
    label: "Save Draft",
    variant: "secondary",
    onClick: () => alert("Save Draft")
  }, {
    label: "Create",
    variant: "primary",
    onClick: () => alert("Create")
  }]} />
}`,...(v=(y=a.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var z,x,k;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  name: "Page — with subtitle",
  render: () => <Header size="page" title="Marketplace" subtitle="Senior Project Manager" actions={[{
    label: "Cancel",
    variant: "secondary",
    onClick: () => {}
  }, {
    label: "Save",
    variant: "primary",
    onClick: () => {}
  }]} />
}`,...(k=(x=i.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var j,W,H;r.parameters={...r.parameters,docs:{...(j=r.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "Page — with left icon",
  render: () => <Header size="page" title="Marketplace" leftIcon="role" />
}`,...(H=(W=r.parameters)==null?void 0:W.docs)==null?void 0:H.source}}};var w,A,P;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Section — no actions",
  render: () => <Header size="section" title="Section Header" />
}`,...(P=(A=o.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var E,L,M;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "Section — with actions",
  render: () => <Header size="section" title="Skills & Rates" actions={[{
    label: "Label",
    variant: "secondary",
    onClick: () => {}
  }, {
    label: "Label",
    variant: "primary",
    onClick: () => {}
  }]} />
}`,...(M=(L=s.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var B,I,T;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Section — with subtitle",
  render: () => <Header size="section" title="Workflow" subtitle="Last update: 12 Jan 2024" />
}`,...(T=(I=l.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var D,F,R;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: "Section — with left + right icons",
  render: () => <Header size="section" title="Reports" leftIcon="reports" rightIcon="info" actions={[{
    label: "Export",
    variant: "primary",
    onClick: () => {}
  }]} />
}`,...(R=(F=c.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var N,J,_;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: "Content — no actions",
  render: () => <Header size="content" title="Content Header" />
}`,...(_=(J=d.parameters)==null?void 0:J.docs)==null?void 0:_.source}}};var O,q,G;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: "Content — with actions",
  render: () => <Header size="content" title="Skills" actions={[{
    label: "Label",
    variant: "secondary",
    onClick: () => {}
  }, {
    label: "Label",
    variant: "primary",
    onClick: () => {}
  }]} />
}`,...(G=(q=m.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};var K,Q,U;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  name: "Content — with subtitle",
  render: () => <Header size="content" title="Skills" subtitle="Showing 12 results" actions={[{
    label: "Add skill",
    variant: "primary",
    onClick: () => {}
  }]} />
}`,...(U=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var V,X,Y;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: "All sizes",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 40
  }}>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>page</p>
        <Header size="page" title="Page Title" actions={[{
        label: "Cancel",
        variant: "secondary"
      }, {
        label: "Create",
        variant: "primary"
      }]} />
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>section</p>
        <Header size="section" title="Section Title" actions={[{
        label: "Label",
        variant: "secondary"
      }, {
        label: "Label",
        variant: "primary"
      }]} />
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>content</p>
        <Header size="content" title="Content Title" actions={[{
        label: "Label",
        variant: "secondary"
      }, {
        label: "Label",
        variant: "primary"
      }]} />
      </div>
    </div>
}`,...(Y=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;g.parameters={...g.parameters,docs:{...(Z=g.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  name: "All sizes — with subtitle",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 40
  }}>
      {(["page", "section", "content"] as const).map(size => <div key={size}>
          <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>{size}</p>
          <Header size={size} title="Title" subtitle="Subtitle line — additional context" />
        </div>)}
    </div>
}`,...(ee=($=g.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};const le=["PageNoActions","PageWithActions","PageWithSubtitle","PageWithLeftIcon","SectionNoActions","SectionWithActions","SectionWithSubtitle","SectionWithIcons","ContentNoActions","ContentWithActions","ContentWithSubtitle","AllSizes","AllSizesWithSubtitle"];export{u as AllSizes,g as AllSizesWithSubtitle,d as ContentNoActions,m as ContentWithActions,p as ContentWithSubtitle,t as PageNoActions,a as PageWithActions,r as PageWithLeftIcon,i as PageWithSubtitle,o as SectionNoActions,s as SectionWithActions,c as SectionWithIcons,l as SectionWithSubtitle,le as __namedExportsOrder,se as default};
