// CV Versions screen — all saved versions of a person's CV
// Figma: Export CV revamp, node 132:53016
//
// Layout (Page variant="full": 24px padding, 24px gap):
//   PageHeader     breadcrumbs "Profile: <name> / CV Versions", title, primary "Create CV version"
//   Toolbar row    InputSearch (283px) · sort selector ("By name") · "N versions" · filter icon button (right)
//   Cards grid     3 columns, gap 16. Tile interactive per version (shadow at rest, hover effect): the whole card is clickable (opens the version):
//                    header  Switch · name (bold) · menu icon button (dropdown: Duplicate, Delete)
//                    content live thumbnail of the CV (CVPreview, scaled) | title, Template, Language, Last edited by
//
// Used by the Screens/CVVersions story and by Screens/MyProfile ("See all versions").

import { useEffect, useRef, useState } from "react";

import { Navbar }       from "../../components/navbar/navbar";
import { Page }         from "../../components/layout/layout";
import { Tile }         from "../../components/tile/tile";
import { PageHeader }   from "../../components/page_header/page_header";
import { Button }       from "../../components/button/button";
import { Icon }         from "../../components/icon/icon";
import { DropdownActions } from "../../components/dropdown/dropdown";
import { InputSearch } from "../../components/input/input";
import { Alert }        from "../../components/alert/alert";
import { CreateVersionModal } from "./create_version_modal";
import type { NewVersionInfo } from "./create_version_modal";
import { Switch }       from "../../components/switch/switch";

import { CVPreview, SelectMenu, ZARA } from "../cv_exporter/cv_exporter";
import type { CV } from "../cv_exporter/cv_exporter";
import { pendingVersionsText } from "../cv_review/cv_review";
import type { ReviewChange } from "../cv_review/cv_review";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Data (names and descriptions are from the Figma; the CV content is the same placeholder CV)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type CVVersion = {
  id: string;
  name: string;
  description: string;
  template: string;
  language: string;
  editedBy: string;
  editedAt: string;
  active: boolean;
};

export const INITIAL_CV_VERSIONS: CVVersion[] = [
  { id: "en-banking", name: "English, banking",        description: "English-speaking banking professionals",                   template: "Default", language: "English", editedBy: "John D.", editedAt: "Aug 28, 2026", active: true },
  { id: "es-banking", name: "Spanish, banking",        description: "Spanish-speaking banking professionals",                   template: "Default", language: "Spanish", editedBy: "John D.", editedAt: "Aug 28, 2026", active: false },
  { id: "es-pm",      name: "Spanish, project manager", description: "Spanish-speaking tailored for project manager roles",      template: "Default", language: "Spanish", editedBy: "John D.", editedAt: "Aug 28, 2026", active: false },
];

/** A copy of a version (the "Duplicate" menu action): same settings, "(copy)" after the name, off until switched on */
export const duplicateOf = (v: CVVersion): CVVersion => ({
  ...v,
  id: `v-${Date.now()}`,
  name: `${v.name} (copy)`,
  active: false,
  editedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
});

/** A new card for a version just created (name and description from the "Create CV version" modal) */
export const newCVVersion = ({ name, description }: NewVersionInfo): CVVersion => ({
  id: `v-${Date.now()}`,
  name,
  description,
  template: "Default",
  language: "English",
  editedBy: "John D.",
  editedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  active: false,
});

const SORT_OPTIONS = [
  { id: "name",   label: "By name" },
  { id: "edited", label: "By last edited" },
];

const label: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: "var(--font-size-label)", fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "115%",
};
const value: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: "var(--font-size-body)", fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "115%",
};
const bodyBold: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: "var(--font-size-body)", fontWeight: 700, color: "var(--palette-blue-0)", lineHeight: "150%",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Card
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** A scaled-down live CVPreview, sized to the width it is given. */
function Thumbnail({ cv }: { cv: CV }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.22);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / 900);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} aria-hidden="true" style={{ flex: "1 1 0", minWidth: 0, height: 139, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ width: 900, padding: 24, background: "var(--palette-white-0)", transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <CVPreview cv={cv} />
      </div>
    </div>
  );
}

function Meta({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={label}>{title}</span>
      <span style={value}>{children}</span>
    </div>
  );
}

const VERSION_MENU = [{ id: "duplicate", label: "Duplicate" }, { id: "delete", label: "Delete" }];

function VersionCard({
  version, cv, outdated, onToggle, onOpen, onDuplicate, onDelete,
}: { version: CVVersion; cv: CV; outdated?: boolean; onToggle: (on: boolean) => void; onOpen: () => void; onDuplicate: () => void; onDelete: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // clicks on the switch and the menu belong to them, not to the card
  const own = (e: React.SyntheticEvent) => e.stopPropagation();
  return (
    // the card is clickable: Tile "interactive" = shadow at rest and a hover effect (Tile as a button cannot hold the switch and the menu button)
    <div role="group" aria-label={version.name} tabIndex={0} style={{ cursor: "pointer", borderRadius: "var(--radius-md)" }}
      onClick={onOpen} onKeyDown={e => { if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onOpen(); } }}>
      <Tile tileStyle="interactive" padding="content" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Profile edits not yet applied to this version — Figma 886:40981 */}
        {outdated && (
          <Tile tileStyle="selected" padding="panel" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 8 }}>
            <Icon name="info" size={20} />
            <span style={value}>Outdated fields</span>
          </Tile>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span onClick={own}><Switch checked={version.active} onChange={onToggle} showLabel={false} /></span>
          <span style={{ ...bodyBold, flex: 1, minWidth: 0 }}>{version.name}</span>
          <div style={{ position: "relative" }} onClick={own}>
            <Button kind="iconTertiary" size="regular" title="Menu" onClick={() => setMenuOpen(o => !o)}><Icon name="menu-vertical" size={16} /></Button>
            {menuOpen && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 20 }} onClick={() => setMenuOpen(false)} />
                <div style={{ position: "absolute", top: "100%", right: 0, zIndex: 21, marginTop: 4 }}>
                  <DropdownActions items={VERSION_MENU} onSelect={id => { setMenuOpen(false); if (id === "duplicate") onDuplicate(); else onDelete(); }} />
                </div>
              </>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Thumbnail cv={cv} />
          <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {version.description && <span style={{ ...value, lineHeight: "150%" }}>{version.description}</span>}
            <Meta title="Template">{version.template}</Meta>
            <Meta title="Language">{version.language}</Meta>
            <Meta title="Last edited by">{version.editedBy} · {version.editedAt}</Meta>
          </div>
        </div>
      </Tile>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Screen
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CVVersionsScreen({
  personName = "Zara Bond",
  cv = ZARA,
  versions: controlledVersions,
  onVersionsChange,
  onBack,
  onCreate,
  onCreateStart,
  onEdit,
  onDuplicate,
  onNavigate,
  pending,
  cvs,
  onPushAll,
  onDismissAll,
}: {
  personName?: string;
  /** The CV shown in every thumbnail */
  cv?: CV;
  /** Per-version CVs (thumbnails); a version without an entry shows `cv` */
  cvs?: Record<string, CV>;
  /** Profile edits waiting for review, per version id. A version with changes shows "Outdated fields"; the alert counts them. */
  pending?: Record<string, ReviewChange[]>;
  /** Alert buttons "Push all edits to all" / "Dismiss for all" */
  onPushAll?: () => void;
  onDismissAll?: () => void;
  /** Controlled list (keeps it when the screen is left and re-opened); uncontrolled when omitted */
  versions?: CVVersion[];
  onVersionsChange?: (versions: CVVersion[]) => void;
  /** Breadcrumb "Profile: <name>" */
  onBack?: () => void;
  /** A version was created in the "Create CV version" modal (it is already added to the list) */
  onCreate?: (version: CVVersion) => void;
  /** "Create CV version" was clicked. When given, the screen does not open its own modal: the host starts the creation (e.g. CV Exporter, variant "creating-version", which asks for the name at the end). */
  onCreateStart?: () => void;
  /** A card was clicked (the whole card is clickable): open that version */
  onEdit?: (version: CVVersion) => void;
  /** Menu action "Duplicate": the copy is already added to the list, right after the original */
  onDuplicate?: (original: CVVersion, copy: CVVersion) => void;
  /** Navbar item clicked (e.g. "profiles") */
  onNavigate?: (navbarId: string) => void;
}) {
  const [internalVersions, setInternalVersions] = useState(INITIAL_CV_VERSIONS);
  const versions = controlledVersions ?? internalVersions;
  const setVersions = (update: (vs: CVVersion[]) => CVVersion[]) => {
    const next = update(versions);
    if (onVersionsChange) onVersionsChange(next); else setInternalVersions(next);
  };
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name");

  // "Create CV version" modal (used when the host gives no onCreateStart)
  const [creating, setCreating] = useState(false);
  const create = (info: NewVersionInfo) => {
    const version = newCVVersion(info);
    setVersions(vs => [...vs, version]);
    setCreating(false);
    onCreate?.(version);
  };

  const q = query.trim().toLowerCase();
  const isOutdated = (id: string) => (pending?.[id]?.length ?? 0) > 0;
  const outdatedCount = versions.filter(v => isOutdated(v.id)).length;
  const shown = versions
    .filter(v => !q || `${v.name} ${v.description}`.toLowerCase().includes(q))
    .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : 0));

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Page navbar={<Navbar activeId="profile" onSelect={onNavigate} />} variant="full">
        <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 24 }}>
          <PageHeader
            breadcrumbs={[{ label: `Profile: ${personName}`, onClick: onBack }, { label: "CV Versions" }]}
            title="CV Versions"
            actions={[{ label: "Create CV version", variant: "primary", onClick: () => (onCreateStart ? onCreateStart() : setCreating(true)) }]}
          />

          {/* Pending profile edits — Figma 886:40981 */}
          {outdatedCount > 0 && (
            <Alert
              type="general"
              layout="with-header"
              message={pendingVersionsText(outdatedCount)}
              body="Profile has some fields edited, CV Versions might be showing some fields out dated. Would you like to push profile edits to all CV Versions?"
              actions={[{ label: "Push all edits to all", onClick: () => onPushAll?.() }, { label: "Dismiss for all", onClick: () => onDismissAll?.() }]}
            />
          )}

          {/* Search, sort, count, filter */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 283 }}>
              <InputSearch value={query} placeholder="Search" onChange={e => setQuery(e.target.value)} onClear={() => setQuery("")} />
            </div>
            <SelectMenu items={SORT_OPTIONS} selectedId={sort} onSelect={setSort}>
              {toggle => (
                <Button kind="secondary" size="regular" onClick={toggle}>
                  {SORT_OPTIONS.find(o => o.id === sort)?.label}
                  <Icon name="sort" size={16} />
                </Button>
              )}
            </SelectMenu>
            <span style={label}>{shown.length} {shown.length === 1 ? "version" : "versions"}</span>
            <div style={{ flex: 1 }} />
            <Button kind="icon" size="regular" title="Filters"><Icon name="filter" size={16} /></Button>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, alignItems: "start" }}>
            {shown.map(v => (
              <VersionCard
                key={v.id}
                version={v}
                cv={cvs?.[v.id] ?? cv}
                outdated={isOutdated(v.id)}
                onToggle={on => setVersions(vs => vs.map(x => (x.id === v.id ? { ...x, active: on } : x)))}
                onOpen={() => onEdit?.(v)}
                onDuplicate={() => {
                  const copy = duplicateOf(v);
                  setVersions(vs => { const i = vs.findIndex(x => x.id === v.id); return [...vs.slice(0, i + 1), copy, ...vs.slice(i + 1)]; });
                  onDuplicate?.(v, copy);
                }}
                onDelete={() => setVersions(vs => vs.filter(x => x.id !== v.id))}
              />
            ))}
          </div>
        </div>
      </Page>

      {/* Create CV version — Figma Export CV revamp, "Create CV version" modal */}
      <CreateVersionModal open={creating} onClose={() => setCreating(false)} onCreate={create} />
    </div>
  );
}
