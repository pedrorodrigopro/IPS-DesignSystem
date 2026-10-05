import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as y}from"./index-DhMLlvMY.js";import{P as i,a as s}from"./progress_bar-B-7krBRw.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const Q={title:"Components/Progress Bar",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1615-51769"},layout:"centered"}},t=({label:a,children:n})=>e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6},children:a}),n]}),r=()=>e.jsx("div",{style:{width:300,display:"flex",flexDirection:"column",gap:12,padding:16},children:[0,10,20,30,40,50,60,70,80,90,100].map(a=>e.jsx(i,{value:a,showLabel:!0},a))}),o=()=>e.jsx("div",{style:{width:300,display:"flex",flexDirection:"column",gap:12,padding:16},children:e.jsx(t,{label:"Semantic colours (0–100%)",children:[0,10,33,34,50,66,67,85,99,100].map(a=>e.jsx("div",{style:{marginBottom:8},children:e.jsx(i,{value:a,showLabel:!0,semantic:!0})},a))})}),d=()=>{const[a,n]=y.useState(50);return e.jsxs("div",{style:{width:320,padding:24},children:[e.jsx(i,{value:a,showLabel:!0}),e.jsx("input",{type:"range",min:0,max:100,value:a,onChange:l=>n(Number(l.target.value)),style:{width:"100%",marginTop:16}}),e.jsxs("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",textAlign:"center",marginTop:4},children:[a,"%"]})]})},c=()=>{const[a,n]=y.useState(50);return e.jsxs("div",{style:{width:320,padding:24},children:[e.jsx(i,{value:a,showLabel:!0,semantic:!0}),e.jsx("input",{type:"range",min:0,max:100,value:a,onChange:l=>n(Number(l.target.value)),style:{width:"100%",marginTop:16}}),e.jsxs("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",textAlign:"center",marginTop:4},children:[a,"%"]})]})},p=()=>e.jsx("div",{style:{display:"flex",gap:16,alignItems:"center",padding:16},children:[0,25,50,75,100].map(a=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[e.jsx(s,{value:a}),e.jsxs("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1"},children:[a,"%"]})]},a))}),m=()=>e.jsx("div",{style:{display:"flex",gap:16,alignItems:"center",padding:16},children:[0,25,50,75,100].map(a=>e.jsx(s,{value:a,showLabel:!0,size:56},a))}),u=()=>e.jsx("div",{style:{display:"flex",gap:16,alignItems:"center",padding:16},children:[0,20,50,80,100].map(a=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[e.jsx(s,{value:a,semantic:!0,showLabel:!0,size:56}),e.jsxs("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1"},children:[a,"%"]})]},a))}),g=()=>{const[a,n]=y.useState(50);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:24},children:[e.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[e.jsx(s,{value:a,showLabel:!0,size:56}),e.jsx(s,{value:a,showLabel:!0,size:56,semantic:!0})]}),e.jsx("input",{type:"range",min:0,max:100,value:a,onChange:l=>n(Number(l.target.value)),style:{width:200}}),e.jsxs("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E"},children:[a,"%"]})]})},v=()=>e.jsxs("div",{style:{padding:24,display:"flex",flexDirection:"column",gap:32},children:[e.jsx(t,{label:"Linear — default colour",children:e.jsx("div",{style:{width:300,display:"flex",flexDirection:"column",gap:10},children:[0,25,50,75,100].map(a=>e.jsx(i,{value:a,showLabel:!0},a))})}),e.jsx(t,{label:"Linear — semantic colours",children:e.jsx("div",{style:{width:300,display:"flex",flexDirection:"column",gap:10},children:[0,25,50,75,100].map(a=>e.jsx(i,{value:a,showLabel:!0,semantic:!0},a))})}),e.jsx(t,{label:"Radial — default colour",children:e.jsx("div",{style:{display:"flex",gap:16},children:[0,25,50,75,100].map(a=>e.jsx(s,{value:a},a))})}),e.jsx(t,{label:"Radial — semantic colours",children:e.jsx("div",{style:{display:"flex",gap:16},children:[0,25,50,75,100].map(a=>e.jsx(s,{value:a,semantic:!0},a))})})]});r.__docgenInfo={description:"",methods:[],displayName:"LinearDefault"};o.__docgenInfo={description:"",methods:[],displayName:"LinearSemantic"};d.__docgenInfo={description:"",methods:[],displayName:"LinearInteractive"};c.__docgenInfo={description:"",methods:[],displayName:"LinearSemanticInteractive"};p.__docgenInfo={description:"",methods:[],displayName:"RadialDefault"};m.__docgenInfo={description:"",methods:[],displayName:"RadialWithLabel"};u.__docgenInfo={description:"",methods:[],displayName:"RadialSemantic"};g.__docgenInfo={description:"",methods:[],displayName:"RadialInteractive"};v.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var x,f,h;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`() => <div style={{
  width: 300,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 16
}}>
    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(v => <ProgressLinear key={v} value={v} showLabel />)}
  </div>`,...(h=(f=r.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var w,j,L;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`() => <div style={{
  width: 300,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 16
}}>
    <Row label="Semantic colours (0–100%)">
      {[0, 10, 33, 34, 50, 66, 67, 85, 99, 100].map(v => <div key={v} style={{
      marginBottom: 8
    }}>
          <ProgressLinear value={v} showLabel semantic />
        </div>)}
    </Row>
  </div>`,...(L=(j=o.parameters)==null?void 0:j.docs)==null?void 0:L.source}}};var b,S,R;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(50);
  return <div style={{
    width: 320,
    padding: 24
  }}>
      <ProgressLinear value={value} showLabel />
      <input type="range" min={0} max={100} value={value} onChange={e => setValue(Number(e.target.value))} style={{
      width: "100%",
      marginTop: 16
    }} />
      <div style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "#5C6E9E",
      textAlign: "center",
      marginTop: 4
    }}>{value}%</div>
    </div>;
}`,...(R=(S=d.parameters)==null?void 0:S.docs)==null?void 0:R.source}}};var I,D,_;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(50);
  return <div style={{
    width: 320,
    padding: 24
  }}>
      <ProgressLinear value={value} showLabel semantic />
      <input type="range" min={0} max={100} value={value} onChange={e => setValue(Number(e.target.value))} style={{
      width: "100%",
      marginTop: 16
    }} />
      <div style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "#5C6E9E",
      textAlign: "center",
      marginTop: 4
    }}>{value}%</div>
    </div>;
}`,...(_=(D=c.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};var E,z,F;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  gap: 16,
  alignItems: "center",
  padding: 16
}}>
    {[0, 25, 50, 75, 100].map(v => <div key={v} style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6
  }}>
        <ProgressRadial value={v} />
        <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 11,
      color: "#8F9ED1"
    }}>{v}%</span>
      </div>)}
  </div>`,...(F=(z=p.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};var P,N,C;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  gap: 16,
  alignItems: "center",
  padding: 16
}}>
    {[0, 25, 50, 75, 100].map(v => <ProgressRadial key={v} value={v} showLabel size={56} />)}
  </div>`,...(C=(N=m.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};var V,M,k;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  gap: 16,
  alignItems: "center",
  padding: 16
}}>
    {[0, 20, 50, 80, 100].map(v => <div key={v} style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6
  }}>
        <ProgressRadial value={v} semantic showLabel size={56} />
        <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 11,
      color: "#8F9ED1"
    }}>{v}%</span>
      </div>)}
  </div>`,...(k=(M=u.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var T,A,B;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(50);
  return <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    padding: 24
  }}>
      <div style={{
      display: "flex",
      gap: 24,
      alignItems: "center"
    }}>
        <ProgressRadial value={value} showLabel size={56} />
        <ProgressRadial value={value} showLabel size={56} semantic />
      </div>
      <input type="range" min={0} max={100} value={value} onChange={e => setValue(Number(e.target.value))} style={{
      width: 200
    }} />
      <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "#5C6E9E"
    }}>{value}%</span>
    </div>;
}`,...(B=(A=g.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var W,K,O;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  display: "flex",
  flexDirection: "column",
  gap: 32
}}>
    <Row label="Linear — default colour">
      <div style={{
      width: 300,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }}>
        {[0, 25, 50, 75, 100].map(v => <ProgressLinear key={v} value={v} showLabel />)}
      </div>
    </Row>
    <Row label="Linear — semantic colours">
      <div style={{
      width: 300,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }}>
        {[0, 25, 50, 75, 100].map(v => <ProgressLinear key={v} value={v} showLabel semantic />)}
      </div>
    </Row>
    <Row label="Radial — default colour">
      <div style={{
      display: "flex",
      gap: 16
    }}>
        {[0, 25, 50, 75, 100].map(v => <ProgressRadial key={v} value={v} />)}
      </div>
    </Row>
    <Row label="Radial — semantic colours">
      <div style={{
      display: "flex",
      gap: 16
    }}>
        {[0, 25, 50, 75, 100].map(v => <ProgressRadial key={v} value={v} semantic />)}
      </div>
    </Row>
  </div>`,...(O=(K=v.parameters)==null?void 0:K.docs)==null?void 0:O.source}}};const U=["LinearDefault","LinearSemantic","LinearInteractive","LinearSemanticInteractive","RadialDefault","RadialWithLabel","RadialSemantic","RadialInteractive","AllVariants"];export{v as AllVariants,r as LinearDefault,d as LinearInteractive,o as LinearSemantic,c as LinearSemanticInteractive,p as RadialDefault,g as RadialInteractive,u as RadialSemantic,m as RadialWithLabel,U as __namedExportsOrder,Q as default};
