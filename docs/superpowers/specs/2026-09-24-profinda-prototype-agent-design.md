# ProFinda Prototype Agent — Design Spec

**Date:** 2026-09-24  
**Status:** Awaiting user approval

---

## Problem

Non-technical people (product, business, design) want to prototype new ideas that look exactly like the real ProFinda platform. Today this requires a developer. The goal is to let anyone — with just OpenCode installed — upload a screenshot of an existing screen, describe a new idea, and get a running prototype that looks pixel-identical to the real product within minutes.

---

## Solution

Two files that together form the "ProFinda Prototype Agent":

### `ProFindaComponents.md`
The shareable, branded rules file. Contains:
- The agent's full prototyping workflow (screenshot analysis → MCP component matching → code generation)
- Platform design token reference (colours, spacing, typography, shadows)
- Component recreation patterns from the communities Storybook MCP
- Rules ensuring every prototype looks like the real product

### `AGENTS.md`
The magic entry-point file that all AI tools (OpenCode, Claude Code, Cursor) auto-read when opening a folder. Minimal — just imports `ProFindaComponents.md` and sets the scaffolding rules.

---

## Distribution

Both files live in a tiny dedicated repo (or a `prototypes/` path on communities staging). A non-technical user gets started:

1. Create an empty folder on their machine
2. Copy `AGENTS.md` + `ProFindaComponents.md` into it (from a shared URL, Notion page, or Slack message)
3. Open OpenCode in that folder
4. Upload a screenshot + describe their idea

OpenCode reads `AGENTS.md` automatically, connects to the `communities-storybook` MCP (already in their `opencode.json`), and handles everything else.

---

## Agent Workflow (what happens automatically)

### Step 1 — Screenshot analysis
When the user shares a screenshot, the agent uses vision to identify every UI element before writing a single line of code:
- Navigation bars, tabs, breadcrumbs
- Headers (title, subtitle, actions)
- Cards (match cards, directory cards, content cards)
- Tables, lists, empty states
- Buttons, inputs, dropdowns
- Pills, badges, status indicators
- Modals, overlays, side panels

### Step 2 — MCP component matching
For each identified element, the agent calls:
- `search_components "<element>"` — find the closest platform component
- `get_component "<Name>"` — get its props and JSX usage pattern

The agent maps screenshot elements → platform component names → JSX recreation patterns.

### Step 3 — App scaffolding (first run only)
If no `package.json` exists, the agent creates a minimal Vite + React + TypeScript project:
- `package.json` with only `react`, `react-dom`, `vite`, `@vitejs/plugin-react`, `typescript`
- `index.html` with Mulish font from Google Fonts
- `src/index.css` with the full ProFinda design token set as CSS custom properties
- `src/main.tsx` — React entry point
- `src/App.tsx` — the prototype screens

Then runs `npm install && npm run dev` automatically and tells the user the localhost URL.

### Step 4 — Screen generation
The agent generates self-contained JSX recreating the screenshot. Components are written as inline React components (no imports from premiumui — fully standalone) but styled using:
- Platform CSS custom properties (`--palette-blue-1`, `--palette-neutral-2`, etc.)
- Exact spacing, border-radius, shadows, typography from the design token reference
- Component patterns (props, layout, structure) from the MCP's JSX examples

### Step 5 — Iteration
Every subsequent user request ("add a filter bar", "make this a table", "add a match card here"):
1. Agent queries MCP for the relevant component
2. Agent adds it using the correct pattern
3. App hot-reloads automatically

### Step 6 — Export
When the user wants to share:
- Agent runs `npm run build`
- Produces `dist/index.html` — a single portable file
- User can email it, upload it to a preview environment, or share the link

---

## `ProFindaComponents.md` Content Structure

```
# ProFinda Components — Prototype Agent Rules

## Purpose
## MCP — Always check before writing UI
## Design tokens (full CSS var reference)
## Component recreation patterns (by category)
## Visual rules (what makes it look like ProFinda)
## Workflow rules (screenshot → MCP → code)
## Export instructions
```

### Design token reference (included inline)
All CSS custom properties matching the platform palette:
- Colours: `--palette-blue-0` through `--palette-blue-3`, primary, red, green, orange, neutral
- Typography: `--font-family: 'Mulish'`, sizes, weights, line-heights
- Spacing: 4px base grid
- Shadows: card default `0 0 8px 0 rgba(203,225,242,0.8)`, card hover `0 0 12px 0 rgba(187,202,242,1)`
- Border radius: 8px cards, 4px buttons small, 16px pills

### Visual rules (non-negotiable)
- Background: `#F8F9FD` page, `#FFFFFF` cards
- Font: Mulish throughout, loaded from Google Fonts
- No raw `<button>` — always use platform button patterns (primary `#2358F8`, secondary `#CFDAF7` border)
- No custom colours — only palette tokens
- Cards always have `box-shadow: 0 0 8px 0 rgba(203,225,242,0.8)` and `border-radius: 8px`
- Navbar: `#0C1457` background, `border-radius: 0 16px 16px 0`, left-side fixed

---

## File Structure Output

```
[user's folder]
├── AGENTS.md                  ← auto-read by OpenCode/Claude/Cursor
├── ProFindaComponents.md      ← the actual rules (referenced by AGENTS.md)
├── package.json               ← Vite + React only
├── vite.config.ts
├── tsconfig.json
├── index.html                 ← loads Mulish font
└── src/
    ├── main.tsx
    ├── index.css              ← ProFinda design tokens as CSS vars
    └── App.tsx                ← prototype screens (grows with each request)
```

---

## `AGENTS.md` Content (minimal)

```markdown
# ProFinda Prototype Agent

This folder is a ProFinda prototype environment. Read `ProFindaComponents.md` for full rules.

## Quick rules
- Read ProFindaComponents.md before doing anything
- Always query the communities-storybook MCP before writing any UI
- If no package.json exists, scaffold the Vite app first
- Run `npm install && npm run dev` after scaffolding
- Every prototype must look exactly like the real ProFinda platform
```

---

## What Gets Distributed

A single public GitHub repo `profinda-prototype` (or path on communities) with:
- `AGENTS.md`
- `ProFindaComponents.md`
- `README.md` — one-paragraph explanation + the two setup steps

The README is the only thing non-technical users need to read. It should be two sentences: "Copy these two files into any folder. Open OpenCode there."

---

## Out of Scope

- Publishing to npm or any registry
- Importing actual premiumui source code
- Authentication or API calls to the real platform
- Multi-user collaboration
- Any UI for managing prototypes

---

## Success Criteria

1. A non-technical user with OpenCode + the two files can go from screenshot → running prototype in under 5 minutes
2. Every prototype uses Mulish, the ProFinda colour palette, and component patterns that match the real platform
3. The agent always consults the MCP before generating any component
4. The export (`npm run build`) produces a portable `dist/index.html` that works when opened in any browser
5. The two files are small enough to share in a Slack message or Notion page
