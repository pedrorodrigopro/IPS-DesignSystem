import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-DhMLlvMY.js";import{N as n}from"./navbar-CeuCg8an.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./avatar-DzCkQh3P.js";import"./icon-D1UQke6Y.js";const b={title:"Components/Navbar",component:n,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1420-19785"},layout:"fullscreen"}},t=()=>{const[r,f]=u.useState("marketplace");return e.jsxs("div",{style:{display:"flex",height:"100vh",background:"#F8F9FD"},children:[e.jsx(n,{activeId:r,onSelect:f,avatarInitials:"CP"}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:14,color:"#5C6E9E"},children:["Active: ",e.jsx("strong",{style:{color:"#0D2976"},children:r})]})})]})},a=()=>e.jsx("div",{style:{display:"flex",height:"100vh",background:"#F8F9FD"},children:e.jsx(n,{avatarInitials:"CP"})}),s=()=>e.jsx("div",{style:{display:"flex",height:"100vh",background:"#F8F9FD"},children:e.jsx(n,{activeId:"search",avatarInitials:"AB"})});t.__docgenInfo={description:"",methods:[],displayName:"Default"};a.__docgenInfo={description:"",methods:[],displayName:"NoSelection"};s.__docgenInfo={description:"",methods:[],displayName:"WithSearch"};var i,o,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
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
}`,...(c=(o=t.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var l,d,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  height: "100vh",
  background: "#F8F9FD"
}}>
    <Navbar avatarInitials="CP" />
  </div>`,...(p=(d=a.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var v,m,h;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  height: "100vh",
  background: "#F8F9FD"
}}>
    <Navbar activeId="search" avatarInitials="AB" />
  </div>`,...(h=(m=s.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};const D=["Default","NoSelection","WithSearch"];export{t as Default,a as NoSelection,s as WithSearch,D as __namedExportsOrder,b as default};
