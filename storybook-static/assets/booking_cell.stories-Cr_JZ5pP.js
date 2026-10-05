import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as l}from"./booking_cell-B_-cgc2X.js";import"./index-DhMLlvMY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const j={title:"Components/BookingCell",component:l,parameters:{design:{type:"figma",url:"https://www.figma.com/design/cGiQ5fBm2a4UqHye7JmeoB?node-id=2001-502059"}}},i=({children:a})=>e.jsx("div",{style:{display:"flex",gap:0,alignItems:"stretch",border:"1px solid var(--palette-neutral-0)",width:"fit-content"},children:a}),r=({children:a})=>e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,fontWeight:700,color:"var(--palette-blue-2)",textTransform:"uppercase",marginBottom:8},children:a}),o=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,padding:24},children:[e.jsxs("div",{children:[e.jsx(r,{children:"Default — all categories"}),e.jsxs(i,{children:[e.jsx(l,{value:10,category:"empty"}),e.jsx(l,{value:10,category:"blue"}),e.jsx(l,{value:20,category:"red"}),e.jsx(l,{value:40,category:"purple"}),e.jsx(l,{value:0,category:"empty"})]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Read-only (engagement aggregate row)"}),e.jsxs(i,{children:[e.jsx(l,{value:10,readOnly:!0}),e.jsx(l,{value:10,readOnly:!0}),e.jsx(l,{value:10,readOnly:!0}),e.jsx(l,{value:0,readOnly:!0}),e.jsx(l,{value:20,readOnly:!0})]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"With deadline marker (red line at bottom)"}),e.jsxs(i,{children:[e.jsx(l,{value:10,category:"blue"}),e.jsx(l,{value:10,category:"blue"}),e.jsx(l,{value:10,category:"blue",deadline:!0}),e.jsx(l,{value:10,category:"blue"}),e.jsx(l,{value:10,category:"blue"})]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"In grid context — engagement row + role rows + profile rows"}),e.jsxs("div",{style:{display:"inline-block"},children:[e.jsx("div",{style:{display:"flex",borderBottom:"1px solid var(--palette-neutral-0)"},children:[10,10,10,10,10,10,10,10,10,10].map((a,n)=>e.jsx(l,{value:a,readOnly:!0},n))}),e.jsx("div",{style:{display:"flex",borderBottom:"1px solid var(--palette-neutral-0)"},children:[10,10,10,10,10,10,10,10,10,10].map((a,n)=>e.jsx(l,{value:a,category:"empty"},n))}),e.jsx("div",{style:{display:"flex",borderBottom:"1px solid var(--palette-neutral-0)"},children:[20,0,40,0,0,0,10,0,0,20].map((a,n)=>e.jsx(l,{value:a,category:"blue"},n))})]})]})]}),t={args:{value:10,category:"blue",readOnly:!1,deadline:!1}};o.__docgenInfo={description:"",methods:[],displayName:"AllStates"};var s,d,g;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`() => <div style={{
  display: "flex",
  flexDirection: "column",
  gap: 24,
  padding: 24
}}>

    <div>
      <Label>Default — all categories</Label>
      <Row>
        <BookingCell value={10} category="empty" />
        <BookingCell value={10} category="blue" />
        <BookingCell value={20} category="red" />
        <BookingCell value={40} category="purple" />
        <BookingCell value={0} category="empty" />
      </Row>
    </div>

    <div>
      <Label>Read-only (engagement aggregate row)</Label>
      <Row>
        <BookingCell value={10} readOnly />
        <BookingCell value={10} readOnly />
        <BookingCell value={10} readOnly />
        <BookingCell value={0} readOnly />
        <BookingCell value={20} readOnly />
      </Row>
    </div>

    <div>
      <Label>With deadline marker (red line at bottom)</Label>
      <Row>
        <BookingCell value={10} category="blue" />
        <BookingCell value={10} category="blue" />
        <BookingCell value={10} category="blue" deadline />
        <BookingCell value={10} category="blue" />
        <BookingCell value={10} category="blue" />
      </Row>
    </div>

    <div>
      <Label>In grid context — engagement row + role rows + profile rows</Label>
      <div style={{
      display: "inline-block"
    }}>
        {/* Engagement aggregate — read only */}
        <div style={{
        display: "flex",
        borderBottom: "1px solid var(--palette-neutral-0)"
      }}>
          {[10, 10, 10, 10, 10, 10, 10, 10, 10, 10].map((v, i) => <BookingCell key={i} value={v} readOnly />)}
        </div>
        {/* Role row — editable */}
        <div style={{
        display: "flex",
        borderBottom: "1px solid var(--palette-neutral-0)"
      }}>
          {[10, 10, 10, 10, 10, 10, 10, 10, 10, 10].map((v, i) => <BookingCell key={i} value={v} category="empty" />)}
        </div>
        {/* Profile booking row — editable with category dots */}
        <div style={{
        display: "flex",
        borderBottom: "1px solid var(--palette-neutral-0)"
      }}>
          {[20, 0, 40, 0, 0, 0, 10, 0, 0, 20].map((v, i) => <BookingCell key={i} value={v} category="blue" />)}
        </div>
      </div>
    </div>

  </div>`,...(g=(d=o.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var u,c,v;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    value: 10,
    category: "blue",
    readOnly: false,
    deadline: false
  }
}`,...(v=(c=t.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};const f=["AllStates","Default"];export{o as AllStates,t as Default,f as __namedExportsOrder,j as default};
