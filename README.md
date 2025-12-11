# Assignment 4 – Personal Web Application (React + Node + MongoDB)

Final portfolio web app built with React (Vite) and an Express/MongoDB API for contact submissions plus a private admin view. UI features: theme toggle, greeting + remembered name, session timer, projects filter/sort, GitHub feed, random tip, contact form with validation, and admin-only messages viewer.

## Structure (top-level)
```
assignment-4/
├─ client/            # Vite React app (JSX)
├─ server/            # Express API + Mongo
├─ assets/            # static images (copied to client/public/assets)
├─ docs/              # ai-usage-report.md, technical-documentation.md
└─ presentation/      # slides.pdf, demo-video.mp4 (optional)
```

## Prerequisites
- Node.js 18+
- MongoDB connection string (Atlas or local)

## Setup
1) Install deps  
   `cd client && npm install`  
   `cd ../server && npm install`

2) Configure environment (server)  
   `cp .env.example .env` then set:  
   - `MONGODB_URI` (Atlas or local)  
   - `PORT` (default 5000)  
   - `ADMIN_SECRET` (keep private; needed for admin UI)

## Run
- API: `cd server && npm run dev` (health: `GET http://localhost:5000/api/health`)  
- Frontend: `cd client && npm run dev` (http://localhost:5173, proxy `/api` to 5000)

## API (Postman-ready)
- `POST /api/contact` — `{ name, email, message }` → `{ ok, id, contactId }`
- `GET /api/admin/messages` — header `x-admin-secret: <ADMIN_SECRET>` → `{ ok, count, messages }`
- `GET /api/health` — server/db status

## Features (frontend)
- Theme toggle with persistence + system preference
- Greeting + remembered visitor name; live session timer
- Projects search/filter/sort with saved state
- GitHub latest repos feed with loading/error handling
- Random dev tip fetch with retry
- Contact form validation + API submit with friendly errors
- Admin panel: enter secret to view/search/sort/filter messages

## Build
- Frontend: `cd client && npm run build` → `client/dist/`
- Backend: run via `npm start` in `server/`

## Deployment
- Live frontend URL: not deployed (run locally)
- Live API URL: not deployed (run locally)
- CI/CD: n/a

## Presentation assets
- Not included in this repo. Add `presentation/slides.pdf` and `presentation/demo-video.mp4` if required.

## AI usage
- Logged in `docs/ai-usage-report.md` (used ChatGPT for scaffolding ideas, admin flow, and styling suggestions; implementation reviewed and adjusted manually).

## Academic integrity
- Keep `ADMIN_SECRET` out of commits.
- Maintain docs (`ai-usage-report.md`, `technical-documentation.md`) with your own work notes.
