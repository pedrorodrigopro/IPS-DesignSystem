import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as i,a,b as l}from"./skill-D--uWoeQ.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DhMLlvMY.js";import"./icon-D1UQke6Y.js";const L={title:"Components/Skill",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=9732-260872"},layout:"centered"}},r=({label:q,dark:s,children:D})=>e.jsxs("div",{style:{marginBottom:32,background:s?"#0D2976":"transparent",padding:s?"16px":0,borderRadius:s?8:0},children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:s?"#5C6E9E":"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:q}),e.jsx("div",{style:{display:"flex",gap:32,flexWrap:"wrap",alignItems:"center"},children:D})]}),c=()=>e.jsxs("div",{style:{padding:24},children:[e.jsxs(r,{label:"Role dots (10×4px pill)",children:[e.jsx(a,{label:"Basic",proficiency:"basic"}),e.jsx(a,{label:"Intermediate",proficiency:"intermediate"}),e.jsx(a,{label:"Advanced",proficiency:"advanced"})]}),e.jsxs(r,{label:"Profile dots (10×10px circle)",children:[e.jsx(l,{label:"Basic",proficiency:"basic"}),e.jsx(l,{label:"Intermediate",proficiency:"intermediate"}),e.jsx(l,{label:"Advanced",proficiency:"advanced"})]}),e.jsxs(r,{label:"Dark theme",dark:!0,children:[e.jsx(a,{label:"Basic",proficiency:"basic",theme:"dark"}),e.jsx(l,{label:"Intermediate",proficiency:"intermediate",theme:"dark"})]})]}),n=()=>e.jsxs("div",{style:{padding:"80px 24px 24px"},children:[e.jsxs(r,{label:"Hover any skill to see tooltip",children:[e.jsx(a,{label:"Jira",proficiency:"advanced"}),e.jsx(a,{label:"React",proficiency:"intermediate",career:!0}),e.jsx(a,{label:"Python",proficiency:"basic",showDivider:!0})]}),e.jsxs(r,{label:"Dark theme",dark:!0,children:[e.jsx(a,{label:"Jira",proficiency:"advanced",theme:"dark"}),e.jsx(a,{label:"React",proficiency:"intermediate",career:!0,theme:"dark"})]})]}),t=()=>e.jsxs("div",{style:{padding:"80px 24px 24px"},children:[e.jsxs(r,{label:"Hover any skill to see tooltip",children:[e.jsx(l,{label:"Jira",proficiency:"advanced",core:!0,development:!0,verified:!0,verifiedCredy:!0,verifiedFeedback:!0,career:!0}),e.jsx(l,{label:"React",proficiency:"intermediate",development:!0,verified:!0}),e.jsx(l,{label:"Python",proficiency:"basic"})]}),e.jsx(r,{label:"Dark theme",dark:!0,children:e.jsx(l,{label:"Jira",proficiency:"advanced",core:!0,development:!0,verified:!0,theme:"dark"})})]}),o=()=>e.jsxs("div",{style:{padding:"80px 24px 24px"},children:[e.jsxs(r,{label:"Match — hover to see Required + Profile",children:[e.jsx(i,{label:"Jira",requiredProficiency:"advanced",profileProficiency:"advanced",core:!0,development:!0}),e.jsx(i,{label:"React",requiredProficiency:"intermediate",profileProficiency:"basic"}),e.jsx(i,{label:"Vue",requiredProficiency:"advanced",profileProficiency:"intermediate",verified:!0})]}),e.jsxs(r,{label:"Not met — profile missing skill (cross + faded dots)",children:[e.jsx(i,{label:"Jira",requiredProficiency:"basic",missing:!0}),e.jsx(i,{label:"React",requiredProficiency:"intermediate",missing:!0}),e.jsx(i,{label:"Python",requiredProficiency:"advanced",missing:!0})]}),e.jsxs(r,{label:"Substitute — parent-child siblings found (orange icon + bars)",children:[e.jsx(i,{label:"Jira",requiredProficiency:"basic",substitute:!0}),e.jsx(i,{label:"React",requiredProficiency:"intermediate",substitute:!0}),e.jsx(i,{label:"Python",requiredProficiency:"advanced",substitute:!0})]}),e.jsxs(r,{label:"Dark theme",dark:!0,children:[e.jsx(i,{label:"Jira",requiredProficiency:"advanced",profileProficiency:"advanced",theme:"dark"}),e.jsx(i,{label:"React",requiredProficiency:"intermediate",missing:!0,theme:"dark"})]})]}),d=()=>e.jsxs("div",{style:{padding:"80px 24px 24px"},children:[e.jsxs(r,{label:"Role requirements",children:[e.jsx(a,{label:"Jira",proficiency:"advanced",showDivider:!0}),e.jsx(a,{label:"React",proficiency:"intermediate",career:!0,showDivider:!0}),e.jsx(a,{label:"Python",proficiency:"basic"})]}),e.jsxs(r,{label:"Profile skills",children:[e.jsx(l,{label:"Jira",proficiency:"advanced",core:!0,verified:!0,showDivider:!0}),e.jsx(l,{label:"React",proficiency:"intermediate",development:!0,career:!0,showDivider:!0}),e.jsx(l,{label:"Python",proficiency:"basic",verifiedCredy:!0})]}),e.jsxs(r,{label:"Match view (with dividers)",children:[e.jsx(i,{label:"Jira",requiredProficiency:"advanced",profileProficiency:"advanced",core:!0,showDivider:!0}),e.jsx(i,{label:"React",requiredProficiency:"intermediate",profileProficiency:"basic",showDivider:!0}),e.jsx(i,{label:"Python",requiredProficiency:"basic",missing:!0})]})]});c.__docgenInfo={description:"",methods:[],displayName:"ProficiencyLevels"};n.__docgenInfo={description:"",methods:[],displayName:"Role"};t.__docgenInfo={description:"",methods:[],displayName:"Profile"};o.__docgenInfo={description:"",methods:[],displayName:"Match"};d.__docgenInfo={description:"",methods:[],displayName:"SkillList"};var p,f,b;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(b=(f=c.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var m,y,u;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(u=(y=n.parameters)==null?void 0:y.docs)==null?void 0:u.source}}};var v,h,x;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(x=(h=t.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var k,S,P;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(P=(S=o.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var j,g,R;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`() => <div style={{
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
  </div>`,...(R=(g=d.parameters)==null?void 0:g.docs)==null?void 0:R.source}}};const N=["ProficiencyLevels","Role","Profile","Match","SkillList"];export{o as Match,c as ProficiencyLevels,t as Profile,n as Role,d as SkillList,N as __namedExportsOrder,L as default};
