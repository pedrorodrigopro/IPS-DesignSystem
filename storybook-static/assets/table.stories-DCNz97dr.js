import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as n}from"./index-DhMLlvMY.js";import{T as l}from"./table-BW0B6Utx.js";import{d as h}from"./pill-BoHR_cu4.js";import{T as L}from"./tile-DxGAws7a.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-Dpkq_sne.js";import"./avatar-DzCkQh3P.js";import"./checkbox-Dd9w011Z.js";const Y={title:"Components/Table",component:l,parameters:{layout:"padded",docs:{description:{component:"Data table with Standard (56px rows, checkbox column) and Compact (40px rows) sizes. Supports sortable headers, row selection, and cell types: text-primary, text-regular, pill (WF State), wm, number, percentage, button, icon. The last sticky column pins to the right and a gradient appears when the table overflows horizontally."}}}},c=[{id:1,name:"Alpha Project",status:"shortlisting",secondaryText:"Secondary text",wm:{name:"Charlie Parker",initials:"CP"},number:"12389293",percentage:"100"},{id:2,name:"Beta Initiative",status:"in-review",secondaryText:"Secondary text",wm:{name:"Jane Smith",initials:"JS"},number:"98765432",percentage:"75"},{id:3,name:"Gamma Phase",status:"confirmed",secondaryText:"Secondary text long example that may wrap across multiple lines",wm:{name:"Robert Chen",initials:"RC"},number:"11223344",percentage:"50"},{id:4,name:"Delta Stream",status:"not-filled",secondaryText:"Secondary text",wm:{name:"Amara Nwosu",initials:"AN"},number:"55667788",percentage:"90"}],g=[{key:"name",header:"Name",type:"text-primary",sortable:!0,width:"180px"},{key:"status",header:"Status",sortable:!0,width:"150px",renderCell:e=>t.jsx(h,{state:e.status,size:"small"})},{key:"secondaryText",header:"Secondary",type:"text-regular",sortable:!1,width:"200px"},{key:"wm",header:"Workforce Member",type:"wm",sortable:!1,width:"200px"},{key:"number",header:"Number",type:"number",sortable:!0,align:"right",width:"120px"},{key:"percentage",header:"Completion",type:"percentage",sortable:!0,align:"right",width:"100px"},{key:"actions",header:"Actions",type:"button",sortable:!1,width:"220px",buttonLabels:["View","Edit","Remove"],onButtonClick:(e,r)=>alert(`${e}: ${r.name}`)},{key:"menu",header:"",type:"icon",iconName:"menu-vertical",width:"48px",sticky:!0,onButtonClick:(e,r)=>alert(`Menu: ${r.name}`)}],d={render:()=>{const[e,r]=n.useState(),[s,o]=n.useState("none");return t.jsx("div",{style:{padding:24},children:t.jsx(l,{columns:g,rows:c,compact:!1,selectable:!0,sortKey:e,sortDirection:s,onSort:(a,i)=>{r(a),o(i)}})})}},m={name:"Standard (scrollable — sticky + gradient)",render:()=>{const[e,r]=n.useState(),[s,o]=n.useState("none");return t.jsxs("div",{style:{padding:24,maxWidth:640},children:[t.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginBottom:12},children:"Container constrained to 640px — scroll horizontally to see sticky column + gradient."}),t.jsx(l,{columns:g,rows:c,compact:!1,selectable:!0,sortKey:e,sortDirection:s,onSort:(a,i)=>{r(a),o(i)}})]})}},N=[{key:"name",header:"Name",type:"text-primary",sortable:!0,width:"180px"},{key:"status",header:"Status",width:"150px",renderCell:e=>t.jsx(h,{state:e.status,size:"small"})},{key:"secondaryText",header:"Secondary",type:"text-regular",width:"200px"},{key:"wm",header:"Workforce Member",type:"wm",width:"200px"},{key:"number",header:"Number",type:"number",sortable:!0,align:"right",width:"120px"},{key:"percentage",header:"Completion",type:"percentage",sortable:!0,align:"right",width:"100px"},{key:"actions",header:"Actions",type:"button",width:"160px",buttonLabels:["View","Edit"],onButtonClick:(e,r)=>alert(`${e}: ${r.name}`)},{key:"menu",header:"",type:"icon",iconName:"menu-vertical",width:"48px",sticky:!0,onButtonClick:(e,r)=>alert(`Menu: ${r.name}`)}],u={render:()=>{const[e,r]=n.useState(),[s,o]=n.useState("none");return t.jsx("div",{style:{padding:24},children:t.jsx(l,{columns:N,rows:c,compact:!0,sortKey:e,sortDirection:s,onSort:(a,i)=>{r(a),o(i)}})})}},p={name:"Compact (scrollable — sticky + gradient)",render:()=>{const[e,r]=n.useState(),[s,o]=n.useState("none");return t.jsxs("div",{style:{padding:24,maxWidth:500},children:[t.jsx("p",{style:{fontFamily:"Mulish, sans-serif",fontSize:12,color:"#5C6E9E",marginBottom:12},children:"Container constrained to 500px — scroll horizontally."}),t.jsx(l,{columns:N,rows:c,compact:!0,sortKey:e,sortDirection:s,onSort:(a,i)=>{r(a),o(i)}})]})}},y={name:"Subtle (nested in a white tile)",render:()=>{const[e,r]=n.useState([1,3]),[s,o]=n.useState(),[a,i]=n.useState("none");return t.jsx("div",{style:{padding:24},children:t.jsx(L,{tileStyle:"highlight",padding:"screen",children:t.jsx(l,{tone:"subtle",columns:g.slice(0,6),rows:c,selectable:!0,selectedRows:e,onSelectionChange:r,sortKey:s,sortDirection:a,onSort:(A,F)=>{o(A),i(F)}})})})}},$=[{id:1,textPrimary:"Primary bold text",textRegular:"Regular secondary text",status:"shortlisting",wm:{name:"Charlie Parker",initials:"CP"},number:"12389293",percentage:"87"}],_=[{key:"textPrimary",header:"Text Primary",type:"text-primary"},{key:"textRegular",header:"Text Regular",type:"text-regular"},{key:"status",header:"Pill (WF State)",renderCell:e=>t.jsx(h,{state:e.status,size:"small"})},{key:"wm",header:"WM",type:"wm",width:"200px"},{key:"number",header:"Number",type:"number",align:"right"},{key:"percentage",header:"Percentage",type:"percentage",align:"right"},{key:"button",header:"Button",type:"button",buttonLabels:["Label","Label","Label"],onButtonClick:e=>alert(e),width:"220px"},{key:"icon",header:"",type:"icon",iconName:"menu-vertical",width:"48px",sticky:!0,onButtonClick:()=>alert("icon clicked")}],S={render:()=>t.jsxs("div",{style:{padding:24},children:[t.jsx("h3",{style:{fontFamily:"Mulish, sans-serif",marginBottom:16,color:"#0C1457",fontWeight:700},children:"All Cell Types"}),t.jsx(l,{columns:_,rows:$,compact:!1,selectable:!0})]})};var x,b,w;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(w=(b=d.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var k,C,f;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(f=(C=m.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var D,K,T;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(T=(K=u.parameters)==null?void 0:K.docs)==null?void 0:T.source}}};var v,j,R;p.parameters={...p.parameters,docs:{...(v=p.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(R=(j=p.parameters)==null?void 0:j.docs)==null?void 0:R.source}}};var B,z,E;y.parameters={...y.parameters,docs:{...(B=y.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(E=(z=y.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var P,W,M;S.parameters={...S.parameters,docs:{...(P=S.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(M=(W=S.parameters)==null?void 0:W.docs)==null?void 0:M.source}}};const Z=["Standard","StandardScrollable","Compact","CompactScrollable","Subtle","AllCellTypes"];export{S as AllCellTypes,u as Compact,p as CompactScrollable,d as Standard,m as StandardScrollable,y as Subtle,Z as __namedExportsOrder,Y as default};
