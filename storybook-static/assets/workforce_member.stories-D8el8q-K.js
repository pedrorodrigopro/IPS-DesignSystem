import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{W as n}from"./workforce_member-DGZhzlsU.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./avatar-DzCkQh3P.js";import"./icon-D1UQke6Y.js";import"./index-DhMLlvMY.js";import"./tooltip-Bkp5rPqR.js";const V={title:"Components/WorkforceMember",component:n,parameters:{layout:"padded",docs:{description:{component:"Profile/Workforce Member display in 5 variants: small-1line, small-2lines, small-3lines, big, card. Supports profile icon badges (placeholder, suspended, interest, contractualTimeSlice, suggested, namedResource) each with a tooltip on hover. Icons sit inline next to the name."}}}},a={name:"Charlie Parker",initials:"CP",email:"charlie.parker@profinda.com",jobTitle:"Project Manager"},r={name:"small-1line (default)",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx(n,{variant:"small-1line",...a}),e.jsx(n,{variant:"small-1line",...a,onClick:()=>alert("clicked")}),e.jsx(n,{variant:"small-1line",...a,suspended:!0}),e.jsx(n,{variant:"small-1line",...a,placeholder:!0}),e.jsx(n,{variant:"small-1line",...a,interest:!0}),e.jsx(n,{variant:"small-1line",...a,contractualTimeSlice:!0}),e.jsx(n,{variant:"small-1line",...a,suggested:!0}),e.jsx(n,{variant:"small-1line",...a,namedResource:!0})]})},l={name:"small-2lines",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(n,{variant:"small-2lines",...a}),e.jsx(n,{variant:"small-2lines",...a,suspended:!0}),e.jsx(n,{variant:"small-2lines",...a,contractualTimeSlice:!0,suggested:!0}),e.jsx(n,{variant:"small-2lines",...a,namedResource:!0})]})},s={name:"small-3lines",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(n,{variant:"small-3lines",...a}),e.jsx(n,{variant:"small-3lines",...a,interest:!0,placeholder:!0}),e.jsx(n,{variant:"small-3lines",...a,namedResource:!0})]})},i={name:"big",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24},children:[e.jsx(n,{variant:"big",...a,datapoints:[{label:"Job title",value:"Agile Business Analyst"},{label:"Location",value:"Brown"},{label:"Starting date",value:"31 May 1996"},{label:"Languages",value:"English, French, Romanian, Spanish"}]}),e.jsx(n,{variant:"big",...a,contractualTimeSlice:!0,suggested:!0,datapoints:[{label:"Job title",value:"Senior Developer"},{label:"Location",value:"London"}]})]})},t={name:"card",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24},children:[e.jsx(n,{variant:"card",name:"Ashlynn Lipshutz",initials:"AL",jobTitle:"Senior Project Manager"}),e.jsx(n,{variant:"card",name:"Ashlynn Lipshutz",initials:"AL",jobTitle:"Senior Project Manager",addedBy:"Integration",suggested:!0}),e.jsx(n,{variant:"card",name:"Ashlynn Lipshutz",initials:"AL",jobTitle:"Senior Project Manager",namedResource:!0,suspended:!0})]})},o={name:"All profile icons (hover for tooltips)",render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,paddingTop:40},children:[{label:"Placeholder",props:{placeholder:!0}},{label:"Suspended",props:{suspended:!0}},{label:"Interest",props:{interest:!0}},{label:"Contractual time slice",props:{contractualTimeSlice:!0}},{label:"Suggested",props:{suggested:!0}},{label:"Named resource",props:{namedResource:!0}},{label:"All flags",props:{placeholder:!0,suspended:!0,interest:!0,contractualTimeSlice:!0,suggested:!0,namedResource:!0}}].map(({label:m,props:C})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",width:180,flexShrink:0},children:m}),e.jsx(n,{variant:"small-1line",...a,...C})]},m))})},c={name:"All variants",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:32,paddingTop:40},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"small-1line"}),e.jsx(n,{variant:"small-1line",...a,interest:!0})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"small-2lines"}),e.jsx(n,{variant:"small-2lines",...a,suggested:!0})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"small-3lines"}),e.jsx(n,{variant:"small-3lines",...a,contractualTimeSlice:!0})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"big"}),e.jsx(n,{variant:"big",...a,datapoints:[{label:"Job title",value:"Agile Business Analyst"},{label:"Location",value:"Brown"}]})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8,fontWeight:700},children:"card"}),e.jsx(n,{variant:"card",name:"Ashlynn Lipshutz",initials:"AL",jobTitle:"Senior Project Manager",addedBy:"Integration",namedResource:!0})]})]})};var d,p,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "small-1line (default)",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>
      <WorkforceMember variant="small-1line" {...baseProps} />
      <WorkforceMember variant="small-1line" {...baseProps} onClick={() => alert("clicked")} />
      <WorkforceMember variant="small-1line" {...baseProps} suspended />
      <WorkforceMember variant="small-1line" {...baseProps} placeholder />
      <WorkforceMember variant="small-1line" {...baseProps} interest />
      <WorkforceMember variant="small-1line" {...baseProps} contractualTimeSlice />
      <WorkforceMember variant="small-1line" {...baseProps} suggested />
      <WorkforceMember variant="small-1line" {...baseProps} namedResource />
    </div>
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,f,v;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "small-2lines",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12
  }}>
      <WorkforceMember variant="small-2lines" {...baseProps} />
      <WorkforceMember variant="small-2lines" {...baseProps} suspended />
      <WorkforceMember variant="small-2lines" {...baseProps} contractualTimeSlice suggested />
      <WorkforceMember variant="small-2lines" {...baseProps} namedResource />
    </div>
}`,...(v=(f=l.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var b,h,x;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "small-3lines",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12
  }}>
      <WorkforceMember variant="small-3lines" {...baseProps} />
      <WorkforceMember variant="small-3lines" {...baseProps} interest placeholder />
      <WorkforceMember variant="small-3lines" {...baseProps} namedResource />
    </div>
}`,...(x=(h=s.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var y,j,S;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "big",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 24
  }}>
      <WorkforceMember variant="big" {...baseProps} datapoints={[{
      label: "Job title",
      value: "Agile Business Analyst"
    }, {
      label: "Location",
      value: "Brown"
    }, {
      label: "Starting date",
      value: "31 May 1996"
    }, {
      label: "Languages",
      value: "English, French, Romanian, Spanish"
    }]} />
      <WorkforceMember variant="big" {...baseProps} contractualTimeSlice suggested datapoints={[{
      label: "Job title",
      value: "Senior Developer"
    }, {
      label: "Location",
      value: "London"
    }]} />
    </div>
}`,...(S=(j=i.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var M,W,P;t.parameters={...t.parameters,docs:{...(M=t.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "card",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 24
  }}>
      <WorkforceMember variant="card" name="Ashlynn Lipshutz" initials="AL" jobTitle="Senior Project Manager" />
      <WorkforceMember variant="card" name="Ashlynn Lipshutz" initials="AL" jobTitle="Senior Project Manager" addedBy="Integration" suggested />
      <WorkforceMember variant="card" name="Ashlynn Lipshutz" initials="AL" jobTitle="Senior Project Manager" namedResource suspended />
    </div>
}`,...(P=(W=t.parameters)==null?void 0:W.docs)==null?void 0:P.source}}};var k,A,L;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "All profile icons (hover for tooltips)",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingTop: 40
  }}>
      {[{
      label: "Placeholder",
      props: {
        placeholder: true
      }
    }, {
      label: "Suspended",
      props: {
        suspended: true
      }
    }, {
      label: "Interest",
      props: {
        interest: true
      }
    }, {
      label: "Contractual time slice",
      props: {
        contractualTimeSlice: true
      }
    }, {
      label: "Suggested",
      props: {
        suggested: true
      }
    }, {
      label: "Named resource",
      props: {
        namedResource: true
      }
    }, {
      label: "All flags",
      props: {
        placeholder: true,
        suspended: true,
        interest: true,
        contractualTimeSlice: true,
        suggested: true,
        namedResource: true
      }
    }].map(({
      label,
      props
    }) => <div key={label} style={{
      display: "flex",
      alignItems: "center",
      gap: 16
    }}>
          <span style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        width: 180,
        flexShrink: 0
      }}>
            {label}
          </span>
          <WorkforceMember variant="small-1line" {...baseProps} {...props} />
        </div>)}
    </div>
}`,...(L=(A=o.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};var E,T,B;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "All variants",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 32,
    paddingTop: 40
  }}>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>small-1line</p>
        <WorkforceMember variant="small-1line" {...baseProps} interest />
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>small-2lines</p>
        <WorkforceMember variant="small-2lines" {...baseProps} suggested />
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>small-3lines</p>
        <WorkforceMember variant="small-3lines" {...baseProps} contractualTimeSlice />
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>big</p>
        <WorkforceMember variant="big" {...baseProps} datapoints={[{
        label: "Job title",
        value: "Agile Business Analyst"
      }, {
        label: "Location",
        value: "Brown"
      }]} />
      </div>
      <div>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        marginBottom: 8,
        fontWeight: 700
      }}>card</p>
        <WorkforceMember variant="card" name="Ashlynn Lipshutz" initials="AL" jobTitle="Senior Project Manager" addedBy="Integration" namedResource />
      </div>
    </div>
}`,...(B=(T=c.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};const _=["Small1Line","Small2Lines","Small3Lines","Big","Card","AllProfileIcons","AllVariants"];export{o as AllProfileIcons,c as AllVariants,i as Big,t as Card,r as Small1Line,l as Small2Lines,s as Small3Lines,_ as __namedExportsOrder,V as default};
