# Portfolio Recruiter Polish

## Goal

Strengthen the existing Pop Studio portfolio for job searching while preserving its recognizable identity: lavender, violet, lime, the star motif, the record-sleeve metaphor, separate SPA routes, the redesigned Contact page, and the original staggered name animation.

The first screen should tell a recruiter what Xingcheng does, why his work is credible, and where to go next within five seconds. Project and experience pages should present real engineering evidence before decorative metadata.

## Mode and design read

- Mode: Redesign · Preserve.
- Audience: recruiters, hiring managers, and engineers evaluating frontend-focused full-stack roles.
- Visual language: playful pop editorial with album-art references.
- Visual variance: 7/10. Keep one strong composition per route and reduce repeated ornamental devices.
- Motion intensity: 5/10. Preserve the name wave and route/interaction feedback; add only subject-specific movement.
- Information density: 4/10. Keep pages easy to scan while giving projects and experience enough proof.
- Asset dependence: 7/10. Project UI evidence should carry the Work page.
- Brand fidelity: 9/10. The palette, star, wordmark behavior, and Pop Studio voice are protected.

## Approaches considered

1. **Focused preserve pass — selected.** Improve hierarchy, copy, project proof, typography, and the About composition without changing the route structure or identity. This gives the largest recruiting benefit with the lowest visual and technical risk.
2. **Cosmetic cleanup only.** Remove labels and adjust type sizes. Lower risk, but it would leave the generic hero and weak project evidence unresolved.
3. **Full visual overhaul.** Replace Pop Studio with a quieter editorial portfolio. This would discard the identity the user selected and the contact/name work already approved.

## Page changes

### Shared header and typography

- Keep the animated `VINCENT` wordmark unchanged.
- Reorder primary navigation to Home, Experience, Work, About, Contact so professional proof appears earlier.
- Keep the five-route SPA and hash URLs.
- Consolidate display, heading, lead, body, and small-text roles through shared CSS tokens.
- Running copy should be at least 16px where space permits; essential supporting copy should use the full ink or a stronger muted tone.
- Keep small uppercase metadata only when it reinforces a physical album/postcard artifact. Remove it from general page framing and repeated section introductions.

### Home

- Replace the generic headline with a specific promise about turning complex systems into clear interfaces.
- Mention React, TypeScript, and enterprise workflow experience in the supporting copy without exposing confidential Apple details.
- Use Experience as the primary action and Résumé as the secondary action.
- Keep the record sleeve as the dominant visual and update its microcopy to support the engineering/music concept.
- Retain the dark four-part band as a concise identity summary.

### Experience

- Make the page explicitly identify itself as professional experience.
- Keep Apple prominent and retain all factual content.
- Remove decorative numbering and convert the three achievements into clear contribution blocks with stronger body type.
- Preserve the résumé link and earlier roles.

### Work

- Keep the interactive project selector.
- Replace decorative numbering with project names and descriptive categories.
- Use repository-derived screenshots when an honest runnable UI can be captured. If a project cannot be run reliably, keep its current branded artwork and label it as artwork rather than product UI.
- Reframe each project detail as problem, contribution, and technical decisions using existing verified information.
- Preserve source/live links and project truth; do not invent usage metrics or outcomes.

### About

- Keep the music/reading switcher and artist list.
- Use a fuller editorial composition to reduce dead desktop space: add a compact identity/education/location block and a visual reading/music object made from existing content.
- Remove repeated micro-labels and decorative numbering while keeping the playful lime panel.

### Contact

- Preserve the current split composition, postcard, email actions, social links, and wording.
- Reduce redundant metadata and improve mobile balance without changing the core design.

## Motion and interaction

- Preserve the wordmark color wave, route transition, project selection transition, interest switcher, and hover/press feedback.
- Add no ambient animation that competes with content.
- Continue honoring `prefers-reduced-motion`; content must remain visible without animation.

## Protected contracts

- Hash routes, navigation labels, external destinations, résumé PDF path, and email address.
- Accessible names, keyboard behavior, focus transfer on route changes, live regions, and reduced-motion behavior.
- User-provided career and project facts.
- GitHub Pages build and deployment workflow.

## Verification

- TypeScript/Vite production build and whitespace check.
- Browser inspection of all five routes at 1440px, 768px, and 390px.
- Confirm no horizontal overflow, console errors, broken links, or hidden content.
- Exercise the project selector, interest switcher, and contact copy feedback.
- Compare the final screenshots against the current review, focusing on recruiter clarity, type size, metadata density, and the About page's fullness.
