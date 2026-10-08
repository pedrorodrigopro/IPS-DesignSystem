import type { Preview } from "@storybook/react";
import "../src/styles/reset.scss";
import "../src/styles/tokens.scss";

// ── Custom viewport presets ────────────────────────────────────────────────────

const VIEWPORTS = {
  screen1440: {
    name: "Desktop 1440×900",
    styles: { width: "1440px", height: "900px" },
    type: "desktop" as const,
  },
  screen1280: {
    name: "Desktop 1280×800",
    styles: { width: "1280px", height: "800px" },
    type: "desktop" as const,
  },
  screen1920: {
    name: "Desktop 1920×1080",
    styles: { width: "1920px", height: "1080px" },
    type: "desktop" as const,
  },
  tablet: {
    name: "Tablet 768×1024",
    styles: { width: "768px", height: "1024px" },
    type: "tablet" as const,
  },
  mobile: {
    name: "Mobile 375×812",
    styles: { width: "375px", height: "812px" },
    type: "mobile" as const,
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: VIEWPORTS,
      defaultViewport: "responsive",
    },
  },
  // Set the initial global viewport so Screens stories open at 1440×900
  initialGlobals: {
    viewport: { value: "responsive", isRotated: false },
  },
};

export default preview;
