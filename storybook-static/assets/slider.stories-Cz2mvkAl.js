import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as a}from"./index-DhMLlvMY.js";import{S as f,a as C,b as T}from"./slider-BLxsdj5C.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const E={title:"Components/Slider",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=7165-336045"},layout:"centered"}},s=()=>{const[n,t]=a.useState(3),[m,i]=a.useState(5);return e.jsx("div",{style:{width:528,padding:24},children:e.jsx(f,{label:"Show a range",valueFrom:n,valueTo:m,min:0,max:24,minLabel:"0h",maxLabel:"24h",onChangeFrom:t,onChangeTo:i})})},r=()=>{const[n,t]=a.useState(3);return e.jsx("div",{style:{width:528,padding:24},children:e.jsx(C,{label:"Show a number",value:n,min:0,max:12,onChange:t})})},o=()=>{const[n,t]=a.useState(30);return e.jsx("div",{style:{width:528,padding:24},children:e.jsx(T,{label:"Show a stepped percentage steps *1",value:n,step:1,onChange:t})})},l=()=>{const[n,t]=a.useState(3),[m,i]=a.useState(5),[y,R]=a.useState(3),[j,N]=a.useState(30);return e.jsxs("div",{style:{width:528,display:"flex",flexDirection:"column",gap:32,padding:24},children:[e.jsx(f,{label:"Show a range",valueFrom:n,valueTo:m,min:0,max:24,minLabel:"0h",maxLabel:"24h",onChangeFrom:t,onChangeTo:i}),e.jsx(C,{label:"Show a number",value:y,min:0,max:12,onChange:R}),e.jsx(T,{label:"Show a stepped percentage steps *1",value:j,onChange:N})]})};s.__docgenInfo={description:"",methods:[],displayName:"Range"};r.__docgenInfo={description:"",methods:[],displayName:"Number"};o.__docgenInfo={description:"",methods:[],displayName:"Percentage"};l.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var d,u,c;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const [from, setFrom] = useState(3);
  const [to, setTo] = useState(5);
  return <div style={{
    width: 528,
    padding: 24
  }}>
      <SliderRange label="Show a range" valueFrom={from} valueTo={to} min={0} max={24} minLabel="0h" maxLabel="24h" onChangeFrom={setFrom} onChangeTo={setTo} />
    </div>;
}`,...(c=(u=s.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var g,p,h;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(3);
  return <div style={{
    width: 528,
    padding: 24
  }}>
      <SliderNumber label="Show a number" value={value} min={0} max={12} onChange={setValue} />
    </div>;
}`,...(h=(p=r.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var S,v,b;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(30);
  return <div style={{
    width: 528,
    padding: 24
  }}>
      <SliderPercentage label="Show a stepped percentage steps *1" value={value} step={1} onChange={setValue} />
    </div>;
}`,...(b=(v=o.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var x,w,F;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const [rangeFrom, setRangeFrom] = useState(3);
  const [rangeTo, setRangeTo] = useState(5);
  const [num, setNum] = useState(3);
  const [pct, setPct] = useState(30);
  return <div style={{
    width: 528,
    display: "flex",
    flexDirection: "column",
    gap: 32,
    padding: 24
  }}>
      <SliderRange label="Show a range" valueFrom={rangeFrom} valueTo={rangeTo} min={0} max={24} minLabel="0h" maxLabel="24h" onChangeFrom={setRangeFrom} onChangeTo={setRangeTo} />
      <SliderNumber label="Show a number" value={num} min={0} max={12} onChange={setNum} />
      <SliderPercentage label="Show a stepped percentage steps *1" value={pct} onChange={setPct} />
    </div>;
}`,...(F=(w=l.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};const I=["Range","Number","Percentage","AllVariants"];export{l as AllVariants,r as Number,o as Percentage,s as Range,I as __namedExportsOrder,E as default};
