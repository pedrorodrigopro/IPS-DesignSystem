import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as n}from"./tile-DxGAws7a.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";const W={title:"Components/Tile",component:n,parameters:{layout:"padded",docs:{description:{component:"General-purpose content container (Figma node 9700:113417). Controls background, shadow, border via `tileStyle` prop. Controls padding via `padding` prop: **panel** (8px, side panels), **content** (16px, screen containers), **screen** (24px, top-level tiles). Pass `onClick` to make it interactive (pointer cursor + hover shadow)."}}}},l=({label:t="Content goes here",height:a=60})=>e.jsx("div",{style:{height:a,background:"var(--palette-primary-0)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"var(--font-family)",fontSize:12,fontWeight:700,opacity:.7},children:t}),i={name:"All styles",render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:400},children:[{tileStyle:"highlight",label:"highlight — white, flat (main content card)"},{tileStyle:"default",label:"default — neutral-2, flat (background container)"},{tileStyle:"selected",label:"selected — neutral-1 bg (selected state)"},{tileStyle:"object-light",label:"object-light — white + border (side panel)"},{tileStyle:"object-dark",label:"object-dark — neutral-2 + border (side panel)"},{tileStyle:"dark",label:"dark — #0C1457 bg (dark interactive card)"}].map(({tileStyle:t,label:a})=>e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:11,color:"var(--palette-blue-2)",marginBottom:4,fontWeight:700},children:a}),e.jsx(n,{tileStyle:t,children:e.jsx(l,{})})]},t))})},o={name:"Interactive (hover me)",render:()=>e.jsxs("div",{style:{display:"flex",gap:16,maxWidth:800},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:11,color:"var(--palette-blue-2)",marginBottom:4,fontWeight:700},children:"interactive (white + hover shadow)"}),e.jsx(n,{tileStyle:"interactive",onClick:()=>alert("Clicked!"),children:e.jsx(l,{label:"Click me — hover for shadow"})})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:11,color:"var(--palette-blue-2)",marginBottom:4,fontWeight:700},children:"dark (blue-1 + hover shadow)"}),e.jsx(n,{tileStyle:"dark",onClick:()=>alert("Dark clicked!"),children:e.jsx(l,{label:"Dark interactive tile"})})]})]})},r={name:"Padding scale",render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:24,maxWidth:500},children:[{padding:"screen",px:"24px",context:"Top-level screen content"},{padding:"content",px:"16px",context:"Screen container content"},{padding:"panel",px:"8px",context:"Side panel / overlay blocks"}].map(({padding:t,px:a,context:S})=>e.jsxs("div",{children:[e.jsxs("p",{style:{fontFamily:"var(--font-family)",fontSize:11,color:"var(--palette-blue-2)",marginBottom:4},children:[e.jsx("strong",{children:t})," — ",a," padding — ",S]}),e.jsx(n,{tileStyle:"highlight",padding:t,children:e.jsx(l,{label:`padding="${t}" (${a})`})})]},t))})},d={name:"Composed — screen layout example",render:()=>e.jsxs("div",{style:{background:"var(--palette-neutral-2)",padding:24,borderRadius:8,display:"flex",gap:24},children:[e.jsxs("div",{style:{width:200,display:"flex",flexDirection:"column",gap:8},children:[e.jsxs(n,{tileStyle:"object-dark",padding:"panel",children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:12,fontWeight:700,color:"var(--palette-blue-0)"},children:"Participants"}),e.jsx(l,{label:"Content",height:40})]}),e.jsxs(n,{tileStyle:"object-light",padding:"panel",children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:12,fontWeight:700,color:"var(--palette-blue-0)"},children:"Resourcing Dates"}),e.jsx(l,{label:"Content",height:40})]})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:16},children:[e.jsxs(n,{tileStyle:"highlight",padding:"screen",children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:14,fontWeight:700,color:"var(--palette-blue-0)"},children:"Description"}),e.jsx(l,{label:"Screen-level tile (24px padding)"})]}),e.jsxs(n,{tileStyle:"highlight",padding:"content",children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:14,fontWeight:700,color:"var(--palette-blue-0)"},children:"Details"}),e.jsx(l,{label:"Content tile (16px padding)"})]}),e.jsxs(n,{tileStyle:"interactive",padding:"content",onClick:()=>{},children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:14,fontWeight:700,color:"var(--palette-blue-0)"},children:"Clickable card ↗"}),e.jsx(l,{label:"Hover for shadow"})]})]})]})};var s,c,p;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
}`,...(p=(c=i.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var f,h,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(y=(h=o.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var m,g,x;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var v,b,u;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(u=(b=d.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};const F=["AllStyles","Interactive","PaddingScale","ComposedExample"];export{i as AllStyles,d as ComposedExample,o as Interactive,r as PaddingScale,F as __namedExportsOrder,W as default};
