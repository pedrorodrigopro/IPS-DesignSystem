import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./index-DhMLlvMY.js";import{P as a}from"./pagination-BUWtJv1M.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const b={title:"Components/Pagination",component:a,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=14220-3895"},layout:"centered"},argTypes:{size:{control:"select",options:["regular","small"]}}},r=()=>{const[n,s]=c.useState(1);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,alignItems:"center"},children:[e.jsx(a,{size:"regular",total:10,current:n,onChange:s}),e.jsxs("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E"},children:["Page ",n," of 10"]})]})},o=()=>{const[n,s]=c.useState(1);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,alignItems:"center"},children:[e.jsx(a,{size:"small",total:10,current:n,onChange:s}),e.jsxs("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E"},children:["Page ",n," of 10"]})]})},i=()=>{const[n,s]=c.useState(1);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,alignItems:"center",padding:24},children:[e.jsxs("div",{children:[e.jsx(g,{children:"Regular (big) — padding 8px 12px"}),e.jsx(a,{size:"regular",total:10,current:n,onChange:s})]}),e.jsxs("div",{children:[e.jsx(g,{children:"Small — padding 0 12px"}),e.jsx(a,{size:"small",total:10,current:n,onChange:s})]})]})},l=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,alignItems:"center"},children:[e.jsx(a,{size:"regular",total:10,current:5,onChange:()=>{}}),e.jsx(a,{size:"small",total:10,current:5,onChange:()=>{}})]}),g=({children:n})=>e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:n}),t=n=>e.jsx(a,{...n});t.args={size:"regular",total:10,current:1};r.__docgenInfo={description:"",methods:[],displayName:"Regular"};o.__docgenInfo={description:"",methods:[],displayName:"Small"};i.__docgenInfo={description:"",methods:[],displayName:"BothSizes"};l.__docgenInfo={description:"",methods:[],displayName:"MidPage"};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var d,p,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const [page, setPage] = useState(1);
  return <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center"
  }}>
      <Pagination size="regular" total={10} current={page} onChange={setPage} />
      <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "#5C6E9E"
    }}>
        Page {page} of 10
      </span>
    </div>;
}`,...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,f,x;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const [page, setPage] = useState(1);
  return <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center"
  }}>
      <Pagination size="small" total={10} current={page} onChange={setPage} />
      <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "#5C6E9E"
    }}>
        Page {page} of 10
      </span>
    </div>;
}`,...(x=(f=o.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var h,y,P;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [page, setPage] = useState(1);
  return <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 24,
    alignItems: "center",
    padding: 24
  }}>
      <div>
        <Label>Regular (big) — padding 8px 12px</Label>
        <Pagination size="regular" total={10} current={page} onChange={setPage} />
      </div>
      <div>
        <Label>Small — padding 0 12px</Label>
        <Pagination size="small" total={10} current={page} onChange={setPage} />
      </div>
    </div>;
}`,...(P=(y=i.parameters)==null?void 0:y.docs)==null?void 0:P.source}}};var S,z,j;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 16,
  alignItems: "center"
}}>
    <Pagination size="regular" total={10} current={5} onChange={() => {}} />
    <Pagination size="small" total={10} current={5} onChange={() => {}} />
  </div>`,...(j=(z=l.parameters)==null?void 0:z.docs)==null?void 0:j.source}}};var v,C,D;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:"args => <Pagination {...args} />",...(D=(C=t.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const R=["Regular","Small","BothSizes","MidPage","Default"];export{i as BothSizes,t as Default,l as MidPage,r as Regular,o as Small,R as __namedExportsOrder,b as default};
