import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as F}from"./index-DhMLlvMY.js";import{L as r,a as S}from"./loading-CDoiP5Xh.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const k={title:"Components/Loading",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1890-123451"}}},i=()=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,padding:24},children:[n.jsx(r,{}),n.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#0D2976"},children:"Loading…"})]}),t=()=>{const[e,a]=F.useState(!0);return n.jsxs("div",{style:{position:"relative",width:"100%",height:400,background:"#E7EAF8",display:"flex",alignItems:"center",justifyContent:"center"},children:[n.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#0D2976"},children:"Content behind the overlay"}),e&&n.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(248,249,253,0.75)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:80},children:n.jsx("div",{style:{display:"flex",gap:16,alignItems:"center"},children:[0,1,2].map(l=>n.jsx("span",{style:{display:"inline-block",width:24,height:24,borderRadius:"50%",backgroundColor:"#0C1457",animation:"bounce 1.4s ease-in-out infinite both",animationDelay:`${[-.32,-.16,0][l]}s`}},l))})}),n.jsx("style",{children:`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}),n.jsx("button",{type:"button",onClick:()=>a(!e),style:{position:"absolute",bottom:16,right:16,padding:"8px 16px",borderRadius:8,border:"1px solid #CFDAF7",background:"white",cursor:"pointer",fontFamily:"Mulish, sans-serif",fontSize:14,color:"#0D2976"},children:e?"Hide overlay":"Show overlay"})]})},o=()=>{const[e,a]=F.useState(!1);return n.jsxs("div",{style:{padding:24},children:[n.jsx("button",{type:"button",onClick:()=>{a(!0),setTimeout(()=>a(!1),3e3)},style:{padding:"8px 16px",borderRadius:8,border:"none",background:"#2358F8",cursor:"pointer",fontFamily:"Mulish, sans-serif",fontSize:14,color:"white"},children:"Trigger loading (3s)"}),n.jsx(S,{visible:e})]})},s=()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32,padding:24},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontFamily:"Mulish",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12},children:"Loading icon (32×32px, 8px dots)"}),n.jsx(r,{})]}),n.jsxs("div",{children:[n.jsx("div",{style:{fontFamily:"Mulish",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12},children:"In context (e.g. inside a row)"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",border:"1px solid #CFDAF7",borderRadius:8,width:"fit-content"},children:[n.jsx(r,{}),n.jsx("span",{style:{fontFamily:"Mulish",fontSize:14,color:"#5C6E9E"},children:"Loading results…"})]})]})]});i.__docgenInfo={description:"",methods:[],displayName:"Icon"};t.__docgenInfo={description:"",methods:[],displayName:"Overlay"};o.__docgenInfo={description:"",methods:[],displayName:"OverlayComponent"};s.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var d,c,p;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: 24
}}>
    <LoadingIcon />
    <span style={{
    fontFamily: "Mulish, sans-serif",
    fontSize: 14,
    color: "#0D2976"
  }}>
      Loading…
    </span>
  </div>`,...(p=(c=i.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var m,y,u;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  return <div style={{
    position: "relative",
    width: "100%",
    height: 400,
    background: "#E7EAF8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
      <p style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 14,
      color: "#0D2976"
    }}>
        Content behind the overlay
      </p>
      {visible && <div style={{
      position: "absolute",
      inset: 0,
      background: "rgba(248,249,253,0.75)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingTop: 80
    }}>
          {/* Dots at overlay size */}
          <div style={{
        display: "flex",
        gap: 16,
        alignItems: "center"
      }}>
            {[0, 1, 2].map(i => <span key={i} style={{
          display: "inline-block",
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: "#0C1457",
          animation: "bounce 1.4s ease-in-out infinite both",
          animationDelay: \`\${[-0.32, -0.16, 0][i]}s\`
        }} />)}
          </div>
        </div>}
      <style>{\`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      \`}</style>
      <button type="button" onClick={() => setVisible(!visible)} style={{
      position: "absolute",
      bottom: 16,
      right: 16,
      padding: "8px 16px",
      borderRadius: 8,
      border: "1px solid #CFDAF7",
      background: "white",
      cursor: "pointer",
      fontFamily: "Mulish, sans-serif",
      fontSize: 14,
      color: "#0D2976"
    }}>
        {visible ? "Hide overlay" : "Show overlay"}
      </button>
    </div>;
}`,...(u=(y=t.parameters)==null?void 0:y.docs)==null?void 0:u.source}}};var g,f,h;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const [show, setShow] = useState(false);
  return <div style={{
    padding: 24
  }}>
      <button type="button" onClick={() => {
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    }} style={{
      padding: "8px 16px",
      borderRadius: 8,
      border: "none",
      background: "#2358F8",
      cursor: "pointer",
      fontFamily: "Mulish, sans-serif",
      fontSize: 14,
      color: "white"
    }}>
        Trigger loading (3s)
      </button>
      <LoadingOverlay visible={show} />
    </div>;
}`,...(h=(f=o.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var x,b,v;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 32,
  padding: 24
}}>
    <div>
      <div style={{
      fontFamily: "Mulish",
      fontSize: 11,
      color: "#8F9ED1",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: 12
    }}>
        Loading icon (32×32px, 8px dots)
      </div>
      <LoadingIcon />
    </div>
    <div>
      <div style={{
      fontFamily: "Mulish",
      fontSize: 11,
      color: "#8F9ED1",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: 12
    }}>
        In context (e.g. inside a row)
      </div>
      <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 16px",
      border: "1px solid #CFDAF7",
      borderRadius: 8,
      width: "fit-content"
    }}>
        <LoadingIcon />
        <span style={{
        fontFamily: "Mulish",
        fontSize: 14,
        color: "#5C6E9E"
      }}>Loading results…</span>
      </div>
    </div>
  </div>`,...(v=(b=s.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};const E=["Icon","Overlay","OverlayComponent","AllVariants"];export{s as AllVariants,i as Icon,t as Overlay,o as OverlayComponent,E as __namedExportsOrder,k as default};
