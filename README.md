# Assignment 4 – Personal Web Application (React + Node + MongoDB)

Live site: https://aquamarine-buttercream-79991b.netlify.app/  
Presentation (slides): `presentation/slides.pptx` (included in repo; upload as needed)

Final portfolio web application built with a React (Vite) frontend and an Express/MongoDB backend for handling contact submissions and a private admin view. The UI includes theme toggling, greeting with remembered name, session timer, projects search/filter/sort, GitHub feed, random tip generator, contact form with validation, and an admin-only message viewer.

## Structure (Top-Level)
assignment-4/
├─ client/                # React app (Vite + JSX)
├─ server/                # Express API + MongoDB
├─ assets/                # Static images (copied to client/public/assets)
├─ docs/                  # ai-usage-report.md, technical-documentation.md
└─ presentation/          # slides.pdf, demo-video.mp4

## Prerequisites
- Node.js 18+
- MongoDB connection string (MongoDB Atlas or local instance)

## Setup
1. Install dependencies:
   - cd client && npm install
   - cd ../server && npm install

2. Configure environment variables in the server:
   - cp .env.example .env
   - Set: MONGODB_URI, PORT (default: 5000), ADMIN_SECRET (used for admin access in the UI)

## Run
- Start API:
  - cd server && npm run dev
  - Health check: GET http://localhost:5000/api/health

- Start frontend:
  - cd client && npm run dev
  - App runs at: http://localhost:5173
  - `/api` requests are proxied to the backend.

## API Endpoints
- POST /api/contact  
  Body: { name, email, message }  
  Returns: { ok, id, contactId }

- GET /api/admin/messages  
  Header required: x-admin-secret: <ADMIN_SECRET>  
  Returns: { ok, count, messages }

- GET /api/health  
  Returns server/database status.

## Frontend Features
- Light/Dark theme toggle with persistence
- Greeting with remembered name + session timer
- Projects search, filter, and sort with saved state
- GitHub latest repositories feed (with loading/error handling)
-- Random tip generator with retry
-- Contact form validation and backend submission
-- Admin panel with secret entry to view, search, sort, and filter messages

## Build
- Frontend:
  - cd client && npm run build  
  - Output: client/dist/

- Backend:
  - cd server && npm start

## Deployment
- Frontend: deployed to Netlify (live URL above)
- Backend: deployed to Render (`https://assignment-4-api.onrender.com`)

## Presentation Assets
- Slides and demo video go in the `presentation/` directory (e.g., slides.pptx/pdf, demo-video.mp4).

## AI Usage Summary
AI assistance is documented in `docs/ai-usage-report.md`. ChatGPT was used for architectural ideas, admin workflow planning, and styling inspiration. Final code and logic were implemented, reviewed, and adjusted manually.
