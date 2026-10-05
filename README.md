# IPS Design System

Components, tokens, screens and prototyping skill for ProFinda.

**Live Storybook:** https://pedrorodrigopro.github.io/IPS-DesignSystem/

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
```

Storybook deploys automatically to GitHub Pages on every push to `main`.
