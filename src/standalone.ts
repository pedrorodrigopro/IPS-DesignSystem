/// <reference types="vite/client" />
/**
 * Standalone browser entry — built by vite.standalone.config.ts into
 * dist-standalone/ips.js (IIFE, global `IPS`) + ips.css.
 *
 * Purpose: let someone write ONE html file that uses the real IPS components
 * and the real Storybook screens with no npm, no git clone and no build step.
 *
 *   <link rel="stylesheet" href="ips.css">
 *   <div id="root"></div>
 *   <script src="ips.js"></script>
 *   <script>
 *     const { html, mount, stories, Tile, Button } = IPS;
 *     mount("#root", html`<${stories["screens-workflow--engagements"].Component} />`);
 *   </script>
 *
 * Story ids are the same ids Storybook publishes in index.json, so the list of
 * what exists is always Storybook's own list.
 */
import htm from "htm";
import * as React from "react";
import { createRoot } from "react-dom/client";

export * from "./components";

export { React, createRoot };

/** Tagged-template JSX replacement: html`<${Button} kind="primary">Save<//>` */
export const html = htm.bind(React.createElement);

/** Render a React node into an element (or selector). Returns the root. */
export function mount(target: Element | string, node: React.ReactNode) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) throw new Error(`IPS.mount: target not found: ${String(target)}`);
  const root = createRoot(el);
  root.render(node);
  return root;
}

// ── Story registry ─────────────────────────────────────────────────────────────
// Same id algorithm as Storybook (sanitize + lodash startCase of the export
// name), so ids match index.json exactly. Verified against the live index.

const sanitize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

const words = (s: string) =>
  s.match(/[A-Z]{2,}(?=[A-Z][a-z]+|\b|[0-9])|[A-Z]?[a-z]+|[A-Z]|[0-9]+/g) ?? [];

const storyNameFromExport = (exportName: string) =>
  words(exportName)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export interface StoryEntry {
  id: string;
  title: string;
  name: string;
  /** A React component that renders the story. Hooks inside stories work. */
  Component: React.ComponentType;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const modules = import.meta.glob<Record<string, any>>(
  [
    "./components/**/*.stories.{ts,tsx}",
    "./prototypes/**/*.stories.{ts,tsx}",
    "./screens/**/*.stories.{ts,tsx}",
  ],
  { eager: true },
);

export const stories: Record<string, StoryEntry> = {};

for (const mod of Object.values(modules)) {
  const meta = mod.default;
  if (!meta || typeof meta.title !== "string") continue;

  for (const [exportName, story] of Object.entries(mod)) {
    if (exportName === "default") continue;
    if (!story || (typeof story !== "object" && typeof story !== "function")) continue;

    const id = `${sanitize(meta.title)}--${sanitize(storyNameFromExport(exportName))}`;
    const name: string = story.name && typeof story.name === "string" && typeof story !== "function"
      ? story.name
      : storyNameFromExport(exportName);

    const Component = function StoryComponent() {
      const args = { ...meta.args, ...story.args };
      const ctx = {
        id,
        name,
        title: meta.title,
        args,
        argTypes: {},
        globals: {},
        viewMode: "story",
        parameters: { ...meta.parameters, ...story.parameters },
      };
      const render = typeof story === "function" ? story : (story.render ?? meta.render);
      if (render) return render(args, ctx);
      const C = story.component ?? meta.component;
      return React.createElement(C, args);
    };

    stories[id] = { id, title: meta.title, name, Component };
  }
}
