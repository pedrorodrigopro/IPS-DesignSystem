import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Avatar } from "../components/avatar/avatar";
import { Badge } from "../components/badge/badge";
import { Button } from "../components/button/button";
import { Card } from "../components/card/card";
import { Divider } from "../components/divider/divider";
import { KpiCard } from "../components/kpi_card/kpi_card";
import { Modal } from "../components/modal/modal";
import { Sidepanel } from "../components/sidepanel/sidepanel";
import { Toast } from "../components/toast/toast";

export default {
  title: "Prototypes/Booking Flow",
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r",
    },
  },
} satisfies Meta;

const candidates = [
  { id: 1, name: "Sarah Johnson", role: "Senior Engineer", matchScore: 92, status: "Available", statusKind: "success" as const },
  { id: 2, name: "Alex Chen", role: "Product Manager", matchScore: 78, status: "Partially available", statusKind: "warning" as const },
  { id: 3, name: "Maria Garcia", role: "UX Designer", matchScore: 65, status: "Booked", statusKind: "info" as const },
];

export const FullBookingFlow: StoryFn = () => {
  const [sidepanelOpen, setSidepanelOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleBook = (candidate: typeof candidates[0]) => {
    setSelectedCandidate(candidate);
    setSidepanelOpen(true);
  };

  const handleConfirmBooking = () => {
    setSidepanelOpen(false);
    setToast(`${selectedCandidate?.name} booked successfully.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--paletteNeutral5)", fontFamily: "var(--fontFamilyRegular, system-ui, sans-serif)" }}>
      <header style={{ height: 56, background: "var(--paletteBlue0)", display: "flex", alignItems: "center", padding: "0 24px", gap: 16 }}>
        <span style={{ color: "white", fontWeight: 700, fontSize: "var(--fontSizeMd)" }}>ProFinda</span>
        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "var(--fontSizeSm)" }}>Booking Engine</span>
        <div style={{ flex: 1 }} />
        <Avatar name="Pedro Rodrigo" size="sm" />
      </header>

      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <KpiCard label="Compliant" value={24} status="success" statusLabel="On track" />
          <KpiCard label="Exceptions" value={3} status="danger" statusLabel="Needs review" />
          <KpiCard label="Requested" value={8} status="warning" statusLabel="Pending" />
          <KpiCard label="Total bookings" value={35} />
        </div>

        <Divider />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: "var(--fontSizeLg)", fontWeight: 700, color: "var(--paletteBlue0)" }}>
              Senior Engineer · Q4 2026
            </h1>
            <p style={{ fontSize: "var(--fontSizeSm)", color: "var(--paletteNeutral3)", marginTop: 4 }}>
              3 candidates · 1 vacancy
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button kind="ghost" text="Filters" />
            <Button kind="secondary" text="Export" />
            <Button kind="destructive" text="Delete booking" onClick={() => setDeleteModalOpen(true)} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {candidates.map((candidate) => (
            <Card
              key={candidate.id}
              name={candidate.name}
              role={candidate.role}
              matchScore={candidate.matchScore}
              status={candidate.status}
              statusKind={candidate.statusKind}
              onBook={() => handleBook(candidate)}
              onView={() => handleBook(candidate)}
            />
          ))}
        </div>
      </div>

      <Sidepanel
        isOpen={sidepanelOpen}
        title={selectedCandidate ? `Book ${selectedCandidate.name}` : "Booking Details"}
        onClose={() => setSidepanelOpen(false)}
        onPrimary={handleConfirmBooking}
        primaryLabel="Confirm booking"
      >
        {selectedCandidate && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar name={selectedCandidate.name} size="lg" />
              <div>
                <p style={{ fontWeight: 600, color: "var(--paletteBlue0)" }}>{selectedCandidate.name}</p>
                <p style={{ fontSize: "var(--fontSizeSm)", color: "var(--paletteNeutral3)" }}>{selectedCandidate.role}</p>
              </div>
              <Badge label={`${selectedCandidate.matchScore}% match`} status="info" />
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: "var(--fontSizeBody)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--paletteNeutral3)" }}>Start date</span>
                <span>01 Oct 2026</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--paletteNeutral3)" }}>End date</span>
                <span>31 Dec 2026</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--paletteNeutral3)" }}>Allocation</span>
                <span>100%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--paletteNeutral3)" }}>Status</span>
                <Badge label={selectedCandidate.status} status={selectedCandidate.statusKind} />
              </div>
            </div>
          </div>
        )}
      </Sidepanel>

      <Modal
        isOpen={deleteModalOpen}
        title="Delete booking"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteModalOpen(false);
          setToast("Booking deleted.");
          setTimeout(() => setToast(null), 3000);
        }}
        confirmLabel="Delete"
        confirmKind="destructive"
      >
        Are you sure you want to delete this booking? This action cannot be undone.
      </Modal>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 300 }}>
          <Toast message={toast} kind="success" onDismiss={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};
