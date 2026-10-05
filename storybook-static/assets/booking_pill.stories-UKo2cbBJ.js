import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as n}from"./booking_pill-CGsWyjpK.js";import"./index-DhMLlvMY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-D1UQke6Y.js";const j={title:"Components/BookingPill",component:n,parameters:{design:{type:"figma",url:"https://www.figma.com/design/l3JiE7ZmAsjSZY5Z7yPCOZ?node-id=39-116612"}},argTypes:{category:{control:"select",options:["booking-blue","booking-red","booking-purple","engagement-booked","engagement-partial","role-booked","role-partial","pending","hidden"]},size:{control:"select",options:["regular","small"]}}},t=[{category:"booking-blue",label:"Role 1 - Booking Category",hours:"40h"},{category:"booking-red",label:"Role 1 - Booking Category",hours:"40h"},{category:"booking-purple",label:"Role 1 - Booking Category",hours:"40h"},{category:"engagement-booked",label:"ST engagement test - ST Role#2",hours:"26% (10h)"},{category:"engagement-partial",label:"ST engagement test - ST Role#2",hours:"26% (10h)"},{category:"role-booked",label:"ST engagement test",hours:"100% (24h)"},{category:"role-partial",label:"ST engagement test",hours:"42% (10h)"},{category:"pending",label:"Role 1 - Booking Category",hours:"40h"},{category:"hidden",label:""}],l=({children:o})=>e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,fontWeight:700,color:"var(--palette-neutral-3)",textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:8},children:o}),i={name:"All Categories",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,padding:24},children:[e.jsxs("div",{children:[e.jsx(l,{children:"Regular — all categories"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:t.map(({category:o,label:r,hours:y})=>e.jsx("div",{style:{width:260},children:e.jsx(n,{category:o,label:r,hours:y,size:"regular"})},o))})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Small — all categories"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:t.filter(o=>o.category!=="hidden").map(({category:o,label:r})=>e.jsx("div",{style:{width:200},children:e.jsx(n,{category:o,label:r,size:"small"})},o))})]}),e.jsxs("div",{children:[e.jsx(l,{children:"With icons — otherBookings + nonDemand"}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("div",{style:{width:260},children:e.jsx(n,{category:"booking-blue",label:"With other bookings",hours:"40h",otherBookings:!0})}),e.jsx("div",{style:{width:260},children:e.jsx(n,{category:"booking-blue",label:"Non-demand booking",hours:"40h",nonDemand:!0})}),e.jsx("div",{style:{width:260},children:e.jsx(n,{category:"booking-blue",label:"Both icons",hours:"40h",otherBookings:!0,nonDemand:!0})})]})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Pending — dashed border"}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("div",{style:{width:260},children:e.jsx(n,{category:"pending",label:"Pending booking",hours:"40h",size:"regular"})}),e.jsx("div",{style:{width:200},children:e.jsx(n,{category:"pending",label:"Pending",size:"small"})})]})]}),e.jsxs("div",{children:[e.jsx(l,{children:"In Gantt context (narrow widths)"}),e.jsxs("div",{style:{display:"flex",gap:4,background:"var(--palette-neutral-2)",padding:8},children:[e.jsx(n,{category:"engagement-booked",label:"ST engagement test - ST Role#2",hours:"26% (10h)",size:"regular"}),e.jsx(n,{category:"role-booked",label:"ST engage...",hours:"100% (16h)",size:"regular"}),e.jsx(n,{category:"booking-blue",label:"Role booking",hours:"8h",size:"regular"}),e.jsx(n,{category:"role-partial",label:"Partial",hours:"42% (10h)",size:"regular"})]})]})]})},a={args:{category:"booking-blue",label:"Role 1 - Booking Category",hours:"40h",size:"regular"}};var s,g,d;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "All Categories",
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: 24
  }}>
      <div>
        <SectionLabel>Regular — all categories</SectionLabel>
        <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8
      }}>
          {ALL_CATEGORIES.map(({
          category,
          label,
          hours
        }) => <div key={category} style={{
          width: 260
        }}>
              <BookingPill category={category} label={label} hours={hours} size="regular" />
            </div>)}
        </div>
      </div>

      <div>
        <SectionLabel>Small — all categories</SectionLabel>
        <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8
      }}>
          {ALL_CATEGORIES.filter(c => c.category !== "hidden").map(({
          category,
          label
        }) => <div key={category} style={{
          width: 200
        }}>
              <BookingPill category={category} label={label} size="small" />
            </div>)}
        </div>
      </div>

      <div>
        <SectionLabel>With icons — otherBookings + nonDemand</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8
      }}>
          <div style={{
          width: 260
        }}>
            <BookingPill category="booking-blue" label="With other bookings" hours="40h" otherBookings />
          </div>
          <div style={{
          width: 260
        }}>
            <BookingPill category="booking-blue" label="Non-demand booking" hours="40h" nonDemand />
          </div>
          <div style={{
          width: 260
        }}>
            <BookingPill category="booking-blue" label="Both icons" hours="40h" otherBookings nonDemand />
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>Pending — dashed border</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8
      }}>
          <div style={{
          width: 260
        }}>
            <BookingPill category="pending" label="Pending booking" hours="40h" size="regular" />
          </div>
          <div style={{
          width: 200
        }}>
            <BookingPill category="pending" label="Pending" size="small" />
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>In Gantt context (narrow widths)</SectionLabel>
        <div style={{
        display: "flex",
        gap: 4,
        background: "var(--palette-neutral-2)",
        padding: 8
      }}>
          <BookingPill category="engagement-booked" label="ST engagement test - ST Role#2" hours="26% (10h)" size="regular" />
          <BookingPill category="role-booked" label="ST engage..." hours="100% (16h)" size="regular" />
          <BookingPill category="booking-blue" label="Role booking" hours="8h" size="regular" />
          <BookingPill category="role-partial" label="Partial" hours="42% (10h)" size="regular" />
        </div>
      </div>
    </div>
}`,...(d=(g=i.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var c,h,b;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    category: "booking-blue",
    label: "Role 1 - Booking Category",
    hours: "40h",
    size: "regular"
  }
}`,...(b=(h=a.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};const S=["AllCategories","Default"];export{i as AllCategories,a as Default,S as __namedExportsOrder,j as default};
