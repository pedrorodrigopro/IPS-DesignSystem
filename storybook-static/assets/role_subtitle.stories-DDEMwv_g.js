import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{R as a}from"./role_subtitle-Hzo6eQtd.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./pill-bqMN6uXB.js";import"./icon-D1UQke6Y.js";import"./index-DhMLlvMY.js";import"./divider-CKitOyrn.js";const G={title:"Molecules/RoleSubtitle",component:a,parameters:{layout:"padded",docs:{description:{component:"Role subtitle bar combining WF State pill, Activity Tag pill, and label:value metadata pairs separated by vertical dividers. Used below role/page headers. Row wraps on narrow viewports (gap 8px). Text is body-unselected with bold values."}}}},k=[{label:"ID",value:"100000064"},{label:"State",value:"Open"},{label:"Privacy",value:"Public"},{label:"Participant",value:"Co-Owner"}],t={name:"As in Figma",render:()=>e.jsx(a,{wfState:"shortlisting",activityTag:"RM to review",items:k})},l={name:"WF State pill only",render:()=>e.jsx(a,{wfState:"confirmed",items:[{label:"ID",value:"100000064"},{label:"State",value:"Open"}]})},C=["new","shortlisting","in-review","invited","partially-filled","filled","partially-booked","booked","partially-confirmed","confirmed","not-filled","exceptions","pending"],n={name:"All WF states",render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:C.map(m=>e.jsx(a,{wfState:m,items:[{label:"State",value:m}]},m))})},r={name:"Activity tag only",render:()=>e.jsx(a,{activityTag:"RM to review",items:k})},i={name:"Items only (no pills)",render:()=>e.jsx(a,{items:[{label:"ID",value:"100000064"},{label:"State",value:"Open"},{label:"Privacy",value:"Public"},{label:"Participant",value:"Co-Owner"},{label:"Location",value:"London"}]})},o={name:"Pills only (no items)",render:()=>e.jsx(a,{wfState:"shortlisting",activityTag:"RM to review"})},s={name:"Single item",render:()=>e.jsx(a,{wfState:"booked",items:[{label:"ID",value:"987654321"}]})},c={name:"Many items (wraps on narrow viewport)",render:()=>e.jsx("div",{style:{maxWidth:480},children:e.jsx(a,{wfState:"shortlisting",activityTag:"RM to review",items:[{label:"ID",value:"100000064"},{label:"State",value:"Open"},{label:"Privacy",value:"Public"},{label:"Participant",value:"Co-Owner"},{label:"Location",value:"London, UK"},{label:"Start",value:"01 Jan 2024"}]})})};var p,d,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "As in Figma",
  render: () => <RoleSubtitle wfState="shortlisting" activityTag="RM to review" items={items} />
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var v,b,S;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "WF State pill only",
  render: () => <RoleSubtitle wfState="confirmed" items={[{
    label: "ID",
    value: "100000064"
  }, {
    label: "State",
    value: "Open"
  }]} />
}`,...(S=(b=l.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var y,g,w;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "All WF states",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      {WF_STATES.map(state => <RoleSubtitle key={state} wfState={state} items={[{
      label: "State",
      value: state
    }]} />)}
    </div>
}`,...(w=(g=n.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};var f,x,R;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Activity tag only",
  render: () => <RoleSubtitle activityTag="RM to review" items={items} />
}`,...(R=(x=r.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};var O,P,I;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: "Items only (no pills)",
  render: () => <RoleSubtitle items={[{
    label: "ID",
    value: "100000064"
  }, {
    label: "State",
    value: "Open"
  }, {
    label: "Privacy",
    value: "Public"
  }, {
    label: "Participant",
    value: "Co-Owner"
  }, {
    label: "Location",
    value: "London"
  }]} />
}`,...(I=(P=i.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};var T,h,A;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Pills only (no items)",
  render: () => <RoleSubtitle wfState="shortlisting" activityTag="RM to review" />
}`,...(A=(h=o.parameters)==null?void 0:h.docs)==null?void 0:A.source}}};var D,F,M;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: "Single item",
  render: () => <RoleSubtitle wfState="booked" items={[{
    label: "ID",
    value: "987654321"
  }]} />
}`,...(M=(F=s.parameters)==null?void 0:F.docs)==null?void 0:M.source}}};var W,j,L;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: "Many items (wraps on narrow viewport)",
  render: () => <div style={{
    maxWidth: 480
  }}>
      <RoleSubtitle wfState="shortlisting" activityTag="RM to review" items={[{
      label: "ID",
      value: "100000064"
    }, {
      label: "State",
      value: "Open"
    }, {
      label: "Privacy",
      value: "Public"
    }, {
      label: "Participant",
      value: "Co-Owner"
    }, {
      label: "Location",
      value: "London, UK"
    }, {
      label: "Start",
      value: "01 Jan 2024"
    }]} />
    </div>
}`,...(L=(j=c.parameters)==null?void 0:j.docs)==null?void 0:L.source}}};const H=["Default","WFStateOnly","AllWFStates","ActivityTagOnly","ItemsOnly","PillsOnly","SingleItem","ManyItems"];export{r as ActivityTagOnly,n as AllWFStates,t as Default,i as ItemsOnly,c as ManyItems,o as PillsOnly,s as SingleItem,l as WFStateOnly,H as __namedExportsOrder,G as default};
