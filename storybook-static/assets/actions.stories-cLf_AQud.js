import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{A as e}from"./actions-B9WB_ReO.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./icon-A4JB3O0c.js";import"./index-DhMLlvMY.js";import"./tooltip-CwLrwrm3.js";const K={title:"Molecules/Actions",component:e,parameters:{layout:"padded",docs:{description:{component:"Action bar with three variants: **content** (inline, border-top, used at the bottom of form content), **sticky-screen** (sticks to viewport bottom, white panel with blur shadow, 1280px centered), **sticky-panel** (sticks to side panel/overlay bottom, fills parent width). Left actions = secondary (cancel/back); right actions = primary CTA."}}}},i={leftActions:[{label:"Cancel",variant:"secondary",onClick:()=>alert("Cancel")},{label:"Save Draft",variant:"secondary",onClick:()=>alert("Save Draft")}],rightActions:[{label:"Create",variant:"primary",onClick:()=>alert("Create")}]},r={name:"content — inline (border-top)",render:()=>n.jsxs("div",{style:{padding:24,background:"#F8F9FD"},children:[n.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#5C6E9E",marginBottom:24,paddingBottom:24,borderBottom:"1px solid #CFDAF7"},children:"Form content above the actions bar..."}),n.jsx(e,{variant:"content",...i})]})},o={name:"content — cancel only (left)",render:()=>n.jsx("div",{style:{padding:24,background:"#F8F9FD"},children:n.jsx(e,{variant:"content",leftActions:[{label:"Back",variant:"secondary",onClick:()=>{}}],rightActions:[{label:"Next",variant:"primary",onClick:()=>{}}]})})},a={name:"content — primary only (right)",render:()=>n.jsx("div",{style:{padding:24,background:"#F8F9FD"},children:n.jsx(e,{variant:"content",rightActions:[{label:"Save",variant:"primary",onClick:()=>{}}]})})},s={name:"content — with disabled button",render:()=>n.jsx("div",{style:{padding:24},children:n.jsx(e,{variant:"content",leftActions:[{label:"Cancel",variant:"secondary"}],rightActions:[{label:"Save Draft",variant:"secondary",disabled:!0},{label:"Create",variant:"primary"}]})})},l={name:"sticky-screen — fixed to viewport bottom",parameters:{layout:"fullscreen"},render:()=>n.jsxs("div",{style:{minHeight:"100vh",background:"#F8F9FD",display:"flex",flexDirection:"column"},children:[n.jsxs("div",{style:{flex:1,padding:40,fontFamily:"Mulish, sans-serif",fontSize:14,color:"#5C6E9E"},children:["Page content — scroll down to see the sticky actions bar.",Array.from({length:20}).map((T,t)=>n.jsxs("p",{children:["Paragraph ",t+1," of page content..."]},t))]}),n.jsx(e,{variant:"sticky-screen",...i})]})},c={name:"sticky-screen — minimal (no left actions)",parameters:{layout:"fullscreen"},render:()=>n.jsxs("div",{style:{minHeight:"200px",background:"#F8F9FD",position:"relative"},children:[n.jsx("div",{style:{padding:40,fontFamily:"Mulish, sans-serif",fontSize:14,color:"#5C6E9E"},children:"Form content..."}),n.jsx(e,{variant:"sticky-screen",rightActions:[{label:"Cancel",variant:"secondary"},{label:"Save",variant:"primary"}]})]})},d={name:"sticky-panel — fixed to side panel bottom",render:()=>n.jsxs("div",{style:{width:352,height:400,background:"#F8F9FD",display:"flex",flexDirection:"column",border:"1px solid #CFDAF7",borderRadius:8,overflow:"hidden",position:"relative"},children:[n.jsxs("div",{style:{flex:1,padding:20,overflowY:"auto",fontFamily:"Mulish, sans-serif",fontSize:14,color:"#5C6E9E"},children:["Side panel content...",Array.from({length:8}).map((T,t)=>n.jsxs("p",{style:{marginBottom:8},children:["Panel item ",t+1]},t))]}),n.jsx(e,{variant:"sticky-panel",leftActions:[{label:"Cancel",variant:"secondary"}],rightActions:[{label:"Apply",variant:"primary"}]})]})},m={name:"All variants",render:()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:48},children:[n.jsxs("div",{children:[n.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"content"}),n.jsx(e,{variant:"content",...i})]}),n.jsxs("div",{children:[n.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"sticky-screen (shown inline for demonstration)"}),n.jsx("div",{style:{border:"1px solid #CFDAF7",borderRadius:8,overflow:"hidden"},children:n.jsx(e,{variant:"sticky-screen",...i})})]}),n.jsxs("div",{children:[n.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"sticky-panel (shown in 352px container)"}),n.jsx("div",{style:{width:352,border:"1px solid #CFDAF7",borderRadius:8,overflow:"hidden"},children:n.jsx(e,{variant:"sticky-panel",...i})})]})]})},p={name:"Sticky screen — info text + tooltip on disabled button",parameters:{layout:"fullscreen"},render:()=>n.jsxs("div",{style:{minHeight:"100vh",background:"#F8F9FD",display:"flex",flexDirection:"column"},children:[n.jsx("div",{style:{flex:1,padding:40,fontFamily:"Mulish, sans-serif",fontSize:14,color:"#5C6E9E"},children:'Page content — hover the disabled "Next" button to see its tooltip.'}),n.jsx(e,{variant:"sticky-screen",leftActions:[{label:"Cancel",variant:"secondary"}],infoText:"101 engagements · 671 roles",rightActions:[{label:"Previous",variant:"secondary",icon:"arrow-left"},{label:"Next",variant:"primary",icon:"arrow-right",iconPosition:"right",disabled:!0,tooltip:"Please apply filters to narrow down engagements (max 100)"}]})]})};var y,v,f;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "content — inline (border-top)",
  render: () => <div style={{
    padding: 24,
    background: "#F8F9FD"
  }}>
      <div style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 14,
      color: "#5C6E9E",
      marginBottom: 24,
      paddingBottom: 24,
      borderBottom: "1px solid #CFDAF7"
    }}>
        Form content above the actions bar...
      </div>
      <Actions variant="content" {...commonActions} />
    </div>
}`,...(f=(v=r.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var h,g,u;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "content — cancel only (left)",
  render: () => <div style={{
    padding: 24,
    background: "#F8F9FD"
  }}>
      <Actions variant="content" leftActions={[{
      label: "Back",
      variant: "secondary",
      onClick: () => {}
    }]} rightActions={[{
      label: "Next",
      variant: "primary",
      onClick: () => {}
    }]} />
    </div>
}`,...(u=(g=o.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var b,x,F;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "content — primary only (right)",
  render: () => <div style={{
    padding: 24,
    background: "#F8F9FD"
  }}>
      <Actions variant="content" rightActions={[{
      label: "Save",
      variant: "primary",
      onClick: () => {}
    }]} />
    </div>
}`,...(F=(x=a.parameters)==null?void 0:x.docs)==null?void 0:F.source}}};var k,A,C;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "content — with disabled button",
  render: () => <div style={{
    padding: 24
  }}>
      <Actions variant="content" leftActions={[{
      label: "Cancel",
      variant: "secondary"
    }]} rightActions={[{
      label: "Save Draft",
      variant: "secondary",
      disabled: true
    }, {
      label: "Create",
      variant: "primary"
    }]} />
    </div>
}`,...(C=(A=s.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var S,j,w;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "sticky-screen — fixed to viewport bottom",
  parameters: {
    layout: "fullscreen"
  },
  render: () => <div style={{
    minHeight: "100vh",
    background: "#F8F9FD",
    display: "flex",
    flexDirection: "column"
  }}>
      <div style={{
      flex: 1,
      padding: 40,
      fontFamily: "Mulish, sans-serif",
      fontSize: 14,
      color: "#5C6E9E"
    }}>
        Page content — scroll down to see the sticky actions bar.
        {Array.from({
        length: 20
      }).map((_, i) => <p key={i}>Paragraph {i + 1} of page content...</p>)}
      </div>
      <Actions variant="sticky-screen" {...commonActions} />
    </div>
}`,...(w=(j=l.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var D,E,M;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: "sticky-screen — minimal (no left actions)",
  parameters: {
    layout: "fullscreen"
  },
  render: () => <div style={{
    minHeight: "200px",
    background: "#F8F9FD",
    position: "relative"
  }}>
      <div style={{
      padding: 40,
      fontFamily: "Mulish, sans-serif",
      fontSize: 14,
      color: "#5C6E9E"
    }}>
        Form content...
      </div>
      <Actions variant="sticky-screen" rightActions={[{
      label: "Cancel",
      variant: "secondary"
    }, {
      label: "Save",
      variant: "primary"
    }]} />
    </div>
}`,...(M=(E=c.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var P,z,B;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "sticky-panel — fixed to side panel bottom",
  render: () => <div style={{
    width: 352,
    height: 400,
    background: "#F8F9FD",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #CFDAF7",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative"
  }}>
      <div style={{
      flex: 1,
      padding: 20,
      overflowY: "auto",
      fontFamily: "Mulish, sans-serif",
      fontSize: 14,
      color: "#5C6E9E"
    }}>
        Side panel content...
        {Array.from({
        length: 8
      }).map((_, i) => <p key={i} style={{
        marginBottom: 8
      }}>Panel item {i + 1}</p>)}
      </div>
      <Actions variant="sticky-panel" leftActions={[{
      label: "Cancel",
      variant: "secondary"
    }]} rightActions={[{
      label: "Apply",
      variant: "primary"
    }]} />
    </div>
}`,...(B=(z=d.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var W,R,H;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: "All variants",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 48
  }}>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>
          content
        </p>
        <Actions variant="content" {...commonActions} />
      </div>

      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>
          sticky-screen (shown inline for demonstration)
        </p>
        <div style={{
        border: "1px solid #CFDAF7",
        borderRadius: 8,
        overflow: "hidden"
      }}>
          <Actions variant="sticky-screen" {...commonActions} />
        </div>
      </div>

      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>
          sticky-panel (shown in 352px container)
        </p>
        <div style={{
        width: 352,
        border: "1px solid #CFDAF7",
        borderRadius: 8,
        overflow: "hidden"
      }}>
          <Actions variant="sticky-panel" {...commonActions} />
        </div>
      </div>
    </div>
}`,...(H=(R=m.parameters)==null?void 0:R.docs)==null?void 0:H.source}}};var N,_,O;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: "Sticky screen — info text + tooltip on disabled button",
  parameters: {
    layout: "fullscreen"
  },
  render: () => <div style={{
    minHeight: "100vh",
    background: "#F8F9FD",
    display: "flex",
    flexDirection: "column"
  }}>
      <div style={{
      flex: 1,
      padding: 40,
      fontFamily: "Mulish, sans-serif",
      fontSize: 14,
      color: "#5C6E9E"
    }}>
        Page content — hover the disabled "Next" button to see its tooltip.
      </div>
      <Actions variant="sticky-screen" leftActions={[{
      label: "Cancel",
      variant: "secondary"
    }]} infoText="101 engagements · 671 roles" rightActions={[{
      label: "Previous",
      variant: "secondary",
      icon: "arrow-left"
    }, {
      label: "Next",
      variant: "primary",
      icon: "arrow-right",
      iconPosition: "right",
      disabled: true,
      tooltip: "Please apply filters to narrow down engagements (max 100)"
    }]} />
    </div>
}`,...(O=(_=p.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};const Q=["Content","ContentCancelOnly","ContentPrimaryOnly","ContentWithDisabled","StickyScreen","StickyScreenMinimal","StickyPanel","AllVariants","StickyScreenWithInfoAndTooltip"];export{m as AllVariants,r as Content,o as ContentCancelOnly,a as ContentPrimaryOnly,s as ContentWithDisabled,d as StickyPanel,l as StickyScreen,c as StickyScreenMinimal,p as StickyScreenWithInfoAndTooltip,Q as __namedExportsOrder,K as default};
