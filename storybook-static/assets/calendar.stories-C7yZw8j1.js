import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-DhMLlvMY.js";import{c as K}from"./index-Dd5QUkq_.js";import{I as E}from"./icon-D1UQke6Y.js";import"./_commonjsHelpers-CqkleIqs.js";const U="_calendar_15tep_1",X="_header_15tep_12",Z="_headerInputs_15tep_20",ee="_headerSelect_15tep_26",te="_headerNav_15tep_46",ne="_navBtn_15tep_51",ae="_weekdays_15tep_72",se="_weekday_15tep_72",re="_grid_15tep_94",oe="_week_15tep_72",ie="_day_15tep_107",le="_daySelected_15tep_125",de="_dayRangeStart_15tep_125",ce="_dayRangeMid_15tep_125",ue="_dayRangeEnd_15tep_125",me="_dayOtherMonth_15tep_133",pe="_timeRow_15tep_184",he="_timeInput_15tep_191",s={calendar:U,header:X,headerInputs:Z,headerSelect:ee,headerNav:te,navBtn:ne,weekdays:ae,weekday:se,grid:re,week:oe,day:ie,daySelected:le,dayRangeStart:de,dayRangeMid:ce,dayRangeEnd:ue,dayOtherMonth:me,timeRow:pe,timeInput:he},ye=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],ge=["January","February","March","April","May","June","July","August","September","October","November","December"];function fe(a,n){const r=[],c=(new Date(a,n,1).getDay()+6)%7;for(let i=-c;i<42-c;i++)r.push(new Date(a,n,1+i));return r}function T(a,n){return!a||!n?!1:a.getFullYear()===n.getFullYear()&&a.getMonth()===n.getMonth()&&a.getDate()===n.getDate()}function _e(a,n,r){if(!n||!r)return!1;const o=a.getTime();return o>n.getTime()&&o<r.getTime()}const be=({date:a,currentMonth:n,selected:r,rangeStart:o,rangeEnd:c,inRange:i,onClick:l,isRange:m})=>{const M=a.getMonth()===n,p=r||o||c;return t.jsx("button",{type:"button",className:K(s.day,{[s.dayOtherMonth]:!M,[s.daySelected]:p,[s.dayInRange]:i&&m,[s.dayRangeStart]:o&&m,[s.dayRangeEnd]:c&&m,[s.dayRangeMid]:i&&!o&&!c&&m}),onClick:l,"aria-label":a.toDateString(),"aria-pressed":p,children:a.getDate().toString().padStart(2,"0")})},f=({type:a="date",value:n,rangeStart:r,rangeEnd:o,timeValue:c="00:00",onChange:i,onRangeChange:l,onTimeChange:m,className:M})=>{const p=new Date,[_,h]=u.useState((n??r??p).getMonth()),[N,x]=u.useState((n??r??p).getFullYear()),j=u.useRef("start");u.useEffect(()=>{n&&(h(n.getMonth()),x(n.getFullYear()))},[n]);const L=fe(N,_),P=()=>{_===0?(h(11),x(e=>e-1)):h(e=>e-1)},$=()=>{_===11?(h(0),x(e=>e+1)):h(e=>e+1)},G=e=>{if(a==="range")if(j.current==="start"||!r)l==null||l(e,null),j.current="end";else{const d=r;e<d?l==null||l(e,d):l==null||l(d,e),j.current="start"}else i==null||i(e)},b=a==="range";return t.jsxs("div",{className:K(s.calendar,M),children:[t.jsxs("div",{className:s.header,children:[t.jsxs("div",{className:s.headerInputs,children:[t.jsx("select",{className:s.headerSelect,value:_,onChange:e=>h(Number(e.target.value)),"aria-label":"Month",children:ge.map((e,d)=>t.jsx("option",{value:d,children:e},e))}),t.jsx("select",{className:s.headerSelect,value:N,onChange:e=>x(Number(e.target.value)),"aria-label":"Year",children:Array.from({length:20},(e,d)=>p.getFullYear()-5+d).map(e=>t.jsx("option",{value:e,children:e},e))})]}),t.jsxs("div",{className:s.headerNav,children:[t.jsx("button",{type:"button",className:s.navBtn,onClick:P,"aria-label":"Previous month",children:t.jsx(E,{name:"chevron-left",size:16})}),t.jsx("button",{type:"button",className:s.navBtn,onClick:$,"aria-label":"Next month",children:t.jsx(E,{name:"chevron-right",size:16})})]})]}),t.jsx("div",{className:s.weekdays,children:ye.map(e=>t.jsx("div",{className:s.weekday,children:e},e))}),t.jsx("div",{className:s.grid,children:Array.from({length:6},(e,d)=>t.jsx("div",{className:s.week,children:L.slice(d*7,d*7+7).map((y,Q)=>t.jsx(be,{date:y,currentMonth:_,selected:!b&&T(y,n),rangeStart:b&&T(y,r),rangeEnd:b&&T(y,o),inRange:b&&_e(y,r,o),onClick:()=>G(y),isRange:b},Q))},d))}),a==="date-time"&&t.jsx("div",{className:s.timeRow,children:t.jsx("input",{type:"time",className:s.timeInput,value:c,onChange:e=>m==null?void 0:m(e.target.value),"aria-label":"Time"})})]})};f.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{type:{required:!1,tsType:{name:"union",raw:'"date" | "range" | "date-time"',elements:[{name:"literal",value:'"date"'},{name:"literal",value:'"range"'},{name:"literal",value:'"date-time"'}]},description:"",defaultValue:{value:'"date"',computed:!1}},value:{required:!1,tsType:{name:"union",raw:"Date | null",elements:[{name:"Date"},{name:"null"}]},description:"Controlled selected date (date type)"},rangeStart:{required:!1,tsType:{name:"union",raw:"Date | null",elements:[{name:"Date"},{name:"null"}]},description:"Controlled range (range type)"},rangeEnd:{required:!1,tsType:{name:"union",raw:"Date | null",elements:[{name:"Date"},{name:"null"}]},description:""},timeValue:{required:!1,tsType:{name:"string"},description:'Time value string "HH:MM" (date-time type)',defaultValue:{value:'"00:00"',computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: Date) => void",signature:{arguments:[{type:{name:"Date"},name:"date"}],return:{name:"void"}}},description:""},onRangeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(start: Date | null, end: Date | null) => void",signature:{arguments:[{type:{name:"union",raw:"Date | null",elements:[{name:"Date"},{name:"null"}]},name:"start"},{type:{name:"union",raw:"Date | null",elements:[{name:"Date"},{name:"null"}]},name:"end"}],return:{name:"void"}}},description:""},onTimeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(time: string) => void",signature:{arguments:[{type:{name:"string"},name:"time"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const Me={title:"Components/Calendar",component:f,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=3506-209189"},layout:"centered"},argTypes:{type:{control:"select",options:["date","range","date-time"]}}},w=()=>{const[a,n]=u.useState(new globalThis.Date(2023,0,4));return t.jsx(f,{type:"date",value:a,onChange:n})},D=()=>{const[a,n]=u.useState(new globalThis.Date(2023,0,8)),[r,o]=u.useState(new globalThis.Date(2023,0,11));return t.jsx(f,{type:"range",rangeStart:a,rangeEnd:r,onRangeChange:(c,i)=>{n(c),o(i)}})},S=()=>{const[a,n]=u.useState(new globalThis.Date(2023,0,8)),[r,o]=u.useState("00:00");return t.jsx(f,{type:"date-time",value:a,timeValue:r,onChange:n,onTimeChange:o})},v=()=>t.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",padding:16},children:[t.jsx("button",{style:{width:36,height:36,borderRadius:9999,border:"none",background:"transparent",fontFamily:"Mulish, sans-serif",fontSize:14,fontWeight:400,color:"#5C6E9E",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:"M"}),t.jsx("button",{style:{width:36,height:36,borderRadius:9999,border:"none",background:"rgba(0,0,0,0.04)",fontFamily:"Mulish, sans-serif",fontSize:14,fontWeight:400,color:"#5C6E9E",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:"M"}),t.jsx("button",{style:{width:36,height:36,borderRadius:9999,border:"none",background:"transparent",fontFamily:"Mulish, sans-serif",fontSize:14,fontWeight:400,color:"#5C6E9E",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 4px rgba(12,20,87,1), 0 0 0 2px white"},children:"M"}),t.jsx("button",{style:{width:36,height:36,borderRadius:9999,border:"none",background:"#0C1457",fontFamily:"Mulish, sans-serif",fontSize:14,fontWeight:700,color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:"M"})]}),g=a=>t.jsx(f,{...a});g.args={type:"date"};w.__docgenInfo={description:"",methods:[],displayName:"Date"};D.__docgenInfo={description:"",methods:[],displayName:"Range"};S.__docgenInfo={description:"",methods:[],displayName:"DateAndTime"};v.__docgenInfo={description:"",methods:[],displayName:"DayStates"};g.__docgenInfo={description:"",methods:[],displayName:"Default"};var I,C,k;w.parameters={...w.parameters,docs:{...(I=w.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 4));
  return <Calendar type="date" value={value} onChange={setValue} />;
}`,...(k=(C=w.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var F,R,V;D.parameters={...D.parameters,docs:{...(F=D.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  const [start, setStart] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 8));
  const [end, setEnd] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 11));
  return <Calendar type="range" rangeStart={start} rangeEnd={end} onRangeChange={(s, e) => {
    setStart(s);
    setEnd(e);
  }} />;
}`,...(V=(R=D.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var z,W,Y;S.parameters={...S.parameters,docs:{...(z=S.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 8));
  const [time, setTime] = useState("00:00");
  return <Calendar type="date-time" value={value} timeValue={time} onChange={setValue} onTimeChange={setTime} />;
}`,...(Y=(W=S.parameters)==null?void 0:W.docs)==null?void 0:Y.source}}};var q,A,O;v.parameters={...v.parameters,docs:{...(q=v.parameters)==null?void 0:q.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(O=(A=v.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};var B,H,J;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:"args => <Calendar {...args} />",...(J=(H=g.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};const je=["Date","Range","DateAndTime","DayStates","Default"];export{w as Date,S as DateAndTime,v as DayStates,g as Default,D as Range,je as __namedExportsOrder,Me as default};
