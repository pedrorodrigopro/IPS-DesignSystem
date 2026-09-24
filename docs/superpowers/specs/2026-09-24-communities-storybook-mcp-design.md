# Communities Storybook MCP — Design Spec

**Date:** 2026-09-24  
**Status:** Awaiting user approval  

---

## Problem

Developers vibe-coding in the Profinda platform (New Profinda UI / premiumui) need AI agents to automatically use the **official production components** from the communities Storybook (`https://communities.profinda-staging.com/storybook/`) rather than inventing new JSX from scratch. The existing `storybook-mcp` in premiumui is pointed at the local `assets/` directory and serves the same data, but is fragile to local state and not the right entry point for new developers.

---

## Solution

A **standalone MCP server** at `premiumui/tools/communities-storybook-mcp/index.ts` that:
1. Fetches the live Storybook `index.json` from the communities staging URL
2. Caches it locally for 1 hour (works offline, avoids hammering staging)
3. Resolves `componentPath` entries against the local premiumui checkout to extract real prop types and story JSX
4. Exposes four MCP tools identical in interface to the existing `storybook-mcp`

Anyone who adds the MCP to their `opencode.json` (or any MCP-compatible AI client) gets accurate, always-up-to-date component knowledge.

---

## Architecture

```
opencode.json / MCP client config
  └─ npx tsx premiumui/tools/communities-storybook-mcp/index.ts
       │
       ├─ On startup / cache miss:
       │    fetch https://communities.profinda-staging.com/storybook/index.json
       │    write to /tmp/communities-storybook-index-{hash}.json  (1h TTL)
       │
       ├─ list_components → read index, return all story entries grouped by component
       ├─ get_component   → find component in index, read local componentPath for props
       │                    + read local importPath for JSX story variants
       ├─ search_components → filter index by name/category keyword
       └─ get_category    → filter index by top-level category
```

---

## File Location

```
premiumui/
  tools/
    communities-storybook-mcp/
      index.ts          ← MCP server (standalone, no shared code with storybook-mcp)
      README.md         ← Setup instructions
```

---

## MCP Tools

### `list_components`
Returns all components (stories only, no docs entries) with:
- Component name
- Storybook title (category path)
- Number of variants
- Import path (how to import in platform code)

### `get_component`
Input: `name` (string)  
Returns for the matched component:
- Full exported Props/types from the local `componentPath` file
- All story variant names with JSX code extracted from the local `importPath` file
- The correct import statement for use in the platform

### `search_components`
Input: `query` (string)  
Returns matching components filtered by name or category.

### `get_category`
Input: `category` (string, e.g. `"Core components"`)  
Returns all components in that category.

---

## Data Flow Detail

### Index fetching & caching
- URL: `https://communities.profinda-staging.com/storybook/index.json`
- Cache file: `/tmp/communities-storybook-index.json`
- Cache TTL: 1 hour (check `mtime`, re-fetch if stale)
- On fetch failure with stale cache: use stale cache, log warning
- On fetch failure with no cache: return error message from all tools

### Local file resolution
The index entries have paths like `./assets/javascripts/core/components/button/button.stories.tsx`. These are resolved relative to the **premiumui repo root** which is derived from `import.meta.url` (the script lives at `premiumui/tools/communities-storybook-mcp/index.ts`, so `../../` = repo root).

### Props extraction
Same regex approach as the existing `storybook-mcp`:
- Read `componentPath` file
- Extract exported `type XxxProps = { ... }` or `interface XxxProps { ... }` blocks
- Return as TypeScript string

### JSX extraction
- Read `importPath` (stories file)
- For each exported story constant, extract the `render: () => (...)` or `render: () => { ... return ... }` body
- Return as JSX preview strings

---

## opencode.json config snippet

```json
"communities-storybook": {
  "type": "local",
  "command": [
    "npx",
    "tsx",
    "/Users/{username}/workspace/premiumui/tools/communities-storybook-mcp/index.ts"
  ],
  "enabled": true
}
```

The README will include this snippet with instructions for teammates.

---

## Dependencies

Same as existing `storybook-mcp`:
- `@modelcontextprotocol/sdk` (already in premiumui devDependencies)
- `zod` (already present)
- `tsx` (already present via npx)
- Node built-ins: `fs`, `path`, `https`/`fetch`

No new dependencies needed.

---

## Out of Scope

- Authentication (communities Storybook is publicly accessible)
- Websocket/SSE transport (stdio only — same as existing MCP)
- Component rendering / screenshots
- IPS design system components (separate MCP, separate repo)

---

## Success Criteria

1. `list_components` returns all ~166 platform components correctly
2. `get_component "Button"` returns the real ButtonProps type and all story variants
3. Works when communities staging is unreachable (serves cached data)
4. A new developer can set it up by copying one JSON snippet into their opencode config
