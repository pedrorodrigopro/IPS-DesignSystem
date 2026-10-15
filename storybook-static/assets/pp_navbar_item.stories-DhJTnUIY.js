import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-DhMLlvMY.js";import{P as i,N as j}from"./navbar-DtEW6gcU.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./avatar-DzCkQh3P.js";import"./icon-D2SvuOdm.js";const z={title:"Components/PPNavbarItem",component:i,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=15018-127289"},layout:"centered",backgrounds:{default:"navy",values:[{name:"navy",value:"#0C1457"}]}}},t=()=>{const[r,o]=l.useState(!1);return e.jsxs("div",{style:{padding:32,background:"#0C1457",borderRadius:16,display:"inline-flex",flexDirection:"column",alignItems:"center",gap:24},children:[e.jsx(i,{open:r,onClick:()=>o(a=>!a)}),e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"rgba(255,255,255,0.6)"},children:"Click to toggle open state"})]})},s=()=>e.jsxs("div",{style:{padding:32,background:"#0C1457",borderRadius:16,display:"inline-flex",gap:32,alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx(i,{open:!1,onClick:()=>{}}),e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:10,color:"rgba(255,255,255,0.5)"},children:"Resting"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx(i,{open:!0,onClick:()=>{}}),e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:10,color:"rgba(255,255,255,0.5)"},children:"Open"})]})]}),n=()=>{const[r,o]=l.useState("marketplace"),[a,N]=l.useState(!1);return e.jsxs("div",{style:{display:"flex",height:"100vh",background:"#F8F9FD"},children:[e.jsx(j,{activeId:r,onSelect:o,avatarInitials:"CP",proPlilotOpen:a,onProPilot:()=>N(O=>!O)}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#5C6E9E"},children:["ProPilot is ",e.jsx("strong",{style:{color:"#0D2976"},children:a?"open":"closed"})]})})]})};n.parameters={layout:"fullscreen"};t.__docgenInfo={description:"Resting state — animated aurora glow, dark gradient background",methods:[],displayName:"Resting"};s.__docgenInfo={description:"Open state — transparent with white dashed border, dimmed icon",methods:[],displayName:"Open"};n.__docgenInfo={description:"PPNavbarItem integrated in the Navbar component",methods:[],displayName:"InNavbar"};var p,c,d,m,g;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const [open, setOpen] = useState(false);
  return <div style={{
    padding: 32,
    background: "#0C1457",
    borderRadius: 16,
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24
  }}>
      <PPNavbarItem open={open} onClick={() => setOpen(o => !o)} />
      <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "rgba(255,255,255,0.6)"
    }}>
        Click to toggle open state
      </span>
    </div>;
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source},description:{story:"Resting state — animated aurora glow, dark gradient background",...(g=(m=t.parameters)==null?void 0:m.docs)==null?void 0:g.description}}};var f,u,v,y,x;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`() => <div style={{
  padding: 32,
  background: "#0C1457",
  borderRadius: 16,
  display: "inline-flex",
  gap: 32,
  alignItems: "center"
}}>
    <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8
  }}>
      <PPNavbarItem open={false} onClick={() => {}} />
      <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 10,
      color: "rgba(255,255,255,0.5)"
    }}>Resting</span>
    </div>
    <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8
  }}>
      <PPNavbarItem open={true} onClick={() => {}} />
      <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 10,
      color: "rgba(255,255,255,0.5)"
    }}>Open</span>
    </div>
  </div>`,...(v=(u=s.parameters)==null?void 0:u.docs)==null?void 0:v.source},description:{story:"Open state — transparent with white dashed border, dimmed icon",...(x=(y=s.parameters)==null?void 0:y.docs)==null?void 0:x.description}}};var h,b,P,I,k;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [navActive, setNavActive] = useState("marketplace");
  const [ppOpen, setPpOpen] = useState(false);
  return <div style={{
    display: "flex",
    height: "100vh",
    background: "#F8F9FD"
  }}>
      <Navbar activeId={navActive} onSelect={setNavActive} avatarInitials="CP" proPlilotOpen={ppOpen} onProPilot={() => setPpOpen(o => !o)} />
      <div style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
        <span style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 14,
        color: "#5C6E9E"
      }}>
          ProPilot is <strong style={{
          color: "#0D2976"
        }}>{ppOpen ? "open" : "closed"}</strong>
        </span>
      </div>
    </div>;
}`,...(P=(b=n.parameters)==null?void 0:b.docs)==null?void 0:P.source},description:{story:"PPNavbarItem integrated in the Navbar component",...(k=(I=n.parameters)==null?void 0:I.docs)==null?void 0:k.description}}};const E=["Resting","Open","InNavbar"];export{n as InNavbar,s as Open,t as Resting,E as __namedExportsOrder,z as default};
