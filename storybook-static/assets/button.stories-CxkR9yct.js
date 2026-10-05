import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as t}from"./button-CreEIUG8.js";import{I as u}from"./icon-D1UQke6Y.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DhMLlvMY.js";const C={title:"Components/Button",component:t,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=3134-190313"}},argTypes:{kind:{control:"select",options:["primary","secondary","tertiary","destructive","ghost","inverted","link","icon","iconTertiary","iconGhost"]},size:{control:"select",options:["regular","small"]}}},m=({children:n})=>e.jsx("div",{style:{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:n}),R=({children:n})=>e.jsx("div",{style:{background:"var(--palette-blue-0)",padding:16,borderRadius:8,display:"flex",gap:8,alignItems:"center"},children:n}),c=({children:n})=>e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,fontWeight:700,color:"var(--palette-neutral-3)",textTransform:"uppercase",letterSpacing:"0.06em"},children:n}),r=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,padding:16},children:[e.jsx(c,{children:"Regular — all types"}),e.jsxs(m,{children:[e.jsx(t,{size:"regular",kind:"primary",text:"Primary"}),e.jsx(t,{size:"regular",kind:"secondary",text:"Secondary"}),e.jsx(t,{size:"regular",kind:"tertiary",text:"Tertiary"}),e.jsx(t,{size:"regular",kind:"destructive",text:"Destructive"}),e.jsx(t,{size:"regular",kind:"ghost",text:"Ghost"}),e.jsx(t,{size:"regular",kind:"link",text:"Link"})]}),e.jsx(R,{children:e.jsx(t,{size:"regular",kind:"inverted",text:"Inverted"})}),e.jsx(c,{children:"Regular — disabled"}),e.jsxs(m,{children:[e.jsx(t,{size:"regular",kind:"primary",text:"Primary",disabled:!0}),e.jsx(t,{size:"regular",kind:"secondary",text:"Secondary",disabled:!0}),e.jsx(t,{size:"regular",kind:"destructive",text:"Destructive",disabled:!0}),e.jsx(t,{size:"regular",kind:"ghost",text:"Ghost",disabled:!0})]})]}),l=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,padding:16},children:[e.jsx(c,{children:"Small — all types"}),e.jsxs(m,{children:[e.jsx(t,{size:"small",kind:"primary",text:"Primary"}),e.jsx(t,{size:"small",kind:"secondary",text:"Secondary"}),e.jsx(t,{size:"small",kind:"tertiary",text:"Tertiary"}),e.jsx(t,{size:"small",kind:"destructive",text:"Destructive"}),e.jsx(t,{size:"small",kind:"ghost",text:"Ghost"}),e.jsx(t,{size:"small",kind:"link",text:"Link"})]}),e.jsx(R,{children:e.jsx(t,{size:"small",kind:"inverted",text:"Inverted"})}),e.jsx(c,{children:"Small — disabled"}),e.jsxs(m,{children:[e.jsx(t,{size:"small",kind:"primary",text:"Primary",disabled:!0}),e.jsx(t,{size:"small",kind:"secondary",text:"Secondary",disabled:!0}),e.jsx(t,{size:"small",kind:"destructive",text:"Destructive",disabled:!0}),e.jsx(t,{size:"small",kind:"ghost",text:"Ghost",disabled:!0})]})]}),d=()=>{const n=[{kind:"icon",label:"Icon"},{kind:"iconTertiary",label:"Icon Tertiary"},{kind:"iconGhost",label:"Icon Ghost"}],w=["regular","small"];return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32,padding:24},children:w.map(s=>e.jsxs("div",{children:[e.jsxs(c,{children:[s," size"]}),e.jsx("div",{style:{display:"flex",gap:40,alignItems:"flex-start",marginTop:12},children:n.map(({kind:a,label:L})=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,alignItems:"center"},children:[e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,fontWeight:700,color:"var(--palette-neutral-3)",textTransform:"uppercase"},children:L}),e.jsx(t,{size:s,kind:a,title:"Add",children:e.jsx(u,{name:"add",size:s==="regular"?20:16})}),e.jsx(t,{size:s,kind:a,title:"Add (hover)",style:{backgroundColor:"var(--palette-trans-0)"},children:e.jsx(u,{name:"add",size:s==="regular"?20:16})}),e.jsx(t,{size:s,kind:a,title:"Add (focus)",style:{boxShadow:"0 0 0 4px var(--palette-blue-1), 0 0 0 2px var(--palette-white-0)",outline:"none"},children:e.jsx(u,{name:"add",size:s==="regular"?20:16})}),e.jsx(t,{size:s,kind:a,title:"Add (disabled)",disabled:!0,children:e.jsx(u,{name:"add",size:s==="regular"?20:16})})]},a))})]},s))})},o=()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16,padding:16},children:["primary","secondary","tertiary","destructive","ghost","link"].map(n=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"var(--palette-neutral-3)",width:80},children:n}),e.jsx(t,{size:"regular",kind:n,text:"Regular"}),e.jsx(t,{size:"small",kind:n,text:"Small"})]},n))}),i=n=>e.jsx(t,{...n});i.args={text:"Label",kind:"primary",size:"regular"};r.__docgenInfo={description:"",methods:[],displayName:"Regular"};l.__docgenInfo={description:"",methods:[],displayName:"Small"};d.__docgenInfo={description:"",methods:[],displayName:"IconOnly"};o.__docgenInfo={description:"",methods:[],displayName:"SizesCompared"};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var x,p,g;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16
}}>
    <SectionLabel>Regular — all types</SectionLabel>
    <Row>
      <Button size="regular" kind="primary" text="Primary" />
      <Button size="regular" kind="secondary" text="Secondary" />
      <Button size="regular" kind="tertiary" text="Tertiary" />
      <Button size="regular" kind="destructive" text="Destructive" />
      <Button size="regular" kind="ghost" text="Ghost" />
      <Button size="regular" kind="link" text="Link" />
    </Row>
    <DarkBg>
      <Button size="regular" kind="inverted" text="Inverted" />
    </DarkBg>
    <SectionLabel>Regular — disabled</SectionLabel>
    <Row>
      <Button size="regular" kind="primary" text="Primary" disabled />
      <Button size="regular" kind="secondary" text="Secondary" disabled />
      <Button size="regular" kind="destructive" text="Destructive" disabled />
      <Button size="regular" kind="ghost" text="Ghost" disabled />
    </Row>
  </div>`,...(g=(p=r.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var y,k,z;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16
}}>
    <SectionLabel>Small — all types</SectionLabel>
    <Row>
      <Button size="small" kind="primary" text="Primary" />
      <Button size="small" kind="secondary" text="Secondary" />
      <Button size="small" kind="tertiary" text="Tertiary" />
      <Button size="small" kind="destructive" text="Destructive" />
      <Button size="small" kind="ghost" text="Ghost" />
      <Button size="small" kind="link" text="Link" />
    </Row>
    <DarkBg>
      <Button size="small" kind="inverted" text="Inverted" />
    </DarkBg>
    <SectionLabel>Small — disabled</SectionLabel>
    <Row>
      <Button size="small" kind="primary" text="Primary" disabled />
      <Button size="small" kind="secondary" text="Secondary" disabled />
      <Button size="small" kind="destructive" text="Destructive" disabled />
      <Button size="small" kind="ghost" text="Ghost" disabled />
    </Row>
  </div>`,...(z=(k=l.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var h,v,f;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const kinds = [{
    kind: "icon" as const,
    label: "Icon"
  }, {
    kind: "iconTertiary" as const,
    label: "Icon Tertiary"
  }, {
    kind: "iconGhost" as const,
    label: "Icon Ghost"
  }];
  const sizes = ["regular", "small"] as const;
  return <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 32,
    padding: 24
  }}>
      {sizes.map(size => <div key={size}>
          <SectionLabel>{size} size</SectionLabel>
          <div style={{
        display: "flex",
        gap: 40,
        alignItems: "flex-start",
        marginTop: 12
      }}>
            {kinds.map(({
          kind,
          label
        }) => <div key={kind} style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center"
        }}>
                <span style={{
            fontFamily: "Mulish, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: "var(--palette-neutral-3)",
            textTransform: "uppercase"
          }}>{label}</span>
                {/* Resting */}
                <Button size={size} kind={kind} title="Add"><Icon name="add" size={size === "regular" ? 20 : 16} /></Button>
                {/* Hover simulation */}
                <Button size={size} kind={kind} title="Add (hover)" style={{
            backgroundColor: "var(--palette-trans-0)"
          }}><Icon name="add" size={size === "regular" ? 20 : 16} /></Button>
                {/* Focus simulation */}
                <Button size={size} kind={kind} title="Add (focus)" style={{
            boxShadow: "0 0 0 4px var(--palette-blue-1), 0 0 0 2px var(--palette-white-0)",
            outline: "none"
          }}><Icon name="add" size={size === "regular" ? 20 : 16} /></Button>
                {/* Disabled */}
                <Button size={size} kind={kind} title="Add (disabled)" disabled><Icon name="add" size={size === "regular" ? 20 : 16} /></Button>
              </div>)}
          </div>
        </div>)}
    </div>;
}`,...(f=(v=d.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var j,b,S;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16
}}>
    {(["primary", "secondary", "tertiary", "destructive", "ghost", "link"] as const).map(kind => <div key={kind} style={{
    display: "flex",
    alignItems: "center",
    gap: 16
  }}>
        <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 11,
      color: "var(--palette-neutral-3)",
      width: 80
    }}>{kind}</span>
        <Button size="regular" kind={kind} text="Regular" />
        <Button size="small" kind={kind} text="Small" />
      </div>)}
  </div>`,...(S=(b=o.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var B,I,D;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:"args => <Button {...args} />",...(D=(I=i.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};const M=["Regular","Small","IconOnly","SizesCompared","Default"];export{i as Default,d as IconOnly,r as Regular,o as SizesCompared,l as Small,M as __namedExportsOrder,C as default};
