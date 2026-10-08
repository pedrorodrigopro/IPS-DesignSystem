import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as p}from"./index-DhMLlvMY.js";import{B as e}from"./booking_slideshow-DgVJhQ7e.js";import"./_commonjsHelpers-CqkleIqs.js";import"./navigation-Bk3kGR9g.js";import"./index-Dd5QUkq_.js";import"./icon-D1UQke6Y.js";import"./input-B84e0Cz_.js";import"./button-CreEIUG8.js";import"./checkbox-Dd9w011Z.js";import"./switch-yHtKPN7c.js";import"./tile-DxGAws7a.js";import"./workforce_member-DGZhzlsU.js";import"./avatar-DzCkQh3P.js";import"./tooltip-Bkp5rPqR.js";const X={title:"Molecules/BookingSlideshow",component:e,parameters:{layout:"padded",docs:{description:{component:"Full booking card molecule (`Figma: .Booking / 7324:192187`). Combines the **CarouselCard** rule navigator with three tabs: **Details** (dates, overscheduling, category, title, description), **Notes** (add note input + note rows), and **History** (simple / single-field / multi-field change items). Width: 352px (as per Figma). Background: `#F8F9FD`, border: `1px solid #CFDAF7`."}}}},o=[{startDate:"13 Mar 2026",endDate:"17 Mar 2026",value:"100"},{startDate:"20 Mar 2026",endDate:"31 Mar 2026",value:"80"}],m=[{author:"Spencer Harmon",initials:"SH",date:"25-09-2026",text:"Booking confirmed for Q2 engagement."},{author:"A. I Poane",initials:"AP",date:"24-09-2026",text:"Please check availability for week 14."}],F=[{type:"simple",actor:"Spencer Harmon",initials:"SH",date:"13 Feb 2026 14:06",action:"Booking confirmed"},{type:"single",actor:"A. I Poane",initials:"AP",date:"14 Feb 2026 10:42",field:"Category",from:"Standard",to:"Holiday"},{type:"multiple",actor:"Charlie Parker",initials:"CP",date:"12 Feb 2026 12:36",fields:[{name:"Workforce Member",from:"John Smith",to:"Charlie Parker"},{name:"Category",from:"Standard",to:"Holiday"},{name:"Working days",from:"Mon–Fri",to:"Mon–Thu"}]}],n={name:"Read-only — Details",render:()=>{const[t,a]=p.useState("details");return r.jsx(e,{readOnly:!0,tab:t,onTabChange:a,rules:o,category:"Default",categoryColor:"#A8C4E0",description:"description test",showVisible:!0,notesCount:2})}},s={name:"Read-only — Notes",render:()=>{const[t,a]=p.useState("notes");return r.jsx(e,{readOnly:!0,tab:t,onTabChange:a,rules:o,notes:m,notesCount:m.length})}},i={name:"Read-only — History",render:()=>{const[t,a]=p.useState("history");return r.jsx(e,{readOnly:!0,tab:t,onTabChange:a,rules:o,history:F,notesCount:2})}},d={name:"Editable — Details (no tabs)",render:()=>r.jsx(e,{rules:o,category:"Holiday",title:"Accessibility consultant",description:"description test",dateCreated:"13 Feb 2026",showDateCreated:!0})},l={name:"Editable — With phase",render:()=>r.jsx(e,{rules:o,category:"Standard",showPhase:!0,phase:"Reading",title:"Backend developer"})},c={name:"Hidden (no permission)",render:()=>r.jsx(e,{readOnly:!0,rules:o,hidden:!0})},u={name:"Read-only — Multiple rules",render:()=>{const[t,a]=p.useState("details");return r.jsx(e,{readOnly:!0,tab:t,onTabChange:a,rules:[{startDate:"13 Mar 2026",endDate:"17 Mar 2026",value:"40"},{startDate:"20 Mar 2026",endDate:"31 Mar 2026",value:"96"},{startDate:"1 Apr 2026",endDate:"14 Apr 2026",value:"112"}],category:"Standard",categoryColor:"#7EB8D4",description:"Three-rule repeated booking example.",showVisible:!0,notesCount:5})}};var b,h,g;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Read-only — Details",
  render: () => {
    const [tab, setTab] = useState<BookingSlideshowTab>("details");
    return <BookingSlideshow readOnly tab={tab} onTabChange={setTab} rules={SAMPLE_RULES} category="Default" categoryColor="#A8C4E0" description="description test" showVisible notesCount={2} />;
  }
}`,...(g=(h=n.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var S,y,E;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Read-only — Notes",
  render: () => {
    const [tab, setTab] = useState<BookingSlideshowTab>("notes");
    return <BookingSlideshow readOnly tab={tab} onTabChange={setTab} rules={SAMPLE_RULES} notes={SAMPLE_NOTES} notesCount={SAMPLE_NOTES.length} />;
  }
}`,...(E=(y=s.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};var C,D,M;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: "Read-only — History",
  render: () => {
    const [tab, setTab] = useState<BookingSlideshowTab>("history");
    return <BookingSlideshow readOnly tab={tab} onTabChange={setTab} rules={SAMPLE_RULES} history={SAMPLE_HISTORY} notesCount={2} />;
  }
}`,...(M=(D=i.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var T,k,R;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "Editable — Details (no tabs)",
  render: () => <BookingSlideshow rules={SAMPLE_RULES} category="Holiday" title="Accessibility consultant" description="description test" dateCreated="13 Feb 2026" showDateCreated />
}`,...(R=(k=d.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};var A,w,P;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: "Editable — With phase",
  render: () => <BookingSlideshow rules={SAMPLE_RULES} category="Standard" showPhase phase="Reading" title="Backend developer" />
}`,...(P=(w=l.parameters)==null?void 0:w.docs)==null?void 0:P.source}}};var B,O,f;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Hidden (no permission)",
  render: () => <BookingSlideshow readOnly rules={SAMPLE_RULES} hidden />
}`,...(f=(O=c.parameters)==null?void 0:O.docs)==null?void 0:f.source}}};var H,L,x;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: "Read-only — Multiple rules",
  render: () => {
    const [tab, setTab] = useState<BookingSlideshowTab>("details");
    return <BookingSlideshow readOnly tab={tab} onTabChange={setTab} rules={[{
      startDate: "13 Mar 2026",
      endDate: "17 Mar 2026",
      value: "40"
    }, {
      startDate: "20 Mar 2026",
      endDate: "31 Mar 2026",
      value: "96"
    }, {
      startDate: "1 Apr 2026",
      endDate: "14 Apr 2026",
      value: "112"
    }]} category="Standard" categoryColor="#7EB8D4" description="Three-rule repeated booking example." showVisible notesCount={5} />;
  }
}`,...(x=(L=u.parameters)==null?void 0:L.docs)==null?void 0:x.source}}};const Z=["ReadOnlyDetails","ReadOnlyNotes","ReadOnlyHistory","EditableDetails","EditableWithPhase","Hidden","MultipleRules"];export{d as EditableDetails,l as EditableWithPhase,c as Hidden,u as MultipleRules,n as ReadOnlyDetails,i as ReadOnlyHistory,s as ReadOnlyNotes,Z as __namedExportsOrder,X as default};
