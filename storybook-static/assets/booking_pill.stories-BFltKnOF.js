import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as l}from"./booking_pill-DF6faoaC.js";import"./index-DhMLlvMY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";import"./icon-D2SvuOdm.js";const C={title:"Components/BookingPill",component:l,parameters:{design:{type:"figma",url:"https://www.figma.com/design/l3JiE7ZmAsjSZY5Z7yPCOZ?node-id=39-116612"}},argTypes:{category:{control:"select",options:["booking-blue","booking-red","booking-purple","engagement-booked","engagement-partial","role-booked","role-partial","pending","hidden","preview"]},size:{control:"select",options:["regular","small"]}}},c=[{category:"booking-blue",label:"Senior Auditor",hours:"80h"},{category:"booking-red",label:"Risk Analyst",hours:"120h"},{category:"booking-purple",label:"Tech Lead",hours:"160h"},{category:"engagement-booked",label:"ST engagement test - ST Role#2",hours:"26% (10h)"},{category:"engagement-partial",label:"ST engagement test - ST Role#2",hours:"26% (10h)"},{category:"role-booked",label:"Senior Auditor",hours:"Requested 120h"},{category:"role-partial",label:"Risk Analyst",hours:"Requested 80h"},{category:"pending",label:"Pending booking",hours:"40h"},{category:"preview",label:"Tech Lead (reassigned)",hours:"48h"},{category:"hidden",label:""}],n=({children:i})=>e.jsx("span",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,fontWeight:700,color:"var(--palette-neutral-3)",textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:8},children:i}),o={name:"All Categories",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24,padding:24},children:[e.jsxs("div",{children:[e.jsx(n,{children:"Regular — all categories"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:c.map(({category:i,label:g,hours:T})=>e.jsx("div",{style:{width:260},children:e.jsx(l,{category:i,label:g,hours:T,size:"regular"})},i))})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Small — all categories"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:c.filter(i=>i.category!=="hidden").map(({category:i,label:g})=>e.jsx("div",{style:{width:200},children:e.jsx(l,{category:i,label:g,size:"small"})},i))})]}),e.jsxs("div",{children:[e.jsx(n,{children:"With icons — otherBookings + nonDemand"}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("div",{style:{width:260},children:e.jsx(l,{category:"booking-blue",label:"With other bookings",hours:"40h",otherBookings:!0})}),e.jsx("div",{style:{width:260},children:e.jsx(l,{category:"booking-blue",label:"Non-demand booking",hours:"40h",nonDemand:!0})}),e.jsx("div",{style:{width:260},children:e.jsx(l,{category:"booking-blue",label:"Both icons",hours:"40h",otherBookings:!0,nonDemand:!0})})]})]}),e.jsxs("div",{children:[e.jsx(n,{children:"In Gantt context (narrow widths)"}),e.jsxs("div",{style:{display:"flex",gap:4,background:"var(--palette-neutral-2)",padding:8},children:[e.jsx(l,{category:"engagement-booked",label:"ST engagement test - ST Role#2",hours:"26% (10h)",size:"regular"}),e.jsx(l,{category:"role-booked",label:"ST engage...",hours:"Requested 80h",size:"regular"}),e.jsx(l,{category:"booking-blue",label:"Senior Auditor",hours:"80h",size:"regular"}),e.jsx(l,{category:"role-partial",label:"Partial",hours:"Requested 40h",size:"regular"}),e.jsx(l,{category:"preview",label:"Tech Lead (reassigned)",hours:"48h",size:"regular"})]})]})]})},a={name:"Booking",parameters:{docs:{description:{story:"Profile booking pills — `booking-blue`, `booking-red`, `booking-purple`. Top line shows the **role name** (bold), second line shows booked hours."}}},render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,padding:24},children:[e.jsxs("div",{children:[e.jsx(n,{children:"Regular — all booking colours"}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx("div",{style:{width:220},children:e.jsx(l,{category:"booking-blue",label:"Senior Auditor",hours:"80h",size:"regular"})}),e.jsx("div",{style:{width:220},children:e.jsx(l,{category:"booking-red",label:"Risk Analyst",hours:"120h",size:"regular"})}),e.jsx("div",{style:{width:220},children:e.jsx(l,{category:"booking-purple",label:"Tech Lead",hours:"160h",size:"regular"})})]})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Small"}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[e.jsx(l,{category:"booking-blue",label:"Senior Auditor",size:"small"}),e.jsx(l,{category:"booking-red",label:"Risk Analyst",size:"small"}),e.jsx(l,{category:"booking-purple",label:"Tech Lead",size:"small"})]})]})]})},r={name:"Engagement",parameters:{docs:{description:{story:"Engagement pills — `engagement-booked` (periwinkle fill, white text) and `engagement-partial` (white/transparent fill, periwinkle border). Second line shows utilisation percentage and hours."}}},render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,padding:24},children:[e.jsxs("div",{children:[e.jsx(n,{children:"Engagement Booked — regular"}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx("div",{style:{width:280},children:e.jsx(l,{category:"engagement-booked",label:"ST engagement test - ST Role#2",hours:"26% (10h)",size:"regular"})}),e.jsx("div",{style:{width:200},children:e.jsx(l,{category:"engagement-booked",label:"Wyoming",hours:"100% (40h)",size:"regular"})})]})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Engagement Booked — small"}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(l,{category:"engagement-booked",label:"ST engagement test",size:"small"}),e.jsx(l,{category:"engagement-booked",label:"Wyoming",size:"small"})]})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Engagement Partial (unfilled portion)"}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx("div",{style:{width:280},children:e.jsx(l,{category:"engagement-partial",label:"ST engagement test - ST Role#2",hours:"42% (10h)",size:"regular"})}),e.jsx(l,{category:"engagement-partial",label:"Regression Blueprints",size:"small"})]})]})]})},s={name:"Role",parameters:{docs:{description:{story:"Role pills — `role-booked` (teal fill, white text) and `role-partial` (white/transparent fill, teal border). Second line uses 'Requested Xh' format."}}},render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,padding:24},children:[e.jsxs("div",{children:[e.jsx(n,{children:"Role Booked — regular"}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx("div",{style:{width:200},children:e.jsx(l,{category:"role-booked",label:"Tech Lead",hours:"Requested 160h",size:"regular"})}),e.jsx("div",{style:{width:200},children:e.jsx(l,{category:"role-booked",label:"Senior Auditor",hours:"Requested 120h",size:"regular"})}),e.jsx("div",{style:{width:200},children:e.jsx(l,{category:"role-booked",label:"ST engagement test",hours:"Requested 80h",size:"regular"})})]})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Role Booked — small"}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(l,{category:"role-booked",label:"Tech Lead",size:"small"}),e.jsx(l,{category:"role-booked",label:"Senior Auditor",size:"small"}),e.jsx(l,{category:"role-booked",label:"ST Role#1",size:"small"})]})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Role Partial (unfilled vacancy)"}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx("div",{style:{width:200},children:e.jsx(l,{category:"role-partial",label:"Risk Analyst",hours:"Requested 80h",size:"regular"})}),e.jsx(l,{category:"role-partial",label:"Risk Analyst",size:"small"})]})]})]})},t={name:"Pending",parameters:{docs:{description:{story:"Pending booking — grey/neutral fill, orange dashed border, hourglass icon. Used when a booking is awaiting confirmation."}}},render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,padding:24},children:[e.jsxs("div",{children:[e.jsx(n,{children:"Regular"}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx("div",{style:{width:260},children:e.jsx(l,{category:"pending",label:"Pending booking",hours:"40h",size:"regular"})}),e.jsx("div",{style:{width:260},children:e.jsx(l,{category:"pending",label:"Senior Auditor",hours:"80h",size:"regular"})}),e.jsx("div",{style:{width:260},children:e.jsx(l,{category:"pending",label:"Tech Lead",hours:"160h",size:"regular"})})]})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Small"}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(l,{category:"pending",label:"Pending booking",size:"small"}),e.jsx(l,{category:"pending",label:"Senior Auditor",size:"small"}),e.jsx(l,{category:"pending",label:"Tech Lead",size:"small"})]})]})]})},d={name:"Preview (ProPilot suggested booking)",parameters:{docs:{description:{story:"The `preview` category is used by ProPilot to show suggested bookings inline in the Gantt. White fill with a 2px ProPilot gradient stroke (navy → purple → blue). 14px bold role name, 12px regular hours — both in `palette-blue-0`."}}},render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,padding:24,background:"var(--palette-neutral-2)",borderRadius:8},children:[e.jsxs("div",{children:[e.jsx(n,{children:"Regular"}),e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",flexWrap:"wrap"},children:[e.jsx(l,{category:"preview",label:"Tech Lead (reassigned)",hours:"48h",size:"regular"}),e.jsx(l,{category:"preview",label:"Senior Consultant (reassigned)",hours:"288h",size:"regular"}),e.jsx(l,{category:"preview",label:"James Obi",hours:"80h",size:"regular"}),e.jsx(l,{category:"preview",label:"Nina Okafor",hours:"320h",size:"regular"})]})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Small"}),e.jsxs("div",{style:{display:"flex",gap:4,alignItems:"flex-start"},children:[e.jsx(l,{category:"preview",label:"Tech Lead",size:"small"}),e.jsx(l,{category:"preview",label:"Senior Consultant",size:"small"})]})]})]})};var p,h,u;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
        <SectionLabel>In Gantt context (narrow widths)</SectionLabel>
        <div style={{
        display: "flex",
        gap: 4,
        background: "var(--palette-neutral-2)",
        padding: 8
      }}>
          <BookingPill category="engagement-booked" label="ST engagement test - ST Role#2" hours="26% (10h)" size="regular" />
          <BookingPill category="role-booked" label="ST engage..." hours="Requested 80h" size="regular" />
          <BookingPill category="booking-blue" label="Senior Auditor" hours="80h" size="regular" />
          <BookingPill category="role-partial" label="Partial" hours="Requested 40h" size="regular" />
          <BookingPill category="preview" label="Tech Lead (reassigned)" hours="48h" size="regular" />
        </div>
      </div>
    </div>
}`,...(u=(h=o.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var y,b,x;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Booking",
  parameters: {
    docs: {
      description: {
        story: "Profile booking pills — \`booking-blue\`, \`booking-red\`, \`booking-purple\`. " + "Top line shows the **role name** (bold), second line shows booked hours."
      }
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 24
  }}>
      <div>
        <SectionLabel>Regular — all booking colours</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }}>
          <div style={{
          width: 220
        }}>
            <BookingPill category="booking-blue" label="Senior Auditor" hours="80h" size="regular" />
          </div>
          <div style={{
          width: 220
        }}>
            <BookingPill category="booking-red" label="Risk Analyst" hours="120h" size="regular" />
          </div>
          <div style={{
          width: 220
        }}>
            <BookingPill category="booking-purple" label="Tech Lead" hours="160h" size="regular" />
          </div>
        </div>
      </div>
      <div>
        <SectionLabel>Small</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center"
      }}>
          <BookingPill category="booking-blue" label="Senior Auditor" size="small" />
          <BookingPill category="booking-red" label="Risk Analyst" size="small" />
          <BookingPill category="booking-purple" label="Tech Lead" size="small" />
        </div>
      </div>
    </div>
}`,...(x=(b=a.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var m,v,k;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Engagement",
  parameters: {
    docs: {
      description: {
        story: "Engagement pills — \`engagement-booked\` (periwinkle fill, white text) and " + "\`engagement-partial\` (white/transparent fill, periwinkle border). " + "Second line shows utilisation percentage and hours."
      }
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 24
  }}>
      <div>
        <SectionLabel>Engagement Booked — regular</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }}>
          <div style={{
          width: 280
        }}>
            <BookingPill category="engagement-booked" label="ST engagement test - ST Role#2" hours="26% (10h)" size="regular" />
          </div>
          <div style={{
          width: 200
        }}>
            <BookingPill category="engagement-booked" label="Wyoming" hours="100% (40h)" size="regular" />
          </div>
        </div>
      </div>
      <div>
        <SectionLabel>Engagement Booked — small</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8,
        alignItems: "center"
      }}>
          <BookingPill category="engagement-booked" label="ST engagement test" size="small" />
          <BookingPill category="engagement-booked" label="Wyoming" size="small" />
        </div>
      </div>
      <div>
        <SectionLabel>Engagement Partial (unfilled portion)</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }}>
          <div style={{
          width: 280
        }}>
            <BookingPill category="engagement-partial" label="ST engagement test - ST Role#2" hours="42% (10h)" size="regular" />
          </div>
          <BookingPill category="engagement-partial" label="Regression Blueprints" size="small" />
        </div>
      </div>
    </div>
}`,...(k=(v=r.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var j,f,w;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "Role",
  parameters: {
    docs: {
      description: {
        story: "Role pills — \`role-booked\` (teal fill, white text) and \`role-partial\` " + "(white/transparent fill, teal border). Second line uses 'Requested Xh' format."
      }
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 24
  }}>
      <div>
        <SectionLabel>Role Booked — regular</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }}>
          <div style={{
          width: 200
        }}>
            <BookingPill category="role-booked" label="Tech Lead" hours="Requested 160h" size="regular" />
          </div>
          <div style={{
          width: 200
        }}>
            <BookingPill category="role-booked" label="Senior Auditor" hours="Requested 120h" size="regular" />
          </div>
          <div style={{
          width: 200
        }}>
            <BookingPill category="role-booked" label="ST engagement test" hours="Requested 80h" size="regular" />
          </div>
        </div>
      </div>
      <div>
        <SectionLabel>Role Booked — small</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8,
        alignItems: "center"
      }}>
          <BookingPill category="role-booked" label="Tech Lead" size="small" />
          <BookingPill category="role-booked" label="Senior Auditor" size="small" />
          <BookingPill category="role-booked" label="ST Role#1" size="small" />
        </div>
      </div>
      <div>
        <SectionLabel>Role Partial (unfilled vacancy)</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }}>
          <div style={{
          width: 200
        }}>
            <BookingPill category="role-partial" label="Risk Analyst" hours="Requested 80h" size="regular" />
          </div>
          <BookingPill category="role-partial" label="Risk Analyst" size="small" />
        </div>
      </div>
    </div>
}`,...(w=(f=s.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var S,z,P;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Pending",
  parameters: {
    docs: {
      description: {
        story: "Pending booking — grey/neutral fill, orange dashed border, hourglass icon. " + "Used when a booking is awaiting confirmation."
      }
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 24
  }}>
      <div>
        <SectionLabel>Regular</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }}>
          <div style={{
          width: 260
        }}>
            <BookingPill category="pending" label="Pending booking" hours="40h" size="regular" />
          </div>
          <div style={{
          width: 260
        }}>
            <BookingPill category="pending" label="Senior Auditor" hours="80h" size="regular" />
          </div>
          <div style={{
          width: 260
        }}>
            <BookingPill category="pending" label="Tech Lead" hours="160h" size="regular" />
          </div>
        </div>
      </div>
      <div>
        <SectionLabel>Small</SectionLabel>
        <div style={{
        display: "flex",
        gap: 8,
        alignItems: "center"
      }}>
          <BookingPill category="pending" label="Pending booking" size="small" />
          <BookingPill category="pending" label="Senior Auditor" size="small" />
          <BookingPill category="pending" label="Tech Lead" size="small" />
        </div>
      </div>
    </div>
}`,...(P=(z=t.parameters)==null?void 0:z.docs)==null?void 0:P.source}}};var B,R,L;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Preview (ProPilot suggested booking)",
  parameters: {
    docs: {
      description: {
        story: "The \`preview\` category is used by ProPilot to show suggested bookings inline in the Gantt. " + "White fill with a 2px ProPilot gradient stroke (navy → purple → blue). " + "14px bold role name, 12px regular hours — both in \`palette-blue-0\`."
      }
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 24,
    background: "var(--palette-neutral-2)",
    borderRadius: 8
  }}>
      <div>
        <SectionLabel>Regular</SectionLabel>
        <div style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        flexWrap: "wrap"
      }}>
          <BookingPill category="preview" label="Tech Lead (reassigned)" hours="48h" size="regular" />
          <BookingPill category="preview" label="Senior Consultant (reassigned)" hours="288h" size="regular" />
          <BookingPill category="preview" label="James Obi" hours="80h" size="regular" />
          <BookingPill category="preview" label="Nina Okafor" hours="320h" size="regular" />
        </div>
      </div>
      <div>
        <SectionLabel>Small</SectionLabel>
        <div style={{
        display: "flex",
        gap: 4,
        alignItems: "flex-start"
      }}>
          <BookingPill category="preview" label="Tech Lead" size="small" />
          <BookingPill category="preview" label="Senior Consultant" size="small" />
        </div>
      </div>
    </div>
}`,...(L=(R=d.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};const O=["AllCategories","Booking","Engagement","RoleBooked","Pending","Preview"];export{o as AllCategories,a as Booking,r as Engagement,t as Pending,d as Preview,s as RoleBooked,O as __namedExportsOrder,C as default};
