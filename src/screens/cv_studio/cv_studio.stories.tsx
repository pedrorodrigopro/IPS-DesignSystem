// CV Studio screen — export one or several CVs
// Figma: Export CV revamp (eLJ4mtITbBhHCbONvKtGZU)
//   Single export:  653:36523   Multi export: 653:37833   Left module (ProPilot): 1440:36072
//
// Layout (Page variant="fluid" — edge to edge, 24px top inset):
//   Header row      Header (page) — CV name, or "3 CVs" + names — and File type / Template selectors (InputInline)
//   Content row     LEFT module (413px, or 389px for ProPilot) | RIGHT CV preview card
//                   Left module is one of two modes, switched with the Navigation tabs (and "Edit content"):
//                     Edit fields — "Translate to" Tile + Tile with Navigation (ProPilot | Edit fields) and the CV fields
//                     ProPilot    — Tile with Header "ProPilot", conversation, PPChatInput
//                   Right: Tile highlight — toolbar (pager for multi, Version selector, "Edit content" in ProPilot mode),
//                          then the scrolling CV preview (photo, logo, label/value rows)
//   Footer          Actions sticky-panel — Close | Save, Export (single) / split ButtonGroups "Save (3)", "Export (3)" (multi)
//
// Both columns are taller than the visible area by 24px so the footer clips them, as in Figma.

import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { Navbar }          from "../../components/navbar/navbar";
import { Page }            from "../../components/layout/layout";
import { Tile }            from "../../components/tile/tile";
import { Header }          from "../../components/header/header";
import { Navigation }      from "../../components/navigation/navigation";
import { Button }          from "../../components/button/button";
import { ButtonGroup }     from "../../components/button_group/button_group";
import { Actions }         from "../../components/actions/actions";
import { Divider }         from "../../components/divider/divider";
import { Icon }            from "../../components/icon/icon";
import { Input, InputInline, InputSelect, InputTextarea } from "../../components/input/input";
import { DropdownSelection } from "../../components/dropdown/dropdown";
import { PPBubble }        from "../../components/pp_bubble/pp_bubble";
import { PPChatInput }     from "../../components/pp_chat_input/pp_chat_input";

import cvPhoto  from "./assets/cv-photo.jpg";
import PFLogo   from "./assets/profinda-logo.svg";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type FieldKey =
  | "name" | "jobTitle" | "bio" | "email" | "phone" | "location" | "talentPool"
  | "businessLine" | "department" | "costCentre" | "team" | "languages" | "skills" | "accreditations";

type CV = Record<FieldKey, string>;

const FIELDS: { key: FieldKey; label: string; multiline?: boolean }[] = [
  { key: "name",           label: "Name" },
  { key: "jobTitle",       label: "Job title" },
  { key: "bio",            label: "Bio", multiline: true },
  { key: "email",          label: "Email" },
  { key: "phone",          label: "Phone" },
  { key: "location",       label: "Location" },
  { key: "talentPool",     label: "Talent Pool" },
  { key: "businessLine",   label: "Business Line" },
  { key: "department",     label: "Department" },
  { key: "costCentre",     label: "Cost Centre" },
  { key: "team",           label: "Team" },
  { key: "languages",      label: "Languages" },
  { key: "skills",         label: "Skills" },
  { key: "accreditations", label: "Accreditations" },
];

const ZARA: CV = {
  name: "Zara Bond",
  jobTitle: "Accountant",
  bio: "Reliable accounting professional, known for seriousness, integrity, and quick learning. Highly skilled with a sharp eye for identifying and correcting errors. Eager to find a position where a strong work ethic and resourceful character are valued.",
  email: "zara.bond@pf.com",
  phone: "378 098 738",
  location: "London",
  talentPool: "Admin’s pool",
  businessLine: "Operations",
  department: "Management",
  costCentre: "C01122",
  team: "Accounting",
  languages: "Dutch, English, Finnish, French",
  skills: "Payroll supervision, Invoicing and collections, Month-end reporting, Budgeting and forecasting, Expense reporting, Motivated professional, Communication skills, Data trend awareness",
  accreditations: "CPA, ACCA, CFA",
};

// Names are from the Figma ("Zara Bond, John Smith, Mary Lee, +5"); the rest of their data is placeholder.
const JOHN: CV = {
  ...ZARA,
  name: "John Smith",
  jobTitle: "Senior Consultant",
  bio: "Consultant with ten years of experience leading finance transformation programmes for banks and insurers. Comfortable moving between executive workshops and detailed process design.",
  email: "john.smith@pf.com",
  phone: "378 098 112",
  location: "Manchester",
  talentPool: "Consulting pool",
  businessLine: "Advisory",
  department: "Finance transformation",
  costCentre: "C01340",
  team: "Banking",
  languages: "English, German",
  skills: "Programme management, Process design, Stakeholder management, Financial controls, Workshop facilitation",
  accreditations: "PMP, Prince2",
};
const MARY: CV = {
  ...ZARA,
  name: "Mary Lee",
  jobTitle: "Financial Analyst",
  bio: "Analyst focused on forecasting and variance reporting. Builds clear dashboards that help non-finance teams make faster decisions.",
  email: "mary.lee@pf.com",
  phone: "378 098 475",
  location: "Edinburgh",
  talentPool: "Analytics pool",
  businessLine: "Finance",
  department: "Planning",
  costCentre: "C01207",
  team: "FP&A",
  languages: "English, Spanish",
  skills: "Forecasting, Variance analysis, SQL, Dashboarding, Budgeting",
  accreditations: "CFA Level II",
};

const FILE_TYPES  = [{ id: ".pdf", label: ".pdf" }, { id: ".docx", label: ".docx" }];
const TEMPLATES   = [{ id: "PF_template_1", label: "PF_template_1" }, { id: "PF_template_2", label: "PF_template_2" }];
const VERSIONS    = [{ id: "V1, English Banking", label: "V1, English Banking" }, { id: "V2, English Consulting", label: "V2, English Consulting" }];
const TRANSLATE   = ["Dutch", "English", "Finnish", "French", "German", "Spanish"].map(l => ({ id: l, label: l }));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Small helpers
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const body: React.CSSProperties = {
  fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%",
};
const bodyBold: React.CSSProperties = { ...body, fontWeight: 700 };

/** Opens an IPS selection dropdown under whatever trigger is passed; closes on outside click. */
function SelectMenu({
  items, selectedId, onSelect, align = "left", children,
}: {
  items: { id: string; label: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  align?: "left" | "right";
  children: (toggle: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {children(() => setOpen(o => !o))}
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 20 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "100%", [align]: 0, zIndex: 21, marginTop: 4 }}>
            <DropdownSelection items={items} selectedId={selectedId} onSelect={id => { onSelect(id); setOpen(false); }} />
          </div>
        </>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CV preview (right) — label / value rows. Values come from the edited CV.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 10, padding: 8, flex: 1, minWidth: 0 }}>
      <span style={{ ...body, width: 93, flexShrink: 0, lineHeight: "32px" }}>{label}</span>
      <span style={{ ...bodyBold, minWidth: 0, overflowWrap: "anywhere", padding: "5.5px 0" }}>{children}</span>
    </div>
  );
}

function PreviewPair({ left, right, cv }: { left: [string, FieldKey]; right: [string, FieldKey]; cv: CV }) {
  return (
    <div style={{ display: "flex", gap: 8, padding: "0 4px" }}>
      <PreviewRow label={left[0]}>{cv[left[1]]}</PreviewRow>
      <PreviewRow label={right[0]}>{cv[right[1]]}</PreviewRow>
    </div>
  );
}

function CVPreview({ cv }: { cv: CV }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Tile tileStyle="default" padding="panel" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 8px 8px" }}>
          <img src={cvPhoto} alt={cv.name} width={100} height={100} style={{ borderRadius: "50%", objectFit: "cover" }} />
          <PFLogo width={250} height={66} style={{ margin: "-4px 0" }} />
        </div>
        <PreviewRow label="Name">{cv.name}</PreviewRow>
        <PreviewRow label="Job title">{cv.jobTitle}</PreviewRow>
        <PreviewRow label="Bio">{cv.bio}</PreviewRow>
        <PreviewPair cv={cv} left={["Email", "email"]}               right={["Phone", "phone"]} />
        <PreviewPair cv={cv} left={["Location", "location"]}         right={["Talent Pool", "talentPool"]} />
        <PreviewPair cv={cv} left={["Business Line", "businessLine"]} right={["Department", "department"]} />
        <PreviewPair cv={cv} left={["Cost Centre", "costCentre"]}    right={["Team", "team"]} />
      </Tile>
      <PreviewRow label="Languages">{cv.languages}</PreviewRow>
      <PreviewRow label="Skills">{cv.skills}</PreviewRow>
      <PreviewRow label="Accreditations">{cv.accreditations}</PreviewRow>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Left module — Edit fields | ProPilot
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type Mode = "edit" | "propilot";

const MODE_TABS = [
  { id: "propilot", label: "ProPilot" },
  { id: "edit",     label: "Edit fields" },
];

function EditFieldsModule({
  cv, onChange, count, mode, onModeChange,
}: { cv: CV; onChange: (k: FieldKey, v: string) => void; count: number; mode: Mode; onModeChange: (m: Mode) => void }) {
  const [language, setLanguage] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 413, flexShrink: 0, height: "calc(100% + 24px)" }}>
      {/* Translate to */}
      <Tile tileStyle="highlight" padding="panel">
        <div style={{ padding: 4 }}>
        <SelectMenu items={TRANSLATE} selectedId={language} onSelect={setLanguage}>
          {toggle => (
            <div style={{ width: 190 }}>
              <InputSelect
                label={count > 1 ? `Translate ${count} CVs to` : "Translate to"}
                value={language}
                onClick={toggle}
              />
            </div>
          )}
        </SelectMenu>
        </div>
      </Tile>

      {/* Tabs + fields */}
      <Tile tileStyle="highlight" padding="content" style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, minHeight: 0 }}>
        <div style={{ padding: "0 8px" }}>
          <Navigation orientation="horizontal" tabs={MODE_TABS} activeId={mode} onChange={id => onModeChange(id as Mode)} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", flex: 1, minHeight: 0, padding: "0 8px 24px" }}>
          {FIELDS.map(f =>
            f.multiline ? (
              <InputTextarea key={f.key} label={f.label} rows={7} value={cv[f.key]} onChange={e => onChange(f.key, e.target.value)} />
            ) : (
              <Input key={f.key} label={f.label} value={cv[f.key]} onChange={e => onChange(f.key, e.target.value)} />
            )
          )}
        </div>
      </Tile>
    </div>
  );
}

function ProPilotModule() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  return (
    <Tile
      tileStyle="highlight"
      padding="content"
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 389, flexShrink: 0, height: "calc(100% + 24px)" }}
    >
      <div style={{ padding: "0 8px" }}><Header size="content" title="ProPilot" /></div>
      <Tile
        tileStyle="object-light"
        padding="content"
        style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8 }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: "flex-end", maxWidth: "100%" }}><PPBubble variant="light">{m}</PPBubble></div>
        ))}
      </Tile>
      <div style={{ padding: "0 8px 24px" }}>
        <PPChatInput
          value={draft}
          onChange={setDraft}
          onSend={text => { setMessages(ms => [...ms, text]); setDraft(""); }}
        />
      </div>
    </Tile>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Screen
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CVStudioScreen({ cvs, initialMode }: { cvs: CV[]; initialMode: Mode }) {
  const multi = cvs.length > 1;
  const [data, setData] = useState(cvs);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [fileType, setFileType] = useState(FILE_TYPES[0].id);
  const [template, setTemplate] = useState(TEMPLATES[0].id);
  const [version, setVersion] = useState(VERSIONS[0].id);

  useEffect(() => { setMode(initialMode); }, [initialMode]);

  const cv = data[index];
  const edit = (k: FieldKey, v: string) => setData(d => d.map((c, i) => (i === index ? { ...c, [k]: v } : c)));
  const names = multi ? `${cvs.slice(0, 3).map(c => c.name).join(", ")}, +5` : undefined;

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <Page navbar={<Navbar activeId={multi ? "profiles" : undefined} />} variant="fluid">
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>

          {/* Header row */}
          <div style={{ padding: "0 24px" }}>
            <Header
              size="page"
              title={multi ? `${cvs.length} CVs` : cv.name}
              subtitle={names}
              rightContent={
                <div style={{ display: "flex", gap: 10 }}>
                  <SelectMenu items={FILE_TYPES} selectedId={fileType} onSelect={setFileType} align="right">
                    {toggle => <InputInline inlineLabel="File type" value={fileType} onClick={toggle} />}
                  </SelectMenu>
                  <SelectMenu items={TEMPLATES} selectedId={template} onSelect={setTemplate} align="right">
                    {toggle => <InputInline inlineLabel="Template" value={template} onClick={toggle} />}
                  </SelectMenu>
                </div>
              }
            />
          </div>

          {/* Content row */}
          <div style={{ display: "flex", gap: 16, padding: "16px 24px 0", flex: 1, minHeight: 0, overflow: "hidden", alignItems: "flex-start" }}>
            {mode === "edit" ? (
              <EditFieldsModule cv={cv} onChange={edit} count={cvs.length} mode={mode} onModeChange={setMode} />
            ) : (
              <ProPilotModule />
            )}

            {/* CV preview card */}
            <Tile
              tileStyle="highlight"
              padding="content"
              style={{ flex: 1, minWidth: 0, height: "calc(100% + 24px)", display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {multi && (
                    <>
                      <Button kind="icon" size="regular" title="Previous CV" disabled={index === 0} onClick={() => setIndex(i => i - 1)}>
                        <Icon name="chevron-left" size={16} />
                      </Button>
                      <span style={{ ...body, lineHeight: "115%" }}>{index + 1}/{cvs.length}</span>
                      <Button kind="icon" size="regular" title="Next CV" disabled={index === cvs.length - 1} onClick={() => setIndex(i => i + 1)}>
                        <Icon name="chevron-right" size={16} />
                      </Button>
                    </>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <SelectMenu items={VERSIONS} selectedId={version} onSelect={setVersion} align="right">
                    {toggle => <InputInline inlineLabel="Version" value={version} onClick={toggle} />}
                  </SelectMenu>
                  {mode === "propilot" && (
                    <Button kind="secondary" size="regular" onClick={() => setMode("edit")}>
                      <Icon name="edit" size={16} />Edit content
                    </Button>
                  )}
                </div>
              </div>
              <Divider orientation="horizontal" style={{ margin: "0 -16px" }} />
              <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 8px 24px" }}>
                <CVPreview cv={cv} />
              </div>
            </Tile>
          </div>

          {/* Footer */}
          <Actions
            variant="sticky-panel"
            leftActions={[{ label: "Close", variant: "secondary" }]}
            rightActions={multi ? [] : [{ label: "Save", variant: "secondary" }, { label: "Export", variant: "primary" }]}
            rightContent={
              multi ? (
                <>
                  <ButtonGroup label={`Save (${cvs.length})`} variant="secondary" />
                  <ButtonGroup label={`Export (${cvs.length})`} variant="primary" />
                </>
              ) : undefined
            }
          />
        </div>
      </Page>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Storybook meta + stories
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const meta: Meta = {
  title: "Screens/CVStudio",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/eLJ4mtITbBhHCbONvKtGZU?node-id=653-36523",
    },
    docs: {
      description: {
        component:
          "CV Studio — preview, edit and export CVs. Two export variants (single CV, multiple CVs) and two modes for the left module " +
          "(Edit fields, ProPilot), switched with the tabs or the “Edit content” button. " +
          "Uses Page variant=\"fluid\", Header, InputInline selectors, Tile, Navigation, Input / InputTextarea, PPChatInput, " +
          "ButtonGroup and Actions sticky-panel. Edits in the fields update the preview live. " +
          "Names, bio and details of John Smith and Mary Lee are placeholders.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const SingleExport: Story = {
  name: "Single export",
  parameters: { docs: { description: { story: "One CV (Figma 653:36523). Left module in Edit fields mode." } } },
  render: () => <CVStudioScreen cvs={[ZARA]} initialMode="edit" />,
};

export const SingleExportProPilot: Story = {
  name: "Single export — ProPilot",
  parameters: { docs: { description: { story: "One CV, left module in ProPilot mode. “Edit content” returns to Edit fields." } } },
  render: () => <CVStudioScreen cvs={[ZARA]} initialMode="propilot" />,
};

export const MultiExport: Story = {
  name: "Multi export",
  parameters: { docs: { description: { story: "Three CVs (Figma 653:37833): “3 CVs” title with names, pager, “Translate 3 CVs to”, split Save (3) / Export (3)." } } },
  render: () => <CVStudioScreen cvs={[ZARA, JOHN, MARY]} initialMode="edit" />,
};

export const MultiExportProPilot: Story = {
  name: "Multi export — ProPilot",
  parameters: { docs: { description: { story: "Three CVs, left module in ProPilot mode (Figma 1440:36072)." } } },
  render: () => <CVStudioScreen cvs={[ZARA, JOHN, MARY]} initialMode="propilot" />,
};
