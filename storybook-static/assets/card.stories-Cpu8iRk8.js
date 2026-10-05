import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as w}from"./index-DhMLlvMY.js";import{C as n}from"./card-D8IF44jB.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-D1UQke6Y.js";import"./workforce_member-DGZhzlsU.js";import"./avatar-DzCkQh3P.js";import"./tooltip-Bkp5rPqR.js";import"./button_group-DgNR1rlJ.js";import"./skill-D--uWoeQ.js";const Y={title:"Molecules/Card",component:n,parameters:{layout:"padded",docs:{description:{component:"Profile card in two variants: **match** (scores + expand/collapse + role fields) and **directory** (with avatar, Open CV button). Skills use the SkillMatch component with built-in hover tooltip. Shell: white bg, radius 8px, box-shadow rgba(203,225,242,0.8)."}}}},a=[{label:"Essential skills",count:"2/2",skills:[{name:"Project Management",requiredProficiency:"intermediate",profileProficiency:"advanced"},{name:"Jira",requiredProficiency:"intermediate",profileProficiency:"intermediate"}]},{label:"Supporting skills",count:"1/1",skills:[{name:"Agile",requiredProficiency:"basic",profileProficiency:"intermediate"}]}],h=[{label:"Related skills",skills:[{name:"Scrum",requiredProficiency:"intermediate",profileProficiency:"advanced"},{name:"Kanban",requiredProficiency:"basic",profileProficiency:"basic"},{name:"Confluence",requiredProficiency:"basic",profileProficiency:"basic",missing:!0}]},{label:"Skills in Framework",skills:[{name:"Leadership",requiredProficiency:"intermediate",profileProficiency:"intermediate"},{name:"Communication",requiredProficiency:"intermediate",profileProficiency:"advanced"}]}],u=[{label:"Grade",value:"Senior",matches:!0},{label:"Location",value:"London",matches:!0},{label:"Clearance",value:"SC Required",matches:!1},{label:"Start date",value:"01 Jan 2024",matches:void 0}],t={name:"Match — not shortlisted (collapsed)",render:()=>e.jsx("div",{style:{maxWidth:960},children:e.jsx(n,{variant:"match",name:"Ashlynn Lipshutz",jobTitle:"Senior Project Manager",initials:"AL",matchPercent:80,availabilityPercent:90,skillGroups:a,expandedSkillGroups:h,roleFields:u,actions:{step:"not-shortlisted",onShortlist:()=>alert("Shortlist"),onFillBook:()=>alert("Fill & Book"),onFillBookDropdown:()=>alert("Fill & Book dropdown")}})})},r={name:"Match — expandable (click chevron)",render:()=>{const[i,m]=w.useState(!1);return e.jsxs("div",{style:{maxWidth:960},children:[e.jsx(n,{variant:"match",name:"Ashlynn Lipshutz",jobTitle:"Senior Project Manager",initials:"AL",matchPercent:80,availabilityPercent:90,expanded:i,onExpandedChange:m,skillGroups:a,expandedSkillGroups:h,roleFields:u,actions:{step:"not-shortlisted",onShortlist:()=>alert("Shortlist"),onFillBook:()=>alert("Fill & Book")}}),e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginTop:8},children:i?"Expanded — click chevron to collapse":"Collapsed — click chevron to expand"})]})}},l={name:"Match — expanded (with role fields + extra skills)",render:()=>e.jsx("div",{style:{maxWidth:960},children:e.jsx(n,{variant:"match",name:"Ashlynn Lipshutz",jobTitle:"Senior Project Manager",initials:"AL",matchPercent:80,availabilityPercent:90,defaultExpanded:!0,skillGroups:a,expandedSkillGroups:h,roleFields:u,actions:{step:"not-shortlisted",onShortlist:()=>{}}})})},O=["not-shortlisted","shortlisted","shortlisted-reviewer","accepted-invite","invited","accepted-fillbook","booked","filled","declined"],s={name:"All resourcing steps",render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:960},children:O.map(i=>e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:4,fontWeight:700},children:i}),e.jsx(n,{variant:"match",name:"Ashlynn Lipshutz",jobTitle:"Senior Project Manager",initials:"AL",matchPercent:80,availabilityPercent:90,skillGroups:a.slice(0,1),actions:{step:i,onShortlist:()=>alert("Shortlist"),onApprove:()=>alert("Approve"),onReject:()=>alert("Reject"),onRevert:()=>alert(`Revert from ${i}`)}})]},i))})},o={name:"Score variants",render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:960},children:[{match:95,avail:100},{match:72,avail:85},{match:45,avail:60},{match:10,avail:30}].map(({match:i,avail:m})=>e.jsx(n,{variant:"match",name:"Ashlynn Lipshutz",jobTitle:"Senior Project Manager",initials:"AL",matchPercent:i,availabilityPercent:m,skillGroups:a.slice(0,1),actions:{step:"not-shortlisted"}},i))})},c={name:"Directory (with avatar, Open CV)",render:()=>e.jsx("div",{style:{maxWidth:960},children:e.jsx(n,{variant:"directory",name:"Ashlynn Lipshutz",jobTitle:"Senior Project Manager",initials:"AL",skillGroups:[{label:"Core skills",skills:[{name:"Project Management",requiredProficiency:"intermediate",profileProficiency:"advanced"},{name:"Jira",requiredProficiency:"basic",profileProficiency:"intermediate"}]},{label:"Other skills",skills:[{name:"Agile",requiredProficiency:"basic",profileProficiency:"intermediate"}]}],actions:{onShortlist:()=>alert("Shortlist"),onSecondary:()=>alert("Open CV")}})})},d={name:"Directory — profile flags",render:()=>e.jsx("div",{style:{maxWidth:960},children:e.jsx(n,{variant:"directory",name:"Charlie Parker",jobTitle:"Agile Business Analyst",initials:"CP",profileFlags:{contractualTimeSlice:!0,suggested:!0},skillGroups:a,actions:{onShortlist:()=>alert("Shortlist"),onSecondary:()=>alert("Open CV")}})})},p={name:"Card list (multiple matches)",render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,maxWidth:960},children:[{name:"Ashlynn Lipshutz",initials:"AL",match:80,avail:90,step:"not-shortlisted"},{name:"Charlie Parker",initials:"CP",match:65,avail:75,step:"shortlisted"},{name:"Jane Smith",initials:"JS",match:55,avail:60,step:"invited"}].map(i=>e.jsx(n,{variant:"match",name:i.name,jobTitle:"Project Manager",initials:i.initials,matchPercent:i.match,availabilityPercent:i.avail,skillGroups:a.slice(0,1),actions:{step:i.step,onShortlist:()=>{}}},i.name))})};var v,y,S;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Match — not shortlisted (collapsed)",
  render: () => <div style={{
    maxWidth: 960
  }}>
      <Card variant="match" name="Ashlynn Lipshutz" jobTitle="Senior Project Manager" initials="AL" matchPercent={80} availabilityPercent={90} skillGroups={sampleSkillGroups} expandedSkillGroups={expandedSkillGroups} roleFields={sampleRoleFields} actions={{
      step: "not-shortlisted",
      onShortlist: () => alert("Shortlist"),
      onFillBook: () => alert("Fill & Book"),
      onFillBookDropdown: () => alert("Fill & Book dropdown")
    }} />
    </div>
}`,...(S=(y=t.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var f,x,k;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Match — expandable (click chevron)",
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return <div style={{
      maxWidth: 960
    }}>
        <Card variant="match" name="Ashlynn Lipshutz" jobTitle="Senior Project Manager" initials="AL" matchPercent={80} availabilityPercent={90} expanded={expanded} onExpandedChange={setExpanded} skillGroups={sampleSkillGroups} expandedSkillGroups={expandedSkillGroups} roleFields={sampleRoleFields} actions={{
        step: "not-shortlisted",
        onShortlist: () => alert("Shortlist"),
        onFillBook: () => alert("Fill & Book")
      }} />
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginTop: 8
      }}>
          {expanded ? "Expanded — click chevron to collapse" : "Collapsed — click chevron to expand"}
        </p>
      </div>;
  }
}`,...(k=(x=r.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var P,b,g;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Match — expanded (with role fields + extra skills)",
  render: () => <div style={{
    maxWidth: 960
  }}>
      <Card variant="match" name="Ashlynn Lipshutz" jobTitle="Senior Project Manager" initials="AL" matchPercent={80} availabilityPercent={90} defaultExpanded skillGroups={sampleSkillGroups} expandedSkillGroups={expandedSkillGroups} roleFields={sampleRoleFields} actions={{
      step: "not-shortlisted",
      onShortlist: () => {}
    }} />
    </div>
}`,...(g=(b=l.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var j,C,A;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "All resourcing steps",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 960
  }}>
      {steps.map(step => <div key={step}>
          <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 4,
        fontWeight: 700
      }}>
            {step}
          </p>
          <Card variant="match" name="Ashlynn Lipshutz" jobTitle="Senior Project Manager" initials="AL" matchPercent={80} availabilityPercent={90} skillGroups={sampleSkillGroups.slice(0, 1)} actions={{
        step,
        onShortlist: () => alert("Shortlist"),
        onApprove: () => alert("Approve"),
        onReject: () => alert("Reject"),
        onRevert: () => alert(\`Revert from \${step}\`)
      }} />
        </div>)}
    </div>
}`,...(A=(C=s.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};var M,G,L;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "Score variants",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 960
  }}>
      {[{
      match: 95,
      avail: 100
    }, {
      match: 72,
      avail: 85
    }, {
      match: 45,
      avail: 60
    }, {
      match: 10,
      avail: 30
    }].map(({
      match,
      avail
    }) => <Card key={match} variant="match" name="Ashlynn Lipshutz" jobTitle="Senior Project Manager" initials="AL" matchPercent={match} availabilityPercent={avail} skillGroups={sampleSkillGroups.slice(0, 1)} actions={{
      step: "not-shortlisted"
    }} />)}
    </div>
}`,...(L=(G=o.parameters)==null?void 0:G.docs)==null?void 0:L.source}}};var F,E,T;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: "Directory (with avatar, Open CV)",
  render: () => <div style={{
    maxWidth: 960
  }}>
      <Card variant="directory" name="Ashlynn Lipshutz" jobTitle="Senior Project Manager" initials="AL" skillGroups={[{
      label: "Core skills",
      skills: [{
        name: "Project Management",
        requiredProficiency: "intermediate" as const,
        profileProficiency: "advanced" as const
      }, {
        name: "Jira",
        requiredProficiency: "basic" as const,
        profileProficiency: "intermediate" as const
      }]
    }, {
      label: "Other skills",
      skills: [{
        name: "Agile",
        requiredProficiency: "basic" as const,
        profileProficiency: "intermediate" as const
      }]
    }] as SkillGroup[]} actions={{
      onShortlist: () => alert("Shortlist"),
      onSecondary: () => alert("Open CV")
    }} />
    </div>
}`,...(T=(E=c.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var W,z,R;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: "Directory — profile flags",
  render: () => <div style={{
    maxWidth: 960
  }}>
      <Card variant="directory" name="Charlie Parker" jobTitle="Agile Business Analyst" initials="CP" profileFlags={{
      contractualTimeSlice: true,
      suggested: true
    }} skillGroups={sampleSkillGroups} actions={{
      onShortlist: () => alert("Shortlist"),
      onSecondary: () => alert("Open CV")
    }} />
    </div>
}`,...(R=(z=d.parameters)==null?void 0:z.docs)==null?void 0:R.source}}};var B,D,q;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Card list (multiple matches)",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxWidth: 960
  }}>
      {[{
      name: "Ashlynn Lipshutz",
      initials: "AL",
      match: 80,
      avail: 90,
      step: "not-shortlisted" as const
    }, {
      name: "Charlie Parker",
      initials: "CP",
      match: 65,
      avail: 75,
      step: "shortlisted" as const
    }, {
      name: "Jane Smith",
      initials: "JS",
      match: 55,
      avail: 60,
      step: "invited" as const
    }].map(p => <Card key={p.name} variant="match" name={p.name} jobTitle="Project Manager" initials={p.initials} matchPercent={p.match} availabilityPercent={p.avail} skillGroups={sampleSkillGroups.slice(0, 1)} actions={{
      step: p.step,
      onShortlist: () => {}
    }} />)}
    </div>
}`,...(q=(D=p.parameters)==null?void 0:D.docs)==null?void 0:q.source}}};const Z=["MatchNotShortlisted","MatchExpandable","MatchExpanded","AllResourcingSteps","ScoresVariants","Directory","DirectoryWithIcons","CardList"];export{s as AllResourcingSteps,p as CardList,c as Directory,d as DirectoryWithIcons,r as MatchExpandable,l as MatchExpanded,t as MatchNotShortlisted,o as ScoresVariants,Z as __namedExportsOrder,Y as default};
