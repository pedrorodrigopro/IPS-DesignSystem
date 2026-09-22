# IPS Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold `IPS-DesignSystem` as a Vite library + Storybook 8 React component package with Figmagic token sync, then build the booking flow vertical slice (atoms → molecules → organisms) and a composed prototype story.

**Architecture:** Vite in library mode outputs ESM + CJS from `src/`. Storybook 8 reads stories from `src/components/**/*.stories.tsx` and `src/prototypes/**/*.stories.tsx`. Figmagic syncs design tokens from the Figma IPS-Components file into `src/tokens/`, which are then compiled into CSS custom properties loaded globally in Storybook and exported with the package.

**Tech Stack:** React 19, TypeScript, Vite 6, Storybook 8, SCSS Modules, Figmagic 4.5.x, Node 22

---

## File map

### Created by this plan

```
IPS-DesignSystem/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── figmagic.json
├── .storybook/
│   ├── main.ts
│   └── preview.tsx
├── src/
│   ├── tokens/                        # auto-generated — do not edit
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── font_sizes.ts
│   │   ├── font_families.ts
│   │   ├── font_weights.ts
│   │   ├── line_heights.ts
│   │   ├── letter_spacings.ts
│   │   └── radii.ts
│   ├── styles/
│   │   ├── tokens.scss                # CSS custom properties from tokens
│   │   └── reset.scss
│   ├── components/
│   │   ├── index.ts                   # barrel export
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.module.scss
│   │   │   ├── button.stories.tsx
│   │   │   └── index.ts
│   │   ├── badge/
│   │   │   ├── badge.tsx
│   │   │   ├── badge.module.scss
│   │   │   ├── badge.stories.tsx
│   │   │   └── index.ts
│   │   ├── avatar/
│   │   │   ├── avatar.tsx
│   │   │   ├── avatar.module.scss
│   │   │   ├── avatar.stories.tsx
│   │   │   └── index.ts
│   │   ├── input/
│   │   │   ├── input.tsx
│   │   │   ├── input.module.scss
│   │   │   ├── input.stories.tsx
│   │   │   └── index.ts
│   │   ├── checkbox/
│   │   │   ├── checkbox.tsx
│   │   │   ├── checkbox.module.scss
│   │   │   ├── checkbox.stories.tsx
│   │   │   └── index.ts
│   │   ├── switch/
│   │   │   ├── switch.tsx
│   │   │   ├── switch.module.scss
│   │   │   ├── switch.stories.tsx
│   │   │   └── index.ts
│   │   ├── tooltip/
│   │   │   ├── tooltip.tsx
│   │   │   ├── tooltip.module.scss
│   │   │   ├── tooltip.stories.tsx
│   │   │   └── index.ts
│   │   ├── divider/
│   │   │   ├── divider.tsx
│   │   │   ├── divider.module.scss
│   │   │   ├── divider.stories.tsx
│   │   │   └── index.ts
│   │   ├── dropdown/
│   │   │   ├── dropdown.tsx
│   │   │   ├── dropdown.module.scss
│   │   │   ├── dropdown.stories.tsx
│   │   │   └── index.ts
│   │   ├── card/
│   │   │   ├── card.tsx
│   │   │   ├── card.module.scss
│   │   │   ├── card.stories.tsx
│   │   │   └── index.ts
│   │   ├── toast/
│   │   │   ├── toast.tsx
│   │   │   ├── toast.module.scss
│   │   │   ├── toast.stories.tsx
│   │   │   └── index.ts
│   │   ├── kpi_card/
│   │   │   ├── kpi_card.tsx
│   │   │   ├── kpi_card.module.scss
│   │   │   ├── kpi_card.stories.tsx
│   │   │   └── index.ts
│   │   ├── sidepanel/
│   │   │   ├── sidepanel.tsx
│   │   │   ├── sidepanel.module.scss
│   │   │   ├── sidepanel.stories.tsx
│   │   │   └── index.ts
│   │   └── modal/
│   │       ├── modal.tsx
│   │       ├── modal.module.scss
│   │       ├── modal.stories.tsx
│   │       └── index.ts
│   └── prototypes/
│       └── booking_flow.stories.tsx
└── .gitignore
```

---

## Task 1: Initialise the repository

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.gitignore`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "@ips/design-system",
  "version": "0.1.0",
  "private": false,
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles": "./dist/styles/tokens.css"
  },
  "files": ["dist"],
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "tsc && vite build",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build -o storybook-static",
    "figmagic:sync": "figmagic"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@storybook/addon-a11y": "^8.5.3",
    "@storybook/addon-actions": "^8.5.3",
    "@storybook/addon-controls": "^8.5.3",
    "@storybook/addon-designs": "8.1.0",
    "@storybook/addon-docs": "^8.5.3",
    "@storybook/addon-viewport": "^8.5.3",
    "@storybook/builder-vite": "^8.6.12",
    "@storybook/react": "^8.5.3",
    "@storybook/react-vite": "^8.5.3",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "classnames": "^2.3.2",
    "figmagic": "^4.5.8",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "sass": "^1.63.6",
    "storybook": "^8.5.3",
    "typescript": "^5.6.2",
    "vite": "^6.4.2",
    "vite-plugin-dts": "^4.0.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "storybook-static"]
}
```

- [ ] **Step 3: Create `.gitignore`**

```
node_modules/
dist/
storybook-static/
.DS_Store
*.log
.superpowers/
```

- [ ] **Step 4: Install dependencies**

```bash
cd /Users/pedrorodrigo/workspace/workspace/IPS-DesignSystem
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json tsconfig.json .gitignore
git commit -m "chore: initialise IPS-DesignSystem package"
```

---

## Task 2: Configure Vite in library mode

**Files:**
- Create: `vite.config.ts`

- [ ] **Step 1: Create `vite.config.ts`**

```ts
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["src"], exclude: ["src/**/*.stories.tsx", "src/prototypes"] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/index.ts"),
      name: "IPSDesignSystem",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "styles/tokens.css";
          }
          return assetInfo.name ?? "asset";
        },
      },
    },
    cssCodeSplit: false,
  },
});
```

- [ ] **Step 2: Verify config is valid**

```bash
cd /Users/pedrorodrigo/workspace/workspace/IPS-DesignSystem
npx tsc --noEmit
```

Expected: no errors (or only "cannot find module" for src files that don't exist yet — that's fine at this stage).

- [ ] **Step 3: Commit**

```bash
git add vite.config.ts
git commit -m "chore: configure Vite library mode"
```

---

## Task 3: Configure Storybook

**Files:**
- Create: `.storybook/main.ts`
- Create: `.storybook/preview.tsx`

- [ ] **Step 1: Create `.storybook/main.ts`**

```ts
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
```

- [ ] **Step 2: Create `.storybook/preview.tsx`**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add .storybook/
git commit -m "chore: configure Storybook 8"
```

---

## Task 4: Configure Figmagic and sync tokens

**Files:**
- Create: `figmagic.json`
- Create: `src/tokens/` (auto-generated)
- Create: `src/styles/tokens.scss`
- Create: `src/styles/reset.scss`

- [ ] **Step 1: Create `figmagic.json`**

```json
{
  "outputFolderTokens": "src/tokens",
  "outputFormatTokens": "ts",
  "outputFormatColors": "hex",
  "token": "figd_8GXmtHfEiwiQjc4DBbLz-FXEYrU2d9HsU6oZgRH_",
  "url": "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r"
}
```

- [ ] **Step 2: Run Figmagic to sync tokens**

```bash
cd /Users/pedrorodrigo/workspace/workspace/IPS-DesignSystem
npx figmagic
```

Expected: `src/tokens/` created with `colors.ts`, `spacing.ts`, `font_sizes.ts`, `radii.ts`, etc.

If Figmagic errors on the URL format, try:
```bash
FIGMA_TOKEN=figd_8GXmtHfEiwiQjc4DBbLz-FXEYrU2d9HsU6oZgRH_ npx figmagic
```

- [ ] **Step 3: Create `src/styles/reset.scss`**

```scss
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 4: Create `src/styles/tokens.scss`**

Open `src/tokens/colors.ts` and `src/tokens/spacing.ts` to see the generated token names, then create `src/styles/tokens.scss` mapping them to CSS custom properties. The pattern from `premiumui` is:

```scss
// Auto-generated from src/tokens/* — re-run `npm run figmagic:sync` to update
// Add new token mappings here after each sync

@use "sass:map";

:root {
  // Colors — from src/tokens/colors.ts
  // Map each key from the colors object as a CSS custom property
  // Example (replace with actual keys from your sync output):
  --paletteBlue0: #2b3991;
  --paletteBlue1: #4a5fb5;
  --paletteBlue2: #eef0fa;
  --paletteNeutral0: #1a1a2e;
  --paletteNeutral1: #4a4a6a;
  --paletteNeutral2: #8a8aaa;
  --paletteNeutral3: #c8c8e0;
  --paletteNeutral4: #f0f0f8;
  --paletteNeutral5: #fafafd;
  --paletteRed0: #c0392b;
  --paletteGreen0: #1e8449;
  --paletteGreen1: #27ae60;
  --paletteGreen2: #eafaf1;
  --paletteOrange0: #d35400;
  --paletteOrange1: #e67e22;
  --white: #ffffff;

  // Spacing — from src/tokens/spacing.ts
  --spacingXs: 4px;
  --spacingSm: 8px;
  --spacingMd: 12px;
  --spacingLg: 16px;
  --spacingXl: 24px;
  --spacing2xl: 32px;

  // Radii — from src/tokens/radii.ts
  --radiusSm: 4px;
  --radiusMd: 6px;
  --radiusLg: 10px;
  --radiusFull: 9999px;

  // Typography — from src/tokens/font_sizes.ts
  --fontSizeXs: 11px;
  --fontSizeSm: 12px;
  --fontSizeBody: 14px;
  --fontSizeMd: 15px;
  --fontSizeLg: 18px;
  --fontSizeXl: 22px;
}
```

**Important:** After running `npx figmagic`, open the generated token files and update the CSS variable values in `tokens.scss` to match the actual generated values. The values above are approximations from the existing prototype — the Figma file is the source of truth.

- [ ] **Step 5: Start Storybook to verify styles load**

```bash
cd /Users/pedrorodrigo/workspace/workspace/IPS-DesignSystem
npm run storybook
```

Expected: Storybook opens at `http://localhost:6006`. No errors in terminal. (It will show an empty library — that's fine.)

- [ ] **Step 6: Commit**

```bash
git add figmagic.json src/styles/ src/tokens/
git commit -m "chore: add Figmagic config and token styles"
```

---

## Task 5: Build the Button component

**Files:**
- Create: `src/components/button/button.tsx`
- Create: `src/components/button/button.module.scss`
- Create: `src/components/button/button.stories.tsx`
- Create: `src/components/button/index.ts`
- Create: `src/components/index.ts`

- [ ] **Step 1: Create `src/components/button/button.tsx`**

Reference the `premiumui` button at `/Users/pedrorodrigo/workspace/premiumui/assets/javascripts/core/components/button/button.tsx` for the prop types and logic. The IPS version removes internal `PFCore` dependencies:

```tsx
import classNames from "classnames";
import { forwardRef } from "react";
import css from "./button.module.scss";

export type ButtonKind =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "tertiary";

export type ButtonProps = {
  children?: React.ReactNode;
  text?: string;
  kind?: ButtonKind;
  small?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  title?: string;
  id?: string;
  style?: React.CSSProperties;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      text,
      kind = "primary",
      small = false,
      disabled = false,
      className,
      onClick,
      type = "button",
      title,
      id,
      style,
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      id={id}
      title={title}
      disabled={disabled}
      style={style}
      onClick={onClick}
      className={classNames(
        css.button,
        css[kind],
        { [css.small]: small },
        className
      )}
    >
      {children ?? text}
    </button>
  )
);

Button.displayName = "Button";
```

- [ ] **Step 2: Create `src/components/button/button.module.scss`**

```scss
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacingSm);
  height: 32px;
  border: 1px solid transparent;
  padding: var(--spacingSm) var(--spacingLg);
  border-radius: var(--radiusMd);
  font-size: var(--fontSizeBody);
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.small {
    height: 24px;
    padding: var(--spacingXs) var(--spacingSm);
    font-size: var(--fontSizeSm);
  }

  &.primary {
    background-color: var(--paletteBlue0);
    color: var(--white);
    border-color: var(--paletteBlue0);

    &:hover:not(:disabled) {
      background-color: var(--paletteBlue1);
      border-color: var(--paletteBlue1);
    }
  }

  &.secondary {
    background-color: transparent;
    color: var(--paletteBlue0);
    border-color: var(--paletteBlue0);

    &:hover:not(:disabled) {
      background-color: var(--paletteBlue2);
    }
  }

  &.ghost {
    background-color: transparent;
    color: var(--paletteNeutral1);
    border-color: transparent;

    &:hover:not(:disabled) {
      background-color: var(--paletteNeutral4);
    }
  }

  &.danger {
    background-color: var(--paletteRed0);
    color: var(--white);
    border-color: var(--paletteRed0);

    &:hover:not(:disabled) {
      background-color: #a93226;
      border-color: #a93226;
    }
  }

  &.tertiary {
    background-color: var(--paletteNeutral4);
    color: var(--paletteNeutral0);
    border-color: var(--paletteNeutral4);

    &:hover:not(:disabled) {
      background-color: var(--paletteNeutral3);
    }
  }
}
```

- [ ] **Step 3: Create `src/components/button/button.stories.tsx`**

```tsx
import type { Meta, StoryFn } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r",
    },
  },
} satisfies Meta<typeof Button>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
    {children}
  </div>
);

export const AllVariants: StoryFn<typeof Button> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Row>
      <Button kind="primary" text="Primary" />
      <Button kind="secondary" text="Secondary" />
      <Button kind="ghost" text="Ghost" />
      <Button kind="danger" text="Danger" />
      <Button kind="tertiary" text="Tertiary" />
    </Row>
    <Row>
      <Button kind="primary" text="Small primary" small />
      <Button kind="secondary" text="Small secondary" small />
      <Button kind="ghost" text="Small ghost" small />
    </Row>
    <Row>
      <Button kind="primary" text="Disabled" disabled />
      <Button kind="secondary" text="Disabled" disabled />
    </Row>
  </div>
);

export const Primary: StoryFn<typeof Button> = (args) => <Button {...args} />;
Primary.args = { text: "Primary button", kind: "primary" };

export const Secondary: StoryFn<typeof Button> = (args) => <Button {...args} />;
Secondary.args = { text: "Secondary button", kind: "secondary" };

export const Danger: StoryFn<typeof Button> = (args) => <Button {...args} />;
Danger.args = { text: "Delete", kind: "danger" };
```

- [ ] **Step 4: Create `src/components/button/index.ts`**

```ts
export * from "./button";
```

- [ ] **Step 5: Create `src/components/index.ts`**

```ts
export * from "./button";
```

- [ ] **Step 6: Verify Button appears in Storybook**

```bash
npm run storybook
```

Open `http://localhost:6006`. Expected: "Atoms/Button" in the sidebar with AllVariants, Primary, Secondary, Danger stories. All button variants render with correct colours from CSS variables.

- [ ] **Step 7: Commit**

```bash
git add src/components/
git commit -m "feat: add Button component with all variants"
```

---

## Task 6: Build atom components (Badge, Avatar, Input, Checkbox, Switch, Tooltip, Divider)

**Files:** One folder per component under `src/components/`, same structure as Button.

- [ ] **Step 1: Create `src/components/badge/badge.tsx`**

```tsx
import classNames from "classnames";
import css from "./badge.module.scss";

export type BadgeStatus = "default" | "success" | "danger" | "warning" | "highlight" | "info";

export type BadgeProps = {
  label: string;
  status?: BadgeStatus;
  className?: string;
};

export const Badge = ({ label, status = "default", className }: BadgeProps) => (
  <span className={classNames(css.badge, css[status], className)}>{label}</span>
);
```

- [ ] **Step 2: Create `src/components/badge/badge.module.scss`**

```scss
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px var(--spacingSm);
  border-radius: var(--radiusFull);
  font-size: var(--fontSizeXs);
  font-weight: 600;
  white-space: nowrap;

  &.default {
    background-color: var(--paletteNeutral4);
    color: var(--paletteNeutral1);
  }

  &.success {
    background-color: var(--paletteGreen2);
    color: var(--paletteGreen0);
  }

  &.danger {
    background-color: #fdedec;
    color: var(--paletteRed0);
  }

  &.warning {
    background-color: #fef5ec;
    color: var(--paletteOrange0);
  }

  &.highlight {
    background-color: #fff8e1;
    color: #b7950b;
  }

  &.info {
    background-color: var(--paletteBlue2);
    color: var(--paletteBlue0);
  }
}
```

- [ ] **Step 3: Create `src/components/badge/badge.stories.tsx`**

```tsx
import type { Meta, StoryFn } from "@storybook/react";
import { Badge } from "./badge";

export default {
  title: "Atoms/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;

export const AllStatuses: StoryFn<typeof Badge> = () => (
  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
    <Badge label="Default" status="default" />
    <Badge label="Success" status="success" />
    <Badge label="Danger" status="danger" />
    <Badge label="Warning" status="warning" />
    <Badge label="Highlight" status="highlight" />
    <Badge label="Info" status="info" />
  </div>
);

export const Default: StoryFn<typeof Badge> = (args) => <Badge {...args} />;
Default.args = { label: "Role filled", status: "success" };
```

- [ ] **Step 4: Create `src/components/badge/index.ts`**

```ts
export * from "./badge";
```

- [ ] **Step 5: Create `src/components/avatar/avatar.tsx`**

```tsx
import classNames from "classnames";
import css from "./avatar.module.scss";

export type AvatarSize = "sm" | "md" | "lg";

export type AvatarProps = {
  src?: string;
  initials?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
};

export const Avatar = ({ src, initials, name, size = "md", className }: AvatarProps) => (
  <div
    className={classNames(css.avatar, css[size], className)}
    title={name}
    aria-label={name}
  >
    {src ? (
      <img src={src} alt={name ?? "avatar"} className={css.image} />
    ) : (
      <span className={css.initials}>{initials ?? name?.slice(0, 2).toUpperCase() ?? "?"}</span>
    )}
  </div>
);
```

- [ ] **Step 6: Create `src/components/avatar/avatar.module.scss`**

```scss
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radiusFull);
  background-color: var(--paletteBlue1);
  color: var(--white);
  font-weight: 600;
  overflow: hidden;
  flex-shrink: 0;

  &.sm { width: 24px; height: 24px; font-size: var(--fontSizeXs); }
  &.md { width: 32px; height: 32px; font-size: var(--fontSizeSm); }
  &.lg { width: 48px; height: 48px; font-size: var(--fontSizeMd); }

  .image { width: 100%; height: 100%; object-fit: cover; }
  .initials { line-height: 1; }
}
```

- [ ] **Step 7: Create `src/components/avatar/avatar.stories.tsx`**

```tsx
import type { Meta, StoryFn } from "@storybook/react";
import { Avatar } from "./avatar";

export default {
  title: "Atoms/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export const AllSizes: StoryFn<typeof Avatar> = () => (
  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
    <Avatar size="sm" name="Pedro Rodrigo" />
    <Avatar size="md" name="Pedro Rodrigo" />
    <Avatar size="lg" name="Pedro Rodrigo" />
  </div>
);

export const WithImage: StoryFn<typeof Avatar> = () => (
  <Avatar size="lg" src="https://i.pravatar.cc/150?img=3" name="Pedro Rodrigo" />
);

export const Default: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;
Default.args = { name: "Pedro Rodrigo", size: "md" };
```

- [ ] **Step 8: Create `src/components/avatar/index.ts`**

```ts
export * from "./avatar";
```

- [ ] **Step 9: Create `src/components/divider/divider.tsx`**

```tsx
import classNames from "classnames";
import css from "./divider.module.scss";

export type DividerProps = {
  vertical?: boolean;
  className?: string;
};

export const Divider = ({ vertical = false, className }: DividerProps) => (
  <hr className={classNames(css.divider, { [css.vertical]: vertical }, className)} />
);
```

- [ ] **Step 10: Create `src/components/divider/divider.module.scss`**

```scss
.divider {
  border: none;
  border-top: 1px solid var(--paletteNeutral3);
  margin: 0;
  width: 100%;

  &.vertical {
    border-top: none;
    border-left: 1px solid var(--paletteNeutral3);
    width: auto;
    height: 100%;
    align-self: stretch;
  }
}
```

- [ ] **Step 11: Create `src/components/divider/divider.stories.tsx`**

```tsx
import type { Meta, StoryFn } from "@storybook/react";
import { Divider } from "./divider";

export default {
  title: "Atoms/Divider",
  component: Divider,
} satisfies Meta<typeof Divider>;

export const Horizontal: StoryFn<typeof Divider> = () => (
  <div style={{ width: 300 }}>
    <p>Above</p>
    <Divider />
    <p>Below</p>
  </div>
);
```

- [ ] **Step 12: Create `src/components/divider/index.ts`**

```ts
export * from "./divider";
```

- [ ] **Step 13: Update `src/components/index.ts` to include all atoms**

```ts
export * from "./button";
export * from "./badge";
export * from "./avatar";
export * from "./divider";
```

- [ ] **Step 14: Verify all atoms appear in Storybook**

```bash
npm run storybook
```

Expected: Atoms/Button, Atoms/Badge, Atoms/Avatar, Atoms/Divider all visible in sidebar.

- [ ] **Step 15: Commit**

```bash
git add src/components/
git commit -m "feat: add Badge, Avatar, Divider atoms"
```

---

## Task 7: Build molecule components (Card, Toast, KPI card)

**Files:**
- Create: `src/components/card/`
- Create: `src/components/toast/`
- Create: `src/components/kpi_card/`

- [ ] **Step 1: Create `src/components/card/card.tsx`**

```tsx
import classNames from "classnames";
import { Avatar } from "../avatar/avatar";
import { Badge, BadgeStatus } from "../badge/badge";
import { Button } from "../button/button";
import css from "./card.module.scss";

export type CardProps = {
  name: string;
  role?: string;
  matchScore?: number;
  status?: string;
  statusKind?: BadgeStatus;
  avatarSrc?: string;
  onBook?: () => void;
  onView?: () => void;
  className?: string;
};

export const Card = ({
  name,
  role,
  matchScore,
  status,
  statusKind = "default",
  avatarSrc,
  onBook,
  onView,
  className,
}: CardProps) => (
  <div className={classNames(css.card, className)}>
    <div className={css.header}>
      <Avatar src={avatarSrc} name={name} size="md" />
      <div className={css.info}>
        <span className={css.name}>{name}</span>
        {role && <span className={css.role}>{role}</span>}
      </div>
      {matchScore !== undefined && (
        <span className={css.score}>{matchScore}%</span>
      )}
    </div>
    {status && (
      <div className={css.statusRow}>
        <Badge label={status} status={statusKind} />
      </div>
    )}
    <div className={css.actions}>
      {onView && <Button kind="ghost" text="View" small onClick={onView} />}
      {onBook && <Button kind="primary" text="Book" small onClick={onBook} />}
    </div>
  </div>
);
```

- [ ] **Step 2: Create `src/components/card/card.module.scss`**

```scss
.card {
  background: var(--white);
  border: 1px solid var(--paletteNeutral3);
  border-radius: var(--radiusLg);
  padding: var(--spacingLg);
  display: flex;
  flex-direction: column;
  gap: var(--spacingSm);
  min-width: 240px;
  box-shadow: 0 1px 4px rgb(43 57 145 / 8%);
  transition: box-shadow 0.15s ease;

  &:hover {
    box-shadow: 0 4px 16px rgb(43 57 145 / 14%);
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--spacingSm);
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .name {
    font-size: var(--fontSizeBody);
    font-weight: 600;
    color: var(--paletteNeutral0);
  }

  .role {
    font-size: var(--fontSizeSm);
    color: var(--paletteNeutral2);
  }

  .score {
    font-size: var(--fontSizeSm);
    font-weight: 700;
    color: var(--paletteBlue0);
    background: var(--paletteBlue2);
    padding: 2px var(--spacingSm);
    border-radius: var(--radiusFull);
  }

  .statusRow {
    display: flex;
  }

  .actions {
    display: flex;
    gap: var(--spacingSm);
    justify-content: flex-end;
    margin-top: var(--spacingXs);
  }
}
```

- [ ] **Step 3: Create `src/components/card/card.stories.tsx`**

```tsx
import type { Meta, StoryFn } from "@storybook/react";
import { Card } from "./card";

export default {
  title: "Molecules/Card",
  component: Card,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r",
    },
  },
} satisfies Meta<typeof Card>;

export const Match: StoryFn<typeof Card> = () => (
  <Card
    name="Sarah Johnson"
    role="Senior Engineer"
    matchScore={92}
    status="Available"
    statusKind="success"
    onBook={() => alert("Book clicked")}
    onView={() => alert("View clicked")}
  />
);

export const WithoutScore: StoryFn<typeof Card> = () => (
  <Card
    name="Alex Chen"
    role="Product Manager"
    onView={() => alert("View clicked")}
  />
);

export const Default: StoryFn<typeof Card> = (args) => <Card {...args} />;
Default.args = {
  name: "Pedro Rodrigo",
  role: "Designer",
  matchScore: 87,
  status: "Booked",
  statusKind: "info",
};
```

- [ ] **Step 4: Create `src/components/card/index.ts`**

```ts
export * from "./card";
```

- [ ] **Step 5: Create `src/components/toast/toast.tsx`**

```tsx
import classNames from "classnames";
import css from "./toast.module.scss";

export type ToastKind = "info" | "success" | "warning" | "error";

export type ToastProps = {
  message: string;
  kind?: ToastKind;
  onDismiss?: () => void;
  className?: string;
};

export const Toast = ({ message, kind = "info", onDismiss, className }: ToastProps) => (
  <div className={classNames(css.toast, css[kind], className)} role="alert">
    <span className={css.message}>{message}</span>
    {onDismiss && (
      <button className={css.dismiss} onClick={onDismiss} aria-label="Dismiss">
        ×
      </button>
    )}
  </div>
);
```

- [ ] **Step 6: Create `src/components/toast/toast.module.scss`**

```scss
.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacingMd);
  padding: var(--spacingMd) var(--spacingLg);
  border-radius: var(--radiusMd);
  font-size: var(--fontSizeBody);
  min-width: 280px;
  max-width: 480px;
  box-shadow: 0 4px 16px rgb(0 0 0 / 12%);

  &.info { background: var(--paletteBlue2); color: var(--paletteBlue0); }
  &.success { background: var(--paletteGreen2); color: var(--paletteGreen0); }
  &.warning { background: #fef5ec; color: var(--paletteOrange0); }
  &.error { background: #fdedec; color: var(--paletteRed0); }

  .message { flex: 1; }

  .dismiss {
    background: none;
    border: none;
    cursor: pointer;
    font-size: var(--fontSizeLg);
    line-height: 1;
    opacity: 0.6;
    color: inherit;

    &:hover { opacity: 1; }
  }
}
```

- [ ] **Step 7: Create `src/components/toast/toast.stories.tsx`**

```tsx
import type { Meta, StoryFn } from "@storybook/react";
import { Toast } from "./toast";

export default {
  title: "Molecules/Toast",
  component: Toast,
} satisfies Meta<typeof Toast>;

export const AllKinds: StoryFn<typeof Toast> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    <Toast kind="info" message="Booking created successfully." onDismiss={() => {}} />
    <Toast kind="success" message="Profile updated." onDismiss={() => {}} />
    <Toast kind="warning" message="This booking overlaps with another." onDismiss={() => {}} />
    <Toast kind="error" message="Failed to save. Please try again." onDismiss={() => {}} />
  </div>
);
```

- [ ] **Step 8: Create `src/components/toast/index.ts`**

```ts
export * from "./toast";
```

- [ ] **Step 9: Create `src/components/kpi_card/kpi_card.tsx`**

```tsx
import classNames from "classnames";
import { Badge, BadgeStatus } from "../badge/badge";
import css from "./kpi_card.module.scss";

export type KpiCardProps = {
  label: string;
  value: string | number;
  status?: BadgeStatus;
  statusLabel?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
};

export const KpiCard = ({
  label,
  value,
  status,
  statusLabel,
  className,
}: KpiCardProps) => (
  <div className={classNames(css.kpiCard, className)}>
    <span className={css.label}>{label}</span>
    <span className={css.value}>{value}</span>
    {status && statusLabel && (
      <Badge label={statusLabel} status={status} />
    )}
  </div>
);
```

- [ ] **Step 10: Create `src/components/kpi_card/kpi_card.module.scss`**

```scss
.kpiCard {
  background: var(--white);
  border: 1px solid var(--paletteNeutral3);
  border-radius: var(--radiusLg);
  padding: var(--spacingLg);
  display: flex;
  flex-direction: column;
  gap: var(--spacingSm);
  min-width: 140px;

  .label {
    font-size: var(--fontSizeSm);
    color: var(--paletteNeutral2);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .value {
    font-size: var(--fontSizeXl);
    font-weight: 700;
    color: var(--paletteNeutral0);
    line-height: 1;
  }
}
```

- [ ] **Step 11: Create `src/components/kpi_card/kpi_card.stories.tsx`**

```tsx
import type { Meta, StoryFn } from "@storybook/react";
import { KpiCard } from "./kpi_card";

export default {
  title: "Molecules/KPI Card",
  component: KpiCard,
} satisfies Meta<typeof KpiCard>;

export const Default: StoryFn<typeof KpiCard> = () => (
  <div style={{ display: "flex", gap: "16px" }}>
    <KpiCard label="Compliant" value={24} status="success" statusLabel="On track" />
    <KpiCard label="Exceptions" value={3} status="danger" statusLabel="Needs review" />
    <KpiCard label="Requested" value={8} status="warning" statusLabel="Pending" />
    <KpiCard label="Total" value={35} />
  </div>
);
```

- [ ] **Step 12: Create `src/components/kpi_card/index.ts`**

```ts
export * from "./kpi_card";
```

- [ ] **Step 13: Update `src/components/index.ts`**

```ts
export * from "./button";
export * from "./badge";
export * from "./avatar";
export * from "./divider";
export * from "./card";
export * from "./toast";
export * from "./kpi_card";
```

- [ ] **Step 14: Verify molecules in Storybook**

```bash
npm run storybook
```

Expected: Molecules/Card, Molecules/Toast, Molecules/KPI Card visible in sidebar.

- [ ] **Step 15: Commit**

```bash
git add src/components/
git commit -m "feat: add Card, Toast, KpiCard molecule components"
```

---

## Task 8: Build organism components (Sidepanel, Modal)

**Files:**
- Create: `src/components/sidepanel/`
- Create: `src/components/modal/`

- [ ] **Step 1: Create `src/components/sidepanel/sidepanel.tsx`**

```tsx
import classNames from "classnames";
import { Button } from "../button/button";
import { Divider } from "../divider/divider";
import css from "./sidepanel.module.scss";

export type SidepanelProps = {
  isOpen: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  onPrimary?: () => void;
  primaryLabel?: string;
  className?: string;
};

export const Sidepanel = ({
  isOpen,
  title,
  children,
  onClose,
  onPrimary,
  primaryLabel = "Save",
  className,
}: SidepanelProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={css.overlay} onClick={onClose} aria-hidden="true" />
      <aside className={classNames(css.sidepanel, className)} aria-label={title}>
        <div className={css.header}>
          <span className={css.title}>{title}</span>
          <button className={css.close} onClick={onClose} aria-label="Close sidepanel">
            ×
          </button>
        </div>
        <Divider />
        <div className={css.body}>{children}</div>
        {onPrimary && (
          <>
            <Divider />
            <div className={css.footer}>
              <Button kind="ghost" text="Cancel" onClick={onClose} />
              <Button kind="primary" text={primaryLabel} onClick={onPrimary} />
            </div>
          </>
        )}
      </aside>
    </>
  );
};
```

- [ ] **Step 2: Create `src/components/sidepanel/sidepanel.module.scss`**

```scss
.overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 30%);
  z-index: 100;
}

.sidepanel {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100dvh;
  background: var(--white);
  z-index: 101;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgb(43 57 145 / 12%);

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacingLg);
  }

  .title {
    font-size: var(--fontSizeMd);
    font-weight: 600;
    color: var(--paletteNeutral0);
  }

  .close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: var(--fontSizeXl);
    color: var(--paletteNeutral2);
    line-height: 1;
    padding: var(--spacingXs);

    &:hover { color: var(--paletteNeutral0); }
  }

  .body {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacingLg);
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacingSm);
    padding: var(--spacingLg);
  }
}
```

- [ ] **Step 3: Create `src/components/sidepanel/sidepanel.stories.tsx`**

```tsx
import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button/button";
import { Sidepanel } from "./sidepanel";

export default {
  title: "Organisms/Sidepanel",
  component: Sidepanel,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r",
    },
  },
} satisfies Meta<typeof Sidepanel>;

export const BookingDetails: StoryFn<typeof Sidepanel> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "24px" }}>
      <Button text="Open Booking Sidepanel" onClick={() => setIsOpen(true)} />
      <Sidepanel
        isOpen={isOpen}
        title="Booking Details"
        onClose={() => setIsOpen(false)}
        onPrimary={() => setIsOpen(false)}
        primaryLabel="Save booking"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p><strong>Resource:</strong> Sarah Johnson</p>
          <p><strong>Role:</strong> Senior Engineer</p>
          <p><strong>Start date:</strong> 01 Oct 2026</p>
          <p><strong>End date:</strong> 31 Dec 2026</p>
          <p><strong>Allocation:</strong> 100%</p>
        </div>
      </Sidepanel>
    </div>
  );
};
```

- [ ] **Step 4: Create `src/components/sidepanel/index.ts`**

```ts
export * from "./sidepanel";
```

- [ ] **Step 5: Create `src/components/modal/modal.tsx`**

```tsx
import classNames from "classnames";
import { Button } from "../button/button";
import { Divider } from "../divider/divider";
import css from "./modal.module.scss";

export type ModalProps = {
  isOpen: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  confirmKind?: "primary" | "danger";
  className?: string;
};

export const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmLabel = "Confirm",
  confirmKind = "primary",
  className,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={css.backdrop} onClick={onClose} aria-modal="true" role="dialog">
      <div
        className={classNames(css.modal, className)}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={css.header}>
          <span className={css.title}>{title}</span>
          <button className={css.close} onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        <Divider />
        <div className={css.body}>{children}</div>
        {onConfirm && (
          <>
            <Divider />
            <div className={css.footer}>
              <Button kind="ghost" text="Cancel" onClick={onClose} />
              <Button kind={confirmKind} text={confirmLabel} onClick={onConfirm} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
```

- [ ] **Step 6: Create `src/components/modal/modal.module.scss`**

```scss
.backdrop {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 45%);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacingXl);
}

.modal {
  background: var(--white);
  border-radius: var(--radiusLg);
  width: 100%;
  max-width: 480px;
  box-shadow: 0 8px 32px rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacingLg);
  }

  .title {
    font-size: var(--fontSizeMd);
    font-weight: 600;
    color: var(--paletteNeutral0);
  }

  .close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: var(--fontSizeXl);
    color: var(--paletteNeutral2);
    line-height: 1;
    padding: var(--spacingXs);

    &:hover { color: var(--paletteNeutral0); }
  }

  .body {
    padding: var(--spacingLg);
    color: var(--paletteNeutral1);
    font-size: var(--fontSizeBody);
    line-height: 1.6;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacingSm);
    padding: var(--spacingLg);
  }
}
```

- [ ] **Step 7: Create `src/components/modal/modal.stories.tsx`**

```tsx
import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button/button";
import { Modal } from "./modal";

export default {
  title: "Organisms/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r",
    },
  },
} satisfies Meta<typeof Modal>;

export const DeleteBooking: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "24px" }}>
      <Button kind="danger" text="Delete booking" onClick={() => setIsOpen(true)} />
      <Modal
        isOpen={isOpen}
        title="Delete booking"
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        confirmLabel="Delete"
        confirmKind="danger"
      >
        Are you sure you want to delete this booking? This action cannot be undone.
      </Modal>
    </div>
  );
};

export const Cancel: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "24px" }}>
      <Button kind="secondary" text="Cancel booking" onClick={() => setIsOpen(true)} />
      <Modal
        isOpen={isOpen}
        title="Cancel booking"
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        confirmLabel="Yes, cancel"
        confirmKind="danger"
      >
        Cancelling this booking will notify the resource and remove them from the role.
        Do you want to continue?
      </Modal>
    </div>
  );
};
```

- [ ] **Step 8: Create `src/components/modal/index.ts`**

```ts
export * from "./modal";
```

- [ ] **Step 9: Update `src/components/index.ts`**

```ts
export * from "./button";
export * from "./badge";
export * from "./avatar";
export * from "./divider";
export * from "./card";
export * from "./toast";
export * from "./kpi_card";
export * from "./sidepanel";
export * from "./modal";
```

- [ ] **Step 10: Verify organisms in Storybook**

```bash
npm run storybook
```

Expected: Organisms/Sidepanel and Organisms/Modal in sidebar, both fully interactive.

- [ ] **Step 11: Commit**

```bash
git add src/components/
git commit -m "feat: add Sidepanel and Modal organism components"
```

---

## Task 9: Build the booking flow prototype story

**Files:**
- Create: `src/prototypes/booking_flow.stories.tsx`

- [ ] **Step 1: Create `src/prototypes/booking_flow.stories.tsx`**

```tsx
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
    <div style={{ minHeight: "100vh", background: "var(--paletteNeutral5)", fontFamily: "system-ui, sans-serif" }}>
      {/* Top nav */}
      <header style={{ height: 56, background: "var(--paletteBlue0)", display: "flex", alignItems: "center", padding: "0 24px", gap: 16 }}>
        <span style={{ color: "white", fontWeight: 700, fontSize: "var(--fontSizeMd)" }}>ProFinda</span>
        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "var(--fontSizeSm)" }}>Booking Engine</span>
        <div style={{ flex: 1 }} />
        <Avatar name="Pedro Rodrigo" size="sm" />
      </header>

      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* KPI row */}
        <div style={{ display: "flex", gap: 12 }}>
          <KpiCard label="Compliant" value={24} status="success" statusLabel="On track" />
          <KpiCard label="Exceptions" value={3} status="danger" statusLabel="Needs review" />
          <KpiCard label="Requested" value={8} status="warning" statusLabel="Pending" />
          <KpiCard label="Total bookings" value={35} />
        </div>

        <Divider />

        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: "var(--fontSizeLg)", fontWeight: 700, color: "var(--paletteNeutral0)" }}>
              Senior Engineer · Q4 2026
            </h1>
            <p style={{ fontSize: "var(--fontSizeSm)", color: "var(--paletteNeutral2)", marginTop: 4 }}>
              3 candidates · 1 vacancy
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button kind="ghost" text="Filters" />
            <Button kind="secondary" text="Export" />
            <Button
              kind="danger"
              text="Delete booking"
              onClick={() => setDeleteModalOpen(true)}
            />
          </div>
        </div>

        {/* Candidate cards */}
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

      {/* Booking sidepanel */}
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
                <p style={{ fontWeight: 600, color: "var(--paletteNeutral0)" }}>{selectedCandidate.name}</p>
                <p style={{ fontSize: "var(--fontSizeSm)", color: "var(--paletteNeutral2)" }}>{selectedCandidate.role}</p>
              </div>
              <Badge label={`${selectedCandidate.matchScore}% match`} status="info" />
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: "var(--fontSizeBody)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--paletteNeutral2)" }}>Start date</span>
                <span>01 Oct 2026</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--paletteNeutral2)" }}>End date</span>
                <span>31 Dec 2026</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--paletteNeutral2)" }}>Allocation</span>
                <span>100%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--paletteNeutral2)" }}>Status</span>
                <Badge label={selectedCandidate.status} status={selectedCandidate.statusKind} />
              </div>
            </div>
          </div>
        )}
      </Sidepanel>

      {/* Delete modal */}
      <Modal
        isOpen={deleteModalOpen}
        title="Delete booking"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => { setDeleteModalOpen(false); setToast("Booking deleted."); setTimeout(() => setToast(null), 3000); }}
        confirmLabel="Delete"
        confirmKind="danger"
      >
        Are you sure you want to delete this booking? This action cannot be undone.
      </Modal>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 300 }}>
          <Toast message={toast} kind="success" onDismiss={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 2: Verify the prototype in Storybook**

```bash
npm run storybook
```

Open `http://localhost:6006`. Expected: "Prototypes/Booking Flow" in sidebar. Click "Full Booking Flow". You should see:
- Top nav with ProFinda branding
- 4 KPI cards
- 3 candidate cards with match scores
- Clicking "Book" opens the sidepanel with candidate details
- Clicking "Confirm booking" closes sidepanel and shows a success toast
- Clicking "Delete booking" opens the danger modal

- [ ] **Step 3: Commit**

```bash
git add src/prototypes/
git commit -m "feat: add booking flow prototype story"
```

---

## Task 10: Build the library and verify output

**Files:**
- No new files — verifies the Vite build output

- [ ] **Step 1: Run the library build**

```bash
cd /Users/pedrorodrigo/workspace/workspace/IPS-DesignSystem
npm run build
```

Expected: `dist/` created containing `index.js`, `index.cjs`, `index.d.ts`, and `styles/tokens.css`. No errors.

- [ ] **Step 2: Verify the barrel export is complete**

```bash
cat dist/index.js | grep "export"
```

Expected: exports for Button, Badge, Avatar, Divider, Card, Toast, KpiCard, Sidepanel, Modal all present.

- [ ] **Step 3: Link to premiumui for local testing**

```bash
cd /Users/pedrorodrigo/workspace/workspace/IPS-DesignSystem
npm link

cd /Users/pedrorodrigo/workspace/premiumui
npm link @ips/design-system
```

Then in any `premiumui` file, test the import resolves:

```ts
import { Button } from "@ips/design-system";
```

If the import resolves without TypeScript errors, the package is working.

- [ ] **Step 4: Final commit**

```bash
cd /Users/pedrorodrigo/workspace/workspace/IPS-DesignSystem
git add dist/ 2>/dev/null || true
git add -A
git commit -m "chore: verify library build and exports"
```

---

## Summary

| Task | What it produces |
|---|---|
| 1 | Repo initialised, dependencies installed |
| 2 | Vite in library mode configured |
| 3 | Storybook 8 configured |
| 4 | Figmagic synced, CSS tokens available |
| 5 | Button component — end-to-end proof |
| 6 | Badge, Avatar, Divider atoms |
| 7 | Card, Toast, KPI Card molecules |
| 8 | Sidepanel, Modal organisms |
| 9 | Booking flow prototype story |
| 10 | Library build verified, linkable from premiumui |
