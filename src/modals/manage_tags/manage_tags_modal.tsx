// ManageTagsModal — "Manage tags" dialog (Figma "Tag roles" 2738:67102; two states: empty / filled with "Notify others" on)
//
// Opens from the bulk banner of Manage roles and Workflow, and from a row's menu. It tags what is selected, which is told by `unit` and `count`:
//   a single role · several roles · a single engagement · several engagements
// Pick a tag (required), add a note (500 characters) and, with "Notify others" on, choose who is notified. Update applies, Cancel closes.

import { useEffect, useState } from "react";

import { Modal }         from "../../components/modal/modal";
import { Icon }          from "../../components/icon/icon";
import { Switch }        from "../../components/switch/switch";
import { Tile }          from "../../components/tile/tile";
import { InputSelect, InputTextarea } from "../../components/input/input";
import { DropdownMultiSelection, DropdownSelection } from "../../components/dropdown/dropdown";

const bodyText:  React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 14, fontWeight: 400, color: "var(--palette-blue-0)", lineHeight: "150%" };
const labelText: React.CSSProperties = { fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 400, color: "var(--palette-blue-2)", lineHeight: "150%" };


export const DEFAULT_TAG_OPTIONS = ["EM to review", "RM to review", "Ready to book", "Needs rework", "On hold"];
export const DEFAULT_PEOPLE_OPTIONS = ["Megan Taylor", "Charlie Parker", "Spencer Harmon", "Santi Angulo"];
const toItems = (xs: string[]) => xs.map(t => ({ id: t, label: t }));
const NOTE_MAX = 500;
const summary = (ids: string[]) => (ids.length === 0 ? "" : ids.length <= 2 ? ids.join(", ") : `${ids.length} selected`);

export type TagRolesResult = { tag: string; note: string; notify: string[] };

export type TagPrefill = { tag: string; notify?: string[] };

export type ManageTagsModalProps = {
  open: boolean;
  /** The roles / engagements that are about to be tagged: listed in the dialog (a role with its engagement as second line) */
  items?: { label: string; subLabel?: string }[];
  /** How many roles / engagements are being tagged (the subtitle says it: "1 role", "3 engagements"). Default: the number of `items` */
  count?: number;
  /** What is being tagged: roles (default) or engagements */
  unit?: "role" | "engagement";
  onClose: () => void;
  /** Update: the tag, the note and the people to notify (empty when Notify others is off) */
  onUpdate: (r: TagRolesResult) => void;
  /** Tags in the dropdown (default: EM to review, RM to review, Ready to book, Needs rework, On hold) */
  tagOptions?: string[];
  /** People in the "Send a notification to" dropdown */
  peopleOptions?: string[];
  /** Person preselected when Notify others is switched on (default Megan Taylor, as in the Figma) */
  defaultNotify?: string;
  /** Opens with this tag (and Notify others on for these people) already picked */
  prefill?: TagPrefill;
};

export function ManageTagsModal({ open, items = [], count = items.length, unit = "role", onClose, onUpdate, tagOptions = DEFAULT_TAG_OPTIONS, peopleOptions = DEFAULT_PEOPLE_OPTIONS, defaultNotify = "Megan Taylor", prefill }: ManageTagsModalProps) {
  const [tag, setTag] = useState("");
  const [tagOpen, setTagOpen] = useState(false);
  const [note, setNote] = useState("");
  const [notify, setNotify] = useState(false);
  const [people, setPeople] = useState<string[]>([]);
  const [peopleOpen, setPeopleOpen] = useState(false);

  // Every opening starts empty
  useEffect(() => {
    if (open) { setTag(prefill?.tag ?? ""); setTagOpen(false); setNote(""); setNotify(!!prefill?.notify?.length); setPeople(prefill?.notify ?? []); setPeopleOpen(false); }
  }, [open]);

  const toggleNotify = (on: boolean) => {
    setNotify(on);
    if (on && people.length === 0) setPeople([defaultNotify]);   // Figma shows Megan Taylor prefilled
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Manage tags"
      subtitle={`${count} ${count === 1 ? unit : `${unit}s`}`}
      width={500}
      leftActions={[{ label: "Cancel", variant: "secondary", onClick: onClose }]}
      rightActions={[{ label: "Update", variant: "primary", disabled: !tag, onClick: () => onUpdate({ tag, note, notify: notify ? people : [] }) }]}
    >
      <span style={bodyText}>{count === 1 ? `Pick a tag to add to this ${unit}:` : `Pick a tag to add to these ${unit}s:`}</span>

      {/* What is about to get the tag (scrolls when there are many) */}
      {items.length > 0 && (
        <Tile tileStyle="default" padding="panel">
          <ul aria-label={`${unit === "role" ? "Roles" : "Engagements"} to tag`} style={{ listStyle: "none", margin: 0, padding: "0 4px", display: "flex", flexDirection: "column", gap: 8, maxHeight: 136, overflowY: "auto" }}>
            {items.map((it, i) => (
              <li key={`${it.label}-${i}`} style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                <span style={{ ...bodyText, fontWeight: 700, lineHeight: "115%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.label}</span>
                {it.subLabel && <span style={{ ...labelText, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.subLabel}</span>}
              </li>
            ))}
          </ul>
        </Tile>
      )}

      <div style={{ position: "relative" }}>
        <InputSelect label="Tag" value={tag} onClick={() => setTagOpen(o => !o)} />
        {/* Figma: the empty field stays plain; a muted warning line says why Update is disabled */}
        {!tag && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, paddingLeft: 4 }}>
            <Icon name="warning" size={14} style={{ color: "var(--palette-blue-2)" }} />
            <span style={labelText}>No tag</span>
          </div>
        )}
        {tag && (
          <button
            type="button"
            title="Clear tag"
            onClick={() => setTag("")}
            style={{ position: "absolute", top: -2, right: 0, width: 20, height: 20, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--palette-blue-0)" }}
          >
            <Icon name="filter-clean" size={14} />
          </button>
        )}
        {tagOpen && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 9 }} onClick={() => setTagOpen(false)} />
            <div style={{ position: "absolute", top: tag ? "calc(100% - 4px)" : "calc(100% - 24px)", left: 0, right: 0, zIndex: 10 }}>
              <DropdownSelection items={toItems(tagOptions)} selectedId={tag} onSelect={id => { setTag(id); setTagOpen(false); }} />
            </div>
          </>
        )}
      </div>

      <InputTextarea
        label="Note"
        rows={4}
        value={note}
        message={`${note.length}/${NOTE_MAX}`}
        onChange={e => setNote(e.target.value.slice(0, NOTE_MAX))}
      />

      <Switch checked={notify} onChange={toggleNotify} label="Notify others" showLabel layout="horizontal-left" />

      {notify && (
        <div style={{ position: "relative" }}>
          <InputSelect
            label="Send a notification to"
            value={summary(people)}
            state="instructions"
            message="All selected people will be notified."
            onClick={() => setPeopleOpen(o => !o)}
          />
          {peopleOpen && (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 9 }} onClick={() => setPeopleOpen(false)} />
              <div style={{ position: "absolute", top: "calc(100% - 28px)", left: 0, right: 0, zIndex: 10 }}>
                <DropdownMultiSelection items={toItems(peopleOptions)} selectedIds={people} onSelectionChange={setPeople} searchable={false} />
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}
