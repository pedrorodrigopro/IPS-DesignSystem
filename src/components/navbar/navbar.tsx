// Navbar — Figma node 1420:19785 (Environment=ProFinda)
//
// Container: 60×1091px, #0C1457 bg, border-radius 0 16px 16px 0
//            column, justify-content space-between, padding 24px 0 40px
//
// Top:    Logo (40×40px, radius 6px) → Actions (Search, Create) → Divider → Sections
// Bottom: Divider → Options → Avatar (Profile)
//
// Nav item: 30×30px, white icon, hover rgba(255,255,255,0.08), selected: left pill indicator
import classNames from "classnames";
import { Avatar } from "../avatar/avatar";
import { Icon, IconName } from "../icon/icon";
import css from "./navbar.module.scss";

export type NavItem = {
  id: string;
  icon: IconName;
  label: string;
};

export type NavbarProps = {
  /** Currently active item id */
  activeId?: string;
  onSelect?: (id: string) => void;
  /** Avatar initials for the profile item */
  avatarInitials?: string;
  avatarSrc?: string;
  className?: string;
};

// Fixed nav items matching Figma component (Environment=ProFinda)
const ACTION_ITEMS: NavItem[] = [
  { id: "search",  icon: "search", label: "Search" },
  { id: "create",  icon: "add",    label: "Create" },
];

const SECTION_ITEMS: NavItem[] = [
  { id: "marketplace",   icon: "marketplace",   label: "Marketplace" },
  { id: "workflow",      icon: "workflow",       label: "Workflow" },
  { id: "audit-planner", icon: "audit-planner",  label: "Audit Planner" },
  { id: "insights",      icon: "insights",       label: "Insights" },
  { id: "activity-feed", icon: "activity-feed",  label: "Activity Feed" },
  { id: "profiles",      icon: "profile",        label: "Profiles" },
  { id: "booking",       icon: "booking",        label: "Booking" },
];

const OPTION_ITEMS: NavItem[] = [
  { id: "notifications", icon: "notifications", label: "Notifications" },
  { id: "help",          icon: "help",           label: "Help" },
  { id: "chat",          icon: "chat",           label: "Chat" },
  { id: "links",         icon: "links",          label: "Links" },
  { id: "admin",         icon: "admin",          label: "Admin" },
];

type NavButtonProps = {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
};

const NavButton = ({ item, isActive, onClick }: NavButtonProps) => (
  <button
    type="button"
    className={classNames(css.navBtn, { [css.active]: isActive })}
    onClick={onClick}
    aria-label={item.label}
    aria-current={isActive ? "page" : undefined}
    title={item.label}
  >
    {isActive && <span className={css.selector} aria-hidden="true" />}
    <Icon name={item.icon} size={20} className={css.navIcon} />
  </button>
);

export const Navbar = ({
  activeId,
  onSelect,
  avatarInitials = "CP",
  avatarSrc,
  className,
}: NavbarProps) => (
  <nav className={classNames(css.navbar, className)} aria-label="Main navigation">
    {/* Top */}
    <div className={css.top}>
      {/* Logo */}
      <div className={css.logo} aria-label="ProFinda">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <rect width="40" height="40" rx="6" fill="url(#pf-grad)" />
          <path d="M12 20C12 15.6 15.6 12 20 12C24.4 12 28 15.6 28 20C28 24.4 24.4 28 20 28" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <circle cx="20" cy="20" r="3" fill="white" />
          <defs>
            <linearGradient id="pf-grad" x1="0" y1="20" x2="40" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00A0EA" />
              <stop offset="1" stopColor="#01328A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Actions: Search, Create */}
      <div className={css.group}>
        {ACTION_ITEMS.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onClick={() => onSelect?.(item.id)}
          />
        ))}
      </div>

      {/* Divider */}
      <div className={css.divider} aria-hidden="true" />

      {/* Sections */}
      <div className={css.group}>
        {SECTION_ITEMS.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onClick={() => onSelect?.(item.id)}
          />
        ))}
      </div>
    </div>

    {/* Bottom */}
    <div className={css.bottom}>
      {/* Divider */}
      <div className={css.divider} aria-hidden="true" />

      {/* Options */}
      <div className={css.group}>
        {OPTION_ITEMS.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onClick={() => onSelect?.(item.id)}
          />
        ))}
      </div>

      {/* Profile Avatar */}
      <button
        type="button"
        className={classNames(css.navBtn, css.avatarBtn, { [css.active]: activeId === "profile" })}
        onClick={() => onSelect?.("profile")}
        aria-label="Profile"
        title="Profile"
      >
        {activeId === "profile" && <span className={css.selector} aria-hidden="true" />}
        <Avatar size="small" initials={avatarInitials} src={avatarSrc} />
      </button>
    </div>
  </nav>
);
