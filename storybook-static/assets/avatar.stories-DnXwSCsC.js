import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{A as a}from"./avatar-DzCkQh3P.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";const J={title:"Components/Avatar",component:a,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1489-27991"}},argTypes:{size:{control:"select",options:["small","big"]}}},e="https://i.pravatar.cc/150?img=65",o=()=>s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32,padding:24},children:[s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[s.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"var(--palette-neutral-3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"},children:"Small"}),s.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[s.jsx(a,{size:"small",initials:"CP"}),s.jsx(a,{size:"small",initials:"CP",showChat:!0}),s.jsx(a,{size:"small",src:e,alt:"Photo"}),s.jsx(a,{size:"small",src:e,alt:"Photo",showChat:!0})]})]}),s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[s.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"var(--palette-neutral-3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"},children:"Big"}),s.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[s.jsx(a,{size:"big",initials:"CP"}),s.jsx(a,{size:"big",initials:"CP",showChat:!0}),s.jsx(a,{size:"big",src:e,alt:"Photo"}),s.jsx(a,{size:"big",src:e,alt:"Photo",showChat:!0})]})]})]}),i=()=>s.jsx(a,{size:"small",initials:"CP"}),r=()=>s.jsx(a,{size:"small",src:e,alt:"Photo"}),l=()=>s.jsx(a,{size:"small",initials:"CP",showChat:!0}),n=()=>s.jsx(a,{size:"small",src:e,alt:"Photo",showChat:!0}),c=()=>s.jsx(a,{size:"big",initials:"CP"}),m=()=>s.jsx(a,{size:"big",src:e,alt:"Photo"}),p=()=>s.jsx(a,{size:"big",initials:"CP",showChat:!0}),d=()=>s.jsx(a,{size:"big",src:e,alt:"Photo",showChat:!0}),t=Y=>s.jsx(a,{...Y});t.args={size:"small",initials:"CP"};o.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};i.__docgenInfo={description:"",methods:[],displayName:"SmallText"};r.__docgenInfo={description:"",methods:[],displayName:"SmallPhoto"};l.__docgenInfo={description:"",methods:[],displayName:"SmallTextChat"};n.__docgenInfo={description:"",methods:[],displayName:"SmallPhotoChat"};c.__docgenInfo={description:"",methods:[],displayName:"BigText"};m.__docgenInfo={description:"",methods:[],displayName:"BigPhoto"};p.__docgenInfo={description:"",methods:[],displayName:"BigTextChat"};d.__docgenInfo={description:"",methods:[],displayName:"BigPhotoChat"};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var h,g,u;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 32,
  padding: 24
}}>

    <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "var(--palette-neutral-3)",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }}>Small</span>
      <div style={{
      display: "flex",
      gap: 24,
      alignItems: "center"
    }}>
        <Avatar size="small" initials="CP" />
        <Avatar size="small" initials="CP" showChat />
        <Avatar size="small" src={photoSrc} alt="Photo" />
        <Avatar size="small" src={photoSrc} alt="Photo" showChat />
      </div>
    </div>

    <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      <span style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "var(--palette-neutral-3)",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }}>Big</span>
      <div style={{
      display: "flex",
      gap: 24,
      alignItems: "center"
    }}>
        <Avatar size="big" initials="CP" />
        <Avatar size="big" initials="CP" showChat />
        <Avatar size="big" src={photoSrc} alt="Photo" />
        <Avatar size="big" src={photoSrc} alt="Photo" showChat />
      </div>
    </div>

  </div>`,...(u=(g=o.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var x,f,C;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:'() => <Avatar size="small" initials="CP" />',...(C=(f=i.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var P,v,S;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:'() => <Avatar size="small" src={photoSrc} alt="Photo" />',...(S=(v=r.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var y,z,j;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:'() => <Avatar size="small" initials="CP" showChat />',...(j=(z=l.parameters)==null?void 0:z.docs)==null?void 0:j.source}}};var A,_,w;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:'() => <Avatar size="small" src={photoSrc} alt="Photo" showChat />',...(w=(_=n.parameters)==null?void 0:_.docs)==null?void 0:w.source}}};var b,T,B;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:'() => <Avatar size="big" initials="CP" />',...(B=(T=c.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var I,D,N;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:'() => <Avatar size="big" src={photoSrc} alt="Photo" />',...(N=(D=m.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var F,M,W;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:'() => <Avatar size="big" initials="CP" showChat />',...(W=(M=p.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var E,V,K;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:'() => <Avatar size="big" src={photoSrc} alt="Photo" showChat />',...(K=(V=d.parameters)==null?void 0:V.docs)==null?void 0:K.source}}};var O,R,L;t.parameters={...t.parameters,docs:{...(O=t.parameters)==null?void 0:O.docs,source:{originalSource:"args => <Avatar {...args} />",...(L=(R=t.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};const Q=["AllVariants","SmallText","SmallPhoto","SmallTextChat","SmallPhotoChat","BigText","BigPhoto","BigTextChat","BigPhotoChat","Default"];export{o as AllVariants,m as BigPhoto,d as BigPhotoChat,c as BigText,p as BigTextChat,t as Default,r as SmallPhoto,n as SmallPhotoChat,i as SmallText,l as SmallTextChat,Q as __namedExportsOrder,J as default};
