import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as S}from"./index-DhMLlvMY.js";import{c as E}from"./index-Dd5QUkq_.js";import{I as y}from"./icon-D1UQke6Y.js";import"./_commonjsHelpers-CqkleIqs.js";const X="_container_1unc8_1",Y="_header_1unc8_10",Z="_accordionBtn_1unc8_19",ee="_chevron_1unc8_35",ne="_chevronOpen_1unc8_42",re="_headerLabel_1unc8_46",te="_headerRight_1unc8_54",ae="_pills_1unc8_61",se="_pill_1unc8_61",ie="_pillLabel_1unc8_80",le="_pillIconBtn_1unc8_88",a={container:X,header:Y,accordionBtn:Z,chevron:ee,chevronOpen:ne,headerLabel:re,headerRight:te,pills:ae,pill:se,pillLabel:ie,pillIconBtn:le};function de({label:n,onRemove:r,onShare:t}){return e.jsxs("span",{className:a.pill,children:[r&&e.jsx("button",{type:"button",className:a.pillIconBtn,onClick:r,"aria-label":`Remove ${n}`,children:e.jsx(y,{name:"remove",size:16})}),e.jsx("span",{className:a.pillLabel,children:n}),t&&e.jsx("button",{type:"button",className:a.pillIconBtn,onClick:t,"aria-label":`Share ${n}`,children:e.jsx(y,{name:"share",size:16})})]})}function i({filters:n,title:r,expanded:t,defaultExpanded:p=!0,onExpandedChange:d,onRemove:l,onShare:s,headerRight:c,className:V}){const[G,J]=S.useState(p),_=t!==void 0,u=_?t:G,K=()=>{const o=!u;_||J(o),d==null||d(o)},U=r??`${n.length} saved filter${n.length!==1?"s":""}`;return e.jsxs("div",{className:E(a.container,V),children:[e.jsxs("div",{className:a.header,children:[e.jsxs("button",{type:"button",className:a.accordionBtn,onClick:K,"aria-expanded":u,children:[e.jsx(y,{name:"chevron-down",size:16,className:E(a.chevron,u&&a.chevronOpen)}),e.jsx("span",{className:a.headerLabel,children:U})]}),c&&e.jsx("div",{className:a.headerRight,children:c})]}),u&&n.length>0&&e.jsx("div",{className:a.pills,children:n.map(o=>e.jsx(de,{label:o.label,onRemove:l?()=>l(o.id):void 0,onShare:s?()=>s(o.id):void 0},o.id))})]})}i.__docgenInfo={description:"",methods:[],displayName:"SavedFilters",props:{filters:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  label: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}}]}}],raw:"SavedFilter[]"},description:""},title:{required:!1,tsType:{name:"string"},description:'Override the header label. Defaults to "N saved filters"'},expanded:{required:!1,tsType:{name:"boolean"},description:"Controlled expand state"},defaultExpanded:{required:!1,tsType:{name:"boolean"},description:"Default expand state (uncontrolled)",defaultValue:{value:"true",computed:!1}},onExpandedChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:""},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onShare:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},headerRight:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Slot for right-side header actions"},className:{required:!1,tsType:{name:"string"},description:""}}};const fe={title:"Molecules/SavedFilters",component:i,parameters:{layout:"padded",docs:{description:{component:"Accordion-driven saved filter pill bar (Figma node 6792:167638). Header shows the count and a chevron toggle. Expanded: wrap row of pills — each with remove + label + share. Collapsed: pills hidden. Border-bottom separates from content below."}}}},F=Array.from({length:10},(n,r)=>({id:String(r+1),label:`Filter ${r+1}`})),m={name:"Expanded — 10 filters (as in Figma)",render:()=>{const[n,r]=S.useState(F);return e.jsx(i,{filters:n,defaultExpanded:!0,onRemove:t=>r(p=>p.filter(d=>d.id!==t)),onShare:t=>alert(`Share filter ${t}`)})}},f={name:"Collapsed",render:()=>e.jsx(i,{filters:F,defaultExpanded:!1})},h={name:"Interactive (add/remove/share)",render:()=>{const[n,r]=S.useState([{id:"1",label:"Q1 2024 - EMEA"},{id:"2",label:"Senior Profiles"},{id:"3",label:"Available Now"},{id:"4",label:"London Office"},{id:"5",label:"Shortlisted"}]),[t,p]=S.useState(!0),d=()=>{const l=String(Date.now());r(s=>[...s,{id:l,label:`Filter ${s.length+1}`}])};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(i,{filters:n,expanded:t,onExpandedChange:p,onRemove:l=>r(s=>s.filter(c=>c.id!==l)),onShare:l=>{var s;return alert(`Sharing filter: ${(s=n.find(c=>c.id===l))==null?void 0:s.label}`)}}),e.jsx("button",{style:{alignSelf:"flex-start",padding:"5px 12px",borderRadius:4,border:"1px solid #CFDAF7",background:"#fff",fontFamily:"Mulish, sans-serif",fontSize:12,fontWeight:700,color:"#0C1457",cursor:"pointer"},onClick:d,children:"+ Add filter"}),e.jsxs("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#5C6E9E",margin:0},children:[n.length," filter",n.length!==1?"s":""," · ",t?"expanded":"collapsed"]})]})}},v={name:"Few filters (3)",render:()=>e.jsx(i,{filters:[{id:"a",label:"Q1 2024 - EMEA"},{id:"b",label:"Senior Profiles"},{id:"c",label:"Available Now"}],defaultExpanded:!0,onRemove:n=>alert(`Remove ${n}`),onShare:n=>alert(`Share ${n}`)})},x={name:"Single filter",render:()=>e.jsx(i,{filters:[{id:"x",label:"My Saved Search"}],defaultExpanded:!0,onRemove:()=>{},onShare:()=>{}})},g={name:"Without share button",render:()=>e.jsx(i,{filters:F.slice(0,5),defaultExpanded:!0,onRemove:n=>alert(`Remove ${n}`)})},b={name:"Custom header title",render:()=>e.jsx(i,{filters:F.slice(0,4),title:"Recent searches",defaultExpanded:!0,onRemove:()=>{}})};var R,j,N;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: "Expanded — 10 filters (as in Figma)",
  render: () => {
    const [filters, setFilters] = useState<SavedFilter[]>(tenFilters);
    return <SavedFilters filters={filters} defaultExpanded onRemove={id => setFilters(prev => prev.filter(f => f.id !== id))} onShare={id => alert(\`Share filter \${id}\`)} />;
  }
}`,...(N=(j=m.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var w,C,$;f.parameters={...f.parameters,docs:{...(w=f.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Collapsed",
  render: () => <SavedFilters filters={tenFilters} defaultExpanded={false} />
}`,...($=(C=f.parameters)==null?void 0:C.docs)==null?void 0:$.source}}};var A,I,q;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: "Interactive (add/remove/share)",
  render: () => {
    const [filters, setFilters] = useState<SavedFilter[]>([{
      id: "1",
      label: "Q1 2024 - EMEA"
    }, {
      id: "2",
      label: "Senior Profiles"
    }, {
      id: "3",
      label: "Available Now"
    }, {
      id: "4",
      label: "London Office"
    }, {
      id: "5",
      label: "Shortlisted"
    }]);
    const [expanded, setExpanded] = useState(true);
    const addFilter = () => {
      const id = String(Date.now());
      setFilters(prev => [...prev, {
        id,
        label: \`Filter \${prev.length + 1}\`
      }]);
    };
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 16
    }}>
        <SavedFilters filters={filters} expanded={expanded} onExpandedChange={setExpanded} onRemove={id => setFilters(prev => prev.filter(f => f.id !== id))} onShare={id => alert(\`Sharing filter: \${filters.find(f => f.id === id)?.label}\`)} />
        <button style={{
        alignSelf: "flex-start",
        padding: "5px 12px",
        borderRadius: 4,
        border: "1px solid #CFDAF7",
        background: "#fff",
        fontFamily: "Mulish, sans-serif",
        fontSize: 12,
        fontWeight: 700,
        color: "#0C1457",
        cursor: "pointer"
      }} onClick={addFilter}>
          + Add filter
        </button>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#5C6E9E",
        margin: 0
      }}>
          {filters.length} filter{filters.length !== 1 ? "s" : ""} · {expanded ? "expanded" : "collapsed"}
        </p>
      </div>;
  }
}`,...(q=(I=h.parameters)==null?void 0:I.docs)==null?void 0:q.source}}};var L,M,T;v.parameters={...v.parameters,docs:{...(L=v.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: "Few filters (3)",
  render: () => <SavedFilters filters={[{
    id: "a",
    label: "Q1 2024 - EMEA"
  }, {
    id: "b",
    label: "Senior Profiles"
  }, {
    id: "c",
    label: "Available Now"
  }]} defaultExpanded onRemove={id => alert(\`Remove \${id}\`)} onShare={id => alert(\`Share \${id}\`)} />
}`,...(T=(M=v.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var B,k,D;x.parameters={...x.parameters,docs:{...(B=x.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Single filter",
  render: () => <SavedFilters filters={[{
    id: "x",
    label: "My Saved Search"
  }]} defaultExpanded onRemove={() => {}} onShare={() => {}} />
}`,...(D=(k=x.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var O,z,P;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:'{\n  name: "Without share button",\n  render: () => <SavedFilters filters={tenFilters.slice(0, 5)} defaultExpanded onRemove={id => alert(`Remove ${id}`)} />\n}',...(P=(z=g.parameters)==null?void 0:z.docs)==null?void 0:P.source}}};var Q,W,H;b.parameters={...b.parameters,docs:{...(Q=b.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  name: "Custom header title",
  render: () => <SavedFilters filters={tenFilters.slice(0, 4)} title="Recent searches" defaultExpanded onRemove={() => {}} />
}`,...(H=(W=b.parameters)==null?void 0:W.docs)==null?void 0:H.source}}};const he=["Expanded","Collapsed","Interactive","FewFilters","SingleFilter","NoShare","CustomTitle"];export{f as Collapsed,b as CustomTitle,m as Expanded,v as FewFilters,h as Interactive,g as NoShare,x as SingleFilter,he as __namedExportsOrder,fe as default};
