import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as y}from"./index-DhMLlvMY.js";import{c as $}from"./index-Dd5QUkq_.js";import{I as J}from"./icon-D1UQke6Y.js";import"./_commonjsHelpers-CqkleIqs.js";const O="_bar_53b3t_1",G="_left_53b3t_10",H="_label_53b3t_18",K="_clearAll_53b3t_27",Q="_clearIcon_53b3t_46",U="_right_53b3t_50",X="_pill_53b3t_58",Y="_pillRemove_53b3t_69",Z="_pillText_53b3t_86",ee="_pillField_53b3t_92",re="_pillValue_53b3t_101",s={bar:O,left:G,label:H,clearAll:K,clearIcon:Q,right:U,pill:X,pillRemove:Y,pillText:Z,pillField:ee,pillValue:re};function le({field:l,value:r,onRemove:n}){return e.jsxs("span",{className:s.pill,children:[n&&e.jsx("button",{type:"button",className:s.pillRemove,onClick:n,"aria-label":`Remove filter: ${l} ${r}`,children:e.jsx(J,{name:"cross",size:14})}),e.jsxs("span",{className:s.pillText,children:[e.jsx("span",{className:s.pillField,children:l}),e.jsx("span",{className:s.pillValue,children:r})]})]})}function i({filters:l,onRemove:r,onClearAll:n,label:t="Filters",className:a}){return l.length===0?null:e.jsxs("div",{className:$(s.bar,a),children:[e.jsxs("div",{className:s.left,children:[e.jsx("span",{className:s.label,children:t}),n&&e.jsxs("button",{type:"button",className:s.clearAll,onClick:n,children:[e.jsx(J,{name:"filter-clean",size:16,className:s.clearIcon}),"Clear all"]})]}),e.jsx("div",{className:s.right,children:l.map(o=>e.jsx(le,{field:o.field,value:o.value,onRemove:r?()=>r(o.id):void 0},o.id))})]})}i.__docgenInfo={description:"",methods:[],displayName:"FiltersApplied",props:{filters:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  /** Field / category name — shown in small text above the value */
  field: string;
  /** Selected value — shown in bold below the field name */
  value: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"field",value:{name:"string",required:!0},description:"Field / category name — shown in small text above the value"},{key:"value",value:{name:"string",required:!0},description:"Selected value — shown in bold below the field name"}]}}],raw:"AppliedFilter[]"},description:""},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onClearAll:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:'Label shown before "Clear all". Defaults to "Filters".',defaultValue:{value:'"Filters"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const oe={title:"Molecules/FiltersApplied",component:i,parameters:{layout:"padded",docs:{description:{component:"Applied filter bar (Figma node 6848:115955). Applied=False (empty filters array): renders nothing. Applied=True: shows 'Filters' label + 'Clear all' link + removable filter pills. Each pill has a field name (10px) stacked above a bold value (12px), with a cross to remove."}}}},d=[{id:"1",field:"Workforce Member",value:"Charlie Parker"},{id:"2",field:"Status",value:"Shortlisting"},{id:"3",field:"Location",value:"London"}],p={name:"Applied=True (as in Figma)",render:()=>{const[l,r]=y.useState(d);return e.jsx(i,{filters:l,onRemove:n=>r(t=>t.filter(a=>a.id!==n)),onClearAll:()=>r([])})}},c={name:"Applied=False (renders nothing)",render:()=>e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginBottom:8},children:"FiltersApplied with empty array → renders null:"}),e.jsxs("div",{style:{border:"1px dashed #CFDAF7",padding:8,borderRadius:4},children:[e.jsx(i,{filters:[]}),e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1"},children:"(nothing rendered here)"})]})]})},m={name:"Single filter",render:()=>{const[l,r]=y.useState([{id:"1",field:"Workforce Member",value:"Charlie Parker"}]);return e.jsx(i,{filters:l,onRemove:n=>r(t=>t.filter(a=>a.id!==n)),onClearAll:()=>r([])})}},u={name:"Many filters (wrap)",render:()=>{const l=[{id:"1",field:"Workforce Member",value:"Charlie Parker"},{id:"2",field:"Status",value:"Shortlisting"},{id:"3",field:"Location",value:"London"},{id:"4",field:"Role",value:"Senior Developer"},{id:"5",field:"Start date",value:"01 Jan 2024"},{id:"6",field:"End date",value:"31 Dec 2024"}],[r,n]=y.useState(l);return e.jsx("div",{style:{maxWidth:700},children:e.jsx(i,{filters:r,onRemove:t=>n(a=>a.filter(o=>o.id!==t)),onClearAll:()=>n([])})})}},f={name:"Without 'Clear all' button",render:()=>e.jsx(i,{filters:d,onRemove:()=>{}})},v={name:"Read-only (no remove, no clear all)",render:()=>e.jsx(i,{filters:d})},F={name:"Custom label",render:()=>e.jsx(i,{filters:d,label:"Active filters",onRemove:()=>{},onClearAll:()=>{}})},h={name:"Disappears when all removed",render:()=>{const[l,r]=y.useState(d);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(i,{filters:l,onRemove:n=>r(t=>t.filter(a=>a.id!==n)),onClearAll:()=>r([])}),l.length===0&&e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#8F9ED1"},children:"All filters cleared — component is not rendered."})]})}};var g,b,A;p.parameters={...p.parameters,docs:{...(g=p.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Applied=True (as in Figma)",
  render: () => {
    const [filters, setFilters] = useState<AppliedFilter[]>(sampleFilters);
    return <FiltersApplied filters={filters} onRemove={id => setFilters(prev => prev.filter(f => f.id !== id))} onClearAll={() => setFilters([])} />;
  }
}`,...(A=(b=p.parameters)==null?void 0:b.docs)==null?void 0:A.source}}};var x,S,_;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(_=(S=c.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};var C,j,R;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Single filter",
  render: () => {
    const [filters, setFilters] = useState<AppliedFilter[]>([{
      id: "1",
      field: "Workforce Member",
      value: "Charlie Parker"
    }]);
    return <FiltersApplied filters={filters} onRemove={id => setFilters(prev => prev.filter(f => f.id !== id))} onClearAll={() => setFilters([])} />;
  }
}`,...(R=(j=m.parameters)==null?void 0:j.docs)==null?void 0:R.source}}};var w,E,N;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(N=(E=u.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var k,D,M;f.parameters={...f.parameters,docs:{...(k=f.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "Without 'Clear all' button",
  render: () => <FiltersApplied filters={sampleFilters} onRemove={() => {}} />
}`,...(M=(D=f.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var T,W,L;v.parameters={...v.parameters,docs:{...(T=v.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Read-only (no remove, no clear all)",
  render: () => <FiltersApplied filters={sampleFilters} />
}`,...(L=(W=v.parameters)==null?void 0:W.docs)==null?void 0:L.source}}};var q,z,I;F.parameters={...F.parameters,docs:{...(q=F.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: "Custom label",
  render: () => <FiltersApplied filters={sampleFilters} label="Active filters" onRemove={() => {}} onClearAll={() => {}} />
}`,...(I=(z=F.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};var P,V,B;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(B=(V=h.parameters)==null?void 0:V.docs)==null?void 0:B.source}}};const de=["Applied","Empty","SingleFilter","ManyFilters","NoClearAll","NoRemove","CustomLabel","DisappearsWhenEmpty"];export{p as Applied,F as CustomLabel,h as DisappearsWhenEmpty,c as Empty,u as ManyFilters,f as NoClearAll,v as NoRemove,m as SingleFilter,de as __namedExportsOrder,oe as default};
