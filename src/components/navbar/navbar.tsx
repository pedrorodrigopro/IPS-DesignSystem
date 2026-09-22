// Navbar — Figma node 1420:19785 (Environment=ProFinda)
// Nav item states from node 1409:18601 (.Nav item):
//   Default:  icon, no bg
//   Hover:    35×35px circle filled #0C1457 (--palette-blue-1), tooltip to the right
//   Selected: 35×35px circle filled #0C1457, white pill selector on left edge of navbar
//   Focus:    circle, focus ring: 0 0 0 4px white, 0 0 0 2px #0C1457
// Logo from node 5:580 (Logo/Small): real ProFinda SVG, #00A0EA bg, white P
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
  activeId?: string;
  onSelect?: (id: string) => void;
  avatarInitials?: string;
  avatarSrc?: string;
  className?: string;
};

const ACTION_ITEMS: NavItem[] = [
  { id: "search",  icon: "search", label: "Search" },
  { id: "create",  icon: "add",    label: "Create"  },
];

const SECTION_ITEMS: NavItem[] = [
  { id: "marketplace",   icon: "marketplace",   label: "Marketplace"   },
  { id: "workflow",      icon: "workflow",       label: "Workflow"      },
  { id: "audit-planner", icon: "audit-planner",  label: "Audit Planner" },
  { id: "insights",      icon: "insights",       label: "Insights"      },
  { id: "reports",       icon: "reports",        label: "Reports"       },
  { id: "activity-feed", icon: "activity-feed",  label: "Activity Feed" },
  { id: "profiles",      icon: "profile",        label: "Profiles"      },
  { id: "booking",       icon: "booking",        label: "Booking"       },
];

const OPTION_ITEMS: NavItem[] = [
  { id: "notifications", icon: "notifications", label: "Notifications" },
  { id: "links",         icon: "links",          label: "Links"         },
  { id: "admin",         icon: "admin",          label: "Admin"         },
  { id: "chat",          icon: "chat",           label: "Chat"          },
  { id: "help",          icon: "help",           label: "Help"          },
];

// ProFinda logo SVG — node 5:580 (Logo/Small)
// #00A0EA background, white "P" path, radius 6px
const PfLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ProFinda" role="img">
    <g clipPath="url(#pf-clip)">
      <path d="M30.1712 0H9.82882C4.40051 0 0 4.40051 0 9.82882V30.1712C0 35.5995 4.40051 40 9.82882 40H30.1712C35.5995 40 40 35.5995 40 30.1712V9.82882C40 4.40051 35.5995 0 30.1712 0Z" fill="#00A0EA"/>
      <path d="M22.6379 10.1624C23.6354 10.1409 24.627 10.3195 25.5549 10.6877C26.4831 11.0561 27.3296 11.6069 28.0432 12.3079C28.7567 13.0087 29.3239 13.8457 29.7112 14.7698C30.0985 15.6941 30.2981 16.6877 30.2981 17.6907C30.298 18.6935 30.0984 19.6864 29.7112 20.6106C29.3239 21.5347 28.7567 22.3716 28.0432 23.0725C27.3296 23.7735 26.4831 24.3242 25.5549 24.6926C24.627 25.0609 23.6354 25.2394 22.6379 25.218H13.3069L13.175 26.0647L12.2815 31.8245H10.7874L13.1174 16.9456H22.1858C22.3861 16.9456 22.5791 17.025 22.7219 17.1682C22.8649 17.3117 22.9456 17.5077 22.9456 17.7122C22.9455 17.9165 22.8648 18.1117 22.7219 18.2551C22.5791 18.3984 22.3862 18.4778 22.1858 18.4778H14.3694L14.2356 19.3215L13.7229 22.5559L13.5403 23.7131H22.6086V23.7122C23.399 23.7306 24.1855 23.5931 24.9221 23.3049C25.6676 23.0133 26.3469 22.5743 26.9202 22.0149C27.4934 21.4555 27.9491 20.7867 28.26 20.0481C28.5709 19.3095 28.7307 18.5157 28.7307 17.7141C28.7307 16.9126 28.5708 16.1187 28.26 15.3801C27.9491 14.6414 27.4934 13.9718 26.9202 13.4124C26.347 12.8531 25.6674 12.4149 24.9221 12.1233C24.1767 11.8317 23.3802 11.6926 22.5803 11.7151H13.9426L14.1604 10.1624H22.6379Z" fill="white" stroke="white" strokeWidth="2"/>
    </g>
    <defs>
      <clipPath id="pf-clip">
        <rect width="40" height="40" rx="6" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

type NavButtonProps = {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
};

const NavButton = ({ item, isActive, onClick }: NavButtonProps) => (
  <div className={css.navItemWrapper}>
    <button
      type="button"
      className={classNames(css.navBtn, { [css.active]: isActive })}
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon name={item.icon} size={20} className={css.navIcon} />
    </button>
    {/* Tooltip — shown on hover via CSS, positioned to the right */}
    <span className={css.tooltip} aria-hidden="true">{item.label}</span>
  </div>
);

export const Navbar = ({
  activeId,
  onSelect,
  avatarInitials = "CP",
  avatarSrc,
  className,
}: NavbarProps) => (
  <nav className={classNames(css.navbar, className)} aria-label="Main navigation">
    <div className={css.top}>
      <div className={css.logo}>
        <PfLogo />
      </div>

      <div className={css.group}>
        {ACTION_ITEMS.map((item) => (
          <NavButton key={item.id} item={item} isActive={activeId === item.id} onClick={() => onSelect?.(item.id)} />
        ))}
      </div>

      <div className={css.divider} aria-hidden="true" />

      <div className={css.group}>
        {SECTION_ITEMS.map((item) => (
          <NavButton key={item.id} item={item} isActive={activeId === item.id} onClick={() => onSelect?.(item.id)} />
        ))}
      </div>
    </div>

    <div className={css.bottom}>
      <div className={css.divider} aria-hidden="true" />

      <div className={css.group}>
        {OPTION_ITEMS.map((item) => (
          <NavButton key={item.id} item={item} isActive={activeId === item.id} onClick={() => onSelect?.(item.id)} />
        ))}
      </div>

      {/* Profile — Avatar */}
      <div className={css.navItemWrapper}>
        <button
          type="button"
          className={classNames(css.navBtn, css.avatarBtn, { [css.active]: activeId === "profile" })}
          onClick={() => onSelect?.("profile")}
          aria-label="Profile"
        >
          <Avatar size="small" initials={avatarInitials} src={avatarSrc} />
        </button>
        <span className={css.tooltip} aria-hidden="true">Profile</span>
      </div>
    </div>
  </nav>
);
