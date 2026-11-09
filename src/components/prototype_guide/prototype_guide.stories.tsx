// PrototypeGuide stories — a tiny two-screen demo app with a side panel and a modal, so the guide can be checked against
// real IPS components: hotspots over navbar items, jumping across screens, panels / modals staying below the bar.
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PrototypeGuide } from "./prototype_guide";
import type { GuideStep } from "./prototype_guide";
import { Navbar } from "../navbar/navbar";
import { Page } from "../layout/layout";
import { Header } from "../header/header";
import { Tile } from "../tile/tile";
import { Button } from "../button/button";
import { InputSearch } from "../input/input";
import { SidePanel } from "../side_panel/side_panel";
import { Modal } from "../modal/modal";

const meta: Meta = {
  title: "Molecules/PrototypeGuide",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "screen1440" },
    docs: {
      description: {
        component:
          "Switchable tour for HTML prototypes. A dark tour bar on top (outside the platform design) has the Tour switch, " +
          "Back / Next, a step jump list and Restart; hotspots mark the clickable things of the current screen and the active " +
          "step shows a text-only popover with a spotlight. Steps are plain data (screen, CSS target, text, optional enter()).",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

type Screen = "home" | "detail";

function Demo({ defaultEnabled = false }: { defaultEnabled?: boolean }) {
  const [screen, setScreen] = useState<Screen>("home");
  const [panelOpen, setPanelOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const steps: GuideStep[] = [
    { id: "search", screen: "home", target: '[data-tour="search"]', title: "Search", body: "Find an item by name.", enter: () => setScreen("home") },
    { id: "open", screen: "home", target: '[data-tour="open"]', title: "Open an item", body: "Opens the detail screen.", enter: () => setScreen("home") },
    { id: "nav", screen: "home", target: 'nav[aria-label="Main navigation"] button[aria-label="Workflow"]', title: "Switch section", body: "Hotspots can sit on top of navbar items.", placement: "right", enter: () => setScreen("home") },
    { id: "detail", screen: "detail", target: '[data-tour="detail-title"]', title: "Detail screen", body: "You are on the detail screen.", enter: () => setScreen("detail") },
    { id: "panel", screen: "detail", target: '[data-tour="panel-btn"]', title: "Side panel", body: "Panels open below the tour bar.", placement: "left", enter: () => setScreen("detail") },
    { id: "modal", screen: "detail", target: '[data-tour="modal-btn"]', title: "Modal", body: "The guide hides while a modal is open.", placement: "left", enter: () => setScreen("detail") },
  ];

  return (
    <PrototypeGuide screen={screen} steps={steps} screenLabels={{ home: "Home", detail: "Detail" }} defaultEnabled={defaultEnabled}>
      <div style={{ minHeight: "var(--ips-vh, 100vh)", display: "flex" }}>
        <Page navbar={<Navbar activeId="workflow" />} variant="1280">
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", paddingBottom: 32 }}>
            {screen === "home" ? (
              <>
                <Header size="page" title="Home" />
                <div data-tour="search" style={{ width: 320 }}><InputSearch value="" onChange={() => {}} placeholder="Search" /></div>
                <Tile tileStyle="highlight" padding="content">
                  <div data-tour="open" style={{ display: "inline-block", width: "fit-content" }}>
                    <Button kind="primary" onClick={() => setScreen("detail")}>Open item</Button>
                  </div>
                </Tile>
              </>
            ) : (
              <>
                <div data-tour="detail-title" style={{ display: "inline-block", width: "fit-content" }}><Header size="page" title="Detail" /></div>
                <Tile tileStyle="highlight" padding="content">
                  <div style={{ display: "flex", gap: 12 }}>
                    <div data-tour="panel-btn"><Button kind="secondary" onClick={() => setPanelOpen(true)}>Open side panel</Button></div>
                    <div data-tour="modal-btn"><Button kind="secondary" onClick={() => setModalOpen(true)}>Open modal</Button></div>
                    <Button kind="tertiary" onClick={() => setScreen("home")}>Back to home</Button>
                  </div>
                </Tile>
                <Tile tileStyle="default" padding="content">
                  {Array.from({ length: 40 }, (_, i) => <p key={i}>Line {i + 1}</p>)}
                </Tile>
              </>
            )}
          </div>
        </Page>
      </div>
      <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} width={400}>
        <Header size="content" title="Side panel" />
      </SidePanel>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirm" rightActions={[{ label: "OK", variant: "primary", onClick: () => setModalOpen(false) }]}>
        <span>Modal content</span>
      </Modal>
    </PrototypeGuide>
  );
}

export const TourOff: Story = { name: "Tour off (default)", render: () => <Demo /> };
export const TourOn: Story = { name: "Tour on", render: () => <Demo defaultEnabled /> };
