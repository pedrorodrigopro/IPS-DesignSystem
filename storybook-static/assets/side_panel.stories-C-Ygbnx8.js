import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-DhMLlvMY.js";import{P as l,S as p}from"./profile_side_panel-C3YRQVl2.js";import{N as d}from"./navbar-CLhydjZL.js";import"./_commonjsHelpers-CqkleIqs.js";import"./side_panel-BpkywXw5.js";import"./index-Dd5QUkq_.js";import"./header-GBiiDxBK.js";import"./icon-q_ctI9hk.js";import"./divider-CKitOyrn.js";import"./button-CreEIUG8.js";import"./accordion-BvifjHrf.js";import"./skill-BRQYQHNr.js";import"./avatar-DzCkQh3P.js";const f=p,I={title:"Side Panels/Profile",parameters:{layout:"fullscreen",viewport:{defaultViewport:"screen1440"},docs:{description:{component:"Profile Side Panel — Figma node 1601:20413. 600px wide, slides in from right with CSS transform animation (300ms ease). Shadow: -6px 0 12px rgba(27,72,195,0.2). Border-radius: 8px 0 0 8px. Backdrop dims the page. Open icon navigates to full profile. Cross icon closes. Sections: WorkforceMember + actions | Contact | Availability | Core skills | Other skills (accordions) | Grade | Office Location | Clients | Industry knowledge | Bio."}}}},t=()=>{const[i,a]=s.useState(!0);return e.jsxs("div",{style:{display:"flex",height:"100vh",background:"var(--palette-neutral-2)"},children:[e.jsx(d,{activeId:"profiles"}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("p",{style:{fontFamily:"var(--font-family)",fontSize:14,color:"var(--palette-blue-2)"},children:"Profile side panel"})}),e.jsx(l,{open:i,onClose:()=>a(!1),onOpenProfile:()=>alert("Navigate to full profile screen"),data:f})]})};t.__docgenInfo={description:"",methods:[],displayName:"Profile"};var o,r,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const [open, setOpen] = useState(true);
  return <div style={{
    display: "flex",
    height: "100vh",
    background: "var(--palette-neutral-2)"
  }}>
      <Navbar activeId="profiles" />
      <div style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
        <p style={{
        fontFamily: "var(--font-family)",
        fontSize: 14,
        color: "var(--palette-blue-2)"
      }}>
          Profile side panel
        </p>
      </div>
      <ProfileSidePanel open={open} onClose={() => setOpen(false)} onOpenProfile={() => alert("Navigate to full profile screen")} data={CHARLIE} />
    </div>;
}`,...(n=(r=t.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const k=["Profile"];export{t as Profile,k as __namedExportsOrder,I as default};
