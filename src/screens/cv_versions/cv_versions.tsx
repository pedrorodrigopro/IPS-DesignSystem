// CV Versions screen — all saved versions of a person's CV
// Figma: Export CV revamp, node 132:53016
//
// Layout (Page variant="full": 24px padding, 24px gap):
//   PageHeader     breadcrumbs "Profile: <name> / CV Versions", title, primary "Create CV version"
//   Toolbar row    InputSearch (283px) · sort selector ("By name") · "N versions" · filter icon button (right)
//   Cards grid     3 columns, gap 16. Tile highlight per version:
//                    header  Switch · name (bold) · edit icon button · delete icon button
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
import { InputSearch }  from "../../components/input/input";
import { Switch }       from "../../components/switch/switch";

import { CVPreview, SelectMenu, ZARA } from "../cv_studio/cv_studio";
import type { CV } from "../cv_studio/cv_studio";

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

const VERSIONS: CVVersion[] = [
  { id: "en-banking", name: "English, banking",        description: "English-speaking banking professionals",                   template: "Default", language: "English", editedBy: "John D.", editedAt: "Aug 28, 2026", active: true },
  { id: "es-banking", name: "Spanish, banking",        description: "Spanish-speaking banking professionals",                   template: "Default", language: "Spanish", editedBy: "John D.", editedAt: "Aug 28, 2026", active: false },
  { id: "es-pm",      name: "Spanish, project manager", description: "Spanish-speaking tailored for project manager roles",      template: "Default", language: "Spanish", editedBy: "John D.", editedAt: "Aug 28, 2026", active: false },
];

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

function VersionCard({
  version, cv, onToggle, onEdit, onDelete,
}: { version: CVVersion; cv: CV; onToggle: (on: boolean) => void; onEdit: () => void; onDelete: () => void }) {
  return (
    <Tile tileStyle="highlight" padding="content" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Switch checked={version.active} onChange={onToggle} showLabel={false} />
        <span style={{ ...bodyBold, flex: 1, minWidth: 0 }}>{version.name}</span>
        <Button kind="icon" size="regular" title="Edit version" onClick={onEdit}><Icon name="edit" size={16} /></Button>
        <Button kind="icon" size="regular" title="Delete version" onClick={onDelete}><Icon name="remove" size={16} /></Button>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Thumbnail cv={cv} />
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ ...value, lineHeight: "150%" }}>{version.description}</span>
          <Meta title="Template">{version.template}</Meta>
          <Meta title="Language">{version.language}</Meta>
          <Meta title="Last edited by">{version.editedBy} · {version.editedAt}</Meta>
        </div>
      </div>
    </Tile>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Screen
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CVVersionsScreen({
  personName = "Zara Bond",
  cv = ZARA,
  onBack,
  onCreate,
  onEdit,
}: {
  personName?: string;
  /** The CV shown in every thumbnail */
  cv?: CV;
  /** Breadcrumb "Profile: <name>" */
  onBack?: () => void;
  /** "Create CV version" */
  onCreate?: () => void;
  /** Edit icon on a card */
  onEdit?: (version: CVVersion) => void;
}) {
  const [versions, setVersions] = useState(VERSIONS);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name");

  const q = query.trim().toLowerCase();
  const shown = versions
    .filter(v => !q || `${v.name} ${v.description}`.toLowerCase().includes(q))
    .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : 0));

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Page navbar={<Navbar activeId="profile" />} variant="full">
        <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 24 }}>
          <PageHeader
            breadcrumbs={[{ label: `Profile: ${personName}`, onClick: onBack }, { label: "CV Versions" }]}
            title="CV Versions"
            actions={[{ label: "Create CV version", variant: "primary", onClick: onCreate }]}
          />

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
                cv={cv}
                onToggle={on => setVersions(vs => vs.map(x => (x.id === v.id ? { ...x, active: on } : x)))}
                onEdit={() => onEdit?.(v)}
                onDelete={() => setVersions(vs => vs.filter(x => x.id !== v.id))}
              />
            ))}
          </div>
        </div>
      </Page>
    </div>
  );
}
