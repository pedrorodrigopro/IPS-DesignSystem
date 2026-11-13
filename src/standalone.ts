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

// Screens that prototypes need to feed with their own data (stories can only be rendered as-is)
export { ManageRolesScreen, ManageTagsModal, DEFAULT_TAG_OPTIONS, DEFAULT_PEOPLE_OPTIONS } from "./screens/admin/manage_roles";
export type { ManageRolesScreenProps, ManageRolesGroup, ManageRolesRole, TagRolesResult, TagPrefill, AvailabilityChange } from "./screens/admin/manage_roles";
export { BookingEngineScreen } from "./screens/booking_engine/booking_engine";
export type { BookingEngineScreenProps, EngagementEntry, RoleEntry, BookingEntry, GridWeeks, GridCellChange, BookingMisalignment, BookingMisalignmentRange, BookingOverbooking, BookingOverbookingRange } from "./screens/booking_engine/booking_engine";

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

const registry: Record<string, StoryEntry> = {};

/**
 * Every Storybook story, keyed by its Storybook id (see index.json).
 * Asking for an id that does not exist throws a message that says what to do,
 * instead of a cryptic "undefined" error.
 */
export const stories: Record<string, StoryEntry> = new Proxy(registry, {
  get(target, key, receiver) {
    if (typeof key === "string" && !(key in target) && key !== "then" && key !== "toJSON") {
      const near = Object.keys(target)
        .filter((k) => k.startsWith(key.split("--")[0]))
        .slice(0, 8);
      throw new Error(
        `IPS: there is no story with id "${key}". Look the id up in index.json.` +
          (near.length ? ` Similar ids: ${near.join(", ")}` : ""),
      );
    }
    return Reflect.get(target, key, receiver);
  },
});

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

    registry[id] = { id, title: meta.title, name, Component };
  }
}
