import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as n}from"./tooltip-Bkp5rPqR.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";const _={title:"Components/Tooltip",component:n,parameters:{layout:"centered",docs:{description:{component:"Dark tooltip bubble (#0C1457, radius 8px, padding 16px) shown on hover/focus. 13 placements: no-arrow, down/up/left/right × center/left-right or up/down. Arrow is a 10px CSS triangle overlapping the bubble by 3px."}}}},t=({label:r="Hover me"})=>e.jsx("button",{style:{padding:"8px 16px",borderRadius:4,border:"1px solid #CFDAF7",background:"#fff",fontFamily:"Mulish, sans-serif",fontSize:13,fontWeight:700,color:"#0C1457",cursor:"default"},children:r}),N=[{placement:"no-arrow",label:"No arrow"},{placement:"down-center",label:"Down center"},{placement:"down-left",label:"Down left"},{placement:"down-right",label:"Down right"},{placement:"up-center",label:"Up center"},{placement:"up-left",label:"Up left"},{placement:"up-right",label:"Up right"},{placement:"left-center",label:"Left center"},{placement:"left-up",label:"Left up"},{placement:"left-down",label:"Left down"},{placement:"right-center",label:"Right center"},{placement:"right-up",label:"Right up"},{placement:"right-down",label:"Right down"}],o={name:"All placements",render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:80,padding:60},children:N.map(({placement:r,label:m})=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",margin:0},children:m}),e.jsx(n,{content:"Tooltip",placement:r,children:e.jsx(t,{label:m})})]},r))})},l={name:"Down center",render:()=>e.jsx("div",{style:{padding:80},children:e.jsx(n,{content:"Tooltip",placement:"down-center",children:e.jsx(t,{})})})},a={name:"Up center",render:()=>e.jsx("div",{style:{padding:80},children:e.jsx(n,{content:"Tooltip",placement:"up-center",children:e.jsx(t,{})})})},i={name:"Left center (bubble right of trigger)",render:()=>e.jsx("div",{style:{padding:80},children:e.jsx(n,{content:"Tooltip",placement:"left-center",children:e.jsx(t,{})})})},s={name:"Right center (bubble left of trigger)",render:()=>e.jsx("div",{style:{padding:80},children:e.jsx(n,{content:"Tooltip",placement:"right-center",children:e.jsx(t,{})})})},c={name:"No arrow",render:()=>e.jsx("div",{style:{padding:80},children:e.jsx(n,{content:"Tooltip",placement:"no-arrow",children:e.jsx(t,{})})})},p={name:"Long content",render:()=>e.jsx("div",{style:{padding:80},children:e.jsx(n,{content:"This is a longer tooltip that wraps across multiple lines to demonstrate text wrapping behaviour.",placement:"down-center",maxWidth:200,children:e.jsx(t,{label:"Long tooltip"})})})},d={name:"On icon trigger",render:()=>e.jsx("div",{style:{padding:80},children:e.jsx(n,{content:"More options",placement:"down-center",children:e.jsx("span",{style:{display:"inline-flex",width:28,height:28,alignItems:"center",justifyContent:"center",borderRadius:4,border:"1px solid #CFDAF7",cursor:"default",fontFamily:"Mulish, sans-serif",fontSize:16,color:"#5C6E9E"},children:"⋮"})})})};var g,u,h;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "All placements",
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 80,
    padding: 60
  }}>
      {placements.map(({
      placement,
      label
    }) => <div key={placement} style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6
    }}>
          <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        margin: 0
      }}>
            {label}
          </p>
          <Tooltip content="Tooltip" placement={placement}>
            <TriggerBtn label={label} />
          </Tooltip>
        </div>)}
    </div>
}`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var f,x,b;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Down center",
  render: () => <div style={{
    padding: 80
  }}>
      <Tooltip content="Tooltip" placement="down-center">
        <TriggerBtn />
      </Tooltip>
    </div>
}`,...(b=(x=l.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var T,w,y;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Up center",
  render: () => <div style={{
    padding: 80
  }}>
      <Tooltip content="Tooltip" placement="up-center">
        <TriggerBtn />
      </Tooltip>
    </div>
}`,...(y=(w=a.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var v,j,C;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Left center (bubble right of trigger)",
  render: () => <div style={{
    padding: 80
  }}>
      <Tooltip content="Tooltip" placement="left-center">
        <TriggerBtn />
      </Tooltip>
    </div>
}`,...(C=(j=i.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};var S,D,L;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Right center (bubble left of trigger)",
  render: () => <div style={{
    padding: 80
  }}>
      <Tooltip content="Tooltip" placement="right-center">
        <TriggerBtn />
      </Tooltip>
    </div>
}`,...(L=(D=s.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var F,R,A;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: "No arrow",
  render: () => <div style={{
    padding: 80
  }}>
      <Tooltip content="Tooltip" placement="no-arrow">
        <TriggerBtn />
      </Tooltip>
    </div>
}`,...(A=(R=c.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var E,B,M;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "Long content",
  render: () => <div style={{
    padding: 80
  }}>
      <Tooltip content="This is a longer tooltip that wraps across multiple lines to demonstrate text wrapping behaviour." placement="down-center" maxWidth={200}>
        <TriggerBtn label="Long tooltip" />
      </Tooltip>
    </div>
}`,...(M=(B=p.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var U,I,z;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: "On icon trigger",
  render: () => <div style={{
    padding: 80
  }}>
      <Tooltip content="More options" placement="down-center">
        <span style={{
        display: "inline-flex",
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        border: "1px solid #CFDAF7",
        cursor: "default",
        fontFamily: "Mulish, sans-serif",
        fontSize: 16,
        color: "#5C6E9E"
      }}>
          ⋮
        </span>
      </Tooltip>
    </div>
}`,...(z=(I=d.parameters)==null?void 0:I.docs)==null?void 0:z.source}}};const H=["AllPlacements","DownCenter","UpCenter","LeftCenter","RightCenter","NoArrow","LongContent","OnIcon"];export{o as AllPlacements,l as DownCenter,i as LeftCenter,p as LongContent,c as NoArrow,d as OnIcon,s as RightCenter,a as UpCenter,H as __namedExportsOrder,_ as default};
