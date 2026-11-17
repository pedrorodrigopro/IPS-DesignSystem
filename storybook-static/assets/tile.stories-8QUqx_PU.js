import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as t}from"./tile-2UbfjZnD.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";const P={title:"Components/Tile",component:t,parameters:{layout:"padded",docs:{description:{component:"General-purpose content container (Figma node 9700:113417). Controls background, shadow, border via `tileStyle` prop. Controls padding via `padding` prop: **panel** (8px, side panels), **content** (16px, screen containers), **screen** (24px, top-level tiles). Pass `onClick` to make it interactive (pointer cursor + hover shadow)."}}}},a=({label:n="Content goes here",height:l=60})=>e.jsx("div",{style:{height:l,background:"var(--palette-primary-0)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"var(--font-family)",fontSize:12,fontWeight:700,opacity:.7},children:n}),o={name:"All styles",render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:400},children:[{tileStyle:"highlight",label:"highlight — white, flat (main content card)"},{tileStyle:"default",label:"default — neutral-2, flat (background container)"},{tileStyle:"selected",label:"selected — neutral-1 bg (selected state)"},{tileStyle:"object-light",label:"object-light — white + border (side panel)"},{tileStyle:"object-dark",label:"object-dark — neutral-2 + border (side panel)"},{tileStyle:"dark",label:"dark — #0C1457 bg (dark interactive card)"}].map(({tileStyle:n,label:l})=>e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:11,color:"var(--palette-blue-2)",marginBottom:4,fontWeight:700},children:l}),e.jsx(t,{tileStyle:n,children:e.jsx(a,{})})]},n))})},r={name:"Interactive (hover me)",render:()=>e.jsxs("div",{style:{display:"flex",gap:16,maxWidth:800},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:11,color:"var(--palette-blue-2)",marginBottom:4,fontWeight:700},children:"interactive (white + hover shadow)"}),e.jsx(t,{tileStyle:"interactive",onClick:()=>alert("Clicked!"),children:e.jsx(a,{label:"Click me — hover for shadow"})})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:11,color:"var(--palette-blue-2)",marginBottom:4,fontWeight:700},children:"dark (blue-1 + hover shadow)"}),e.jsx(t,{tileStyle:"dark",onClick:()=>alert("Dark clicked!"),children:e.jsx(a,{label:"Dark interactive tile"})})]})]})},s={name:"Padding scale",render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:24,maxWidth:500},children:[{padding:"screen",px:"24px",context:"Top-level screen content"},{padding:"content",px:"16px",context:"Screen container content"},{padding:"panel",px:"8px",context:"Side panel / overlay blocks"}].map(({padding:n,px:l,context:i})=>e.jsxs("div",{children:[e.jsxs("p",{style:{fontFamily:"var(--font-family)",fontSize:11,color:"var(--palette-blue-2)",marginBottom:4},children:[e.jsx("strong",{children:n})," — ",l," padding — ",i]}),e.jsx(t,{tileStyle:"highlight",padding:n,children:e.jsx(a,{label:`padding="${n}" (${l})`})})]},n))})},d={name:"Composed — screen layout example",render:()=>e.jsxs("div",{style:{background:"var(--palette-neutral-2)",padding:24,borderRadius:8,display:"flex",gap:24},children:[e.jsxs("div",{style:{width:200,display:"flex",flexDirection:"column",gap:8},children:[e.jsxs(t,{tileStyle:"object-dark",padding:"panel",children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:12,fontWeight:700,color:"var(--palette-blue-0)"},children:"Participants"}),e.jsx(a,{label:"Content",height:40})]}),e.jsxs(t,{tileStyle:"object-light",padding:"panel",children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:12,fontWeight:700,color:"var(--palette-blue-0)"},children:"Resourcing Dates"}),e.jsx(a,{label:"Content",height:40})]})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:16},children:[e.jsxs(t,{tileStyle:"highlight",padding:"screen",children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:14,fontWeight:700,color:"var(--palette-blue-0)"},children:"Description"}),e.jsx(a,{label:"Screen-level tile (24px padding)"})]}),e.jsxs(t,{tileStyle:"highlight",padding:"content",children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:14,fontWeight:700,color:"var(--palette-blue-0)"},children:"Details"}),e.jsx(a,{label:"Content tile (16px padding)"})]}),e.jsxs(t,{tileStyle:"interactive",padding:"content",onClick:()=>{},children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:14,fontWeight:700,color:"var(--palette-blue-0)"},children:"Clickable card ↗"}),e.jsx(a,{label:"Hover for shadow"})]})]})]})},c={name:"Tinted",parameters:{docs:{description:{story:"`tint` swaps the background for the light shade of a status colour (warning orange-2, error red-2, success green-2, info primary-3, neutral neutral-1). The style's shadow and the click behaviour stay; hovering a clickable tinted tile keeps its tint. `softTint` mixes the shade with white, for tiles holding a pill of the same colour family (second row)."}}},render:()=>{const n=["warning","error","success","info","neutral"],l={fontFamily:"var(--font-family)",fontWeight:700,color:"var(--palette-blue-0)"};return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:760},children:[!1,!0].map(i=>e.jsx("div",{style:{display:"flex",gap:16},children:n.map(p=>e.jsxs(t,{tileStyle:"interactive",tint:p,softTint:i,onClick:()=>{},children:[e.jsx("span",{style:l,children:p}),e.jsx("span",{style:{...l,fontSize:24},children:i?"soft":"regular"})]},p))},String(i)))})}};var f,h,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "All styles",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 400
  }}>
      {[{
      tileStyle: "highlight" as const,
      label: "highlight — white, flat (main content card)"
    }, {
      tileStyle: "default" as const,
      label: "default — neutral-2, flat (background container)"
    }, {
      tileStyle: "selected" as const,
      label: "selected — neutral-1 bg (selected state)"
    }, {
      tileStyle: "object-light" as const,
      label: "object-light — white + border (side panel)"
    }, {
      tileStyle: "object-dark" as const,
      label: "object-dark — neutral-2 + border (side panel)"
    }, {
      tileStyle: "dark" as const,
      label: "dark — #0C1457 bg (dark interactive card)"
    }].map(({
      tileStyle,
      label
    }) => <div key={tileStyle}>
          <p style={{
        fontFamily: "var(--font-family)",
        fontSize: 11,
        color: "var(--palette-blue-2)",
        marginBottom: 4,
        fontWeight: 700
      }}>
            {label}
          </p>
          <Tile tileStyle={tileStyle}>
            <Placeholder />
          </Tile>
        </div>)}
    </div>
}`,...(y=(h=o.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var m,g,x;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Interactive (hover me)",
  render: () => <div style={{
    display: "flex",
    gap: 16,
    maxWidth: 800
  }}>
      <div style={{
      flex: 1
    }}>
        <p style={{
        fontFamily: "var(--font-family)",
        fontSize: 11,
        color: "var(--palette-blue-2)",
        marginBottom: 4,
        fontWeight: 700
      }}>
          interactive (white + hover shadow)
        </p>
        <Tile tileStyle="interactive" onClick={() => alert("Clicked!")}>
          <Placeholder label="Click me — hover for shadow" />
        </Tile>
      </div>
      <div style={{
      flex: 1
    }}>
        <p style={{
        fontFamily: "var(--font-family)",
        fontSize: 11,
        color: "var(--palette-blue-2)",
        marginBottom: 4,
        fontWeight: 700
      }}>
          dark (blue-1 + hover shadow)
        </p>
        <Tile tileStyle="dark" onClick={() => alert("Dark clicked!")}>
          <Placeholder label="Dark interactive tile" />
        </Tile>
      </div>
    </div>
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var v,u,b;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Padding scale",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 24,
    maxWidth: 500
  }}>
      {[{
      padding: "screen" as const,
      px: "24px",
      context: "Top-level screen content"
    }, {
      padding: "content" as const,
      px: "16px",
      context: "Screen container content"
    }, {
      padding: "panel" as const,
      px: "8px",
      context: "Side panel / overlay blocks"
    }].map(({
      padding,
      px,
      context
    }) => <div key={padding}>
          <p style={{
        fontFamily: "var(--font-family)",
        fontSize: 11,
        color: "var(--palette-blue-2)",
        marginBottom: 4
      }}>
            <strong>{padding}</strong> — {px} padding — {context}
          </p>
          <Tile tileStyle="highlight" padding={padding}>
            <Placeholder label={\`padding="\${padding}" (\${px})\`} />
          </Tile>
        </div>)}
    </div>
}`,...(b=(u=s.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var S,j,k;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Composed — screen layout example",
  render: () => <div style={{
    background: "var(--palette-neutral-2)",
    padding: 24,
    borderRadius: 8,
    display: "flex",
    gap: 24
  }}>
      {/* Side panel */}
      <div style={{
      width: 200,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }}>
        <Tile tileStyle="object-dark" padding="panel">
          <span style={{
          fontFamily: "var(--font-family)",
          fontSize: 12,
          fontWeight: 700,
          color: "var(--palette-blue-0)"
        }}>Participants</span>
          <Placeholder label="Content" height={40} />
        </Tile>
        <Tile tileStyle="object-light" padding="panel">
          <span style={{
          fontFamily: "var(--font-family)",
          fontSize: 12,
          fontWeight: 700,
          color: "var(--palette-blue-0)"
        }}>Resourcing Dates</span>
          <Placeholder label="Content" height={40} />
        </Tile>
      </div>
      {/* Main content */}
      <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }}>
        <Tile tileStyle="highlight" padding="screen">
          <span style={{
          fontFamily: "var(--font-family)",
          fontSize: 14,
          fontWeight: 700,
          color: "var(--palette-blue-0)"
        }}>Description</span>
          <Placeholder label="Screen-level tile (24px padding)" />
        </Tile>
        <Tile tileStyle="highlight" padding="content">
          <span style={{
          fontFamily: "var(--font-family)",
          fontSize: 14,
          fontWeight: 700,
          color: "var(--palette-blue-0)"
        }}>Details</span>
          <Placeholder label="Content tile (16px padding)" />
        </Tile>
        <Tile tileStyle="interactive" padding="content" onClick={() => {}}>
          <span style={{
          fontFamily: "var(--font-family)",
          fontSize: 14,
          fontWeight: 700,
          color: "var(--palette-blue-0)"
        }}>Clickable card ↗</span>
          <Placeholder label="Hover for shadow" />
        </Tile>
      </div>
    </div>
}`,...(k=(j=d.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var T,C,w;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Tinted",
  parameters: {
    docs: {
      description: {
        story: "\`tint\` swaps the background for the light shade of a status colour (warning orange-2, error red-2, success green-2, info primary-3, neutral neutral-1). The style's shadow and the click behaviour stay; hovering a clickable tinted tile keeps its tint. \`softTint\` mixes the shade with white, for tiles holding a pill of the same colour family (second row)."
      }
    }
  },
  render: () => {
    const tints = ["warning", "error", "success", "info", "neutral"] as const;
    const text: React.CSSProperties = {
      fontFamily: "var(--font-family)",
      fontWeight: 700,
      color: "var(--palette-blue-0)"
    };
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
      maxWidth: 760
    }}>
        {[false, true].map(soft => <div key={String(soft)} style={{
        display: "flex",
        gap: 16
      }}>
            {tints.map(t => <Tile key={t} tileStyle="interactive" tint={t} softTint={soft} onClick={() => {}}>
                <span style={text}>{t}</span>
                <span style={{
            ...text,
            fontSize: 24
          }}>{soft ? "soft" : "regular"}</span>
              </Tile>)}
          </div>)}
      </div>;
  }
}`,...(w=(C=c.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};const B=["AllStyles","Interactive","PaddingScale","ComposedExample","Tinted"];export{o as AllStyles,d as ComposedExample,r as Interactive,s as PaddingScale,c as Tinted,B as __namedExportsOrder,P as default};
