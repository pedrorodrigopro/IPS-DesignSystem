// "Create CV version" modal (name, description) — Figma Export CV revamp. Shared by CV Versions (standalone) and CV Exporter, whose Save asks for the
// name of the version at the end of the process.

import { useState } from "react";

import { Modal }                from "../../components/modal/modal";
import { Input, InputTextarea } from "../../components/input/input";

export type NewVersionInfo = { name: string; description: string };

export function CreateVersionModal({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (info: NewVersionInfo) => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const close = () => { setName(""); setDescription(""); onClose(); };
  return (
    <Modal
      open={open}
      onClose={close}
      title="Create CV version"
      width={512}
      leftActions={[{ label: "Cancel", variant: "secondary", onClick: close }]}
      rightActions={[{ label: "Create", variant: "primary", disabled: !name.trim(), onClick: () => { const info = { name: name.trim(), description: description.trim() }; setName(""); setDescription(""); onCreate(info); } }]}
    >
      <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
      <InputTextarea label="Description" rows={4} value={description} onChange={e => setDescription(e.target.value)} />
    </Modal>
  );
}
