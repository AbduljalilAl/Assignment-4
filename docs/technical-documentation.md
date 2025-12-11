Technical Documentation – Assignment 4
Overview

This project is a full-stack portfolio application built with a React (Vite) frontend and an Express/MongoDB backend.
It includes:

Theme toggle (light/dark)
Remembered name + personalized greeting
Session timer
Projects search/filter/sort
GitHub activity feed
Random tip generator
Contact form with backend submission
Admin-only messages dashboard with filtering and sorting

Stack
1-Frontend
React 18 (Vite)
CSS (custom styles)

2-Backend
Node.js (Express)
MongoDB (Mongoose)

Project Structure
client/          # React application
  src/
    components/
    hooks/
    styles.css
  public/assets/

server/          # Express backend
  index.js
  .env.example

docs/
  ai-usage-report.md
  technical-documentation.md

presentation/
  slides.pdf
  demo-video.mp4

Frontend Details
  Entry Points
    client/src/main.jsx
    client/src/App.jsx
  Core Components
    Navbar
    About
    Projects
    Github
    FunFact
    Contact
    Admin
    Footer

Feature & State Logic
Theme System
  Stored in localStorage under theme
  Respects prefers-color-scheme
  Toggle persists across sessions

Projects Section
  UI controls stored in localStorage under project-state
  Search, filter, and sorting performed in-memory
  Fully client-side and responsive

GitHub Feed
  Fetches repositories via:
  GET https://api.github.com/user {username}/repos?sort=updated&per_page=5
  Handles loading and error states
  GitHub username stored in localStorage under github-username

Fun Fact Generator
  Fetches from:
  GET https://api.adviceslip.com/advice
  Uses “no-store” caching directives for fresh results
  Includes retry button

Contact Form
  Validates input client-side
  Sends POST request to /api/contact
  Shows inline success/error feedback

Admin Dashboard
  Protected by a secret header
  Fetches from /api/admin/messages
  Filters:
    Email
      Date ranges (today, last week, last month, custom, all)
      Sort direction (asc/desc)
      Default view loads messages from the past week
      Supports keyboard interaction for better accessibility
      
Additional UX Details
Remembered name stored under remembered-name
Session timer updates live
aria-live regions for dynamic status updates

Backend Details
  Server
    server/index.js
    Environment variables stored in .env (copied from .env.example)

Environment Variables
  MONGODB_URI
  PORT
  ADMIN_SECRET

MongoDB Models
Contact
{
  contactId,
  name,
  email,
  message,
  createdAt
}

Counter
{
  key,
  value
}


Used to generate incremental contactId values starting at 100000.

API Routes
GET /api/health

Returns:

{ ok, serverTime, db }

POST /api/contact
  Validates request body
  Creates a new Contact with a unique incremental contactId

GET /api/admin/messages
  Requires header: x-admin-secret
  Returns all contact messages, sortable by date

Server Configuration
  CORS enabled
  JSON body parsing
  Error-safe ID generation using counter document

Data & State Keys
  Frontend
    theme
    remembered-name
    project-state
    github-username

  Backend
    MONGODB_URI
    PORT
    ADMIN_SECRET

Setup & Run
  Install dependencies:
    cd client && npm install
    cd ../server && npm install


Copy environment file:
cp server/.env.example server/.env
Fill in your MongoDB URI and admin secret.

Start backend:
cd server && npm run dev

Start frontend:
cd client && npm run dev


## Development Server Behavior
The Vite development server automatically proxies `/api` requests to the backend, allowing the frontend and backend to run on separate ports during local development while still communicating seamlessly.

## Deployment Notes
Designed for local development using Vite (frontend) and Node.js/Express (backend).
MongoDB Atlas is used through the `MONGODB_URI` value in the `.env` file.
If deployed, update:
- Backend API URLs in frontend fetch requests
- Deployment links in the README

## Testing & Validation

### Frontend Testing
Manually verified:
- Theme toggle
- Projects search/filter/sort
- GitHub feed loading and error handling
- Fun Fact generator
- Contact form validation and submission
- Admin dashboard filters, sorting, and secret access

**Build check:**
npm run build

### Backend Testing
Validated routes with Postman and cURL:
- POST /api/contact — create message
- GET /api/admin/messages — protected admin messages
- GET /api/health — server and DB status

## Accessibility & UX Considerations
- aria-live regions for dynamic content updates
- Keyboard-friendly controls (admin filters, Enter-key behavior, maintained focus)
- High-contrast dark-mode colors
- Clear input grouping and readable dropdown menus

## Performance
- Optimized images with defined dimensions
- Vite production build for tree-shaking and bundling
- Minimal, targeted JavaScript for essential interactions
- Safe hydration of localStorage values
