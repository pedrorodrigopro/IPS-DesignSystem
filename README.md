# IPS Design System

Components, tokens, screens and prototyping skill for ProFinda.

**Live Storybook:** https://profinda.github.io/ips-design_system/

---

## Prototyping with the IPS skill

Want to build a ProFinda HTML prototype? This repo includes the IPS skill — OpenCode picks it up automatically when you open this folder.

**To start prototyping:**

1. Open this folder in your terminal
2. Run `opencode`
3. Say: _"use the IPS skill to build me a prototype of the Workflow screen"_

That's it. Describe what you want, upload a screenshot, or name a screen — the agent builds it.

When done, ask: _"export this so I can share it"_ — you get a single `dist/index.html` to email or open in any browser.

---

## Standalone bundle — one HTML file, no npm

The site publishes a ready-made browser bundle next to Storybook, with React included:

- `https://profinda.github.io/ips-design_system/standalone/ips.js`
- `https://profinda.github.io/ips-design_system/standalone/ips.css` (tokens, reset, component CSS and the Mulish font, all embedded)

```html
<link rel="stylesheet" href="ips.css">
<div id="root"></div>
<script src="ips.js"></script>
<script>
  const { html, mount, stories, Navbar, Page, Tile, Header, Button } = IPS;

  // An existing Storybook screen — same id as in Storybook's index.json
  mount("#root", html`<${stories["screens-workflow--engagements"].Component} />`);

  // Or compose a new screen from components (wrap Page in a full-height container)
  // html`<${Tile} tileStyle="highlight" padding="content"><${Button} kind="primary">Save<//><//>`
</script>
```

`IPS` exposes every component, `stories` (every Storybook story, keyed by its Storybook id), `html` (JSX-like tagged templates), `mount`, `React` and `createRoot`.
The list of what exists is Storybook's own: https://profinda.github.io/ips-design_system/index.json

To inline for a single shareable file, paste the contents of `ips.css` into a `<style>` tag and `ips.js` into a `<script>` tag.
Build it locally with `npm run build:standalone` (output in `dist-standalone/`).

---

## What screens are available

| Screen | What it includes |
|---|---|
| **Workflow** | Engagements and Roles tabs with sortable tables |
| **Role** | Overview, Matches, Shortlist, Vacancies, History |
| **Engagement** | Engagement detail |
| **Booking Engine** | Gantt and Grid views, Projects and Workforce |
| **Analytics** | Reports + Create Report wizard |
| **Audit Planner** | Full audit layout |
| **Marketplace** | Home and Work Opportunities |
| **My Profile** | Three-column and single-column variants |
| **Profiles Directory** | Card view, Table view, Search states |
| **Admin** | Skills Frameworks, Manage Roles |

---

## Development

```bash
npm install
npm run build          # build the package
npm run storybook      # run Storybook locally on port 6006
npm run build-storybook # build static Storybook
npm run build:standalone # build the standalone browser bundle (dist-standalone/)
npm run build:site     # rebuild storybook-static/ incl. the standalone bundle (commit the result to publish)
```

GitHub Pages serves the committed `storybook-static/` folder (the `storybook.yml` workflow only uploads it; it does not build). After changing components or stories, run `npm run build:site` and commit `storybook-static/`: it rebuilds Storybook and the standalone bundle (`storybook-static/standalone/ips.js` and `ips.css`) from the current code.
