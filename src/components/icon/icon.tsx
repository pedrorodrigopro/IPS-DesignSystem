// Icon component — Figma node 2976:181531
// SVGs sourced directly from Figma. Default colour: #0D2976 (fill_44CA0Q).
// Some icons have semantic colours baked in (e.g. verified=green, overbooking=amber).

import { SVGProps } from "react";
import ActivityFeed from "./svg/activity-feed.svg";
import Add from "./svg/add.svg";
import Admin from "./svg/admin.svg";
import Ai from "./svg/ai.svg";
import ArrowDown from "./svg/arrow-down.svg";
import ArrowLeft from "./svg/arrow-left.svg";
import ArrowRight from "./svg/arrow-right.svg";
import ArrowUp from "./svg/arrow-up.svg";
import AuditPlanner from "./svg/audit-planner.svg";
import Booking from "./svg/booking.svg";
import Calendar from "./svg/calendar.svg";
import CaretDown from "./svg/caret-down.svg";
import CaretLeft from "./svg/caret-left.svg";
import CaretRight from "./svg/caret-right.svg";
import CaretUp from "./svg/caret-up.svg";
import Check from "./svg/check.svg";
import Chat from "./svg/chat.svg";
import ChevronDown from "./svg/chevron-down.svg";
import ChevronLeft from "./svg/chevron-left.svg";
import ChevronRight from "./svg/chevron-right.svg";
import ChevronUp from "./svg/chevron-up.svg";
import Cross from "./svg/cross.svg";
import Down from "./svg/down.svg";
import Edit from "./svg/edit.svg";
import Engagement from "./svg/engagement.svg";
import ErrorIcon from "./svg/error.svg";
import Forbidden from "./svg/forbidden.svg";
import HourglassHalf from "./svg/hourglass-half.svg";
import Mandatory from "./svg/mandatory.svg";
import Help from "./svg/help.svg";
import Hidden from "./svg/hidden.svg";
import History from "./svg/history.svg";
import Info from "./svg/info.svg";
import Insights from "./svg/insights.svg";
import Link from "./svg/link.svg";
import Links from "./svg/links.svg";
import List from "./svg/list.svg";
import Location from "./svg/location.svg";
import Locked from "./svg/locked.svg";
import Logout from "./svg/logout.svg";
import Mail from "./svg/mail.svg";
import Marketplace from "./svg/marketplace.svg";
import MenuHorizontal from "./svg/menu-horizontal.svg";
import MenuVertical from "./svg/menu-vertical.svg";
import Merge from "./svg/merge.svg";
import Missing from "./svg/missing.svg";
import Money from "./svg/money.svg";
import Move from "./svg/move.svg";
import Note from "./svg/note.svg";
import Notifications from "./svg/notifications.svg";
import Open from "./svg/open.svg";
import Pin from "./svg/pin.svg";
import Profile from "./svg/profile.svg";
import Question from "./svg/question.svg";
import Reassign from "./svg/reassign.svg";
import Refresh from "./svg/refresh.svg";
import Remove from "./svg/remove.svg";
import Reports from "./svg/reports.svg";
import Role from "./svg/role.svg";
import Save from "./svg/save.svg";
import Search from "./svg/search.svg";
import Share from "./svg/share.svg";
import Shown from "./svg/shown.svg";
import SkillsFramework from "./svg/skills-framework.svg";
import SmartAllocation from "./svg/smart-allocation.svg";
import Sort from "./svg/sort.svg";
import Split from "./svg/split.svg";
import Subtract from "./svg/subtract.svg";
import Table from "./svg/table.svg";
import Tag from "./svg/tag.svg";
import Undo from "./svg/undo.svg";
import Unseen from "./svg/unseen.svg";
import Up from "./svg/up.svg";
import UserFilled from "./svg/user-filled.svg";
import Verified from "./svg/verified.svg";
import Warning from "./svg/warning.svg";
import Workflow from "./svg/workflow.svg";
import ZoomIn from "./svg/zoom-in.svg";
import ZoomOut from "./svg/zoom-out.svg";

export type IconName =
  | "activity-feed" | "add" | "admin" | "ai"
  | "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up"
  | "audit-planner" | "booking" | "calendar"
  | "caret-down" | "caret-left" | "caret-right" | "caret-up"
  | "chat" | "check" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up"
  | "cross" | "down" | "edit" | "engagement" | "error"
  | "forbidden"
  | "help" | "hidden" | "history" | "hourglass-half" | "info" | "insights"
  | "link" | "links" | "list" | "location" | "locked" | "logout"
  | "mail" | "mandatory" | "marketplace" | "menu-horizontal" | "menu-vertical"
  | "merge" | "missing" | "money" | "move"
  | "note" | "notifications" | "open" | "pin" | "profile"
  | "question" | "reassign" | "refresh" | "remove" | "reports" | "role"
  | "save" | "search" | "share" | "shown" | "skills-framework"
  | "smart-allocation" | "sort" | "split" | "subtract"
  | "table" | "tag" | "undo" | "unseen" | "up" | "user-filled"
  | "verified" | "warning" | "workflow" | "zoom-in" | "zoom-out";

export type IconSize = 16 | 20 | 24;

export type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: IconSize;
  className?: string;
};

type SvgComponent = React.FC<SVGProps<SVGSVGElement>>;

const iconMap: Record<IconName, SvgComponent> = {
  "activity-feed": ActivityFeed,
  "add": Add,
  "admin": Admin,
  "ai": Ai,
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "audit-planner": AuditPlanner,
  "booking": Booking,
  "calendar": Calendar,
  "caret-down": CaretDown,
  "caret-left": CaretLeft,
  "caret-right": CaretRight,
  "caret-up": CaretUp,
  "chat": Chat,
  "check": Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "cross": Cross,
  "down": Down,
  "edit": Edit,
  "engagement": Engagement,
  "error": ErrorIcon,
  "forbidden": Forbidden,
  "help": Help,
  "hourglass-half": HourglassHalf,
  "hidden": Hidden,
  "history": History,
  "info": Info,
  "insights": Insights,
  "link": Link,
  "links": Links,
  "list": List,
  "location": Location,
  "locked": Locked,
  "logout": Logout,
  "mail": Mail,
  "mandatory": Mandatory,
  "marketplace": Marketplace,
  "menu-horizontal": MenuHorizontal,
  "menu-vertical": MenuVertical,
  "merge": Merge,
  "missing": Missing,
  "money": Money,
  "move": Move,
  "note": Note,
  "notifications": Notifications,
  "open": Open,
  "pin": Pin,
  "profile": Profile,
  "question": Question,
  "reassign": Reassign,
  "refresh": Refresh,
  "remove": Remove,
  "reports": Reports,
  "role": Role,
  "save": Save,
  "search": Search,
  "share": Share,
  "shown": Shown,
  "skills-framework": SkillsFramework,
  "smart-allocation": SmartAllocation,
  "sort": Sort,
  "split": Split,
  "subtract": Subtract,
  "table": Table,
  "tag": Tag,
  "undo": Undo,
  "unseen": Unseen,
  "up": Up,
  "user-filled": UserFilled,
  "verified": Verified,
  "warning": Warning,
  "workflow": Workflow,
  "zoom-in": ZoomIn,
  "zoom-out": ZoomOut,
};

export const Icon = ({ name, size = 20, className, style, ...rest }: IconProps) => {
  const SvgComponent = iconMap[name];

  if (!SvgComponent) {
    return null;
  }

  return (
    <SvgComponent
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
      {...rest}
    />
  );
};
