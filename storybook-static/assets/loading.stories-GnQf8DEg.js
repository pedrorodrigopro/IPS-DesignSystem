import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as F}from"./index-DhMLlvMY.js";import{c as t}from"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";const I="_dots_1gl4z_11",w="_dots_overlay_1gl4z_16",C="_dots_icon_1gl4z_20",D="_dot_1gl4z_11",k="_bounce_1gl4z_1",L="_dot1_1gl4z_39",E="_dot2_1gl4z_43",N="_dot3_1gl4z_47",M="_overlay_1gl4z_51",T="_iconWrapper_1gl4z_62",o={dots:I,dots_overlay:w,dots_icon:C,dot:D,bounce:k,dot1:L,dot2:E,dot3:N,overlay:M,iconWrapper:T},S=({size:e="overlay"})=>n.jsxs("div",{className:t(o.dots,o[`dots_${e}`]),"aria-label":"Loading",role:"status",children:[n.jsx("span",{className:t(o.dot,o.dot1)}),n.jsx("span",{className:t(o.dot,o.dot2)}),n.jsx("span",{className:t(o.dot,o.dot3)})]}),z=({visible:e=!0,className:s})=>e?n.jsx("div",{className:t(o.overlay,s),"aria-live":"polite",children:n.jsx(S,{size:"overlay"})}):null,d=({className:e})=>n.jsx("div",{className:t(o.iconWrapper,e),"aria-label":"Loading",role:"status",children:n.jsx(S,{size:"icon"})});z.__docgenInfo={description:"",methods:[],displayName:"LoadingOverlay",props:{visible:{required:!1,tsType:{name:"boolean"},description:"Whether the overlay is visible",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};d.__docgenInfo={description:"",methods:[],displayName:"LoadingIcon",props:{className:{required:!1,tsType:{name:"string"},description:""}}};const V={title:"Components/Loading",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1890-123451"}}},i=()=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,padding:24},children:[n.jsx(d,{}),n.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#0D2976"},children:"Loading…"})]}),a=()=>{const[e,s]=F.useState(!0);return n.jsxs("div",{style:{position:"relative",width:"100%",height:400,background:"#E7EAF8",display:"flex",alignItems:"center",justifyContent:"center"},children:[n.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#0D2976"},children:"Content behind the overlay"}),e&&n.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(248,249,253,0.75)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:80},children:n.jsx("div",{style:{display:"flex",gap:16,alignItems:"center"},children:[0,1,2].map(c=>n.jsx("span",{style:{display:"inline-block",width:24,height:24,borderRadius:"50%",backgroundColor:"#0C1457",animation:"bounce 1.4s ease-in-out infinite both",animationDelay:`${[-.32,-.16,0][c]}s`}},c))})}),n.jsx("style",{children:`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}),n.jsx("button",{type:"button",onClick:()=>s(!e),style:{position:"absolute",bottom:16,right:16,padding:"8px 16px",borderRadius:8,border:"1px solid #CFDAF7",background:"white",cursor:"pointer",fontFamily:"Mulish, sans-serif",fontSize:14,color:"#0D2976"},children:e?"Hide overlay":"Show overlay"})]})},r=()=>{const[e,s]=F.useState(!1);return n.jsxs("div",{style:{padding:24},children:[n.jsx("button",{type:"button",onClick:()=>{s(!0),setTimeout(()=>s(!1),3e3)},style:{padding:"8px 16px",borderRadius:8,border:"none",background:"#2358F8",cursor:"pointer",fontFamily:"Mulish, sans-serif",fontSize:14,color:"white"},children:"Trigger loading (3s)"}),n.jsx(z,{visible:e})]})},l=()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32,padding:24},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontFamily:"Mulish",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12},children:"Loading icon (32×32px, 8px dots)"}),n.jsx(d,{})]}),n.jsxs("div",{children:[n.jsx("div",{style:{fontFamily:"Mulish",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12},children:"In context (e.g. inside a row)"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",border:"1px solid #CFDAF7",borderRadius:8,width:"fit-content"},children:[n.jsx(d,{}),n.jsx("span",{style:{fontFamily:"Mulish",fontSize:14,color:"#5C6E9E"},children:"Loading results…"})]})]})]});i.__docgenInfo={description:"",methods:[],displayName:"Icon"};a.__docgenInfo={description:"",methods:[],displayName:"Overlay"};r.__docgenInfo={description:"",methods:[],displayName:"OverlayComponent"};l.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var p,m,g;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(g=(m=i.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var u,y,f;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
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
}`,...(f=(y=a.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var h,x,v;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
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
}`,...(v=(x=r.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var b,_,j;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(j=(_=l.parameters)==null?void 0:_.docs)==null?void 0:j.source}}};const B=["Icon","Overlay","OverlayComponent","AllVariants"];export{l as AllVariants,i as Icon,a as Overlay,r as OverlayComponent,B as __namedExportsOrder,V as default};
