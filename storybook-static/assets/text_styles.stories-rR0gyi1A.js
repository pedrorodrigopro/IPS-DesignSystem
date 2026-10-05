import{j as l}from"./jsx-runtime-D_zvdyIk.js";const i="_labelSmallRegular_12wyu_1",o="_labelSmallBold_12wyu_9",d="_labelRegular_12wyu_17",g="_labelBold_12wyu_25",r="_labelSelected_12wyu_33",c="_labelUnselected_12wyu_41",u="_bodyRegular_12wyu_49",h="_bodyBold_12wyu_57",m="_bodySelected_12wyu_65",p="_bodyUnselected_12wyu_73",y="_heading6_12wyu_81",b="_heading5_12wyu_89",_="_heading4_12wyu_97",x="_heading3_12wyu_105",w="_heading2_12wyu_113",S="_heading1_12wyu_121",f={labelSmallRegular:i,labelSmallBold:o,labelRegular:d,labelBold:g,labelSelected:r,labelUnselected:c,bodyRegular:u,bodyBold:h,bodySelected:m,bodyUnselected:p,heading6:y,heading5:b,heading4:_,heading3:x,heading2:w,heading1:S},C={title:"Tokens/Text Styles",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=4949-136702"},controls:{hideNoControlsWarning:!0}}},z=[{name:"label-small-regular",cssClass:"labelSmallRegular",size:"10px",weight:"400 Regular",lineHeight:"115%",usage:"Chart labels"},{name:"label-small-bold",cssClass:"labelSmallBold",size:"10px",weight:"700 Bold",lineHeight:"115%",usage:"Breadcrumbs"},{name:"label-regular",cssClass:"labelRegular",size:"12px",weight:"400 Regular",lineHeight:"150%",usage:"Secondary text, input labels, instructions"},{name:"label-bold",cssClass:"labelBold",size:"12px",weight:"700 Bold",lineHeight:"150%",usage:"Secondary text emphasized"},{name:"label-selected",cssClass:"labelSelected",size:"12px",weight:"700 Bold",lineHeight:"115%",usage:"Small button labels"},{name:"label-unselected",cssClass:"labelUnselected",size:"12px",weight:"400 Regular",lineHeight:"115%",usage:"Small button labels (unselected)"},{name:"body-regular",cssClass:"bodyRegular",size:"14px",weight:"400 Regular",lineHeight:"150%",usage:"Body text, unselected tabs/toggles"},{name:"body-bold",cssClass:"bodyBold",size:"14px",weight:"700 Bold",lineHeight:"150%",usage:"Body text emphasized"},{name:"body-selected",cssClass:"bodySelected",size:"14px",weight:"700 Bold",lineHeight:"115%",usage:"Regular button labels, selected tabs/toggles"},{name:"body-unselected",cssClass:"bodyUnselected",size:"14px",weight:"400 Regular",lineHeight:"115%",usage:"Regular button labels (unselected)"},{name:"heading-6",cssClass:"heading6",size:"15px",weight:"600 SemiBold",lineHeight:"125%",usage:"Tertiary titles"},{name:"heading-5",cssClass:"heading5",size:"16px",weight:"600 SemiBold",lineHeight:"125%",usage:"Tertiary titles"},{name:"heading-4",cssClass:"heading4",size:"20px",weight:"600 SemiBold",lineHeight:"125%",usage:"Secondary titles"},{name:"heading-3",cssClass:"heading3",size:"24px",weight:"600 SemiBold",lineHeight:"125%",usage:"Section content titles"},{name:"heading-2",cssClass:"heading2",size:"28px",weight:"600 SemiBold",lineHeight:"125%",usage:"Page section titles"},{name:"heading-1",cssClass:"heading1",size:"32px",weight:"600 SemiBold",lineHeight:"125%",usage:"Page titles"}],s=()=>l.jsx("div",{style:{display:"flex",flexDirection:"column",gap:0,padding:24},children:z.map(e=>l.jsxs("div",{style:{display:"grid",gridTemplateColumns:"220px 1fr",gap:24,padding:"16px 0",borderBottom:"1px solid var(--palette-neutral-0)",alignItems:"start"},children:[l.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:2},children:[l.jsx("span",{style:{fontFamily:"monospace",fontSize:11,fontWeight:700,color:"var(--palette-blue-0)"},children:e.name}),l.jsxs("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"var(--palette-neutral-3)"},children:[e.size," · ",e.weight," · ",e.lineHeight]}),l.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"var(--palette-neutral-3)",marginTop:2},children:e.usage})]}),l.jsx("span",{className:f[e.cssClass],children:"The quick brown fox jumps over the lazy dog"})]},e.name))});s.__docgenInfo={description:"",methods:[],displayName:"AllTextStyles"};var a,n,t;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 0,
  padding: 24
}}>
    {styles.map(s => <div key={s.name} style={{
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: 24,
    padding: "16px 0",
    borderBottom: "1px solid var(--palette-neutral-0)",
    alignItems: "start"
  }}>
        {/* Meta column */}
        <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 2
    }}>
          <span style={{
        fontFamily: "monospace",
        fontSize: 11,
        fontWeight: 700,
        color: "var(--palette-blue-0)"
      }}>
            {s.name}
          </span>
          <span style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "var(--palette-neutral-3)"
      }}>
            {s.size} · {s.weight} · {s.lineHeight}
          </span>
          <span style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "var(--palette-neutral-3)",
        marginTop: 2
      }}>
            {s.usage}
          </span>
        </div>
        {/* Preview column */}
        <span className={css[s.cssClass]}>
          The quick brown fox jumps over the lazy dog
        </span>
      </div>)}
  </div>`,...(t=(n=s.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};const v=["AllTextStyles"];export{s as AllTextStyles,v as __namedExportsOrder,C as default};
