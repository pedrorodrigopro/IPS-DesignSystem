import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as n}from"./index-DhMLlvMY.js";import{T as l}from"./table-Cv052NmJ.js";import{d as x}from"./pill-_Y6bw78A.js";import{T as G}from"./tile-2UbfjZnD.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-q_ctI9hk.js";import"./avatar-DzCkQh3P.js";import"./checkbox-Dd9w011Z.js";import"./tooltip-CfgRuyaf.js";import"./index-2UU9FgV2.js";import"./index-D7lG0nq1.js";const de={title:"Components/Table",component:l,parameters:{layout:"padded",docs:{description:{component:"Data table with Standard (56px rows, checkbox column) and Compact (40px rows) sizes. Supports sortable headers, row selection, and cell types: text-primary, text-regular, pill (WF State), wm, number, percentage, button, icon. The last sticky column pins to the right and a gradient appears when the table overflows horizontally."}}}},d=[{id:1,name:"Alpha Project",status:"shortlisting",secondaryText:"Secondary text",wm:{name:"Charlie Parker",initials:"CP"},number:"12389293",percentage:"100"},{id:2,name:"Beta Initiative",status:"in-review",secondaryText:"Secondary text",wm:{name:"Jane Smith",initials:"JS"},number:"98765432",percentage:"75"},{id:3,name:"Gamma Phase",status:"confirmed",secondaryText:"Secondary text long example that may wrap across multiple lines",wm:{name:"Robert Chen",initials:"RC"},number:"11223344",percentage:"50"},{id:4,name:"Delta Stream",status:"not-filled",secondaryText:"Secondary text",wm:{name:"Amara Nwosu",initials:"AN"},number:"55667788",percentage:"90"}],w=[{key:"name",header:"Name",type:"text-primary",sortable:!0,width:"180px"},{key:"status",header:"Status",sortable:!0,width:"150px",renderCell:t=>e.jsx(x,{state:t.status,size:"small"})},{key:"secondaryText",header:"Secondary",type:"text-regular",sortable:!1,width:"200px"},{key:"wm",header:"Workforce Member",type:"wm",sortable:!1,width:"200px"},{key:"number",header:"Number",type:"number",sortable:!0,align:"right",width:"120px"},{key:"percentage",header:"Completion",type:"percentage",sortable:!0,align:"right",width:"100px"},{key:"actions",header:"Actions",type:"button",sortable:!1,width:"220px",buttonLabels:["View","Edit","Remove"],onButtonClick:(t,r)=>alert(`${t}: ${r.name}`)},{key:"menu",header:"",type:"icon",iconName:"menu-vertical",width:"48px",sticky:!0,onButtonClick:(t,r)=>alert(`Menu: ${r.name}`)}],c={render:()=>{const[t,r]=n.useState(),[s,o]=n.useState("none");return e.jsx("div",{style:{padding:24},children:e.jsx(l,{columns:w,rows:d,compact:!1,selectable:!0,sortKey:t,sortDirection:s,onSort:(a,i)=>{r(a),o(i)}})})}},m={name:"Standard (scrollable — sticky + gradient)",render:()=>{const[t,r]=n.useState(),[s,o]=n.useState("none");return e.jsxs("div",{style:{padding:24,maxWidth:640},children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginBottom:12},children:"Container constrained to 640px — scroll horizontally to see sticky column + gradient."}),e.jsx(l,{columns:w,rows:d,compact:!1,selectable:!0,sortKey:t,sortDirection:s,onSort:(a,i)=>{r(a),o(i)}})]})}},J=[{key:"name",header:"Name",type:"text-primary",sortable:!0,width:"180px"},{key:"status",header:"Status",width:"150px",renderCell:t=>e.jsx(x,{state:t.status,size:"small"})},{key:"secondaryText",header:"Secondary",type:"text-regular",width:"200px"},{key:"wm",header:"Workforce Member",type:"wm",width:"200px"},{key:"number",header:"Number",type:"number",sortable:!0,align:"right",width:"120px"},{key:"percentage",header:"Completion",type:"percentage",sortable:!0,align:"right",width:"100px"},{key:"actions",header:"Actions",type:"button",width:"160px",buttonLabels:["View","Edit"],onButtonClick:(t,r)=>alert(`${t}: ${r.name}`)},{key:"menu",header:"",type:"icon",iconName:"menu-vertical",width:"48px",sticky:!0,onButtonClick:(t,r)=>alert(`Menu: ${r.name}`)}],p={render:()=>{const[t,r]=n.useState(),[s,o]=n.useState("none");return e.jsx("div",{style:{padding:24},children:e.jsx(l,{columns:J,rows:d,compact:!0,sortKey:t,sortDirection:s,onSort:(a,i)=>{r(a),o(i)}})})}},u={name:"Compact (scrollable — sticky + gradient)",render:()=>{const[t,r]=n.useState(),[s,o]=n.useState("none");return e.jsxs("div",{style:{padding:24,maxWidth:500},children:[e.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginBottom:12},children:"Container constrained to 500px — scroll horizontally."}),e.jsx(l,{columns:J,rows:d,compact:!0,sortKey:t,sortDirection:s,onSort:(a,i)=>{r(a),o(i)}})]})}},y={name:"Subtle (nested in a white tile)",render:()=>{const[t,r]=n.useState([1,3]),[s,o]=n.useState(),[a,i]=n.useState("none");return e.jsx("div",{style:{padding:24},children:e.jsx(G,{tileStyle:"highlight",padding:"screen",children:e.jsx(l,{tone:"subtle",columns:w.slice(0,6),rows:d,selectable:!0,selectedRows:t,onSelectionChange:r,sortKey:s,sortDirection:a,onSort:(_,V)=>{o(_),i(V)}})})})}},O=[{id:1,textPrimary:"Primary bold text",textRegular:"Regular secondary text",status:"shortlisting",wm:{name:"Charlie Parker",initials:"CP"},number:"12389293",percentage:"87"}],Q=[{key:"textPrimary",header:"Text Primary",type:"text-primary"},{key:"textRegular",header:"Text Regular",type:"text-regular"},{key:"status",header:"Pill (WF State)",renderCell:t=>e.jsx(x,{state:t.status,size:"small"})},{key:"wm",header:"WM",type:"wm",width:"200px"},{key:"number",header:"Number",type:"number",align:"right"},{key:"percentage",header:"Percentage",type:"percentage",align:"right"},{key:"button",header:"Button",type:"button",buttonLabels:["Label","Label","Label"],onButtonClick:t=>alert(t),width:"220px"},{key:"icon",header:"",type:"icon",iconName:"menu-vertical",width:"48px",sticky:!0,onButtonClick:()=>alert("icon clicked")}],h={render:()=>e.jsxs("div",{style:{padding:24},children:[e.jsx("h3",{style:{fontFamily:"Mulish, sans-serif",marginBottom:16,color:"#0C1457",fontWeight:700},children:"All Cell Types"}),e.jsx(l,{columns:Q,rows:O,compact:!1,selectable:!0})]})},g={name:"Header info",parameters:{docs:{description:{story:"`headerInfo` adds an info icon after the header text; its text shows in a tooltip (drawn in the page body, so a narrow or clipped header never cuts it)."}}},render:()=>e.jsx("div",{style:{padding:24,width:520},children:e.jsx(l,{compact:!0,layout:"fixed",columns:[{key:"name",header:"Name",type:"text-primary"},{key:"target",header:"Target hours",type:"number",align:"right",width:"130px",headerInfo:"Requested hours for target roles"},{key:"source",header:"Source hours",type:"number",align:"right",width:"130px",headerInfo:"Requested hours for source roles"}],rows:[{id:"1",name:"Javascript developer",target:100,source:100},{id:"2",name:"React developer",target:48,source:60}]})})},S={name:"Cell align top",parameters:{docs:{description:{story:'`cellAlign="top"` starts the body cells at the top of the row, for cells holding several lines (here two stacked values). The checkbox lines up with the first line.'}}},render:()=>e.jsx("div",{style:{padding:24,width:640},children:e.jsx(l,{selectable:!0,cellAlign:"top",columns:[{key:"name",header:"Name",type:"text-primary"},{key:"two",header:"Two lines",renderCell:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx("span",{children:"First line"}),e.jsx("span",{children:"Second line"})]})}],rows:[{id:"1",name:"Row one"},{id:"2",name:"Row two"}]})})};var b,f,k;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const [sortKey, setSortKey] = useState<string | undefined>();
    const [sortDir, setSortDir] = useState<"asc" | "desc" | "none">("none");
    return <div style={{
      padding: 24
    }}>
        <Table columns={standardColumns} rows={sampleRows} compact={false} selectable={true} sortKey={sortKey} sortDirection={sortDir} onSort={(key, dir) => {
        setSortKey(key);
        setSortDir(dir);
      }} />
      </div>;
  }
}`,...(k=(f=c.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var C,v,D;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Standard (scrollable — sticky + gradient)",
  render: () => {
    const [sortKey, setSortKey] = useState<string | undefined>();
    const [sortDir, setSortDir] = useState<"asc" | "desc" | "none">("none");
    return <div style={{
      padding: 24,
      maxWidth: 640
    }}>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 12,
        color: "#5C6E9E",
        marginBottom: 12
      }}>
          Container constrained to 640px — scroll horizontally to see sticky column + gradient.
        </p>
        <Table columns={standardColumns} rows={sampleRows} compact={false} selectable={true} sortKey={sortKey} sortDirection={sortDir} onSort={(key, dir) => {
        setSortKey(key);
        setSortDir(dir);
      }} />
      </div>;
  }
}`,...(D=(v=m.parameters)==null?void 0:v.docs)==null?void 0:D.source}}};var T,K,j;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    const [sortKey, setSortKey] = useState<string | undefined>();
    const [sortDir, setSortDir] = useState<"asc" | "desc" | "none">("none");
    return <div style={{
      padding: 24
    }}>
        <Table columns={compactColumns} rows={sampleRows} compact={true} sortKey={sortKey} sortDirection={sortDir} onSort={(key, dir) => {
        setSortKey(key);
        setSortDir(dir);
      }} />
      </div>;
  }
}`,...(j=(K=p.parameters)==null?void 0:K.docs)==null?void 0:j.source}}};var R,A,B;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: "Compact (scrollable — sticky + gradient)",
  render: () => {
    const [sortKey, setSortKey] = useState<string | undefined>();
    const [sortDir, setSortDir] = useState<"asc" | "desc" | "none">("none");
    return <div style={{
      padding: 24,
      maxWidth: 500
    }}>
        <p style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 12,
        color: "#5C6E9E",
        marginBottom: 12
      }}>
          Container constrained to 500px — scroll horizontally.
        </p>
        <Table columns={compactColumns} rows={sampleRows} compact={true} sortKey={sortKey} sortDirection={sortDir} onSort={(key, dir) => {
        setSortKey(key);
        setSortDir(dir);
      }} />
      </div>;
  }
}`,...(B=(A=u.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var N,z,E;y.parameters={...y.parameters,docs:{...(N=y.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: "Subtle (nested in a white tile)",
  render: () => {
    const [selected, setSelected] = useState<(string | number)[]>([1, 3]);
    const [sortKey, setSortKey] = useState<string | undefined>();
    const [sortDir, setSortDir] = useState<"asc" | "desc" | "none">("none");
    return <div style={{
      padding: 24
    }}>
        <Tile tileStyle="highlight" padding="screen">
          <Table tone="subtle" columns={standardColumns.slice(0, 6)} rows={sampleRows} selectable selectedRows={selected} onSelectionChange={setSelected} sortKey={sortKey} sortDirection={sortDir} onSort={(key, dir) => {
          setSortKey(key);
          setSortDir(dir);
        }} />
        </Tile>
      </div>;
  }
}`,...(E=(z=y.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var P,W,F;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 24
  }}>
      <h3 style={{
      fontFamily: "Mulish, sans-serif",
      marginBottom: 16,
      color: "#0C1457",
      fontWeight: 700
    }}>
        All Cell Types
      </h3>
      <Table columns={allCellColumns} rows={allCellRows} compact={false} selectable={true} />
    </div>
}`,...(F=(W=h.parameters)==null?void 0:W.docs)==null?void 0:F.source}}};var M,I,L;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "Header info",
  parameters: {
    docs: {
      description: {
        story: "\`headerInfo\` adds an info icon after the header text; its text shows in a tooltip (drawn in the page body, so a narrow or clipped header never cuts it)."
      }
    }
  },
  render: () => <div style={{
    padding: 24,
    width: 520
  }}>
      <Table compact layout="fixed" columns={[{
      key: "name",
      header: "Name",
      type: "text-primary"
    }, {
      key: "target",
      header: "Target hours",
      type: "number",
      align: "right",
      width: "130px",
      headerInfo: "Requested hours for target roles"
    }, {
      key: "source",
      header: "Source hours",
      type: "number",
      align: "right",
      width: "130px",
      headerInfo: "Requested hours for source roles"
    }]} rows={[{
      id: "1",
      name: "Javascript developer",
      target: 100,
      source: 100
    }, {
      id: "2",
      name: "React developer",
      target: 48,
      source: 60
    }]} />
    </div>
}`,...(L=(I=g.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var $,q,H;S.parameters={...S.parameters,docs:{...($=S.parameters)==null?void 0:$.docs,source:{originalSource:`{
  name: "Cell align top",
  parameters: {
    docs: {
      description: {
        story: "\`cellAlign=\\"top\\"\` starts the body cells at the top of the row, for cells holding several lines (here two stacked values). The checkbox lines up with the first line."
      }
    }
  },
  render: () => <div style={{
    padding: 24,
    width: 640
  }}>
      <Table selectable cellAlign="top" columns={[{
      key: "name",
      header: "Name",
      type: "text-primary"
    }, {
      key: "two",
      header: "Two lines",
      renderCell: () => <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}><span>First line</span><span>Second line</span></div>
    }]} rows={[{
      id: "1",
      name: "Row one"
    }, {
      id: "2",
      name: "Row two"
    }]} />
    </div>
}`,...(H=(q=S.parameters)==null?void 0:q.docs)==null?void 0:H.source}}};const ce=["Standard","StandardScrollable","Compact","CompactScrollable","Subtle","AllCellTypes","HeaderInfo","CellAlignTop"];export{h as AllCellTypes,S as CellAlignTop,p as Compact,u as CompactScrollable,g as HeaderInfo,c as Standard,m as StandardScrollable,y as Subtle,ce as __namedExportsOrder,de as default};
