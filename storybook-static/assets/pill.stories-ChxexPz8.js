import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{P as S,a,b as t,c as g,d as u,e as f,f as Q,g as x,h as v,i as y,j as R}from"./pill-bqMN6uXB.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./icon-D1UQke6Y.js";import"./index-DhMLlvMY.js";const ae={title:"Components/Pill",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=14765-208276"},layout:"centered"}},l=({label:i,children:U})=>e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:i}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:U})]}),o=()=>e.jsxs("div",{style:{padding:24},children:[e.jsxs(l,{label:"Simple — Regular",children:[e.jsx(a,{label:"New",leftIcon:"error",size:"regular"}),e.jsx(a,{label:"New",size:"regular"})]}),e.jsx(l,{label:"Removable — Regular",children:e.jsx(t,{label:"Removable",size:"regular",onRemove:()=>{}})}),e.jsx(l,{label:"Modifier — Regular",children:e.jsx(g,{leftLabel:"Variable",rightLabel:"Modifier",size:"regular",onRemoveLeft:()=>{},onClickRight:()=>{}})}),e.jsxs(l,{label:"Simple — Small",children:[e.jsx(a,{label:"New",leftIcon:"error",size:"small"}),e.jsx(a,{label:"New",size:"small"})]}),e.jsx(l,{label:"Removable — Small",children:e.jsx(t,{label:"Removable",size:"small",onRemove:()=>{}})}),e.jsx(l,{label:"Modifier — Small",children:e.jsx(g,{leftLabel:"Variable",rightLabel:"Modifier",size:"small",onRemoveLeft:()=>{},onClickRight:()=>{}})})]}),s=()=>e.jsxs("div",{style:{padding:24},children:[e.jsx(l,{label:"WF State — Regular",children:["new","shortlisting","in-review","invited","pending","partially-filled","filled","partially-booked","booked","partially-confirmed","confirmed","not-filled","exceptions"].map(i=>e.jsx(u,{state:i,size:"regular"},i))}),e.jsx(l,{label:"WF State — Small",children:["new","shortlisting","in-review","partially-filled","booked","confirmed","not-filled","exceptions"].map(i=>e.jsx(u,{state:i,size:"small"},i))})]}),n=()=>e.jsxs("div",{style:{padding:24},children:[e.jsxs(l,{label:"Filter pill",children:[e.jsx(f,{field:"Field",value:"Value",onRemove:()=>{}}),e.jsx(f,{field:"Status",value:"Active",onRemove:()=>{}})]}),e.jsx(l,{label:"Saved filter pill",children:e.jsx(Q,{label:"Title",onRemove:()=>{},onShare:()=>{}})}),e.jsxs(l,{label:"Multiselect pill (PillRemovable)",children:[e.jsx(t,{label:"Value",size:"regular",bg:"#F8F9FD",bordered:!0,onRemove:()=>{}}),e.jsx(t,{label:"Draft",size:"regular",bg:"#F8F9FD",bordered:!0,onRemove:()=>{}})]})]}),r=()=>e.jsx("div",{style:{padding:24},children:e.jsxs(l,{label:"Certificate",children:[e.jsx(x,{name:"Certificate",date:"24 Sep 2027",onRemove:()=>{}}),e.jsx(x,{name:"AWS Cloud",date:"01 Jan 2026",onRemove:()=>{},size:"small"})]})}),d=()=>e.jsx("div",{style:{padding:24},children:e.jsxs(l,{label:"Activity tag",children:[e.jsx(S,{label:"RM to review"}),e.jsx(S,{label:"Pending approval",size:"small"})]})}),c=()=>e.jsx("div",{style:{padding:24},children:e.jsx(l,{label:"KPI (small)",children:["compliant","approved","exception","rejected","requested","condition-not-met"].map(i=>e.jsx(v,{type:i},i))})}),m=()=>e.jsx("div",{style:{padding:24},children:e.jsx(l,{label:"Custom value (small)",children:["approved","awaiting","blocked","merged"].map(i=>e.jsx(y,{type:i},i))})}),p=()=>e.jsx("div",{style:{padding:24},children:e.jsx(l,{label:"Report status (small)",children:["ready","no-data","failed","pending","in-progress"].map(i=>e.jsx(R,{type:i},i))})}),b=()=>e.jsxs("div",{style:{padding:24,maxWidth:900},children:[e.jsxs(l,{label:"Master — Simple",children:[e.jsx(a,{label:"New",leftIcon:"error"}),e.jsx(a,{label:"Simple"}),e.jsx(a,{label:"Small",leftIcon:"error",size:"small"}),e.jsx(a,{label:"Small",size:"small"})]}),e.jsxs(l,{label:"Master — Removable",children:[e.jsx(t,{label:"Removable",onRemove:()=>{}}),e.jsx(t,{label:"Small",size:"small",onRemove:()=>{}})]}),e.jsx(l,{label:"Master — Modifier",children:e.jsx(g,{leftLabel:"Variable",rightLabel:"Modifier",onRemoveLeft:()=>{}})}),e.jsx(l,{label:"WF State",children:["new","shortlisting","partially-filled","booked","confirmed","not-filled","exceptions"].map(i=>e.jsx(u,{state:i},i))}),e.jsxs(l,{label:"Filter / Saved Filter",children:[e.jsx(f,{field:"Field",value:"Value",onRemove:()=>{}}),e.jsx(Q,{label:"Title",onRemove:()=>{},onShare:()=>{}})]}),e.jsx(l,{label:"Certificate",children:e.jsx(x,{name:"AWS",date:"24 Sep 2027",onRemove:()=>{}})}),e.jsxs(l,{label:"Activity / KPI / Custom / Report",children:[e.jsx(S,{label:"RM to review",size:"small"}),e.jsx(v,{type:"compliant"}),e.jsx(v,{type:"exception"}),e.jsx(v,{type:"requested"}),e.jsx(y,{type:"approved"}),e.jsx(y,{type:"blocked"}),e.jsx(R,{type:"ready"}),e.jsx(R,{type:"failed"})]})]});o.__docgenInfo={description:"",methods:[],displayName:"MasterTypes"};s.__docgenInfo={description:"",methods:[],displayName:"WFState"};n.__docgenInfo={description:"",methods:[],displayName:"Filter"};r.__docgenInfo={description:"",methods:[],displayName:"Certificate"};d.__docgenInfo={description:"",methods:[],displayName:"ActivityTag"};c.__docgenInfo={description:"",methods:[],displayName:"KPI"};m.__docgenInfo={description:"",methods:[],displayName:"CustomValue"};p.__docgenInfo={description:"",methods:[],displayName:"ReportStatus"};b.__docgenInfo={description:"",methods:[],displayName:"AllPills"};var j,P,h;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`() => <div style={{
  padding: 24
}}>
    <Section label="Simple — Regular">
      <PillSimple label="New" leftIcon="error" size="regular" />
      <PillSimple label="New" size="regular" />
    </Section>
    <Section label="Removable — Regular">
      <PillRemovable label="Removable" size="regular" onRemove={() => {}} />
    </Section>
    <Section label="Modifier — Regular">
      <PillModifier leftLabel="Variable" rightLabel="Modifier" size="regular" onRemoveLeft={() => {}} onClickRight={() => {}} />
    </Section>
    <Section label="Simple — Small">
      <PillSimple label="New" leftIcon="error" size="small" />
      <PillSimple label="New" size="small" />
    </Section>
    <Section label="Removable — Small">
      <PillRemovable label="Removable" size="small" onRemove={() => {}} />
    </Section>
    <Section label="Modifier — Small">
      <PillModifier leftLabel="Variable" rightLabel="Modifier" size="small" onRemoveLeft={() => {}} onClickRight={() => {}} />
    </Section>
  </div>`,...(h=(P=o.parameters)==null?void 0:P.docs)==null?void 0:h.source}}};var F,z,M;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`() => <div style={{
  padding: 24
}}>
    <Section label="WF State — Regular">
      {(["new", "shortlisting", "in-review", "invited", "pending", "partially-filled", "filled", "partially-booked", "booked", "partially-confirmed", "confirmed", "not-filled", "exceptions"] as const).map(s => <PillWFState key={s} state={s} size="regular" />)}
    </Section>
    <Section label="WF State — Small">
      {(["new", "shortlisting", "in-review", "partially-filled", "booked", "confirmed", "not-filled", "exceptions"] as const).map(s => <PillWFState key={s} state={s} size="small" />)}
    </Section>
  </div>`,...(M=(z=s.parameters)==null?void 0:z.docs)==null?void 0:M.source}}};var C,w,I;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`() => <div style={{
  padding: 24
}}>
    <Section label="Filter pill">
      <PillFilter field="Field" value="Value" onRemove={() => {}} />
      <PillFilter field="Status" value="Active" onRemove={() => {}} />
    </Section>
    <Section label="Saved filter pill">
      <PillSavedFilter label="Title" onRemove={() => {}} onShare={() => {}} />
    </Section>
    <Section label="Multiselect pill (PillRemovable)">
      <PillRemovable label="Value" size="regular" bg="#F8F9FD" bordered onRemove={() => {}} />
      <PillRemovable label="Draft" size="regular" bg="#F8F9FD" bordered onRemove={() => {}} />
    </Section>
  </div>`,...(I=(w=n.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var k,A,W;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`() => <div style={{
  padding: 24
}}>
    <Section label="Certificate">
      <PillCertificate name="Certificate" date="24 Sep 2027" onRemove={() => {}} />
      <PillCertificate name="AWS Cloud" date="01 Jan 2026" onRemove={() => {}} size="small" />
    </Section>
  </div>`,...(W=(A=r.parameters)==null?void 0:A.docs)==null?void 0:W.source}}};var _,L,N;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`() => <div style={{
  padding: 24
}}>
    <Section label="Activity tag">
      <PillActivityTag label="RM to review" />
      <PillActivityTag label="Pending approval" size="small" />
    </Section>
  </div>`,...(N=(L=d.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var V,T,K;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`() => <div style={{
  padding: 24
}}>
    <Section label="KPI (small)">
      {(["compliant", "approved", "exception", "rejected", "requested", "condition-not-met"] as const).map(t => <PillKPI key={t} type={t} />)}
    </Section>
  </div>`,...(K=(T=c.parameters)==null?void 0:T.docs)==null?void 0:K.source}}};var D,q,E;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`() => <div style={{
  padding: 24
}}>
    <Section label="Custom value (small)">
      {(["approved", "awaiting", "blocked", "merged"] as const).map(t => <PillCustomValue key={t} type={t} />)}
    </Section>
  </div>`,...(E=(q=m.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var B,J,O;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`() => <div style={{
  padding: 24
}}>
    <Section label="Report status (small)">
      {(["ready", "no-data", "failed", "pending", "in-progress"] as const).map(t => <PillReportStatus key={t} type={t} />)}
    </Section>
  </div>`,...(O=(J=p.parameters)==null?void 0:J.docs)==null?void 0:O.source}}};var Y,G,H;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  maxWidth: 900
}}>
    <Section label="Master — Simple">
      <PillSimple label="New" leftIcon="error" /><PillSimple label="Simple" />
      <PillSimple label="Small" leftIcon="error" size="small" /><PillSimple label="Small" size="small" />
    </Section>
    <Section label="Master — Removable">
      <PillRemovable label="Removable" onRemove={() => {}} />
      <PillRemovable label="Small" size="small" onRemove={() => {}} />
    </Section>
    <Section label="Master — Modifier">
      <PillModifier leftLabel="Variable" rightLabel="Modifier" onRemoveLeft={() => {}} />
    </Section>
    <Section label="WF State">
      {(["new", "shortlisting", "partially-filled", "booked", "confirmed", "not-filled", "exceptions"] as const).map(s => <PillWFState key={s} state={s} />)}
    </Section>
    <Section label="Filter / Saved Filter">
      <PillFilter field="Field" value="Value" onRemove={() => {}} />
      <PillSavedFilter label="Title" onRemove={() => {}} onShare={() => {}} />
    </Section>
    <Section label="Certificate">
      <PillCertificate name="AWS" date="24 Sep 2027" onRemove={() => {}} />
    </Section>
    <Section label="Activity / KPI / Custom / Report">
      <PillActivityTag label="RM to review" size="small" />
      <PillKPI type="compliant" /><PillKPI type="exception" /><PillKPI type="requested" />
      <PillCustomValue type="approved" /><PillCustomValue type="blocked" />
      <PillReportStatus type="ready" /><PillReportStatus type="failed" />
    </Section>
  </div>`,...(H=(G=b.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const te=["MasterTypes","WFState","Filter","Certificate","ActivityTag","KPI","CustomValue","ReportStatus","AllPills"];export{d as ActivityTag,b as AllPills,r as Certificate,m as CustomValue,n as Filter,c as KPI,o as MasterTypes,p as ReportStatus,s as WFState,te as __namedExportsOrder,ae as default};
