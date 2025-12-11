# Technical Documentation – Assignment 4 (Template)

## Overview
React (Vite) frontend + Express/MongoDB backend portfolio with: theme toggle, greeting/name memory, session timer, projects search/filter/sort, GitHub feed, random tip fetch, contact form with API submit, and admin-only messages view.

## Stack
- Frontend: React 18 (Vite), CSS
- Backend: Node.js (Express), MongoDB (Mongoose)

## Project Structure (fill in if you change it)
```
client/          # React app (src/components, src/hooks, src/styles.css, public/assets)
server/          # Express API (index.js, .env.example)
docs/            # ai-usage-report.md, technical-documentation.md
presentation/    # slides.pdf, demo-video.mp4 (placeholders)
```

## Frontend Details
- Entry: `client/src/main.jsx`, `client/src/App.jsx`
- Key components: Navbar, About, Projects, Github, FunFact, Contact, Admin, Footer
- State/logic highlights:
  - Theme stored in `localStorage` (`theme`), respects prefers-color-scheme.
  - Projects controls saved to `localStorage` (`project-state`); search/filter/sort applied in memory.
  - GitHub fetch: `GET https://api.github.com/users/{username}/repos?sort=updated&per_page=5` with loading/error states; username saved to `localStorage` (`github-username`).
  - Fun tip fetch: `GET https://api.adviceslip.com/advice` (no-store); retry button.
  - Contact form: client validation, POST to `/api/contact`; shows success/error inline.
  - Admin view: requires secret; fetches `/api/admin/messages`; filters by email, date range (today/last week/last month/specific/all), and sort asc/desc; defaults to last week.
  - Persistent name memory and greeting; session timer.

## Backend Details
- Server: `server/index.js`
- Env: `.env.example` → `.env` with `MONGODB_URI`, `PORT`, `ADMIN_SECRET`
- Models:
  - `Contact`: `{ contactId, name, email, message, createdAt }`
  - `Counter`: `{ key, value }` (for incremental contactId starting at 100000)
- Routes:
  - `GET /api/health` → { ok, serverTime, db }
  - `POST /api/contact` → validates body; creates Contact with incremental contactId
  - `GET /api/admin/messages` → requires header `x-admin-secret` matching `ADMIN_SECRET`; returns sorted messages
- Server config: CORS enabled, JSON body parsing.

## Data/State Keys
- Frontend: `theme`, `remembered-name`, `project-state`, `github-username`
- Backend env: `MONGODB_URI`, `PORT`, `ADMIN_SECRET`

## Setup & Run (summary)
1) `cd client && npm install`; `cd ../server && npm install`
2) `cp server/.env.example server/.env` and set values
3) Run API: `cd server && npm run dev`
4) Run client: `cd client && npm run dev` (proxy `/api` to server)

## Deployment Notes (fill these in)
- Frontend host: TODO (Netlify/Vercel/other)
- API host: TODO (Render/Fly/other) with env vars set
- Mongo: TODO (Atlas/local), network allowlist as needed

## Testing/Validation (fill in what you run)
- Frontend: TODO (e.g., `npm run build`, manual flows covered)
- Backend: TODO (e.g., Postman collection, unit tests if added)

## Accessibility & UX Considerations
- `aria-live` on status messages (greeting, timers, fact box, form feedback)
- Keyboard: Enter submits admin load, search prevented from accidental submit; buttons and selects accessible.
- Dark mode styles for cards, inputs, selects (projects/admin)

## Performance
- Lazy images with dimensions; Vite production build for tree-shaking.
- Minimal JS for filters/fetches; localStorage hydration guarded.

## TODO (customize for your submission)
- Add any extra features/sections you implement.
- Update deployment URLs and testing notes.
- Keep AI usage log in `docs/ai-usage-report.md` in sync.
