import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-DhMLlvMY.js";import{S as o}from"./search_filter-ZU3WK9nr.js";import{B as i}from"./button-CreEIUG8.js";import{I as a}from"./icon-v-ZctF2y.js";import{a as q}from"./input-Dap90cT3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./filters_applied-BXkoqCzI.js";const te={title:"Molecules/SearchFilter",component:o,parameters:{layout:"padded",docs:{description:{component:"The toolbar row above every list or table: search box, optional `leading` (sort dropdown) and `count`, applied filters, and the screen's own `actions` at the end. **Applied filters (FiltersApplied) always sit right next to the search box, in this same row, never in a row of their own.** The filters area renders nothing until `filters` has entries, so the row looks the same with and without filters. Every screen has different buttons at the end of the row: pass them as `actions`."}}}},O=[{id:"1",field:"Workforce Member",value:"Charlie Parker"},{id:"2",field:"State",value:"Shortlisting"}],H=[{id:"1",field:"Workforce Member",value:"Charlie Parker"},{id:"2",field:"State",value:"Shortlisting"},{id:"3",field:"Location",value:"London"},{id:"4",field:"Business unit",value:"Executive"},{id:"5",field:"Role",value:"Senior Auditor"},{id:"6",field:"Engagement ID",value:"2 selected"},{id:"7",field:"Assignee",value:"Myself"},{id:"8",field:"Start date",value:"01-10-2026"}],g=({applied:t=!1})=>e.jsx(i,{kind:"icon",size:"regular",title:"Filter",children:e.jsx(a,{name:t?"filter-applied":"filter",size:16})}),u={name:"No filters applied",render:()=>{const[t,r]=l.useState("");return e.jsx(o,{search:t,onSearchChange:r,count:"101 engagements",actions:e.jsx(g,{})})}},p={name:"Filters applied",render:()=>{const[t,r]=l.useState(""),[s,n]=l.useState(O);return e.jsx(o,{search:t,onSearchChange:r,count:`${s.length?2:101} engagements`,filters:s,onRemoveFilter:c=>n(d=>d.filter(h=>h.id!==c)),onClearFilters:()=>n([]),actions:e.jsx(g,{applied:s.length>0})})}},m={name:"Sort + count (Profiles directory)",render:()=>{const[t,r]=l.useState(""),[s,n]=l.useState(O);return e.jsx(o,{search:t,onSearchChange:r,leading:e.jsx("span",{style:{display:"inline-block",width:"max-content"},children:e.jsx(q,{value:"By name"})}),count:"2 profiles",filters:s,onRemoveFilter:c=>n(d=>d.filter(h=>h.id!==c)),onClearFilters:()=>n([]),actions:e.jsxs(e.Fragment,{children:[e.jsx(i,{kind:"icon",size:"regular",title:"Cards view",children:e.jsx(a,{name:"table",size:16})}),e.jsx(i,{kind:"icon",size:"regular",title:"Table view",children:e.jsx(a,{name:"list",size:16})})]})})}},f={name:"Many filters (wrap)",render:()=>{const[t,r]=l.useState(""),[s,n]=l.useState(H);return e.jsx("div",{style:{maxWidth:1e3},children:e.jsx(o,{search:t,onSearchChange:r,count:"8 roles",filters:s,onRemoveFilter:c=>n(d=>d.filter(h=>h.id!==c)),onClearFilters:()=>n([]),actions:e.jsx(g,{applied:s.length>0})})})}},S={name:"Actions per screen",render:()=>{const[t,r]=l.useState("");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24},children:[e.jsx(o,{search:t,onSearchChange:r,count:"101 engagements",actions:e.jsxs(e.Fragment,{children:[e.jsx(i,{kind:"icon",size:"regular",title:"Filter",children:e.jsx(a,{name:"filter",size:16})}),e.jsx(i,{kind:"icon",size:"regular",title:"Table",children:e.jsx(a,{name:"table",size:16})})]})}),e.jsx(o,{search:t,onSearchChange:r,count:"8 Roles in 7 Engagements",actions:e.jsxs(e.Fragment,{children:[e.jsx(i,{kind:"icon",size:"regular",title:"Filter",children:e.jsx(a,{name:"filter",size:16})}),e.jsx(i,{kind:"icon",size:"regular",title:"Bulk select",children:e.jsx(a,{name:"bulk",size:16})}),e.jsx(i,{kind:"icon",size:"regular",title:"Grid view",children:e.jsx(a,{name:"table",size:16})})]})}),e.jsx(o,{search:t,onSearchChange:r,count:"12 in total"})]})}};var F,x,v,j,y;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: "No filters applied",
  render: () => {
    const [search, setSearch] = useState("");
    return <SearchFilter search={search} onSearchChange={setSearch} count="101 engagements" actions={<FilterButton />} />;
  }
}`,...(v=(x=u.parameters)==null?void 0:x.docs)==null?void 0:v.source},description:{story:"Search + count + filter button; no filters applied: the row has no filters area",...(y=(j=u.parameters)==null?void 0:j.docs)==null?void 0:y.description}}};var w,z,b,k,C;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Filters applied",
  render: () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<AppliedFilter[]>(sampleFilters);
    return <SearchFilter search={search} onSearchChange={setSearch} count={\`\${filters.length ? 2 : 101} engagements\`} filters={filters} onRemoveFilter={id => setFilters(f => f.filter(x => x.id !== id))} onClearFilters={() => setFilters([])} actions={<FilterButton applied={filters.length > 0} />} />;
  }
}`,...(b=(z=p.parameters)==null?void 0:z.docs)==null?void 0:b.source},description:{story:"Filters applied: they appear right after the search box (and count); Clear all and the pills' crosses work",...(C=(k=p.parameters)==null?void 0:k.docs)==null?void 0:C.description}}};var B,A,I,R,M;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Sort + count (Profiles directory)",
  render: () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<AppliedFilter[]>(sampleFilters);
    return <SearchFilter search={search} onSearchChange={setSearch} leading={<span style={{
      display: "inline-block",
      width: "max-content"
    }}><InputSelect value="By name" /></span>} count="2 profiles" filters={filters} onRemoveFilter={id => setFilters(f => f.filter(x => x.id !== id))} onClearFilters={() => setFilters([])} actions={<><Button kind="icon" size="regular" title="Cards view"><Icon name="table" size={16} /></Button><Button kind="icon" size="regular" title="Table view"><Icon name="list" size={16} /></Button></>} />;
  }
}`,...(I=(A=m.parameters)==null?void 0:A.docs)==null?void 0:I.source},description:{story:"Profiles directory pattern: sort dropdown (`leading`) and count after the search box",...(M=(R=m.parameters)==null?void 0:R.docs)==null?void 0:M.description}}};var E,P,T,W,D;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "Many filters (wrap)",
  render: () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<AppliedFilter[]>(manyFilters);
    return <div style={{
      maxWidth: 1000
    }}>
        <SearchFilter search={search} onSearchChange={setSearch} count="8 roles" filters={filters} onRemoveFilter={id => setFilters(f => f.filter(x => x.id !== id))} onClearFilters={() => setFilters([])} actions={<FilterButton applied={filters.length > 0} />} />
      </div>;
  }
}`,...(T=(P=f.parameters)==null?void 0:P.docs)==null?void 0:T.source},description:{story:"Many filters: the pills wrap onto more lines and the row grows; the actions stay at the end",...(D=(W=f.parameters)==null?void 0:W.docs)==null?void 0:D.description}}};var G,L,N,_,$;S.parameters={...S.parameters,docs:{...(G=S.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: "Actions per screen",
  render: () => {
    const [search, setSearch] = useState("");
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 24
    }}>
        <SearchFilter search={search} onSearchChange={setSearch} count="101 engagements" actions={<><Button kind="icon" size="regular" title="Filter"><Icon name="filter" size={16} /></Button><Button kind="icon" size="regular" title="Table"><Icon name="table" size={16} /></Button></>} />
        <SearchFilter search={search} onSearchChange={setSearch} count="8 Roles in 7 Engagements" actions={<><Button kind="icon" size="regular" title="Filter"><Icon name="filter" size={16} /></Button><Button kind="icon" size="regular" title="Bulk select"><Icon name="bulk" size={16} /></Button><Button kind="icon" size="regular" title="Grid view"><Icon name="table" size={16} /></Button></>} />
        <SearchFilter search={search} onSearchChange={setSearch} count="12 in total" />
      </div>;
  }
}`,...(N=(L=S.parameters)==null?void 0:L.docs)==null?void 0:N.source},description:{story:"The same row with the end-of-row buttons of three screens: the buttons differ per screen, everything else is shared",...($=(_=S.parameters)==null?void 0:_.docs)==null?void 0:$.description}}};const re=["Default","WithFilters","SortAndCount","ManyFilters","ActionsPerScreen"];export{S as ActionsPerScreen,u as Default,f as ManyFilters,m as SortAndCount,p as WithFilters,re as __namedExportsOrder,te as default};
