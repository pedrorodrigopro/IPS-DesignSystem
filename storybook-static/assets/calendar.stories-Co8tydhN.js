import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-DhMLlvMY.js";import{C as d}from"./calendar-D_2r3jEC.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-A4JB3O0c.js";const V={title:"Components/Calendar",component:d,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=3506-209189"},layout:"centered"},argTypes:{type:{control:"select",options:["date","range","date-time"]}}},s=()=>{const[t,a]=l.useState(new globalThis.Date(2023,0,4));return e.jsx(d,{type:"date",value:t,onChange:a})},r=()=>{const[t,a]=l.useState(new globalThis.Date(2023,0,8)),[c,u]=l.useState(new globalThis.Date(2023,0,11));return e.jsx(d,{type:"range",rangeStart:t,rangeEnd:c,onRangeChange:(M,I)=>{a(M),u(I)}})},o=()=>{const[t,a]=l.useState(new globalThis.Date(2023,0,8)),[c,u]=l.useState("00:00");return e.jsx(d,{type:"date-time",value:t,timeValue:c,onChange:a,onTimeChange:u})},i=()=>e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",padding:16},children:[e.jsx("button",{style:{width:36,height:36,borderRadius:9999,border:"none",background:"transparent",fontFamily:"Mulish, sans-serif",fontSize:14,fontWeight:400,color:"#5C6E9E",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:"M"}),e.jsx("button",{style:{width:36,height:36,borderRadius:9999,border:"none",background:"rgba(0,0,0,0.04)",fontFamily:"Mulish, sans-serif",fontSize:14,fontWeight:400,color:"#5C6E9E",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:"M"}),e.jsx("button",{style:{width:36,height:36,borderRadius:9999,border:"none",background:"transparent",fontFamily:"Mulish, sans-serif",fontSize:14,fontWeight:400,color:"#5C6E9E",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 4px rgba(12,20,87,1), 0 0 0 2px white"},children:"M"}),e.jsx("button",{style:{width:36,height:36,borderRadius:9999,border:"none",background:"#0C1457",fontFamily:"Mulish, sans-serif",fontSize:14,fontWeight:700,color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:"M"})]}),n=t=>e.jsx(d,{...t});n.args={type:"date"};s.__docgenInfo={description:"",methods:[],displayName:"Date"};r.__docgenInfo={description:"",methods:[],displayName:"Range"};o.__docgenInfo={description:"",methods:[],displayName:"DateAndTime"};i.__docgenInfo={description:"",methods:[],displayName:"DayStates"};n.__docgenInfo={description:"",methods:[],displayName:"Default"};var g,p,m;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 4));
  return <Calendar type="date" value={value} onChange={setValue} />;
}`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var h,f,y;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [start, setStart] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 8));
  const [end, setEnd] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 11));
  return <Calendar type="range" rangeStart={start} rangeEnd={end} onRangeChange={(s, e) => {
    setStart(s);
    setEnd(e);
  }} />;
}`,...(y=(f=r.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var b,S,C;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 8));
  const [time, setTime] = useState("00:00");
  return <Calendar type="date-time" value={value} timeValue={time} onChange={setValue} onTimeChange={setTime} />;
}`,...(C=(S=o.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var x,D,w;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  gap: 8,
  alignItems: "center",
  padding: 16
}}>
    {/* Default */}
    <button style={{
    width: 36,
    height: 36,
    borderRadius: 9999,
    border: "none",
    background: "transparent",
    fontFamily: "Mulish, sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: "#5C6E9E",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>M</button>
    {/* Hover */}
    <button style={{
    width: 36,
    height: 36,
    borderRadius: 9999,
    border: "none",
    background: "rgba(0,0,0,0.04)",
    fontFamily: "Mulish, sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: "#5C6E9E",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>M</button>
    {/* Focus */}
    <button style={{
    width: 36,
    height: 36,
    borderRadius: 9999,
    border: "none",
    background: "transparent",
    fontFamily: "Mulish, sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: "#5C6E9E",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 4px rgba(12,20,87,1), 0 0 0 2px white"
  }}>M</button>
    {/* Selected */}
    <button style={{
    width: 36,
    height: 36,
    borderRadius: 9999,
    border: "none",
    background: "#0C1457",
    fontFamily: "Mulish, sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>M</button>
  </div>`,...(w=(D=i.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};var E,T,j;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:"args => <Calendar {...args} />",...(j=(T=n.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};const W=["Date","Range","DateAndTime","DayStates","Default"];export{s as Date,o as DateAndTime,i as DayStates,n as Default,r as Range,W as __namedExportsOrder,V as default};
