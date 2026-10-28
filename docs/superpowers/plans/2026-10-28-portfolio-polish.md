# Portfolio Recruiter Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Pop Studio portfolio read clearly to recruiters within five seconds while preserving the site’s distinctive music-inspired identity, SPA routes, Contact composition, and animated name.

**Architecture:** Keep the current React/Vite single-page application and HashRouter. Centralize project and experience facts in `src/content.ts`, keep page composition in `src/App.tsx`, and refine the existing design system in `src/styles.css`. Use one repository-derived Inline Scheduler GIF as honest product evidence and retain bespoke artwork for projects without trustworthy screenshots.

**Tech Stack:** React 19, TypeScript, React Router, Motion, Vite, CSS, GitHub Pages

---

### Task 1: Make the shared shell and homepage recruiter-first

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] Reorder navigation to Home, Experience, Work, About, Contact while preserving route paths.
- [ ] Replace the generic three-line hero with the two-line promise `Complex systems. / Clear interfaces.`
- [ ] Add supporting copy that names React, TypeScript, and enterprise workflows without exposing confidential product details.
- [ ] Make Experience the primary action and the résumé PDF the secondary action.
- [ ] Simplify the record sleeve metadata and identity band while preserving the Pop Studio art direction.
- [ ] Preserve the `VINCENT` staggered color-wave implementation exactly.

### Task 2: Turn Experience into concise professional evidence

**Files:**
- Modify: `src/content.ts`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] Remove decorative experience numbering from the content model and UI.
- [ ] Label the page as professional experience and keep Apple, dates, role, earlier roles, and all factual contributions.
- [ ] Render the three Apple contributions as readable filled blocks with body text at least 16px.
- [ ] Present the technology list in sentence case and make the résumé action easy to find.

### Task 3: Strengthen the Work page with proof and structure

**Files:**
- Modify: `src/content.ts`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Add: `public/inline-scheduler-home.gif`

- [ ] Reframe each project into a verified challenge, contribution, and technical approach.
- [ ] Remove decorative index numbers from the project selector and detail metadata.
- [ ] Keep the current interactive selector, repository links, and live-project link.
- [ ] Use the repository README’s authentic Inline Scheduler demo GIF inside a product frame.
- [ ] Label the Chat and Music visuals as concept artwork so they cannot be mistaken for product screenshots.

### Task 4: Rebalance About and simplify Contact metadata

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] Add a compact identity block for location, education, and role focus using facts already present in the CV/site.
- [ ] Keep the music/reading switcher and artist list, increase its running text, and remove repeated micro-labels.
- [ ] Fill the desktop About composition without adding invented reading titles or biography details.
- [ ] Preserve the Contact split, postcard, email actions, and links while removing redundant framing metadata.

### Task 5: Consolidate type roles and responsive behavior

**Files:**
- Modify: `src/styles.css`

- [ ] Add shared display, heading, lead, body, and small-text tokens.
- [ ] Use a stronger muted ink for essential supporting copy and keep decorative text secondary.
- [ ] Maintain strong two-column compositions at desktop, balanced stacking at tablet/mobile, and visible keyboard focus.
- [ ] Keep motion purposeful and honor `prefers-reduced-motion`.

### Task 6: Verify and deploy

**Files:**
- Modify if required by verification: `src/App.tsx`
- Modify if required by verification: `src/styles.css`

- [ ] Run `npm run build` and `git diff --check`.
- [ ] Inspect all five routes at 1440px, 768px, and 390px for hierarchy, overflow, console errors, and hidden content.
- [ ] Exercise the project selector, About interest switcher, navigation, résumé link, and Contact copy feedback.
- [ ] Confirm the original wordmark color wave and reduced-motion behavior remain intact.
- [ ] Commit the reviewed implementation, push `main`, wait for GitHub Pages, and verify the live deployment with a cache-busting URL.
