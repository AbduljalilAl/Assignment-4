# AI Usage Report – Assignment 4

**Student:** Abbduljalil  
**Repo:** assignment-4 (mirrors this project)  
**Date:** 2025-12-11

AI tools were used throughout this project to support planning, troubleshooting, and UI/UX improvements. All final code was written, tested, and refined by me, with AI serving as an assistant rather than an author of the final implementation.

Summary of AI Interactions
#	AI Tool	What I Asked For	How AI Helped	My Edits & Decisions	What I Learned
1	ChatGPT	Guidance on converting my static portfolio into a React app.	Suggested a Vite + React setup, component structure (Navbar, About, Projects, GitHub Feed, FunFact, Contact, Footer), and patterns for using state, localStorage, and API fetches.	Rebuilt components myself, rewrote all copy, customized persistence keys, refined sorting/filtering logic, and added accessibility features such as ARIA roles and live regions.	How to translate a static website into a stateful React application while keeping the UI accessible and user-friendly.

2	ChatGPT	Help designing a simple admin dashboard and backend to store contact messages in MongoDB.	Provided sample Express routes, Mongo schema ideas, incremental ID logic, and a basic admin-gate concept.	Implemented my own counter-based IDs, fixed Mongo upsert issues, added email/date/sort filters, improved keyboard accessibility, and styled the admin view with dark-mode support.	How to design lightweight backend routes, avoid ID conflicts, and layer client-side filtering over API-fetched data.

3	ChatGPT	Suggestions for improving dark-mode contrast and unifying form control styling.	Recommended consistent color tokens, grouped control styling, and dropdown adjustments.	Tuned the palette myself, improved grouped input layouts, fixed dropdown visibility in dark mode, and matched all UI elements to the site’s theme.	A stronger understanding of dark-mode accessibility and how to maintain visual consistency across forms and filters.

Benefits:
Faster brainstorming for architecture and UI ideas

Clearer strategies for React component organization and MongoDB usage

Improved design consistency, especially in dark mode

Challenges:
Handling MongoDB counter conflicts

Ensuring select and dropdown visibility in dark mode

Verification & Understanding:
I tested all features locally, validated build outputs, reviewed API behavior, and modified every AI suggestion to fit my project’s logic, style, and accessibility requirements.