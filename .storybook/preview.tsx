import type { Preview } from "@storybook/react";
import "../src/styles/reset.scss";
import "../src/styles/tokens.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
