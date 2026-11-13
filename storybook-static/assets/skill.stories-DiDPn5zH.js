import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as i,a,b as n,c as y}from"./skill-CBW85QGe.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DhMLlvMY.js";import"./icon-v-ZctF2y.js";const $={title:"Components/Skill",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=9732-260872"},layout:"centered"}},r=({label:Q,dark:m,children:V})=>e.jsxs("div",{style:{marginBottom:32,background:m?"#0D2976":"transparent",padding:m?"16px":0,borderRadius:m?8:0},children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:m?"#5C6E9E":"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:Q}),e.jsx("div",{style:{display:"flex",gap:32,flexWrap:"wrap",alignItems:"center"},children:V})]}),o=()=>e.jsxs("div",{style:{padding:24},children:[e.jsxs(r,{label:"Role dots (10×4px pill)",children:[e.jsx(a,{label:"Basic",proficiency:"basic"}),e.jsx(a,{label:"Intermediate",proficiency:"intermediate"}),e.jsx(a,{label:"Advanced",proficiency:"advanced"})]}),e.jsxs(r,{label:"Profile dots (10×10px circle)",children:[e.jsx(n,{label:"Basic",proficiency:"basic"}),e.jsx(n,{label:"Intermediate",proficiency:"intermediate"}),e.jsx(n,{label:"Advanced",proficiency:"advanced"})]}),e.jsxs(r,{label:"Dark theme",dark:!0,children:[e.jsx(a,{label:"Basic",proficiency:"basic",theme:"dark"}),e.jsx(n,{label:"Intermediate",proficiency:"intermediate",theme:"dark"})]})]}),d=()=>e.jsxs("div",{style:{padding:"80px 24px 24px"},children:[e.jsxs(r,{label:"Hover any skill to see tooltip",children:[e.jsx(a,{label:"Jira",proficiency:"advanced"}),e.jsx(a,{label:"React",proficiency:"intermediate",career:!0}),e.jsx(a,{label:"Python",proficiency:"basic",showDivider:!0})]}),e.jsxs(r,{label:"Dark theme",dark:!0,children:[e.jsx(a,{label:"Jira",proficiency:"advanced",theme:"dark"}),e.jsx(a,{label:"React",proficiency:"intermediate",career:!0,theme:"dark"})]})]}),s=()=>e.jsxs("div",{style:{padding:"80px 24px 24px"},children:[e.jsxs(r,{label:"Hover any skill to see tooltip",children:[e.jsx(n,{label:"Jira",proficiency:"advanced",core:!0,development:!0,verified:!0,verifiedCredy:!0,verifiedFeedback:!0,career:!0}),e.jsx(n,{label:"React",proficiency:"intermediate",development:!0,verified:!0}),e.jsx(n,{label:"Python",proficiency:"basic"})]}),e.jsx(r,{label:"Dark theme",dark:!0,children:e.jsx(n,{label:"Jira",proficiency:"advanced",core:!0,development:!0,verified:!0,theme:"dark"})})]}),p=()=>e.jsxs("div",{style:{padding:"80px 24px 24px"},children:[e.jsxs(r,{label:"Match — hover to see Required + Profile",children:[e.jsx(i,{label:"Jira",requiredProficiency:"advanced",profileProficiency:"advanced",core:!0,development:!0}),e.jsx(i,{label:"React",requiredProficiency:"intermediate",profileProficiency:"basic"}),e.jsx(i,{label:"Vue",requiredProficiency:"advanced",profileProficiency:"intermediate",verified:!0})]}),e.jsxs(r,{label:"Not met — profile missing skill (cross + faded dots)",children:[e.jsx(i,{label:"Jira",requiredProficiency:"basic",missing:!0}),e.jsx(i,{label:"React",requiredProficiency:"intermediate",missing:!0}),e.jsx(i,{label:"Python",requiredProficiency:"advanced",missing:!0})]}),e.jsxs(r,{label:"Substitute — parent-child siblings found (orange icon + bars)",children:[e.jsx(i,{label:"Jira",requiredProficiency:"basic",substitute:!0}),e.jsx(i,{label:"React",requiredProficiency:"intermediate",substitute:!0}),e.jsx(i,{label:"Python",requiredProficiency:"advanced",substitute:!0})]}),e.jsxs(r,{label:"Dark theme",dark:!0,children:[e.jsx(i,{label:"Jira",requiredProficiency:"advanced",profileProficiency:"advanced",theme:"dark"}),e.jsx(i,{label:"React",requiredProficiency:"intermediate",missing:!0,theme:"dark"})]})]}),f=()=>e.jsxs("div",{style:{padding:"80px 24px 24px"},children:[e.jsxs(r,{label:"Role requirements",children:[e.jsx(a,{label:"Jira",proficiency:"advanced",showDivider:!0}),e.jsx(a,{label:"React",proficiency:"intermediate",career:!0,showDivider:!0}),e.jsx(a,{label:"Python",proficiency:"basic"})]}),e.jsxs(r,{label:"Profile skills",children:[e.jsx(n,{label:"Jira",proficiency:"advanced",core:!0,verified:!0,showDivider:!0}),e.jsx(n,{label:"React",proficiency:"intermediate",development:!0,career:!0,showDivider:!0}),e.jsx(n,{label:"Python",proficiency:"basic",verifiedCredy:!0})]}),e.jsxs(r,{label:"Match view (with dividers)",children:[e.jsx(i,{label:"Jira",requiredProficiency:"advanced",profileProficiency:"advanced",core:!0,showDivider:!0}),e.jsx(i,{label:"React",requiredProficiency:"intermediate",profileProficiency:"basic",showDivider:!0}),e.jsx(i,{label:"Python",requiredProficiency:"basic",missing:!0})]})]}),t=()=>e.jsx("div",{style:{padding:24,width:280},children:e.jsx(y,{items:[{label:"Workforce Planning",proficiency:"advanced",core:!0,verified:!0},{label:"Project Management",proficiency:"advanced",core:!0},{label:"HR Business Partnering",proficiency:"advanced",core:!0,verified:!0},{label:"Stakeholder Management",proficiency:"intermediate",verifiedCredy:!0},{label:"Budget Management",proficiency:"intermediate",core:!0,verified:!0}]})}),c=()=>e.jsx("div",{style:{padding:24,width:520},children:e.jsx(y,{items:[{label:"Python"},{label:"PostgreSQL"},{label:"AWS",verified:!0},{label:"Apache Kafka"},{label:"System Design",core:!0}]})}),l=()=>e.jsx("div",{style:{padding:24,width:280,background:"#0D2976",borderRadius:8},children:e.jsx(y,{theme:"dark",items:[{label:"Data Analysis",proficiency:"basic",verifiedCredy:!0},{label:"Risk Management",proficiency:"basic",verifiedCredy:!0},{label:"Talent Acquisition",proficiency:"intermediate",verifiedCredy:!0},{label:"Change Management",proficiency:"intermediate",verifiedCredy:!0}]})});l.parameters={backgrounds:{default:"dark",values:[{name:"dark",value:"#0D2976"}]}};o.__docgenInfo={description:"",methods:[],displayName:"ProficiencyLevels"};d.__docgenInfo={description:"",methods:[],displayName:"Role"};s.__docgenInfo={description:"",methods:[],displayName:"Profile"};p.__docgenInfo={description:"",methods:[],displayName:"Match"};f.__docgenInfo={description:"",methods:[],displayName:"SkillListStory"};t.__docgenInfo={description:"SkillList — vertical list with automatic dividers. Light theme (default).",methods:[],displayName:"SkillListComponent"};c.__docgenInfo={description:"SkillList — proficiency omitted: plain skills separated by dividers (no dots, no tooltip).",methods:[],displayName:"SkillListWithoutProficiency"};l.__docgenInfo={description:"SkillList — dark theme, suitable for use on navy/dark backgrounds.",methods:[],displayName:"SkillListDark"};var b,u,v;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`() => <div style={{
  padding: 24
}}>
    <Section label="Role dots (10×4px pill)">
      <SkillRole label="Basic" proficiency="basic" />
      <SkillRole label="Intermediate" proficiency="intermediate" />
      <SkillRole label="Advanced" proficiency="advanced" />
    </Section>
    <Section label="Profile dots (10×10px circle)">
      <SkillProfile label="Basic" proficiency="basic" />
      <SkillProfile label="Intermediate" proficiency="intermediate" />
      <SkillProfile label="Advanced" proficiency="advanced" />
    </Section>
    <Section label="Dark theme" dark>
      <SkillRole label="Basic" proficiency="basic" theme="dark" />
      <SkillProfile label="Intermediate" proficiency="intermediate" theme="dark" />
    </Section>
  </div>`,...(v=(u=o.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var h,k,S;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`() => <div style={{
  padding: "80px 24px 24px"
}}>
    <Section label="Hover any skill to see tooltip">
      <SkillRole label="Jira" proficiency="advanced" />
      <SkillRole label="React" proficiency="intermediate" career />
      <SkillRole label="Python" proficiency="basic" showDivider />
    </Section>
    <Section label="Dark theme" dark>
      <SkillRole label="Jira" proficiency="advanced" theme="dark" />
      <SkillRole label="React" proficiency="intermediate" career theme="dark" />
    </Section>
  </div>`,...(S=(k=d.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var x,P,g;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`() => <div style={{
  padding: "80px 24px 24px"
}}>
    <Section label="Hover any skill to see tooltip">
      <SkillProfile label="Jira" proficiency="advanced" core development verified verifiedCredy verifiedFeedback career />
      <SkillProfile label="React" proficiency="intermediate" development verified />
      <SkillProfile label="Python" proficiency="basic" />
    </Section>
    <Section label="Dark theme" dark>
      <SkillProfile label="Jira" proficiency="advanced" core development verified theme="dark" />
    </Section>
  </div>`,...(g=(P=s.parameters)==null?void 0:P.docs)==null?void 0:g.source}}};var j,R,D;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`() => <div style={{
  padding: "80px 24px 24px"
}}>
    <Section label="Match — hover to see Required + Profile">
      <SkillMatch label="Jira" requiredProficiency="advanced" profileProficiency="advanced" core development />
      <SkillMatch label="React" requiredProficiency="intermediate" profileProficiency="basic" />
      <SkillMatch label="Vue" requiredProficiency="advanced" profileProficiency="intermediate" verified />
    </Section>
    <Section label="Not met — profile missing skill (cross + faded dots)">
      <SkillMatch label="Jira" requiredProficiency="basic" missing />
      <SkillMatch label="React" requiredProficiency="intermediate" missing />
      <SkillMatch label="Python" requiredProficiency="advanced" missing />
    </Section>
    <Section label="Substitute — parent-child siblings found (orange icon + bars)">
      <SkillMatch label="Jira" requiredProficiency="basic" substitute />
      <SkillMatch label="React" requiredProficiency="intermediate" substitute />
      <SkillMatch label="Python" requiredProficiency="advanced" substitute />
    </Section>
    <Section label="Dark theme" dark>
      <SkillMatch label="Jira" requiredProficiency="advanced" profileProficiency="advanced" theme="dark" />
      <SkillMatch label="React" requiredProficiency="intermediate" missing theme="dark" />
    </Section>
  </div>`,...(D=(R=p.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var q,M,w;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`() => <div style={{
  padding: "80px 24px 24px"
}}>
    <Section label="Role requirements">
      <SkillRole label="Jira" proficiency="advanced" showDivider />
      <SkillRole label="React" proficiency="intermediate" career showDivider />
      <SkillRole label="Python" proficiency="basic" />
    </Section>
    <Section label="Profile skills">
      <SkillProfile label="Jira" proficiency="advanced" core verified showDivider />
      <SkillProfile label="React" proficiency="intermediate" development career showDivider />
      <SkillProfile label="Python" proficiency="basic" verifiedCredy />
    </Section>
    <Section label="Match view (with dividers)">
      <SkillMatch label="Jira" requiredProficiency="advanced" profileProficiency="advanced" core showDivider />
      <SkillMatch label="React" requiredProficiency="intermediate" profileProficiency="basic" showDivider />
      <SkillMatch label="Python" requiredProficiency="basic" missing />
    </Section>
  </div>`,...(w=(M=f.parameters)==null?void 0:M.docs)==null?void 0:w.source}}};var L,J,C,_,I;t.parameters={...t.parameters,docs:{...(L=t.parameters)==null?void 0:L.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  width: 280
}}>
    <SkillList items={[{
    label: "Workforce Planning",
    proficiency: "advanced",
    core: true,
    verified: true
  }, {
    label: "Project Management",
    proficiency: "advanced",
    core: true
  }, {
    label: "HR Business Partnering",
    proficiency: "advanced",
    core: true,
    verified: true
  }, {
    label: "Stakeholder Management",
    proficiency: "intermediate",
    verifiedCredy: true
  }, {
    label: "Budget Management",
    proficiency: "intermediate",
    core: true,
    verified: true
  }]} />
  </div>`,...(C=(J=t.parameters)==null?void 0:J.docs)==null?void 0:C.source},description:{story:"SkillList — vertical list with automatic dividers. Light theme (default).",...(I=(_=t.parameters)==null?void 0:_.docs)==null?void 0:I.description}}};var A,B,N,W,E;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  width: 520
}}>
    <SkillList items={[{
    label: "Python"
  }, {
    label: "PostgreSQL"
  }, {
    label: "AWS",
    verified: true
  }, {
    label: "Apache Kafka"
  }, {
    label: "System Design",
    core: true
  }]} />
  </div>`,...(N=(B=c.parameters)==null?void 0:B.docs)==null?void 0:N.source},description:{story:"SkillList — proficiency omitted: plain skills separated by dividers (no dots, no tooltip).",...(E=(W=c.parameters)==null?void 0:W.docs)==null?void 0:E.description}}};var F,H,K,T,O;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  width: 280,
  background: "#0D2976",
  borderRadius: 8
}}>
    <SkillList theme="dark" items={[{
    label: "Data Analysis",
    proficiency: "basic",
    verifiedCredy: true
  }, {
    label: "Risk Management",
    proficiency: "basic",
    verifiedCredy: true
  }, {
    label: "Talent Acquisition",
    proficiency: "intermediate",
    verifiedCredy: true
  }, {
    label: "Change Management",
    proficiency: "intermediate",
    verifiedCredy: true
  }]} />
  </div>`,...(K=(H=l.parameters)==null?void 0:H.docs)==null?void 0:K.source},description:{story:"SkillList — dark theme, suitable for use on navy/dark backgrounds.",...(O=(T=l.parameters)==null?void 0:T.docs)==null?void 0:O.description}}};const ee=["ProficiencyLevels","Role","Profile","Match","SkillListStory","SkillListComponent","SkillListWithoutProficiency","SkillListDark"];export{p as Match,o as ProficiencyLevels,s as Profile,d as Role,t as SkillListComponent,l as SkillListDark,f as SkillListStory,c as SkillListWithoutProficiency,ee as __namedExportsOrder,$ as default};
