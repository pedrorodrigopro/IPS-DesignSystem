import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{r as i}from"./index-DhMLlvMY.js";import{P as d}from"./pp_chat_input-DSI3Lsq2.js";import{P as y}from"./pp_bubble-DOPJhvqj.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-A4JB3O0c.js";const D={title:"Components/PPChatInput",component:d,parameters:{design:{type:"figma",url:"https://www.figma.com/design/eLJ4mtITbBhHCbONvKtGZU?node-id=1440-36113"},layout:"centered"}},e=()=>{const[n,a]=i.useState("");return s.jsx("div",{style:{width:420,padding:24,background:"var(--palette-white-0)",borderRadius:8},children:s.jsx(d,{value:n,onChange:a})})},t=()=>{const[n,a]=i.useState(""),[x,f]=i.useState(["Shorten the bio to two sentences"]);return s.jsxs("div",{style:{width:420,padding:24,background:"var(--palette-white-0)",borderRadius:8,display:"flex",flexDirection:"column",gap:16},children:[s.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8},children:x.map((r,o)=>s.jsx(y,{variant:"light",children:r},o))}),s.jsx(d,{value:n,onChange:a,onSend:r=>{f(o=>[...o,r]),a("")}})]})};e.__docgenInfo={description:'Empty — placeholder "Ask ProPilot"',methods:[],displayName:"Default"};t.__docgenInfo={description:"Type and press Enter (or click send): the message is added above as a light PPBubble",methods:[],displayName:"WithMessages"};var l,p,c,u,m;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const [value, setValue] = useState("");
  return <div style={{
    width: 420,
    padding: 24,
    background: "var(--palette-white-0)",
    borderRadius: 8
  }}>
      <PPChatInput value={value} onChange={setValue} />
    </div>;
}`,...(c=(p=e.parameters)==null?void 0:p.docs)==null?void 0:c.source},description:{story:'Empty — placeholder "Ask ProPilot"',...(m=(u=e.parameters)==null?void 0:u.docs)==null?void 0:m.description}}};var g,h,v,b,P;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<string[]>(["Shorten the bio to two sentences"]);
  return <div style={{
    width: 420,
    padding: 24,
    background: "var(--palette-white-0)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>
      <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8
    }}>
        {messages.map((m, i) => <PPBubble key={i} variant="light">{m}</PPBubble>)}
      </div>
      <PPChatInput value={value} onChange={setValue} onSend={text => {
      setMessages(ms => [...ms, text]);
      setValue("");
    }} />
    </div>;
}`,...(v=(h=t.parameters)==null?void 0:h.docs)==null?void 0:v.source},description:{story:"Type and press Enter (or click send): the message is added above as a light PPBubble",...(P=(b=t.parameters)==null?void 0:b.docs)==null?void 0:P.description}}};const E=["Default","WithMessages"];export{e as Default,t as WithMessages,E as __namedExportsOrder,D as default};
