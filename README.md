# all-charts-js

A documentation-first Angular 17 + Chart.js showcase for payroll/comp analytics. Each chart ships with:
- A live render (area, bar, bubble, line, pie with labels, polar, radar, scatter, benefits split)
- A plain-language “why use this” rationale
- Instant code snippet copy
- Dedicated docs pages at `/docs/:id`
- Light/dark theme toggle, responsive layout, and profile/portfolio sections

## Quick start
```bash
npm install
npm start
# open http://localhost:4200/
```

## Key features
- **Chart gallery with search**: filter by title/tag/description from the navbar.
- **Docs pages**: `/docs/<chartId>` (e.g., `/docs/barChart`) for focused view + code.
- **Theme toggle**: light/dark across hero, cards, docs, and charts.
- **Copy code**: buttons on cards and docs pages copy the snippet instantly.
- **Profile/portfolio sections**: hero, about, and creator profile (Marwane Lachhab) with social links.

## Charts included
- Payroll distribution (pie + label lines)
- Base vs bonus by team (bar)
- Salary vs tenure scatter
- Comp balance radar
- Stipend mix polar
- Payroll actual vs forecast (line)
- Pay bands bubble map
- Payroll runway area (area)
- Benefits split pie

## Scripts
- `npm start` – dev server with live reload.
- `npm run build` – production build to `dist/all-pie`.
- `npm test` – Karma unit tests (if added).

## Project structure (high level)
- `src/app/all-charts-example/` – home/portfolio hub (hero, search, sections, chart grid).
- `src/app/components/chart-card/` – reusable chart card component (renders chart, code toggle, links).
- `src/app/chart-detail/` – docs/detail page for each chart.
- `src/app/models/chart-data.ts` – chart metadata (title, tag, about, why, snippet, doc points).
- `src/app/utils/chart-renderers.ts` – Chart.js render helpers, including pie label plugin.
- `src/styles.css` – global theme tokens and typography.

## Usage notes
- **Docs route**: open `/docs/<chartId>#docs` to jump straight to code for that chart.
- **Theme**: toggle in the navbar on any page; charts and labels adapt automatically.
- **Images**: creator photo lives at `src/assets/Marwane.jpeg` and is used in profile/footer.

## Deploying
1. Build: `npm run build --configuration production`
2. Serve the contents of `dist/all-pie/` with any static host (Netlify, Vercel, nginx, etc.).

## Author
Built by **Marwane Lachhab** (LinkedIn/GitHub links in the UI). PRs and tweaks welcome.***
