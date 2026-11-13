import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as v}from"./index-DhMLlvMY.js";import{F as l}from"./filters_applied-BXkoqCzI.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-v-ZctF2y.js";const Q={title:"Molecules/FiltersApplied",component:l,parameters:{layout:"padded",docs:{description:{component:"Applied filter bar (Figma node 6848:115955). Applied=False (empty filters array): renders nothing. Applied=True: shows 'Filters' label + 'Clear all' link + removable filter pills. Each pill has a field name (10px) stacked above a bold value (12px), with a cross to remove. **Placement: applied filters sit right next to the search box, in the same toolbar row, never in a row of their own. Use the SearchFilter molecule for that row instead of placing FiltersApplied by hand.**"}}}},a=[{id:"1",field:"Workforce Member",value:"Charlie Parker"},{id:"2",field:"Status",value:"Shortlisting"},{id:"3",field:"Location",value:"London"}],o={name:"Applied=True (as in Figma)",render:()=>{const[n,r]=v.useState(a);return e.jsx(l,{filters:n,onRemove:s=>r(t=>t.filter(i=>i.id!==s)),onClearAll:()=>r([])})}},d={name:"Applied=False (renders nothing)",render:()=>e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginBottom:8},children:"FiltersApplied with empty array → renders null:"}),e.jsxs("div",{style:{border:"1px dashed #CFDAF7",padding:8,borderRadius:4},children:[e.jsx(l,{filters:[]}),e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1"},children:"(nothing rendered here)"})]})]})},p={name:"Single filter",render:()=>{const[n,r]=v.useState([{id:"1",field:"Workforce Member",value:"Charlie Parker"}]);return e.jsx(l,{filters:n,onRemove:s=>r(t=>t.filter(i=>i.id!==s)),onClearAll:()=>r([])})}},m={name:"Many filters (wrap)",render:()=>{const n=[{id:"1",field:"Workforce Member",value:"Charlie Parker"},{id:"2",field:"Status",value:"Shortlisting"},{id:"3",field:"Location",value:"London"},{id:"4",field:"Role",value:"Senior Developer"},{id:"5",field:"Start date",value:"01 Jan 2024"},{id:"6",field:"End date",value:"31 Dec 2024"}],[r,s]=v.useState(n);return e.jsx("div",{style:{maxWidth:700},children:e.jsx(l,{filters:r,onRemove:t=>s(i=>i.filter(O=>O.id!==t)),onClearAll:()=>s([])})})}},c={name:"Without 'Clear all' button",render:()=>e.jsx(l,{filters:a,onRemove:()=>{}})},f={name:"Read-only (no remove, no clear all)",render:()=>e.jsx(l,{filters:a})},u={name:"Custom label",render:()=>e.jsx(l,{filters:a,label:"Active filters",onRemove:()=>{},onClearAll:()=>{}})},F={name:"Disappears when all removed",render:()=>{const[n,r]=v.useState(a);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(l,{filters:n,onRemove:s=>r(t=>t.filter(i=>i.id!==s)),onClearAll:()=>r([])}),n.length===0&&e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#8F9ED1"},children:"All filters cleared — component is not rendered."})]})}};var h,A,y;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Applied=True (as in Figma)",
  render: () => {
    const [filters, setFilters] = useState<AppliedFilter[]>(sampleFilters);
    return <FiltersApplied filters={filters} onRemove={id => setFilters(prev => prev.filter(f => f.id !== id))} onClearAll={() => setFilters([])} />;
  }
}`,...(y=(A=o.parameters)==null?void 0:A.docs)==null?void 0:y.source}}};var S,g,x;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Applied=False (renders nothing)",
  render: () => <div>
      <p style={{
      fontFamily: "Mulish, sans-serif",
      fontSize: 12,
      color: "#5C6E9E",
      marginBottom: 8
    }}>
        FiltersApplied with empty array → renders null:
      </p>
      <div style={{
      border: "1px dashed #CFDAF7",
      padding: 8,
      borderRadius: 4
    }}>
        <FiltersApplied filters={[]} />
        <span style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1"
      }}>
          (nothing rendered here)
        </span>
      </div>
    </div>
}`,...(x=(g=d.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var C,b,R;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Single filter",
  render: () => {
    const [filters, setFilters] = useState<AppliedFilter[]>([{
      id: "1",
      field: "Workforce Member",
      value: "Charlie Parker"
    }]);
    return <FiltersApplied filters={filters} onRemove={id => setFilters(prev => prev.filter(f => f.id !== id))} onClearAll={() => setFilters([])} />;
  }
}`,...(R=(b=p.parameters)==null?void 0:b.docs)==null?void 0:R.source}}};var E,j,D;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "Many filters (wrap)",
  render: () => {
    const many: AppliedFilter[] = [{
      id: "1",
      field: "Workforce Member",
      value: "Charlie Parker"
    }, {
      id: "2",
      field: "Status",
      value: "Shortlisting"
    }, {
      id: "3",
      field: "Location",
      value: "London"
    }, {
      id: "4",
      field: "Role",
      value: "Senior Developer"
    }, {
      id: "5",
      field: "Start date",
      value: "01 Jan 2024"
    }, {
      id: "6",
      field: "End date",
      value: "31 Dec 2024"
    }];
    const [filters, setFilters] = useState(many);
    return <div style={{
      maxWidth: 700
    }}>
        <FiltersApplied filters={filters} onRemove={id => setFilters(prev => prev.filter(f => f.id !== id))} onClearAll={() => setFilters([])} />
      </div>;
  }
}`,...(D=(j=m.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var M,k,w;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "Without 'Clear all' button",
  render: () => <FiltersApplied filters={sampleFilters} onRemove={() => {}} />
}`,...(w=(k=c.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var W,L,z;f.parameters={...f.parameters,docs:{...(W=f.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: "Read-only (no remove, no clear all)",
  render: () => <FiltersApplied filters={sampleFilters} />
}`,...(z=(L=f.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var P,N,T;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Custom label",
  render: () => <FiltersApplied filters={sampleFilters} label="Active filters" onRemove={() => {}} onClearAll={() => {}} />
}`,...(T=(N=u.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var B,J,_;F.parameters={...F.parameters,docs:{...(B=F.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Disappears when all removed",
  render: () => {
    const [filters, setFilters] = useState<AppliedFilter[]>(sampleFilters);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 16
    }}>
        <FiltersApplied filters={filters} onRemove={id => setFilters(prev => prev.filter(f => f.id !== id))} onClearAll={() => setFilters([])} />
        {filters.length === 0 && <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 12,
        color: "#8F9ED1"
      }}>
            All filters cleared — component is not rendered.
          </p>}
      </div>;
  }
}`,...(_=(J=F.parameters)==null?void 0:J.docs)==null?void 0:_.source}}};const V=["Applied","Empty","SingleFilter","ManyFilters","NoClearAll","NoRemove","CustomLabel","DisappearsWhenEmpty"];export{o as Applied,u as CustomLabel,F as DisappearsWhenEmpty,d as Empty,m as ManyFilters,c as NoClearAll,f as NoRemove,p as SingleFilter,V as __namedExportsOrder,Q as default};
