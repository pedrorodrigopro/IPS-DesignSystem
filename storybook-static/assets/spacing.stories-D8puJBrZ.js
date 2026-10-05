import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as n}from"./tile-DxGAws7a.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";const R={title:"Patterns/Spacing",parameters:{layout:"padded",docs:{description:{component:"IPS uses a three-level padding system tied to layout context. Always use the `padding` prop on `<Tile>` — never hardcode px values. This ensures consistent spacing as the system evolves."}}}},b=[{name:"--spacing-xs",value:"2px",token:"var(--spacing-xs)"},{name:"--spacing-sm",value:"4px",token:"var(--spacing-sm)"},{name:"--spacing-md",value:"8px",token:"var(--spacing-md)"},{name:"--spacing-md2",value:"12px",token:"var(--spacing-md2)"},{name:"--spacing-lg",value:"16px",token:"var(--spacing-lg)"},{name:"--spacing-xl",value:"24px",token:"var(--spacing-xl)"},{name:"--spacing-2xl",value:"32px",token:"var(--spacing-2xl)"},{name:"--spacing-3xl",value:"40px",token:"var(--spacing-3xl)"}],S=[{name:"--tile-padding-panel",value:"8px",prop:"panel",context:"Side panels & overlays",description:"Content blocks inside side panels, drawers, filter bars, or overlays.",example:"Participants section, Resourcing dates, Privacy block"},{name:"--tile-padding-content",value:"16px",prop:"content",context:"Screen container content",description:"Standard content tiles within a screen — the most common padding level.",example:"Description card, Match attributes, Details sections"},{name:"--tile-padding-screen",value:"24px",prop:"screen",context:"Top-level screen tiles",description:"Large hero-level containers that sit directly in the main page area.",example:"Alert dashboard, Primary role card, Full-width intro sections"}],i={name:"Tile padding — three levels",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32,fontFamily:"var(--font-family)"},children:[e.jsxs("p",{style:{fontSize:14,color:"var(--palette-blue-2)",maxWidth:600},children:["Always use the ",e.jsx("code",{style:{background:"var(--palette-neutral-1)",padding:"1px 4px",borderRadius:3},children:"padding"})," prop on ",e.jsx("code",{style:{background:"var(--palette-neutral-1)",padding:"1px 4px",borderRadius:3},children:"<Tile>"})," rather than hardcoding pixel values. The three levels map to layout context — not arbitrary sizes."]}),S.map(({name:t,value:a,prop:o,context:h,description:u,example:f})=>e.jsxs("div",{style:{display:"flex",gap:24,alignItems:"flex-start"},children:[e.jsxs("div",{style:{width:280,flexShrink:0},children:[e.jsxs("div",{style:{fontSize:16,fontWeight:700,color:"var(--palette-blue-0)",marginBottom:4},children:['padding="',o,'"']}),e.jsxs("div",{style:{fontSize:13,fontWeight:700,color:"var(--palette-primary-0)",marginBottom:4},children:[a," — ",h]}),e.jsx("div",{style:{fontSize:13,color:"var(--palette-blue-2)",marginBottom:6},children:u}),e.jsxs("div",{style:{fontSize:11,color:"var(--palette-neutral-3)",fontStyle:"italic"},children:["e.g. ",f]}),e.jsxs("div",{style:{marginTop:8,fontSize:11,color:"var(--palette-blue-2)"},children:["token: ",e.jsx("code",{style:{background:"var(--palette-neutral-1)",padding:"1px 4px",borderRadius:3},children:t})]})]}),e.jsx("div",{style:{flex:1},children:e.jsx(n,{tileStyle:"highlight",padding:o,children:e.jsx("div",{style:{position:"relative"},children:e.jsx("div",{style:{background:"var(--palette-primary-0)",borderRadius:4,height:56,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:700,opacity:.8},children:"Content area"})})})})]},t))]})},l={name:"Spacing tokens",render:()=>e.jsxs("div",{style:{fontFamily:"var(--font-family)",display:"flex",flexDirection:"column",gap:8},children:[e.jsx("p",{style:{fontSize:14,color:"var(--palette-blue-2)",marginBottom:16},children:"Base spacing scale — 4px grid. Use these tokens for gaps, margins, and internal component spacing."}),b.map(({name:t,value:a})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[e.jsx("div",{style:{height:24,width:parseInt(a)*3,background:"var(--palette-primary-0)",borderRadius:2,opacity:.7,flexShrink:0,minWidth:4}}),e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[e.jsx("code",{style:{background:"var(--palette-neutral-1)",padding:"2px 6px",borderRadius:4,fontSize:12,color:"var(--palette-blue-0)",fontFamily:"monospace",minWidth:140},children:t}),e.jsx("span",{style:{fontSize:13,fontWeight:700,color:"var(--palette-blue-0)",minWidth:32},children:a})]})]},t))]})},r={name:"Full layout example",render:()=>e.jsxs("div",{style:{background:"var(--palette-neutral-2)",padding:24,borderRadius:8,display:"flex",gap:24,minHeight:400},children:[e.jsxs("div",{style:{width:220,display:"flex",flexDirection:"column",gap:1},children:[e.jsxs(n,{tileStyle:"object-dark",padding:"panel",children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:11,fontWeight:700,color:"var(--palette-neutral-3)",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Side panel · 8px"}),e.jsx("div",{style:{height:48,background:"var(--palette-primary-0)",borderRadius:4,opacity:.3}})]}),e.jsxs(n,{tileStyle:"object-light",padding:"panel",children:[e.jsx("div",{style:{height:32,background:"var(--palette-primary-0)",borderRadius:4,opacity:.3}}),e.jsx("div",{style:{height:32,background:"var(--palette-primary-0)",borderRadius:4,opacity:.3}})]}),e.jsx(n,{tileStyle:"object-dark",padding:"panel",children:e.jsx("div",{style:{height:24,background:"var(--palette-primary-0)",borderRadius:4,opacity:.3}})})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:16},children:[e.jsxs(n,{tileStyle:"highlight",padding:"screen",children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:11,fontWeight:700,color:"var(--palette-neutral-3)",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Screen tile · 24px"}),e.jsx("div",{style:{height:56,background:"var(--palette-primary-0)",borderRadius:4,opacity:.3}})]}),e.jsxs("div",{style:{display:"flex",gap:16},children:[e.jsxs(n,{tileStyle:"highlight",padding:"content",style:{flex:1},children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:11,fontWeight:700,color:"var(--palette-neutral-3)",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Content · 16px"}),e.jsx("div",{style:{height:48,background:"var(--palette-primary-0)",borderRadius:4,opacity:.3}})]}),e.jsxs(n,{tileStyle:"interactive",padding:"content",onClick:()=>{},style:{flex:1},children:[e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:11,fontWeight:700,color:"var(--palette-neutral-3)",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Interactive · 16px ↗"}),e.jsx("div",{style:{height:48,background:"var(--palette-primary-0)",borderRadius:4,opacity:.3}})]})]})]})]})};var s,d,p;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "Tile padding — three levels",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 32,
    fontFamily: "var(--font-family)"
  }}>
      <p style={{
      fontSize: 14,
      color: "var(--palette-blue-2)",
      maxWidth: 600
    }}>
        Always use the <code style={{
        background: "var(--palette-neutral-1)",
        padding: "1px 4px",
        borderRadius: 3
      }}>padding</code> prop
        on <code style={{
        background: "var(--palette-neutral-1)",
        padding: "1px 4px",
        borderRadius: 3
      }}>&lt;Tile&gt;</code> rather than
        hardcoding pixel values. The three levels map to layout context — not arbitrary sizes.
      </p>

      {TILE_PADDING.map(({
      name,
      value,
      prop,
      context,
      description,
      example
    }) => <div key={name} style={{
      display: "flex",
      gap: 24,
      alignItems: "flex-start"
    }}>
          {/* Docs */}
          <div style={{
        width: 280,
        flexShrink: 0
      }}>
            <div style={{
          fontSize: 16,
          fontWeight: 700,
          color: "var(--palette-blue-0)",
          marginBottom: 4
        }}>
              padding="{prop}"
            </div>
            <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: "var(--palette-primary-0)",
          marginBottom: 4
        }}>
              {value} — {context}
            </div>
            <div style={{
          fontSize: 13,
          color: "var(--palette-blue-2)",
          marginBottom: 6
        }}>{description}</div>
            <div style={{
          fontSize: 11,
          color: "var(--palette-neutral-3)",
          fontStyle: "italic"
        }}>e.g. {example}</div>
            <div style={{
          marginTop: 8,
          fontSize: 11,
          color: "var(--palette-blue-2)"
        }}>
              token: <code style={{
            background: "var(--palette-neutral-1)",
            padding: "1px 4px",
            borderRadius: 3
          }}>{name}</code>
            </div>
          </div>

          {/* Visual example */}
          <div style={{
        flex: 1
      }}>
            <Tile tileStyle="highlight" padding={prop as "panel" | "content" | "screen"}>
              {/* Padding indicator overlay */}
              <div style={{
            position: "relative"
          }}>
                <div style={{
              background: "var(--palette-primary-0)",
              borderRadius: 4,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              opacity: 0.8
            }}>
                  Content area
                </div>
              </div>
            </Tile>
          </div>
        </div>)}
    </div>
}`,...(p=(d=i.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var c,g,y;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Spacing tokens",
  render: () => <div style={{
    fontFamily: "var(--font-family)",
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      <p style={{
      fontSize: 14,
      color: "var(--palette-blue-2)",
      marginBottom: 16
    }}>
        Base spacing scale — 4px grid. Use these tokens for gaps, margins, and internal component spacing.
      </p>
      {TOKENS.map(({
      name,
      value
    }) => <div key={name} style={{
      display: "flex",
      alignItems: "center",
      gap: 16
    }}>
          {/* Bar */}
          <div style={{
        height: 24,
        width: parseInt(value) * 3,
        background: "var(--palette-primary-0)",
        borderRadius: 2,
        opacity: 0.7,
        flexShrink: 0,
        minWidth: 4
      }} />
          {/* Label */}
          <div style={{
        display: "flex",
        gap: 12,
        alignItems: "center"
      }}>
            <code style={{
          background: "var(--palette-neutral-1)",
          padding: "2px 6px",
          borderRadius: 4,
          fontSize: 12,
          color: "var(--palette-blue-0)",
          fontFamily: "monospace",
          minWidth: 140
        }}>{name}</code>
            <span style={{
          fontSize: 13,
          fontWeight: 700,
          color: "var(--palette-blue-0)",
          minWidth: 32
        }}>{value}</span>
          </div>
        </div>)}
    </div>
}`,...(y=(g=l.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var m,v,x;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Full layout example",
  render: () => <div style={{
    background: "var(--palette-neutral-2)",
    padding: 24,
    borderRadius: 8,
    display: "flex",
    gap: 24,
    minHeight: 400
  }}>
      {/* Side panel — panel padding (8px) */}
      <div style={{
      width: 220,
      display: "flex",
      flexDirection: "column",
      gap: 1
    }}>
        <Tile tileStyle="object-dark" padding="panel">
          <span style={{
          fontFamily: "var(--font-family)",
          fontSize: 11,
          fontWeight: 700,
          color: "var(--palette-neutral-3)",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }}>
            Side panel · 8px
          </span>
          <div style={{
          height: 48,
          background: "var(--palette-primary-0)",
          borderRadius: 4,
          opacity: 0.3
        }} />
        </Tile>
        <Tile tileStyle="object-light" padding="panel">
          <div style={{
          height: 32,
          background: "var(--palette-primary-0)",
          borderRadius: 4,
          opacity: 0.3
        }} />
          <div style={{
          height: 32,
          background: "var(--palette-primary-0)",
          borderRadius: 4,
          opacity: 0.3
        }} />
        </Tile>
        <Tile tileStyle="object-dark" padding="panel">
          <div style={{
          height: 24,
          background: "var(--palette-primary-0)",
          borderRadius: 4,
          opacity: 0.3
        }} />
        </Tile>
      </div>

      {/* Main area */}
      <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }}>
        {/* Hero tile — screen padding (24px) */}
        <Tile tileStyle="highlight" padding="screen">
          <span style={{
          fontFamily: "var(--font-family)",
          fontSize: 11,
          fontWeight: 700,
          color: "var(--palette-neutral-3)",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }}>
            Screen tile · 24px
          </span>
          <div style={{
          height: 56,
          background: "var(--palette-primary-0)",
          borderRadius: 4,
          opacity: 0.3
        }} />
        </Tile>

        {/* Content tiles — content padding (16px) */}
        <div style={{
        display: "flex",
        gap: 16
      }}>
          <Tile tileStyle="highlight" padding="content" style={{
          flex: 1
        }}>
            <span style={{
            fontFamily: "var(--font-family)",
            fontSize: 11,
            fontWeight: 700,
            color: "var(--palette-neutral-3)",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
              Content · 16px
            </span>
            <div style={{
            height: 48,
            background: "var(--palette-primary-0)",
            borderRadius: 4,
            opacity: 0.3
          }} />
          </Tile>
          <Tile tileStyle="interactive" padding="content" onClick={() => {}} style={{
          flex: 1
        }}>
            <span style={{
            fontFamily: "var(--font-family)",
            fontSize: 11,
            fontWeight: 700,
            color: "var(--palette-neutral-3)",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
              Interactive · 16px ↗
            </span>
            <div style={{
            height: 48,
            background: "var(--palette-primary-0)",
            borderRadius: 4,
            opacity: 0.3
          }} />
          </Tile>
        </div>
      </div>
    </div>
}`,...(x=(v=r.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};const W=["TilePaddingSystem","SpacingTokens","LayoutExample"];export{r as LayoutExample,l as SpacingTokens,i as TilePaddingSystem,W as __namedExportsOrder,R as default};
