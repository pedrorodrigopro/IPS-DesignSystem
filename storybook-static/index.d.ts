import { default as default_2 } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { JSX } from 'react';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';
import { SVGProps } from 'react';

export declare const Accordion: ({ title, size, children, defaultExpanded, className, }: AccordionProps) => JSX.Element;

export declare type AccordionProps = {
    title: string;
    size?: AccordionSize;
    children?: ReactNode;
    defaultExpanded?: boolean;
    className?: string;
};

export declare type AccordionSize = "body" | "heading5" | "heading4";

export declare type ActionItem = {
    label: string;
    variant?: "primary" | "secondary";
    onClick?: () => void;
    disabled?: boolean;
};

export declare function Actions({ variant, leftActions, rightActions, className, }: ActionsProps): default_2.JSX.Element;

export declare type ActionsProps = {
    variant?: ActionsVariant;
    /** Buttons on the left side (typically cancel / secondary actions) */
    leftActions?: ActionItem[];
    /** Buttons on the right side (typically save / primary actions) */
    rightActions?: ActionItem[];
    className?: string;
};

export declare type ActionsVariant = "content" | "sticky-screen" | "sticky-panel";

export declare const Alert: ({ type, layout, message, body, actions, className, }: AlertProps) => JSX.Element;

export declare type AlertAction = {
    label: string;
    onClick: () => void;
};

export declare type AlertLayout = "inline" | "with-header";

export declare type AlertProps = {
    type?: AlertType;
    layout?: AlertLayout;
    /** Inline: message text. With-header: bold title. */
    message: string;
    /** Body paragraph — only rendered when layout="with-header" */
    body?: string;
    /** Up to 2 action buttons (Ghost style). Optional in both layouts. */
    actions?: [AlertAction?, AlertAction?];
    className?: string;
};

export declare type AlertType = "error" | "warning" | "success" | "general" | "ai" | "bulk-banner";

export declare type AppliedFilter = {
    id: string;
    /** Field / category name — shown in small text above the value */
    field: string;
    /** Selected value — shown in bold below the field name */
    value: string;
};

export declare const Avatar: ({ src, initials, alt, size, showChat, className, }: AvatarProps) => JSX.Element;

export declare type AvatarProps = {
    /** Display photo — Icon=Photo variant */
    src?: string;
    /** Initials shown when no src — Icon=Text variant (e.g. "CP") */
    initials?: string;
    /** Alt text for the photo */
    alt?: string;
    size?: AvatarSize;
    /** Show chat bubble badge (Chat=True) */
    showChat?: boolean;
    className?: string;
};

export declare type AvatarSize = "small" | "big";

export declare type BookingCategoryData = {
    name?: string;
    displayAs?: string;
    billable?: boolean;
    affectsAvail?: boolean;
    isHoliday?: boolean;
    isAbsence?: boolean;
    isTraining?: boolean;
    requiresApproval?: string;
    color?: string;
};

export declare type BookingCategoryItem = {
    id: string;
    label: string;
    color: string;
};

export declare function BookingCategorySidePanel({ open, onClose, onSave, data }: BookingCategorySidePanelProps): default_2.JSX.Element;

export declare type BookingCategorySidePanelProps = {
    open: boolean;
    onClose: () => void;
    onSave?: (data: BookingCategoryData) => void;
    data?: BookingCategoryData;
};

export declare function BookingCell({ value, category, readOnly, deadline, onChange, className, }: BookingCellProps): default_2.JSX.Element;

export declare type BookingCellCategory = "blue" | "red" | "purple" | "empty";

export declare type BookingCellProps = {
    /** Numeric value displayed in the cell */
    value: number | null;
    /** Category dot colour */
    category?: BookingCellCategory;
    /** Whether cell is read-only (engagement aggregate row — no editing) */
    readOnly?: boolean;
    /** Show red deadline marker at bottom */
    deadline?: boolean;
    /** Called when value changes */
    onChange?: (value: number) => void;
    className?: string;
};

export declare type BookingCellState = "default" | "read-only";

export declare function BookingPill({ category, label, hours, nonDemand, otherBookings, size, className, onClick, }: BookingPillProps): default_2.JSX.Element;

export declare type BookingPillCategory = "booking-blue" | "booking-red" | "booking-purple" | "engagement-booked" | "engagement-partial" | "role-booked" | "role-partial" | "pending" | "hidden";

export declare type BookingPillProps = {
    category: BookingPillCategory;
    /** Main label — role / booking category name */
    label: string;
    /** Hours text — only shown in regular size (Row 2) */
    hours?: string;
    /** Show non-demand icon (palm-tree) before label */
    nonDemand?: boolean;
    /** Show other-bookings icon (shown) before label */
    otherBookings?: boolean;
    size?: BookingPillSize;
    /** Additional CSS classes */
    className?: string;
    onClick?: () => void;
};

export declare type BookingPillSize = "regular" | "small";

export declare function BookingSidePanel({ open, onClose, tab, data }: BookingSidePanelProps): default_2.JSX.Element;

export declare type BookingSidePanelData = {
    wmName?: string;
    wmInitials?: string;
    roleName?: string;
    engagementName?: string;
    duration?: string;
    totalHours?: string;
    bookingCategory?: string;
    description?: string;
    title?: string;
    totalRules?: number;
    notes?: {
        author: string;
        date: string;
        text: string;
    }[];
    history?: {
        actor: string;
        actorInitials: string;
        date: string;
        action: string;
        detail?: string;
    }[];
    onEdit?: () => void;
    onClone?: () => void;
    onReassign?: () => void;
    onRemove?: () => void;
    onSave?: () => void;
};

export declare type BookingSidePanelProps = {
    open: boolean;
    onClose: () => void;
    tab?: BookingTab;
    data?: BookingSidePanelData;
};

export declare function BookingSlideshow({ tab: tabProp, onTabChange, rules, showVisible, showPhase, phase, showDateCreated, dateCreated, category, title, description, notes, history, hidden, notesCount, width, }: BookingSlideshowProps): default_2.JSX.Element;

export declare type BookingSlideshowHistoryAction = {
    type: "simple";
    actor: string;
    initials: string;
    date: string;
    action: string;
} | {
    type: "single";
    actor: string;
    initials: string;
    date: string;
    field: string;
    from: string;
    to: string;
} | {
    type: "multiple";
    actor: string;
    initials: string;
    date: string;
    fields: {
        name: string;
        from: string;
        to: string;
    }[];
};

export declare type BookingSlideshowNote = {
    author: string;
    initials: string;
    date: string;
    text: string;
};

export declare type BookingSlideshowProps = {
    /** Currently active tab */
    tab?: BookingSlideshowTab;
    /** Called when tab changes */
    onTabChange?: (tab: BookingSlideshowTab) => void;
    /** Availability rules — each is one slide in the carousel */
    rules?: BookingSlideshowRule[];
    /** Whether to show the "Show" link in the carousel header */
    showVisible?: boolean;
    /** Show the Phase input (Figma: conditional) */
    showPhase?: boolean;
    /** Phase value */
    phase?: string;
    /** Show Date created read-only field */
    showDateCreated?: boolean;
    /** Date created value (read-only) */
    dateCreated?: string;
    /** Selected booking category label */
    category?: string;
    /** Booking title */
    title?: string;
    /** Booking description */
    description?: string;
    /** Notes list */
    notes?: BookingSlideshowNote[];
    /** History items */
    history?: BookingSlideshowHistoryAction[];
    /** When true shows the locked / no-permission overlay */
    hidden?: boolean;
    /** Badge count on the Notes tab */
    notesCount?: number;
    /** Component width (default 352px per Figma) */
    width?: number | string;
};

/** One availability rule — maps to a CarouselCard slide */
export declare type BookingSlideshowRule = {
    startDate: string;
    endDate: string;
    /** Optional value displayed in the hours/load input */
    value?: string;
};

export declare type BookingSlideshowTab = "details" | "notes" | "history";

export declare type BookingTab = "details" | "notes" | "history" | "edit" | "create-demand" | "create-single" | "create-repeated" | "edit-repeated" | "edit-hidden" | "edit-not-editable";

export declare type BreadcrumbItem = {
    label: string;
    href?: string;
    onClick?: () => void;
};

export declare const Breadcrumbs: ({ items, className }: BreadcrumbsProps) => JSX.Element;

export declare type BreadcrumbsProps = {
    items: BreadcrumbItem[];
    className?: string;
};

export declare const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;

export declare function ButtonGroup({ label, variant, onClick, onDropdownClick, disabled, fill, className, }: ButtonGroupProps): default_2.JSX.Element;

export declare type ButtonGroupProps = {
    /** Main button label */
    label: string;
    variant?: ButtonGroupVariant;
    /** Main button click handler */
    onClick?: () => void;
    /** Chevron/dropdown button click handler */
    onDropdownClick?: () => void;
    disabled?: boolean;
    /**
     * Fill mode — the group stretches to parent width, main button is flex:1,
     * padding reduced to fit narrow containers (e.g. 120px card action column).
     */
    fill?: boolean;
    className?: string;
};

export declare type ButtonGroupVariant = "primary" | "secondary";

export declare type ButtonKind = "primary" | "secondary" | "tertiary" | "destructive" | "ghost" | "inverted" | "link" | "icon" | "iconTertiary" | "iconGhost";

export declare type ButtonProps = {
    children?: React.ReactNode;
    text?: string;
    kind?: ButtonKind;
    size?: ButtonSize;
    disabled?: boolean;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    title?: string;
    id?: string;
    style?: React.CSSProperties;
};

export declare type ButtonSize = "regular" | "small";

export declare const Calendar: ({ type, value, rangeStart, rangeEnd, timeValue, onChange, onRangeChange, onTimeChange, className, }: CalendarProps) => JSX.Element;

export declare type CalendarProps = {
    type?: CalendarType;
    /** Controlled selected date (date type) */
    value?: Date | null;
    /** Controlled range (range type) */
    rangeStart?: Date | null;
    rangeEnd?: Date | null;
    /** Time value string "HH:MM" (date-time type) */
    timeValue?: string;
    onChange?: (date: Date) => void;
    onRangeChange?: (start: Date | null, end: Date | null) => void;
    onTimeChange?: (time: string) => void;
    className?: string;
};

export declare type CalendarType = "date" | "range" | "date-time";

export declare function Card({ variant, name, jobTitle, initials, avatarSrc, profileFlags, matchPercent, availabilityPercent, expanded: controlledExpanded, defaultExpanded, onExpandedChange, skillGroups, expandedSkillGroups, roleFields, actions, className, }: CardProps): default_2.JSX.Element;

export declare type CardActions = {
    step?: ResourcingStep;
    /** Primary CTA for directory: label shown on secondary button (default "Open CV") */
    secondaryLabel?: string;
    onShortlist?: () => void;
    onFillBook?: () => void;
    onFillBookDropdown?: () => void;
    onInvite?: () => void;
    onFill?: () => void;
    onApprove?: () => void;
    onReject?: () => void;
    /** Revert to previous step — shown as history icon button next to status badge */
    onRevert?: () => void;
    /** Directory: secondary action (Open CV) */
    onSecondary?: () => void;
};

export declare type CardProps = {
    variant?: CardVariant;
    name: string;
    jobTitle?: string;
    initials?: string;
    avatarSrc?: string;
    profileFlags?: ProfileIconFlags;
    matchPercent?: number;
    availabilityPercent?: number;
    expanded?: boolean;
    defaultExpanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    skillGroups?: SkillGroup[];
    expandedSkillGroups?: SkillGroup[];
    roleFields?: RoleField[];
    actions?: CardActions;
    className?: string;
};

export declare type CardVariant = "match" | "directory";

export declare const Checkbox: ({ label, subLabel, checked, indeterminate, disabled, layout, onChange, className, id, }: CheckboxProps) => JSX.Element;

export declare type CheckboxLayout = "horizontal" | "vertical";

export declare type CheckboxProps = {
    label?: string;
    subLabel?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    layout?: CheckboxLayout;
    onChange?: (checked: boolean) => void;
    className?: string;
    id?: string;
};

export declare type CustomValueType = "approved" | "awaiting" | "blocked" | "merged";

export declare const Divider: ({ orientation, type, margins, isHovered, className, style, onDragHandleMouseDown, onMouseEnter, onMouseLeave, }: DividerProps) => JSX.Element;

export declare type DividerOrientation = "horizontal" | "vertical";

export declare type DividerProps = {
    orientation?: DividerOrientation;
    type?: DividerType;
    /** Adds 16px padding (horizontal) or 8px padding (vertical) around the line */
    margins?: boolean;
    /** Hover state for draggable — turns line blue with resize cursor */
    isHovered?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onDragHandleMouseDown?: (e: React.MouseEvent) => void;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
};

export declare type DividerType = "default" | "draggable";

export declare const Dropdown: ({ children, className }: DropdownProps) => JSX.Element;

export declare const DropdownActions: ({ items, onSelect, className }: DropdownActionsProps) => JSX.Element;

export declare type DropdownActionsProps = {
    items: DropdownItem[];
    onSelect: (id: string) => void;
    className?: string;
};

export declare const DropdownBookingCategory: ({ items, selectedId, onSelect, className, }: DropdownBookingCategoryProps) => JSX.Element;

export declare type DropdownBookingCategoryProps = {
    items: BookingCategoryItem[];
    selectedId?: string;
    onSelect: (id: string) => void;
    className?: string;
};

export declare const DropdownIcons: ({ icons, selectedIcon, onSelect, className }: DropdownIconsProps) => JSX.Element;

export declare type DropdownIconsProps = {
    icons: IconName[];
    selectedIcon?: IconName;
    onSelect: (icon: IconName) => void;
    className?: string;
};

export declare type DropdownItem = {
    id: string;
    label: string;
    subLabel?: string;
};

export declare const DropdownMultiSelection: ({ items, selectedIds, onSelectionChange, searchable, className, }: DropdownMultiSelectionProps) => JSX.Element;

export declare type DropdownMultiSelectionProps = {
    items: DropdownItem[];
    selectedIds: string[];
    onSelectionChange: (ids: string[]) => void;
    searchable?: boolean;
    className?: string;
};

export declare type DropdownProps = {
    variant: DropdownVariant;
    children: ReactNode;
    className?: string;
};

export declare const DropdownSelection: ({ items, selectedId, onSelect, className }: DropdownSelectionProps) => JSX.Element;

export declare type DropdownSelectionProps = {
    items: DropdownItem[];
    selectedId?: string;
    onSelect: (id: string) => void;
    className?: string;
};

export declare const DropdownTypeahead: ({ results, onSelect, onSeeAll, className, }: DropdownTypeaheadProps) => JSX.Element;

export declare type DropdownTypeaheadProps = {
    results: TypeaheadResult[];
    onSelect: (id: string) => void;
    onSeeAll?: () => void;
    className?: string;
};

export declare type DropdownVariant = "actions" | "selection" | "multi" | "icons" | "booking-category" | "wm";

export declare const DropdownWM: ({ items, selectedId, onSelect, searchable, className, }: DropdownWMProps) => JSX.Element;

export declare type DropdownWMProps = {
    items: WMItem[];
    selectedId?: string;
    onSelect: (id: string) => void;
    searchable?: boolean;
    className?: string;
};

export declare const EmptyState: ({ size, title, subtitle, illustration, actions, showIcon, className, }: EmptyStateProps) => JSX.Element;

export declare type EmptyStateAction = {
    label: string;
    kind?: "primary" | "secondary";
    onClick: () => void;
};

export declare type EmptyStateProps = {
    size?: EmptyStateSize;
    /** Big: heading-2 title. Small: label-regular text. */
    title: string;
    /** Big only: heading-5 subtitle */
    subtitle?: string;
    /** Big: custom illustration node (200×200px). Small: uses "missing" icon. */
    illustration?: ReactNode;
    /** Optional action buttons (up to 2) */
    actions?: [EmptyStateAction?, EmptyStateAction?];
    /** Small: show the missing icon (default true) */
    showIcon?: boolean;
    className?: string;
};

export declare type EmptyStateSize = "big" | "small-vertical" | "small-horizontal";

export declare function EngagementSidePanel({ open, onClose, data }: EngagementSidePanelProps): default_2.JSX.Element;

export declare type EngagementSidePanelData = {
    title: string;
    wfState?: WFState;
    id?: string;
    state?: string;
    privacy?: string;
    participant?: string;
    ownerName?: string;
    ownerInitials?: string;
    description?: string;
    duration?: string;
    timeLeft?: string;
    dateCreated?: string;
    roles?: string;
    filled?: string;
    budget?: string;
    cost?: string;
    privacyValue?: string;
    serviceLineGroup?: string;
    requestedBy?: string;
    creatorName?: string;
    creatorInitials?: string;
    onCreateBooking?: () => void;
};

export declare type EngagementSidePanelProps = {
    open: boolean;
    onClose: () => void;
    data: EngagementSidePanelData;
};

export declare function FiltersApplied({ filters, onRemove, onClearAll, label, className, }: FiltersAppliedProps): default_2.JSX.Element | null;

export declare type FiltersAppliedProps = {
    filters: AppliedFilter[];
    onRemove?: (id: string) => void;
    onClearAll?: () => void;
    /** Label shown before "Clear all". Defaults to "Filters". */
    label?: string;
    className?: string;
};

export declare function Header({ size, title, subtitle, leftIcon, rightIcon, actions, rightContent, className, }: HeaderProps): default_2.JSX.Element;

export declare type HeaderAction = {
    label: string;
    variant?: "primary" | "secondary";
    onClick?: () => void;
    /** For icon-only buttons */
    icon?: IconName;
};

export declare type HeaderProps = {
    /** Controls title size: page=H1, section=H2, content=H4 */
    size?: HeaderSize;
    title: string;
    /** Optional subtitle — shown below the title row (body-unselected, muted) */
    subtitle?: string;
    /** Icon to the left of the title */
    leftIcon?: IconName;
    /** Icon to the right of the title */
    rightIcon?: IconName;
    /** Action buttons on the right side of line 1 */
    actions?: HeaderAction[];
    /** Additional right-side content (e.g. segment selector, sort dropdown) */
    rightContent?: ReactNode;
    className?: string;
};

export declare type HeaderSize = "page" | "section" | "content";

export declare const Icon: ({ name, size, className, style, ...rest }: IconProps) => JSX.Element | null;

export declare type IconName = "activity-feed" | "add" | "admin" | "ai" | "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "audit-planner" | "booking" | "calendar" | "caret-down" | "caret-left" | "caret-right" | "caret-up" | "chat" | "check" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "cross" | "down" | "edit" | "engagement" | "error" | "core" | "development" | "forbidden" | "help" | "hidden" | "history" | "hourglass-half" | "info" | "insights" | "learning" | "link" | "substitute-parent-child" | "links" | "list" | "location" | "locked" | "logout" | "mail" | "mandatory" | "marketplace" | "menu-horizontal" | "menu-vertical" | "merge" | "missing" | "money" | "move" | "note" | "notifications" | "open" | "pin" | "profile" | "question" | "reassign" | "refresh" | "remove" | "reports" | "role" | "save" | "search" | "share" | "shown" | "skills-framework" | "smart-allocation" | "sort" | "split" | "subtract" | "table" | "tag" | "undo" | "unseen" | "up" | "user-filled" | "verified" | "verified-credly" | "verified-others" | "warning" | "workflow" | "zoom-in" | "zoom-out" | "heart" | "placeholder-profile" | "suggested" | "timeline" | "filter" | "filter-clean" | "home" | "add-profile" | "ai-agent" | "arrow-2-directions" | "arrow-2-directions-vertical" | "arrow-4-directions" | "availability" | "baby" | "bag" | "bell" | "book" | "bubbles" | "bug" | "bulk" | "bulk-move" | "calendar-clash" | "calendar-delete" | "calendar-misaligned" | "car" | "certificate" | "clock" | "close-role" | "collapse" | "compare" | "copy" | "cost" | "created" | "department" | "dot" | "dot-big" | "duplicate" | "engagement-audit" | "expand" | "expand-all" | "expanded-all" | "export" | "extend" | "face-smile" | "facebook" | "filter-applied" | "filter2" | "fire" | "flower-spa" | "folder" | "ghost" | "head-heart" | "heatmap" | "hierarchical" | "hourglass-empty" | "house-laptop" | "house-user" | "import" | "industry" | "instagram" | "key" | "keyboard" | "linkedin" | "manage-roles" | "mobile" | "mouse-cursor" | "non-demand" | "overbooking" | "overbooking-acknowledged" | "owner" | "palm-tree" | "paper-clip" | "paper-plane" | "path" | "pen" | "person-minus" | "pf-logo" | "phone" | "plane" | "play" | "postpone" | "preferences" | "profile-field" | "profiles" | "refresh-clean" | "refresh-warning" | "remove-all" | "role-audit" | "rollforward" | "save-add" | "save-remove" | "sector" | "segment" | "skype" | "skype-for-business" | "snooze" | "soft-exception" | "split2" | "substitute-child" | "substitute-parent" | "target-allocation" | "task" | "teams" | "twitter" | "unpin" | "user-interest" | "web" | "wine-glass" | "work";

export declare type IconProps = SVGProps<SVGSVGElement> & {
    name: IconName;
    size?: IconSize;
    className?: string;
};

export declare type IconSize = 14 | 16 | 20 | 24;

export declare const Input: ({ label, value, placeholder, message, state, readOnly, disabled, mandatory, onChange, onFocus, onBlur, className, id, type, }: InputProps) => JSX.Element;

export declare const InputBookingCategory: ({ label, selectedLabel, selectedColor, mandatory, onClick, className, }: InputBookingCategoryProps) => JSX.Element;

export declare type InputBookingCategoryProps = {
    label?: string;
    selectedLabel?: string;
    selectedColor?: string;
    mandatory?: boolean;
    onClick?: () => void;
    className?: string;
};

export declare const InputInline: ({ inlineLabel, value, mandatory, onClick, className, }: InputInlineProps) => JSX.Element;

export declare type InputInlineProps = {
    inlineLabel?: string;
    value?: string;
    mandatory?: boolean;
    onClick?: () => void;
    className?: string;
};

export declare const InputMultiselect: ({ label, mandatory, tags, onRemoveTag, onClearAll, showChevron, className, }: InputMultiselectProps) => JSX.Element;

export declare type InputMultiselectProps = {
    label?: string;
    mandatory?: boolean;
    tags?: InputMultiselectTag[];
    onRemoveTag?: (id: string) => void;
    onClearAll?: () => void;
    showChevron?: boolean;
    className?: string;
};

export declare type InputMultiselectTag = {
    id: string;
    label: string;
};

export declare type InputProps = {
    label?: string;
    value?: string;
    placeholder?: string;
    message?: string;
    state?: InputState;
    readOnly?: boolean;
    disabled?: boolean;
    mandatory?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    id?: string;
    type?: "text" | "email" | "password" | "number" | "tel" | "url";
};

export declare const InputSearch: ({ value, placeholder, onChange, onClear, className, id, }: InputSearchProps) => JSX.Element;

export declare type InputSearchProps = {
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    className?: string;
    id?: string;
};

export declare const InputSelect: ({ label, value, placeholder, message, state, readOnly, disabled, mandatory, onClick, className, id, }: InputSelectProps) => JSX.Element;

export declare type InputSelectProps = Omit<InputProps, "type" | "onChange" | "onFocus" | "onBlur"> & {
    onClick?: () => void;
};

export declare type InputState = "default" | "error" | "warning" | "instructions";

export declare type KPIType = "compliant" | "approved" | "exception" | "rejected" | "requested" | "condition-not-met";

export declare function Layout({ variant, children, sidebar, rightPanel, className, }: LayoutProps): default_2.JSX.Element;

export declare type LayoutProps = {
    variant?: LayoutVariant;
    /** Main content slot */
    children: ReactNode;
    /** profile-regular / profile-summary: left sidebar content (280px) */
    sidebar?: ReactNode;
    /** profile-summary only: right panel content (500px) */
    rightPanel?: ReactNode;
    className?: string;
};

export declare type LayoutVariant = "full" | "1280" | "profile-regular" | "profile-summary";

export declare const LoadingIcon: ({ className }: LoadingIconProps) => JSX.Element;

export declare type LoadingIconProps = {
    className?: string;
};

export declare const LoadingOverlay: ({ visible, className }: LoadingOverlayProps) => JSX.Element | null;

export declare type LoadingOverlayProps = {
    /** Whether the overlay is visible */
    visible?: boolean;
    className?: string;
};

export declare type MarketingNavItem = MarketplaceNavItem;

export declare type MarketplaceNavItem = {
    id: string;
    icon: IconName;
    label: string;
};

export declare const Navbar: ({ activeId, onSelect, avatarInitials, avatarSrc, className, }: NavbarProps) => JSX.Element;

export declare type NavbarProps = {
    activeId?: string;
    onSelect?: (id: string) => void;
    avatarInitials?: string;
    avatarSrc?: string;
    className?: string;
};

export declare const Navigation: ({ orientation, tabs, activeId, onChange, fillWidth, className, }: NavigationProps) => JSX.Element;

export declare const NavigationMarketing: ({ items, activeId, onChange, className, }: NavigationMarketplaceProps) => JSX.Element;

export declare type NavigationMarketingProps = NavigationMarketplaceProps;

export declare const NavigationMarketplace: ({ items, activeId, onChange, className, }: NavigationMarketplaceProps) => JSX.Element;

export declare type NavigationMarketplaceProps = {
    items: MarketplaceNavItem[];
    activeId?: string;
    onChange?: (id: string) => void;
    className?: string;
};

export declare type NavigationOrientation = "horizontal" | "vertical";

export declare type NavigationProps = {
    orientation?: NavigationOrientation;
    tabs: NavigationTab[];
    activeId?: string;
    onChange?: (id: string) => void;
    /** Each tab stretches to fill equal share of available width */
    fillWidth?: boolean;
    className?: string;
};

export declare type NavigationTab = {
    id: string;
    label: string;
    /** Optional subtitle — shown below label (label-regular 12px) */
    subtitle?: string;
    /** Show check icon to the left of label */
    showIcon?: boolean;
    /** Badge count — shown to the right of label */
    badge?: number;
    disabled?: boolean;
};

export declare type NavItem = {
    id: string;
    icon: IconName;
    label: string;
};

export declare function Page({ navbar, variant, children, sidebar, rightPanel, className, }: PageProps): default_2.JSX.Element;

export declare function PageHeader({ breadcrumbs, title, actions, headerRight, wfState, activityTag, subtitleItems, className, }: PageHeaderProps): default_2.JSX.Element;

export declare type PageHeaderProps = {
    breadcrumbs?: BreadcrumbItem[];
    title: string;
    actions?: HeaderAction[];
    /** Extra content in the header right slot (e.g. segment selector) */
    headerRight?: ReactNode;
    wfState?: WFState;
    activityTag?: string;
    subtitleItems?: RoleLabelValue[];
    className?: string;
};

export declare type PageProps = {
    /** Navbar component to render on the left */
    navbar?: ReactNode;
    /** Layout variant for the content area */
    variant?: LayoutVariant;
    children: ReactNode;
    sidebar?: ReactNode;
    rightPanel?: ReactNode;
    className?: string;
};

export declare const Pagination: ({ total, current, onChange, size, className, }: PaginationProps) => JSX.Element;

export declare type PaginationProps = {
    /** Total number of pages */
    total: number;
    /** Currently active page (1-indexed) */
    current: number;
    onChange: (page: number) => void;
    size?: PaginationSize;
    className?: string;
};

export declare type PaginationSize = "regular" | "small";

export declare const PillActivityTag: ({ label, size, className }: PillActivityTagProps) => JSX.Element;

export declare type PillActivityTagProps = {
    label: string;
    size?: PillSize;
    className?: string;
};

export declare const PillCertificate: ({ name, date, onRemove, size, className }: PillCertificateProps) => JSX.Element;

export declare type PillCertificateProps = {
    name: string;
    date: string;
    onRemove?: () => void;
    size?: PillSize;
    className?: string;
};

export declare const PillCustomValue: ({ type, className }: PillCustomValueProps) => JSX.Element;

export declare type PillCustomValueProps = {
    type: CustomValueType;
    className?: string;
};

export declare const PillFilter: ({ field, value, onRemove, className }: PillFilterProps) => JSX.Element;

export declare type PillFilterProps = {
    field: string;
    value: string;
    onRemove?: () => void;
    className?: string;
};

export declare const PillKPI: ({ type, className }: PillKPIProps) => JSX.Element;

export declare type PillKPIProps = {
    type: KPIType;
    className?: string;
};

export declare const PillModifier: ({ leftLabel, rightLabel, size, bg, rightIcon, onRemoveLeft, onClickRight, className, }: PillModifierProps) => JSX.Element;

export declare type PillModifierProps = {
    leftLabel: string;
    rightLabel: string;
    size?: PillSize;
    bg?: string;
    rightIcon?: IconName;
    onRemoveLeft?: () => void;
    onClickRight?: () => void;
    className?: string;
};

export declare const PillRemovable: ({ label, size, bg, color, bordered, onRemove, className, }: PillRemovableProps) => JSX.Element;

export declare type PillRemovableProps = {
    label: string;
    size?: PillSize;
    bg?: string;
    color?: string;
    bordered?: boolean;
    onRemove?: () => void;
    className?: string;
};

export declare const PillReportStatus: ({ type, className }: PillReportStatusProps) => JSX.Element;

export declare type PillReportStatusProps = {
    type: ReportStatusType;
    className?: string;
};

export declare const PillSavedFilter: ({ label, onRemove, onShare, className }: PillSavedFilterProps) => JSX.Element;

export declare type PillSavedFilterProps = {
    label: string;
    onRemove?: () => void;
    onShare?: () => void;
    className?: string;
};

export declare const PillSimple: ({ label, leftIcon, size, bg, color, className, }: PillSimpleProps) => JSX.Element;

export declare type PillSimpleProps = {
    label: string;
    leftIcon?: IconName;
    size?: PillSize;
    bg?: string;
    color?: string;
    className?: string;
};

export declare type PillSize = "regular" | "small";

export declare const PillWFState: ({ state, size, className }: PillWFStateProps) => JSX.Element;

export declare type PillWFStateProps = {
    state: WFState;
    size?: PillSize;
    className?: string;
};

export declare type ProficiencyLevel = "basic" | "intermediate" | "advanced";

export declare type ProfileDatapoint = {
    label: string;
    value: string;
};

export declare type ProfileIconFlags = {
    /** Profile is a placeholder (no real person assigned) */
    placeholder?: boolean;
    /** Profile is suspended */
    suspended?: boolean;
    /** Profile expressed interest in this role */
    interest?: boolean;
    /** Profile matches in a future contractual time slice */
    contractualTimeSlice?: boolean;
    /** Profile is suggested by integration */
    suggested?: boolean;
    /** Profile is a named resource */
    namedResource?: boolean;
};

export declare function ProfileIcons({ placeholder, suspended, interest, contractualTimeSlice, suggested, namedResource, className, }: ProfileIconsProps): default_2.JSX.Element;

declare type ProfileIconsProps = ProfileIconFlags & {
    className?: string;
};

export declare function ProfileSidePanel({ open, onClose, onOpenProfile, onMatchingRoles, data, }: ProfileSidePanelProps): default_2.JSX.Element;

export declare type ProfileSidePanelData = {
    name: string;
    initials?: string;
    avatarSrc?: string;
    jobTitle?: string;
    location?: string;
    startingDate?: string;
    languages?: string;
    email?: string;
    phone?: string;
    website?: string;
    availabilityPct?: number;
    availabilityFrom?: string;
    availabilityTo?: string;
    coreSkills?: ProfileSidePanelSkill[];
    otherSkillGroups?: {
        label: string;
        skills: ProfileSidePanelSkill[];
    }[];
    industryKnowledge?: ProfileSidePanelSkill[];
    jobLevel?: string;
    officeLocation?: string;
    clients?: string[];
    bio?: string;
};

export declare type ProfileSidePanelProps = {
    open: boolean;
    onClose: () => void;
    onOpenProfile?: () => void;
    onMatchingRoles?: () => void;
    data: ProfileSidePanelData;
};

export declare type ProfileSidePanelSkill = {
    label: string;
    proficiency: "basic" | "intermediate" | "advanced";
    core?: boolean;
    verified?: boolean;
    verifiedCredy?: boolean;
    development?: boolean;
};

export declare const ProgressLinear: ({ value, showLabel, semantic, className, }: ProgressLinearProps) => JSX.Element;

export declare type ProgressLinearProps = {
    /** 0–100 */
    value: number;
    /** Show percentage label */
    showLabel?: boolean;
    /** Use semantic colours based on value */
    semantic?: boolean;
    className?: string;
};

export declare const ProgressRadial: ({ value, showLabel, semantic, size, className, }: ProgressRadialProps) => JSX.Element;

export declare type ProgressRadialProps = {
    /** 0–100 */
    value: number;
    /** Show percentage label inside the ring */
    showLabel?: boolean;
    /** Use semantic colours based on value */
    semantic?: boolean;
    /** Size in px — default 40px (from Figma) */
    size?: number;
    className?: string;
};

export declare const Radio: ({ label, subLabel, checked, disabled, layout, name, value, onChange, className, id: idProp, }: RadioProps) => JSX.Element;

export declare const RadioGroup: ({ options, value, onChange, name, layout, groupLayout, disabled, className, }: RadioGroupProps) => JSX.Element;

export declare type RadioGroupProps = {
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
    layout?: RadioLayout;
    groupLayout?: "row" | "column";
    disabled?: boolean;
    className?: string;
};

export declare type RadioLayout = "horizontal" | "vertical";

export declare type RadioOption = {
    value: string;
    label: string;
    subLabel?: string;
    disabled?: boolean;
};

export declare type RadioProps = {
    label?: string;
    subLabel?: string;
    checked?: boolean;
    disabled?: boolean;
    layout?: RadioLayout;
    name?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    id?: string;
};

export declare type ReportStatusType = "ready" | "no-data" | "failed" | "pending" | "in-progress";

export declare type ResourcingStep = "not-shortlisted" | "shortlisted" | "shortlisted-reviewer" | "accepted-invite" | "invited" | "accepted-fillbook" | "booked" | "filled" | "declined";

/** Key/value pair shown in the expanded left column */
declare type RoleField = {
    label: string;
    value: string;
    /** Whether the profile matches this field — shows check (true) or cross (false) */
    matches?: boolean;
};

export declare type RoleLabelValue = {
    /** Short descriptor e.g. "ID", "State", "Privacy" */
    label: string;
    /** Bold value e.g. "100000064", "Open", "Public" */
    value: string;
};

export declare function RoleSidePanel({ open, onClose, data }: RoleSidePanelProps): default_2.JSX.Element;

export declare type RoleSidePanelData = {
    title: string;
    wfState?: WFState;
    activityTag?: string;
    id?: string;
    state?: string;
    privacy?: string;
    participant?: string;
    engagementName?: string;
    engagementLabel?: string;
    onOpenEngagement?: () => void;
    owners?: {
        name: string;
        initials: string;
    }[];
    description?: string;
    duration?: string;
    timeLeft?: string;
    dateCreated?: string;
    rolesCount?: string;
    filled?: string;
    skills?: RoleSidePanelSkill[];
    privacyValue?: string;
    privacyInfo?: string;
    creatorName?: string;
    creatorInitials?: string;
};

export declare type RoleSidePanelProps = {
    open: boolean;
    onClose: () => void;
    data: RoleSidePanelData;
};

export declare type RoleSidePanelSkill = {
    label: string;
    proficiency: "basic" | "intermediate" | "advanced";
    core?: boolean;
    verified?: boolean;
};

export declare function RoleSubtitle({ wfState, activityTag, items, className, }: RoleSubtitleProps): default_2.JSX.Element;

export declare type RoleSubtitleProps = {
    /** WF State pill — e.g. "shortlisting" */
    wfState?: WFState;
    /** Activity tag pill label — e.g. "RM to review". Omit to hide. */
    activityTag?: string;
    /** Array of label:value metadata pairs */
    items?: RoleLabelValue[];
    className?: string;
};

export declare type SavedFilter = {
    id: string;
    label: string;
};

export declare function SavedFilters({ filters, title, expanded: controlledExpanded, defaultExpanded, onExpandedChange, onRemove, onShare, headerRight, className, }: SavedFiltersProps): default_2.JSX.Element;

export declare type SavedFiltersProps = {
    filters: SavedFilter[];
    /** Override the header label. Defaults to "N saved filters" */
    title?: string;
    /** Controlled expand state */
    expanded?: boolean;
    /** Default expand state (uncontrolled) */
    defaultExpanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    onRemove?: (id: string) => void;
    onShare?: (id: string) => void;
    /** Slot for right-side header actions */
    headerRight?: default_2.ReactNode;
    className?: string;
};

export declare function SidePanel({ open, onClose, children, width, className }: SidePanelProps): default_2.JSX.Element | null;

export declare type SidePanelProps = {
    /** Whether the panel is visible */
    open: boolean;
    /** Called when backdrop or close button is clicked */
    onClose: () => void;
    /** Panel content */
    children: default_2.ReactNode;
    /** Width override — defaults to 600px */
    width?: number;
    className?: string;
};

export declare type SkillGroup = {
    label: string;
    count?: string;
    skills: SkillItem[];
};

export declare type SkillIconFlags = {
    core?: boolean;
    development?: boolean;
    verified?: boolean;
    verifiedCredy?: boolean;
    verifiedFeedback?: boolean;
    career?: boolean;
};

export declare type SkillItem = {
    name: string;
    /** Role required proficiency: "basic" | "intermediate" | "advanced" */
    requiredProficiency?: ProficiencyLevel;
    /** Profile's actual proficiency; omit if profile doesn't have the skill */
    profileProficiency?: ProficiencyLevel;
    /** Skill is required but profile does not meet it */
    missing?: boolean;
    /** Hover tooltip tags */
    tags?: string[];
};

export declare const SkillMatch: ({ label, requiredProficiency, profileProficiency, missing, substitute, showDivider, tags, theme, className, ...icons }: SkillMatchProps) => JSX.Element;

export declare type SkillMatchProps = SkillIconFlags & {
    label: string;
    requiredProficiency: ProficiencyLevel;
    profileProficiency?: ProficiencyLevel;
    missing?: boolean;
    substitute?: boolean;
    showDivider?: boolean;
    tags?: string[];
    theme?: SkillTheme;
    className?: string;
};

export declare const SkillProfile: ({ label, proficiency, showDivider, tags, theme, className, ...icons }: SkillProfileProps) => JSX.Element;

export declare type SkillProfileProps = SkillIconFlags & {
    label: string;
    proficiency: ProficiencyLevel;
    showDivider?: boolean;
    tags?: string[];
    theme?: SkillTheme;
    className?: string;
};

export declare const SkillRole: ({ label, proficiency, career, showDivider, tags, theme, className, }: SkillRoleProps) => JSX.Element;

export declare type SkillRoleProps = {
    label: string;
    proficiency: ProficiencyLevel;
    career?: boolean;
    showDivider?: boolean;
    tags?: string[];
    theme?: SkillTheme;
    className?: string;
};

export declare type SkillTheme = "light" | "dark";

export declare const SliderNumber: ({ label, value, min, max, step, showInput, onChange, className, }: SliderNumberProps) => JSX.Element;

export declare type SliderNumberProps = {
    label?: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    showInput?: boolean;
    onChange?: (value: number) => void;
    className?: string;
};

export declare const SliderPercentage: ({ label, value, step, showInput, onChange, className, }: SliderPercentageProps) => JSX.Element;

export declare type SliderPercentageProps = {
    label?: string;
    value: number;
    step?: number;
    showInput?: boolean;
    onChange?: (value: number) => void;
    className?: string;
};

export declare const SliderRange: ({ label, valueFrom, valueTo, min, max, step, minLabel, maxLabel, showInput, onChangeFrom, onChangeTo, className, }: SliderRangeProps) => JSX.Element;

export declare type SliderRangeProps = {
    label?: string;
    valueFrom: number;
    valueTo: number;
    min?: number;
    max?: number;
    step?: number;
    minLabel?: string;
    maxLabel?: string;
    showInput?: boolean;
    onChangeFrom?: (value: number) => void;
    onChangeTo?: (value: number) => void;
    className?: string;
};

export declare type SliderType = "number" | "range" | "percentage";

export declare type SortDirection = "asc" | "desc" | "none";

export declare function Switch({ checked, defaultChecked, onChange, label, showLabel, layout, disabled, id: providedId, className, }: SwitchProps): default_2.JSX.Element;

export declare type SwitchLayout = "vertical" | "horizontal-left" | "mobile-full";

export declare type SwitchProps = {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    showLabel?: boolean;
    layout?: SwitchLayout;
    disabled?: boolean;
    id?: string;
    className?: string;
};

export declare function Table<T extends TableRow = TableRow>({ columns, rows, compact, selectable, selectedRows, onSelectionChange, sortKey, sortDirection, onSort, className, }: TableProps<T>): default_2.JSX.Element;

export declare type TableCellType = "text-primary" | "text-regular" | "pill" | "wm" | "number" | "percentage" | "button" | "icon" | "checkbox" | "custom";

export declare type TableColumn<T = Record<string, unknown>> = {
    /** Unique key; also used to read row[key] unless renderCell is provided */
    key: string;
    /** Header label */
    header: string;
    /** Cell rendering type — controls how row[key] is displayed */
    type?: TableCellType;
    /** Whether header shows sort arrows */
    sortable?: boolean;
    /** Explicit width (CSS value, e.g. "120px", "20%") */
    width?: string;
    /**
     * Stick this column to the right edge of the table wrapper.
     * Use for action/icon columns that should always be visible when scrolling.
     */
    sticky?: boolean;
    /** Custom cell renderer; receives the row and the resolved value */
    renderCell?: (row: T, value: unknown) => ReactNode;
    /** For type=pill: background colour */
    pillBg?: string;
    /** For type=pill: text colour */
    pillColor?: string;
    /** For type=wm: subtitle below the name */
    wmSubtitle?: boolean;
    /** For type=button: array of button labels (up to 3) */
    buttonLabels?: string[];
    /** For type=button/icon: click handler */
    onButtonClick?: (label: string, row: T) => void;
    /** For type=icon: icon name */
    iconName?: string;
    /** Alignment override; defaults based on type */
    align?: "left" | "center" | "right";
};

export declare type TableProps<T extends TableRow = TableRow> = {
    columns: TableColumn<T>[];
    rows: T[];
    /** Standard (56px rows, checkbox col) or compact (40px rows, no checkbox) */
    compact?: boolean;
    /** Show checkbox column (standard only) */
    selectable?: boolean;
    /** Controlled selection — array of selected row ids or indices */
    selectedRows?: (string | number)[];
    onSelectionChange?: (selected: (string | number)[]) => void;
    /** Sorting — controlled */
    sortKey?: string;
    sortDirection?: SortDirection;
    onSort?: (key: string, direction: SortDirection) => void;
    className?: string;
};

export declare type TableRow = Record<string, unknown> & {
    /** If provided, used as row key in React; otherwise index is used */
    id?: string | number;
};

export declare function Tile({ tileStyle, padding, onClick, as: Tag, fullWidth, className, children, style, }: TileProps): default_2.JSX.Element;

export declare type TilePadding = "panel" | "content" | "screen";

export declare type TileProps = {
    /** Visual style — controls background, shadow, border */
    tileStyle?: TileStyle;
    /** Padding scale — panel (8px) / content (16px) / screen (24px) */
    padding?: TilePadding;
    /** Makes the tile a button element with pointer cursor and hover shadow */
    onClick?: () => void;
    /** Render as a specific HTML element (div by default, button if onClick provided) */
    as?: "div" | "article" | "section";
    /** Fill available width */
    fullWidth?: boolean;
    className?: string;
    children?: ReactNode;
    style?: default_2.CSSProperties;
};

export declare type TileStyle = "default" | "selected" | "highlight" | "interactive" | "dark" | "object-dark" | "object-light";

export declare function Toast({ type, message, visible, onClose, className }: ToastProps): default_2.JSX.Element;

declare type ToastContextValue = {
    showToast: (options: ToastOptions) => void;
};

export declare type ToastOptions = {
    type: ToastType;
    message: string;
    /** Auto-dismiss delay in ms. Defaults to 5000. Set to 0 to disable. */
    duration?: number;
};

export declare type ToastProps = {
    type: ToastType;
    message: string;
    /** Whether the toast is currently visible */
    visible?: boolean;
    onClose?: () => void;
    className?: string;
};

export declare function ToastProvider({ children }: {
    children: default_2.ReactNode;
}): default_2.JSX.Element;

export declare type ToastType = "success" | "warning" | "error";

export declare function Toggle({ options, value, onChange, label, mandatory, disabled, className, }: ToggleProps): default_2.JSX.Element;

export declare type ToggleOption = {
    value: string;
    label: string;
};

export declare type ToggleProps = {
    options: ToggleOption[];
    /** Currently selected value. Pass undefined for no selection. */
    value?: string;
    onChange?: (value: string) => void;
    /** Optional field label above the buttons */
    label?: string;
    /** Show mandatory asterisk/marker next to label */
    mandatory?: boolean;
    /** Disabled state — no interaction possible */
    disabled?: boolean;
    className?: string;
};

export declare function Tooltip({ content, children, placement, maxWidth, disabled, className, }: TooltipProps): default_2.JSX.Element;

export declare type TooltipPlacement = "no-arrow" | "down-center" | "down-left" | "down-right" | "up-center" | "up-left" | "up-right" | "left-center" | "left-up" | "left-down" | "right-center" | "right-up" | "right-down";

export declare type TooltipProps = {
    /** The content shown inside the tooltip bubble */
    content: ReactNode;
    /** The element that triggers the tooltip on hover/focus */
    children: ReactNode;
    placement?: TooltipPlacement;
    /** Max width of the bubble in px. Defaults to 320. Set to 0 to disable. */
    maxWidth?: number;
    /** Disable the tooltip entirely */
    disabled?: boolean;
    className?: string;
};

export declare type TypeaheadResult = {
    id: string;
    type: TypeaheadResultType;
    /** Full label — matched portion shown bold, rest regular */
    label: string;
    /** Bold portion (matched query) — rendered bold, rest of label is regular */
    matchedPart?: string;
    subLabel?: string;
    onOpen?: () => void;
};

export declare type TypeaheadResultType = "profile" | "engagement" | "role" | "search";

export declare function useToast(): ToastContextValue;

export declare type WFState = "new" | "shortlisting" | "in-review" | "invited" | "partially-filled" | "filled" | "partially-booked" | "booked" | "partially-confirmed" | "confirmed" | "not-filled" | "exceptions" | "pending" | "technical-overlay" | "accreditations";

export declare function Wizard({ steps, activeIndex, maxReachableIndex, onChange, className, }: WizardProps): default_2.JSX.Element;

export declare type WizardProps = {
    steps: WizardStep[];
    /** Index of the currently active step (0-based) */
    activeIndex: number;
    /**
     * How far ahead the user can jump. Defaults to activeIndex + 1
     * (only the immediately next step is available).
     * Set to steps.length - 1 to make all future steps available.
     */
    maxReachableIndex?: number;
    onChange?: (index: number) => void;
    className?: string;
};

export declare type WizardStep = {
    id: string;
    label: string;
};

export declare type WizardStepState = "current" | "enabled-previous" | "enabled-next" | "disabled";

export declare type WMCellValue = {
    name: string;
    initials?: string;
    avatarSrc?: string;
};

export declare type WMItem = {
    id: string;
    name: string;
    subLabel?: string;
    avatarSrc?: string;
    initials?: string;
    avatarColor?: string;
    isGroup?: boolean;
};

export declare function WorkforceMember({ variant, name, initials, avatarSrc, hideAvatar, email, jobTitle, addedBy, datapoints, onClick, className, placeholder, suspended, interest, contractualTimeSlice, suggested, namedResource, }: WorkforceMemberProps): default_2.JSX.Element;

export declare type WorkforceMemberProps = ProfileIconFlags & {
    variant?: WorkforceMemberVariant;
    name: string;
    /** Initials shown in avatar when no src */
    initials?: string;
    /** Avatar photo URL */
    avatarSrc?: string;
    /** Hide avatar entirely */
    hideAvatar?: boolean;
    /** Email address — shown in small-2lines and small-3lines */
    email?: string;
    /** Job title — shown in small-3lines, card, big */
    jobTitle?: string;
    /** "Added by" label for shortlist row (card variant) */
    addedBy?: string;
    /** Key:value datapoints for big variant */
    datapoints?: ProfileDatapoint[];
    /** Click handler */
    onClick?: () => void;
    className?: string;
};

export declare type WorkforceMemberVariant = "small-1line" | "small-2lines" | "small-3lines" | "big" | "card";

export { }
