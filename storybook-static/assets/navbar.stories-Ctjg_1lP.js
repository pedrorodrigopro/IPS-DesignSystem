import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./index-DhMLlvMY.js";import{N as i}from"./navbar-DpLkqp0s.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./avatar-DzCkQh3P.js";import"./icon-Dpkq_sne.js";const B={title:"Components/Navbar",component:i,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1420-19785"},layout:"fullscreen"}},n=()=>{const[r,o]=c.useState("marketplace");return e.jsxs("div",{style:{display:"flex",height:"100vh",background:"#F8F9FD"},children:[e.jsx(i,{activeId:r,onSelect:o,avatarInitials:"CP"}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#5C6E9E"},children:["Active: ",e.jsx("strong",{style:{color:"#0D2976"},children:r})]})})]})},s=()=>e.jsx("div",{style:{display:"flex",height:"100vh",background:"#F8F9FD"},children:e.jsx(i,{avatarInitials:"CP"})}),a=()=>e.jsx("div",{style:{display:"flex",height:"100vh",background:"#F8F9FD"},children:e.jsx(i,{activeId:"search",avatarInitials:"AB"})}),t=()=>{const[r,o]=c.useState("workflow"),[l,C]=c.useState(1);return e.jsxs("div",{style:{display:"flex",height:"100vh",background:"#F8F9FD"},children:[e.jsx(i,{activeId:r,badges:{notifications:l},onSelect:d=>{d==="notifications"?C(p=>p>=12?0:p+4):o(d)}}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#5C6E9E"},children:["Click the bell to change the unread count: ",e.jsx("strong",{style:{color:"#0D2976"},children:l})]})})]})};n.__docgenInfo={description:"",methods:[],displayName:"Default"};s.__docgenInfo={description:"",methods:[],displayName:"NoSelection"};a.__docgenInfo={description:"",methods:[],displayName:"WithSearch"};t.__docgenInfo={description:'`badges` puts a red unread count on a nav item (hidden at 0, "9+" above 9)',methods:[],displayName:"WithBadge"};var v,h,u;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const [active, setActive] = useState("marketplace");
  return <div style={{
    display: "flex",
    height: "100vh",
    background: "#F8F9FD"
  }}>
      <Navbar activeId={active} onSelect={setActive} avatarInitials="CP" />
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
          Active: <strong style={{
          color: "#0D2976"
        }}>{active}</strong>
        </span>
      </div>
    </div>;
}`,...(u=(h=n.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var m,f,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  height: "100vh",
  background: "#F8F9FD"
}}>
    <Navbar avatarInitials="CP" />
  </div>`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var y,x,F;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  height: "100vh",
  background: "#F8F9FD"
}}>
    <Navbar activeId="search" avatarInitials="AB" />
  </div>`,...(F=(x=a.parameters)==null?void 0:x.docs)==null?void 0:F.source}}};var S,b,j,I,D;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const [active, setActive] = useState("workflow");
  const [unread, setUnread] = useState(1);
  return <div style={{
    display: "flex",
    height: "100vh",
    background: "#F8F9FD"
  }}>
      <Navbar activeId={active} badges={{
      notifications: unread
    }} onSelect={id => {
      if (id === "notifications") setUnread(n => n >= 12 ? 0 : n + 4);else setActive(id);
    }} />
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
          Click the bell to change the unread count: <strong style={{
          color: "#0D2976"
        }}>{unread}</strong>
        </span>
      </div>
    </div>;
}`,...(j=(b=t.parameters)==null?void 0:b.docs)==null?void 0:j.source},description:{story:'`badges` puts a red unread count on a nav item (hidden at 0, "9+" above 9)',...(D=(I=t.parameters)==null?void 0:I.docs)==null?void 0:D.description}}};const z=["Default","NoSelection","WithSearch","WithBadge"];export{n as Default,s as NoSelection,t as WithBadge,a as WithSearch,z as __namedExportsOrder,B as default};
