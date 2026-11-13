import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./index-DhMLlvMY.js";import{S as N,c as $}from"./side_panel-BLtDroNd.js";import{H as K}from"./header-BF0ryUYE.js";import{I as c}from"./icon-v-ZctF2y.js";import{B as M}from"./button-CreEIUG8.js";import{D as _}from"./divider-CKitOyrn.js";import{b as F}from"./input-Dap90cT3.js";import{A as G}from"./actions-B1Wf2eIL.js";import{T as O}from"./toggle-BNLvGwJW.js";import{A as J}from"./alert-J8G0QdH-.js";import{A as Q}from"./avatar-DzCkQh3P.js";import{a as U,b as X}from"./pill-DeX-wCc8.js";import{T as I}from"./table-BhQDLf3i.js";import{E as Y}from"./empty_state-CLJYa-7F.js";const m={fontFamily:"var(--font-family)",fontSize:14,fontWeight:400,color:"var(--palette-blue-0)",lineHeight:"150%"},v={...m,fontWeight:700,lineHeight:"115%"},R={fontFamily:"var(--font-family)",fontSize:12,fontWeight:400,color:"var(--palette-blue-2)",lineHeight:"150%"};function Z(a,r){if(!r)return a;const i=l=>{switch(r.key){case"name":return l.name.toLowerCase();case"match":return l.match??-1;case"avail":return l.avail??-1;case"status":return(l.status??"").toLowerCase();case"rank":return(l.rank??"").toLowerCase();default:return 0}},u=[...a].sort((l,d)=>i(l)<i(d)?-1:i(l)>i(d)?1:0);return r.dir==="asc"?u:u.reverse()}function E(){const[a,r]=o.useState(null);return{props:{sortKey:a==null?void 0:a.key,sortDirection:(a==null?void 0:a.dir)??"none",onSort:(i,u)=>r(u==="none"?null:{key:i,dir:u})},apply:i=>Z(i,a)}}const D={margin:"0 -8px"},p={overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",minWidth:0},f=a=>a===void 0?"–":`${a}%`;function ee({name:a,email:r,suggested:i}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:2,minWidth:0},children:[e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:6,minWidth:0},children:[e.jsx("span",{style:{...v,...p},children:a}),i&&e.jsx(c,{name:"suggested",size:16,style:{flexShrink:0}})]}),r&&e.jsx("span",{style:{...R,color:"var(--palette-blue-0)",...p},children:r})]})}function ae({rows:a,requestedRank:r,onRemove:i}){const{props:u,apply:l}=E(),d=o.useMemo(()=>l(a),[a,u.sortKey,u.sortDirection]),h=[{key:"name",header:"Suggested WM",sortable:!0,renderCell:t=>e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8,minWidth:0},children:[e.jsx("span",{style:{flexShrink:0,display:"inline-flex"},children:e.jsx(Q,{initials:t.initials,src:t.avatarSrc,size:"small"})}),e.jsx("span",{style:{...v,...p},children:t.name})]})},{key:"rank",header:"WM Grade",width:"96px",renderCell:t=>e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4,minWidth:0},children:[r&&t.rank===r&&e.jsx(c,{name:"check",size:16,style:{color:"var(--palette-green-0)",flexShrink:0}}),e.jsx("span",{style:{...m,...p},children:t.rank??"–"})]})},{key:"match",header:"Match",sortable:!0,width:"72px",align:"right",renderCell:t=>e.jsx("span",{style:v,children:f(t.match)})},{key:"avail",header:"Avail.",sortable:!0,width:"72px",align:"right",renderCell:t=>e.jsx("span",{style:v,children:f(t.avail)})},{key:"status",header:"Shortlist status",sortable:!0,width:"116px",renderCell:t=>e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4,minWidth:0},children:[t.status&&e.jsx("span",{style:{minWidth:0,display:"inline-flex"},children:e.jsx(U,{label:t.status,size:"small"})}),e.jsx(M,{kind:"iconTertiary",size:"regular",title:`Remove ${t.name}`,onClick:()=>i(t.id),children:e.jsx(c,{name:"cross",size:16})})]})}];return e.jsxs("div",{style:D,children:[e.jsx(I,{columns:h,rows:d,compact:!0,layout:"fixed",headerSize:"label",...u}),d.length===0&&e.jsx("div",{style:{height:51,boxSizing:"border-box",display:"flex",alignItems:"center",padding:"0 8px",borderBottom:"1px solid var(--palette-neutral-0)"},children:e.jsx(Y,{size:"small-horizontal",title:"No suggested WM"})})]})}function te({rows:a,suggestedIds:r,canSuggest:i,onSuggest:u,onRemove:l}){const{props:d,apply:h}=E(),t=o.useMemo(()=>h(a),[a,d.sortKey,d.sortDirection]),k=[{key:"name",header:"WM",sortable:!0,renderCell:n=>e.jsx(ee,{name:n.name,email:n.email,suggested:r.has(n.id)})},{key:"rank",header:"Rank",width:"82px",type:"text-regular"},{key:"match",header:"Match",sortable:!0,width:"72px",align:"right",renderCell:n=>e.jsx("span",{style:m,children:f(n.match)})},{key:"avail",header:"Avail.",sortable:!0,width:"72px",align:"right",renderCell:n=>e.jsx("span",{style:m,children:f(n.avail)})},{key:"status",header:"Shortlist status",sortable:!0,width:"104px",renderCell:n=>n.status?e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:6,minWidth:0},children:[e.jsx("span",{style:{...m,...p},children:n.status}),e.jsx(c,{name:"history",size:14,style:{flexShrink:0}})]}):e.jsx("span",{style:R,children:"–"})},{key:"action",header:"",width:"116px",align:"right",renderCell:n=>r.has(n.id)?e.jsx(X,{label:"Suggested",size:"small",onRemove:()=>l(n.id)}):e.jsx(M,{kind:"secondary",size:"small",disabled:!i,onClick:()=>u(n),title:i?void 0:"All vacancies are suggested",children:e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:6},children:[e.jsx(c,{name:"suggested",size:14}),"Suggest"]})})}];return e.jsx("div",{style:D,children:e.jsx(I,{columns:k,rows:t,compact:!0,layout:"fixed",headerSize:"label",...d})})}function re({open:a,onClose:r,roleTitle:i,subtitle:u="Suggested WM",vacancies:l=1,requestedRank:d,shortlist:h=[],matches:t=[],other:k=[],suggested:n=[],onChange:x,onDone:b}){const[S,w]=o.useState("shortlist"),[W,q]=o.useState(""),[g,C]=o.useState(n);o.useEffect(()=>{a&&(C(n),w("shortlist"),q(""))},[a]);const A=s=>{C(s),x==null||x(s)},L=s=>A([...g,s]),T=s=>A(g.filter(V=>V.id!==s)),y=Math.max(0,l-g.length),H=y>0?`${y} open ${y===1?"vacancy":"vacancies"} left`:"All vacancies are suggested",z=S==="shortlist"?h:S==="matches"?t:k,j=W.trim().toLowerCase(),P=j?z.filter(s=>s.name.toLowerCase().includes(j)||(s.email??"").toLowerCase().includes(j)):z,B=o.useMemo(()=>new Set(g.map(s=>s.id)),[g]);return e.jsx(N,{open:a,onClose:r,width:600,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"},children:[e.jsxs("div",{className:$.content,style:{padding:"24px 24px 0",display:"flex",flexDirection:"column",gap:16},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between"},children:[e.jsx(K,{size:"content",title:i,subtitle:u}),e.jsx(M,{kind:"iconTertiary",size:"regular",title:"Close",onClick:r,children:e.jsx(c,{name:"cross",size:16})})]}),e.jsx(J,{type:"general",message:H}),e.jsx(ae,{rows:g,requestedRank:d,onRemove:T}),e.jsx(_,{orientation:"horizontal"}),e.jsx("span",{style:m,children:"Pick WMs below to be suggested above"}),e.jsx(O,{options:[{value:"shortlist",label:"Shortlist"},{value:"matches",label:"Matches"},{value:"other",label:"Other resources"}],value:S,onChange:s=>w(s)}),e.jsx(F,{value:W,onChange:s=>q(s.target.value),onClear:()=>q(""),placeholder:"Search"}),e.jsx(te,{rows:P,suggestedIds:B,canSuggest:y>0,onSuggest:L,onRemove:T}),e.jsx("div",{style:{height:16}})]}),e.jsx(G,{variant:"sticky-panel",rightActions:[{label:"Done",variant:"primary",onClick:()=>{b==null||b(g),r()}}]})]})})}re.__docgenInfo={description:"",methods:[],displayName:"SuggestSidePanel",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},roleTitle:{required:!0,tsType:{name:"string"},description:"Role the suggestions are for (header title)"},subtitle:{required:!1,tsType:{name:"string"},description:'Header subtitle (default "Suggested WM")',defaultValue:{value:'"Suggested WM"',computed:!1}},vacancies:{required:!1,tsType:{name:"number"},description:"How many WMs can be suggested for the role (default 1)",defaultValue:{value:"1",computed:!1}},requestedRank:{required:!1,tsType:{name:"string"},description:"Rank the role asks for: a suggested WM of that rank gets a green check in the Grade column"},shortlist:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id:         string;
  name:       string;
  initials:   string;
  email?:     string;
  avatarSrc?: string;
  /** WM grade / rank, e.g. "Manager" */
  rank?:      string;
  /** Match with the role, 0–100 */
  match?:     number;
  /** Availability for the role, 0–100 */
  avail?:     number;
  /** e.g. "Shortlisted" */
  status?:    string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"initials",value:{name:"string",required:!0}},{key:"email",value:{name:"string",required:!1}},{key:"avatarSrc",value:{name:"string",required:!1}},{key:"rank",value:{name:"string",required:!1},description:'WM grade / rank, e.g. "Manager"'},{key:"match",value:{name:"number",required:!1},description:"Match with the role, 0–100"},{key:"avail",value:{name:"number",required:!1},description:"Availability for the role, 0–100"},{key:"status",value:{name:"string",required:!1},description:'e.g. "Shortlisted"'}]}}],raw:"SuggestCandidate[]"},description:"Candidates per tab",defaultValue:{value:"[]",computed:!1}},matches:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id:         string;
  name:       string;
  initials:   string;
  email?:     string;
  avatarSrc?: string;
  /** WM grade / rank, e.g. "Manager" */
  rank?:      string;
  /** Match with the role, 0–100 */
  match?:     number;
  /** Availability for the role, 0–100 */
  avail?:     number;
  /** e.g. "Shortlisted" */
  status?:    string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"initials",value:{name:"string",required:!0}},{key:"email",value:{name:"string",required:!1}},{key:"avatarSrc",value:{name:"string",required:!1}},{key:"rank",value:{name:"string",required:!1},description:'WM grade / rank, e.g. "Manager"'},{key:"match",value:{name:"number",required:!1},description:"Match with the role, 0–100"},{key:"avail",value:{name:"number",required:!1},description:"Availability for the role, 0–100"},{key:"status",value:{name:"string",required:!1},description:'e.g. "Shortlisted"'}]}}],raw:"SuggestCandidate[]"},description:"",defaultValue:{value:"[]",computed:!1}},other:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id:         string;
  name:       string;
  initials:   string;
  email?:     string;
  avatarSrc?: string;
  /** WM grade / rank, e.g. "Manager" */
  rank?:      string;
  /** Match with the role, 0–100 */
  match?:     number;
  /** Availability for the role, 0–100 */
  avail?:     number;
  /** e.g. "Shortlisted" */
  status?:    string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"initials",value:{name:"string",required:!0}},{key:"email",value:{name:"string",required:!1}},{key:"avatarSrc",value:{name:"string",required:!1}},{key:"rank",value:{name:"string",required:!1},description:'WM grade / rank, e.g. "Manager"'},{key:"match",value:{name:"number",required:!1},description:"Match with the role, 0–100"},{key:"avail",value:{name:"number",required:!1},description:"Availability for the role, 0–100"},{key:"status",value:{name:"string",required:!1},description:'e.g. "Shortlisted"'}]}}],raw:"SuggestCandidate[]"},description:"",defaultValue:{value:"[]",computed:!1}},suggested:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id:         string;
  name:       string;
  initials:   string;
  email?:     string;
  avatarSrc?: string;
  /** WM grade / rank, e.g. "Manager" */
  rank?:      string;
  /** Match with the role, 0–100 */
  match?:     number;
  /** Availability for the role, 0–100 */
  avail?:     number;
  /** e.g. "Shortlisted" */
  status?:    string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"initials",value:{name:"string",required:!0}},{key:"email",value:{name:"string",required:!1}},{key:"avatarSrc",value:{name:"string",required:!1}},{key:"rank",value:{name:"string",required:!1},description:'WM grade / rank, e.g. "Manager"'},{key:"match",value:{name:"number",required:!1},description:"Match with the role, 0–100"},{key:"avail",value:{name:"number",required:!1},description:"Availability for the role, 0–100"},{key:"status",value:{name:"string",required:!1},description:'e.g. "Shortlisted"'}]}}],raw:"SuggestCandidate[]"},description:"WMs already suggested when the panel opens",defaultValue:{value:"[]",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(suggested: SuggestCandidate[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id:         string;
  name:       string;
  initials:   string;
  email?:     string;
  avatarSrc?: string;
  /** WM grade / rank, e.g. "Manager" */
  rank?:      string;
  /** Match with the role, 0–100 */
  match?:     number;
  /** Availability for the role, 0–100 */
  avail?:     number;
  /** e.g. "Shortlisted" */
  status?:    string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"initials",value:{name:"string",required:!0}},{key:"email",value:{name:"string",required:!1}},{key:"avatarSrc",value:{name:"string",required:!1}},{key:"rank",value:{name:"string",required:!1},description:'WM grade / rank, e.g. "Manager"'},{key:"match",value:{name:"number",required:!1},description:"Match with the role, 0–100"},{key:"avail",value:{name:"number",required:!1},description:"Availability for the role, 0–100"},{key:"status",value:{name:"string",required:!1},description:'e.g. "Shortlisted"'}]}}],raw:"SuggestCandidate[]"},name:"suggested"}],return:{name:"void"}}},description:"Every Suggest / remove"},onDone:{required:!1,tsType:{name:"signature",type:"function",raw:"(suggested: SuggestCandidate[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id:         string;
  name:       string;
  initials:   string;
  email?:     string;
  avatarSrc?: string;
  /** WM grade / rank, e.g. "Manager" */
  rank?:      string;
  /** Match with the role, 0–100 */
  match?:     number;
  /** Availability for the role, 0–100 */
  avail?:     number;
  /** e.g. "Shortlisted" */
  status?:    string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"initials",value:{name:"string",required:!0}},{key:"email",value:{name:"string",required:!1}},{key:"avatarSrc",value:{name:"string",required:!1}},{key:"rank",value:{name:"string",required:!1},description:'WM grade / rank, e.g. "Manager"'},{key:"match",value:{name:"number",required:!1},description:"Match with the role, 0–100"},{key:"avail",value:{name:"number",required:!1},description:"Availability for the role, 0–100"},{key:"status",value:{name:"string",required:!1},description:'e.g. "Shortlisted"'}]}}],raw:"SuggestCandidate[]"},name:"suggested"}],return:{name:"void"}}},description:"Done: the final list (the panel closes itself)"}}};export{re as S};
