import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./index-DhMLlvMY.js";import{c as u}from"./index-Dd5QUkq_.js";import{A as he}from"./avatar-DzCkQh3P.js";import{I as g}from"./icon-D1UQke6Y.js";import"./_commonjsHelpers-CqkleIqs.js";const ge="_card_98uqy_6",fe="_list_98uqy_17",ye="_item_98uqy_23",be="_itemSelection_98uqy_45",we="_itemCategory_98uqy_50",ke="_itemWM_98uqy_55",Se="_texts_98uqy_61",xe="_line1_98uqy_69",_e="_line1Selected_98uqy_78",Ie="_line2_98uqy_87",je="_checkSlot_98uqy_96",qe="_checkIcon_98uqy_106",Ne="_visualBox_98uqy_110",Le="_visualBoxChecked_98uqy_131",Ce="_searchRow_98uqy_136",Te="_searchInput_98uqy_147",Ae="_searchIcon_98uqy_166",De="_iconGrid_98uqy_171",Be="_iconCell_98uqy_177",Me="_iconCellSelected_98uqy_198",ze="_colorPill_98uqy_202",Fe="_wmAvatar_98uqy_210",We="_wmGroupIcon_98uqy_214",Re="_typeaheadCard_98uqy_226",Pe="_typeaheadList_98uqy_235",Ee="_typeaheadItem_98uqy_242",Oe="_typeaheadLeft_98uqy_265",Ge="_typeaheadIcon_98uqy_274",Ve="_typeaheadBody_98uqy_282",He="_typeaheadTitle_98uqy_289",Ye="_typeaheadBold_98uqy_300",Ke="_typeaheadSub_98uqy_305",Qe="_typeaheadRight_98uqy_314",$e="_typeaheadTypeLabel_98uqy_323",Je="_typeaheadOpenBtn_98uqy_333",Ue="_typeaheadOpenIcon_98uqy_344",Xe="_typeaheadSeeAll_98uqy_351",a={card:ge,list:fe,item:ye,itemSelection:be,itemCategory:we,itemWM:ke,texts:Se,line1:xe,line1Selected:_e,line2:Ie,checkSlot:je,checkIcon:qe,visualBox:Ne,visualBoxChecked:Le,searchRow:Ce,searchInput:Te,searchIcon:Ae,iconGrid:De,iconCell:Be,iconCellSelected:Me,colorPill:ze,wmAvatar:Fe,wmGroupIcon:We,typeaheadCard:Re,typeaheadList:Pe,typeaheadItem:Ee,typeaheadLeft:Oe,typeaheadIcon:Ge,typeaheadBody:Ve,typeaheadTitle:He,typeaheadBold:Ye,typeaheadSub:Ke,typeaheadRight:Qe,typeaheadTypeLabel:$e,typeaheadOpenBtn:Je,typeaheadOpenIcon:Ue,typeaheadSeeAll:Xe},N=({items:n,onSelect:t,className:o})=>e.jsx("div",{className:u(a.card,o),children:e.jsx("div",{className:a.list,children:n.map(s=>e.jsx("button",{type:"button",className:a.item,onClick:()=>t(s.id),children:e.jsxs("span",{className:a.texts,children:[e.jsx("span",{className:a.line1,children:s.label}),s.subLabel&&e.jsx("span",{className:a.line2,children:s.subLabel})]})},s.id))})}),L=({items:n,selectedId:t,onSelect:o,className:s})=>e.jsx("div",{className:u(a.card,s),children:e.jsx("div",{className:a.list,children:n.map(l=>{const m=l.id===t;return e.jsxs("button",{type:"button",className:u(a.item,a.itemSelection),onClick:()=>o(l.id),"aria-pressed":m,children:[e.jsx("span",{className:a.checkSlot,children:m&&e.jsx(g,{name:"check",size:16,className:a.checkIcon})}),e.jsxs("span",{className:a.texts,children:[e.jsx("span",{className:u(a.line1,{[a.line1Selected]:m}),children:l.label}),l.subLabel&&e.jsx("span",{className:a.line2,children:l.subLabel})]})]},l.id)})})}),B=({checked:n,indeterminate:t})=>e.jsxs("span",{className:u(a.visualBox,{[a.visualBoxChecked]:n||t}),"aria-hidden":"true",children:[n&&!t&&e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M2 6L5 9L10 3",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),t&&e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M2.5 6H9.5",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round"})})]}),C=({items:n,selectedIds:t,onSelectionChange:o,searchable:s=!0,className:l})=>{const[m,p]=c.useState(""),h=n.filter(i=>i.label.toLowerCase().includes(m.toLowerCase())),r=n.every(i=>t.includes(i.id)),v=n.some(i=>t.includes(i.id)),d=()=>{o(r?[]:n.map(i=>i.id))},f=i=>{o(t.includes(i)?t.filter(q=>q!==i):[...t,i])};return e.jsxs("div",{className:u(a.card,l),children:[s&&e.jsxs("div",{className:a.searchRow,children:[e.jsx("input",{type:"search",className:a.searchInput,placeholder:"Search",value:m,onChange:i=>p(i.target.value),"aria-label":"Search"}),e.jsx(g,{name:"search",size:16,className:a.searchIcon})]}),e.jsxs("div",{className:a.list,children:[e.jsxs("button",{type:"button",className:u(a.item,a.itemSelection),onClick:d,children:[e.jsx(B,{checked:r,indeterminate:v&&!r}),e.jsx("span",{className:a.texts,children:e.jsxs("span",{className:a.line1,children:["Select all (",n.length,")"]})})]}),h.map(i=>e.jsxs("button",{type:"button",className:u(a.item,a.itemSelection),onClick:()=>f(i.id),children:[e.jsx(B,{checked:t.includes(i.id)}),e.jsxs("span",{className:a.texts,children:[e.jsx("span",{className:a.line1,children:i.label}),i.subLabel&&e.jsx("span",{className:a.line2,children:i.subLabel})]})]},i.id))]})]})},T=({icons:n,selectedIcon:t,onSelect:o,className:s})=>e.jsx("div",{className:u(a.card,s),children:e.jsx("div",{className:a.iconGrid,children:n.map(l=>e.jsx("button",{type:"button",className:u(a.iconCell,{[a.iconCellSelected]:l===t}),onClick:()=>o(l),"aria-label":l,"aria-pressed":l===t,title:l,children:e.jsx(g,{name:l,size:20})},l))})}),A=({items:n,selectedId:t,onSelect:o,className:s})=>e.jsx("div",{className:u(a.card,s),children:e.jsx("div",{className:a.list,children:n.map(l=>e.jsxs("button",{type:"button",className:u(a.item,a.itemCategory),onClick:()=>o(l.id),"aria-pressed":l.id===t,children:[e.jsx("span",{className:a.line1,children:l.label}),e.jsx("span",{className:a.colorPill,style:{backgroundColor:l.color},"aria-hidden":"true"})]},l.id))})}),D=({items:n,selectedId:t,onSelect:o,searchable:s=!0,className:l})=>{const[m,p]=c.useState(""),h=n.filter(r=>{var v;return r.name.toLowerCase().includes(m.toLowerCase())||((v=r.subLabel)==null?void 0:v.toLowerCase().includes(m.toLowerCase()))});return e.jsxs("div",{className:u(a.card,l),children:[s&&e.jsxs("div",{className:a.searchRow,children:[e.jsx("input",{type:"search",className:a.searchInput,placeholder:"Search",value:m,onChange:r=>p(r.target.value),"aria-label":"Search"}),e.jsx(g,{name:"search",size:16,className:a.searchIcon})]}),e.jsx("div",{className:a.list,children:h.map(r=>e.jsxs("button",{type:"button",className:u(a.item,a.itemWM),onClick:()=>o(r.id),"aria-pressed":r.id===t,children:[r.isGroup?e.jsx("span",{className:a.wmGroupIcon,children:e.jsx(g,{name:"search",size:20})}):e.jsx(he,{size:"small",initials:r.initials,src:r.avatarSrc,className:a.wmAvatar}),e.jsxs("span",{className:a.texts,children:[e.jsx("span",{className:a.line1Selected,children:r.name}),r.subLabel&&e.jsx("span",{className:a.line2,children:r.subLabel})]})]},r.id))})]})},Ze={profile:"profile",engagement:"engagement",role:"role",search:"search"},ea={profile:"PROFILE",engagement:"ENGAGEMENT",role:"ROLE",search:""},oe=({results:n,onSelect:t,onSeeAll:o,className:s})=>e.jsxs("div",{className:u(a.card,a.typeaheadCard,s),children:[e.jsx("div",{className:a.typeaheadList,children:n.map(l=>{const m=Ze[l.type],p=ea[l.type],h=l.type!=="search",{label:r,matchedPart:v}=l;let d=v??"",f=r;return d&&r.toLowerCase().startsWith(d.toLowerCase())?(d=r.slice(0,d.length),f=r.slice(d.length)):(d="",f=r),e.jsxs("button",{type:"button",className:a.typeaheadItem,onClick:()=>t(l.id),children:[e.jsxs("span",{className:a.typeaheadLeft,children:[e.jsx(g,{name:m,size:20,className:a.typeaheadIcon}),e.jsxs("span",{className:a.typeaheadBody,children:[e.jsxs("span",{className:a.typeaheadTitle,children:[d&&e.jsx("strong",{className:a.typeaheadBold,children:d}),f]}),l.subLabel&&e.jsx("span",{className:a.typeaheadSub,children:l.subLabel})]})]}),h&&e.jsxs("span",{className:a.typeaheadRight,children:[e.jsx("span",{className:a.typeaheadTypeLabel,children:p}),e.jsx("button",{type:"button",className:a.typeaheadOpenBtn,onClick:i=>{var q;i.stopPropagation(),(q=l.onOpen)==null||q.call(l)},"aria-label":`Open ${l.label}`,children:e.jsx(g,{name:"open",size:16,className:a.typeaheadOpenIcon})})]})]},l.id)})}),o&&e.jsx("button",{type:"button",className:a.typeaheadSeeAll,onClick:o,children:"See all results"})]});N.__docgenInfo={description:"",methods:[],displayName:"DropdownActions",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  label: string;
  subLabel?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"subLabel",value:{name:"string",required:!1}}]}}],raw:"DropdownItem[]"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};L.__docgenInfo={description:"",methods:[],displayName:"DropdownSelection",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  label: string;
  subLabel?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"subLabel",value:{name:"string",required:!1}}]}}],raw:"DropdownItem[]"},description:""},selectedId:{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};C.__docgenInfo={description:"",methods:[],displayName:"DropdownMultiSelection",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  label: string;
  subLabel?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"subLabel",value:{name:"string",required:!1}}]}}],raw:"DropdownItem[]"},description:""},selectedIds:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},onSelectionChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(ids: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"ids"}],return:{name:"void"}}},description:""},searchable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};T.__docgenInfo={description:"",methods:[],displayName:"DropdownIcons",props:{icons:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| "activity-feed" | "add" | "admin" | "ai"
| "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up"
| "audit-planner" | "booking" | "calendar"
| "caret-down" | "caret-left" | "caret-right" | "caret-up"
| "chat" | "check" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up"
| "cross" | "down" | "edit" | "engagement" | "error"
| "core"
| "development"
| "forbidden"
| "help" | "hidden" | "history" | "hourglass-half" | "info" | "insights"
| "learning"
| "link"
| "substitute-parent-child" | "links" | "list" | "location" | "locked" | "logout"
| "mail" | "mandatory" | "marketplace" | "menu-horizontal" | "menu-vertical"
| "merge" | "missing" | "money" | "move"
| "note" | "notifications" | "open" | "pin" | "profile"
| "question" | "reassign" | "refresh" | "remove" | "reports" | "role"
| "save" | "search" | "share" | "shown" | "skills-framework"
| "smart-allocation" | "sort" | "split" | "subtract"
| "table" | "tag" | "undo" | "unseen" | "up" | "user-filled"
| "verified" | "verified-credly" | "verified-others"
| "warning" | "workflow" | "zoom-in" | "zoom-out"
| "heart" | "placeholder-profile" | "suggested" | "timeline"
| "filter" | "filter-clean" | "home"
// New icons
| "add-profile" | "ai-agent"
| "arrow-2-directions" | "arrow-2-directions-vertical" | "arrow-4-directions"
| "availability" | "baby" | "bag" | "bell" | "book" | "bubbles" | "bug"
| "bulk" | "bulk-move"
| "calendar-clash" | "calendar-delete" | "calendar-misaligned"
| "car" | "certificate" | "clock" | "close-role" | "collapse" | "compare"
| "copy" | "cost" | "created" | "department" | "dot" | "dot-big" | "duplicate"
| "engagement-audit" | "expand" | "expand-all" | "expanded-all"
| "export" | "extend" | "face-smile" | "facebook"
| "filter-applied" | "filter2" | "fire" | "flower-spa" | "folder"
| "ghost" | "head-heart" | "heatmap" | "hierarchical"
| "hourglass-empty" | "house-laptop" | "house-user"
| "import" | "industry" | "instagram" | "key" | "keyboard" | "linkedin"
| "manage-roles" | "mobile" | "mouse-cursor" | "non-demand"
| "overbooking" | "overbooking-acknowledged" | "owner"
| "palm-tree" | "paper-clip" | "paper-plane" | "path" | "pen"
| "person-minus" | "pf-logo" | "phone" | "plane" | "play" | "postpone"
| "preferences" | "profile-field" | "profiles"
| "refresh-clean" | "refresh-warning" | "remove-all"
| "role-audit" | "rollforward" | "save-add" | "save-remove"
| "sector" | "segment" | "skype" | "skype-for-business" | "snooze"
| "soft-exception" | "split2"
| "substitute-child" | "substitute-parent"
| "target-allocation" | "task" | "teams" | "twitter" | "unpin"
| "user-interest" | "web" | "wine-glass" | "work"`,elements:[{name:"literal",value:'"activity-feed"'},{name:"literal",value:'"add"'},{name:"literal",value:'"admin"'},{name:"literal",value:'"ai"'},{name:"literal",value:'"arrow-down"'},{name:"literal",value:'"arrow-left"'},{name:"literal",value:'"arrow-right"'},{name:"literal",value:'"arrow-up"'},{name:"literal",value:'"audit-planner"'},{name:"literal",value:'"booking"'},{name:"literal",value:'"calendar"'},{name:"literal",value:'"caret-down"'},{name:"literal",value:'"caret-left"'},{name:"literal",value:'"caret-right"'},{name:"literal",value:'"caret-up"'},{name:"literal",value:'"chat"'},{name:"literal",value:'"check"'},{name:"literal",value:'"chevron-down"'},{name:"literal",value:'"chevron-left"'},{name:"literal",value:'"chevron-right"'},{name:"literal",value:'"chevron-up"'},{name:"literal",value:'"cross"'},{name:"literal",value:'"down"'},{name:"literal",value:'"edit"'},{name:"literal",value:'"engagement"'},{name:"literal",value:'"error"'},{name:"literal",value:'"core"'},{name:"literal",value:'"development"'},{name:"literal",value:'"forbidden"'},{name:"literal",value:'"help"'},{name:"literal",value:'"hidden"'},{name:"literal",value:'"history"'},{name:"literal",value:'"hourglass-half"'},{name:"literal",value:'"info"'},{name:"literal",value:'"insights"'},{name:"literal",value:'"learning"'},{name:"literal",value:'"link"'},{name:"literal",value:'"substitute-parent-child"'},{name:"literal",value:'"links"'},{name:"literal",value:'"list"'},{name:"literal",value:'"location"'},{name:"literal",value:'"locked"'},{name:"literal",value:'"logout"'},{name:"literal",value:'"mail"'},{name:"literal",value:'"mandatory"'},{name:"literal",value:'"marketplace"'},{name:"literal",value:'"menu-horizontal"'},{name:"literal",value:'"menu-vertical"'},{name:"literal",value:'"merge"'},{name:"literal",value:'"missing"'},{name:"literal",value:'"money"'},{name:"literal",value:'"move"'},{name:"literal",value:'"note"'},{name:"literal",value:'"notifications"'},{name:"literal",value:'"open"'},{name:"literal",value:'"pin"'},{name:"literal",value:'"profile"'},{name:"literal",value:'"question"'},{name:"literal",value:'"reassign"'},{name:"literal",value:'"refresh"'},{name:"literal",value:'"remove"'},{name:"literal",value:'"reports"'},{name:"literal",value:'"role"'},{name:"literal",value:'"save"'},{name:"literal",value:'"search"'},{name:"literal",value:'"share"'},{name:"literal",value:'"shown"'},{name:"literal",value:'"skills-framework"'},{name:"literal",value:'"smart-allocation"'},{name:"literal",value:'"sort"'},{name:"literal",value:'"split"'},{name:"literal",value:'"subtract"'},{name:"literal",value:'"table"'},{name:"literal",value:'"tag"'},{name:"literal",value:'"undo"'},{name:"literal",value:'"unseen"'},{name:"literal",value:'"up"'},{name:"literal",value:'"user-filled"'},{name:"literal",value:'"verified"'},{name:"literal",value:'"verified-credly"'},{name:"literal",value:'"verified-others"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"workflow"'},{name:"literal",value:'"zoom-in"'},{name:"literal",value:'"zoom-out"'},{name:"literal",value:'"heart"'},{name:"literal",value:'"placeholder-profile"'},{name:"literal",value:'"suggested"'},{name:"literal",value:'"timeline"'},{name:"literal",value:'"filter"'},{name:"literal",value:'"filter-clean"'},{name:"literal",value:'"home"'},{name:"literal",value:'"add-profile"'},{name:"literal",value:'"ai-agent"'},{name:"literal",value:'"arrow-2-directions"'},{name:"literal",value:'"arrow-2-directions-vertical"'},{name:"literal",value:'"arrow-4-directions"'},{name:"literal",value:'"availability"'},{name:"literal",value:'"baby"'},{name:"literal",value:'"bag"'},{name:"literal",value:'"bell"'},{name:"literal",value:'"book"'},{name:"literal",value:'"bubbles"'},{name:"literal",value:'"bug"'},{name:"literal",value:'"bulk"'},{name:"literal",value:'"bulk-move"'},{name:"literal",value:'"calendar-clash"'},{name:"literal",value:'"calendar-delete"'},{name:"literal",value:'"calendar-misaligned"'},{name:"literal",value:'"car"'},{name:"literal",value:'"certificate"'},{name:"literal",value:'"clock"'},{name:"literal",value:'"close-role"'},{name:"literal",value:'"collapse"'},{name:"literal",value:'"compare"'},{name:"literal",value:'"copy"'},{name:"literal",value:'"cost"'},{name:"literal",value:'"created"'},{name:"literal",value:'"department"'},{name:"literal",value:'"dot"'},{name:"literal",value:'"dot-big"'},{name:"literal",value:'"duplicate"'},{name:"literal",value:'"engagement-audit"'},{name:"literal",value:'"expand"'},{name:"literal",value:'"expand-all"'},{name:"literal",value:'"expanded-all"'},{name:"literal",value:'"export"'},{name:"literal",value:'"extend"'},{name:"literal",value:'"face-smile"'},{name:"literal",value:'"facebook"'},{name:"literal",value:'"filter-applied"'},{name:"literal",value:'"filter2"'},{name:"literal",value:'"fire"'},{name:"literal",value:'"flower-spa"'},{name:"literal",value:'"folder"'},{name:"literal",value:'"ghost"'},{name:"literal",value:'"head-heart"'},{name:"literal",value:'"heatmap"'},{name:"literal",value:'"hierarchical"'},{name:"literal",value:'"hourglass-empty"'},{name:"literal",value:'"house-laptop"'},{name:"literal",value:'"house-user"'},{name:"literal",value:'"import"'},{name:"literal",value:'"industry"'},{name:"literal",value:'"instagram"'},{name:"literal",value:'"key"'},{name:"literal",value:'"keyboard"'},{name:"literal",value:'"linkedin"'},{name:"literal",value:'"manage-roles"'},{name:"literal",value:'"mobile"'},{name:"literal",value:'"mouse-cursor"'},{name:"literal",value:'"non-demand"'},{name:"literal",value:'"overbooking"'},{name:"literal",value:'"overbooking-acknowledged"'},{name:"literal",value:'"owner"'},{name:"literal",value:'"palm-tree"'},{name:"literal",value:'"paper-clip"'},{name:"literal",value:'"paper-plane"'},{name:"literal",value:'"path"'},{name:"literal",value:'"pen"'},{name:"literal",value:'"person-minus"'},{name:"literal",value:'"pf-logo"'},{name:"literal",value:'"phone"'},{name:"literal",value:'"plane"'},{name:"literal",value:'"play"'},{name:"literal",value:'"postpone"'},{name:"literal",value:'"preferences"'},{name:"literal",value:'"profile-field"'},{name:"literal",value:'"profiles"'},{name:"literal",value:'"refresh-clean"'},{name:"literal",value:'"refresh-warning"'},{name:"literal",value:'"remove-all"'},{name:"literal",value:'"role-audit"'},{name:"literal",value:'"rollforward"'},{name:"literal",value:'"save-add"'},{name:"literal",value:'"save-remove"'},{name:"literal",value:'"sector"'},{name:"literal",value:'"segment"'},{name:"literal",value:'"skype"'},{name:"literal",value:'"skype-for-business"'},{name:"literal",value:'"snooze"'},{name:"literal",value:'"soft-exception"'},{name:"literal",value:'"split2"'},{name:"literal",value:'"substitute-child"'},{name:"literal",value:'"substitute-parent"'},{name:"literal",value:'"target-allocation"'},{name:"literal",value:'"task"'},{name:"literal",value:'"teams"'},{name:"literal",value:'"twitter"'},{name:"literal",value:'"unpin"'},{name:"literal",value:'"user-interest"'},{name:"literal",value:'"web"'},{name:"literal",value:'"wine-glass"'},{name:"literal",value:'"work"'}]}],raw:"IconName[]"},description:""},selectedIcon:{required:!1,tsType:{name:"union",raw:`| "activity-feed" | "add" | "admin" | "ai"
| "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up"
| "audit-planner" | "booking" | "calendar"
| "caret-down" | "caret-left" | "caret-right" | "caret-up"
| "chat" | "check" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up"
| "cross" | "down" | "edit" | "engagement" | "error"
| "core"
| "development"
| "forbidden"
| "help" | "hidden" | "history" | "hourglass-half" | "info" | "insights"
| "learning"
| "link"
| "substitute-parent-child" | "links" | "list" | "location" | "locked" | "logout"
| "mail" | "mandatory" | "marketplace" | "menu-horizontal" | "menu-vertical"
| "merge" | "missing" | "money" | "move"
| "note" | "notifications" | "open" | "pin" | "profile"
| "question" | "reassign" | "refresh" | "remove" | "reports" | "role"
| "save" | "search" | "share" | "shown" | "skills-framework"
| "smart-allocation" | "sort" | "split" | "subtract"
| "table" | "tag" | "undo" | "unseen" | "up" | "user-filled"
| "verified" | "verified-credly" | "verified-others"
| "warning" | "workflow" | "zoom-in" | "zoom-out"
| "heart" | "placeholder-profile" | "suggested" | "timeline"
| "filter" | "filter-clean" | "home"
// New icons
| "add-profile" | "ai-agent"
| "arrow-2-directions" | "arrow-2-directions-vertical" | "arrow-4-directions"
| "availability" | "baby" | "bag" | "bell" | "book" | "bubbles" | "bug"
| "bulk" | "bulk-move"
| "calendar-clash" | "calendar-delete" | "calendar-misaligned"
| "car" | "certificate" | "clock" | "close-role" | "collapse" | "compare"
| "copy" | "cost" | "created" | "department" | "dot" | "dot-big" | "duplicate"
| "engagement-audit" | "expand" | "expand-all" | "expanded-all"
| "export" | "extend" | "face-smile" | "facebook"
| "filter-applied" | "filter2" | "fire" | "flower-spa" | "folder"
| "ghost" | "head-heart" | "heatmap" | "hierarchical"
| "hourglass-empty" | "house-laptop" | "house-user"
| "import" | "industry" | "instagram" | "key" | "keyboard" | "linkedin"
| "manage-roles" | "mobile" | "mouse-cursor" | "non-demand"
| "overbooking" | "overbooking-acknowledged" | "owner"
| "palm-tree" | "paper-clip" | "paper-plane" | "path" | "pen"
| "person-minus" | "pf-logo" | "phone" | "plane" | "play" | "postpone"
| "preferences" | "profile-field" | "profiles"
| "refresh-clean" | "refresh-warning" | "remove-all"
| "role-audit" | "rollforward" | "save-add" | "save-remove"
| "sector" | "segment" | "skype" | "skype-for-business" | "snooze"
| "soft-exception" | "split2"
| "substitute-child" | "substitute-parent"
| "target-allocation" | "task" | "teams" | "twitter" | "unpin"
| "user-interest" | "web" | "wine-glass" | "work"`,elements:[{name:"literal",value:'"activity-feed"'},{name:"literal",value:'"add"'},{name:"literal",value:'"admin"'},{name:"literal",value:'"ai"'},{name:"literal",value:'"arrow-down"'},{name:"literal",value:'"arrow-left"'},{name:"literal",value:'"arrow-right"'},{name:"literal",value:'"arrow-up"'},{name:"literal",value:'"audit-planner"'},{name:"literal",value:'"booking"'},{name:"literal",value:'"calendar"'},{name:"literal",value:'"caret-down"'},{name:"literal",value:'"caret-left"'},{name:"literal",value:'"caret-right"'},{name:"literal",value:'"caret-up"'},{name:"literal",value:'"chat"'},{name:"literal",value:'"check"'},{name:"literal",value:'"chevron-down"'},{name:"literal",value:'"chevron-left"'},{name:"literal",value:'"chevron-right"'},{name:"literal",value:'"chevron-up"'},{name:"literal",value:'"cross"'},{name:"literal",value:'"down"'},{name:"literal",value:'"edit"'},{name:"literal",value:'"engagement"'},{name:"literal",value:'"error"'},{name:"literal",value:'"core"'},{name:"literal",value:'"development"'},{name:"literal",value:'"forbidden"'},{name:"literal",value:'"help"'},{name:"literal",value:'"hidden"'},{name:"literal",value:'"history"'},{name:"literal",value:'"hourglass-half"'},{name:"literal",value:'"info"'},{name:"literal",value:'"insights"'},{name:"literal",value:'"learning"'},{name:"literal",value:'"link"'},{name:"literal",value:'"substitute-parent-child"'},{name:"literal",value:'"links"'},{name:"literal",value:'"list"'},{name:"literal",value:'"location"'},{name:"literal",value:'"locked"'},{name:"literal",value:'"logout"'},{name:"literal",value:'"mail"'},{name:"literal",value:'"mandatory"'},{name:"literal",value:'"marketplace"'},{name:"literal",value:'"menu-horizontal"'},{name:"literal",value:'"menu-vertical"'},{name:"literal",value:'"merge"'},{name:"literal",value:'"missing"'},{name:"literal",value:'"money"'},{name:"literal",value:'"move"'},{name:"literal",value:'"note"'},{name:"literal",value:'"notifications"'},{name:"literal",value:'"open"'},{name:"literal",value:'"pin"'},{name:"literal",value:'"profile"'},{name:"literal",value:'"question"'},{name:"literal",value:'"reassign"'},{name:"literal",value:'"refresh"'},{name:"literal",value:'"remove"'},{name:"literal",value:'"reports"'},{name:"literal",value:'"role"'},{name:"literal",value:'"save"'},{name:"literal",value:'"search"'},{name:"literal",value:'"share"'},{name:"literal",value:'"shown"'},{name:"literal",value:'"skills-framework"'},{name:"literal",value:'"smart-allocation"'},{name:"literal",value:'"sort"'},{name:"literal",value:'"split"'},{name:"literal",value:'"subtract"'},{name:"literal",value:'"table"'},{name:"literal",value:'"tag"'},{name:"literal",value:'"undo"'},{name:"literal",value:'"unseen"'},{name:"literal",value:'"up"'},{name:"literal",value:'"user-filled"'},{name:"literal",value:'"verified"'},{name:"literal",value:'"verified-credly"'},{name:"literal",value:'"verified-others"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"workflow"'},{name:"literal",value:'"zoom-in"'},{name:"literal",value:'"zoom-out"'},{name:"literal",value:'"heart"'},{name:"literal",value:'"placeholder-profile"'},{name:"literal",value:'"suggested"'},{name:"literal",value:'"timeline"'},{name:"literal",value:'"filter"'},{name:"literal",value:'"filter-clean"'},{name:"literal",value:'"home"'},{name:"literal",value:'"add-profile"'},{name:"literal",value:'"ai-agent"'},{name:"literal",value:'"arrow-2-directions"'},{name:"literal",value:'"arrow-2-directions-vertical"'},{name:"literal",value:'"arrow-4-directions"'},{name:"literal",value:'"availability"'},{name:"literal",value:'"baby"'},{name:"literal",value:'"bag"'},{name:"literal",value:'"bell"'},{name:"literal",value:'"book"'},{name:"literal",value:'"bubbles"'},{name:"literal",value:'"bug"'},{name:"literal",value:'"bulk"'},{name:"literal",value:'"bulk-move"'},{name:"literal",value:'"calendar-clash"'},{name:"literal",value:'"calendar-delete"'},{name:"literal",value:'"calendar-misaligned"'},{name:"literal",value:'"car"'},{name:"literal",value:'"certificate"'},{name:"literal",value:'"clock"'},{name:"literal",value:'"close-role"'},{name:"literal",value:'"collapse"'},{name:"literal",value:'"compare"'},{name:"literal",value:'"copy"'},{name:"literal",value:'"cost"'},{name:"literal",value:'"created"'},{name:"literal",value:'"department"'},{name:"literal",value:'"dot"'},{name:"literal",value:'"dot-big"'},{name:"literal",value:'"duplicate"'},{name:"literal",value:'"engagement-audit"'},{name:"literal",value:'"expand"'},{name:"literal",value:'"expand-all"'},{name:"literal",value:'"expanded-all"'},{name:"literal",value:'"export"'},{name:"literal",value:'"extend"'},{name:"literal",value:'"face-smile"'},{name:"literal",value:'"facebook"'},{name:"literal",value:'"filter-applied"'},{name:"literal",value:'"filter2"'},{name:"literal",value:'"fire"'},{name:"literal",value:'"flower-spa"'},{name:"literal",value:'"folder"'},{name:"literal",value:'"ghost"'},{name:"literal",value:'"head-heart"'},{name:"literal",value:'"heatmap"'},{name:"literal",value:'"hierarchical"'},{name:"literal",value:'"hourglass-empty"'},{name:"literal",value:'"house-laptop"'},{name:"literal",value:'"house-user"'},{name:"literal",value:'"import"'},{name:"literal",value:'"industry"'},{name:"literal",value:'"instagram"'},{name:"literal",value:'"key"'},{name:"literal",value:'"keyboard"'},{name:"literal",value:'"linkedin"'},{name:"literal",value:'"manage-roles"'},{name:"literal",value:'"mobile"'},{name:"literal",value:'"mouse-cursor"'},{name:"literal",value:'"non-demand"'},{name:"literal",value:'"overbooking"'},{name:"literal",value:'"overbooking-acknowledged"'},{name:"literal",value:'"owner"'},{name:"literal",value:'"palm-tree"'},{name:"literal",value:'"paper-clip"'},{name:"literal",value:'"paper-plane"'},{name:"literal",value:'"path"'},{name:"literal",value:'"pen"'},{name:"literal",value:'"person-minus"'},{name:"literal",value:'"pf-logo"'},{name:"literal",value:'"phone"'},{name:"literal",value:'"plane"'},{name:"literal",value:'"play"'},{name:"literal",value:'"postpone"'},{name:"literal",value:'"preferences"'},{name:"literal",value:'"profile-field"'},{name:"literal",value:'"profiles"'},{name:"literal",value:'"refresh-clean"'},{name:"literal",value:'"refresh-warning"'},{name:"literal",value:'"remove-all"'},{name:"literal",value:'"role-audit"'},{name:"literal",value:'"rollforward"'},{name:"literal",value:'"save-add"'},{name:"literal",value:'"save-remove"'},{name:"literal",value:'"sector"'},{name:"literal",value:'"segment"'},{name:"literal",value:'"skype"'},{name:"literal",value:'"skype-for-business"'},{name:"literal",value:'"snooze"'},{name:"literal",value:'"soft-exception"'},{name:"literal",value:'"split2"'},{name:"literal",value:'"substitute-child"'},{name:"literal",value:'"substitute-parent"'},{name:"literal",value:'"target-allocation"'},{name:"literal",value:'"task"'},{name:"literal",value:'"teams"'},{name:"literal",value:'"twitter"'},{name:"literal",value:'"unpin"'},{name:"literal",value:'"user-interest"'},{name:"literal",value:'"web"'},{name:"literal",value:'"wine-glass"'},{name:"literal",value:'"work"'}]},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(icon: IconName) => void",signature:{arguments:[{type:{name:"union",raw:`| "activity-feed" | "add" | "admin" | "ai"
| "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up"
| "audit-planner" | "booking" | "calendar"
| "caret-down" | "caret-left" | "caret-right" | "caret-up"
| "chat" | "check" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up"
| "cross" | "down" | "edit" | "engagement" | "error"
| "core"
| "development"
| "forbidden"
| "help" | "hidden" | "history" | "hourglass-half" | "info" | "insights"
| "learning"
| "link"
| "substitute-parent-child" | "links" | "list" | "location" | "locked" | "logout"
| "mail" | "mandatory" | "marketplace" | "menu-horizontal" | "menu-vertical"
| "merge" | "missing" | "money" | "move"
| "note" | "notifications" | "open" | "pin" | "profile"
| "question" | "reassign" | "refresh" | "remove" | "reports" | "role"
| "save" | "search" | "share" | "shown" | "skills-framework"
| "smart-allocation" | "sort" | "split" | "subtract"
| "table" | "tag" | "undo" | "unseen" | "up" | "user-filled"
| "verified" | "verified-credly" | "verified-others"
| "warning" | "workflow" | "zoom-in" | "zoom-out"
| "heart" | "placeholder-profile" | "suggested" | "timeline"
| "filter" | "filter-clean" | "home"
// New icons
| "add-profile" | "ai-agent"
| "arrow-2-directions" | "arrow-2-directions-vertical" | "arrow-4-directions"
| "availability" | "baby" | "bag" | "bell" | "book" | "bubbles" | "bug"
| "bulk" | "bulk-move"
| "calendar-clash" | "calendar-delete" | "calendar-misaligned"
| "car" | "certificate" | "clock" | "close-role" | "collapse" | "compare"
| "copy" | "cost" | "created" | "department" | "dot" | "dot-big" | "duplicate"
| "engagement-audit" | "expand" | "expand-all" | "expanded-all"
| "export" | "extend" | "face-smile" | "facebook"
| "filter-applied" | "filter2" | "fire" | "flower-spa" | "folder"
| "ghost" | "head-heart" | "heatmap" | "hierarchical"
| "hourglass-empty" | "house-laptop" | "house-user"
| "import" | "industry" | "instagram" | "key" | "keyboard" | "linkedin"
| "manage-roles" | "mobile" | "mouse-cursor" | "non-demand"
| "overbooking" | "overbooking-acknowledged" | "owner"
| "palm-tree" | "paper-clip" | "paper-plane" | "path" | "pen"
| "person-minus" | "pf-logo" | "phone" | "plane" | "play" | "postpone"
| "preferences" | "profile-field" | "profiles"
| "refresh-clean" | "refresh-warning" | "remove-all"
| "role-audit" | "rollforward" | "save-add" | "save-remove"
| "sector" | "segment" | "skype" | "skype-for-business" | "snooze"
| "soft-exception" | "split2"
| "substitute-child" | "substitute-parent"
| "target-allocation" | "task" | "teams" | "twitter" | "unpin"
| "user-interest" | "web" | "wine-glass" | "work"`,elements:[{name:"literal",value:'"activity-feed"'},{name:"literal",value:'"add"'},{name:"literal",value:'"admin"'},{name:"literal",value:'"ai"'},{name:"literal",value:'"arrow-down"'},{name:"literal",value:'"arrow-left"'},{name:"literal",value:'"arrow-right"'},{name:"literal",value:'"arrow-up"'},{name:"literal",value:'"audit-planner"'},{name:"literal",value:'"booking"'},{name:"literal",value:'"calendar"'},{name:"literal",value:'"caret-down"'},{name:"literal",value:'"caret-left"'},{name:"literal",value:'"caret-right"'},{name:"literal",value:'"caret-up"'},{name:"literal",value:'"chat"'},{name:"literal",value:'"check"'},{name:"literal",value:'"chevron-down"'},{name:"literal",value:'"chevron-left"'},{name:"literal",value:'"chevron-right"'},{name:"literal",value:'"chevron-up"'},{name:"literal",value:'"cross"'},{name:"literal",value:'"down"'},{name:"literal",value:'"edit"'},{name:"literal",value:'"engagement"'},{name:"literal",value:'"error"'},{name:"literal",value:'"core"'},{name:"literal",value:'"development"'},{name:"literal",value:'"forbidden"'},{name:"literal",value:'"help"'},{name:"literal",value:'"hidden"'},{name:"literal",value:'"history"'},{name:"literal",value:'"hourglass-half"'},{name:"literal",value:'"info"'},{name:"literal",value:'"insights"'},{name:"literal",value:'"learning"'},{name:"literal",value:'"link"'},{name:"literal",value:'"substitute-parent-child"'},{name:"literal",value:'"links"'},{name:"literal",value:'"list"'},{name:"literal",value:'"location"'},{name:"literal",value:'"locked"'},{name:"literal",value:'"logout"'},{name:"literal",value:'"mail"'},{name:"literal",value:'"mandatory"'},{name:"literal",value:'"marketplace"'},{name:"literal",value:'"menu-horizontal"'},{name:"literal",value:'"menu-vertical"'},{name:"literal",value:'"merge"'},{name:"literal",value:'"missing"'},{name:"literal",value:'"money"'},{name:"literal",value:'"move"'},{name:"literal",value:'"note"'},{name:"literal",value:'"notifications"'},{name:"literal",value:'"open"'},{name:"literal",value:'"pin"'},{name:"literal",value:'"profile"'},{name:"literal",value:'"question"'},{name:"literal",value:'"reassign"'},{name:"literal",value:'"refresh"'},{name:"literal",value:'"remove"'},{name:"literal",value:'"reports"'},{name:"literal",value:'"role"'},{name:"literal",value:'"save"'},{name:"literal",value:'"search"'},{name:"literal",value:'"share"'},{name:"literal",value:'"shown"'},{name:"literal",value:'"skills-framework"'},{name:"literal",value:'"smart-allocation"'},{name:"literal",value:'"sort"'},{name:"literal",value:'"split"'},{name:"literal",value:'"subtract"'},{name:"literal",value:'"table"'},{name:"literal",value:'"tag"'},{name:"literal",value:'"undo"'},{name:"literal",value:'"unseen"'},{name:"literal",value:'"up"'},{name:"literal",value:'"user-filled"'},{name:"literal",value:'"verified"'},{name:"literal",value:'"verified-credly"'},{name:"literal",value:'"verified-others"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"workflow"'},{name:"literal",value:'"zoom-in"'},{name:"literal",value:'"zoom-out"'},{name:"literal",value:'"heart"'},{name:"literal",value:'"placeholder-profile"'},{name:"literal",value:'"suggested"'},{name:"literal",value:'"timeline"'},{name:"literal",value:'"filter"'},{name:"literal",value:'"filter-clean"'},{name:"literal",value:'"home"'},{name:"literal",value:'"add-profile"'},{name:"literal",value:'"ai-agent"'},{name:"literal",value:'"arrow-2-directions"'},{name:"literal",value:'"arrow-2-directions-vertical"'},{name:"literal",value:'"arrow-4-directions"'},{name:"literal",value:'"availability"'},{name:"literal",value:'"baby"'},{name:"literal",value:'"bag"'},{name:"literal",value:'"bell"'},{name:"literal",value:'"book"'},{name:"literal",value:'"bubbles"'},{name:"literal",value:'"bug"'},{name:"literal",value:'"bulk"'},{name:"literal",value:'"bulk-move"'},{name:"literal",value:'"calendar-clash"'},{name:"literal",value:'"calendar-delete"'},{name:"literal",value:'"calendar-misaligned"'},{name:"literal",value:'"car"'},{name:"literal",value:'"certificate"'},{name:"literal",value:'"clock"'},{name:"literal",value:'"close-role"'},{name:"literal",value:'"collapse"'},{name:"literal",value:'"compare"'},{name:"literal",value:'"copy"'},{name:"literal",value:'"cost"'},{name:"literal",value:'"created"'},{name:"literal",value:'"department"'},{name:"literal",value:'"dot"'},{name:"literal",value:'"dot-big"'},{name:"literal",value:'"duplicate"'},{name:"literal",value:'"engagement-audit"'},{name:"literal",value:'"expand"'},{name:"literal",value:'"expand-all"'},{name:"literal",value:'"expanded-all"'},{name:"literal",value:'"export"'},{name:"literal",value:'"extend"'},{name:"literal",value:'"face-smile"'},{name:"literal",value:'"facebook"'},{name:"literal",value:'"filter-applied"'},{name:"literal",value:'"filter2"'},{name:"literal",value:'"fire"'},{name:"literal",value:'"flower-spa"'},{name:"literal",value:'"folder"'},{name:"literal",value:'"ghost"'},{name:"literal",value:'"head-heart"'},{name:"literal",value:'"heatmap"'},{name:"literal",value:'"hierarchical"'},{name:"literal",value:'"hourglass-empty"'},{name:"literal",value:'"house-laptop"'},{name:"literal",value:'"house-user"'},{name:"literal",value:'"import"'},{name:"literal",value:'"industry"'},{name:"literal",value:'"instagram"'},{name:"literal",value:'"key"'},{name:"literal",value:'"keyboard"'},{name:"literal",value:'"linkedin"'},{name:"literal",value:'"manage-roles"'},{name:"literal",value:'"mobile"'},{name:"literal",value:'"mouse-cursor"'},{name:"literal",value:'"non-demand"'},{name:"literal",value:'"overbooking"'},{name:"literal",value:'"overbooking-acknowledged"'},{name:"literal",value:'"owner"'},{name:"literal",value:'"palm-tree"'},{name:"literal",value:'"paper-clip"'},{name:"literal",value:'"paper-plane"'},{name:"literal",value:'"path"'},{name:"literal",value:'"pen"'},{name:"literal",value:'"person-minus"'},{name:"literal",value:'"pf-logo"'},{name:"literal",value:'"phone"'},{name:"literal",value:'"plane"'},{name:"literal",value:'"play"'},{name:"literal",value:'"postpone"'},{name:"literal",value:'"preferences"'},{name:"literal",value:'"profile-field"'},{name:"literal",value:'"profiles"'},{name:"literal",value:'"refresh-clean"'},{name:"literal",value:'"refresh-warning"'},{name:"literal",value:'"remove-all"'},{name:"literal",value:'"role-audit"'},{name:"literal",value:'"rollforward"'},{name:"literal",value:'"save-add"'},{name:"literal",value:'"save-remove"'},{name:"literal",value:'"sector"'},{name:"literal",value:'"segment"'},{name:"literal",value:'"skype"'},{name:"literal",value:'"skype-for-business"'},{name:"literal",value:'"snooze"'},{name:"literal",value:'"soft-exception"'},{name:"literal",value:'"split2"'},{name:"literal",value:'"substitute-child"'},{name:"literal",value:'"substitute-parent"'},{name:"literal",value:'"target-allocation"'},{name:"literal",value:'"task"'},{name:"literal",value:'"teams"'},{name:"literal",value:'"twitter"'},{name:"literal",value:'"unpin"'},{name:"literal",value:'"user-interest"'},{name:"literal",value:'"web"'},{name:"literal",value:'"wine-glass"'},{name:"literal",value:'"work"'}]},name:"icon"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};A.__docgenInfo={description:"",methods:[],displayName:"DropdownBookingCategory",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  label: string;
  color: string; // CSS colour value
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"color",value:{name:"string",required:!0}}]}}],raw:"BookingCategoryItem[]"},description:""},selectedId:{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};D.__docgenInfo={description:"",methods:[],displayName:"DropdownWM",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  name: string;
  subLabel?: string;
  avatarSrc?: string;
  initials?: string;
  avatarColor?: string;
  isGroup?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"subLabel",value:{name:"string",required:!1}},{key:"avatarSrc",value:{name:"string",required:!1}},{key:"initials",value:{name:"string",required:!1}},{key:"avatarColor",value:{name:"string",required:!1}},{key:"isGroup",value:{name:"boolean",required:!1}}]}}],raw:"WMItem[]"},description:""},selectedId:{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},searchable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};oe.__docgenInfo={description:"",methods:[],displayName:"DropdownTypeahead",props:{results:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  type: TypeaheadResultType;
  /** Full label — matched portion shown bold, rest regular */
  label: string;
  /** Bold portion (matched query) — rendered bold, rest of label is regular */
  matchedPart?: string;
  subLabel?: string;
  onOpen?: () => void;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:'"profile" | "engagement" | "role" | "search"',elements:[{name:"literal",value:'"profile"'},{name:"literal",value:'"engagement"'},{name:"literal",value:'"role"'},{name:"literal",value:'"search"'}],required:!0}},{key:"label",value:{name:"string",required:!0},description:"Full label — matched portion shown bold, rest regular"},{key:"matchedPart",value:{name:"string",required:!1},description:"Bold portion (matched query) — rendered bold, rest of label is regular"},{key:"subLabel",value:{name:"string",required:!1}},{key:"onOpen",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}],raw:"TypeaheadResult[]"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onSeeAll:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const sa={title:"Components/Dropdown",parameters:{design:{type:"figma",url:"https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1671-37903"},layout:"centered"}},ue=[{id:"1",label:"Action"},{id:"2",label:"Action"},{id:"3",label:"Action"},{id:"4",label:"Action"},{id:"5",label:"Action"}],me=[{id:"1",label:"Selection",subLabel:"Info"},{id:"2",label:"Selection",subLabel:"Info"},{id:"3",label:"Selection"},{id:"4",label:"Selection"}],ce=[{id:"open",label:"Open"},{id:"draft",label:"Draft"},{id:"closed",label:"Closed"}],de=["booking","role","engagement","profile","search","calendar","workflow","marketplace","reports","insights","history","notifications","edit","save","share","open","tag","note","refresh","sort","merge","split","move","remove"],ve=[{id:"default",label:"Default",color:"#FFB3B3"},{id:"hard",label:"Hard",color:"#A8C5F5"},{id:"soft",label:"Soft",color:"#F5A8F0"},{id:"holidays",label:"Holidays",color:"#A8F5C5"}],pe=[{id:"group",name:"Group booking",subLabel:"150 users as a result from filters",isGroup:!0},{id:"cp",name:"Charlie Parker",subLabel:"paul.trent@email.com",initials:"PT"},{id:"sp",name:"Steve Pauster",subLabel:"steve.pauster@email.com",initials:"SP"},{id:"lp",name:"Laura Pau",subLabel:"laura.pau@email.com",initials:"LP"}],y=()=>e.jsx(N,{items:ue,onSelect:n=>console.log("selected",n)}),b=()=>e.jsx(N,{items:[{id:"1",label:"Action",subLabel:"Info"},{id:"2",label:"Action",subLabel:"Info"},{id:"3",label:"Action",subLabel:"Info"}],onSelect:n=>console.log("selected",n)}),w=()=>{const[n,t]=c.useState("1");return e.jsx(L,{items:me,selectedId:n,onSelect:t})},k=()=>{const[n,t]=c.useState([]);return e.jsx(C,{items:ce,selectedIds:n,onSelectionChange:t})},S=()=>{const[n,t]=c.useState("booking");return e.jsx(T,{icons:de,selectedIcon:n,onSelect:t})},x=()=>{const[n,t]=c.useState("default");return e.jsx(A,{items:ve,selectedId:n,onSelect:t})},_=()=>{const[n,t]=c.useState();return e.jsx(D,{items:pe,selectedId:n,onSelect:t})},I=()=>e.jsx(oe,{results:[{id:"1",type:"profile",label:"Ruby Alpha",matchedPart:"Ruby",subLabel:"ruby.alpha@profinda.com",onOpen:()=>{}},{id:"2",type:"engagement",label:"Ruby banking audit",matchedPart:"Ruby",subLabel:"01 Mar 2024",onOpen:()=>{}},{id:"3",type:"role",label:"Ruby developer",matchedPart:"Ruby",subLabel:"01 Mar 2024",onOpen:()=>{}},{id:"4",type:"search",label:"Ruby developer",matchedPart:"Ruby"}],onSelect:n=>console.log("selected",n),onSeeAll:()=>console.log("see all")}),j=()=>{const[n,t]=c.useState("1"),[o,s]=c.useState([]),[l,m]=c.useState("booking"),[p,h]=c.useState("default"),[r,v]=c.useState();return e.jsxs("div",{style:{display:"flex",gap:24,flexWrap:"wrap",alignItems:"flex-start",padding:24},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Actions"}),e.jsx(N,{items:ue,onSelect:()=>{}})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Selection"}),e.jsx(L,{items:me,selectedId:n,onSelect:t})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Multi-selection"}),e.jsx(C,{items:ce,selectedIds:o,onSelectionChange:s})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Icons"}),e.jsx(T,{icons:de,selectedIcon:l,onSelect:m})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Booking Category"}),e.jsx(A,{items:ve,selectedId:p,onSelect:h})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Mulish, sans-serif",fontSize:11,color:"#8F9ED1",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8},children:"Workforce Member"}),e.jsx(D,{items:pe,selectedId:r,onSelect:v})]})]})};y.__docgenInfo={description:"",methods:[],displayName:"Actions"};b.__docgenInfo={description:"",methods:[],displayName:"ActionsDoubleLine"};w.__docgenInfo={description:"",methods:[],displayName:"Selection"};k.__docgenInfo={description:"",methods:[],displayName:"MultiSelection"};S.__docgenInfo={description:"",methods:[],displayName:"Icons"};x.__docgenInfo={description:"",methods:[],displayName:"BookingCategory"};_.__docgenInfo={description:"",methods:[],displayName:"WorkforceMember"};I.__docgenInfo={description:"",methods:[],displayName:"Typeahead"};j.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var M,z,F;y.parameters={...y.parameters,docs:{...(M=y.parameters)==null?void 0:M.docs,source:{originalSource:'() => <DropdownActions items={actionItems} onSelect={id => console.log("selected", id)} />',...(F=(z=y.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};var W,R,P;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`() => <DropdownActions items={[{
  id: "1",
  label: "Action",
  subLabel: "Info"
}, {
  id: "2",
  label: "Action",
  subLabel: "Info"
}, {
  id: "3",
  label: "Action",
  subLabel: "Info"
}]} onSelect={id => console.log("selected", id)} />`,...(P=(R=b.parameters)==null?void 0:R.docs)==null?void 0:P.source}}};var E,O,G;w.parameters={...w.parameters,docs:{...(E=w.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState("1");
  return <DropdownSelection items={selectionItems} selectedId={selected} onSelect={setSelected} />;
}`,...(G=(O=w.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};var V,H,Y;k.parameters={...k.parameters,docs:{...(V=k.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string[]>([]);
  return <DropdownMultiSelection items={multiItems} selectedIds={selected} onSelectionChange={setSelected} />;
}`,...(Y=(H=k.parameters)==null?void 0:H.docs)==null?void 0:Y.source}}};var K,Q,$;S.parameters={...S.parameters,docs:{...(K=S.parameters)==null?void 0:K.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<IconName | undefined>("booking");
  return <DropdownIcons icons={iconNames} selectedIcon={selected} onSelect={setSelected} />;
}`,...($=(Q=S.parameters)==null?void 0:Q.docs)==null?void 0:$.source}}};var J,U,X;x.parameters={...x.parameters,docs:{...(J=x.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState("default");
  return <DropdownBookingCategory items={bookingCategories} selectedId={selected} onSelect={setSelected} />;
}`,...(X=(U=x.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Z,ee,ae;_.parameters={..._.parameters,docs:{...(Z=_.parameters)==null?void 0:Z.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string | undefined>();
  return <DropdownWM items={wmItems} selectedId={selected} onSelect={setSelected} />;
}`,...(ae=(ee=_.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var le,ne,te;I.parameters={...I.parameters,docs:{...(le=I.parameters)==null?void 0:le.docs,source:{originalSource:`() => <DropdownTypeahead results={[{
  id: "1",
  type: "profile",
  label: "Ruby Alpha",
  matchedPart: "Ruby",
  subLabel: "ruby.alpha@profinda.com",
  onOpen: () => {}
}, {
  id: "2",
  type: "engagement",
  label: "Ruby banking audit",
  matchedPart: "Ruby",
  subLabel: "01 Mar 2024",
  onOpen: () => {}
}, {
  id: "3",
  type: "role",
  label: "Ruby developer",
  matchedPart: "Ruby",
  subLabel: "01 Mar 2024",
  onOpen: () => {}
}, {
  id: "4",
  type: "search",
  label: "Ruby developer",
  matchedPart: "Ruby"
}]} onSelect={id => console.log("selected", id)} onSeeAll={() => console.log("see all")} />`,...(te=(ne=I.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var re,ie,se;j.parameters={...j.parameters,docs:{...(re=j.parameters)==null?void 0:re.docs,source:{originalSource:`() => {
  const [singleSel, setSingleSel] = useState("1");
  const [multiSel, setMultiSel] = useState<string[]>([]);
  const [iconSel, setIconSel] = useState<IconName | undefined>("booking");
  const [catSel, setCatSel] = useState("default");
  const [wmSel, setWmSel] = useState<string | undefined>();
  return <div style={{
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: 24
  }}>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Actions</div>
        <DropdownActions items={actionItems} onSelect={() => {}} />
      </div>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Selection</div>
        <DropdownSelection items={selectionItems} selectedId={singleSel} onSelect={setSingleSel} />
      </div>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Multi-selection</div>
        <DropdownMultiSelection items={multiItems} selectedIds={multiSel} onSelectionChange={setMultiSel} />
      </div>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Icons</div>
        <DropdownIcons icons={iconNames} selectedIcon={iconSel} onSelect={setIconSel} />
      </div>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Booking Category</div>
        <DropdownBookingCategory items={bookingCategories} selectedId={catSel} onSelect={setCatSel} />
      </div>
      <div>
        <div style={{
        fontFamily: "Mulish, sans-serif",
        fontSize: 11,
        color: "#8F9ED1",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 8
      }}>Workforce Member</div>
        <DropdownWM items={wmItems} selectedId={wmSel} onSelect={setWmSel} />
      </div>
    </div>;
}`,...(se=(ie=j.parameters)==null?void 0:ie.docs)==null?void 0:se.source}}};const oa=["Actions","ActionsDoubleLine","Selection","MultiSelection","Icons","BookingCategory","WorkforceMember","Typeahead","AllVariants"];export{y as Actions,b as ActionsDoubleLine,j as AllVariants,x as BookingCategory,S as Icons,k as MultiSelection,w as Selection,I as Typeahead,_ as WorkforceMember,oa as __namedExportsOrder,sa as default};
