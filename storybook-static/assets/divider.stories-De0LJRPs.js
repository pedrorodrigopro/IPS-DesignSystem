import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as E}from"./index-DhMLlvMY.js";import{D as n}from"./divider-CKitOyrn.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const L={title:"Components/Divider",component:n,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=2537-162703"}},argTypes:{orientation:{control:"select",options:["horizontal","vertical"]},type:{control:"select",options:["default","draggable"]}}},t=()=>e.jsxs("div",{style:{width:300,padding:16,background:"white"},children:[e.jsx("p",{style:{fontFamily:"Mulish",fontSize:14,color:"#0D2976",marginBottom:8},children:"Above"}),e.jsx(n,{orientation:"horizontal",margins:!1}),e.jsx("p",{style:{fontFamily:"Mulish",fontSize:14,color:"#0D2976",marginTop:8},children:"Below"})]}),o=()=>e.jsxs("div",{style:{width:300,padding:16,background:"white"},children:[e.jsx("p",{style:{fontFamily:"Mulish",fontSize:14,color:"#0D2976"},children:"Above"}),e.jsx(n,{orientation:"horizontal",margins:!0}),e.jsx("p",{style:{fontFamily:"Mulish",fontSize:14,color:"#0D2976"},children:"Below"})]}),a=()=>e.jsxs("div",{style:{display:"flex",height:80,padding:16,background:"white",alignItems:"stretch"},children:[e.jsx("span",{style:{fontFamily:"Mulish",fontSize:14,color:"#0D2976"},children:"Left"}),e.jsx(n,{orientation:"vertical",margins:!1}),e.jsx("span",{style:{fontFamily:"Mulish",fontSize:14,color:"#0D2976"},children:"Right"})]}),r=()=>e.jsxs("div",{style:{display:"flex",height:80,padding:16,background:"white",alignItems:"stretch"},children:[e.jsx("span",{style:{fontFamily:"Mulish",fontSize:14,color:"#0D2976"},children:"Left"}),e.jsx(n,{orientation:"vertical",margins:!0}),e.jsx("span",{style:{fontFamily:"Mulish",fontSize:14,color:"#0D2976"},children:"Right"})]}),s=()=>{const[d,c]=E.useState(!1);return e.jsxs("div",{style:{display:"flex",gap:32,alignItems:"center",padding:24,height:120,background:"white"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx(n,{type:"draggable"}),e.jsx("span",{style:{fontFamily:"Mulish",fontSize:11,color:"#8F9ED1"},children:"Default"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx(n,{type:"draggable",isHovered:d,onDragHandleMouseDown:()=>{},onMouseEnter:()=>c(!0),onMouseLeave:()=>c(!1)}),e.jsx("span",{style:{fontFamily:"Mulish",fontSize:11,color:"#8F9ED1"},children:"Hover (hover me)"})]})]})},l=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32,padding:24,background:"white"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontFamily:"Mulish",fontSize:11,color:"#8F9ED1",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700},children:"Horizontal"}),e.jsx("div",{style:{marginTop:8},children:e.jsx(n,{orientation:"horizontal",margins:!1})}),e.jsx("div",{style:{marginTop:16},children:e.jsx(n,{orientation:"horizontal",margins:!0})})]}),e.jsxs("div",{style:{display:"flex",gap:32,height:80,alignItems:"stretch"},children:[e.jsx("span",{style:{fontFamily:"Mulish",fontSize:11,color:"#8F9ED1",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700,alignSelf:"flex-start"},children:"Vertical"}),e.jsx(n,{orientation:"vertical",margins:!1}),e.jsx(n,{orientation:"vertical",margins:!0})]})]}),i=d=>e.jsx("div",{style:{width:300,height:80,padding:16,background:"white",display:"flex",alignItems:"center"},children:e.jsx(n,{...d})});i.args={orientation:"horizontal",margins:!1,type:"default"};t.__docgenInfo={description:"",methods:[],displayName:"HorizontalNoMargins"};o.__docgenInfo={description:"",methods:[],displayName:"HorizontalWithMargins"};a.__docgenInfo={description:"",methods:[],displayName:"VerticalNoMargins"};r.__docgenInfo={description:"",methods:[],displayName:"VerticalWithMargins"};s.__docgenInfo={description:"",methods:[],displayName:"Draggable"};l.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var p,g,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`() => <div style={{
  width: 300,
  padding: 16,
  background: "white"
}}>
    <p style={{
    fontFamily: "Mulish",
    fontSize: 14,
    color: "#0D2976",
    marginBottom: 8
  }}>Above</p>
    <Divider orientation="horizontal" margins={false} />
    <p style={{
    fontFamily: "Mulish",
    fontSize: 14,
    color: "#0D2976",
    marginTop: 8
  }}>Below</p>
  </div>`,...(m=(g=t.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var h,f,y;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`() => <div style={{
  width: 300,
  padding: 16,
  background: "white"
}}>
    <p style={{
    fontFamily: "Mulish",
    fontSize: 14,
    color: "#0D2976"
  }}>Above</p>
    <Divider orientation="horizontal" margins={true} />
    <p style={{
    fontFamily: "Mulish",
    fontSize: 14,
    color: "#0D2976"
  }}>Below</p>
  </div>`,...(y=(f=o.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var u,v,x;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  height: 80,
  padding: 16,
  background: "white",
  alignItems: "stretch"
}}>
    <span style={{
    fontFamily: "Mulish",
    fontSize: 14,
    color: "#0D2976"
  }}>Left</span>
    <Divider orientation="vertical" margins={false} />
    <span style={{
    fontFamily: "Mulish",
    fontSize: 14,
    color: "#0D2976"
  }}>Right</span>
  </div>`,...(x=(v=a.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var D,z,M;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  height: 80,
  padding: 16,
  background: "white",
  alignItems: "stretch"
}}>
    <span style={{
    fontFamily: "Mulish",
    fontSize: 14,
    color: "#0D2976"
  }}>Left</span>
    <Divider orientation="vertical" margins={true} />
    <span style={{
    fontFamily: "Mulish",
    fontSize: 14,
    color: "#0D2976"
  }}>Right</span>
  </div>`,...(M=(z=r.parameters)==null?void 0:z.docs)==null?void 0:M.source}}};var j,S,F;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const [hovered, setHovered] = useState(false);
  return <div style={{
    display: "flex",
    gap: 32,
    alignItems: "center",
    padding: 24,
    height: 120,
    background: "white"
  }}>
      <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8
    }}>
        <Divider type="draggable" />
        <span style={{
        fontFamily: "Mulish",
        fontSize: 11,
        color: "#8F9ED1"
      }}>Default</span>
      </div>
      <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8
    }}>
        <Divider type="draggable" isHovered={hovered} onDragHandleMouseDown={() => {}} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} />
        <span style={{
        fontFamily: "Mulish",
        fontSize: 11,
        color: "#8F9ED1"
      }}>Hover (hover me)</span>
      </div>
    </div>;
}`,...(F=(S=s.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var w,b,I;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 32,
  padding: 24,
  background: "white"
}}>
    <div>
      <span style={{
      fontFamily: "Mulish",
      fontSize: 11,
      color: "#8F9ED1",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      fontWeight: 700
    }}>Horizontal</span>
      <div style={{
      marginTop: 8
    }}><Divider orientation="horizontal" margins={false} /></div>
      <div style={{
      marginTop: 16
    }}><Divider orientation="horizontal" margins={true} /></div>
    </div>
    <div style={{
    display: "flex",
    gap: 32,
    height: 80,
    alignItems: "stretch"
  }}>
      <span style={{
      fontFamily: "Mulish",
      fontSize: 11,
      color: "#8F9ED1",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      fontWeight: 700,
      alignSelf: "flex-start"
    }}>Vertical</span>
      <Divider orientation="vertical" margins={false} />
      <Divider orientation="vertical" margins={true} />
    </div>
  </div>`,...(I=(b=l.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var H,_,k;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`args => <div style={{
  width: 300,
  height: 80,
  padding: 16,
  background: "white",
  display: "flex",
  alignItems: "center"
}}>
    <Divider {...args} />
  </div>`,...(k=(_=i.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};const B=["HorizontalNoMargins","HorizontalWithMargins","VerticalNoMargins","VerticalWithMargins","Draggable","AllVariants","Default"];export{l as AllVariants,i as Default,s as Draggable,t as HorizontalNoMargins,o as HorizontalWithMargins,a as VerticalNoMargins,r as VerticalWithMargins,B as __namedExportsOrder,L as default};
