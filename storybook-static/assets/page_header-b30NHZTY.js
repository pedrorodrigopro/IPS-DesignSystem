import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as s}from"./index-Dd5QUkq_.js";import{B as v}from"./breadcrumbs-8Hp0weBQ.js";import{H as d}from"./header-C72qAAzd.js";import{R as c}from"./role_subtitle-Hzo6eQtd.js";const p="_pageHeader_12vo1_1",g={pageHeader:p};function f({breadcrumbs:a,title:i,actions:t,headerRight:o,wfState:r,activityTag:n,subtitleItems:l,className:u}){const m=r||n||l&&l.length>0;return e.jsxs("div",{className:s(g.pageHeader,u),children:[a&&a.length>0&&e.jsx(v,{items:a}),e.jsx(d,{size:"page",title:i,actions:t,rightContent:o}),m&&e.jsx(c,{wfState:r,activityTag:n,items:l})]})}f.__docgenInfo={description:"",methods:[],displayName:"PageHeader",props:{breadcrumbs:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  href?: string;
  onClick?: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"href",value:{name:"string",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}],raw:"BreadcrumbItem[]"},description:""},title:{required:!0,tsType:{name:"string"},description:""},actions:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  /** For icon-only buttons */
  icon?: IconName;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"variant",value:{name:"union",raw:'"primary" | "secondary"',elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"secondary"'}],required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"icon",value:{name:"union",raw:`| "activity-feed" | "add" | "admin" | "ai"
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
| "user-interest" | "web" | "wine-glass" | "work"`,elements:[{name:"literal",value:'"activity-feed"'},{name:"literal",value:'"add"'},{name:"literal",value:'"admin"'},{name:"literal",value:'"ai"'},{name:"literal",value:'"arrow-down"'},{name:"literal",value:'"arrow-left"'},{name:"literal",value:'"arrow-right"'},{name:"literal",value:'"arrow-up"'},{name:"literal",value:'"audit-planner"'},{name:"literal",value:'"booking"'},{name:"literal",value:'"calendar"'},{name:"literal",value:'"caret-down"'},{name:"literal",value:'"caret-left"'},{name:"literal",value:'"caret-right"'},{name:"literal",value:'"caret-up"'},{name:"literal",value:'"chat"'},{name:"literal",value:'"check"'},{name:"literal",value:'"chevron-down"'},{name:"literal",value:'"chevron-left"'},{name:"literal",value:'"chevron-right"'},{name:"literal",value:'"chevron-up"'},{name:"literal",value:'"cross"'},{name:"literal",value:'"down"'},{name:"literal",value:'"edit"'},{name:"literal",value:'"engagement"'},{name:"literal",value:'"error"'},{name:"literal",value:'"core"'},{name:"literal",value:'"development"'},{name:"literal",value:'"forbidden"'},{name:"literal",value:'"help"'},{name:"literal",value:'"hidden"'},{name:"literal",value:'"history"'},{name:"literal",value:'"hourglass-half"'},{name:"literal",value:'"info"'},{name:"literal",value:'"insights"'},{name:"literal",value:'"learning"'},{name:"literal",value:'"link"'},{name:"literal",value:'"substitute-parent-child"'},{name:"literal",value:'"links"'},{name:"literal",value:'"list"'},{name:"literal",value:'"location"'},{name:"literal",value:'"locked"'},{name:"literal",value:'"logout"'},{name:"literal",value:'"mail"'},{name:"literal",value:'"mandatory"'},{name:"literal",value:'"marketplace"'},{name:"literal",value:'"menu-horizontal"'},{name:"literal",value:'"menu-vertical"'},{name:"literal",value:'"merge"'},{name:"literal",value:'"missing"'},{name:"literal",value:'"money"'},{name:"literal",value:'"move"'},{name:"literal",value:'"note"'},{name:"literal",value:'"notifications"'},{name:"literal",value:'"open"'},{name:"literal",value:'"pin"'},{name:"literal",value:'"profile"'},{name:"literal",value:'"question"'},{name:"literal",value:'"reassign"'},{name:"literal",value:'"refresh"'},{name:"literal",value:'"remove"'},{name:"literal",value:'"reports"'},{name:"literal",value:'"role"'},{name:"literal",value:'"save"'},{name:"literal",value:'"search"'},{name:"literal",value:'"share"'},{name:"literal",value:'"shown"'},{name:"literal",value:'"skills-framework"'},{name:"literal",value:'"smart-allocation"'},{name:"literal",value:'"sort"'},{name:"literal",value:'"split"'},{name:"literal",value:'"subtract"'},{name:"literal",value:'"table"'},{name:"literal",value:'"tag"'},{name:"literal",value:'"undo"'},{name:"literal",value:'"unseen"'},{name:"literal",value:'"up"'},{name:"literal",value:'"user-filled"'},{name:"literal",value:'"verified"'},{name:"literal",value:'"verified-credly"'},{name:"literal",value:'"verified-others"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"workflow"'},{name:"literal",value:'"zoom-in"'},{name:"literal",value:'"zoom-out"'},{name:"literal",value:'"heart"'},{name:"literal",value:'"placeholder-profile"'},{name:"literal",value:'"suggested"'},{name:"literal",value:'"timeline"'},{name:"literal",value:'"filter"'},{name:"literal",value:'"filter-clean"'},{name:"literal",value:'"home"'},{name:"literal",value:'"add-profile"'},{name:"literal",value:'"ai-agent"'},{name:"literal",value:'"arrow-2-directions"'},{name:"literal",value:'"arrow-2-directions-vertical"'},{name:"literal",value:'"arrow-4-directions"'},{name:"literal",value:'"availability"'},{name:"literal",value:'"baby"'},{name:"literal",value:'"bag"'},{name:"literal",value:'"bell"'},{name:"literal",value:'"book"'},{name:"literal",value:'"bubbles"'},{name:"literal",value:'"bug"'},{name:"literal",value:'"bulk"'},{name:"literal",value:'"bulk-move"'},{name:"literal",value:'"calendar-clash"'},{name:"literal",value:'"calendar-delete"'},{name:"literal",value:'"calendar-misaligned"'},{name:"literal",value:'"car"'},{name:"literal",value:'"certificate"'},{name:"literal",value:'"clock"'},{name:"literal",value:'"close-role"'},{name:"literal",value:'"collapse"'},{name:"literal",value:'"compare"'},{name:"literal",value:'"copy"'},{name:"literal",value:'"cost"'},{name:"literal",value:'"created"'},{name:"literal",value:'"department"'},{name:"literal",value:'"dot"'},{name:"literal",value:'"dot-big"'},{name:"literal",value:'"duplicate"'},{name:"literal",value:'"engagement-audit"'},{name:"literal",value:'"expand"'},{name:"literal",value:'"expand-all"'},{name:"literal",value:'"expanded-all"'},{name:"literal",value:'"export"'},{name:"literal",value:'"extend"'},{name:"literal",value:'"face-smile"'},{name:"literal",value:'"facebook"'},{name:"literal",value:'"filter-applied"'},{name:"literal",value:'"filter2"'},{name:"literal",value:'"fire"'},{name:"literal",value:'"flower-spa"'},{name:"literal",value:'"folder"'},{name:"literal",value:'"ghost"'},{name:"literal",value:'"head-heart"'},{name:"literal",value:'"heatmap"'},{name:"literal",value:'"hierarchical"'},{name:"literal",value:'"hourglass-empty"'},{name:"literal",value:'"house-laptop"'},{name:"literal",value:'"house-user"'},{name:"literal",value:'"import"'},{name:"literal",value:'"industry"'},{name:"literal",value:'"instagram"'},{name:"literal",value:'"key"'},{name:"literal",value:'"keyboard"'},{name:"literal",value:'"linkedin"'},{name:"literal",value:'"manage-roles"'},{name:"literal",value:'"mobile"'},{name:"literal",value:'"mouse-cursor"'},{name:"literal",value:'"non-demand"'},{name:"literal",value:'"overbooking"'},{name:"literal",value:'"overbooking-acknowledged"'},{name:"literal",value:'"owner"'},{name:"literal",value:'"palm-tree"'},{name:"literal",value:'"paper-clip"'},{name:"literal",value:'"paper-plane"'},{name:"literal",value:'"path"'},{name:"literal",value:'"pen"'},{name:"literal",value:'"person-minus"'},{name:"literal",value:'"pf-logo"'},{name:"literal",value:'"phone"'},{name:"literal",value:'"plane"'},{name:"literal",value:'"play"'},{name:"literal",value:'"postpone"'},{name:"literal",value:'"preferences"'},{name:"literal",value:'"profile-field"'},{name:"literal",value:'"profiles"'},{name:"literal",value:'"refresh-clean"'},{name:"literal",value:'"refresh-warning"'},{name:"literal",value:'"remove-all"'},{name:"literal",value:'"role-audit"'},{name:"literal",value:'"rollforward"'},{name:"literal",value:'"save-add"'},{name:"literal",value:'"save-remove"'},{name:"literal",value:'"sector"'},{name:"literal",value:'"segment"'},{name:"literal",value:'"skype"'},{name:"literal",value:'"skype-for-business"'},{name:"literal",value:'"snooze"'},{name:"literal",value:'"soft-exception"'},{name:"literal",value:'"split2"'},{name:"literal",value:'"substitute-child"'},{name:"literal",value:'"substitute-parent"'},{name:"literal",value:'"target-allocation"'},{name:"literal",value:'"task"'},{name:"literal",value:'"teams"'},{name:"literal",value:'"twitter"'},{name:"literal",value:'"unpin"'},{name:"literal",value:'"user-interest"'},{name:"literal",value:'"web"'},{name:"literal",value:'"wine-glass"'},{name:"literal",value:'"work"'}],required:!1},description:"For icon-only buttons"}]}}],raw:"HeaderAction[]"},description:""},headerRight:{required:!1,tsType:{name:"ReactNode"},description:"Extra content in the header right slot (e.g. segment selector)"},wfState:{required:!1,tsType:{name:"union",raw:`| "new" | "shortlisting" | "in-review" | "invited"
| "partially-filled" | "filled" | "partially-booked" | "booked"
| "partially-confirmed" | "confirmed" | "not-filled" | "exceptions" | "pending"
// Audit-planner-specific overlay states (red, bold label)
| "technical-overlay" | "accreditations"`,elements:[{name:"literal",value:'"new"'},{name:"literal",value:'"shortlisting"'},{name:"literal",value:'"in-review"'},{name:"literal",value:'"invited"'},{name:"literal",value:'"partially-filled"'},{name:"literal",value:'"filled"'},{name:"literal",value:'"partially-booked"'},{name:"literal",value:'"booked"'},{name:"literal",value:'"partially-confirmed"'},{name:"literal",value:'"confirmed"'},{name:"literal",value:'"not-filled"'},{name:"literal",value:'"exceptions"'},{name:"literal",value:'"pending"'},{name:"literal",value:'"technical-overlay"'},{name:"literal",value:'"accreditations"'}]},description:""},activityTag:{required:!1,tsType:{name:"string"},description:""},subtitleItems:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Short descriptor e.g. "ID", "State", "Privacy" */
  label: string;
  /** Bold value e.g. "100000064", "Open", "Public" */
  value: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0},description:'Short descriptor e.g. "ID", "State", "Privacy"'},{key:"value",value:{name:"string",required:!0},description:'Bold value e.g. "100000064", "Open", "Public"'}]}}],raw:"RoleLabelValue[]"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};export{f as P};
