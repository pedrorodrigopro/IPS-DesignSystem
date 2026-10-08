import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./index-DhMLlvMY.js";import{D as u,a as O,b as V,c as G,d as H,e as K,f as ie}from"./dropdown-iXYzeWXV.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./avatar-DzCkQh3P.js";import"./icon-D1UQke6Y.js";const Se={title:"Components/Dropdown",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1671-37903"},layout:"centered"}},Y=[{id:"1",label:"Action"},{id:"2",label:"Action"},{id:"3",label:"Action"},{id:"4",label:"Action"},{id:"5",label:"Action"}],q=[{id:"1",label:"Selection",subLabel:"Info"},{id:"2",label:"Selection",subLabel:"Info"},{id:"3",label:"Selection"},{id:"4",label:"Selection"}],J=[{id:"open",label:"Open"},{id:"draft",label:"Draft"},{id:"closed",label:"Closed"}],Q=["booking","role","engagement","profile","search","calendar","workflow","marketplace","reports","insights","history","notifications","edit","save","share","open","tag","note","refresh","sort","merge","split","move","remove"],U=[{id:"default",label:"Default",color:"#FFB3B3"},{id:"hard",label:"Hard",color:"#A8C5F5"},{id:"soft",label:"Soft",color:"#F5A8F0"},{id:"holidays",label:"Holidays",color:"#A8F5C5"}],X=[{id:"group",name:"Group booking",subLabel:"150 users as a result from filters",isGroup:!0},{id:"cp",name:"Charlie Parker",subLabel:"paul.trent@email.com",initials:"PT"},{id:"sp",name:"Steve Pauster",subLabel:"steve.pauster@email.com",initials:"SP"},{id:"lp",name:"Laura Pau",subLabel:"laura.pau@email.com",initials:"LP"}],s=()=>e.jsx(u,{items:Y,onSelect:t=>console.log("selected",t)}),l=()=>e.jsx(u,{items:[{id:"1",label:"Action",subLabel:"Info"},{id:"2",label:"Action",subLabel:"Info"},{id:"3",label:"Action",subLabel:"Info"}],onSelect:t=>console.log("selected",t)}),i=()=>{const[t,n]=o.useState("1");return e.jsx(O,{items:q,selectedId:t,onSelect:n})},a=()=>{const[t,n]=o.useState([]);return e.jsx(V,{items:J,selectedIds:t,onSelectionChange:n})},r=()=>{const[t,n]=o.useState("booking");return e.jsx(G,{icons:Q,selectedIcon:t,onSelect:n})},c=()=>{const[t,n]=o.useState("default");return e.jsx(H,{items:U,selectedId:t,onSelect:n})},d=()=>{const[t,n]=o.useState();return e.jsx(K,{items:X,selectedId:t,onSelect:n})},m=()=>e.jsx(ie,{results:[{id:"1",type:"profile",label:"Ruby Alpha",matchedPart:"Ruby",subLabel:"ruby.alpha@profinda.com",onOpen:()=>{}},{id:"2",type:"engagement",label:"Ruby banking audit",matchedPart:"Ruby",subLabel:"01 Mar 2024",onOpen:()=>{}},{id:"3",type:"role",label:"Ruby developer",matchedPart:"Ruby",subLabel:"01 Mar 2024",onOpen:()=>{}},{id:"4",type:"search",label:"Ruby developer",matchedPart:"Ruby"}],onSelect:t=>console.log("selected",t),onSeeAll:()=>console.log("see all")}),p=()=>{const[t,n]=o.useState("1"),[Z,$]=o.useState([]),[ee,te]=o.useState("booking"),[ne,oe]=o.useState("default"),[se,le]=o.useState();return e.jsxs("div",{style:{display:"flex",gap:24,flexWrap:"wrap",alignItems:"flex-start",padding:24},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Actions"}),e.jsx(u,{items:Y,onSelect:()=>{}})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Selection"}),e.jsx(O,{items:q,selectedId:t,onSelect:n})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Multi-selection"}),e.jsx(V,{items:J,selectedIds:Z,onSelectionChange:$})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Icons"}),e.jsx(G,{icons:Q,selectedIcon:ee,onSelect:te})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Booking Category"}),e.jsx(H,{items:U,selectedId:ne,onSelect:oe})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Workforce Member"}),e.jsx(K,{items:X,selectedId:se,onSelect:le})]})]})};s.__docgenInfo={description:"",methods:[],displayName:"Actions"};l.__docgenInfo={description:"",methods:[],displayName:"ActionsDoubleLine"};i.__docgenInfo={description:"",methods:[],displayName:"Selection"};a.__docgenInfo={description:"",methods:[],displayName:"MultiSelection"};r.__docgenInfo={description:"",methods:[],displayName:"Icons"};c.__docgenInfo={description:"",methods:[],displayName:"BookingCategory"};d.__docgenInfo={description:"",methods:[],displayName:"WorkforceMember"};m.__docgenInfo={description:"",methods:[],displayName:"Typeahead"};p.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var S,g,f;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:'() => <DropdownActions items={actionItems} onSelect={id => console.log("selected", id)} />',...(f=(g=s.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var b,y,h;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`() => <DropdownActions items={[{
  id: "1",
  label: "Action",
  subLabel: "Info"
}, {
  id: "2",
  label: "Action",
  subLabel: "Info"
}, {
  id: "3",
  label: "Action",
  subLabel: "Info"
}]} onSelect={id => console.log("selected", id)} />`,...(h=(y=l.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var I,x,v;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState("1");
  return <DropdownSelection items={selectionItems} selectedId={selected} onSelect={setSelected} />;
}`,...(v=(x=i.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var D,w,M;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string[]>([]);
  return <DropdownMultiSelection items={multiItems} selectedIds={selected} onSelectionChange={setSelected} />;
}`,...(M=(w=a.parameters)==null?void 0:w.docs)==null?void 0:M.source}}};var A,F,j;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<IconName | undefined>("booking");
  return <DropdownIcons icons={iconNames} selectedIcon={selected} onSelect={setSelected} />;
}`,...(j=(F=r.parameters)==null?void 0:F.docs)==null?void 0:j.source}}};var k,W,L;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState("default");
  return <DropdownBookingCategory items={bookingCategories} selectedId={selected} onSelect={setSelected} />;
}`,...(L=(W=c.parameters)==null?void 0:W.docs)==null?void 0:L.source}}};var C,B,_;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string | undefined>();
  return <DropdownWM items={wmItems} selectedId={selected} onSelect={setSelected} />;
}`,...(_=(B=d.parameters)==null?void 0:B.docs)==null?void 0:_.source}}};var R,T,E;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`() => <DropdownTypeahead results={[{
  id: "1",
  type: "profile",
  label: "Ruby Alpha",
  matchedPart: "Ruby",
  subLabel: "ruby.alpha@profinda.com",
  onOpen: () => {}
}, {
  id: "2",
  type: "engagement",
  label: "Ruby banking audit",
  matchedPart: "Ruby",
  subLabel: "01 Mar 2024",
  onOpen: () => {}
}, {
  id: "3",
  type: "role",
  label: "Ruby developer",
  matchedPart: "Ruby",
  subLabel: "01 Mar 2024",
  onOpen: () => {}
}, {
  id: "4",
  type: "search",
  label: "Ruby developer",
  matchedPart: "Ruby"
}]} onSelect={id => console.log("selected", id)} onSeeAll={() => console.log("see all")} />`,...(E=(T=m.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};var N,P,z;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const [singleSel, setSingleSel] = useState("1");
  const [multiSel, setMultiSel] = useState<string[]>([]);
  const [iconSel, setIconSel] = useState<IconName | undefined>("booking");
  const [catSel, setCatSel] = useState("default");
  const [wmSel, setWmSel] = useState<string | undefined>();
  return <div style={{
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: 24
  }}>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Actions</div>
        <DropdownActions items={actionItems} onSelect={() => {}} />
      </div>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Selection</div>
        <DropdownSelection items={selectionItems} selectedId={singleSel} onSelect={setSingleSel} />
      </div>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Multi-selection</div>
        <DropdownMultiSelection items={multiItems} selectedIds={multiSel} onSelectionChange={setMultiSel} />
      </div>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Icons</div>
        <DropdownIcons icons={iconNames} selectedIcon={iconSel} onSelect={setIconSel} />
      </div>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Booking Category</div>
        <DropdownBookingCategory items={bookingCategories} selectedId={catSel} onSelect={setCatSel} />
      </div>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Workforce Member</div>
        <DropdownWM items={wmItems} selectedId={wmSel} onSelect={setWmSel} />
      </div>
    </div>;
}`,...(z=(P=p.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};const ge=["Actions","ActionsDoubleLine","Selection","MultiSelection","Icons","BookingCategory","WorkforceMember","Typeahead","AllVariants"];export{s as Actions,l as ActionsDoubleLine,p as AllVariants,c as BookingCategory,r as Icons,a as MultiSelection,i as Selection,m as Typeahead,d as WorkforceMember,ge as __namedExportsOrder,Se as default};
