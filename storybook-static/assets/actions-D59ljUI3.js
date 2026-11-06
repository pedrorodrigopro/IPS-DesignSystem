import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{c as i}from"./index-Dd5QUkq_.js";import{I as h}from"./icon-BJcJHAAT.js";import{T as f}from"./tooltip-CwLrwrm3.js";const g="_buttonRow_1s7zt_1",b="_left_1s7zt_10",y="_right_1s7zt_17",w="_infoText_1s7zt_25",k="_btn_1s7zt_34",x="_secondary_1s7zt_51",_="_primary_1s7zt_60",z="_disabled_1s7zt_69",q="_content_1s7zt_74",P="_stickyScreen_1s7zt_84",I="_screenInner_1s7zt_94",j="_stickyPanel_1s7zt_101",N="_panelInner_1s7zt_111",l={buttonRow:g,left:b,right:y,infoText:w,btn:k,secondary:x,primary:_,disabled:z,content:q,stickyScreen:P,screenInner:I,stickyPanel:j,panelInner:N};function p({action:e}){const n=e.icon?a.jsx(h,{name:e.icon,size:16}):null,t=a.jsxs("button",{type:"button",disabled:e.disabled,className:i(l.btn,e.variant==="primary"?l.primary:l.secondary,e.disabled&&l.disabled),onClick:e.onClick,children:[e.iconPosition!=="right"&&n,e.label,e.iconPosition==="right"&&n]});return e.tooltip?a.jsx(f,{content:e.tooltip,placement:"down-right",maxWidth:320,children:t}):t}function T({variant:e="content",leftActions:n=[],rightActions:t=[],insetX:o,leftContent:d,rightContent:c,infoText:u,className:m}){const s=a.jsxs("div",{className:l.buttonRow,children:[(n.length>0||d)&&a.jsxs("div",{className:l.left,children:[n.map((r,v)=>a.jsx(p,{action:r},r.label+v)),d]}),(t.length>0||c||u)&&a.jsxs("div",{className:l.right,children:[u&&a.jsx("span",{className:l.infoText,children:u}),t.map((r,v)=>a.jsx(p,{action:r},r.label+v)),c]})]});return e==="content"?a.jsx("div",{className:i(l.content,m),children:s}):e==="sticky-screen"?a.jsx("div",{className:i(l.stickyScreen,m),children:a.jsx("div",{className:l.screenInner,style:o!==void 0?{maxWidth:"none",paddingLeft:o,paddingRight:o}:void 0,children:s})}):a.jsx("div",{className:i(l.stickyPanel,m),children:a.jsx("div",{className:l.panelInner,children:s})})}T.__docgenInfo={description:"",methods:[],displayName:"Actions",props:{variant:{required:!1,tsType:{name:"union",raw:'"content" | "sticky-screen" | "sticky-panel"',elements:[{name:"literal",value:'"content"'},{name:"literal",value:'"sticky-screen"'},{name:"literal",value:'"sticky-panel"'}]},description:"",defaultValue:{value:'"content"',computed:!1}},leftActions:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  /** Optional icon (leading unless iconPosition="right") */
  icon?: IconName;
  /** Where the icon sits relative to the label (default "left") (requires \`icon\`) */
  iconPosition?: "left" | "right";
  /**
   * Shown in an IPS Tooltip on mouse hover (also on disabled buttons).
   * Hover only — a disabled button is not keyboard-focusable.
   * Positioned above the button, so it is clipped by an ancestor with overflow:hidden.
   */
  tooltip?: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"variant",value:{name:"union",raw:'"primary" | "secondary"',elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"secondary"'}],required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"union",raw:`| "activity-feed" | "add" | "admin" | "ai"
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
| "table" | "tag" | "tag-roles" | "undo" | "unseen" | "up" | "user-filled"
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
| "palm-tree" | "paper-clip" | "paper-plane" | "propilot" | "path" | "pen"
| "person-minus" | "pf-logo" | "phone" | "plane" | "play" | "postpone"
| "preferences" | "profile-field" | "profiles"
| "refresh-clean" | "refresh-warning" | "remove-all"
| "role-audit" | "rollforward" | "save-add" | "save-remove"
| "sector" | "segment" | "skype" | "skype-for-business" | "snooze"
| "soft-exception" | "split2"
| "substitute-child" | "substitute-parent"
| "target-allocation" | "task" | "teams" | "twitter" | "unpin"
| "user-interest" | "web" | "wine-glass" | "work"`,elements:[{name:"literal",value:'"activity-feed"'},{name:"literal",value:'"add"'},{name:"literal",value:'"admin"'},{name:"literal",value:'"ai"'},{name:"literal",value:'"arrow-down"'},{name:"literal",value:'"arrow-left"'},{name:"literal",value:'"arrow-right"'},{name:"literal",value:'"arrow-up"'},{name:"literal",value:'"audit-planner"'},{name:"literal",value:'"booking"'},{name:"literal",value:'"calendar"'},{name:"literal",value:'"caret-down"'},{name:"literal",value:'"caret-left"'},{name:"literal",value:'"caret-right"'},{name:"literal",value:'"caret-up"'},{name:"literal",value:'"chat"'},{name:"literal",value:'"check"'},{name:"literal",value:'"chevron-down"'},{name:"literal",value:'"chevron-left"'},{name:"literal",value:'"chevron-right"'},{name:"literal",value:'"chevron-up"'},{name:"literal",value:'"cross"'},{name:"literal",value:'"down"'},{name:"literal",value:'"edit"'},{name:"literal",value:'"engagement"'},{name:"literal",value:'"error"'},{name:"literal",value:'"core"'},{name:"literal",value:'"development"'},{name:"literal",value:'"forbidden"'},{name:"literal",value:'"help"'},{name:"literal",value:'"hidden"'},{name:"literal",value:'"history"'},{name:"literal",value:'"hourglass-half"'},{name:"literal",value:'"info"'},{name:"literal",value:'"insights"'},{name:"literal",value:'"learning"'},{name:"literal",value:'"link"'},{name:"literal",value:'"substitute-parent-child"'},{name:"literal",value:'"links"'},{name:"literal",value:'"list"'},{name:"literal",value:'"location"'},{name:"literal",value:'"locked"'},{name:"literal",value:'"logout"'},{name:"literal",value:'"mail"'},{name:"literal",value:'"mandatory"'},{name:"literal",value:'"marketplace"'},{name:"literal",value:'"menu-horizontal"'},{name:"literal",value:'"menu-vertical"'},{name:"literal",value:'"merge"'},{name:"literal",value:'"missing"'},{name:"literal",value:'"money"'},{name:"literal",value:'"move"'},{name:"literal",value:'"note"'},{name:"literal",value:'"notifications"'},{name:"literal",value:'"open"'},{name:"literal",value:'"pin"'},{name:"literal",value:'"profile"'},{name:"literal",value:'"question"'},{name:"literal",value:'"reassign"'},{name:"literal",value:'"refresh"'},{name:"literal",value:'"remove"'},{name:"literal",value:'"reports"'},{name:"literal",value:'"role"'},{name:"literal",value:'"save"'},{name:"literal",value:'"search"'},{name:"literal",value:'"share"'},{name:"literal",value:'"shown"'},{name:"literal",value:'"skills-framework"'},{name:"literal",value:'"smart-allocation"'},{name:"literal",value:'"sort"'},{name:"literal",value:'"split"'},{name:"literal",value:'"subtract"'},{name:"literal",value:'"table"'},{name:"literal",value:'"tag"'},{name:"literal",value:'"tag-roles"'},{name:"literal",value:'"undo"'},{name:"literal",value:'"unseen"'},{name:"literal",value:'"up"'},{name:"literal",value:'"user-filled"'},{name:"literal",value:'"verified"'},{name:"literal",value:'"verified-credly"'},{name:"literal",value:'"verified-others"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"workflow"'},{name:"literal",value:'"zoom-in"'},{name:"literal",value:'"zoom-out"'},{name:"literal",value:'"heart"'},{name:"literal",value:'"placeholder-profile"'},{name:"literal",value:'"suggested"'},{name:"literal",value:'"timeline"'},{name:"literal",value:'"filter"'},{name:"literal",value:'"filter-clean"'},{name:"literal",value:'"home"'},{name:"literal",value:'"add-profile"'},{name:"literal",value:'"ai-agent"'},{name:"literal",value:'"arrow-2-directions"'},{name:"literal",value:'"arrow-2-directions-vertical"'},{name:"literal",value:'"arrow-4-directions"'},{name:"literal",value:'"availability"'},{name:"literal",value:'"baby"'},{name:"literal",value:'"bag"'},{name:"literal",value:'"bell"'},{name:"literal",value:'"book"'},{name:"literal",value:'"bubbles"'},{name:"literal",value:'"bug"'},{name:"literal",value:'"bulk"'},{name:"literal",value:'"bulk-move"'},{name:"literal",value:'"calendar-clash"'},{name:"literal",value:'"calendar-delete"'},{name:"literal",value:'"calendar-misaligned"'},{name:"literal",value:'"car"'},{name:"literal",value:'"certificate"'},{name:"literal",value:'"clock"'},{name:"literal",value:'"close-role"'},{name:"literal",value:'"collapse"'},{name:"literal",value:'"compare"'},{name:"literal",value:'"copy"'},{name:"literal",value:'"cost"'},{name:"literal",value:'"created"'},{name:"literal",value:'"department"'},{name:"literal",value:'"dot"'},{name:"literal",value:'"dot-big"'},{name:"literal",value:'"duplicate"'},{name:"literal",value:'"engagement-audit"'},{name:"literal",value:'"expand"'},{name:"literal",value:'"expand-all"'},{name:"literal",value:'"expanded-all"'},{name:"literal",value:'"export"'},{name:"literal",value:'"extend"'},{name:"literal",value:'"face-smile"'},{name:"literal",value:'"facebook"'},{name:"literal",value:'"filter-applied"'},{name:"literal",value:'"filter2"'},{name:"literal",value:'"fire"'},{name:"literal",value:'"flower-spa"'},{name:"literal",value:'"folder"'},{name:"literal",value:'"ghost"'},{name:"literal",value:'"head-heart"'},{name:"literal",value:'"heatmap"'},{name:"literal",value:'"hierarchical"'},{name:"literal",value:'"hourglass-empty"'},{name:"literal",value:'"house-laptop"'},{name:"literal",value:'"house-user"'},{name:"literal",value:'"import"'},{name:"literal",value:'"industry"'},{name:"literal",value:'"instagram"'},{name:"literal",value:'"key"'},{name:"literal",value:'"keyboard"'},{name:"literal",value:'"linkedin"'},{name:"literal",value:'"manage-roles"'},{name:"literal",value:'"mobile"'},{name:"literal",value:'"mouse-cursor"'},{name:"literal",value:'"non-demand"'},{name:"literal",value:'"overbooking"'},{name:"literal",value:'"overbooking-acknowledged"'},{name:"literal",value:'"owner"'},{name:"literal",value:'"palm-tree"'},{name:"literal",value:'"paper-clip"'},{name:"literal",value:'"paper-plane"'},{name:"literal",value:'"propilot"'},{name:"literal",value:'"path"'},{name:"literal",value:'"pen"'},{name:"literal",value:'"person-minus"'},{name:"literal",value:'"pf-logo"'},{name:"literal",value:'"phone"'},{name:"literal",value:'"plane"'},{name:"literal",value:'"play"'},{name:"literal",value:'"postpone"'},{name:"literal",value:'"preferences"'},{name:"literal",value:'"profile-field"'},{name:"literal",value:'"profiles"'},{name:"literal",value:'"refresh-clean"'},{name:"literal",value:'"refresh-warning"'},{name:"literal",value:'"remove-all"'},{name:"literal",value:'"role-audit"'},{name:"literal",value:'"rollforward"'},{name:"literal",value:'"save-add"'},{name:"literal",value:'"save-remove"'},{name:"literal",value:'"sector"'},{name:"literal",value:'"segment"'},{name:"literal",value:'"skype"'},{name:"literal",value:'"skype-for-business"'},{name:"literal",value:'"snooze"'},{name:"literal",value:'"soft-exception"'},{name:"literal",value:'"split2"'},{name:"literal",value:'"substitute-child"'},{name:"literal",value:'"substitute-parent"'},{name:"literal",value:'"target-allocation"'},{name:"literal",value:'"task"'},{name:"literal",value:'"teams"'},{name:"literal",value:'"twitter"'},{name:"literal",value:'"unpin"'},{name:"literal",value:'"user-interest"'},{name:"literal",value:'"web"'},{name:"literal",value:'"wine-glass"'},{name:"literal",value:'"work"'}],required:!1},description:'Optional icon (leading unless iconPosition="right")'},{key:"iconPosition",value:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}],required:!1},description:'Where the icon sits relative to the label (default "left") (requires `icon`)'},{key:"tooltip",value:{name:"string",required:!1},description:`Shown in an IPS Tooltip on mouse hover (also on disabled buttons).
Hover only — a disabled button is not keyboard-focusable.
Positioned above the button, so it is clipped by an ancestor with overflow:hidden.`}]}}],raw:"ActionItem[]"},description:"Buttons on the left side (typically cancel / secondary actions)",defaultValue:{value:"[]",computed:!1}},rightActions:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  /** Optional icon (leading unless iconPosition="right") */
  icon?: IconName;
  /** Where the icon sits relative to the label (default "left") (requires \`icon\`) */
  iconPosition?: "left" | "right";
  /**
   * Shown in an IPS Tooltip on mouse hover (also on disabled buttons).
   * Hover only — a disabled button is not keyboard-focusable.
   * Positioned above the button, so it is clipped by an ancestor with overflow:hidden.
   */
  tooltip?: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"variant",value:{name:"union",raw:'"primary" | "secondary"',elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"secondary"'}],required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"union",raw:`| "activity-feed" | "add" | "admin" | "ai"
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
| "table" | "tag" | "tag-roles" | "undo" | "unseen" | "up" | "user-filled"
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
| "palm-tree" | "paper-clip" | "paper-plane" | "propilot" | "path" | "pen"
| "person-minus" | "pf-logo" | "phone" | "plane" | "play" | "postpone"
| "preferences" | "profile-field" | "profiles"
| "refresh-clean" | "refresh-warning" | "remove-all"
| "role-audit" | "rollforward" | "save-add" | "save-remove"
| "sector" | "segment" | "skype" | "skype-for-business" | "snooze"
| "soft-exception" | "split2"
| "substitute-child" | "substitute-parent"
| "target-allocation" | "task" | "teams" | "twitter" | "unpin"
| "user-interest" | "web" | "wine-glass" | "work"`,elements:[{name:"literal",value:'"activity-feed"'},{name:"literal",value:'"add"'},{name:"literal",value:'"admin"'},{name:"literal",value:'"ai"'},{name:"literal",value:'"arrow-down"'},{name:"literal",value:'"arrow-left"'},{name:"literal",value:'"arrow-right"'},{name:"literal",value:'"arrow-up"'},{name:"literal",value:'"audit-planner"'},{name:"literal",value:'"booking"'},{name:"literal",value:'"calendar"'},{name:"literal",value:'"caret-down"'},{name:"literal",value:'"caret-left"'},{name:"literal",value:'"caret-right"'},{name:"literal",value:'"caret-up"'},{name:"literal",value:'"chat"'},{name:"literal",value:'"check"'},{name:"literal",value:'"chevron-down"'},{name:"literal",value:'"chevron-left"'},{name:"literal",value:'"chevron-right"'},{name:"literal",value:'"chevron-up"'},{name:"literal",value:'"cross"'},{name:"literal",value:'"down"'},{name:"literal",value:'"edit"'},{name:"literal",value:'"engagement"'},{name:"literal",value:'"error"'},{name:"literal",value:'"core"'},{name:"literal",value:'"development"'},{name:"literal",value:'"forbidden"'},{name:"literal",value:'"help"'},{name:"literal",value:'"hidden"'},{name:"literal",value:'"history"'},{name:"literal",value:'"hourglass-half"'},{name:"literal",value:'"info"'},{name:"literal",value:'"insights"'},{name:"literal",value:'"learning"'},{name:"literal",value:'"link"'},{name:"literal",value:'"substitute-parent-child"'},{name:"literal",value:'"links"'},{name:"literal",value:'"list"'},{name:"literal",value:'"location"'},{name:"literal",value:'"locked"'},{name:"literal",value:'"logout"'},{name:"literal",value:'"mail"'},{name:"literal",value:'"mandatory"'},{name:"literal",value:'"marketplace"'},{name:"literal",value:'"menu-horizontal"'},{name:"literal",value:'"menu-vertical"'},{name:"literal",value:'"merge"'},{name:"literal",value:'"missing"'},{name:"literal",value:'"money"'},{name:"literal",value:'"move"'},{name:"literal",value:'"note"'},{name:"literal",value:'"notifications"'},{name:"literal",value:'"open"'},{name:"literal",value:'"pin"'},{name:"literal",value:'"profile"'},{name:"literal",value:'"question"'},{name:"literal",value:'"reassign"'},{name:"literal",value:'"refresh"'},{name:"literal",value:'"remove"'},{name:"literal",value:'"reports"'},{name:"literal",value:'"role"'},{name:"literal",value:'"save"'},{name:"literal",value:'"search"'},{name:"literal",value:'"share"'},{name:"literal",value:'"shown"'},{name:"literal",value:'"skills-framework"'},{name:"literal",value:'"smart-allocation"'},{name:"literal",value:'"sort"'},{name:"literal",value:'"split"'},{name:"literal",value:'"subtract"'},{name:"literal",value:'"table"'},{name:"literal",value:'"tag"'},{name:"literal",value:'"tag-roles"'},{name:"literal",value:'"undo"'},{name:"literal",value:'"unseen"'},{name:"literal",value:'"up"'},{name:"literal",value:'"user-filled"'},{name:"literal",value:'"verified"'},{name:"literal",value:'"verified-credly"'},{name:"literal",value:'"verified-others"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"workflow"'},{name:"literal",value:'"zoom-in"'},{name:"literal",value:'"zoom-out"'},{name:"literal",value:'"heart"'},{name:"literal",value:'"placeholder-profile"'},{name:"literal",value:'"suggested"'},{name:"literal",value:'"timeline"'},{name:"literal",value:'"filter"'},{name:"literal",value:'"filter-clean"'},{name:"literal",value:'"home"'},{name:"literal",value:'"add-profile"'},{name:"literal",value:'"ai-agent"'},{name:"literal",value:'"arrow-2-directions"'},{name:"literal",value:'"arrow-2-directions-vertical"'},{name:"literal",value:'"arrow-4-directions"'},{name:"literal",value:'"availability"'},{name:"literal",value:'"baby"'},{name:"literal",value:'"bag"'},{name:"literal",value:'"bell"'},{name:"literal",value:'"book"'},{name:"literal",value:'"bubbles"'},{name:"literal",value:'"bug"'},{name:"literal",value:'"bulk"'},{name:"literal",value:'"bulk-move"'},{name:"literal",value:'"calendar-clash"'},{name:"literal",value:'"calendar-delete"'},{name:"literal",value:'"calendar-misaligned"'},{name:"literal",value:'"car"'},{name:"literal",value:'"certificate"'},{name:"literal",value:'"clock"'},{name:"literal",value:'"close-role"'},{name:"literal",value:'"collapse"'},{name:"literal",value:'"compare"'},{name:"literal",value:'"copy"'},{name:"literal",value:'"cost"'},{name:"literal",value:'"created"'},{name:"literal",value:'"department"'},{name:"literal",value:'"dot"'},{name:"literal",value:'"dot-big"'},{name:"literal",value:'"duplicate"'},{name:"literal",value:'"engagement-audit"'},{name:"literal",value:'"expand"'},{name:"literal",value:'"expand-all"'},{name:"literal",value:'"expanded-all"'},{name:"literal",value:'"export"'},{name:"literal",value:'"extend"'},{name:"literal",value:'"face-smile"'},{name:"literal",value:'"facebook"'},{name:"literal",value:'"filter-applied"'},{name:"literal",value:'"filter2"'},{name:"literal",value:'"fire"'},{name:"literal",value:'"flower-spa"'},{name:"literal",value:'"folder"'},{name:"literal",value:'"ghost"'},{name:"literal",value:'"head-heart"'},{name:"literal",value:'"heatmap"'},{name:"literal",value:'"hierarchical"'},{name:"literal",value:'"hourglass-empty"'},{name:"literal",value:'"house-laptop"'},{name:"literal",value:'"house-user"'},{name:"literal",value:'"import"'},{name:"literal",value:'"industry"'},{name:"literal",value:'"instagram"'},{name:"literal",value:'"key"'},{name:"literal",value:'"keyboard"'},{name:"literal",value:'"linkedin"'},{name:"literal",value:'"manage-roles"'},{name:"literal",value:'"mobile"'},{name:"literal",value:'"mouse-cursor"'},{name:"literal",value:'"non-demand"'},{name:"literal",value:'"overbooking"'},{name:"literal",value:'"overbooking-acknowledged"'},{name:"literal",value:'"owner"'},{name:"literal",value:'"palm-tree"'},{name:"literal",value:'"paper-clip"'},{name:"literal",value:'"paper-plane"'},{name:"literal",value:'"propilot"'},{name:"literal",value:'"path"'},{name:"literal",value:'"pen"'},{name:"literal",value:'"person-minus"'},{name:"literal",value:'"pf-logo"'},{name:"literal",value:'"phone"'},{name:"literal",value:'"plane"'},{name:"literal",value:'"play"'},{name:"literal",value:'"postpone"'},{name:"literal",value:'"preferences"'},{name:"literal",value:'"profile-field"'},{name:"literal",value:'"profiles"'},{name:"literal",value:'"refresh-clean"'},{name:"literal",value:'"refresh-warning"'},{name:"literal",value:'"remove-all"'},{name:"literal",value:'"role-audit"'},{name:"literal",value:'"rollforward"'},{name:"literal",value:'"save-add"'},{name:"literal",value:'"save-remove"'},{name:"literal",value:'"sector"'},{name:"literal",value:'"segment"'},{name:"literal",value:'"skype"'},{name:"literal",value:'"skype-for-business"'},{name:"literal",value:'"snooze"'},{name:"literal",value:'"soft-exception"'},{name:"literal",value:'"split2"'},{name:"literal",value:'"substitute-child"'},{name:"literal",value:'"substitute-parent"'},{name:"literal",value:'"target-allocation"'},{name:"literal",value:'"task"'},{name:"literal",value:'"teams"'},{name:"literal",value:'"twitter"'},{name:"literal",value:'"unpin"'},{name:"literal",value:'"user-interest"'},{name:"literal",value:'"web"'},{name:"literal",value:'"wine-glass"'},{name:"literal",value:'"work"'}],required:!1},description:'Optional icon (leading unless iconPosition="right")'},{key:"iconPosition",value:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}],required:!1},description:'Where the icon sits relative to the label (default "left") (requires `icon`)'},{key:"tooltip",value:{name:"string",required:!1},description:`Shown in an IPS Tooltip on mouse hover (also on disabled buttons).
Hover only — a disabled button is not keyboard-focusable.
Positioned above the button, so it is clipped by an ancestor with overflow:hidden.`}]}}],raw:"ActionItem[]"},description:"Buttons on the right side (typically save / primary actions)",defaultValue:{value:"[]",computed:!1}},insetX:{required:!1,tsType:{name:"number"},description:"sticky-screen only: drop the 1280px max width and use this horizontal padding (px) — aligns the bar with the page padding"},leftContent:{required:!1,tsType:{name:"ReactNode"},description:"Extra content on the left, after leftActions (e.g. a ButtonGroup)"},rightContent:{required:!1,tsType:{name:"ReactNode"},description:"Extra content on the right, after rightActions (e.g. a split ButtonGroup)"},infoText:{required:!1,tsType:{name:"string"},description:'Muted text shown on the right, before the right-hand buttons (e.g. "2 engagements · 12 roles")'},className:{required:!1,tsType:{name:"string"},description:""}}};export{T as A};
