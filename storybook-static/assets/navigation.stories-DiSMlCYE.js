import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as m}from"./index-DhMLlvMY.js";import{N as a,a as b}from"./navigation-Bk3kGR9g.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-D1UQke6Y.js";const T={title:"Components/Navigation",component:a,parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=5797-282907"},layout:"centered"},argTypes:{orientation:{control:"select",options:["horizontal","vertical"]}}},g=[{id:"description",label:"Description"},{id:"matches",label:"Matches",badge:4},{id:"interested",label:"Interested"},{id:"shortlist",label:"Shortlist"},{id:"vacancies",label:"Vacancies",badge:1}],l=()=>{const[t,i]=m.useState("matches");return e.jsx(a,{orientation:"horizontal",tabs:g,activeId:t,onChange:i})},r=()=>{const[t,i]=m.useState("matches");return e.jsx(a,{orientation:"vertical",tabs:g,activeId:t,onChange:i})},d=()=>{const[t,i]=m.useState("selected");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,padding:24},children:[e.jsxs("div",{children:[e.jsx(c,{children:"All states"}),e.jsx(a,{orientation:"horizontal",tabs:[{id:"selected",label:"Feedback"},{id:"default",label:"Feedback"},{id:"disabled",label:"Feedback",disabled:!0}],activeId:t,onChange:i})]}),e.jsxs("div",{children:[e.jsx(c,{children:"With icon (check)"}),e.jsx(a,{orientation:"horizontal",tabs:[{id:"icon-active",label:"Feedback",showIcon:!0},{id:"icon-inactive",label:"Feedback",showIcon:!0}],activeId:"icon-active",onChange:()=>{}})]}),e.jsxs("div",{children:[e.jsx(c,{children:"With badge"}),e.jsx(a,{orientation:"horizontal",tabs:[{id:"badge-active",label:"Feedback",badge:4},{id:"badge-inactive",label:"Feedback",badge:1}],activeId:"badge-active",onChange:()=>{}})]}),e.jsxs("div",{children:[e.jsx(c,{children:"With subtitle (two lines)"}),e.jsx(a,{orientation:"horizontal",tabs:[{id:"sub-active",label:"Feedback",subtitle:"Feedback"},{id:"sub-inactive",label:"Feedback",subtitle:"Feedback"}],activeId:"sub-active",onChange:()=>{}})]}),e.jsxs("div",{children:[e.jsx(c,{children:"With icon + badge + subtitle"}),e.jsx(a,{orientation:"horizontal",tabs:[{id:"full-active",label:"Feedback",showIcon:!0,badge:4,subtitle:"Feedback"},{id:"full-inactive",label:"Feedback",showIcon:!0,badge:1,subtitle:"Feedback"}],activeId:"full-active",onChange:()=>{}})]})]})},c=({children:t})=>e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:t}),n=t=>e.jsx(a,{...t});n.args={orientation:"horizontal",tabs:g,activeId:"matches"};const v=[{id:"home",icon:"home",label:"Home"},{id:"marketplace",icon:"marketplace",label:"Marketplace"},{id:"workflow",icon:"workflow",label:"Workflow"},{id:"insights",icon:"insights",label:"Insights"},{id:"profiles",icon:"profile",label:"Profiles"}],s=()=>{const[t,i]=m.useState("home");return e.jsx("div",{style:{padding:40,background:"#F8F9FD",display:"inline-block"},children:e.jsx(b,{items:v,activeId:t,onChange:i})})};s.storyName="Marketing (dark pill)";const o=()=>e.jsxs("div",{style:{padding:40,display:"flex",flexDirection:"column",gap:24},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8},children:"First item selected"}),e.jsx(b,{items:v,activeId:"home"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8},children:"Middle item selected"}),e.jsx(b,{items:v,activeId:"workflow"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",marginBottom:8},children:"No selection"}),e.jsx(b,{items:v})]})]});o.storyName="Marketing — all states";l.__docgenInfo={description:"",methods:[],displayName:"Horizontal"};r.__docgenInfo={description:"",methods:[],displayName:"Vertical"};d.__docgenInfo={description:"",methods:[],displayName:"TabVariants"};n.__docgenInfo={description:"",methods:[],displayName:"Default"};s.__docgenInfo={description:"",methods:[],displayName:"Marketing"};o.__docgenInfo={description:"",methods:[],displayName:"MarketingAllStates"};var h,p,u;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [active, setActive] = useState("matches");
  return <Navigation orientation="horizontal" tabs={tabs} activeId={active} onChange={setActive} />;
}`,...(u=(p=l.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var k,f,F;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  const [active, setActive] = useState("matches");
  return <Navigation orientation="vertical" tabs={tabs} activeId={active} onChange={setActive} />;
}`,...(F=(f=r.parameters)==null?void 0:f.docs)==null?void 0:F.source}}};var I,x,y;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [active, setActive] = useState("selected");
  return <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: 24
  }}>
      <div>
        <Label>All states</Label>
        <Navigation orientation="horizontal" tabs={[{
        id: "selected",
        label: "Feedback"
      }, {
        id: "default",
        label: "Feedback"
      }, {
        id: "disabled",
        label: "Feedback",
        disabled: true
      }]} activeId={active} onChange={setActive} />
      </div>
      <div>
        <Label>With icon (check)</Label>
        <Navigation orientation="horizontal" tabs={[{
        id: "icon-active",
        label: "Feedback",
        showIcon: true
      }, {
        id: "icon-inactive",
        label: "Feedback",
        showIcon: true
      }]} activeId="icon-active" onChange={() => {}} />
      </div>
      <div>
        <Label>With badge</Label>
        <Navigation orientation="horizontal" tabs={[{
        id: "badge-active",
        label: "Feedback",
        badge: 4
      }, {
        id: "badge-inactive",
        label: "Feedback",
        badge: 1
      }]} activeId="badge-active" onChange={() => {}} />
      </div>
      <div>
        <Label>With subtitle (two lines)</Label>
        <Navigation orientation="horizontal" tabs={[{
        id: "sub-active",
        label: "Feedback",
        subtitle: "Feedback"
      }, {
        id: "sub-inactive",
        label: "Feedback",
        subtitle: "Feedback"
      }]} activeId="sub-active" onChange={() => {}} />
      </div>
      <div>
        <Label>With icon + badge + subtitle</Label>
        <Navigation orientation="horizontal" tabs={[{
        id: "full-active",
        label: "Feedback",
        showIcon: true,
        badge: 4,
        subtitle: "Feedback"
      }, {
        id: "full-inactive",
        label: "Feedback",
        showIcon: true,
        badge: 1,
        subtitle: "Feedback"
      }]} activeId="full-active" onChange={() => {}} />
      </div>
    </div>;
}`,...(y=(x=d.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var j,N,S;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:"args => <Navigation {...args} />",...(S=(N=n.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var z,M,C;s.parameters={...s.parameters,docs:{...(z=s.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const [activeId, setActiveId] = useState("home");
  return <div style={{
    padding: 40,
    background: "#F8F9FD",
    display: "inline-block"
  }}>
      <NavigationMarketplace items={marketingItems} activeId={activeId} onChange={setActiveId} />
    </div>;
}`,...(C=(M=s.parameters)==null?void 0:M.docs)==null?void 0:C.source}}};var w,A,E;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`() => <div style={{
  padding: 40,
  display: "flex",
  flexDirection: "column",
  gap: 24
}}>
    <div>
      <p style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 11,
      color: "#5C6E9E",
      marginBottom: 8
    }}>
        First item selected
      </p>
      <NavigationMarketplace items={marketingItems} activeId="home" />
    </div>
    <div>
      <p style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 11,
      color: "#5C6E9E",
      marginBottom: 8
    }}>
        Middle item selected
      </p>
      <NavigationMarketplace items={marketingItems} activeId="workflow" />
    </div>
    <div>
      <p style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 11,
      color: "#5C6E9E",
      marginBottom: 8
    }}>
        No selection
      </p>
      <NavigationMarketplace items={marketingItems} />
    </div>
  </div>`,...(E=(A=o.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};const H=["Horizontal","Vertical","TabVariants","Default","Marketing","MarketingAllStates"];export{n as Default,l as Horizontal,s as Marketing,o as MarketingAllStates,d as TabVariants,r as Vertical,H as __namedExportsOrder,T as default};
