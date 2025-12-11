# AI Usage Report – Assignment 4

**Student:** Abbduljalil  
**Repo:** assignment-4 (mirrors this project)  
**Date:** 2025-12-11

I used AI as a helper for ideas and scaffolding, then implemented and adjusted the code myself. Below are the concrete interactions.

| # | Tool | Prompt (summary) | AI Output (summary) | My Edits / Decisions | Learning |
|---|------|------------------|---------------------|----------------------|----------|
| 1 | ChatGPT (assistant) | How to port the static portfolio to React with components, state, and API fetches. | Proposed Vite+React scaffold, component split (Navbar/About/Projects/GitHub/FunFact/Contact/Footer), localStorage hooks, and fetch patterns for GitHub/AdviceSlip. | Built the components, rewrote copy, chose persistence keys, refined sorting/filtering logic, added aria/live regions, and verified the build. | Practice turning a static site into a stateful React app while keeping UX/accessibility. |
| 2 | ChatGPT (assistant) | Add a private admin view + backend for contact messages using Mongo with a secret header. | Suggested Express routes (`/api/contact`, `/api/admin/messages`), Mongoose models, incremental contactId, and React admin gate. | Implemented counter-based IDs, fixed the Mongo upsert conflict, added filters (email/date ranges/sort), keyboard handling, and dark-mode styling. | Learned to keep simple auth gates, avoid conflicting updates, and layer UI filters over API data. |
| 3 | ChatGPT (assistant) | Improve dark-mode contrast and unify control styling (secret bar, filters, selects). | Suggested grouped input styling, gradients, and color tokens. | Tuned CSS for grouped inputs, chip filters, selects, and option visibility in dark mode; matched palette to existing theme. | Better eye for contrast/accessibility in dark-mode forms and dropdowns. |

Reflection
- Benefits: Faster idea generation for component structure and styling; saved time on boilerplate and patterns.
- Challenges: Resolving Mongo counter conflicts; ensuring dark-mode readability for selects/dropdowns.
- Understanding: I ran local builds/tests (`npm run build`), exercised admin secret/filter flows, and adjusted Mongoose logic to ensure unique, incremental contactIds.

Reminders:
- Keep this honest and specific.
- Do not copy peers’ work; describe only your own AI-assisted steps.
