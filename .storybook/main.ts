import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.stories.@(ts|tsx)",
    "../src/prototypes/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-designs",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
    "@storybook/addon-viewport",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;
